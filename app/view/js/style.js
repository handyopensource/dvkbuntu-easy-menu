window.api.getTheme()
    //fichier pour les paramètres de thèmes
window.api.receive("setTheme", (style) => {
    document.body.style.setProperty('--color-main', style["color-main"]);
    document.body.style.setProperty('--color-secondary', style["color-secondary"]);
    document.body.style.setProperty('--color-red', style["color-red"]);
    document.body.style.setProperty('--color-gray', style["color-gray"]);
    document.body.style.setProperty('--color-black', style["color-black"]);
    document.body.style.setProperty('--color-text', style["color-text"]);
})