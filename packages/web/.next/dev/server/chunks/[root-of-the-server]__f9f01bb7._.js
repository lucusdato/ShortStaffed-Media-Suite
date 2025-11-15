module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/constants [external] (constants, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("constants", () => require("constants"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[project]/packages/shared/excel/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared configuration constants for Excel processing
 * Centralizes all magic numbers, field mappings, and hardcoded values
 * Used by both desktop and web implementations
 */ /**
 * Row Expansion Configuration
 * Defines the hierarchical structure: Campaign Line → Ad Groups → Creative Lines
 *
 * IMPORTANT: Ad group count is now DYNAMIC based on unique audience values
 * in the blocking chart, not hardcoded by platform
 */ __turbopack_context__.s([
    "AD_GROUP_DETECTION_CONFIG",
    ()=>AD_GROUP_DETECTION_CONFIG,
    "CAMPAIGN_LINE_DETECTION_CONFIG",
    ()=>CAMPAIGN_LINE_DETECTION_CONFIG,
    "CATEGORIZATION_CONFIG",
    ()=>CATEGORIZATION_CONFIG,
    "DATE_CONFIG",
    ()=>DATE_CONFIG,
    "DEMOGRAPHIC_CONFIG",
    ()=>DEMOGRAPHIC_CONFIG,
    "PARSING_CONFIG",
    ()=>PARSING_CONFIG,
    "ROW_EXPANSION_CONFIG",
    ()=>ROW_EXPANSION_CONFIG,
    "STYLE_CONFIG",
    ()=>STYLE_CONFIG,
    "TEMPLATE_CONFIG",
    ()=>TEMPLATE_CONFIG,
    "TRAFFIC_SHEET_CONFIG",
    ()=>TRAFFIC_SHEET_CONFIG,
    "VALIDATION_CONFIG",
    ()=>VALIDATION_CONFIG
]);
const ROW_EXPANSION_CONFIG = {
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
            'buyType'
        ],
        // Ad Group-level fields: span 5 rows each (merged across creative lines)
        AD_GROUP: [
            'audience',
            'accuticsCampaignName',
            'targeting',
            'target',
            'kpi'
        ],
        // Creative-level fields: no merging (unique per row)
        CREATIVE: [
            'creativeName',
            'creativeFormat',
            'adFormat'
        ]
    },
    // Traffic sheet merge spans (for generation)
    AD_GROUP_MERGE_SPAN: 5,
    CREATIVE_MERGE_SPAN: 1
};
const DEMOGRAPHIC_CONFIG = {
    // Regex pattern to extract demographic codes from Target field
    // Matches patterns like: W25-49, M18-44, A18-65, F21-35
    // Format: [Gender/Age Code][Lower Age]-[Upper Age]
    DEMO_PATTERN: /\b([MWFA])(\d{2})-(\d{2})\b/g,
    // Gender/Age code mappings
    GENDER_CODES: {
        M: 'Men',
        W: 'Women',
        F: 'Women',
        A: 'Adults'
    },
    // Fallback if no demographic pattern found
    DEFAULT_DEMO: 'A18+'
};
const TRAFFIC_SHEET_CONFIG = {
    // Row expansion
    CREATIVES_PER_AD_GROUP: ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP,
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
            start: 2,
            end: 21,
            exclude: []
        },
        'Brand Say Social': {
            start: 2,
            end: 26,
            exclude: []
        },
        'Other Say Social': {
            start: 2,
            end: 24,
            exclude: []
        }
    }
};
const PARSING_CONFIG = {
    // Header detection
    MIN_HEADER_CELLS: 3,
    MAX_METADATA_ROWS: 10,
    // Required header keywords for validation
    REQUIRED_HEADER_KEYWORDS: [
        'channel',
        'platform',
        'objective'
    ],
    // Budget column exact matches (strict matching to avoid false positives)
    BUDGET_COLUMN_NAMES: [
        'Gross Budget',
        'Net Budget',
        'Gross Media Cost',
        'Media Cost',
        'Working Media Budget',
        'Budget'
    ],
    // Impressions column names for campaign line detection
    IMPRESSIONS_COLUMN_NAMES: [
        'Est. Impressions',
        'Estimated Impressions',
        'Impressions',
        'Impressions/GRPs'
    ],
    // Placements column name variations (try in order)
    PLACEMENTS_COLUMN_NAMES: [
        'Campaign Details - Placements',
        'Placements',
        'Placement'
    ],
    // Audience column name variations (for ad group detection)
    AUDIENCE_COLUMN_NAMES: [
        'Targeting',
        'Target',
        'Audience',
        'Target Audience'
    ],
    // Minimum fields for valid campaign line
    MIN_CAMPAIGN_LINE_FIELDS: 4
};
const CAMPAIGN_LINE_DETECTION_CONFIG = {
    // These columns MUST have matching merge spans to identify a campaign line
    REQUIRED_MERGE_COLUMNS: [
        'Est. Impressions',
        'Gross Budget',
        'Campaign Details - Placements'
    ],
    // Alternative budget columns to check if primary not found
    BUDGET_ALTERNATIVES: [
        'Net Budget',
        'Gross Media Cost',
        'Working Media Budget'
    ],
    // Patterns to exclude from campaign line detection (summary/total rows)
    EXCLUSION_PATTERNS: [
        'total',
        'subtotal',
        'summary',
        'variance',
        'grand total',
        'mpa budget'
    ]
};
const AD_GROUP_DETECTION_CONFIG = {
    // Primary field to group by for ad group detection
    PRIMARY_GROUPING_FIELD: 'audience',
    // Fallback fields if primary is empty
    FALLBACK_GROUPING_FIELDS: [
        'targeting',
        'target'
    ],
    // Default ad group name if all grouping fields are empty
    DEFAULT_AD_GROUP_NAME: 'Unspecified',
    // Minimum rows per ad group (if blocking chart has fewer, pad with empty creatives)
    MIN_ROWS_PER_AD_GROUP: 5,
    // Maximum rows per ad group (if blocking chart has more, create additional ad groups)
    MAX_ROWS_PER_AD_GROUP: 5
};
const CATEGORIZATION_CONFIG = {
    // Channel keywords for Brand Say Digital
    BRAND_SAY_DIGITAL_KEYWORDS: [
        'digital video',
        'digital display',
        'digital audio',
        'programmatic',
        'ctv',
        'audio',
        'ooh'
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
        'linkedin'
    ],
    // Influencer detection keywords for Other Say Social
    INFLUENCER_KEYWORDS: [
        'influencer',
        'creator'
    ],
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
    ],
    // Summary row patterns (excluded from tactics)
    SUMMARY_ROW_PATTERNS: [
        'mpa budget',
        'variance',
        'grand total'
    ],
    // Non-digital channels excluded from traffic sheet generation
    // These appear in verification but don't generate traffic sheet rows
    EXCLUDED_CHANNEL_KEYWORDS: {
        OOH: [
            'pattison',
            'astral',
            'out of home',
            'ooh',
            'billboard',
            'transit',
            'outdoor'
        ],
        TV: [
            'linear tv',
            'television',
            'broadcast tv',
            'tv broadcast',
            'linear television'
        ],
        RADIO: [
            'radio',
            'am/fm',
            'am fm'
        ],
        PRINT: [
            'print',
            'magazine',
            'newspaper',
            'press'
        ]
    }
};
const STYLE_CONFIG = {
    // Header labels that should preserve blue styling
    HEADER_LABELS: [
        'OBJECTIVE',
        'TACTIC',
        'PLATFORM',
        'DEMO',
        'TARGETING DETAILS'
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
        'KPI Metric'
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
        'CREATIVETYPE'
    ]
};
const VALIDATION_CONFIG = {
    // Required fields for a valid campaign line
    REQUIRED_CAMPAIGN_FIELDS: [
        'channel',
        'platform'
    ],
    // Numeric fields that should be validated
    NUMERIC_FIELDS: [
        'budget',
        'grossBudget',
        'netBudget',
        'estImpressions',
        'estCpm',
        'adServing',
        'dvCost',
        'buffer'
    ],
    // Date fields that should be validated
    DATE_FIELDS: [
        'startDate',
        'endDate'
    ]
};
const DATE_CONFIG = {
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
        'Dec'
    ]
};
const TEMPLATE_CONFIG = {
    // Minimum extended columns to qualify as "Extended" template
    MIN_EXTENDED_COLUMNS: 2,
    // Detection priority (higher number = higher priority)
    TEMPLATE_PRIORITY: {
        'unilever-extended': 2,
        'unilever-standard': 1
    },
    // Maximum rows to scan for headers when detecting template
    MAX_ROWS_TO_SCAN: 20,
    // Prefer first visible tab if valid template found
    PREFER_FIRST_VISIBLE: true,
    // Only show visible tabs in picker UI
    SHOW_HIDDEN_TABS: false
};
}),
"[project]/packages/shared/excel/utils/PlatformClassifier.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Platform Classifier Utility
 * Centralizes all platform-specific logic that was previously scattered across
 * parseBlockingChart.ts, generateTrafficSheet.ts, and trafficSheetWriter.ts
 */ __turbopack_context__.s([
    "getDefaultPlacements",
    ()=>getDefaultPlacements,
    "getExclusionReason",
    ()=>getExclusionReason,
    "getPlatformCategory",
    ()=>getPlatformCategory,
    "getTrafficSheetTab",
    ()=>getTrafficSheetTab,
    "isExcludedChannel",
    ()=>isExcludedChannel,
    "isProgrammaticPlatform",
    ()=>isProgrammaticPlatform,
    "isSocialPlatform",
    ()=>isSocialPlatform
]);
function getTrafficSheetTab(platform, channel, adFormat) {
    const platformLower = (platform || '').toLowerCase();
    const channelLower = (channel || '').toLowerCase();
    const adFormatLower = (adFormat || '').toLowerCase();
    // Step 1: Check channel for explicit "Other Say Social" or influencer/creator keywords
    if (channelLower.includes('other say social') || channelLower.includes('influencer') || channelLower.includes('creator')) {
        return 'Other Say Social';
    }
    // Step 2: Check if it's a social platform
    const isSocialPlatform = platformLower.includes('meta') || platformLower.includes('facebook') || platformLower.includes('instagram') || platformLower.includes('tiktok') || platformLower.includes('pinterest') || platformLower.includes('snapchat') || platformLower.includes('twitter') || platformLower.includes('x.com') || platformLower.includes('linkedin') || platformLower.includes('reddit');
    // Step 3: For social platforms, check ad format for influencer content
    if (isSocialPlatform) {
        if (adFormatLower.includes('influencer') || adFormatLower.includes('creator')) {
            return 'Other Say Social';
        }
        return 'Brand Say Social';
    }
    // Step 4: Everything else → Brand Say Digital (programmatic, display, video, audio)
    return 'Brand Say Digital';
}
function getPlatformCategory(platform) {
    const platformLower = (platform || '').toLowerCase();
    // Social platforms
    if (platformLower.includes('meta') || platformLower.includes('facebook') || platformLower.includes('instagram') || platformLower.includes('tiktok') || platformLower.includes('pinterest') || platformLower.includes('snapchat') || platformLower.includes('twitter') || platformLower.includes('linkedin') || platformLower.includes('reddit')) {
        return 'social';
    }
    // Influencer
    if (platformLower.includes('influencer') || platformLower.includes('creator')) {
        return 'influencer';
    }
    // Digital (programmatic, display, video, audio)
    return 'digital';
}
function getDefaultPlacements(platform, defaultValue = '') {
    const platformLower = (platform || '').toLowerCase();
    if (platformLower.includes('tiktok')) {
        return 'In-Feed';
    }
    if (platformLower.includes('meta') || platformLower.includes('facebook') || platformLower.includes('instagram')) {
        return 'Feeds, Stories, Reels';
    }
    if (platformLower.includes('pinterest')) {
        return defaultValue; // Pinterest uses ad format from creative line
    }
    if (platformLower.includes('snapchat')) {
        return 'Snap Ads | Story Ads';
    }
    if (platformLower.includes('linkedin')) {
        return 'Feed | Sponsored Content';
    }
    if (platformLower.includes('twitter') || platformLower.includes('x.com')) {
        return 'Timeline | Trends';
    }
    // For programmatic/digital, use the provided value or default
    return defaultValue;
}
function isExcludedChannel(channel) {
    const channelLower = (channel || '').toLowerCase();
    return channelLower.includes('ooh') || channelLower.includes('out of home') || channelLower.includes('outdoor') || channelLower.includes('tv') || channelLower.includes('television') || channelLower.includes('radio') || channelLower.includes('print') || channelLower.includes('newspaper') || channelLower.includes('magazine');
}
function getExclusionReason(channel) {
    const channelLower = (channel || '').toLowerCase();
    if (channelLower.includes('ooh') || channelLower.includes('out of home') || channelLower.includes('outdoor')) {
        return 'OOH (Out of Home) - planning only';
    }
    if (channelLower.includes('tv') || channelLower.includes('television')) {
        return 'TV - planning only';
    }
    if (channelLower.includes('radio')) {
        return 'Radio - planning only';
    }
    if (channelLower.includes('print') || channelLower.includes('newspaper') || channelLower.includes('magazine')) {
        return 'Print - planning only';
    }
    return undefined;
}
function isSocialPlatform(platform) {
    return getPlatformCategory(platform) === 'social';
}
function isProgrammaticPlatform(platform) {
    const platformLower = (platform || '').toLowerCase();
    return platformLower.includes('trade desk') || platformLower.includes('tradedesk') || platformLower.includes('dv360') || platformLower.includes('display & video 360') || platformLower.includes('amazon') || platformLower.includes('programmatic');
}
}),
"[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Field Normalizer Utility
 * Consolidates all field name normalization logic into a single function
 * Replaces scattered normalization across parseBlockingChart, generateTrafficSheet, and trafficSheetWriter
 */ /**
 * Normalize a field name to lowercase alphanumeric (camelCase style)
 * Removes special characters, spaces, and converts to camelCase
 *
 * Examples:
 *   "Campaign Details - Placements" → "campaigndetailsplacements"
 *   "Start Date" → "startdate"
 *   "Gross Budget" → "grossbudget"
 *   "Est. Impressions" → "estimpressions"
 *
 * @param name - Field name to normalize
 * @returns Normalized field name
 */ __turbopack_context__.s([
    "createFieldNameMap",
    ()=>createFieldNameMap,
    "normalizeFieldName",
    ()=>normalizeFieldName,
    "normalizeFieldNameCamelCase",
    ()=>normalizeFieldNameCamelCase
]);
function normalizeFieldName(name) {
    if (!name) return '';
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '') // Remove all non-alphanumeric characters
    .trim();
}
function normalizeFieldNameCamelCase(name) {
    if (!name) return '';
    const words = name.split(/[^a-zA-Z0-9]+/).filter((word)=>word.length > 0);
    if (words.length === 0) return '';
    return words[0].toLowerCase() + words.slice(1).map((word)=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
}
function createFieldNameMap(fieldNames) {
    const map = new Map();
    for (const name of fieldNames){
        const normalized = normalizeFieldName(name);
        if (normalized) {
            map.set(normalized, name);
        }
    }
    return map;
}
}),
"[project]/packages/shared/excel/utils/FieldMapper.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Field Mapper Utility
 * Centralizes all field mappings between blocking chart columns and traffic sheet columns
 * Replaces scattered mapping logic across parseBlockingChart, generateTrafficSheet, and trafficSheetWriter
 */ __turbopack_context__.s([
    "BLOCKING_CHART_COLUMNS",
    ()=>BLOCKING_CHART_COLUMNS,
    "BLOCKING_CHART_FIELD_MAPPINGS",
    ()=>BLOCKING_CHART_FIELD_MAPPINGS,
    "CAMPAIGN_LINE_INDICATORS",
    ()=>CAMPAIGN_LINE_INDICATORS,
    "TRAFFIC_SHEET_FIELD_MAPPINGS",
    ()=>TRAFFIC_SHEET_FIELD_MAPPINGS,
    "buildColumnIndexMap",
    ()=>buildColumnIndexMap,
    "getInternalFieldName",
    ()=>getInternalFieldName,
    "getTrafficSheetColumnName",
    ()=>getTrafficSheetColumnName,
    "mapBlockingChartRowToInternal",
    ()=>mapBlockingChartRowToInternal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-route] (ecmascript)");
;
const BLOCKING_CHART_COLUMNS = {
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
    TARGETING: 'Targeting',
    // Budget and metrics (campaign line identifiers)
    EST_CPM: 'Est. CPM',
    EST_IMPRESSIONS: 'Est. Impressions',
    GROSS_BUDGET: 'Gross Budget',
    NET_BUDGET: 'Net Budget',
    AD_SERVING: 'Ad Serving',
    DV_COST: 'DV Cost',
    BUFFER: 'Buffer (+30%)',
    // Flight dates
    START_DATE: 'Start Date',
    END_DATE: 'End Date'
};
const CAMPAIGN_LINE_INDICATORS = [
    'Est. Impressions',
    'Gross Budget',
    'Campaign Details - Placements' // Primary indicator (added for triple-merge detection)
];
const BLOCKING_CHART_FIELD_MAPPINGS = {
    // Core fields
    'Channel': 'channel',
    'Platform': 'platform',
    'Media type': 'mediaType',
    'Media Type': 'mediaType',
    'Buy Type': 'buyType',
    'Objective': 'objective',
    // Placements/Tactic variations
    'Campaign Details - Placements': 'placements',
    'Placements': 'placements',
    'Placement': 'placements',
    // Accutics naming
    'Accutics Campaign Name': 'accuticsCampaignName',
    // Metadata
    'Tags Required': 'tagsRequired',
    'Measurement': 'measurement',
    'Language': 'language',
    // Creative format
    'Ad Format': 'adFormat',
    'Creative Format': 'creativeFormat',
    // Targeting/KPI
    'KPI': 'kpi',
    'KPI Metric': 'kpi',
    'KPI Value': 'kpiValue',
    'Target': 'target',
    'Targeting': 'targeting',
    // Budget fields
    'Est. CPM': 'estCpm',
    'Estimated CPM': 'estCpm',
    'Estimated\nCPM': 'estCpm',
    'Est. Impressions': 'estImpressions',
    'Impressions/GRPs': 'estImpressions',
    'Gross Budget': 'grossBudget',
    'Gross Media Cost': 'grossBudget',
    'Net Budget': 'netBudget',
    'Working Media Budget': 'netBudget',
    'Media Cost': 'grossBudget',
    'Ad Serving': 'adServing',
    'DV Cost': 'dvCost',
    'Media Fee Total': 'mediaFeeTotal',
    'Buffer (+30%)': 'buffer',
    // Dates
    'Start Date': 'startDate',
    'End Date': 'endDate',
    // Additional fields
    'Learning Agenda': 'learningAgenda',
    'Primary Reporting KPI': 'primaryReportingKpi',
    'Demo': 'demo',
    'Tactic': 'tactic'
};
const TRAFFIC_SHEET_FIELD_MAPPINGS = {
    'Brand Say Digital': {
        // Campaign-level fields
        'platform': 'Platform',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'objective': 'Objective',
        'language': 'Language',
        'buyType': 'Buy Type',
        'demo': 'Demo',
        'placements': 'Tactic',
        'accuticsCampaignName': 'Accutics Campaign Name',
        'creativetype': 'Creative Type',
        'device': 'Device',
        'geo': 'Geo',
        // Ad group-level fields
        'audience': 'Audience',
        'accuticsAdSetName': 'Accutics Ad Set Name',
        'kpi': 'KPI Metric',
        'bidType': 'Bid Type',
        'optimizationEvent': 'Optimization Event',
        // Creative-level fields (blank for creative agency)
        'creativeName': 'Creative Name',
        'linkToCreative': 'Link to Creative',
        'postCopy': 'Post Copy',
        'headline': 'Headline'
    },
    'Brand Say Social': {
        // Campaign-level fields
        'platform': 'Platform',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'objective': 'Objective',
        'language': 'Language',
        'buyType': 'Buy Type',
        'placements': 'Campaign Name (Taxonomy from Accuitics)',
        'traffickingNotes': 'Trafficking Notes',
        // Ad group-level fields
        'audience': 'Audience',
        'adSetName': 'Ad Set Name (Taxonomy from Accuitics)',
        'targetingSummary': 'Targeting Summary',
        'adGroupPlacements': 'Placements',
        'bidType': 'Bid Type',
        'optimizationEvent': 'Optimization Event',
        // Creative-level fields (blank for creative agency)
        'creativeName': 'Creative Name',
        'linkToCreative': 'Link to Creative',
        'postCopy': 'Post Copy',
        'headline': 'Headline',
        'primaryText': 'Primary Text'
    },
    'Other Say Social': {
        // Campaign-level fields
        'platform': 'Platform',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'objective': 'Objective',
        'language': 'Language',
        'buyType': 'Buy Type',
        'placements': 'Campaign Name (Taxonomy from Accuitics)',
        'traffickingNotes': 'Trafficking Notes',
        // Ad group-level fields
        'audience': 'Audience',
        'adSetName': 'Ad Set Name (Taxonomy from Accuitics)',
        'targetingSummary': 'Targeting Summary',
        'adGroupPlacements': 'Placements',
        'bidType': 'Bid Type',
        'optimizationEvent': 'Optimization Event',
        // Creative-level fields
        'creativeName': 'Creative Name',
        'linkToCreative': 'Link to Creative',
        'postCopy': 'Post Copy',
        'headline': 'Headline'
    }
};
function getInternalFieldName(blockingChartColumn) {
    // Try direct mapping first
    if (BLOCKING_CHART_FIELD_MAPPINGS[blockingChartColumn]) {
        return BLOCKING_CHART_FIELD_MAPPINGS[blockingChartColumn];
    }
    // Try normalized lookup
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeFieldName"])(blockingChartColumn);
    for (const [key, value] of Object.entries(BLOCKING_CHART_FIELD_MAPPINGS)){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeFieldName"])(key) === normalized) {
            return value;
        }
    }
    return undefined;
}
function getTrafficSheetColumnName(internalFieldName, tab) {
    return TRAFFIC_SHEET_FIELD_MAPPINGS[tab][internalFieldName];
}
function buildColumnIndexMap(headers) {
    const map = new Map();
    headers.forEach((header, index)=>{
        if (header) {
            // Store both normalized and original for flexible lookup
            map.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeFieldName"])(header), index);
            map.set(header, index);
        }
    });
    return map;
}
function mapBlockingChartRowToInternal(blockingChartRow, headers) {
    const mapped = {};
    headers.forEach((header, index)=>{
        const internalField = getInternalFieldName(header);
        if (internalField && blockingChartRow[header] !== undefined) {
            mapped[internalField] = blockingChartRow[header];
        }
    });
    return mapped;
}
}),
"[project]/packages/shared/excel/trafficSheetWriter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Traffic Sheet Generator
 * Generates Excel traffic sheets from parsed blocking chart data
 * Handles categorization, merging, and formatting for all three tabs
 */ __turbopack_context__.s([
    "TrafficSheetGenerator",
    ()=>TrafficSheetGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$excel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/exceljs/excel.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/PlatformClassifier.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldMapper.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-route] (ecmascript)");
;
;
;
;
;
class TrafficSheetGenerator {
    /**
   * Generate traffic sheet Excel workbook from parsed blocking chart
   *
   * @param parsedChart - Parsed blocking chart data
   * @param templateBuffer - Optional template file as ArrayBuffer
   * @returns Excel workbook with traffic sheets
   */ async generate(parsedChart, templateBuffer) {
        // Create or load workbook
        let workbook;
        if (templateBuffer) {
            // Load template workbook
            console.log('📄 Loading template workbook...');
            workbook = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$excel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Workbook"]();
            await workbook.xlsx.load(templateBuffer);
            console.log('✅ Template loaded successfully');
            // Clear existing data rows (keep headers and formatting)
            await this.clearTemplateData(workbook);
        } else {
            // Create workbook from scratch (fallback)
            console.log('📄 Creating workbook from scratch (no template provided)');
            workbook = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$excel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Workbook"]();
            await this.createWorkbookFromScratch(workbook);
        }
        // Categorize campaign lines by tab
        const categorized = this.categorizeCampaignLines(parsedChart.campaignLines);
        console.log(`📊 Categorization Results:`);
        console.log(`  Brand Say Digital: ${categorized['Brand Say Digital'].length} lines`);
        console.log(`  Brand Say Social: ${categorized['Brand Say Social'].length} lines`);
        console.log(`  Other Say Social: ${categorized['Other Say Social'].length} lines`);
        // Write each tab
        await this.writeTab(workbook, 'Brand Say Digital', categorized['Brand Say Digital']);
        await this.writeTab(workbook, 'Brand Say Social', categorized['Brand Say Social']);
        await this.writeTab(workbook, 'Other Say Social', categorized['Other Say Social']);
        return workbook;
    }
    /**
   * Clear template data rows while preserving headers and formatting
   */ async clearTemplateData(workbook) {
        const tabs = [
            'Brand Say Digital',
            'Brand Say Social',
            'Other Say Social'
        ];
        for (const tabName of tabs){
            const worksheet = workbook.getWorksheet(tabName);
            if (!worksheet) {
                console.warn(`⚠️  Template missing worksheet: ${tabName}`);
                continue;
            }
            // Delete all rows after the header row (row 8)
            const firstDataRow = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW;
            const lastRow = worksheet.rowCount;
            if (lastRow >= firstDataRow) {
                // Delete rows in reverse order to avoid index shifting
                for(let rowNum = lastRow; rowNum >= firstDataRow; rowNum--){
                    worksheet.spliceRows(rowNum, 1);
                }
                console.log(`  🧹 Cleared ${lastRow - firstDataRow + 1} data rows from ${tabName}`);
            }
        }
    }
    /**
   * Create workbook structure from scratch
   * Creates three worksheets with basic headers
   */ async createWorkbookFromScratch(workbook) {
        // Create three worksheets
        const bsdSheet = workbook.addWorksheet('Brand Say Digital');
        const bssSheet = workbook.addWorksheet('Brand Say Social');
        const ossSheet = workbook.addWorksheet('Other Say Social');
        // Set up basic headers (row 8)
        this.setupWorksheetHeaders(bsdSheet, 'Brand Say Digital');
        this.setupWorksheetHeaders(bssSheet, 'Brand Say Social');
        this.setupWorksheetHeaders(ossSheet, 'Other Say Social');
    }
    /**
   * Set up worksheet headers
   */ setupWorksheetHeaders(worksheet, tab) {
        const headerRow = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW);
        // Get field mappings for this tab
        const fieldMappings = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_FIELD_MAPPINGS"][tab];
        // Write headers
        let col = 1;
        for (const [internalName, displayName] of Object.entries(fieldMappings)){
            headerRow.getCell(col).value = displayName;
            col++;
        }
        headerRow.commit();
    }
    /**
   * Categorize campaign lines by traffic sheet tab
   */ categorizeCampaignLines(campaignLines) {
        const categorized = {
            'Brand Say Digital': [],
            'Brand Say Social': [],
            'Other Say Social': []
        };
        for (const campaignLine of campaignLines){
            // Skip excluded channels (OOH, TV, Radio, Print)
            if (campaignLine.isExcluded) {
                console.log(`⏭️  Skipping excluded campaign line: ${campaignLine.platform} / ${campaignLine.channel}`);
                continue;
            }
            // Determine which tab this campaign line belongs to
            const tab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTrafficSheetTab"])(campaignLine.platform, campaignLine.channel, campaignLine.adFormat);
            console.log(`📂 Categorizing: Platform="${campaignLine.platform}" Channel="${campaignLine.channel}" AdFormat="${campaignLine.adFormat}" → Tab="${tab}"`);
            categorized[tab].push(campaignLine);
        }
        return categorized;
    }
    /**
   * Write campaign lines to a worksheet tab
   */ async writeTab(workbook, tabName, campaignLines) {
        const worksheet = workbook.getWorksheet(tabName);
        if (!worksheet) {
            throw new Error(`Worksheet ${tabName} not found`);
        }
        // Get headers from row 8
        const headerRow = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW);
        const headers = [];
        headerRow.eachCell((cell, colNumber)=>{
            headers[colNumber - 1] = String(cell.value || '');
        });
        // Build column index map for fast lookup
        const columnMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildColumnIndexMap"])(headers);
        // Track current row position
        let currentRow = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW;
        // Track all merges to apply at the end
        const allMerges = [];
        // Write each campaign line
        for (const campaignLine of campaignLines){
            const merges = this.writeCampaignLine(worksheet, campaignLine, currentRow, tabName, columnMap);
            allMerges.push(...merges);
            // Calculate total rows for this campaign line
            const totalRows = campaignLine.adGroups.length * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP;
            currentRow += totalRows;
        }
        // Apply all merges
        this.applyMerges(worksheet, allMerges);
        // Apply borders
        this.applyBorders(worksheet, tabName, currentRow - 1);
        // Apply cell alignment (center horizontal, middle vertical)
        this.applyCellAlignment(worksheet, currentRow - 1);
        // Auto-size columns and rows
        this.autoSizeColumnsAndRows(worksheet, currentRow - 1);
    }
    /**
   * Write a single campaign line to worksheet
   * Returns merge information for later application
   */ writeCampaignLine(worksheet, campaignLine, startRow, tab, columnMap) {
        const merges = [];
        const totalRows = campaignLine.adGroups.length * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP;
        const endRow = startRow + totalRows - 1;
        // Write campaign-level fields (merge across all rows)
        const campaignFields = this.getCampaignLevelFields(campaignLine, tab);
        for (const [fieldName, value] of Object.entries(campaignFields)){
            const colIndex = this.getColumnIndex(columnMap, fieldName, tab);
            if (colIndex !== undefined) {
                // Write to first row
                const firstRow = worksheet.getRow(startRow);
                firstRow.getCell(colIndex + 1).value = value;
                // Add merge if more than 1 row
                if (totalRows > 1) {
                    merges.push({
                        startRow,
                        endRow,
                        startCol: colIndex + 1,
                        endCol: colIndex + 1
                    });
                }
            }
        }
        // Write ad groups
        let currentRow = startRow;
        for (const adGroup of campaignLine.adGroups){
            const adGroupMerges = this.writeAdGroup(worksheet, adGroup, campaignLine, currentRow, tab, columnMap);
            merges.push(...adGroupMerges);
            currentRow += __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP;
        }
        return merges;
    }
    /**
   * Write a single ad group (5 creative lines)
   */ writeAdGroup(worksheet, adGroup, campaignLine, startRow, tab, columnMap) {
        const merges = [];
        const endRow = startRow + __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP - 1;
        // Write ad group-level fields (merge across 5 rows)
        const adGroupFields = this.getAdGroupLevelFields(adGroup, campaignLine, tab);
        for (const [fieldName, value] of Object.entries(adGroupFields)){
            const colIndex = this.getColumnIndex(columnMap, fieldName, tab);
            if (colIndex !== undefined) {
                // Write to first row
                const firstRow = worksheet.getRow(startRow);
                firstRow.getCell(colIndex + 1).value = value;
                // Add merge for 5 rows
                merges.push({
                    startRow,
                    endRow,
                    startCol: colIndex + 1,
                    endCol: colIndex + 1
                });
            }
        }
        // Write creative lines (no merging)
        for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP; i++){
            const creative = adGroup.creativeLines[i];
            const rowNumber = startRow + i;
            const creativeFields = this.getCreativeLevelFields(creative);
            for (const [fieldName, value] of Object.entries(creativeFields)){
                const colIndex = this.getColumnIndex(columnMap, fieldName, tab);
                if (colIndex !== undefined) {
                    const row = worksheet.getRow(rowNumber);
                    row.getCell(colIndex + 1).value = value;
                }
            }
        }
        return merges;
    }
    /**
   * Get campaign-level field values
   */ getCampaignLevelFields(campaignLine, tab) {
        // Determine buy type based on platform and placements
        // Default is 'Auction' for all tactics, merged at campaign level
        // Exception: 'Reach & Frequency' only for TikTok Pulse placements
        let buyType = 'Auction';
        // Check if this is a TikTok Pulse buy
        const isTikTok = campaignLine.platform?.toLowerCase().includes('tiktok') || campaignLine.platform?.toLowerCase().includes('tik tok');
        const isPulse = campaignLine.placements?.toLowerCase().includes('pulse') || campaignLine.adGroups.some((ag)=>ag.placements?.toLowerCase().includes('pulse'));
        if (isTikTok && isPulse) {
            buyType = 'Reach & Frequency';
        }
        // Note: Do not use buyType from blocking chart - always use 'Auction' except for TikTok Pulse
        const fields = {
            platform: campaignLine.platform,
            startDate: this.formatDateForTrafficSheet(campaignLine.startDate),
            endDate: this.formatDateForTrafficSheet(campaignLine.endDate),
            objective: campaignLine.objective,
            language: campaignLine.language,
            buyType: buyType
        };
        // Tab-specific fields
        if (tab === 'Brand Say Digital') {
            fields.demo = this.extractDemographic(campaignLine.target);
            fields.placements = campaignLine.placements; // Maps to "Tactic" column
            fields.accuticsCampaignName = campaignLine.accuticsCampaignName;
        } else {
            // Social tabs
            fields.placements = campaignLine.accuticsCampaignName; // Maps to "Campaign Name (Taxonomy from Accuitics)"
            // Platform-specific placements (campaign level - merged by platform across ad groups)
            fields.adGroupPlacements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultPlacements"])(campaignLine.platform, campaignLine.adGroups[0]?.placements || '');
            // Build trafficking notes
            const notes = [];
            if (campaignLine.tagsRequired) {
                notes.push(`Tags Required: ${campaignLine.tagsRequired}`);
            }
            if (campaignLine.adGroups[0]?.measurement) {
                notes.push(`Measurement: ${campaignLine.adGroups[0].measurement}`);
            }
            fields.traffickingNotes = notes.join('\n');
        }
        return fields;
    }
    /**
   * Get ad group-level field values
   */ getAdGroupLevelFields(adGroup, campaignLine, tab) {
        const fields = {
            audience: adGroup.audience,
            kpi: adGroup.kpi,
            bidType: 'Lowest Cost'
        };
        // Tab-specific fields
        if (tab === 'Brand Say Digital') {
            fields.accuticsAdSetName = adGroup.accuticsCampaignName;
        } else {
            // Social tabs
            fields.adSetName = adGroup.accuticsCampaignName;
        }
        return fields;
    }
    /**
   * Get creative-level field values
   */ getCreativeLevelFields(creative) {
        // Creative fields are typically left blank for creative agency to fill
        return {
            creativeName: creative.creativeName || '',
            linkToCreative: '',
            postCopy: '',
            headline: '',
            optimizationEvent: ''
        };
    }
    /**
   * Format date from blocking chart to traffic sheet format
   * Example: "2025-01-05" → "5-Jan-25"
   * Parses the date string directly to avoid timezone conversion issues
   */ formatDateForTrafficSheet(dateString) {
        if (!dateString) return '';
        try {
            // Parse YYYY-MM-DD format directly without creating a Date object
            const parts = dateString.split('-');
            if (parts.length !== 3) return dateString;
            const year = parts[0];
            const monthIndex = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const monthName = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DATE_CONFIG"].MONTH_NAMES[monthIndex] || '';
            const yearShort = year.slice(-2);
            return `${day}-${monthName}-${yearShort}`;
        } catch (error) {
            return dateString; // Return original if parsing fails
        }
    }
    /**
   * Extract demographic code from target field
   * Example: "W25-49" from "Women 25-49 years old"
   */ extractDemographic(target) {
        if (!target) return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEFAULT_DEMO;
        const match = target.match(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEMO_PATTERN);
        if (match) {
            return match[0]; // Return first match (e.g., "W25-49")
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEFAULT_DEMO;
    }
    /**
   * Get column index from map (try multiple variations)
   */ getColumnIndex(columnMap, fieldName, tab) {
        // First, map the internal field name to the traffic sheet column name
        const fieldMappings = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_FIELD_MAPPINGS"][tab];
        const targetColumnName = fieldMappings[fieldName] || fieldName;
        // Try exact match first
        if (columnMap.has(targetColumnName)) {
            return columnMap.get(targetColumnName);
        }
        // Try normalized match
        const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeFieldName"])(targetColumnName);
        return columnMap.get(normalized);
    }
    /**
   * Apply all merge operations to worksheet
   */ applyMerges(worksheet, merges) {
        for (const merge of merges){
            try {
                worksheet.mergeCells(merge.startRow, merge.startCol, merge.endRow, merge.endCol);
            } catch (error) {
                // Merge may already exist or be invalid, skip
                console.warn(`Failed to merge cells: ${error.message}`);
            }
        }
    }
    /**
   * Apply borders to data region
   */ applyBorders(worksheet, tab, lastRow) {
        const borderConfig = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].BORDER_CONFIG[tab];
        if (!borderConfig) return;
        const borderStyle = {
            style: 'thin',
            color: {
                argb: 'FF000000'
            }
        };
        // Apply borders to data region
        for(let row = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW; row <= lastRow; row++){
            for(let col = borderConfig.start; col <= borderConfig.end; col++){
                const cell = worksheet.getRow(row).getCell(col);
                cell.border = {
                    top: borderStyle,
                    left: borderStyle,
                    bottom: borderStyle,
                    right: borderStyle
                };
            }
        }
    }
    /**
   * Apply center horizontal and middle vertical alignment to all cells
   */ applyCellAlignment(worksheet, lastRow) {
        // Apply alignment to all data rows (starting from first data row)
        for(let rowNum = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW; rowNum <= lastRow; rowNum++){
            const row = worksheet.getRow(rowNum);
            row.eachCell((cell)=>{
                cell.alignment = {
                    horizontal: 'center',
                    vertical: 'middle',
                    wrapText: true
                };
            });
        }
        // Also apply alignment to header row
        const headerRow = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW);
        headerRow.eachCell((cell)=>{
            cell.alignment = {
                horizontal: 'center',
                vertical: 'middle',
                wrapText: true
            };
        });
    }
    /**
   * Auto-size columns and rows to fit content
   */ autoSizeColumnsAndRows(worksheet, lastRow) {
        // Auto-size columns based on content
        worksheet.columns.forEach((column, index)=>{
            if (!column) return;
            let maxLength = 0;
            const columnNumber = index + 1;
            // Check header row
            const headerCell = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW).getCell(columnNumber);
            if (headerCell.value) {
                maxLength = String(headerCell.value).length;
            }
            // Check all data rows
            for(let rowNum = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW; rowNum <= lastRow; rowNum++){
                const cell = worksheet.getRow(rowNum).getCell(columnNumber);
                if (cell.value) {
                    const cellLength = String(cell.value).length;
                    if (cellLength > maxLength) {
                        maxLength = cellLength;
                    }
                }
            }
            // Set column width with some padding (minimum 10, maximum 50)
            column.width = Math.min(Math.max(maxLength + 2, 10), 50);
        });
        // Auto-size rows (set minimum height for better visibility)
        for(let rowNum = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].FIRST_DATA_ROW; rowNum <= lastRow; rowNum++){
            const row = worksheet.getRow(rowNum);
            // Set minimum row height to 20 for better visibility
            row.height = Math.max(row.height || 0, 20);
        }
        // Set header row height
        const headerRow = worksheet.getRow(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRAFFIC_SHEET_CONFIG"].HEADER_LABEL_ROW);
        headerRow.height = Math.max(headerRow.height || 0, 25);
    }
}
}),
"[project]/packages/shared/excel/parser/BlockingChartParser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Blocking Chart Parser
 * Parses Excel blocking charts and builds hierarchical campaign line structure
 * with dynamic ad group detection based on audience values
 */ __turbopack_context__.s([
    "BlockingChartParser",
    ()=>BlockingChartParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$excel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/exceljs/excel.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldMapper.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/PlatformClassifier.ts [app-route] (ecmascript)");
;
;
;
;
;
class BlockingChartParser {
    validationWarnings = [];
    /**
   * Parse blocking chart Excel file into structured campaign lines
   *
   * @param fileBuffer - ArrayBuffer containing the Excel file data
   * @returns Parsed blocking chart with hierarchical campaign line structure
   */ async parse(fileBuffer) {
        this.validationWarnings = [];
        // Load workbook
        const workbook = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exceljs$2f$excel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Workbook"]();
        await workbook.xlsx.load(fileBuffer);
        // Get first worksheet
        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
            throw new Error('No worksheets found in blocking chart');
        }
        // Find header row and extract headers
        const { headerRow, headers } = this.findHeaderRow(worksheet);
        if (!headerRow || headers.length === 0) {
            throw new Error('Could not find header row in blocking chart');
        }
        // Extract metadata from rows above header
        const metadata = this.extractMetadata(worksheet, headerRow);
        // Detect campaign lines by finding merged cells
        const campaignLineRanges = this.detectCampaignLines(worksheet, headerRow, headers);
        if (campaignLineRanges.length === 0) {
            this.addWarning('warning', 'No campaign lines detected in blocking chart', undefined, undefined);
        }
        // Build campaign lines with audience-based ad group detection
        const campaignLines = this.buildCampaignLines(worksheet, headers, campaignLineRanges, headerRow);
        return {
            headers,
            campaignLines,
            validationWarnings: this.validationWarnings,
            metadata
        };
    }
    /**
   * Find header row in worksheet
   * Header row contains column names like "Channel", "Platform", etc.
   */ findHeaderRow(worksheet) {
        const maxRows = Math.min(worksheet.rowCount, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARSING_CONFIG"].MAX_METADATA_ROWS + 5);
        for(let rowNumber = 1; rowNumber <= maxRows; rowNumber++){
            const row = worksheet.getRow(rowNumber);
            const values = [];
            let nonEmptyCount = 0;
            row.eachCell({
                includeEmpty: false
            }, (cell, colNumber)=>{
                const value = String(cell.value || '').trim();
                values[colNumber - 1] = value;
                if (value) nonEmptyCount++;
            });
            // Check if this row has enough non-empty cells and contains required keywords
            if (nonEmptyCount >= __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARSING_CONFIG"].MIN_HEADER_CELLS) {
                const normalizedValues = values.map((v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeFieldName"])(v));
                const hasRequiredKeywords = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PARSING_CONFIG"].REQUIRED_HEADER_KEYWORDS.every((keyword)=>normalizedValues.some((v)=>v.includes(keyword)));
                if (hasRequiredKeywords) {
                    return {
                        headerRow: rowNumber,
                        headers: values
                    };
                }
            }
        }
        throw new Error('Header row not found in blocking chart');
    }
    /**
   * Extract metadata from rows above header (campaign name, client, etc.)
   */ extractMetadata(worksheet, headerRow) {
        const metadata = {};
        // Scan rows above header for metadata
        for(let rowNumber = 1; rowNumber < headerRow; rowNumber++){
            const row = worksheet.getRow(rowNumber);
            const firstCell = row.getCell(1).value;
            const secondCell = row.getCell(2).value;
            const label = String(firstCell || '').toLowerCase().trim();
            const value = String(secondCell || '').trim();
            if (label.includes('campaign') && value) {
                metadata.campaignName = value;
            } else if (label.includes('client') && value) {
                metadata.client = value;
            } else if (label.includes('brand') && value) {
                metadata.brand = value;
            } else if (label.includes('date') && value) {
                metadata.dateRange = value;
            }
        }
        return metadata;
    }
    /**
   * Detect campaign lines by finding merged cells across budget, impressions, and placements columns
   * A campaign line is identified when these three columns are merged together
   */ detectCampaignLines(worksheet, headerRow, headers) {
        // Find column indexes for the three required merge indicators
        const budgetColIndex = this.findColumnIndex(headers, [
            'Gross Budget',
            'Net Budget',
            'Media Cost',
            'Working Media Budget'
        ]);
        const impressionsColIndex = this.findColumnIndex(headers, [
            'Est. Impressions',
            'Impressions/GRPs',
            'Impressions'
        ]);
        const placementsColIndex = this.findColumnIndex(headers, [
            'Campaign Details - Placements',
            'Placements'
        ]);
        console.log('🔍 Column Detection:');
        console.log('  Budget column index:', budgetColIndex);
        console.log('  Impressions column index:', impressionsColIndex);
        console.log('  Placements column index:', placementsColIndex);
        console.log('  Available headers:', headers.filter((h)=>h));
        if (budgetColIndex === -1 || impressionsColIndex === -1 || placementsColIndex === -1) {
            this.addWarning('error', `Required columns not found - Budget: ${budgetColIndex}, Impressions: ${impressionsColIndex}, Placements: ${placementsColIndex}`, undefined, undefined);
            return [];
        }
        // Collect all merge ranges for these columns
        const budgetMerges = new Map(); // masterRow → span
        const impressionsMerges = new Map();
        const placementsMerges = new Map();
        // Helper function to get column letter from index
        const getColumnLetter = (index)=>{
            let letter = '';
            let temp = index;
            while(temp >= 0){
                letter = String.fromCharCode(65 + temp % 26) + letter;
                temp = Math.floor(temp / 26) - 1;
            }
            return letter;
        };
        // ExcelJS exposes merged cells through worksheet.model.merges
        // Merges are stored as strings like "A1:A5"
        const merges = worksheet.model?.merges || [];
        console.log(`📋 Total merge cells found: ${merges.length}`);
        for (const mergeRange of merges){
            // Parse merge range (e.g., "A1:A5")
            const match = mergeRange.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
            if (!match) continue;
            const startCol = match[1];
            const startRow = parseInt(match[2]);
            const endCol = match[3];
            const endRow = parseInt(match[4]);
            const span = endRow - startRow + 1;
            // Skip if merge is in header or only 1 row
            if (startRow <= headerRow || span <= 1) continue;
            // Check if this merge is in one of our target columns
            const budgetCol = getColumnLetter(budgetColIndex);
            const impressionsCol = getColumnLetter(impressionsColIndex);
            const placementsCol = getColumnLetter(placementsColIndex);
            if (startCol === budgetCol && endCol === budgetCol) {
                budgetMerges.set(startRow, span);
            }
            if (startCol === impressionsCol && endCol === impressionsCol) {
                impressionsMerges.set(startRow, span);
            }
            if (startCol === placementsCol && endCol === placementsCol) {
                placementsMerges.set(startRow, span);
            }
        }
        // Find matching merges (all three columns merged with same span at same master row)
        const campaignLineRanges = [];
        console.log(`🔗 Budget merges found: ${budgetMerges.size}`);
        console.log('   Budget merge rows:', Array.from(budgetMerges.keys()));
        console.log(`🔗 Impressions merges found: ${impressionsMerges.size}`);
        console.log('   Impressions merge rows:', Array.from(impressionsMerges.keys()));
        console.log(`🔗 Placements merges found: ${placementsMerges.size}`);
        console.log('   Placements merge rows:', Array.from(placementsMerges.keys()));
        // Strategy 1: Find triple-merged campaign lines (2+ ad groups)
        for (const [masterRow, budgetSpan] of budgetMerges.entries()){
            const impressionsSpan = impressionsMerges.get(masterRow);
            const placementsSpan = placementsMerges.get(masterRow);
            // All three must match to be a valid campaign line
            if (impressionsSpan === budgetSpan && placementsSpan === budgetSpan) {
                // Verify this is not a summary/total row
                if (!this.isSummaryRow(worksheet, masterRow, headers)) {
                    campaignLineRanges.push({
                        masterRow,
                        span: budgetSpan,
                        endRow: masterRow + budgetSpan - 1
                    });
                }
            }
        }
        // Strategy 2: Find single-row campaign lines (1 ad group - no merges)
        // Look for data rows that have budget, impressions, and placements filled but not merged
        const detectedRows = new Set(campaignLineRanges.flatMap((r)=>Array.from({
                length: r.span
            }, (_, i)=>r.masterRow + i)));
        const lastDataRow = Math.min(worksheet.rowCount, headerRow + 100);
        console.log(`🔍 Scanning rows ${headerRow + 1} to ${lastDataRow} for single-row campaign lines...`);
        for(let rowNum = headerRow + 1; rowNum <= lastDataRow; rowNum++){
            // Skip if already detected as part of a merged campaign line
            if (detectedRows.has(rowNum)) continue;
            const row = worksheet.getRow(rowNum);
            const budgetValue = row.getCell(budgetColIndex + 1).value;
            const impressionsValue = row.getCell(impressionsColIndex + 1).value;
            const placementsValue = row.getCell(placementsColIndex + 1).value;
            // Check if this row has all three key values filled
            if (budgetValue && impressionsValue && placementsValue) {
                // Skip rows that look like headers (values match header text)
                const budgetStr = String(budgetValue).trim().toLowerCase();
                const impressionsStr = String(impressionsValue).trim().toLowerCase();
                const placementsStr = String(placementsValue).trim().toLowerCase();
                const isHeaderRow = budgetStr.includes('budget') || budgetStr.includes('cost') || impressionsStr.includes('impression') || impressionsStr.includes('grp') || placementsStr.includes('placement');
                if (isHeaderRow) {
                    console.log(`  ⏭️  Skipping header-like row at ${rowNum}`);
                    continue;
                }
                // Verify this is not a summary/total row
                if (!this.isSummaryRow(worksheet, rowNum, headers)) {
                    console.log(`  ✅ Found single-row campaign line at row ${rowNum}`);
                    campaignLineRanges.push({
                        masterRow: rowNum,
                        span: 1,
                        endRow: rowNum
                    });
                    detectedRows.add(rowNum);
                }
            }
        }
        return campaignLineRanges.sort((a, b)=>a.masterRow - b.masterRow);
    }
    /**
   * Check if a row is a summary/total row (should be excluded)
   */ isSummaryRow(worksheet, rowNumber, headers) {
        const row = worksheet.getRow(rowNumber);
        const values = {};
        headers.forEach((header, index)=>{
            const cell = row.getCell(index + 1);
            values[header] = cell.value;
        });
        // Check for exclusion patterns in text fields
        const textFields = [
            values['Channel'],
            values['Platform'],
            values['Campaign Details - Placements']
        ];
        const textContent = textFields.filter((v)=>v).map((v)=>String(v).toLowerCase()).join(' ');
        for (const pattern of __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAMPAIGN_LINE_DETECTION_CONFIG"].EXCLUSION_PATTERNS){
            if (textContent.includes(pattern)) {
                return true;
            }
        }
        return false;
    }
    /**
   * Build campaign lines with audience-based ad group detection
   */ buildCampaignLines(worksheet, headers, campaignLineRanges, headerRow) {
        const campaignLines = [];
        for(let index = 0; index < campaignLineRanges.length; index++){
            const range = campaignLineRanges[index];
            try {
                const campaignLine = this.buildCampaignLine(worksheet, headers, range, index);
                campaignLines.push(campaignLine);
            } catch (error) {
                this.addWarning('error', `Failed to parse campaign line at row ${range.masterRow}: ${error.message}`, undefined, range.masterRow);
            }
        }
        return campaignLines;
    }
    /**
   * Build a single campaign line with dynamic ad group detection
   */ buildCampaignLine(worksheet, headers, range, campaignLineIndex) {
        // Extract all rows in this campaign line
        const rows = [];
        for(let rowNum = range.masterRow; rowNum <= range.endRow; rowNum++){
            const rowData = this.extractRowData(worksheet, rowNum, headers);
            rows.push(rowData);
        }
        // Get campaign-level data from first row
        const firstRow = rows[0];
        // Detect ad groups by grouping rows by audience
        const adGroups = this.detectAdGroupsByAudience(rows, headers);
        // Build campaign line
        const campaignLine = {
            // Campaign-level fields (from first row)
            channel: firstRow.channel || '',
            platform: firstRow.platform || '',
            mediaType: firstRow.mediaType,
            objective: firstRow.objective || '',
            language: firstRow.language,
            target: firstRow.target,
            startDate: firstRow.startDate || '',
            endDate: firstRow.endDate || '',
            // Budget information
            grossBudget: firstRow.grossBudget,
            netBudget: firstRow.netBudget,
            estImpressions: firstRow.estImpressions,
            estCpm: firstRow.estCpm,
            adServing: firstRow.adServing,
            dvCost: firstRow.dvCost,
            buffer: firstRow.buffer,
            // Campaign-level placements and naming
            placements: firstRow.placements,
            accuticsCampaignName: firstRow.accuticsCampaignName,
            // Additional metadata
            adFormat: firstRow.adFormat,
            buyType: firstRow.buyType,
            tagsRequired: firstRow.tagsRequired,
            // Exclusion check
            isExcluded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isExcludedChannel"])(firstRow.channel || ''),
            excludedReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getExclusionReason"])(firstRow.channel || ''),
            // Ad groups (dynamically detected)
            adGroups,
            // Validation warnings
            validationWarnings: [],
            // Tracking metadata
            _sourceRowNumbers: Array.from({
                length: range.span
            }, (_, i)=>range.masterRow + i),
            blockingChartRowCount: range.span,
            stableIndex: campaignLineIndex
        };
        // Validate campaign line
        this.validateCampaignLine(campaignLine);
        return campaignLine;
    }
    /**
   * Detect ad groups by grouping rows by audience field
   * Each unique audience value = 1 ad group with 5 creative lines
   */ detectAdGroupsByAudience(rows, headers) {
        // Find audience column
        const audienceField = this.findAudienceField(rows);
        // Group rows by audience value
        const rowsByAudience = new Map();
        for (const row of rows){
            const audienceValue = row[audienceField] || __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].DEFAULT_AD_GROUP_NAME;
            if (!rowsByAudience.has(audienceValue)) {
                rowsByAudience.set(audienceValue, []);
            }
            rowsByAudience.get(audienceValue).push(row);
        }
        // Build ad groups
        const adGroups = [];
        for (const [audienceName, audienceRows] of rowsByAudience.entries()){
            const adGroup = this.buildAdGroup(audienceName, audienceRows);
            adGroups.push(adGroup);
        }
        return adGroups;
    }
    /**
   * Find which field to use for audience grouping
   */ findAudienceField(rows) {
        // Try primary field first
        if (rows.some((r)=>r[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].PRIMARY_GROUPING_FIELD])) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].PRIMARY_GROUPING_FIELD;
        }
        // Try fallback fields
        for (const field of __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].FALLBACK_GROUPING_FIELDS){
            if (rows.some((r)=>r[field])) {
                return field;
            }
        }
        // Default to primary
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AD_GROUP_DETECTION_CONFIG"].PRIMARY_GROUPING_FIELD;
    }
    /**
   * Build a single ad group with exactly 5 creative lines
   */ buildAdGroup(audienceName, audienceRows) {
        // Get ad group-level data from first row
        const firstRow = audienceRows[0];
        // Always create exactly 5 creative lines
        const creativeLines = [];
        for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROW_EXPANSION_CONFIG"].CREATIVES_PER_AD_GROUP; i++){
            const sourceRow = audienceRows[i] || {}; // Use empty object if fewer than 5 rows
            creativeLines.push({
                creativeName: sourceRow.creativeName,
                creativeFormat: sourceRow.creativeFormat,
                adFormat: sourceRow.adFormat
            });
        }
        return {
            // Ad group-level fields
            audience: audienceName,
            accuticsCampaignName: firstRow.accuticsCampaignName,
            targeting: firstRow.targeting,
            target: firstRow.target,
            kpi: firstRow.kpi,
            kpiValue: firstRow.kpiValue,
            placements: firstRow.placements,
            measurement: firstRow.measurement,
            // Creative lines (always 5)
            creativeLines
        };
    }
    /**
   * Extract row data and map to internal field names
   */ extractRowData(worksheet, rowNumber, headers) {
        const row = worksheet.getRow(rowNumber);
        const data = {};
        headers.forEach((header, index)=>{
            if (!header) return;
            const cell = row.getCell(index + 1);
            const internalField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getInternalFieldName"])(header);
            if (internalField) {
                let value = cell.value;
                // Handle date formatting
                // Excel stores dates as serial numbers (days since 1900-01-01) with no timezone info
                // ExcelJS converts these to JavaScript Date objects
                // To avoid timezone boundary issues, we add 12 hours before extracting date components
                // This ensures we're safely in the middle of the calendar day regardless of timezone
                if (value instanceof Date) {
                    // Add 12 hours (43200000 ms) to avoid timezone boundary issues
                    // If date is at midnight (any timezone), adding 12 hours keeps us on the same calendar day
                    const safeDate = new Date(value.getTime() + 12 * 60 * 60 * 1000);
                    // Extract UTC date components from the safe date
                    const year = safeDate.getUTCFullYear();
                    const month = String(safeDate.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(safeDate.getUTCDate()).padStart(2, '0');
                    value = `${year}-${month}-${day}`;
                } else if (typeof value === 'object' && value !== null) {
                    // Handle Excel rich text
                    value = value.text || String(value);
                }
                data[internalField] = value;
            }
        });
        return data;
    }
    /**
   * Find column index by trying multiple possible names
   */ findColumnIndex(headers, possibleNames) {
        for (const name of possibleNames){
            const index = headers.findIndex((h)=>h === name);
            if (index !== -1) return index;
        }
        // Try normalized matching
        const normalizedPossibleNames = possibleNames.map((n)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeFieldName"])(n));
        for(let i = 0; i < headers.length; i++){
            const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeFieldName"])(headers[i]);
            if (normalizedPossibleNames.includes(normalized)) {
                return i;
            }
        }
        return -1;
    }
    /**
   * Validate campaign line and add warnings
   */ validateCampaignLine(campaignLine) {
        // Check required fields
        if (!campaignLine.channel) {
            campaignLine.validationWarnings = campaignLine.validationWarnings || [];
            campaignLine.validationWarnings.push({
                severity: 'warning',
                message: 'Missing channel',
                field: 'channel'
            });
        }
        if (!campaignLine.platform) {
            campaignLine.validationWarnings = campaignLine.validationWarnings || [];
            campaignLine.validationWarnings.push({
                severity: 'warning',
                message: 'Missing platform',
                field: 'platform'
            });
        }
        if (!campaignLine.startDate || !campaignLine.endDate) {
            campaignLine.validationWarnings = campaignLine.validationWarnings || [];
            campaignLine.validationWarnings.push({
                severity: 'warning',
                message: 'Missing start or end date',
                field: 'dates'
            });
        }
        if (campaignLine.adGroups.length === 0) {
            campaignLine.validationWarnings = campaignLine.validationWarnings || [];
            campaignLine.validationWarnings.push({
                severity: 'error',
                message: 'No ad groups detected'
            });
        }
    }
    /**
   * Add validation warning to global warnings list
   */ addWarning(severity, message, field, rowNumber) {
        this.validationWarnings.push({
            severity,
            message,
            field,
            rowNumber
        });
    }
}
}),
"[project]/packages/shared/excel/blockingChartTemplates.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blockingChartTemplates",
    ()=>blockingChartTemplates,
    "detectBlockingChartTemplate",
    ()=>detectBlockingChartTemplate,
    "getMappedFieldName",
    ()=>getMappedFieldName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-route] (ecmascript)");
