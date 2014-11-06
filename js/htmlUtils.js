var HtmlUtils = {
    addMyProfileTab: function () {
        $(".tabsArea").find(".rightNav").append('<li class="favoriteTabs activeTab" id="liMyProfile"><span>My Profile</span><a class="tab-close-button" id="closeProfile"></a></li>');
    },

    addProfileTab: function () {
        $(".tabsArea").find(".rightNav").append('<li class="favoriteTabs activeTab" id="liProfile"><span>Profile</span><a id="closeFriendProfile" class="tab-close-button"></a></li>');
    },

    addScreenShareTab: function (name) {
        $(".tabsArea")
            .find(".rightNav")
            .append('<li class="favoriteTabs activeTab" id="remoteScreenShareTab" title="'
                + name + '"><span>Screenshare</span><a id="closeRemoteScreenShareTab" class="tab-close-button"></a></li>');
    },

    addMediaTab: function (name, path, galleryId) {
        $("#browserTabs")
            .append('<li class="favoriteTabs activeTab liMediaTab" title="'
                + name + '" path="'
                + path + '" gId="'
                + galleryId + '"><span>'
                + name + '</span><a class="tab-close-button closeMedia"></a></li>');
    },

    addParticipantsAvatar: function (id, img, name) {
        $("#div-participants-avatars > div").append(
            "<div class='profile-link' rel='" + id + "'><div class='profile-back'><span></span></div><div class='profile-container'><div class='profile-div user-photo-frame bgc-online'>" +
            "<img class='user-photo' src='" + img + "' alt='' width='32' height='32'/></div>" +
            "<div class='remoteLabel'><span>" + name + "</span></div>" +
            "<div class='mute-buttons-container'><a class='a-mute'></a><a class='a-unmute' style='display:none;'></a></div></div></div></div></div></div>");

        global.scopes.videoChat.bindEvents($("#div-participants-avatars > div:last").find(".profile-container"));
    },

    addMediaStream: function (container, isVideo, src, id, isLocalScreenSharing, isRemoteScreenSharing, isLocalStream) {
        var elementHtml;

        if (isVideo)
            elementHtml = "<video " + (isRemoteScreenSharing ? "width='100%' height='80%'" : "height='210'")
                + " src='" + src + "' id='" + id + "' " + (isLocalStream ? "muted" : "") + "></video>";
        else
            elementHtml = "<audio class='no-video-stream" + (isRemoteScreenSharing ? " display-none" : "") + "' src='" + src + "' id='" + id + "'" + (isLocalStream ? "muted" : "") + "></audio>";

        if (isRemoteScreenSharing) {
            if ($("#screenShareGrid > *").length == 0)
                $("#screenShareGrid").html(elementHtml);
            else
                $("#screenShareGrid > *").after(elementHtml);
        } else {
            if (isLocalScreenSharing)
                container.children(".remoteVideo").first().before(elementHtml);
            else
                container.append(elementHtml); // video chat
        }
    },

    addMediaStreamInfo: function (container, img, name, isLocal) {
        var additionalHtml = "<div class='profile-link'><div class='profile-back'><span></span></div><div class='profile-container'><div class='profile-div user-photo-frame bgc-online'>" +
            "<img class='user-photo' src='" + img + "' alt='' width='32' height='32'/></div>" +
            "<div class='remoteLabel'><span>" + name + "</span></div>" +
            "<div class='mute-buttons-container'><a class='a-mute'></a><a class='a-unmute' style='display:none;'></a></div></div></div></div></div></div>";

        container.append(additionalHtml);

        global.scopes.videoChat.bindEvents(container.find(".profile-container:last"), isLocal);
    }
};