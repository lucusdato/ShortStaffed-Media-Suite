"use strict";
/**
 * Shared configuration constants for Excel processing
 * Centralizes all magic numbers, field mappings, and hardcoded values
 * Used by both desktop and web implementations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_CONFIG = exports.DATE_CONFIG = exports.VALIDATION_CONFIG = exports.STYLE_CONFIG = exports.CATEGORIZATION_CONFIG = exports.AD_GROUP_DETECTION_CONFIG = exports.CAMPAIGN_LINE_DETECTION_CONFIG = exports.PARSING_CONFIG = exports.TRAFFIC_SHEET_CONFIG = exports.DEMOGRAPHIC_CONFIG = exports.ROW_EXPANSION_CONFIG = void 0;
/**
 * Row Expansion Configuration
 * Defines the hierarchical structure: Campaign Line → Ad Groups → Creative Lines
 *
 * IMPORTANT: Ad group count is now DYNAMIC based on unique audience values
 * in the blocking chart, not hardcoded by platform
 */
exports.ROW_EXPANSION_CONFIG = {
    // Always 5 creative lines per ad group
    CREATIVES_PER_AD_GROUP: 5,
    // Merge level definitions (which fields merge at which level in TRAFFIC SHEET)
    MERGE_LEVELS: {
        // Campaign-level fields: span all rows in traffic sheet (varies by ad group count)
        CAMPAIGN: [
            'channel',
            'platform',
            'mediaType',
            'objective',
            'startDate',
            'endDate',
            'grossBudget',
            'netBudget',
            'language',
            'placements',
        ],
        // Ad Group-level fields: span 5 rows each (merged across creative lines)
        AD_GROUP: [
            'audience',
            'accuticsCampaignName',
            'targeting',
            'target',
            'kpi',
            'buyType',
        ],
        // Creative-level fields: no merging (unique per row)
        CREATIVE: ['creativeName', 'creativeFormat', 'adFormat'],
    },
    // Traffic sheet merge spans (for generation)
    AD_GROUP_MERGE_SPAN: 5, // Ad group-level fields span 5 rows
    CREATIVE_MERGE_SPAN: 1, // Creative-level fields don't merge
};
/**
 * Demographic Extraction Configuration
 * Used to extract demographic codes from Target field for Brand Say Digital
 */
exports.DEMOGRAPHIC_CONFIG = {
    // Regex pattern to extract demographic codes from Target field
    // Matches patterns like: W25-49, M18-44, A18-65, F21-35
    // Format: [Gender/Age Code][Lower Age]-[Upper Age]
    DEMO_PATTERN: /\b([MWFA])(\d{2})-(\d{2})\b/g,
    // Gender/Age code mappings
    GENDER_CODES: {
        M: 'Men', // Men/Males
        W: 'Women', // Women
        F: 'Women', // Females (alternative)
        A: 'Adults', // Adults (all genders)
    },
    // Fallback if no demographic pattern found
    DEFAULT_DEMO: 'A18+',
};
/**
 * Traffic Sheet Generation Configuration
 */
exports.TRAFFIC_SHEET_CONFIG = {
    // Row expansion
    CREATIVES_PER_AD_GROUP: exports.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP,
    // Row positions
    HEADER_LABEL_ROW: 8,
    FIRST_DATA_ROW: 9,
    TEMPLATE_START_ROW: 9,
    // Header area (rows without borders)
    HEADER_AREA_START_ROW: 1,
    HEADER_AREA_END_ROW: 7,
    // Border configuration by tab
    BORDER_CONFIG: {
        'Brand Say Digital': {
            start: 2, // Column B
            end: 21, // Column U (HEADLINE - last column in template)
            exclude: [],
        },
        'Brand Say Social': {
            start: 2, // Column B
            end: 26, // Column Z
            exclude: [],
        },
        'Other Say Social': {
            start: 2, // Column B
            end: 24, // Column X
            exclude: [],
        },
    },
};
/**
 * Blocking Chart Parsing Configuration
 */
exports.PARSING_CONFIG = {
    // Header detection
    MIN_HEADER_CELLS: 3, // Minimum non-empty cells to consider a row as header
    MAX_METADATA_ROWS: 10, // Maximum rows to scan for metadata before header
    // Required header keywords for validation
    REQUIRED_HEADER_KEYWORDS: ['channel', 'platform', 'objective'],
    // Budget column exact matches (strict matching to avoid false positives)
    BUDGET_COLUMN_NAMES: [
        'Gross Budget',
        'Net Budget',
        'Gross Media Cost',
        'Media Cost',
        'Working Media Budget',
        'Budget',
    ],
    // Impressions column names for campaign line detection
    IMPRESSIONS_COLUMN_NAMES: [
        'Est. Impressions',
        'Estimated Impressions',
        'Impressions',
        'Impressions/GRPs',
    ],
    // Placements column name variations (try in order)
    PLACEMENTS_COLUMN_NAMES: [
        'Campaign Details - Placements', // Primary (unified template)
        'Placements', // Fallback
        'Placement', // Alternative spelling
    ],
    // Audience column name variations (for ad group detection)
    AUDIENCE_COLUMN_NAMES: [
        'Targeting', // Primary field
        'Target', // Alternative
        'Audience', // Alternative
        'Target Audience', // Alternative
    ],
    // Minimum fields for valid campaign line
    MIN_CAMPAIGN_LINE_FIELDS: 4,
};
/**
 * Campaign Line Detection Configuration
 * Defines which columns must be merged together to identify a campaign line
 */
