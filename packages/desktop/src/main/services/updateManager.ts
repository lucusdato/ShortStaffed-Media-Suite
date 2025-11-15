/**
 * UPDATE FEATURE - DISABLED FOR PILOT
 *
 * This update feature is intentionally disabled for the test pilot program.
 * The code is preserved for future use but is not connected to the application.
 *
 * To re-enable:
 * 1. Register update IPC handlers in src/main/ipc/index.ts
 * 2. Expose update API in src/preload/index.ts
 * 3. Add UpdateChecker component to the UI
 * 4. Initialize UpdateManager in the main process
 */

import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { app, BrowserWindow } from 'electron';
import Store from 'electron-store';

export interface UpdateInfo {
  version: string;
  releaseDate: string;
  releaseNotes?: string;
}

export interface UpdateProgress {
  percent: number;
  transferred: number;
  total: number;
}

export type UpdateStatus =
  | 'idle'
  | 'checking'
  | 'available'
  | 'not-available'
  | 'downloading'
  | 'downloaded'
  | 'error';

export class UpdateManager {
  private static instance: UpdateManager;
  private mainWindow: BrowserWindow | null = null;
  private updateStatus: UpdateStatus = 'idle';
  private updateInfo: UpdateInfo | null = null;
  private errorMessage: string | null = null;
  private store: Store;

  private constructor() {
    // Initialize electron-store for settings
    this.store = new Store();

    // Configure logger
    autoUpdater.logger = log;
    (autoUpdater.logger as typeof log).transports.file.level = 'info';

    // Configure auto-updater
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;

    // Set beta channel based on user preference (default: false for stable)
    const betaChannel = this.store.get('betaChannel', false) as boolean;
    autoUpdater.allowPrerelease = betaChannel;
    log.info(`Update channel: ${betaChannel ? 'Beta' : 'Stable'}`);

    // Set up event listeners
    this.setupEventListeners();
  }

  public static getInstance(): UpdateManager {
    if (!UpdateManager.instance) {
      UpdateManager.instance = new UpdateManager();
    }
    return UpdateManager.instance;
  }

  public setMainWindow(window: BrowserWindow): void {
    this.mainWindow = window;
  }

  private setupEventListeners(): void {
    autoUpdater.on('checking-for-update', () => {
      log.info('Checking for update...');
      this.updateStatus = 'checking';
      this.sendStatusToRenderer();
    });

    autoUpdater.on('update-available', (info) => {
      log.info('Update available:', info);
      this.updateStatus = 'available';
      this.updateInfo = {
        version: info.version,
        releaseDate: info.releaseDate,
        releaseNotes: info.releaseNotes as string,
      };
      this.sendStatusToRenderer();
    });

    autoUpdater.on('update-not-available', (info) => {
      log.info('Update not available:', info);
      this.updateStatus = 'not-available';
      this.sendStatusToRenderer();
    });

    autoUpdater.on('error', (err) => {
      log.error('Error in auto-updater:', err);
      this.updateStatus = 'error';

      // Provide more user-friendly error messages
      if (err.message.includes('404') || err.message.includes('Not Found')) {
        this.errorMessage = 'No updates are currently available. The app is up to date.';
      } else if (err.message.includes('net::ERR_INTERNET_DISCONNECTED') || err.message.includes('ENOTFOUND')) {
        this.errorMessage = 'Unable to check for updates. Please check your internet connection.';
      } else {
        this.errorMessage = `Update check failed: ${err.message}`;
      }

      this.sendStatusToRenderer();
    });

    autoUpdater.on('download-progress', (progressObj) => {
      log.info('Download progress:', progressObj);
      this.updateStatus = 'downloading';
      const progress: UpdateProgress = {
        percent: progressObj.percent,
        transferred: progressObj.transferred,
        total: progressObj.total,
      };
      this.sendProgressToRenderer(progress);
    });

    autoUpdater.on('update-downloaded', (info) => {
      log.info('Update downloaded:', info);
      this.updateStatus = 'downloaded';
      this.updateInfo = {
        version: info.version,
        releaseDate: info.releaseDate,
        releaseNotes: info.releaseNotes as string,
      };
      this.sendStatusToRenderer();
    });
  }

  private sendStatusToRenderer(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send('update-status-changed', {
        status: this.updateStatus,
        info: this.updateInfo,
        error: this.errorMessage,
      });
    }
  }

  private sendProgressToRenderer(progress: UpdateProgress): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send('update-progress', progress);
    }
  }

  public async checkForUpdates(): Promise<void> {
    // Skip in development
    if (!app.isPackaged) {
      log.info('Skipping update check in development mode');
      return;
    }

    try {
      await autoUpdater.checkForUpdates();
    } catch (error) {
      log.error('Failed to check for updates:', error);
      throw error;
    }
  }

  public quitAndInstall(): void {
    autoUpdater.quitAndInstall(false, true);
  }

  public getStatus(): UpdateStatus {
    return this.updateStatus;
  }

  public getUpdateInfo(): UpdateInfo | null {
    return this.updateInfo;
  }

  public getErrorMessage(): string | null {
    return this.errorMessage;
  }

  public getCurrentVersion(): string {
    return app.getVersion();
  }

  public async checkForUpdatesOnStartup(): Promise<void> {
    // Skip in development
    if (!app.isPackaged) {
      log.info('Skipping auto-update check in development mode');
      return;
    }

    // Wait a bit before checking for updates to let the app initialize
    setTimeout(() => {
      this.checkForUpdates().catch((error) => {
        log.error('Auto-update check failed:', error);
      });
    }, 3000);
  }

  /**
   * Check if beta channel is enabled
   */
  public isBetaChannelEnabled(): boolean {
    return this.store.get('betaChannel', false) as boolean;
  }

  /**
   * Enable or disable beta channel updates
   * Requires app restart to take effect
   */
  public setBetaChannel(enabled: boolean): void {
    log.info(`Setting beta channel to: ${enabled}`);
    this.store.set('betaChannel', enabled);
    autoUpdater.allowPrerelease = enabled;

    // Notify renderer of channel change
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send('beta-channel-changed', enabled);
    }
  }

  /**
   * Get the current update channel name
   */
  public getUpdateChannel(): string {
    return this.isBetaChannelEnabled() ? 'Beta' : 'Stable';
  }
}
