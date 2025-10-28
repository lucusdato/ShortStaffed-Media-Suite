import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseServiceClient } from "@/core/analytics/supabaseClient";
import { validateSession } from "@/core/auth/sessionManager";
import { generateTemporaryPassword } from "@/core/auth/passwordValidator";
import { logPasswordReset } from "@/core/auth/auditLogger";
import type { ResetPasswordRequest, ResetPasswordResponse } from "@/core/analytics/types";

/**
 * POST /api/auth/reset-password
 * Reset a user's password (Master Admin only)
 * Generates a temporary password and forces user to change it on next login
 */
export async function POST(request: NextRequest) {
  const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    const body: ResetPasswordRequest = await request.json();
    const { targetUserName, adminUserName, sessionToken } = body;

    // Validate required fields
    if (!targetUserName || !adminUserName || !sessionToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate admin session
    const session = await validateSession(sessionToken);
    if (!session || session.userName !== adminUserName) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // Verify admin is Master Admin
    if (!session.isMasterAdmin) {
      return NextResponse.json(
        { error: "Only Master Admin can reset passwords" },
        { status: 403 }
      );
    }

    // Get database connection
    const supabase = getSupabaseServiceClient();

    // Find target user
    const { data: targetUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('name', targetUserName)
      .single();

    if (fetchError || !targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 }
      );
    }

    // Find admin user
    const { data: adminUser } = await supabase
      .from('users')
      .select('id')
      .eq('name', adminUserName)
      .single();

    if (!adminUser) {
      return NextResponse.json(
        { error: "Admin user not found" },
        { status: 404 }
      );
    }

    // Generate temporary password
    const temporaryPassword = generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Update user with temporary password and set reset required flag
    const { error: updateError } = await supabase
      .from('users')
      .update({
        password_hash: hashedPassword,
        password_reset_required: true,
        password_set_at: new Date().toISOString(),
        failed_login_attempts: 0, // Reset lockout
        account_locked_until: null,
      })
      .eq('id', targetUser.id);

    if (updateError) {
      console.error('Failed to reset password:', updateError);
      throw new Error('Failed to reset password');
    }

    // Log the password reset
    await logPasswordReset(
      targetUser.id,
      targetUserName,
      adminUser.id,
      adminUserName,
      ipAddress,
      userAgent
    );

    console.log(`✅ Password reset for user: ${targetUserName} by admin: ${adminUserName}`);

    const response: ResetPasswordResponse = {
      success: true,
      message: "Password reset successfully",
      temporaryPassword,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in reset-password route:", error);
    return NextResponse.json(
      {
        error: "Failed to reset password",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
