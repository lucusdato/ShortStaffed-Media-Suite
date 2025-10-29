import ExcelJS from "exceljs";
import { ParsedBlockingChart, TrafficSheetRow, CampaignLine } from "./types";
import {
  TRAFFIC_SHEET_CONFIG,
  PARSING_CONFIG,
  CATEGORIZATION_CONFIG,
  COLUMN_MAPPING_CONFIG,
  STYLE_CONFIG,
  DATE_CONFIG,
  ROW_EXPANSION_CONFIG
} from "./config";
import { extractDemographic } from "./demographicExtraction";

/**
 * Categorizes a CampaignLine to determine which traffic sheet tab it belongs to
 * Uses platform, channel, placements, and ad format to route to correct tab
 */
function categorizeCampaignLine(campaignLine: CampaignLine): { tab: string; type: string } {
  // Check for excluded campaigns FIRST (highest priority)
  if (campaignLine.isExcluded) {
    console.log(`🔍 Categorizing campaign line:`);
    console.log(`   Channel: "${campaignLine.channel}"`);
    console.log(`   Platform: "${campaignLine.platform}"`);
    console.log(`   ⛔ EXCLUDED (${campaignLine.excludedReason}) - Will NOT appear in traffic sheet`);
    return { tab: 'Excluded', type: 'non-digital' };
  }

  const channel = (campaignLine.channel || '').toLowerCase();
  const platform = (campaignLine.platform || '').toLowerCase();
  const mediaType = (campaignLine.mediaType || '').toLowerCase();
  const placements = (campaignLine.adGroups[0]?.placements || '').toLowerCase();
  const adFormat = (campaignLine.adGroups[0]?.creativeLines[0]?.adFormat || '').toLowerCase();

  // Debug logging
  console.log(`🔍 Categorizing campaign line:`);
  console.log(`   Channel: "${channel}"`);
  console.log(`   Platform: "${platform}"`);
  console.log(`   Media Type: "${mediaType}"`);
  console.log(`   Placements: "${placements}"`);
  console.log(`   Ad Format: "${adFormat}"`);

  // Check for influencer keyword (second highest priority)
  // Check in placements, adFormat, channel, and platform
  const isInfluencer = CATEGORIZATION_CONFIG.INFLUENCER_KEYWORDS.some(
    keyword =>
      placements.includes(keyword.toLowerCase()) ||
      adFormat.includes(keyword.toLowerCase()) ||
      channel.includes(keyword.toLowerCase()) ||
      platform.includes(keyword.toLowerCase())
  );

  console.log(`   Is Influencer: ${isInfluencer}`);

  // If influencer is detected anywhere, route to Other Say Social
  if (isInfluencer) {
    console.log(`   ✅ Routed to: Other Say Social (influencer detected)`);
    return { tab: 'Other Say Social', type: 'media' };
  }

  // Check for Brand Say Digital keywords in channel or media type (third priority)
  // This ensures audio, programmatic, digital video, digital display route correctly
  const isBrandSayDigital = CATEGORIZATION_CONFIG.BRAND_SAY_DIGITAL_KEYWORDS.some(
    keyword => channel.includes(keyword) || mediaType.includes(keyword)
  );

  console.log(`   Is Brand Say Digital: ${isBrandSayDigital}`);

  if (isBrandSayDigital) {
    console.log(`   ✅ Routed to: Brand Say Digital (keyword match)`);
    return { tab: 'Brand Say Digital', type: 'media' };
  }

  // Check if it's a social platform (fourth priority)
  const isSocialPlatform = CATEGORIZATION_CONFIG.SOCIAL_PLATFORMS.some(socialPlatform =>
    platform.includes(socialPlatform.toLowerCase()) || channel.includes(socialPlatform.toLowerCase())
  );

  console.log(`   Is Social Platform: ${isSocialPlatform}`);

  // Route social platforms to Brand Say Social
  if (isSocialPlatform) {
    console.log(`   ✅ Routed to: Brand Say Social`);
    return { tab: 'Brand Say Social', type: 'media' };
  }

  // Default to Brand Say Digital for non-social (programmatic, display, video, audio, etc.)
  console.log(`   ✅ Routed to: Brand Say Digital (default)`);
  return { tab: 'Brand Say Digital', type: 'media' };
}

/**
 * LEGACY: Categorizes a row based on channel and placement data
 * Returns 'section-header' for header rows which will be excluded from output
 * @deprecated Use categorizeCampaignLine for hierarchical structure
 */
function categorizeRow(row: any, headers: string[]): { tab: string; type: string } {
  const channelKey = headers[0]?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
  const platformKey = headers.find(h => h.toLowerCase().includes('platform'))?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
  const placementKey = headers.find(h => h.toLowerCase().includes('placement'))?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
  const tacticKey = headers.find(h => h.toLowerCase().includes('tactic'))?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";

  const channel = String((channelKey && row[channelKey]) || "").toLowerCase();
  const platform = String((platformKey && row[platformKey]) || "").toLowerCase();
  const placement = String((placementKey && row[placementKey]) || "").toLowerCase();
  const tactic = String((tacticKey && row[tacticKey]) || "").toLowerCase();

  // Check if it's a header row (visual cue like 'DIGITAL VIDEO', 'PAID SOCIAL')
  // These section headers will be excluded from the traffic sheet output
  const isHeaderRow = CATEGORIZATION_CONFIG.SECTION_HEADER_PATTERNS.some(
    pattern => channel.toLowerCase() === pattern
  );
  if (isHeaderRow) return { tab: 'section-header', type: channel };

  // Brand Say Digital: Digital Video, Digital Display, etc. (NOT social)
  const isBrandSayDigital = CATEGORIZATION_CONFIG.BRAND_SAY_DIGITAL_KEYWORDS.some(
    keyword => channel.includes(keyword)
  );
  if (isBrandSayDigital) {
    return { tab: 'Brand Say Digital', type: 'media' };
  }

  // Check if it's a social platform (Meta, TikTok, Pinterest, etc.)
  const isSocialPlatform = CATEGORIZATION_CONFIG.SOCIAL_PLATFORMS.some(socialPlatform =>
    channel.includes(socialPlatform) || platform.includes(socialPlatform) || placement.includes(socialPlatform) || tactic.includes(socialPlatform)
  );

  // Brand Say Social: Paid Social OR any social platform (Meta, TikTok, Pinterest, etc.)
  const isPaidSocial = CATEGORIZATION_CONFIG.PAID_SOCIAL_KEYWORDS.some(
    keyword => channel.includes(keyword)
  );

  if (isPaidSocial || isSocialPlatform) {
    // Only categorize as Other Say Social if explicitly marked as Influencer
    const isInfluencer = CATEGORIZATION_CONFIG.INFLUENCER_KEYWORDS.some(
      keyword => placement.includes(keyword) || tactic.includes(keyword)
    );

    if (isInfluencer) {
      return { tab: 'Other Say Social', type: 'media' };
    }

    // Default all social platforms to Brand Say Social
    return { tab: 'Brand Say Social', type: 'media' };
  }

  // Default to Brand Say Digital for other digital channels
  return { tab: 'Brand Say Digital', type: 'media' };
}

/**
 * Creates intelligent column mapping based on tab type and blocking chart headers
 */
