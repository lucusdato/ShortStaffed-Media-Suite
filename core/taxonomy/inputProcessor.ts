/**
 * Input Processor
 * Handles parsing of both blocking charts and traffic sheets for taxonomy generation
 */

import ExcelJS from 'exceljs';
import { TaxonomyRow, UserMetadata, TaxonomyInputData } from './types';
import { detectPlatform } from './platformDetector';
import { applySmartDefaults, applyContextualDefaults } from './smartDefaults';
import { generateTaxonomies } from './taxonomyGenerator';
import { parseBlockingChart } from '../excel/parseBlockingChart';

/**
 * ====================================================================================
 * INTELLIGENT FIELD PARSING FUNCTIONS
 * ====================================================================================
 */

/**
 * Parse demographics from blocking chart format (e.g., "A18-34", "M25+", "F18-65")
 */
function parseDemographics(demo: string | undefined): { gender?: string; ageLower?: number; ageUpper?: number } {
  if (!demo || typeof demo !== 'string') return {};

  const trimmed = demo.trim();
  const result: { gender?: string; ageLower?: number; ageUpper?: number } = {};

  // Extract gender (first character: A=All, M=Male, F=Female)
  const firstChar = trimmed.charAt(0).toUpperCase();
  if (firstChar === 'A') result.gender = 'Ad'; // All/Adult
  else if (firstChar === 'M') result.gender = 'M';
  else if (firstChar === 'F') result.gender = 'F';

  // Extract age range: "18-34", "18+", "25-65"
  const ageMatch = trimmed.match(/(\d+)[-+](\d+)?/);
  if (ageMatch) {
    result.ageLower = parseInt(ageMatch[1]);
    if (ageMatch[2]) {
      result.ageUpper = parseInt(ageMatch[2]);
    } else {
      // "18+" format
      result.ageUpper = 100;
    }
  }

  return result;
}

/**
 * Parse audience targeting (e.g., "Social Foodies 3P", "Prospecting 1P LAL")
 */
function parseAudienceTargeting(targeting: string | undefined): { audienceParty?: string; audienceName?: string; audienceType?: string } {
  if (!targeting || typeof targeting !== 'string') return {};

  const result: { audienceParty?: string; audienceName?: string; audienceType?: string } = {};

  // Extract audience party: 3P, 1P, 2P, 1P LAL, 12pd-did, etc.
  if (targeting.includes('3P') || targeting.includes('3rd')) {
    result.audienceParty = '3pd';
  } else if (targeting.includes('1P LAL')) {
    result.audienceParty = '1pd';
    result.audienceType = 'LLike';
  } else if (targeting.includes('1P')) {
    result.audienceParty = '1pd';
  } else if (targeting.includes('2P')) {
    result.audienceParty = '2pd';
  } else if (targeting.toLowerCase().includes('12pd-did')) {
    result.audienceParty = '12pd-did';
  }

  // Extract audience name (remove party indicators)
  let audienceName = targeting
    .replace(/\b(3P|1P|2P|LAL|12pd-did)\b/gi, '')
    .trim();

  if (audienceName) {
    result.audienceName = audienceName || 'AdvSk';
  }

  // Detect audience type
  if (targeting.toLowerCase().includes('lal') || targeting.toLowerCase().includes('lookalike')) {
    result.audienceType = 'LLike';
  } else if (targeting.toLowerCase().includes('behav')) {
    result.audienceType = 'Behav';
  } else if (targeting.toLowerCase().includes('demog')) {
    result.audienceType = 'Demog';
  }

  return result;
}

/**
 * Parse creative format (e.g., "6s/15s 9x16 Brand Say Video", "Influencer Assets")
 */
function parseCreativeFormat(placement: string | undefined): { formatType?: string; formatSize?: string; placementType?: string } {
  if (!placement || typeof placement !== 'string') return {};

  const result: { formatType?: string; formatSize?: string; placementType?: string } = {};
  const lower = placement.toLowerCase();

  // Detect format type
  if (lower.includes('video')) {
    result.formatType = 'Video';
  } else if (lower.includes('display') || lower.includes('banner')) {
    result.formatType = 'Disp';
  } else if (lower.includes('carousel')) {
    result.formatType = 'Carousel';
  } else if (lower.includes('audio')) {
    result.formatType = 'Audio';
  } else if (lower.includes('native')) {
    result.formatType = 'NatVid';
  }

  // Extract format size: "6s/15s", "30s", "300x250", "9x16"
  const sizeMatch = placement.match(/(\d+s\/\d+s|\d+s|\d+x\d+)/);
  if (sizeMatch) {
    result.formatSize = sizeMatch[1];
  }

  // Detect placement type
  if (lower.includes('instream') || lower.includes('in-stream') || lower.includes('shorts')) {
    result.placementType = 'InStream';
  } else if (lower.includes('feed') || lower.includes('story')) {
    result.placementType = 'FeedStory';
  } else if (lower.includes('influencer')) {
    result.placementType = 'FeedStory';
  } else if (lower.includes('banner')) {
    result.placementType = 'Banner';
  }

  return result;
}

/**
 * Parse language code (e.g., "EN" → "English", "FR" → "French")
 */
function parseLanguage(lang: string | undefined): string | undefined {
  if (!lang || typeof lang !== 'string') return undefined;

  const upper = lang.trim().toUpperCase();
  const langMap: { [key: string]: string } = {
    'EN': 'English',
    'FR': 'French',
    'ES': 'Spanish',
    'DE': 'German',
    'IT': 'Italian',
    'PT': 'Portuguese'
  };

  return langMap[upper] || lang;
}

/**
 * Process blocking chart file for taxonomy generation
 */
