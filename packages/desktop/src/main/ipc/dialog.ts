import { ipcMain, dialog, BrowserWindow } from 'electron';
import { promises as fs } from 'fs';

ipcMain.handle('dialog:selectFile', async (_event, filters) => {
  const window = BrowserWindow.getFocusedWindow();
  if (!window) return null;

  const result = await dialog.showOpenDialog(window, {
    properties: ['openFile'],
    filters: filters || [
      { name: 'Excel Files', extensions: ['xlsx', 'xls'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  return result.filePaths[0];
});

ipcMain.handle('dialog:saveFile', async (_event, defaultPath) => {
  const window = BrowserWindow.getFocusedWindow();
  if (!window) return null;

  const result = await dialog.showSaveDialog(window, {
    defaultPath,
    filters: [
      { name: 'Excel Files', extensions: ['xlsx'] },
      { name: 'CSV Files', extensions: ['csv'] },
      { name: 'TSV Files', extensions: ['tsv'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });

  if (result.canceled || !result.filePath) {
    return null;
  }

  return result.filePath;
});

ipcMain.handle('dialog:writeFile', async (_event, filePath, buffer) => {
  try {
    await fs.writeFile(filePath, Buffer.from(buffer));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