function createColumnMap(tabName: string, blockingHeaders: string[], trafficSheetHeaderRow: ExcelJS.Row): Map<string, number> {
  const map = new Map<string, number>();
  
  // Normalize a header string for comparison
  const normalize = (str: string) => str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '');
  
  // Build map of traffic sheet column positions
  const trafficHeaders: { [key: string]: number } = {};
  trafficSheetHeaderRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    const headerValue = cell.value ? String(cell.value) : "";
    if (headerValue) {
      const normalizedHeader = normalize(headerValue);
      trafficHeaders[normalizedHeader] = colNumber;
    }
  });
  
  // Log available traffic sheet headers for debugging
  console.log(`Traffic sheet headers for ${tabName}:`, Object.keys(trafficHeaders));
  console.log(`Blocking chart headers:`, blockingHeaders);
  
  // Build complete mappings using base + tab-specific
  const baseMappings = COLUMN_MAPPING_CONFIG.BASE_MAPPINGS;
  const tabSpecificMappings = COLUMN_MAPPING_CONFIG.TAB_SPECIFIC_MAPPINGS[tabName as keyof typeof COLUMN_MAPPING_CONFIG.TAB_SPECIFIC_MAPPINGS] || {};

  // Merge base and tab-specific mappings
  const mappings = { ...baseMappings, ...tabSpecificMappings };

  if (tabName === 'Brand Say Digital') {
  }

  // Map blocking chart headers to traffic sheet columns (shared logic for all tabs)
  blockingHeaders.forEach(blockingHeader => {
    const normalizedBlocking = normalize(blockingHeader);

    // Try to find a mapping
    for (const [trafficKey, blockingVariants] of Object.entries(mappings)) {
      if (blockingVariants.some((variant: string) => normalizedBlocking.includes(variant))) {
        const colNumber = trafficHeaders[trafficKey];
        if (colNumber) {
          map.set(blockingHeader, colNumber);
          if (blockingHeader.toLowerCase().includes('kpi') || blockingHeader.toLowerCase().includes('optimization')) {
            console.log(`✓ KPI Mapped: "${blockingHeader}" → column ${colNumber} (${trafficKey})`);
          }
          break;
        } else {
          if (blockingHeader.toLowerCase().includes('kpi') || blockingHeader.toLowerCase().includes('optimization')) {
            console.log(`✗ KPI Match found for "${blockingHeader}" → "${trafficKey}" but column "${trafficKey}" not found in traffic sheet`);
          }
        }
      }
    }
  });

  console.log(`${tabName}: Total mappings created: ${map.size}`);

  
  return map;
}

/**
 * Stores template block structure (rows, cells, styling) for reuse
 */
interface TemplateBlock {
  rows: Array<{
    height: number | undefined;
    cells: Array<{
      colNumber: number;
      value: any;
      style: Partial<ExcelJS.Style>;
    }>;
  }>;
  merges: string[];
}

/**
 * Captures the template block structure to preserve it
 */
function captureTemplateBlock(
  worksheet: ExcelJS.Worksheet,
  startRow: number,
  blockSize: number
): TemplateBlock {
  const block: TemplateBlock = {
    rows: [],
    merges: []
  };
  
  // Capture each row
  for (let i = 0; i < blockSize; i++) {
    const sourceRow = worksheet.getRow(startRow + i);
    const rowData: TemplateBlock['rows'][0] = {
      height: sourceRow.height,
      cells: []
    };
    
    // Capture each cell in the row
    sourceRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      const cellData: TemplateBlock['rows'][0]['cells'][0] = {
        colNumber,
        value: cell.value,
        style: { ...cell.style }
      };
      rowData.cells.push(cellData);
    });
    
    block.rows.push(rowData);
  }
  
  // Capture merged cells within this block
  const merges = (worksheet as any)._merges || {};
  Object.keys(merges).forEach((mergeAddr: string) => {
    const match = mergeAddr.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
    if (match) {
      const [, startCol, startRowStr, endCol, endRowStr] = match;
      const mergeStartRow = parseInt(startRowStr);
      const mergeEndRow = parseInt(endRowStr);
      
      // If merge is within source block, store it
      if (mergeStartRow >= startRow && mergeEndRow < startRow + blockSize) {
        block.merges.push(mergeAddr);
      }
    }
  });
  
  return block;
}

/**
 * Applies a captured template block to a target position
 */
function applyTemplateBlock(
  worksheet: ExcelJS.Worksheet,
  templateBlock: TemplateBlock,
  targetStartRow: number,
  sourceStartRow: number
): void {
  // Apply each row
  templateBlock.rows.forEach((rowData, i) => {
    const targetRow = worksheet.getRow(targetStartRow + i);
    
    // Set row height
    if (rowData.height) {
      targetRow.height = rowData.height;
    }
    
    // Apply each cell
    rowData.cells.forEach((cellData) => {
      const targetCell = targetRow.getCell(cellData.colNumber);
      
      // Copy value
      if (cellData.value) {
        targetCell.value = cellData.value;
      }
      
      // Check if this is a legitimate header label cell
      const cellValue = cellData.value ? String(cellData.value).trim() : '';
      const isHeaderLabel = STYLE_CONFIG.HEADER_LABELS.includes(cellValue as any);
      
      if (isHeaderLabel) {
        // This is a real header label - preserve original styling (blue background, white text)
        targetCell.style = { ...cellData.style };
      } else {
        // This is a data cell or problematic header text - apply black text on transparent fill
        // Clear the cell value if it's problematic template text
        if (STYLE_CONFIG.TEMPLATE_TEXT_TO_CLEAR.includes(cellValue as any)) {
          targetCell.value = null;
        }
        // Force black text on transparent fill for all non-header cells with text wrapping
        targetCell.style = {
          font: { color: { argb: 'FF000000' } }, // Black text
          fill: { type: 'pattern', pattern: 'none' }, // Transparent fill
          alignment: {
            ...cellData.style.alignment,
            wrapText: true // Enable text wrapping
          },
          border: cellData.style.border // Preserve borders
        };
      }
    });
  });
  
  // Apply merged cells
  const rowOffset = targetStartRow - sourceStartRow;
  templateBlock.merges.forEach((mergeAddr) => {
    const match = mergeAddr.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
    if (match) {
      const [, startCol, startRowStr, endCol, endRowStr] = match;
      const mergeStartRow = parseInt(startRowStr);
      const mergeEndRow = parseInt(endRowStr);
      
      const newMerge = `${startCol}${mergeStartRow + rowOffset}:${endCol}${mergeEndRow + rowOffset}`;
      try {
        worksheet.mergeCells(newMerge);
      } catch (e) {
        // Merge might already exist or be invalid, ignore
      }
    }
  });
}

/**
 * Clears borders from the header area (rows 1-7) and column A
 * Preserves borders ONLY in the Campaign Brief Information box (B2:C5)
 * Note: Row 8 is the data header row and should keep its borders
 */
function clearHeaderBorders(worksheet: ExcelJS.Worksheet): void {
  console.log(`Clearing header borders for worksheet: ${worksheet.name}`);

  // Define the Campaign Brief Information box that should KEEP borders
  const briefBoxStartRow = 2;
  const briefBoxEndRow = 5;
  const briefBoxStartCol = 2; // Column B
  const briefBoxEndCol = 3;   // Column C

  // Clear borders from rows 1-7 for all columns EXCEPT the Campaign Brief box
  // Row 8 is the data header and should keep borders
  // IMPORTANT: Only clear rows 1-7, NOT the data rows (8+)
  const maxColumn = worksheet.name === 'Brand Say Digital'
    ? TRAFFIC_SHEET_CONFIG.BRAND_SAY_DIGITAL_END_COL
    : TRAFFIC_SHEET_CONFIG.BRAND_SAY_SOCIAL_END_COL;

  for (let rowNum = TRAFFIC_SHEET_CONFIG.HEADER_AREA_START_ROW; rowNum <= TRAFFIC_SHEET_CONFIG.HEADER_AREA_END_ROW; rowNum++) {
    for (let colNum = 1; colNum <= maxColumn; colNum++) {
      // Skip cells within the Campaign Brief Information box
      const isInBriefBox = (rowNum >= briefBoxStartRow && rowNum <= briefBoxEndRow) &&
                           (colNum >= briefBoxStartCol && colNum <= briefBoxEndCol);

      if (!isInBriefBox) {
        const cell = worksheet.getCell(rowNum, colNum);
        cell.border = {};
      }
    }
  }

  console.log(`  Preserved borders in Campaign Brief box (B2:C5)`);
  console.log(`  Cleared all other borders in rows 1-7 (including column A)`);
}

