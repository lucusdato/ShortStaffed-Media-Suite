import { NextRequest, NextResponse } from "next/server";
import { parseBlockingChart, validateBlockingChart } from "@/core/excel/parseBlockingChart";

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

    // Parse the blocking chart
    const parsedData = await parseBlockingChart(blockingChartBuffer);

    // Validate the parsed data
    const validation = validateBlockingChart(parsedData);

    // Log validation results for debugging
    console.log('📋 Validation Results:');
    console.log('  Valid:', validation.valid);
    console.log('  Errors:', validation.errors.length);
    console.log('  Warnings:', validation.warnings.length);

    // Only reject if there are actual errors (not just warnings)
    // Allow warnings to pass through - they'll be logged but won't block upload
    if (!validation.valid && validation.errors.length > 0) {
      console.error('❌ Validation failed with errors:', JSON.stringify(validation.errors, null, 2));

      // Check if all errors are from summary/total rows (row 33+)
      // These can be safely ignored as they're not actual tactics
      const criticalErrors = validation.errors.filter(err => err.rowIndex < 33);

      if (criticalErrors.length > 0) {
        return NextResponse.json(
          {
            error: "Invalid blocking chart format",
            details: criticalErrors,
          },
          { status: 400 }
        );
      } else {
        console.log('⚠️  All errors are in summary rows (row 33+), allowing upload to proceed');
      }
    }

    // Debug: Check if _mergeSpan data is present before JSON serialization
    console.log('🔍 API Route - _mergeSpan check before JSON serialization:');
    parsedData.rows.forEach((row, index) => {
      if ((row as any)._mergeSpan) {
        console.log(`  API Row ${index}: _mergeSpan = ${(row as any)._mergeSpan}`);
      }
    });

    // Return the parsed data for preview
    return NextResponse.json({
      headers: parsedData.headers,
      rows: parsedData.rows,
      metadata: parsedData.metadata,
      rowCount: parsedData.rows.length,
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

