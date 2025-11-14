"use strict";
/**
 * Field Mapper Utility
 * Centralizes all field mappings between blocking chart columns and traffic sheet columns
 * Replaces scattered mapping logic across parseBlockingChart, generateTrafficSheet, and trafficSheetWriter
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRAFFIC_SHEET_FIELD_MAPPINGS = exports.BLOCKING_CHART_FIELD_MAPPINGS = exports.CAMPAIGN_LINE_INDICATORS = exports.BLOCKING_CHART_COLUMNS = void 0;
exports.getInternalFieldName = getInternalFieldName;
exports.getTrafficSheetColumnName = getTrafficSheetColumnName;
exports.buildColumnIndexMap = buildColumnIndexMap;
exports.mapBlockingChartRowToInternal = mapBlockingChartRowToInternal;
const FieldNormalizer_1 = require("./FieldNormalizer");
/**
 * Blocking chart column names (exact matches from blocking chart)
 */
exports.BLOCKING_CHART_COLUMNS = {
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
    TARGETING: 'Targeting', // Sometimes used instead of Target
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
    END_DATE: 'End Date',
};
/**
 * Campaign line detection columns (must be merged together)
 */
exports.CAMPAIGN_LINE_INDICATORS = [
    'Est. Impressions', // Primary indicator
    'Gross Budget', // Primary indicator
    'Campaign Details - Placements' // Primary indicator (added for triple-merge detection)
];
/**
 * Blocking chart to internal field name mappings
 * Handles all known column name variations
 */
exports.BLOCKING_CHART_FIELD_MAPPINGS = {
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
    'Tactic': 'tactic',
};
/**
 * Traffic sheet column mappings by tab
 * Maps internal field names to traffic sheet column names
 */
exports.TRAFFIC_SHEET_FIELD_MAPPINGS = {
    'Brand Say Digital': {
        // Campaign-level fields
        'platform': 'Platform',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'objective': 'Objective',
        'language': 'Language',
        'buyType': 'Buy Type',
        'demo': 'Demo',
        'placements': 'Tactic', // Placements → Tactic for digital
        'accuticsCampaignName': 'Accutics Campaign Name',
        'creativetype': 'Creative Type', // Left blank for client
        'device': 'Device', // Left blank for client
        'geo': 'Geo', // Left blank for client
        // Ad group-level fields
        'audience': 'Audience',
        'accuticsAdSetName': 'Accutics Ad Set Name',
        'kpi': 'KPI Metric',
        'optimizationEvent': 'Optimization Event',
        // Creative-level fields (blank for creative agency)
        'creativeName': 'Creative Name',
        'linkToCreative': 'Link to Creative',
        'postCopy': 'Post Copy',
        'headline': 'Headline',
    },
    'Brand Say Social': {
        // Campaign-level fields
        'platform': 'Platform',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'objective': 'Objective',
        'language': 'Language',
        'buyType': 'Buy Type',
        'placements': 'Campaign Name (Taxonomy from Accuitics)', // Placements → Campaign Name for social
        'traffickingNotes': 'Trafficking Notes',
        // Ad group-level fields
        'audience': 'Audience',
        'adSetName': 'Ad Set Name (Taxonomy from Accuitics)',
        'targetingSummary': 'Targeting Summary', // Left blank for client
        'adGroupPlacements': 'Placements', // Ad group-level placements
        'optimizationEvent': 'Optimization Event',
        // Creative-level fields (blank for creative agency)
        'creativeName': 'Creative Name',
        'linkToCreative': 'Link to Creative',
        'postCopy': 'Post Copy',
        'headline': 'Headline',
        'primaryText': 'Primary Text',
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
        'adGroupPlacements': 'Placements', // Ad group-level placements
        'optimizationEvent': 'Optimization Event',
        // Creative-level fields
        'creativeName': 'Creative Name',
        'linkToCreative': 'Link to Creative',
        'postCopy': 'Post Copy',
        'headline': 'Headline',
    },
};
/**
 * Get internal field name from blocking chart column name
 *
 * @param blockingChartColumn - Column name from blocking chart
 * @returns Internal field name or undefined if not found
 */
function getInternalFieldName(blockingChartColumn) {
    // Try direct mapping first
    if (exports.BLOCKING_CHART_FIELD_MAPPINGS[blockingChartColumn]) {
        return exports.BLOCKING_CHART_FIELD_MAPPINGS[blockingChartColumn];
    }
    // Try normalized lookup
    const normalized = (0, FieldNormalizer_1.normalizeFieldName)(blockingChartColumn);
    for (const [key, value] of Object.entries(exports.BLOCKING_CHART_FIELD_MAPPINGS)) {
        if ((0, FieldNormalizer_1.normalizeFieldName)(key) === normalized) {
            return value;
        }
    }
    return undefined;
}
/**
 * Get traffic sheet column name from internal field name
 *
 * @param internalFieldName - Internal field name
 * @param tab - Traffic sheet tab
 * @returns Traffic sheet column name or undefined if not found
 */
function getTrafficSheetColumnName(internalFieldName, tab) {
    return exports.TRAFFIC_SHEET_FIELD_MAPPINGS[tab][internalFieldName];
}
/**
 * Build a map of traffic sheet column names to column indexes
 * Used for efficient column lookup during sheet writing
 *
 * @param headers - Array of column header names from traffic sheet template
 * @returns Map of normalized column name → column index
 */
function buildColumnIndexMap(headers) {
    const map = new Map();
    headers.forEach((header, index) => {
        if (header) {
            // Store both normalized and original for flexible lookup
            map.set((0, FieldNormalizer_1.normalizeFieldName)(header), index);
            map.set(header, index);
        }
    });
    return map;
}
/**
 * Map blocking chart data to internal structure
 *
 * @param blockingChartRow - Raw row data from blocking chart
 * @param headers - Blocking chart column headers
 * @returns Object with internal field names as keys
 */
function mapBlockingChartRowToInternal(blockingChartRow, headers) {
    const mapped = {};
    headers.forEach((header, index) => {
        const internalField = getInternalFieldName(header);
        if (internalField && blockingChartRow[header] !== undefined) {
            mapped[internalField] = blockingChartRow[header];
        }
    });
    return mapped;
}
