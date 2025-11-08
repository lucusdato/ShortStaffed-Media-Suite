/**
 * Test if setting column width after applying borders clears the borders
 * This might be the root cause of our border disappearing issue
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function testColumnWidthBorderInteraction() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== TESTING COLUMN WIDTH + BORDER INTERACTION ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const worksheet = workbook.getWorksheet('Brand Say Digital');

  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  console.log('STEP 1: Apply borders to rows 10-24, columns H and O\n');

  const borderStyle: Partial<ExcelJS.Border> = {
    style: 'thin',
    color: { indexed: 64 } as any
  };

  // Apply borders to H10:H24 and O10:O24
  for (let row = 10; row <= 24; row++) {
    for (const col of [8, 15]) { // H and O
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
    }
  }

  console.log('  ✅ Applied borders to H10:H24 and O10:O24');

  // MERGE CELLS (like we do in actual generation)
  console.log('\nSTEP 2: Merge cells (campaign-level)\n');
  worksheet.mergeCells('H10:H24'); // Merge H across all 15 rows
  worksheet.mergeCells('O10:O14'); // Merge O across first 5 rows
  worksheet.mergeCells('O15:O19'); // Merge O across second 5 rows
  worksheet.mergeCells('O20:O24'); // Merge O across third 5 rows

  console.log('  ✅ Merged cells');

  console.log('\nSTEP 3: Check if borders still present BEFORE setting column width\n');
  let bordersBeforeWidth = 0;
  for (let row = 10; row <= 24; row++) {
    for (const col of [8, 15]) {
      const cell = worksheet.getCell(row, col);
      if (cell.border && Object.keys(cell.border).length > 0) {
        bordersBeforeWidth++;
      }
    }
  }
  console.log(`  Borders found: ${bordersBeforeWidth}/30 cells`);

  console.log('\nSTEP 4: Set column widths (mimicking auto-sizing)\n');
  // Set column widths like we do in generateTrafficSheet
  const colH = worksheet.getColumn(8);
  const colO = worksheet.getColumn(15);

  colH.width = 25; // Set a width
  colO.width = 20; // Set a width

  console.log('  ✅ Set column widths (H=25, O=20)');

  console.log('\nSTEP 5: Check if borders still present AFTER setting column width\n');
  let bordersAfterWidth = 0;
  for (let row = 10; row <= 24; row++) {
    for (const col of [8, 15]) {
      const cell = worksheet.getCell(row, col);
      if (cell.border && Object.keys(cell.border).length > 0) {
        bordersAfterWidth++;
      } else {
        console.log(`  ❌ Border LOST at ${String.fromCharCode(64 + col)}${row}`);
      }
    }
  }
  console.log(`  Borders found: ${bordersAfterWidth}/30 cells`);

  console.log('\nSTEP 6: Re-apply borders AFTER column width setting\n');
  for (let row = 10; row <= 24; row++) {
    for (const col of [8, 15]) {
      const cell = worksheet.getCell(row, col);

      // Clear fill again
      cell.fill = {
        type: 'pattern',
        pattern: 'none'
      };

      // Re-apply border
      cell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle
      };
    }
  }

  console.log('  ✅ Re-applied borders after column width');

  console.log('\nSTEP 7: Writing to file...\n');
  const outputPath = '/Users/lucusdato/Downloads/test-column-width-border.xlsx';
  await workbook.xlsx.writeFile(outputPath);
  console.log(`  ✅ Wrote to ${outputPath}`);

  console.log('\n=== RESULTS ===');
  console.log(`  Borders BEFORE column width: ${bordersBeforeWidth}/30`);
  console.log(`  Borders AFTER column width: ${bordersAfterWidth}/30`);

  if (bordersAfterWidth < bordersBeforeWidth) {
    console.log(`\n  ⚠️  PROBLEM FOUND: Setting column width CLEARED ${bordersBeforeWidth - bordersAfterWidth} borders!`);
    console.log(`  Solution: Re-apply borders AFTER setting column widths`);
  } else {
    console.log(`\n  ✅ Column width did NOT affect borders`);
  }

  console.log('\nOpen the generated file to verify borders appear correctly.');
}

testColumnWidthBorderInteraction().catch(console.error);
