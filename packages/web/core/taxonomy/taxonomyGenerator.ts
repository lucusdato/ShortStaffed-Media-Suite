/**
 * Taxonomy Generator - Creates UNCC-compliant taxonomy strings
 * for all supported platforms
 */

import { TaxonomyInputData, GeneratedTaxonomy, TaxonomyLevel } from './types';
import { getPlatformConfig } from './platforms';

/**
 * Generate all taxonomy levels for a given platform
 */
export function generateTaxonomies(inputData: TaxonomyInputData): GeneratedTaxonomy[] {
  const platformConfig = getPlatformConfig(inputData.platform);

  if (!platformConfig) {
    return [{
      platform: inputData.platform,
      platformFieldName: 'Unknown',
      taxonomyString: '',
      validationErrors: [`Unknown platform: ${inputData.platform}`]
    }];
  }

  const taxonomies: GeneratedTaxonomy[] = [];

  for (const [levelName, levelConfig] of Object.entries(platformConfig.taxonomyLevels)) {
    const taxonomyString = buildTaxonomyString(inputData, levelConfig);
    const validationErrors = validateTaxonomyLevel(taxonomyString, levelConfig, levelName);

    taxonomies.push({
      platform: inputData.platform,
      platformFieldName: levelName,
      taxonomyString,
      validationErrors
    });
  }

  return taxonomies;
}

/**
 * Build taxonomy string for a specific level
 */
export function buildTaxonomyString(
  inputData: TaxonomyInputData,
  levelConfig: TaxonomyLevel
): string {
  // Handle free text levels
  if (levelConfig.structure === 'Free text' || levelConfig.structure === 'Free Text') {
    return inputData.freeText || '';
  }

  // Handle structured levels
  if (Array.isArray(levelConfig.structure)) {
    const parts: string[] = [];
    const separator = levelConfig.separator || '_';

    for (const fieldToken of levelConfig.structure) {
      const value = resolveFieldToken(fieldToken, inputData);

      // Only add non-empty values
      if (value && value !== '') {
        parts.push(value);
      }
    }

    return parts.join(separator);
  }

  return '';
}

/**
 * Resolve a field token to its actual value
 * Tokens are like: "Market-Short-Name-(PCat)", "Brand-Name", "Campaign-Name-Campaign-CN-Code"
 */
export function resolveFieldToken(token: string, inputData: TaxonomyInputData): string {
  // Hardcoded value: "Unilever"
  if (token === 'Unilever') {
    return 'Unilever';
  }

  // Hardcoded value: "UL"
  if (token === 'UL') {
    return 'UL';
  }

  // Simple field mappings
  const tokenMap: { [token: string]: string | undefined } = {
    'Market-Short-Name-(PCat)': inputData.marketName,
    'Brand-Name': inputData.brandName,
    'Campaign-Name': inputData.campaignName,
    'Campaign-CN-Code': inputData.cnCode,
    'Country-Code': inputData.countryCode,

    // Campaign Level
    'Campaign-Type': inputData.campaignType,
    'Format-Type': inputData.formatType,
    'Objective': inputData.objective,

    // Line Item/Ad Group Level
    'Buy-Model': inputData.buyModel,
    'Targeting-Strategy': inputData.targetingStrategy,
    'Placement-Type': inputData.placementType,
    'Audience-Party': inputData.audienceParty,
    'Audience-Type': inputData.audienceType,
    'Audience-Name': inputData.audienceName,
    'Gender': inputData.gender,
    'Device-Type': inputData.deviceType,
    'Trusted-Publisher': inputData.trustedPublisher,

    // Creative Level
    'Format-Size': inputData.formatSize,
    'Creative-Name': inputData.creativeName,
    'Landing-Page-Type': inputData.landingPageType,
    'Retailer': inputData.retailer,
    'Retailer-Name': inputData.retailer,
    'Influencer': inputData.influencer,
    '[Influencer-Handle]': inputData.influencerHandle,
    'Influencer-Post-Type': inputData.influencerPostType,

    // Platform-Specific
    'Collaborative-Account-Type': inputData.collaborativeAccountType,
    'Collaborative-Ad': inputData.collaborativeAd,
    'Product-Format': inputData.productFormat,
    'Creative-Exchange': inputData.creativeExchange,
    'Add-On': inputData.addOn,

    // Free text
    'Free text': inputData.freeText,
    'Free Text': inputData.freeText
  };

  // Compound tokens
  if (token === 'Campaign-Name-Campaign-CN-Code') {
    if (inputData.campaignName && inputData.cnCode) {
      return `${inputData.campaignName}-${inputData.cnCode}`;
    }
    return '';
  }

  if (token === 'Age-(lower-upper)') {
    if (inputData.ageLower !== undefined && inputData.ageUpper !== undefined) {
      // Format as "18-65" or "18+" if upper is 100
      if (inputData.ageUpper === 100 || inputData.ageUpper >= 100) {
        return `${inputData.ageLower}+`;
      }
      return `${inputData.ageLower}-${inputData.ageUpper}`;
    }
    return '';
  }

  // Return mapped value or empty string
  return tokenMap[token] || '';
}

