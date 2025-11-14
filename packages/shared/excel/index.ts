/**
 * Shared Excel Processing Module
 * Main entry point for blocking chart parsing and traffic sheet generation
 * Used by both desktop (Electron) and web implementations
 */

// Core classes
export { BlockingChartParser } from './parser/BlockingChartParser';
export { TrafficSheetGenerator } from './generator/TrafficSheetGenerator';

// Type definitions
export type {
  ParsedBlockingChart,
  CampaignLine,
  AdGroup,
  CreativeLine,
  ValidationWarning,
  CampaignLineRange,
  MergeInfo,
  CategorizedCampaignLines,
  TrafficSheetTab,
  TrafficSheetRow,
  ExcelStyleInfo,
} from './types';

// Utilities
export {
  normalizeFieldName,
  normalizeFieldNameCamelCase,
  createFieldNameMap,
} from './utils/FieldNormalizer';

export {
  getTrafficSheetTab,
  getPlatformCategory,
  getDefaultPlacements,
  isExcludedChannel,
  getExclusionReason,
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
} from './config';
