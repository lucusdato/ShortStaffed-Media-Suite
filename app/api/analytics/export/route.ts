import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/core/analytics/supabaseClient";
import type { AnalyticsExportRequest } from "@/core/analytics/types";

/**
 * POST /api/analytics/export
 * Export analytics data as CSV (password protected)
 */
export async function POST(request: NextRequest) {
  try {
    const body: AnalyticsExportRequest = await request.json();

    // Verify password
    const adminPassword = process.env.ANALYTICS_ADMIN_PASSWORD;
    if (!adminPassword || body.password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const supabase = getSupabaseServiceClient();

    // Build date range query
    let startDate = body.start_date;
    let endDate = body.end_date;

    if (!startDate) {
      // Default to 30 days ago
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      startDate = thirtyDaysAgo.toISOString();
    }

    if (!endDate) {
      endDate = new Date().toISOString();
    }

    console.log(`📊 Fetching analytics data from ${startDate} to ${endDate}`);

    // Fetch data with JOINs
    const { data: events, error: eventsError } = await (supabase as any)
      .from("tool_usage_events")
      .select(`
        *,
        users (
          name,
          role,
          client
        )
      `)
      .gte("timestamp", startDate)
      .lte("timestamp", endDate)
      .order("timestamp", { ascending: false });

    if (eventsError) {
      console.error('❌ Failed to fetch events:', eventsError);
      throw new Error(`Failed to fetch events: ${eventsError.message}`);
    }

    console.log(`📊 Fetched ${events?.length || 0} events`);

    const { data: uploads, error: uploadsError} = await (supabase as any)
      .from("file_uploads")
      .select(`
        *,
        users (
          name,
          role,
          client
        )
      `)
      .gte("timestamp", startDate)
      .lte("timestamp", endDate)
      .order("timestamp", { ascending: false });

    if (uploadsError) {
      console.error('❌ Failed to fetch uploads:', uploadsError);
      throw new Error(`Failed to fetch uploads: ${uploadsError.message}`);
    }

    console.log(`📁 Fetched ${uploads?.length || 0} file uploads`);

    // Generate CSV
    const csv = generateCSV(events || [], uploads || []);

    console.log(`✅ Analytics export generated: ${events?.length || 0} events, ${uploads?.length || 0} uploads`);
    console.log(`📄 CSV length: ${csv.length} characters`);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="shortstaffed-analytics-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error in export route:", error);

    return NextResponse.json(
      {
        error: "Failed to export analytics",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Convert UTC timestamp to Toronto Eastern Time
 *
 * @param utcTimestamp - ISO 8601 timestamp from database (e.g., "2024-10-24T14:30:00.000Z")
 * @returns Formatted timestamp in Toronto ET (e.g., "2024-10-24 10:30:00 EDT")
 */
function convertToTorontoTime(utcTimestamp: string): string {
  const date = new Date(utcTimestamp);

  // Convert to Toronto timezone (America/Toronto)
  const torontoTime = date.toLocaleString('en-US', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // Get timezone abbreviation (EST or EDT)
  const timezoneName = date.toLocaleString('en-US', {
    timeZone: 'America/Toronto',
    timeZoneName: 'short'
  }).split(' ').pop();

  // Format: MM/DD/YYYY, HH:MM:SS → YYYY-MM-DD HH:MM:SS
  const [datePart, timePart] = torontoTime.split(', ');
  const [month, day, year] = datePart.split('/');

  return `${year}-${month}-${day} ${timePart} ${timezoneName}`;
}

/**
 * Generate CSV from events and uploads
 */
function generateCSV(events: any[], uploads: any[]): string {
  const lines: string[] = [];

  // Header
  lines.push([
    "Timestamp (Toronto ET)",
    "Type",
    "User Name",
    "User Role",
    "Client",
    "Tool",
    "Action",
    "Filename",
    "File Size (KB)",
    "Brand Name",
    "Error Occurred",
    "Error Details",
  ].join(","));

  // Events
  for (const event of events) {
    const user = event.users as any;
    const metadata = event.metadata || {};
    const isError = event.action === 'error';
    const errorMessage = metadata.error_message || "";
    const errorType = metadata.error_type || "";
    const errorFilename = metadata.filename || "";

    lines.push([
      convertToTorontoTime(event.timestamp),
      "Event",
      user?.name || "Unknown",
      user?.role || "Unknown",
      user?.client || "Unknown",
      event.tool_name,
      event.action,
      errorFilename, // filename (from error metadata)
      "", // file size
      "", // brand name
      isError ? "Yes" : "No", // error occurred
      isError ? `[${errorType}] ${errorMessage}` : "", // error details
    ].map(escapeCSV).join(","));
  }

  // File Uploads
  for (const upload of uploads) {
    const user = upload.users as any;
    const fileSizeKB = upload.file_size ? (upload.file_size / 1024).toFixed(2) : "";
    lines.push([
      convertToTorontoTime(upload.timestamp),
      "File Upload",
      user?.name || "Unknown",
      user?.role || "Unknown",
      user?.client || "Unknown",
      upload.tool_name,
      "file_upload",
      upload.filename,
      fileSizeKB,
      upload.brand_name || "",
      "No", // file uploads themselves are not errors
      "", // error details
    ].map(escapeCSV).join(","));
  }

  return lines.join("\n");
}

/**
 * Escape CSV values
 */
function escapeCSV(value: string | number): string {
  const str = String(value || "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
