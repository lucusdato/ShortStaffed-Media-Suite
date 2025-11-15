import { NextRequest, NextResponse } from "next/server";
import { BlockingChartParser } from "@quickclick/shared/excel";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const blockingChartFile = formData.get("blockingChart") as File;

    if (!blockingChartFile) {
      return NextResponse.json(
        { error: "Blocking chart file is required" },
        { status: 400 }
      );
    }

    // Convert file to ArrayBuffer
    const blockingChartBuffer = await blockingChartFile.arrayBuffer();

    // Parse the blocking chart using new shared parser
    console.log('📊 Preview - Parsing blocking chart...');
    const parser = new BlockingChartParser();
    const parsedData = await parser.parse(blockingChartBuffer);

    console.log('✅ Preview - Parsed successfully');
    console.log('  Campaign lines:', parsedData.campaignLines.length);
    console.log('  Headers:', parsedData.headers.length);
    console.log('  Validation warnings:', parsedData.validationWarnings?.length || 0);

    // Return the parsed data for preview
    // Provide backward compatibility: frontend expects 'rows' but parser returns 'campaignLines'
    // Filter out null/undefined headers to prevent frontend errors
    const cleanHeaders = parsedData.headers.filter(h => h !== null && h !== undefined && h !== '');

    return NextResponse.json({
      headers: cleanHeaders,
      rows: parsedData.campaignLines, // Map campaignLines to rows for frontend compatibility
      campaignLines: parsedData.campaignLines, // Keep for future use
      metadata: parsedData.metadata,
      validationWarnings: parsedData.validationWarnings,
      rowCount: parsedData.campaignLines.length, // Frontend expects rowCount
      campaignLineCount: parsedData.campaignLines.length,
    });
  } catch (error) {
    console.error("Error previewing blocking chart:", error);
    return NextResponse.json(
      {
        error: "Failed to preview blocking chart",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

