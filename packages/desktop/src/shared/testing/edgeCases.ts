/**
 * Predefined Edge Case Scenarios for QuickClick Media Tools Testing
 *
 * Each scenario tests specific validation logic, parsing behavior, or edge cases
 */

import {
  generateCampaignRow,
  generateSummaryRow,
  generateDateFormatVariations,
  generatePlatformVariations,
  generateNumericVariations,
  generateBudgetCalculationVariations,
  generateMissingFieldVariations,
  generateWhitespaceVariations,
  generateLargeDataset,
  type TestScenario,
  type CampaignData,
} from './testDataGenerator';

// ============================================================================
// HAPPY PATH SCENARIOS
// ============================================================================

export const SCENARIO_SIMPLE_META: TestScenario = {
  name: 'Simple Meta Campaign',
  description: 'Single valid Meta campaign with all required fields',
  campaigns: [
    generateCampaignRow({
      channel: 'Paid Social',
      platform: 'Meta',
      mediaType: 'Video',
      budget: 50000,
      cpmCpp: 15.50,
      impressionsGrps: 1000000,
    }),
  ],
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: [],
};

export const SCENARIO_ALL_PLATFORMS: TestScenario = {
  name: 'All Supported Platforms',
  description: 'One campaign for each major platform to test categorization',
  campaigns: [
    generateCampaignRow({ channel: 'Paid Social', platform: 'Meta' }),
    generateCampaignRow({ channel: 'Paid Social', platform: 'TikTok' }),
    generateCampaignRow({ channel: 'Paid Social', platform: 'Snapchat' }),
    generateCampaignRow({ channel: 'Paid Social', platform: 'Pinterest' }),
    generateCampaignRow({ channel: 'Programmatic Display', platform: 'TradeDesk' }),
    generateCampaignRow({ channel: 'Programmatic Display', platform: 'DV360' }),
    generateCampaignRow({ channel: 'Programmatic Display', platform: 'Amazon' }),
  ],
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: ['allPlatforms', 'categorization'],
};

export const SCENARIO_MULTI_ROW_CAMPAIGNS: TestScenario = {
  name: 'Multi-Row Campaigns',
  description: 'Campaigns that span multiple rows (merged cells)',
  campaigns: [
    { ...generateCampaignRow({ platform: 'Meta' }), _mergeRows: 2 },
    { ...generateCampaignRow({ platform: 'TradeDesk' }), _mergeRows: 3 },
    { ...generateCampaignRow({ platform: 'TikTok' }), _mergeRows: 2 },
  ],
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: ['mergePatterns', 'campaignLineDetection'],
};

// ============================================================================
// DATE FORMAT EDGE CASES
// ============================================================================

export const SCENARIO_DATE_FORMATS: TestScenario = {
  name: 'Date Format Variations',
  description: 'Various date formats that should auto-convert to ISO',
  campaigns: generateDateFormatVariations(),
  expectedErrors: 1, // Null dates will error
  expectedWarnings: 0,
  edgeCases: ['dateFormats', 'autoCorrection'],
};

export const SCENARIO_INVALID_DATE_RANGES: TestScenario = {
  name: 'Invalid Date Ranges',
  description: 'Start dates after end dates',
  campaigns: [
    generateCampaignRow({ startDate: '2025-04-30', endDate: '2025-03-15' }), // Reversed
    generateCampaignRow({ startDate: '2025-03-15', endDate: '2025-03-15' }), // Same day
    generateCampaignRow({ startDate: '2024-01-01', endDate: '2024-12-31' }), // Past dates
  ],
  expectedErrors: 1, // Reversed dates
  expectedWarnings: 0,
  edgeCases: ['dateValidation'],
};

// ============================================================================
// PLATFORM NAME EDGE CASES
// ============================================================================

export const SCENARIO_PLATFORM_VARIATIONS: TestScenario = {
  name: 'Platform Name Variations',
  description: 'Various platform name formats that should normalize',
  campaigns: generatePlatformVariations(),
  expectedErrors: 0,
  expectedWarnings: 1, // Unknown platform warning
  edgeCases: ['platformNames', 'autoCorrection', 'normalization'],
};

// ============================================================================
// NUMERIC FORMAT EDGE CASES
// ============================================================================

