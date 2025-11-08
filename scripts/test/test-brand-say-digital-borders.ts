/**
 * Test script to understand why Brand Say Digital borders aren't working
 * while Brand Say Social and Other Say Social work perfectly
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function testBrandSayDigitalBorders() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== TESTING BRAND SAY DIGITAL BORDER BEHAVIOR ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const bsdWorksheet = workbook.getWorksheet('Brand Say Digital');
  const bssWorksheet = workbook.getWorksheet('Brand Say Social');

  if (!bsdWorksheet || !bssWorksheet) {
    throw new Error('Worksheets not found');
  }

  console.log('STEP 1: Compare template structure between tabs\n');

  // Check row 8 and row 9 for both tabs
  console.log('Brand Say Digital:');
  const bsdRow8 = bsdWorksheet.getRow(8);
  const bsdRow9 = bsdWorksheet.getRow(9);
  console.log(`  Row 8 cell H8: "${bsdRow8.getCell(8).value}"`);
  console.log(`  Row 9 cell H9: "${bsdRow9.getCell(8).value}"`);
  console.log(`  Row 8 has fill:`, !!bsdRow8.getCell(8).fill);
  console.log(`  Row 9 has fill:`, !!bsdRow9.getCell(8).fill);

  console.log('\nBrand Say Social:');
  const bssRow8 = bssWorksheet.getRow(8);
  const bssRow9 = bssWorksheet.getRow(9);
  console.log(`  Row 8 cell H8: "${bssRow8.getCell(8).value}"`);
  console.log(`  Row 9 cell H9: "${bssRow9.getCell(8).value}"`);
  console.log(`  Row 8 has fill:`, !!bssRow8.getCell(8).fill);
  console.log(`  Row 9 has fill:`, !!bssRow9.getCell(8).fill);

  console.log('\n\nSTEP 2: Apply same border logic to both tabs\n');

  const borderStyle: Partial<ExcelJS.Border> = {
    style: 'thin',
    color: { indexed: 64 } as any
  };

  // BSD: Apply borders from row 10-24
  console.log('Applying borders to Brand Say Digital rows 10-24, column H...');
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

  // BSS: Apply borders from row 9-23 (for comparison)
  console.log('Applying borders to Brand Say Social rows 9-23, column H...');
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

  console.log('\n\nSTEP 3: Check if borders exist in memory...\n');

  let bsdBorders = 0;
  for (let row = 10; row <= 24; row++) {
    const cell = bsdWorksheet.getCell(row, 8);
    if (cell.border && Object.keys(cell.border).length > 0) {
      bsdBorders++;
    } else {
      console.log(`  ❌ Brand Say Digital H${row} has NO border`);
    }
  }
  console.log(`Brand Say Digital: ${bsdBorders}/15 cells have borders in memory`);

  let bssBorders = 0;
  for (let row = 9; row <= 23; row++) {
    const cell = bssWorksheet.getCell(row, 8);
    if (cell.border && Object.keys(cell.border).length > 0) {
      bssBorders++;
    } else {
      console.log(`  ❌ Brand Say Social H${row} has NO border`);
    }
  }
  console.log(`Brand Say Social: ${bssBorders}/15 cells have borders in memory`);

  console.log('\n\nSTEP 4: Write to file and check result...\n');
  const outputPath = '/Users/lucusdato/Downloads/test-bsd-vs-bss-borders.xlsx';
  await workbook.xlsx.writeFile(outputPath);
  console.log(`  ✅ Wrote to ${outputPath}`);

  console.log('\n=== RESULTS ===');
  console.log(`Brand Say Digital borders in memory: ${bsdBorders}/15`);
  console.log(`Brand Say Social borders in memory: ${bssBorders}/15`);
  console.log('\nOpen the file and verify:');
  console.log('  - Brand Say Social column H should have borders (rows 9-23)');
  console.log('  - Brand Say Digital column H should have borders (rows 10-24)');
  console.log('  - If BSD has no borders but BSS does, there\'s something special about the BSD tab');
}

testBrandSayDigitalBorders().catch(console.error);
