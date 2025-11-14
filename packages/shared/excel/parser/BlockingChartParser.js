"use strict";
/**
 * Blocking Chart Parser
 * Parses Excel blocking charts and builds hierarchical campaign line structure
 * with dynamic ad group detection based on audience values
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
exports.BlockingChartParser = void 0;
const ExcelJS = __importStar(require("exceljs"));
const config_1 = require("../config");
const FieldMapper_1 = require("../utils/FieldMapper");
const FieldNormalizer_1 = require("../utils/FieldNormalizer");
const PlatformClassifier_1 = require("../utils/PlatformClassifier");
/**
 * Blocking Chart Parser Class
 * Converts Excel blocking chart into structured campaign line data
 */
class BlockingChartParser {
    validationWarnings = [];
    /**
     * Parse blocking chart Excel file into structured campaign lines
     *
     * @param fileBuffer - ArrayBuffer containing the Excel file data
     * @returns Parsed blocking chart with hierarchical campaign line structure
     */
    async parse(fileBuffer) {
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
        const campaignLines = this.buildCampaignLines(worksheet, headers, campaignLineRanges, headerRow);
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
    findHeaderRow(worksheet) {
        const maxRows = Math.min(worksheet.rowCount, config_1.PARSING_CONFIG.MAX_METADATA_ROWS + 5);
        for (let rowNumber = 1; rowNumber <= maxRows; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            const values = [];
            let nonEmptyCount = 0;
            row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                const value = String(cell.value || '').trim();
                values[colNumber - 1] = value;
                if (value)
                    nonEmptyCount++;
            });
            // Check if this row has enough non-empty cells and contains required keywords
            if (nonEmptyCount >= config_1.PARSING_CONFIG.MIN_HEADER_CELLS) {
                const normalizedValues = values.map(v => (0, FieldNormalizer_1.normalizeFieldName)(v));
                const hasRequiredKeywords = config_1.PARSING_CONFIG.REQUIRED_HEADER_KEYWORDS.every(keyword => normalizedValues.some(v => v.includes(keyword)));
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
    extractMetadata(worksheet, headerRow) {
        const metadata = {};
        // Scan rows above header for metadata
        for (let rowNumber = 1; rowNumber < headerRow; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            const firstCell = row.getCell(1).value;
            const secondCell = row.getCell(2).value;
            const label = String(firstCell || '').toLowerCase().trim();
            const value = String(secondCell || '').trim();
            if (label.includes('campaign') && value) {
                metadata.campaignName = value;
            }
            else if (label.includes('client') && value) {
                metadata.client = value;
            }
            else if (label.includes('brand') && value) {
                metadata.brand = value;
            }
            else if (label.includes('date') && value) {
                metadata.dateRange = value;
            }
        }
        return metadata;
    }
    /**
     * Detect campaign lines by finding merged cells across budget, impressions, and placements columns
     * A campaign line is identified when these three columns are merged together
     */
    detectCampaignLines(worksheet, headerRow, headers) {
        // Find column indexes for the three required merge indicators
        const budgetColIndex = this.findColumnIndex(headers, ['Gross Budget', 'Net Budget']);
        const impressionsColIndex = this.findColumnIndex(headers, ['Est. Impressions']);
        const placementsColIndex = this.findColumnIndex(headers, ['Campaign Details - Placements', 'Placements']);
        console.log('🔍 Column Detection:');
        console.log('  Budget column index:', budgetColIndex);
        console.log('  Impressions column index:', impressionsColIndex);
        console.log('  Placements column index:', placementsColIndex);
        console.log('  Available headers:', headers.filter(h => h));
        if (budgetColIndex === -1 || impressionsColIndex === -1 || placementsColIndex === -1) {
            this.addWarning('error', `Required columns not found - Budget: ${budgetColIndex}, Impressions: ${impressionsColIndex}, Placements: ${placementsColIndex}`, undefined, undefined);
            return [];
        }
        // Collect all merge ranges for these columns
        const budgetMerges = new Map(); // masterRow → span
        const impressionsMerges = new Map();
        const placementsMerges = new Map();
        // Helper function to get column letter from index
        const getColumnLetter = (index) => {
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
        const merges = worksheet.model?.merges || [];
        console.log(`📋 Total merge cells found: ${merges.length}`);
        for (const mergeRange of merges) {
            // Parse merge range (e.g., "A1:A5")
            const match = mergeRange.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
            if (!match)
                continue;
            const startCol = match[1];
            const startRow = parseInt(match[2]);
            const endCol = match[3];
            const endRow = parseInt(match[4]);
            const span = endRow - startRow + 1;
            // Skip if merge is in header or only 1 row
            if (startRow <= headerRow || span <= 1)
                continue;
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
        const campaignLineRanges = [];
        console.log(`🔗 Budget merges found: ${budgetMerges.size}`);
        console.log(`🔗 Impressions merges found: ${impressionsMerges.size}`);
        console.log(`🔗 Placements merges found: ${placementsMerges.size}`);
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
        return campaignLineRanges.sort((a, b) => a.masterRow - b.masterRow);
    }
    /**
     * Check if a row is a summary/total row (should be excluded)
     */
    isSummaryRow(worksheet, rowNumber, headers) {
        const row = worksheet.getRow(rowNumber);
        const values = {};
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
        for (const pattern of config_1.CAMPAIGN_LINE_DETECTION_CONFIG.EXCLUSION_PATTERNS) {
            if (textContent.includes(pattern)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Build campaign lines with audience-based ad group detection
     */
    buildCampaignLines(worksheet, headers, campaignLineRanges, headerRow) {
        const campaignLines = [];
        for (let index = 0; index < campaignLineRanges.length; index++) {
            const range = campaignLineRanges[index];
            try {
                const campaignLine = this.buildCampaignLine(worksheet, headers, range, index);
                campaignLines.push(campaignLine);
            }
            catch (error) {
                this.addWarning('error', `Failed to parse campaign line at row ${range.masterRow}: ${error.message}`, undefined, range.masterRow);
            }
        }
        return campaignLines;
    }
    /**
     * Build a single campaign line with dynamic ad group detection
     */
    buildCampaignLine(worksheet, headers, range, campaignLineIndex) {
        // Extract all rows in this campaign line
        const rows = [];
        for (let rowNum = range.masterRow; rowNum <= range.endRow; rowNum++) {
            const rowData = this.extractRowData(worksheet, rowNum, headers);
            rows.push(rowData);
        }
        // Get campaign-level data from first row
        const firstRow = rows[0];
        // Detect ad groups by grouping rows by audience
        const adGroups = this.detectAdGroupsByAudience(rows, headers);
        // Build campaign line
        const campaignLine = {
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
            // Campaign-level placements
            placements: firstRow.placements,
            // Metadata
            tagsRequired: firstRow.tagsRequired,
            // Exclusion check
            isExcluded: (0, PlatformClassifier_1.isExcludedChannel)(firstRow.channel || ''),
            excludedReason: (0, PlatformClassifier_1.getExclusionReason)(firstRow.channel || ''),
            // Ad groups (dynamically detected)
            adGroups,
            // Validation warnings
            validationWarnings: [],
            // Tracking metadata
            _sourceRowNumbers: Array.from({ length: range.span }, (_, i) => range.masterRow + i),
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
    detectAdGroupsByAudience(rows, headers) {
        // Find audience column
        const audienceField = this.findAudienceField(rows);
        // Group rows by audience value
        const rowsByAudience = new Map();
        for (const row of rows) {
            const audienceValue = row[audienceField] ||
                config_1.AD_GROUP_DETECTION_CONFIG.DEFAULT_AD_GROUP_NAME;
            if (!rowsByAudience.has(audienceValue)) {
                rowsByAudience.set(audienceValue, []);
            }
            rowsByAudience.get(audienceValue).push(row);
        }
        // Build ad groups
        const adGroups = [];
        for (const [audienceName, audienceRows] of rowsByAudience.entries()) {
            const adGroup = this.buildAdGroup(audienceName, audienceRows);
            adGroups.push(adGroup);
        }
        return adGroups;
    }
    /**
     * Find which field to use for audience grouping
     */
    findAudienceField(rows) {
        // Try primary field first
        if (rows.some(r => r[config_1.AD_GROUP_DETECTION_CONFIG.PRIMARY_GROUPING_FIELD])) {
            return config_1.AD_GROUP_DETECTION_CONFIG.PRIMARY_GROUPING_FIELD;
        }
        // Try fallback fields
        for (const field of config_1.AD_GROUP_DETECTION_CONFIG.FALLBACK_GROUPING_FIELDS) {
            if (rows.some(r => r[field])) {
                return field;
            }
        }
        // Default to primary
        return config_1.AD_GROUP_DETECTION_CONFIG.PRIMARY_GROUPING_FIELD;
    }
    /**
     * Build a single ad group with exactly 5 creative lines
     */
    buildAdGroup(audienceName, audienceRows) {
        // Get ad group-level data from first row
        const firstRow = audienceRows[0];
        // Always create exactly 5 creative lines
        const creativeLines = [];
        for (let i = 0; i < config_1.ROW_EXPANSION_CONFIG.CREATIVES_PER_AD_GROUP; i++) {
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
            buyType: firstRow.buyType,
            measurement: firstRow.measurement,
            // Creative lines (always 5)
            creativeLines,
        };
    }
    /**
     * Extract row data and map to internal field names
     */
    extractRowData(worksheet, rowNumber, headers) {
        const row = worksheet.getRow(rowNumber);
        const data = {};
        headers.forEach((header, index) => {
            if (!header)
                return;
            const cell = row.getCell(index + 1);
            const internalField = (0, FieldMapper_1.getInternalFieldName)(header);
            if (internalField) {
                let value = cell.value;
                // Handle date formatting
                if (value instanceof Date) {
                    value = value.toISOString().split('T')[0];
                }
                else if (typeof value === 'object' && value !== null) {
                    // Handle Excel rich text
                    value = value.text || String(value);
                }
                data[internalField] = value;
            }
        });
        return data;
    }
    /**
     * Find column index by trying multiple possible names
     */
    findColumnIndex(headers, possibleNames) {
        for (const name of possibleNames) {
            const index = headers.findIndex(h => h === name);
            if (index !== -1)
                return index;
        }
        // Try normalized matching
        const normalizedPossibleNames = possibleNames.map(n => (0, FieldNormalizer_1.normalizeFieldName)(n));
        for (let i = 0; i < headers.length; i++) {
            const normalized = (0, FieldNormalizer_1.normalizeFieldName)(headers[i]);
            if (normalizedPossibleNames.includes(normalized)) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Validate campaign line and add warnings
     */
    validateCampaignLine(campaignLine) {
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
    addWarning(severity, message, field, rowNumber) {
        this.validationWarnings.push({
            severity,
            message,
            field,
            rowNumber,
        });
    }
}
exports.BlockingChartParser = BlockingChartParser;