export const SCENARIO_NUMERIC_FORMATS: TestScenario = {
  name: 'Numeric Format Variations',
  description: 'Currency symbols, placeholders, negative values',
  campaigns: generateNumericVariations(),
  expectedErrors: 0, // Placeholders are allowed
  expectedWarnings: 2, // Negative values + zero values
  edgeCases: ['numericFormats', 'autoCorrection'],
};

export const SCENARIO_BUDGET_CALCULATIONS: TestScenario = {
  name: 'Budget Calculation Warnings',
  description: 'Budget calculations with various degrees of mismatch',
  campaigns: generateBudgetCalculationVariations(),
  expectedErrors: 0,
  expectedWarnings: 3, // 3 campaigns have >10% difference
  edgeCases: ['budgetCalculation'],
};

// ============================================================================
// MISSING FIELD EDGE CASES
// ============================================================================

export const SCENARIO_MISSING_FIELDS: TestScenario = {
  name: 'Missing Required Fields',
  description: 'Campaigns with missing required fields',
  campaigns: generateMissingFieldVariations(),
  expectedErrors: 5, // All 5 campaigns have missing required fields
  expectedWarnings: 0,
  edgeCases: ['missingFields', 'validation'],
};

// ============================================================================
// WHITESPACE EDGE CASES
// ============================================================================

export const SCENARIO_WHITESPACE: TestScenario = {
  name: 'Whitespace Issues',
  description: 'Leading/trailing whitespace in various fields',
  campaigns: generateWhitespaceVariations(),
  expectedErrors: 0,
  expectedWarnings: 4, // Whitespace warnings
  edgeCases: ['whitespace', 'autoCorrection'],
};

// ============================================================================
// SUMMARY ROW EDGE CASES
// ============================================================================

export const SCENARIO_SUMMARY_ROWS: TestScenario = {
  name: 'Summary Row Detection',
  description: 'Mix of campaigns and summary rows that should be filtered',
  campaigns: [
    generateCampaignRow({ platform: 'Meta' }),
    generateCampaignRow({ platform: 'TikTok' }),
  ],
  summaryRows: [
    generateSummaryRow([
      generateCampaignRow({ budget: 50000, impressionsGrps: 1000000 }),
      generateCampaignRow({ budget: 30000, impressionsGrps: 600000 }),
    ], 'TOTAL'),
    generateSummaryRow([
      generateCampaignRow({ budget: 80000, impressionsGrps: 1600000 }),
    ], 'Grand Total'),
  ],
  includeSummary: true,
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: ['summaryRows', 'rowFiltering'],
};

export const SCENARIO_SUMMARY_IN_MIDDLE: TestScenario = {
  name: 'Summary Row in Middle',
  description: 'Summary row appearing between campaigns',
  campaigns: [
    generateCampaignRow({ platform: 'Meta' }),
    { ...generateSummaryRow([generateCampaignRow()], 'Subtotal'), _isSummaryRow: true },
    generateCampaignRow({ platform: 'TikTok' }),
    { ...generateSummaryRow([generateCampaignRow(), generateCampaignRow()], 'TOTAL'), _isSummaryRow: true },
  ],
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: ['summaryRows', 'rowFiltering', 'edgeCases'],
};

// ============================================================================
// STRUCTURAL EDGE CASES
// ============================================================================

export const SCENARIO_PARTIAL_MERGES: TestScenario = {
  name: 'Partial Merge Patterns',
  description: 'Campaigns with incomplete merge patterns (should NOT detect as campaign lines)',
  campaigns: [
    // Valid: All three columns merged
    { ...generateCampaignRow({ platform: 'Meta' }), _mergeRows: 2 },
    // Invalid: Only budget merged (not a campaign line)
    generateCampaignRow({ platform: 'TikTok' }), // Will need manual merge in actual implementation
  ],
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: ['mergePatterns', 'campaignLineDetection'],
};

export const SCENARIO_EMPTY_ROWS: TestScenario = {
  name: 'Empty Rows',
  description: 'Empty rows scattered between campaigns',
  campaigns: [
    generateCampaignRow({ platform: 'Meta' }),
    {}, // Empty row
    generateCampaignRow({ platform: 'TikTok' }),
    {}, // Empty row
    generateCampaignRow({ platform: 'TradeDesk' }),
  ],
  expectedErrors: 2, // Empty rows treated as campaigns with missing fields
  expectedWarnings: 0,
  edgeCases: ['emptyRows', 'rowFiltering'],
};

