/**
 * Smart Defaults Engine
 * Applies intelligent defaults for missing taxonomy fields
 */

import { TaxonomyInputData, ParsedTrafficSheetRow } from './types';
import { TRADEDESK_SMART_DEFAULTS, AUDIENCE_TYPE_OPTIONS } from './config';

/**
 * Apply smart defaults to fill missing fields
 * Priority: Extracted from traffic sheet > Smart defaults > Empty
 */
export function applySmartDefaults(
  extractedData: Partial<TaxonomyInputData>,
  trafficSheetRow?: ParsedTrafficSheetRow
): TaxonomyInputData {
  const isDefaulted: { [fieldName: string]: boolean } = {};

  // Helper function to set field with default if missing
  const setWithDefault = (fieldName: keyof TaxonomyInputData, defaultValue: any): any => {
    if (extractedData[fieldName] !== undefined && extractedData[fieldName] !== null && extractedData[fieldName] !== '') {
      // Field already has value from extraction
      isDefaulted[fieldName as string] = false;
      return extractedData[fieldName];
    } else if (defaultValue !== undefined) {
      // Use default value
      isDefaulted[fieldName as string] = true;
      return defaultValue;
    } else {
      // No value and no default
      isDefaulted[fieldName as string] = false;
      return '';
    }
  };

  // ========================================
  // CAMPAIGN LEVEL DEFAULTS
  // ========================================

  const marketName = setWithDefault('marketName', '');
  const brandName = setWithDefault('brandName', '');
  const campaignName = setWithDefault('campaignName', '');
  const campaignCnCode = setWithDefault('campaignCnCode', '');
  const campaignType = setWithDefault('campaignType', TRADEDESK_SMART_DEFAULTS.campaign.campaignType);
  const formatType = setWithDefault('formatType', extractedData.formatType || TRADEDESK_SMART_DEFAULTS.campaign.formatType);
  const objective = setWithDefault('objective', TRADEDESK_SMART_DEFAULTS.campaign.objective);
  const campaignFreeText = setWithDefault('campaignFreeText', '');

  // ========================================
  // LINE ITEM LEVEL DEFAULTS
  // ========================================

  const buyModel = setWithDefault('buyModel', TRADEDESK_SMART_DEFAULTS.lineItem.buyModel);

  // Infer targeting strategy from placement if possible
  let targetingStrategy = extractedData.targetingStrategy;
  if (!targetingStrategy && extractedData.placementType) {
    targetingStrategy = inferTargetingStrategy(extractedData.placementType);
    isDefaulted['targetingStrategy'] = true;
  } else if (!targetingStrategy) {
    targetingStrategy = TRADEDESK_SMART_DEFAULTS.lineItem.targetingStrategy;
    isDefaulted['targetingStrategy'] = true;
  } else {
    isDefaulted['targetingStrategy'] = false;
  }

  const placementType = setWithDefault('placementType', '');
  const audienceParty = setWithDefault('audienceParty', TRADEDESK_SMART_DEFAULTS.lineItem.audienceParty);

  // Audience Type depends on Audience Party
  let audienceType = extractedData.audienceType;
  if (!audienceType) {
    const party = extractedData.audienceParty || TRADEDESK_SMART_DEFAULTS.lineItem.audienceParty;
    audienceType = getDefaultAudienceType(party);
    isDefaulted['audienceType'] = true;
  } else {
    isDefaulted['audienceType'] = false;
  }

  // Infer audience name from tactic if available
  let audienceName = extractedData.audienceName;
  if (!audienceName && trafficSheetRow?.tactic) {
    audienceName = inferAudienceName(trafficSheetRow.tactic);
    isDefaulted['audienceName'] = !!audienceName;
  } else if (!audienceName) {
    audienceName = '';
    isDefaulted['audienceName'] = false;
  } else {
    isDefaulted['audienceName'] = false;
  }

  const gender = setWithDefault('gender', TRADEDESK_SMART_DEFAULTS.lineItem.gender);
  const ageLower = setWithDefault('ageLower', TRADEDESK_SMART_DEFAULTS.lineItem.ageLower);
  const ageUpper = setWithDefault('ageUpper', TRADEDESK_SMART_DEFAULTS.lineItem.ageUpper);
  const deviceType = setWithDefault('deviceType', TRADEDESK_SMART_DEFAULTS.lineItem.deviceType);
  const trustedPublisher = setWithDefault('trustedPublisher', '');
  const lineItemFreeText = setWithDefault('lineItemFreeText', '');

  // ========================================
  // CREATIVE LEVEL DEFAULTS
  // ========================================

  const formatSize = setWithDefault('formatSize', TRADEDESK_SMART_DEFAULTS.creative.formatSize);

  // Infer creative name from traffic sheet if available
  let creativeName = extractedData.creativeName;
  if (!creativeName && trafficSheetRow?.creativeName) {
    creativeName = trafficSheetRow.creativeName;
    isDefaulted['creativeName'] = false;
  } else if (!creativeName && trafficSheetRow?.tactic) {
    creativeName = inferCreativeName(trafficSheetRow.tactic);
    isDefaulted['creativeName'] = !!creativeName;
  } else if (!creativeName) {
    creativeName = '';
    isDefaulted['creativeName'] = false;
  } else {
    isDefaulted['creativeName'] = false;
  }

  const landingPageType = setWithDefault('landingPageType', TRADEDESK_SMART_DEFAULTS.creative.landingPageType);
  const retailer = setWithDefault('retailer', '');
  const influencer = setWithDefault('influencer', '');
  const creativeFreeText = setWithDefault('creativeFreeText', '');

  // Build complete TaxonomyInputData object
  const result: TaxonomyInputData = {
    // Campaign Level
    marketName,
    brandName,
    campaignName,
    campaignCnCode,
    campaignType,
    formatType,
    objective,
    campaignFreeText,

    // Line Item Level
    buyModel,
    targetingStrategy: targetingStrategy || '',
    placementType,
    audienceParty,
    audienceType,
    audienceName,
    gender,
    ageLower: Number(ageLower),
    ageUpper: Number(ageUpper),
    deviceType,
    trustedPublisher,
    lineItemFreeText,

    // Creative Level
    formatSize,
    creativeName,
    landingPageType,
    retailer,
    influencer,
    creativeFreeText,

    // Metadata
    isDefaulted,
    validationErrors: []
  };

  return result;
}

