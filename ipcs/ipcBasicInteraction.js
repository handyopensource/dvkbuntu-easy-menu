const { ipcMain, dialog } = require('electron')

//inutilisé, sert d'exemple
ipcMain.on('toMain', (event, data) => {
    dialog.showMessageBox({
        type: "info",
        title: "Message",
        message: data,
        detail: "Detail du message"
    })
})