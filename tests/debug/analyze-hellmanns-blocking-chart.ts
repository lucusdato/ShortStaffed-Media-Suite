import ExcelJS from 'exceljs';
import * as fs from 'fs';

async function analyzeBlockingChart() {
  const filePath = "/Users/lucusdato/Downloads/Hellmann's 2025 Holiday Blocking Chart R0.xlsx";

  console.log('=== ANALYZING HELLMANN\'S BLOCKING CHART ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  console.log(`📊 Total sheets: ${workbook.worksheets.length}`);
  workbook.worksheets.forEach((sheet, idx) => {
    console.log(`  ${idx + 1}. "${sheet.name}" (${sheet.rowCount} rows, ${sheet.columnCount} cols)`);
  });

  const sheet = workbook.worksheets[0];
  console.log(`\n🔍 Analyzing first sheet: "${sheet.name}"\n`);

  // Analyze first 20 rows to find structure
  console.log('=== FIRST 20 ROWS ===');
  for (let rowNum = 1; rowNum <= Math.min(20, sheet.rowCount); rowNum++) {
    const row = sheet.getRow(rowNum);
    const values: string[] = [];

    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      const value = cell.value;
      let displayValue = '';

      if (value === null || value === undefined) {
        displayValue = '[empty]';
      } else if (typeof value === 'object' && 'richText' in value) {
        displayValue = (value as any).richText.map((rt: any) => rt.text).join('');
      } else if (typeof value === 'object' && 'formula' in value) {
        displayValue = `[formula: ${(value as any).result}]`;
      } else {
        displayValue = String(value);
      }

      // Show merged cell info
      if (cell.isMerged) {
        displayValue += ' [MERGED]';
      }

      values.push(`${colNumber}:${displayValue}`);
    });

    if (values.length > 0) {
      console.log(`Row ${rowNum}: ${values.join(' | ')}`);
    }
  }

  // Look for potential header rows
  console.log('\n=== SEARCHING FOR HEADER PATTERNS ===');
  const potentialHeaders = [];

  for (let rowNum = 1; rowNum <= Math.min(30, sheet.rowCount); rowNum++) {
    const row = sheet.getRow(rowNum);
    const values: string[] = [];

    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      let value = cell.value;
      if (value && typeof value === 'object' && 'richText' in value) {
        value = (value as any).richText.map((rt: any) => rt.text).join('');
      }
      if (value) {
        values.push(String(value).toLowerCase().trim());
      }
    });

    // Check if this row looks like a header
    const commonHeaderTerms = [
      'channel', 'platform', 'tactic', 'budget', 'start', 'end',
      'flight', 'objective', 'target', 'audience', 'demo', 'age',
      'creative', 'asset', 'copy', 'cpm', 'impressions', 'placement'
    ];

    const matchCount = values.filter(v =>
      commonHeaderTerms.some(term => v.includes(term))
    ).length;

    if (matchCount >= 3) {
      potentialHeaders.push({
        rowNum,
        matchCount,
        values: values.slice(0, 15) // First 15 columns
      });
    }
  }

  console.log(`Found ${potentialHeaders.length} potential header row(s):`);
  potentialHeaders.forEach(h => {
    console.log(`  Row ${h.rowNum} (${h.matchCount} matches): ${h.values.join(' | ')}`);
  });

  // Check for budget columns
  console.log('\n=== SEARCHING FOR BUDGET COLUMNS ===');
  const budgetPatterns = [
    'budget', 'total budget', 'net budget', 'gross budget',
    'investment', 'spend', 'cost', 'media budget'
  ];

  for (let rowNum = 1; rowNum <= Math.min(30, sheet.rowCount); rowNum++) {
    const row = sheet.getRow(rowNum);
    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      let value = cell.value;
      if (value && typeof value === 'object' && 'richText' in value) {
        value = (value as any).richText.map((rt: any) => rt.text).join('');
      }

      const strValue = String(value).toLowerCase().trim();
      const matchingPattern = budgetPatterns.find(pattern =>
        strValue === pattern || strValue.includes(pattern)
      );

      if (matchingPattern) {
        console.log(`  Row ${rowNum}, Col ${colNumber}: "${value}" (matches: ${matchingPattern})`);
      }
    });
  }

  // Analyze data rows (rows after potential headers)
  if (potentialHeaders.length > 0) {
    const headerRow = potentialHeaders[0].rowNum;
    console.log(`\n=== ANALYZING DATA ROWS (starting after row ${headerRow}) ===`);

    let dataRowCount = 0;
    for (let rowNum = headerRow + 1; rowNum <= Math.min(headerRow + 10, sheet.rowCount); rowNum++) {
      const row = sheet.getRow(rowNum);
      const values: string[] = [];

      row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
        let value = cell.value;
        if (value && typeof value === 'object' && 'richText' in value) {
          value = (value as any).richText.map((rt: any) => rt.text).join('');
        }
        values.push(`${colNumber}:${String(value)}`);
      });

      if (values.length > 0) {
        dataRowCount++;
        console.log(`Row ${rowNum}: ${values.join(' | ')}`);
      }
    }

    console.log(`\nFound ${dataRowCount} data rows in sample.`);
  }

  console.log('\n=== ANALYSIS COMPLETE ===');
}

analyzeBlockingChart().catch(console.error);
