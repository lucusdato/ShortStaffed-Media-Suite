/**
 * Traffic Sheet Generator
 * Generates Excel traffic sheets from parsed blocking chart data
 * Handles categorization, merging, and formatting for all three tabs
 */

import * as ExcelJS from 'exceljs';
import type {
  ParsedBlockingChart,
  CampaignLine,
  AdGroup,
  TrafficSheetTab,
  CategorizedCampaignLines,
  MergeInfo,
} from '../types';
import { TRAFFIC_SHEET_CONFIG, ROW_EXPANSION_CONFIG, DEMOGRAPHIC_CONFIG, DATE_CONFIG } from '../config';
import {
  getTrafficSheetTab,
  getDefaultPlacements,
} from '../utils/PlatformClassifier';
import {
  TRAFFIC_SHEET_FIELD_MAPPINGS,
  buildColumnIndexMap,
} from '../utils/FieldMapper';
import { normalizeFieldName } from '../utils/FieldNormalizer';

/**
 * Traffic Sheet Generator Class
 * Converts parsed campaign lines into formatted Excel traffic sheets
 */
export class TrafficSheetGenerator {
  /**
   * Generate traffic sheet Excel workbook from parsed blocking chart
   *
   * @param parsedChart - Parsed blocking chart data
   * @param templateBuffer - Optional template file as ArrayBuffer
   * @returns Excel workbook with traffic sheets
   */
  async generate(
    parsedChart: ParsedBlockingChart,
    templateBuffer?: ArrayBuffer
  ): Promise<ExcelJS.Workbook> {
    // Create or load workbook
    let workbook: ExcelJS.Workbook;

    if (templateBuffer) {
      // Load template workbook
      console.log('📄 Loading template workbook...');
      workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(templateBuffer);
      console.log('✅ Template loaded successfully');

      // Clear existing data rows (keep headers and formatting)
      await this.clearTemplateData(workbook);
    } else {
      // Create workbook from scratch (fallback)
      console.log('📄 Creating workbook from scratch (no template provided)');
      workbook = new ExcelJS.Workbook();
      await this.createWorkbookFromScratch(workbook);
    }

    // Categorize campaign lines by tab
    const categorized = this.categorizeCampaignLines(parsedChart.campaignLines);

    console.log(`📊 Categorization Results:`);
    console.log(`  Brand Say Digital: ${categorized['Brand Say Digital'].length} lines`);
    console.log(`  Brand Say Social: ${categorized['Brand Say Social'].length} lines`);
    console.log(`  Other Say Social: ${categorized['Other Say Social'].length} lines`);

    // Write each tab
    await this.writeTab(workbook, 'Brand Say Digital', categorized['Brand Say Digital']);
    await this.writeTab(workbook, 'Brand Say Social', categorized['Brand Say Social']);
    await this.writeTab(workbook, 'Other Say Social', categorized['Other Say Social']);

    return workbook;
  }

  /**
   * Clear template data rows while preserving headers and formatting
   */
  private async clearTemplateData(workbook: ExcelJS.Workbook): Promise<void> {
    const tabs: TrafficSheetTab[] = ['Brand Say Digital', 'Brand Say Social', 'Other Say Social'];

    for (const tabName of tabs) {
      const worksheet = workbook.getWorksheet(tabName);
      if (!worksheet) {
        console.warn(`⚠️  Template missing worksheet: ${tabName}`);
        continue;
      }

      // Delete all rows after the header row (row 8)
      const firstDataRow = TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW;
      const lastRow = worksheet.rowCount;

      if (lastRow >= firstDataRow) {
        // Delete rows in reverse order to avoid index shifting
        for (let rowNum = lastRow; rowNum >= firstDataRow; rowNum--) {
          worksheet.spliceRows(rowNum, 1);
        }
        console.log(`  🧹 Cleared ${lastRow - firstDataRow + 1} data rows from ${tabName}`);
      }
    }
  }

  /**
   * Create workbook structure from scratch
   * Creates three worksheets with basic headers
   */
  private async createWorkbookFromScratch(workbook: ExcelJS.Workbook): Promise<void> {
    // Create three worksheets
    const bsdSheet = workbook.addWorksheet('Brand Say Digital');
    const bssSheet = workbook.addWorksheet('Brand Say Social');
    const ossSheet = workbook.addWorksheet('Other Say Social');

    // Set up basic headers (row 8)
    this.setupWorksheetHeaders(bsdSheet, 'Brand Say Digital');
    this.setupWorksheetHeaders(bssSheet, 'Brand Say Social');
    this.setupWorksheetHeaders(ossSheet, 'Other Say Social');
  }

