const { app, ipcMain } = require("electron");
const Store = require("electron-store");
const path = require("path");

const store = new Store();

if (store.get("websites") == undefined) {
  store.set("websites", []);
}
if (store.get("trusted") == undefined) {
  store.set("trusted", [])
}

console.log(store.get("trusted"))

if (store.get("params") == undefined) {
  store.set("params", { theme: "default" });
  store.set("themes", {
    default: {
      "color-main": "#00316e",
      "color-secondary": "#165786",
      "color-gray": "#383838",
      "color-black": "#0C0C0C",
      "color-red": "#FF0000",
      "color-text": "white",
    }
  });
}

function getDomainFromUrl(url) {
  return url.replace("https://", "").split("/")[0];
}

function buildDomainFromUrl(url) {
  var str = getDomainFromUrl(url);
  return "https://" + str;
}

ipcMain.on("getWebSiteStore", (event, data) => {
  event.sender.send("getWebSiteStore", store.get("websites"));
});

ipcMain.on("getTrusted", (event, data) => {
  event.sender.send("trusted", store.get("trusted"))
})

ipcMain.on("addTrusted", (event, data) => {
  var toset = store.get("trusted");
  toset.push(getDomainFromUrl(data))
  store.set("trusted", toset);
  event.sender.send("trusted", store.get("trusted"))
})

ipcMain.on("setWebSiteStore", (event, data) => {
  store.set("websites", data);
});

ipcMain.on("addWebSiteStore", (event, data) => {
  var toset = store.get("websites");
  toset.push(buildDomainFromUrl(data));
  store.set("websites", toset);
});

ipcMain.on("remWebSiteStore", (event, data) => {
  var toset = store.get("websites");
  const index = toset.indexOf(data);
  if (index > -1) {
    toset.splice(index, 1);
  }
  store.set("websites", toset);
});


ipcMain.on("getTheme", (event) => {
  event.sender.send('setTheme', store.get("themes")[store.get("params").theme])
})

ipcMain.on("getThemes", (event) => {
  event.sender.send('sendThemes', store.get("themes"))
})

ipcMain.on("setTheme", (event, data) => {
  store.set("params", { "theme": data });
  event.sender.send('setTheme', store.get("themes")[store.get("params").theme])
})

ipcMain.on("addTheme", (event, data) => {
  if(data[0].value != "") {
    var newTheme =
      `{
      "${data[1].name}": "${data[1].value}",
      "${data[2].name}": "${data[2].value}",
      "${data[3].name}": "${data[3].value}",
      "${data[4].name}": "${data[4].value}",
      "${data[5].name}": "${data[5].value}",
      "${data[6].name}": "${data[6].value}"
      }`
    var newThemes = store.get("themes")
    newThemes[data[0].value] = JSON.parse(newTheme)
    store.set("themes", newThemes)
  }
  event.sender.send('sendThemes', store.get("themes"))
})

ipcMain.on("deleteTheme", (event, data) => {
  if (data != "default") {
    store.delete(`themes.${data}`)
  }
  event.sender.send('sendThemes', store.get("themes"))
})

