import ExcelJS from 'exceljs';
import { detectBlockingChartTemplate } from '../../../core/excel/blockingChartTemplates';
import { PARSING_CONFIG } from '../../../core/excel/config';

async function testHellmannsParsing() {
  const filePath = "/Users/lucusdato/Downloads/Hellmann's 2025 Holiday Blocking Chart R0.xlsx";

  console.log('=== TESTING HELLMANN\'S BLOCKING CHART PARSING ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.worksheets[0];

  console.log('Step 1: Finding header row...\n');

  // This is the logic from parseBlockingChart.ts
  let headerRow: ExcelJS.Row | undefined;
  let headerRowNum = 0;
  let headers: string[] = [];

  for (let rowNum = 1; rowNum <= Math.min(20, sheet.rowCount); rowNum++) {
    const row = sheet.getRow(rowNum);
    const values: string[] = [];

    row.eachCell({ includeEmpty: false }, (cell) => {
      let value = cell.value;
      if (value && typeof value === 'object' && 'richText' in value) {
        value = (value as any).richText.map((rt: any) => rt.text).join('');
      }
      if (value && typeof value !== 'object') {
        values.push(String(value).trim());
      }
    });

    // Check if this looks like a header row
    const normalizedValues = values.map(v => v.toLowerCase());
    const hasChannel = normalizedValues.some(v =>
      PARSING_CONFIG.HEADER_DETECTION.CHANNEL_KEYWORDS.some(keyword =>
        v === keyword
      )
    );
    const hasTactic = normalizedValues.some(v =>
      PARSING_CONFIG.HEADER_DETECTION.TACTIC_KEYWORDS.some(keyword =>
        v === keyword
      )
    );

    if (hasChannel && hasTactic) {
      headerRow = row;
      headerRowNum = rowNum;
      headers = values;
      console.log(`✅ Found header row at row ${rowNum}`);
      console.log(`Headers: ${headers.join(' | ')}`);
      break;
    }
  }

  if (!headerRow || !headers.length) {
    console.error('❌ ERROR: Could not find header row!');
    console.log('\nDebug info:');
    console.log('CHANNEL_KEYWORDS:', PARSING_CONFIG.HEADER_DETECTION.CHANNEL_KEYWORDS);
    console.log('TACTIC_KEYWORDS:', PARSING_CONFIG.HEADER_DETECTION.TACTIC_KEYWORDS);
    return;
  }

  console.log('\nStep 2: Detecting template...\n');
  const template = detectBlockingChartTemplate(headers);

  if (!template) {
    console.log('⚠️  No template detected - will use auto-normalization');
  }

  console.log('\nStep 3: Analyzing header mappings...\n');

  // Check which headers match the template
  if (template) {
    console.log(`Template: ${template.name}`);
    console.log('\nMatched columns:');
    headers.forEach((header, idx) => {
      const mappedField = template.columnMappings[header];
      if (mappedField) {
        console.log(`  ✅ "${header}" → ${mappedField}`);
      }
    });

    console.log('\nUnmatched columns (will use auto-normalization):');
    headers.forEach((header, idx) => {
      const mappedField = template.columnMappings[header];
      if (!mappedField) {
        console.log(`  ⚠️  "${header}"`);
      }
    });
  }

  console.log('\nStep 4: Looking for budget columns...\n');

  const budgetColumns: Array<{ index: number; header: string }> = [];

  headers.forEach((header, idx) => {
    const normalizedHeader = header.toLowerCase().trim();
    const isBudgetColumn = PARSING_CONFIG.BUDGET_COLUMN_NAMES.some(
      budgetName => normalizedHeader === budgetName.toLowerCase()
    );

    if (isBudgetColumn) {
      budgetColumns.push({ index: idx, header });
      console.log(`✅ Budget column found: "${header}" at index ${idx}`);
    }
  });

  console.log(`\nTotal budget columns: ${budgetColumns.length}`);

  console.log('\nStep 5: Extracting sample data rows...\n');

  let dataRowCount = 0;
  for (let rowNum = headerRowNum + 1; rowNum <= Math.min(headerRowNum + 5, sheet.rowCount); rowNum++) {
    const row = sheet.getRow(rowNum);
    const rowData: any = {};
    let hasAnyData = false;

    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      const headerIdx = colNumber - 1;
      if (headerIdx < headers.length) {
        const header = headers[headerIdx];
        let value = cell.value;

        // Handle rich text
        if (value && typeof value === 'object' && 'richText' in value) {
          value = (value as any).richText.map((rt: any) => rt.text).join('');
        }

        // Handle formulas
        if (value && typeof value === 'object' && 'result' in value) {
          value = (value as any).result;
        }

        if (value !== null && value !== undefined && value !== '') {
          rowData[header] = value;
          hasAnyData = true;
        }
      }
    });

    if (hasAnyData) {
      dataRowCount++;
      console.log(`\nData Row ${rowNum}:`);
      console.log(JSON.stringify(rowData, null, 2));
    }
  }

  console.log(`\n✅ Successfully parsed ${dataRowCount} data rows`);

  console.log('\n=== DIAGNOSIS COMPLETE ===');
  console.log('\nKey Findings:');
  console.log(`- Header row detected: ${headerRowNum > 0 ? 'YES' : 'NO'} (row ${headerRowNum})`);
  console.log(`- Template matched: ${template ? template.name : 'NONE'}`);
  console.log(`- Budget columns found: ${budgetColumns.length}`);
  console.log(`- Data rows found: ${dataRowCount}`);
}

testHellmannsParsing().catch(console.error);
