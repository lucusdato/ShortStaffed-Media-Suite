/**
 * Creative Line - individual row in traffic sheet (no merging)
 * Represents 1 of 5 creative lines within an ad group
 */
export interface CreativeLine {
  creativeName?: string;
  creativeFormat?: string;
  adFormat?: string;
  // Add other creative-specific fields as needed
}

/**
 * Ad Group - contains 5 creative lines
 * Represents 1 of 3 ad groups within a campaign line
 * These fields merge across 5 rows in the traffic sheet
 */
export interface AdGroup {
  accuticsCampaignName?: string;
  targeting?: string;
  target?: string;
  kpi?: string;
  kpiValue?: string | number;
  placements?: string;
  buyType?: string;
  measurement?: string;

  // 5 creative lines per ad group
  creativeLines: CreativeLine[];
}

/**
 * Campaign Line - identified by budget/impressions merge in blocking chart
 * Expands to 15 rows in traffic sheet (3 ad groups × 5 creative lines each)
 * These fields merge across all 15 rows in the traffic sheet
 */
export interface CampaignLine {
  // Campaign-level fields (span all 15 rows)
  channel: string;
  platform: string;
  mediaType?: string;
  objective: string;
  language?: string;
  target?: string;  // Target demographic (used for DEMO extraction: W25-49, M18-44, etc.)
  startDate: string;
  endDate: string;

  // Budget information
  grossBudget?: number;
  netBudget?: number;
  estImpressions?: number;
  estCpm?: number;
  adServing?: number;
  dvCost?: number;
  buffer?: number;

  // Additional metadata
  tagsRequired?: string;

  // Exclusion flags for non-digital channels (OOH, TV, Radio, Print)
  isExcluded?: boolean;         // If true, appears in verification but not in traffic sheet
  excludedReason?: string;      // Reason for exclusion (e.g., "OOH", "TV", "Radio", "Print")

  // 3 ad groups per campaign line
  adGroups: AdGroup[];

  // Metadata for tracking
  _sourceRowNumbers: number[];  // Which blocking chart rows comprise this campaign line
  _mergeSpan: number;           // How many rows in blocking chart (for verify data display)
}

/**
 * Legacy interface - kept for backward compatibility during migration
 * @deprecated Use CampaignLine instead
 */
export interface ParsedBlockingChartRow {
  channel?: string;
  tactic?: string;
  platform?: string;
  objective?: string;
  placementType?: string;
  adFormat?: string;
  adSize?: string;
  buyType?: string;
  startDate?: string;
  endDate?: string;
  impressions?: number;
  cpm?: number;
  budget?: number;
  flightDates?: string;
  targetAudience?: string;
  creativeName?: string;
  landingPage?: string;
  trackingPixel?: string;
  notes?: string;
  _mergeSpan?: number; // Number of rows in the campaign line (for merged budget cells)
  _campaignLineMasterRow?: number; // Master row number of the campaign line this row belongs to
  [key: string]: string | number | undefined;
}

/**
 * Parsed blocking chart - contains campaign lines
 */
export interface ParsedBlockingChart {
  headers: string[];

  // New hierarchical structure
  campaignLines?: CampaignLine[];

  // Legacy flat structure (deprecated, kept for migration)
  rows: ParsedBlockingChartRow[];

  metadata?: {
    campaignName?: string;
    client?: string;
    brand?: string;
    dateRange?: string;
    flightDates?: string;
    plannedNetMedia?: number;
    estimatedFees?: number;
    totalGrossBudget?: number;
    detectedTemplate?: string;  // Template ID that was detected
    templateName?: string;       // Human-readable template name
  };
}

export interface TrafficSheetRow {
  [key: string]: string | number | undefined;
}

export interface ExcelStyleInfo {
  font?: {
    bold?: boolean;
    size?: number;
    color?: { argb?: string };
  };
  fill?: {
    type?: string;
    fgColor?: { argb?: string };
  };
  alignment?: {
    horizontal?: string;
    vertical?: string;
    wrapText?: boolean;
  };
  border?: Record<string, unknown>;
}

