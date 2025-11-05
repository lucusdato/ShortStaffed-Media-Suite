import { NextRequest, NextResponse } from "next/server";
import { USERS } from "@/core/analytics/userDirectory";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

/**
 * GET /api/analytics/roles
 * Get all unique roles from the directory
 */
export async function GET() {
  try {
    const roles = new Set(USERS.map((user) => user.role));
    return NextResponse.json({
      success: true,
      roles: Array.from(roles).sort(),
    });
  } catch (error) {
    console.error("Error in roles GET route:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch roles",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/analytics/roles
 * Validate a new role option (admin only)
 * Note: Roles don't need to be pre-registered. They'll appear in dropdowns
 * automatically once used in a user entry. This endpoint just validates admin access.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, requestingUser } = body;

    // Validate required fields
    if (!role) {
      return NextResponse.json(
        { error: "Missing required field: role" },
        { status: 400 }
      );
    }

    // Verify requesting user is admin
    if (!requestingUser) {
      return NextResponse.json(
        { error: "Requesting user not specified" },
        { status: 401 }
      );
    }

    const requestingUserEntry = USERS.find(u => u.name === requestingUser);
    if (!requestingUserEntry || !requestingUserEntry.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized: Only admins can add roles" },
        { status: 403 }
      );
    }

    console.log(`✅ Role validated for use: ${role}`);

    return NextResponse.json({
      success: true,
      role,
      message: "Role is ready to use. It will appear in dropdowns once used in a user entry.",
    });
  } catch (error) {
    console.error("Error in roles POST route:", error);
    return NextResponse.json(
      {
        error: "Failed to validate role",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
