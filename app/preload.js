const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // Whitelist des channels
            let validChannels = ["toMain", "saySomething"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain", "setTheme"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, data) => func(data));
            }
        },
        openWebMenu: () => {
            ipcRenderer.send("openWebMenu");
        },
        openMailClient: () => {
            ipcRenderer.send("openMailClient");
        },
        openNoteMenu: () => {
            ipcRenderer.send("openNoteMenu");
        },
        getTheme: () => {
            ipcRenderer.send("getTheme");
        }
    }
);