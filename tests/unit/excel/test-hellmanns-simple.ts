import { parseBlockingChart } from '../../../core/excel/parseBlockingChart';
import * as fs from 'fs';

async function testHellmanns() {
  const filePath = "/Users/lucusdato/Downloads/Hellmann's 2025 Holiday Blocking Chart R0.xlsx";

  console.log('=== TESTING HELLMANN\'S BLOCKING CHART WITH NEW FALLBACK LOGIC ===\n');

  const fileBuffer = fs.readFileSync(filePath);

  try {
    const parsed = await parseBlockingChart(fileBuffer.buffer as ArrayBuffer);

    console.log('\n✅ SUCCESS! Parsing completed without errors.\n');
    console.log('=== PARSED DATA SUMMARY ===');
    console.log(`Campaign Lines: ${parsed.campaignLines.length}`);
    console.log(`Total Rows: ${parsed.rows.length}`);
    console.log(`Validation Errors: ${parsed.validation?.errors?.length || 0}`);
    console.log(`Validation Warnings: ${parsed.validation?.warnings?.length || 0}`);

    if (parsed.campaignLines.length > 0) {
      console.log('\n=== CAMPAIGN LINES OVERVIEW ===');
      parsed.campaignLines.forEach((line, idx) => {
        console.log(`\n${idx + 1}. ${line.channel} > ${line.platform}`);
        console.log(`   Media Type: ${line.mediaType || 'N/A'}`);
        console.log(`   Objective: ${line.objective}`);
        console.log(`   Gross Budget: $${line.grossBudget || 0}`);
        console.log(`   Net Budget: $${line.netBudget || 0}`);
        console.log(`   Ad Groups: ${line.adGroups.length}`);
        console.log(`   Excluded: ${line.isExcluded} ${line.excludedReason ? `(${line.excludedReason})` : ''}`);
      });
    }

    if (parsed.validation?.errors && parsed.validation.errors.length > 0) {
      console.log('\n=== VALIDATION ERRORS ===');
      parsed.validation.errors.slice(0, 5).forEach(err => {
        console.log(`- ${err}`);
      });
      if (parsed.validation.errors.length > 5) {
        console.log(`... and ${parsed.validation.errors.length - 5} more`);
      }
    }

    if (parsed.validation?.warnings && parsed.validation.warnings.length > 0) {
      console.log('\n=== VALIDATION WARNINGS ===');
      parsed.validation.warnings.slice(0, 5).forEach(warn => {
        console.log(`- ${warn}`);
      });
      if (parsed.validation.warnings.length > 5) {
        console.log(`... and ${parsed.validation.warnings.length - 5} more`);
      }
    }

    console.log('\n=== TEST COMPLETE ===');

  } catch (error) {
    console.error('\n❌ PARSING FAILED\n');
    console.error('Error:', error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

testHellmanns();
