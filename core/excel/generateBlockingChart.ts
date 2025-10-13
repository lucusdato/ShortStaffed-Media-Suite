/**
 * Generate Excel blocking chart from tactics data
 */

import ExcelJS from 'exceljs';
import { Tactic, Audience, ExcelRowData } from './blockingChartTypes';

export async function generateBlockingChart(tactics: Tactic[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Blocking Chart');

  // Define column headers
  const headers = [
    'Channel',
    'Tactic', 
    'Accutics Campaign Name',
    'Platform',
    'Objective',
    'Placements',
    'Optimization KPI',
    'Demo',
    'Targeting',
    'Language',
    'Accutics Ad Set Name',
    'CPM/CPP',
    'Impressions/GRPs',
    'Start Date',
    'End Date',
    'Media Cost',
    'Ad Serving',
    'DV Cost',
    'Media Fee Total',
    'Working Media Budget'
  ];

  // Add headers to row 1
  const headerRow = worksheet.addRow(headers);
  
  // Style the header row
  headerRow.eachCell((cell, colNumber) => {
    cell.style = {
      font: { bold: true, color: { argb: 'FFFFFFFF' } },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } },
      alignment: { horizontal: 'center', vertical: 'middle' },
      border: {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } }
      }
    };
  });

  // Set column widths
  const columnWidths = [12, 20, 20, 15, 12, 15, 15, 10, 20, 12, 20, 10, 15, 12, 12, 12, 12, 12, 15, 18];
  columnWidths.forEach((width, index) => {
    worksheet.getColumn(index + 1).width = width;
  });

  // Convert tactics to Excel rows
  const excelRows: ExcelRowData[] = [];
  let currentRow = 2; // Start after header

  tactics.forEach((tactic, tacticIndex) => {
    if (tactic.audiences.length === 0) return;

    // For tactics with multiple audiences, we need to handle merged cells
    const isMultiAudience = tactic.audiences.length > 1;
    
    tactic.audiences.forEach((audience, audienceIndex) => {
      const rowData: ExcelRowData = {
        channel: tactic.channel,
        tactic: tactic.tactic,
        accuticsCampaignName: tactic.accuticsCampaignName,
        platform: tactic.platform,
        objective: tactic.objective,
        placements: tactic.placements,
        optimizationKpi: tactic.optimizationKpi,
        demo: audience.demo,
        targeting: audience.targeting,
        language: audience.language,
        accuticsAdSetName: audience.accuticsAdSetName,
        cpmCpp: audience.cpmCpp,
        impressionsGrps: audience.impressionsGrps,
        startDate: tactic.startDate,
        endDate: tactic.endDate,
        mediaCost: tactic.mediaCost,
        adServing: audience.adServing,
        dvCost: audience.dvCost,
        mediaFeeTotal: audience.mediaFeeTotal,
        workingMediaBudget: audience.workingMediaBudget,
      };

      // Mark merge information for Media Cost column
      if (isMultiAudience) {
        if (audienceIndex === 0) {
          rowData._isMasterRow = true;
          rowData._mergeSpan = tactic.audiences.length;
        }
      } else {
        rowData._mergeSpan = 1;
      }

      excelRows.push(rowData);
    });
  });

  // Add data rows to worksheet
  excelRows.forEach((rowData) => {
    const row = worksheet.addRow([
      rowData.channel,
      rowData.tactic,
      rowData.accuticsCampaignName,
      rowData.platform,
      rowData.objective,
      rowData.placements,
      rowData.optimizationKpi,
      rowData.demo,
      rowData.targeting,
      rowData.language,
      rowData.accuticsAdSetName,
      rowData.cpmCpp,
      rowData.impressionsGrps,
      rowData.startDate,
      rowData.endDate,
      rowData.mediaCost,
      rowData.adServing,
      rowData.dvCost,
      rowData.mediaFeeTotal,
      rowData.workingMediaBudget,
    ]);

    // Style data rows
    row.eachCell((cell, colNumber) => {
      cell.style = {
        border: {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          left: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } },
          right: { style: 'thin', color: { argb: 'FF000000' } }
        },
        alignment: { vertical: 'middle' }
      };

      // Format currency columns
      const currencyColumns = [11, 15, 16, 17, 18, 19, 20]; // CPM/CPP, Media Cost, Ad Serving, DV Cost, Media Fee Total, Working Media Budget
      if (currencyColumns.includes(colNumber) && cell.value !== null && cell.value !== undefined) {
        cell.numFmt = '$#,##0.00';
      }

      // Format number columns
      const numberColumns = [12]; // Impressions/GRPs
      if (numberColumns.includes(colNumber) && cell.value !== null && cell.value !== undefined) {
        cell.numFmt = '#,##0';
      }

      // Format date columns
      const dateColumns = [13, 14]; // Start Date, End Date
      if (dateColumns.includes(colNumber) && cell.value !== null && cell.value !== undefined) {
        cell.numFmt = 'mm/dd/yyyy';
      }
    });
  });

  // Handle merged cells for Media Cost column (column P = 16)
  const mediaCostColumn = 16;
  let mergeStartRow = 2;
  let currentTacticAudienceCount = 0;

  tactics.forEach((tactic, tacticIndex) => {
    if (tactic.audiences.length > 1) {
      // This tactic has multiple audiences, merge the Media Cost cells
      const mergeEndRow = mergeStartRow + tactic.audiences.length - 1;
      
      try {
        const mergeRange = `${String.fromCharCode(64 + mediaCostColumn)}${mergeStartRow}:${String.fromCharCode(64 + mediaCostColumn)}${mergeEndRow}`;
        worksheet.mergeCells(mergeRange);
        
        // Center the merged cell content
        const masterCell = worksheet.getCell(mergeStartRow, mediaCostColumn);
        masterCell.style.alignment = { ...masterCell.style.alignment, horizontal: 'center' };
      } catch (error) {
        console.warn(`Could not merge Media Cost cells for tactic ${tacticIndex + 1}:`, error);
      }
    }
    
    mergeStartRow += tactic.audiences.length;
  });

  // Add totals row
  const totalsRowIndex = worksheet.rowCount + 1;
  const totalsRow = worksheet.addRow([
    'TOTALS',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '', // CPM/CPP (no total)
    `=SUM(M2:M${totalsRowIndex - 1})`, // Impressions/GRPs
    '',
    '',
    `=SUM(P2:P${totalsRowIndex - 1})`, // Media Cost
    `=SUM(Q2:Q${totalsRowIndex - 1})`, // Ad Serving
    `=SUM(R2:R${totalsRowIndex - 1})`, // DV Cost
    `=SUM(S2:S${totalsRowIndex - 1})`, // Media Fee Total
    `=SUM(T2:T${totalsRowIndex - 1})`, // Working Media Budget
  ]);

  // Style totals row
  totalsRow.eachCell((cell, colNumber) => {
    cell.style = {
      font: { bold: true },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } },
      border: {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } }
      },
      alignment: { horizontal: 'center', vertical: 'middle' }
    };

    // Format currency columns in totals
    const currencyColumns = [15, 16, 17, 18, 19, 20]; // Media Cost, Ad Serving, DV Cost, Media Fee Total, Working Media Budget
    if (currencyColumns.includes(colNumber)) {
      cell.numFmt = '$#,##0.00';
    }

    // Format number columns in totals
    const numberColumns = [12]; // Impressions/GRPs
    if (numberColumns.includes(colNumber)) {
      cell.numFmt = '#,##0';
    }
  });

  // Add variance check row (blank for user to fill)
  const varianceRowIndex = worksheet.rowCount + 1;
  const varianceRow = worksheet.addRow([
    'VARIANCE CHECK',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  // Style variance row
  varianceRow.eachCell((cell, colNumber) => {
    cell.style = {
      font: { italic: true, color: { argb: 'FF666666' } },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF9F9F9' } },
      border: {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } }
      },
      alignment: { horizontal: 'center', vertical: 'middle' }
    };
  });

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

