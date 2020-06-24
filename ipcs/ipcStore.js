const { app, ipcMain } = require("electron");
const Store = require("electron-store");
const path = require("path");

const store = new Store();

if (store.get("websites") == undefined) {
  store.set("websites", []);
}


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
