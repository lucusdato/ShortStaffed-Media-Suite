// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseServiceClient } from "@/core/analytics/supabaseClient";
import { USERS } from "@/core/analytics/userDirectory";
import { validatePassword } from "@/core/auth/passwordValidator";
import { logPasswordSetup } from "@/core/auth/auditLogger";
import type { SetupPasswordRequest, SetupPasswordResponse } from "@/core/analytics/types";

/**
 * POST /api/auth/setup-password
 * Set up password for a new admin user on their first login
 * SECURITY: Passwords are stored securely in Supabase database (bcrypt hashed)
 */
export async function POST(request: NextRequest) {
  try {
    const body: SetupPasswordRequest = await request.json();
    const { userName, password } = body;

    console.log("🔐 [API] Password setup request received for:", userName);

    // Validate required fields
    if (!userName || !password) {
      return NextResponse.json(
        { error: "Missing required fields: userName, password" },
        { status: 400 }
      );
    }

    // Validate password strength
    const validation = validatePassword(password);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Find the user in the directory
    const directoryUser = USERS.find(u => u.name === userName);
    if (!directoryUser) {
      return NextResponse.json(
        { error: "User not found in directory" },
        { status: 404 }
      );
    }

    if (!directoryUser.isAdmin) {
      return NextResponse.json(
        { error: "Only admin users can set up passwords" },
        { status: 403 }
      );
    }

    // Get database connection
    const supabase = getSupabaseServiceClient();

    // Find user in database (or create if doesn't exist)
    let { data: dbUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('name', userName)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Database error:', fetchError);
      throw new Error('Failed to query user');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!dbUser) {
      // Create user if doesn't exist
      console.log(`📝 Creating new user in database: ${userName}`);
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          name: userName,
          role: directoryUser.role,
          client: directoryUser.client,
          password_hash: hashedPassword,
          password_set_at: new Date().toISOString(),
          is_admin: true,
          is_master_admin: directoryUser.isMasterAdmin || false,
        })
        .select()
        .single();

      if (createError) {
        console.error('❌ Failed to create user:', createError);
        throw new Error(`Failed to create user: ${createError.message}`);
      }

      if (!newUser) {
        console.error('❌ User creation returned no data');
        throw new Error('Failed to create user: No data returned');
      }

      console.log(`✅ User created successfully in database:`, { id: newUser.id, name: newUser.name });
      dbUser = newUser;

      // VERIFY the user was actually created
      const { data: verifyUser, error: verifyError } = await supabase
        .from('users')
        .select('id, name, password_hash')
        .eq('id', newUser.id)
        .single();

      if (verifyError || !verifyUser) {
        console.error('❌ CRITICAL: User creation verification failed!', verifyError);
        throw new Error('Database transaction failed - user not found after creation');
      }

      console.log(`✅ User creation VERIFIED in database`);
    } else {
      // Update existing user with password
      console.log(`📝 Updating password for existing user: ${userName} (ID: ${dbUser.id})`);
      const { error: updateError } = await supabase
        .from('users')
        .update({
          password_hash: hashedPassword,
          password_set_at: new Date().toISOString(),
          password_reset_required: false,
          is_admin: true,
          is_master_admin: directoryUser.isMasterAdmin || false,
        })
        .eq('id', dbUser.id);

      if (updateError) {
        console.error('❌ Failed to update user:', updateError);
        throw new Error(`Failed to update user password: ${updateError.message}`);
      }

      console.log(`✅ Password updated successfully for user: ${userName}`);
    }

    // Log the password setup event
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;
    await logPasswordSetup(dbUser.id, userName, ipAddress, userAgent);

    console.log(`✅ Password set for admin user: ${userName}`);

    const response: SetupPasswordResponse = {
      success: true,
      message: "Password set up successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in setup-password route:", error);
    return NextResponse.json(
      {
        error: "Failed to set up password",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
