/**
 * Pinterest Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */

import { PlatformConfig } from '../types';

export const PINTEREST_CONFIG: PlatformConfig = {
  platformName: 'Pinterest',
  displayName: 'Pinterest',

  taxonomyLevels: {
    'Account': {
      structure: ['Country-Code', 'Brand-Name', 'Free text'],
      separator: '_',
      isRequired: true,
      example: 'GB_Pond\'s'
    },

    'Campaign': {
      structure: [
        'Market-Short-Name-(PCat)',
        'Brand-Name',
        'Campaign-Name-Campaign-CN-Code',
        'Campaign-Type',
        'Buy-Model',
        'Objective',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_ReaFreq_awa'
    },

    'AdGroup': {
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
    isDefaulted: {},
    validationErrors: []
  }
};
