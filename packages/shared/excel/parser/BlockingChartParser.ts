/**
 * Blocking Chart Parser
 * Parses Excel blocking charts and builds hierarchical campaign line structure
 * with dynamic ad group detection based on audience values
 */

import * as ExcelJS from 'exceljs';
import type {
  ParsedBlockingChart,
  CampaignLine,
  AdGroup,
  CreativeLine,
  ValidationWarning,
  CampaignLineRange,
} from '../types';
import {
  PARSING_CONFIG,
  CAMPAIGN_LINE_DETECTION_CONFIG,
  AD_GROUP_DETECTION_CONFIG,
  ROW_EXPANSION_CONFIG,
} from '../config';
import {
  BLOCKING_CHART_FIELD_MAPPINGS,
  getInternalFieldName,
  CAMPAIGN_LINE_INDICATORS,
} from '../utils/FieldMapper';
import { normalizeFieldName } from '../utils/FieldNormalizer';
import { isExcludedChannel, getExclusionReason } from '../utils/PlatformClassifier';

/**
 * Blocking Chart Parser Class
 * Converts Excel blocking chart into structured campaign line data
 */
export class BlockingChartParser {
  private validationWarnings: ValidationWarning[] = [];

  /**
   * Parse blocking chart Excel file into structured campaign lines
   *
   * @param fileBuffer - ArrayBuffer containing the Excel file data
   * @returns Parsed blocking chart with hierarchical campaign line structure
   */
  async parse(fileBuffer: ArrayBuffer): Promise<ParsedBlockingChart> {
    this.validationWarnings = [];

    // Load workbook
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);

