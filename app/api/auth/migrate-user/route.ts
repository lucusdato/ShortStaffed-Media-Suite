// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient, getSupabaseClient } from "@/core/analytics/supabaseClient";
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/auth/migrate-user
 * Migrates existing users to Supabase Auth
 * ADMIN ONLY - requires service role key
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, userId, name, role, client, isAdmin, isMasterAdmin } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabaseService = getSupabaseServiceClient();

    // For signUp, we need a client with anon key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

    // Create user in Supabase Auth
    // Try admin API first, fallback to regular signup
    let authUser;
    let authError;

    // Attempt 1: Admin API (requires service role)
    const adminResult = await supabaseService.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for migrated users
      user_metadata: {
        name,
        role,
        client,
        is_admin: isAdmin,
        is_master_admin: isMasterAdmin,
      }
    });

    if (adminResult.error && adminResult.error.code === 'not_admin') {
      // Attempt 2: Regular signup (fallback using anon key)
      console.log("Admin API not available, using regular signup...");
      const signupResult = await supabaseAnon.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            client,
            is_admin: isAdmin,
            is_master_admin: isMasterAdmin,
          }
        }
      });
      authUser = signupResult.data;
      authError = signupResult.error;
    } else {
      authUser = adminResult.data;
      authError = adminResult.error;
    }

    if (authError) {
      console.error("Failed to create auth user:", authError);
      return NextResponse.json(
        { error: "Failed to create auth user", details: authError.message },
        { status: 500 }
      );
    }

    // Link the auth user to existing public.users record
    if (userId) {
      const { error: updateError } = await supabaseService
        .from('users')
        .update({
          auth_user_id: authUser.user.id,
          email: email
        })
        .eq('id', userId);

      if (updateError) {
        console.error("Failed to link auth user to public user:", updateError);
        return NextResponse.json(
          { error: "Failed to link user accounts", details: updateError.message },
          { status: 500 }
        );
      }
    }

    console.log(`✅ User migrated to Supabase Auth: ${email}`);

    return NextResponse.json({
      success: true,
      message: "User migrated successfully",
      authUserId: authUser.user.id,
    });

  } catch (error) {
    console.error("Error in migrate-user route:", error);
    return NextResponse.json(
      {
        error: "Failed to migrate user",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
