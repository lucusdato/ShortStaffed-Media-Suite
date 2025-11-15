/**
 * Error Message Catalog for QuickClick Media Tools
 *
 * Provides user-friendly, actionable error messages with:
 * - Clear explanations of what went wrong
 * - Suggestions for how to fix issues
 * - Grouping of similar errors
 * - Severity levels (error, warning, info)
 */

import type { ValidationError } from '@quickclick/shared/excel';

// ============================================================================
// ERROR CODES
// ============================================================================

export enum ValidationErrorCode {
  // Required field errors
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  EMPTY_VALUE = 'EMPTY_VALUE',

  // Data type errors
  INVALID_NUMBER_FORMAT = 'INVALID_NUMBER_FORMAT',
  INVALID_DATE_FORMAT = 'INVALID_DATE_FORMAT',
  NEGATIVE_VALUE = 'NEGATIVE_VALUE',

  // Date-specific errors
  DATE_RANGE_INVALID = 'DATE_RANGE_INVALID',
  DATE_OUT_OF_RANGE = 'DATE_OUT_OF_RANGE',

  // Budget calculation
  BUDGET_MISMATCH = 'BUDGET_MISMATCH',
  BUDGET_CALCULATION_ERROR = 'BUDGET_CALCULATION_ERROR',

  // Data quality
  WHITESPACE_DETECTED = 'WHITESPACE_DETECTED',
  DUPLICATE_HEADER = 'DUPLICATE_HEADER',
  UNKNOWN_PLATFORM = 'UNKNOWN_PLATFORM',

  // Template issues
  TEMPLATE_NOT_RECOGNIZED = 'TEMPLATE_NOT_RECOGNIZED',
  MISSING_REQUIRED_HEADER = 'MISSING_REQUIRED_HEADER',
  INVALID_TEMPLATE_STRUCTURE = 'INVALID_TEMPLATE_STRUCTURE',

  // General
  VALIDATION_WARNING = 'VALIDATION_WARNING',
  VALIDATION_INFO = 'VALIDATION_INFO',
}

// ============================================================================
// ERROR MESSAGE TEMPLATES
// ============================================================================

interface MessageTemplate {
  code: ValidationErrorCode;
  severity: 'error' | 'warning' | 'info';
  template: (context: Record<string, any>) => string;
  suggestion?: (context: Record<string, any>) => string;
  helpUrl?: string;
}

