import ExcelJS from "exceljs";
import { ParsedBlockingChart, ParsedBlockingChartRow, CampaignLine, AdGroup, CreativeLine } from "./types";
import { PARSING_CONFIG, UNIFIED_TEMPLATE_CONFIG, ROW_EXPANSION_CONFIG, CATEGORIZATION_CONFIG } from "./config";
import { validateBlockingChart, formatValidationErrors } from "./validation";

/**
 * Determines the number of ad groups for a campaign line based on platform and media type
 */
function getAdGroupCount(
  platform: string | undefined,
  mediaType: string | undefined,
  hasBothDisplayAndVideo: boolean
): number {
  const platformLower = (platform || '').toLowerCase();
  const mediaTypeLower = (mediaType || '').toLowerCase();

  // Check if programmatic platform
  const isProgrammatic = ROW_EXPANSION_CONFIG.AD_GROUP_RULES.PROGRAMMATIC.PLATFORMS.some(
    p => platformLower.includes(p.toLowerCase())
  );

  if (isProgrammatic) {
    const isDisplay = mediaTypeLower.includes('display');
    const isVideo = mediaTypeLower.includes('video');

    if (hasBothDisplayAndVideo) {
      if (isDisplay) return ROW_EXPANSION_CONFIG.AD_GROUP_RULES.PROGRAMMATIC.DISPLAY_WITH_VIDEO;
      if (isVideo) return ROW_EXPANSION_CONFIG.AD_GROUP_RULES.PROGRAMMATIC.VIDEO_WITH_DISPLAY;
    } else {
      // Only display or only video exists in blocking chart
      if (isDisplay) return ROW_EXPANSION_CONFIG.AD_GROUP_RULES.PROGRAMMATIC.DISPLAY_ONLY;
      if (isVideo) return ROW_EXPANSION_CONFIG.AD_GROUP_RULES.PROGRAMMATIC.VIDEO_ONLY;
    }
  }

  // Check if Meta
  const isMeta = ROW_EXPANSION_CONFIG.AD_GROUP_RULES.META.PLATFORMS.some(
    p => platformLower.includes(p.toLowerCase())
  );
  if (isMeta) return ROW_EXPANSION_CONFIG.AD_GROUP_RULES.META.AD_GROUPS;

  // Check if other social
  const isOtherSocial = ROW_EXPANSION_CONFIG.AD_GROUP_RULES.OTHER_SOCIAL.PLATFORMS.some(
    p => platformLower.includes(p.toLowerCase())
  );
  if (isOtherSocial) return ROW_EXPANSION_CONFIG.AD_GROUP_RULES.OTHER_SOCIAL.AD_GROUPS;

  // Check if non-programmatic display or audio
  const isDisplayAudio = ROW_EXPANSION_CONFIG.AD_GROUP_RULES.DISPLAY_AUDIO.MEDIA_TYPES.some(
    mt => mediaTypeLower.includes(mt.toLowerCase())
  );
  if (isDisplayAudio && !isProgrammatic) {
    return ROW_EXPANSION_CONFIG.AD_GROUP_RULES.DISPLAY_AUDIO.AD_GROUPS;
  }

  // Default
  return ROW_EXPANSION_CONFIG.AD_GROUP_RULES.DEFAULT.AD_GROUPS;
}

/**
 * Detects if a campaign line should be excluded from traffic sheet generation
 * Checks channel, platform, placements, and ad format against excluded keywords
 * Returns { isExcluded: boolean, reason?: string }
 */
function detectExcludedChannel(
  channel: string,
  platform: string,
  placements: string | undefined,
  adFormat: string | undefined
): { isExcluded: boolean; reason?: string } {
  const channelLower = channel.toLowerCase();
  const platformLower = platform.toLowerCase();
  const placementsLower = (placements || '').toLowerCase();
  const adFormatLower = (adFormat || '').toLowerCase();

  // Check all fields against each excluded channel category
  const excludedCategories = CATEGORIZATION_CONFIG.EXCLUDED_CHANNEL_KEYWORDS;

  // Check OOH
  for (const keyword of excludedCategories.OOH) {
    if (channelLower.includes(keyword) ||
        platformLower.includes(keyword) ||
        placementsLower.includes(keyword) ||
        adFormatLower.includes(keyword)) {
      return { isExcluded: true, reason: 'OOH' };
    }
  }

  // Check TV (but exclude CTV/Connected TV which are digital)
  for (const keyword of excludedCategories.TV) {
    if ((channelLower.includes(keyword) ||
         platformLower.includes(keyword) ||
         placementsLower.includes(keyword) ||
         adFormatLower.includes(keyword)) &&
        !channelLower.includes('ctv') &&
        !channelLower.includes('connected tv') &&
        !platformLower.includes('ctv') &&
        !platformLower.includes('connected tv')) {
      return { isExcluded: true, reason: 'TV' };
    }
  }

  // Check Radio
  for (const keyword of excludedCategories.RADIO) {
    if (channelLower.includes(keyword) ||
        platformLower.includes(keyword) ||
        placementsLower.includes(keyword) ||
        adFormatLower.includes(keyword)) {
      return { isExcluded: true, reason: 'Radio' };
    }
  }

  // Check Print
  for (const keyword of excludedCategories.PRINT) {
    if (channelLower.includes(keyword) ||
        platformLower.includes(keyword) ||
        placementsLower.includes(keyword) ||
        adFormatLower.includes(keyword)) {
      return { isExcluded: true, reason: 'Print' };
    }
  }

  return { isExcluded: false };
}

/**
 * Checks if blocking chart has both programmatic display AND video
 */
