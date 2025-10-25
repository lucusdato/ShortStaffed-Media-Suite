import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/core/analytics/supabaseClient";
import type { TrackFileUploadRequest, TrackFileUploadResponse } from "@/core/analytics/types";

/**
 * POST /api/analytics/track-upload
 * Track a file upload with metadata
 */
export async function POST(request: NextRequest) {
  try {
    const body: TrackFileUploadRequest = await request.json();

    if (!body.user_id || !body.tool_name || !body.filename) {
      return NextResponse.json(
        { error: "Missing required fields: user_id, tool_name, filename" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    // Insert file upload record
    const { data, error } = await (supabase as any)
      .from("file_uploads")
      .insert({
        user_id: body.user_id,
        tool_name: body.tool_name,
        filename: body.filename,
        file_size: body.file_size,
        file_type: body.file_type,
        campaign_name: body.campaign_name,
        brand_name: body.brand_name,
        cn_code: body.cn_code,
        row_count: body.row_count,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to track file upload: ${error.message}`);
    }

    console.log(`📁 File upload tracked: ${body.filename} (${body.tool_name})`);
    if (body.campaign_name) {
      console.log(`   Campaign: ${body.campaign_name} - ${body.brand_name}`);
    }

    const response: TrackFileUploadResponse = {
      success: true,
      upload_id: data.id,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in track-upload route:", error);

    return NextResponse.json(
      {
        error: "Failed to track file upload",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
