"use strict";
/**
 * Traffic Sheet Writer - Hierarchical Structure Support
 * Writes CampaignLine hierarchy to Excel with proper merging
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCampaignLineToWorksheet = writeCampaignLineToWorksheet;
exports.buildColumnMap = buildColumnMap;
const config_1 = require("./config");
const demographicExtraction_1 = require("./demographicExtraction");
/**
 * Format a date string for traffic sheet display
 * Converts "2025-01-05" → "5-Jan-25"
 */
function formatDateForTrafficSheet(dateStr) {
    if (!dateStr)
        return '';
    try {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = config_1.DATE_CONFIG.MONTH_NAMES[date.getMonth()];
        const year = String(date.getFullYear()).slice(-2);
        return `${day}-${month}-${year}`;
    }
    catch {
        return dateStr;
    }
}
/**
 * Write a single campaign line to the worksheet with proper hierarchical merging
 *
 * Merge levels:
 * - Campaign fields: merge across ALL rows (varies by platform: 5-25 rows)
 * - Ad Group fields: merge across 5 rows (creative lines)
 * - Creative fields: no merging (1 row each)
 *
 * IMPORTANT: This function NO LONGER merges cells directly.
 * Instead, it returns merge information to be applied AFTER borders are set.
 */
function writeCampaignLineToWorksheet(worksheet, campaignLine, startRow, tabName, columnMap, merges = []) {
    const totalRows = campaignLine.adGroups.length * config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;
    console.log(`\n📝 Writing campaign line to ${tabName} starting at row ${startRow}`);
    console.log(`   Platform: ${campaignLine.platform}, Ad Groups: ${campaignLine.adGroups.length}, Total Rows: ${totalRows}`);
    // Get border configuration for this tab
    const borderConfig = config_1.TRAFFIC_SHEET_CONFIG.BORDER_CONFIG[tabName] ||
        config_1.TRAFFIC_SHEET_CONFIG.BORDER_CONFIG['Brand Say Digital'];
    console.log(`\n📋 Writing data for ${tabName} from row ${startRow} to ${startRow + totalRows - 1}`);
    console.log(`   Border range: columns ${borderConfig.start}-${borderConfig.end}`);
    // NOTE: Borders will be applied by FINAL BORDER APPLICATION in generateTrafficSheet.ts
    // This happens AFTER all merging is complete, which ensures borders persist correctly
    // CAMPAIGN-LEVEL FIELDS (merge across ALL rows)
    const campaignFields = getCampaignLevelFields(campaignLine, tabName);
    console.log(`\n🔍 DEBUG: Writing campaign-level fields for ${tabName}:`);
    console.log(`   Campaign fields:`, Object.keys(campaignFields));
    console.log(`   Column map keys:`, Array.from(columnMap.keys()));
    Object.entries(campaignFields).forEach(([fieldName, value]) => {
        const colNumber = columnMap.get(fieldName.toLowerCase());
        console.log(`   Field "${fieldName}" → Column ${colNumber || 'NOT FOUND'} (value: ${value})`);
        if (colNumber) {
            // Only skip if value is undefined or null (empty strings are OK - they should still merge)
            if (value === undefined || value === null) {
                console.log(`   ⏭️  Skipping "${fieldName}" (value is ${value})`);
                return;
            }
            // TRACK merge (don't actually merge yet)
            merges.push({
                startRow: startRow,
                startCol: colNumber,
                endRow: startRow + totalRows - 1,
                endCol: colNumber
            });
            // Set value and alignment on the master cell (top-left of future merge)
            const cell = worksheet.getCell(startRow, colNumber);
            cell.value = value;
            cell.alignment = {
                vertical: 'middle',
                horizontal: 'center',
                wrapText: true
            };
            // Ensure text is not bold
            cell.font = {
                bold: false
            };
            console.log(`   📌 Tracked merge for "${fieldName}" across rows ${startRow}-${startRow + totalRows - 1}`);
        }
        else {
            console.log(`   ⚠️  Column not found for field "${fieldName}"`);
        }
    });
    // AD GROUP and CREATIVE LEVEL FIELDS
    let currentRow = startRow;
    campaignLine.adGroups.forEach((adGroup, adGroupIndex) => {
        const adGroupStartRow = currentRow;
        // AD GROUP-LEVEL FIELDS (merge across 5 creative lines)
        const adGroupFields = getAdGroupLevelFields(adGroup, campaignLine, tabName);
        console.log(`\n🔍 DEBUG: Ad Group ${adGroupIndex + 1} fields for ${tabName}:`);
        console.log(`   Ad group fields:`, Object.keys(adGroupFields));
        console.log(`   adGroup.accuticsCampaignName = "${adGroup.accuticsCampaignName || 'undefined'}"`);
        console.log(`   adGroup.targeting = "${adGroup.targeting || 'undefined'}"`);
        console.log(`   adGroup.target = "${adGroup.target || 'undefined'}"`);
        Object.entries(adGroupFields).forEach(([fieldName, value]) => {
            const colNumber = columnMap.get(fieldName.toLowerCase());
            console.log(`   Field "${fieldName}" → Column ${colNumber || 'NOT FOUND'} (value: "${value}")`);
            if (colNumber) {
                // Only skip if value is undefined or null (empty strings are OK - they should still merge)
                if (value === undefined || value === null) {
                    console.log(`   ⏭️  Skipping "${fieldName}" (value is ${value})`);
                    return;
                }
                // TRACK merge (don't actually merge yet)
                merges.push({
                    startRow: adGroupStartRow,
                    startCol: colNumber,
                    endRow: adGroupStartRow + config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP - 1,
                    endCol: colNumber
                });
                // Set value and alignment on the master cell
                const cell = worksheet.getCell(adGroupStartRow, colNumber);
                cell.value = value;
                cell.alignment = {
                    vertical: 'middle',
                    horizontal: 'center',
                    wrapText: true
                };
                // Ensure text is not bold
                cell.font = {
                    bold: false
                };
                console.log(`   📌 Tracked merge for "${fieldName}" across rows ${adGroupStartRow}-${adGroupStartRow + config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP - 1}`);
            }
            else {
                console.log(`   ⚠️  Column not found for field "${fieldName}"`);
            }
        });
        // CREATIVE-LEVEL FIELDS (no merging, one per row)
        adGroup.creativeLines.forEach((creativeLine, creativeIndex) => {
            const creativeRow = adGroupStartRow + creativeIndex;
            const creativeFields = getCreativeLevelFields(creativeLine, creativeIndex + 1);
            Object.entries(creativeFields).forEach(([fieldName, value]) => {
                const colNumber = columnMap.get(fieldName.toLowerCase());
                if (colNumber && value !== undefined && value !== null) {
                    const cell = worksheet.getCell(creativeRow, colNumber);
                    cell.value = value;
                    // Apply centered alignment with text wrapping
                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'center',
                        wrapText: true
                    };
                    // Ensure text is not bold
                    cell.font = {
                        bold: false
                    };
                }
            });
        });
        currentRow += config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;
    });
    // Note: Borders will be applied BEFORE merging in generateTrafficSheet.ts
    // Merging will happen as the LAST step to ensure borders persist correctly
    return {
        nextRow: startRow + totalRows,
        merges: merges
    };
}
/**
 * Get campaign-level fields based on tab type
 * These fields merge across ALL rows in the campaign line
 */
