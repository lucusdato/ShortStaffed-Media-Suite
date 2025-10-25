/**
 * Smart Defaults Engine
 * Applies intelligent defaults based on platform and context
 */

import { TaxonomyInputData, UserMetadata } from './types';
import { getPlatformConfig, normalizePlatformName } from './platforms';

/**
 * Apply smart defaults to input data based on platform
 */
export function applySmartDefaults(
  platform: string,
  userMetadata: UserMetadata,
  partialData?: Partial<TaxonomyInputData>
): TaxonomyInputData {
  const normalizedPlatform = normalizePlatformName(platform) || platform;
  const platformConfig = getPlatformConfig(normalizedPlatform);

  if (!platformConfig) {
    throw new Error(`Unknown platform: ${platform}`);
  }

  // Start with platform defaults
  const defaults = { ...platformConfig.fieldDefaults };

  // Merge user metadata
  const inputData: TaxonomyInputData = {
    // User-provided metadata
    cnCode: userMetadata.cnCode,
    marketName: userMetadata.marketName,
    countryCode: userMetadata.countryCode,
    brandName: userMetadata.brandName,
    campaignName: userMetadata.campaignName,

    // Platform
    platform: normalizedPlatform,
    originalTactic: partialData?.originalTactic || '',

    // Apply defaults
    campaignType: partialData?.campaignType || defaults.campaignType || '',
    formatType: partialData?.formatType || defaults.formatType || '',
    objective: partialData?.objective || defaults.objective || '',
    buyModel: partialData?.buyModel || defaults.buyModel || '',
    targetingStrategy: partialData?.targetingStrategy || defaults.targetingStrategy || '',
    placementType: partialData?.placementType || defaults.placementType || '',
    audienceParty: partialData?.audienceParty || defaults.audienceParty || '',
    audienceType: partialData?.audienceType || defaults.audienceType || '',
    audienceName: partialData?.audienceName || defaults.audienceName || '',
    gender: partialData?.gender || defaults.gender || '',
    ageLower: partialData?.ageLower ?? defaults.ageLower ?? 18,
    ageUpper: partialData?.ageUpper ?? defaults.ageUpper ?? 65,
    deviceType: partialData?.deviceType || defaults.deviceType || '',
    trustedPublisher: partialData?.trustedPublisher || defaults.trustedPublisher,
    formatSize: partialData?.formatSize || defaults.formatSize || '',
    creativeName: partialData?.creativeName || defaults.creativeName || '',
    landingPageType: partialData?.landingPageType || defaults.landingPageType || '',
    retailer: partialData?.retailer || defaults.retailer,
    influencer: partialData?.influencer || defaults.influencer,
    influencerHandle: partialData?.influencerHandle || defaults.influencerHandle,
    influencerPostType: partialData?.influencerPostType || defaults.influencerPostType,
    collaborativeAccountType: partialData?.collaborativeAccountType || defaults.collaborativeAccountType,
    collaborativeAd: partialData?.collaborativeAd || defaults.collaborativeAd,
    productFormat: partialData?.productFormat || defaults.productFormat,
    creativeExchange: partialData?.creativeExchange || defaults.creativeExchange,
    addOn: partialData?.addOn || defaults.addOn,
    freeText: partialData?.freeText || defaults.freeText,

    // Track defaulted fields
    isDefaulted: buildDefaultedTracker(partialData, defaults),
    validationErrors: []
  };

  return inputData;
}

/**
 * Build tracker for which fields were defaulted vs user-provided
 */
function buildDefaultedTracker(
  partialData: Partial<TaxonomyInputData> | undefined,
  defaults: Partial<TaxonomyInputData>
): { [fieldName: string]: boolean } {
  const tracker: { [fieldName: string]: boolean } = {};

  const fieldNames: (keyof TaxonomyInputData)[] = [
    'campaignType', 'formatType', 'objective', 'buyModel', 'targetingStrategy',
    'placementType', 'audienceParty', 'audienceType', 'audienceName', 'gender',
    'ageLower', 'ageUpper', 'deviceType', 'formatSize', 'creativeName',
    'landingPageType', 'trustedPublisher', 'retailer', 'influencer',
    'influencerHandle', 'influencerPostType', 'collaborativeAccountType',
    'collaborativeAd', 'productFormat', 'creativeExchange', 'addOn', 'freeText'
  ];

  for (const fieldName of fieldNames) {
    // Field was defaulted if it wasn't in partialData but is in defaults
    const wasProvided = partialData && partialData[fieldName] !== undefined;
    const wasDefaulted = !wasProvided && defaults[fieldName] !== undefined;
    tracker[fieldName] = wasDefaulted;
  }

  return tracker;
}

