/**
 * Shared Excel Processing Module
 * Main entry point for blocking chart parsing and traffic sheet generation
 * Used by both desktop (Electron) and web implementations
 *
 * This is the SINGLE SOURCE OF TRUTH for all Excel processing logic.
 * Both desktop and web applications import from this shared package.
 */

// Main processing functions and classes
export { TrafficSheetGenerator } from './trafficSheetWriter';
export { BlockingChartParser } from './parser/BlockingChartParser';

// Template detection and management
export {
  detectBlockingChartTemplate,
  type BlockingChartTemplate,
} from './blockingChartTemplates';

// Categorization logic
export {
  categorizeLine,
  type CategorizationInput,
  type CategorizationResult,
  type TabInfo,
} from './categorization';

// Demographic extraction
export { extractDemographic } from './demographicExtraction';

// Utilities
export {
  normalizeFieldName,
  normalizeFieldNameCamelCase,
  createFieldNameMap,
} from './utils/FieldNormalizer';

export {
  getTrafficSheetTab as getPlatformTab,
  getPlatformCategory,
  getDefaultPlacements,
  isExcludedChannel as isPlatformExcluded,
  getExclusionReason as getPlatformExclusionReason,
  isSocialPlatform,
  isProgrammaticPlatform,
} from './utils/PlatformClassifier';

export {
  BLOCKING_CHART_COLUMNS,
  CAMPAIGN_LINE_INDICATORS,
  BLOCKING_CHART_FIELD_MAPPINGS,
  TRAFFIC_SHEET_FIELD_MAPPINGS,
  getInternalFieldName,
  getTrafficSheetColumnName,
  buildColumnIndexMap,
  mapBlockingChartRowToInternal,
} from './utils/FieldMapper';

// Configuration constants
export {
  ROW_EXPANSION_CONFIG,
  DEMOGRAPHIC_CONFIG,
  TRAFFIC_SHEET_CONFIG,
  PARSING_CONFIG,
  CAMPAIGN_LINE_DETECTION_CONFIG,
  AD_GROUP_DETECTION_CONFIG,
  CATEGORIZATION_CONFIG,
  STYLE_CONFIG,
  VALIDATION_CONFIG,
  DATE_CONFIG,
  TEMPLATE_CONFIG,
  UNIFIED_TEMPLATE_CONFIG,
} from './config';

// Type definitions
export type {
  ParsedBlockingChart,
  CampaignLine,
  AdGroup,
  CreativeLine,
  ValidationWarning,
  ValidationError,
  CampaignLineRange,
  MergeInfo,
  CategorizedCampaignLines,
  TrafficSheetTab,
  TrafficSheetRow,
  ExcelStyleInfo,
} from './types';
