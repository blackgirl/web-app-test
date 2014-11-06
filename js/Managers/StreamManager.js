var StreamManager = {
    isVideoTagsFitToArea: function(finishIndex) {
        var videosTotalWidth = 0;

        // Calculate total width of the visible video tags
        $.each($(".remoteVideo:not(.display-none)"), function (i, e) {
            if (typeof (finishIndex) == 'undefined' || i < finishIndex)
                videosTotalWidth += $(e).width() + parseFloat($(e).css('margin-left'));
        });
        
        // 262px is the margin-right of the #div-videos-wrap element
        return videosTotalWidth < ($("body").width() - 262);
    },

    decreaseVideosSizes: function() {
        // Display videos in two rows
        if (!StreamManager.isVideoTagsFitToArea()) {
            var videoStreams = $(".remoteVideo:not(.screen-sharing-audio)");

            $(".remoteVideo.clear-both").removeClass("clear-both");

            videoStreams.eq(videoStreams.length - 2).addClass("clear-both");

            $(".remoteVideo").addClass("small-remote-video");
        }
    },

    increaseVideosSizes: function() {
        // Display videos in one row
        if (StreamManager.isVideoTagsFitToArea()) {
            $(".remoteVideo.clear-both").removeClass("clear-both");
            $(".small-remote-video").removeClass("small-remote-video");
        }
    },

    correctVideosSizes: function () {
        if (StreamManager.isVideoTagsFitToArea()) {
            $(".remoteVideo.clear-both").removeClass("clear-both");
            $(".small-remote-video").removeClass("small-remote-video");
        } else {
            var videoStreams = $(".remoteVideo:not(.screen-sharing-audio)");
            var moveAfterVideo = videoStreams.length;

            while (StreamManager.isVideoTagsFitToArea(moveAfterVideo) == false) {
                moveAfterVideo--;
            }

            $(".remoteVideo.clear-both").removeClass("clear-both");

            $(".remoteVideo:not(.screen-sharing-audio)").eq(moveAfterVideo).addClass("clear-both");
            $(".remoteVideo").addClass("small-remote-video");
        }
    },

    closeScreenSharingTab: function () {
        $("#browserGrid").removeClass("hide");

        $("#screenShareGrid").addClass("hide");

        $("#remoteScreenShareTab").remove();

        $("#screenShareGrid").empty();

        global.scopes.webBrowser.Functions.showMyLibrary();
    }
};

window.onresize = function () {
    StreamManager.correctVideosSizes();
};