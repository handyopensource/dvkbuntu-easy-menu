const { ipcMain } = require('electron')
const say = require('say')

//ici on met toutes les fonction pour l'assistant vocal.
ipcMain.on('saySomething', (event, data) => {
    //say.speak(data)
})