/**
 * Applies borders to the entire tactic area spanning from startRow to endRow
 */
function applyBordersToTacticArea(
  worksheet: ExcelJS.Worksheet,
  startRow: number,
  endRow: number
): void {
  console.log(`applyBordersToTacticArea called: worksheet=${worksheet.name}, startRow=${startRow}, endRow=${endRow}`);

  // Define the border style (thin black border)
  // Use indexed color 64 (automatic/default black) - same as template for compatibility
  // Note: 'indexed' is not in ExcelJS TypeScript defs but exists at runtime
  const borderStyle: Partial<ExcelJS.Border> = {
    style: 'thin',
    color: { indexed: 64 } as any
  };

  // Determine border columns based on worksheet type
  const borderConfig = TRAFFIC_SHEET_CONFIG.BORDER_CONFIG[worksheet.name as keyof typeof TRAFFIC_SHEET_CONFIG.BORDER_CONFIG] ||
    TRAFFIC_SHEET_CONFIG.BORDER_CONFIG['Brand Say Digital'];

  const endColumnLetter = String.fromCharCode(64 + borderConfig.end);
  console.log(`Will apply borders to columns B(2) through ${endColumnLetter}(${borderConfig.end})`);

  // Apply borders from column B to the appropriate end column
  for (let rowNum = startRow; rowNum <= endRow; rowNum++) {
    const row = worksheet.getRow(rowNum);

    for (let colNum = borderConfig.start; colNum <= borderConfig.end; colNum++) {
      // Skip excluded columns
      if (borderConfig.exclude.includes(colNum)) {
        continue;
      }

      const cell = row.getCell(colNum);
      cell.style.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
      };
    }
  }
  console.log(`Finished applying borders to ${endRow - startRow + 1} rows, columns ${borderConfig.start}-${borderConfig.end}`);
}

/**
 * Force borders on merged cells - ExcelJS workaround for border persistence issues
 * This function re-applies borders to all cells in a range, including merged cells,
 * to ensure borders persist correctly when writing to Excel files
 *
 * CRITICAL:
 * - Uses cell.style.border instead of cell.border for better persistence
 * - ONLY affects the exact specified range, no side effects
 * - Safety check: will NOT touch rows 1-7 (header area)
 */
function forceBordersOnMergedCells(
  worksheet: ExcelJS.Worksheet,
  startRow: number,
  endRow: number,
  startCol: number,
  endCol: number
): void {
  console.log(`\n🔧 forceBordersOnMergedCells called:`);
  console.log(`   Worksheet: ${worksheet.name}`);
  console.log(`   Range: rows ${startRow}-${endRow}, columns ${startCol}-${endCol}`);

  // SAFETY CHECK: Do not touch header area (rows 1-7)
  if (startRow < 8 || endRow < 8) {
    console.log(`   ⚠️  SAFETY CHECK FAILED: Range includes header area (rows 1-7), aborting!`);
    return;
  }

  // Define the border style (thin black border)
  const borderStyle: Partial<ExcelJS.Border> = {
    style: 'thin',
    color: { indexed: 64 } as any
  };

  const fullBorder = {
    top: borderStyle,
    left: borderStyle,
    bottom: borderStyle,
    right: borderStyle
  };

  let cellsProcessed = 0;
  let mergedCellsProcessed = 0;
  let skippedCells = 0;

  // Iterate through every cell in the EXACT range only
  for (let rowNum = startRow; rowNum <= endRow; rowNum++) {
    // Double-check we're not in header area
    if (rowNum < 8) {
      console.log(`   ⚠️  Skipping row ${rowNum} (header area protection)`);
      skippedCells += (endCol - startCol + 1);
      continue;
    }

    for (let colNum = startCol; colNum <= endCol; colNum++) {
      const cell = worksheet.getCell(rowNum, colNum);

      // Track if this is a merged cell
      if (cell.isMerged) {
        mergedCellsProcessed++;
      }

      // Force border application using cell.style.border for better persistence
      // Create a NEW style object to avoid any reference issues
      const currentStyle = cell.style || {};
      cell.style = {
        ...currentStyle,
        border: fullBorder
      };

      cellsProcessed++;
    }
  }

  console.log(`   ✅ Processed ${cellsProcessed} cells (${mergedCellsProcessed} merged, ${skippedCells} skipped)`);
  console.log(`   ✅ Guaranteed safe: No cells outside rows ${startRow}-${endRow}, cols ${startCol}-${endCol} were touched`);
}

/**
 * Merges tactic data cells vertically across all rows in the tactic block
 * This makes it clear which creative lines belong to which tactic
 */
