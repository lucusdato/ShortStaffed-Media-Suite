import fs from 'fs';
import { parseBlockingChart } from '../../core/excel/parseBlockingChart';

async function checkParsedRows() {
  const buffer = fs.readFileSync('/Users/lucusdato/Downloads/2026 Liquid IV - Winter Activation BC R1-2.xlsx');
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

  const result = await parseBlockingChart(arrayBuffer);

  console.log('Checking first 4 parsed rows (should be TikTok):');
  console.log('='.repeat(80));

  result.rows.slice(0, 4).forEach((row, idx) => {
    console.log(`Parsed Row ${idx}:`);
    console.log(`  platform: '${row.platform}'`);
    console.log(`  channel: '${row.channel}'`);
    console.log(`  objective: '${row.objective}'`);
    console.log(`  _campaignLineMasterRow: ${row._campaignLineMasterRow}`);
    console.log('');
  });

  console.log('\nCampaign Lines built from these rows:');
  console.log('='.repeat(80));

  result.campaignLines?.slice(0, 4).forEach((cl, idx) => {
    console.log(`Campaign Line ${idx}:`);
    console.log(`  platform: '${cl.platform}'`);
    console.log(`  channel: '${cl.channel}'`);
    console.log(`  objective: '${cl.objective}'`);
    console.log(`  sourceRows: ${cl._sourceRowNumbers.join(', ')}`);
    console.log('');
  });
}

checkParsedRows().catch(console.error);
