import { NextRequest, NextResponse } from "next/server";
import { parseBlockingChart, validateBlockingChart } from "@/core/excel/parseBlockingChart";
import { generateTrafficSheetFromHierarchy } from "@/core/excel/generateTrafficSheet";
import path from "path";
import fs from "fs/promises";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const blockingChartFile = formData.get("blockingChart") as File;
    const deletedRowsJson = formData.get("deletedRows") as string | null;
    const manualOverridesJson = formData.get("manualOverrides") as string | null;

    if (!blockingChartFile) {
      return NextResponse.json(
        { error: "Blocking chart file is required" },
        { status: 400 }
      );
    }

    // Parse deleted rows if provided
    const deletedRows: number[] = deletedRowsJson ? JSON.parse(deletedRowsJson) : [];
    console.log(`🗑️  Deleted rows from frontend: ${deletedRows.length > 0 ? deletedRows.join(', ') : 'none'}`);

    // Parse manual overrides if provided
    const manualOverrides: { [key: number]: string } = manualOverridesJson ? JSON.parse(manualOverridesJson) : {};
    console.log(`✏️  Manual overrides from frontend: ${Object.keys(manualOverrides).length > 0 ? Object.keys(manualOverrides).length : 'none'}`);

    // Convert blocking chart to ArrayBuffer
    const blockingChartBuffer = await blockingChartFile.arrayBuffer();

    // Load the built-in template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "unilever-traffic-sheet-template.xlsx"
    );

    let templateBuffer: ArrayBuffer;
    try {
      const templateFile = await fs.readFile(templatePath);
      // Convert Node.js Buffer to ArrayBuffer
      templateBuffer = templateFile.buffer.slice(
        templateFile.byteOffset,
        templateFile.byteOffset + templateFile.byteLength
      ) as ArrayBuffer;
    } catch (error) {
      return NextResponse.json(
        {
          error: "Template file not found",
          details:
            "Please add 'unilever-traffic-sheet-template.xlsx' to the public/templates directory. See public/templates/README.md for instructions.",
        },
        { status: 500 }
      );
    }

    // Parse the blocking chart
    const parsedData = await parseBlockingChart(blockingChartBuffer);

    // Filter out deleted rows if any
    if (deletedRows.length > 0 && parsedData.campaignLines && parsedData.campaignLines.length > 0) {
      const originalCount = parsedData.campaignLines.length;
      console.log(`🗑️  Original campaign lines count: ${originalCount}`);
      console.log(`🗑️  Deleted row indices to remove: [${deletedRows.join(', ')}]`);

      // Filter out deleted campaign lines
      parsedData.campaignLines = parsedData.campaignLines.filter((line, index) => {
        const shouldKeep = !deletedRows.includes(index);
        if (!shouldKeep) {
          console.log(`  ❌ Removing campaign line at index ${index}`);
        }
        return shouldKeep;
      });

      console.log(`🗑️  Filtered campaign lines: ${originalCount} → ${parsedData.campaignLines.length} (removed ${originalCount - parsedData.campaignLines.length})`);

      // Verify no undefined campaign lines
      const hasUndefined = parsedData.campaignLines.some(line => line === undefined || line === null);
      if (hasUndefined) {
        console.error('❌ ERROR: Found undefined campaign lines after filtering!');
        parsedData.campaignLines = parsedData.campaignLines.filter(line => line !== undefined && line !== null);
        console.log(`🔧 Cleaned up undefined entries, new count: ${parsedData.campaignLines.length}`);
      }
    }

    // Skip legacy validation for hierarchical structure (new unified template)
    if (parsedData.campaignLines && parsedData.campaignLines.length > 0) {
      console.log(`✅ Hierarchical structure detected: ${parsedData.campaignLines.length} campaign lines found`);
      console.log('⏭️  Skipping legacy row-by-row validation (not applicable to unified template)');
    } else {
      // Legacy validation for old templates only
      const validation = validateBlockingChart(parsedData);

      // Log validation results
      console.log('📋 Generation - Legacy Validation Results:');
      console.log('  Valid:', validation.valid);
      console.log('  Errors:', validation.errors.length);
      console.log('  Warnings:', validation.warnings.length);

      // Only reject if there are critical errors (not just warnings or summary row errors)
      if (!validation.valid && validation.errors.length > 0) {
        // Check if all errors are from summary/total rows (row 33+)
        const criticalErrors = validation.errors.filter(err => err.rowIndex < 33);

        if (criticalErrors.length > 0) {
          console.error('❌ Validation failed with critical errors:', JSON.stringify(criticalErrors, null, 2));
          return NextResponse.json(
            {
              error: "Invalid blocking chart format",
              details: criticalErrors,
            },
            { status: 400 }
          );
        } else {
          console.log('⚠️  All errors are in summary rows (row 33+), proceeding with generation');
        }
      }
    }

    // Generate the traffic sheet using hierarchical structure
    const trafficSheetBuffer = await generateTrafficSheetFromHierarchy(
      parsedData,
      templateBuffer,
      manualOverrides
    );

    // Return the generated Excel file
    return new NextResponse(Buffer.from(trafficSheetBuffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="traffic-sheet-${Date.now()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating traffic sheet:", error);
    return NextResponse.json(
      {
        error: "Failed to generate traffic sheet",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

