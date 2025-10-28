import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseServiceClient } from "@/core/analytics/supabaseClient";
import { USERS } from "@/core/analytics/userDirectory";
import { checkRateLimit, recordFailedAttempt, resetFailedAttempts, formatTimeRemaining } from "@/core/auth/rateLimiter";
import { createSession } from "@/core/auth/sessionManager";
import { logLoginSuccess, logLoginFailure, logImpersonationStart, logAccountLocked } from "@/core/auth/auditLogger";
import type { VerifyPasswordRequest, VerifyPasswordResponse } from "@/core/analytics/types";

/**
 * POST /api/auth/verify-password
 * Verify admin user password with rate limiting and session creation
 * SECURITY: Implements 5 attempts = 5 minute lockout
 */
export async function POST(request: NextRequest) {
  const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
  const userAgent = request.headers.get('user-agent') || undefined;

  try {
    const body: VerifyPasswordRequest = await request.json();
    const { userName, password, impersonatingUser } = body;

    // Validate userName
    if (!userName) {
      return NextResponse.json(
        { error: "Missing required field: userName" },
        { status: 400 }
      );
    }

    // Find the user in the directory
    const directoryUser = USERS.find(u => u.name === userName);
    if (!directoryUser) {
      await logLoginFailure(userName, 'User not found in directory', ipAddress, userAgent);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Get database connection (moved up to fix initialization issue)
    const supabase = getSupabaseServiceClient();

    // If password is empty, this is just a check to see if user has password set
    if (!password || password.trim() === "") {
      // Check if user exists and has password in database
      const { data: dbUser } = await supabase
        .from('users')
        .select('password_hash')
        .eq('name', userName)
        .single();

      if (!dbUser || !dbUser.password_hash) {
        return NextResponse.json(
          { error: "Password not set for this user" },
          { status: 401 }
        );
      }

      // User has password but didn't provide one
      return NextResponse.json(
        { error: "Password required" },
        { status: 401 }
      );
    }

    if (!directoryUser.isAdmin) {
      await logLoginFailure(userName, 'User is not an admin', ipAddress, userAgent);
      return NextResponse.json(
        { error: "Only admin users can authenticate with password" },
        { status: 403 }
      );
    }

    // Find user in database
    const { data: dbUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('name', userName)
      .single();

    if (fetchError || !dbUser) {
      await logLoginFailure(userName, 'User not found in database', ipAddress, userAgent);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check rate limit
    const rateLimit = await checkRateLimit(dbUser.id);
    if (!rateLimit.allowed) {
      const response: VerifyPasswordResponse = {
        success: false,
        message: `Account locked due to too many failed attempts. Try again in ${formatTimeRemaining(rateLimit.lockedUntil!)}`,
        isLocked: true,
        lockedUntil: rateLimit.lockedUntil?.toISOString(),
        attemptsRemaining: 0,
      };
      return NextResponse.json(response, { status: 429 });
    }

    // Verify password
    let isValid = false;

    if (!dbUser.password_hash) {
      // TEMPORARY FALLBACK for Lucus Dato only (until migration is run)
      if (userName === "Lucus Dato" && password === "Dato1234!") {
        isValid = true;
        console.log("⚠️ Using temporary hardcoded password fallback for Lucus Dato");
      } else {
        await logLoginFailure(userName, 'Password not set', ipAddress, userAgent);
        return NextResponse.json(
          { error: "Password not set for this user" },
          { status: 401 }
        );
      }
    } else {
      isValid = await bcrypt.compare(password, dbUser.password_hash);
    }

    if (!isValid) {
      // Record failed attempt
      const failureInfo = await recordFailedAttempt(dbUser.id);
      await logLoginFailure(userName, `Incorrect password (${failureInfo.attemptsRemaining} attempts remaining)`, ipAddress, userAgent);

      // Log account locked event if locked
      if (failureInfo.isLocked && failureInfo.lockedUntil) {
        await logAccountLocked(dbUser.id, userName, failureInfo.lockedUntil, ipAddress, userAgent);
      }

      const response: VerifyPasswordResponse = {
        success: false,
        message: failureInfo.isLocked
          ? `Account locked due to too many failed attempts. Try again in ${formatTimeRemaining(failureInfo.lockedUntil!)}`
          : `Invalid password. ${failureInfo.attemptsRemaining} attempt${failureInfo.attemptsRemaining === 1 ? '' : 's'} remaining.`,
        attemptsRemaining: failureInfo.attemptsRemaining,
        isLocked: failureInfo.isLocked,
        lockedUntil: failureInfo.lockedUntil?.toISOString(),
      };

      return NextResponse.json(response, { status: 401 });
    }

    // Password is valid - reset failed attempts
    await resetFailedAttempts(dbUser.id);

    // Check if this is an impersonation attempt by Master Admin
    let impersonatingUserId: string | undefined;
    let impersonatingUserName: string | undefined;

    if (impersonatingUser) {
      // Verify the requesting user is Master Admin
      const { data: requestingUser } = await supabase
        .from('users')
        .select('*')
        .eq('name', impersonatingUser)
        .single();

      if (requestingUser?.is_master_admin) {
        impersonatingUserId = dbUser.id;
        impersonatingUserName = dbUser.name;

        // Log impersonation start
        await logImpersonationStart(
          requestingUser.id,
          requestingUser.name,
          dbUser.id,
          dbUser.name,
          ipAddress,
          userAgent
        );
      }
    }

    // Create session
    const session = await createSession({
      userId: dbUser.id,
      userName: dbUser.name,
      userRole: dbUser.role,
      userClient: dbUser.client,
      isMasterAdmin: dbUser.is_master_admin || false,
      impersonatingUserId,
      ipAddress,
      userAgent,
      expiryHours: 24,
    });

    // Log successful login
    await logLoginSuccess(dbUser.id, userName, ipAddress, userAgent);

    console.log(`✅ Admin authenticated: ${userName}${impersonatingUser ? ` (impersonating ${impersonatingUserName})` : ''}`);

    const response: VerifyPasswordResponse = {
      success: true,
      message: "Password verified successfully",
      sessionToken: session.sessionToken,
      userId: session.userId,
      userName: session.userName,
      userRole: session.userRole,
      userClient: session.userClient,
      isMasterAdmin: session.isMasterAdmin,
      expiresAt: session.expiresAt,
      impersonatingUserId: session.impersonatingUserId,
      impersonatingUserName: session.impersonatingUserName,
      attemptsRemaining: 5, // Reset to max
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in verify-password route:", error);
    return NextResponse.json(
      {
        error: "Failed to verify password",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
