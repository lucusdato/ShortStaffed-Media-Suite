"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose safe IPC methods to renderer process
electron_1.contextBridge.exposeInMainWorld('electron', {
    // File operations
    selectFile: (filters) => electron_1.ipcRenderer.invoke('dialog:selectFile', filters),
    saveFile: (defaultPath) => electron_1.ipcRenderer.invoke('dialog:saveFile', defaultPath),
    // Traffic Sheet
    trafficSheet: {
        preview: (filePath) => electron_1.ipcRenderer.invoke('trafficSheet:preview', filePath),
        generate: (params) => electron_1.ipcRenderer.invoke('trafficSheet:generate', params),
    },
    // Taxonomy
    taxonomy: {
        parse: (filePath) => electron_1.ipcRenderer.invoke('taxonomy:parse', filePath),
        export: (params) => electron_1.ipcRenderer.invoke('taxonomy:export', params),
    },
    // Config
    config: {
        get: () => electron_1.ipcRenderer.invoke('config:get'),
        set: (config) => electron_1.ipcRenderer.invoke('config:set', config),
        getUser: () => electron_1.ipcRenderer.invoke('config:getUser'),
        setUser: (user) => electron_1.ipcRenderer.invoke('config:setUser', user),
    },
    // Logger
    logger: {
        track: (event) => electron_1.ipcRenderer.invoke('logger:track', event),
        getLogs: (filter) => electron_1.ipcRenderer.invoke('logger:getLogs', filter),
    },
});