  /**
   * Set up worksheet headers
   */
  private setupWorksheetHeaders(worksheet: ExcelJS.Worksheet, tab: TrafficSheetTab): void {
    const headerRow = worksheet.getRow(TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW);

    // Get field mappings for this tab
    const fieldMappings = TRAFFIC_SHEET_FIELD_MAPPINGS[tab];

    // Write headers
    let col = 1;
    for (const [internalName, displayName] of Object.entries(fieldMappings)) {
      headerRow.getCell(col).value = displayName;
      col++;
    }

    headerRow.commit();
  }

  /**
   * Categorize campaign lines by traffic sheet tab
   */
  private categorizeCampaignLines(
    campaignLines: CampaignLine[]
  ): CategorizedCampaignLines {
    const categorized: CategorizedCampaignLines = {
      'Brand Say Digital': [],
      'Brand Say Social': [],
      'Other Say Social': [],
    };

    for (const campaignLine of campaignLines) {
      // Skip excluded channels (OOH, TV, Radio, Print)
      if (campaignLine.isExcluded) {
        console.log(`⏭️  Skipping excluded campaign line: ${campaignLine.platform} / ${campaignLine.channel}`);
        continue;
      }

      // Determine which tab this campaign line belongs to
      const tab = getTrafficSheetTab(campaignLine.platform, campaignLine.channel, campaignLine.adFormat);
      console.log(`📂 Categorizing: Platform="${campaignLine.platform}" Channel="${campaignLine.channel}" AdFormat="${campaignLine.adFormat}" → Tab="${tab}"`);
      categorized[tab].push(campaignLine);
    }

    return categorized;
  }

  /**
   * Write campaign lines to a worksheet tab
   */
  private async writeTab(
    workbook: ExcelJS.Workbook,
    tabName: TrafficSheetTab,
    campaignLines: CampaignLine[]
  ): Promise<void> {
    const worksheet = workbook.getWorksheet(tabName);
    if (!worksheet) {
      throw new Error(`Worksheet ${tabName} not found`);
    }

    // Get headers from row 8
    const headerRow = worksheet.getRow(TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW);
    const headers: string[] = [];
    headerRow.eachCell((cell, colNumber) => {
      headers[colNumber - 1] = String(cell.value || '');
    });

    // Build column index map for fast lookup
    const columnMap = buildColumnIndexMap(headers);

    // Track current row position
    let currentRow = TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW;

    // Track all merges to apply at the end
    const allMerges: MergeInfo[] = [];

    // Write each campaign line
    for (const campaignLine of campaignLines) {
      const merges = this.writeCampaignLine(
        worksheet,
        campaignLine,
        currentRow,
        tabName,
        columnMap
      );

      allMerges.push(...merges);

      // Calculate total rows for this campaign line
      const totalRows = campaignLine.adGroups.length * ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;
      currentRow += totalRows;
    }

    // Apply all merges
    this.applyMerges(worksheet, allMerges);

    // Apply borders
    this.applyBorders(worksheet, tabName, currentRow - 1);

    // Apply cell alignment (center horizontal, middle vertical)
    this.applyCellAlignment(worksheet, currentRow - 1);

    // Auto-size columns and rows
    this.autoSizeColumnsAndRows(worksheet, currentRow - 1);
  }

  /**
   * Write a single campaign line to worksheet
   * Returns merge information for later application
   */
  private writeCampaignLine(
    worksheet: ExcelJS.Worksheet,
    campaignLine: CampaignLine,
    startRow: number,
    tab: TrafficSheetTab,
    columnMap: Map<string, number>
  ): MergeInfo[] {
    const merges: MergeInfo[] = [];
    const totalRows = campaignLine.adGroups.length * ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;
    const endRow = startRow + totalRows - 1;

    // Write campaign-level fields (merge across all rows)
    const campaignFields = this.getCampaignLevelFields(campaignLine, tab);
    for (const [fieldName, value] of Object.entries(campaignFields)) {
      const colIndex = this.getColumnIndex(columnMap, fieldName, tab);
      if (colIndex !== undefined) {
        // Write to first row
        const firstRow = worksheet.getRow(startRow);
        firstRow.getCell(colIndex + 1).value = value;

        // Add merge if more than 1 row
        if (totalRows > 1) {
          merges.push({
            startRow,
            endRow,
            startCol: colIndex + 1,
            endCol: colIndex + 1,
          });
        }
      }
    }

    // Write ad groups
    let currentRow = startRow;
    for (const adGroup of campaignLine.adGroups) {
      const adGroupMerges = this.writeAdGroup(
        worksheet,
        adGroup,
        campaignLine,
        currentRow,
        tab,
        columnMap
      );

      merges.push(...adGroupMerges);
      currentRow += ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;
    }

    return merges;
  }

