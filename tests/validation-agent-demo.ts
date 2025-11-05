/**
 * Data Validation Agent - Demo & Testing
 *
 * This file demonstrates the capabilities of the auto-correction utilities
 * and can be run to verify that the validation enhancements are working correctly.
 *
 * Run with: npx tsx tests/validation-agent-demo.ts
 */

import {
  normalizePlatformName,
  normalizeDateFormat,
  extractNumericValue,
  trimValue,
  correctRow,
  applyCorrections,
  type CorrectionResult,
} from '../core/validation/autoCorrection';

import {
  groupValidationErrors,
  formatErrorSummary,
  explainBudgetCalculation,
  getFieldDisplayName,
} from '../core/validation/errorMessages';

import type { ValidationError } from '../core/excel/validation';

// ============================================================================
// TEST: Platform Name Normalization
// ============================================================================

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 Platform Name Normalization Tests');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const platformTests = [
  'Facebook',
  'FB',
  'Instagram',
  ' Meta ',
  'TTD',
  'Trade Desk',
  'TikTok',
  'Tik Tok',
  'Snapchat',
  'Snap',
  'Unknown Platform',
];

platformTests.forEach(platform => {
  const result = normalizePlatformName(platform);
  const status = result.changed ? '✓ Normalized' : '○ Unchanged';
  console.log(`${status}: "${platform}" → "${result.corrected}" (${result.confidence} confidence)`);
});

// ============================================================================
// TEST: Date Format Normalization
// ============================================================================

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📅 Date Format Normalization Tests');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const dateTests = [
  '2025-03-15',           // ISO format (already correct)
  '3/15/2025',            // US format
  'Mar 15, 2025',         // Month name format
  '15 Mar 2025',          // Day first format
  '2025/03/15',           // Alternative ISO
  '20250315',             // Compact format
  new Date('2025-03-15'), // Date object
  'invalid date',         // Invalid
];

dateTests.forEach(date => {
  const result = normalizeDateFormat(date);
  const status = result.changed ? '✓ Converted' : result.warning ? '⚠ Warning' : '○ Unchanged';
  const display = date instanceof Date ? date.toISOString().split('T')[0] : date;
  console.log(`${status}: "${display}" → "${result.corrected}" (${result.confidence} confidence)`);
  if (result.warning) {
    console.log(`  ⚠️  ${result.warning}`);
  }
});

// ============================================================================
// TEST: Numeric Value Extraction
// ============================================================================

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔢 Numeric Value Extraction Tests');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const numericTests = [
  '$45,000',
  '45000',
  '15.5%',
  'TBD',
  'N/A',
  '$1,234,567.89',
  '0.155',
  'invalid',
  45000,
];

numericTests.forEach(value => {
  const result = extractNumericValue(value);
  const status = result.changed ? '✓ Extracted' : result.warning ? '⚠ Warning' : '○ Unchanged';
  console.log(`${status}: "${value}" → ${result.corrected} (${result.confidence} confidence)`);
  if (result.warning) {
    console.log(`  ⚠️  ${result.warning}`);
  }
});

// ============================================================================
// TEST: Batch Row Correction
// ============================================================================

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 Batch Row Correction Test');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const sampleRow = {
  platform: ' Facebook ',
  channel: 'Paid Social',
  tactic: 'Video Campaign  ',
  startDate: '3/15/2025',
  endDate: 'Apr 30, 2025',
  budget: '$50,000',
  cpmCpp: '15.50',
  impressionsGrps: '1,000,000',
};

console.log('Original Row:');
console.log(JSON.stringify(sampleRow, null, 2));

const corrections = correctRow(sampleRow, 0, {
  trimWhitespace: true,
  normalizeDates: true,
  normalizeNumbers: true,
  normalizePlatforms: true,
});

console.log(`\nCorrections Found: ${corrections.corrections.length}`);
console.log(`- High confidence changes: ${corrections.highConfidenceChanges}`);
console.log(`- Medium confidence changes: ${corrections.mediumConfidenceChanges}`);
console.log(`- Low confidence changes: ${corrections.lowConfidenceChanges}`);

corrections.corrections.forEach(({ field, result }) => {
  if (result.changed) {
    console.log(`\n✓ ${field}:`);
    console.log(`  Original: "${result.original}"`);
    console.log(`  Corrected: "${result.corrected}"`);
    console.log(`  Confidence: ${result.confidence}`);
    console.log(`  Method: ${result.method}`);
  }
});

const correctedRow = applyCorrections(sampleRow, corrections.corrections);
console.log('\nCorrected Row:');
console.log(JSON.stringify(correctedRow, null, 2));

// ============================================================================
// TEST: Error Grouping
// ============================================================================

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 Error Grouping & Formatting Test');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const sampleErrors: ValidationError[] = [
  { rowIndex: 5, field: 'cpmCpp', message: 'Invalid number format', severity: 'error' },
  { rowIndex: 8, field: 'cpmCpp', message: 'Invalid number format', severity: 'error' },
  { rowIndex: 12, field: 'cpmCpp', message: 'Invalid number format', severity: 'error' },
  { rowIndex: 7, field: 'startDate', message: 'Invalid date format', severity: 'error' },
  { rowIndex: 15, field: 'startDate', message: 'Invalid date format', severity: 'error' },
  { rowIndex: 10, field: 'budget', message: 'Budget calculation mismatch', severity: 'warning' },
  { rowIndex: 14, field: 'budget', message: 'Budget calculation mismatch', severity: 'warning' },
  { rowIndex: 3, field: 'platform', message: 'Whitespace detected', severity: 'warning' },
];

console.log('Sample Errors:');
sampleErrors.forEach(err => {
  console.log(`- Row ${err.rowIndex}, ${err.field}: ${err.message} (${err.severity})`);
});

const summary = formatErrorSummary(sampleErrors);
console.log('\nFormatted Error Summary:');
console.log(summary);

// ============================================================================
// TEST: Budget Calculation Explanation
// ============================================================================

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('💰 Budget Calculation Explanation Test');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const budgetBreakdown = {
  impressions: 1000000,
  cpm: 45,
  baseMediaCost: 45000,
  adServingFee: 500,
  dvCost: 2000,
  totalExpected: 47500,
  actualBudget: 50000,
  difference: 2500,
  percentDiff: 5.26,
};

const budgetExplanation = explainBudgetCalculation(budgetBreakdown);
console.log(budgetExplanation);

// ============================================================================
// TEST: Field Display Names
// ============================================================================

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🏷️  Field Display Name Conversion');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const fieldNames = [
  'cpmCpp',
  'impressionsGrps',
  'startDate',
  'endDate',
  'platform',
  'channel',
  'unknownField',
];

fieldNames.forEach(field => {
  const displayName = getFieldDisplayName(field);
  console.log(`"${field}" → "${displayName}"`);
});

// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ All Tests Complete!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('The Data Validation Agent utilities are working correctly.');
console.log('\nYou can now:');
console.log('1. Invoke @data-validation-agent in Claude Code to use the agent');
console.log('2. Integrate auto-correction into your validation workflow');
console.log('3. Use formatErrorSummary() for user-friendly error messages');
console.log('4. Apply corrections with correctRow() and applyCorrections()');
console.log('\nFor more info, see: core/validation/README.md\n');
