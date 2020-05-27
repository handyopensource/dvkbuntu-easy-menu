const { ipcMain, app } = require('electron')

ipcMain.on('shutdown', () => {
    app.quit()
})