/**
 * Configuration constants for Excel processing
 * Centralizes all magic numbers and hardcoded values
 */

// Traffic Sheet Generation Configuration
export const TRAFFIC_SHEET_CONFIG = {
  // Block structure
  CREATIVE_LINES_PER_TACTIC: 15,
  AD_GROUPS_PER_TACTIC: 3,
  CREATIVES_PER_AD_GROUP: 5,

  // Row positions
  HEADER_LABEL_ROW: 8,
  FIRST_DATA_ROW: 9,
  TEMPLATE_START_ROW: 9,

  // Header area (rows without borders)
  HEADER_AREA_START_ROW: 1,
  HEADER_AREA_END_ROW: 7,

  // Column ranges for border clearing
  BRAND_SAY_DIGITAL_START_COL: 4, // Column D
  BRAND_SAY_DIGITAL_END_COL: 22,  // Column V
  BRAND_SAY_SOCIAL_START_COL: 4,  // Column D
  BRAND_SAY_SOCIAL_END_COL: 28,   // Column AB

  // Border configuration by tab
  BORDER_CONFIG: {
    'Brand Say Digital': {
      start: 2, // Column B
      end: 19,  // Column S
      exclude: [] as number[]
    },
    'Brand Say Social': {
      start: 2, // Column B
      end: 26, // Column Z
      exclude: [] as number[]
    },
    'Other Say Social': {
      start: 2, // Column B
      end: 24, // Column X
      exclude: [] as number[]
    }
  }
} as const;

// Blocking Chart Parsing Configuration
export const PARSING_CONFIG = {
  // Header detection
  MIN_HEADER_CELLS: 3, // Minimum non-empty cells to consider a row as header
  MAX_METADATA_ROWS: 5, // Maximum rows to scan for metadata before header

  // Required header keywords for validation
  REQUIRED_HEADER_KEYWORDS: ['channel', 'tactic', 'platform'] as const,

  // Budget column exact matches (strict matching to avoid false positives)
  BUDGET_COLUMN_NAMES: [
    'Gross Media Cost',
    'Media Cost',
    'Working Media Budget',
    'Budget'
  ] as const,

  // Common headers for validation
  COMMON_HEADERS: ['channel', 'tactic', 'platform', 'budget'] as const,

  // Minimum fields for valid tactic row
  MIN_TACTIC_FIELDS: 4
} as const;

// Template Detection Configuration
export const TEMPLATE_CONFIG = {
  // Minimum extended columns to qualify as "Extended" template
  MIN_EXTENDED_COLUMNS: 2,

  // Detection priority (higher number = higher priority)
  TEMPLATE_PRIORITY: {
    'unilever-extended': 2,
    'unilever-standard': 1
  }
} as const;

// Column Mapping Configuration
export const COLUMN_MAPPING_CONFIG = {
  // Base mappings shared across all tabs
  BASE_MAPPINGS: {
    'platform': ['platform'],
    'startdate': ['startdate', 'startDate'],
    'enddate': ['enddate', 'endDate'],
    'objective': ['objective'],
    'language': ['language']
  },

  // Tab-specific mapping overrides
  TAB_SPECIFIC_MAPPINGS: {
    'Brand Say Digital': {
      'tactic': ['tactic'],
      'accuticscampaignname': ['accuticscampaignname', 'campaignname'],
      'demo': ['demo'],
      'audience': ['targeting', 'targetingdetails', 'audience'],
      'accuticsadsetname': ['accuticsadsetname', 'adsetname'],
      'kpimetric': ['optimizationkpi', 'kpimetric', 'kpi']
    },
    'Brand Say Social': {
      'buytype': ['buytype'],
      'campaignnametaxonomyfromaccuitics': ['accuticscampaignname', 'campaignname', 'campaignnametaxonomyfromaccuitics'],
      'audience': ['targeting', 'targetingsummary', 'targetingdetails', 'audience'],
      'adsetnametaxonomyfromaccuitics': ['accuticsadsetname', 'adsetname', 'adsetnametaxonomyfromaccuitics'],
      'targetingsummary': ['targeting', 'targetingdetails'],
      'placements': ['placements', 'placement'],
      'optimizationevent': ['optimizationkpi', 'kpimetric', 'kpi']
    },
    'Other Say Social': {
      'buytype': ['buytype'],
      'campaignnametaxonomyfromaccuitics': ['accuticscampaignname', 'campaignname', 'campaignnametaxonomyfromaccuitics'],
      'audience': ['targeting', 'targetingsummary', 'targetingdetails', 'audience'],
      'adsetnametaxonomyfromaccuitics': ['accuticsadsetname', 'adsetname', 'adsetnametaxonomyfromaccuitics'],
      'targetingsummary': ['targeting', 'targetingdetails'],
      'placements': ['placements', 'placement'],
      'optimizationevent': ['optimizationkpi', 'kpimetric', 'kpi']
    }
  }
} as const;

