/**
 * Inspect Brand Say Digital template rows 10-24 to find what's blocking borders
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function inspectBSDTemplateRows() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== INSPECTING BRAND SAY DIGITAL TEMPLATE ROWS 10-24 ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const bsdWorksheet = workbook.getWorksheet('Brand Say Digital');
  const bssWorksheet = workbook.getWorksheet('Brand Say Social');

  if (!bsdWorksheet || !bssWorksheet) {
    throw new Error('Worksheets not found');
  }

  // Check column H (the problematic column) in rows 10-24
  console.log('BRAND SAY DIGITAL - Column H characteristics:\n');

  for (let row = 10; row <= 12; row++) { // Just check first 3 rows
    const cell = bsdWorksheet.getCell(row, 8);
    console.log(`Row ${row}:`);
    console.log(`  Value: "${cell.value}"`);
    console.log(`  Type: ${cell.type}`);
    console.log(`  Has formula: ${!!cell.formula}`);
    console.log(`  Has border: ${!!(cell.border && Object.keys(cell.border).length > 0)}`);
    console.log(`  Has fill: ${!!(cell.fill && cell.fill.type !== 'pattern')}`);
    console.log(`  Fill type: ${cell.fill ? (cell.fill as any).type : 'none'}`);
    console.log(`  Fill pattern: ${cell.fill && (cell.fill as any).pattern ? (cell.fill as any).pattern : 'none'}`);
    console.log(`  isMerged: ${cell.isMerged}`);
    console.log(`  Style: ${JSON.stringify(cell.style)}`);
    console.log();
  }

  console.log('\nBRAND SAY SOCIAL - Column H characteristics (for comparison):\n');

  for (let row = 9; row <= 11; row++) { // Just check first 3 rows
    const cell = bssWorksheet.getCell(row, 8);
    console.log(`Row ${row}:`);
    console.log(`  Value: "${cell.value}"`);
    console.log(`  Type: ${cell.type}`);
    console.log(`  Has formula: ${!!cell.formula}`);
    console.log(`  Has border: ${!!(cell.border && Object.keys(cell.border).length > 0)}`);
    console.log(`  Has fill: ${!!(cell.fill && cell.fill.type !== 'pattern')}`);
    console.log(`  Fill type: ${cell.fill ? (cell.fill as any).type : 'none'}`);
    console.log(`  Fill pattern: ${cell.fill && (cell.fill as any).pattern ? (cell.fill as any).pattern : 'none'}`);
    console.log(`  isMerged: ${cell.isMerged}`);
    console.log(`  Style: ${JSON.stringify(cell.style)}`);
    console.log();
  }

  // Check if there are any existing merges in the template that might interfere
  console.log('\n\nCHECKING FOR EXISTING MERGES IN TEMPLATE:\n');

  console.log('Brand Say Digital:');
  const bsdMerges = (bsdWorksheet as any)._merges || {};
  const bsdMergeArray = Object.keys(bsdMerges);
  console.log(`  Total merges: ${bsdMergeArray.length}`);
  if (bsdMergeArray.length > 0) {
    console.log(`  First 10 merges: ${bsdMergeArray.slice(0, 10).join(', ')}`);
  }

  console.log('\nBrand Say Social:');
  const bssMerges = (bssWorksheet as any)._merges || {};
  const bssMergeArray = Object.keys(bssMerges);
  console.log(`  Total merges: ${bssMergeArray.length}`);
  if (bssMergeArray.length > 0) {
    console.log(`  First 10 merges: ${bssMergeArray.slice(0, 10).join(', ')}`);
  }
}

inspectBSDTemplateRows().catch(console.error);