function getCampaignLevelFields(campaignLine, tabName) {
    const demo = (0, demographicExtraction_1.extractDemographic)(campaignLine.target);
    const startDate = formatDateForTrafficSheet(campaignLine.startDate);
    const endDate = formatDateForTrafficSheet(campaignLine.endDate);

    // Determine buy type based on platform and placements
    let buyType = 'Auction'; // Default for all tactics

    // Check if this is a TikTok Pulse buy
    const isTikTok = campaignLine.platform?.toLowerCase().includes('tiktok') ||
                     campaignLine.platform?.toLowerCase().includes('tik tok');
    const isPulse = campaignLine.placements?.toLowerCase().includes('pulse') ||
                    campaignLine.adGroups.some(ag => ag.placements?.toLowerCase().includes('pulse'));

    if (isTikTok && isPulse) {
        buyType = 'Reach & Frequency';
    } else if (campaignLine.buyType) {
        // Use buyType from blocking chart if provided
        buyType = campaignLine.buyType;
    }

    const baseFields = {
        platform: campaignLine.platform,
        startdate: startDate,
        enddate: endDate,
        objective: campaignLine.objective,
        language: campaignLine.language,
        buytype: buyType, // Merge at campaign level - 'Auction' (default) or 'Reach & Frequency' (TikTok Pulse)
        adsetbudgetifapplicable: 'CBO', // Campaign Budget Optimization - merged at campaign level
    };
    if (tabName === 'Brand Say Digital') {
        // Use placements from first ad group as the tactic, fallback to mediaType if placements not available
        const tacticValue = campaignLine.adGroups[0]?.placements || campaignLine.mediaType || '';
        return {
            ...baseFields,
            demo,
            tactic: tacticValue, // Merge at campaign level - populated from Campaign Details - Placements
            accuticscampaignname: campaignLine.adGroups[0]?.accuticsCampaignName || '', // Merge at campaign level (Column C)
            creativetype: '', // Merge at campaign level (left blank for client input)
            device: '', // Merge at campaign level (left blank for client input)
            geo: '', // Merge at campaign level (left blank for client input)
            // Note: Accutics Ad Set Name is at ad group level, Creative Name left blank for client input
        };
    }
    if (tabName === 'Brand Say Social' || tabName === 'Other Say Social') {
        return {
            ...baseFields,
            campaignnametaxonomyfromaccuitics: campaignLine.adGroups[0]?.placements || '', // Merge at campaign level (Column G) - from Campaign Details - Placements
            // Note: Live Date left blank for activation team input
            traffickignotes: [campaignLine.tagsRequired, campaignLine.adGroups[0]?.measurement]
                .filter(Boolean)
                .join('\n'),
        };
    }
    return baseFields;
}
/**
 * Get ad group-level fields based on tab type
 * These fields merge across 5 creative lines
 */
