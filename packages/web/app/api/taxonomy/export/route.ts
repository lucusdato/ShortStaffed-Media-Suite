import { NextRequest, NextResponse } from "next/server";
import { exportTaxonomies, generateTSV } from "@/core/taxonomy/excelExporter";
import { ExportTaxonomyRequest } from "@/core/taxonomy/types";

/**
 * POST /api/taxonomy/export
 * Export taxonomies to Excel workbook or TSV
 */
export async function POST(request: NextRequest) {
  try {
    const body: ExportTaxonomyRequest = await request.json();

    if (!body.rows || body.rows.length === 0) {
      return NextResponse.json(
        { error: "No taxonomy data provided" },
        { status: 400 }
      );
    }

    console.log(`📤 Exporting ${body.rows.length} taxonomies`);
    console.log(`  Format: ${body.exportFormat || 'embedded'}`);

    // Handle copy-only format (returns TSV)
    if (body.exportFormat === 'copy-only') {
      const tsv = generateTSV(body.rows);
      return NextResponse.json({ tsv }, { status: 200 });
    }

    // Generate Excel file
    const excelBuffer = await exportTaxonomies(
      body.rows,
      body.sourceFileName,
      body.exportFormat || 'embedded'
    );

    // Return as downloadable file
    return new NextResponse(Buffer.from(excelBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="accutics-taxonomies-${Date.now()}.xlsx"`
      }
    });

  } catch (error) {
    console.error("Error exporting taxonomies:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to export taxonomies",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
