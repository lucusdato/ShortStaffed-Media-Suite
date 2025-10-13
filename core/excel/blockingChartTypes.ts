/**
 * TypeScript interfaces for Blocking Chart Builder data structures
 */

export interface Audience {
  id: string;
  demo: string;
  targeting: string;
  language: string;
  accuticsAdSetName: string;
  cpmCpp: number | null;
  impressionsGrps: number | null;
  // Calculated fields
  adServing: number | null;
  dvCost: number | null;
  mediaFeeTotal: number | null;
  workingMediaBudget: number | null;
}

export interface Tactic {
  id: string;
  // Shared fields across all audiences in this tactic
  channel: string;
  tactic: string;
  accuticsCampaignName: string;
  platform: string;
  objective: string;
  placements: string;
  optimizationKpi: string;
  startDate: string;
  endDate: string;
  mediaCost: number | null; // Gross Media Cost (merged across audiences)
  
  // Audience-specific data
  audiences: Audience[];
}

export interface BlockingChartData {
  tactics: Tactic[];
  metadata?: {
    campaignName?: string;
    client?: string;
    dateRange?: string;
    createdDate?: string;
  };
}

export interface TacticFormData {
  channel: string;
  tactic: string;
  accuticsCampaignName: string;
  platform: string;
  objective: string;
  placements: string;
  optimizationKpi: string;
  startDate: string;
  endDate: string;
  mediaCost: number | null;
  // First audience data
  demo: string;
  targeting: string;
  language: string;
  accuticsAdSetName: string;
  cpmCpp: number | null;
  impressionsGrps: number | null;
}

export interface AudienceFormData {
  demo: string;
  targeting: string;
  language: string;
  accuticsAdSetName: string;
  cpmCpp: number | null;
  impressionsGrps: number | null;
}

// Form validation types
export interface ValidationErrors {
  [key: string]: string | undefined;
}

export interface TacticValidationErrors {
  channel?: string;
  tactic?: string;
  platform?: string;
  objective?: string;
  startDate?: string;
  endDate?: string;
  mediaCost?: string;
  audiences?: {
    [audienceId: string]: {
      demo?: string;
      targeting?: string;
      cpmCpp?: string;
      impressionsGrps?: string;
    };
  };
}

// Excel export types
export interface ExcelRowData {
  channel: string;
  tactic: string;
  accuticsCampaignName: string;
  platform: string;
  objective: string;
  placements: string;
  optimizationKpi: string;
  demo: string;
  targeting: string;
  language: string;
  accuticsAdSetName: string;
  cpmCpp: number | null;
  impressionsGrps: number | null;
  startDate: string;
  endDate: string;
  mediaCost: number | null;
  adServing: number | null;
  dvCost: number | null;
  mediaFeeTotal: number | null;
  workingMediaBudget: number | null;
  _mergeSpan?: number; // For Excel merged cells
  _isMasterRow?: boolean; // For Excel merged cells
}

// Platform options for dropdowns
export const PLATFORM_OPTIONS = [
  'YouTube',
  'Meta',
  'TikTok',
  'Trade Desk',
  'TTD',
  'Amazon',
  'AMZ',
  'DV360',
  'Display & Video 360',
  'Amazon DSP',
  'Pinterest',
  'Snapchat',
  'Reddit',
];

export const CHANNEL_OPTIONS = [
  'Digital Video',
  'Digital Display',
  'Paid Social',
  'Programmatic Display',
  'Search',
  'CTV',
  'Audio',
  'OOH',
];

export const OBJECTIVE_OPTIONS = [
  'Awareness',
  'Consideration',
  'Conversion',
  'Retention',
  'Brand Safety',
  'Performance',
];

export const DEMO_OPTIONS = [
  '18-34',
  '25-54',
  '35-54',
  '18-49',
  '25-49',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55+',
];

export const LANGUAGE_OPTIONS = [
  'English',
  'French',
  'Bilingual',
  'English Primary',
  'French Primary',
];

// Utility functions
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function createEmptyAudience(): Audience {
  return {
    id: generateId(),
    demo: '',
    targeting: '',
    language: '',
    accuticsAdSetName: '',
    cpmCpp: null,
    impressionsGrps: null,
    adServing: null,
    dvCost: null,
    mediaFeeTotal: null,
    workingMediaBudget: null,
  };
}

export function createEmptyTactic(): Tactic {
  return {
    id: generateId(),
    channel: '',
    tactic: '',
    accuticsCampaignName: '',
    platform: '',
    objective: '',
    placements: '',
    optimizationKpi: '',
    startDate: '',
    endDate: '',
    mediaCost: null,
    audiences: [createEmptyAudience()],
  };
}

