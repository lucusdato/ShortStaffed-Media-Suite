// @ts-nocheck
/**
 * Configuration for Accutics Taxonomy Generator
 * Centralizes all platform-specific field definitions, dropdown options, and smart defaults
 */

import { SmartDefaultsConfig } from './types';

// ============================================================================
// TRADEDESK CONFIGURATION
// ============================================================================

// Campaign Level Fields
export const TRADEDESK_CAMPAIGN_FIELDS: any[] = [
  {
    name: 'marketName',
    label: 'Market Name (PCat)',
    type: 'dropdown',
    required: true,
    options: [], // Will be populated from master data
    placeholder: 'Select market'
  },
  {
    name: 'brandName',
    label: 'Brand Name',
    type: 'dropdown',
    required: true,
    options: [], // Will be populated from master data based on marketName
    dependsOn: 'marketName',
    placeholder: 'Select brand'
  },
  {
    name: 'campaignName',
    label: 'Campaign Name',
    type: 'dropdown',
    required: true,
    options: [], // Will be populated from master data based on brandName
    dependsOn: 'brandName',
    placeholder: 'Select campaign'
  },
  {
    name: 'campaignCnCode',
    label: 'Campaign CN Code',
    type: 'text',
    required: true,
    placeholder: 'Auto-fills from campaign'
  },
  {
    name: 'campaignType',
    label: 'Campaign Type',
    type: 'dropdown',
    required: true,
    options: ['Always-On', 'Seasonal', 'Tactical', 'Test'],
    defaultValue: 'Always-On'
  },
  {
    name: 'formatType',
    label: 'Format Type',
    type: 'dropdown',
    required: true,
    options: ['Display', 'Video', 'Audio', 'Native', 'Rich Media'],
    placeholder: 'Select format'
  },
  {
    name: 'objective',
    label: 'Objective',
    type: 'dropdown',
    required: true,
    options: ['Awareness', 'Consideration', 'Conversion', 'Traffic', 'Engagement'],
    defaultValue: 'Awareness'
  },
  {
    name: 'campaignFreeText',
    label: 'Free Text (Optional)',
    type: 'text',
    required: false,
    placeholder: 'Additional context'
  }
];

// Line Item (Ad Group) Level Fields
export const TRADEDESK_LINE_ITEM_FIELDS: any[] = [
  {
    name: 'buyModel',
    label: 'Buy Model',
    type: 'dropdown',
    required: true,
    options: ['Programmatic', 'Direct', 'PMP'],
    defaultValue: 'Programmatic'
  },
  {
    name: 'targetingStrategy',
    label: 'Targeting Strategy',
    type: 'dropdown',
    required: true,
    options: ['Behavioral', 'Contextual', 'Interest', 'Keyword', 'Demographic', 'Geo', 'Retargeting'],
    defaultValue: 'Behavioral'
  },
  {
    name: 'placementType',
    label: 'Placement Type',
    type: 'dropdown',
    required: true,
    options: ['In-Feed', 'Banner', 'Video', 'Native', 'Interstitial', 'Pre-Roll', 'Mid-Roll', 'Overlay'],
    placeholder: 'Select placement'
  },
  {
    name: 'audienceParty',
    label: 'Audience Party',
    type: 'dropdown',
    required: true,
    options: ['1PD', '2PD', '3PD', 'Prospecting'],
    defaultValue: '3PD'
  },
  {
    name: 'audienceType',
    label: 'Audience Type',
    type: 'dropdown',
    required: true,
    options: ['CRM', 'Lookalike', 'Interest', 'Behavioral', 'Contextual', 'Demographic'],
    dependsOn: 'audienceParty',
    placeholder: 'Select type'
  },
  {
    name: 'audienceName',
    label: 'Audience Name',
    type: 'text',
    required: true,
    placeholder: 'e.g., Meta-Prospecting'
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'dropdown',
    required: true,
    options: ['All', 'Male', 'Female', 'Unspecified'],
    defaultValue: 'All'
  },
  {
    name: 'ageLower',
    label: 'Age Lower Bound',
    type: 'number',
    required: true,
    defaultValue: 18
  },
  {
    name: 'ageUpper',
    label: 'Age Upper Bound',
    type: 'number',
    required: true,
    defaultValue: 65
  },
  {
    name: 'deviceType',
    label: 'Device Type',
    type: 'dropdown',
    required: true,
    options: ['All', 'Mobile', 'Desktop', 'Tablet', 'CTV', 'iOS', 'Android'],
    defaultValue: 'All'
  },
  {
    name: 'trustedPublisher',
    label: 'Trusted Publisher',
    type: 'dropdown',
    required: false,
    options: [], // Will be populated from master data
    placeholder: 'Select publisher (optional)'
  },
  {
    name: 'lineItemFreeText',
    label: 'Free Text (Optional)',
    type: 'text',
    required: false,
    placeholder: 'Additional context'
  }
];

