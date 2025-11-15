/**
 * Test Data Generator for QuickClick Media Tools
 *
 * Generates realistic blocking chart Excel files for testing:
 * - Valid campaign data
 * - Edge cases (date formats, platform variations, etc.)
 * - Structural variations (merged cells, summary rows)
 * - Performance testing (large datasets)
 */

import ExcelJS from 'exceljs';
import { UNIFIED_TEMPLATE_CONFIG } from '@quickclick/shared/excel';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface CampaignData {
  channel?: string;
  platform?: string;
  mediaType?: string;
  tactic?: string;
  objective?: string;
  buyType?: string;
  language?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  budget?: number | string | null;
  grossBudget?: number | string | null;
  netBudget?: number | string | null;
  cpmCpp?: number | string | null;
  impressionsGrps?: number | string | null;
  placements?: string;
  adFormat?: string;
  unitSize?: string;
  adServing?: number | string | null;
  dvCost?: number | string | null;
  // Meta fields for testing
  _isSummaryRow?: boolean;
  _mergeRows?: number; // How many rows to merge for campaign line
}

export interface TestScenario {
  name: string;
  description: string;
  campaigns: CampaignData[];
  summaryRows?: CampaignData[];
  includeSummary?: boolean;
  expectedErrors?: number;
  expectedWarnings?: number;
  edgeCases?: string[];
}

export interface GeneratorOptions {
  templateType?: 'unified';
  includeHeaders?: boolean;
  includeEmptyRows?: boolean;
  tabName?: string;
  startRow?: number;
}

// ============================================================================
// REALISTIC DATA POOLS
// ============================================================================

const CHANNELS = [
  'Paid Social',
  'Programmatic Display',
  'CTV',
  'Audio Streaming',
  'OLV',
  'Social',
];

const PLATFORMS = {
  'Paid Social': ['Meta', 'TikTok', 'Snapchat', 'Pinterest', 'Reddit', 'LinkedIn'],
  'Programmatic Display': ['TradeDesk', 'DV360', 'Amazon'],
  'CTV': ['TradeDesk', 'DV360', 'Amazon'],
  'Audio Streaming': ['Spotify', 'Pandora'],
  'OLV': ['YouTube', 'TradeDesk', 'DV360'],
  'Social': ['Meta', 'TikTok', 'Instagram', 'Influencer'],
};

const MEDIA_TYPES = {
  'Paid Social': ['Video', 'Static Image', 'Carousel'],
  'Programmatic Display': ['Display', 'Video', 'Native'],
  'CTV': ['Video'],
  'Audio Streaming': ['Audio'],
  'OLV': ['Video'],
  'Social': ['Video', 'Static Image', 'Story'],
};

const OBJECTIVES = ['Reach', 'Video Views', 'Conversions', 'Traffic', 'Engagement', 'Brand Awareness'];
const BUY_TYPES = ['Auction', 'Reservation'];
const LANGUAGES = ['English', 'French', 'Spanish', 'Bilingual'];

const TACTICS = [
  'Q1 Brand Awareness Campaign',
  'Q2 Product Launch',
  'Holiday Shopping Event',
  'Back to School Promotion',
  'Summer Sale Campaign',
  'New Year Resolution Campaign',
  'Spring Collection Launch',
  'Black Friday / Cyber Monday',
];

// ============================================================================
// REALISTIC DATA GENERATION
// ============================================================================

/**
 * Generates a random integer between min and max (inclusive)
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Picks a random item from an array
 */
function randomItem<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)];
}

/**
 * Generates a realistic campaign row with all fields populated
 */
export function generateCampaignRow(overrides: Partial<CampaignData> = {}): CampaignData {
  const channel = overrides.channel || randomItem(CHANNELS);
  const platform = overrides.platform || randomItem(PLATFORMS[channel] || PLATFORMS['Paid Social']);
  const mediaType = overrides.mediaType || randomItem(MEDIA_TYPES[channel] || MEDIA_TYPES['Paid Social']);

  // Generate realistic budget and metrics
  const budget = randomInt(10000, 500000);
  const cpm = randomInt(5, 100) + Math.random();
  const impressions = Math.round((budget / cpm) * 1000);

  // Generate date range (1-3 months)
  const startDate = new Date(2025, 2, randomInt(1, 28)); // March 2025
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + randomInt(1, 3));

  return {
    channel,
    platform,
    mediaType,
    tactic: randomItem(TACTICS),
    objective: randomItem(OBJECTIVES),
    buyType: randomItem(BUY_TYPES),
    language: randomItem(LANGUAGES),
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    budget,
    cpmCpp: Math.round(cpm * 100) / 100,
    impressionsGrps: impressions,
    placements: 'Feed, Stories',
    adFormat: mediaType === 'Video' ? 'In-Feed Video' : 'Static Image',
    unitSize: mediaType === 'Video' ? '1920x1080' : '1080x1080',
    _mergeRows: 1, // Default: single row campaign
    ...overrides,
  };
}

