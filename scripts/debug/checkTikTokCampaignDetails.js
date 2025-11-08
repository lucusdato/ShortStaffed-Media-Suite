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

async function checkTikTokCampaignDetails() {
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

  console.log('=== CHECKING CAMPAIGN DETAIL FIELDS FOR TIKTOK ===\n');
  console.log('Headers:', headers.filter((h, i) => i < 15).join(' | '));
  console.log('');

  console.log('Required fields for campaign line validation:');
  console.log('  - Buy Type (should be in headers)');
  console.log('  - Objective (should be in headers)');
  console.log('  - Language (should be in headers)');
  console.log('');

  // Find column indices based on headers
  const buyTypeIdx = headers.findIndex(h => h && h.toLowerCase().includes('buy type'));
  const objectiveIdx = headers.findIndex(h => h && h.toLowerCase().includes('objective'));
  const languageIdx = headers.findIndex(h => h && h.toLowerCase().includes('language'));

  console.log(`Column indices from headers:`);
  console.log(`  Buy Type: ${buyTypeIdx} (${headers[buyTypeIdx] || 'NOT FOUND'})`);
  console.log(`  Objective: ${objectiveIdx} (${headers[objectiveIdx] || 'NOT FOUND'})`);
  console.log(`  Language: ${languageIdx} (${headers[languageIdx] || 'NOT FOUND'})`);
  console.log('');

  console.log('Checking TikTok rows:\n');

  for (let rowNum = 21; rowNum <= 23; rowNum++) {
    const row = worksheet.getRow(rowNum);

    // Note: parseBlockingChart.ts uses hardcoded column indices:
    // Buy Type = column 4 (index 3)
    // Objective = column 5 (index 4)
    // Language = column 10 (index 9)

    const buyTypeCell = row.getCell(4);
    const objectiveCell = row.getCell(5);
    const languageCell = row.getCell(10);

    // Also check using header-based indices
    const buyTypeByHeader = buyTypeIdx !== -1 ? row.getCell(buyTypeIdx + 1) : null;
    const objectiveByHeader = objectiveIdx !== -1 ? row.getCell(objectiveIdx + 1) : null;
    const languageByHeader = languageIdx !== -1 ? row.getCell(languageIdx + 1) : null;

    console.log(`Row ${rowNum}:`);
    console.log(`  Using HARDCODED indices from parseBlockingChart.ts:`);
    console.log(`    Buy Type (col 4): "${getCellValue(buyTypeCell)}"`);
    console.log(`    Objective (col 5): "${getCellValue(objectiveCell)}"`);
    console.log(`    Language (col 10): "${getCellValue(languageCell)}"`);

    if (buyTypeIdx !== -1 || objectiveIdx !== -1 || languageIdx !== -1) {
      console.log(`  Using HEADER-BASED indices:`);
      if (buyTypeByHeader) console.log(`    Buy Type: "${getCellValue(buyTypeByHeader)}"`);
      if (objectiveByHeader) console.log(`    Objective: "${getCellValue(objectiveByHeader)}"`);
      if (languageByHeader) console.log(`    Language: "${getCellValue(languageByHeader)}"`);
    }

    const buyTypeValue = String(getCellValue(buyTypeCell) || '').trim();
    const objectiveValue = String(getCellValue(objectiveCell) || '').trim();
    const languageValue = String(getCellValue(languageCell) || '').trim();

    const hasCampaignDetails = (buyTypeValue || objectiveValue || languageValue) &&
                               !buyTypeValue.toLowerCase().includes('total') &&
                               !objectiveValue.toLowerCase().includes('total') &&
                               !languageValue.toLowerCase().includes('total');

    console.log(`  Has valid campaign details? ${hasCampaignDetails}`);
    console.log(`  Would be classified as: ${hasCampaignDetails ? 'VALID CAMPAIGN LINE ✓' : 'TOTAL ROW (SKIPPED) ✗'}`);
    console.log('');
  }

  console.log('=== DIAGNOSIS ===');
  console.log('If all TikTok rows show "TOTAL ROW (SKIPPED)", that\'s why they\'re not appearing!');
  console.log('The hardcoded column indices in parseBlockingChart.ts might not match this blocking chart format.');
}

checkTikTokCampaignDetails().catch(console.error);