const ERROR_TEMPLATES: MessageTemplate[] = [
  {
    code: ValidationErrorCode.MISSING_REQUIRED_FIELD,
    severity: 'error',
    template: (ctx) =>
      `Missing required field: ${ctx.fieldName || ctx.field}`,
    suggestion: (ctx) => {
      const fieldSuggestions: Record<string, string> = {
        platform: 'Enter a platform like "Meta", "TradeDesk", or "TikTok"',
        channel: 'Enter a channel like "Paid Social", "Programmatic Display", or "CTV"',
        tactic: 'Enter a tactic description',
        startDate: 'Enter campaign start date in YYYY-MM-DD format (e.g., 2025-03-15)',
        endDate: 'Enter campaign end date in YYYY-MM-DD format (e.g., 2025-04-30)',
      };
      return fieldSuggestions[ctx.field] || `Please provide a value for ${ctx.fieldName || ctx.field}`;
    },
  },
  {
    code: ValidationErrorCode.INVALID_NUMBER_FORMAT,
    severity: 'error',
    template: (ctx) =>
      `${ctx.fieldName || ctx.field} must be a valid number${ctx.value ? `, got: "${ctx.value}"` : ''}`,
    suggestion: (ctx) => {
      const fieldExamples: Record<string, string> = {
        cpmCpp: 'Enter a CPM value like "15.50" or "22.00"',
        budget: 'Enter a budget amount like "50000" or "125000.00"',
        impressionsGrps: 'Enter impressions like "1000000" or "2500000"',
      };
      return fieldExamples[ctx.field] || 'Please enter a numeric value (e.g., 15.50)';
    },
  },
  {
    code: ValidationErrorCode.INVALID_DATE_FORMAT,
    severity: 'error',
    template: (ctx) =>
      `${ctx.fieldName || ctx.field} should use YYYY-MM-DD format${ctx.value ? `, got: "${ctx.value}"` : ''}`,
    suggestion: () =>
      'Expected format: YYYY-MM-DD (e.g., 2025-03-15). Common formats like M/D/YYYY or "Mar 15, 2025" can be auto-converted.',
  },
  {
    code: ValidationErrorCode.DATE_RANGE_INVALID,
    severity: 'error',
    template: (ctx) =>
      `Start date (${ctx.startDate}) is after end date (${ctx.endDate})`,
    suggestion: () =>
      'Ensure the campaign start date comes before the end date',
  },
  {
    code: ValidationErrorCode.BUDGET_MISMATCH,
    severity: 'warning',
    template: (ctx) =>
      `Budget calculation mismatch: Expected ${ctx.expectedBudget} based on CPM and impressions, got ${ctx.actualBudget}. Difference: ${ctx.percentDiff}%`,
    suggestion: () =>
      'This may be due to ad serving fees, DV costs, platform fees, or buffer. Verify your budget calculation includes all components.',
  },
  {
    code: ValidationErrorCode.WHITESPACE_DETECTED,
    severity: 'warning',
    template: (ctx) =>
      `${ctx.fieldName || ctx.field} has leading or trailing whitespace: "${ctx.value}"`,
    suggestion: () =>
      'Whitespace will be automatically trimmed',
  },
  {
    code: ValidationErrorCode.NEGATIVE_VALUE,
    severity: 'warning',
    template: (ctx) =>
      `${ctx.fieldName || ctx.field} has a negative value: ${ctx.value}`,
    suggestion: () =>
      'Verify that this negative value is intentional',
  },
  {
    code: ValidationErrorCode.UNKNOWN_PLATFORM,
    severity: 'warning',
    template: (ctx) =>
      `Platform "${ctx.value}" is not recognized`,
    suggestion: () =>
      'Supported platforms: Meta, TradeDesk, TikTok, Snapchat, Pinterest, Reddit, Amazon, DV360. The value will be used as-is.',
  },
];

// ============================================================================
// USER-FRIENDLY FIELD NAMES
// ============================================================================

const FIELD_DISPLAY_NAMES: Record<string, string> = {
  // Campaign details
  channel: 'Channel',
  platform: 'Platform',
  mediaType: 'Media Type',
  tactic: 'Tactic',
  objective: 'Objective',
  buyType: 'Buy Type',
  language: 'Language',

  // Budget fields
  budget: 'Budget',
  mediaCost: 'Media Cost',
  grossBudget: 'Gross Budget',
  netBudget: 'Net Budget',
  workingMediaBudget: 'Working Media Budget',

  // Metrics
  cpmCpp: 'CPM/CPP',
  impressionsGrps: 'Impressions/GRPs',
  adServing: 'Ad Serving Fee',
  dvCost: 'DV Cost',
  mediaFeeTotal: 'Media Fee Total',

  // Dates
  startDate: 'Start Date',
  endDate: 'End Date',
  flightStartDate: 'Flight Start Date',
  flightEndDate: 'Flight End Date',

  // Campaign metadata
  placements: 'Placements',
  adFormat: 'Ad Format',
  unitSize: 'Unit Size',

  // Taxonomy
  cnCode: 'CN Code',
  marketName: 'Market Name',
  country: 'Country',
  brand: 'Brand',
  campaignName: 'Campaign Name',
};

/**
 * Converts internal field name to user-friendly display name
 */
export function getFieldDisplayName(field: string): string {
  return FIELD_DISPLAY_NAMES[field] || field;
}

// ============================================================================
// ERROR GROUPING
// ============================================================================

