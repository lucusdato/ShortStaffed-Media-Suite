/**
 * Traffic Sheet Parser
 * Parses uploaded traffic sheet Excel files and extracts relevant data
 */

import ExcelJS from 'exceljs';
import { ParsedTrafficSheetRow } from './types';

/**
 * Parse traffic sheet Excel file and extract all rows
 */
export async function parseTrafficSheet(fileBuffer: ArrayBuffer): Promise<ParsedTrafficSheetRow[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(fileBuffer);

  // Get first worksheet (assuming traffic sheet is in first sheet)
  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error('No worksheet found in Excel file');
  }

  // Find header row and extract column names
  const { headerRow, headers } = findHeaderRow(worksheet);
  if (!headers || headers.length === 0) {
    throw new Error('Could not find header row in traffic sheet');
  }

  console.log('📋 Traffic Sheet Parser - Found headers:', headers);

  // Normalize header names for easier matching
  const normalizedHeaders = headers.map(h => normalizeHeaderName(h));

  // Find platform column index
  const platformColIndex = findPlatformColumn(normalizedHeaders);
  if (platformColIndex === -1) {
    throw new Error('Could not find Platform column in traffic sheet. Please ensure the traffic sheet has a "Platform" column.');
  }

  console.log(`📋 Platform column found at index ${platformColIndex}: "${headers[platformColIndex]}"`);

  // Extract all data rows
  const rows: ParsedTrafficSheetRow[] = [];
  let rowIndex = 0;

  worksheet.eachRow((row, rowNumber) => {
    // Skip rows before header
    if (rowNumber <= headerRow) {
      return;
    }

    // Extract row data
    const rowData: any = { rowIndex: rowIndex++ };

    row.eachCell((cell, colNumber) => {
      const colIndex = colNumber - 1; // Convert to 0-based index
      if (colIndex >= headers.length) {
        return; // Skip columns beyond header
      }

      const headerName = headers[colIndex];
      const normalizedHeader = normalizedHeaders[colIndex];
      let value = cell.value;

      // Extract actual value from rich text or formula cells
      if (value && typeof value === 'object') {
        if ((value as any).richText) {
          value = (value as any).richText.map((rt: any) => rt.text).join('');
        } else if ((value as any).result !== undefined) {
          value = (value as any).result;
        } else if ((value as any).value !== undefined) {
          value = (value as any).value;
        }
      }

      // Store value with both original and normalized header names
      rowData[normalizedHeader] = value;
      rowData[headerName] = value;
    });

    // Only include rows that have a platform value
    const platformValue = rowData[normalizedHeaders[platformColIndex]];
    if (platformValue && String(platformValue).trim() !== '') {
      rowData.platform = String(platformValue).trim();
      rows.push(rowData as ParsedTrafficSheetRow);
    }
  });

  console.log(`📋 Traffic Sheet Parser - Extracted ${rows.length} total rows`);

  // Log unique platform values for debugging
  const uniquePlatforms = [...new Set(rows.map(r => r.platform))];
  console.log(`📋 Unique platforms found:`, uniquePlatforms);

  return rows;
}

/**
 * Filter rows for specific platform
 * Handles variations like "TradeDesk", "The Trade Desk", "Trade Desk"
 */
export function filterByPlatform(rows: ParsedTrafficSheetRow[], platform: string): ParsedTrafficSheetRow[] {
  // Normalize the search term by removing spaces and "the"
  const normalizedSearch = platform.toLowerCase().replace(/\s+/g, '').replace(/^the/, '');

  const filtered = rows.filter(row => {
    if (!row.platform) return false;

    // Normalize the row platform value the same way
    const normalizedPlatform = row.platform.toLowerCase().replace(/\s+/g, '').replace(/^the/, '');

    return normalizedPlatform.includes(normalizedSearch);
  });

  console.log(`📋 Filtered for platform "${platform}": ${filtered.length} rows found`);

  return filtered;
}

/**
 * Find header row in worksheet
 * Looks for row with multiple non-empty cells that look like headers
 */
function findHeaderRow(worksheet: ExcelJS.Worksheet): { headerRow: number; headers: string[] } {
  let headerRow = 0;
  let headers: string[] = [];

  // Check first 20 rows for header row
  for (let rowNum = 1; rowNum <= Math.min(20, worksheet.rowCount); rowNum++) {
    const row = worksheet.getRow(rowNum);
    const rowHeaders: string[] = [];

    row.eachCell((cell, colNumber) => {
      let value = cell.value;

      // Extract text from rich text cells
      if (value && typeof value === 'object' && (value as any).richText) {
        value = (value as any).richText.map((rt: any) => rt.text).join('');
      }

      rowHeaders[colNumber - 1] = value ? String(value).trim() : '';
    });

    // Check if this looks like a header row
    const nonEmptyCount = rowHeaders.filter(h => h !== '').length;
    const hasKeyHeaders = rowHeaders.some(h =>
      h.toLowerCase().includes('platform') ||
      h.toLowerCase().includes('tactic') ||
      h.toLowerCase().includes('placement')
    );

    if (nonEmptyCount >= 3 && hasKeyHeaders) {
      headerRow = rowNum;
      headers = rowHeaders;
      break;
    }
  }

  return { headerRow, headers };
}

/**
 * Find platform column index in headers
 */
function findPlatformColumn(normalizedHeaders: string[]): number {
  return normalizedHeaders.findIndex(h =>
    h && (h === 'platform' || h.includes('platform'))
  );
}

/**
 * Normalize header name for consistent matching
 * Converts to lowercase, removes special characters, converts to camelCase
 */
export function normalizeHeaderName(header: string): string {
  if (!header) return '';
  return header
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')  // Remove special characters
    .replace(/\s+/g, '')           // Remove spaces
    .trim();
}

/**
 * Find column value by trying multiple header variations
 */
export function findColumnValue(row: any, headerVariations: string[]): any {
  for (const header of headerVariations) {
    const normalized = normalizeHeaderName(header);
    if (row[normalized] !== undefined && row[normalized] !== null && row[normalized] !== '') {
      return row[normalized];
    }
    // Also try original header
    if (row[header] !== undefined && row[header] !== null && row[header] !== '') {
      return row[header];
    }
  }
  return undefined;
}
