/**
 * Shared configuration constants for Excel processing
 * Centralizes all magic numbers, field mappings, and hardcoded values
 * Used by both desktop and web implementations
 */
/**
 * Row Expansion Configuration
 * Defines the hierarchical structure: Campaign Line → Ad Groups → Creative Lines
 *
 * IMPORTANT: Ad group count is now DYNAMIC based on unique audience values
 * in the blocking chart, not hardcoded by platform
 */
export declare const ROW_EXPANSION_CONFIG: {
    readonly CREATIVES_PER_AD_GROUP: 5;
    readonly MERGE_LEVELS: {
        readonly CAMPAIGN: readonly ["channel", "platform", "mediaType", "objective", "startDate", "endDate", "grossBudget", "netBudget", "language", "placements"];
        readonly AD_GROUP: readonly ["audience", "accuticsCampaignName", "targeting", "target", "kpi", "buyType"];
        readonly CREATIVE: readonly ["creativeName", "creativeFormat", "adFormat"];
    };
    readonly AD_GROUP_MERGE_SPAN: 5;
    readonly CREATIVE_MERGE_SPAN: 1;
};
/**
 * Demographic Extraction Configuration
 * Used to extract demographic codes from Target field for Brand Say Digital
 */
export declare const DEMOGRAPHIC_CONFIG: {
    readonly DEMO_PATTERN: RegExp;
    readonly GENDER_CODES: {
        readonly M: "Men";
        readonly W: "Women";
        readonly F: "Women";
        readonly A: "Adults";
    };
    readonly DEFAULT_DEMO: "A18+";
};
/**
 * Traffic Sheet Generation Configuration
 */
export declare const TRAFFIC_SHEET_CONFIG: {
    readonly CREATIVES_PER_AD_GROUP: 5;
    readonly HEADER_LABEL_ROW: 8;
    readonly FIRST_DATA_ROW: 9;
    readonly TEMPLATE_START_ROW: 9;
    readonly HEADER_AREA_START_ROW: 1;
    readonly HEADER_AREA_END_ROW: 7;
    readonly BORDER_CONFIG: {
        readonly 'Brand Say Digital': {
            readonly start: 2;
            readonly end: 21;
            readonly exclude: number[];
        };
        readonly 'Brand Say Social': {
            readonly start: 2;
            readonly end: 26;
            readonly exclude: number[];
        };
        readonly 'Other Say Social': {
            readonly start: 2;
            readonly end: 24;
            readonly exclude: number[];
        };
    };
};
/**
 * Blocking Chart Parsing Configuration
 */
export declare const PARSING_CONFIG: {
    readonly MIN_HEADER_CELLS: 3;
    readonly MAX_METADATA_ROWS: 10;
    readonly REQUIRED_HEADER_KEYWORDS: readonly ["channel", "platform", "objective"];
    readonly BUDGET_COLUMN_NAMES: readonly ["Gross Budget", "Net Budget", "Gross Media Cost", "Media Cost", "Working Media Budget", "Budget"];
    readonly IMPRESSIONS_COLUMN_NAMES: readonly ["Est. Impressions", "Estimated Impressions", "Impressions", "Impressions/GRPs"];
    readonly PLACEMENTS_COLUMN_NAMES: readonly ["Campaign Details - Placements", "Placements", "Placement"];
    readonly AUDIENCE_COLUMN_NAMES: readonly ["Targeting", "Target", "Audience", "Target Audience"];
    readonly MIN_CAMPAIGN_LINE_FIELDS: 4;
};
/**
 * Campaign Line Detection Configuration
 * Defines which columns must be merged together to identify a campaign line
 */
export declare const CAMPAIGN_LINE_DETECTION_CONFIG: {
    readonly REQUIRED_MERGE_COLUMNS: readonly ["Est. Impressions", "Gross Budget", "Campaign Details - Placements"];
    readonly BUDGET_ALTERNATIVES: readonly ["Net Budget", "Gross Media Cost", "Working Media Budget"];
    readonly EXCLUSION_PATTERNS: readonly ["total", "subtotal", "summary", "variance", "grand total", "mpa budget"];
};
/**
 * Ad Group Detection Configuration (NEW - Audience-Based)
 * Defines how ad groups are identified within campaign lines
 */
