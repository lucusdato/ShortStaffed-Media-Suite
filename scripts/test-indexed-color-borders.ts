/**
 * Test if using indexed color (like the template) works better than argb
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function testIndexedColorBorders() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== TESTING INDEXED COLOR VS ARGB ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const worksheet = workbook.getWorksheet('Brand Say Digital');

  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  // Test columns: H(8), O(15), P(16), Q(17), R(18), S(19)
  // Test rows: 10-24 (the problem area)

  console.log('Applying borders using INDEXED color format (matching template)...\n');

  // Note: 'indexed' is not in ExcelJS TypeScript defs but exists at runtime
  const borderStyleIndexed: Partial<ExcelJS.Border> = {
    style: 'thin',
    color: { indexed: 64 } as any  // Same as template
  };

  for (let row = 10; row <= 24; row++) {
    for (let col of [8, 15, 16, 17, 18, 19]) {
      const cell = worksheet.getCell(row, col);

      // Set value to empty string to ensure cell exists
      if (cell.value === undefined || cell.value === null || cell.value === '') {
        cell.value = '';
      }

      // Apply border using INDEXED color (same as template)
      cell.border = {
        top: borderStyleIndexed,
        left: borderStyleIndexed,
        bottom: borderStyleIndexed,
        right: borderStyleIndexed
      };

      // Apply alignment
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true
      };
    }
  }

  console.log('Borders applied. Writing to file...\n');

  const outputPath = '/Users/lucusdato/Downloads/test-indexed-color-borders.xlsx';
  await workbook.xlsx.writeFile(outputPath);

  console.log(`✅ Test file saved to: ${outputPath}`);
  console.log('\nPlease open the file and check:');
  console.log('- Brand Say Digital tab');
  console.log('- Rows 10-24');
  console.log('- Columns H, O, P, Q, R, S');
  console.log('- All cells should have thin black borders (indexed color 64)');
}

testIndexedColorBorders().catch(console.error);