export async function processBlockingChart(
  file: Buffer,
  userMetadata: UserMetadata
): Promise<TaxonomyRow[]> {
  // Parse blocking chart using existing parser
  const parsed = await parseBlockingChart(file);

  const taxonomyRows: TaxonomyRow[] = [];

  for (let i = 0; i < parsed.rows.length; i++) {
    const row = parsed.rows[i];

    // Detect platform
    const platform = detectPlatform(row);
    if (!platform) {
      console.warn(`Could not detect platform for row ${i}:`, row);
      continue;
    }

    // Parse demographics from dedicated column (e.g., "A18-34", "M25+")
    const demographics = parseDemographics(row.demo);

    // Parse audience targeting from dedicated column (e.g., "Social Foodies 3P")
    const audienceInfo = parseAudienceTargeting(row.targeting);

    // Parse creative format from placements column (e.g., "6s/15s 9x16 Brand Say Video")
    const formatInfo = parseCreativeFormat(row.placements);

    // Parse language from dedicated column (e.g., "EN" → "English")
    const language = parseLanguage(row.language);

    // Apply smart defaults
    const partialData: Partial<TaxonomyInputData> = {
      originalTactic: row.tactic || `Tactic ${i + 1}`,

      // Use parsed values from dedicated columns FIRST
      formatType: formatInfo.formatType || row.adFormat,
      placementType: formatInfo.placementType || row.placementType,
      formatSize: formatInfo.formatSize,

      // Demographics
      gender: demographics.gender,
      ageLower: demographics.ageLower,
      ageUpper: demographics.ageUpper,

      // Audience
      audienceParty: audienceInfo.audienceParty,
      audienceType: audienceInfo.audienceType,
      audienceName: audienceInfo.audienceName,

      // Creative name from Accutics Campaign Name column or existing
      creativeName: row.accuticsCampaignName || row.creativeName,

      // Language
      freeText: language
    };

    let inputData = applySmartDefaults(platform, userMetadata, partialData);

    // Apply contextual defaults
    inputData = applyContextualDefaults(inputData, {
      channel: row.channel,
      tactic: row.tactic,
      adFormat: row.adFormat,
      placementType: row.placementType
    });

    // Generate taxonomies
    const taxonomies = generateTaxonomies(inputData);

    taxonomyRows.push({
      rowIndex: i,
      originalTactic: row.tactic || `Tactic ${i + 1}`,
      platform,
      userMetadata,
      inputFields: inputData,
      taxonomies
    });
  }

  return taxonomyRows;
}

/**
 * Process traffic sheet file for taxonomy generation
 */
export async function processTrafficSheet(
  file: Buffer,
  userMetadata: UserMetadata
): Promise<TaxonomyRow[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file);

  const taxonomyRows: TaxonomyRow[] = [];
  let rowIndex = 0;

  // Process each relevant sheet
  const sheetNames = ['Brand Say Digital', 'Brand Say Social', 'Other Say Social'];

  for (const sheetName of sheetNames) {
    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) continue;

    // Find header row (typically row 8)
    let headerRow: ExcelJS.Row | undefined;
    let headerRowNumber = 0;

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber <= 10) {
        const cellValue = row.getCell(2).value;
        if (cellValue && String(cellValue).toLowerCase().includes('tactic')) {
          headerRow = row;
          headerRowNumber = rowNumber;
        }
      }
    });

    if (!headerRow) {
      console.warn(`Could not find header row in sheet: ${sheetName}`);
      continue;
    }

    // Extract headers
    const headers: string[] = [];
    headerRow.eachCell((cell, colNumber) => {
      headers[colNumber] = String(cell.value || '').trim();
    });

    // Process data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber <= headerRowNumber) return; // Skip header and above

      // Extract row data
      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber];
        if (header) {
          const normalizedHeader = header
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '');
          rowData[normalizedHeader] = cell.value;
        }
      });

      // Skip if no tactic
      if (!rowData.tactic) return;

      // Detect platform
      const platform = detectPlatform(rowData);
      if (!platform) {
        console.warn(`Could not detect platform for row ${rowNumber}:`, rowData);
        return;
      }

      // Apply smart defaults
      const partialData: Partial<TaxonomyInputData> = {
        originalTactic: String(rowData.tactic || `Tactic ${rowIndex + 1}`),
        formatType: rowData.formattype || rowData.format,
        placementType: rowData.placementtype || rowData.placement,
        creativeName: rowData.creativename || rowData.creative
      };

      let inputData = applySmartDefaults(platform, userMetadata, partialData);

      // Apply contextual defaults
      inputData = applyContextualDefaults(inputData, {
        tactic: String(rowData.tactic || ''),
        adFormat: String(rowData.formattype || rowData.format || ''),
        placementType: String(rowData.placementtype || rowData.placement || '')
      });

      // Generate taxonomies
      const taxonomies = generateTaxonomies(inputData);

      taxonomyRows.push({
        rowIndex: rowIndex++,
        originalTactic: String(rowData.tactic || `Tactic ${rowIndex}`),
        platform,
        userMetadata,
        inputFields: inputData,
        taxonomies
      });
    });
  }

  return taxonomyRows;
}

/**
 * Process both blocking chart and traffic sheet (merge data)
 */
export async function processBothInputs(
  blockingChartFile: Buffer,
  trafficSheetFile: Buffer,
  userMetadata: UserMetadata
): Promise<TaxonomyRow[]> {
  const blockingChartRows = await processBlockingChart(blockingChartFile, userMetadata);
  const trafficSheetRows = await processTrafficSheet(trafficSheetFile, userMetadata);

  // Merge: use traffic sheet as primary, blocking chart as fallback
  // For now, just concatenate (can be enhanced to merge matching tactics)
  return [...trafficSheetRows, ...blockingChartRows];
}
