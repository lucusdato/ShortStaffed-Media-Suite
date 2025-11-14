"use strict";
/**
 * Field Normalizer Utility
 * Consolidates all field name normalization logic into a single function
 * Replaces scattered normalization across parseBlockingChart, generateTrafficSheet, and trafficSheetWriter
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeFieldName = normalizeFieldName;
exports.normalizeFieldNameCamelCase = normalizeFieldNameCamelCase;
exports.createFieldNameMap = createFieldNameMap;
/**
 * Normalize a field name to lowercase alphanumeric (camelCase style)
 * Removes special characters, spaces, and converts to camelCase
 *
 * Examples:
 *   "Campaign Details - Placements" → "campaigndetailsplacements"
 *   "Start Date" → "startdate"
 *   "Gross Budget" → "grossbudget"
 *   "Est. Impressions" → "estimpressions"
 *
 * @param name - Field name to normalize
 * @returns Normalized field name
 */
function normalizeFieldName(name) {
    if (!name)
        return '';
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '') // Remove all non-alphanumeric characters
        .trim();
}
/**
 * Normalize field name but preserve camelCase structure
 * Used when you want to maintain readability in variable names
 *
 * Examples:
 *   "Campaign Details - Placements" → "campaignDetailsPlacements"
 *   "Start Date" → "startDate"
 *   "Gross Budget" → "grossBudget"
 *
 * @param name - Field name to normalize
 * @returns CamelCase normalized field name
 */
function normalizeFieldNameCamelCase(name) {
    if (!name)
        return '';
    const words = name
        .split(/[^a-zA-Z0-9]+/)
        .filter(word => word.length > 0);
    if (words.length === 0)
        return '';
    return words[0].toLowerCase() +
        words.slice(1)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
}
/**
 * Create a mapping of normalized field names to original names
 * Useful for reverse lookup and debugging
 *
 * @param fieldNames - Array of original field names
 * @returns Map of normalized → original names
 */
function createFieldNameMap(fieldNames) {
    const map = new Map();
    for (const name of fieldNames) {
        const normalized = normalizeFieldName(name);
        if (normalized) {
            map.set(normalized, name);
        }
    }
    return map;
}
