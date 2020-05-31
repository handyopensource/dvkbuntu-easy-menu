const { app, ipcMain, dialog, BrowserWindow } = require('electron')
const path = require('path')

//Ici on met toutes les fonction pour ouvrir les nouvelles fenêtres.
let webWindow

function createWindow(width, height, resizable) {
    let theWindow = new BrowserWindow({
        width: width,
        height: height,
        resizable: resizable,
        autoHideMenuBar: true,
        parent: global.mainWindow,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            //devTools: false,
            preload: path.join(app.getAppPath() + "/app", 'preload.js')
        }
    })

    theWindow.on('closed', () => {
        //close event
    })
    theWindow.loadFile(app.getAppPath() + '/app/view/internet_access.html')

    return theWindow
}


ipcMain.on('openWebMenu', () => {
    webWindow = createWindow(1000, 700, false);
})

ipcMain.on('openMailClient', () => {
    dialog.showMessageBox({
        type: "info",
        title: "WindowManager",
        message: "Mail Client",
        detail: "Le renderer à demandé l'ouverture du client mail"
    })
})

ipcMain.on('openNoteMenu', () => {
    dialog.showMessageBox({
        type: "info",
        title: "WindowManager",
        message: "Note Menu",
        detail: "Le renderer à demandé l'ouverture du menu de prises de notes"
    })
})