/**
 * Context-aware smart defaults based on blocking chart/traffic sheet data
 */
export function applyContextualDefaults(
  inputData: TaxonomyInputData,
  context: {
    channel?: string;
    tactic?: string;
    adFormat?: string;
    placementType?: string;
  }
): TaxonomyInputData {
  const enhanced = { ...inputData };

  // Detect format type from ad format or placement
  if (!enhanced.formatType || enhanced.isDefaulted.formatType) {
    if (context.adFormat) {
      enhanced.formatType = mapAdFormatToFormatType(context.adFormat);
      enhanced.isDefaulted.formatType = false;
    } else if (context.placementType) {
      enhanced.formatType = mapPlacementToFormatType(context.placementType);
      enhanced.isDefaulted.formatType = false;
    }
  }

  // Detect placement type from context
  if (!enhanced.placementType || enhanced.isDefaulted.placementType) {
    if (context.placementType) {
      enhanced.placementType = mapPlacementType(context.placementType);
      enhanced.isDefaulted.placementType = false;
    }
  }

  // Extract creative name from tactic if not provided
  if (!enhanced.creativeName || enhanced.isDefaulted.creativeName) {
    if (context.tactic && typeof context.tactic === 'string') {
      const extracted = extractCreativeNameFromTactic(context.tactic);
      if (extracted) {
        enhanced.creativeName = extracted;
        enhanced.isDefaulted.creativeName = false;
      }
    }
  }

  return enhanced;
}

/**
 * Map ad format to format type
 */
function mapAdFormatToFormatType(adFormat: string): string {
  const normalized = adFormat.toLowerCase();

  if (normalized.includes('video')) return 'Video';
  if (normalized.includes('display')) return 'Display';
  if (normalized.includes('banner')) return 'Display';
  if (normalized.includes('audio')) return 'Audio';
  if (normalized.includes('native')) return 'Native';
  if (normalized.includes('carousel')) return 'Carousel';
  if (normalized.includes('rich media')) return 'Rich Media';

  return 'Disp'; // Default fallback
}

/**
 * Map placement to format type
 */
function mapPlacementToFormatType(placement: string): string {
  const normalized = placement.toLowerCase();

  if (normalized.includes('video') || normalized.includes('stream')) return 'Video';
  if (normalized.includes('audio')) return 'Audio';
  if (normalized.includes('native')) return 'NatVid';
  if (normalized.includes('carousel')) return 'Carousel';

  return 'Disp'; // Default fallback
}

/**
 * Map placement type to Accutics placement type
 */
function mapPlacementType(placement: string): string {
  const normalized = placement.toLowerCase();

  // Video placements
  if (normalized.includes('instream') || normalized.includes('in-stream')) return 'InStream';
  if (normalized.includes('in stream')) return 'InStream';
  if (normalized.includes('instr')) return 'InStr';
  if (normalized.includes('preroll') || normalized.includes('pre-roll')) return 'InStream';
  if (normalized.includes('midroll') || normalized.includes('mid-roll')) return 'InStream';

  // Display placements
  if (normalized.includes('banner')) return 'Banner';
  if (normalized.includes('display')) return 'DCODisp';

  // Social placements
  if (normalized.includes('feed')) return 'FeedStory';
  if (normalized.includes('story')) return 'FeedStory';

  // Native
  if (normalized.includes('native')) return 'Native';

  // DCO
  if (normalized.includes('dco')) return 'DCODisp';

  return 'InStream'; // Default fallback
}

/**
 * Extract creative name from tactic string
 * Example: "Meta - Video - Summer Hero" -> "Summer-Hero"
 */
function extractCreativeNameFromTactic(tactic: string): string | null {
  // Remove common prefixes
  let cleaned = tactic
    .replace(/^(Meta|TradeDesk|DV360|Amazon DSP|Pinterest|TikTok|Snapchat)\s*[-:]/i, '')
    .replace(/^(Video|Display|Audio|Native|Carousel)\s*[-:]/i, '')
    .trim();

  // Convert spaces to hyphens
  cleaned = cleaned.replace(/\s+/g, '-');

  // Remove special characters
  cleaned = cleaned.replace(/[^a-zA-Z0-9-]/g, '');

  return cleaned || null;
}
