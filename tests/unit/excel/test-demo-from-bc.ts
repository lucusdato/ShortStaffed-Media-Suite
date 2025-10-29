/**
 * Test demographic extraction with actual blocking chart data
 * Run with: npx tsx test-demo-from-bc.ts
 */

import fs from 'fs';
import { parseBlockingChart } from '../../../core/excel/parseBlockingChart';
import { DEMOGRAPHIC_CONFIG } from '../../../core/excel/config';

function extractDemographic(target: string | undefined): string {
  if (!target) {
    return DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;
  }

  const targetStr = String(target);
  DEMOGRAPHIC_CONFIG.DEMO_PATTERN.lastIndex = 0;

  const matches = targetStr.matchAll(DEMOGRAPHIC_CONFIG.DEMO_PATTERN);
  const matchArray = Array.from(matches);

  if (matchArray.length === 0) {
    return DEMOGRAPHIC_CONFIG.DEFAULT_DEMO;
  }

  const firstMatch = matchArray[0];
  const genderCode = firstMatch[1];
  const lowerAge = firstMatch[2];
  const upperAge = firstMatch[3];

  return `${genderCode}${lowerAge}-${upperAge}`;
}

async function testDemoExtraction() {
  const filePath = '/Users/lucusdato/Downloads/2026 Liquid IV - Winter Activation BC R1-2.xlsx';

  console.log('📂 Loading file:', filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const arrayBuffer = fileBuffer.buffer.slice(
    fileBuffer.byteOffset,
    fileBuffer.byteOffset + fileBuffer.byteLength
  );

  console.log('\n🔄 Parsing blocking chart...\n');

  const result = await parseBlockingChart(arrayBuffer);

  console.log('\n' + '='.repeat(100));
  console.log('DEMOGRAPHIC EXTRACTION FROM CAMPAIGN LINES');
  console.log('='.repeat(100));
  console.log('');

  console.log('Campaign Line | Platform | Target Field | Extracted Demo');
  console.log('-'.repeat(100));

  result.campaignLines?.forEach((cl, idx) => {
    const demo = extractDemographic(cl.target);

    // Truncate long target values
    const targetDisplay = cl.target
      ? (cl.target.length > 40 ? cl.target.substring(0, 37) + '...' : cl.target)
      : 'N/A';

    console.log(
      `${String(idx + 1).padStart(13)} | ` +
      `${(cl.platform || 'N/A').padEnd(15).substring(0, 15)} | ` +
      `${targetDisplay.padEnd(40)} | ` +
      `${demo}`
    );
  });

  console.log('\n' + '='.repeat(100));
}

testDemoExtraction().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
