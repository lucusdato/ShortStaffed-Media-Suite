import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/core/analytics/supabaseClient";
import type { IdentifyUserRequest, IdentifyUserResponse, User } from "@/core/analytics/types";

/**
 * POST /api/analytics/identify
 * Identify a user and create/update their record in the database
 */
export async function POST(request: NextRequest) {
  try {
    // Log environment variables (safely)
    console.log('🔍 Checking Supabase configuration...');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');

    const body: IdentifyUserRequest = await request.json();

    if (!body.name || !body.role || !body.client) {
      return NextResponse.json(
        { error: "Missing required fields: name, role, client" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    // Check if user already exists
    const { data: existingUsers, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("name", body.name)
      .eq("client", body.client);

    if (fetchError) {
      throw new Error(`Failed to fetch user: ${fetchError.message}`);
    }

    let user: User;

    if (existingUsers && existingUsers.length > 0) {
      // User exists - update last_seen
      const existingUser = existingUsers[0] as any;
      const { data: updatedUser, error: updateError } = await (supabase as any)
        .from("users")
        .update({
          last_seen: new Date().toISOString(),
          role: body.role,
        })
        .eq("id", existingUser.id)
        .select()
        .single();

      if (updateError) {
        throw new Error(`Failed to update user: ${updateError.message}`);
      }

      user = updatedUser as User;
      console.log(`✅ User identified: ${user.name} (${user.role}) - existing user`);
    } else {
      // New user - create record
      const { data: newUser, error: insertError } = await (supabase as any)
        .from("users")
        .insert({
          name: body.name,
          role: body.role,
          client: body.client,
          first_seen: new Date().toISOString(),
          last_seen: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Failed to create user: ${insertError.message}`);
      }

      user = newUser as User;
      console.log(`✅ User identified: ${user.name} (${user.role}) - new user`);
    }

    const response: IdentifyUserResponse = {
      success: true,
      user,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in identify route:", error);

    return NextResponse.json(
      {
        error: "Failed to identify user",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
