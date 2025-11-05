/**
 * Excel Exporter for Taxonomies
 * Exports generated taxonomies to Excel with embedded taxonomy columns
 */

import ExcelJS from 'exceljs';
import { TaxonomyRow } from './types';

/**
 * Export taxonomies to Excel workbook
 * Creates a sheet with all taxonomies embedded as columns
 */
export async function exportTaxonomies(
  rows: TaxonomyRow[],
  sourceFileName?: string,
  exportFormat: 'embedded' | 'platform-sheets' = 'embedded'
): Promise<ArrayBuffer> {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = 'Accutics Taxonomy Generator';
  workbook.created = new Date();
  workbook.modified = new Date();

  if (exportFormat === 'embedded') {
    // Single sheet with all taxonomies
    await createEmbeddedSheet(workbook, rows);
  } else {
    // Separate sheet per platform
    await createPlatformSheets(workbook, rows);
  }

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer as ArrayBuffer;
}

/**
 * Create single sheet with all taxonomies embedded
 */
async function createEmbeddedSheet(workbook: ExcelJS.Workbook, rows: TaxonomyRow[]) {
  const worksheet = workbook.addWorksheet('Taxonomies');

  // Add dynamic taxonomy columns based on platforms
  const platformLevels = new Set<string>();
  rows.forEach(row => {
    row.taxonomies.forEach(tax => {
      platformLevels.add(`${row.platform}:${tax.platformFieldName}`);
    });
  });

  // Build complete column array
  const columns: Partial<ExcelJS.Column>[] = [
    { header: 'Row #', key: 'rowIndex', width: 8 },
    { header: 'Platform', key: 'platform', width: 15 },
    { header: 'Original Tactic', key: 'originalTactic', width: 40 },
    { header: 'Status', key: 'status', width: 12 }
  ];

  // Add columns for each unique platform level
  const levelColumns = Array.from(platformLevels).sort();
  levelColumns.forEach(levelKey => {
    const [platform, fieldName] = levelKey.split(':');
    columns.push({
      header: `${platform} - ${fieldName}`,
      key: levelKey.replace(/:/g, '_').replace(/[^a-zA-Z0-9_]/g, '_'),
      width: 80
    });
  });

  // Set all columns at once
  worksheet.columns = columns;

  // Populate rows
  rows.forEach((row, idx) => {
    const rowData: any = {
      rowIndex: idx + 1,
      platform: row.platform,
      originalTactic: row.originalTactic,
      status: row.inputFields.validationErrors.length === 0 ? '✓ Ready' : '⚠ Review'
    };

    // Add taxonomy values
    row.taxonomies.forEach(tax => {
      const levelKey = `${row.platform}_${tax.platformFieldName}`.replace(/[^a-zA-Z0-9_]/g, '_');
      rowData[levelKey] = tax.taxonomyString;
    });

    worksheet.addRow(rowData);
  });

  // Style header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' }
  };
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };

  // Auto-filter
  worksheet.autoFilter = {
    from: 'A1',
    to: { row: 1, column: worksheet.columnCount }
  };

  // Freeze header row
  worksheet.views = [{ state: 'frozen', ySplit: 1 }];
}

/**
 * Create separate sheet for each platform
 */
async function createPlatformSheets(workbook: ExcelJS.Workbook, rows: TaxonomyRow[]) {
  // Group by platform
  const platformGroups: { [platform: string]: TaxonomyRow[] } = {};
  rows.forEach(row => {
    if (!platformGroups[row.platform]) {
      platformGroups[row.platform] = [];
    }
    platformGroups[row.platform].push(row);
  });

  // Create sheet for each platform
  for (const [platform, platformRows] of Object.entries(platformGroups)) {
    const worksheet = workbook.addWorksheet(platform);

    // Get all taxonomy levels for this platform
    const levels = platformRows[0]?.taxonomies.map(t => t.platformFieldName) || [];

    // Define columns
    const columns: Partial<ExcelJS.Column>[] = [
      { header: 'Row #', key: 'rowIndex', width: 8 },
      { header: 'Original Tactic', key: 'originalTactic', width: 40 },
      { header: 'Status', key: 'status', width: 12 }
    ];

    // Add column for each taxonomy level
    levels.forEach(level => {
      columns.push({
        header: level,
        key: level.replace(/[^a-zA-Z0-9_]/g, '_'),
        width: 80
      });
    });

    worksheet.columns = columns;

    // Populate rows
    platformRows.forEach((row, idx) => {
      const rowData: any = {
        rowIndex: idx + 1,
        originalTactic: row.originalTactic,
        status: row.inputFields.validationErrors.length === 0 ? '✓ Ready' : '⚠ Review'
      };

      // Add taxonomy values
      row.taxonomies.forEach(tax => {
        const key = tax.platformFieldName.replace(/[^a-zA-Z0-9_]/g, '_');
        rowData[key] = tax.taxonomyString;
      });

      worksheet.addRow(rowData);
    });

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' }
    };
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Auto-filter
    worksheet.autoFilter = {
      from: 'A1',
      to: { row: 1, column: worksheet.columnCount }
    };

    // Freeze header row
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
  }
}

/**
 * Generate TSV (tab-separated values) for batch copy
 */
export function generateTSV(rows: TaxonomyRow[]): string {
  const lines: string[] = [];

  // Header row
  const headers = ['Row #', 'Platform', 'Original Tactic'];
  const firstRow = rows[0];
  if (firstRow) {
    firstRow.taxonomies.forEach(tax => {
      headers.push(tax.platformFieldName);
    });
  }
  lines.push(headers.join('\t'));

  // Data rows
  rows.forEach((row, idx) => {
    const cells = [
      String(idx + 1),
      row.platform,
      row.originalTactic
    ];

    row.taxonomies.forEach(tax => {
      cells.push(tax.taxonomyString);
    });

    lines.push(cells.join('\t'));
  });

  return lines.join('\n');
}
