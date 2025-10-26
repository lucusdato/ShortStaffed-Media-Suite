/**
 * Test if preserving the solid white fill fixes the border issue
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function testFillPreserveFix() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== TESTING FILL PRESERVE FIX ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const bsdWorksheet = workbook.getWorksheet('Brand Say Digital');

  if (!bsdWorksheet) {
    throw new Error('Worksheet not found');
  }

  const borderStyle: Partial<ExcelJS.Border> = {
    style: 'thin',
    color: { indexed: 64 } as any
  };

  console.log('APPROACH: Merge THEN borders WITHOUT clearing fill\n');

  console.log('Step 1: Merge H10:H24');
  bsdWorksheet.mergeCells('H10:H24');

  console.log('Step 2: Apply borders WITHOUT clearing the solid white fill');
  for (let row = 10; row <= 24; row++) {
    const cell = bsdWorksheet.getCell(row, 8);

    // DON'T clear the fill! Keep the solid white background
    // cell.fill = { type: 'pattern', pattern: 'none' }; // SKIP THIS

    // Just apply borders
    cell.border = {
      top: borderStyle,
      left: borderStyle,
      bottom: borderStyle,
      right: borderStyle
    };
  }

  console.log('Step 3: Check borders in memory');
  let bordersFound = 0;
  for (let row = 10; row <= 24; row++) {
    const cell = bsdWorksheet.getCell(row, 8);
    if (cell.border && Object.keys(cell.border).length > 0) {
      bordersFound++;
    }
  }
  console.log(`  Borders in memory: ${bordersFound}/15`);

  console.log('\nStep 4: Write to file...');
  const outputPath = '/Users/lucusdato/Downloads/test-fill-preserve-fix.xlsx';
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Wrote to ${outputPath}`);

  console.log('\n=== RESULT ===');
  console.log(`If borders now appear in Brand Say Digital column H (rows 10-24),`);
  console.log(`then the fix is: DON'T clear the solid white fill!`);
}

testFillPreserveFix().catch(console.error);
