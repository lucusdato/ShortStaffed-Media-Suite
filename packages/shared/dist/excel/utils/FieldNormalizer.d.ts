/**
 * Field Normalizer Utility
 * Consolidates all field name normalization logic into a single function
 * Replaces scattered normalization across parseBlockingChart, generateTrafficSheet, and trafficSheetWriter
 */
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
export declare function normalizeFieldName(name: string): string;
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
export declare function normalizeFieldNameCamelCase(name: string): string;
/**
 * Create a mapping of normalized field names to original names
 * Useful for reverse lookup and debugging
 *
 * @param fieldNames - Array of original field names
 * @returns Map of normalized → original names
 */
export declare function createFieldNameMap(fieldNames: string[]): Map<string, string>;
//# sourceMappingURL=FieldNormalizer.d.ts.map