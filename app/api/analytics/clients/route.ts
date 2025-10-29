import { NextRequest, NextResponse } from "next/server";
import { USERS } from "@/core/analytics/userDirectory";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

/**
 * GET /api/analytics/clients
 * Get all unique clients from the directory
 */
export async function GET() {
  try {
    const clients = new Set(USERS.map((user) => user.client));
    return NextResponse.json({
      success: true,
      clients: Array.from(clients).sort(),
    });
  } catch (error) {
    console.error("Error in clients GET route:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch clients",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/analytics/clients
 * Validate a new client option (admin only)
 * Note: Clients don't need to be pre-registered. They'll appear in dropdowns
 * automatically once used in a user entry. This endpoint just validates admin access.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client, requestingUser } = body;

    // Validate required fields
    if (!client) {
      return NextResponse.json(
        { error: "Missing required field: client" },
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
        { error: "Unauthorized: Only admins can add clients" },
        { status: 403 }
      );
    }

    console.log(`✅ Client validated for use: ${client}`);

    return NextResponse.json({
      success: true,
      client,
      message: "Client is ready to use. It will appear in dropdowns once used in a user entry.",
    });
  } catch (error) {
    console.error("Error in clients POST route:", error);
    return NextResponse.json(
      {
        error: "Failed to validate client",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
