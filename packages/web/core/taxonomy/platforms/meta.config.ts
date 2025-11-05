/**
 * Meta Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */

import { PlatformConfig } from '../types';

export const META_CONFIG: PlatformConfig = {
  platformName: 'Meta',
  displayName: 'Meta (Facebook/Instagram)',

  taxonomyLevels: {
    'Business Manager': {
      structure: 'Free text',
      separator: '_',
      isRequired: false,
      example: 'GB_UL'
    },

    'Account': {
      structure: [
        'Country-Code',
        'Brand-Name',
        'Collaborative-Account-Type',
        'Retailer-Name',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'GB_Pond\'s_Collab_Spar'
    },

    'Campaign': {
      structure: [
        'Market-Short-Name-(PCat)',
        'Brand-Name',
        'Campaign-Name-Campaign-CN-Code',
        'Campaign-Type',
        'Buy-Model',
        'Collaborative-Ad',
        'Objective',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_ReaFreq_collab_awa'
    },

    'Ad Set': {
      structure: [
        'Audience-Party',
        'Audience-Type',
        'Audience-Name',
        'Gender',
        'Age-(lower-upper)',
        'Placement-Type',
        'Device-Type',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: '12pd-diddad_LLike_AdvSk_Ad_13+_FeedStory_Mob'
    },

    'Ad': {
      structure: [
        'Creative-Name',
        'Format-Type',
        'Landing-Page-Type',
        'Retailer',
        'Format-Size',
        'Influencer-Post-Type',
        'Influencer',
        '[Influencer-Handle]',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'Creative-Name_Carousel_Retail_Costco_20s_DARK_BSAY_[hygge_for_home]'
    }
  },

  fieldDefaults: {
    campaignType: 'BrdPrecPerf',
    buyModel: 'ReaFreq',
    objective: 'awa',
    audienceParty: '12pd-diddad',
    audienceType: 'LLike',
    audienceName: 'AdvSk',
    gender: 'Ad',
    ageLower: 13,
    ageUpper: 100,
    placementType: 'FeedStory',
    deviceType: 'Mob',
    formatType: 'Carousel',
    formatSize: '20s',
    landingPageType: 'Retail',
    collaborativeAd: 'collab',
    isDefaulted: {},
    validationErrors: []
  }
};