// ============================================================================
// PERFORMANCE EDGE CASES
// ============================================================================

export const SCENARIO_LARGE_DATASET: TestScenario = {
  name: 'Large Dataset (100 campaigns)',
  description: 'Performance test with 100 campaigns',
  campaigns: generateLargeDataset(100),
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: ['performance', 'scalability'],
};

export const SCENARIO_VERY_LARGE_DATASET: TestScenario = {
  name: 'Very Large Dataset (500 campaigns)',
  description: 'Stress test with 500 campaigns',
  campaigns: generateLargeDataset(500),
  expectedErrors: 0,
  expectedWarnings: 0,
  edgeCases: ['performance', 'scalability', 'memory'],
};

// ============================================================================
// COMPLEX MIXED SCENARIOS
// ============================================================================

export const SCENARIO_KITCHEN_SINK: TestScenario = {
  name: 'Kitchen Sink',
  description: 'Mix of valid campaigns, edge cases, and errors',
  campaigns: [
    // Valid campaigns
    generateCampaignRow({ platform: 'Meta' }),
    generateCampaignRow({ platform: 'TikTok' }),

    // Date format variations
    generateCampaignRow({ startDate: '3/15/2025', endDate: '4/30/2025' }),

    // Platform variations
    generateCampaignRow({ platform: 'Facebook' }), // Should normalize to Meta
    generateCampaignRow({ platform: ' Instagram ' }), // Whitespace

    // Numeric variations
    generateCampaignRow({ budget: '$50,000', cpmCpp: '15.50' }),
    generateCampaignRow({ budget: 'TBD', cpmCpp: 'N/A' }),

    // Missing fields
    generateCampaignRow({ platform: undefined }),

    // Whitespace
    generateCampaignRow({ channel: '  Paid Social  ' }),

    // Budget mismatch
    generateCampaignRow({ impressionsGrps: 1000000, cpmCpp: 45, budget: 65000 }),
  ],
  summaryRows: [
    generateSummaryRow([generateCampaignRow()], 'TOTAL'),
  ],
  includeSummary: true,
  expectedErrors: 2, // TBD budget + missing platform
  expectedWarnings: 5, // Whitespace + budget mismatch + platform variations
  edgeCases: ['comprehensive', 'mixed', 'realistic'],
};

// ============================================================================
// SCENARIO REGISTRY
// ============================================================================

export const ALL_SCENARIOS: Record<string, TestScenario> = {
  'simple-meta': SCENARIO_SIMPLE_META,
  'all-platforms': SCENARIO_ALL_PLATFORMS,
  'multi-row': SCENARIO_MULTI_ROW_CAMPAIGNS,
  'date-formats': SCENARIO_DATE_FORMATS,
  'date-ranges': SCENARIO_INVALID_DATE_RANGES,
  'platforms': SCENARIO_PLATFORM_VARIATIONS,
  'numeric': SCENARIO_NUMERIC_FORMATS,
  'budget': SCENARIO_BUDGET_CALCULATIONS,
  'missing-fields': SCENARIO_MISSING_FIELDS,
  'whitespace': SCENARIO_WHITESPACE,
  'summary': SCENARIO_SUMMARY_ROWS,
  'summary-middle': SCENARIO_SUMMARY_IN_MIDDLE,
  'partial-merge': SCENARIO_PARTIAL_MERGES,
  'empty-rows': SCENARIO_EMPTY_ROWS,
  'large': SCENARIO_LARGE_DATASET,
  'very-large': SCENARIO_VERY_LARGE_DATASET,
  'kitchen-sink': SCENARIO_KITCHEN_SINK,
};

/**
 * Get a scenario by key
 */
export function getScenario(key: string): TestScenario | undefined {
  return ALL_SCENARIOS[key];
}

/**
 * List all available scenarios
 */
export function listScenarios(): { key: string; name: string; description: string }[] {
  return Object.entries(ALL_SCENARIOS).map(([key, scenario]) => ({
    key,
    name: scenario.name,
    description: scenario.description,
  }));
}
