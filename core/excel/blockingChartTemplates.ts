import ExcelJS from "exceljs";

export interface BlockingChartTemplate {
  id: string;
  name: string;
  description: string;
  // Column mappings: template column name → standard field name
  columnMappings: Record<string, string>;
  // Detection rules to identify this template
  detectionRules: {
    requiredColumns: string[];  // Must have these columns
    optionalColumns?: string[]; // May have these
    sheetNamePattern?: RegExp;  // Sheet name must match
  };
  // Parser-specific config
  config?: {
    headerRowHint?: number;     // Likely row number for headers
    skipRows?: number;          // Rows to skip at top
    customParsing?: (worksheet: ExcelJS.Worksheet) => any;
  };
}

export const blockingChartTemplates: BlockingChartTemplate[] = [
  {
    id: "unilever-standard",
    name: "Unilever Standard",
    description: "Standard Unilever blocking chart format",
    columnMappings: {
      "Channel": "channel",
      "Tactic": "tactic",
      "Platform": "platform",
      "Objective": "objective",
      "Placements": "placements",
      "Optimization KPI": "optimizationKpi",
      "Demo": "demo",
      "Targeting": "targeting",
      "Language": "language",
      "Accutics Campaign Name": "accuticsCampaignName",
      "Accutics Ad Set Name": "accuticsAdSetName",
      "CPM/CPP": "cpmCpp",
      "Impressions/GRPs": "impressionsGrps",
      "Start Date": "startDate",
      "End Date": "endDate",
      "Media Cost": "mediaCost",
      "Ad Serving": "adServing",
      "DV Cost": "dvCost",
      "Media Fee Total": "mediaFeeTotal",
      "Working Media Budget": "workingMediaBudget",
    },
    detectionRules: {
      requiredColumns: ["Channel", "Tactic", "Platform"],
      optionalColumns: ["Accutics Campaign Name", "Working Media Budget"],
    },
  },
  {
    id: "unilever-extended",
    name: "Unilever Extended Format",
    description: "Extended blocking chart with additional depth",
    columnMappings: {
      // All standard mappings from above, PLUS extended fields:
      "Channel": "channel",
      "Tactic": "tactic",
      "Platform": "platform",
      "Objective": "objective",
      "Sub-Objective": "subObjective",           // NEW
      "Placements": "placements",
      "Placement Details": "placementDetails",   // NEW
      "Optimization KPI": "optimizationKpi",
      "KPI Target": "kpiTarget",                 // NEW
      "Demo": "demo",
      "Demo Details": "demoDetails",             // NEW
      "Targeting": "targeting",
      "Targeting Strategy": "targetingStrategy", // NEW
      "Language": "language",
      "Market": "market",                        // NEW
      "Region": "region",                        // NEW
      "Accutics Campaign Name": "accuticsCampaignName",
      "Accutics Ad Set Name": "accuticsAdSetName",
      "Creative Strategy": "creativeStrategy",   // NEW
      "Creative Format": "creativeFormat",       // NEW
      "CPM/CPP": "cpmCpp",
      "Impressions/GRPs": "impressionsGrps",
      "Frequency Cap": "frequencyCap",           // NEW
      "Start Date": "startDate",
      "End Date": "endDate",
      "Flight Pattern": "flightPattern",         // NEW
      "Media Cost": "mediaCost",
      "Production Cost": "productionCost",       // NEW
      "Ad Serving": "adServing",
      "DV Cost": "dvCost",
      "Media Fee Total": "mediaFeeTotal",
      "Working Media Budget": "workingMediaBudget",
      "Vendor": "vendor",                        // NEW
      "PO Number": "poNumber",                   // NEW
      "Budget Category": "budgetCategory",       // NEW
      "Campaign Type": "campaignType",           // NEW
    },
    detectionRules: {
      // If we see any of these "extended" columns, it's the extended format
      requiredColumns: ["Channel", "Tactic", "Platform"],
      optionalColumns: ["Sub-Objective", "Creative Strategy", "Flight Pattern", "Vendor", "KPI Target", "Budget Category"],
    },
  },
];

/**
 * Auto-detect which template a blocking chart uses based on its headers
 */
export function detectBlockingChartTemplate(
  headers: string[]
): BlockingChartTemplate | null {
  const normalizedHeaders = headers.map(h => h.trim().toLowerCase());
  
  console.log('🔍 Detecting blocking chart template...');
  console.log('Headers found:', headers);
  
  // Check extended template first (more specific)
  for (let i = blockingChartTemplates.length - 1; i >= 0; i--) {
    const template = blockingChartTemplates[i];
    
    // Check required columns
    const hasAllRequired = template.detectionRules.requiredColumns.every(col =>
      normalizedHeaders.some(h => h === col.toLowerCase())
    );
    
    if (!hasAllRequired) {
      continue;
    }
    
    // For extended template, check if it has at least 2 optional "extended" columns
    if (template.id === 'unilever-extended' && template.detectionRules.optionalColumns) {
      const extendedColumnsFound = template.detectionRules.optionalColumns.filter(col =>
        normalizedHeaders.some(h => h === col.toLowerCase())
      );
      
      if (extendedColumnsFound.length >= 2) {
        console.log(`✅ Detected template: ${template.name}`);
        console.log(`Extended columns found: ${extendedColumnsFound.join(', ')}`);
        return template;
      }
    }
    
    // For standard template, just check required columns
    if (template.id === 'unilever-standard') {
      console.log(`✅ Detected template: ${template.name}`);
      return template;
    }
  }
  
  console.log('⚠️ No template matched, will use auto-normalization');
  return null; // No template matched
}

/**
 * Get the mapped field name for a header using the detected template
 */
export function getMappedFieldName(
  header: string,
  template: BlockingChartTemplate | null,
  fallbackNormalizer: (header: string) => string
): string {
  if (template && template.columnMappings[header]) {
    return template.columnMappings[header];
  }
  
  // Fall back to auto-normalization
  return fallbackNormalizer(header);
}

