import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseServiceClient } from "@/core/analytics/supabaseClient";
import { validateSession } from "@/core/auth/sessionManager";
import { validatePassword } from "@/core/auth/passwordValidator";
import { logPasswordChange } from "@/core/auth/auditLogger";
import type { ChangePasswordRequest, ChangePasswordResponse } from "@/core/analytics/types";

/**
 * POST /api/auth/change-password
 * Change user's password (either forced after reset or voluntary)
 */
export async function POST(request: NextRequest) {
  const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    const body: ChangePasswordRequest = await request.json();
    const { userId, currentPassword, newPassword, sessionToken } = body;

    // Validate required fields
    if (!userId || !newPassword || !sessionToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate session
    const session = await validateSession(sessionToken);
    if (!session || session.userId !== userId) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // Validate new password strength
    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Get database connection
    const supabase = getSupabaseServiceClient();

    // Find user
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // If current password is provided, verify it
    // (not required for forced password changes after reset)
    if (currentPassword) {
      if (!user.password_hash) {
        return NextResponse.json(
          { error: "No password set for this user" },
          { status: 400 }
        );
      }

      const isValid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isValid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 401 }
        );
      }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset required flag
    const { error: updateError } = await supabase
      .from('users')
      .update({
        password_hash: hashedPassword,
        password_set_at: new Date().toISOString(),
        password_reset_required: false,
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Failed to change password:', updateError);
      throw new Error('Failed to change password');
    }

    // Log the password change
    const forced = !currentPassword; // If no current password provided, it was forced
    await logPasswordChange(userId, user.name, forced, ipAddress, userAgent);

    console.log(`✅ Password changed for user: ${user.name} (forced: ${forced})`);

    const response: ChangePasswordResponse = {
      success: true,
      message: "Password changed successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in change-password route:", error);
    return NextResponse.json(
      {
        error: "Failed to change password",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
