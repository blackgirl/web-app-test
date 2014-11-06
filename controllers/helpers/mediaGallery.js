var MediaGalleryManager = {
    getMediaFolders: function(details, callback) {
        chrome.mediaGalleries.getMediaFileSystems(details, callback);
    },
    getMetadata: function(fileSystemItem) {
        return chrome.mediaGalleries.getMediaFileSystemMetadata(fileSystemItem);
    }
}