/**
 * Infer targeting strategy from placement type
 */
function inferTargetingStrategy(placementType: string): string {
  const placement = placementType.toLowerCase();

  if (placement.includes('search') || placement.includes('keyword')) {
    return 'Keyword';
  } else if (placement.includes('retarget') || placement.includes('remarketing')) {
    return 'Retargeting';
  } else if (placement.includes('contextual')) {
    return 'Contextual';
  } else if (placement.includes('interest')) {
    return 'Interest';
  } else {
    return 'Behavioral'; // Default
  }
}

/**
 * Get default audience type based on audience party
 */
function getDefaultAudienceType(audienceParty: string): string {
  const options = AUDIENCE_TYPE_OPTIONS[audienceParty];
  return options && options.length > 0 ? options[0] : 'Behavioral';
}

/**
 * Infer audience name from tactic description
 * Examples:
 *  - "Meta Prospecting" → "Meta-Prospecting"
 *  - "TikTok Lookalike" → "TikTok-Lookalike"
 */
function inferAudienceName(tactic: string): string {
  // Look for platform names and targeting keywords
  const platforms = ['meta', 'facebook', 'instagram', 'tiktok', 'pinterest', 'snapchat', 'twitter'];
  const targetingTypes = ['prospecting', 'lookalike', 'retargeting', 'remarketing', 'interest', 'behavioral'];

  const tacticLower = tactic.toLowerCase();

  for (const platform of platforms) {
    if (tacticLower.includes(platform)) {
      for (const targetingType of targetingTypes) {
        if (tacticLower.includes(targetingType)) {
          // Found both platform and targeting type
          return `${capitalize(platform)}-${capitalize(targetingType)}`;
        }
      }
      // Found platform but no targeting type
      return `${capitalize(platform)}-Audience`;
    }
  }

  // No platform found, check for targeting types alone
  for (const targetingType of targetingTypes) {
    if (tacticLower.includes(targetingType)) {
      return capitalize(targetingType);
    }
  }

  return ''; // Could not infer
}

/**
 * Infer creative name from tactic
 * Example: "Meta Display - Summer Campaign" → "Meta-Display-Summer"
 */
function inferCreativeName(tactic: string): string {
  // Remove common words and clean up
  const cleaned = tactic
    .replace(/campaign/gi, '')
    .replace(/tactic/gi, '')
    .replace(/\s+-\s+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return cleaned || '';
}

/**
 * Capitalize first letter of string
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Update audience type options when audience party changes
 */
export function getAudienceTypeOptions(audienceParty: string): string[] {
  return AUDIENCE_TYPE_OPTIONS[audienceParty] || [];
}
