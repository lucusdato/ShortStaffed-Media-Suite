/**
 * Field Mapper
 * Maps traffic sheet columns to taxonomy fields
 */

import { ParsedTrafficSheetRow, TaxonomyInputData } from './types';
import { TRAFFIC_SHEET_COLUMN_MAPPING } from './config';
import { findColumnValue } from './trafficSheetParser';

/**
 * Extract taxonomy fields from traffic sheet row
 * Returns partial TaxonomyInputData with only fields that could be extracted
 */
export function mapTrafficSheetToTaxonomy(row: ParsedTrafficSheetRow): Partial<TaxonomyInputData> {
  const extracted: Partial<TaxonomyInputData> = {};

  // Extract tactic name (used for inferring other fields)
  const tactic = findColumnValue(row, TRAFFIC_SHEET_COLUMN_MAPPING['tactic']);

  // ========================================
  // CAMPAIGN LEVEL FIELDS
  // ========================================

  // Try to extract market, brand, campaign from tactic name
  if (tactic) {
    const tacticParts = parseTacticName(String(tactic));
    if (tacticParts.marketName) extracted.marketName = tacticParts.marketName;
    if (tacticParts.brandName) extracted.brandName = tacticParts.brandName;
    if (tacticParts.campaignName) extracted.campaignName = tacticParts.campaignName;
  }

  // Format Type
  const formatType = findColumnValue(row, TRAFFIC_SHEET_COLUMN_MAPPING['formatType']);
  if (formatType) {
    extracted.formatType = String(formatType).trim();
  }

  // ========================================
  // LINE ITEM LEVEL FIELDS
  // ========================================

  // Placement Type
  const placementType = findColumnValue(row, TRAFFIC_SHEET_COLUMN_MAPPING['placementType']);
  if (placementType) {
    extracted.placementType = String(placementType).trim();
  }

  // Dates (for reference, not used in taxonomy but available)
  const startDate = findColumnValue(row, TRAFFIC_SHEET_COLUMN_MAPPING['startDate']);
  const endDate = findColumnValue(row, TRAFFIC_SHEET_COLUMN_MAPPING['endDate']);

  // ========================================
  // CREATIVE LEVEL FIELDS
  // ========================================

  // Creative Name
  const creativeName = findColumnValue(row, TRAFFIC_SHEET_COLUMN_MAPPING['creativeName']);
  if (creativeName) {
    extracted.creativeName = String(creativeName).trim();
  }

  // Budget/Metrics (for reference)
  const budget = findColumnValue(row, TRAFFIC_SHEET_COLUMN_MAPPING['budget']);
  const cpm = findColumnValue(row, TRAFFIC_SHEET_COLUMN_MAPPING['cpm']);
  const impressions = findColumnValue(row, TRAFFIC_SHEET_COLUMN_MAPPING['impressions']);

  console.log('📋 Field Mapper - Extracted fields:', {
    tactic,
    marketName: extracted.marketName,
    brandName: extracted.brandName,
    campaignName: extracted.campaignName,
    formatType: extracted.formatType,
    placementType: extracted.placementType,
    creativeName: extracted.creativeName
  });

  return extracted;
}

/**
 * Parse tactic name to extract Market, Brand, Campaign components
 *
 * Examples:
 *  - "Meta Prospecting - Dove Hair" → { brandName: "Dove", campaignName: "Hair-Prospecting" }
 *  - "TikTok Display - Summer Campaign" → { campaignName: "Summer-Display" }
 *
 * Note: This is best-effort parsing. Real implementation should use master data lookup.
 */
function parseTacticName(tactic: string): {
  marketName?: string;
  brandName?: string;
  campaignName?: string;
} {
  const result: { marketName?: string; brandName?: string; campaignName?: string } = {};

  // Clean up tactic name
  const cleaned = tactic.trim();

  // Check for common brand names (this should come from master data in production)
  const commonBrands = ['Dove', 'Axe', 'Rexona', 'Vaseline', 'Lifebuoy', 'Sunsilk', 'Clear', 'Pond\'s', 'Knorr', 'Hellmann\'s'];

  for (const brand of commonBrands) {
    if (cleaned.toLowerCase().includes(brand.toLowerCase())) {
      result.brandName = brand;
      break;
    }
  }

  // Extract campaign name (everything after brand or platform name)
  // This is simplified - real implementation should use master data
  const parts = cleaned.split(/[-–—]/);
  if (parts.length > 1) {
    // Take last part as campaign hint
    result.campaignName = parts[parts.length - 1].trim().replace(/\s+/g, '-');
  } else {
    // Use tactic name as campaign hint
    result.campaignName = cleaned.replace(/\s+/g, '-');
  }

  return result;
}

/**
 * Extract format size from format type or creative name
 */
export function inferFormatSize(formatType?: string, creativeName?: string): string {
  const commonSizes = [
    '300x250', '728x90', '160x600', '300x600', '320x50', '468x60',
    '1920x1080', '1280x720', '640x480',
    '9:16', '16:9', '1:1', '4:5'
  ];

  // Check formatType for size
  if (formatType) {
    for (const size of commonSizes) {
      if (formatType.includes(size)) {
        return size;
      }
    }
  }

  // Check creativeName for size
  if (creativeName) {
    for (const size of commonSizes) {
      if (creativeName.includes(size)) {
        return size;
      }
    }
  }

  // Check formatType for aspect ratio indicators
  if (formatType) {
    const ft = formatType.toLowerCase();
    if (ft.includes('square')) return '1:1';
    if (ft.includes('vertical') || ft.includes('story') || ft.includes('stories')) return '9:16';
    if (ft.includes('horizontal') || ft.includes('landscape')) return '16:9';
  }

  // Default based on format type
  if (formatType) {
    const ft = formatType.toLowerCase();
    if (ft.includes('video')) return '16:9';
    if (ft.includes('display')) return '300x250';
    if (ft.includes('banner')) return '728x90';
  }

  return '300x250'; // Default fallback
}
