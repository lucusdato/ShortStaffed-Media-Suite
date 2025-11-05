"use strict";
/**
 * Demographic extraction utilities
 * Extracts demographic codes (W25-49, M18-44, A18-65) from Target field
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDemographic = extractDemographic;
exports.getGenderDescription = getGenderDescription;
exports.parseDemographic = parseDemographic;
const config_1 = require("./config");
/**
 * Extract demographic code from Target field
 *
 * Looks for patterns like:
 * - W25-49 (Women 25-49)
 * - M18-44 (Men 18-44)
 * - A18-65 (Adults 18-65)
 * - F21-35 (Females 21-35)
 *
 * Returns the first matching demographic code found, or 'A18+' if none found.
 *
 * @param target - The target field value from blocking chart
 * @returns Demographic code (e.g., "W25-49", "M18-44", or "A18+")
 *
 * @example
 * extractDemographic("Broad W25-49 + Costco interest") // Returns "W25-49"
 * extractDemographic("Healthy-ish Hustlers (M18-44)") // Returns "M18-44"
 * extractDemographic("Casual Quenchers (A18-65)") // Returns "A18-65"
 * extractDemographic("18-54\nBeauty & Personal Care") // Returns "A18+" (no gender code)
 * extractDemographic(undefined) // Returns "A18+"
 */
function extractDemographic(target) {
    if (!target) {
        return config_1.DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;
    }
    const targetStr = String(target);
    // Reset regex state (important for global regex)
    config_1.DEMOGRAPHIC_CONFIG.DEMO_PATTERN.lastIndex = 0;
    // Find all demographic patterns in the string
    const matches = targetStr.matchAll(config_1.DEMOGRAPHIC_CONFIG.DEMO_PATTERN);
    const matchArray = Array.from(matches);
    if (matchArray.length === 0) {
        return config_1.DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;
    }
    // Return first match in format: W25-49
    const firstMatch = matchArray[0];
    const genderCode = firstMatch[1]; // W, M, A, F
    const lowerAge = firstMatch[2]; // 25, 18, etc.
    const upperAge = firstMatch[3]; // 49, 44, etc.
    return `${genderCode}${lowerAge}-${upperAge}`;
}
/**
 * Get the full gender description from a gender code
 *
 * @param genderCode - Single character gender code (W, M, A, F)
 * @returns Full gender description
 *
 * @example
 * getGenderDescription('W') // Returns "Women"
 * getGenderDescription('M') // Returns "Men"
 * getGenderDescription('A') // Returns "Adults"
 */
function getGenderDescription(genderCode) {
    const upperCode = genderCode.toUpperCase();
    return config_1.DEMOGRAPHIC_CONFIG.GENDER_CODES[upperCode] || 'Adults';
}
/**
 * Parse a demographic code into its components
 *
 * @param demographic - Demographic code (e.g., "W25-49")
 * @returns Object with gender, lowerAge, upperAge
 *
 * @example
 * parseDemographic("W25-49") // Returns { gender: "W", genderDesc: "Women", lowerAge: 25, upperAge: 49 }
 * parseDemographic("A18+") // Returns { gender: "A", genderDesc: "Adults", lowerAge: 18, upperAge: undefined }
 */
function parseDemographic(demographic) {
    // Handle "A18+" format
    const plusMatch = demographic.match(/^([MWFA])(\d+)\+$/);
    if (plusMatch) {
        const gender = plusMatch[1];
        return {
            gender,
            genderDesc: getGenderDescription(gender),
            lowerAge: parseInt(plusMatch[2], 10),
            upperAge: undefined,
        };
    }
    // Handle "W25-49" format
    const rangeMatch = demographic.match(/^([MWFA])(\d+)-(\d+)$/);
    if (rangeMatch) {
        const gender = rangeMatch[1];
        return {
            gender,
            genderDesc: getGenderDescription(gender),
            lowerAge: parseInt(rangeMatch[2], 10),
            upperAge: parseInt(rangeMatch[3], 10),
        };
    }
    // Fallback
    return {
        gender: 'A',
        genderDesc: 'Adults',
        lowerAge: 18,
        upperAge: undefined,
    };
}