export interface ErrorGroup {
  code: ValidationErrorCode;
  severity: 'error' | 'warning' | 'info';
  count: number;
  rows: number[];
  field?: string;
  message: string;
  suggestion?: string;
  examples?: string[];
}

/**
 * Groups similar validation errors together
 */
export function groupValidationErrors(errors: ValidationError[]): ErrorGroup[] {
  const groups = new Map<string, ErrorGroup>();

  for (const error of errors) {
    // Create grouping key: code + field (if present)
    const key = error.code
      ? `${error.code}:${error.field || 'general'}`
      : `${error.severity}:${error.field || 'general'}`;

    const existing = groups.get(key);

    if (existing) {
      existing.count++;
      existing.rows.push(error.rowIndex);
      if (error.message && !existing.examples?.includes(error.message)) {
        existing.examples = existing.examples || [];
        if (existing.examples.length < 3) {
          existing.examples.push(error.message);
        }
      }
    } else {
      groups.set(key, {
        code: error.code || ValidationErrorCode.VALIDATION_WARNING,
        severity: error.severity,
        count: 1,
        rows: [error.rowIndex],
        field: error.field,
        message: error.message,
        examples: [error.message],
      });
    }
  }

  return Array.from(groups.values());
}

/**
 * Formats grouped errors into user-friendly messages
 */
export function formatErrorGroup(group: ErrorGroup): string {
  const { count, rows, field, message, severity } = group;

  // Icon based on severity
  const icon = severity === 'error' ? '❌' : severity === 'warning' ? '⚠️' : 'ℹ️';

  // Field name
  const fieldName = field ? getFieldDisplayName(field) : '';

  // Row list (show first 5, then "and X more")
  const rowList = rows.length <= 5
    ? rows.join(', ')
    : `${rows.slice(0, 5).join(', ')} and ${rows.length - 5} more`;

  if (count === 1) {
    return `${icon} Row ${rows[0]}${fieldName ? ` - ${fieldName}` : ''}: ${message}`;
  } else {
    // Group message
    return `${icon} ${count} rows have issues${fieldName ? ` with ${fieldName}` : ''} (rows: ${rowList})
   ${message}`;
  }
}

/**
 * Formats all grouped errors into a readable summary
 */
export function formatErrorSummary(errors: ValidationError[]): string {
  if (errors.length === 0) {
    return '✅ No validation errors found';
  }

  const groups = groupValidationErrors(errors);

  // Separate by severity
  const errorGroups = groups.filter(g => g.severity === 'error');
  const warningGroups = groups.filter(g => g.severity === 'warning');
  const infoGroups = groups.filter(g => g.severity === 'info');

  let summary = '';

  if (errorGroups.length > 0) {
    summary += `\n❌ ERRORS (${errorGroups.length} types, ${errorGroups.reduce((sum, g) => sum + g.count, 0)} total)\n`;
    summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    errorGroups.forEach(group => {
      summary += formatErrorGroup(group) + '\n';
      if (group.suggestion) {
        summary += `   💡 ${group.suggestion}\n`;
      }
      summary += '\n';
    });
  }

  if (warningGroups.length > 0) {
    summary += `\n⚠️  WARNINGS (${warningGroups.length} types, ${warningGroups.reduce((sum, g) => sum + g.count, 0)} total)\n`;
    summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    warningGroups.forEach(group => {
      summary += formatErrorGroup(group) + '\n';
      if (group.suggestion) {
        summary += `   💡 ${group.suggestion}\n`;
      }
      summary += '\n';
    });
  }

  if (infoGroups.length > 0) {
    summary += `\nℹ️  INFO (${infoGroups.length} items)\n`;
    summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    infoGroups.forEach(group => {
      summary += formatErrorGroup(group) + '\n\n';
    });
  }

  return summary;
}

// ============================================================================
// BUDGET CALCULATION EXPLANATION
// ============================================================================

export interface BudgetBreakdown {
  impressions: number;
  cpm: number;
  baseMediaCost: number;
  adServingFee?: number;
  dvCost?: number;
  platformFee?: number;
  buffer?: number;
  totalExpected: number;
  actualBudget: number;
  difference: number;
  percentDiff: number;
}