function hasBothProgrammaticDisplayAndVideo(rows: ParsedBlockingChartRow[]): boolean {
  let hasDisplay = false;
  let hasVideo = false;

  rows.forEach(row => {
    const platform = typeof row.platform === 'string' ? row.platform : '';
    const platformLower = platform.toLowerCase();
    const mediaType = typeof row.mediaType === 'string' ? row.mediaType : '';
    const mediaTypeLower = mediaType.toLowerCase();

    const isProgrammatic = ROW_EXPANSION_CONFIG.AD_GROUP_RULES.PROGRAMMATIC.PLATFORMS.some(
      p => platformLower.includes(p.toLowerCase())
    );

    if (isProgrammatic) {
      if (mediaTypeLower.includes('display')) hasDisplay = true;
      if (mediaTypeLower.includes('video')) hasVideo = true;
    }
  });

  return hasDisplay && hasVideo;
}

/**
 * Builds hierarchical campaign line structure from flat rows
 */
function buildCampaignLines(
  rows: ParsedBlockingChartRow[],
  campaignLineMerges: Map<number, number>
): CampaignLine[] {
  const campaignLines: CampaignLine[] = [];

  // Check if blocking chart has both programmatic display and video
  const hasBothProgDisplayVideo = hasBothProgrammaticDisplayAndVideo(rows);
  console.log(`\n=== HIERARCHICAL STRUCTURE BUILDING ===`);
  console.log(`Programmatic display AND video both exist: ${hasBothProgDisplayVideo}`);

  // Group rows by campaign line master row
  const rowsByCampaignLine = new Map<number, ParsedBlockingChartRow[]>();

  rows.forEach(row => {
    if (row._campaignLineMasterRow !== undefined) {
      if (!rowsByCampaignLine.has(row._campaignLineMasterRow)) {
        rowsByCampaignLine.set(row._campaignLineMasterRow, []);
      }
      rowsByCampaignLine.get(row._campaignLineMasterRow)!.push(row);
    }
  });

  // Build campaign line hierarchy
  rowsByCampaignLine.forEach((campaignRows, masterRow) => {
    const firstRow = campaignRows[0];
    const span = firstRow._mergeSpan || 1;

    // Determine ad group count for this campaign line
    const platform = typeof firstRow.platform === 'string' ? firstRow.platform : undefined;
    const mediaType = typeof firstRow.mediaType === 'string' ? firstRow.mediaType : undefined;
    const adGroupCount = getAdGroupCount(
      platform,
      mediaType,
      hasBothProgDisplayVideo
    );

    // Build ad groups
    const adGroups: AdGroup[] = [];
    for (let i = 0; i < adGroupCount; i++) {
      const creativeLines: CreativeLine[] = [];

      // Create 5 creative lines per ad group
      for (let j = 0; j < ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP; j++) {
        creativeLines.push({
          creativeName: undefined,
          creativeFormat: undefined,
          adFormat: firstRow.adFormat,
        });
      }

      const targetingValue = firstRow.targeting || firstRow.target;
      adGroups.push({
        accuticsCampaignName: typeof firstRow.accuticsCampaignName === 'string' ? firstRow.accuticsCampaignName : undefined,
        targeting: typeof targetingValue === 'string' ? targetingValue : undefined,
        target: typeof firstRow.target === 'string' ? firstRow.target : undefined,
        kpi: typeof firstRow.kpi === 'string' ? firstRow.kpi : undefined,
        kpiValue: firstRow.kpiValue,
        placements: typeof firstRow.placements === 'string' ? firstRow.placements : undefined,
        buyType: typeof firstRow.buyType === 'string' ? firstRow.buyType : undefined,
        measurement: typeof firstRow.measurement === 'string' ? firstRow.measurement : undefined,
        creativeLines,
      });
    }

    // Check if this campaign line should be excluded (non-digital channels)
    const channel = typeof firstRow.channel === 'string' ? firstRow.channel : '';
    const placementsForCheck = typeof firstRow.placements === 'string' ? firstRow.placements : undefined;
    const adFormat = typeof firstRow.adFormat === 'string' ? firstRow.adFormat : undefined;

    const exclusionCheck = detectExcludedChannel(channel, platform || '', placementsForCheck, adFormat);

    // Build campaign line
    const campaignLine: CampaignLine = {
      channel,
      platform: platform || '',
      mediaType: typeof firstRow.mediaType === 'string' ? firstRow.mediaType : undefined,
      objective: typeof firstRow.objective === 'string' ? firstRow.objective : '',
      language: typeof firstRow.language === 'string' ? firstRow.language : undefined,
      target: typeof firstRow.target === 'string' ? firstRow.target : undefined,  // Add target field for DEMO extraction
      startDate: typeof firstRow.startDate === 'string' ? firstRow.startDate : '',
      endDate: typeof firstRow.endDate === 'string' ? firstRow.endDate : '',
      grossBudget: typeof firstRow.grossBudget === 'number' ? firstRow.grossBudget : undefined,
      netBudget: typeof firstRow.netBudget === 'number' ? firstRow.netBudget : undefined,
      estImpressions: typeof firstRow.estImpressions === 'number' ? firstRow.estImpressions : undefined,
      estCpm: typeof firstRow.estCpm === 'number' ? firstRow.estCpm : undefined,
      adServing: typeof firstRow.adServing === 'number' ? firstRow.adServing : undefined,
      dvCost: typeof firstRow.dvCost === 'number' ? firstRow.dvCost : undefined,
      buffer: typeof firstRow.buffer === 'number' ? firstRow.buffer : undefined,
      tagsRequired: typeof firstRow.tagsRequired === 'string' ? firstRow.tagsRequired : undefined,
      isExcluded: exclusionCheck.isExcluded,
      excludedReason: exclusionCheck.reason,
      adGroups,
      _sourceRowNumbers: campaignRows.map((_, idx) => masterRow + idx),
      _mergeSpan: span,
    };

    const totalRows = adGroupCount * ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;

    if (exclusionCheck.isExcluded) {
      console.log(`Campaign Line (row ${masterRow}): ${firstRow.platform} - ⛔ EXCLUDED (${exclusionCheck.reason}) - Will appear in verification but NOT in traffic sheet`);
    } else {
      console.log(`Campaign Line (row ${masterRow}): ${firstRow.platform} - ${adGroupCount} ad groups × 5 creatives = ${totalRows} traffic sheet rows`);
    }

    campaignLines.push(campaignLine);
  });

  console.log(`\nTotal campaign lines with hierarchy: ${campaignLines.length}`);
  return campaignLines;
}