function mergeTacticDataCells(
  worksheet: ExcelJS.Worksheet,
  startRow: number,
  blockSize: number,
  columnMap: Map<string, number>,
  headerRow: ExcelJS.Row
): void {
  console.log(`🔧 mergeTacticDataCells called: startRow=${startRow}, blockSize=${blockSize}, columnMap.size=${columnMap.size}`);
  const endRow = startRow + blockSize - 1;
  
  // Collect all columns to merge (data columns + Creative Type, Device, Geo)
  // Note: Accutics Ad Set Name will be handled separately with 3 merges
  const columnsToMerge = new Set<number>();
  
  // First, identify the Accutics Ad Set Name column
  let adSetNameColumn: number | null = null;
  headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    const headerValue = cell.value ? String(cell.value).toUpperCase().trim() : "";
    if (headerValue.includes('ACCUTICS AD SET NAME') || headerValue.includes('AD SET NAME')) {
      adSetNameColumn = colNumber;
    }
  });
  
  // Add all data columns from the column map, EXCEPT Accutics Ad Set Name
  columnMap.forEach((colNumber) => {
    if (colNumber !== adSetNameColumn) {
      columnsToMerge.add(colNumber);
    }
  });
  
  // Add Creative Type, Device, Geo, Buy Type, Bid Type, Ad Set Budget, and Targeting Summary columns by finding them in the header row
  console.log(`🔍 Checking header row for mergeable columns...`);
  headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    const headerValue = cell.value ? String(cell.value).toUpperCase().trim() : "";
    console.log(`  Column ${colNumber}: "${headerValue}"`);

    // Check against configured mergeable headers
    if (STYLE_CONFIG.MERGEABLE_COLUMN_HEADERS.some(h => headerValue.includes(h) || headerValue === h)) {
      console.log(`  ✅ Adding column ${colNumber} ("${headerValue}") to merge list`);
      columnsToMerge.add(colNumber);
    }
  });
  
  // Merge each column vertically across the tactic block
  console.log(`🔧 Attempting to merge ${columnsToMerge.size} columns: [${Array.from(columnsToMerge).join(', ')}]`);
  columnsToMerge.forEach((colNumber) => {
    try {
      // Merge from startRow to endRow for this column
      // Format: A1:A16 (column letter + row numbers)
      const colLetter = String.fromCharCode(64 + colNumber); // Convert number to letter (1=A, 2=B, etc.)
      const mergeRange = `${colLetter}${startRow}:${colLetter}${endRow}`;
      console.log(`  🔄 Merging column ${colNumber} (${colLetter}): ${mergeRange}`);
      worksheet.mergeCells(mergeRange);
      console.log(`  ✅ Successfully merged ${mergeRange}`);
      
      // Ensure the merged cell has middle and center alignment
      const cell = worksheet.getCell(startRow, colNumber);
      if (cell.style.alignment) {
        cell.style.alignment = {
          ...cell.style.alignment,
          vertical: 'middle',
          horizontal: 'center'
        };
      } else {
        cell.style.alignment = { 
          vertical: 'middle',
          horizontal: 'center'
        };
      }
    } catch (e) {
      // Merge might fail if already merged or invalid range
      console.warn(`Could not merge column ${colNumber} for rows ${startRow}-${endRow}:`, e);
    }
  });
  
  // Special handling for Accutics Ad Set Name: merge into groups based on configuration
  if (adSetNameColumn !== null) {
    const colLetter = String.fromCharCode(64 + adSetNameColumn);
    const creativesPerGroup = TRAFFIC_SHEET_CONFIG.CREATIVES_PER_AD_GROUP;
    const numGroups = TRAFFIC_SHEET_CONFIG.AD_GROUPS_PER_TACTIC;

    const adGroups = Array.from({ length: numGroups }, (_, i) => ({
      start: startRow + (i * creativesPerGroup),
      end: startRow + (i * creativesPerGroup) + creativesPerGroup - 1
    }));
    
    // Store column number in a const to satisfy TypeScript
    const columnNumber = adSetNameColumn;
    
    adGroups.forEach((group, index) => {
      try {
        const mergeRange = `${colLetter}${group.start}:${colLetter}${group.end}`;
        worksheet.mergeCells(mergeRange);
        
        // Apply middle and center alignment
        const cell = worksheet.getCell(group.start, columnNumber);
        if (cell.style.alignment) {
          cell.style.alignment = {
            ...cell.style.alignment,
            vertical: 'middle',
            horizontal: 'center'
          };
        } else {
          cell.style.alignment = { 
            vertical: 'middle',
            horizontal: 'center'
          };
        }
      } catch (e) {
        console.warn(`Could not merge Ad Set Name column for ad group ${index + 1}:`, e);
      }
    });
  }
}

/**
 * Formats a date string to 'Sept-26' format
 */
function formatDateForTrafficSheet(dateValue: string | Date): string {
  let date: Date;

  if (typeof dateValue === 'string') {
    // Parse ISO date string (YYYY-MM-DD) using UTC to avoid timezone shifts
    const parts = dateValue.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      // This is an ISO date (YYYY-MM-DD)
      // Create date using UTC to avoid timezone issues
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const day = parseInt(parts[2], 10);
      date = new Date(Date.UTC(year, month, day));
    } else {
      // Try parsing as a date string (handles various formats including GMT strings)
      date = new Date(dateValue);
    }
  } else {
    date = dateValue;
  }

  // Validate the date is valid
  if (isNaN(date.getTime())) {
    console.error(`Invalid date value: ${dateValue}`);
    return String(dateValue); // Return original value if invalid
  }

  // Format as 'Sept-26' using configured month names
  // Use UTC methods to avoid timezone shifts
  const month = DATE_CONFIG.MONTH_NAMES[date.getUTCMonth()];
  const day = date.getUTCDate();

  return `${month}-${day}`;
}

/**
 * Populates the header row of a tactic block with blocking chart data
 */
function populateTacticHeaderRow(
  row: ExcelJS.Row,
  tacticData: any,
  columnMap: Map<string, number>
): void {
  // Convert header name to camelCase key to match data object
  // This MUST match the normalizeHeaderName function in parseBlockingChart.ts
  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[^a-z]+/, "");
  };
  
  // Clear values and reset styling for ALL cells in the header row
  // We'll identify header labels vs data cells by checking if they're in our column mapping
  const dataColumns = new Set(Array.from(columnMap.values()));
  
  row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    // Check if this cell contains a value that looks like a header label
    const cellValue = cell.value ? String(cell.value).trim() : '';
    const isHeaderLabel = STYLE_CONFIG.HEADER_LABELS.includes(cellValue as any);
    
    if (isHeaderLabel) {
      // This is a real header label - preserve original styling
      // Keep the value and blue styling
    } else {
      // This is either a data cell or a cell with problematic header text
      cell.value = null;
      // Reset styling to black text on no fill with text wrapping
      cell.style = {
        font: { color: { argb: 'FF000000' } }, // Black text
        fill: { type: 'pattern', pattern: 'none' }, // No fill
        alignment: {
          ...cell.style.alignment,
          wrapText: true // Enable text wrapping
        },
        border: cell.style.border // Preserve borders
      };
    }
  });
  
  // Then populate only cells that have actual data
  columnMap.forEach((colNumber, blockingHeader) => {
    // Convert the blocking header to camelCase to match the data object keys
    const dataKey = toCamelCase(blockingHeader);
    let value = tacticData[dataKey];

    // Log date and KPI-specific data lookup for debugging
    if (blockingHeader.toLowerCase().includes('date') || blockingHeader.toLowerCase().includes('start') || blockingHeader.toLowerCase().includes('end')) {
      console.log(`📅 Date Lookup: header="${blockingHeader}" → key="${dataKey}" → value="${value}" (${value === undefined ? 'MISSING' : 'FOUND'})`);
      if (value === undefined) {
        console.log(`Available data keys:`, Object.keys(tacticData));
      }
    }
    if (blockingHeader.toLowerCase().includes('kpi') || blockingHeader.toLowerCase().includes('optimization')) {
      console.log(`KPI Data Lookup: header="${blockingHeader}" → key="${dataKey}" → value="${value}" (${value === undefined ? 'MISSING' : 'FOUND'})`);
      if (value === undefined) {
        console.log(`Available data keys:`, Object.keys(tacticData));
      }
    }
    
    // Check if this is a date field and format it as 'Sept-26'
    // Be more precise to avoid false matches (e.g., "Learning Agenda" contains "end")
    const headerLower = blockingHeader.toLowerCase();
    const isDateField = headerLower.includes('date') ||
                        headerLower === 'start' ||
                        headerLower === 'end' ||
                        headerLower.includes('start date') ||
                        headerLower.includes('end date');
    
    if (value !== undefined && value !== null && value !== "") {
      const cell = row.getCell(colNumber);
      
      // Format dates as 'Sept-26'
      if (isDateField && (typeof value === 'string' || value instanceof Date)) {
        try {
          cell.value = formatDateForTrafficSheet(value);
        } catch (e) {
          console.warn(`Could not format date value: ${value}`, e);
          cell.value = value; // Fall back to original value
        }
      } else {
        cell.value = value;
      }
      
      // Ensure data cells have black text on transparent fill with text wrapping
      cell.style = {
        font: { color: { argb: 'FF000000' } }, // Black text
        fill: { type: 'pattern', pattern: 'none' }, // Transparent fill
        alignment: {
          ...cell.style.alignment,
          wrapText: true // Enable text wrapping
        },
        border: cell.style.border // Preserve borders
      };
    }
  });
}

/**
 * Generates a client-ready traffic sheet from parsed blocking chart data
 * Populates existing template tabs with tactic blocks (19 rows each)
 */
