/**
 * Test script to show all detected campaign lines with their key fields
 * Run with: npx tsx test-campaign-lines.ts
 */

import fs from 'fs';
import { parseBlockingChart } from '../../../core/excel/parseBlockingChart';

async function showCampaignLines() {
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
  console.log('DETECTED CAMPAIGN LINES - KEY FIELDS');
  console.log('='.repeat(100));
  console.log('');

  // Analyze campaign line merges
  const campaignLineMasters = new Map<number, { masterRow: number; span: number; rows: number[] }>();

  result.rows.forEach((row, idx) => {
    if (row._campaignLineMasterRow !== undefined) {
      const masterRow = row._campaignLineMasterRow;
      if (!campaignLineMasters.has(masterRow)) {
        campaignLineMasters.set(masterRow, {
          masterRow,
          span: row._mergeSpan || 1,
          rows: []
        });
      }
      campaignLineMasters.get(masterRow)!.rows.push(idx);
    }
  });

  console.log(`Total Campaign Lines Detected: ${campaignLineMasters.size}\n`);
  console.log('Row# | Placements | Est. Impressions | Gross Budget | Net Budget');
  console.log('-'.repeat(100));

  const sortedMasters = Array.from(campaignLineMasters.entries()).sort((a, b) => a[0] - b[0]);

  sortedMasters.forEach(([masterRow, campaignLine]) => {
    const firstRow = result.rows[campaignLine.rows[0]];

    const placements = firstRow.placements || 'N/A';
    const impressions = firstRow.estImpressions || 'N/A';
    const grossBudget = firstRow.grossBudget || 'N/A';
    const netBudget = firstRow.netBudget || 'N/A';

    // Truncate long placements text
    const placementsShort = typeof placements === 'string' && placements.length > 50
      ? placements.substring(0, 47) + '...'
      : placements;

    console.log(
      `${String(masterRow).padStart(4)} | ` +
      `${String(placementsShort).padEnd(50)} | ` +
      `${String(impressions).padStart(16)} | ` +
      `${String(grossBudget).padStart(12)} | ` +
      `${String(netBudget).padStart(11)}`
    );
  });

  console.log('\n' + '='.repeat(100));
}

showCampaignLines().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
