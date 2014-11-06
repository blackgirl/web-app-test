var FileSendManager = {
    _stream: null,
    _video: null,

    computeFrame: function () {
        // Draw screen at the canvas
        var canvas = document.createElement("canvas");
        canvas.width = FileSendManager._video.videoWidth;
        canvas.height = FileSendManager._video.videoHeight;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(FileSendManager._video, 0, 0);

        // Convert base64 string to byte array
        var imageBase64 = canvas.toDataURL().replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        var imageBytes = Utils.base64DecToArr(imageBase64);

        var mimeType = "image/png";

        // Upload data to server
        $.ajax({
            url: global.scopes.swapcast.signalRServer + 'Image/SubmitFile?fileName=screenCapture.png&mimeType=' + mimeType,
            type: 'post',
            data: imageBytes,
            cache: false,
            contentType: false,
            processData: false,
            contentType: mimeType,
            success: function (imageId) {
                // Post the message
                var message = {
                    GroupId: global.scopes.swapcast.messages.selectedGroup.GroupId,
                    Image: imageId,
                    UserPosted: global.scopes.swapcast.swapSettings.UserProfile.UserId,
                    MessageClientId: global.scopes.messages.generateKey()
                };

                global.scopes.swapcast.Requests.postMessage(message);
            }
        });

        FileSendManager._stream.stop();
        FileSendManager._stream = null;
        FileSendManager._video = null;
    },

    sendScreenCapture: function () {
        navigator.webkitGetUserMedia({
                audio: false,
                video: {
                    mandatory: { chromeMediaSource: 'screen', maxWidth: 320, maxHeight: 240 },
                    optional: []
                }
        }, function (stream) {
                FileSendManager._stream = stream;

                // Start screen sharing
                var video = document.createElement("video");
                FileSendManager._video = video;

                video.src = window.URL.createObjectURL(stream);

                video.addEventListener("canplaythrough", FileSendManager.computeFrame, false);

                video.play();
            }
        );
    },

    sendPhoto: function (imageBase64) {
        var mimeType = "image/png";
        var imageBytes = Utils.base64DecToArr(imageBase64);
        $.ajax({
            url: global.scopes.swapcast.signalRServer + 'Image/SubmitFile?fileName=sendPhoto.png&mimeType=' + mimeType + '&token=' + global.scopes.swapcast.swapSettings.authToken,
            type: 'post',
            data: imageBytes,
            cache: false,
            contentType: false,
            processData: false,
            contentType: mimeType,
            success: function (imageId) {
                // Post the message
                var message = {
                    GroupId: global.scopes.swapcast.messages.selectedGroup.GroupId,
                    Image: imageId,
                    UserPosted: global.scopes.swapcast.swapSettings.UserProfile.UserId,
                    MessageClientId: global.scopes.messages.generateKey()
                };

                global.scopes.swapcast.Requests.postMessage(message);
            }
        });
    }
};