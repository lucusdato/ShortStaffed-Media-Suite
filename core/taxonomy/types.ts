/**
 * TypeScript interfaces for Accutics Taxonomy Generator
 * Rebuilt from Accutics Unilever Field Name Strings specifications
 */

// ============================================================================
// USER-PROVIDED METADATA
// ============================================================================

export interface UserMetadata {
  cnCode: string;              // Campaign CN Code (e.g., "CN002366")
  marketName: string;          // Market-Short-Name-(PCat) (e.g., "SKNCLN")
  countryCode: string;         // Country Code (e.g., "GB", "US")
  brandName: string;           // Brand Name (e.g., "Pond's")
  campaignName: string;        // Campaign Name (e.g., "Panacea-(Ponds)")
}

// ============================================================================
// TAXONOMY INPUT DATA
// ============================================================================

export interface TaxonomyInputData {
  // User-provided metadata (from form)
  cnCode: string;
  marketName: string;
  countryCode: string;
  brandName: string;
  campaignName: string;

  // Source data
  platform: string;            // Detected platform (e.g., "TradeDesk", "Meta")
  originalTactic: string;      // Original tactic name from blocking chart/traffic sheet

  // Campaign Level Fields
  campaignType: string;        // e.g., "BrdPrecPerf", "Tactical"
  formatType: string;          // e.g., "Display", "Video", "Carousel"
  objective: string;           // e.g., "awa" (awareness), "cons" (consideration), "conv" (conversion)

  // Line Item/Ad Group Level Fields
  buyModel: string;            // e.g., "OMPPMP", "ReaFreq", "Auc"
  targetingStrategy?: string;  // e.g., "CNT" (Contextual), "AUD" (Audience)
  placementType: string;       // e.g., "InStream", "FeedStory", "Banner"
  audienceParty: string;       // e.g., "1pd", "2pd", "3pd", "12pd-diddad"
  audienceType: string;        // e.g., "Behav", "LLike", "None", "Demog"
  audienceName: string;        // e.g., "AdvSk", "Prospecting"
  gender: string;              // e.g., "Ad" (All), "M", "F"
  ageLower: number;            // e.g., 18
  ageUpper: number;            // e.g., 65 (use 100 for "65+")
  deviceType: string;          // e.g., "MobDesk", "Mob", "MobTab", "All"
  trustedPublisher?: string;   // Optional, e.g., "hrt", "prog"

  // Creative/Ad Level Fields
  formatSize: string;          // e.g., "300x250", "30s", "20s"
  creativeName: string;        // e.g., "Creative-Name", "Summer-Hero-V1"
  landingPageType: string;     // e.g., "Retail", "BrandSite", "Social"
  retailer?: string;           // Required if landingPageType = "Retail" (e.g., "Costco", "Amazon")
  influencer?: string;         // Optional influencer name
  influencerHandle?: string;   // Optional, e.g., "[hygge_for_home]"
  influencerPostType?: string; // Optional, e.g., "DARK", "BSAY"

  // Platform-Specific Optional Fields
  collaborativeAccountType?: string;  // Meta only, e.g., "Collab"
  collaborativeAd?: string;           // Meta only, e.g., "collab"
  productFormat?: string;             // Amazon DSP only, e.g., "privid"
  creativeExchange?: string;          // TikTok only, e.g., "CE"
  addOn?: string;                     // TikTok only

  // Free text
  freeText?: string;           // Optional free text for any level

  // Metadata for UI
  isDefaulted: { [fieldName: string]: boolean };  // Track which fields were auto-filled
  validationErrors: string[];                      // Validation error messages
}

// ============================================================================
// GENERATED TAXONOMY
// ============================================================================

export interface GeneratedTaxonomy {
  platform: string;            // e.g., "TradeDesk"
  platformFieldName: string;   // e.g., "Campaign", "Adgroup", "Ad Set", "Insertion Order"
  taxonomyString: string;      // Generated taxonomy string (underscore-separated)
  validationErrors: string[];  // Validation errors for this specific taxonomy level
}

// ============================================================================
// TAXONOMY ROW (Complete data for one tactic)
// ============================================================================

export interface TaxonomyRow {
  rowIndex: number;                      // Original row index from blocking chart/traffic sheet
  originalTactic: string;                // Original tactic name
  platform: string;                      // Detected platform
  userMetadata: UserMetadata;            // User-provided metadata
  inputFields: TaxonomyInputData;        // All input fields (defaults + extracts + edits)
  taxonomies: GeneratedTaxonomy[];       // Generated taxonomies for all levels
}

// ============================================================================
// PLATFORM CONFIGURATION
// ============================================================================

export interface TaxonomyLevel {
  structure: string | string[];  // Field structure (array of tokens or "Free text")
  separator?: string;            // Separator character (default: "_")
  isRequired: boolean;           // Whether this level is required
  example?: string;              // Example taxonomy string
}

export interface PlatformConfig {
  platformName: string;
  displayName: string;
  taxonomyLevels: {
    [levelName: string]: TaxonomyLevel;
  };
  fieldDefaults: Partial<TaxonomyInputData>;  // Smart defaults for this platform
}

// ============================================================================
// API TYPES
// ============================================================================

export interface ParseTaxonomyRequest {
  // User metadata
  cnCode: string;
  marketName: string;
  groupName: string;
  countryCode: string;
  brandName: string;
  campaignName: string;

  // Files (as FormData)
  blockingChart?: File;
  trafficSheet?: File;
}

export interface ParseTaxonomyResponse {
  rows: TaxonomyRow[];
  platformBreakdown: {
    [platform: string]: number;  // Count of tactics per platform
  };
  totalRows: number;
  errors?: string[];
}

export interface ExportTaxonomyRequest {
  rows: TaxonomyRow[];
  exportFormat: 'embedded' | 'platform-sheets' | 'copy-only';
  sourceFileName?: string;
}

// ============================================================================
// FIELD MAPPING
// ============================================================================

export interface FieldMapping {
  taxonomyField: string;        // Field name in TaxonomyInputData
  blockingChartColumns: string[]; // Possible column names in blocking chart
  trafficSheetColumns: string[];  // Possible column names in traffic sheet
  transform?: (value: any) => any; // Optional transform function
}

// ============================================================================
// SMART DEFAULTS
// ============================================================================

export interface SmartDefaultsRule {
  condition?: (row: any) => boolean;  // Optional condition
  defaults: Partial<TaxonomyInputData>; // Default values to apply
}

export interface SmartDefaultsConfig {
  [platform: string]: {
    rules: SmartDefaultsRule[];
    baseDefaults: Partial<TaxonomyInputData>;
  };
}

// ============================================================================
// VALIDATION
// ============================================================================

export interface ValidationRule {
  field: string;
  validate: (value: any, row: TaxonomyInputData) => string | null; // Returns error message or null
}

export interface PlatformValidationConfig {
  [platform: string]: {
    [levelName: string]: ValidationRule[];
  };
}

// ============================================================================
// PARSED INPUT SOURCES
// ============================================================================

// Parsed row from blocking chart
export interface ParsedBlockingChartRow {
  rowIndex: number;
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
  creativeName?: string;
  targetAudience?: string;
  [key: string]: any;
}

// Parsed row from traffic sheet
export interface ParsedTrafficSheetRow {
  rowIndex: number;
  platform: string;
  tactic?: string;
  placementType?: string;
  formatType?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  cpm?: number;
  impressions?: number;
  creativeName?: string;
  audience?: string;
  [key: string]: any;
}
