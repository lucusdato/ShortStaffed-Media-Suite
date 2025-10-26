/**
 * Check if Brand Say Digital has merged cells in rows 9-10 that might be blocking borders
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function checkBSDTemplateMerges() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  console.log('\n=== CHECKING BRAND SAY DIGITAL TEMPLATE MERGES ===\n');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const bsdWorksheet = workbook.getWorksheet('Brand Say Digital');
  const bssWorksheet = workbook.getWorksheet('Brand Say Social');

  if (!bsdWorksheet || !bssWorksheet) {
    throw new Error('Worksheets not found');
  }

  console.log('BRAND SAY DIGITAL - Checking for merged cells in rows 9-10:\n');

  // Check columns H, O, P, Q, R, S (the ones with border issues)
  const problemCols = [
    { col: 8, name: 'H (Accutics Ad Set Name)' },
    { col: 15, name: 'O (KPI Metric)' },
    { col: 16, name: 'P' },
    { col: 17, name: 'Q' },
    { col: 18, name: 'R' },
    { col: 19, name: 'S' }
  ];

  for (const { col, name } of problemCols) {
    console.log(`Column ${name}:`);

    for (let row = 9; row <= 10; row++) {
      const cell = bsdWorksheet.getCell(row, col);
      const isMerged = cell.isMerged;
      const master = cell.master;

      if (isMerged) {
        console.log(`  Row ${row}: MERGED (master: ${master?.address || 'unknown'})`);
      } else {
        console.log(`  Row ${row}: Not merged`);
      }
    }
    console.log();
  }

  console.log('\n\nBRAND SAY SOCIAL - Checking for merged cells in rows 8-9 (for comparison):\n');

  for (const { col, name } of problemCols) {
    console.log(`Column ${name}:`);

    for (let row = 8; row <= 9; row++) {
      const cell = bssWorksheet.getCell(row, col);
      const isMerged = cell.isMerged;
      const master = cell.master;

      if (isMerged) {
        console.log(`  Row ${row}: MERGED (master: ${master?.address || 'unknown'})`);
      } else {
        console.log(`  Row ${row}: Not merged`);
      }
    }
    console.log();
  }

  console.log('\n=== CHECKING FILLS ===\n');

  console.log('Brand Say Digital row 9:');
  for (const { col, name } of problemCols) {
    const cell = bsdWorksheet.getCell(9, col);
    const hasFill = cell.fill && (cell.fill as any).type !== 'pattern' || ((cell.fill as any).pattern && (cell.fill as any).pattern !== 'none');
    console.log(`  ${name}: fill = ${hasFill ? 'YES' : 'NO'}`);
  }

  console.log('\nBrand Say Social row 8:');
  for (const { col, name } of problemCols) {
    const cell = bssWorksheet.getCell(8, col);
    const hasFill = cell.fill && (cell.fill as any).type !== 'pattern' || ((cell.fill as any).pattern && (cell.fill as any).pattern !== 'none');
    console.log(`  ${name}: fill = ${hasFill ? 'YES' : 'NO'}`);
  }
}

checkBSDTemplateMerges().catch(console.error);
