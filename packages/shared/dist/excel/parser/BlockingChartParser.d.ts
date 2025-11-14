/**
 * Blocking Chart Parser
 * Parses Excel blocking charts and builds hierarchical campaign line structure
 * with dynamic ad group detection based on audience values
 */
import type { ParsedBlockingChart } from '../types';
/**
 * Blocking Chart Parser Class
 * Converts Excel blocking chart into structured campaign line data
 */
export declare class BlockingChartParser {
    private validationWarnings;
    /**
     * Parse blocking chart Excel file into structured campaign lines
     *
     * @param fileBuffer - ArrayBuffer containing the Excel file data
     * @returns Parsed blocking chart with hierarchical campaign line structure
     */
    parse(fileBuffer: ArrayBuffer): Promise<ParsedBlockingChart>;
    /**
     * Find header row in worksheet
     * Header row contains column names like "Channel", "Platform", etc.
     */
    private findHeaderRow;
    /**
     * Extract metadata from rows above header (campaign name, client, etc.)
     */
    private extractMetadata;
    /**
     * Detect campaign lines by finding merged cells across budget, impressions, and placements columns
     * A campaign line is identified when these three columns are merged together
     */
    private detectCampaignLines;
    /**
     * Check if a row is a summary/total row (should be excluded)
     */
    private isSummaryRow;
    /**
     * Build campaign lines with audience-based ad group detection
     */
    private buildCampaignLines;
    /**
     * Build a single campaign line with dynamic ad group detection
     */
    private buildCampaignLine;
    /**
     * Detect ad groups by grouping rows by audience field
     * Each unique audience value = 1 ad group with 5 creative lines
     */
    private detectAdGroupsByAudience;
    /**
     * Find which field to use for audience grouping
     */
    private findAudienceField;
    /**
     * Build a single ad group with exactly 5 creative lines
     */
    private buildAdGroup;
    /**
     * Extract row data and map to internal field names
     */
    private extractRowData;
    /**
     * Find column index by trying multiple possible names
     */
    private findColumnIndex;
    /**
     * Validate campaign line and add warnings
     */
    private validateCampaignLine;
    /**
     * Add validation warning to global warnings list
     */
    private addWarning;
}
//# sourceMappingURL=BlockingChartParser.d.ts.map