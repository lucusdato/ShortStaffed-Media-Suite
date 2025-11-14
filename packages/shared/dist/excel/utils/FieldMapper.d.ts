/**
 * Field Mapper Utility
 * Centralizes all field mappings between blocking chart columns and traffic sheet columns
 * Replaces scattered mapping logic across parseBlockingChart, generateTrafficSheet, and trafficSheetWriter
 */
import type { TrafficSheetTab } from '../types';
/**
 * Blocking chart column names (exact matches from blocking chart)
 */
export declare const BLOCKING_CHART_COLUMNS: {
    readonly CHANNEL: "Channel";
    readonly PLATFORM: "Platform";
    readonly MEDIA_TYPE: "Media type";
    readonly BUY_TYPE: "Buy Type";
    readonly OBJECTIVE: "Objective";
    readonly PLACEMENTS: "Campaign Details - Placements";
    readonly ACCUTICS_CAMPAIGN_NAME: "Accutics Campaign Name";
    readonly TAGS_REQUIRED: "Tags Required";
    readonly MEASUREMENT: "Measurement";
    readonly LANGUAGE: "Language";
    readonly AD_FORMAT: "Ad Format";
    readonly KPI: "KPI";
    readonly KPI_VALUE: "KPI Value";
    readonly TARGET: "Target";
    readonly TARGETING: "Targeting";
    readonly EST_CPM: "Est. CPM";
    readonly EST_IMPRESSIONS: "Est. Impressions";
    readonly GROSS_BUDGET: "Gross Budget";
    readonly NET_BUDGET: "Net Budget";
    readonly AD_SERVING: "Ad Serving";
    readonly DV_COST: "DV Cost";
    readonly BUFFER: "Buffer (+30%)";
    readonly START_DATE: "Start Date";
    readonly END_DATE: "End Date";
};
/**
 * Campaign line detection columns (must be merged together)
 */
export declare const CAMPAIGN_LINE_INDICATORS: readonly ["Est. Impressions", "Gross Budget", "Campaign Details - Placements"];
/**
 * Blocking chart to internal field name mappings
 * Handles all known column name variations
 */
export declare const BLOCKING_CHART_FIELD_MAPPINGS: Record<string, string>;
/**
 * Traffic sheet column mappings by tab
 * Maps internal field names to traffic sheet column names
 */
export declare const TRAFFIC_SHEET_FIELD_MAPPINGS: Record<TrafficSheetTab, Record<string, string>>;
/**
 * Get internal field name from blocking chart column name
 *
 * @param blockingChartColumn - Column name from blocking chart
 * @returns Internal field name or undefined if not found
 */
export declare function getInternalFieldName(blockingChartColumn: string): string | undefined;
/**
 * Get traffic sheet column name from internal field name
 *
 * @param internalFieldName - Internal field name
 * @param tab - Traffic sheet tab
 * @returns Traffic sheet column name or undefined if not found
 */
export declare function getTrafficSheetColumnName(internalFieldName: string, tab: TrafficSheetTab): string | undefined;
/**
 * Build a map of traffic sheet column names to column indexes
 * Used for efficient column lookup during sheet writing
 *
 * @param headers - Array of column header names from traffic sheet template
 * @returns Map of normalized column name → column index
 */
export declare function buildColumnIndexMap(headers: string[]): Map<string, number>;
/**
 * Map blocking chart data to internal structure
 *
 * @param blockingChartRow - Raw row data from blocking chart
 * @param headers - Blocking chart column headers
 * @returns Object with internal field names as keys
 */
export declare function mapBlockingChartRowToInternal(blockingChartRow: Record<string, any>, headers: string[]): Record<string, any>;
//# sourceMappingURL=FieldMapper.d.ts.map