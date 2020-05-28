const { ipcMain, app } = require('electron')
const fs = require('fs')
    //ce fichier contient toutes les interaction avec le système, 
    //on mettera ici aussi les actions comme la fermeture de l'application

ipcMain.on('shutdown', () => {
    app.quit()
})

//evenement de requête de thème
ipcMain.on("getTheme", (event, data) => {
    var params = require("../data/params.json")
    var path = "../data/theme/" + params.theme + ".json"
    try {
        var theme = require(path)
        event.sender.send('setTheme', theme)
    } catch (err) {
        console.log("Error : no theme was found under the name of " + params.theme)
    }

})