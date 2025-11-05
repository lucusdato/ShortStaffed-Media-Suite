import { NextRequest, NextResponse } from "next/server";
import { USERS } from "@/core/analytics/userDirectory";
import type { UserDirectoryEntry } from "@/core/analytics/userDirectory";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

/**
 * GET /api/analytics/directory
 * Get all users from the directory
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      users: USERS,
    });
  } catch (error) {
    console.error("Error in directory GET route:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch user directory",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/analytics/directory
 * Add a new user to the directory (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, client, isAdmin, requestingUser } = body;

    // Validate required fields
    if (!name || !role || !client) {
      return NextResponse.json(
        { error: "Missing required fields: name, role, client" },
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
        { error: "Unauthorized: Only admins can add users" },
        { status: 403 }
      );
    }

    // Check if user already exists
    const existingUser = USERS.find(
      u => u.name.toLowerCase() === name.toLowerCase() && u.client === client
    );
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists in directory" },
        { status: 409 }
      );
    }

    // Read the current userDirectory.ts file
    const filePath = join(process.cwd(), "core/analytics/userDirectory.ts");
    const fileContent = await readFile(filePath, "utf-8");

    // Create new user entry
    const newUserLine = `  { name: "${name}", role: "${role}", client: "${client}"${isAdmin ? ', isAdmin: true' : ''} },`;

    // Find the line with "ADD NEW USERS BELOW THIS LINE"
    const lines = fileContent.split("\n");
    const insertIndex = lines.findIndex(line =>
      line.includes("ADD NEW USERS BELOW THIS LINE")
    );

    if (insertIndex === -1) {
      return NextResponse.json(
        { error: "Could not find insertion point in userDirectory.ts" },
        { status: 500 }
      );
    }

    // Insert the new user after the comment line
    // Skip the next line which is the example comment
    lines.splice(insertIndex + 3, 0, newUserLine);

    // Write the updated content back to the file
    const updatedContent = lines.join("\n");
    await writeFile(filePath, updatedContent, "utf-8");

    console.log(`✅ User added to directory: ${name} (${role}) - ${client}`);

    return NextResponse.json({
      success: true,
      user: { name, role, client, isAdmin: isAdmin || false },
    });
  } catch (error) {
    console.error("Error in directory POST route:", error);
    return NextResponse.json(
      {
        error: "Failed to add user to directory",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/analytics/directory
 * Remove a user from the directory (admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, client, requestingUser, isMasterAdmin } = body;

    // Validate required fields
    if (!name || !client || !requestingUser) {
      return NextResponse.json(
        { error: "Missing required fields: name, client, requestingUser" },
        { status: 400 }
      );
    }

    // Verify requesting user is admin
    const requestingUserEntry = USERS.find(u => u.name === requestingUser);
    if (!requestingUserEntry || !requestingUserEntry.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized: Only admins can delete users" },
        { status: 403 }
      );
    }

    // Find the user to delete
    const userToDelete = USERS.find(
      u => u.name === name && u.client === client
    );

    if (!userToDelete) {
      return NextResponse.json(
        { error: "User not found in directory" },
        { status: 404 }
      );
    }

    // Only master admin can delete admin users
    if (userToDelete.isAdmin && !isMasterAdmin) {
      return NextResponse.json(
        { error: "Unauthorized: Only Master Admin can delete admin users" },
        { status: 403 }
      );
    }

    // Prevent deleting yourself
    if (userToDelete.name === requestingUser) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 403 }
      );
    }

    // Read the current userDirectory.ts file
    const filePath = join(process.cwd(), "core/analytics/userDirectory.ts");
    const fileContent = await readFile(filePath, "utf-8");

    // Split into lines
    const lines = fileContent.split("\n");

    // Find and remove the user's line
    // Look for the line that contains the user's name and client
    const linePattern = new RegExp(
      `\\{\\s*name:\\s*"${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}".*client:\\s*"${client.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}".*\\}`,
      "i"
    );

    const filteredLines = lines.filter(line => !linePattern.test(line));

    if (filteredLines.length === lines.length) {
      return NextResponse.json(
        { error: "User entry not found in file" },
        { status: 404 }
      );
    }

    // Write the updated content back to the file
    const updatedContent = filteredLines.join("\n");
    await writeFile(filePath, updatedContent, "utf-8");

    console.log(`✅ User removed from directory: ${name} - ${client}`);

    return NextResponse.json({
      success: true,
      message: `User ${name} has been removed from the directory`,
    });
  } catch (error) {
    console.error("Error in directory DELETE route:", error);
    return NextResponse.json(
      {
        error: "Failed to delete user from directory",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
