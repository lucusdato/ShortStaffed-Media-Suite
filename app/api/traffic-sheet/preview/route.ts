import { NextRequest, NextResponse } from "next/server";
import { parseBlockingChart, validateBlockingChart } from "@/core/excel/parseBlockingChart";
import { findBestTab } from "@/core/excel/tabDetection";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const blockingChartFile = formData.get("blockingChart") as File;
    const tabIndexParam = formData.get("tabIndex") as string | null;

    if (!blockingChartFile) {
      return NextResponse.json(
        { error: "Blocking chart file is required" },
        { status: 400 }
      );
    }

    // Convert file to ArrayBuffer
    const blockingChartBuffer = await blockingChartFile.arrayBuffer();

    // Determine which tab to use
    let selectedTabIndex: number | undefined = undefined;
    let autoDetected = false;
    let availableTabs = null;

    if (tabIndexParam !== null) {
      // User explicitly selected a tab
      selectedTabIndex = parseInt(tabIndexParam, 10);
      autoDetected = false;
      console.log(`📋 User selected tab index: ${selectedTabIndex}`);
    } else {
      // Try auto-detection
      const tabDetection = await findBestTab(blockingChartBuffer);

      if (tabDetection.tabIndex !== null) {
        // Auto-detection succeeded
        selectedTabIndex = tabDetection.tabIndex;
        autoDetected = true;
        console.log(`✅ Auto-detected tab index: ${selectedTabIndex}`);
      } else {
        // Auto-detection failed - return tab list for user selection
        console.log(`⚠️  Auto-detection failed. Returning ${tabDetection.allTabs.length} tabs for user selection.`);
        return NextResponse.json({
          autoDetected: false,
          availableTabs: tabDetection.allTabs,
          needsTabSelection: true,
        });
      }
    }

    // Parse the blocking chart with selected tab
    const parsedData = await parseBlockingChart(blockingChartBuffer, selectedTabIndex);

    // Skip legacy validation for hierarchical structure (new unified template)
    if (parsedData.campaignLines && parsedData.campaignLines.length > 0) {
      console.log(`✅ Hierarchical structure detected: ${parsedData.campaignLines.length} campaign lines found`);
      console.log('⏭️  Skipping legacy row-by-row validation (not applicable to unified template)');
    } else {
      // Legacy validation for old templates only
      const validation = validateBlockingChart(parsedData);

      // Log validation results for debugging
      console.log('📋 Legacy Validation Results:');
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
    }

    // Debug: Check if _mergeSpan data is present before JSON serialization
    console.log('🔍 API Route - _mergeSpan check before JSON serialization:');
    parsedData.rows.forEach((row, index) => {
      if ((row as any)._mergeSpan) {
        console.log(`  API Row ${index}: _mergeSpan = ${(row as any)._mergeSpan}`);
      }
    });

    // For unified template with campaign lines, add campaign line mapping
    let campaignLineMappedRows = parsedData.rows;
    if (parsedData.campaignLines && parsedData.campaignLines.length > 0) {
      // Add a _campaignLineIndex field to each row to map it to a campaign line
      campaignLineMappedRows = parsedData.rows.map((row: any, rowIndex: number) => {
        // Find which campaign line this row belongs to by matching _campaignLineMasterRow
        const campaignLineIndex = parsedData.campaignLines!.findIndex(cl =>
          cl._sourceRowNumbers && cl._sourceRowNumbers.includes(row._campaignLineMasterRow)
        );

        if (campaignLineIndex >= 0) {
          console.log(`  Row ${rowIndex} (masterRow: ${row._campaignLineMasterRow}) → Campaign Line ${campaignLineIndex}`);
        }

        return {
          ...row,
          _campaignLineIndex: campaignLineIndex >= 0 ? campaignLineIndex : undefined
        };
      });
      console.log(`📊 Mapped ${campaignLineMappedRows.length} rows to ${parsedData.campaignLines.length} campaign lines`);
    }

    // Return the parsed data for preview
    return NextResponse.json({
      headers: parsedData.headers,
      rows: campaignLineMappedRows,
      metadata: parsedData.metadata,
      rowCount: campaignLineMappedRows.length,
      autoDetected,
      selectedTabIndex,
      campaignLineCount: parsedData.campaignLines?.length || 0,
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

