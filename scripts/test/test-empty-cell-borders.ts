/**
 * Test different approaches to applying borders on empty cells
 */
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs/promises';

async function testEmptyCellBorders() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const worksheet = workbook.getWorksheet('Brand Say Digital');

  if (!worksheet) {
    throw new Error('Brand Say Digital worksheet not found');
  }

  console.log('\n=== TESTING BORDER APPLICATION ON EMPTY CELLS ===\n');

  // Test different approaches for columns H, O, P, Q, R, S (8, 15, 16, 17, 18, 19)
  const testColumns = [
    { col: 8, name: 'H (Accutics Ad Set Name)' },
    { col: 15, name: 'O (KPI Metric)' },
    { col: 16, name: 'P (Bid Type)' },
    { col: 17, name: 'Q (Creative Name)' },
    { col: 18, name: 'R (Landing Page URL)' },
    { col: 19, name: 'S (Landing Page URL w UTM)' }
  ];

  const testRows = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  console.log('Applying borders to empty cells in columns H, O, P, Q, R, S for rows 10-24...\n');

  for (const { col, name } of testColumns) {
    console.log(`Column ${name}:`);

    for (const row of testRows) {
      const cell = worksheet.getCell(row, col);

      // Check current state
      const hadValue = cell.value !== undefined && cell.value !== null;
      const hadBorder = cell.border && Object.keys(cell.border).length > 0;

      // APPROACH: Set value to empty string FIRST, then apply border
      if (!hadValue) {
        cell.value = '';
      }

      // Apply border
      cell.border = {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } }
      };

      // Apply alignment
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true
      };

      console.log(`  Row ${row}: hadValue=${hadValue}, hadBorder=${hadBorder} → border applied`);
    }
    console.log('');
  }

  const outputPath = '/Users/lucusdato/Downloads/test-empty-cell-borders.xlsx';
  await workbook.xlsx.writeFile(outputPath);

  console.log(`\n✅ Test file saved to: ${outputPath}`);
  console.log('\nPlease open the file and check:');
  console.log('- Brand Say Digital tab');
  console.log('- Rows 10-24');
  console.log('- Columns H, O, P, Q, R, S');
  console.log('- All cells should have thin black borders');
}

testEmptyCellBorders().catch(console.error);
