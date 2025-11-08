const ExcelJS = require('exceljs');

async function analyzeBlockingChart() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('/Users/lucusdato/Downloads/CA Hellmann\'s 2025 Canada Premier League - Blocking Chart.xlsx');

  console.log('=== WORKBOOK ANALYSIS ===\n');
  console.log('Sheet Names:', workbook.worksheets.map(ws => ws.name));

  // Analyze each sheet
  workbook.worksheets.forEach((worksheet, idx) => {
    console.log(`\n=== SHEET ${idx + 1}: ${worksheet.name} ===`);
    console.log(`Row Count: ${worksheet.rowCount}`);
    console.log(`Column Count: ${worksheet.columnCount}`);

    // Get headers (first row)
    const headerRow = worksheet.getRow(1);
    const headers = [];
    headerRow.eachCell((cell, colNumber) => {
      headers.push(`Col ${colNumber}: ${cell.value}`);
    });
    console.log('\nHeaders:', headers.join(' | '));

    // Look for TikTok entries
    console.log('\n=== LOOKING FOR TIKTOK ===');
    let tiktokCount = 0;
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header

      let rowData = [];
      row.eachCell((cell, colNumber) => {
        const value = cell.value?.toString() || '';
        rowData.push(value);

        if (value.toLowerCase().includes('tiktok')) {
          tiktokCount++;
          console.log(`Row ${rowNumber}: Found TikTok in column ${colNumber}`);
          console.log(`  Full row data:`, rowData.slice(0, 10).join(' | '));
        }
      });
    });

    console.log(`\nTotal TikTok entries found: ${tiktokCount}`);

    // Sample first 5 data rows
    console.log('\n=== FIRST 5 DATA ROWS ===');
    for (let i = 2; i <= Math.min(6, worksheet.rowCount); i++) {
      const row = worksheet.getRow(i);
      const rowData = [];
      row.eachCell((cell, colNumber) => {
        rowData.push(`${cell.value}`);
      });
      console.log(`Row ${i}:`, rowData.slice(0, 10).join(' | '));
    }
  });
}

analyzeBlockingChart().catch(console.error);
