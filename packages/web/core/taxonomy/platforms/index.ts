/**
 * Platform Registry
 * Centralized access to all platform configurations
 */

import { PlatformConfig } from '../types';
import { DV360_CONFIG } from './dv360.config';
import { TRADEDESK_CONFIG } from './tradedesk.config';
import { AMAZON_DSP_CONFIG } from './amazonDsp.config';
import { META_CONFIG } from './meta.config';
import { PINTEREST_CONFIG } from './pinterest.config';
import { TIKTOK_CONFIG } from './tiktok.config';
import { SNAPCHAT_CONFIG } from './snapchat.config';

export const PLATFORM_CONFIGS: { [platformName: string]: PlatformConfig } = {
  'DV360': DV360_CONFIG,
  'TradeDesk': TRADEDESK_CONFIG,
  'Amazon DSP': AMAZON_DSP_CONFIG,
  'Meta': META_CONFIG,
  'Pinterest': PINTEREST_CONFIG,
  'TikTok': TIKTOK_CONFIG,
  'Snapchat': SNAPCHAT_CONFIG
};

/**
 * Get platform configuration by name
 */
export function getPlatformConfig(platformName: string): PlatformConfig | null {
  return PLATFORM_CONFIGS[platformName] || null;
}

/**
 * Get list of all supported platforms
 */
export function getSupportedPlatforms(): string[] {
  return Object.keys(PLATFORM_CONFIGS);
}

/**
 * Detect platform from various name formats
 * Handles variations like "tradedesk", "TradeDesk", "The Trade Desk", etc.
 */
export function normalizePlatformName(rawPlatformName: string): string | null {
  const normalized = rawPlatformName.toLowerCase().trim();

  // Platform name mappings
  const platformMappings: { [key: string]: string } = {
    'tradedesk': 'TradeDesk',
    'the trade desk': 'TradeDesk',
    'ttd': 'TradeDesk',

    'dv360': 'DV360',
    'displayvideo': 'DV360',
    'display & video 360': 'DV360',
    'youtube': 'DV360',
    'trueview': 'DV360',

    'amazon dsp': 'Amazon DSP',
    'amazon': 'Amazon DSP',
    'amazondsp': 'Amazon DSP',

    'meta': 'Meta',
    'facebook': 'Meta',
    'fb': 'Meta',
    'instagram': 'Meta',
    'ig': 'Meta',

    'pinterest': 'Pinterest',
    'pin': 'Pinterest',

    'tiktok': 'TikTok',
    'tik tok': 'TikTok',

    'snapchat': 'Snapchat',
    'snap': 'Snapchat'
  };

  return platformMappings[normalized] || null;
}

export { DV360_CONFIG, TRADEDESK_CONFIG, AMAZON_DSP_CONFIG, META_CONFIG, PINTEREST_CONFIG, TIKTOK_CONFIG, SNAPCHAT_CONFIG };
