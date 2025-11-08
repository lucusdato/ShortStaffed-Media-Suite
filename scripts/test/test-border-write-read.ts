/**
 * Test if borders actually persist when we write and read back
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function testBorderWriteRead() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== TESTING BORDER WRITE/READ CYCLE ===\n');

  // Load template
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const worksheet = workbook.getWorksheet('Brand Say Digital');

  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  // Test cells: columns H(8), O(15), P(16), Q(17), R(18), S(19), rows 10-24
  const testCols = [8, 15, 16, 17, 18, 19];
  const testRows = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  console.log('STEP 1: Clearing fills and applying borders...\n');

  const borderStyle: Partial<ExcelJS.Border> = {
    style: 'thin',
    color: { indexed: 64 } as any
  };

  for (const row of testRows) {
    for (const col of testCols) {
      const cell = worksheet.getCell(row, col);

      // Clear fill
      cell.fill = {
        type: 'pattern',
        pattern: 'none'
      };

      // Apply border
      cell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
      };

      // Set value if empty
      if (!cell.value) {
        cell.value = ' ';
      }

      console.log(`  Applied border to ${String.fromCharCode(64 + col)}${row}`);
    }
  }

  console.log('\nSTEP 2: Writing to file...\n');
  const outputPath = '/Users/lucusdato/Downloads/test-border-write-read.xlsx';
  await workbook.xlsx.writeFile(outputPath);
  console.log(`  ✅ Wrote to ${outputPath}`);

  console.log('\nSTEP 3: Reading back from file...\n');
  const workbook2 = new ExcelJS.Workbook();
  await workbook2.xlsx.readFile(outputPath);
  const worksheet2 = workbook2.getWorksheet('Brand Say Digital');

  if (!worksheet2) {
    throw new Error('Worksheet not found after reload');
  }

  console.log('STEP 4: Checking if borders persisted...\n');
  let bordersFound = 0;
  let bordersMissing = 0;

  for (const row of testRows) {
    for (const col of testCols) {
      const cell = worksheet2.getCell(row, col);
      const hasBorder = cell.border && Object.keys(cell.border).length > 0;

      if (hasBorder) {
        bordersFound++;
      } else {
        bordersMissing++;
        console.log(`  ❌ MISSING border at ${String.fromCharCode(64 + col)}${row}`);
      }
    }
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`  Borders found: ${bordersFound}/${testCols.length * testRows.length}`);
  console.log(`  Borders missing: ${bordersMissing}/${testCols.length * testRows.length}`);

  if (bordersMissing > 0) {
    console.log(`\n  ⚠️  PROBLEM: ${bordersMissing} borders did NOT persist!`);
  } else {
    console.log(`\n  ✅ SUCCESS: All borders persisted!`);
  }
}

testBorderWriteRead().catch(console.error);
