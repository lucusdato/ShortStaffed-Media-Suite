import { NextRequest, NextResponse } from "next/server";
import { invalidateSession } from "@/core/auth/sessionManager";
import { logLogout, logImpersonationEnd } from "@/core/auth/auditLogger";
import { getSupabaseServiceClient } from "@/core/analytics/supabaseClient";
import type { LogoutRequest, LogoutResponse } from "@/core/analytics/types";

/**
 * POST /api/auth/logout
 * Invalidate user session and log out
 */
export async function POST(request: NextRequest) {
  const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    const body: LogoutRequest = await request.json();
    const { sessionToken } = body;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Missing session token" },
        { status: 400 }
      );
    }

    // Get session info before invalidating (for logging)
    const supabase = getSupabaseServiceClient();
    const { data: session } = await supabase
      .from('session_tokens')
      .select(`
        *,
        user:users!session_tokens_user_id_fkey(id, name),
        impersonated_user:users!session_tokens_impersonating_user_id_fkey(name)
      `)
      .eq('session_token', sessionToken)
      .single();

    if (session) {
      const user = Array.isArray(session.user) ? session.user[0] : session.user;
      const impersonatedUser = session.impersonated_user
        ? (Array.isArray(session.impersonated_user) ? session.impersonated_user[0] : session.impersonated_user)
        : null;

      // Log impersonation end if was impersonating
      if (impersonatedUser) {
        await logImpersonationEnd(
          user.id,
          user.name,
          impersonatedUser.name,
          ipAddress,
          userAgent
        );
      }

      // Log logout
      await logLogout(user.id, user.name, ipAddress, userAgent);
    }

    // Invalidate the session
    await invalidateSession(sessionToken);

    console.log(`✅ User logged out successfully`);

    const response: LogoutResponse = {
      success: true,
      message: "Logged out successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in logout route:", error);
    return NextResponse.json(
      {
        error: "Failed to log out",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
