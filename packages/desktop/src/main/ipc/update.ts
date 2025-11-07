import { ipcMain } from 'electron';
import { UpdateManager } from '../services/updateManager';

export function setupUpdateHandlers(): void {
  const updateManager = UpdateManager.getInstance();

  // Check for updates
  ipcMain.handle('check-for-updates', async () => {
    try {
      await updateManager.checkForUpdates();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  // Get current app version
  ipcMain.handle('get-app-version', () => {
    return updateManager.getCurrentVersion();
  });

  // Get current update status
  ipcMain.handle('get-update-status', () => {
    return {
      status: updateManager.getStatus(),
      info: updateManager.getUpdateInfo(),
      error: updateManager.getErrorMessage(),
    };
  });

  // Quit and install update
  ipcMain.handle('quit-and-install', () => {
    updateManager.quitAndInstall();
    return { success: true };
  });

  // Get beta channel status
  ipcMain.handle('get-beta-channel', () => {
    return {
      enabled: updateManager.isBetaChannelEnabled(),
      channel: updateManager.getUpdateChannel(),
    };
  });

  // Set beta channel (enable/disable)
  ipcMain.handle('set-beta-channel', (_event, enabled: boolean) => {
    updateManager.setBetaChannel(enabled);
    return {
      success: true,
      enabled: enabled,
      channel: updateManager.getUpdateChannel(),
    };
  });
}
