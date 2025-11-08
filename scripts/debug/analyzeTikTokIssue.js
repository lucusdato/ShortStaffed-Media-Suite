const ExcelJS = require('exceljs');

async function analyzeTikTokIssue() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('/Users/lucusdato/Downloads/CA Hellmann\'s 2025 Canada Premier League - Blocking Chart.xlsx');

  console.log('=== ANALYZING TIKTOK ISSUE ===\n');

  const worksheet = workbook.getWorksheet('Media plan');
  if (!worksheet) {
    console.log('ERROR: Could not find "Media plan" worksheet');
    return;
  }

  // Find header row
  let headerRow = null;
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
        console.log(`✓ Found header row at row ${rowNumber}`);
        console.log('Headers:', headers.filter(h => h).slice(0, 15).join(' | '));
      }
    }
  });

  if (headerRowIndex === -1) {
    console.log('ERROR: Could not find header row');
    return;
  }

  // Find Channel, Platform, and Campaign Details - Placements column indices
  const channelIdx = headers.findIndex(h => h && h.toLowerCase().includes('channel'));
  const platformIdx = headers.findIndex(h => h && h.toLowerCase() === 'platform');
  const placementsIdx = headers.findIndex(h => h && (h.includes('Campaign Details') || h.toLowerCase() === 'placements'));
  const mediaTypeIdx = headers.findIndex(h => h && h.toLowerCase().includes('media type'));
  const budgetIdx = headers.findIndex(h => h && (h === 'Gross Budget' || h === 'Net Budget' || h.includes('Budget')));

  console.log(`\nColumn indices:`);
  console.log(`  Channel: ${channelIdx} (${headers[channelIdx]})`);
  console.log(`  Platform: ${platformIdx} (${headers[platformIdx]})`);
  console.log(`  Placements: ${placementsIdx} (${headers[placementsIdx]})`);
  console.log(`  Media Type: ${mediaTypeIdx} (${headers[mediaTypeIdx]})`);
  console.log(`  Budget: ${budgetIdx} (${headers[budgetIdx]})`);

  // Check merge information
  const merges = worksheet._merges || {};
  console.log(`\n=== MERGE INFORMATION ===`);
  console.log(`Total merge regions: ${Object.keys(merges).length}`);

  // Find all TikTok rows
  console.log(`\n=== TIKTOK ROWS ANALYSIS ===`);
  const tiktokRows = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber <= headerRowIndex) return;

    const channelValue = row.getCell(channelIdx + 1).value;
    const platformValue = row.getCell(platformIdx + 1).value;
    const placementsValue = row.getCell(placementsIdx + 1).value;
    const mediaTypeValue = row.getCell(mediaTypeIdx + 1).value;
    const budgetValue = row.getCell(budgetIdx + 1).value;

    const channelStr = channelValue ? String(channelValue) : '';
    const platformStr = platformValue ? String(platformValue) : '';
    const placementsStr = placementsValue ? String(placementsValue) : '';

    if (channelStr.toLowerCase().includes('tiktok') ||
        platformStr.toLowerCase().includes('tiktok') ||
        placementsStr.toLowerCase().includes('tiktok')) {

      console.log(`\n📍 Row ${rowNumber}:`);
      console.log(`   Channel: "${channelStr}"`);
      console.log(`   Platform: "${platformStr}"`);
      console.log(`   Placements: "${placementsStr}"`);
      console.log(`   Media Type: "${mediaTypeValue}"`);
      console.log(`   Budget: ${budgetValue}`);
      console.log(`   Channel cell is merged: ${row.getCell(channelIdx + 1).isMerged}`);
      console.log(`   Platform cell is merged: ${row.getCell(platformIdx + 1).isMerged}`);
      console.log(`   Placements cell is merged: ${row.getCell(placementsIdx + 1).isMerged}`);
      console.log(`   Budget cell is merged: ${row.getCell(budgetIdx + 1).isMerged}`);

      tiktokRows.push({
        rowNumber,
        channel: channelStr,
        platform: platformStr,
        placements: placementsStr,
        mediaType: mediaTypeValue,
        budget: budgetValue
      });
    }
  });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total TikTok rows found: ${tiktokRows.length}`);

  if (tiktokRows.length > 0) {
    console.log(`\n=== CHECKING MERGE STRUCTURE ===`);

    // Check if budget/impressions/placements are merged for TikTok rows
    const firstTikTokRow = tiktokRows[0].rowNumber;
    console.log(`\nChecking merge structure around row ${firstTikTokRow}:`);

    Object.keys(merges).forEach(key => {
      const mergeRange = merges[key].toString();
      const [start, end] = mergeRange.split(':');
      const startRow = parseInt(start.replace(/[A-Z]/g, ''));
      const endRow = parseInt(end.replace(/[A-Z]/g, ''));

      if (startRow <= firstTikTokRow && firstTikTokRow <= endRow) {
        console.log(`  Found merge: ${mergeRange}`);
      }
    });
  }

  // Check categorization logic
  console.log(`\n=== CATEGORIZATION LOGIC CHECK ===`);
  for (const row of tiktokRows) {
    const platformLower = row.platform.toLowerCase();
    const channelLower = row.channel.toLowerCase();
    const placementsLower = row.placements.toLowerCase();

    const SOCIAL_PLATFORMS = ['meta', 'facebook', 'instagram', 'fb', 'ig', 'tiktok', 'tik tok', 'pinterest', 'pin', 'reddit', 'snapchat', 'snap', 'twitter', 'x.com', 'linkedin'];

    const isSocialPlatform = SOCIAL_PLATFORMS.some(sp =>
      platformLower.includes(sp.toLowerCase()) ||
      channelLower.includes(sp.toLowerCase()) ||
      placementsLower.includes(sp.toLowerCase())
    );

    console.log(`\nRow ${row.rowNumber}:`);
    console.log(`  Platform "${row.platform}" is social? ${isSocialPlatform}`);
    console.log(`  Matched by: ${platformLower.includes('tiktok') ? 'platform' : channelLower.includes('tiktok') ? 'channel' : 'placements'}`);
    console.log(`  Should route to: Brand Say Social (since no influencer keyword detected)`);
  }
}

analyzeTikTokIssue().catch(console.error);
