/**
 * Direct test: Apply same merge + border sequence to Brand Say Digital vs Brand Say Social
 * to see if there's something fundamentally different about the BSD template
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function testDirectMergeAndBorder() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== DIRECT MERGE + BORDER TEST ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const bsdWorksheet = workbook.getWorksheet('Brand Say Digital');
  const bssWorksheet = workbook.getWorksheet('Brand Say Social');

  if (!bsdWorksheet || !bssWorksheet) {
    throw new Error('Worksheets not found');
  }

  const borderStyle: Partial<ExcelJS.Border> = {
    style: 'thin',
    color: { indexed: 64 } as any
  };

  console.log('TEST 1: Brand Say Digital (merge THEN border)\n');
  console.log('  Step 1: Merge H10:H24 (column H, rows 10-24)');
  bsdWorksheet.mergeCells('H10:H24');

  console.log('  Step 2: Apply borders to H10:H24');
  for (let row = 10; row <= 24; row++) {
    const cell = bsdWorksheet.getCell(row, 8);
    cell.fill = { type: 'pattern', pattern: 'none' };
    cell.border = {
      top: borderStyle,
      left: borderStyle,
      bottom: borderStyle,
      right: borderStyle
    };
  }

  console.log('  Step 3: Check if borders exist in memory');
  let bsdBordersFound = 0;
  for (let row = 10; row <= 24; row++) {
    const cell = bsdWorksheet.getCell(row, 8);
    if (cell.border && Object.keys(cell.border).length > 0) {
      bsdBordersFound++;
    }
  }
  console.log(`  Result: ${bsdBordersFound}/15 cells have borders in memory`);

  console.log('\nTEST 2: Brand Say Social (merge THEN border)\n');
  console.log('  Step 1: Merge H9:H23 (column H, rows 9-23)');
  bssWorksheet.mergeCells('H9:H23');

  console.log('  Step 2: Apply borders to H9:H23');
  for (let row = 9; row <= 23; row++) {
    const cell = bssWorksheet.getCell(row, 8);
    cell.fill = { type: 'pattern', pattern: 'none' };
    cell.border = {
      top: borderStyle,
      left: borderStyle,
      bottom: borderStyle,
      right: borderStyle
    };
  }

  console.log('  Step 3: Check if borders exist in memory');
  let bssBordersFound = 0;
  for (let row = 9; row <= 23; row++) {
    const cell = bssWorksheet.getCell(row, 8);
    if (cell.border && Object.keys(cell.border).length > 0) {
      bssBordersFound++;
    }
  }
  console.log(`  Result: ${bssBordersFound}/15 cells have borders in memory`);

  console.log('\n\nWriting to file...');
  const outputPath = '/Users/lucusdato/Downloads/test-direct-merge-border.xlsx';
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Wrote to ${outputPath}`);

  console.log('\n=== RESULTS ===');
  console.log(`Brand Say Digital: ${bsdBordersFound}/15 borders in memory`);
  console.log(`Brand Say Social: ${bssBordersFound}/15 borders in memory`);
  console.log('\nOpen the file and check:');
  console.log('  - If BSD has no borders but BSS does → template structure difference');
  console.log('  - If both have borders → our generation code has the issue');
  console.log('  - If neither has borders → ExcelJS bug confirmed');
}

testDirectMergeAndBorder().catch(console.error);
