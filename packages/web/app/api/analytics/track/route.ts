import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/core/analytics/supabaseClient";
import type { TrackEventRequest, TrackEventResponse } from "@/core/analytics/types";

/**
 * POST /api/analytics/track
 * Track a usage event (page view, action, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const body: TrackEventRequest = await request.json();

    if (!body.user_id || !body.session_id || !body.tool_name || !body.action) {
      return NextResponse.json(
        { error: "Missing required fields: user_id, session_id, tool_name, action" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    // Insert event
    const { data, error } = await (supabase as any)
      .from("tool_usage_events")
      .insert({
        user_id: body.user_id,
        session_id: body.session_id,
        tool_name: body.tool_name,
        action: body.action,
        metadata: body.metadata || {},
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to track event: ${error.message}`);
    }

    console.log(`📊 Event tracked: ${body.tool_name} - ${body.action}`);

    const response: TrackEventResponse = {
      success: true,
      event_id: data.id,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in track route:", error);

    return NextResponse.json(
      {
        error: "Failed to track event",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