/**
 * Generates multiple realistic campaigns
 */
export function generateCampaigns(count: number, overrides: Partial<CampaignData> = {}): CampaignData[] {
  const campaigns: CampaignData[] = [];
  for (let i = 0; i < count; i++) {
    campaigns.push(generateCampaignRow(overrides));
  }
  return campaigns;
}

/**
 * Generates a summary/total row
 */
export function generateSummaryRow(campaigns: CampaignData[], label: string = 'TOTAL'): CampaignData {
  const totalBudget = campaigns.reduce((sum, c) => sum + (typeof c.budget === 'number' ? c.budget : 0), 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + (typeof c.impressionsGrps === 'number' ? c.impressionsGrps : 0), 0);

  return {
    channel: label,
    platform: '',
    mediaType: '',
    tactic: '',
    budget: totalBudget,
    impressionsGrps: totalImpressions,
    _isSummaryRow: true,
  };
}

// ============================================================================
// EXCEL FILE GENERATION
// ============================================================================

/**
 * Creates the header row based on template configuration
 */
function createHeaderRow(worksheet: ExcelJS.Worksheet, startRow: number = 1) {
  const config = UNIFIED_TEMPLATE_CONFIG;
  const headers = [
    config.COLUMNS.CHANNEL,
    config.COLUMNS.PLATFORM,
    config.COLUMNS.MEDIA_TYPE,
    config.COLUMNS.TACTIC,
    config.COLUMNS.OBJECTIVE,
    config.COLUMNS.BUY_TYPE,
    config.COLUMNS.LANGUAGE,
    config.COLUMNS.START_DATE,
    config.COLUMNS.END_DATE,
    'Gross Budget', // Column E
    'Est. Impressions', // Column F
    'Campaign Details - Placements', // Column G
    'CPM/CPP',
    'Ad Format',
    'Unit Size',
  ];

  const headerRow = worksheet.getRow(startRow);
  headers.forEach((header, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.value = header;
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9E1F2' },
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Set column widths
  worksheet.columns = headers.map((_, i) => ({ width: i === 3 ? 40 : 20 }));
}

/**
 * Writes a campaign row to the worksheet
 */
function writeCampaignRow(
  worksheet: ExcelJS.Worksheet,
  campaign: CampaignData,
  rowNumber: number,
  mergeRows: number = 1
) {
  const row = worksheet.getRow(rowNumber);

  // Column mapping
  const values = [
    campaign.channel || '',
    campaign.platform || '',
    campaign.mediaType || '',
    campaign.tactic || '',
    campaign.objective || '',
    campaign.buyType || '',
    campaign.language || '',
    campaign.startDate || '',
    campaign.endDate || '',
    campaign.budget || '',
    campaign.impressionsGrps || '',
    campaign.placements || '',
    campaign.cpmCpp || '',
    campaign.adFormat || '',
    campaign.unitSize || '',
  ];

  values.forEach((value, index) => {
    row.getCell(index + 1).value = value;
  });

  // Apply merge for campaign lines (Budget, Impressions, Placements)
  if (mergeRows > 1 && !campaign._isSummaryRow) {
    const endRow = rowNumber + mergeRows - 1;
    worksheet.mergeCells(`E${rowNumber}:E${endRow}`); // Budget (column E)
    worksheet.mergeCells(`F${rowNumber}:F${endRow}`); // Impressions (column F)
    worksheet.mergeCells(`G${rowNumber}:G${endRow}`); // Placements (column G)
  }

  return row;
}

/**
 * Generates a complete blocking chart Excel file
 */
export async function generateBlockingChartFile(
  campaigns: CampaignData[],
  options: GeneratorOptions = {}
): Promise<ExcelJS.Workbook> {
  const {
    includeHeaders = true,
    tabName = 'Blocking Chart',
    startRow = 1,
  } = options;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(tabName);

  let currentRow = startRow;

  // Add headers
  if (includeHeaders) {
    createHeaderRow(worksheet, currentRow);
    currentRow++;
  }

  // Add campaigns
  for (const campaign of campaigns) {
    const mergeRows = campaign._mergeRows || 1;
    writeCampaignRow(worksheet, campaign, currentRow, mergeRows);
    currentRow += mergeRows;
  }

  return workbook;
}

/**
 * Saves workbook to file
 */
export async function saveWorkbook(workbook: ExcelJS.Workbook, filepath: string): Promise<void> {
  await workbook.xlsx.writeFile(filepath);
}

/**
 * Generates and saves a test file in one call
 */
export async function generateTestFile(
  scenario: TestScenario,
  outputPath: string
): Promise<void> {
  const campaigns = [...scenario.campaigns];

  // Add summary rows if specified
  if (scenario.includeSummary && scenario.summaryRows) {
    campaigns.push(...scenario.summaryRows);
  } else if (scenario.includeSummary) {
    campaigns.push(generateSummaryRow(scenario.campaigns));
  }

  const workbook = await generateBlockingChartFile(campaigns);
  await saveWorkbook(workbook, outputPath);

  console.log(`✅ Generated test file: ${outputPath}`);
  console.log(`   Campaigns: ${scenario.campaigns.length}`);
  if (scenario.summaryRows) {
    console.log(`   Summary rows: ${scenario.summaryRows.length}`);
  }
  console.log(`   Edge cases: ${scenario.edgeCases?.join(', ') || 'none'}`);
}

// ============================================================================
// EDGE CASE HELPERS
// ============================================================================

/**
 * Creates campaigns with various date format edge cases
 */
export function generateDateFormatVariations(): CampaignData[] {
  return [
    generateCampaignRow({ startDate: '2025-03-15', endDate: '2025-04-30' }), // ISO (correct)
    generateCampaignRow({ startDate: '3/15/2025', endDate: '4/30/2025' }), // US format
    generateCampaignRow({ startDate: 'Mar 15, 2025', endDate: 'Apr 30, 2025' }), // Month name
    generateCampaignRow({ startDate: '15 Mar 2025', endDate: '30 Apr 2025' }), // Day first
    generateCampaignRow({ startDate: '2025/03/15', endDate: '2025/04/30' }), // Alt ISO
    generateCampaignRow({ startDate: null, endDate: null }), // Missing dates
  ];
}

/**
 * Creates campaigns with various platform name variations
 */
export function generatePlatformVariations(): CampaignData[] {
  return [
    generateCampaignRow({ channel: 'Paid Social', platform: 'Meta' }),
    generateCampaignRow({ channel: 'Paid Social', platform: 'Facebook' }),
    generateCampaignRow({ channel: 'Paid Social', platform: 'FB' }),
    generateCampaignRow({ channel: 'Paid Social', platform: ' Instagram ' }), // Whitespace
    generateCampaignRow({ channel: 'Paid Social', platform: 'FACEBOOK' }), // Uppercase
    generateCampaignRow({ channel: 'Paid Social', platform: 'Unknown Platform' }),
  ];
}

/**
 * Creates campaigns with various numeric format edge cases
 */
export function generateNumericVariations(): CampaignData[] {
  return [
    generateCampaignRow({ budget: 50000, cpmCpp: 15.50 }), // Clean numbers
    generateCampaignRow({ budget: '$50,000', cpmCpp: '$15.50' }), // Currency format
    generateCampaignRow({ budget: 'TBD', cpmCpp: 'N/A' }), // Placeholders
    generateCampaignRow({ budget: '50000.00', cpmCpp: 15.5 }), // Mixed formats
    generateCampaignRow({ budget: 0, cpmCpp: 0 }), // Zero values
    generateCampaignRow({ budget: -1000, cpmCpp: -5 }), // Negative values
  ];
}

/**
 * Creates campaigns with budget calculation edge cases
 */
export function generateBudgetCalculationVariations(): CampaignData[] {
  // (impressions / 1000) * cpm = budget
  return [
    generateCampaignRow({ impressionsGrps: 1000000, cpmCpp: 45, budget: 45000 }), // Exact match
    generateCampaignRow({ impressionsGrps: 1000000, cpmCpp: 45, budget: 50000 }), // 11% diff
    generateCampaignRow({ impressionsGrps: 1000000, cpmCpp: 45, budget: 65000 }), // 44% diff
    generateCampaignRow({ impressionsGrps: 500000, cpmCpp: 30, budget: 15000 }), // Exact match
    generateCampaignRow({ impressionsGrps: 2000000, cpmCpp: 20, budget: 50000 }), // 25% diff
  ];
}

/**
 * Creates campaigns with missing required fields
 */
export function generateMissingFieldVariations(): CampaignData[] {
  return [
    generateCampaignRow({ platform: undefined }), // Missing platform
    generateCampaignRow({ channel: undefined }), // Missing channel
    generateCampaignRow({ startDate: undefined }), // Missing start date
    generateCampaignRow({ endDate: undefined }), // Missing end date
    generateCampaignRow({ budget: undefined, cpmCpp: undefined, impressionsGrps: undefined }), // Missing all metrics
  ];
}

/**
 * Creates campaigns with whitespace issues
 */
export function generateWhitespaceVariations(): CampaignData[] {
  return [
    generateCampaignRow({ platform: ' Meta ' }),
    generateCampaignRow({ channel: '  Paid Social  ' }),
    generateCampaignRow({ tactic: 'Campaign  ' }), // Trailing whitespace
    generateCampaignRow({ objective: ' Reach' }), // Leading whitespace
  ];
}

/**
 * Creates a large dataset for performance testing
 */
export function generateLargeDataset(count: number = 100): CampaignData[] {
  return generateCampaigns(count);
}
