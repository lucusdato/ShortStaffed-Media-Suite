import { ipcMain } from 'electron';

// Placeholder - will implement after Traffic Sheet is working
ipcMain.handle('taxonomy:parse', async (_event, filePath: string) => {
  return {
    success: true,
    message: 'Taxonomy feature coming soon',
  };
});

ipcMain.handle('taxonomy:export', async (_event, params) => {
  return {
    success: true,
    message: 'Taxonomy export coming soon',
  };
});