;
const blockingChartTemplates = [
    {
        id: "unilever-standard",
        name: "Unilever Standard",
        description: "Standard Unilever blocking chart format",
        columnMappings: {
            "Channel": "channel",
            "Tactic": "tactic",
            "Platform": "platform",
            "Objective": "objective",
            "Placements": "placements",
            "Optimization KPI": "optimizationKpi",
            "Demo": "demo",
            "Targeting": "targeting",
            "Language": "language",
            "Accutics Campaign Name": "accuticsCampaignName",
            "Accutics Ad Set Name": "accuticsAdSetName",
            "CPM/CPP": "cpmCpp",
            "Impressions/GRPs": "impressionsGrps",
            "Start Date": "startDate",
            "End Date": "endDate",
            "Media Cost": "mediaCost",
            "Ad Serving": "adServing",
            "DV Cost": "dvCost",
            "Media Fee Total": "mediaFeeTotal",
            "Working Media Budget": "workingMediaBudget"
        },
        detectionRules: {
            requiredColumns: [
                "Channel",
                "Tactic",
                "Platform"
            ],
            optionalColumns: [
                "Accutics Campaign Name",
                "Working Media Budget"
            ]
        }
    },
    {
        id: "unilever-extended",
        name: "Unilever Extended Format",
        description: "Extended blocking chart with additional depth",
        columnMappings: {
            // All standard mappings from above, PLUS extended fields:
            "Channel": "channel",
            "Tactic": "tactic",
            "Platform": "platform",
            "Objective": "objective",
            "Sub-Objective": "subObjective",
            "Placements": "placements",
            "Placement Details": "placementDetails",
            "Optimization KPI": "optimizationKpi",
            "KPI Target": "kpiTarget",
            "Demo": "demo",
            "Demo Details": "demoDetails",
            "Targeting": "targeting",
            "Targeting Strategy": "targetingStrategy",
            "Language": "language",
            "Market": "market",
            "Region": "region",
            "Accutics Campaign Name": "accuticsCampaignName",
            "Accutics Ad Set Name": "accuticsAdSetName",
            "Creative Strategy": "creativeStrategy",
            "Creative Format": "creativeFormat",
            "CPM/CPP": "cpmCpp",
            "Impressions/GRPs": "impressionsGrps",
            "Frequency Cap": "frequencyCap",
            "Start Date": "startDate",
            "End Date": "endDate",
            "Flight Pattern": "flightPattern",
            "Media Cost": "mediaCost",
            "Production Cost": "productionCost",
            "Ad Serving": "adServing",
            "DV Cost": "dvCost",
            "Media Fee Total": "mediaFeeTotal",
            "Working Media Budget": "workingMediaBudget",
            "Vendor": "vendor",
            "PO Number": "poNumber",
            "Budget Category": "budgetCategory",
            "Campaign Type": "campaignType"
        },
        detectionRules: {
            // If we see any of these "extended" columns, it's the extended format
            requiredColumns: [
                "Channel",
                "Tactic",
                "Platform"
            ],
            optionalColumns: [
                "Sub-Objective",
                "Creative Strategy",
                "Flight Pattern",
                "Vendor",
                "KPI Target",
                "Budget Category"
            ]
        }
    }
];
function detectBlockingChartTemplate(headers) {
    const normalizedHeaders = headers.map((h)=>h.trim().toLowerCase());
    console.log('🔍 Detecting blocking chart template...');
    console.log('Headers found:', headers);
    // Check extended template first (more specific)
    for(let i = blockingChartTemplates.length - 1; i >= 0; i--){
        const template = blockingChartTemplates[i];
        // Check required columns
        const hasAllRequired = template.detectionRules.requiredColumns.every((col)=>normalizedHeaders.some((h)=>h === col.toLowerCase()));
        if (!hasAllRequired) {
            continue;
        }
        // For extended template, check if it has at least minimum optional "extended" columns
        if (template.id === 'unilever-extended' && template.detectionRules.optionalColumns) {
            const extendedColumnsFound = template.detectionRules.optionalColumns.filter((col)=>normalizedHeaders.some((h)=>h === col.toLowerCase()));
            if (extendedColumnsFound.length >= __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEMPLATE_CONFIG"].MIN_EXTENDED_COLUMNS) {
                console.log(`✅ Detected template: ${template.name}`);
                console.log(`Extended columns found: ${extendedColumnsFound.join(', ')}`);
                return template;
            }
        }
        // For standard template, just check required columns
        if (template.id === 'unilever-standard') {
            console.log(`✅ Detected template: ${template.name}`);
            return template;
        }
    }
    console.log('⚠️ No template matched, will use auto-normalization');
    return null; // No template matched
}
function getMappedFieldName(header, template, fallbackNormalizer) {
    if (template && template.columnMappings[header]) {
        return template.columnMappings[header];
    }
    // Fall back to auto-normalization
    return fallbackNormalizer(header);
}
}),
"[project]/packages/shared/excel/categorization.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categorizeLine",
    ()=>categorizeLine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-route] (ecmascript)");
