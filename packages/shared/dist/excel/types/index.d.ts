/**
 * Shared TypeScript interfaces for Excel blocking chart parsing and traffic sheet generation
 * Used by both desktop (Electron) and web implementations
 */
/**
 * Validation warning for data quality issues
 * Allows processing to continue while flagging problems
 */
export interface ValidationWarning {
    severity: 'error' | 'warning' | 'info';
    message: string;
    field?: string;
    rowNumber?: number;
    campaignLineIndex?: number;
}
/**
 * Creative Line - individual row in traffic sheet (no merging)
 * Represents 1 of 5 creative lines within an ad group
 */
export interface CreativeLine {
    creativeName?: string;
    creativeFormat?: string;
    adFormat?: string;
}
/**
 * Ad Group - contains exactly 5 creative lines
 * Count is dynamically determined by unique audience values in blocking chart
 * These fields merge across 5 rows in the traffic sheet
 */
export interface AdGroup {
    audience?: string;
    accuticsCampaignName?: string;
    targeting?: string;
    target?: string;
    kpi?: string;
    kpiValue?: string | number;
    placements?: string;
    buyType?: string;
    measurement?: string;
    creativeLines: CreativeLine[];
}
/**
 * Campaign Line - identified by budget/impressions/placements merge in blocking chart
 * Number of rows in traffic sheet = (number of unique audiences) × 5 creative lines
 * Example: 3 audiences → 15 rows, 5 audiences → 25 rows
 * These fields merge across ALL rows in the traffic sheet
 */
export interface CampaignLine {
    channel: string;
    platform: string;
    mediaType?: string;
    objective: string;
    language?: string;
    target?: string;
    startDate: string;
    endDate: string;
    grossBudget?: number;
    netBudget?: number;
    estImpressions?: number;
    estCpm?: number;
    adServing?: number;
    dvCost?: number;
    buffer?: number;
    placements?: string;
    accuticsCampaignName?: string;
    adFormat?: string;
    tagsRequired?: string;
    isExcluded?: boolean;
    excludedReason?: string;
    adGroups: AdGroup[];
    validationWarnings?: ValidationWarning[];
    _sourceRowNumbers: number[];
    blockingChartRowCount: number;
    stableIndex?: number;
}
/**
 * Parsed blocking chart - contains hierarchical campaign line structure
 */
export interface ParsedBlockingChart {
    headers: string[];
    campaignLines: CampaignLine[];
    validationWarnings?: ValidationWarning[];
    metadata?: {
        campaignName?: string;
        client?: string;
        brand?: string;
        dateRange?: string;
        flightDates?: string;
        plannedNetMedia?: number;
        estimatedFees?: number;
        totalGrossBudget?: number;
        detectedTemplate?: string;
        templateName?: string;
    };
}
/**
 * Traffic sheet row for Excel output
 */
export interface TrafficSheetRow {
    [key: string]: string | number | undefined;
}
/**
 * Excel style information for cell formatting
 */
export interface ExcelStyleInfo {
    font?: {
        bold?: boolean;
        size?: number;
        color?: {
            argb?: string;
        };
    };
    fill?: {
        type?: string;
        fgColor?: {
            argb?: string;
        };
    };
    alignment?: {
        horizontal?: string;
        vertical?: string;
        wrapText?: boolean;
    };
    border?: Record<string, unknown>;
}
/**
 * Range of rows in blocking chart that comprise a campaign line
 */
export interface CampaignLineRange {
    masterRow: number;
    span: number;
    endRow: number;
}
/**
 * Excel merge information for traffic sheet generation
 */
export interface MergeInfo {
    startRow: number;
    endRow: number;
    startCol: number;
    endCol: number;
}
/**
 * Categorized campaign lines for different traffic sheet tabs
 */
export interface CategorizedCampaignLines {
    'Brand Say Digital': CampaignLine[];
    'Brand Say Social': CampaignLine[];
    'Other Say Social': CampaignLine[];
}
/**
 * Traffic sheet tab type
 */
export type TrafficSheetTab = 'Brand Say Digital' | 'Brand Say Social' | 'Other Say Social';
//# sourceMappingURL=index.d.ts.map