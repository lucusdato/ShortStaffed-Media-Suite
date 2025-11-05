import { NextRequest, NextResponse } from "next/server";
import { processBlockingChart, processTrafficSheet, processBothInputs } from "@/core/taxonomy/inputProcessor";
import { UserMetadata, ParseTaxonomyResponse } from "@/core/taxonomy/types";

/**
 * POST /api/taxonomy/parse
 * Parse uploaded blocking chart and/or traffic sheet with user metadata
 * Returns taxonomies for all detected platforms
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract user metadata
    const cnCode = formData.get("cnCode") as string;
    const marketName = formData.get("marketName") as string;
    const countryCode = formData.get("countryCode") as string;
    const brandName = formData.get("brandName") as string;
    const campaignName = formData.get("campaignName") as string;

    // Validate user metadata
    if (!cnCode || !marketName || !countryCode || !brandName || !campaignName) {
      return NextResponse.json(
        {
          error: "Missing required metadata",
          details: "CN Code, Market Name, Country Code, Brand Name, and Campaign Name are all required"
        },
        { status: 400 }
      );
    }

    const userMetadata: UserMetadata = {
      cnCode,
      marketName,
      countryCode,
      brandName,
      campaignName
    };

    // Extract files
    const blockingChartFile = formData.get("blockingChart") as File | null;
    const trafficSheetFile = formData.get("trafficSheet") as File | null;

    // Validate at least one file is provided
    if (!blockingChartFile && !trafficSheetFile) {
      return NextResponse.json(
        {
          error: "No files provided",
          details: "Please upload at least a blocking chart or traffic sheet"
        },
        { status: 400 }
      );
    }

    console.log('📋 Processing taxonomy generation:');
    console.log('  User Metadata:', userMetadata);
    console.log('  Blocking Chart:', blockingChartFile?.name || 'Not provided');
    console.log('  Traffic Sheet:', trafficSheetFile?.name || 'Not provided');

    let rows: any[] = [];

    // Process files
    if (blockingChartFile && trafficSheetFile) {
      // Both files provided - merge data
      const blockingBuffer = Buffer.from(await blockingChartFile.arrayBuffer());
      const trafficBuffer = Buffer.from(await trafficSheetFile.arrayBuffer());
      rows = await processBothInputs(blockingBuffer, trafficBuffer, userMetadata);
    } else if (blockingChartFile) {
      // Only blocking chart
      const buffer = Buffer.from(await blockingChartFile.arrayBuffer());
      rows = await processBlockingChart(buffer, userMetadata);
    } else if (trafficSheetFile) {
      // Only traffic sheet
      const buffer = Buffer.from(await trafficSheetFile.arrayBuffer());
      rows = await processTrafficSheet(buffer, userMetadata);
    }

    // Calculate platform breakdown
    const platformBreakdown: { [platform: string]: number } = {};
    for (const row of rows) {
      platformBreakdown[row.platform] = (platformBreakdown[row.platform] || 0) + 1;
    }

    const response: ParseTaxonomyResponse = {
      rows,
      platformBreakdown,
      totalRows: rows.length
    };

    console.log(`✅ Successfully processed ${rows.length} tactics across ${Object.keys(platformBreakdown).length} platforms`);
    console.log('  Platform breakdown:', platformBreakdown);

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error in taxonomy parse:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to process files",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
