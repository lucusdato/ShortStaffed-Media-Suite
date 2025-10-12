import ExcelJS from "exceljs";
import { ParsedBlockingChart, ParsedBlockingChartRow } from "./types";
import { detectBlockingChartTemplate, getMappedFieldName } from "./blockingChartTemplates";

/**
 * Parses a blocking chart Excel file and extracts structured data
 * Handles merged cells by taking values from the top-left cell
 * Auto-detects template format and applies appropriate column mappings
 */
export async function parseBlockingChart(
  fileBuffer: ArrayBuffer
): Promise<ParsedBlockingChart> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(fileBuffer);

  // Get the first worksheet
  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error("No worksheet found in the Excel file");
  }

  const rows: ParsedBlockingChartRow[] = [];
  const headers: string[] = [];
  let headerRow: ExcelJS.Row | null = null;
  let headerRowIndex = -1;

  // Find the header row (first row with substantial data)
  worksheet.eachRow((row, rowNumber) => {
    const values = row.values as any[];
    const nonEmptyCount = values.filter((v) => v !== null && v !== undefined && v !== "").length;
    
    if (nonEmptyCount >= 3 && headerRowIndex === -1) {
      headerRowIndex = rowNumber;
      headerRow = row;
      
      // Extract headers
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const value = getCellValue(cell);
        headers[colNumber - 1] = value ? String(value).trim() : `Column${colNumber}`;
      });
    }
  });

  if (!headerRow || headerRowIndex === -1) {
    throw new Error("Could not find header row in blocking chart");
  }

  // DETECT TEMPLATE
  const detectedTemplate = detectBlockingChartTemplate(headers.filter(h => h));
  console.log(`📊 Detected template: ${detectedTemplate?.name || 'Unknown (using auto-normalization)'}`);

  // Detect the budget column for merged cell analysis
  const budgetColumnIndex = headers.findIndex(h => 
    h.toLowerCase().includes('gross media cost') ||
    h.toLowerCase().includes('media cost') || 
    h.toLowerCase().includes('working media budget') ||
    h.toLowerCase().includes('budget')
  );
  
  console.log(`💰 Budget column detection: Index ${budgetColumnIndex}, Header: "${headers[budgetColumnIndex] || 'NOT FOUND'}"`);
  console.log(`   Will check Excel column ${budgetColumnIndex + 1} for merged cells`);

  // Parse data rows with template-specific mapping AND merged cell tracking
  worksheet.eachRow((row, rowNumber) => {
    // Skip header row and rows before it
    if (rowNumber <= headerRowIndex) return;

    const rowData: ParsedBlockingChartRow = {};
    let hasData = false;

    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      const value = getCellValue(cell);
      const header = headers[colNumber - 1] || `Column${colNumber}`;
      
      if (value !== null && value !== undefined && value !== "") {
        hasData = true;
        
        // Use template-specific mapping if available, otherwise fall back to auto-normalization
        const fieldName = getMappedFieldName(header, detectedTemplate, normalizeHeaderName);
        rowData[fieldName] = value;
      }

      // Track merged cell info for budget column
      if (colNumber === budgetColumnIndex + 1) {
        console.log(`  🔍 Checking cell at row ${rowNumber}, col ${colNumber}: isMerged=${cell.isMerged}, isMaster=${cell.master === cell}, value="${value}"`);
        
        if (cell.isMerged && cell.master === cell) {
          // This is the master cell of a merged region - calculate merge span
          // Access the internal _merges object to find the merge range
          const merges = (worksheet as any)._merges || {};
          const cellAddress = (cell as any).address;
          
          console.log(`  📏 Found master cell at ${cellAddress}, searching for merge range...`);
          
          // Find merge range that includes this cell
          for (const mergeKey in merges) {
            const merge = merges[mergeKey];
            const mergeString = merge.toString();
            
            // Check if this merge includes our cell address
            if (mergeString.includes(cellAddress) || mergeString.startsWith(cellAddress)) {
              const mergeRange = mergeString.split(':');
              console.log(`    Found merge range: ${mergeString}`);
              
              if (mergeRange.length === 2) {
                const startRow = parseInt(mergeRange[0].match(/\d+/)?.[0] || '0');
                const endRow = parseInt(mergeRange[1].match(/\d+/)?.[0] || '0');
                const mergeSpan = endRow - startRow + 1;
                rowData._mergeSpan = mergeSpan; // Store merge span metadata
                console.log(`    ✅ MERGE SPAN: ${mergeSpan} rows (${startRow} to ${endRow})`);
                break;
              }
            }
          }
        }
      }
    });

    // Only add rows that have at least some data
    if (hasData) {
      rows.push(rowData);
    }
  });

  // Try to extract metadata from the top of the sheet
  const metadata = extractMetadata(worksheet, headerRowIndex);

  // Summary of merge detection
  const rowsWithMergeSpan = rows.filter(r => (r as any)._mergeSpan);
  console.log(`\n📊 MERGE DETECTION SUMMARY:`);
  console.log(`   Total rows parsed: ${rows.length}`);
  console.log(`   Rows with _mergeSpan: ${rowsWithMergeSpan.length}`);
  if (rowsWithMergeSpan.length > 0) {
    rowsWithMergeSpan.forEach((row, idx) => {
      const span = (row as any)._mergeSpan;
      console.log(`     Row ${idx}: _mergeSpan = ${span}`);
    });
  }
  console.log('');

  return {
    headers: headers.filter(h => h),
    rows,
    metadata: {
      ...metadata,
      detectedTemplate: detectedTemplate?.id, // Store which template was detected
      templateName: detectedTemplate?.name,
    },
  };
}

