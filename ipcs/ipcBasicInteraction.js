const { ipcMain, dialog } = require('electron')

ipcMain.on('toMain', (event, data) => {
    dialog.showMessageBox({
        type: "info",
        title: "Message",
        message: data,
        detail: "Detail du message"
    })
})