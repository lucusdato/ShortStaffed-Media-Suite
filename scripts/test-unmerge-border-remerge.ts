/**
 * Test the workaround: Border BEFORE merge, or unmerge -> border -> remerge
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function testUnmergeBorderRemerge() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== TESTING BORDER APPLICATION STRATEGIES ===\n');

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

  // STRATEGY 1: Apply borders BEFORE merging (Brand Say Digital)
  console.log('STRATEGY 1: Brand Say Digital - Borders BEFORE merge\n');

  console.log('  Step 1: Apply borders to individual cells (H10:H24)');
  for (let row = 10; row <= 24; row++) {
    const cell = bsdWorksheet.getCell(row, 8);
    cell.border = {
      top: borderStyle,
      left: borderStyle,
      bottom: borderStyle,
      right: borderStyle
    };
  }

  console.log('  Step 2: NOW merge the cells');
  bsdWorksheet.mergeCells('H10:H24');

  // STRATEGY 2: Same for Brand Say Social
  console.log('\nSTRATEGY 2: Brand Say Social - Borders BEFORE merge\n');

  console.log('  Step 1: Apply borders to individual cells (H9:H23)');
  for (let row = 9; row <= 23; row++) {
    const cell = bssWorksheet.getCell(row, 8);
    cell.border = {
      top: borderStyle,
      left: borderStyle,
      bottom: borderStyle,
      right: borderStyle
    };
  }

  console.log('  Step 2: NOW merge the cells');
  bssWorksheet.mergeCells('H9:H23');

  console.log('\nWriting to file...');
  const outputPath = '/Users/lucusdato/Downloads/test-border-before-merge.xlsx';
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Wrote to ${outputPath}`);

  console.log('\n=== RESULT ===');
  console.log('If borders now appear in both tabs after merging,');
  console.log('then the fix is: Apply borders BEFORE merging, not after!');
}

testUnmergeBorderRemerge().catch(console.error);
