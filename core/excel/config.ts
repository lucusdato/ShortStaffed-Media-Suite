/**
 * Configuration constants for Excel processing
 * Centralizes all magic numbers and hardcoded values
 */

// Row Expansion Rules - defines the hierarchical structure
// CAMPAIGN LINE (identified by budget/impressions/placements merge) → Variable Ad Groups → 5 Creative Lines Each
//
// Important: A "Campaign Line" is NOT a single blocking chart row!
// - Campaign Line = group of rows where Budget AND Impressions AND Placements columns are merged together
// - If budget is NOT merged (individual row with budget) = 1 campaign line
// - If budget IS merged across N rows = still 1 campaign line
// - Each campaign line → variable rows based on platform/media type
export const ROW_EXPANSION_CONFIG = {
  // Base expansion factors
  CREATIVES_PER_AD_GROUP: 5,         // Each ad group always spans 5 creative lines

  // Platform-specific ad group counts
  AD_GROUP_RULES: {
    // Programmatic platforms (Trade Desk, Amazon, Prime Video, DV360)
    PROGRAMMATIC: {
      PLATFORMS: ['Trade Desk', 'TTD', 'Amazon', 'Amazon DSP', 'Prime Video', 'DV360'] as const,

      // When BOTH display and video exist in the blocking chart
      DISPLAY_WITH_VIDEO: 5,   // Display gets 5 ad groups when video also exists
      VIDEO_WITH_DISPLAY: 4,   // Video gets 4 ad groups when display also exists

      // When ONLY display or ONLY video exists
      DISPLAY_ONLY: 4,         // Display gets 4 ad groups when no video exists
      VIDEO_ONLY: 4,           // Video gets 4 ad groups when no display exists
    },

    // Meta platforms (3 ad groups)
    META: {
      PLATFORMS: ['Meta', 'Facebook', 'Instagram', 'FB', 'IG'] as const,
      AD_GROUPS: 3,
    },

    // Other social platforms (1 ad group)
    OTHER_SOCIAL: {
      PLATFORMS: ['TikTok', 'Tik Tok', 'Pinterest', 'Pin', 'Snapchat', 'Snap', 'Reddit'] as const,
      AD_GROUPS: 1,
    },

    // Non-programmatic display and audio (4 ad groups)
    DISPLAY_AUDIO: {
      MEDIA_TYPES: ['Display', 'Audio'] as const,
      AD_GROUPS: 4,
    },

    // Default for any other platform/channel
    DEFAULT: {
      AD_GROUPS: 3,
    },
  },

  // Merge level definitions (which fields merge at which level in TRAFFIC SHEET)
  MERGE_LEVELS: {
    // Campaign-level fields: span all rows in traffic sheet (varies by platform)
    CAMPAIGN: ['channel', 'platform', 'mediaType', 'objective', 'startDate', 'endDate', 'grossBudget', 'netBudget', 'language'] as const,

    // Ad Group-level fields: span 5 rows each (merged across creative lines)
    AD_GROUP: ['accuticsCampaignName', 'targeting', 'target', 'kpi', 'placements', 'buyType'] as const,

    // Creative-level fields: no merging (unique per row)
    CREATIVE: ['creativeName', 'creativeFormat', 'adFormat'] as const,
  },

  // Traffic sheet merge spans (for generation)
  AD_GROUP_MERGE_SPAN: 5,     // Ad group-level fields span 5 rows
  CREATIVE_MERGE_SPAN: 1,     // Creative-level fields don't merge
} as const;

// Demographic Extraction Configuration
export const DEMOGRAPHIC_CONFIG = {
  // Regex pattern to extract demographic codes from Target field
  // Matches patterns like: W25-49, M18-44, A18-65, F21-35
  // Format: [Gender/Age Code][Lower Age]-[Upper Age]
  DEMO_PATTERN: /\b([MWFA])(\d{2})-(\d{2})\b/g,

  // Gender/Age code mappings
  GENDER_CODES: {
    'M': 'Men',       // Men/Males
    'W': 'Women',     // Women
    'F': 'Women',     // Females (alternative)
    'A': 'Adults'     // Adults (all genders)
  } as const,

  // Fallback if no demographic pattern found
  DEFAULT_DEMO: 'A18+'
} as const;