;
function categorizeLine(input) {
    const channel = (input.channel || '').toLowerCase();
    const platform = (input.platform || '').toLowerCase();
    const mediaType = (input.mediaType || '').toLowerCase();
    const placements = (input.placements || '').toLowerCase();
    const adFormat = (input.adFormat || '').toLowerCase();
    // Check for excluded campaigns FIRST (highest priority)
    // Either check the isExcluded flag OR detect by keywords
    if (input.isExcluded) {
        return {
            tab: 'Excluded',
            type: 'non-digital',
            reason: input.excludedReason
        };
    }
    // Also check for excluded channel keywords directly (OOH, TV, Radio, Print)
    const excludedCategories = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CATEGORIZATION_CONFIG"].EXCLUDED_CHANNEL_KEYWORDS;
    // Check OOH
    for (const keyword of excludedCategories.OOH){
        if (channel.includes(keyword) || platform.includes(keyword) || placements.includes(keyword) || adFormat.includes(keyword)) {
            return {
                tab: 'Excluded',
                type: 'non-digital',
                reason: 'OOH'
            };
        }
    }
    // Check TV (but exclude CTV/Connected TV which are digital)
    for (const keyword of excludedCategories.TV){
        if ((channel.includes(keyword) || platform.includes(keyword) || placements.includes(keyword) || adFormat.includes(keyword)) && !channel.includes('ctv') && !channel.includes('connected tv') && !platform.includes('ctv') && !platform.includes('connected tv')) {
            return {
                tab: 'Excluded',
                type: 'non-digital',
                reason: 'TV'
            };
        }
    }
    // Check Radio
    for (const keyword of excludedCategories.RADIO){
        if (channel.includes(keyword) || platform.includes(keyword) || placements.includes(keyword) || adFormat.includes(keyword)) {
            return {
                tab: 'Excluded',
                type: 'non-digital',
                reason: 'Radio'
            };
        }
    }
    // Check Print
    for (const keyword of excludedCategories.PRINT){
        if (channel.includes(keyword) || platform.includes(keyword) || placements.includes(keyword) || adFormat.includes(keyword)) {
            return {
                tab: 'Excluded',
                type: 'non-digital',
                reason: 'Print'
            };
        }
    }
    // Check for Brand Say Digital keywords (second priority)
    // This ensures audio, programmatic, digital video, digital display route correctly
    const isBrandSayDigital = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CATEGORIZATION_CONFIG"].BRAND_SAY_DIGITAL_KEYWORDS.some((keyword)=>channel.includes(keyword) || mediaType.includes(keyword));
    if (isBrandSayDigital) {
        return {
            tab: 'Brand Say Digital',
            type: 'media'
        };
    }
    // Check for influencer keyword (third priority)
    // Check in placements, adFormat, channel, and platform
    const isInfluencer = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CATEGORIZATION_CONFIG"].INFLUENCER_KEYWORDS.some((keyword)=>placements.includes(keyword.toLowerCase()) || adFormat.includes(keyword.toLowerCase()) || channel.includes(keyword.toLowerCase()) || platform.includes(keyword.toLowerCase()));
    // Check if it's a social platform (fourth priority)
    // Check platform, channel, placements, and adFormat to catch all cases
    const isSocialPlatform = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CATEGORIZATION_CONFIG"].SOCIAL_PLATFORMS.some((socialPlatform)=>platform.includes(socialPlatform.toLowerCase()) || channel.includes(socialPlatform.toLowerCase()) || placements.includes(socialPlatform.toLowerCase()) || adFormat.includes(socialPlatform.toLowerCase()));
    // Special case: Pinterest only
    // Pinterest is the ONLY social platform where influencer content goes to Brand Say Social
    const isPinterest = platform.includes('pinterest') || platform.includes('pin') || channel.includes('pinterest') || channel.includes('pin') || placements.includes('pinterest') || placements.includes('pin') || adFormat.includes('pinterest') || adFormat.includes('pin');
    // Decision matrix for social platforms with influencer:
    // - Pinterest + Influencer → Brand Say Social (brand-created influencer content)
    // - Meta/TikTok/Other Social + Influencer → Other Say Social (actual influencers)
    // - Any Social Platform + NO Influencer → Brand Say Social (regular paid social)
    if (isSocialPlatform) {
        if (isInfluencer && !isPinterest) {
            // Meta, TikTok, etc. with influencer → Other Say Social
            return {
                tab: 'Other Say Social',
                type: 'media'
            };
        } else {
            // Pinterest (with or without influencer) OR any social without influencer → Brand Say Social
            return {
                tab: 'Brand Say Social',
                type: 'media'
            };
        }
    }
    // If it's influencer content on a NON-social platform, route to Other Say Social
    if (isInfluencer) {
        return {
            tab: 'Other Say Social',
            type: 'media'
        };
    }
    // Default to Brand Say Digital for non-social, non-influencer (programmatic, display, video, audio, etc.)
    return {
        tab: 'Brand Say Digital',
        type: 'media'
    };
}
}),
"[project]/packages/shared/excel/demographicExtraction.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Demographic extraction utilities
 * Extracts demographic codes (W25-49, M18-44, A18-65) from Target field
 */ __turbopack_context__.s([
    "extractDemographic",
    ()=>extractDemographic,
    "getGenderDescription",
    ()=>getGenderDescription,
    "parseDemographic",
    ()=>parseDemographic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-route] (ecmascript)");
;
function extractDemographic(target) {
    if (!target) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEFAULT_DEMO;
    }
    const targetStr = String(target);
    // Reset regex state (important for global regex)
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEMO_PATTERN.lastIndex = 0;
    // Find all demographic patterns in the string
    const matches = targetStr.matchAll(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEMO_PATTERN);
    const matchArray = Array.from(matches);
    if (matchArray.length === 0) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].DEFAULT_DEMO;
    }
    // Return first match in format: W25-49
    const firstMatch = matchArray[0];
    const genderCode = firstMatch[1]; // W, M, A, F
    const lowerAge = firstMatch[2]; // 25, 18, etc.
    const upperAge = firstMatch[3]; // 49, 44, etc.
    return `${genderCode}${lowerAge}-${upperAge}`;
}
function getGenderDescription(genderCode) {
    const upperCode = genderCode.toUpperCase();
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMOGRAPHIC_CONFIG"].GENDER_CODES[upperCode] || 'Adults';
}
function parseDemographic(demographic) {
    // Handle "A18+" format
    const plusMatch = demographic.match(/^([MWFA])(\d+)\+$/);
    if (plusMatch) {
        const gender = plusMatch[1];
        return {
            gender,
            genderDesc: getGenderDescription(gender),
            lowerAge: parseInt(plusMatch[2], 10),
            upperAge: undefined
        };
    }
    // Handle "W25-49" format
    const rangeMatch = demographic.match(/^([MWFA])(\d+)-(\d+)$/);
    if (rangeMatch) {
        const gender = rangeMatch[1];
        return {
            gender,
            genderDesc: getGenderDescription(gender),
            lowerAge: parseInt(rangeMatch[2], 10),
            upperAge: parseInt(rangeMatch[3], 10)
        };
    }
    // Fallback
    return {
        gender: 'A',
        genderDesc: 'Adults',
        lowerAge: 18,
        upperAge: undefined
    };
}
}),
"[project]/packages/shared/excel/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Shared Excel Processing Module
 * Main entry point for blocking chart parsing and traffic sheet generation
 * Used by both desktop (Electron) and web implementations
 *
 * This is the SINGLE SOURCE OF TRUTH for all Excel processing logic.
 * Both desktop and web applications import from this shared package.
 */ // Main processing functions and classes
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$trafficSheetWriter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/trafficSheetWriter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$parser$2f$BlockingChartParser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/parser/BlockingChartParser.ts [app-route] (ecmascript)");
// Template detection and management
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$blockingChartTemplates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/blockingChartTemplates.ts [app-route] (ecmascript)");
// Categorization logic
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$categorization$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/categorization.ts [app-route] (ecmascript)");
// Demographic extraction
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$demographicExtraction$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/demographicExtraction.ts [app-route] (ecmascript)");
// Utilities
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldNormalizer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldNormalizer.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$PlatformClassifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/PlatformClassifier.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$utils$2f$FieldMapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/utils/FieldMapper.ts [app-route] (ecmascript)");
// Configuration constants
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/config.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[project]/packages/web/app/api/traffic-sheet/generate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/excel/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$parser$2f$BlockingChartParser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/parser/BlockingChartParser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$trafficSheetWriter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/excel/trafficSheetWriter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
;
;
;
;
async function POST(request) {
    try {
        const formData = await request.formData();
        const blockingChartFile = formData.get("blockingChart");
        const deletedRowsJson = formData.get("deletedRows");
        if (!blockingChartFile) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Blocking chart file is required"
            }, {
                status: 400
            });
        }
        // Parse deleted rows if provided
        const deletedRows = deletedRowsJson ? JSON.parse(deletedRowsJson) : [];
        console.log(`🗑️  Deleted rows from frontend: ${deletedRows.length > 0 ? deletedRows.join(', ') : 'none'}`);
        // Convert blocking chart to ArrayBuffer
        const blockingChartBuffer = await blockingChartFile.arrayBuffer();
        // Parse the blocking chart using new shared parser
        console.log('🔄 Generate - Parsing blocking chart...');
        const parser = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$parser$2f$BlockingChartParser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlockingChartParser"]();
        const parsedData = await parser.parse(blockingChartBuffer);
        console.log('✅ Parsed blocking chart');
        console.log('  Campaign lines:', parsedData.campaignLines.length);
        console.log('  Validation warnings:', parsedData.validationWarnings?.length || 0);
        // Filter out deleted rows if any
        if (deletedRows.length > 0 && parsedData.campaignLines.length > 0) {
            const originalCount = parsedData.campaignLines.length;
            console.log(`🗑️  Original campaign lines: ${originalCount}`);
            parsedData.campaignLines = parsedData.campaignLines.filter((line, index)=>{
                const shouldKeep = !deletedRows.includes(index);
                if (!shouldKeep) {
                    console.log(`  ❌ Removing campaign line at index ${index}`);
                }
                return shouldKeep;
            });
            console.log(`🗑️  After filtering: ${parsedData.campaignLines.length} (removed ${originalCount - parsedData.campaignLines.length})`);
        }
        // Check if we have any campaign lines to process
        if (parsedData.campaignLines.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No campaign lines found in blocking chart'
            }, {
                status: 400
            });
        }
        // Load the built-in template
        const templatePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "templates", "unilever-traffic-sheet-template.xlsx");
        let templateBuffer;
        try {
            const templateFile = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(templatePath);
            // Convert Node.js Buffer to ArrayBuffer
            templateBuffer = templateFile.buffer.slice(templateFile.byteOffset, templateFile.byteOffset + templateFile.byteLength);
            console.log('✅ Template file read successfully');
        } catch (error) {
            console.warn('⚠️  Failed to read template file, will create from scratch:', error?.message || error);
        }
        // Generate the traffic sheet using new shared generator
        console.log('🏗️  Generating traffic sheet...');
        const generator = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$excel$2f$trafficSheetWriter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TrafficSheetGenerator"]();
        const workbook = await generator.generate(parsedData, templateBuffer);
        // Write workbook to buffer
        const buffer = await workbook.xlsx.writeBuffer();
        console.log('✅ Traffic sheet generated successfully');
        console.log('  Buffer size:', buffer.byteLength, 'bytes');
        // Return the generated Excel file
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](Buffer.from(buffer), {
            status: 200,
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename="traffic-sheet-${Date.now()}.xlsx"`
            }
        });
    } catch (error) {
        console.error("Error generating traffic sheet:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to generate traffic sheet",
            details: error instanceof Error ? error.message : "Unknown error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f9f01bb7._.js.map