  /**
   * Write a single ad group (5 creative lines)
   */
  private writeAdGroup(
    worksheet: ExcelJS.Worksheet,
    adGroup: AdGroup,
    campaignLine: CampaignLine,
    startRow: number,
    tab: TrafficSheetTab,
    columnMap: Map<string, number>
  ): MergeInfo[] {
    const merges: MergeInfo[] = [];
    const endRow = startRow + ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP - 1;

    // Write ad group-level fields (merge across 5 rows)
    const adGroupFields = this.getAdGroupLevelFields(adGroup, campaignLine, tab);
    for (const [fieldName, value] of Object.entries(adGroupFields)) {
      const colIndex = this.getColumnIndex(columnMap, fieldName, tab);
      if (colIndex !== undefined) {
        // Write to first row
        const firstRow = worksheet.getRow(startRow);
        firstRow.getCell(colIndex + 1).value = value;

        // Add merge for 5 rows
        merges.push({
          startRow,
          endRow,
          startCol: colIndex + 1,
          endCol: colIndex + 1,
        });
      }
    }

    // Write creative lines (no merging)
    for (let i = 0; i < ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP; i++) {
      const creative = adGroup.creativeLines[i];
      const rowNumber = startRow + i;

      const creativeFields = this.getCreativeLevelFields(creative);
      for (const [fieldName, value] of Object.entries(creativeFields)) {
        const colIndex = this.getColumnIndex(columnMap, fieldName, tab);
        if (colIndex !== undefined) {
          const row = worksheet.getRow(rowNumber);
          row.getCell(colIndex + 1).value = value;
        }
      }
    }

    return merges;
  }

  /**
   * Get campaign-level field values
   */
  private getCampaignLevelFields(
    campaignLine: CampaignLine,
    tab: TrafficSheetTab
  ): Record<string, any> {
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

    const fields: Record<string, any> = {
      platform: campaignLine.platform,
      startDate: this.formatDateForTrafficSheet(campaignLine.startDate),
      endDate: this.formatDateForTrafficSheet(campaignLine.endDate),
      objective: campaignLine.objective,
      language: campaignLine.language,
      buyType: buyType,
      optimizationEvent: '', // Left blank for execution team to input
    };

    // Tab-specific fields
    if (tab === 'Brand Say Digital') {
      fields.demo = this.extractDemographic(campaignLine.target);
      fields.placements = campaignLine.placements; // Maps to "Tactic" column
      fields.accuticsCampaignName = campaignLine.accuticsCampaignName;
    } else {
      // Social tabs
      fields.placements = campaignLine.accuticsCampaignName; // Maps to "Campaign Name (Taxonomy from Accuitics)"

      // Platform-specific placements (campaign level - merged by platform across ad groups)
      fields.adGroupPlacements = getDefaultPlacements(
        campaignLine.platform,
        campaignLine.adGroups[0]?.placements || ''
      );

      // Build trafficking notes
      const notes: string[] = [];
      if (campaignLine.tagsRequired) {
        notes.push(`Tags Required: ${campaignLine.tagsRequired}`);
      }
      if (campaignLine.adGroups[0]?.measurement) {
        notes.push(`Measurement: ${campaignLine.adGroups[0].measurement}`);
      }
      fields.traffickingNotes = notes.join('\n');
    }

    return fields;
  }

  /**
   * Get ad group-level field values
   */
  private getAdGroupLevelFields(
    adGroup: AdGroup,
    campaignLine: CampaignLine,
    tab: TrafficSheetTab
  ): Record<string, any> {
    const fields: Record<string, any> = {
      audience: adGroup.audience,
      kpi: adGroup.kpi,
    };

    // Tab-specific fields
    if (tab === 'Brand Say Digital') {
      fields.accuticsAdSetName = adGroup.accuticsCampaignName;
    } else {
      // Social tabs
      fields.adSetName = adGroup.accuticsCampaignName;
    }

    return fields;
  }

  /**
   * Get creative-level field values
   */
  private getCreativeLevelFields(creative: any): Record<string, any> {
    // Creative fields are typically left blank for creative agency to fill
    return {
      creativeName: creative.creativeName || '',
      linkToCreative: '',
      postCopy: '',
      headline: '',
    };
  }

  /**
   * Format date from blocking chart to traffic sheet format
   * Example: "2025-01-05" → "5-Jan-25"
   * Parses the date string directly to avoid timezone conversion issues
   */
  private formatDateForTrafficSheet(dateString: string): string {
    if (!dateString) return '';

    try {
      // Parse YYYY-MM-DD format directly without creating a Date object
      const parts = dateString.split('-');
      if (parts.length !== 3) return dateString;

      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      const monthName = DATE_CONFIG.MONTH_NAMES[monthIndex] || '';
      const yearShort = year.slice(-2);

      return `${day}-${monthName}-${yearShort}`;
    } catch (error) {
      return dateString; // Return original if parsing fails
    }
  }

