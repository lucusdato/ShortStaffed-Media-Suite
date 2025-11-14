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
export declare function getTrafficSheetTab(platform: string, channel?: string, adFormat?: string): TrafficSheetTab;
/**
 * Get platform category for internal logic
 *
 * @param platform - Platform name from blocking chart
 * @returns Platform category
 */
export declare function getPlatformCategory(platform: string): PlatformCategory;
/**
 * Determine default placements based on platform
 * Used when placements field is empty in blocking chart
 *
 * @param platform - Platform name from blocking chart
 * @param defaultValue - Fallback value if no platform-specific default exists
 * @returns Platform-appropriate placement string
 */
export declare function getDefaultPlacements(platform: string, defaultValue?: string): string;
/**
 * Check if a channel should be excluded from traffic sheet
 * (OOH, TV, Radio, Print are planning-only channels)
 *
 * @param channel - Channel name from blocking chart
 * @returns True if channel should be excluded
 */
export declare function isExcludedChannel(channel: string): boolean;
/**
 * Get exclusion reason for excluded channels
 *
 * @param channel - Channel name from blocking chart
 * @returns Exclusion reason string or undefined
 */
export declare function getExclusionReason(channel: string): string | undefined;
/**
 * Check if platform is a social platform
 *
 * @param platform - Platform name from blocking chart
 * @returns True if platform is social
 */
export declare function isSocialPlatform(platform: string): boolean;
/**
 * Check if platform is programmatic/digital
 *
 * @param platform - Platform name from blocking chart
 * @returns True if platform is programmatic
 */
export declare function isProgrammaticPlatform(platform: string): boolean;
//# sourceMappingURL=PlatformClassifier.d.ts.map