const { app, ipcMain, dialog, BrowserWindow, webContents } = require('electron')
const path = require('path')
const os = require('os')
const fs = require('fs')
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch');


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

    let ses = theWindow.webContents.session;

    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(ses);
      });

    theWindow.on('closed', () => {
        //close event
    })
    theWindow.loadFile(app.getAppPath() + '/app/view/' + link + '.html')

    return theWindow
}


ipcMain.on('openWebMenu', () => {
    createWebWindow(1000, 700, true, 'browser', 'https://www.google.com')
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
        detail: "Cette fonctionnalité n'est pas encore disponible"
    })
})

ipcMain.on('openNoteMenu', () => {
    dialog.showMessageBox({
        type: "info",
        title: "WindowManager",
        message: "Note Menu",
        detail: "Cette fonctionnalité n'est pas encore disponible"
    })
})