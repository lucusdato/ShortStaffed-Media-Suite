import { ipcMain } from 'electron';
import { logger } from '../services/logger';

ipcMain.handle('logger:track', async (_event, event) => {
  await logger.track(event);
});

ipcMain.handle('logger:getLogs', async (_event, filter) => {
  return await logger.getLogs(filter);
});
