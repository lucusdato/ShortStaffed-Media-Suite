import { CATEGORIZATION_CONFIG } from "./config";

/**
 * Categorization input - can be a full CampaignLine or minimal row data
 */
export interface CategorizationInput {
  channel?: string;
  platform?: string;
  mediaType?: string;
  placements?: string;
  adFormat?: string;
  isExcluded?: boolean;
  excludedReason?: string;
}

/**
 * Categorization result
 */
export interface CategorizationResult {
  tab: string;
  type: string;
  reason?: string;
}

/**
 * Unified categorization logic used by both frontend and backend
 * Determines which traffic sheet tab a campaign line belongs to
 */
export function categorizeLine(input: CategorizationInput): CategorizationResult {
  // Check for excluded campaigns FIRST (highest priority)
  if (input.isExcluded) {
    return {
      tab: 'Excluded',
      type: 'non-digital',
      reason: input.excludedReason
    };
  }

  const channel = (input.channel || '').toLowerCase();
  const platform = (input.platform || '').toLowerCase();
  const mediaType = (input.mediaType || '').toLowerCase();
  const placements = (input.placements || '').toLowerCase();
  const adFormat = (input.adFormat || '').toLowerCase();

  // Check for Brand Say Digital keywords (second priority)
  // This ensures audio, programmatic, digital video, digital display route correctly
  const isBrandSayDigital = CATEGORIZATION_CONFIG.BRAND_SAY_DIGITAL_KEYWORDS.some(
    keyword => channel.includes(keyword) || mediaType.includes(keyword)
  );

  if (isBrandSayDigital) {
    return { tab: 'Brand Say Digital', type: 'media' };
  }

  // Check for influencer keyword (third priority)
  // Check in placements, adFormat, channel, and platform
  const isInfluencer = CATEGORIZATION_CONFIG.INFLUENCER_KEYWORDS.some(
    keyword =>
      placements.includes(keyword.toLowerCase()) ||
      adFormat.includes(keyword.toLowerCase()) ||
      channel.includes(keyword.toLowerCase()) ||
      platform.includes(keyword.toLowerCase())
  );

  // Check if it's a social platform (fourth priority)
  const isSocialPlatform = CATEGORIZATION_CONFIG.SOCIAL_PLATFORMS.some(socialPlatform =>
    platform.includes(socialPlatform.toLowerCase()) || channel.includes(socialPlatform.toLowerCase())
  );

  // Special case: Pinterest only
  // Pinterest is the ONLY social platform where influencer content goes to Brand Say Social
  const isPinterest = platform.includes('pinterest') || platform.includes('pin') ||
                      channel.includes('pinterest') || channel.includes('pin');

  // Decision matrix for social platforms with influencer:
  // - Pinterest + Influencer → Brand Say Social (brand-created influencer content)
  // - Meta/TikTok/Other Social + Influencer → Other Say Social (actual influencers)
  // - Any Social Platform + NO Influencer → Brand Say Social (regular paid social)
  if (isSocialPlatform) {
    if (isInfluencer && !isPinterest) {
      // Meta, TikTok, etc. with influencer → Other Say Social
      return { tab: 'Other Say Social', type: 'media' };
    } else {
      // Pinterest (with or without influencer) OR any social without influencer → Brand Say Social
      return { tab: 'Brand Say Social', type: 'media' };
    }
  }

  // If it's influencer content on a NON-social platform, route to Other Say Social
  if (isInfluencer) {
    return { tab: 'Other Say Social', type: 'media' };
  }

  // Default to Brand Say Digital for non-social, non-influencer (programmatic, display, video, audio, etc.)
  return { tab: 'Brand Say Digital', type: 'media' };
}
