const { contextBridge, ipcRenderer, remote } = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // Whitelist des channels
            let validChannels = [];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = [];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, data) => func(data));
            }
        },
        closeBrowser: () => {
            var window = remote.getCurrentWindow();
            window.close();
        },
        minimizeBrowser: () => {
            var window = remote.getCurrentWindow();
            window.minimize();
        },
        maximizeBrowser: () => {
            var window = remote.getCurrentWindow();
            if (!window.isMaximized()) {
                window.maximize();          
            } else {
                window.unmaximize();
            }
        },
        url: process.argv.slice(-1)[0]
    }
);