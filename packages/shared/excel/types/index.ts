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
  // Add other creative-specific fields as needed
}

/**
 * Ad Group - contains exactly 5 creative lines
 * Count is dynamically determined by unique audience values in blocking chart
 * These fields merge across 5 rows in the traffic sheet
 */
export interface AdGroup {
  // Ad group-level fields (merge across 5 creative rows)
  audience?: string;            // Primary identifier - determines ad group boundaries
  accuticsCampaignName?: string;
  targeting?: string;
  target?: string;
  kpi?: string;
  kpiValue?: string | number;
  placements?: string;
  measurement?: string;

  // Always exactly 5 creative lines per ad group
  creativeLines: CreativeLine[];
}

/**
 * Campaign Line - identified by budget/impressions/placements merge in blocking chart
 * Number of rows in traffic sheet = (number of unique audiences) × 5 creative lines
 * Example: 3 audiences → 15 rows, 5 audiences → 25 rows
 * These fields merge across ALL rows in the traffic sheet
 */
export interface CampaignLine {
  // Campaign-level fields (span all traffic sheet rows)
  channel: string;
  platform: string;
  mediaType?: string;
  objective: string;
  language?: string;
  target?: string;          // Target demographic (used for DEMO extraction: W25-49, M18-44, etc.)
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

  // Campaign-level placements/tactic
  placements?: string;      // Campaign Details - Placements from blocking chart
  accuticsCampaignName?: string; // Accutics Campaign Name from blocking chart (campaign level)

  // Additional metadata
  adFormat?: string;        // Ad Format from blocking chart (used for categorization)
  buyType?: string;         // Buy Type - 'Auction' (default) or 'Reach & Frequency' (TikTok Pulse)
  tagsRequired?: string;

  // Exclusion flags for non-digital channels (OOH, TV, Radio, Print)
  isExcluded?: boolean;         // If true, appears in verification but not in traffic sheet
  excludedReason?: string;      // Reason for exclusion (e.g., "OOH", "TV", "Radio", "Print")

  // Ad groups - count determined dynamically by unique audience values
  adGroups: AdGroup[];

  // Validation warnings for this campaign line
  validationWarnings?: ValidationWarning[];

  // Metadata for tracking
  _sourceRowNumbers: number[];      // Which blocking chart rows comprise this campaign line
  blockingChartRowCount: number;    // How many rows in blocking chart (for debugging/verification)
  stableIndex?: number;             // Stable index assigned during parsing (used for manual overrides)
}

/**
 * Parsed blocking chart - contains hierarchical campaign line structure
 */
export interface ParsedBlockingChart {
  headers: string[];

  // Hierarchical structure - primary data model
  campaignLines: CampaignLine[];

  // Global validation warnings (not specific to a campaign line)
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
    detectedTemplate?: string;  // Template ID that was detected
    templateName?: string;       // Human-readable template name
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

/**
 * Range of rows in blocking chart that comprise a campaign line
 */
export interface CampaignLineRange {
  masterRow: number;        // First row of the merge
  span: number;             // Number of rows merged
  endRow: number;          // Last row of the merge (masterRow + span - 1)
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
