const ExcelJS = require('exceljs');

(async () => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile('public/templates/unilever-traffic-sheet-template.xlsx');

  const ws = wb.getWorksheet('Brand Say Digital');
  if (!ws) {
    console.log('Brand Say Digital worksheet not found');
    return;
  }

  // Check multiple rows to find headers
  for (let rowNum = 1; rowNum <= 10; rowNum++) {
    const row = ws.getRow(rowNum);
    console.log(`\nBrand Say Digital - Row ${rowNum}:`);
    console.log('='.repeat(60));

    for (let col = 1; col <= 20; col++) {
      const cell = row.getCell(col);
      const colLetter = String.fromCharCode(64 + col);
      if (cell.value) {
        console.log(`  Column ${col} (${colLetter}): "${cell.value}"`);
      }
    }
  }

  console.log('\n');
})();
