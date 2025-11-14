"use strict";
/**
 * Traffic Sheet Generator
 * Generates Excel traffic sheets from parsed blocking chart data
 * Handles categorization, merging, and formatting for all three tabs
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficSheetGenerator = void 0;
const ExcelJS = __importStar(require("exceljs"));
const config_1 = require("../config");
const PlatformClassifier_1 = require("../utils/PlatformClassifier");
const FieldMapper_1 = require("../utils/FieldMapper");
const FieldNormalizer_1 = require("../utils/FieldNormalizer");
/**
 * Traffic Sheet Generator Class
 * Converts parsed campaign lines into formatted Excel traffic sheets
 */
class TrafficSheetGenerator {
    /**
     * Generate traffic sheet Excel workbook from parsed blocking chart
     *
     * @param parsedChart - Parsed blocking chart data
     * @param templatePath - Path to traffic sheet template file (optional)
     * @returns Excel workbook with traffic sheets
     */
    async generate(parsedChart, templatePath) {
        // Create or load workbook
        const workbook = new ExcelJS.Workbook();
        // For now, create workbook from scratch
        // TODO: Load template if provided
        await this.createWorkbookFromScratch(workbook);
        // Categorize campaign lines by tab
        const categorized = this.categorizeCampaignLines(parsedChart.campaignLines);
        // Write each tab
        await this.writeTab(workbook, 'Brand Say Digital', categorized['Brand Say Digital']);
        await this.writeTab(workbook, 'Brand Say Social', categorized['Brand Say Social']);
        await this.writeTab(workbook, 'Other Say Social', categorized['Other Say Social']);
        return workbook;
    }
    /**
     * Create workbook structure from scratch
     * Creates three worksheets with basic headers
     */
    async createWorkbookFromScratch(workbook) {
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
    setupWorksheetHeaders(worksheet, tab) {
        const headerRow = worksheet.getRow(config_1.TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW);
        // Get field mappings for this tab
        const fieldMappings = FieldMapper_1.TRAFFIC_SHEET_FIELD_MAPPINGS[tab];
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
    categorizeCampaignLines(campaignLines) {
        const categorized = {
            'Brand Say Digital': [],
            'Brand Say Social': [],
            'Other Say Social': [],
        };
        for (const campaignLine of campaignLines) {
            // Skip excluded channels (OOH, TV, Radio, Print)
            if (campaignLine.isExcluded) {
                continue;
            }
            // Determine which tab this campaign line belongs to
            const tab = (0, PlatformClassifier_1.getTrafficSheetTab)(campaignLine.platform, campaignLine.channel);
            categorized[tab].push(campaignLine);
        }
        return categorized;
    }
    /**
     * Write campaign lines to a worksheet tab
     */
    async writeTab(workbook, tabName, campaignLines) {
        const worksheet = workbook.getWorksheet(tabName);
        if (!worksheet) {
            throw new Error(`Worksheet ${tabName} not found`);
        }
        // Get headers from row 8
        const headerRow = worksheet.getRow(config_1.TRAFFIC_SHEET_CONFIG.HEADER_LABEL_ROW);
        const headers = [];
        headerRow.eachCell((cell, colNumber) => {
            headers[colNumber - 1] = String(cell.value || '');
        });
        // Build column index map for fast lookup
        const columnMap = (0, FieldMapper_1.buildColumnIndexMap)(headers);
        // Track current row position
        let currentRow = config_1.TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW;
        // Track all merges to apply at the end
        const allMerges = [];
        // Write each campaign line
        for (const campaignLine of campaignLines) {
            const merges = this.writeCampaignLine(worksheet, campaignLine, currentRow, tabName, columnMap);
            allMerges.push(...merges);
            // Calculate total rows for this campaign line
            const totalRows = campaignLine.adGroups.length * config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;
            currentRow += totalRows;
        }
        // Apply all merges
        this.applyMerges(worksheet, allMerges);
        // Apply borders
        this.applyBorders(worksheet, tabName, currentRow - 1);
    }
    /**
     * Write a single campaign line to worksheet
     * Returns merge information for later application
     */
    writeCampaignLine(worksheet, campaignLine, startRow, tab, columnMap) {
        const merges = [];
        const totalRows = campaignLine.adGroups.length * config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;
        const endRow = startRow + totalRows - 1;
        // Write campaign-level fields (merge across all rows)
        const campaignFields = this.getCampaignLevelFields(campaignLine, tab);
        for (const [fieldName, value] of Object.entries(campaignFields)) {
            const colIndex = this.getColumnIndex(columnMap, fieldName);
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
            const adGroupMerges = this.writeAdGroup(worksheet, adGroup, campaignLine, currentRow, tab, columnMap);
            merges.push(...adGroupMerges);
            currentRow += config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP;
        }
        return merges;
    }
    /**
     * Write a single ad group (5 creative lines)
     */
    writeAdGroup(worksheet, adGroup, campaignLine, startRow, tab, columnMap) {
        const merges = [];
        const endRow = startRow + config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP - 1;
        // Write ad group-level fields (merge across 5 rows)
        const adGroupFields = this.getAdGroupLevelFields(adGroup, campaignLine, tab);
        for (const [fieldName, value] of Object.entries(adGroupFields)) {
            const colIndex = this.getColumnIndex(columnMap, fieldName);
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
        for (let i = 0; i < config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP; i++) {
            const creative = adGroup.creativeLines[i];
            const rowNumber = startRow + i;
            const creativeFields = this.getCreativeLevelFields(creative);
            for (const [fieldName, value] of Object.entries(creativeFields)) {
                const colIndex = this.getColumnIndex(columnMap, fieldName);
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
    getCampaignLevelFields(campaignLine, tab) {
        const fields = {
            platform: campaignLine.platform,
            startDate: this.formatDateForTrafficSheet(campaignLine.startDate),
            endDate: this.formatDateForTrafficSheet(campaignLine.endDate),
            objective: campaignLine.objective,
            language: campaignLine.language,
            buyType: campaignLine.adGroups[0]?.buyType,
        };
        // Tab-specific fields
        if (tab === 'Brand Say Digital') {
            fields.demo = this.extractDemographic(campaignLine.target);
            fields.placements = campaignLine.placements; // Maps to "Tactic" column
            fields.accuticsCampaignName = campaignLine.adGroups[0]?.accuticsCampaignName;
        }
        else {
            // Social tabs
            fields.placements = campaignLine.placements; // Maps to "Campaign Name (Taxonomy from Accuitics)"
            // Build trafficking notes
            const notes = [];
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
    getAdGroupLevelFields(adGroup, campaignLine, tab) {
        const fields = {
            audience: adGroup.audience,
            optimizationEvent: 'Lowest Cost', // Default
            kpi: adGroup.kpi,
        };
        // Platform-specific placements (ad group level)
        fields.adGroupPlacements = (0, PlatformClassifier_1.getDefaultPlacements)(campaignLine.platform, adGroup.placements || '');
        // Tab-specific fields
        if (tab === 'Brand Say Digital') {
            fields.accuticsAdSetName = adGroup.accuticsCampaignName;
        }
        else {
            // Social tabs
            fields.adSetName = adGroup.accuticsCampaignName;
        }
        return fields;
    }
    /**
     * Get creative-level field values
     */
    getCreativeLevelFields(creative) {
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
     */
    formatDateForTrafficSheet(dateString) {
        if (!dateString)
            return '';
        try {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = config_1.DATE_CONFIG.MONTH_NAMES[date.getMonth()] || '';
            const year = String(date.getFullYear()).slice(-2);
            return `${day}-${month}-${year}`;
        }
        catch (error) {
            return dateString; // Return original if parsing fails
        }
    }
    /**
     * Extract demographic code from target field
     * Example: "W25-49" from "Women 25-49 years old"
     */
    extractDemographic(target) {
        if (!target)
            return config_1.DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;
        const match = target.match(config_1.DEMOGRAPHIC_CONFIG.DEMO_PATTERN);
        if (match) {
            return match[0]; // Return first match (e.g., "W25-49")
        }
        return config_1.DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;
    }
    /**
     * Get column index from map (try multiple variations)
     */
    getColumnIndex(columnMap, fieldName) {
        // Try exact match first
        if (columnMap.has(fieldName)) {
            return columnMap.get(fieldName);
        }
        // Try normalized match
        const normalized = (0, FieldNormalizer_1.normalizeFieldName)(fieldName);
        return columnMap.get(normalized);
    }
    /**
     * Apply all merge operations to worksheet
     */
    applyMerges(worksheet, merges) {
        for (const merge of merges) {
            try {
                worksheet.mergeCells(merge.startRow, merge.startCol, merge.endRow, merge.endCol);
            }
            catch (error) {
                // Merge may already exist or be invalid, skip
                console.warn(`Failed to merge cells: ${error.message}`);
            }
        }
    }
    /**
     * Apply borders to data region
     */
    applyBorders(worksheet, tab, lastRow) {
        const borderConfig = config_1.TRAFFIC_SHEET_CONFIG.BORDER_CONFIG[tab];
        if (!borderConfig)
            return;
        const borderStyle = {
            style: 'thin',
            color: { argb: 'FF000000' },
        };
        // Apply borders to data region
        for (let row = config_1.TRAFFIC_SHEET_CONFIG.FIRST_DATA_ROW; row <= lastRow; row++) {
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
}
exports.TrafficSheetGenerator = TrafficSheetGenerator;
