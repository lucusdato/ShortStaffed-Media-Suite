/**
 * DV360 (YouTube TrueView) Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */

import { PlatformConfig } from '../types';

export const DV360_CONFIG: PlatformConfig = {
  platformName: 'DV360',
  displayName: 'DV360 (YouTube TrueView Auction Action Reach)',

  taxonomyLevels: {
    'Partner': {
      structure: 'Free text',
      separator: '_',
      isRequired: false
    },

    'Advertiser': {
      structure: ['Country-Code', 'Free text'],
      separator: '_',
      isRequired: true,
      example: 'GB'
    },

    'Campaign': {
      structure: ['Brand-Name', 'Free text'],
      separator: '_',
      isRequired: true,
      example: 'Pond\'s'
    },

    'Insertion Order': {
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
      example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_TrVAuc_awa'
    },

    'Line Item': {
      structure: [
        'Placement-Type',
        'Audience-Name',
        'Gender',
        'Age-(lower-upper)',
        'Device-Type',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'InStr_AdvSk_Ad_18+_MobTab'
    },

    'Ad group': {
      structure: [
        'Placement-Type',
        'Audience-Party',
        'Audience-Type',
        'Audience-Name',
        'Gender',
        'Age-(lower-upper)',
        'Device-Type',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'InStr_12pd-did_Demog_AdvSk_Ad_18+_MobTab'
    },

    'Creative/Ad': {
      structure: [
        'Creative-Name',
        'Landing-Page-Type',
        'Retailer',
        'Format-Size',
        'Influencer',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'Creative-Name_Retail_Costco_30s_IHAMP'
    },

    'Audience': {
      structure: 'Free text',
      separator: '_',
      isRequired: false
    }
  },

  fieldDefaults: {
    campaignType: 'BrdPrecPerf',
    buyModel: 'TrVAuc',
    objective: 'awa',
    placementType: 'InStr',
    audienceParty: '12pd-did',
    audienceType: 'Demog',
    audienceName: 'AdvSk',
    gender: 'Ad',
    ageLower: 18,
    ageUpper: 100,
    deviceType: 'MobTab',
    formatSize: '30s',
    landingPageType: 'Retail',
    isDefaulted: {},
    validationErrors: []
  }
};
