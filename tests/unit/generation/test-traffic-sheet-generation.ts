/**
 * End-to-end test for hierarchical traffic sheet generation
 * Run with: npx tsx test-traffic-sheet-generation.ts
 */

import fs from 'fs';
import { parseBlockingChart } from '../../../core/excel/parseBlockingChart';
import { generateTrafficSheetFromHierarchy } from '../../../core/excel/generateTrafficSheet';

async function testTrafficSheetGeneration() {
  console.log('🚀 ===== END-TO-END TRAFFIC SHEET GENERATION TEST =====\n');

  const blockingChartPath = '/Users/lucusdato/Downloads/2026 Liquid IV - Winter Activation BC R1-2.xlsx';
  const templatePath = '/Users/lucusdato/Documents/Dev/ShortStaffed MediaTools/public/templates/unilever-traffic-sheet-template.xlsx';
  const outputPath = '/Users/lucusdato/Downloads/test-traffic-sheet-output.xlsx';

  try {
    // Step 1: Parse blocking chart
    console.log('📂 Step 1: Loading blocking chart...');
    console.log(`   File: ${blockingChartPath}\n`);

    const blockingChartBuffer = fs.readFileSync(blockingChartPath);
    const blockingChartArrayBuffer = blockingChartBuffer.buffer.slice(
      blockingChartBuffer.byteOffset,
      blockingChartBuffer.byteOffset + blockingChartBuffer.byteLength
    );

    console.log('🔄 Step 2: Parsing blocking chart with hierarchical structure...\n');
    const parsedData = await parseBlockingChart(blockingChartArrayBuffer);

    console.log('\n✅ Parsing complete!');
    console.log(`   Campaign Lines: ${parsedData.campaignLines?.length || 0}`);
    console.log(`   Legacy Rows: ${parsedData.rows.length}`);

    if (!parsedData.campaignLines || parsedData.campaignLines.length === 0) {
      throw new Error('No campaign lines were built! Check parseBlockingChart.');
    }

    // Show summary
    console.log('\n📊 Campaign Line Summary:');
    parsedData.campaignLines.forEach((cl, idx) => {
      const totalRows = cl.adGroups.length * 5;
      console.log(`   ${idx + 1}. ${cl.platform} - ${cl.adGroups.length} ad groups → ${totalRows} rows`);
    });

    // Step 3: Load template
    console.log('\n📋 Step 3: Loading traffic sheet template...');
    console.log(`   Template: ${templatePath}\n`);

    const templateBuffer = fs.readFileSync(templatePath);
    const templateArrayBuffer = templateBuffer.buffer.slice(
      templateBuffer.byteOffset,
      templateBuffer.byteOffset + templateBuffer.byteLength
    );

    // Step 4: Generate traffic sheet
    console.log('🎨 Step 4: Generating traffic sheet from hierarchical structure...\n');

    const outputBuffer = await generateTrafficSheetFromHierarchy(
      parsedData,
      templateArrayBuffer
    );

    // Step 5: Save output
    console.log(`\n💾 Step 5: Saving traffic sheet...`);
    console.log(`   Output: ${outputPath}\n`);

    fs.writeFileSync(outputPath, outputBuffer);

    console.log('\n🎉 ===== SUCCESS! =====');
    console.log(`Traffic sheet generated successfully!`);
    console.log(`Open file: ${outputPath}`);
    console.log('='.repeat(80));

  } catch (error) {
    console.error('\n❌ ===== ERROR =====');
    console.error(error);
    process.exit(1);
  }
}

testTrafficSheetGeneration().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
