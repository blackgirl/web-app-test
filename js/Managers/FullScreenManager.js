var FullScreenManager = {
    lastBoundUrl: null,

    bindEvents: function (url) {
        if (FullScreenManager.lastBoundUrl != url) {
            FullScreenManager.lastBoundUrl = url;

            var styles = { code: '' }, code = { code: '' };

            if (url.indexOf("youtube.com") != -1) {
                styles = FullScreenManager.generateYoutubeStyles();
                code = FullScreenManager.generateYoutubeCode();
            }
            else if (url.indexOf("vimeo.com") != -1) {
                styles = FullScreenManager.generateVimeoStyles();
                code = FullScreenManager.generateVimeoCode();
            }

            $('#browser')[0].insertCSS(styles);

            $('#browser')[0].executeScript(code);
        }
    },
    
    generateVimeoStyles: function () {
        return {
            code: ".player-fullscreen-mode { position: fixed; left: 0; top: 0; z-index: 90; width: 100% !important; height: 100% !important; }"
        };
    },

    generateVimeoCode: function () {
        return {
            code: "var btnFullscreen = document.querySelector('button.fullscreen'); "
                + "var playerContainer = document.querySelector('.player_container'); "
                + "btnFullscreen.addEventListener('click', function() { "
                + "playerContainer.classList.toggle('player-fullscreen-mode'); "
                + "}); "
        };
    },

    generateYoutubeStyles: function () {
        return { code: "#movie_player { z-index: 3; }" };
    },

    generateYoutubeCode: function () {
        return {
            code:"var btnFullscreen = document.querySelector('.ytp-button.ytp-button-fullscreen-enter'); "
                + "var isBtnFullscreenPressed = false; "
                + "btnFullscreen.addEventListener('click', function() { "
                + "if (!isBtnFullscreenPressed) { isBtnFullscreenPressed = true; return; }; "
                + "var isExit = btnFullscreen.className.indexOf('ytp-button-fullscreen-exit') != -1; "
                + "if (isExit) { "
                + "document.querySelector('#movie_player').style.position = 'relative'; "
                + "btnFullscreen.className = btnFullscreen.className.replace('ytp-button-fullscreen-exit','ytp-button-fullscreen-enter'); "
                + "} "
                + "else { "
                + "document.querySelector('#movie_player').style.position = 'fixed'; "
                + "btnFullscreen.className = btnFullscreen.className.replace('ytp-button-fullscreen-enter','ytp-button-fullscreen-exit'); "
                + "}"
                + "document.querySelector('video').webkitRequestFullscreen(); "
                + "}); "
        };
    }
};