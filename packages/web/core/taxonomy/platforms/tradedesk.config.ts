/**
 * TradeDesk Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */

import { PlatformConfig } from '../types';

export const TRADEDESK_CONFIG: PlatformConfig = {
  platformName: 'TradeDesk',
  displayName: 'TradeDesk',

  taxonomyLevels: {
    'Partner': {
      structure: 'Free text',
      separator: '_',
      isRequired: false
    },

    'Advertiser': {
      structure: ['Unilever', 'Country-Code', 'Free text'],
      separator: '_',
      isRequired: true,
      example: 'Unilever_GB'
    },

    'Campaign': {
      structure: [
        'Market-Short-Name-(PCat)',
        'Brand-Name',
        'Campaign-Name-Campaign-CN-Code',
        'Campaign-Type',
        'Format-Type',
        'Objective',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_Disp_cons'
    },

    'Adgroup': {
      structure: [
        'Buy-Model',
        'Targeting-Strategy',
        'Placement-Type',
        'Audience-Party',
        'Audience-Type',
        'Audience-Name',
        'Gender',
        'Age-(lower-upper)',
        'Device-Type',
        'Trusted-Publisher',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'OMPPMP_CNT_InStream_3pd_None_AdvSk_Ad_18+_MobDesk_hrt'
    },

    'Creative': {
      structure: [
        'Campaign-Name-Campaign-CN-Code',
        'Placement-Type',
        'Format-Type',
        'Format-Size',
        'Creative-Name',
        'Landing-Page-Type',
        'Retailer',
        'Trusted-Publisher',
        'Influencer',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'Panacea-(Ponds)-CN002366_InStream_NatVid_30s_Creative-Name_Retail_Costco_prog_IHAMP'
    },

    'Audience': {
      structure: 'Free Text',
      separator: '_',
      isRequired: false
    }
  },

  fieldDefaults: {
    campaignType: 'BrdPrecPerf',
    buyModel: 'OMPPMP',
    targetingStrategy: 'CNT',
    objective: 'cons',
    formatType: 'Disp',
    placementType: 'InStream',
    audienceParty: '3pd',
    audienceType: 'None',
    audienceName: 'AdvSk',
    gender: 'Ad',
    ageLower: 18,
    ageUpper: 65,
    deviceType: 'MobDesk',
    formatSize: '30s',
    landingPageType: 'Retail',
    isDefaulted: {},
    validationErrors: []
  }
};
