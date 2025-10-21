/**
 * Taxonomy Generator - Creates UNCC-compliant taxonomy strings
 * for TradeDesk campaigns
 */

import { TaxonomyInputData, GeneratedTaxonomies } from './types';
import { TAXONOMY_TEMPLATES } from './config';

/**
 * Generate all three levels of taxonomy for TradeDesk
 */
export function generateTradeDesk(data: TaxonomyInputData): GeneratedTaxonomies {
  return {
    campaign: generateCampaignTaxonomy(data),
    lineItem: generateLineItemTaxonomy(data),
    creative: generateCreativeTaxonomy(data)
  };
}

/**
 * Generate Campaign Level taxonomy
 * Format: Market-(PCat)_Brand_Campaign_CN-Code_Type_Format_Objective_[Free]
 */
export function generateCampaignTaxonomy(data: TaxonomyInputData): string {
  const fields: string[] = [];

  // Build field array in order
  if (data.marketName) fields.push(data.marketName);
  if (data.brandName) fields.push(data.brandName);
  if (data.campaignName) fields.push(data.campaignName);
  if (data.campaignCnCode) fields.push(data.campaignCnCode);
  if (data.campaignType) fields.push(data.campaignType);
  if (data.formatType) fields.push(data.formatType);
  if (data.objective) fields.push(data.objective);
  if (data.campaignFreeText) fields.push(data.campaignFreeText);

  return fields.join('_');
}

/**
 * Generate Line Item (Ad Group) Level taxonomy
 * Format: Buy_Strategy_Placement_Party_Type_Audience_Gender_Age_Device_Publisher_[Free]
 */
export function generateLineItemTaxonomy(data: TaxonomyInputData): string {
  const fields: string[] = [];

  // Build field array in order
  if (data.buyModel) fields.push(data.buyModel);
  if (data.targetingStrategy) fields.push(data.targetingStrategy);
  if (data.placementType) fields.push(data.placementType);
  if (data.audienceParty) fields.push(data.audienceParty);
  if (data.audienceType) fields.push(data.audienceType);
  if (data.audienceName) fields.push(data.audienceName);
  if (data.gender) fields.push(data.gender);

  // Age range - special formatting: Age-(lower-upper)
  if (data.ageLower !== undefined && data.ageUpper !== undefined) {
    fields.push(`Age-(${data.ageLower}-${data.ageUpper})`);
  }

  if (data.deviceType) fields.push(data.deviceType);
  if (data.trustedPublisher) fields.push(data.trustedPublisher);
  if (data.lineItemFreeText) fields.push(data.lineItemFreeText);

  return fields.join('_');
}

/**
 * Generate Creative/Ad Level taxonomy
 * Format: Campaign_CN_Placement_Format_Size_Creative_LandingType_Retailer_Publisher_Influencer_[Free]
 */
export function generateCreativeTaxonomy(data: TaxonomyInputData): string {
  const fields: string[] = [];

  // Campaign context (from campaign level)
  if (data.campaignName) fields.push(data.campaignName);
  if (data.campaignCnCode) fields.push(data.campaignCnCode);

  // Creative-specific fields
  if (data.placementType) fields.push(data.placementType);
  if (data.formatType) fields.push(data.formatType);
  if (data.formatSize) fields.push(data.formatSize);
  if (data.creativeName) fields.push(data.creativeName);
  if (data.landingPageType) fields.push(data.landingPageType);

  // Conditional: Retailer only if landingPageType = 'Retailer'
  if (data.landingPageType === 'Retailer' && data.retailer) {
    fields.push(data.retailer);
  }

  if (data.trustedPublisher) fields.push(data.trustedPublisher);
  if (data.influencer) fields.push(data.influencer);
  if (data.creativeFreeText) fields.push(data.creativeFreeText);

  return fields.join('_');
}

/**
 * Validate taxonomy input data
 * Returns array of validation error messages
 */
export function validateTaxonomyData(data: TaxonomyInputData): string[] {
  const errors: string[] = [];

  // Campaign Level Required Fields
  if (!data.marketName) errors.push('Market Name (PCat) is required');
  if (!data.brandName) errors.push('Brand Name is required');
  if (!data.campaignName) errors.push('Campaign Name is required');
  if (!data.campaignCnCode) errors.push('Campaign CN Code is required');
  if (!data.campaignType) errors.push('Campaign Type is required');
  if (!data.formatType) errors.push('Format Type is required');
  if (!data.objective) errors.push('Objective is required');

  // Line Item Level Required Fields
  if (!data.buyModel) errors.push('Buy Model is required');
  if (!data.targetingStrategy) errors.push('Targeting Strategy is required');
  if (!data.placementType) errors.push('Placement Type is required');
  if (!data.audienceParty) errors.push('Audience Party is required');
  if (!data.audienceType) errors.push('Audience Type is required');
  if (!data.audienceName) errors.push('Audience Name is required');
  if (!data.gender) errors.push('Gender is required');
  if (!data.deviceType) errors.push('Device Type is required');

  // Age validation
  if (data.ageLower === undefined || data.ageLower === null) {
    errors.push('Age Lower Bound is required');
  } else if (data.ageLower < 13) {
    errors.push('Age Lower Bound must be at least 13');
  }

  if (data.ageUpper === undefined || data.ageUpper === null) {
    errors.push('Age Upper Bound is required');
  } else if (data.ageUpper > 100) {
    errors.push('Age Upper Bound cannot exceed 100');
  }

  if (data.ageLower && data.ageUpper && data.ageLower >= data.ageUpper) {
    errors.push('Age Upper Bound must be greater than Age Lower Bound');
  }

  // Creative Level Required Fields
  if (!data.formatSize) errors.push('Format Size is required');
  if (!data.creativeName) errors.push('Creative Name is required');
  if (!data.landingPageType) errors.push('Landing Page Type is required');

  // Conditional: Retailer required if landingPageType = 'Retailer'
  if (data.landingPageType === 'Retailer' && !data.retailer) {
    errors.push('Retailer is required when Landing Page Type is "Retailer"');
  }

  return errors;
}

/**
 * Check if taxonomy data is valid (no validation errors)
 */
export function isValidTaxonomyData(data: TaxonomyInputData): boolean {
  return validateTaxonomyData(data).length === 0;
}
