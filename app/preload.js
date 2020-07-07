const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // Whitelist des channels
            let validChannels = ["toMain", "saySomething", "getWebsiteMeta", "setWebSiteStore", "getWebSiteStore", "addWebSiteStore", "remWebSiteStore"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain", "setTheme", "webMeta", "getWebSiteStore", "sendThemes"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, data) => func(data));
            }
        },
        openWebMenu: () => {
            ipcRenderer.send("openWebMenu");
        },
        openWebsite: (url) => {
            ipcRenderer.send("openWebsite", { url: url });
        },
        openMailClient: () => {
            ipcRenderer.send("openMailClient");
        },
        openNoteMenu: () => {
            ipcRenderer.send("openNoteMenu");
        },
        openCalcMenu: () => {
            ipcRenderer.send("openCalcMenu");
        },
        getTheme: () => {
            ipcRenderer.send("getTheme");
        },
        getThemes: () => {
            ipcRenderer.send("getThemes");
        },
        setTheme: (param) => {
            ipcRenderer.send("setTheme", param);
        },
        addTheme: (param) => {
            ipcRenderer.send("addTheme", param);
        },
        deleteTheme: (param) => {
            ipcRenderer.send("deleteTheme", param);
        }
    }
);