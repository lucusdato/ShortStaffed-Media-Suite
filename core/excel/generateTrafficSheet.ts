import ExcelJS from "exceljs";
import { ParsedBlockingChart, TrafficSheetRow } from "./types";

/**
 * Categorizes a row based on channel and placement data
 * Returns 'section-header' for header rows which will be excluded from output
 */
function categorizeRow(row: any, headers: string[]): { tab: string; type: string } {
  const channelKey = headers[0]?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
  const placementKey = headers.find(h => h.toLowerCase().includes('placement'))?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
  const tacticKey = headers.find(h => h.toLowerCase().includes('tactic'))?.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/^[^a-z]+/, "") || "";
  
  const channel = String((channelKey && row[channelKey]) || "").toLowerCase();
  const placement = String((placementKey && row[placementKey]) || "").toLowerCase();
  const tactic = String((tacticKey && row[tacticKey]) || "").toLowerCase();

  // Check if it's a header row (visual cue like 'DIGITAL VIDEO', 'PAID SOCIAL')
  // These section headers will be excluded from the traffic sheet output
  const isHeaderRow = /^(digital video|digital display|digital audio|paid social|social|video|display|audio)$/i.test(channel);
  if (isHeaderRow) return { tab: 'section-header', type: channel };

  // Brand Say Digital: Digital Video, Digital Display, etc. (NOT social)
  if (channel.includes('digital video') || channel.includes('digital display') || 
      channel.includes('digital audio') || channel.includes('programmatic')) {
    return { tab: 'Brand Say Digital', type: 'media' };
  }

  // Check if it's a social platform (Meta, TikTok, Pinterest, etc.)
  const socialPlatforms = [
    'meta', 'facebook', 'instagram', 'fb', 'ig',
    'tiktok', 'tik tok',
    'pinterest', 'pin',
    'reddit',
    'snapchat', 'snap',
    'twitter', 'x.com',
    'linkedin'
  ];
  const isSocialPlatform = socialPlatforms.some(platform => 
    channel.includes(platform) || placement.includes(platform) || tactic.includes(platform)
  );
  
  // Brand Say Social: Paid Social OR any social platform (Meta, TikTok, Pinterest, etc.)
  if (channel.includes('paid social') || channel.includes('social') || isSocialPlatform) {
    // Only categorize as Other Say Social if explicitly marked as Influencer
    const isInfluencer = placement.includes('influencer') || tactic.includes('influencer');
    
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
  
  // Define mappings for each tab type
  if (tabName === 'Brand Say Digital') {
    const mappings: { [key: string]: string[] } = {
      'tactic': ['tactic'],
      'platform': ['platform'],
      'objective': ['objective'],
      'accuticscampaignname': ['accuticscampaignname', 'campaignname'],
      'demo': ['demo'],
      'audience': ['targeting', 'targetingdetails', 'audience'], // Map to Audience column
      'accuticsadsetname': ['accuticsadsetname', 'adsetname'],
      'kpimetric': ['optimizationkpi', 'kpimetric', 'kpi'],
      'language': ['language'],
      'startdate': ['startdate'],
      'enddate': ['enddate']
    };
    
    // Map blocking chart headers to traffic sheet columns
    blockingHeaders.forEach(blockingHeader => {
      const normalizedBlocking = normalize(blockingHeader);
      
      // Try to find a mapping
      for (const [trafficKey, blockingVariants] of Object.entries(mappings)) {
        if (blockingVariants.some(variant => normalizedBlocking.includes(variant))) {
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
    
    console.log(`Brand Say Digital: Total mappings created: ${map.size}`);
  } else if (tabName === 'Brand Say Social' || tabName === 'Other Say Social') {
    const mappings: { [key: string]: string[] } = {
      'platform': ['platform'],
      'startdate': ['startdate', 'start'],
      'enddate': ['enddate', 'end'],
      'objective': ['objective'],
      'buytype': ['buytype'],
      'campaignnametaxonomyfromaccuitics': ['accuticscampaignname', 'campaignname', 'campaignnametaxonomyfromaccuitics'],
      'audience': ['targeting', 'targetingsummary', 'targetingdetails', 'audience'],
      'adsetnametaxonomyfromaccuitics': ['accuticsadsetname', 'adsetname', 'adsetnametaxonomyfromaccuitics'],
      'targetingsummary': ['targeting', 'targetingdetails'],
      'placements': ['placements', 'placement'],
      'optimizationevent': ['optimizationkpi', 'kpimetric', 'kpi'], // Map to Optimization Event
      'language': ['language']
    };
    
    // Map blocking chart headers to traffic sheet columns
    blockingHeaders.forEach(blockingHeader => {
      const normalizedBlocking = normalize(blockingHeader);
      
      // Try to find a mapping
      for (const [trafficKey, blockingVariants] of Object.entries(mappings)) {
        if (blockingVariants.some(variant => normalizedBlocking.includes(variant))) {
          const colNumber = trafficHeaders[trafficKey];
          if (colNumber) {
            map.set(blockingHeader, colNumber);
            break;
          }
        }
      }
    });
  }
  
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
      const isHeaderLabel = ['OBJECTIVE', 'TACTIC', 'PLATFORM', 'DEMO', 'TARGETING DETAILS'].includes(cellValue);
      
      if (isHeaderLabel) {
        // This is a real header label - preserve original styling (blue background, white text)
        targetCell.style = { ...cellData.style };
      } else {
        // This is a data cell or problematic header text - apply black text on transparent fill
        // Clear the cell value if it's problematic template text
        if (['Accutics Campaign Name', 'Audience', 'Accutics Ad Set Name', 'CREATIVE TYPE', 'DEVICE', 'GEO', 'LANGUAGE', 'START DATE', 'END DATE', 'KPI Metric'].includes(cellValue)) {
          targetCell.value = null;
        }
        // Force black text on transparent fill for all non-header cells
        targetCell.style = {
          font: { color: { argb: 'FF000000' } }, // Black text
          fill: { type: 'pattern', pattern: 'none' }, // Transparent fill
          alignment: cellData.style.alignment, // Preserve alignment
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
 * Clears borders from the header area (rows 1-7) for columns D-V
 * Note: Row 8 is the data header row and should keep its borders
 */
function clearHeaderBorders(worksheet: ExcelJS.Worksheet): void {
  console.log(`Clearing header borders for worksheet: ${worksheet.name}`);
  // Clear borders from rows 1-7, columns D onwards
  // Row 8 is the data header and should keep borders
  // Brand Say Digital: D-V (columns 4-22)
  // Brand Say Social and Other Say Social: D-AB (columns 4-28) to cover extended columns
  const endColumn = worksheet.name === 'Brand Say Digital' ? 22 : 28;
  
  for (let rowNum = 1; rowNum <= 7; rowNum++) {
    const row = worksheet.getRow(rowNum);
    for (let colNum = 4; colNum <= endColumn; colNum++) {
      const cell = row.getCell(colNum);
      // Explicitly set border to empty object to remove all borders
      cell.border = {};
    }
  }
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
  const borderStyle: ExcelJS.Border = {
    style: 'thin',
    color: { argb: 'FF000000' } // Black
  };
  
  // Determine the end column based on the worksheet type
  // Brand Say Digital: B through T (columns 2-20)
  // Brand Say Social and Other Say Social: B through Z (columns 2-26)
  const endColumn = worksheet.name === 'Brand Say Digital' ? 20 : 26;
  const endColumnLetter = String.fromCharCode(64 + endColumn);
  
  console.log(`Will apply borders to columns B(2) through ${endColumnLetter}(${endColumn})`);
  
  // Apply borders from column B to the appropriate end column
  for (let rowNum = startRow; rowNum <= endRow; rowNum++) {
    const row = worksheet.getRow(rowNum);
    
    for (let colNum = 2; colNum <= endColumn; colNum++) {
      const cell = row.getCell(colNum);
      cell.style.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
      };
    }
  }
  console.log(`Finished applying borders to ${endRow - startRow + 1} rows, columns 2-${endColumn}`);
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
    if (headerValue.includes('CREATIVE TYPE') || 
        headerValue === 'DEVICE' || 
        headerValue === 'GEO' ||
        headerValue.includes('BUY TYPE') ||
        headerValue.includes('BID TYPE') ||
        headerValue.includes('AD SET BUDGET') ||
        headerValue.includes('TARGETING SUMMARY') ||
        headerValue === 'CREATIVETYPE' ||  // Brand Say Digital uses lowercase
        headerValue === 'DEVICE' ||        // Already covered but explicit
        headerValue === 'GEO') {           // Already covered but explicit
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
  
  // Special handling for Accutics Ad Set Name: merge into 3 groups of 5 rows each
  if (adSetNameColumn !== null) {
    const colLetter = String.fromCharCode(64 + adSetNameColumn);
    const adGroups = [
      { start: startRow, end: startRow + 4 },       // Ad Group 1: rows 9-13
      { start: startRow + 5, end: startRow + 9 },   // Ad Group 2: rows 14-18
      { start: startRow + 10, end: startRow + 14 }  // Ad Group 3: rows 19-23
    ];
    
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
    if (parts.length === 3) {
      // Create date from parts directly to avoid timezone issues
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const day = parseInt(parts[2], 10);
      date = new Date(year, month, day);
    } else {
      date = new Date(dateValue);
    }
  } else {
    date = dateValue;
  }
  
  // Format as 'Sept-26' using local date components (already parsed correctly above)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  
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
    const isHeaderLabel = ['OBJECTIVE', 'TACTIC', 'PLATFORM', 'DEMO', 'TARGETING DETAILS'].includes(cellValue);
    
    if (isHeaderLabel) {
      // This is a real header label - preserve original styling
      // Keep the value and blue styling
    } else {
      // This is either a data cell or a cell with problematic header text
      cell.value = null;
      // Reset styling to black text on no fill
      cell.style = {
        font: { color: { argb: 'FF000000' } }, // Black text
        fill: { type: 'pattern', pattern: 'none' }, // No fill
        alignment: cell.style.alignment, // Preserve alignment
        border: cell.style.border // Preserve borders
      };
    }
  });
  
  // Then populate only cells that have actual data
  columnMap.forEach((colNumber, blockingHeader) => {
    // Convert the blocking header to camelCase to match the data object keys
    const dataKey = toCamelCase(blockingHeader);
    let value = tacticData[dataKey];
    
    // Log KPI-specific data lookup
    if (blockingHeader.toLowerCase().includes('kpi') || blockingHeader.toLowerCase().includes('optimization')) {
      console.log(`KPI Data Lookup: header="${blockingHeader}" → key="${dataKey}" → value="${value}" (${value === undefined ? 'MISSING' : 'FOUND'})`);
      if (value === undefined) {
        console.log(`Available data keys:`, Object.keys(tacticData));
      }
    }
    
    // Check if this is a date field and format it as 'Sept-26'
    const isDateField = blockingHeader.toLowerCase().includes('date') || 
                        blockingHeader.toLowerCase().includes('start') || 
                        blockingHeader.toLowerCase().includes('end');
    
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
      
      // Ensure data cells have black text on transparent fill
      cell.style = {
        font: { color: { argb: 'FF000000' } }, // Black text
        fill: { type: 'pattern', pattern: 'none' }, // Transparent fill
        alignment: cell.style.alignment, // Preserve alignment
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
  const rowsByTab: { [key: string]: any[] } = {
    'Brand Say Digital': [],
    'Brand Say Social': [],
    'Other Say Social': []
  };

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
    const isSummaryRow = channelValue.includes('mpa budget') || 
                        channelValue.includes('variance') || 
                        channelValue.includes('grand total') ||
                        (channelValue.includes('total') && !channelValue.includes('working total'));
    
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
    
    // Needs at least 4 meaningful fields to be a valid tactic row
    // (channel, tactic, and at least 2 other fields like platform, dates, etc.)
    return keysWithValues.length >= 4;
  };

  blockingChartData.rows.forEach((row, index) => {
    const autoCategory = categorizeRow(row, blockingChartData.headers);
    
    // Skip section headers entirely
    if (autoCategory.tab === 'section-header') {
      return;
    }
    
    // Skip rows that aren't valid tactics
    if (!isValidTactic(row)) {
      return;
    }
    
    // Apply manual override if exists
    const finalTab = manualOverrides[index] || autoCategory.tab;
    
    // Add to appropriate tab
    if (rowsByTab[finalTab]) {
      rowsByTab[finalTab].push(row);
    }
  });

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
    
    const row9 = worksheet.getRow(9);
    const headerLabelRow = worksheet.getRow(8);
    
    // Only Brand Say Digital has placeholder text in row 8 that needs to be replaced
    // Brand Say Social and Other Say Social already have proper headers in row 8
    if (tabName === 'Brand Say Digital') {
      // Row 8 has placeholder text - copy row 9 headers to row 8
      console.log(`Row 8 has placeholder text for ${tabName}, copying from row 9`);
      
      row9.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const row8Cell = headerLabelRow.getCell(colNumber);
        row8Cell.value = cell.value;
        row8Cell.style = { ...cell.style };
      });
      
      if (row9.height) {
        headerLabelRow.height = row9.height;
      }
      
      console.log(`Row 8 now has header labels from row 9 for ${tabName}`);
    } else {
      // Row 8 already has proper headers - leave it untouched
      console.log(`Row 8 already has proper headers for ${tabName}, leaving untouched`);
    }
    
    // Create column mapping using the appropriate header row
    // For Brand Say Digital: use row 9 (we copied it to row 8)
    // For Brand Say Social/Other Say Social: use row 8 (original headers)
    const headerRowForMapping = tabName === 'Brand Say Digital' ? row9 : headerLabelRow;
    const columnMap = createColumnMap(tabName, blockingChartData.headers, headerRowForMapping);

    
    const templateStartRow = 9;
    const blockSize = 15; // Total rows: 15 creative lines (no blank separator between tactics)
    
    // Capture the template block ONCE before any modifications (just rows 9-23)
    const templateBlock = captureTemplateBlock(worksheet, templateStartRow, blockSize);
    
    let currentRow = 9; // Start with first tactic data at row 9
    
    // Process each tactic
    tactics.forEach((tacticData, tacticIndex) => {
      // Determine how many audiences (merged cell groups) this tactic has
      const mergeSpan = (tacticData as any)._mergeSpan || 1;
      const numAudiences = mergeSpan; // Number of audiences = merge span
      
      console.log(`Processing tactic ${tacticIndex + 1}/${tactics.length} for ${tabName} - ${numAudiences} audience${numAudiences > 1 ? 's' : ''} detected`);
      
      // Generate 15 creative rows for EACH audience
      for (let audienceIndex = 0; audienceIndex < numAudiences; audienceIndex++) {
        console.log(`  Generating audience ${audienceIndex + 1}/${numAudiences} at row ${currentRow}`);
        
        // Apply the captured template block to current position
        applyTemplateBlock(worksheet, templateBlock, currentRow, templateStartRow);
        
        // Populate only the header row (first row of the block)
        const tacticHeaderRow = worksheet.getRow(currentRow);
        populateTacticHeaderRow(tacticHeaderRow, tacticData, columnMap);
        
        // Merge tactic data cells vertically across 15 rows (currentRow through currentRow+14)
        // This includes row 9 (first tactic data/creative row) through row 23 (15th creative row)
        // Also merges Creative Type, Device, and Geo columns
        console.log(`🎯 About to call mergeTacticDataCells for tactic ${tacticIndex + 1}/${tactics.length}, audience ${audienceIndex + 1} at row ${currentRow}`);
        // For Brand Say Digital, we need to pass row 8 (headerLabelRow) because row 9 has been populated with data
        // For social tabs, we pass row 8 (headerLabelRow) which already has proper headers
        mergeTacticDataCells(worksheet, currentRow, 15, columnMap, headerLabelRow);
        
        // Move to next block position (15 rows for this audience)
        currentRow += blockSize;
      }
    });
    
    // Apply borders to the entire tactic area (from header row 8 to last tactic)
    if (tactics.length > 0) {
      console.log(`Applying borders to tactic area: rows 8 to ${currentRow - 1}`);
      applyBordersToTacticArea(worksheet, 8, currentRow - 1);
    }
    
    // FINAL PASS: Explicitly remove ALL borders from rows 1-7 to ensure clean header
    // Note: Row 8 is the data header row and should keep its borders
    // Brand Say Digital: D-V (columns 4-22)
    // Brand Say Social and Other Say Social: D-AB (columns 4-28)
    const finalPassEndColumn = worksheet.name === 'Brand Say Digital' ? 22 : 28;
    console.log(`Final pass: Removing all borders from rows 1-7, columns D-${String.fromCharCode(64 + finalPassEndColumn)} for worksheet: ${worksheet.name}`);
    for (let rowNum = 1; rowNum <= 7; rowNum++) {
      const row = worksheet.getRow(rowNum);
      for (let colNum = 4; colNum <= finalPassEndColumn; colNum++) {
        const cell = row.getCell(colNum);
        cell.border = {};
      }
    }
  }

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