export declare const AD_GROUP_DETECTION_CONFIG: {
    readonly PRIMARY_GROUPING_FIELD: "audience";
    readonly FALLBACK_GROUPING_FIELDS: readonly ["targeting", "target"];
    readonly DEFAULT_AD_GROUP_NAME: "Unspecified";
    readonly MIN_ROWS_PER_AD_GROUP: 5;
    readonly MAX_ROWS_PER_AD_GROUP: 5;
};
/**
 * Categorization Rules Configuration
 * Determines which traffic sheet tab a campaign line goes to
 */
export declare const CATEGORIZATION_CONFIG: {
    readonly BRAND_SAY_DIGITAL_KEYWORDS: readonly ["digital video", "digital display", "digital audio", "programmatic", "ctv", "audio", "ooh"];
    readonly SOCIAL_PLATFORMS: readonly ["meta", "facebook", "instagram", "fb", "ig", "tiktok", "tik tok", "pinterest", "pin", "reddit", "snapchat", "snap", "twitter", "x.com", "linkedin"];
    readonly INFLUENCER_KEYWORDS: readonly ["influencer", "creator"];
    readonly SECTION_HEADER_PATTERNS: readonly ["digital video", "digital display", "digital audio", "paid social", "social", "video", "display", "audio"];
    readonly SUMMARY_ROW_PATTERNS: readonly ["mpa budget", "variance", "grand total"];
    readonly EXCLUDED_CHANNEL_KEYWORDS: {
        readonly OOH: readonly ["pattison", "astral", "out of home", "ooh", "billboard", "transit", "outdoor"];
        readonly TV: readonly ["linear tv", "television", "broadcast tv", "tv broadcast", "linear television"];
        readonly RADIO: readonly ["radio", "am/fm", "am fm"];
        readonly PRINT: readonly ["print", "magazine", "newspaper", "press"];
    };
};
/**
 * Styling Configuration
 * Excel cell styling rules
 */
export declare const STYLE_CONFIG: {
    readonly HEADER_LABELS: readonly ["OBJECTIVE", "TACTIC", "PLATFORM", "DEMO", "TARGETING DETAILS"];
    readonly TEMPLATE_TEXT_TO_CLEAR: readonly ["Accutics Campaign Name", "Audience", "Accutics Ad Set Name", "CREATIVE TYPE", "DEVICE", "GEO", "LANGUAGE", "START DATE", "END DATE", "KPI Metric"];
    readonly MERGEABLE_COLUMN_HEADERS: readonly ["CREATIVE TYPE", "DEVICE", "GEO", "BUY TYPE", "BID TYPE", "AD SET BUDGET", "TARGETING SUMMARY", "CREATIVETYPE"];
};
/**
 * Validation Configuration
 * Rules for data quality validation
 */
export declare const VALIDATION_CONFIG: {
    readonly REQUIRED_CAMPAIGN_FIELDS: readonly ["channel", "platform"];
    readonly NUMERIC_FIELDS: readonly ["budget", "grossBudget", "netBudget", "estImpressions", "estCpm", "adServing", "dvCost", "buffer"];
    readonly DATE_FIELDS: readonly ["startDate", "endDate"];
};
/**
 * Date Formatting Configuration
 */
export declare const DATE_CONFIG: {
    readonly MONTH_NAMES: readonly ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
};
/**
 * Template Detection Configuration
 * For identifying blocking chart template versions
 */
export declare const TEMPLATE_CONFIG: {
    readonly MIN_EXTENDED_COLUMNS: 2;
    readonly TEMPLATE_PRIORITY: {
        readonly 'unilever-extended': 2;
        readonly 'unilever-standard': 1;
    };
    readonly MAX_ROWS_TO_SCAN: 20;
    readonly PREFER_FIRST_VISIBLE: true;
    readonly SHOW_HIDDEN_TABS: false;
};
//# sourceMappingURL=config.d.ts.map