import { ipcMain, dialog } from 'electron';
import { logger } from '../services/logger';
import path from 'path';

ipcMain.handle('logger:track', async (_event, event) => {
  await logger.track(event);
});

ipcMain.handle('logger:getLogs', async (_event, filter) => {
  return await logger.getLogs(filter);
});

ipcMain.handle('logger:export', async (_event) => {
  try {
    // Show save dialog
    const result = await dialog.showSaveDialog({
      title: 'Export Analytics Logs',
      defaultPath: `analytics-export-${new Date().toISOString().split('T')[0]}.zip`,
      filters: [{ name: 'Zip Archive', extensions: ['zip'] }],
    });

    if (result.canceled || !result.filePath) {
      return { success: false, canceled: true };
    }

    // Export logs to the selected path
    return await logger.exportLogs(result.filePath);
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('logger:getLogsPath', async () => {
  return logger.getLogsPath();
});
