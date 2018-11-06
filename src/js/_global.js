// defined constants, can't use const keyword because of IE
var SCREEN_XS_MAX = 568,
    SCREEN_SM = 768,
    SCREEN_MD = 992,
    SCREEN_LG = 1200;

// global variables
var windowWidth = $(window).outerWidth() || 0,
    windowHeight = $(window).outerHeight() || 0;

function onMobile() {
    windowWidth = $(window).outerWidth();
    return windowWidth < SCREEN_MD;
}

function onDesktop() {
    windowWidth = $(window).outerWidth();
    return windowWidth >= SCREEN_MD;
}