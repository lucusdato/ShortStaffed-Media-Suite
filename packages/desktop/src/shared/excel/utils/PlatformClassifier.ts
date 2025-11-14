/**
 * Platform Classifier Utility
 * Centralizes all platform-specific logic that was previously scattered across
 * parseBlockingChart.ts, generateTrafficSheet.ts, and trafficSheetWriter.ts
 */

import type { TrafficSheetTab } from '../types';

/**
 * Platform category for traffic sheet tab routing
 */
export type PlatformCategory = 'digital' | 'social' | 'influencer';

/**
 * Determine which traffic sheet tab a campaign line should go to
 * Logic:
 * 1. Check channel first
 * 2. If channel is "Other Say Social" or contains "influencer"/"creator" → Other Say Social
 * 3. For social channels, check ad format for "influencer" → Other Say Social
 * 4. Social platforms without influencer → Brand Say Social
 * 5. Everything else → Brand Say Digital
 *
 * @param platform - Platform name from blocking chart
 * @param channel - Channel name from blocking chart (optional)
 * @param adFormat - Ad Format from blocking chart (optional)
 * @returns Traffic sheet tab name
 */
export function getTrafficSheetTab(platform: string, channel?: string, adFormat?: string): TrafficSheetTab {
  const platformLower = (platform || '').toLowerCase();
  const channelLower = (channel || '').toLowerCase();
  const adFormatLower = (adFormat || '').toLowerCase();

  // Step 1: Check channel for explicit "Other Say Social" or influencer/creator keywords
  if (channelLower.includes('other say social') ||
      channelLower.includes('influencer') ||
      channelLower.includes('creator')) {
    return 'Other Say Social';
  }

  // Step 2: Check if it's a social platform
  const isSocialPlatform = (
    platformLower.includes('meta') ||
    platformLower.includes('facebook') ||
    platformLower.includes('instagram') ||
    platformLower.includes('tiktok') ||
    platformLower.includes('pinterest') ||
    platformLower.includes('snapchat') ||
    platformLower.includes('twitter') ||
    platformLower.includes('x.com') ||
    platformLower.includes('linkedin') ||
    platformLower.includes('reddit')
  );

  // Step 3: For social platforms, check ad format for influencer content
  if (isSocialPlatform) {
    if (adFormatLower.includes('influencer') || adFormatLower.includes('creator')) {
      return 'Other Say Social';
    }
    return 'Brand Say Social';
  }

  // Step 4: Everything else → Brand Say Digital (programmatic, display, video, audio)
  return 'Brand Say Digital';
}

/**
 * Get platform category for internal logic
 *
 * @param platform - Platform name from blocking chart
 * @returns Platform category
 */
export function getPlatformCategory(platform: string): PlatformCategory {
  const platformLower = (platform || '').toLowerCase();

  // Social platforms
  if (
    platformLower.includes('meta') ||
    platformLower.includes('facebook') ||
    platformLower.includes('instagram') ||
    platformLower.includes('tiktok') ||
    platformLower.includes('pinterest') ||
    platformLower.includes('snapchat') ||
    platformLower.includes('twitter') ||
    platformLower.includes('linkedin') ||
    platformLower.includes('reddit')
  ) {
    return 'social';
  }

  // Influencer
  if (
    platformLower.includes('influencer') ||
    platformLower.includes('creator')
  ) {
    return 'influencer';
  }

  // Digital (programmatic, display, video, audio)
  return 'digital';
}

/**
 * Determine default placements based on platform
 * Used when placements field is empty in blocking chart
 *
 * @param platform - Platform name from blocking chart
 * @param defaultValue - Fallback value if no platform-specific default exists
 * @returns Platform-appropriate placement string
 */
export function getDefaultPlacements(platform: string, defaultValue: string = ''): string {
  const platformLower = (platform || '').toLowerCase();

  if (platformLower.includes('tiktok')) {
    return 'In-Feed';
  }

  if (platformLower.includes('meta') || platformLower.includes('facebook') || platformLower.includes('instagram')) {
    return 'Feeds, Stories, Reels';
  }

  if (platformLower.includes('pinterest')) {
    return defaultValue; // Pinterest uses ad format from creative line
  }

  if (platformLower.includes('snapchat')) {
    return 'Snap Ads | Story Ads';
  }

  if (platformLower.includes('linkedin')) {
    return 'Feed | Sponsored Content';
  }

  if (platformLower.includes('twitter') || platformLower.includes('x.com')) {
    return 'Timeline | Trends';
  }

  // For programmatic/digital, use the provided value or default
  return defaultValue;
}

/**
 * Check if a channel should be excluded from traffic sheet
 * (OOH, TV, Radio, Print are planning-only channels)
 *
 * @param channel - Channel name from blocking chart
 * @returns True if channel should be excluded
 */
export function isExcludedChannel(channel: string): boolean {
  const channelLower = (channel || '').toLowerCase();

  return (
    channelLower.includes('ooh') ||
    channelLower.includes('out of home') ||
    channelLower.includes('outdoor') ||
    channelLower.includes('tv') ||
    channelLower.includes('television') ||
    channelLower.includes('radio') ||
    channelLower.includes('print') ||
    channelLower.includes('newspaper') ||
    channelLower.includes('magazine')
  );
}

/**
 * Get exclusion reason for excluded channels
 *
 * @param channel - Channel name from blocking chart
 * @returns Exclusion reason string or undefined
 */
export function getExclusionReason(channel: string): string | undefined {
  const channelLower = (channel || '').toLowerCase();

  if (channelLower.includes('ooh') || channelLower.includes('out of home') || channelLower.includes('outdoor')) {
    return 'OOH (Out of Home) - planning only';
  }

  if (channelLower.includes('tv') || channelLower.includes('television')) {
    return 'TV - planning only';
  }

  if (channelLower.includes('radio')) {
    return 'Radio - planning only';
  }

  if (channelLower.includes('print') || channelLower.includes('newspaper') || channelLower.includes('magazine')) {
    return 'Print - planning only';
  }

  return undefined;
}

/**
 * Check if platform is a social platform
 *
 * @param platform - Platform name from blocking chart
 * @returns True if platform is social
 */
export function isSocialPlatform(platform: string): boolean {
  return getPlatformCategory(platform) === 'social';
}

/**
 * Check if platform is programmatic/digital
 *
 * @param platform - Platform name from blocking chart
 * @returns True if platform is programmatic
 */
export function isProgrammaticPlatform(platform: string): boolean {
  const platformLower = (platform || '').toLowerCase();

  return (
    platformLower.includes('trade desk') ||
    platformLower.includes('tradedesk') ||
    platformLower.includes('dv360') ||
    platformLower.includes('display & video 360') ||
    platformLower.includes('amazon') ||
    platformLower.includes('programmatic')
  );
}
