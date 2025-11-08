/**
 * Test if borders persist through the write/read cycle
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function testBorderPersistence() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== TESTING BORDER PERSISTENCE ===\n');

  // Load template
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const worksheet = workbook.getWorksheet('Brand Say Digital');

  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  // Test columns: H(8), O(15), P(16), Q(17), R(18), S(19)
  const testCells = [
    { row: 10, col: 8, name: 'H10' },
    { row: 10, col: 15, name: 'O10' },
    { row: 10, col: 16, name: 'P10' },
    { row: 10, col: 17, name: 'Q10' },
    { row: 10, col: 18, name: 'R10' },
    { row: 10, col: 19, name: 'S10' },
    { row: 12, col: 8, name: 'H12' },
    { row: 12, col: 17, name: 'Q12' },
  ];

  console.log('BEFORE applying borders:');
  for (const { row, col, name } of testCells) {
    const cell = worksheet.getCell(row, col);
    const hasBorder = cell.border && Object.keys(cell.border).length > 0;
    console.log(`  ${name}: border=${hasBorder}, value="${cell.value ?? '(empty)'}"`);
  }

  console.log('\nApplying borders with different approaches...\n');

  // Approach 1: Space character
  for (let row = 10; row <= 12; row++) {
    const cell = worksheet.getCell(row, 8); // Column H
    cell.value = ' ';
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFFF0000' } },
      left: { style: 'thin', color: { argb: 'FFFF0000' } },
      bottom: { style: 'thin', color: { argb: 'FFFF0000' } },
      right: { style: 'thin', color: { argb: 'FFFF0000' } }
    };
  }

  // Approach 2: Empty string
  for (let row = 10; row <= 12; row++) {
    const cell = worksheet.getCell(row, 15); // Column O
    cell.value = '';
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF00FF00' } },
      left: { style: 'thin', color: { argb: 'FF00FF00' } },
      bottom: { style: 'thin', color: { argb: 'FF00FF00' } },
      right: { style: 'thin', color: { argb: 'FF00FF00' } }
    };
  }

  // Approach 3: Leave value as-is
  for (let row = 10; row <= 12; row++) {
    const cell = worksheet.getCell(row, 16); // Column P
    // Don't set value
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF0000FF' } },
      left: { style: 'thin', color: { argb: 'FF0000FF' } },
      bottom: { style: 'thin', color: { argb: 'FF0000FF' } },
      right: { style: 'thin', color: { argb: 'FF0000FF' } }
    };
  }

  // Approach 4: Set style object directly
  for (let row = 10; row <= 12; row++) {
    const cell = worksheet.getCell(row, 17); // Column Q
    cell.value = ' ';
    cell.style = {
      border: {
        top: { style: 'thin', color: { argb: 'FFFFFF00' } },
        left: { style: 'thin', color: { argb: 'FFFFFF00' } },
        bottom: { style: 'thin', color: { argb: 'FFFFFF00' } },
        right: { style: 'thin', color: { argb: 'FFFFFF00' } }
      }
    };
  }

  console.log('AFTER applying borders (before write):');
  for (const { row, col, name } of testCells) {
    const cell = worksheet.getCell(row, col);
    const hasBorder = cell.border && Object.keys(cell.border).length > 0;
    const borderColor = cell.border?.top?.color?.argb;
    console.log(`  ${name}: border=${hasBorder}, color=${borderColor}, value="${cell.value ?? '(empty)'}"`);
  }

  // Write to buffer and read back
  console.log('\nWriting to buffer...');
  const buffer = await workbook.xlsx.writeBuffer();

  console.log('Reading back from buffer...\n');
  const workbook2 = new ExcelJS.Workbook();
  await workbook2.xlsx.load(buffer);
  const worksheet2 = workbook2.getWorksheet('Brand Say Digital');

  if (!worksheet2) {
    throw new Error('Worksheet not found after reload');
  }

  console.log('AFTER write/read cycle:');
  for (const { row, col, name } of testCells) {
    const cell = worksheet2.getCell(row, col);
    const hasBorder = cell.border && Object.keys(cell.border).length > 0;
    const borderColor = cell.border?.top?.color?.argb;
    console.log(`  ${name}: border=${hasBorder}, color=${borderColor}, value="${cell.value ?? '(empty)'}"`);
  }

  // Save to file for manual inspection
  await workbook2.xlsx.writeFile('/Users/lucusdato/Downloads/border-persistence-test.xlsx');
  console.log('\n✅ Saved to /Users/lucusdato/Downloads/border-persistence-test.xlsx');
  console.log('\nExpected colors:');
  console.log('  Column H (rows 10-12): RED');
  console.log('  Column O (rows 10-12): GREEN');
  console.log('  Column P (rows 10-12): BLUE');
  console.log('  Column Q (rows 10-12): YELLOW');
}

testBorderPersistence().catch(console.error);
