import { contextBridge, ipcRenderer } from 'electron';

console.log('[Preload] Starting to load preload script');

// Expose safe IPC methods to renderer process
contextBridge.exposeInMainWorld('electron', {
  // File operations
  selectFile: (filters?: any) => ipcRenderer.invoke('dialog:selectFile', filters),
  saveFile: (defaultPath?: string) => ipcRenderer.invoke('dialog:saveFile', defaultPath),
  writeFile: (filePath: string, buffer: ArrayBuffer) => ipcRenderer.invoke('dialog:writeFile', filePath, buffer),

  // Traffic Sheet
  trafficSheet: {
    preview: (filePath: string) => ipcRenderer.invoke('trafficSheet:preview', filePath),
    generate: (params: any) => ipcRenderer.invoke('trafficSheet:generate', params),
  },

  // Taxonomy
  taxonomy: {
    parse: (filePath: string) => ipcRenderer.invoke('taxonomy:parse', filePath),
    export: (params: any) => ipcRenderer.invoke('taxonomy:export', params),
  },

  // Config
  config: {
    get: () => ipcRenderer.invoke('config:get'),
    set: (config: any) => ipcRenderer.invoke('config:set', config),
    getUser: () => ipcRenderer.invoke('config:getUser'),
    setUser: (user: any) => ipcRenderer.invoke('config:setUser', user),
  },

  // Logger
  logger: {
    track: (event: any) => ipcRenderer.invoke('logger:track', event),
    getLogs: (filter?: any) => ipcRenderer.invoke('logger:getLogs', filter),
  },

  // Update
  update: {
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    getUpdateStatus: () => ipcRenderer.invoke('get-update-status'),
    quitAndInstall: () => ipcRenderer.invoke('quit-and-install'),
    onStatusChanged: (callback: (data: any) => void) => {
      const listener = (_event: any, data: any) => callback(data);
      ipcRenderer.on('update-status-changed', listener);
      return () => ipcRenderer.removeListener('update-status-changed', listener);
    },
    onProgress: (callback: (data: any) => void) => {
      const listener = (_event: any, data: any) => callback(data);
      ipcRenderer.on('update-progress', listener);
      return () => ipcRenderer.removeListener('update-progress', listener);
    },
  },
});

console.log('[Preload] Successfully exposed window.electron API');

// TypeScript declaration for window.electron
declare global {
  interface Window {
    electron: {
      selectFile: (filters?: any) => Promise<string | null>;
      saveFile: (defaultPath?: string) => Promise<string | null>;
      writeFile: (filePath: string, buffer: ArrayBuffer) => Promise<{ success: boolean; error?: string }>;
      trafficSheet: {
        preview: (filePath: string) => Promise<any>;
        generate: (params: any) => Promise<Buffer>;
      };
      taxonomy: {
        parse: (filePath: string) => Promise<any>;
        export: (params: any) => Promise<any>;
      };
      config: {
        get: () => Promise<any>;
        set: (config: any) => Promise<void>;
        getUser: () => Promise<any>;
        setUser: (user: any) => Promise<void>;
      };
      logger: {
        track: (event: any) => Promise<void>;
        getLogs: (filter?: any) => Promise<any[]>;
      };
      update: {
        checkForUpdates: () => Promise<{ success: boolean; error?: string }>;
        getAppVersion: () => Promise<string>;
        getUpdateStatus: () => Promise<{ status: string; info: any; error: string | null }>;
        quitAndInstall: () => Promise<{ success: boolean }>;
        onStatusChanged: (callback: (data: any) => void) => () => void;
        onProgress: (callback: (data: any) => void) => () => void;
      };
    };
  }
}
