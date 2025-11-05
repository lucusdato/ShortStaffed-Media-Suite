/**
 * Platform Detection Utility
 * Detects platform from blocking chart or traffic sheet data
 */

import { normalizePlatformName } from './platforms';

/**
 * Detect platform from row data
 */
export function detectPlatform(row: {
  platform?: string;
  channel?: string;
  tactic?: string;
  [key: string]: any;
}): string | null {
  // PRIORITY 1: Check if platform is explicitly specified in "Platform" column
  if (row.platform && typeof row.platform === 'string') {
    const normalized = normalizePlatformName(row.platform);
    if (normalized) return normalized;
  }

  // PRIORITY 2: Check channel field for YouTube Shorts → DV360 mapping
  if (row.channel && typeof row.channel === 'string') {
    const channelLower = row.channel.toLowerCase();
    if (channelLower.includes('youtube') || channelLower.includes('shorts')) {
      return 'DV360';
    }
    const normalized = normalizePlatformName(row.channel);
    if (normalized) return normalized;
  }

  // PRIORITY 3: Check tactic field for platform mentions
  if (row.tactic && typeof row.tactic === 'string') {
    const tacticLower = row.tactic.toLowerCase();
    // Explicit YouTube → DV360 mapping
    if (tacticLower.includes('youtube') || tacticLower.includes('shorts')) {
      return 'DV360';
    }
    const platform = detectPlatformFromText(row.tactic);
    if (platform) return platform;
  }

  // PRIORITY 4: Check any field that might contain platform info
  for (const [key, value] of Object.entries(row)) {
    if (typeof value === 'string') {
      const platform = detectPlatformFromText(value);
      if (platform) return platform;
    }
  }

  return null;
}

/**
 * Detect platform from text string
 */
export function detectPlatformFromText(text: string): string | null {
  // Safety check: ensure text is actually a string
  if (typeof text !== 'string') {
    return null;
  }

  const lower = text.toLowerCase();

  // Check for each platform
  const platformPatterns: { [platform: string]: string[] } = {
    'TradeDesk': ['tradedesk', 'trade desk', 'ttd', 'the trade desk'],
    'DV360': ['dv360', 'dv 360', 'display & video', 'displayvideo', 'youtube', 'trueview'],
    'Amazon DSP': ['amazon dsp', 'amazon', 'amazondsp', 'amz'],
    'Meta': ['meta', 'facebook', 'instagram', 'fb', 'ig'],
    'Pinterest': ['pinterest', 'pin'],
    'TikTok': ['tiktok', 'tik tok'],
    'Snapchat': ['snapchat', 'snap']
  };

  for (const [platform, patterns] of Object.entries(platformPatterns)) {
    for (const pattern of patterns) {
      if (lower.includes(pattern)) {
        return platform;
      }
    }
  }

  return null;
}

/**
 * Detect multiple platforms from a collection of rows
 */
export function detectPlatformsFromRows(rows: any[]): { [platform: string]: number } {
  const platformCounts: { [platform: string]: number } = {};

  for (const row of rows) {
    const platform = detectPlatform(row);
    if (platform) {
      platformCounts[platform] = (platformCounts[platform] || 0) + 1;
    }
  }

  return platformCounts;
}
