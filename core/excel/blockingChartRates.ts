/**
 * Rate card definitions for automatic cost calculations in Blocking Chart Builder
 */

// DV Costs per thousand impressions (CPM) in CAD
export const DV_RATES: Record<string, number> = {
  'YouTube': 0.2026,
  'Meta': 0.1013,
  'TikTok': 0, // No associated fees
  'TTD': 0.0220,
  'Trade Desk': 0.0220,
  'AMZ': 0.0270,
  'DV360': 0.0270,
  'Amazon': 0.0270,
  'Amazon DSP': 0.0270,
  'Display & Video 360': 0.0270,
};

// Ad Serving Costs per thousand impressions (CPM) in CAD
export const AD_SERVING_RATES: Record<string, number> = {
  // Brand Say Digital platforms
  'YouTube': 0.02,
  'Amazon': 0.02,
  'Trade Desk': 0.02,
  'TTD': 0.02,
  'DV360': 0.02,
  'Display & Video 360': 0.02,
  'Amazon DSP': 0.02,
  'AMZ': 0.02,
  
  // Social platforms use same rates as DV for Ad Serving
  'Meta': 0.1013,
  'TikTok': 0, // No associated fees
};

// Platform categories for determining rate types
export const PLATFORM_CATEGORIES = {
  'Brand Say Digital': ['YouTube', 'Amazon', 'Trade Desk', 'TTD', 'DV360', 'Display & Video 360', 'Amazon DSP', 'AMZ'],
  'Brand Say Social': ['Meta', 'TikTok', 'Pinterest', 'Snapchat', 'Reddit'],
  'Other Say Social': ['Meta', 'TikTok', 'Pinterest', 'Snapchat', 'Reddit'], // Same platforms, different categorization
};

/**
 * Get DV rate for a platform
 */
export function getDVRate(platform: string): number {
  const normalizedPlatform = platform.trim();
  
  // Try exact match first
  if (DV_RATES[normalizedPlatform] !== undefined) {
    return DV_RATES[normalizedPlatform];
  }
  
  // Try case-insensitive match
  const lowerPlatform = normalizedPlatform.toLowerCase();
  for (const [key, rate] of Object.entries(DV_RATES)) {
    if (key.toLowerCase() === lowerPlatform) {
      return rate;
    }
  }
  
  // Try partial match for common variations
  if (lowerPlatform.includes('meta') || lowerPlatform.includes('facebook')) {
    return DV_RATES['Meta'];
  }
  if (lowerPlatform.includes('youtube')) {
    return DV_RATES['YouTube'];
  }
  if (lowerPlatform.includes('tiktok')) {
    return DV_RATES['TikTok'];
  }
  if (lowerPlatform.includes('trade desk') || lowerPlatform.includes('ttd')) {
    return DV_RATES['TTD'];
  }
  if (lowerPlatform.includes('amazon') || lowerPlatform.includes('amz')) {
    return DV_RATES['Amazon'];
  }
  if (lowerPlatform.includes('dv360') || lowerPlatform.includes('display & video')) {
    return DV_RATES['DV360'];
  }
  
  // Default to 0 if no match found
  console.warn(`No DV rate found for platform: ${platform}`);
  return 0;
}

/**
 * Get Ad Serving rate for a platform
 */
export function getAdServingRate(platform: string): number {
  const normalizedPlatform = platform.trim();
  
  // Try exact match first
  if (AD_SERVING_RATES[normalizedPlatform] !== undefined) {
    return AD_SERVING_RATES[normalizedPlatform];
  }
  
  // Try case-insensitive match
  const lowerPlatform = normalizedPlatform.toLowerCase();
  for (const [key, rate] of Object.entries(AD_SERVING_RATES)) {
    if (key.toLowerCase() === lowerPlatform) {
      return rate;
    }
  }
  
  // Try partial match for common variations
  if (lowerPlatform.includes('meta') || lowerPlatform.includes('facebook')) {
    return AD_SERVING_RATES['Meta'];
  }
  if (lowerPlatform.includes('youtube')) {
    return AD_SERVING_RATES['YouTube'];
  }
  if (lowerPlatform.includes('tiktok')) {
    return AD_SERVING_RATES['TikTok'];
  }
  if (lowerPlatform.includes('trade desk') || lowerPlatform.includes('ttd')) {
    return AD_SERVING_RATES['TTD'];
  }
  if (lowerPlatform.includes('amazon') || lowerPlatform.includes('amz')) {
    return AD_SERVING_RATES['Amazon'];
  }
  if (lowerPlatform.includes('dv360') || lowerPlatform.includes('display & video')) {
    return AD_SERVING_RATES['DV360'];
  }
  
  // Default to 0.02 for Brand Say Digital platforms
  const brandSayDigitalPlatforms = PLATFORM_CATEGORIES['Brand Say Digital'];
  const isBrandSayDigital = brandSayDigitalPlatforms.some(p => 
    lowerPlatform.includes(p.toLowerCase())
  );
  
  if (isBrandSayDigital) {
    return 0.02; // Default Brand Say Digital rate
  }
  
  // Default to 0 if no match found
  console.warn(`No Ad Serving rate found for platform: ${platform}`);
  return 0;
}

/**
 * Calculate DV Cost based on platform and impressions
 */
export function calculateDVCost(platform: string, impressions: number): number {
  const rate = getDVRate(platform);
  return (impressions / 1000) * rate;
}

/**
 * Calculate Ad Serving Cost based on platform and impressions
 */
export function calculateAdServingCost(platform: string, impressions: number): number {
  const rate = getAdServingRate(platform);
  return (impressions / 1000) * rate;
}

/**
 * Get platform category for categorization logic
 */
export function getPlatformCategory(platform: string): string {
  const lowerPlatform = platform.toLowerCase();
  
  if (PLATFORM_CATEGORIES['Brand Say Digital'].some(p => 
    lowerPlatform.includes(p.toLowerCase())
  )) {
    return 'Brand Say Digital';
  }
  
  if (PLATFORM_CATEGORIES['Brand Say Social'].some(p => 
    lowerPlatform.includes(p.toLowerCase())
  )) {
    return 'Brand Say Social';
  }
  
  return 'Brand Say Digital'; // Default fallback
}

