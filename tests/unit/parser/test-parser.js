/**
 * Test script for validating campaign line detection
 * Run with: node --loader tsx test-parser.js
 */

const fs = require('fs');
const path = require('path');

async function testParser() {
  // Dynamic import for ESM modules
  const { parseBlockingChart } = await import('./core/excel/parseBlockingChart.ts');

  const filePath = '/Users/lucusdato/Downloads/2026 Liquid IV - Winter Activation BC R1-2.xlsx';

  console.log('📂 Loading file:', filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const arrayBuffer = fileBuffer.buffer.slice(
    fileBuffer.byteOffset,
    fileBuffer.byteOffset + fileBuffer.byteLength
  );

  console.log('\n🔄 Parsing blocking chart...\n');

  try {
    const result = await parseBlockingChart(arrayBuffer);

    console.log('\n✅ PARSING SUCCEEDED!\n');
    console.log('=' .repeat(60));
    console.log('RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log('Total rows parsed:', result.rows.length);
    console.log('Headers found:', result.headers.length);
    console.log('\nMetadata:');
    console.log(JSON.stringify(result.metadata, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log('CAMPAIGN LINE ANALYSIS');
    console.log('='.repeat(60));

    // Analyze campaign line merges
    const rowsWithMergeSpan = result.rows.filter(r => r._mergeSpan);
    const campaignLineMasters = new Map();

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
        campaignLineMasters.get(masterRow).rows.push(idx);
      }
    });

    console.log(`Campaign lines detected: ${campaignLineMasters.size}`);
    console.log('');

    let campaignLineNum = 1;
    campaignLineMasters.forEach((campaignLine, masterRow) => {
      const firstRow = result.rows[campaignLine.rows[0]];
      console.log(`Campaign Line ${campaignLineNum}:`);
      console.log(`  Master Row: ${masterRow}`);
      console.log(`  Span: ${campaignLine.span} blocking chart rows`);
      console.log(`  Will generate: 15 traffic sheet rows (3 ad groups × 5 creatives)`);
      console.log(`  Channel: ${firstRow.channel || 'N/A'}`);
      console.log(`  Platform: ${firstRow.platform || 'N/A'}`);
      console.log(`  Objective: ${firstRow.objective || 'N/A'}`);
      console.log(`  Budget: $${firstRow.netBudget || firstRow.grossBudget || 'N/A'}`);
      console.log(`  Impressions: ${firstRow.estImpressions || 'N/A'}`);
      console.log('');
      campaignLineNum++;
    });

    console.log('='.repeat(60));
    console.log('SAMPLE DATA (First 3 Rows)');
    console.log('='.repeat(60));
    result.rows.slice(0, 3).forEach((row, idx) => {
      console.log(`\nRow ${idx + 1}:`);
      console.log('  Channel:', row.channel);
      console.log('  Platform:', row.platform);
      console.log('  Objective:', row.objective);
      console.log('  Budget:', row.netBudget || row.grossBudget);
      console.log('  _mergeSpan:', row._mergeSpan);
      console.log('  _campaignLineMasterRow:', row._campaignLineMasterRow);
    });

  } catch (error) {
    console.error('\n❌ PARSING FAILED:');
    console.error(error);
    process.exit(1);
  }
}

testParser().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
