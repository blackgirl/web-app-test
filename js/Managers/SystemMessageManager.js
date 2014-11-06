/*
chrome.runtime.onUpdateAvailable.addListener(function(details) {
    SystemMessageManager.showUpdateAvailableMessage();
});
*/
var SystemMessageManager = {
    isOpened: false,

    moveElementsToHideMessage: function () {
        SystemMessageManager.isOpened = false;

        // Lower elements
        // If conference is opened
        if (global.scopes.videoChat._videoChatOpened || global.scopes.videoChat._screenOpened) {
            // If chat is maximized
            if ($("#div-minimize").is(':visible')) {
                $('.container-body').animate({ top: '284px' });
                //$('.container-body').animate({ top: '345px' });
                //$('#topBar').animate({ top: '286px' });
                $('#div-minimize-wrapper').animate({ top: '210px' });
            } else {
                $('.container-body').animate({ top: '111px' });
                //$('.container-body').animate({ top: '170px' });
                //$('#topBar').animate({ top: '111px' });
                $('#div-participants-avatars').animate({ top: '5px' });
                $('#div-minimize-wrapper').animate({ top: '15px' });
            }
        } else {
            // Lift elements
            $('.container-body').animate({ top: '0px' });
            //$('#topBar').animate({ top: '0px' });
        }
    },

    moveElementsToShowMessage: function () {
        SystemMessageManager.isOpened = true;
        
        // Lower smiles DDL for comments
        if ($('#smile-dropdown').is(':visible') && global.scopes.messages.needToAddSmileFromComment)
            $('#smile-dropdown').animate({ top: parseFloat($('#smile-dropdown').css('top')) + 38 });

        // Lower other elements
        // If conference is opened
        if (global.scopes.videoChat._videoChatOpened || global.scopes.videoChat._screenOpened) {
            // If chat is maximized
            if ($("#div-minimize").is(':visible')) {
                $('.container-body').animate({ top: '322px' });
                //$('.container-body').animate({ top: '383px' });
                //$('#topBar').animate({ top: '324px' });
                $('#div-minimize-wrapper').animate({ top: '248px' });
            } else {
                $('.container-body').animate({ top: '177px' });
                //$('.container-body').animate({ top: '208px' });
                //$('#topBar').animate({ top: '149px' });
                $('#div-participants-avatars').animate({ top: '43px' });
                $('#div-minimize-wrapper').animate({ top: '53px' });
            }
        } else {
            $('.container-body').animate({ top: '38px' });
            //$('.container-body').animate({ top: '99px' });
            //$('#topBar').animate({ top: '38px' });
        }
    },

    showUpdateAvailableMessage: function() {
        // Set style for system message
        $('#div-system-message').removeClass('connection-is-lost-system-message');
        $('#div-system-message').addClass('update-available-system-message');
        
        // Set text for system message
        $('#div-system-message-text').html('Like to install the latest version of Swapcast? Just  <span>restart Swapcast</span>  to upgrade!');

        SystemMessageManager.moveElementsToShowMessage();

        // Show a system message
        $('#div-system-message').show();
        $('#div-system-message').animate({ height: '40px' });
    },

    showConnectionIsLostMessage: function () {
        // Set style for system message
        $('#div-system-message').removeClass('update-available-system-message');
        $('#div-system-message').addClass('connection-is-lost-system-message');

        // Set text for system message
        $('#div-system-message-text').html('Please check your internet connection. Swapcast are trying to reconnect in 10 seconds.');

        SystemMessageManager.moveElementsToShowMessage();

        // Show a system message
        $('#div-system-message').show();
        $('#div-system-message').animate({ height: '40px' });
    },

    hide: function () {
        // Hide system message
        $('#div-system-message').animate({ height: '0px' }, 400, 'swing', function () { $('#div-system-message').hide(); });

        SystemMessageManager.moveElementsToHideMessage();
    }
};

$(function() {
    $('#div-system-message-close').on('click', SystemMessageManager.hide);
});