export async function generateTrafficSheet(
  blockingChartData: ParsedBlockingChart,
  templateBuffer: ArrayBuffer,
  manualOverrides: { [key: number]: string } = {}
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(templateBuffer);

  // Categorize rows by tab, excluding section headers
  // Helper to check if a row is a valid tactic (has meaningful data)
  const isValidTactic = (row: any): boolean => {
    // Convert header name to camelCase key
    const toCamelCase = (str: string) => {
      return str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[^a-zA-Z]+/, "")
        .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
    };
    
    // Find relevant headers
    const channelHeader = blockingChartData.headers[0] || '';
    const tacticHeader = blockingChartData.headers.find(h => h.toLowerCase().includes('tactic'));
    
    if (!tacticHeader) return false;
    
    const channelKey = toCamelCase(channelHeader);
    const tacticKey = toCamelCase(tacticHeader);
    
    const channelValue = String(row[channelKey] || "").toLowerCase();
    const tacticValue = String(row[tacticKey] || "").trim();
    
    // Exclude summary/total rows (same logic as verification screen)
    const isSummaryRow = CATEGORIZATION_CONFIG.SUMMARY_ROW_PATTERNS.some(
      pattern => channelValue.includes(pattern)
    ) || (channelValue.includes('total') && !channelValue.includes('working total'));
    
    if (isSummaryRow) {
      return false;
    }
    
    // Must have a tactic value to be considered valid
    if (!tacticValue || tacticValue === '') {
      return false;
    }
    
    // Count meaningful fields (excluding empty values)
    const keysWithValues = Object.keys(row).filter(key => {
      const value = row[key];
      return value !== undefined && value !== null && String(value).trim() !== '';
    });
    
    // Needs at least minimum meaningful fields to be a valid tactic row
    // (channel, tactic, and at least 2 other fields like platform, dates, etc.)
    return keysWithValues.length >= PARSING_CONFIG.MIN_CAMPAIGN_LINE_FIELDS;
  };

  // Group rows by tactic identity (tactic + placement + language)
  // Rows with the same tactic/placement/language are treated as ONE tactic with multiple audiences
  const groupedTactics: { [key: string]: any[] } = {
    'Brand Say Digital': [],
    'Brand Say Social': [],
    'Other Say Social': []
  };
  
  // Track which rows have been claimed by merged groups
  const claimedRows = new Set<number>();
  
  // First pass: identify master rows and claim their merged group members
  blockingChartData.rows.forEach((row, index) => {
    const mergeSpan = (row as any)._mergeSpan;
    if (mergeSpan && mergeSpan > 1) {
      // This master row claims the next (mergeSpan - 1) rows
      for (let i = 1; i < mergeSpan; i++) {
        claimedRows.add(index + i);
      }
      console.log(`📏 Row ${index} has merge span ${mergeSpan}, claiming rows ${index + 1} to ${index + mergeSpan - 1}`);
    }
  });
  
  console.log(`\n🔒 Claimed rows (part of merged groups): ${Array.from(claimedRows).join(', ')}`);
  
  // Second pass: categorize and collect valid rows
  const validTactics: Array<{ row: any; tab: string; index: number }> = [];
  
  console.log('\n🔍 ===== TACTIC GROUPING ANALYSIS =====');
  console.log(`Total rows in blocking chart: ${blockingChartData.rows.length}`);
  
  blockingChartData.rows.forEach((row, index) => {
    // Skip if this row was claimed by a merged group
    if (claimedRows.has(index)) {
      console.log(`Row ${index}: ⏭️  SKIPPED (claimed by merged group)`);
      return;
    }
    
    const autoCategory = categorizeRow(row, blockingChartData.headers);
    
    // Skip section headers
    if (autoCategory.tab === 'section-header') {
      console.log(`Row ${index}: ⏭️  SKIPPED (section header)`);
      return;
    }
    
    // Skip invalid tactics
    if (!isValidTactic(row)) {
      console.log(`Row ${index}: ⏭️  SKIPPED (invalid tactic)`);
      return;
    }
    
    // Apply manual override if exists
    const finalTab = manualOverrides[index] || autoCategory.tab;
    
    // Check if this row has _mergeSpan
    const mergeSpan = (row as any)._mergeSpan || 1;
    
    if (mergeSpan > 1) {
      // This is a MASTER row of a merged group
      console.log(`Row ${index}: ✅ TACTIC (Gross Media Cost merged across ${mergeSpan} rows) → Tab: "${finalTab}"`);
    } else {
      // This is a standalone tactic (no merge)
      console.log(`Row ${index}: ✅ TACTIC (standalone, 1 row) → Tab: "${finalTab}"`);
    }
    
    validTactics.push({ row: { ...row, _mergeSpan: mergeSpan }, tab: finalTab, index });
  });
  
  console.log(`\n📊 Total tactics identified: ${validTactics.length}`);
  console.log('===== END ANALYSIS =====\n');
  
  // Group tactics by tab
  validTactics.forEach(({ row, tab }) => {
    if (groupedTactics[tab]) {
      groupedTactics[tab].push(row);
    }
  });
  
  console.log('📋 ===== FINAL TACTIC COUNT BY TAB =====');
  console.log(`Brand Say Digital: ${groupedTactics['Brand Say Digital'].length} tactics`);
  console.log(`Brand Say Social: ${groupedTactics['Brand Say Social'].length} tactics`);
  console.log(`Other Say Social: ${groupedTactics['Other Say Social'].length} tactics`);
  console.log('===== END GROUPING =====\n');
  
  // Use grouped tactics
  const rowsByTab = groupedTactics;

  // Process each tab
  const tabNames = ['Brand Say Digital', 'Brand Say Social', 'Other Say Social'];
  
  for (const tabName of tabNames) {
    const worksheet = workbook.getWorksheet(tabName);
    
    if (!worksheet) {
      console.warn(`Warning: Tab "${tabName}" not found in template`);
      continue;
    }
    
    // Clear unwanted borders from header area (rows 1-8, columns D-V) for ALL tabs
    clearHeaderBorders(worksheet);
    
    const tactics = rowsByTab[tabName];
    if (!tactics || tactics.length === 0) {
      // No data for this tab, but we've already cleared the borders
      console.log(`⚠️ No tactics found for ${tabName}, skipping...`);
      continue;
    }
    console.log(`📊 Processing ${tactics.length} tactics for ${tabName}`);
    
    // New simplified structure:
    // - Row 8: Header row with column labels (OBJECTIVE, TACTIC, PLATFORM, etc.)
    // - Row 9: First tactic data
    // - Rows 10-24: 15 blank creative lines for first tactic
    // - Row 25: Second tactic data
    // - Rows 26-40: 15 blank creative lines for second tactic
    // Total: 16 rows per tactic (1 data row + 15 creative lines)

    // All tabs now have headers in row 8 (template updated)
    const headerLabelRow = worksheet.getRow(TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW);
    console.log(`Using row 8 headers for ${tabName}`);

    // Create column mapping using row 8 for all tabs
    const columnMap = createColumnMap(tabName, blockingChartData.headers, headerLabelRow);


    const templateStartRow = TRAFFIC_SHEET_CONFIG.TEMPLATE_START_ROW;
    const blockSize = TRAFFIC_SHEET_CONFIG.CREATIVE_LINES_PER_TACTIC; // Total rows: 15 creative lines (no blank separator between tactics)
    
    // Capture the template block ONCE before any modifications (just rows 9-23)
    const templateBlock = captureTemplateBlock(worksheet, templateStartRow, blockSize);
    
    let currentRow = TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW; // Start with first tactic data at row 9
    
    // Process each tactic
    tactics.forEach((tacticData, tacticIndex) => {
      // Each tactic gets exactly 15 creative rows (3 ad groups of 5 creatives each)
      // regardless of how many rows it occupied in the blocking chart
      const mergeSpan = (tacticData as any)._mergeSpan || 1;
      
      console.log(`Processing tactic ${tacticIndex + 1}/${tactics.length} for ${tabName} - ${mergeSpan} blocking chart row${mergeSpan > 1 ? 's' : ''} consolidated`);
      
      // Apply the captured template block to current position
      applyTemplateBlock(worksheet, templateBlock, currentRow, templateStartRow);
      
      // Populate only the header row (first row of the block)
      const tacticHeaderRow = worksheet.getRow(currentRow);
      populateTacticHeaderRow(tacticHeaderRow, tacticData, columnMap);
      
      // Merge tactic data cells vertically across all creative lines
      // This includes row 9 (first tactic data/creative row) through row 23 (15th creative row)
      // Also merges Creative Type, Device, and Geo columns
      console.log(`🎯 About to call mergeTacticDataCells for tactic ${tacticIndex + 1}/${tactics.length} at row ${currentRow}`);
      // For Brand Say Digital, we need to pass row 8 (headerLabelRow) because row 9 has been populated with data
      // For social tabs, we pass row 8 (headerLabelRow) which already has proper headers
      mergeTacticDataCells(worksheet, currentRow, TRAFFIC_SHEET_CONFIG.CREATIVE_LINES_PER_TACTIC, columnMap, headerLabelRow);
      
      // Move to next block position (15 rows total per tactic, no matter how many audiences)
      currentRow += blockSize;
    });
    
    // Apply borders to the entire tactic area (from header row 8 to last tactic)
    if (tactics.length > 0) {
      console.log(`Applying borders to tactic area: rows ${TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW} to ${currentRow - 1}`);
      applyBordersToTacticArea(worksheet, TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW, currentRow - 1);
    }

    // FINAL PASS: Explicitly remove ALL borders from rows 1-7 (including column A)
    // Preserve borders ONLY in the Campaign Brief Information box (B2:C5)
    // Note: Row 8 is the data header row and should keep its borders
    // IMPORTANT: Only clear rows 1-7, NOT the data rows (8+)
    const finalPassEndColumn = worksheet.name === 'Brand Say Digital'
      ? TRAFFIC_SHEET_CONFIG.BRAND_SAY_DIGITAL_END_COL
      : TRAFFIC_SHEET_CONFIG.BRAND_SAY_SOCIAL_END_COL;

    // Define the Campaign Brief Information box that should KEEP borders
    const briefBoxStartRow = 2;
    const briefBoxEndRow = 5;
    const briefBoxStartCol = 2; // Column B
    const briefBoxEndCol = 3;   // Column C

    console.log(`Final pass: Removing borders from rows 1-7 (including column A), preserving Campaign Brief box (B2:C5)`);

    // Clear borders from rows 1-7 for all columns EXCEPT the Campaign Brief box
    for (let rowNum = TRAFFIC_SHEET_CONFIG.HEADER_AREA_START_ROW; rowNum <= TRAFFIC_SHEET_CONFIG.HEADER_AREA_END_ROW; rowNum++) {
      for (let colNum = 1; colNum <= finalPassEndColumn; colNum++) {
        // Skip cells within the Campaign Brief Information box
        const isInBriefBox = (rowNum >= briefBoxStartRow && rowNum <= briefBoxEndRow) &&
                             (colNum >= briefBoxStartCol && colNum <= briefBoxEndCol);

        if (!isInBriefBox) {
          const cell = worksheet.getCell(rowNum, colNum);
          cell.border = {};
        }
      }
    }
  }

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

