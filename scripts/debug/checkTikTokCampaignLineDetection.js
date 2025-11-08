const ExcelJS = require('exceljs');

async function checkCampaignLineDetection() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('/Users/lucusdato/Downloads/CA Hellmann\'s 2025 Canada Premier League - Blocking Chart.xlsx');

  const worksheet = workbook.getWorksheet('Media plan');

  // Find header row
  let headerRowIndex = -1;
  let headers = [];

  worksheet.eachRow((row, rowNumber) => {
    if (headerRowIndex !== -1) return;

    const values = row.values;
    const nonEmptyCount = values.filter(v => v !== null && v !== undefined && v !== '').length;

    if (nonEmptyCount >= 3) {
      const potentialHeaders = [];
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        potentialHeaders[colNumber - 1] = cell.value ? String(cell.value).trim() : '';
      });

      const normalized = potentialHeaders.map(h => h.toLowerCase());
      if (normalized.some(h => h.includes('channel')) &&
          normalized.some(h => h.includes('platform')) &&
          normalized.some(h => h.includes('objective'))) {
        headerRowIndex = rowNumber;
        headers = potentialHeaders;
      }
    }
  });

  console.log('=== CAMPAIGN LINE DETECTION FOR TIKTOK ===\n');
  console.log(`Header row: ${headerRowIndex}`);

  // Find required column indices
  const budgetIdx = headers.findIndex(h => h && (h === 'Gross Budget' || h === 'Net Budget' || h === 'Working Media Budget'));
  const impressionsIdx = headers.findIndex(h => h && (h === 'Est. Impressions' || h.includes('Impressions')));
  const placementsIdx = headers.findIndex(h => h && (h.includes('Campaign Details') || h === 'Placements'));

  console.log(`Budget column: Index ${budgetIdx} (${headers[budgetIdx]})`);
  console.log(`Impressions column: Index ${impressionsIdx} (${headers[impressionsIdx]})`);
  console.log(`Placements column: Index ${placementsIdx} (${headers[placementsIdx]})`);

  // Check TikTok rows (21-23)
  console.log(`\n=== CHECKING TIKTOK ROWS 21-23 ===`);

  for (let rowNum = 21; rowNum <= 23; rowNum++) {
    const row = worksheet.getRow(rowNum);
    const budgetCell = row.getCell(budgetIdx + 1);
    const impressionsCell = row.getCell(impressionsIdx + 1);
    const placementsCell = row.getCell(placementsIdx + 1);

    console.log(`\nRow ${rowNum}:`);
    console.log(`  Budget cell merged: ${budgetCell.isMerged}`);
    console.log(`  Budget value: ${budgetCell.value}`);
    console.log(`  Impressions cell merged: ${impressionsCell.isMerged}`);
    console.log(`  Impressions value: ${impressionsCell.value}`);
    console.log(`  Placements cell merged: ${placementsCell.isMerged}`);
    console.log(`  Placements value: ${placementsCell.value}`);
  }

  // Check merges for these columns around rows 21-23
  console.log(`\n=== MERGE RANGES FOR CRITICAL COLUMNS ===`);

  const merges = worksheet._merges || {};
  const budgetColLetter = String.fromCharCode(65 + budgetIdx);
  const impressionsColLetter = String.fromCharCode(65 + impressionsIdx);
  const placementsColLetter = String.fromCharCode(65 + placementsIdx);

  console.log(`Budget column letter: ${budgetColLetter}`);
  console.log(`Impressions column letter: ${impressionsColLetter}`);
  console.log(`Placements column letter: ${placementsColLetter}`);

  console.log(`\nMerges affecting rows 21-23:`);
  Object.keys(merges).forEach(key => {
    const mergeRange = merges[key].toString();
    const [start, end] = mergeRange.split(':');
    const startCol = start.replace(/[0-9]/g, '');
    const startRow = parseInt(start.replace(/[A-Z]/g, ''));
    const endRow = parseInt(end.replace(/[A-Z]/g, ''));

    if (startRow <= 23 && endRow >= 21) {
      if (startCol === budgetColLetter || startCol === impressionsColLetter || startCol === placementsColLetter) {
        console.log(`  ${mergeRange} (Column ${startCol})`);
      }
    }
  });

  console.log(`\n=== DIAGNOSIS ===`);
  console.log(`For TikTok rows to be detected as a campaign line, the following must ALL be merged:`);
  console.log(`  1. Budget column (${budgetColLetter})`);
  console.log(`  2. Impressions column (${impressionsColLetter})`);
  console.log(`  3. Placements column (${placementsColLetter})`);
  console.log(`\nIf any of these is NOT merged across rows 21-23, the campaign line won't be detected.`);
}

checkCampaignLineDetection().catch(console.error);