/**
 * Detects campaign lines by identifying budget/impressions/placements triple-merge groups
 * VALIDATION RULE: All three columns must be merged across the same rows
 * Filters out total/summary rows and section headers
 * Returns map of master row number → merge span
 */
function detectCampaignLineMerges(
  worksheet: ExcelJS.Worksheet,
  budgetColIndex: number,
  impressionsColIndex: number,
  placementsColIndex: number,
  headerRowIndex: number,
  headers: string[]
): Map<number, number> {
  const campaignLineMerges = new Map<number, number>();
  const merges = (worksheet as any)._merges || {};

  console.log(`\n=== CAMPAIGN LINE DETECTION ===`);
  console.log(`Budget column: ${budgetColIndex + 1}, Impressions column: ${impressionsColIndex + 1}, Placements column: ${placementsColIndex + 1}`);

  // Helper function to check if a row is a total/summary row or section header
  const isTotalOrHeaderRow = (row: ExcelJS.Row): boolean => {
    // Check Channel column (index 0), Platform column (index 1), and Placements column
    const channelCell = row.getCell(1);
    const platformCell = row.getCell(2);
    const placementsCell = row.getCell(placementsColIndex + 1);

    const channelValue = String(getCellValue(channelCell) || '').toLowerCase().trim();
    const platformValue = String(getCellValue(platformCell) || '').toLowerCase().trim();
    const placementsValue = String(getCellValue(placementsCell) || '').toLowerCase().trim();

    // Total row patterns
    const totalPatterns = [
      'total',
      'grand total',
      'subtotal',
      'sum',
      'variance',
      'summary'
    ];

    // Section header patterns (these introduce a new channel section)
    const sectionHeaderPatterns = [
      'social',
      'paid social',
      'programmatic',
      'programmatic display',
      'programmatic video',
      'youtube',
      'ctv',
      'display',
      'video',
      'audio',
      'digital video',
      'digital display',
      'digital audio'
    ];

    // Check if channel, platform, or placements contains total patterns
    const isTotal = totalPatterns.some(pattern =>
      channelValue.includes(pattern) ||
      platformValue.includes(pattern) ||
      placementsValue.includes(pattern)
    );

    // CRITICAL FIX: Check if row has actual campaign tactic details before treating as valid
    // A valid campaign line must have:
    // 1. Budget AND Impressions
    // 2. At least ONE of: Buy Type, Objective, or Language (proves it's a real tactic, not a total row)
    const budgetCell = row.getCell(budgetColIndex + 1);
    const impressionsCell = row.getCell(impressionsColIndex + 1);
    const budgetValue = getCellValue(budgetCell);
    const impressionsValue = getCellValue(impressionsCell);
    const hasBothBudgetAndImpressions = budgetValue && impressionsValue;

    if (hasBothBudgetAndImpressions) {
      // Check for campaign detail columns (Buy Type=col 3, Objective=col 4, Language=col 9)
      const buyTypeCell = row.getCell(4); // Column index 3 (0-based) = Buy Type
      const objectiveCell = row.getCell(5); // Column index 4 = Objective
      const languageCell = row.getCell(10); // Column index 9 = Language

      const buyTypeValue = String(getCellValue(buyTypeCell) || '').trim();
      const objectiveValue = String(getCellValue(objectiveCell) || '').trim();
      const languageValue = String(getCellValue(languageCell) || '').trim();

      // Check if any of the detail columns contain "TOTAL" - if so, it's a total row
      const buyTypeLower = buyTypeValue.toLowerCase();
      const objectiveLower = objectiveValue.toLowerCase();
      const languageLower = languageValue.toLowerCase();

      const containsTotal = buyTypeLower.includes('total') ||
                           objectiveLower.includes('total') ||
                           languageLower.includes('total');

      const hasCampaignDetails = (buyTypeValue || objectiveValue || languageValue) && !containsTotal;

      console.log(`  🔍 Row has budget ($${budgetValue}) AND impressions (${impressionsValue})`);
      console.log(`     Buy Type: "${buyTypeValue}", Objective: "${objectiveValue}", Language: "${languageValue}"`);
      console.log(`     Contains "TOTAL"? ${containsTotal}`);
      console.log(`     Has valid campaign details? ${hasCampaignDetails}`);

      if (hasCampaignDetails) {
        console.log(`  ✅ Valid campaign line (has budget+impressions+details)`);
        return false; // This is a valid campaign line
      } else {
        console.log(`  ⚠️  Has budget+impressions but NO valid campaign details (or contains TOTAL) - likely a TOTAL row`);
        return true; // This is a total row, not a campaign line
      }
    }

    // Now check patterns only if budget/impressions check didn't confirm it's a campaign line
    // Check if this is ONLY a section header (exact match, no additional content)
    const isSectionHeader = sectionHeaderPatterns.some(pattern =>
      channelValue === pattern || platformValue === pattern
    );

    // Check if BOTH channel AND platform are empty but placements has a value
    const isEmptyChannelPlatform = !channelValue && !platformValue && placementsValue;

    if (isEmptyChannelPlatform) {
      console.log(`  🔍 Row has empty channel/platform but placements="${placementsValue}" and missing budget/impressions - likely a total row`);
      return true; // IS a total row
    }

    const result = isTotal || isSectionHeader;
    if (result) {
      console.log(`  🔍 Returning true (is total/header): isTotal=${isTotal}, isSectionHeader=${isSectionHeader}`);
    }
    return result;
  };

  // Find all merge ranges for budget, impressions, and placements columns
  const budgetMerges: { startRow: number; endRow: number; span: number }[] = [];
  const impressionsMerges: { startRow: number; endRow: number; span: number }[] = [];
  const placementsMerges: { startRow: number; endRow: number; span: number }[] = [];

  console.log(`🔍 DEBUG: Total merge keys found: ${Object.keys(merges).length}`);
  console.log(`🔍 DEBUG: Sample merge keys:`, Object.keys(merges).slice(0, 5));
  console.log(`🔍 DEBUG: budgetColIndex=${budgetColIndex}, impressionsColIndex=${impressionsColIndex}, placementsColIndex=${placementsColIndex}`);

  // Debug: Check what a merge value looks like
  const firstKey = Object.keys(merges)[0];
  if (firstKey) {
    console.log(`🔍 DEBUG: First merge - key="${firstKey}", value=`, merges[firstKey]);
    console.log(`🔍 DEBUG: First merge toString():`, merges[firstKey].toString());
  }

  Object.keys(merges).forEach(key => {
    const mergeRange = merges[key].toString();
    const [start, end] = mergeRange.split(':');

    const startCol = start.replace(/[0-9]/g, '');
    const startRow = parseInt(start.replace(/[A-Z]/g, ''));
    const endRow = parseInt(end.replace(/[A-Z]/g, ''));
    const span = endRow - startRow + 1;

    // Convert column letter to index
    const colIndex = startCol.split('').reduce((acc: number, char: string) => acc * 26 + char.charCodeAt(0) - 65, 0);

    // Debug: Log ALL merges with budget column info
    if (startRow > headerRowIndex) {
      if (colIndex === budgetColIndex) {
        console.log(`  🎯 BUDGET COL MERGE: ${mergeRange} → rows ${startRow}-${endRow} (span: ${span})`);
      }
    }

    if (colIndex === budgetColIndex && startRow > headerRowIndex) {
      console.log(`     ✅ BUDGET MERGE DETECTED: rows ${startRow}-${endRow}`);
      budgetMerges.push({ startRow, endRow, span });
    }
    if (colIndex === impressionsColIndex && startRow > headerRowIndex) {
      impressionsMerges.push({ startRow, endRow, span });
    }
    if (colIndex === placementsColIndex && startRow > headerRowIndex) {
      placementsMerges.push({ startRow, endRow, span });
    }
  });

  console.log(`Budget merges found: ${budgetMerges.length}`);
  console.log(`Impressions merges found: ${impressionsMerges.length}`);
  // Only log unique impressions merges (deduplicate by startRow)
  const uniqueImpressionsMerges = Array.from(
    new Map(impressionsMerges.map(im => [im.startRow, im])).values()
  );
  uniqueImpressionsMerges.forEach(im => {
    console.log(`  Impressions merge: rows ${im.startRow}-${im.endRow} (span: ${im.span})`);
  });
  console.log(`Placements merges found: ${placementsMerges.length}`);
  // Only log unique placements merges
  const uniquePlacementsMerges = Array.from(
    new Map(placementsMerges.map(pm => [pm.startRow, pm])).values()
  );
  uniquePlacementsMerges.forEach(pm => {
    console.log(`  Placements merge: rows ${pm.startRow}-${pm.endRow} (span: ${pm.span})`);
  });

  // TRIPLE VALIDATION: Match budget, impressions, AND placements merges
  // All three must align (same start row, same span) to be a valid campaign line
  budgetMerges.forEach(budgetMerge => {
    const matchingImpressionsMerge = impressionsMerges.find(
      im => im.startRow === budgetMerge.startRow && im.span === budgetMerge.span
    );

    const matchingPlacementsMerge = placementsMerges.find(
      pm => pm.startRow === budgetMerge.startRow && pm.span === budgetMerge.span
    );

    if (matchingImpressionsMerge && matchingPlacementsMerge) {
      // Check if this is a total or header row
      const row = worksheet.getRow(budgetMerge.startRow);
      if (isTotalOrHeaderRow(row)) {
        console.log(`  ⏭️  Skipping row ${budgetMerge.startRow}: Total/summary/header row detected`);
        return;
      }

      campaignLineMerges.set(budgetMerge.startRow, budgetMerge.span);
      console.log(`  ✓ Campaign line: rows ${budgetMerge.startRow}-${budgetMerge.endRow} (span: ${budgetMerge.span})`);
    } else {
      console.warn(`  ⚠ Skipping row ${budgetMerge.startRow}: Budget merge exists but missing ${!matchingImpressionsMerge ? 'impressions' : ''} ${!matchingPlacementsMerge ? 'placements' : ''} merge`);
    }
  });

  // SPECIAL CASE: Impressions merged but Budget NOT merged (e.g., Meta campaigns)
  // In this case, budget values are REPEATED (not merged in Excel) but should be treated as one campaign line
  // We use IMPRESSIONS + BUDGET matching, ignoring placements (which can span multiple tactics)
  impressionsMerges.forEach(impressionsMerge => {
    // Skip if already processed as a budget merge
    if (campaignLineMerges.has(impressionsMerge.startRow)) return;

    // Check if budget values are identical across this span
    const budgetValues: (number | string | null)[] = [];
    let allBudgetsIdentical = true;
    let firstBudgetValue: number | string | null = null;

    for (let r = impressionsMerge.startRow; r <= impressionsMerge.endRow; r++) {
      const row = worksheet.getRow(r);
      const budgetCell = row.getCell(budgetColIndex + 1);
      const budgetValue = getCellValue(budgetCell);
      budgetValues.push(budgetValue);

      if (firstBudgetValue === null) {
        firstBudgetValue = budgetValue;
      } else if (budgetValue !== firstBudgetValue) {
        allBudgetsIdentical = false;
        break;
      }
    }

    if (allBudgetsIdentical && firstBudgetValue !== null) {
      // Check if this is a total or header row
      const row = worksheet.getRow(impressionsMerge.startRow);
      if (isTotalOrHeaderRow(row)) {
        console.log(`  ⏭️  Skipping row ${impressionsMerge.startRow}: Total/summary/header row detected`);
        return;
      }

      campaignLineMerges.set(impressionsMerge.startRow, impressionsMerge.span);
      console.log(`  ✓ Campaign line: rows ${impressionsMerge.startRow}-${impressionsMerge.endRow} (span: ${impressionsMerge.span}) [Budget values repeated, not merged]`);
    } else {
      console.log(`  ⏭️  Skipping impressions merge at row ${impressionsMerge.startRow}: Budget values differ across span`);
    }
  });

  // Also check for standalone rows (no merges but all three fields present)
  // IMPORTANT: Stop processing once we hit the first total row
  let hitTotalRow = false;
  let consecutiveDataRows = 0;
  let lastDataRowNumber = 0;

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber <= headerRowIndex) return;
    if (hitTotalRow) return; // Stop processing after first total row

    const budgetCell = row.getCell(budgetColIndex + 1);
    const impressionsCell = row.getCell(impressionsColIndex + 1);
    const placementsCell = row.getCell(placementsColIndex + 1);

    const budgetValue = getCellValue(budgetCell);
    const impressionsValue = getCellValue(impressionsCell);
    const placementsValue = getCellValue(placementsCell);

    // DEBUG: Specifically log rows 48, 49, and 57 to understand why they're not detected
    if (rowNumber === 48 || rowNumber === 49 || rowNumber === 57) {
      const channelCell = row.getCell(1);
      const platformCell = row.getCell(2);
      const channelValue = getCellValue(channelCell);
      const platformValue = getCellValue(platformCell);

      console.log(`\n🔍 DEBUGGING ROW ${rowNumber}:`);
      console.log(`   Channel value: "${channelValue}" (type: ${typeof channelValue})`);
      console.log(`   Platform value: "${platformValue}" (type: ${typeof platformValue})`);
      console.log(`   Budget value: ${budgetValue} (type: ${typeof budgetValue})`);
      console.log(`   Impressions value: ${impressionsValue} (type: ${typeof impressionsValue})`);
      console.log(`   Placements value: ${placementsValue} (type: ${typeof placementsValue})`);
      console.log(`   Already in campaignLineMerges? ${campaignLineMerges.has(rowNumber)}`);

      const isPartOfMerge = Array.from(campaignLineMerges.entries()).some(
        ([masterRow, span]) => rowNumber >= masterRow && rowNumber < masterRow + span
      );
      console.log(`   Part of existing merge? ${isPartOfMerge}`);

      if (isPartOfMerge) {
        const mergeInfo = Array.from(campaignLineMerges.entries()).find(
          ([masterRow, span]) => rowNumber >= masterRow && rowNumber < masterRow + span
        );
        if (mergeInfo) {
          console.log(`   → Part of merge starting at row ${mergeInfo[0]} (span: ${mergeInfo[1]})`);
        }
      }

      if (budgetValue && impressionsValue && placementsValue) {
        console.log(`   Has all three values ✓`);
        const isTotalRow = isTotalOrHeaderRow(row);
        console.log(`   isTotalOrHeaderRow() returned: ${isTotalRow}`);
        if (isTotalRow) {
          console.log(`   → Detected as TOTAL/HEADER row (will be skipped)`);
        } else {
          console.log(`   → Should be detected as campaign line`);
        }
      } else {
        console.log(`   Missing required values:`);
        if (!budgetValue) console.log(`     - Missing budget`);
        if (!impressionsValue) console.log(`     - Missing impressions`);
        if (!placementsValue) console.log(`     - Missing placements`);
      }
      console.log('');
    }

    // If row has all three values and is NOT already in a merge group, it's a standalone campaign line
    if (budgetValue && impressionsValue && placementsValue && !campaignLineMerges.has(rowNumber)) {
      const isPartOfExistingMerge = Array.from(campaignLineMerges.entries()).some(
        ([masterRow, span]) => rowNumber >= masterRow && rowNumber < masterRow + span
      );

      if (!isPartOfExistingMerge) {
        // Check if this is a total or header row
        if (isTotalOrHeaderRow(row)) {
          console.log(`  ⏭️  Skipping row ${rowNumber}: Total/summary/header row detected - STOPPING processing`);
          hitTotalRow = true; // Stop processing all subsequent rows
          return;
        }

        campaignLineMerges.set(rowNumber, 1);
        console.log(`  ✓ Campaign line: row ${rowNumber} (standalone, span: 1)`);
        lastDataRowNumber = rowNumber;
        consecutiveDataRows++;
      }
    }
  });

  console.log(`Total valid campaign lines detected: ${campaignLineMerges.size}`);
  return campaignLineMerges;
}