function getAdGroupLevelFields(adGroup, campaignLine, tabName) {
    // Determine placements based on platform for social tabs
    let placementsValue = adGroup.placements;
    if (tabName === 'Brand Say Social' || tabName === 'Other Say Social') {
        const platform = (campaignLine.platform || '').toLowerCase();
        if (platform.includes('tiktok') || platform.includes('tik tok')) {
            // TikTok: Use "In Feed"
            placementsValue = 'In Feed';
        }
        else if (platform.includes('meta') || platform.includes('facebook') || platform.includes('instagram')) {
            // Meta: Use "Feed | Stories | Reels"
            placementsValue = 'Feed | Stories | Reels';
        }
        else if (platform.includes('pinterest') || platform.includes('pin')) {
            // Pinterest: Use Ad Format from blocking chart
            placementsValue = adGroup.creativeLines[0]?.adFormat || adGroup.placements;
        }
        else {
            // All other platforms: Use Ad Format from blocking chart
            placementsValue = adGroup.creativeLines[0]?.adFormat || adGroup.placements;
        }
    }
    const baseFields = {
        placements: placementsValue,
        optimizationevent: 'Lowest Cost', // Always set to "Lowest Cost" for social tabs
        kpimetric: adGroup.kpi,
    };
    if (tabName === 'Brand Say Digital') {
        return {
            ...baseFields,
            audience: adGroup.targeting || adGroup.target,
            accuticsadsetname: adGroup.accuticsCampaignName || '', // Merge across 5 creative lines (Column H)
            // Note: Creative Name left blank for client input
        };
    }
    if (tabName === 'Brand Say Social' || tabName === 'Other Say Social') {
        return {
            ...baseFields,
            audience: adGroup.targeting || adGroup.target,
            adsetnametaxonomyfromaccuitics: adGroup.accuticsCampaignName || '', // Merge across 5 creative lines (Column I)
            targetingsummary: '', // Merge across 5 creative lines (Column K) - left blank for client input
            // Note: Ad Name left blank for client input
        };
    }
    return baseFields;
}
/**
 * Get creative-level fields
 * These fields are unique per row (no merging)
 * Most creative fields are left BLANK for client/agency input
 */
function getCreativeLevelFields(creativeLine, creativeNumber) {
    // All creative fields (Creative Name, Link to Creative, Post Copy, etc.) are left blank
    // Client or creative agency fills these in manually
    return {
    // creativetype: creativeLine.adFormat, // Only if we want to pre-populate
    // Everything else left blank for manual input
    };
}
/**
 * Build column mapping for a specific tab
 * Maps field names to column numbers in the worksheet
 */
function buildColumnMap(worksheet, headerRowNumber = 8) {
    const map = new Map();
    const headerRow = worksheet.getRow(headerRowNumber);
    headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
        const headerValue = cell.value ? String(cell.value).toLowerCase().trim() : '';
        if (headerValue) {
            // Normalize header: remove spaces, special chars
            const normalized = headerValue.replace(/[^a-z0-9]+/g, '');
            map.set(normalized, colNumber);
            // Also map with spaces removed but preserve case variations
            const spacesRemoved = headerValue.replace(/\s+/g, '');
            map.set(spacesRemoved, colNumber);
        }
    });
    console.log(`📋 Column map for row ${headerRowNumber}:`, Array.from(map.keys()).join(', '));
    return map;
}