/**
 * Generates detailed budget calculation explanation
 */
export function explainBudgetCalculation(breakdown: BudgetBreakdown): string {
  const {
    impressions,
    cpm,
    baseMediaCost,
    adServingFee,
    dvCost,
    platformFee,
    buffer,
    totalExpected,
    actualBudget,
    difference,
    percentDiff,
  } = breakdown;

  const formatCurrency = (val: number) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatNumber = (val: number) => val.toLocaleString('en-US');

  let explanation = '\n💰 Budget Calculation Breakdown:\n';
  explanation += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  explanation += `Base Media Cost:\n`;
  explanation += `  ${formatNumber(impressions)} impressions ÷ 1,000 × ${formatCurrency(cpm)} CPM = ${formatCurrency(baseMediaCost)}\n\n`;

  if (adServingFee || dvCost || platformFee || buffer) {
    explanation += 'Additional Costs:\n';
    if (adServingFee) explanation += `  Ad Serving Fee: +${formatCurrency(adServingFee)}\n`;
    if (dvCost) explanation += `  DV/Verification: +${formatCurrency(dvCost)}\n`;
    if (platformFee) explanation += `  Platform Fee: +${formatCurrency(platformFee)}\n`;
    if (buffer) explanation += `  Buffer: +${formatCurrency(buffer)}\n`;
    explanation += '\n';
  }

  explanation += `Expected Total: ${formatCurrency(totalExpected)}\n`;
  explanation += `Actual Budget: ${formatCurrency(actualBudget)}\n`;
  explanation += `Difference: ${difference >= 0 ? '+' : ''}${formatCurrency(difference)} (${percentDiff >= 0 ? '+' : ''}${percentDiff.toFixed(1)}%)\n`;
  explanation += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

  if (Math.abs(percentDiff) <= 10) {
    explanation += '✅ Difference is within acceptable range (≤10%)\n';
  } else if (Math.abs(percentDiff) <= 20) {
    explanation += '⚠️  Difference is moderate (10-20%). This may be due to:\n';
    explanation += '   • Ad serving fees not included in calculation\n';
    explanation += '   • DV/verification costs\n';
    explanation += '   • Platform fees or buffer\n';
    explanation += '   • Rounding differences\n';
  } else {
    explanation += '❌ Difference is significant (>20%). Please verify:\n';
    explanation += '   • CPM value is correct\n';
    explanation += '   • Impressions value is correct\n';
    explanation += '   • Budget includes all fees (ad serving, DV, etc.)\n';
  }

  return explanation;
}

// ============================================================================
// ENHANCED ERROR INTERFACE
// ============================================================================

export interface EnhancedValidationError extends ValidationError {
  code?: ValidationErrorCode;
  displayFieldName?: string;
  suggestion?: string;
  autoFixAvailable?: boolean;
  helpUrl?: string;
}

/**
 * Enhances a validation error with user-friendly information
 */
export function enhanceValidationError(error: ValidationError): EnhancedValidationError {
  const enhanced: EnhancedValidationError = {
    ...error,
    displayFieldName: error.field ? getFieldDisplayName(error.field) : undefined,
  };

  // Try to match error template
  const template = ERROR_TEMPLATES.find(t =>
    error.code === t.code || error.message?.includes(t.template({}).substring(0, 20))
  );

  if (template) {
    enhanced.code = template.code;
    enhanced.suggestion = template.suggestion?.({ ...error });
    enhanced.helpUrl = template.helpUrl;
  }

  // Determine if auto-fix is available
  if (error.field) {
    const autoFixableFields = [
      'startDate', 'endDate',           // Date normalization
      'cpmCpp', 'budget', 'impressionsGrps',  // Numeric extraction
      'platform',                        // Platform normalization
    ];
    enhanced.autoFixAvailable = autoFixableFields.includes(error.field);
  }

  return enhanced;
}
