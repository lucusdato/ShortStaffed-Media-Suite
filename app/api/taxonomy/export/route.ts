import { NextRequest, NextResponse } from "next/server";
import { exportTaxonomies } from "@/core/taxonomy/excelExporter";
import { ExportTaxonomiesRequest } from "@/core/taxonomy/types";

/**
 * POST /api/taxonomy/export
 * Export taxonomies to Excel workbook with 3 sheets
 */
export async function POST(request: NextRequest) {
  try {
    const body: ExportTaxonomiesRequest = await request.json();

    if (!body.rows || body.rows.length === 0) {
      return NextResponse.json(
        { error: "No taxonomy data provided" },
        { status: 400 }
      );
    }

    console.log(`📤 Exporting ${body.rows.length} taxonomies to Excel`);

    // Generate Excel file
    const excelBuffer = await exportTaxonomies(body.rows, body.sourceFileName);

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
