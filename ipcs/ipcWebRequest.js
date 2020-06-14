const { ipcMain } = require('electron')
var Meta = require('html-metadata-parser');
const Store = require('electron-store');
const store = new Store();

ipcMain.on('getWebsiteMeta', (event, data) => {
    (async() => {
        try{
            var result = await Meta.parser(data.url);
            event.sender.send('webMeta', {
                id: data.id,
                url: data.url,
                result: result
            })
        }catch(err){
            console.log("Delete of website : "+data.url+" Certificate untrusted")
            var toset = store.get('websites')
            const index = toset.indexOf(data.url);
            if (index > -1) {
                toset.splice(index, 1);
            }
            store.set('websites', toset)
        }


    })();
})