// Creative/Ad Level Fields
export const TRADEDESK_CREATIVE_FIELDS: any[] = [
  {
    name: 'placementType',
    label: 'Placement Type',
    type: 'dropdown',
    required: true,
    options: ['In-Feed', 'Banner', 'Video', 'Native', 'Interstitial', 'Pre-Roll', 'Mid-Roll', 'Overlay'],
    placeholder: 'Select placement'
  },
  {
    name: 'formatType',
    label: 'Format Type',
    type: 'dropdown',
    required: true,
    options: ['Display', 'Video', 'Audio', 'Native', 'Rich Media'],
    placeholder: 'Select format'
  },
  {
    name: 'formatSize',
    label: 'Format Size',
    type: 'dropdown',
    required: true,
    options: [
      '300x250', '728x90', '160x600', '300x600', '320x50', '468x60',
      '1920x1080', '1280x720', '640x480',
      '9:16', '16:9', '1:1', '4:5'
    ],
    defaultValue: '300x250'
  },
  {
    name: 'creativeName',
    label: 'Creative Name',
    type: 'text',
    required: true,
    placeholder: 'e.g., Summer-Hero-V1'
  },
  {
    name: 'landingPageType',
    label: 'Landing Page Type',
    type: 'dropdown',
    required: true,
    options: ['Brand Site', 'Retailer', 'Social', 'Other'],
    defaultValue: 'Brand Site'
  },
  {
    name: 'retailer',
    label: 'Retailer',
    type: 'dropdown',
    required: false,
    options: [], // Will be populated from master data
    conditional: {
      field: 'landingPageType',
      value: 'Retailer'
    },
    placeholder: 'Select retailer'
  },
  {
    name: 'influencer',
    label: 'Influencer',
    type: 'text',
    required: false,
    placeholder: 'Influencer name (optional)'
  },
  {
    name: 'creativeFreeText',
    label: 'Free Text (Optional)',
    type: 'text',
    required: false,
    placeholder: 'Additional context'
  }
];

// ============================================================================
// SMART DEFAULTS
// ============================================================================

export const TRADEDESK_SMART_DEFAULTS: SmartDefaultsConfig = {
  campaign: {
    campaignType: 'Always-On',
    objective: 'Awareness',
    formatType: 'Display' // Default, will be overridden by traffic sheet if available
  },
  lineItem: {
    buyModel: 'Programmatic',
    targetingStrategy: 'Behavioral',
    audienceParty: '3PD',
    audienceType: 'Behavioral',
    gender: 'All',
    ageLower: 18,
    ageUpper: 65,
    deviceType: 'All'
  },
  creative: {
    formatSize: '300x250',
    landingPageType: 'Brand Site'
  }
};

// ============================================================================
// AUDIENCE PARTY TO TYPE MAPPING
// ============================================================================

