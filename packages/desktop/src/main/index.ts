import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { promises as fs } from 'fs';
import { UpdateManager } from './services/updateManager';

let mainWindow: BrowserWindow | null = null;

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// Get preload path - works in both dev and production
const getPreloadPath = () => {
  const preloadPath = path.join(__dirname, '../preload/index.js');
  console.log('[Main] Preload path:', preloadPath);
  console.log('[Main] __dirname:', __dirname);
  console.log('[Main] isDev:', isDev);
  console.log('[Main] app.isPackaged:', app.isPackaged);
  return preloadPath;
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'QuickClick MediaTools',
    autoHideMenuBar: false,
  });

  // Set main window in UpdateManager for IPC communication
  const updateManager = UpdateManager.getInstance();
  updateManager.setMainWindow(mainWindow);

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // Check for updates on startup (silently in background)
  const updateManager = UpdateManager.getInstance();
  updateManager.checkForUpdatesOnStartup();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers will be imported here
import './ipc';
