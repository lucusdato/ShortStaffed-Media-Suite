import { ipcMain } from 'electron';
import { configManager } from '../services/configManager';

ipcMain.handle('config:get', async () => {
  return await configManager.get();
});

ipcMain.handle('config:set', async (_event, config) => {
  await configManager.set(config);
});

ipcMain.handle('config:getUser', async () => {
  return await configManager.getUser();
});

ipcMain.handle('config:setUser', async (_event, user) => {
  await configManager.setUser(user);
});