exports.CAMPAIGN_LINE_DETECTION_CONFIG = {
    // These columns MUST have matching merge spans to identify a campaign line
    REQUIRED_MERGE_COLUMNS: [
        'Est. Impressions', // Primary indicator
        'Gross Budget', // Primary indicator
        'Campaign Details - Placements', // Primary indicator (triple-merge detection)
    ],
    // Alternative budget columns to check if primary not found
    BUDGET_ALTERNATIVES: [
        'Net Budget',
        'Gross Media Cost',
        'Working Media Budget',
    ],
    // Patterns to exclude from campaign line detection (summary/total rows)
    EXCLUSION_PATTERNS: [
        'total',
        'subtotal',
        'summary',
        'variance',
        'grand total',
        'mpa budget',
    ],
};
/**
 * Ad Group Detection Configuration (NEW - Audience-Based)
 * Defines how ad groups are identified within campaign lines
 */
exports.AD_GROUP_DETECTION_CONFIG = {
    // Primary field to group by for ad group detection
    PRIMARY_GROUPING_FIELD: 'audience',
    // Fallback fields if primary is empty
    FALLBACK_GROUPING_FIELDS: ['targeting', 'target'],
    // Default ad group name if all grouping fields are empty
    DEFAULT_AD_GROUP_NAME: 'Unspecified',
    // Minimum rows per ad group (if blocking chart has fewer, pad with empty creatives)
    MIN_ROWS_PER_AD_GROUP: 5,
    // Maximum rows per ad group (if blocking chart has more, create additional ad groups)
    MAX_ROWS_PER_AD_GROUP: 5,
};
/**
 * Categorization Rules Configuration
 * Determines which traffic sheet tab a campaign line goes to
 */
exports.CATEGORIZATION_CONFIG = {
    // Channel keywords for Brand Say Digital
    BRAND_SAY_DIGITAL_KEYWORDS: [
        'digital video',
        'digital display',
        'digital audio',
        'programmatic',
        'ctv',
        'audio',
        'ooh',
    ],
    // Social platform identifiers for Brand Say Social
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
        'linkedin',
    ],
    // Influencer detection keywords for Other Say Social
    INFLUENCER_KEYWORDS: ['influencer', 'creator'],
    // Section header patterns (excluded from output)
    SECTION_HEADER_PATTERNS: [
        'digital video',
        'digital display',
        'digital audio',
        'paid social',
        'social',
        'video',
        'display',
        'audio',
    ],
    // Summary row patterns (excluded from tactics)
    SUMMARY_ROW_PATTERNS: [
        'mpa budget',
        'variance',
        'grand total',
    ],
    // Non-digital channels excluded from traffic sheet generation
    // These appear in verification but don't generate traffic sheet rows
    EXCLUDED_CHANNEL_KEYWORDS: {
        OOH: ['pattison', 'astral', 'out of home', 'ooh', 'billboard', 'transit', 'outdoor'],
        TV: ['linear tv', 'television', 'broadcast tv', 'tv broadcast', 'linear television'],
        RADIO: ['radio', 'am/fm', 'am fm'],
        PRINT: ['print', 'magazine', 'newspaper', 'press'],
    },
};
/**
 * Styling Configuration
 * Excel cell styling rules
 */
exports.STYLE_CONFIG = {
    // Header labels that should preserve blue styling
    HEADER_LABELS: [
        'OBJECTIVE',
        'TACTIC',
        'PLATFORM',
        'DEMO',
        'TARGETING DETAILS',
    ],
    // Template text that should be cleared before writing data
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
        'KPI Metric',
    ],
    // Columns that should be merged vertically in traffic sheet blocks
    MERGEABLE_COLUMN_HEADERS: [
        'CREATIVE TYPE',
        'DEVICE',
        'GEO',
        'BUY TYPE',
        'BID TYPE',
        'AD SET BUDGET',
        'TARGETING SUMMARY',
        'CREATIVETYPE', // Brand Say Digital lowercase variant
    ],
};
/**
 * Validation Configuration
 * Rules for data quality validation
 */
exports.VALIDATION_CONFIG = {
    // Required fields for a valid campaign line
    REQUIRED_CAMPAIGN_FIELDS: ['channel', 'platform'],
    // Numeric fields that should be validated
    NUMERIC_FIELDS: [
        'budget',
        'grossBudget',
        'netBudget',
        'estImpressions',
        'estCpm',
        'adServing',
        'dvCost',
        'buffer',
    ],
    // Date fields that should be validated
    DATE_FIELDS: ['startDate', 'endDate'],
};
/**
 * Date Formatting Configuration
 */
exports.DATE_CONFIG = {
    // Month abbreviations for traffic sheet format (D-MMM-YY)
    // Example: "5-Jan-25" for January 5, 2025
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
        'Dec',
    ],
};
/**
 * Template Detection Configuration
 * For identifying blocking chart template versions
 */
exports.TEMPLATE_CONFIG = {
    // Minimum extended columns to qualify as "Extended" template
    MIN_EXTENDED_COLUMNS: 2,
    // Detection priority (higher number = higher priority)
    TEMPLATE_PRIORITY: {
        'unilever-extended': 2,
        'unilever-standard': 1,
    },
    // Maximum rows to scan for headers when detecting template
    MAX_ROWS_TO_SCAN: 20,
    // Prefer first visible tab if valid template found
    PREFER_FIRST_VISIBLE: true,
    // Only show visible tabs in picker UI
    SHOW_HIDDEN_TABS: false,
};
