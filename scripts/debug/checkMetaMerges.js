const ExcelJS = require('exceljs');

async function checkMetaMerges() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('/Users/lucusdato/Downloads/CA Hellmann\'s 2025 Canada Premier League - Blocking Chart.xlsx');

  const worksheet = workbook.getWorksheet('Media plan');

  console.log('=== CHECKING MERGES FOR META AND TIKTOK ROWS ===\n');

  const merges = worksheet._merges || {};
  console.log(`Total merge regions: ${Object.keys(merges).length}\n`);

  console.log('Merges affecting Meta rows (12-20):');
  Object.keys(merges).forEach(key => {
    const mergeRange = merges[key].toString();
    const [start, end] = mergeRange.split(':');
    const startRow = parseInt(start.replace(/[A-Z]/g, ''));
    const endRow = parseInt(end.replace(/[A-Z]/g, ''));

    if ((startRow >= 12 && startRow <= 20) || (endRow >= 12 && endRow <= 20)) {
      console.log(`  ${mergeRange}`);
    }
  });

  console.log('\nMerges affecting TikTok rows (21-23):');
  Object.keys(merges).forEach(key => {
    const mergeRange = merges[key].toString();
    const [start, end] = mergeRange.split(':');
    const startRow = parseInt(start.replace(/[A-Z]/g, ''));
    const endRow = parseInt(end.replace(/[A-Z]/g, ''));

    if ((startRow >= 21 && startRow <= 23) || (endRow >= 21 && endRow <= 23)) {
      console.log(`  ${mergeRange}`);
    }
  });

  console.log('\n=== DIAGNOSIS ===');
  console.log('If Budget/Impressions/Placements columns are NOT merged for these rows,');
  console.log('AND standalone detection stops at row 11,');
  console.log('then NO campaign lines will be detected for rows 12-23.');
}

checkMetaMerges().catch(console.error);
