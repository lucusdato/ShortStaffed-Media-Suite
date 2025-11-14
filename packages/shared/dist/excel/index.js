"use strict";
/**
 * Shared Excel Processing Module
 * Main entry point for blocking chart parsing and traffic sheet generation
 * Used by both desktop (Electron) and web implementations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_CONFIG = exports.DATE_CONFIG = exports.VALIDATION_CONFIG = exports.STYLE_CONFIG = exports.CATEGORIZATION_CONFIG = exports.AD_GROUP_DETECTION_CONFIG = exports.CAMPAIGN_LINE_DETECTION_CONFIG = exports.PARSING_CONFIG = exports.TRAFFIC_SHEET_CONFIG = exports.DEMOGRAPHIC_CONFIG = exports.ROW_EXPANSION_CONFIG = exports.mapBlockingChartRowToInternal = exports.buildColumnIndexMap = exports.getTrafficSheetColumnName = exports.getInternalFieldName = exports.TRAFFIC_SHEET_FIELD_MAPPINGS = exports.BLOCKING_CHART_FIELD_MAPPINGS = exports.CAMPAIGN_LINE_INDICATORS = exports.BLOCKING_CHART_COLUMNS = exports.isProgrammaticPlatform = exports.isSocialPlatform = exports.getExclusionReason = exports.isExcludedChannel = exports.getDefaultPlacements = exports.getPlatformCategory = exports.getTrafficSheetTab = exports.createFieldNameMap = exports.normalizeFieldNameCamelCase = exports.normalizeFieldName = exports.TrafficSheetGenerator = exports.BlockingChartParser = void 0;
// Core classes
var BlockingChartParser_1 = require("./parser/BlockingChartParser");
Object.defineProperty(exports, "BlockingChartParser", { enumerable: true, get: function () { return BlockingChartParser_1.BlockingChartParser; } });
var TrafficSheetGenerator_1 = require("./generator/TrafficSheetGenerator");
Object.defineProperty(exports, "TrafficSheetGenerator", { enumerable: true, get: function () { return TrafficSheetGenerator_1.TrafficSheetGenerator; } });
// Utilities
var FieldNormalizer_1 = require("./utils/FieldNormalizer");
Object.defineProperty(exports, "normalizeFieldName", { enumerable: true, get: function () { return FieldNormalizer_1.normalizeFieldName; } });
Object.defineProperty(exports, "normalizeFieldNameCamelCase", { enumerable: true, get: function () { return FieldNormalizer_1.normalizeFieldNameCamelCase; } });
Object.defineProperty(exports, "createFieldNameMap", { enumerable: true, get: function () { return FieldNormalizer_1.createFieldNameMap; } });
var PlatformClassifier_1 = require("./utils/PlatformClassifier");
Object.defineProperty(exports, "getTrafficSheetTab", { enumerable: true, get: function () { return PlatformClassifier_1.getTrafficSheetTab; } });
Object.defineProperty(exports, "getPlatformCategory", { enumerable: true, get: function () { return PlatformClassifier_1.getPlatformCategory; } });
Object.defineProperty(exports, "getDefaultPlacements", { enumerable: true, get: function () { return PlatformClassifier_1.getDefaultPlacements; } });
Object.defineProperty(exports, "isExcludedChannel", { enumerable: true, get: function () { return PlatformClassifier_1.isExcludedChannel; } });
Object.defineProperty(exports, "getExclusionReason", { enumerable: true, get: function () { return PlatformClassifier_1.getExclusionReason; } });
Object.defineProperty(exports, "isSocialPlatform", { enumerable: true, get: function () { return PlatformClassifier_1.isSocialPlatform; } });
Object.defineProperty(exports, "isProgrammaticPlatform", { enumerable: true, get: function () { return PlatformClassifier_1.isProgrammaticPlatform; } });
var FieldMapper_1 = require("./utils/FieldMapper");
Object.defineProperty(exports, "BLOCKING_CHART_COLUMNS", { enumerable: true, get: function () { return FieldMapper_1.BLOCKING_CHART_COLUMNS; } });
Object.defineProperty(exports, "CAMPAIGN_LINE_INDICATORS", { enumerable: true, get: function () { return FieldMapper_1.CAMPAIGN_LINE_INDICATORS; } });
Object.defineProperty(exports, "BLOCKING_CHART_FIELD_MAPPINGS", { enumerable: true, get: function () { return FieldMapper_1.BLOCKING_CHART_FIELD_MAPPINGS; } });
Object.defineProperty(exports, "TRAFFIC_SHEET_FIELD_MAPPINGS", { enumerable: true, get: function () { return FieldMapper_1.TRAFFIC_SHEET_FIELD_MAPPINGS; } });
Object.defineProperty(exports, "getInternalFieldName", { enumerable: true, get: function () { return FieldMapper_1.getInternalFieldName; } });
Object.defineProperty(exports, "getTrafficSheetColumnName", { enumerable: true, get: function () { return FieldMapper_1.getTrafficSheetColumnName; } });
Object.defineProperty(exports, "buildColumnIndexMap", { enumerable: true, get: function () { return FieldMapper_1.buildColumnIndexMap; } });
Object.defineProperty(exports, "mapBlockingChartRowToInternal", { enumerable: true, get: function () { return FieldMapper_1.mapBlockingChartRowToInternal; } });
// Configuration constants
var config_1 = require("./config");
Object.defineProperty(exports, "ROW_EXPANSION_CONFIG", { enumerable: true, get: function () { return config_1.ROW_EXPANSION_CONFIG; } });
Object.defineProperty(exports, "DEMOGRAPHIC_CONFIG", { enumerable: true, get: function () { return config_1.DEMOGRAPHIC_CONFIG; } });
Object.defineProperty(exports, "TRAFFIC_SHEET_CONFIG", { enumerable: true, get: function () { return config_1.TRAFFIC_SHEET_CONFIG; } });
Object.defineProperty(exports, "PARSING_CONFIG", { enumerable: true, get: function () { return config_1.PARSING_CONFIG; } });
Object.defineProperty(exports, "CAMPAIGN_LINE_DETECTION_CONFIG", { enumerable: true, get: function () { return config_1.CAMPAIGN_LINE_DETECTION_CONFIG; } });
Object.defineProperty(exports, "AD_GROUP_DETECTION_CONFIG", { enumerable: true, get: function () { return config_1.AD_GROUP_DETECTION_CONFIG; } });
Object.defineProperty(exports, "CATEGORIZATION_CONFIG", { enumerable: true, get: function () { return config_1.CATEGORIZATION_CONFIG; } });
Object.defineProperty(exports, "STYLE_CONFIG", { enumerable: true, get: function () { return config_1.STYLE_CONFIG; } });
Object.defineProperty(exports, "VALIDATION_CONFIG", { enumerable: true, get: function () { return config_1.VALIDATION_CONFIG; } });
Object.defineProperty(exports, "DATE_CONFIG", { enumerable: true, get: function () { return config_1.DATE_CONFIG; } });
Object.defineProperty(exports, "TEMPLATE_CONFIG", { enumerable: true, get: function () { return config_1.TEMPLATE_CONFIG; } });
