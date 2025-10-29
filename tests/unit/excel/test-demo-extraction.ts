/**
 * Test script for demographic extraction from Target field
 * Run with: npx tsx test-demo-extraction.ts
 */

import { DEMOGRAPHIC_CONFIG } from '../../../core/excel/config';

/**
 * Extract demographic code from Target field
 * Pattern: W25-49, M18-44, A18-65, etc.
 * Returns the demographic code as-is (e.g., "W25-49")
 */
function extractDemographic(target: string | undefined): string {
  if (!target) {
    return DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;
  }

  const targetStr = String(target);

  // Reset regex state
  DEMOGRAPHIC_CONFIG.DEMO_PATTERN.lastIndex = 0;

  // Find all demographic patterns
  const matches = targetStr.matchAll(DEMOGRAPHIC_CONFIG.DEMO_PATTERN);
  const matchArray = Array.from(matches);

  if (matchArray.length === 0) {
    return DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;
  }

  // Return first match in format: W25-49
  const firstMatch = matchArray[0];
  const genderCode = firstMatch[1];  // W, M, A, F
  const lowerAge = firstMatch[2];     // 25, 18, etc.
  const upperAge = firstMatch[3];     // 49, 44, etc.

  return `${genderCode}${lowerAge}-${upperAge}`;
}

// Test cases from Liquid IV blocking chart
const testCases = [
  { row: 25, target: 'Broad W25-49 + Costco interest', expected: 'W25-49' },
  { row: 26, target: 'Broad W25-49', expected: 'W25-49' },
  { row: 19, target: 'Healthy-ish Hustlers (M18-44)', expected: 'M18-44' },
  { row: 20, target: 'Casual Quencehrs (A18-65)', expected: 'A18-65' },
  { row: 21, target: 'Hydration Strategists (A18-54)', expected: 'A18-54' },
  { row: 23, target: 'Retargeting Healthy-ish Hustlers (M18-44), Casual Quenchers', expected: 'M18-44' },
  { row: 32, target: 'Hydration Strategists (A18-44)', expected: 'A18-44' },
  { row: 49, target: 'Demo A18+\n1PD Segments\nWellness, Seeker, GenZ', expected: 'A18+' }, // No range pattern
  { row: 15, target: '18-54\nBeauty & Personal Care Pulse', expected: 'A18+' }, // No gender code
  { row: null, target: undefined, expected: 'A18+' }, // Missing
];

console.log('='.repeat(80));
console.log('DEMOGRAPHIC EXTRACTION TEST');
console.log('='.repeat(80));
console.log('');

let passed = 0;
let failed = 0;

testCases.forEach(({ row, target, expected }) => {
  const result = extractDemographic(target);
  const isPass = result === expected;

  if (isPass) {
    passed++;
    console.log(`✅ Row ${row || 'N/A'}: "${target?.substring(0, 50) || 'undefined'}" → ${result}`);
  } else {
    failed++;
    console.log(`❌ Row ${row}: Expected "${expected}" but got "${result}"`);
    console.log(`   Input: "${target}"`);
  }
});

console.log('');
console.log('='.repeat(80));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(80));
