import { ipcMain, app } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';
// Import from shared package (single source of truth)
import { BlockingChartParser, TrafficSheetGenerator } from '../../../../shared/excel';
import { getMainWindow } from '../index';

// Progress event interface
export interface ProgressEvent {
  step: string;
  percentage: number;
  details?: string;
}

// Helper function to send progress updates to renderer
function sendProgress(progress: ProgressEvent) {
  console.log('📊 Progress:', progress.percentage + '%', '-', progress.step, progress.details || '');
  const mainWindow = getMainWindow();
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('trafficSheet:progress', progress);
    console.log('  ✅ Progress event sent to renderer');
  } else {
    console.log('  ⚠️  Main window not available or destroyed');
  }
}

// Get template path - handle both dev and production
function getTemplatePath(): string {
  const isDev = !app.isPackaged;

  if (isDev) {
    // Development: use template from web package
    // From dist/desktop/src/main/ipc/ → packages/web/public/templates/
    return path.join(__dirname, '../../../../../../web/public/templates/unilever-traffic-sheet-template.xlsx');
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

    // Parse the blocking chart using new shared parser
    const parser = new BlockingChartParser();
    const parsedData = await parser.parse(arrayBuffer);

    console.log('✅ Preview - Parsed successfully');
    console.log('  Campaign lines:', parsedData.campaignLines.length);
    console.log('  Headers:', parsedData.headers.length);
    console.log('  Validation warnings:', parsedData.validationWarnings?.length || 0);

    // Log ad group counts (for debugging new audience-based detection)
    const adGroupCounts = parsedData.campaignLines.map(cl => cl.adGroups.length);
    console.log('  Ad groups per campaign line:', adGroupCounts);

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

    // Progress: Reading file
    sendProgress({ step: 'Reading blocking chart file', percentage: 5 });

    // Read the blocking chart
    const blockingChartBuffer = await fs.readFile(filePath);
    const blockingChartArrayBuffer = blockingChartBuffer.buffer.slice(
      blockingChartBuffer.byteOffset,
      blockingChartBuffer.byteOffset + blockingChartBuffer.byteLength
    ) as ArrayBuffer;

    // Progress: Parsing
    sendProgress({ step: 'Parsing blocking chart', percentage: 10 });

    // Parse the blocking chart using new shared parser
    const parser = new BlockingChartParser();
    const parsedData = await parser.parse(blockingChartArrayBuffer);

    console.log('✅ Parsed blocking chart');
    console.log('  Campaign lines:', parsedData.campaignLines.length);
    console.log('  Validation warnings:', parsedData.validationWarnings?.length || 0);

    // Progress: Parsed successfully
    sendProgress({
      step: 'Blocking chart parsed successfully',
      percentage: 40,
      details: `Found ${parsedData.campaignLines.length} campaign lines`
    });

    // Filter out deleted rows (optional - for backward compatibility)
    if (deletedRows.length > 0 && parsedData.campaignLines.length > 0) {
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
    }

    // Check if we have any campaign lines to process
    if (parsedData.campaignLines.length === 0) {
      return {
        success: false,
        error: 'No campaign lines found in blocking chart',
      };
    }

    // Progress: Loading template
    sendProgress({ step: 'Loading traffic sheet template', percentage: 50 });

    // Read template file
    const templatePath = getTemplatePath();
    console.log('📄 Template path:', templatePath);

    let templateBuffer: ArrayBuffer | undefined;
    try {
      const templateFileBuffer = await fs.readFile(templatePath);
      templateBuffer = templateFileBuffer.buffer.slice(
        templateFileBuffer.byteOffset,
        templateFileBuffer.byteOffset + templateFileBuffer.byteLength
      ) as ArrayBuffer;
      console.log('✅ Template file read successfully');
    } catch (error: any) {
      console.warn('⚠️  Failed to read template file, will create from scratch:', error?.message || error);
    }

    // Progress: Generating traffic sheet
    sendProgress({ step: 'Generating traffic sheet', percentage: 60 });

    // Generate the traffic sheet using new shared generator
    console.log('🏗️  Generating traffic sheet...');
    const generator = new TrafficSheetGenerator();
    const workbook = await generator.generate(parsedData, templateBuffer);

    // Progress: Writing to buffer
    sendProgress({ step: 'Finalizing traffic sheet', percentage: 90 });

    // Write workbook to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    console.log('✅ Traffic sheet generated successfully');
    console.log('  Buffer size:', buffer.byteLength, 'bytes');
    console.log('  Ad groups generated per campaign line:', parsedData.campaignLines.map(cl => cl.adGroups.length));

    // Progress: Complete
    sendProgress({ step: 'Traffic sheet generation complete', percentage: 100 });

    return {
      success: true,
      buffer: Buffer.from(buffer),
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