/**
 * Gets the actual value from a cell, handling merged cells
 */
function getCellValue(cell: ExcelJS.Cell): string | number | null {
  // For merged cells, ExcelJS stores the value in the master (top-left) cell
  if (cell.isMerged) {
    // If this is the master cell, return its value
    if (cell.master === cell) {
      return cell.value ? String(cell.value) : null;
    }
    // If this is a merged cell but not the master, return null
    // (the master cell's value will be used)
    return null;
  }

  // Handle different cell value types
  if (cell.value === null || cell.value === undefined) {
    return null;
  }

  // Handle formula cells
  if (typeof cell.value === "object" && "result" in cell.value) {
    return cell.value.result as string | number;
  }

  // Handle rich text
  if (typeof cell.value === "object" && "richText" in cell.value) {
    return (cell.value as any).richText.map((rt: any) => rt.text).join("");
  }

  // Handle date cells - format as ISO date string to avoid timezone issues
  if (cell.type === ExcelJS.ValueType.Date) {
    const date = cell.value as Date;
    // Use UTC to avoid timezone shifts that can cause off-by-one-day errors
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return cell.value as string | number;
}

/**
 * Normalizes header names to camelCase for easier access
 */
function normalizeHeaderName(header: string): string {
  return header
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[^a-z]+/, "");
}

/**
 * Extracts metadata from the top rows of the worksheet
 */
function extractMetadata(
  worksheet: ExcelJS.Worksheet,
  headerRowIndex: number
): { campaignName?: string; client?: string; dateRange?: string } {
  const metadata: { campaignName?: string; client?: string; dateRange?: string } = {};

  // Look at the first few rows before the header
  for (let i = 1; i < headerRowIndex && i <= 5; i++) {
    const row = worksheet.getRow(i);
    const firstCell = getCellValue(row.getCell(1));
    const secondCell = getCellValue(row.getCell(2));

    if (firstCell && secondCell) {
      const key = String(firstCell).toLowerCase();
      const value = String(secondCell);

      if (key.includes("campaign")) {
        metadata.campaignName = value;
      } else if (key.includes("client")) {
        metadata.client = value;
      } else if (key.includes("date")) {
        metadata.dateRange = value;
      }
    }
  }

  return metadata;
}

/**
 * Validates that a parsed blocking chart has the minimum required fields
 */
export function validateBlockingChart(parsed: ParsedBlockingChart): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!parsed.rows || parsed.rows.length === 0) {
    errors.push("No data rows found in blocking chart");
  }

  if (!parsed.headers || parsed.headers.length === 0) {
    errors.push("No headers found in blocking chart");
  }

  // Check for at least some common expected columns
  const commonHeaders = ["channel", "tactic", "platform", "budget"];
  const normalizedHeaders = parsed.headers.map(h => normalizeHeaderName(h));
  
  const hasCommonHeaders = commonHeaders.some(ch => 
    normalizedHeaders.some(nh => nh.includes(ch))
  );

  if (!hasCommonHeaders) {
    errors.push("Could not find expected columns (channel, tactic, platform, or budget)");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

