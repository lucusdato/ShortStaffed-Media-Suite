import { NextRequest, NextResponse } from "next/server";
import { parseTrafficSheet, filterByPlatform } from "@/core/taxonomy/trafficSheetParser";
import { mapTrafficSheetToTaxonomy } from "@/core/taxonomy/fieldMapper";
import { applySmartDefaults } from "@/core/taxonomy/smartDefaults";
import { generateTradeDesk, validateTaxonomyData } from "@/core/taxonomy/taxonomyGenerator";
import { TaxonomyRow, ParseTrafficSheetResponse } from "@/core/taxonomy/types";

/**
 * POST /api/taxonomy/parse
 * Parse uploaded traffic sheet and return TradeDesk taxonomies with smart defaults
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const trafficSheetFile = formData.get("trafficSheet") as File;

    if (!trafficSheetFile) {
      return NextResponse.json(
        { error: "Traffic sheet file is required" },
        { status: 400 }
      );
    }

    console.log('📋 Parsing traffic sheet:', trafficSheetFile.name);

    // Convert to ArrayBuffer
    const fileBuffer = await trafficSheetFile.arrayBuffer();

    // Parse traffic sheet
    const allRows = await parseTrafficSheet(fileBuffer);
    console.log(`📋 Total rows parsed: ${allRows.length}`);

    // Filter for TradeDesk platform
    const tradeDeskRows = filterByPlatform(allRows, 'TradeDesk');
    console.log(`📋 TradeDesk rows found: ${tradeDeskRows.length}`);

    if (tradeDeskRows.length === 0) {
      return NextResponse.json(
        {
          error: "No TradeDesk tactics found in traffic sheet",
          details: "Please ensure the traffic sheet has a 'Platform' column with 'TradeDesk' values."
        },
        { status: 400 }
      );
    }

    // Process each TradeDesk row
    const taxonomyRows: TaxonomyRow[] = tradeDeskRows.map((row, index) => {
      // Step 1: Extract fields from traffic sheet
      const extractedFields = mapTrafficSheetToTaxonomy(row);

      // Step 2: Apply smart defaults for missing fields
      const completeData = applySmartDefaults(extractedFields, row);

      // Step 3: Generate taxonomies
      const taxonomies = generateTradeDesk(completeData);

      // Step 4: Validate
      const validationErrors = validateTaxonomyData(completeData);

      // Build complete TaxonomyRow
      const taxonomyRow: TaxonomyRow = {
        ...completeData,
        rowIndex: index,
        platform: 'TradeDesk',
        originalTactic: row.tactic || `Row ${index + 1}`,
        taxonomies,
        validationErrors
      };

      return taxonomyRow;
    });

    // Prepare response
    const response: ParseTrafficSheetResponse = {
      tradeDeskRows: taxonomyRows,
      totalRows: allRows.length,
      tradeDeskCount: tradeDeskRows.length
    };

    console.log(`✅ Successfully processed ${tradeDeskRows.length} TradeDesk taxonomies`);

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error parsing traffic sheet:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to parse traffic sheet",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
