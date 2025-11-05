/**
 * Brand Directory
 *
 * Centralized list of brand names for automatic detection from filenames.
 * This makes it easy to identify which brand a file belongs to without manual input.
 *
 * To add new brands:
 * 1. Add the brand name to the BRANDS array
 * 2. Save the file - changes take effect immediately
 *
 * Brand detection is case-insensitive and works by searching filenames
 * for any of these brand names.
 */

export const BRANDS = [
  // ============================================================================
  // UNILEVER BRANDS
  // ============================================================================

  // Food & Wellbeing
  "Knorr",
  "Hellmann's",
  "UFS",
  "Ben & Jerry's",
  "Breyers",
  "Magnum",
  "Liquid IV",
  "OLLY",

  // Personal Care
  "Dove Deo",
  "Axe Deo",
  "DMC Deo",
  "Degree",
  "Vaseline",
  "TRESemmé",
  "OLLY Skin Cleansing",

  // Beauty
  "TRESemmé",
  "Dove Hair",
  "Shea Hair",
  "Nexxus",
  "DMC Hair",

  // Add more brands below as needed
  // Example:
  // "Brand Name",
];

/**
 * Extract brand name from a filename
 *
 * Searches the filename for any known brand names (case-insensitive).
 * Returns the first match found, or null if no brand is detected.
 *
 * @param filename - The filename to search (e.g., "Knorr_Campaign_2024.xlsx")
 * @returns The detected brand name (original casing from BRANDS array), or null
 *
 * @example
 * extractBrandFromFilename("Knorr_Campaign_2024.xlsx") // "Knorr"
 * extractBrandFromFilename("dove-blocking-chart.xlsx") // "Dove"
 * extractBrandFromFilename("random_file.xlsx") // null
 */
export function extractBrandFromFilename(filename: string): string | null {
  const filenameLower = filename.toLowerCase();

  // Search for each brand name in the filename
  for (const brand of BRANDS) {
    const brandLower = brand.toLowerCase();

    // Check if the brand name appears in the filename
    if (filenameLower.includes(brandLower)) {
      return brand; // Return the brand with original casing
    }
  }

  return null; // No brand detected
}

/**
 * Check if a filename contains a specific brand
 *
 * @param filename - The filename to check
 * @param brandName - The brand name to look for
 * @returns true if the brand is found in the filename (case-insensitive)
 *
 * @example
 * containsBrand("Knorr_Campaign.xlsx", "Knorr") // true
 * containsBrand("knorr_campaign.xlsx", "Knorr") // true
 * containsBrand("dove_file.xlsx", "Knorr") // false
 */
export function containsBrand(filename: string, brandName: string): boolean {
  return filename.toLowerCase().includes(brandName.toLowerCase());
}

/**
 * Get all brands sorted alphabetically
 *
 * @returns Array of all brand names sorted A-Z
 */
export function getAllBrands(): string[] {
  return [...BRANDS].sort();
}

/**
 * Search for brands matching a query
 *
 * @param query - Search term (case-insensitive)
 * @returns Array of brands matching the query
 *
 * @example
 * searchBrands("dove") // ["Dove"]
 * searchBrands("sun") // ["Sunsilk", "Sunlight"]
 */
export function searchBrands(query: string): string[] {
  const queryLower = query.toLowerCase();
  return BRANDS.filter(brand =>
    brand.toLowerCase().includes(queryLower)
  );
}
