/**
 * TypeScript interfaces for Accutics Taxonomy Generator
 */

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
  [key: string]: any; // Allow other columns from traffic sheet
}

// Complete taxonomy input data (extracted + defaulted + user-edited)
export interface TaxonomyInputData {
  // Campaign Level Fields
  marketName: string;             // PCat/Market (e.g., "US-Hair")
  brandName: string;               // Brand (e.g., "Dove")
  campaignName: string;            // Campaign (e.g., "Summer-Hydration-2025")
  campaignCnCode: string;          // CN Code (e.g., "CN123")
  campaignType: string;            // Type (e.g., "Always-On", "Seasonal", "Tactical")
  formatType: string;              // Format (e.g., "Display", "Video", "Audio")
  objective: string;               // Objective (e.g., "Awareness", "Consideration", "Conversion")
  campaignFreeText?: string;       // Optional free text

  // Line Item (Ad Group) Level Fields
  buyModel: string;                // Buy Model (e.g., "Programmatic", "Direct")
  targetingStrategy: string;       // Strategy (e.g., "Behavioral", "Contextual", "Interest")
  placementType: string;           // Placement (e.g., "In-Feed", "Banner", "Video")
  audienceParty: string;           // Audience Party (e.g., "1PD", "2PD", "3PD", "Prospecting")
  audienceType: string;            // Audience Type (e.g., "CRM", "Lookalike", "Interest")
  audienceName: string;            // Audience Name (e.g., "Meta-Prospecting")
  gender: string;                  // Gender (e.g., "Male", "Female", "All")
  ageLower: number;                // Age lower bound (e.g., 18)
  ageUpper: number;                // Age upper bound (e.g., 65)
  deviceType: string;              // Device (e.g., "Mobile", "Desktop", "All", "CTV")
  trustedPublisher?: string;       // Trusted Publisher (optional)
  lineItemFreeText?: string;       // Optional free text

  // Creative/Ad Level Fields
  formatSize: string;              // Format Size (e.g., "300x250", "728x90", "1920x1080")
  creativeName: string;            // Creative Name (e.g., "Summer-Hero-V1")
  landingPageType: string;         // Landing Page Type (e.g., "Brand Site", "Retailer", "Social")
  retailer?: string;               // Retailer (only if landingPageType = "Retailer")
  influencer?: string;             // Influencer (optional)
  creativeFreeText?: string;       // Optional free text

  // Metadata
  isDefaulted: { [fieldName: string]: boolean };  // Track which fields were auto-filled
  validationErrors: string[];                      // Validation error messages
}

// Generated taxonomy strings for all three levels
export interface GeneratedTaxonomies {
  campaign: string;      // Campaign Level taxonomy string
  lineItem: string;      // Line Item Level taxonomy string
  creative: string;      // Creative/Ad Level taxonomy string
}

// Complete taxonomy row (input + generated)
export interface TaxonomyRow extends TaxonomyInputData {
  rowIndex: number;           // Original row index from traffic sheet
  platform: string;           // Platform (e.g., "TradeDesk")
  originalTactic: string;     // Original tactic name from traffic sheet
  taxonomies: GeneratedTaxonomies;  // Generated taxonomy strings
}

// Master data structures
export interface MasterDataCampaign {
  campaignName: string;
  campaignCnCode: string;
  brandName: string;
  marketName: string;
}

export interface MasterDataBrand {
  brandName: string;
  marketName: string;
  countryCode: string;
}

export interface MasterDataAudienceType {
  audienceParty: string;
  audienceTypes: string[];  // Valid types for this party
}

// API response types
export interface ParseTrafficSheetResponse {
  tradeDeskRows: TaxonomyRow[];
  totalRows: number;
  tradeDeskCount: number;
  errors?: string[];
}

export interface ExportTaxonomiesRequest {
  rows: TaxonomyRow[];
  sourceFileName?: string;
}

// Configuration types
export interface PlatformConfig {
  name: string;
  displayName: string;
  fields: {
    campaign: FieldConfig[];
    lineItem: FieldConfig[];
    creative: FieldConfig[];
  };
}

export interface FieldConfig {
  name: string;
  label: string;
  type: 'dropdown' | 'text' | 'number';
  required: boolean;
  options?: string[];  // For dropdowns
  dependsOn?: string;  // Field dependency (e.g., "audienceParty")
  conditional?: {      // Conditional display
    field: string;
    value: string | string[];
  };
  defaultValue?: any;
  placeholder?: string;
}

// Smart defaults configuration
export interface SmartDefaultsConfig {
  campaign: { [fieldName: string]: any };
  lineItem: { [fieldName: string]: any };
  creative: { [fieldName: string]: any };
}
