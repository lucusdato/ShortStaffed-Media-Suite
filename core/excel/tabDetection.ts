import ExcelJS from "exceljs";
import { PARSING_CONFIG, TAB_DETECTION_CONFIG } from "./config";

export interface TabInfo {
  name: string;
  index: number;
  rowCount: number;
  isHidden: boolean;
  hasValidTemplate: boolean;
  state: 'visible' | 'hidden' | 'veryHidden';
}

/**
 * Extracts metadata about all worksheets in an Excel file
 * Used to present tab selection UI when auto-detection fails
 */
export async function getWorksheetInfo(fileBuffer: ArrayBuffer): Promise<TabInfo[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(fileBuffer);

  const tabsInfo: TabInfo[] = [];

  workbook.worksheets.forEach((worksheet, index) => {
    // Determine if worksheet is hidden
    // ExcelJS uses state: 'visible' | 'hidden' | 'veryHidden'
    const state = (worksheet as any).state || 'visible';
    const isHidden = state !== 'visible';

    // Get row count (actual rows with data)
    const rowCount = worksheet.actualRowCount || 0;

    // Check if this tab has a valid Unilever template by scanning headers
    const hasValidTemplate = detectTemplateOnTab(worksheet);

    tabsInfo.push({
      name: worksheet.name,
      index,
      rowCount,
      isHidden,
      hasValidTemplate,
      state,
    });
  });

  console.log('📊 Worksheet Info Extracted:');
  tabsInfo.forEach(tab => {
    console.log(`  Tab ${tab.index}: "${tab.name}" - ${tab.rowCount} rows, ${tab.state}, template: ${tab.hasValidTemplate ? '✓' : '✗'}`);
  });

  return tabsInfo;
}

/**
 * Quick check if a worksheet contains a valid Unilever template
 * Scans first N rows for required header keywords without full parsing
 */
export function detectTemplateOnTab(worksheet: ExcelJS.Worksheet): boolean {
  try {
    let foundHeaderRow = false;

    // Scan first MAX_ROWS_TO_SCAN rows for headers
    for (let rowNum = 1; rowNum <= Math.min(TAB_DETECTION_CONFIG.MAX_ROWS_TO_SCAN, worksheet.rowCount); rowNum++) {
      const row = worksheet.getRow(rowNum);

      // Count non-empty cells
      const values = row.values as any[];
      const nonEmptyCount = values.filter((v) => v !== null && v !== undefined && v !== "").length;

      if (nonEmptyCount >= PARSING_CONFIG.MIN_HEADER_CELLS) {
        // Extract potential headers
        const potentialHeaders: string[] = [];
        row.eachCell({ includeEmpty: true }, (cell) => {
          const value = getCellValueQuick(cell);
          if (value) {
            potentialHeaders.push(String(value).trim().toLowerCase());
          }
        });

        // Check if this row has required header keywords
        const hasRequiredKeywords = PARSING_CONFIG.REQUIRED_HEADER_KEYWORDS.every(keyword =>
          potentialHeaders.some(h => h.includes(keyword))
        );

        if (hasRequiredKeywords) {
          foundHeaderRow = true;
          break;
        }
      }
    }

    return foundHeaderRow;
  } catch (error) {
    console.warn(`Error detecting template on worksheet "${worksheet.name}":`, error);
    return false;
  }
}

/**
 * Quick cell value extraction (simplified version for detection)
 */
function getCellValueQuick(cell: ExcelJS.Cell): string | number | null {
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

  // Return primitive values
  return cell.value as string | number;
}

/**
 * Finds the first visible worksheet with a valid template
 * Returns null if no valid template found (triggers tab picker UI)
 */
export async function findBestTab(fileBuffer: ArrayBuffer): Promise<{
  tabIndex: number | null;
  allTabs: TabInfo[];
  autoDetected: boolean;
}> {
  const allTabs = await getWorksheetInfo(fileBuffer);

  // Filter to visible tabs only
  const visibleTabs = TAB_DETECTION_CONFIG.SHOW_HIDDEN_TABS
    ? allTabs
    : allTabs.filter(tab => !tab.isHidden);

  console.log(`\n🔍 Tab Detection: ${visibleTabs.length} visible tabs to check`);

  // Try to find first visible tab with valid template
  if (TAB_DETECTION_CONFIG.PREFER_FIRST_VISIBLE) {
    const firstValidTab = visibleTabs.find(tab => tab.hasValidTemplate);

    if (firstValidTab) {
      console.log(`✅ Auto-detected valid template on tab ${firstValidTab.index}: "${firstValidTab.name}"`);
      return {
        tabIndex: firstValidTab.index,
        allTabs: visibleTabs,
        autoDetected: true,
      };
    }
  }

  console.log(`⚠️  No valid template auto-detected. Showing tab picker.`);
  return {
    tabIndex: null,
    allTabs: visibleTabs,
    autoDetected: false,
  };
}

/**
 * Gets a specific worksheet by index from file buffer
 * Used after user selects a tab from the picker
 */
export async function getWorksheetByIndex(
  fileBuffer: ArrayBuffer,
  tabIndex: number
): Promise<ExcelJS.Worksheet | null> {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);

    const worksheet = workbook.worksheets[tabIndex];
    if (!worksheet) {
      console.error(`Worksheet at index ${tabIndex} not found`);
      return null;
    }

    return worksheet;
  } catch (error) {
    console.error(`Error loading worksheet at index ${tabIndex}:`, error);
    return null;
  }
}
