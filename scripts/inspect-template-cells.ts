/**
 * Inspect the template cells to understand why borders might not be applying
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function inspectTemplateCells() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const worksheet = workbook.getWorksheet('Brand Say Digital');

  if (!worksheet) {
    throw new Error('Brand Say Digital worksheet not found');
  }

  console.log('\n=== INSPECTING TEMPLATE CELLS (Brand Say Digital) ===\n');

  // Check problem columns
  const problemColumns = [
    { col: 8, name: 'H' },
    { col: 15, name: 'O' },
    { col: 16, name: 'P' },
    { col: 17, name: 'Q' },
    { col: 18, name: 'R' },
    { col: 19, name: 'S' }
  ];

  console.log('Checking rows 10-12 for each problem column:\n');

  for (const { col, name } of problemColumns) {
    console.log(`\nColumn ${name} (${col}):`);

    for (let row = 10; row <= 12; row++) {
      const cell = worksheet.getCell(row, col);

      console.log(`  Row ${row}:`);
      console.log(`    Value: ${cell.value ?? '(empty)'}`);
      console.log(`    Type: ${cell.type ?? '(undefined)'}`);
      console.log(`    isMerged: ${cell.isMerged}`);
      console.log(`    master: ${cell.master ? `${cell.master.row}:${cell.master.col}` : 'none'}`);
      console.log(`    border: ${cell.border && Object.keys(cell.border).length > 0 ? 'YES' : 'NO'}`);

      if (cell.border && Object.keys(cell.border).length > 0) {
        console.log(`    border details:`, JSON.stringify(cell.border, null, 2));
      }
    }
  }

  // Check for worksheet protection
  console.log('\n\n=== WORKSHEET PROTECTION ===');
  console.log(`Protected: ${worksheet.properties?.tabColor ? 'Unknown' : 'No'}`);

  // Check for merged cells in the problem area
  console.log('\n\n=== MERGED CELLS IN ROWS 10-24, COLS H-S ===');
  const mergedCellsInArea: string[] = [];

  // @ts-ignore - accessing internal property
  if (worksheet._merges) {
    // @ts-ignore
    Object.keys(worksheet._merges).forEach(key => {
      // @ts-ignore
      const merge = worksheet._merges[key];
      const { top, left, bottom, right } = merge.model;

      // Check if merge overlaps with our problem area
      if (
        top <= 24 && bottom >= 10 &&  // Overlaps rows 10-24
        left <= 19 && right >= 8        // Overlaps columns H-S (8-19)
      ) {
        mergedCellsInArea.push(`${String.fromCharCode(64 + left)}${top}:${String.fromCharCode(64 + right)}${bottom}`);
      }
    });
  }

  if (mergedCellsInArea.length > 0) {
    console.log('Found merged cells in problem area:');
    mergedCellsInArea.forEach(merge => console.log(`  ${merge}`));
  } else {
    console.log('No merged cells found in rows 10-24, columns H-S');
  }
}

inspectTemplateCells().catch(console.error);
