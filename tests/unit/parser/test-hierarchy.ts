/**
 * Test script to verify hierarchical campaign line structure
 * Run with: npx tsx test-hierarchy.ts
 */

import fs from 'fs';
import { parseBlockingChart } from '../../../core/excel/parseBlockingChart';

async function testHierarchy() {
  const filePath = '/Users/lucusdato/Downloads/2026 Liquid IV - Winter Activation BC R1-2.xlsx';

  console.log('📂 Loading file:', filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const arrayBuffer = fileBuffer.buffer.slice(
    fileBuffer.byteOffset,
    fileBuffer.byteOffset + fileBuffer.byteLength
  );

  console.log('\n🔄 Parsing blocking chart with hierarchical structure...\n');

  const result = await parseBlockingChart(arrayBuffer);

  if (!result.campaignLines) {
    console.error('❌ No campaign lines found!');
    process.exit(1);
  }

  console.log('\n' + '='.repeat(100));
  console.log('HIERARCHICAL STRUCTURE VERIFICATION');
  console.log('='.repeat(100));
  console.log('');

  console.log(`Total Campaign Lines: ${result.campaignLines.length}\n`);

  // Show summary by platform
  const platformSummary = new Map<string, { count: number; totalRows: number }>();

  result.campaignLines.forEach(cl => {
    const key = `${cl.platform}`;
    const adGroupCount = cl.adGroups.length;
    const totalRows = adGroupCount * 5;

    if (!platformSummary.has(key)) {
      platformSummary.set(key, { count: 0, totalRows: 0 });
    }

    const summary = platformSummary.get(key)!;
    summary.count++;
    summary.totalRows += totalRows;
  });

  console.log('Platform Summary:');
  console.log('-'.repeat(80));
  platformSummary.forEach((summary, platform) => {
    console.log(`${platform.padEnd(30)} | ${String(summary.count).padStart(2)} campaigns | ${String(summary.totalRows).padStart(4)} traffic sheet rows`);
  });

  console.log('\n' + '='.repeat(100));
  console.log('DETAILED CAMPAIGN LINE BREAKDOWN');
  console.log('='.repeat(100));
  console.log('');

  result.campaignLines.forEach((cl, idx) => {
    const adGroupCount = cl.adGroups.length;
    const totalRows = adGroupCount * 5;

    console.log(`Campaign Line ${idx + 1}:`);
    console.log(`  Platform: ${cl.platform}`);
    console.log(`  Media Type: ${cl.mediaType || 'N/A'}`);
    console.log(`  Objective: ${cl.objective}`);
    console.log(`  Budget: $${cl.netBudget || cl.grossBudget || 'N/A'}`);
    console.log(`  Structure: ${adGroupCount} ad groups × 5 creatives = ${totalRows} rows`);
    console.log(`  Source Rows: ${cl._sourceRowNumbers.join(', ')}`);
    console.log('');
  });

  // Calculate total traffic sheet rows
  const totalTrafficSheetRows = result.campaignLines.reduce((sum, cl) => {
    return sum + (cl.adGroups.length * 5);
  }, 0);

  console.log('='.repeat(100));
  console.log(`TOTAL TRAFFIC SHEET ROWS: ${totalTrafficSheetRows}`);
  console.log('='.repeat(100));
}

testHierarchy().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
