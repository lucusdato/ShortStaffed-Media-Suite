import { NextRequest, NextResponse } from 'next/server';
import { generateBlockingChart } from '@/core/excel/generateBlockingChart';
import { Tactic } from '@/core/excel/blockingChartTypes';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tactics }: { tactics: Tactic[] } = body;

    if (!tactics || !Array.isArray(tactics)) {
      return NextResponse.json(
        { error: 'Invalid tactics data' },
        { status: 400 }
      );
    }

    if (tactics.length === 0) {
      return NextResponse.json(
        { error: 'No tactics provided' },
        { status: 400 }
      );
    }

    // Generate Excel file
    const excelBuffer = await generateBlockingChart(tactics);

    // Return Excel file
    return new NextResponse(Buffer.from(excelBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="blocking-chart.xlsx"',
        'Content-Length': excelBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export blocking chart' },
      { status: 500 }
    );
  }
}

