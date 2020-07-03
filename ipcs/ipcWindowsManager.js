const { app, ipcMain, dialog, BrowserWindow, webContents } = require('electron')
const path = require('path')

//Ici on met toutes les fonction pour ouvrir les nouvelles fenêtres.

function getDomainFromUrl(url) {
    return url.replace("https://", "").split("/")[0]
}

function createWindow(width, height, resizable, view) {
    let theWindow = new BrowserWindow({
        width: width,
        height: height,
        resizable: resizable,
        autoHideMenuBar: true,
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
    theWindow.loadFile(app.getAppPath() + '/app/view/' + view + '.html')

    return theWindow
}


function createWebWindow(width, height, resizable, link, url) {
    let theWindow = new BrowserWindow({
        width: width,
        height: height,
        resizable: resizable,
        autoHideMenuBar: true,
        webPreferences: {
            webviewTag: true,
            contextIsolation: true,
            enableRemoteModule: true,
            additionalArguments: [url],
            //devTools: false,
            preload: path.join(app.getAppPath() + "/app", 'preloadWeb.js')
        }
    })

    theWindow.on('closed', () => {
        //close event
    })
    theWindow.loadFile(app.getAppPath() + '/app/view/' + link + '.html')

    return theWindow
}


ipcMain.on('openWebMenu', () => {
    createWindow(1000, 700, true, 'internet_access')
})

ipcMain.on('openCalcMenu', () => {
    calcWindow = createWindow(326, 549, false, 'calc')
})

ipcMain.on('openWebsite', (event, data) => {
    createWebWindow(1000, 700, true, 'browser', data.url)
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