/**
 * Generate Traffic Sheet from Hierarchical Campaign Lines (NEW)
 * Uses the hierarchical CampaignLine structure for cleaner, more accurate generation
 */
export async function generateTrafficSheetFromHierarchy(
  blockingChartData: ParsedBlockingChart,
  templateBuffer: ArrayBuffer,
  manualOverrides?: { [key: number]: string }
): Promise<Buffer> {
  const { writeCampaignLineToWorksheet, buildColumnMap } = await import('./trafficSheetWriter');

  console.log('\n🚀 ===== HIERARCHICAL TRAFFIC SHEET GENERATION =====');
  console.log(`Campaign Lines: ${blockingChartData.campaignLines?.length || 0}`);

  if (!blockingChartData.campaignLines || blockingChartData.campaignLines.length === 0) {
    throw new Error('No campaign lines found in blocking chart data. Ensure parseBlockingChart built hierarchical structure.');
  }

  // Load template workbook
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(templateBuffer);

  // Group campaign lines by tab
  const campaignLinesByTab: {
    'Brand Say Digital': CampaignLine[];
    'Brand Say Social': CampaignLine[];
    'Other Say Social': CampaignLine[];
  } = {
    'Brand Say Digital': [],
    'Brand Say Social': [],
    'Other Say Social': []
  };

  blockingChartData.campaignLines.forEach((campaignLine, index) => {
    // Get automatic categorization
    const { tab: autoTab } = categorizeCampaignLine(campaignLine);

    // Apply manual override if it exists for this campaign line index
    const tab = manualOverrides && manualOverrides[index] !== undefined
      ? manualOverrides[index]
      : autoTab;

    // Log if manual override was applied
    if (manualOverrides && manualOverrides[index] !== undefined) {
      console.log(`✏️  Manual override applied for Campaign Line ${index + 1}: ${autoTab} → ${tab}`);
    }

    // Skip excluded campaigns - they won't be written to traffic sheet
    if (tab === 'Excluded') {
      console.log(`Campaign Line ${index + 1}:`);
      console.log(`  Platform: ${campaignLine.platform}`);
      console.log(`  Tab: EXCLUDED${campaignLine.excludedReason ? ` (${campaignLine.excludedReason})` : ''}`);
      console.log(`  ⏭️  Skipping - will NOT appear in traffic sheet`);
      return;
    }

    // Defensive check: Ensure campaignLine has adGroups
    if (!campaignLine || !campaignLine.adGroups || !Array.isArray(campaignLine.adGroups)) {
      console.error(`❌ ERROR: Campaign line ${index + 1} is missing adGroups or is invalid:`, campaignLine);
      console.error(`  Type: ${typeof campaignLine}`);
      console.error(`  Has adGroups: ${campaignLine?.adGroups ? 'yes' : 'no'}`);
      console.error(`  Is Array: ${Array.isArray(campaignLine?.adGroups)}`);
      return;
    }

    const totalRows = campaignLine.adGroups.length * ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;

    console.log(`Campaign Line ${index + 1}:`);
    console.log(`  Platform: ${campaignLine.platform}`);
    console.log(`  Tab: ${tab}`);
    console.log(`  Ad Groups: ${campaignLine.adGroups.length}`);
    console.log(`  Traffic Sheet Rows: ${totalRows}`);

    campaignLinesByTab[tab as keyof typeof campaignLinesByTab].push(campaignLine);
  });

  console.log('\n📊 Campaign Lines by Tab:');
  console.log(`  Brand Say Digital: ${campaignLinesByTab['Brand Say Digital'].length}`);
  console.log(`  Brand Say Social: ${campaignLinesByTab['Brand Say Social'].length}`);
  console.log(`  Other Say Social: ${campaignLinesByTab['Other Say Social'].length}`);

  // Write to each tab
  const tabNames: Array<keyof typeof campaignLinesByTab> = ['Brand Say Digital', 'Brand Say Social', 'Other Say Social'];

  for (const tabName of tabNames) {
    const worksheet = workbook.getWorksheet(tabName);
    if (!worksheet) {
      console.warn(`⚠️  Worksheet "${tabName}" not found in template, skipping...`);
      continue;
    }

    const campaignLines = campaignLinesByTab[tabName];
    if (campaignLines.length === 0) {
      console.log(`\n📄 ${tabName}: No campaign lines, skipping...`);
      continue;
    }

    console.log(`\n📝 ===== WRITING TO ${tabName} =====`);

    // Build column mapping from header row (row 8 for all tabs)
    const headerRow = TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW;
    const columnMap = buildColumnMap(worksheet, headerRow);

    // Get border configuration for this tab
    const borderConfig = TRAFFIC_SHEET_CONFIG.BORDER_CONFIG[tabName as keyof typeof TRAFFIC_SHEET_CONFIG.BORDER_CONFIG] ||
      TRAFFIC_SHEET_CONFIG.BORDER_CONFIG['Brand Say Digital'];

    // Apply borders and formatting to header row
    // Use indexed color 64 (automatic/default black) - same as template for compatibility
    // Note: 'indexed' is not in ExcelJS TypeScript defs but exists at runtime
    const borderStyle: Partial<ExcelJS.Border> = {
      style: 'thin',
      color: { indexed: 64 } as any
    };

    const headerRowObj = worksheet.getRow(headerRow);
    for (let col = borderConfig.start; col <= borderConfig.end; col++) {
      const cell = headerRowObj.getCell(col);
      cell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
      };

      // Apply centered alignment with text wrapping to header cells
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true
      };
    }

    // Start writing at first data row (row 9 for all tabs)
    let currentRow: number = TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW;

    // Collect all merge information (don't apply yet)
    const allMerges: any[] = [];

    campaignLines.forEach((campaignLine, index) => {
      console.log(`\nWriting Campaign Line ${index + 1}/${campaignLines.length}`);
      const result = writeCampaignLineToWorksheet(
        worksheet,
        campaignLine,
        currentRow,
        tabName,
        columnMap,
        []
      );
      currentRow = result.nextRow;
      allMerges.push(...result.merges);
    });

    console.log(`\n📊 Collected ${allMerges.length} merges to apply later`);

    // Auto-size columns to fit content
    console.log(`\n📏 Auto-sizing columns for ${tabName}...`);
    worksheet.columns.forEach((column, index) => {
      if (!column) return;

      let maxLength = 0;
      const colNumber = index + 1;

      // Skip if column is outside border range
      if (colNumber < borderConfig.start || colNumber > borderConfig.end) {
        return;
      }

      // Calculate max content length in this column
      for (let rowNum = headerRow; rowNum < currentRow; rowNum++) {
        const cell = worksheet.getCell(rowNum, colNumber);
        if (cell.value) {
          const cellValue = String(cell.value);
          const length = cellValue.length;
          if (length > maxLength) {
            maxLength = length;
          }
        }
      }

      // Set column width with reasonable min/max bounds
      // ExcelJS uses character width units, not pixels
      const minWidth = 10;
      const maxWidth = 50;
      const calculatedWidth = Math.min(Math.max(maxLength + 2, minWidth), maxWidth);

      column.width = calculatedWidth;
    });

    console.log(`✅ ${tabName}: Wrote ${campaignLines.length} campaign lines ending at row ${currentRow - 1}`);

    // ============================================================================
    // FINAL BORDER APPLICATION: Apply borders to ALL data rows (row 9 and below for all tabs)
    // APPROACH 2: MERGE FIRST, then apply borders
    // Hypothesis: ExcelJS handles borders better when cells are already merged
    // ============================================================================
    // All tabs: Row 8 is headers, Row 9+ is data (needs borders)
    const dataStartRow = TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW; // Row 9 for all tabs
    const dataEndRow = currentRow - 1; // Last row with data

    console.log(`\n🎨 APPROACH 2 TEST for ${tabName}: Merge FIRST, borders SECOND`);
    console.log(`  Data rows ${dataStartRow}-${dataEndRow}, columns ${borderConfig.start}-${borderConfig.end}`);

    const dataBorderStyle: Partial<ExcelJS.Border> = {
      style: 'thin',
      color: { indexed: 64 } as any
    };

    // ============================================================================
    // STEP 1: Apply ALL merges FIRST (before any borders)
    // ============================================================================
    console.log(`\n📦 STEP 1: Applying ${allMerges.length} cell merges FIRST...`);
    let mergeCount = 0;
    for (const merge of allMerges) {
      try {
        worksheet.mergeCells(merge.startRow, merge.startCol, merge.endRow, merge.endCol);
        mergeCount++;
      } catch (err: any) {
        console.log(`  ⚠️  Could not merge: ${err.message}`);
      }
    }
    console.log(`✅ Applied ${mergeCount}/${allMerges.length} merges`);

    // ============================================================================
    // STEP 2: Now apply borders to ALL cells AFTER merging is complete
    // ============================================================================
    console.log(`\n🎨 STEP 2: Applying borders AFTER merging...`);

    let cellsProcessed = 0;
    for (let rowNum = dataStartRow; rowNum <= dataEndRow; rowNum++) {
      for (let colNum = borderConfig.start; colNum <= borderConfig.end; colNum++) {
        const cell = worksheet.getCell(rowNum, colNum);

        // Clear fill to transparent for all tabs
        cell.fill = {
          type: 'pattern',
          pattern: 'none'
        };

        // Apply border (should work on merged cells now that merging happened first)
        cell.border = {
          top: dataBorderStyle,
          left: dataBorderStyle,
          bottom: dataBorderStyle,
          right: dataBorderStyle
        };

        // Alignment
        if (!cell.alignment) {
          cell.alignment = {};
        }
        cell.alignment.vertical = 'middle';
        cell.alignment.horizontal = 'center';
        cell.alignment.wrapText = true;

        cellsProcessed++;
      }
    }

    console.log(`✅ Applied borders to ${cellsProcessed} cells (AFTER merging)`);

    // ============================================================================
    // DIAGNOSTICS: Check if borders actually stuck on specific cells
    // ============================================================================
    console.log(`\n🔬 DIAGNOSTICS: Checking if borders actually exist on cells...`);
    console.log(`   Data range: rows ${dataStartRow}-${dataEndRow}, cols ${borderConfig.start}-${borderConfig.end}`);

    // Check H11 specifically
    const h11 = worksheet.getCell(11, 8);
    console.log(`\n  H11 (Accutics Ad Set Name) CHECK:`);
    try {
      console.log(`    - Value: ${h11.value || 'EMPTY'}`);
      console.log(`    - isMerged: ${h11.isMerged}`);
      console.log(`    - Has border object: ${h11.border ? 'YES' : 'NO'}`);
      if (h11.border) {
        console.log(`    - Border sides: ${Object.keys(h11.border).join(', ')}`);
        console.log(`    - Border.top.style: ${h11.border.top?.style || 'none'}`);
        console.log(`    - Border.left.style: ${h11.border.left?.style || 'none'}`);
      }
      console.log(`    - Has fill: ${h11.fill ? 'YES' : 'NO'}`);
      if (h11.fill) {
        console.log(`    - Fill type: ${h11.fill.type}`);
        console.log(`    - Fill pattern: ${(h11.fill as any).pattern || 'N/A'}`);
      }
    } catch (err: any) {
      console.log(`    - ERROR accessing H11: ${err.message}`);
    }

    // Check O11 specifically
    const o11 = worksheet.getCell(11, 15);
    console.log(`\n  O11 (KPI Metric) CHECK:`);
    try {
      console.log(`    - Value: ${o11.value || 'EMPTY'}`);
      console.log(`    - isMerged: ${o11.isMerged}`);
      console.log(`    - Has border object: ${o11.border ? 'YES' : 'NO'}`);
      if (o11.border) {
        console.log(`    - Border sides: ${Object.keys(o11.border).join(', ')}`);
        console.log(`    - Border.top.style: ${o11.border.top?.style || 'none'}`);
        console.log(`    - Border.left.style: ${o11.border.left?.style || 'none'}`);
      }
      console.log(`    - Has fill: ${o11.fill ? 'YES' : 'NO'}`);
      if (o11.fill) {
        console.log(`    - Fill type: ${o11.fill.type}`);
        console.log(`    - Fill pattern: ${(o11.fill as any).pattern || 'N/A'}`);
      }
    } catch (err: any) {
      console.log(`    - ERROR accessing O11: ${err.message}`);
    }

    // Check P11 specifically
    const p11 = worksheet.getCell(11, 16);
    console.log(`\n  P11 (Ad Set Budget) CHECK:`);
    try {
      console.log(`    - Value: ${p11.value || 'EMPTY'}`);
      console.log(`    - isMerged: ${p11.isMerged}`);
      console.log(`    - Has border object: ${p11.border ? 'YES' : 'NO'}`);
      if (p11.border) {
        console.log(`    - Border sides: ${Object.keys(p11.border).join(', ')}`);
        console.log(`    - Border.top.style: ${p11.border.top?.style || 'none'}`);
        console.log(`    - Border.left.style: ${p11.border.left?.style || 'none'}`);
      }
      console.log(`    - Has fill: ${p11.fill ? 'YES' : 'NO'}`);
      if (p11.fill) {
        console.log(`    - Fill type: ${p11.fill.type}`);
        console.log(`    - Fill pattern: ${(p11.fill as any).pattern || 'N/A'}`);
      }
    } catch (err: any) {
      console.log(`    - ERROR accessing P11: ${err.message}`);
    }

    console.log(`\n🔬 END DIAGNOSTICS\n`);

    // NOTE: Merging already happened in STEP 1 above, no need to merge again

    // CRITICAL: Clear unwanted borders from column A and header area (rows 1-7)
    // Preserve borders ONLY in the Campaign Brief Information box (B3:C7)
    const maxColumn = tabName === 'Brand Say Digital'
      ? TRAFFIC_SHEET_CONFIG.BRAND_SAY_DIGITAL_END_COL
      : TRAFFIC_SHEET_CONFIG.BRAND_SAY_SOCIAL_END_COL;

    // Define the Campaign Brief Information box that should KEEP borders
    const briefBoxStartRow = 2;
    const briefBoxEndRow = 5;
    const briefBoxStartCol = 2; // Column B
    const briefBoxEndCol = 3;   // Column C

    console.log(`\n🧹 Cleaning up borders for ${tabName}:`);
    console.log(`  Clearing borders from column A (rows 1-7 only)`);
    console.log(`  Clearing borders from rows 1-7, preserving Campaign Brief box (B2:C5)`);

    // Clear borders from rows 1-7 for all columns EXCEPT the Campaign Brief box
    // IMPORTANT: Only clear rows 1-7, NOT the data rows (8+)
    for (let rowNum = TRAFFIC_SHEET_CONFIG.HEADER_AREA_START_ROW; rowNum <= TRAFFIC_SHEET_CONFIG.HEADER_AREA_END_ROW; rowNum++) {
      for (let colNum = 1; colNum <= maxColumn; colNum++) {
        // Skip cells within the Campaign Brief Information box (B2:C5)
        const isInBriefBox = (rowNum >= briefBoxStartRow && rowNum <= briefBoxEndRow) &&
                             (colNum >= briefBoxStartCol && colNum <= briefBoxEndCol);

        if (!isInBriefBox) {
          const cell = worksheet.getCell(rowNum, colNum);
          cell.border = {};
        }
      }
    }

    // Apply borders to the Campaign Brief box for all tabs (Brand Say Digital, Brand Say Social, Other Say Social)
    console.log(`  📦 Applying borders to Campaign Brief box (B2:C5) for ${tabName}`);
    const briefBoxBorderStyle: Partial<ExcelJS.Border> = {
      style: 'thin',
      color: { indexed: 64 } as any
    };

    for (let rowNum = briefBoxStartRow; rowNum <= briefBoxEndRow; rowNum++) {
      for (let colNum = briefBoxStartCol; colNum <= briefBoxEndCol; colNum++) {
        const cell = worksheet.getCell(rowNum, colNum);
        cell.border = {
          top: briefBoxBorderStyle,
          left: briefBoxBorderStyle,
          bottom: briefBoxBorderStyle,
          right: briefBoxBorderStyle
        };
      }
    }

    console.log(`✅ Border cleanup complete for ${tabName}`);

    // ============================================================================
    // FINAL DIAGNOSTIC: Check borders RIGHT BEFORE WRITE
    // ============================================================================
    console.log(`\n🔬 FINAL CHECK RIGHT BEFORE WRITE:`);
    const finalH11 = worksheet.getCell(11, 8);
    const finalO11 = worksheet.getCell(11, 15);
    const finalP11 = worksheet.getCell(11, 16);

    console.log(`  H11: border=${finalH11.border ? 'YES' : 'NO'}, isMerged=${finalH11.isMerged}`);
    console.log(`  O11: border=${finalO11.border ? 'YES' : 'NO'}, isMerged=${finalO11.isMerged}`);
    console.log(`  P11: border=${finalP11.border ? 'YES' : 'NO'}, isMerged=${finalP11.isMerged}`);

    if (finalH11.border) {
      console.log(`  H11 border has ${Object.keys(finalH11.border).length} sides: ${Object.keys(finalH11.border).join(', ')}`);
    }
  }

  // ============================================================================
  // FINAL STEP: Force borders on Brand Say Digital first tactic (VERY LAST OPERATION)
  // This must happen AFTER all other operations to ensure borders persist
  // ============================================================================
  const brandSayDigitalSheet = workbook.getWorksheet('Brand Say Digital');
  if (brandSayDigitalSheet) {
    console.log(`\n🔧 FINAL STEP: Forcing borders on Brand Say Digital first tactic (rows 9-23, cols G-S)`);
    forceBordersOnMergedCells(
      brandSayDigitalSheet,
      9,  // Start row (first data row)
      23, // End row (first tactic: 9 + 14 more rows = 23, totaling 15 rows)
      7,  // Start column (G - Campaign Name (Taxonomy from Accutics))
      19  // End column (S - Landing Page URL w UTM)
    );
  }

  // APPROACH 2.5: Try writeFile instead of writeBuffer
  // Hypothesis: writeFile might handle borders differently than writeBuffer
  console.log(`\n📝 APPROACH 2.5 TEST: Writing with writeFile instead of writeBuffer...`);

  const tempPath = '/tmp/traffic-sheet-test.xlsx';
  await workbook.xlsx.writeFile(tempPath);
  console.log(`✅ Written to temp file: ${tempPath}`);

  // Read it back as buffer
  const fs = await import('fs/promises');
  const buffer = await fs.readFile(tempPath);
  console.log(`✅ Read back as buffer, size: ${buffer.byteLength} bytes`);

  // Clean up temp file
  await fs.unlink(tempPath);

  return Buffer.from(buffer);
}
