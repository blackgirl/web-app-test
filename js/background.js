chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('default.html', {
            'width': 1280,
            'height': 768,
            'minWidth': 1280,
            'minHeight': 768
        },
        function(win) {
            win.maximize();
        });
});

chrome.runtime.onSuspend.addListener(function() {
    // Force leave conferences when the window closed 
    if (global.scopes.videoChat._videoChatOpened) global.scopes.videoChat.closeVideoChat();

    if (global.scopes.videoChat._screenOpened) {
        global.scopes.videoChat.closeScreenSharing();

        // If a screen sharing tab is opened, close it
        if ($("#remoteScreenShareTab").length != 0)
            StreamManager.closeScreenSharingTab();
    }

    if (global.scopes.videoChat.conferenceManager.localAudioStream != null)
        global.scopes.videoChat.conferenceManager.localAudioStream.stop();
    if (global.scopes.videoChat.conferenceManager.localSharingStream != null)
        global.scopes.videoChat.conferenceManager.localSharingStream.stop();
    if (global.scopes.videoChat.conferenceManager.localVideoStream != null)
        global.scopes.videoChat.conferenceManager.localVideoStream.stop();

    for (var i in global.scopes.videoChat.conferenceManager.remoteAudioStreams) {
        if (typeof (global.scopes.videoChat.conferenceManager.remoteAudioStreams[i]) != 'undefined')
            global.scopes.videoChat.conferenceManager.remoteAudioStreams[i].stop();
    }

    for (var j in global.scopes.videoChat.conferenceManager.remoteVideoStreams) {
        if (typeof (global.scopes.videoChat.conferenceManager.remoteVideoStreams[j]) != 'undefined')
            global.scopes.videoChat.conferenceManager.remoteVideoStreams[j].stop();
    }

    for (var k in IceLinkWebRtcVideoChat.conference.getStreams()) {
        IceLinkWebRtcVideoChat.conference.getStreams()[k]._localStream.stop();
    }

    for (var l in IceLinkWebRtcSharing.conference.getStreams()) {
        IceLinkWebRtcVideoChat.conference.getStreams()[l]._localStream.stop();
    }

    clearInterval(global.scopes.swapcast.invitationSoundTimer);
});