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
    onProgress: (callback: (progress: any) => void) => {
      const listener = (_event: any, progress: any) => callback(progress);
      ipcRenderer.on('trafficSheet:progress', listener);
      // Return cleanup function
      return () => ipcRenderer.removeListener('trafficSheet:progress', listener);
    },
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
    export: () => ipcRenderer.invoke('logger:export'),
    getLogsPath: () => ipcRenderer.invoke('logger:getLogsPath'),
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
        onProgress: (callback: (progress: { step: string; percentage: number; details?: string }) => void) => () => void;
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
        export: () => Promise<{ success: boolean; error?: string; canceled?: boolean; stats?: any }>;
        getLogsPath: () => Promise<string>;
      };
    };
  }
}