/**
 * Parses a blocking chart Excel file and extracts hierarchical campaign line data
 * Campaign lines are identified by budget/impressions merge groups
 * Each campaign line expands to 3 ad groups × 5 creative lines = 15 traffic sheet rows
 */
export async function parseBlockingChart(
  fileBuffer: ArrayBuffer
): Promise<ParsedBlockingChart> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(fileBuffer);

  // Get the first worksheet
  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error("No worksheet found in the Excel file");
  }

  const rows: ParsedBlockingChartRow[] = [];
  let headers: string[] = [];
  let headerRow: ExcelJS.Row | null = null;
  let headerRowIndex = -1;

  // Find the header row - look for row with required keywords
  worksheet.eachRow((row, rowNumber) => {
    if (headerRowIndex !== -1) return; // Already found

    const values = row.values as any[];
    const nonEmptyCount = values.filter((v) => v !== null && v !== undefined && v !== "").length;

    if (nonEmptyCount >= PARSING_CONFIG.MIN_HEADER_CELLS) {
      // Extract potential headers
      const potentialHeaders: string[] = [];
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const value = getCellValue(cell);
        potentialHeaders[colNumber - 1] = value ? String(value).trim() : `Column${colNumber}`;
      });

      // Check if this row has required header keywords
      const normalizedHeaders = potentialHeaders.map(h => h.toLowerCase());
      const hasRequiredKeywords = PARSING_CONFIG.REQUIRED_HEADER_KEYWORDS.every(keyword =>
        normalizedHeaders.some(h => h.includes(keyword))
      );

      if (hasRequiredKeywords) {
        headerRowIndex = rowNumber;
        headerRow = row;
        headers = potentialHeaders;
        console.log(`✓ Found header row at row ${rowNumber}`);
      }
    }
  });

  if (!headerRow || headerRowIndex === -1) {
    throw new Error("Could not find header row in blocking chart");
  }

  console.log(`📊 Using Unified Unilever Template (2025 Standard)`);
  console.log(`📋 Headers found: ${headers.filter(h => h).join(', ')}`);

  // Detect the budget column for campaign line detection (using exact matches)
  const budgetColumnIndex = headers.findIndex(h => {
    const trimmed = h.trim();
    return PARSING_CONFIG.BUDGET_COLUMN_NAMES.some(
      budgetName => trimmed === budgetName
    );
  });

  // Detect the impressions column for campaign line detection
  const impressionsColumnIndex = headers.findIndex(h => {
    const trimmed = h.trim();
    return PARSING_CONFIG.IMPRESSIONS_COLUMN_NAMES.some(
      impName => trimmed === impName
    );
  });

  // Detect the placements column for campaign line detection
  const placementsColumnIndex = headers.findIndex(h => {
    const trimmed = h.trim();
    return trimmed === UNIFIED_TEMPLATE_CONFIG.COLUMNS.PLACEMENTS;
  });

  if (budgetColumnIndex === -1) {
    throw new Error(`Budget column not found. Expected one of: ${PARSING_CONFIG.BUDGET_COLUMN_NAMES.join(', ')}`);
  }

  if (impressionsColumnIndex === -1) {
    throw new Error(`Impressions column not found. Expected one of: ${PARSING_CONFIG.IMPRESSIONS_COLUMN_NAMES.join(', ')}`);
  }

  if (placementsColumnIndex === -1) {
    throw new Error(`Placements column not found. Expected: "${UNIFIED_TEMPLATE_CONFIG.COLUMNS.PLACEMENTS}"`);
  }

  console.log(`💰 Budget column: Index ${budgetColumnIndex}, Header: "${headers[budgetColumnIndex]}"`);
  console.log(`📊 Impressions column: Index ${impressionsColumnIndex}, Header: "${headers[impressionsColumnIndex]}"`);
  console.log(`📍 Placements column: Index ${placementsColumnIndex}, Header: "${headers[placementsColumnIndex]}"`);

  // Detect campaign line merge groups (requires all 3 columns to be merged together)
  const campaignLineMerges = detectCampaignLineMerges(
    worksheet,
    budgetColumnIndex,
    impressionsColumnIndex,
    placementsColumnIndex,
    headerRowIndex,
    headers
  );

  // Parse data rows using unified template field mappings
  worksheet.eachRow((row, rowNumber) => {
    // Skip header row and rows before it
    if (rowNumber <= headerRowIndex) return;

    const rowData: ParsedBlockingChartRow = {};
    let hasData = false;

    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      const value = getCellValue(cell);
      const header = headers[colNumber - 1] || `Column${colNumber}`;

      if (value !== null && value !== undefined && value !== "") {
        hasData = true;

        // Use unified template mapping
        const fieldName = UNIFIED_TEMPLATE_CONFIG.FIELD_MAPPINGS[header as keyof typeof UNIFIED_TEMPLATE_CONFIG.FIELD_MAPPINGS]
                          || normalizeHeaderName(header);

        (rowData as any)[fieldName] = value;
      }
    });

    // Store merge span from campaign line detection
    const campaignLineMerge = Array.from(campaignLineMerges.entries()).find(
      ([masterRow, span]) => rowNumber >= masterRow && rowNumber < masterRow + span
    );

    if (campaignLineMerge) {
      const [masterRow, span] = campaignLineMerge;
      rowData._mergeSpan = span;
      rowData._campaignLineMasterRow = masterRow;
    }

    // Only add rows that have at least some data
    if (hasData) {
      rows.push(rowData);
    }
  });

  // Try to extract metadata from the top of the sheet
  const metadata = extractMetadata(worksheet, headerRowIndex);

  // Summary of campaign line detection with budget values
  console.log(`\n📊 PARSING SUMMARY:`);
  console.log(`   Total rows parsed: ${rows.length}`);
  console.log(`   Campaign lines detected: ${campaignLineMerges.size}`);

  let totalBudget = 0;
  campaignLineMerges.forEach((span, masterRow) => {
    const endRow = masterRow + span - 1;
    // Find the budget value for this campaign line
    const campaignRow = rows.find(r => r._campaignLineMasterRow === masterRow);
    const budgetValue = campaignRow?.grossbudget || campaignRow?.budget || 0;
    totalBudget += typeof budgetValue === 'number' ? budgetValue : parseFloat(String(budgetValue)) || 0;

    console.log(`     Campaign line: rows ${masterRow}-${endRow} (span: ${span}) - Budget: $${budgetValue?.toLocaleString()}`);
  });
  console.log(`   Total budget across all campaign lines: $${totalBudget.toLocaleString()}`);
  console.log('');

  // Build hierarchical campaign line structure
  const campaignLines = buildCampaignLines(rows, campaignLineMerges);

  const result = {
    headers: headers.filter(h => h),
    rows, // Keep flat rows for backward compatibility
    campaignLines, // NEW: Hierarchical structure
    metadata: {
      ...metadata,
      detectedTemplate: 'unilever-unified-2025',
      templateName: 'Unified Unilever Template (2025 Standard)',
    },
  };

  // Run validation and log results
  const validation = validateBlockingChart(result);
  if (!validation.valid || validation.warnings.length > 0) {
    console.log('\n⚠️  VALIDATION RESULTS:');
    console.log(formatValidationErrors(validation));
    console.log('');
  } else {
    console.log('✅ Validation passed: No errors or warnings found');
  }

  return result;
}