export const AUDIENCE_TYPE_OPTIONS: { [party: string]: string[] } = {
  '1PD': ['CRM'],
  '2PD': ['CRM', 'Lookalike', 'Interest'],
  '3PD': ['Behavioral', 'Contextual', 'Demographic', 'Interest'],
  'Prospecting': ['Lookalike', 'Interest', 'Behavioral', 'Contextual']
};

// ============================================================================
// FIELD EXTRACTION MAPPING
// ============================================================================

// Map traffic sheet column names to taxonomy field names
export const TRAFFIC_SHEET_COLUMN_MAPPING: { [taxonomyField: string]: string[] } = {
  // Campaign Level
  'tactic': ['tactic', 'Tactic', 'Tactic Name'],
  'formatType': ['format type', 'Format Type', 'Format', 'Ad Format'],
  'placementType': ['placement type', 'Placement Type', 'Placement'],

  // Dates
  'startDate': ['start date', 'Start Date', 'Flight Start', 'Flight Start Date'],
  'endDate': ['end date', 'End Date', 'Flight End', 'Flight End Date'],

  // Budget/Metrics
  'budget': ['budget', 'Budget', 'Gross Media Cost', 'Working Media Budget'],
  'cpm': ['cpm', 'CPM'],
  'impressions': ['impressions', 'Impressions', 'GRPs'],

  // Creative
  'creativeName': ['creative name', 'Creative Name', 'Creative', 'Ad Name']
};

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION_RULES = {
  // Required fields that cannot be empty
  requiredFields: {
    campaign: ['marketName', 'brandName', 'campaignName', 'campaignCnCode', 'campaignType', 'formatType', 'objective'],
    lineItem: ['buyModel', 'targetingStrategy', 'placementType', 'audienceParty', 'audienceType', 'audienceName', 'gender', 'ageLower', 'ageUpper', 'deviceType'],
    creative: ['placementType', 'formatType', 'formatSize', 'creativeName', 'landingPageType']
  },

  // Age validation
  minAge: 13,
  maxAge: 100,

  // Retailer is required when landingPageType = 'Retailer'
  conditionalRequired: {
    retailer: {
      field: 'landingPageType',
      value: 'Retailer'
    }
  }
};

// ============================================================================
// TAXONOMY GENERATION TEMPLATES
// ============================================================================

// Field order for taxonomy string generation (determines underscore-separated order)
export const TAXONOMY_TEMPLATES = {
  campaign: [
    'marketName',        // Market-Short-Name-(PCat)
    'brandName',         // Brand-Name
    'campaignName',      // Campaign-Name
    'campaignCnCode',    // Campaign-CN-Code
    'campaignType',      // Campaign-Type
    'formatType',        // Format-Type
    'objective',         // Objective
    'campaignFreeText'   // [Free text] (optional)
  ],
  lineItem: [
    'buyModel',           // Buy-Model
    'targetingStrategy',  // Targeting-Strategy
    'placementType',      // Placement-Type
    'audienceParty',      // Audience-Party
    'audienceType',       // Audience-Type
    'audienceName',       // Audience-Name
    'gender',             // Gender
    'ageRange',           // Age-(lower-upper) - special handling
    'deviceType',         // Device-Type
    'trustedPublisher',   // Trusted-Publisher (optional)
    'lineItemFreeText'    // [Free text] (optional)
  ],
  creative: [
    'campaignName',       // Campaign-Name (from campaign level)
    'campaignCnCode',     // Campaign-CN-Code (from campaign level)
    'placementType',      // Placement-Type
    'formatType',         // Format-Type
    'formatSize',         // Format-Size
    'creativeName',       // Creative-Name
    'landingPageType',    // Landing-Page-Type
    'retailer',           // Retailer (conditional)
    'trustedPublisher',   // Trusted-Publisher (optional)
    'influencer',         // Influencer (optional)
    'creativeFreeText'    // [Free text] (optional)
  ]
};