  /**
   * Extract demographic code from target field
   * Example: "W25-49" from "Women 25-49 years old"
   */
  private extractDemographic(target?: string): string {
    if (!target) return DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;

    const match = target.match(DEMOGRAPHIC_CONFIG.DEMO_PATTERN);
    if (match) {
      return match[0]; // Return first match (e.g., "W25-49")
    }

    return DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;
  }

  /**
   * Get column index from map (try multiple variations)
   */
  private getColumnIndex(columnMap: Map<string, number>, fieldName: string, tab: TrafficSheetTab): number | undefined {
    // First, map the internal field name to the traffic sheet column name
    const fieldMappings = TRAFFIC_SHEET_FIELD_MAPPINGS[tab];
    const targetColumnName = fieldMappings[fieldName] || fieldName;

    // Try exact match first
    if (columnMap.has(targetColumnName)) {
      return columnMap.get(targetColumnName);
    }

    // Try normalized match
    const normalized = normalizeFieldName(targetColumnName);
    return columnMap.get(normalized);
  }

  /**
   * Apply all merge operations to worksheet
   */
  private applyMerges(worksheet: ExcelJS.Worksheet, merges: MergeInfo[]): void {
    for (const merge of merges) {
      try {
        worksheet.mergeCells(
          merge.startRow,
          merge.startCol,
          merge.endRow,
          merge.endCol
        );
      } catch (error) {
        // Merge may already exist or be invalid, skip
        console.warn(`Failed to merge cells: ${error.message}`);
      }
    }
  }

  /**
   * Apply borders to data region
   */
  private applyBorders(
    worksheet: ExcelJS.Worksheet,
    tab: TrafficSheetTab,
    lastRow: number
  ): void {
    const borderConfig = TRAFFIC_SHEET_CONFIG.BORDER_CONFIG[tab];
    if (!borderConfig) return;

    const borderStyle = {
      style: 'thin' as const,
      color: { argb: 'FF000000' },
    };

    // Apply borders to data region
    for (let row = TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW; row <= lastRow; row++) {
      for (let col = borderConfig.start; col <= borderConfig.end; col++) {
        const cell = worksheet.getRow(row).getCell(col);
        cell.border = {
          top: borderStyle,
          left: borderStyle,
          bottom: borderStyle,
          right: borderStyle,
        };
      }
    }
  }

  /**
   * Apply center horizontal and middle vertical alignment to all cells
   */
  private applyCellAlignment(
    worksheet: ExcelJS.Worksheet,
    lastRow: number
  ): void {
    // Apply alignment to all data rows (starting from first data row)
    for (let rowNum = TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW; rowNum <= lastRow; rowNum++) {
      const row = worksheet.getRow(rowNum);
      row.eachCell((cell) => {
        cell.alignment = {
          horizontal: 'center',
          vertical: 'middle',
          wrapText: true, // Enable text wrapping for better visibility
        };
      });
    }

    // Also apply alignment to header row
    const headerRow = worksheet.getRow(TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW);
    headerRow.eachCell((cell) => {
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      };
    });
  }

  /**
   * Auto-size columns and rows to fit content
   */
  private autoSizeColumnsAndRows(
    worksheet: ExcelJS.Worksheet,
    lastRow: number
  ): void {
    // Auto-size columns based on content
    worksheet.columns.forEach((column, index) => {
      if (!column) return;

      let maxLength = 0;
      const columnNumber = index + 1;

      // Check header row
      const headerCell = worksheet.getRow(TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW).getCell(columnNumber);
      if (headerCell.value) {
        maxLength = String(headerCell.value).length;
      }

      // Check all data rows
      for (let rowNum = TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW; rowNum <= lastRow; rowNum++) {
        const cell = worksheet.getRow(rowNum).getCell(columnNumber);
        if (cell.value) {
          const cellLength = String(cell.value).length;
          if (cellLength > maxLength) {
            maxLength = cellLength;
          }
        }
      }

      // Set column width with some padding (minimum 10, maximum 50)
      column.width = Math.min(Math.max(maxLength + 2, 10), 50);
    });

    // Auto-size rows (set minimum height for better visibility)
    for (let rowNum = TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW; rowNum <= lastRow; rowNum++) {
      const row = worksheet.getRow(rowNum);
      // Set minimum row height to 20 for better visibility
      row.height = Math.max(row.height || 0, 20);
    }

    // Set header row height
    const headerRow = worksheet.getRow(TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW);
    headerRow.height = Math.max(headerRow.height || 0, 25);
  }
}
