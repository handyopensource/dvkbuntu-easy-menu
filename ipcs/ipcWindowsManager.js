const { ipcMain, dialog } = require('electron')

//Ici on met toutes les fonction pour ouvrir les nouvelles fenêtres.

ipcMain.on('openWebMenu', () => {
    dialog.showMessageBox({
        type: "info",
        title: "WindowManager",
        message: "Web Menu",
        detail: "Le renderer à demandé l'ouverture du menu des sites web"
    })
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