/**
 * Validate a taxonomy level
 */
export function validateTaxonomyLevel(
  taxonomyString: string,
  levelConfig: TaxonomyLevel,
  levelName: string
): string[] {
  const errors: string[] = [];

  // Check if required level is empty
  if (levelConfig.isRequired && (!taxonomyString || taxonomyString.trim() === '')) {
    errors.push(`${levelName} is required but generated empty taxonomy`);
  }

  // Check for placeholder values that weren't filled
  if (taxonomyString.includes('undefined') || taxonomyString.includes('null')) {
    errors.push(`${levelName} contains undefined/null values`);
  }

  // Check for consecutive separators (indicates missing fields)
  if (taxonomyString.includes('__')) {
    errors.push(`${levelName} has missing fields (consecutive separators)`);
  }

  // Check for leading/trailing separators
  if (taxonomyString.startsWith('_') || taxonomyString.endsWith('_')) {
    errors.push(`${levelName} has leading or trailing separators`);
  }

  return errors;
}

/**
 * Validate all input data for taxonomy generation
 */
export function validateInputData(inputData: TaxonomyInputData): string[] {
  const errors: string[] = [];

  // Required user metadata
  if (!inputData.cnCode || inputData.cnCode.trim() === '') {
    errors.push('CN Code is required');
  }

  if (!inputData.marketName || inputData.marketName.trim() === '') {
    errors.push('Market Name (PCat) is required');
  }

  if (!inputData.countryCode || inputData.countryCode.trim() === '') {
    errors.push('Country Code is required');
  }

  if (!inputData.brandName || inputData.brandName.trim() === '') {
    errors.push('Brand Name is required');
  }

  if (!inputData.campaignName || inputData.campaignName.trim() === '') {
    errors.push('Campaign Name is required');
  }

  // Platform detection
  if (!inputData.platform || inputData.platform.trim() === '') {
    errors.push('Platform must be detected or specified');
  }

  // Campaign level required fields
  if (!inputData.campaignType || inputData.campaignType.trim() === '') {
    errors.push('Campaign Type is required');
  }

  if (!inputData.formatType || inputData.formatType.trim() === '') {
    errors.push('Format Type is required');
  }

  if (!inputData.objective || inputData.objective.trim() === '') {
    errors.push('Objective is required');
  }

  // Line item level required fields
  if (!inputData.buyModel || inputData.buyModel.trim() === '') {
    errors.push('Buy Model is required');
  }

  if (!inputData.placementType || inputData.placementType.trim() === '') {
    errors.push('Placement Type is required');
  }

  if (!inputData.audienceParty || inputData.audienceParty.trim() === '') {
    errors.push('Audience Party is required');
  }

  if (!inputData.audienceType || inputData.audienceType.trim() === '') {
    errors.push('Audience Type is required');
  }

  if (!inputData.audienceName || inputData.audienceName.trim() === '') {
    errors.push('Audience Name is required');
  }

  if (!inputData.gender || inputData.gender.trim() === '') {
    errors.push('Gender is required');
  }

  if (inputData.ageLower === undefined || inputData.ageLower === null) {
    errors.push('Age Lower Bound is required');
  } else if (inputData.ageLower < 13) {
    errors.push('Age Lower Bound must be at least 13');
  }

  if (inputData.ageUpper === undefined || inputData.ageUpper === null) {
    errors.push('Age Upper Bound is required');
  } else if (inputData.ageUpper > 100) {
    errors.push('Age Upper Bound cannot exceed 100');
  }

  if (inputData.ageLower !== undefined && inputData.ageUpper !== undefined && inputData.ageLower >= inputData.ageUpper) {
    errors.push('Age Upper Bound must be greater than Age Lower Bound');
  }

  if (!inputData.deviceType || inputData.deviceType.trim() === '') {
    errors.push('Device Type is required');
  }

  // Creative level required fields
  if (!inputData.formatSize || inputData.formatSize.trim() === '') {
    errors.push('Format Size is required');
  }

  if (!inputData.creativeName || inputData.creativeName.trim() === '') {
    errors.push('Creative Name is required');
  }

  if (!inputData.landingPageType || inputData.landingPageType.trim() === '') {
    errors.push('Landing Page Type is required');
  }

  // Conditional: Retailer required if Landing Page Type is "Retail"
  if (inputData.landingPageType === 'Retail' && (!inputData.retailer || inputData.retailer.trim() === '')) {
    errors.push('Retailer is required when Landing Page Type is "Retail"');
  }

  return errors;
}