/**
 * Gets the actual value from a cell, handling merged cells
 */
function getCellValue(cell: ExcelJS.Cell): string | number | null {
  // For merged cells, ExcelJS automatically provides the master cell's value
  // when you access cell.value on any cell in the merged range
  if (cell.isMerged) {
    // ExcelJS gives us the master's value regardless of which cell we access
    // So we can treat all merged cells the same way
    if (cell.value === null || cell.value === undefined) {
      return null;
    }

    // Handle formula cells in merged cells
    if (typeof cell.value === "object" && "result" in cell.value) {
      const result = cell.value.result;
      // Check if formula result is a Date
      if (result instanceof Date) {
        const year = result.getUTCFullYear();
        const month = String(result.getUTCMonth() + 1).padStart(2, '0');
        const day = String(result.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return result as string | number;
    }

    // Handle rich text in merged cells
    if (typeof cell.value === "object" && "richText" in cell.value) {
      return (cell.value as any).richText.map((rt: any) => rt.text).join("");
    }

    // Handle Date values in merged cells (CRITICAL FIX!)
    if (cell.value instanceof Date) {
      const date = cell.value as Date;
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    // Return the value as-is (string or number)
    return cell.value as string | number;
  }

  // Handle different cell value types
  if (cell.value === null || cell.value === undefined) {
    return null;
  }

  // Handle formula cells - preserve numeric results as numbers
  if (typeof cell.value === "object" && "result" in cell.value) {
    const result = cell.value.result;
    console.log(`🔍 getCellValue: Found formula cell with result type: ${typeof result}, value: "${String(result).substring(0, 50)}"`);

    // Check if the result is a Date object
    if (result instanceof Date) {
      const year = result.getUTCFullYear();
      const month = String(result.getUTCMonth() + 1).padStart(2, '0');
      const day = String(result.getUTCDate()).padStart(2, '0');
      const isoDate = `${year}-${month}-${day}`;
      console.log(`  ✅ Formula result is Date object, converting to ISO: ${isoDate}`);
      return isoDate;
    }
    // Check if result is a date-like string
    if (typeof result === 'string') {
      const dateStr = result.trim();
      const parsedDate = new Date(dateStr);
      const isValidDate = !isNaN(parsedDate.getTime());
      const hasGMT = dateStr.includes('GMT');
      const hasSlashDate = dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
      const hasISODate = dateStr.match(/^\d{4}-\d{2}-\d{2}$/);

      console.log(`  Formula result is string. Valid date: ${isValidDate}, hasGMT: ${hasGMT}, hasSlashDate: ${!!hasSlashDate}, hasISODate: ${!!hasISODate}`);

      if (isValidDate && (hasGMT || hasSlashDate || hasISODate)) {
        const year = parsedDate.getUTCFullYear();
        const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getUTCDate()).padStart(2, '0');
        const isoDate = `${year}-${month}-${day}`;
        console.log(`  ✅ Converting formula string to ISO: ${isoDate}`);
        return isoDate;
      }
    }
    // Return the result as-is (number or string)
    console.log(`  ⏭️  Returning formula result as-is`);
    return result as string | number;
  }

  // Handle rich text
  if (typeof cell.value === "object" && "richText" in cell.value) {
    return (cell.value as any).richText.map((rt: any) => rt.text).join("");
  }

  // Handle date cells - format as ISO date string to avoid timezone issues
  // Check BOTH conditions separately to catch all date values
  const isDateType = cell.type === ExcelJS.ValueType.Date;
  const isDateInstance = cell.value instanceof Date;

  if (isDateType || isDateInstance) {
    const date = cell.value as Date;
    console.log(`🔍 getCellValue: Found Date cell! Type: ${cell.type}, isDateType: ${isDateType}, instanceof Date: ${isDateInstance}, value: ${date}`);
    // Use UTC to avoid timezone shifts that can cause off-by-one-day errors
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const isoDate = `${year}-${month}-${day}`;
    console.log(`  ✅ Converting Date to ISO: ${isoDate}`);
    return isoDate;
  }

  // ADDITIONAL CHECK: If we have a Date object but didn't catch it above, log a warning
  if (!isDateType && !isDateInstance && cell.value instanceof Date) {
    console.log(`⚠️  WARNING: Found Date object that wasn't caught! Type: ${cell.type}, value: ${cell.value}`);
  }

  // Check if string value looks like a date and convert it to ISO format
  // This handles cases where dates are stored as text in Excel (e.g., GMT strings)
  if (typeof cell.value === 'string') {
    const dateStr = cell.value.trim();
    console.log(`🔍 getCellValue: Found string value: "${dateStr.substring(0, 50)}..."`);

    // Try to parse as a date if it looks like a date string
    const parsedDate = new Date(dateStr);
    const isValidDate = !isNaN(parsedDate.getTime());
    const hasGMT = dateStr.includes('GMT');
    const hasSlashDate = dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
    const hasISODate = dateStr.match(/^\d{4}-\d{2}-\d{2}$/);

    console.log(`  Valid date: ${isValidDate}, hasGMT: ${hasGMT}, hasSlashDate: ${!!hasSlashDate}, hasISODate: ${!!hasISODate}`);

    if (isValidDate && (hasGMT || hasSlashDate || hasISODate)) {
      // Convert to ISO format using UTC
      const year = parsedDate.getUTCFullYear();
      const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getUTCDate()).padStart(2, '0');
      const isoDate = `${year}-${month}-${day}`;
      console.log(`  ✅ Converting to ISO: ${isoDate}`);
      return isoDate;
    } else {
      console.log(`  ⏭️  Not converting (conditions not met)`);
    }
  }

  // SAFETY CHECK: If we're about to return a Date object, convert it to ISO format
  // This handles edge cases where Date objects slip through the above checks
  if (cell.value instanceof Date) {
    console.log(`⚠️ SAFETY: Converting Date object to ISO at end of getCellValue: ${cell.value}`);
    const date = cell.value as Date;
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const isoDate = `${year}-${month}-${day}`;
    console.log(`  ✅ Safety conversion result: ${isoDate}`);
    return isoDate;
  }

  // Return primitive values as-is (string or number)
  return cell.value as string | number;
}

/**
 * Normalizes header names to camelCase for easier access
 */
function normalizeHeaderName(header: string): string {
  return header
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[^a-z]+/, "");
}

