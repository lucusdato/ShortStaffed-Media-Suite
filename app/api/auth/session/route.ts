import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/core/auth/sessionManager";
import type { ValidateSessionRequest, ValidateSessionResponse } from "@/core/analytics/types";

/**
 * POST /api/auth/session
 * Validate a session token and return session info
 */
export async function POST(request: NextRequest) {
  try {
    const body: ValidateSessionRequest = await request.json();
    const { sessionToken } = body;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Missing session token" },
        { status: 400 }
      );
    }

    // Validate the session
    const session = await validateSession(sessionToken);

    if (!session) {
      const response: ValidateSessionResponse = {
        valid: false,
      };
      return NextResponse.json(response);
    }

    const response: ValidateSessionResponse = {
      valid: true,
      userId: session.userId,
      userName: session.userName,
      userRole: session.userRole,
      userClient: session.userClient,
      isMasterAdmin: session.isMasterAdmin,
      expiresAt: session.expiresAt,
      impersonatingUserId: session.impersonatingUserId,
      impersonatingUserName: session.impersonatingUserName,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in session validation route:", error);
    return NextResponse.json(
      {
        error: "Failed to validate session",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
