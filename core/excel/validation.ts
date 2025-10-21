/**
 * Row-level validation for blocking chart data
 * Provides detailed error messages for data quality issues
 */

import { ParsedBlockingChartRow, ParsedBlockingChart } from "./types";
import { VALIDATION_CONFIG } from "./config";

export interface ValidationError {
  rowIndex: number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Checks if a row is a summary/total row that should be skipped
 */
function isSummaryRow(row: ParsedBlockingChartRow): boolean {
  // Check channel field for summary indicators
  const channel = String(row.channel || '').toLowerCase().trim();

  const summaryKeywords = [
    'total',
    'subtotal',
    'grand total',
    'variance',
    'budget',
    'mpa budget',
    'working total'
  ];

  const isSummary = summaryKeywords.some(keyword => channel.includes(keyword));

  // Also check if the row has very few fields (likely a separator or total row)
  const fieldCount = Object.keys(row).filter(key => {
    const value = row[key];
    return !key.startsWith('_') && value !== undefined && value !== null && String(value).trim() !== '';
  }).length;

  return isSummary || fieldCount < 3;
}

/**
 * Validates a single row from the blocking chart
 */
export function validateBlockingChartRow(
  row: ParsedBlockingChartRow,
  rowIndex: number
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Skip validation for summary/total rows
  if (isSummaryRow(row)) {
    return errors;
  }

  // Check required fields
  VALIDATION_CONFIG.REQUIRED_TACTIC_FIELDS.forEach(field => {
    const value = row[field];
    if (!value || String(value).trim() === '') {
      errors.push({
        rowIndex,
        field,
        message: `Missing required field: ${field}`,
        severity: 'error'
      });
    }
  });

  // Validate numeric fields
  VALIDATION_CONFIG.NUMERIC_FIELDS.forEach(field => {
    const value = row[field];
    if (value !== undefined && value !== null && value !== '') {
      const numValue = typeof value === 'number' ? value : parseFloat(String(value));

      if (isNaN(numValue)) {
        errors.push({
          rowIndex,
          field,
          message: `Field "${field}" must be a valid number, got: "${value}"`,
          severity: 'error'
        });
      } else if (numValue < 0) {
        errors.push({
          rowIndex,
          field,
          message: `Field "${field}" cannot be negative, got: ${numValue}`,
          severity: 'warning'
        });
      }
    }
  });

  // Validate date fields
  VALIDATION_CONFIG.DATE_FIELDS.forEach(field => {
    const value = row[field];
    if (value !== undefined && value !== null && value !== '') {
      const dateValue = typeof value === 'string' ? value : String(value);

      // Check if it's a valid ISO date (YYYY-MM-DD)
      const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!isoDatePattern.test(dateValue)) {
        // Try to parse it anyway
        const parsedDate = new Date(dateValue);
        if (isNaN(parsedDate.getTime())) {
          errors.push({
            rowIndex,
            field,
            message: `Field "${field}" is not a valid date format. Expected YYYY-MM-DD, got: "${dateValue}"`,
            severity: 'error'
          });
        } else {
          // Valid date but wrong format - warning only
          errors.push({
            rowIndex,
            field,
            message: `Field "${field}" should use YYYY-MM-DD format, got: "${dateValue}"`,
            severity: 'warning'
          });
        }
      }
    }
  });

  // Validate date range (startDate should be before endDate)
  if (row.startDate && row.endDate) {
    const startDate = new Date(String(row.startDate));
    const endDate = new Date(String(row.endDate));

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      if (startDate > endDate) {
        errors.push({
          rowIndex,
          field: 'startDate',
          message: `Start date (${row.startDate}) is after end date (${row.endDate})`,
          severity: 'error'
        });
      }
    }
  }

  // Validate CPM/CPP and impressions relationship
  if (row.cpmCpp && row.impressionsGrps && row.budget) {
    const cpm = typeof row.cpmCpp === 'number' ? row.cpmCpp : parseFloat(String(row.cpmCpp));
    const impressions = typeof row.impressionsGrps === 'number' ? row.impressionsGrps : parseFloat(String(row.impressionsGrps));
    const budget = typeof row.budget === 'number' ? row.budget : parseFloat(String(row.budget));

    if (!isNaN(cpm) && !isNaN(impressions) && !isNaN(budget)) {
      // Calculate expected budget: (impressions / 1000) * cpm
      const expectedBudget = (impressions / 1000) * cpm;
      const difference = Math.abs(expectedBudget - budget);
      const percentDiff = (difference / budget) * 100;

      // If difference is more than 10%, warn
      if (percentDiff > 10) {
        errors.push({
          rowIndex,
          field: 'budget',
          message: `Budget calculation mismatch: Expected ${expectedBudget.toFixed(2)} based on CPM and impressions, got ${budget}. Difference: ${percentDiff.toFixed(1)}%`,
          severity: 'warning'
        });
      }
    }
  }

  // Check for empty or whitespace-only values in key fields
  const keyFields = ['platform', 'objective', 'tactic', 'channel'];
  keyFields.forEach(field => {
    const value = row[field];
    if (value && typeof value === 'string' && value.trim() !== value) {
      errors.push({
        rowIndex,
        field,
        message: `Field "${field}" has leading/trailing whitespace: "${value}"`,
        severity: 'warning'
      });
    }
  });

  return errors;
}

