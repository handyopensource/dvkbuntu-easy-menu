const { app, BrowserWindow, Menu, MenuItem, dialog } = require('electron')
const path = require('path')


require('./ipcs/mainIpc') //require du fichier principal des IPCs

function createWindow() {
    global.mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        resizable: true,
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            //devTools: false,
            preload: path.join(app.getAppPath() + "/app", 'preload.js')
        }
    })
    global.mainWindow.loadFile(app.getAppPath() + '/app/view/index.html')
}


function createParams() {
    var params = new BrowserWindow({
        width: 800,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            //devTools: false,
            preload: path.join(app.getAppPath() + "/app", 'preload.js')
        }
    })
    params.loadFile(app.getAppPath() + '/app/view/parametres.html')
}


app.whenReady().then(() => {
    createWindow()
        //définition du menu contextuel
    const ctxMenu = new Menu()
    ctxMenu.append(new MenuItem({
        label: "Paramètres",
        click: function() {
            createParams()
        }
    }))


    ctxMenu.append(new MenuItem({ type: "separator" }))
    ctxMenu.append(new MenuItem({ label: "rafraichir", role: "forcereload" }))
        //définition du clique droit
    global.mainWindow.webContents.on('context-menu', function(event, params) {
        ctxMenu.popup(global.mainWindow, params.x, params.y)
    })

    app.on('activate', function() {
        //prise en charge de mac (l'application ne se ferme que lors du Cmd + Q ici on ouvre donc une nouvelle fenêtre si le processus est réactivé)
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

app.on('window-all-closed', function() {
    // ici on prend en charge la fermeture de l'application en spécifiant que pour mac l'application
    // ne se ferme pas quand toutes les fenêtres sont fermé pour mac il faut donc utiliser Cmd + Q (il suffit de supprimer le if si on ne veut pas gérer ça)
    if (process.platform !== 'darwin') app.quit()
})