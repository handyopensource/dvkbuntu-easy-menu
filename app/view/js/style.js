window.api.getTheme()
    //fichier pour les paramètres de thèmes
window.api.receive("setTheme", (style) => {
    $(":root").css('--color-main', style["color-main"]);
    $(":root").css('--color-secondary', style["color-secondary"]);
    $(":root").css('--color-red', style["color-red"]);
    $(":root").css('--color-gray', style["color-gray"]);
    $(":root").css('--color-black', style["color-black"]);
    $(":root").css('--color-text', style["color-text"]);
})

$(function() {
    $('.tile').hover(function() {
        $(this).find("div").removeClass("icon-wrapper");
        $(this).find("div").addClass("icon-wrapper-selected");
        $(this).find("span").removeClass("bottom-title")
        $(this).find("span").addClass("bottom-title-selected")
            //$(this).css("text-align", "center");
    }, function() {
        // on mouseout, reset the background colour
        $(this).find("div").addClass("icon-wrapper");
        $(this).find("div").removeClass("icon-wrapper-selected");
        $(this).find("span").addClass("bottom-title")
        $(this).find("span").removeClass("bottom-title-selected")
            //$(this).css("text-align", "left");
    });
});