/**
 * Traffic Sheet Generator
 * Generates Excel traffic sheets from parsed blocking chart data
 * Handles categorization, merging, and formatting for all three tabs
 */
import * as ExcelJS from 'exceljs';
import type { ParsedBlockingChart } from '../types';
/**
 * Traffic Sheet Generator Class
 * Converts parsed campaign lines into formatted Excel traffic sheets
 */
export declare class TrafficSheetGenerator {
    /**
     * Generate traffic sheet Excel workbook from parsed blocking chart
     *
     * @param parsedChart - Parsed blocking chart data
     * @param templateBuffer - Optional template file as ArrayBuffer
     * @returns Excel workbook with traffic sheets
     */
    generate(parsedChart: ParsedBlockingChart, templateBuffer?: ArrayBuffer): Promise<ExcelJS.Workbook>;
    /**
     * Clear template data rows while preserving headers and formatting
     */
    private clearTemplateData;
    /**
     * Create workbook structure from scratch
     * Creates three worksheets with basic headers
     */
    private createWorkbookFromScratch;
    /**
     * Set up worksheet headers
     */
    private setupWorksheetHeaders;
    /**
     * Categorize campaign lines by traffic sheet tab
     */
    private categorizeCampaignLines;
    /**
     * Write campaign lines to a worksheet tab
     */
    private writeTab;
    /**
     * Write a single campaign line to worksheet
     * Returns merge information for later application
     */
    private writeCampaignLine;
    /**
     * Write a single ad group (5 creative lines)
     */
    private writeAdGroup;
    /**
     * Get campaign-level field values
     */
    private getCampaignLevelFields;
    /**
     * Get ad group-level field values
     */
    private getAdGroupLevelFields;
    /**
     * Get creative-level field values
     */
    private getCreativeLevelFields;
    /**
     * Format date from blocking chart to traffic sheet format
     * Example: "2025-01-05" → "5-Jan-25"
     * Parses the date string directly to avoid timezone conversion issues
     */
    private formatDateForTrafficSheet;
    /**
     * Extract demographic code from target field
     * Example: "W25-49" from "Women 25-49 years old"
     */
    private extractDemographic;
    /**
     * Get column index from map (try multiple variations)
     */
    private getColumnIndex;
    /**
     * Apply all merge operations to worksheet
     */
    private applyMerges;
    /**
     * Apply borders to data region
     */
    private applyBorders;
    /**
     * Apply center horizontal and middle vertical alignment to all cells
     */
    private applyCellAlignment;
    /**
     * Auto-size columns and rows to fit content
     */
    private autoSizeColumnsAndRows;
}
//# sourceMappingURL=TrafficSheetGenerator.d.ts.map