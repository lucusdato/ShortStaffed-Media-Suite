import { ipcMain, dialog } from 'electron';
import { logger } from '../services/logger';
import { configManager } from '../services/configManager';
import path from 'path';

ipcMain.handle('logger:track', async (_event, event) => {
  await logger.track(event);
});

ipcMain.handle('logger:getLogs', async (_event, filter) => {
  return await logger.getLogs(filter);
});

ipcMain.handle('logger:export', async (_event) => {
  try {
    // Get user info for filename
    const user = await configManager.getUser();
    const date = new Date().toISOString().split('T')[0];

    let defaultFilename = `analytics-export-${date}`;
    if (user) {
      // Sanitize user info for filename (remove special characters)
      const sanitizeName = (str: string) => str.replace(/[^a-zA-Z0-9-]/g, '');
      const name = sanitizeName(user.name);
      const role = sanitizeName(user.role);
      const client = sanitizeName(user.client);
      defaultFilename = `analytics-${name}-${role}-${client}-${date}`;
    }

    // Show save dialog
    const result = await dialog.showSaveDialog({
      title: 'Export Analytics Logs',
      defaultPath: `${defaultFilename}.zip`,
      filters: [{ name: 'Zip Archive', extensions: ['zip'] }],
    });

    if (result.canceled || !result.filePath) {
      return { success: false, canceled: true };
    }

    // Export logs to the selected path with user info
    return await logger.exportLogs(result.filePath, user);
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('logger:getLogsPath', async () => {
  return logger.getLogsPath();
});