    // Get first worksheet
    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new Error('No worksheets found in blocking chart');
    }

    // Find header row and extract headers
    const { headerRow, headers } = this.findHeaderRow(worksheet);
    if (!headerRow || headers.length === 0) {
      throw new Error('Could not find header row in blocking chart');
    }

    // Extract metadata from rows above header
    const metadata = this.extractMetadata(worksheet, headerRow);

    // Detect campaign lines by finding merged cells
    const campaignLineRanges = this.detectCampaignLines(worksheet, headerRow, headers);

    if (campaignLineRanges.length === 0) {
      this.addWarning('warning', 'No campaign lines detected in blocking chart', undefined, undefined);
    }

    // Build campaign lines with audience-based ad group detection
    const campaignLines = this.buildCampaignLines(
      worksheet,
      headers,
      campaignLineRanges,
      headerRow
    );

    return {
      headers,
      campaignLines,
      validationWarnings: this.validationWarnings,
      metadata,
    };
  }

  /**
   * Find header row in worksheet
   * Header row contains column names like "Channel", "Platform", etc.
   */
  private findHeaderRow(worksheet: ExcelJS.Worksheet): {
    headerRow: number;
    headers: string[];
  } {
    const maxRows = Math.min(worksheet.rowCount, PARSING_CONFIG.MAX_METADATA_ROWS + 5);

    for (let rowNumber = 1; rowNumber <= maxRows; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      const values: string[] = [];
      let nonEmptyCount = 0;

      row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
        const value = String(cell.value || '').trim();
        values[colNumber - 1] = value;
        if (value) nonEmptyCount++;
      });

      // Check if this row has enough non-empty cells and contains required keywords
      if (nonEmptyCount >= PARSING_CONFIG.MIN_HEADER_CELLS) {
        const normalizedValues = values.map(v => normalizeFieldName(v));
        const hasRequiredKeywords = PARSING_CONFIG.REQUIRED_HEADER_KEYWORDS.every(keyword =>
          normalizedValues.some(v => v.includes(keyword))
        );

        if (hasRequiredKeywords) {
          return { headerRow: rowNumber, headers: values };
        }
      }
    }

    throw new Error('Header row not found in blocking chart');
  }

  /**
   * Extract metadata from rows above header (campaign name, client, etc.)
   */
  private extractMetadata(
    worksheet: ExcelJS.Worksheet,
    headerRow: number
  ): ParsedBlockingChart['metadata'] {
    const metadata: ParsedBlockingChart['metadata'] = {};

    // Scan rows above header for metadata
    for (let rowNumber = 1; rowNumber < headerRow; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      const firstCell = row.getCell(1).value;
      const secondCell = row.getCell(2).value;

      const label = String(firstCell || '').toLowerCase().trim();
      const value = String(secondCell || '').trim();

      if (label.includes('campaign') && value) {
        metadata.campaignName = value;
      } else if (label.includes('client') && value) {
        metadata.client = value;
      } else if (label.includes('brand') && value) {
        metadata.brand = value;
      } else if (label.includes('date') && value) {
        metadata.dateRange = value;
      }
    }

    return metadata;
  }

  /**
   * Detect campaign lines by finding merged cells across budget, impressions, and placements columns
   * A campaign line is identified when these three columns are merged together
   */
  private detectCampaignLines(
    worksheet: ExcelJS.Worksheet,
    headerRow: number,
    headers: string[]
  ): CampaignLineRange[] {
    // Find column indexes for the three required merge indicators
    const budgetColIndex = this.findColumnIndex(headers, ['Gross Budget', 'Net Budget', 'Media Cost', 'Working Media Budget']);
    const impressionsColIndex = this.findColumnIndex(headers, ['Est. Impressions', 'Impressions/GRPs', 'Impressions']);
    const placementsColIndex = this.findColumnIndex(headers, ['Campaign Details - Placements', 'Placements']);

    console.log('🔍 Column Detection:');
    console.log('  Budget column index:', budgetColIndex);
    console.log('  Impressions column index:', impressionsColIndex);
    console.log('  Placements column index:', placementsColIndex);
    console.log('  Available headers:', headers.filter(h => h));

    if (budgetColIndex === -1 || impressionsColIndex === -1 || placementsColIndex === -1) {
      this.addWarning(
        'error',
        `Required columns not found - Budget: ${budgetColIndex}, Impressions: ${impressionsColIndex}, Placements: ${placementsColIndex}`,
        undefined,
        undefined
      );
      return [];
    }

    // Collect all merge ranges for these columns
    const budgetMerges = new Map<number, number>(); // masterRow → span
    const impressionsMerges = new Map<number, number>();
    const placementsMerges = new Map<number, number>();

    // Helper function to get column letter from index
    const getColumnLetter = (index: number): string => {
      let letter = '';
      let temp = index;
      while (temp >= 0) {
        letter = String.fromCharCode(65 + (temp % 26)) + letter;
        temp = Math.floor(temp / 26) - 1;
      }
      return letter;
    };

    // ExcelJS exposes merged cells through worksheet.model.merges
    // Merges are stored as strings like "A1:A5"
    const merges = (worksheet as any).model?.merges || [];
    console.log(`📋 Total merge cells found: ${merges.length}`);

    for (const mergeRange of merges) {
      // Parse merge range (e.g., "A1:A5")
      const match = mergeRange.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
      if (!match) continue;

      const startCol = match[1];
      const startRow = parseInt(match[2]);
      const endCol = match[3];
      const endRow = parseInt(match[4]);
      const span = endRow - startRow + 1;

      // Skip if merge is in header or only 1 row
      if (startRow <= headerRow || span <= 1) continue;

      // Check if this merge is in one of our target columns
      const budgetCol = getColumnLetter(budgetColIndex);
      const impressionsCol = getColumnLetter(impressionsColIndex);
      const placementsCol = getColumnLetter(placementsColIndex);

      if (startCol === budgetCol && endCol === budgetCol) {
        budgetMerges.set(startRow, span);
      }

      if (startCol === impressionsCol && endCol === impressionsCol) {
        impressionsMerges.set(startRow, span);
      }

      if (startCol === placementsCol && endCol === placementsCol) {
        placementsMerges.set(startRow, span);
      }
    }

    // Find matching merges (all three columns merged with same span at same master row)
    const campaignLineRanges: CampaignLineRange[] = [];

    console.log(`🔗 Budget merges found: ${budgetMerges.size}`);
    console.log('   Budget merge rows:', Array.from(budgetMerges.keys()));
    console.log(`🔗 Impressions merges found: ${impressionsMerges.size}`);
    console.log('   Impressions merge rows:', Array.from(impressionsMerges.keys()));
    console.log(`🔗 Placements merges found: ${placementsMerges.size}`);
    console.log('   Placements merge rows:', Array.from(placementsMerges.keys()));

    // Strategy 1: Find triple-merged campaign lines (2+ ad groups)
    for (const [masterRow, budgetSpan] of budgetMerges.entries()) {
      const impressionsSpan = impressionsMerges.get(masterRow);
      const placementsSpan = placementsMerges.get(masterRow);

      // All three must match to be a valid campaign line
      if (impressionsSpan === budgetSpan && placementsSpan === budgetSpan) {
        // Verify this is not a summary/total row
        if (!this.isSummaryRow(worksheet, masterRow, headers)) {
          campaignLineRanges.push({
            masterRow,
            span: budgetSpan,
            endRow: masterRow + budgetSpan - 1,
          });
        }
      }
    }

    // Strategy 2: Find single-row campaign lines (1 ad group - no merges)
    // Look for data rows that have budget, impressions, and placements filled but not merged
    const detectedRows = new Set(campaignLineRanges.flatMap(r =>
      Array.from({ length: r.span }, (_, i) => r.masterRow + i)
    ));

    const lastDataRow = Math.min(worksheet.rowCount, headerRow + 100);
    console.log(`🔍 Scanning rows ${headerRow + 1} to ${lastDataRow} for single-row campaign lines...`);

    for (let rowNum = headerRow + 1; rowNum <= lastDataRow; rowNum++) {
      // Skip if already detected as part of a merged campaign line
      if (detectedRows.has(rowNum)) continue;

      const row = worksheet.getRow(rowNum);
      const budgetValue = row.getCell(budgetColIndex + 1).value;
      const impressionsValue = row.getCell(impressionsColIndex + 1).value;
      const placementsValue = row.getCell(placementsColIndex + 1).value;

      // Check if this row has all three key values filled
      if (budgetValue && impressionsValue && placementsValue) {
        // Skip rows that look like headers (values match header text)
        const budgetStr = String(budgetValue).trim().toLowerCase();
        const impressionsStr = String(impressionsValue).trim().toLowerCase();
        const placementsStr = String(placementsValue).trim().toLowerCase();

        const isHeaderRow = (
          budgetStr.includes('budget') || budgetStr.includes('cost') ||
          impressionsStr.includes('impression') || impressionsStr.includes('grp') ||
          placementsStr.includes('placement')
        );

        if (isHeaderRow) {
          console.log(`  ⏭️  Skipping header-like row at ${rowNum}`);
          continue;
        }

        // Verify this is not a summary/total row
        if (!this.isSummaryRow(worksheet, rowNum, headers)) {
          console.log(`  ✅ Found single-row campaign line at row ${rowNum}`);
          campaignLineRanges.push({
            masterRow: rowNum,
            span: 1,
            endRow: rowNum,
          });
          detectedRows.add(rowNum);
        }
      }
    }

    return campaignLineRanges.sort((a, b) => a.masterRow - b.masterRow);
  }

  /**
   * Check if a row is a summary/total row (should be excluded)
   */
  private isSummaryRow(worksheet: ExcelJS.Worksheet, rowNumber: number, headers: string[]): boolean {
    const row = worksheet.getRow(rowNumber);
    const values: Record<string, any> = {};

    headers.forEach((header, index) => {
      const cell = row.getCell(index + 1);
      values[header] = cell.value;
    });

    // Check for exclusion patterns in text fields
    const textFields = [values['Channel'], values['Platform'], values['Campaign Details - Placements']];
    const textContent = textFields
      .filter(v => v)
      .map(v => String(v).toLowerCase())
      .join(' ');

    for (const pattern of CAMPAIGN_LINE_DETECTION_CONFIG.EXCLUSION_PATTERNS) {
      if (textContent.includes(pattern)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Build campaign lines with audience-based ad group detection
   */
  private buildCampaignLines(
    worksheet: ExcelJS.Worksheet,
    headers: string[],
    campaignLineRanges: CampaignLineRange[],
    headerRow: number
  ): CampaignLine[] {
    const campaignLines: CampaignLine[] = [];

    for (let index = 0; index < campaignLineRanges.length; index++) {
      const range = campaignLineRanges[index];

      try {
        const campaignLine = this.buildCampaignLine(
          worksheet,
          headers,
          range,
          index
        );

        campaignLines.push(campaignLine);
      } catch (error) {
        this.addWarning(
          'error',
          `Failed to parse campaign line at row ${range.masterRow}: ${error.message}`,
          undefined,
          range.masterRow
        );
      }
    }

    return campaignLines;
  }

  /**
   * Build a single campaign line with dynamic ad group detection
   */
  private buildCampaignLine(
    worksheet: ExcelJS.Worksheet,
    headers: string[],
    range: CampaignLineRange,
    campaignLineIndex: number
  ): CampaignLine {
    // Extract all rows in this campaign line
    const rows: Record<string, any>[] = [];
    for (let rowNum = range.masterRow; rowNum <= range.endRow; rowNum++) {
      const rowData = this.extractRowData(worksheet, rowNum, headers);
      rows.push(rowData);
    }

    // Get campaign-level data from first row
    const firstRow = rows[0];

    // Detect ad groups by grouping rows by audience
    const adGroups = this.detectAdGroupsByAudience(rows, headers);

    // Build campaign line
    const campaignLine: CampaignLine = {
      // Campaign-level fields (from first row)
      channel: firstRow.channel || '',
      platform: firstRow.platform || '',
      mediaType: firstRow.mediaType,
      objective: firstRow.objective || '',
      language: firstRow.language,
      target: firstRow.target,
      startDate: firstRow.startDate || '',
      endDate: firstRow.endDate || '',

      // Budget information
      grossBudget: firstRow.grossBudget,
      netBudget: firstRow.netBudget,
      estImpressions: firstRow.estImpressions,
      estCpm: firstRow.estCpm,
      adServing: firstRow.adServing,
      dvCost: firstRow.dvCost,
      buffer: firstRow.buffer,

      // Campaign-level placements and naming
      placements: firstRow.placements,
      accuticsCampaignName: firstRow.accuticsCampaignName,

      // Additional metadata
      adFormat: firstRow.adFormat,
      buyType: firstRow.buyType,
      tagsRequired: firstRow.tagsRequired,

      // Exclusion check
      isExcluded: isExcludedChannel(firstRow.channel || ''),
      excludedReason: getExclusionReason(firstRow.channel || ''),

      // Ad groups (dynamically detected)
      adGroups,

      // Validation warnings
      validationWarnings: [],

      // Tracking metadata
      _sourceRowNumbers: Array.from(
        { length: range.span },
        (_, i) => range.masterRow + i
      ),
      blockingChartRowCount: range.span,
      stableIndex: campaignLineIndex,
    };

    // Validate campaign line
    this.validateCampaignLine(campaignLine);

    return campaignLine;
  }

  /**
   * Detect ad groups by grouping rows by audience field
   * Each unique audience value = 1 ad group with 5 creative lines
   */
  private detectAdGroupsByAudience(
    rows: Record<string, any>[],
    headers: string[]
  ): AdGroup[] {
    // Find audience column
    const audienceField = this.findAudienceField(rows);

    // Group rows by audience value
    const rowsByAudience = new Map<string, Record<string, any>[]>();

    for (const row of rows) {
      const audienceValue =
        row[audienceField] ||
        AD_GROUP_DETECTION_CONFIG.DEFAULT_AD_GROUP_NAME;

      if (!rowsByAudience.has(audienceValue)) {
        rowsByAudience.set(audienceValue, []);
      }
      rowsByAudience.get(audienceValue)!.push(row);
    }

    // Build ad groups
    const adGroups: AdGroup[] = [];

    for (const [audienceName, audienceRows] of rowsByAudience.entries()) {
      const adGroup = this.buildAdGroup(audienceName, audienceRows);
      adGroups.push(adGroup);
    }

    return adGroups;
  }

  /**
   * Find which field to use for audience grouping
   */
  private findAudienceField(rows: Record<string, any>[]): string {
    // Try primary field first
    if (rows.some(r => r[AD_GROUP_DETECTION_CONFIG.PRIMARY_GROUPING_FIELD])) {
      return AD_GROUP_DETECTION_CONFIG.PRIMARY_GROUPING_FIELD;
    }

    // Try fallback fields
    for (const field of AD_GROUP_DETECTION_CONFIG.FALLBACK_GROUPING_FIELDS) {
      if (rows.some(r => r[field])) {
        return field;
      }
    }

    // Default to primary
    return AD_GROUP_DETECTION_CONFIG.PRIMARY_GROUPING_FIELD;
  }

  /**
   * Build a single ad group with exactly 5 creative lines
   */
  private buildAdGroup(
    audienceName: string,
    audienceRows: Record<string, any>[]
  ): AdGroup {
    // Get ad group-level data from first row
    const firstRow = audienceRows[0];

    // Always create exactly 5 creative lines
    const creativeLines: CreativeLine[] = [];
    for (let i = 0; i < ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP; i++) {
      const sourceRow = audienceRows[i] || {}; // Use empty object if fewer than 5 rows

      creativeLines.push({
        creativeName: sourceRow.creativeName,
        creativeFormat: sourceRow.creativeFormat,
        adFormat: sourceRow.adFormat,
      });
    }

    return {
      // Ad group-level fields
      audience: audienceName,
      accuticsCampaignName: firstRow.accuticsCampaignName,
      targeting: firstRow.targeting,
      target: firstRow.target,
      kpi: firstRow.kpi,
      kpiValue: firstRow.kpiValue,
      placements: firstRow.placements,
      measurement: firstRow.measurement,

      // Creative lines (always 5)
      creativeLines,
    };
  }

  /**
   * Extract row data and map to internal field names
   */
  private extractRowData(
    worksheet: ExcelJS.Worksheet,
    rowNumber: number,
    headers: string[]
  ): Record<string, any> {
    const row = worksheet.getRow(rowNumber);
    const data: Record<string, any> = {};

    headers.forEach((header, index) => {
      if (!header) return;

      const cell = row.getCell(index + 1);
      const internalField = getInternalFieldName(header);

      if (internalField) {
        let value = cell.value;

        // Handle date formatting
        // Excel stores dates as serial numbers (days since 1900-01-01) with no timezone info
        // ExcelJS converts these to JavaScript Date objects
        // To avoid timezone boundary issues, we add 12 hours before extracting date components
        // This ensures we're safely in the middle of the calendar day regardless of timezone
        if (value instanceof Date) {
          // Add 12 hours (43200000 ms) to avoid timezone boundary issues
          // If date is at midnight (any timezone), adding 12 hours keeps us on the same calendar day
          const safeDate = new Date(value.getTime() + 12 * 60 * 60 * 1000);

          // Extract UTC date components from the safe date
          const year = safeDate.getUTCFullYear();
          const month = String(safeDate.getUTCMonth() + 1).padStart(2, '0');
          const day = String(safeDate.getUTCDate()).padStart(2, '0');

          value = `${year}-${month}-${day}`;
        } else if (typeof value === 'object' && value !== null) {
          // Handle Excel rich text
          value = (value as any).text || String(value);
        }

        data[internalField] = value;
      }
    });

    return data;
  }

  /**
   * Find column index by trying multiple possible names
   */
  private findColumnIndex(headers: string[], possibleNames: string[]): number {
    for (const name of possibleNames) {
      const index = headers.findIndex(h => h === name);
      if (index !== -1) return index;
    }

    // Try normalized matching
    const normalizedPossibleNames = possibleNames.map(n => normalizeFieldName(n));
    for (let i = 0; i < headers.length; i++) {
      const normalized = normalizeFieldName(headers[i]);
      if (normalizedPossibleNames.includes(normalized)) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Validate campaign line and add warnings
   */
  private validateCampaignLine(campaignLine: CampaignLine): void {
    // Check required fields
    if (!campaignLine.channel) {
      campaignLine.validationWarnings = campaignLine.validationWarnings || [];
      campaignLine.validationWarnings.push({
        severity: 'warning',
        message: 'Missing channel',
        field: 'channel',
      });
    }

    if (!campaignLine.platform) {
      campaignLine.validationWarnings = campaignLine.validationWarnings || [];
      campaignLine.validationWarnings.push({
        severity: 'warning',
        message: 'Missing platform',
        field: 'platform',
      });
    }

    if (!campaignLine.startDate || !campaignLine.endDate) {
      campaignLine.validationWarnings = campaignLine.validationWarnings || [];
      campaignLine.validationWarnings.push({
        severity: 'warning',
        message: 'Missing start or end date',
        field: 'dates',
      });
    }

    if (campaignLine.adGroups.length === 0) {
      campaignLine.validationWarnings = campaignLine.validationWarnings || [];
      campaignLine.validationWarnings.push({
        severity: 'error',
        message: 'No ad groups detected',
      });
    }
  }

  /**
   * Add validation warning to global warnings list
   */
  private addWarning(
    severity: 'error' | 'warning' | 'info',
    message: string,
    field?: string,
    rowNumber?: number
  ): void {
    this.validationWarnings.push({
      severity,
      message,
      field,
      rowNumber,
    });
  }
}