// Categorization Rules Configuration
export const CATEGORIZATION_CONFIG = {
  // Channel keywords for Brand Say Digital
  BRAND_SAY_DIGITAL_KEYWORDS: [
    'digital video',
    'digital display',
    'digital audio',
    'programmatic',
    'ctv',
    'audio',
    'ooh'
  ] as const,

  // Social platform identifiers
  SOCIAL_PLATFORMS: [
    'meta',
    'facebook',
    'instagram',
    'fb',
    'ig',
    'tiktok',
    'tik tok',
    'pinterest',
    'pin',
    'reddit',
    'snapchat',
    'snap',
    'twitter',
    'x.com',
    'linkedin'
  ] as const,

  // Section header patterns (excluded from output)
  SECTION_HEADER_PATTERNS: [
    'digital video',
    'digital display',
    'digital audio',
    'paid social',
    'social',
    'video',
    'display',
    'audio'
  ] as const,

  // Influencer detection keywords
  INFLUENCER_KEYWORDS: ['influencer'] as const,

  // Paid social keywords
  PAID_SOCIAL_KEYWORDS: ['paid social', 'social'] as const,

  // Summary row patterns (excluded from tactics)
  SUMMARY_ROW_PATTERNS: [
    'mpa budget',
    'variance',
    'grand total'
  ] as const
} as const;

// Styling Configuration
export const STYLE_CONFIG = {
  // Header labels that should preserve blue styling
  HEADER_LABELS: [
    'OBJECTIVE',
    'TACTIC',
    'PLATFORM',
    'DEMO',
    'TARGETING DETAILS'
  ] as const,

  // Problematic template text that should be cleared
  TEMPLATE_TEXT_TO_CLEAR: [
    'Accutics Campaign Name',
    'Audience',
    'Accutics Ad Set Name',
    'CREATIVE TYPE',
    'DEVICE',
    'GEO',
    'LANGUAGE',
    'START DATE',
    'END DATE',
    'KPI Metric'
  ] as const,

  // Columns that should be merged vertically in tactic blocks
  MERGEABLE_COLUMN_HEADERS: [
    'CREATIVE TYPE',
    'DEVICE',
    'GEO',
    'BUY TYPE',
    'BID TYPE',
    'AD SET BUDGET',
    'TARGETING SUMMARY',
    'CREATIVETYPE' // Brand Say Digital lowercase variant
  ] as const
} as const;

// Validation Configuration
export const VALIDATION_CONFIG = {
  // Required fields for a valid tactic
  REQUIRED_TACTIC_FIELDS: ['channel', 'tactic'] as const,

  // Numeric fields that should be validated
  NUMERIC_FIELDS: [
    'budget',
    'mediaCost',
    'cpmCpp',
    'impressionsGrps',
    'adServing',
    'dvCost',
    'mediaFeeTotal',
    'workingMediaBudget'
  ] as const,

  // Date fields that should be validated
  DATE_FIELDS: [
    'startDate',
    'endDate'
  ] as const
} as const;

// Date Formatting Configuration
export const DATE_CONFIG = {
  // Month abbreviations for traffic sheet format
  MONTH_NAMES: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ] as const
} as const;
