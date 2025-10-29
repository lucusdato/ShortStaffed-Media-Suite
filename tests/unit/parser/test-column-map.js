const ExcelJS = require('exceljs');

(async () => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile('public/templates/unilever-traffic-sheet-template.xlsx');

  const ws = wb.getWorksheet('Brand Say Digital');
  if (!ws) {
    console.log('Brand Say Digital worksheet not found');
    return;
  }

  // Simulate buildColumnMap function
  const headerRowNumber = 9; // FIRST_DATA_ROW
  const map = new Map();

  const headerRow = ws.getRow(headerRowNumber);
  headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    const headerValue = cell.value ? String(cell.value).toLowerCase().trim() : '';
    if (headerValue) {
      // Normalize header: remove spaces, special chars
      const normalized = headerValue.replace(/[^a-z0-9]+/g, '');
      map.set(normalized, colNumber);

      // Also map with spaces removed but preserve case variations
      const spacesRemoved = headerValue.replace(/\s+/g, '');
      map.set(spacesRemoved, colNumber);
    }
  });

  console.log('\n📋 Column map for Brand Say Digital (row 9):');
  console.log('='.repeat(60));

  // Sort by column number for easier reading
  const entries = Array.from(map.entries()).sort((a, b) => a[1] - b[1]);
  entries.forEach(([key, value]) => {
    console.log(`  "${key}" → Column ${value}`);
  });

  // Test specific lookups
  console.log('\n🔍 Testing specific field lookups:');
  console.log('='.repeat(60));

  const testFields = ['tactic', 'accuticscampaignname', 'creativetype', 'device', 'geo', 'platform', 'objective'];
  testFields.forEach(field => {
    const colNum = map.get(field.toLowerCase());
    console.log(`  Field "${field}" → Column ${colNum || 'NOT FOUND'}`);
  });

  console.log('\n');
})();
