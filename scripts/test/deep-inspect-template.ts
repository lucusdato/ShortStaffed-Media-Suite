/**
 * Deep inspection of template rows 10-24 to find what's blocking border application
 */
import ExcelJS from 'exceljs';
import path from 'path';

async function deepInspectTemplate() {
  const templatePath = path.join(process.cwd(), 'public', 'templates', 'unilever-traffic-sheet-template.xlsx');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const worksheet = workbook.getWorksheet('Brand Say Digital');

  if (!worksheet) {
    throw new Error('Brand Say Digital worksheet not found');
  }

  console.log('\n=== DEEP INSPECTION: ROWS 10-24 in Brand Say Digital ===\n');

  // Check for conditional formatting, data validation, protection
  console.log('1. WORKSHEET-LEVEL PROPERTIES:');
  console.log(`   Protection: ${JSON.stringify(worksheet.properties)}`);

  // @ts-ignore - accessing internal property
  if (worksheet.dataValidations) {
    // @ts-ignore
    console.log(`   Data Validations: ${worksheet.dataValidations.length || 0}`);
  }

  // Check rows 10-24 for special properties
  console.log('\n2. ROW-LEVEL PROPERTIES (rows 10-24):');
  for (let rowNum = 10; rowNum <= 24; rowNum++) {
    const row = worksheet.getRow(rowNum);

    // Check if row has any special properties
    if (row.hidden || row.outlineLevel || row.height !== undefined) {
      console.log(`   Row ${rowNum}:`, {
        hidden: row.hidden,
        outlineLevel: row.outlineLevel,
        height: row.height
      });
    }
  }

  // Check problem columns in detail
  console.log('\n3. CELL-LEVEL PROPERTIES (columns H, O, P, Q, R, S):');
  const problemCols = [
    { col: 8, name: 'H (Accutics Ad Set Name)' },
    { col: 15, name: 'O (KPI Metric)' },
    { col: 16, name: 'P (Bid Type)' },
    { col: 17, name: 'Q (Creative Name)' },
    { col: 18, name: 'R (Landing Page URL)' },
    { col: 19, name: 'S (Landing Page URL w UTM)' }
  ];

  for (const { col, name } of problemCols) {
    console.log(`\n   Column ${name}:`);

    for (let row = 10; row <= 12; row++) {
      const cell = worksheet.getCell(row, col);

      console.log(`     Row ${row}:`);
      console.log(`       Value: ${cell.value ?? '(empty)'}`);
      console.log(`       Type: ${cell.type}`);
      console.log(`       isMerged: ${cell.isMerged}`);

      // Check for fill/background color
      if (cell.fill && cell.fill.type !== 'pattern') {
        console.log(`       Fill: ${JSON.stringify(cell.fill)}`);
      } else if (cell.fill && cell.fill.type === 'pattern') {
        // @ts-ignore
        const pattern = cell.fill.pattern;
        // @ts-ignore
        const fgColor = cell.fill.fgColor;
        console.log(`       Fill pattern: ${pattern}, fgColor: ${JSON.stringify(fgColor)}`);
      }

      // Check for font
      if (cell.font) {
        console.log(`       Font: ${JSON.stringify(cell.font)}`);
      }

      // Check style
      // @ts-ignore - accessing internal property
      if (cell._style) {
        // @ts-ignore
        console.log(`       Has _style object: ${Object.keys(cell._style).join(', ')}`);
      }

      // Check if cell has protection
      if (cell.protection) {
        console.log(`       Protection: ${JSON.stringify(cell.protection)}`);
      }
    }
  }

  // Check for blue highlight (conditional formatting or fill)
  console.log('\n4. CHECKING FOR BLUE HIGHLIGHT (row 9 - header):');
  const headerRow = worksheet.getRow(9);
  for (let col = 2; col <= 19; col++) {
    const cell = headerRow.getCell(col);
    if (cell.fill && cell.fill.type === 'pattern') {
      // @ts-ignore
      const fgColor = cell.fill.fgColor;
      if (fgColor) {
        console.log(`   Column ${String.fromCharCode(64 + col)}: ${JSON.stringify(fgColor)}`);
      }
    }
  }

  console.log('\n5. CHECKING IF ROWS 10-24 ARE IN A TABLE:');
  // @ts-ignore - accessing internal property
  if (worksheet.tables) {
    // @ts-ignore
    console.log(`   Tables found: ${worksheet.tables.length || 0}`);
    // @ts-ignore
    worksheet.tables?.forEach((table: any, idx: number) => {
      console.log(`   Table ${idx}: ${table.name}, ref: ${table.ref}`);
    });
  } else {
    console.log('   No tables found');
  }
}

deepInspectTemplate().catch(console.error);
