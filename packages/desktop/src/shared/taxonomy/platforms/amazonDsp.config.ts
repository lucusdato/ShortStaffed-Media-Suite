/**
 * Amazon DSP Platform Configuration
 * Based on Accutics Unilever Field Name Strings
 */

import { PlatformConfig } from '../types';

export const AMAZON_DSP_CONFIG: PlatformConfig = {
  platformName: 'Amazon DSP',
  displayName: 'Amazon DSP',

  taxonomyLevels: {
    'Entity': {
      structure: 'Free Text',
      separator: '_',
      isRequired: false
    },

    'Advertiser': {
      structure: ['Country-Code', 'Free text'],
      separator: '_',
      isRequired: true,
      example: 'GB'
    },

    'Order': {
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
      example: 'SKNCLN_Pond\'s_Panacea-(Ponds)-CN002366_BrdPrecPerf_Disp_conv'
    },

    'Line Item': {
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
      example: 'PMP_AUD_DCODisp_1pd-diddad_Behav_AdvSk_Ad_18-44_Mob_cdn'
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
        'Product-Format',
        'Free text'
      ],
      separator: '_',
      isRequired: true,
      example: 'Panacea-(Ponds)-CN002366_InStream_NatVid_30s_Creative-Name_Retail_Costco_prog_IHAMP_privid'
    },

    'Audience': {
      structure: 'Free Text',
      separator: '_',
      isRequired: false
    }
  },

  fieldDefaults: {
    campaignType: 'BrdPrecPerf',
    buyModel: 'PMP',
    targetingStrategy: 'AUD',
    objective: 'conv',
    formatType: 'Disp',
    placementType: 'DCODisp',
    audienceParty: '1pd-diddad',
    audienceType: 'Behav',
    audienceName: 'AdvSk',
    gender: 'Ad',
    ageLower: 18,
    ageUpper: 44,
    deviceType: 'Mob',
    formatSize: '30s',
    landingPageType: 'Retail',
    productFormat: 'privid',
    isDefaulted: {},
    validationErrors: []
  }
};
