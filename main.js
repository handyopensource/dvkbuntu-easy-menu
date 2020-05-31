const { app, BrowserWindow, Menu, MenuItem, dialog } = require('electron')
const path = require('path')

require('./ipcs/mainIpc') //require du fichier principal des IPCs

function createWindow() {
    global.mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        resizable: false,
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


app.whenReady().then(() => {
    createWindow()
        //définition du menu contextuel
    const ctxMenu = new Menu()
    ctxMenu.append(new MenuItem({
        label: "Paramètres",
        click: function() {
            dialog.showMessageBox({
                type: "info",
                title: "ContextClick",
                message: "Paramètres",
                detail: "Le menu contextuel a demandé l'ouverture des paramètres"
            })
        }
    }))
    ctxMenu.append(new MenuItem({ type: "separator" }))
    ctxMenu.append(new MenuItem({ label: "rafraichir", role: "forcereload" }))
    ctxMenu.append(new MenuItem({ type: "separator" }))
    ctxMenu.append(new MenuItem({
            label: "Redimentionner",
            submenu: [{
                    label: "Cubique",
                    click: function() {
                        global.mainWindow.setResizable(true)
                        global.mainWindow.setSize(800, 800)
                        global.mainWindow.center()
                        global.mainWindow.setResizable(false)
                    }
                },
                {
                    label: "Long",
                    click: function() {
                        global.mainWindow.setResizable(true)
                        global.mainWindow.setSize(1500, 420)
                        global.mainWindow.center()
                        global.mainWindow.setResizable(false)
                    }
                }
            ]
        }))
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