const ExcelJS = require('exceljs');

function getCellValue(cell) {
  if (cell.value === null || cell.value === undefined) {
    return null;
  }

  // Handle formula cells
  if (typeof cell.value === 'object' && 'result' in cell.value) {
    const result = cell.value.result;
    if (result instanceof Date) {
      const year = result.getUTCFullYear();
      const month = String(result.getUTCMonth() + 1).padStart(2, '0');
      const day = String(result.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return result;
  }

  // Handle rich text
  if (typeof cell.value === 'object' && 'richText' in cell.value) {
    return cell.value.richText.map(rt => rt.text).join('');
  }

  // Handle date objects
  if (cell.value instanceof Date) {
    const year = cell.value.getUTCFullYear();
    const month = String(cell.value.getUTCMonth() + 1).padStart(2, '0');
    const day = String(cell.value.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return cell.value;
}

async function checkTikTokValues() {
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

  console.log('=== TIKTOK CELL VALUES (EXTRACTED) ===\n');

  const budgetIdx = headers.findIndex(h => h && (h === 'Gross Budget' || h === 'Net Budget' || h === 'Working Media Budget'));
  const impressionsIdx = headers.findIndex(h => h && (h === 'Est. Impressions' || h.includes('Impressions')));
  const placementsIdx = headers.findIndex(h => h && (h.includes('Campaign Details') || h === 'Placements'));
  const channelIdx = headers.findIndex(h => h && h.toLowerCase() === 'channel');
  const platformIdx = headers.findIndex(h => h && h.toLowerCase() === 'platform');

  for (let rowNum = 21; rowNum <= 23; rowNum++) {
    const row = worksheet.getRow(rowNum);

    const channelCell = row.getCell(channelIdx + 1);
    const platformCell = row.getCell(platformIdx + 1);
    const budgetCell = row.getCell(budgetIdx + 1);
    const impressionsCell = row.getCell(impressionsIdx + 1);
    const placementsCell = row.getCell(placementsIdx + 1);

    console.log(`Row ${rowNum}:`);
    console.log(`  Channel: "${getCellValue(channelCell)}"`);
    console.log(`  Platform: "${getCellValue(platformCell)}"`);
    console.log(`  Budget: ${getCellValue(budgetCell)}`);
    console.log(`  Impressions: ${getCellValue(impressionsCell)}`);
    console.log(`  Placements: "${getCellValue(placementsCell)}"`);
    console.log(`  Has valid budget? ${getCellValue(budgetCell) !== null && getCellValue(budgetCell) !== undefined && getCellValue(budgetCell) !== ''}`);
    console.log(`  Has valid impressions? ${getCellValue(impressionsCell) !== null && getCellValue(impressionsCell) !== undefined && getCellValue(impressionsCell) !== ''}`);
    console.log('');
  }

  console.log('=== DIAGNOSIS ===');
  console.log('If Budget, Impressions, and Placements all have valid values,');
  console.log('the standalone row detection (fallback) should catch these rows.');
  console.log('If they are still not appearing, check the "standalone row" detection logic.');
}

checkTikTokValues().catch(console.error);