/**
 * Validates all rows in a parsed blocking chart
 */
export function validateBlockingChartRows(
  parsed: ParsedBlockingChart
): ValidationResult {
  const allErrors: ValidationError[] = [];
  const allWarnings: ValidationError[] = [];

  parsed.rows.forEach((row, index) => {
    const rowErrors = validateBlockingChartRow(row, index + 1); // 1-indexed for user display

    rowErrors.forEach(error => {
      if (error.severity === 'error') {
        allErrors.push(error);
      } else {
        allWarnings.push(error);
      }
    });
  });

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
}

/**
 * Formats validation errors into a human-readable string
 */
export function formatValidationErrors(result: ValidationResult): string {
  const lines: string[] = [];

  if (result.errors.length > 0) {
    lines.push(`Found ${result.errors.length} error(s):`);
    result.errors.forEach(error => {
      lines.push(`  Row ${error.rowIndex}, ${error.field}: ${error.message}`);
    });
  }

  if (result.warnings.length > 0) {
    lines.push(`\nFound ${result.warnings.length} warning(s):`);
    result.warnings.forEach(warning => {
      lines.push(`  Row ${warning.rowIndex}, ${warning.field}: ${warning.message}`);
    });
  }

  return lines.join('\n');
}

/**
 * Validates blocking chart structure (headers, metadata)
 */
export function validateBlockingChartStructure(
  parsed: ParsedBlockingChart
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if we have rows
  if (!parsed.rows || parsed.rows.length === 0) {
    errors.push({
      rowIndex: 0,
      field: 'structure',
      message: 'No data rows found in blocking chart',
      severity: 'error'
    });
  }

  // Check if we have headers
  if (!parsed.headers || parsed.headers.length === 0) {
    errors.push({
      rowIndex: 0,
      field: 'structure',
      message: 'No headers found in blocking chart',
      severity: 'error'
    });
  }

  // Check for required headers
  if (parsed.headers && parsed.headers.length > 0) {
    const normalizedHeaders = parsed.headers.map(h => h.toLowerCase().trim());

    const requiredHeaders = ['channel', 'tactic', 'platform'];
    requiredHeaders.forEach(required => {
      const found = normalizedHeaders.some(h => h.includes(required));
      if (!found) {
        errors.push({
          rowIndex: 0,
          field: 'structure',
          message: `Missing required header: "${required}"`,
          severity: 'error'
        });
      }
    });
  }

  // Check for duplicate headers
  if (parsed.headers) {
    const headerCounts = new Map<string, number>();
    parsed.headers.forEach(header => {
      const normalized = header.toLowerCase().trim();
      headerCounts.set(normalized, (headerCounts.get(normalized) || 0) + 1);
    });

    headerCounts.forEach((count, header) => {
      if (count > 1) {
        errors.push({
          rowIndex: 0,
          field: 'structure',
          message: `Duplicate header found: "${header}" appears ${count} times`,
          severity: 'warning'
        });
      }
    });
  }

  return errors;
}

/**
 * Comprehensive validation combining structure and row validation
 */
export function validateBlockingChart(
  parsed: ParsedBlockingChart
): ValidationResult {
  const structureErrors = validateBlockingChartStructure(parsed);
  const rowValidation = validateBlockingChartRows(parsed);

  const allErrors = [...structureErrors.filter(e => e.severity === 'error'), ...rowValidation.errors];
  const allWarnings = [...structureErrors.filter(e => e.severity === 'warning'), ...rowValidation.warnings];

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
}
