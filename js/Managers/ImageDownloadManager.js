var ImageDownloadManager = {
    getBase64Image: function(imageId, isAvatar, callback) {
        $.ajax({
            url: global.scopes.swapcast.signalRServer + 'Image/Get' + (isAvatar ? 'Image' : 'File64'),
            type: 'get',
            data: {
                Id: imageId,
                Width: 300,
                Height: 300
            },
            success: function (imageBase64) {
                if (imageBase64 != null) {
                    if (typeof (callback) == 'undefined')
                        global.scopes.messages.safeApply(function() { global.scopes.messages.images[imageId] = 'data:image/png;base64,' + imageBase64; });
                    else
                        callback(imageBase64);
                }
            },
            error: function() {
                global.scopes.messages.images[imageId] = (void 0);
            }
        });
    }
};