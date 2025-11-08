const ExcelJS = require('exceljs');

function getCellValue(cell) {
  if (cell.value === null || cell.value === undefined) {
    return null;
  }

  if (typeof cell.value === 'object' && 'result' in cell.value) {
    return cell.value.result;
  }

  if (typeof cell.value === 'object' && 'richText' in cell.value) {
    return cell.value.richText.map(rt => rt.text).join('');
  }

  if (cell.value instanceof Date) {
    const year = cell.value.getUTCFullYear();
    const month = String(cell.value.getUTCMonth() + 1).padStart(2, '0');
    const day = String(cell.value.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return cell.value;
}

async function checkRowsBeforeTikTok() {
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

  console.log(`Header row: ${headerRowIndex}`);
  console.log('');

  const budgetIdx = headers.findIndex(h => h && (h === 'Gross Budget' || h === 'Net Budget' || h === 'Working Media Budget'));
  const impressionsIdx = headers.findIndex(h => h && (h === 'Est. Impressions' || h.includes('Impressions')));
  const placementsIdx = headers.findIndex(h => h && (h.includes('Campaign Details') || h === 'Placements'));
  const channelIdx = headers.findIndex(h => h && h.toLowerCase() === 'channel');
  const platformIdx = headers.findIndex(h => h && h.toLowerCase() === 'platform');

  console.log('=== CHECKING ALL ROWS FROM HEADER TO ROW 23 ===\n');

  const summaryRowPatterns = ['mpa budget', 'variance', 'grand total', 'total', 'subtotal'];
  const sectionHeaderPatterns = ['digital video', 'digital display', 'digital audio', 'paid social', 'social', 'video', 'display', 'audio'];

  for (let rowNum = headerRowIndex + 1; rowNum <= 23; rowNum++) {
    const row = worksheet.getRow(rowNum);

    const channelCell = row.getCell(channelIdx + 1);
    const platformCell = row.getCell(platformIdx + 1);
    const budgetCell = row.getCell(budgetIdx + 1);
    const impressionsCell = row.getCell(impressionsIdx + 1);
    const placementsCell = row.getCell(placementsIdx + 1);

    const channelValue = getCellValue(channelCell);
    const platformValue = getCellValue(platformCell);
    const budgetValue = getCellValue(budgetCell);
    const impressionsValue = getCellValue(impressionsCell);
    const placementsValue = getCellValue(placementsCell);

    const channelStr = String(channelValue || '').toLowerCase();
    const platformStr = String(platformValue || '').toLowerCase();
    const placementsStr = String(placementsValue || '').toLowerCase();

    // Check if summary row
    const isSummaryRow = summaryRowPatterns.some(pattern =>
      channelStr.includes(pattern) || platformStr.includes(pattern) || placementsStr.includes(pattern)
    );

    // Check if section header
    const isSectionHeader = sectionHeaderPatterns.some(pattern =>
      channelValue === pattern || platformValue === pattern
    );

    const hasBudget = budgetValue !== null && budgetValue !== undefined && budgetValue !== '';
    const hasImpressions = impressionsValue !== null && impressionsValue !== undefined && impressionsValue !== '';
    const hasPlacements = placementsValue !== null && placementsValue !== undefined && placementsValue !== '';

    console.log(`Row ${rowNum}:`);
    console.log(`  Channel: "${channelValue}"`);
    console.log(`  Platform: "${platformValue}"`);
    console.log(`  Placements: "${placementsValue}"`);
    console.log(`  Budget: ${budgetValue} (has: ${hasBudget})`);
    console.log(`  Impressions: ${impressionsValue} (has: ${hasImpressions})`);
    console.log(`  Is summary row? ${isSummaryRow}`);
    console.log(`  Is section header? ${isSectionHeader}`);
    console.log(`  Has Budget+Impressions+Placements? ${hasBudget && hasImpressions && hasPlacements}`);

    if (rowNum >= 21 && rowNum <= 23) {
      console.log(`  >>> THIS IS A TIKTOK ROW`);
    }

    console.log('');
  }
}

checkRowsBeforeTikTok().catch(console.error);
