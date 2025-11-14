"use strict";
/**
 * Platform Classifier Utility
 * Centralizes all platform-specific logic that was previously scattered across
 * parseBlockingChart.ts, generateTrafficSheet.ts, and trafficSheetWriter.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrafficSheetTab = getTrafficSheetTab;
exports.getPlatformCategory = getPlatformCategory;
exports.getDefaultPlacements = getDefaultPlacements;
exports.isExcludedChannel = isExcludedChannel;
exports.getExclusionReason = getExclusionReason;
exports.isSocialPlatform = isSocialPlatform;
exports.isProgrammaticPlatform = isProgrammaticPlatform;
/**
 * Determine which traffic sheet tab a campaign line should go to
 * Based on platform and channel keywords
 *
 * @param platform - Platform name from blocking chart
 * @param channel - Channel name from blocking chart (optional)
 * @returns Traffic sheet tab name
 */
function getTrafficSheetTab(platform, channel) {
    const platformLower = (platform || '').toLowerCase();
    const channelLower = (channel || '').toLowerCase();
    // Check for influencer/creator content first
    if (channelLower.includes('influencer') || channelLower.includes('creator')) {
        return 'Other Say Social';
    }
    // Social platforms → Brand Say Social
    if (platformLower.includes('meta') ||
        platformLower.includes('facebook') ||
        platformLower.includes('instagram') ||
        platformLower.includes('tiktok') ||
        platformLower.includes('pinterest') ||
        platformLower.includes('snapchat') ||
        platformLower.includes('twitter') ||
        platformLower.includes('x.com') ||
        platformLower.includes('linkedin') ||
        platformLower.includes('reddit')) {
        return 'Brand Say Social';
    }
    // Everything else → Brand Say Digital (programmatic, display, video, audio)
    return 'Brand Say Digital';
}
/**
 * Get platform category for internal logic
 *
 * @param platform - Platform name from blocking chart
 * @returns Platform category
 */
function getPlatformCategory(platform) {
    const platformLower = (platform || '').toLowerCase();
    // Social platforms
    if (platformLower.includes('meta') ||
        platformLower.includes('facebook') ||
        platformLower.includes('instagram') ||
        platformLower.includes('tiktok') ||
        platformLower.includes('pinterest') ||
        platformLower.includes('snapchat') ||
        platformLower.includes('twitter') ||
        platformLower.includes('linkedin') ||
        platformLower.includes('reddit')) {
        return 'social';
    }
    // Influencer
    if (platformLower.includes('influencer') ||
        platformLower.includes('creator')) {
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
function getDefaultPlacements(platform, defaultValue = '') {
    const platformLower = (platform || '').toLowerCase();
    if (platformLower.includes('tiktok')) {
        return 'In Feed';
    }
    if (platformLower.includes('meta') || platformLower.includes('facebook') || platformLower.includes('instagram')) {
        return 'Feed | Stories | Reels';
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
function isExcludedChannel(channel) {
    const channelLower = (channel || '').toLowerCase();
    return (channelLower.includes('ooh') ||
        channelLower.includes('out of home') ||
        channelLower.includes('outdoor') ||
        channelLower.includes('tv') ||
        channelLower.includes('television') ||
        channelLower.includes('radio') ||
        channelLower.includes('print') ||
        channelLower.includes('newspaper') ||
        channelLower.includes('magazine'));
}
/**
 * Get exclusion reason for excluded channels
 *
 * @param channel - Channel name from blocking chart
 * @returns Exclusion reason string or undefined
 */
function getExclusionReason(channel) {
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
function isSocialPlatform(platform) {
    return getPlatformCategory(platform) === 'social';
}
/**
 * Check if platform is programmatic/digital
 *
 * @param platform - Platform name from blocking chart
 * @returns True if platform is programmatic
 */
function isProgrammaticPlatform(platform) {
    const platformLower = (platform || '').toLowerCase();
    return (platformLower.includes('trade desk') ||
        platformLower.includes('tradedesk') ||
        platformLower.includes('dv360') ||
        platformLower.includes('display & video 360') ||
        platformLower.includes('amazon') ||
        platformLower.includes('programmatic'));
}
