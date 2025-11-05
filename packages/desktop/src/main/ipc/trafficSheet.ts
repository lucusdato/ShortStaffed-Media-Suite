import { ipcMain, app } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';
// Import from shared core (copied from web package)
const { parseBlockingChart, validateBlockingChart } = require('../../shared/excel/parseBlockingChart');
const { generateTrafficSheetFromHierarchy } = require('../../shared/excel/generateTrafficSheet');

// Get template path - handle both dev and production
function getTemplatePath(): string {
  const isDev = !app.isPackaged;

  if (isDev) {
    // Development: use template from web package (up from packages/desktop to root)
    return path.join(__dirname, '../../../../web/public/templates/unilever-traffic-sheet-template.xlsx');
  } else {
    // Production: use bundled template from resources
    return path.join(process.resourcesPath, 'templates/unilever-traffic-sheet-template.xlsx');
  }
}

ipcMain.handle('trafficSheet:preview', async (_event, filePath: string) => {
  try {
    console.log('📊 Preview - Reading blocking chart from:', filePath);

    // Read the file
    const fileBuffer = await fs.readFile(filePath);
    const arrayBuffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset,
      fileBuffer.byteOffset + fileBuffer.byteLength
    ) as ArrayBuffer;

    // Parse the blocking chart
    const parsedData = await parseBlockingChart(arrayBuffer);

    console.log('✅ Preview - Parsed successfully');
    console.log('  Campaign lines:', parsedData.campaignLines?.length || 0);
    console.log('  Headers:', Object.keys(parsedData.headers || {}).length);

    return {
      success: true,
      data: parsedData,
    };
  } catch (error: any) {
    console.error('❌ Preview error:', error);
    return {
      success: false,
      error: error.message || 'Failed to preview file',
    };
  }
});

ipcMain.handle('trafficSheet:generate', async (_event, params) => {
  try {
    const { filePath, deletedRows = [], manualOverrides = {} } = params;

    console.log('🔄 Generate - Starting traffic sheet generation');
    console.log('  File:', filePath);
    console.log('  Deleted rows:', deletedRows.length);
    console.log('  Manual overrides:', Object.keys(manualOverrides).length);

    // Read the blocking chart
    const blockingChartBuffer = await fs.readFile(filePath);
    const blockingChartArrayBuffer = blockingChartBuffer.buffer.slice(
      blockingChartBuffer.byteOffset,
      blockingChartBuffer.byteOffset + blockingChartBuffer.byteLength
    ) as ArrayBuffer;

    // Read the template
    const templatePath = getTemplatePath();
    console.log('📄 Using template:', templatePath);

    const templateBuffer = await fs.readFile(templatePath);
    const templateArrayBuffer = templateBuffer.buffer.slice(
      templateBuffer.byteOffset,
      templateBuffer.byteOffset + templateBuffer.byteLength
    ) as ArrayBuffer;

    // Parse the blocking chart
    const parsedData = await parseBlockingChart(blockingChartArrayBuffer);

    // Filter out deleted rows
    if (deletedRows.length > 0 && parsedData.campaignLines && parsedData.campaignLines.length > 0) {
      const originalCount = parsedData.campaignLines.length;
      console.log(`🗑️  Original campaign lines: ${originalCount}`);

      parsedData.campaignLines = parsedData.campaignLines.filter((line, index) => {
        const shouldKeep = !deletedRows.includes(index);
        if (!shouldKeep) {
          console.log(`  ❌ Removing campaign line at index ${index}`);
        }
        return shouldKeep;
      });

      console.log(`🗑️  After filtering: ${parsedData.campaignLines.length} (removed ${originalCount - parsedData.campaignLines.length})`);

      // Clean up any undefined entries
      const hasUndefined = parsedData.campaignLines.some(line => line === undefined || line === null);
      if (hasUndefined) {
        console.error('❌ Found undefined campaign lines, cleaning up...');
        parsedData.campaignLines = parsedData.campaignLines.filter(line => line !== undefined && line !== null);
      }
    }

    // Validate if using old template
    if (parsedData.campaignLines && parsedData.campaignLines.length > 0) {
      console.log(`✅ Hierarchical structure: ${parsedData.campaignLines.length} campaign lines`);
    } else {
      const validation = validateBlockingChart(parsedData);
      console.log('📋 Validation results:');
      console.log('  Valid:', validation.valid);
      console.log('  Errors:', validation.errors.length);
      console.log('  Warnings:', validation.warnings.length);

      if (!validation.valid) {
        return {
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        };
      }
    }

    // Generate the traffic sheet
    console.log('🏗️  Generating traffic sheet...');
    const result = await generateTrafficSheetFromHierarchy(
      parsedData,
      templateArrayBuffer,
      manualOverrides
    );

    console.log('✅ Traffic sheet generated successfully');
    console.log('  Buffer size:', result.byteLength, 'bytes');

    return {
      success: true,
      buffer: Buffer.from(result),
    };
  } catch (error: any) {
    console.error('❌ Generation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate traffic sheet',
      stack: error.stack,
    };
  }
});
