const { ipcMain } = require('electron')
var Meta = require('html-metadata-parser');

ipcMain.on('getWebsiteMeta', (event, data) => {
    (async() => {

        var result = await Meta.parser(data.url);

        event.sender.send('webMeta', {
            id: data.id,
            url: data.url,
            result: result
        })


    })();
})