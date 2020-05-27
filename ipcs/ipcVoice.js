const { ipcMain } = require('electron')
const say = require('say')
const utf8 = require('utf8');

String.prototype.sansAccent = function() {
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g,
        /[\310-\313]/g, /[\350-\353]/g,
        /[\314-\317]/g, /[\354-\357]/g,
        /[\322-\330]/g, /[\362-\370]/g,
        /[\331-\334]/g, /[\371-\374]/g,
        /[\321]/g, /[\361]/g,
        /[\307]/g, /[\347]/g,
    ];
    var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    var str = this;
    for (var i = 0; i < accent.length; i++) {
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
}


ipcMain.on('saySomething', (event, data) => {
    //say.speak(data)
})