/**
 * Extracts metadata from the top rows of the worksheet
 * Updated for Unified Unilever Template (2025) structure
 */
function extractMetadata(
  worksheet: ExcelJS.Worksheet,
  headerRowIndex: number
): {
  campaignName?: string;
  client?: string;
  brand?: string;
  dateRange?: string;
  flightDates?: string;
  plannedNetMedia?: number;
  estimatedFees?: number;
  totalGrossBudget?: number;
} {
  const metadata: {
    campaignName?: string;
    client?: string;
    brand?: string;
    dateRange?: string;
    flightDates?: string;
    plannedNetMedia?: number;
    estimatedFees?: number;
    totalGrossBudget?: number;
  } = {};

  // Look at the first few rows before the header (typically rows 3-10 in new template)
  for (let i = 1; i < headerRowIndex && i <= PARSING_CONFIG.MAX_METADATA_ROWS; i++) {
    const row = worksheet.getRow(i);

    // Check columns E and F (typical metadata location in new template)
    const keyColE = getCellValue(row.getCell(5)); // Column E
    const valueColF = getCellValue(row.getCell(6)); // Column F

    if (keyColE && valueColF) {
      const key = String(keyColE).toLowerCase().trim();
      const value = valueColF;

      if (key.includes("client")) {
        metadata.client = String(value);
      } else if (key.includes("brand")) {
        metadata.brand = String(value);
      } else if (key.includes("campaign")) {
        metadata.campaignName = String(value);
      } else if (key.includes("flight")) {
        metadata.flightDates = String(value);
      } else if (key.includes("planned net media")) {
        metadata.plannedNetMedia = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ''));
      } else if (key.includes("estimated fees")) {
        metadata.estimatedFees = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ''));
      } else if (key.includes("total gross budget")) {
        metadata.totalGrossBudget = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ''));
      }
    }

    // Also check columns A and B for legacy format
    const firstCell = getCellValue(row.getCell(1));
    const secondCell = getCellValue(row.getCell(2));

    if (firstCell && secondCell) {
      const key = String(firstCell).toLowerCase();
      const value = String(secondCell);

      if (key.includes("date") && !metadata.flightDates) {
        metadata.dateRange = value;
      }
    }
  }

  console.log('📋 Extracted metadata:', metadata);
  return metadata;
}

/**
 * Validates that a parsed blocking chart has the minimum required fields
 * @deprecated Use validateBlockingChart from validation.ts instead
 */
export function validateBlockingChartLegacy(parsed: ParsedBlockingChart): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!parsed.rows || parsed.rows.length === 0) {
    errors.push("No data rows found in blocking chart");
  }

  if (!parsed.headers || parsed.headers.length === 0) {
    errors.push("No headers found in blocking chart");
  }

  // Check for at least some common expected columns
  const normalizedHeaders = parsed.headers.map(h => normalizeHeaderName(h));

  const hasCommonHeaders = PARSING_CONFIG.COMMON_HEADERS.some(ch =>
    normalizedHeaders.some(nh => nh.includes(ch))
  );

  if (!hasCommonHeaders) {
    errors.push("Could not find expected columns (channel, tactic, platform, or budget)");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Re-export the new validation function for backwards compatibility
export { validateBlockingChart, formatValidationErrors, type ValidationResult, type ValidationError } from "./validation";

