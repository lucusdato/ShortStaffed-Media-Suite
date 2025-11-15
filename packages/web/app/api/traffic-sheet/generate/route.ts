import { NextRequest, NextResponse } from "next/server";
import { BlockingChartParser, TrafficSheetGenerator } from "@quickclick/shared/excel";
import path from "path";
import fs from "fs/promises";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const blockingChartFile = formData.get("blockingChart") as File;
    const deletedRowsJson = formData.get("deletedRows") as string | null;

    if (!blockingChartFile) {
      return NextResponse.json(
        { error: "Blocking chart file is required" },
        { status: 400 }
      );
    }

    // Parse deleted rows if provided
    const deletedRows: number[] = deletedRowsJson ? JSON.parse(deletedRowsJson) : [];
    console.log(`🗑️  Deleted rows from frontend: ${deletedRows.length > 0 ? deletedRows.join(', ') : 'none'}`);

    // Convert blocking chart to ArrayBuffer
    const blockingChartBuffer = await blockingChartFile.arrayBuffer();

    // Parse the blocking chart using new shared parser
    console.log('🔄 Generate - Parsing blocking chart...');
    const parser = new BlockingChartParser();
    const parsedData = await parser.parse(blockingChartBuffer);

    console.log('✅ Parsed blocking chart');
    console.log('  Campaign lines:', parsedData.campaignLines.length);
    console.log('  Validation warnings:', parsedData.validationWarnings?.length || 0);

    // Filter out deleted rows if any
    if (deletedRows.length > 0 && parsedData.campaignLines.length > 0) {
      const originalCount = parsedData.campaignLines.length;
      console.log(`🗑️  Original campaign lines: ${originalCount}`);

      parsedData.campaignLines = parsedData.campaignLines.filter((line, index) => {
        const shouldKeep = !deletedRows.includes(index);
        if (!shouldKeep) {
          console.log(`  ❌ Removing campaign line at index ${index}`);
        }
        return shouldKeep;
      });

      console.log(`🗑️  After filtering: ${parsedData.campaignLines.length} (removed ${originalCount - parsedData.campaignLines.length})`);
    }

    // Check if we have any campaign lines to process
    if (parsedData.campaignLines.length === 0) {
      return NextResponse.json(
        { error: 'No campaign lines found in blocking chart' },
        { status: 400 }
      );
    }

    // Load the built-in template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "unilever-traffic-sheet-template.xlsx"
    );

    let templateBuffer: ArrayBuffer | undefined;
    try {
      const templateFile = await fs.readFile(templatePath);
      // Convert Node.js Buffer to ArrayBuffer
      templateBuffer = templateFile.buffer.slice(
        templateFile.byteOffset,
        templateFile.byteOffset + templateFile.byteLength
      ) as ArrayBuffer;
      console.log('✅ Template file read successfully');
    } catch (error) {
      console.warn('⚠️  Failed to read template file, will create from scratch:', error?.message || error);
    }

    // Generate the traffic sheet using new shared generator
    console.log('🏗️  Generating traffic sheet...');
    const generator = new TrafficSheetGenerator();
    const workbook = await generator.generate(parsedData, templateBuffer);

    // Write workbook to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    console.log('✅ Traffic sheet generated successfully');
    console.log('  Buffer size:', buffer.byteLength, 'bytes');

    // Return the generated Excel file
    return new NextResponse(Buffer.from(buffer), {
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

