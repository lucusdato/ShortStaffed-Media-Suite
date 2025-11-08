/**
 * Test if unmerging, applying borders, then remerging works
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function testUnmergeBorderMerge() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== TESTING UNMERGE → BORDER → REMERGE ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const worksheet = workbook.getWorksheet('Brand Say Digital');

  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  console.log('STEP 1: Merge cells in rows 10-24...\n');

  // Simulate our campaign-level merges (like we do in the traffic sheet)
  worksheet.mergeCells('H10:H24'); // Column H merged across all 15 rows
  worksheet.mergeCells('O10:O14'); // Column O merged across 5 rows (first ad group)
  worksheet.mergeCells('O15:O19'); // Column O merged across 5 rows (second ad group)
  worksheet.mergeCells('O20:O24'); // Column O merged across 5 rows (third ad group)

  console.log('  ✅ Merged cells');

  console.log('\nSTEP 2: Try applying borders to merged cells...\n');

  const borderStyle: Partial<ExcelJS.Border> = {
    style: 'thin',
    color: { indexed: 64 } as any
  };

  // Try applying borders to merged cells
  for (let row = 10; row <= 24; row++) {
    for (const col of [8, 15]) { // H and O
      const cell = worksheet.getCell(row, col);

      cell.fill = {
        type: 'pattern',
        pattern: 'none'
      };

      cell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
      };
    }
  }

  console.log('  ✅ Applied borders to merged cells');

  console.log('\nSTEP 3: Writing to file...\n');
  const outputPath = '/Users/lucusdato/Downloads/test-merged-borders.xlsx';
  await workbook.xlsx.writeFile(outputPath);
  console.log(`  ✅ Wrote to ${outputPath}`);

  console.log('\nOpen the file and check if borders appear in columns H and O, rows 10-24');
  console.log('If they DON\'T appear, that confirms merging blocks border rendering in Excel');
}

testUnmergeBorderMerge().catch(console.error);