// Traffic Sheet Generation Configuration
export const TRAFFIC_SHEET_CONFIG = {
  // Block structure (using expansion config for consistency)
  CREATIVES_PER_AD_GROUP: ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP,
  // Note: AD_GROUPS_PER_TACTIC is now dynamic based on platform
  // Note: CREATIVE_LINES_PER_TACTIC is now dynamic based on ad group count

  // Legacy constants for backward compatibility with old generateTrafficSheet function
  // These are deprecated - use ROW_EXPANSION_CONFIG for new code
  AD_GROUPS_PER_TACTIC: 3, // @deprecated - ad groups are now dynamic based on platform
  CREATIVE_LINES_PER_TACTIC: 15, // @deprecated - calculated as ad_groups * 5

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
      end: 19,  // Column S (LANDING PAGE URL w UTM - last column in template)
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

// Unified Unilever Template Configuration (2025 Standard)
// All Unilever clients use this exact column structure
export const UNIFIED_TEMPLATE_CONFIG = {
  // Exact column names from blocking chart (case-sensitive)
  COLUMNS: {
    // Core tactical information
    CHANNEL: 'Channel',
    PLATFORM: 'Platform',
    MEDIA_TYPE: 'Media type',
    BUY_TYPE: 'Buy Type',
    OBJECTIVE: 'Objective',

    // Campaign details
    PLACEMENTS: 'Campaign Details - Placements',
    ACCUTICS_CAMPAIGN_NAME: 'Accutics Campaign Name',
    TAGS_REQUIRED: 'Tags Required',
    MEASUREMENT: 'Measurement',
    LANGUAGE: 'Language',
    AD_FORMAT: 'Ad Format',

    // KPI information
    KPI: 'KPI',
    KPI_VALUE: 'KPI Value',
    TARGET: 'Target',

    // Budget and metrics (CAMPAIGN LINE IDENTIFIERS)
    EST_CPM: 'Est. CPM',
    EST_IMPRESSIONS: 'Est. Impressions',  // MERGE INDICATOR 1
    GROSS_BUDGET: 'Gross Budget',         // MERGE INDICATOR 2
    NET_BUDGET: 'Net Budget',             // MERGE INDICATOR 3
    AD_SERVING: 'Ad Serving',
    DV_COST: 'DV Cost',
    BUFFER: 'Buffer (+30%)',

    // Flight dates
    START_DATE: 'Start Date',
    END_DATE: 'End Date',
  } as const,

  // Campaign line detection - these columns MUST have matching merge spans
  CAMPAIGN_LINE_INDICATORS: [
    'Est. Impressions',  // Primary indicator
    'Gross Budget',      // Primary indicator
    'Net Budget'         // Secondary validation
  ] as const,

  // Normalized field mappings for internal use
  FIELD_MAPPINGS: {
    'Channel': 'channel',
    'Platform': 'platform',
    'Media type': 'mediaType',
    'Buy Type': 'buyType',
    'Objective': 'objective',
    'Campaign Details - Placements': 'placements',
    'Accutics Campaign Name': 'accuticsCampaignName',
    'Tags Required': 'tagsRequired',
    'Measurement': 'measurement',
    'Language': 'language',
    'Ad Format': 'adFormat',
    'KPI': 'kpi',
    'KPI Value': 'kpiValue',
    'Target': 'target',
    'Est. CPM': 'estCpm',
    'Est. Impressions': 'estImpressions',
    'Gross Budget': 'grossBudget',
    'Net Budget': 'netBudget',
    'Ad Serving': 'adServing',
    'DV Cost': 'dvCost',
    'Buffer (+30%)': 'buffer',
    'Start Date': 'startDate',
    'End Date': 'endDate',
  } as const,
} as const;

// Blocking Chart Parsing Configuration
export const PARSING_CONFIG = {
  // Header detection
  MIN_HEADER_CELLS: 3, // Minimum non-empty cells to consider a row as header
  MAX_METADATA_ROWS: 10, // Maximum rows to scan for metadata before header (increased for new template)

  // Required header keywords for validation (updated for unified template)
  REQUIRED_HEADER_KEYWORDS: ['channel', 'platform', 'objective'] as const,

  // Budget column exact matches (strict matching to avoid false positives)
  BUDGET_COLUMN_NAMES: [
    'Gross Budget',
    'Net Budget',
    'Gross Media Cost',
    'Media Cost',
    'Working Media Budget',
    'Budget'
  ] as const,

  // Impressions column names for campaign line detection
  IMPRESSIONS_COLUMN_NAMES: [
    'Est. Impressions',
    'Estimated Impressions',
    'Impressions',
    'Impressions/GRPs'
  ] as const,

  // Common headers for validation
  COMMON_HEADERS: ['channel', 'platform', 'objective', 'budget'] as const,

  // Minimum fields for valid campaign line
  MIN_CAMPAIGN_LINE_FIELDS: 4
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
  ] as const,

  // Non-digital channels excluded from traffic sheet generation
  // These appear in verification but don't generate traffic sheet rows
  EXCLUDED_CHANNEL_KEYWORDS: {
    OOH: ['pattison', 'astral', 'out of home', 'ooh', 'billboard', 'transit', 'outdoor'] as const,
    TV: ['linear tv', 'television', 'broadcast tv', 'tv broadcast', 'linear television'] as const,
    RADIO: ['radio', 'am/fm', 'am fm'] as const,
    PRINT: ['print', 'magazine', 'newspaper', 'press'] as const
  } as const
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
  // Required fields for a valid campaign line (unified template uses 'mediaType' instead of 'tactic')
  REQUIRED_TACTIC_FIELDS: ['channel', 'platform'] as const, // 'mediaType' is optional

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
