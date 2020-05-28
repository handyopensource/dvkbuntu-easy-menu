const { ipcMain, app } = require('electron')

//ce fichier contient toutes les interaction avec le système, 
//on mettera ici aussi les actions comme la fermeture de l'application

ipcMain.on('shutdown', () => {
    app.quit()
})