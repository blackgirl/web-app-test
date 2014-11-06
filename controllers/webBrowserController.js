function webBrowserController($scope) {
    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.mediaGallery = MediaGalleryManager;

    $scope.storage = new StorageManager();

    global.scopes.webBrowser = angular.element($('#container-right')).scope();

    $scope.InitialTabs = [];

    global.scopes.webBrowser.TabsOfUser = {
        DefaultTabs: [],
        MoreTabs: new Array,
        NewId: 1,
    };

    //$('#browser')[0].addEventListener('loadstart', function () {
    //    $("#div-reload-button").addClass("div-stop-reload-button");
    //});

    //$('#browser').on('loadstart', function () {
    //    $(':not(.activeTab) .tab-content-image img.spinner').remove();
    //    $(':not(.activeTab) .tab-content-image').children().show();
    //    var tabLoaderArea = $('.activeTab .tab-content-image');
    //    tabLoaderArea.children(':not(.spinner)').hide();
    //    if (tabLoaderArea.find('img.spinner').length == 0)
    //        tabLoaderArea.append('<img class="spinner" src="/css/img/redesign/spinner.gif"/>');
    //});

    //$('#browser').on('loadstop', function () {
    //    var openLinkInBrowser = $(this).attr('src');
    //    var defaultTabs = global.scopes.webBrowser.TabsOfUser.DefaultTabs;

    //    var tabLoaderArea = $('.activeTab .tab-content-image');
    //    tabLoaderArea.find('img.spinner').remove();
    //    tabLoaderArea.children().show();

    //    if (openLinkInBrowser != "about:blank") {
    //        // but here it fired twice
    //        global.scopes.swapcast.Requests.pageOpen(openLinkInBrowser);
    //    }

    //    var idTab, idTabPrev;

    //    var webBrowserScope = angular.element(document.getElementById("container-right")).scope();

    //    for (var i = 0; i < defaultTabs.length; i++) {
    //        if (defaultTabs[i].Class.indexOf('mainTab') != -1
    //            && defaultTabs[i].Class.indexOf('favoriteTabs') != -1
    //            && defaultTabs[i].Class.indexOf('activeTab') != -1) {

    //            // Set browser title
    //            webBrowserScope.$apply(function () {
    //                webBrowserScope.getTitle(openLinkInBrowser, i);
    //            });

    //            idTabPrev = typeof (defaultTabs[i - 1]) != 'undefined' ? defaultTabs[i - 1].Id : defaultTabs[i].Id;
    //            idTab = defaultTabs[i].Id;

    //            //check if this tab 'New Tab'
    //            if (defaultTabs[i].Link != "about:blank") {
    //                // Set tab title and url
    //                webBrowserScope.$apply(function () {
    //                    webBrowserScope.TabsOfUser.DefaultTabs[i].Title = openLinkInBrowser.split('/')[2];

    //                    if ((webBrowserScope.TabsOfUser.DefaultTabs[i].Link + '/') != openLinkInBrowser)
    //                        webBrowserScope.TabsOfUser.DefaultTabs[i].Link = openLinkInBrowser;
    //                });

    //                var historyOfTabs = $scope.historyOfTabs;

    //                if (typeof historyOfTabs[idTab] == 'undefined') {
    //                    historyOfTabs[idTab] = new Array();
    //                    var defaultTab = { Link: defaultTabs[i].Link, IsCurrentTab: false };
    //                    historyOfTabs[idTab].push(defaultTab);
    //                }

    //                //delete from tab all 'currentTab'
    //                for (var y = 0; y < historyOfTabs[idTab].length; y++) {
    //                    if (historyOfTabs[idTab][y].IsCurrentTab == true) {
    //                        historyOfTabs[idTab][y].IsCurrentTab = false;
    //                    }
    //                }

    //                var activeTab = historyOfTabs[idTab];

    //                if (typeof activeTab != 'undefined') {
    //                    for (var k = 0; k < activeTab.length; k++) {
    //                        if (activeTab[k].Link.replace("http://", "").replace("https://", "") == openLinkInBrowser.replace("http://", "").replace("https://", "") ||
    //                            activeTab[k].Link.replace("http://", "").replace("https://", "") + "/" == openLinkInBrowser.replace("http://", "").replace("https://", "")) {

    //                            activeTab[k].IsCurrentTab = true;

    //                            $scope.displayNextBut = $scope.DisplayNextButton();
    //                            $scope.displayPrevBut = $scope.DisplayPrevButton();

    //                            activeTab[k].Link = openLinkInBrowser;

    //                            global.scopes.webBrowser.SaveTabsToStorage();

    //                            return;
    //                        }
    //                    }

    //                    var currentTab = { Link: openLinkInBrowser, IsCurrentTab: true };

    //                    historyOfTabs[idTab].push(currentTab);

    //                    $scope.displayNextBut = $scope.DisplayNextButton();
    //                    $scope.displayPrevBut = $scope.DisplayPrevButton();
    //                }
    //            }
    //        }
    //    }

    //    global.scopes.webBrowser.safeApply(function () {
    //        global.scopes.webBrowser.openLinkInBrowser = openLinkInBrowser;
    //    });

    //    global.scopes.webBrowser.SaveTabsToStorage();

    //    // If FB authentication 
    //    if (this.src.indexOf('www.facebook.com/v1.0/dialog/oauth') != -1) {
    //        webBrowserScope.$apply(function () {
    //            webBrowserScope.openLink(idTabPrev); // Open tab with FB friends
    //        });

    //        setTimeout(function () {
    //            var webBrowserScope2 = angular.element(document.getElementById("container-right")).scope();

    //            webBrowserScope2.$apply(function () {
    //                webBrowserScope2.CloseTab(idTab);
    //            });
    //        }, 700);
    //    }
    //}).on('newwindow', function (e) {
    //    $scope.AddNewTab(e.originalEvent.targetUrl);
    //}).on('loadredirect', function (e) {
    //    // Add redirect url to InitialTabs to exclude its saving to local storage
    //    global.scopes.webBrowser.InitialTabs.push({ Link: e.originalEvent.newUrl });

    //    if (!e.originalEvent.isTopLevel) return;

    //    var defaultTabs = global.scopes.webBrowser.TabsOfUser.DefaultTabs;

    //    for (var i = 0; i < defaultTabs.length; i++) {
    //        if (defaultTabs[i].Class == "mainTab favoriteTabs activeTab") {

    //            var idTab = defaultTabs[i].Id;

    //            //check if this tab 'New Tab'
    //            if (defaultTabs[i].Link != "about:blank") {
    //                {
    //                    var historyOfTabs = $scope.historyOfTabs;

    //                    var activeTab = historyOfTabs[idTab];

    //                    if (typeof activeTab != 'undefined') {
    //                        for (var k = 0; k < activeTab.length; k++) {
    //                            if (activeTab[k].Link.replace("http://", "").replace("https://", "") == e.originalEvent.oldUrl.replace("http://", "").replace("https://", "") ||
    //                                activeTab[k].Link.replace("http://", "").replace("https://", "") + "/" == e.originalEvent.oldUrl.replace("http://", "").replace("https://", "")) {

    //                                if (activeTab[k + 1] != undefined && activeTab[k + 1].Link.replace("http://", "").replace("https://", "") == e.originalEvent.newUrl.replace("http://", "").replace("https://", "")) {
    //                                    activeTab.splice(k, 1);
    //                                    return;
    //                                } else {
    //                                    activeTab[k].Link = e.originalEvent.newUrl;
    //                                }
    //                            }
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    }
    //});

    //$('#browser')[0].addEventListener('contentload', function () {
    //    $("#div-reload-button").removeClass("div-stop-reload-button");

    //    FullScreenManager.bindEvents(this.src);
    //});

    $scope.sharedLinks = {
        sharingLinkTitle: null,
        openLinkName: null
    };

    $scope.getTabTitle = function (title) {
        if (title) {
            if (title.length > 20) {
                return title.substring(0, 17) + "...";
            } else return title;
        }
    };

    $scope.getFavIconUrl = function (id) {
        return global.scopes.swapcast.getFaviconUrl(id);
    };

    $scope.tabTitleMaxLength = 20;
    $scope.browserUrl = "";
    $scope.historyOfTabs = new Array();
    $scope.displayNextBut = false;
    $scope.displayPrevBut = false;
    global.scopes.webBrowser.gGalleries = [];
    global.scopes.webBrowser.gItems = [];
    $scope.searchText = "";

    $scope.changeSearchText = function () {
        $scope.searchText = $("#searchString").val();
    };

    $scope.isInGallery = function (gallery) {
        return function (item) {
            if (item.mData.galleryId == gallery.id && item.entry.name.indexOf($scope.searchText) != -1) return true;
            else return false;
        };
    };

    $scope.containsItems = function () {
        return $scope.gItems.length > 0;
    };

    $scope.galleryHasItems = function () {
        return function (gallery) {
            for (var i = 0; i < global.scopes.webBrowser.gItems.length; i++) {
                if (global.scopes.webBrowser.gItems[i].mData.galleryId == gallery.id) {
                    return true;
                }
            }

            return false;
        };
    };

    $scope.getTitle = function (url, tabIndex) {
        if (url == "about:blank") return;

        $.ajax({
            url: url,
            method: "GET",
            datatype: "text/html",
            success: function(data) {
                var indexOfTitle = data.indexOf("<title", 0);
				
				if (indexOfTitle == -1) return;
				
                var indexOfTitleClose = data.indexOf("</title>", 0);
				
                var indexOfTitleCloseSign = data.indexOf(">", indexOfTitle);
				
                var title = data.slice(indexOfTitleCloseSign + 1, indexOfTitleClose);

                if (typeof (global.scopes.webBrowser.TabsOfUser.DefaultTabs[tabIndex]) != 'undefined')
                    global.scopes.webBrowser.$apply(function() { global.scopes.webBrowser.TabsOfUser.DefaultTabs[tabIndex].Title = title; });

                global.scopes.webBrowser.SaveTabsToStorage();
            }
        });
    };

    $scope.openVideo = function (path, galleryId) {
        GridManager.showGrid("#myLibraryMedia");

        $(".tabsArea").find(".main-tab").removeClass('activeMainTab');

        $("#browserTabs li.activeTab").removeClass('activeTab');

        var name = path.slice(1, path.length);

        HtmlUtils.addMediaTab(name, path, galleryId);

        $("#browserTabs .liMediaTab .closeMedia").unbind('click').on('click', $scope.MedialLibrary.closeMedia);

        $('#browserTabs .liMediaTab').on('click', function () {
            GridManager.showGrid("#myLibraryMedia");

            $(".tabsArea").find(".main-tab").removeClass('activeMainTab');

            $("#browserTabs li.activeTab").removeClass('activeTab');

            $(this).addClass('activeTab');

            var itemPath = $(this).attr('path');
            var gId = $(this).attr('gId');

            $scope.MedialLibrary.startPlay(itemPath, gId);
        });

        $scope.MedialLibrary.startPlay(path, galleryId);
    };

    $scope.MedialLibrary = {
        gGalleryIndex: 0,
        gGalleryReader: null,
        gDirectories: [],
        gGalleryData: [],
        gCurOptGrp: null,
        imgFormats: ['png', 'bmp', 'jpeg', 'jpg', 'gif', 'png', 'svg', 'xbm', 'webp'],
        audFormats: ['wav', 'mp3'],
        vidFormats: ['3gp', '3gpp', 'avi', 'flv', 'mov', 'mpeg', 'mpeg4', 'mp4', 'webm', 'wmv'],
        selectFolder: function (interactive) {
            $scope.mediaGallery.getMediaFolders({
                interactive: interactive
            }, $scope.MedialLibrary.getGalleriesInfo);
        },
        startPlay: function (path, galleryId) {
            var fsId = galleryId;
            var fs = null;

            // get the filesystem that the selected file belongs to
            for (var i = 0; i < $scope.gGalleryArray.length; i++) {
                var mData = $scope.mediaGallery.getMetadata($scope.gGalleryArray[i]);
                if (mData.galleryId == fsId) {
                    fs = $scope.gGalleryArray[i];
                    break;
                }
            }
            if (fs) {
                fs.root.getFile(path, { create: false }, function (fileEntry) {
                    var url = fileEntry.toURL();
                    var newElem = null;
                    // show the file data

                    newElem = $('#mediaContainer');

                    if (newElem) {
                        (function (image_element) {
                            fileEntry.file(function (fff) {
                                var reader = new FileReader();
                                reader.onerror = $scope.MedialLibrary.errorPrintFactory('FileReader');
                                reader.onloadend = function (e) {
                                    $('video[id="' + image_element.selector.slice(1, image_element.selector.length) + '"]').attr('src', this.result);
                                };
                                reader.readAsDataURL(fff);
                            }, $scope.MedialLibrary.errorPrintFactory('PlayBack'));
                        }(newElem));
                    }
                });
            }
        },
        closeMedia: function closeMedia() {
            GridManager.showGrid("#myHomeGrid", "#myLibraryMedia");

            $(".tabsArea").find(".main-tab").removeClass('activeMainTab');

            $("#browserTabs li.activeTab").removeClass('activeTab');

            $(".tabsArea").find(".main-tab").addClass('activeMainTab');

            $(this).parents(".liMediaTab").remove();
        },
        getGalleriesInfo: function (results) {
            if (results.length) {
                $scope.gGalleryArray = results;
                $scope.MedialLibrary.gGalleryIndex = 0;
                if ($scope.gGalleryArray.length > 0) {
                    $scope.MedialLibrary.scanGalleries($scope.gGalleryArray[0]);
                }
            }
        },
        scanGalleries: function (fs) {
            var mData = $scope.mediaGallery.getMetadata(fs);

            $scope.MedialLibrary.gCurOptGrp = $scope.MedialLibrary.addGallery(mData.name, mData.galleryId);
            $scope.MedialLibrary.gGalleryData[$scope.MedialLibrary.gGalleryIndex] = new $scope.MedialLibrary.GalleryData(mData.galleryId);
            $scope.MedialLibrary.gGalleryReader = fs.root.createReader();
            $scope.MedialLibrary.gGalleryReader.readEntries($scope.MedialLibrary.scanGallery, $scope.MedialLibrary.errorPrintFactory('readEntries'));

            console.log(mData);
        },
        addGallery: function (name, id) {
            var gallery = { name: name, id: id };
            global.scopes.webBrowser.$apply(function () { global.scopes.webBrowser.gGalleries[global.scopes.webBrowser.gGalleries.length] = gallery; });
        },
        GalleryData: function (id) {
            this._id = id;
            this.path = "";
            this.sizeBytes = 0;
            this.numFiles = 0;
            this.numDirs = 0;
        },
        errorPrintFactory: function (custom) {
            return function (e) {
                var msg = '';

                switch (e.code) {
                    case $scope.MedialLibrary.FileError.QUOTA_EXCEEDED_ERR:
                        msg = 'QUOTA_EXCEEDED_ERR';
                        break;
                    case $scope.MedialLibrary.FileError.NOT_FOUND_ERR:
                        msg = 'NOT_FOUND_ERR';
                        break;
                    case $scope.MedialLibrary.FileError.SECURITY_ERR:
                        msg = 'SECURITY_ERR';
                        break;
                    case $scope.MedialLibrary.FileError.INVALID_MODIFICATION_ERR:
                        msg = 'INVALID_MODIFICATION_ERR';
                        break;
                    case $scope.MedialLibrary.FileError.INVALID_STATE_ERR:
                        msg = 'INVALID_STATE_ERR';
                        break;
                    default:
                        msg = 'Unknown Error';
                        break;
                }
                ;
            };
        },
        scanGallery: function (entries) {
            // when the size of the entries array is 0, we've processed all the directory contents
            if (entries.length == 0) {
                if ($scope.MedialLibrary.gDirectories.length > 0) {
                    var dir_entry = $scope.MedialLibrary.gDirectories.shift();
                    $scope.MedialLibrary.gGalleryReader = dir_entry.createReader();
                    $scope.MedialLibrary.gGalleryReader.readEntries($scope.MedialLibrary.scanGallery, $scope.MedialLibrary.errorPrintFactory('readEntries'));
                } else {
                    $scope.MedialLibrary.gGalleryIndex++;
                    if ($scope.MedialLibrary.gGalleryIndex < $scope.gGalleryArray.length) {
                        $scope.MedialLibrary.scanGalleries($scope.gGalleryArray[$scope.MedialLibrary.gGalleryIndex]);
                    }
                }
                return;
            }
            var fileType;
            var fileExtension;
            for (var i = 0; i < entries.length; i++) {
                fileType = $scope.MedialLibrary.getFileType(entries[i].fullPath);
                if (entries[i].isFile && fileType == "video") {
                    fileExtension = entries[i].name.substr(entries[i].name.lastIndexOf('.') + 1);
                    if (fileExtension == 'mp4') {
                        $scope.MedialLibrary.addItem(entries[i]);
                        $scope.MedialLibrary.gGalleryData[$scope.MedialLibrary.gGalleryIndex].numFiles++;
                        (function (galData) {
                            entries[i].getMetadata(function (metadata) {
                                galData.sizeBytes += metadata.size;
                            });
                        }($scope.MedialLibrary.gGalleryData[$scope.MedialLibrary.gGalleryIndex]));
                    } else {
                        console.log("Other formats of VIDEO are present in the specified folders.");
                    }
                } else if (entries[i].isDirectory) {
                    $scope.MedialLibrary.gDirectories.push(entries[i]);
                } else {
                    console.log("Other formats are present in the specified folders.");
                }
            }
            // readEntries has to be called until it returns an empty array. According to the spec,
            // the function might not return all of the directory's contents during a given call.
            $scope.MedialLibrary.gGalleryReader.readEntries($scope.MedialLibrary.scanGallery, $scope.MedialLibrary.errorPrintFactory('readMoreEntries'));
        },
        getFileType: function (filename) {
            var ext = filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();
            if ($scope.MedialLibrary.imgFormats.indexOf(ext) >= 0)
                return "image";
            else if ($scope.MedialLibrary.audFormats.indexOf(ext) >= 0)
                return "audio";
            else if ($scope.MedialLibrary.vidFormats.indexOf(ext) >= 0)
                return "video";
            else return null;
        },
        addItem: function (itemEntry) {
            if (itemEntry.isFile) {
                var mData = $scope.mediaGallery.getMetadata(itemEntry.filesystem);
                var item = { entry: itemEntry, mData: mData };
                global.scopes.webBrowser.$apply(function () { global.scopes.webBrowser.gItems[global.scopes.webBrowser.gItems.length] = item; });
            }
        }
    };

    $scope.openUrl = function (openLinkInBrowser) {
        GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'openUrl=' + openLinkInBrowser);

        if (openLinkInBrowser.indexOf("://", 0) == -1) openLinkInBrowser = "http://" + openLinkInBrowser;

        global.scopes.swapcast.Requests.pageChange($scope.browserUrl, openLinkInBrowser);

        $scope.browserUrl = openLinkInBrowser;

        var defaultTabs = $scope.TabsOfUser.DefaultTabs;

        if (global.scopes.swapcast.swapSettings.UserProfile != null && global.scopes.swapcast.swapSettings.UserProfile != undefined) {
            $scope.storage.get('urlHistory' + global.scopes.swapcast.swapSettings.UserProfile.UserId, function(obj) {
                var history = undefined;
                history = obj['urlHistory' + global.scopes.swapcast.swapSettings.UserProfile.UserId];

                if (typeof history != 'undefined') {
                    if (history.filter(function(x) { return x == openLinkInBrowser; }).length == 0) {
                        history.push(openLinkInBrowser);
                        var ob = {};
                        ob['urlHistory' + global.scopes.swapcast.swapSettings.UserProfile.UserId] = history;
                        global.scopes.webBrowser.storage.set(ob, function() {});
                    }
                } else {
                    var object = {};
                    object['urlHistory' + global.scopes.swapcast.swapSettings.UserProfile.UserId] = [];
                    object['urlHistory' + global.scopes.swapcast.swapSettings.UserProfile.UserId].push(openLinkInBrowser);
                    global.scopes.webBrowser.storage.set(object, function() {});
                }
            });
        }

        for (var i = 0; i < defaultTabs.length; i++) {
            if (defaultTabs[i].Class == "mainTab favoriteTabs activeTab") {

                var idTab = defaultTabs[i].Id;

                //check if this tab 'New Tab'
                if (defaultTabs[i].Link == "about:blank") {
                    defaultTabs[i].Link = openLinkInBrowser;
                    //get title
                    //save tabs to storage
                    $scope.SaveTabsToStorage();
                } else {
                    // add link to history of this link 
                    defaultTabs[i].Link = openLinkInBrowser;
                    defaultTabs[i].Title = openLinkInBrowser.split('/')[2];

                    var historyOfTabs = $scope.historyOfTabs;
                    if (typeof historyOfTabs[idTab] == 'undefined') {
                        historyOfTabs[idTab] = new Array();
                        var defaultTab = { Link: defaultTabs[i].Link, IsCurrentTab: false };
                        historyOfTabs[idTab].push(defaultTab);
                    }

                    //delete from tab all 'currentTab'
                    for (var y = 0; y < historyOfTabs[idTab].length; y++) {
                        if (historyOfTabs[idTab][y].IsCurrentTab == true) {
                            historyOfTabs[idTab][y].IsCurrentTab = false;
                        }
                    }

                    var currentTab = { Link: openLinkInBrowser, IsCurrentTab: true };
                    historyOfTabs[idTab].push(currentTab);
                    $scope.displayNextBut = $scope.DisplayNextButton();
                    $scope.displayPrevBut = $scope.DisplayPrevButton();
                }
            }
        }
    };

    $scope.getTabFavIcon = function (tab) {
        return { Exist: false, Data: "" };
    };

    //Open Link In Browser
    $scope.openLink = function (id) {
        if (AnimationManager.isAnimationNow) return;

        GoogleAnalyticsManager.tracker.sendAppView('BrowserView');

        GridManager.showGrid("#browserGrid", "#myLibraryMedia, #signUpGrid");

        $(".tabsArea").find(".main-tab").removeClass('activeMainTab');

        $("#browserTabs li.activeTab").removeClass('activeTab');

        var additionalClass = $("#browserTabs > .width9percent").length > 0 ? " width9percent" : "";

        //delete 'active' of each tab from 'Default tabs' & add 'active' to current;
        var defaultTabs = $scope.TabsOfUser.DefaultTabs;

        for (var i = 0; i < defaultTabs.length; i++) {
            defaultTabs[i].Class = "mainTab favoriteTabs" + additionalClass;
            if (defaultTabs[i].Id == id) {

                //check if this tab has a history
                var historyOfTabs = $scope.historyOfTabs;
                if (typeof historyOfTabs[id] == 'undefined') {
                    // Has no history
                    GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'OpenLink=' + defaultTabs[i].Link);

                    $scope.browserUrl = defaultTabs[i].Link;

                    global.scopes.webBrowser.openLinkInBrowser = defaultTabs[i].Link;

                } else {
                    // this tab has history.
                    var historyTab = historyOfTabs[id];

                    // show current tab from history
                    for (var z = 0; z < historyTab.length; z++) {
                        if (historyTab[z].IsCurrentTab == true) {
                            GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'OpenLink=' + historyTab[z].Link);

                            $scope.browserUrl = historyTab[z].Link;
                            global.scopes.webBrowser.openLinkInBrowser = historyTab[z].Link;
                        }
                    }
                }

                defaultTabs[i].Class = "mainTab favoriteTabs activeTab" + additionalClass;
                global.scopes.swapcast.activeMainTab = defaultTabs[i].Id;
                $scope.displayNextBut = $scope.DisplayNextButton();
                $scope.displayPrevBut = $scope.DisplayPrevButton();
            }
        }

        //save tabs to storage
        $scope.SaveTabsToStorage();
    };

    

    // Show browser drop down menu
    $scope.showBrowserDDL = function ($event) {
        Utils.hideAllDropDownLists();
        $("#div-browser-drop-down-menu").show();

        $event.stopImmediatePropagation();

        $("*").off("click", $scope.hideBrowserDDL);
        $("*").not("#div-browser-menu-button, #div-browser-drop-down-menu, #div-browser-drop-down-menu div").on("click", $scope.hideBrowserDDL);
    };

    // Hide browser drop down menu
    $scope.hideBrowserDDL = function () {
        if ($("#div-browser-drop-down-menu:visible").length > 0) {
            $("#div-browser-drop-down-menu").hide();
            $("*").off("click", $scope.hideBrowserDDL);
        }
    };

    // Show New Chat panel
    $scope.showNewChatPanel = function () {
        var current = $('.block:visible').first().attr('id');

        $("#div-browser-drop-down-menu").hide();

        $("*").off("click", $scope.hideBrowserDDL);

        $scope.Slide('#' + current, '#block-new-chat');
    };

    // Start video chat
    $scope.startVideoChatFromBrowser = function () {
        // If video chat is not opened and the group chat is opened
        if (!$scope.Functions.videoChatOpened() && $('.block:visible').first().attr('id') == "block-my-secret-room") {


            global.scopes.swapcast.messages.tempGroupId = global.scopes.swapcast.messages.selectedGroup.GroupId;

            $scope.Functions.startVideoChat();
        }
    };

    // Start screen share
    $scope.startScreenShareFromBrowser = function () {
        // If screen share is not opened and the group chat is opened
        if (!$scope.Functions.screenSharingOpened() && $('.block:visible').first().attr('id') == "block-my-secret-room") {
            $("#div-browser-drop-down-menu").hide();
            $("*").off("click", $scope.hideBrowserDDL);

            global.scopes.swapcast.messages.tempGroupId = global.scopes.swapcast.messages.selectedGroup.GroupId;

            $scope.tryToStartScreenSharing();
        }
    };

    $scope.sendScreenCapture = function () {
        FileSendManager.sendScreenCapture();
    };

    // List of chat to share the link
    $scope.chatsAndFriendsForLinkSharing = {
        GroupsIds: [],
        FriendsIds: []
    };

    $scope.isSharingLink = false;

    $scope.shareLink = function (groupId) {
        global.scopes.webBrowser.sharedLinks.sharingLinkTitle = $('.modal-body-shareit').find('input').val();
        var message = {
            GroupId: groupId,
            "LinkTitle": global.scopes.webBrowser.sharedLinks.sharingLinkTitle != "" ? global.scopes.webBrowser.sharedLinks.sharingLinkTitle : "",
            // "LinkTitle": global.scopes.webBrowser.sharedLinks.sharingLinkTitle != "" ? global.scopes.webBrowser.sharedLinks.sharingLinkTitle : global.scopes.webBrowser.openLinkInBrowser,
            "LinkUrl": global.scopes.webBrowser.openLinkInBrowser,
            UserPosted: global.scopes.swapcast.swapSettings.UserProfile.UserId,
            MessageClientId: global.scopes.messages.generateKey()
        };
        global.scopes.webBrowser.Requests.postMessage(message);

        if (global.scopes.webBrowser.chatsAndFriendsForLinkSharing.FriendsIds.length == 0)
            global.scopes.webBrowser.isSharingLink = false;
    };

    $scope.shareLinkWithFriend = function () {
        if (global.scopes.webBrowser.chatsAndFriendsForLinkSharing.FriendsIds.length == 0) {
            var userId = global.scopes.webBrowser.chatsAndFriendsForLinkSharing.FriendsIds.pop();
            global.scopes.webBrowser.Requests.createMessageGroup(userId);
        }
    };

    $scope.startLinkSharing = function () {
        GoogleAnalyticsManager.tracker.sendEvent('ShareLinkModalView', 'ShareLink');

        global.scopes.webBrowser.chatsAndFriendsForLinkSharing.GroupsIds.map($scope.shareLink);

        if (global.scopes.webBrowser.chatsAndFriendsForLinkSharing.FriendsIds.length > 0) {
            global.scopes.webBrowser.isSharingLink = true;
            global.scopes.webBrowser.shareLinkWithFriend();
        }

        $("#shareModalDialog").modal("hide");
    };

    $scope.shareLinkWithFacebookFriends = function () {
        global.scopes.webBrowser.AddNewTab('http://apps.swapcast.com/Home/SocialPost?shareLinkMode=true'
            + '&url=' + encodeURIComponent(global.scopes.webBrowser.openLinkInBrowser)
            + '&title=' + encodeURIComponent($('.activeTab .tab-content-title').text())
            + '&comment=' + encodeURIComponent(global.scopes.webBrowser.sharedLinks.sharingLinkTitle));

        $("#shareModalDialog").modal("hide");
    };

    $scope.saveGroupToShareLink = function (chat, evt) {
        var isAdded = false;

        var isGroup = typeof (chat.GroupId) != "undefined";

        var id = isGroup ? chat.GroupId : chat.UserId;

        var collectionName = isGroup ? "GroupsIds" : "FriendsIds";

        var chats = global.scopes.webBrowser.chatsAndFriendsForLinkSharing;

        // Check if this chat is already selected
        isAdded = chats[collectionName].some(function (x) { return x == id; });

        // Add or remove entity ID
        if (isAdded)
            chats[collectionName] = chats[collectionName].filter(function (x) { return x != id; });
        else
            chats[collectionName].push(id);

        // Change check box style
        if (isAdded)
            $(evt.target).removeClass("selected");
        else
            $(evt.target).addClass("selected");
    };

    //Show Share modal dialog
    $scope.showShareModalDialog = function () {
        // Check if user is authenticated
        if (global.scopes.swapcast.swapSettings.UserProfile == null || global.scopes.swapcast.swapSettings.UserProfile.UserId == null) return;

        global.scopes.swapcast.composeMessageGroupsAndFriendsChats();

        $scope.sharedLinks.sharingLinkTitle = "";

        // Reset arrays
        $scope.groupIdsForShareLink = [];
        global.scopes.webBrowser.chatsAndFriendsForLinkSharing.GroupsIds = [];
        global.scopes.webBrowser.chatsAndFriendsForLinkSharing.FriendsIds = [];

        GoogleAnalyticsManager.tracker.sendAppView('ShareLinkModalView');
        $('.modal-body-shareit').find('input').val('');
        $("#shareModalDialog").modal('show');

        // On modal has finished being hidden from the user
        $('#shareModalDialog').off('hidden.bs.modal');
        $('#shareModalDialog').on('hidden.bs.modal', function (e) {
            // Reset all checkboxes
            $(".div-share-checkbox.selected").removeClass("selected");

            // Reset share items filter state
            var scope = angular.element($('#input-filter-share-items').get(0)).scope();
            scope.$apply(function () {
                scope.filterShareItemsString = '';
            });
        });
    };

    $scope.isMyFriendsButtonDisabled = false;
    $scope.isAddFriendButtonDisabled = false;
    $scope.needToCreateChatBeforeResourceSharing = false;

    $scope.$on("onScopeVariableChanged", function (event, args) {
        $scope.safeApply(function () {
            $scope[args.propertyName] = args.propertyValue;
        });
    });

    $scope.showMyFriendsPanel = function () {
        if (!$scope.isMyFriendsButtonDisabled) {
            global.scopes.swapcast.showChatPannel();
            global.scopes.swapcast.Slide(global.scopes.swapcast.currentArea, "#block-my-friends");
        }
    };

    $scope.showAddFriendPanel = function () {
        if (!$scope.isAddFriendButtonDisabled) {
            global.scopes.swapcast.showChatPannel();
            global.scopes.swapcast.Slide(global.scopes.swapcast.currentArea, "#block-add-friends");
        }
    };

    $scope.hideChatsDropDownList = function () {
        if ($("#div-chats-drop-down-list:visible").length > 0) {
            $("#div-chats-drop-down-list").hide();
            $("*").off("click", $scope.hideChatsDropDownList);
        }
    };

    $scope.showChatsDropDownList = function (top, left, operationType, $event) {
        // If top menu has been minimized to circle buttons only
        if ($(".div-top-menu-buttons-wrap").width() == 198) {
            switch (operationType) {
                case 1:
                    left = -130;
                    break;
                case 2:
                    left = -62;
                    break;
                case 3:
                    left = -96;
                    break;
            }
        }

        global.scopes.swapcast.composeMessageGroupsAndFriendsChats();

        Utils.hideAllDropDownLists();
        $("#div-chats-drop-down-list").show();

        $event.stopImmediatePropagation();

        $("*").off("click", $scope.hideChatsDropDownList);
        $("*").not($event.target)
            .not("#div-chats-drop-down-list, #div-chats-drop-down-list div, #div-chats-drop-down-list img")
            .on("click", $scope.hideChatsDropDownList);

        $("#div-chats-drop-down-list").css({
            top: top + "px",
            left: left + "px"
        });

        global.scopes.webBrowser.selectedDropDownListType = operationType;
    };

    $scope.getChatName = function (obj) {
        if (typeof (obj.UserId) != "undefined") {
            var name = (obj.FirstName == null ? "" : obj.FirstName) + " " + (obj.LastName == null ? "" : obj.LastName);
            return name == " " ? obj.Email : name;
        } else
            return obj.Title;
    };

    $scope.getChatAvatar = function(chat) {
        if (typeof (chat.UserId) != "undefined")
            return $scope.usersImages[chat.UserId];

        var usersCount = 0;
        var usersInChat = [];

        if (global.scopes.swapcast.swapSettings.UserProfile != null) {
            var currentUserId = global.scopes.swapcast.swapSettings.UserProfile.UserId;

            usersInChat = chat.Participants.filter(function(element) {
                return element.UserId != currentUserId;
            });

            usersCount = usersInChat.length;
        }

        if (usersCount == 1)
            return $scope.usersImages[usersInChat[0].UserId];

        return "css/img/mainfeed.png";
    };

    // Show 'Share It' Modal
    $scope.showShareItModal = function (favorite) {
        global.scopes.swapcast.isGroupSelected = $("#block-my-secret-room").is(':visible');

        if (global.scopes.swapcast.swapSettings.UserProfile.UserId != null) {
            global.scopes.webBrowser.sharedLinks.openLinkName = favorite.Url;
            global.scopes.webBrowser.sharedLinks.sharingLinkTitle = favorite.Title;
            $('.modal-body-shareit').find('input').val('');
            $("#shareItModal").modal('show');
        } SendSharingLink
    };
    //Send Sharing Link
    $scope.SendSharingLink = function () {
        if ($scope.sharedLinks.sharingLinkTitle == "")
            $scope.sharedLinks.sharingLinkTitle = global.scopes.webBrowser.sharedLinks.openLinkName;
        var message = {
            GroupId: $scope.isGroupSelected ? global.scopes.swapcast.messages.selectedGroup.GroupId : -1,
            "LinkTitle": $scope.sharedLinks.sharingLinkTitle,
            "LinkUrl": global.scopes.webBrowser.sharedLinks.openLinkName,
            UserPosted: global.scopes.swapcast.swapSettings.UserProfile.UserId,
            MessageClientId: global.scopes.messages.generateKey()
        };

        $scope.Requests.postMessage(message);
        $scope.sharedLinks.sharingLinkTitle = "";
        $("#shareItModal").modal('hide');
    };

    $scope.tryToStartScreenSharing = function () {
        // If user tries to create the same conference again
        if (global.scopes.videoChat._screenOpened
            && (global.scopes.videoChat._conferenceGroup == global.scopes.swapcast.messages.selectedGroup.GroupId)) {
            if ($('#remoteScreenShareTab').length > 0) {
                global.scopes.swapcast.needToJoinToConference = false;
                global.scopes.swapcast.needToOpenVideoChat = false;

                global.scopes.videoChat.showConferenceAlert();
            }
            return;
        }

        // If user tries to start another conference when the current one is still running
        if ((global.scopes.videoChat._videoChatOpened || global.scopes.videoChat._screenOpened) && global.scopes.swapcast.messages.selectedGroup.GroupId != global.scopes.videoChat._conferenceGroup) {
            global.scopes.swapcast.needToJoinToConference = false;
            global.scopes.swapcast.needToOpenVideoChat = false;

            global.scopes.videoChat.showConferenceAlert();

            return;
        } else {
            $scope.startScreenSharing();
        }
    };

    $scope.startScreenSharing = function () {
        return; // no ability to share screen with web App.
        if (global.scopes.swapcast.messages.tempGroupId != undefined) global.scopes.swapcast.safeApply(function () {
            global.scopes.swapcast.messages.selectedGroup.GroupId = global.scopes.swapcast.messages.tempGroupId;
            global.scopes.swapcast.isGroupSelected = global.scopes.swapcast.messages.tempGroupId != -1;
            global.scopes.swapcast.messages.tempGroupId = undefined;

            if (global.scopes.swapcast.messages.selectedGroup.GroupId == -1)
                global.scopes.swapcast.Slide(global.scopes.swapcast.currentArea, "#block-main-feed");
            else
                global.scopes.swapcast.Slide(global.scopes.swapcast.currentArea, "#block-my-secret-room");

            global.scopes.messages.getMessages(global.scopes.swapcast.messages.selectedGroup.GroupId, true);
        });
        global.scopes.videoChat.openScreenSharingAsInitiator(function () {
            var message = {
                GroupId: $scope.isGroupSelected ? global.scopes.swapcast.messages.selectedGroup.GroupId : -1,
                MessageText: "",
                ConferenceInfo: {
                    Type: 1
                },
                UserPosted: global.scopes.swapcast.swapSettings.UserProfile.UserId,
                MessageClientId: global.scopes.messages.generateKey()
            };

            global.scopes.videoChat._conferenceGroup = message.GroupId;

            global.scopes.swapcast.Requests.postMessage(message);
        });
    };

    $scope.closeScreenSharing = function () {
        global.scopes.videoChat.closeScreenSharing();
        if(global.scopes.swapcast.isSmallWindow())
            $('#container-left').removeClass('hide');
    };

    //Show 'Add To Favorite' Modal
    $scope.showAddToFavoriteModal = function () {
        if (global.scopes.swapcast.swapSettings.UserProfile != null && global.scopes.swapcast.swapSettings.UserProfile.UserId != null) {
            GoogleAnalyticsManager.tracker.sendAppView('AddToFavoriteModalView');
            // clear text fields
            $scope.safeApply(function () {
                global.scopes.webBrowser.sharedLinks.sharingLinkTitle = '';
                global.scopes.webBrowser.sharedLinks.openLinkName = '';
            });
            $('.add-to-fav-modal-body').find('input').val('');

            $("#AddFavoriteModal").modal('show');
        }
    };

    //Add link to favorite
    $scope.AddFavoriteLink = function () {
        var title = this.sharedLinks.sharingLinkTitle;
        var url = this.sharedLinks.openLinkName;

        var errMess = "";
        if (title === "" || title == null) {
            errMess += "Title shouldn't be empty\r\n";
        }

        if (url === "" || url == null) {
            errMess += "Url shouldn't be empty\r\n";
        }

        if (errMess === "") {
            var request = {
                Favorite: {
                    Title: title,
                    Url: url,
                },
            };

            GoogleAnalyticsManager.tracker.sendEvent('AddToFavoriteModalView', 'AddFavoriteLink');

            $scope.Requests.addFavorite(request);
            this.sharedLinks.sharingLinkTitle = "";
            this.sharedLinks.openLinkName = "";
            $("#AddFavoriteModal").modal("hide");
        } else {
            global.scopes.swapcast.Functions.showAlert(errMess);
        }
    };

    $scope.showProfile = function () {
        GridManager.showGrid("#myProfileGrid");
    };

    $scope.Functions = {
        asActiveTabs: function () {
            return $('#browserGrid').hasClass('hide');
        },

        asHomeTab: function () {
            return !$('#myHomeGrid').hasClass('hide') || !$('#myLibraryGrid').hasClass('hide') || !$('#myFavoriteGrid').hasClass('hide');
        },

        asChatTab: function () {
            return $('#videoChatGrid').hasClass('hide');
        },

        startVideoChat: function () {
            global.scopes.messages.tryToStartVideoChat();
        },

        videoChatOpened: function () {
            return global.scopes.videoChat._videoChatOpened;
        },

        screenSharingOpened: function () {
            return global.scopes.videoChat._screenOpened;
        },
        showHomePage: function() {
            $("#myHomeGrid").css({'z-index':'999'});
            // GridManager.showGrid("#myHomeGrid");
            $('.home-mobile-item').addClass('hide');
            $('.chat-mobile-item').removeClass('hide');
        },

        //show My Library
        showMyLibrary: function () {
            if (AnimationManager.isAnimationNow) return;

            GoogleAnalyticsManager.tracker.sendAppView('HomeSectionView');

            global.scopes.swapcast.activeMainTab = 0;

            if (!global.scopes.swapcast.IsAuthorized()) {
                $(".tabsArea").find('li.activeTab').removeClass('activeTab');

                GridManager.showGrid("#signUpGrid", "#myLibraryMedia");

                return;
            }
            
            $(".tabsArea").find('li.activeTab').removeClass('activeTab');
            $(".tabsArea").find(".main-tab").addClass('activeMainTab');

            GridManager.showGrid("#myHomeGrid", "#myLibraryMedia, #signUpGrid");
        },
        showChatsPage: function() {
            //$("#myHomeGrid").css({'z-index':'-999'});
            // $("#myHomeGrid").css({'display':'none'});
            $("#container-left").removeClass('hide').css({'display':'block'});
            // $("#container-left").css({'display':'block'});
            $('.home-mobile-item').removeClass('hide');
            // $('.home-mobile-item').css({'display':'block'});
            $('.chat-mobile-item').addClass('hide');
            // $('.chat-mobile-item').css({'display':'none'});
        },
        showLib: function (interactive) {
            $("#myHomeGrid, #myFavoriteGrid, #myLibraryMedia").addClass("hide");

            $("#myLibraryGrid").removeClass("hide");

            if (interactive == "yes") {
                if (typeof ($("#a-my-library-refresh").prop("disabled")) != "undefined") return;

                // Refresh link is pressed
                $("#a-my-library-refresh").addClass("dis");
                $("#a-my-library").removeClass("dis");

                $("#a-my-library-refresh").prop("disabled", "disabled");
                $("#a-my-library").removeProp("disabled");
            } else {
                if (typeof ($("#a-my-library").prop("disabled")) != "undefined") return;

                // My library link is pressed
                $("#a-my-library").addClass("dis");
                $("#a-my-library-refresh").removeClass("dis");

                $("#a-my-library").prop("disabled", "disabled");
                $("#a-my-library-refresh").removeProp("disabled");
            }

            $scope.clearLibraryData();
            $scope.MedialLibrary.selectFolder(interactive);
        },

        showFav: function () {
            GoogleAnalyticsManager.tracker.sendAppView('FavoritesSectionView');

            $("#myLibraryGrid, #myHomeGrid, #myLibraryMedia").addClass("hide");
            $("#myFavoriteGrid").removeClass("hide");
        }
    };

    $scope.clearLibraryData = function () {
        global.scopes.webBrowser.gGalleries = new Array();
        global.scopes.webBrowser.gItems = new Array();
    };

    //Show 'More Tabs' Modal
    $scope.ShowMoreTabsModal = function () {
        var y = $('#arrows').offset().top + ($('#arrows').height() / 2) + 8;
        var x = $('#arrows').offset().left - $('#drop-down-more-tabs').width() + ($('#arrows').width() / 2) + 18;

        $('#drop-down-more-tabs').css({ 'top': 'auto', 'left': 'auto' });
        $('#drop-down-more-tabs').offset({ top: y, left: x });
        $('#drop-down-more-tabs').toggle();
    };

    //mouse leave from drop down
    $('#container-right').on("mouseleave", "#drop-down-more-tabs", function () {
        $('#drop-down-more-tabs').hide();
        $('#drop-down-more-tabs').css({ 'top': 'auto', 'left': 'auto' });
    });

    //Add new tab
    $scope.AddNewTab = function (link) {
        if (AnimationManager.isAnimationNow) return;

        GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'AddNewTab=' + link);

        var title;
        if (link == undefined) {
            link = "about:blank";
            title = "New Tab";
        } else {
            if (link.indexOf("://", 0) == -1) link = "http://" + link;
            title = link.split('/')[2];
        }
        //delete 'activeTab' class from each tab of defaultTabs  
        for (var i = 0; i < $scope.TabsOfUser.DefaultTabs.length; i++) {
            $scope.TabsOfUser.DefaultTabs[i].Class = "mainTab favoriteTabs";
        }

        $("#browserTabs li.activeTab").removeClass('activeTab');
        $("#browserTabs").find(".activeMainTab").removeClass('activeMainTab');

        GridManager.showGrid("#browserGrid");

        // add new tab to array 'Default Tabs'
        var newId = $scope.TabsOfUser.NewId++;
        global.scopes.swapcast.activeMainTab = newId;
        $scope.displayNextBut = $scope.DisplayNextButton();
        $scope.displayPrevBut = $scope.DisplayPrevButton();
        var newTab = { Id: newId, Class: "mainTab favoriteTabs activeTab", Link: link, Title: title, IsNewTab: true };

        //check if exist place for new tab, logic when there is no free place.

        $scope.hideFirstDefaultTabIfSpaceNeeded();

        $scope.TabsOfUser.DefaultTabs.push(newTab);

        $('#browser').attr('src', link);
        $scope.openLinkInBrowser = link;
        //save tabs to storage
        $scope.SaveTabsToStorage();
    };

    $scope.mobileTabId = null;
    $scope.desktopTabId = null;

    $scope.OpenTabUnlogined = function(tabId) {
        $("#browserTabs li.activeTab").removeClass('activeTab');
        $("#browserTabs").find(".activeMainTab").removeClass('activeMainTab');

        GridManager.showGrid('#browserGrid', '#signUpGrid');

        // delete 'active' of each tab from 'Default tabs' & add 'active' to current;
        var defaultTabs = $scope.TabsOfUser.DefaultTabs;

        for (var i = 0; i < defaultTabs.length; i++) {
            defaultTabs[i].Class = "mainTab favoriteTabs";

            if (defaultTabs[i].Id == tabId) {
                $scope.browserUrl = defaultTabs[i].Link;

                global.scopes.webBrowser.openLinkInBrowser = defaultTabs[i].Link;

                defaultTabs[i].Class = "mainTab favoriteTabs activeTab";

                $('#browserTabs > [id="' + defaultTabs[i].Id + '"]').addClass('activeTab');

                global.scopes.swapcast.activeMainTab = defaultTabs[i].Id;

                $scope.displayNextBut = $scope.DisplayNextButton();
                $scope.displayPrevBut = $scope.DisplayPrevButton();
            }
        }
    };

    $scope.AddAndOpenNewTabUnlogined = function (link, isMobile) {
        // Open existing mobile tab
        if (isMobile && $scope.mobileTabId != null) {
            $scope.OpenTabUnlogined($scope.mobileTabId);
            return;
        }

        // Open existing desktop tab
        if (!isMobile && $scope.desktopTabId != null) {
            $scope.OpenTabUnlogined($scope.desktopTabId);
            return;
        }

        if (link.indexOf('://', 0) == -1) link = 'http://' + link;

        var title = link.split('/')[2];

        // delete 'activeTab' class from each tab of defaultTabs  
        for (var i = 0; i < $scope.TabsOfUser.DefaultTabs.length; i++) {
            $scope.TabsOfUser.DefaultTabs[i].Class = 'mainTab favoriteTabs';
        }

        $("#browserTabs li.activeTab").removeClass('activeTab');
        $("#browserTabs").find(".activeMainTab").removeClass('activeMainTab');

        GridManager.showGrid('#browserGrid', '#signUpGrid');

        // add new tab to array 'Default Tabs'
        var newId = $scope.TabsOfUser.NewId++;
        
        if (isMobile) global.scopes.webBrowser.mobileTabId = newId; // save mobile tab ID
        if (!isMobile) global.scopes.webBrowser.desktopTabId = newId; // save desktop tab ID

        $scope.displayNextBut = $scope.DisplayNextButton();
        $scope.displayPrevBut = $scope.DisplayPrevButton();

        var newTab = { Id: newId, Class: 'mainTab favoriteTabs activeTab', Link: link, Title: title, IsNewTab: true };

        // check if exist place for new tab, logic when there is no free place.
        $scope.hideFirstDefaultTabIfSpaceNeeded();

        $scope.TabsOfUser.DefaultTabs.push(newTab);

        $('#browser').attr('src', link);

        $scope.openLinkInBrowser = link;
    };

    $scope.SetActiveTab = function (tab) {
        $scope.openLinkInBrowser = tab.Link;

        $scope.browserUrl = tab.Link;

        global.scopes.swapcast.activeMainTab = tab.Id;

        $scope.displayNextBut = $scope.DisplayNextButton();
        $scope.displayPrevBut = $scope.DisplayPrevButton();

        tab.Class = "mainTab favoriteTabs activeTab";
    };

    //Close Tabs
    $scope.CloseTab = function (tabId) {
        if (AnimationManager.isAnimationNow) return;

        if (!global.scopes.swapcast.IsAuthorized()) return;

        GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'CloseTab');

        var defaultTabs = $scope.TabsOfUser.DefaultTabs;

        for (var i = 0; i < defaultTabs.length; i++) {
            // Find tab that should be closed
            if (defaultTabs[i].Id == tabId) {
                var moreTabs = $scope.TabsOfUser.MoreTabs;

                var tab = defaultTabs[i];

                // If we are closing active tab remove appropriate CSS class
                tab.Class = tab.Class.replace('activeTab', '');

                if (FullScreenManager.lastBoundUrl == defaultTabs[i].Link)
                    FullScreenManager.lastBoundUrl = null;

                // Delete tab from 'Default Tabs'
                $scope.TabsOfUser.DefaultTabs.splice(i, 1);

                // Cut tab from 'More Tabs' and put him to start of 'Default tabs', if it 'Is New Tab'
                if (moreTabs.length > 0) {
                    // Delete first tab from More Tabs
                    var firstFromMoreTabs = (moreTabs.splice(0, 1))[0];

                    // Add to the end of Default Tabs
                    $scope.TabsOfUser.DefaultTabs.push(firstFromMoreTabs);
                }

                // If we are closing active tab set another active tab
                if (tab.Id == global.scopes.swapcast.activeMainTab) {
                    // If there is no default tabs set home tab as active
                    if ($scope.TabsOfUser.DefaultTabs.length == 0) {
                        $scope.Functions.showMyLibrary();
                    } else {
                        $scope.SetActiveTab($scope.TabsOfUser.DefaultTabs[$scope.TabsOfUser.DefaultTabs.length > i ? i : i - 1]);
                    }
                }

                global.scopes.swapcast.Requests.pageClose(tab.Link);
            }
        }

        //save tabs to storage
        $scope.SaveTabsToStorage();
    };

    //Open tab from array 'More Tabs'
    $scope.openTabFromMoreTabs = function (tabId) {
        var moreTabs = $scope.TabsOfUser.MoreTabs;

        for (var i = 0; i < moreTabs.length; i++) {
            if (moreTabs[i].Id == tabId) {
                var tab = moreTabs[i];

                //delete tab from 'More Tabs'
                moreTabs.splice(i, 1);

                //remove old active tab and add new active tab
                global.scopes.swapcast.activeMainTab = tab.Id;
                $scope.displayNextBut = $scope.DisplayNextButton();
                $scope.displayPrevBut = $scope.DisplayPrevButton();

                //check if this tab has a history
                var historyOfTabs = $scope.historyOfTabs;
                if (typeof historyOfTabs[tab.Id] == 'undefined') { //has no histiry
                    $scope.openLinkInBrowser = tab.Link;
                    $scope.browserUrl = tab.Link;
                } else { // this tab has history.
                    var historyTab = historyOfTabs[tab.Id];

                    //show current tab from history
                    for (var z = 0; z < historyTab.length; z++) {
                        if (historyTab[z].IsCurrentTab == true) {
                            $scope.browserUrl = historyTab[z].Link;
                            $scope.openLinkInBrowser = historyTab[z].Link;
                        }
                    }
                }

                $('#drop-down-more-tabs').hide();

                $("#browserTabs li.activeTab").removeClass('activeTab');
                $("li.activeMainTab").removeClass("activeMainTab");

                $("#myHomeGrid, #myFavoriteGrid, #myLibraryGrid").addClass('hide');
                $("#browserGrid").removeClass('hide');

                //delete 'activeTab' class from each tab of defaultTabs  
                for (var y = 0; y < $scope.TabsOfUser.DefaultTabs.length; y++) {
                    $scope.TabsOfUser.DefaultTabs[y].Class = "mainTab favoriteTabs";
                }

                //add tab to 'Default Tabs'
                tab.Class = "mainTab favoriteTabs activeTab";

                //check if exist place for new tab, logic when there is no free place.

                $scope.hideFirstDefaultTabIfSpaceNeeded();

                $scope.TabsOfUser.DefaultTabs.push(tab);

                $scope.openLinkInBrowser = tab.Link;
                $scope.browserUrl = tab.Link;

                break;
            }
        }

        //save tabs to storage
        $scope.SaveTabsToStorage();
    };

    //Check if exist more tabs some links
    $scope.hasMoreTabs = function () {
        if ($scope.TabsOfUser != undefined) {
            if ($scope.TabsOfUser.MoreTabs.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    };

    $scope.hideFirstDefaultTabIfSpaceNeeded = function () {
        if (global.scopes.webBrowser.IsExistPlaceForTab() == false) {
            var firstTab = global.scopes.webBrowser.TabsOfUser.DefaultTabs[0];
            
            global.scopes.webBrowser.TabsOfUser.MoreTabs.push(firstTab);

            global.scopes.webBrowser.TabsOfUser.DefaultTabs.splice(0, 1);
        }
    };

    //Check if exist place for new Tab
    $scope.IsExistPlaceForTab = function () {
        var browserTabsWidth = $('#browserTabs').width();

        if ($("#browserTabs > li.favoriteTabs:first").length == 0) return true;

        var tabWidth = $('#browserTabs > li:first').width();

        var tabsWidht = tabWidth / 2;

        $('#browserTabs > li').each(function (ind, element) { tabsWidht += ($(element).width() - 14); });

        var freeSpace = browserTabsWidth - tabsWidht;

        return freeSpace > tabWidth;
    };

    $scope.IsExistPlaceForT = function () {
        var browserTabsWidth = $('#browserTabs').width();

        if ($("#browserTabs > li.favoriteTabs:first").length == 0) return true;

        var tabWidth = $('#browserTabs > li:first').width();

        var tabsWidht = tabWidth / 2;

        $('#browserTabs > li').each(function (ind, element) { tabsWidht += ($(element).width() - 14); });

        var freeSpace = browserTabsWidth - tabsWidht;

        if (freeSpace < tabWidth) {
            var hasMore = Math.ceil(Math.abs(freeSpace / tabWidth));

            for (var i = 0; i < hasMore; i++) {

                $scope.safeApply(function () {
                    if ($scope.TabsOfUser.DefaultTabs.length > 0 && typeof ($scope.TabsOfUser.DefaultTabs[0].Id) != "undefined") {
                        if ($scope.TabsOfUser.MoreTabs.filter(function (x) { return x.Id == $scope.TabsOfUser.DefaultTabs[0].Id; }).length == 0) {
                            $scope.TabsOfUser.MoreTabs.push($scope.TabsOfUser.DefaultTabs[0]);
                        }

                        $scope.TabsOfUser.DefaultTabs.splice(0, 1);
                    }
                });
            }
        }
    };

    $scope.focusUrl = function () {
        if ($scope.openLinkInBrowser == "about:blank") {
            $scope.openLinkInBrowser = "";
        }
    };

    $scope.focusUrlLost = function () {
        if ($scope.openLinkInBrowser == "") {
            $scope.openLinkInBrowser = "about:blank";
        }
    };

    $scope.openUrlByEnter = function () {
        var selectedSuggested = $('#div-suggested-queries li.selected');
        if (selectedSuggested.length != 0) {
            global.scopes.webBrowser.openFromSuggest(selectedSuggested.attr('rel'));
            global.scopes.swapcast.closeSuggestedForce = true;
            return;
        }
        global.scopes.swapcast.closeSuggestedForce = true;

        var urlregex = new RegExp('(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?');
        if (!urlregex.test($scope.openLinkInBrowser) && !urlregex.test('http://' + $scope.openLinkInBrowser)) {
            $scope.search($scope.openLinkInBrowser);
            return;
        }
        $scope.openUrl($scope.openLinkInBrowser);
    };

    $scope.$on("onHandleUrlByEnter", function (event, url) {
        var urlregex = new RegExp('(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?');

        if (!urlregex.test(url) && !urlregex.test('http://' + url))
            url = "https://google.com/#q=" + url.replace(' ', '+');

        if ($('#myHomeGrid').is(':visible'))
            $('#input-home-search').val("");
        if ($('#myFavoriteGrid').is(':visible'))
            $('#input-favorites-search').val("");

        $scope.AddNewTab(url);

        $scope.hideAutocomplete();
    });

    $scope.urlKeydown = function (e) {
        var selectedItem = $('#div-suggested-queries li.selected');
        if (e.which == 40) {
            if (selectedItem.length == 0) $('#div-suggested-queries li:first').addClass('selected');
            else {
                selectedItem.removeClass('selected').next().addClass('selected');
            }
        }
        else if (e.which == 38) {
            if (selectedItem.length == 0) $('#div-suggested-queries li:last').addClass('selected');
            else {
                $(selectedItem).removeClass('selected').prev().addClass('selected');
            }
        } else {
            if (!e.ctrlKey && !e.metaKey && !e.altKey && e.which != 8 && (e.which < 33 || e.which > 45) && e.which != 16) {
                setTimeout(function() {
                    if (e.currentTarget.id == "input-home-search") {
                        $scope.requestAutocomplete(2);
                    } else if (e.currentTarget.id == "input-favorites-search") {
                        $scope.requestAutocomplete(3);
                    }
                }, 50);
            }
        }
    }

    $scope.openFromSuggest = function (url) {
        $scope.openLinkInBrowser = url;
        var urlregex = new RegExp('(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?');
        if (urlregex.test(url) || urlregex.test('http://' + url)) {
            $scope.openUrl(url);
        } else {
            $scope.search(url);
        }
        global.scopes.swapcast.closeSuggestedForce = true;
    }

    $scope.search = function (query) {
        query = query.replace(' ', '+');
        var url = "https://google.com/#q=" + query;
        $scope.openLinkInBrowser = url;
        $scope.openUrl(url);
    }

    $scope.SaveTabsToStorage = function () {
        if (!global.scopes.swapcast.areTabsLoaded) return;

        var obj = {};

        if (global.scopes.swapcast.swapSettings.UserProfile != null) {
            var userId = global.scopes.swapcast.swapSettings.UserProfile.UserId;

            if (typeof (userId) == 'undefined') return;

            // Do not save initial tabs to storage
            var defaultTabs = [];
            var moreTabs = [];

            angular.copy(global.scopes.webBrowser.TabsOfUser.DefaultTabs, defaultTabs);
            angular.copy(global.scopes.webBrowser.TabsOfUser.MoreTabs, moreTabs);

            var filteredDefaultTabs = defaultTabs.filter(function(tab) {
                return !global.scopes.webBrowser.InitialTabs.some(function(initialTab) { return tab.Link == initialTab.Link; });
            });

            var filteredMoreTabs = moreTabs.filter(function(tab) {
                return !global.scopes.webBrowser.InitialTabs.some(function(initialTab) { return tab.Link == initialTab.Link; });
            });

            obj['tabsOfUser' + userId] = { DefaultTabs: filteredDefaultTabs, MoreTabs: filteredMoreTabs, NewId: global.scopes.webBrowser.TabsOfUser.NewId };

            $scope.storage.set(obj);
        }
    };

    $scope.DisplayNextButton = function () {

        //get active tab
        var activeTab = global.scopes.swapcast.activeMainTab;
        //get history
        var historyOfTabs = global.scopes.webBrowser.historyOfTabs;

        //check if exist history for current tab
        if (typeof historyOfTabs[activeTab] != 'undefined') {
            var tabHistory = historyOfTabs[activeTab];

            for (var i = 0; i < tabHistory.length; i++) {
                if (tabHistory[i].IsCurrentTab == true) {
                    //check if exist next element
                    if (tabHistory[i + 1] != undefined) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    };

    $scope.DisplayPrevButton = function () {

        //get active tab
        var activeTab = global.scopes.swapcast.activeMainTab;
        //get history
        var historyOfTabs = global.scopes.webBrowser.historyOfTabs;

        //check if exist history for current tab
        if (typeof historyOfTabs[activeTab] != 'undefined') {
            var tabHistory = historyOfTabs[activeTab];

            for (var i = 0; i < tabHistory.length; i++) {
                if (tabHistory[i].IsCurrentTab == true) {
                    //check if exist next element
                    if (tabHistory[i - 1] != undefined) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    };

    $scope.reloadBrowser = function () {
        if ($("#div-reload-button").hasClass("div-stop-reload-button")) {
            $("#div-reload-button").removeClass("div-stop-reload-button");

            GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'StopReload');

            $("#browser")[0].stop();
        } else {
            $("#div-reload-button").addClass("div-stop-reload-button");

            GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'Reload');

            $("#browser")[0].reload();
        }
    };

    $scope.OpenPrevHistoryTab = function () {
        var activeTabId = global.scopes.webBrowser.activeMainTab;

        var historyOfTabs = $scope.historyOfTabs;
        var activeTab = historyOfTabs[activeTabId];
        if (typeof activeTab != 'undefined') {
            for (var i = 0; i < activeTab.length; i++) {
                if (activeTab[i].IsCurrentTab == true) {

                    if (i == 0) return;

                    //delete 'CurrentTab' from tab
                    activeTab[i].IsCurrentTab = false;

                    GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'OpenPrevHistoryTab=' + activeTab[i - 1].Link);

                    //open new url (prev)
                    global.scopes.webBrowser.openLinkInBrowser = activeTab[i - 1].Link;
                    global.scopes.webBrowser.browserUrl = activeTab[i - 1].Link;

                    //set true to 'CurrentTab'
                    activeTab[i - 1].IsCurrentTab = true;

                    //Display next & prev button
                    global.scopes.swapcast.activeMainTab = activeTabId;
                    $scope.displayNextBut = $scope.DisplayNextButton();
                    $scope.displayPrevBut = $scope.DisplayPrevButton();

                    break;
                }
            }
        }
    };

    $scope.OpenNextHistoryTab = function () {
        var activeTabId = global.scopes.swapcast.activeMainTab;
        var historyOfTabs = $scope.historyOfTabs;
        var activeTab = historyOfTabs[activeTabId];

        if (typeof activeTab != 'undefined') {
            for (var i = 0; i < activeTab.length; i++) {
                if (activeTab[i].IsCurrentTab == true) {

                    if (i + 1 >= activeTab.length) return;

                    //delete 'CurrentTab' from tab
                    activeTab[i].IsCurrentTab = false;

                    GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'OpenNextHistoryTab=' + activeTab[i + 1].Link);

                    //open new url (next)
                    global.scopes.webBrowser.openLinkInBrowser = activeTab[i + 1].Link;
                    $scope.browserUrl = activeTab[i + 1].Link;

                    //set true to 'CurrentTab'
                    activeTab[i + 1].IsCurrentTab = true;

                    //Display next & prev button
                    global.scopes.swapcast.activeMainTab = activeTabId;
                    $scope.displayNextBut = $scope.DisplayNextButton();
                    $scope.displayPrevBut = $scope.DisplayPrevButton();

                    break;
                }
            }
        }
    };

    openUrlInTab = function (url) {
        var a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.click();
    };

    $scope.RunDvrScreenRegion = function () {
        var downloadTimer = setTimeout(function () {
            $(window).unbind('blur', blurHandler);
            // link states full path as current test-server is treated as phishing source
            openUrlInTab("http://swapcast-demo.cloudapp.net/Downloads/Swapcast-dvr-setup.exe");
        }, 1000);
        var blurHandler = function () {
            clearTimeout(downloadTimer);
        };
        $(window).bind('blur', blurHandler);
        openUrlInTab("swapcast://dvr-region");
        //openUrlInTab("http://swapcast-demo.cloudapp.net/Downloads/Swapcast-dvr-setup.exe");
    };

    $scope.RunDvrFullScreen = function () {
        var downloadTimer = setTimeout(function () {
            $(window).unbind('blur', blurHandler);
            $("#downloadDvrModal").modal("show");
            //openUrlInTab(app.webLinksRoot + "/Swapcast-dvr-setup.exe");
            openUrlInTab("http://swapcast-demo.cloudapp.net/Downloads/Swapcast-dvr-setup.exe");
        }, 1000);
        var blurHandler = function () {
            clearTimeout(downloadTimer);
        };
        $(window).bind('blur', blurHandler);
        openUrlInTab("swapcast://dvr-screen");
    };

    $('#div-fullscreen-button').on('click', function () {
        GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'ShowFullscreen');

        $('#browserArea .browser-wrapper').get(0).webkitRequestFullscreen();
        $('#browser-area-fullscreen-image').show();

        setTimeout(function() {
            $('#browser-area-fullscreen-image').fadeOut(500);
        }, 5000);

        $('*').on('keyup', function(e) {
            if (e.keyCode == 27) {
                $('*').unbind('keyup');
                $('#browser-area-fullscreen-image').hide();
            }
        });
    });

    $scope.requestAutocomplete = function (instance) {
        if ($scope.autocompleteTimeout != undefined) {
            clearTimeout($scope.autocompleteTimeout);
        }

        var input = null;

        if (instance == 1) input = $scope.openLinkInBrowser;
        if (instance == 2) input = $('#input-home-search').val();
        if (instance == 3) input = $('#input-favorites-search').val();

        if (input == "") {
            $scope.hideAutocomplete();
            return;
        }

        $scope.autocompleteTimeout = setTimeout(function () {
            global.scopes.swapcast.closeSuggestedForce = false;

            $("*").off("click", $scope.hideAutocomplete);
            $("*").not("#div-suggested-queries, #div-suggested-queries *").on("click", $scope.hideAutocomplete);

            global.scopes.swapcast.safeApply(function() {
                global.scopes.swapcast.suggested = [];
                global.scopes.swapcast.suggestedUrls = [];
                global.scopes.swapcast.findMatchUrls(input);
            });

            $.ajax({
                url: encodeURI('http://api.bing.com/osjson.aspx?query=' + input),
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    global.scopes.swapcast.safeApply(function () {
                        global.scopes.swapcast.suggested = data[1];
                    });
                }
            });
        }, 400);
    }

    $scope.hideAutocomplete = function () {
        global.scopes.swapcast.safeApply(function () {
            global.scopes.swapcast.closeSuggestedForce = true;
        });

        $("*").off('click', global.scopes.webBrowser.hideAutocomplete);
    }

    $scope.IsAuthorized = function () {
        return global.scopes.swapcast.IsAuthorized();
    }
    /*
    chrome.app.window.current().onBoundsChanged.addListener(function () {
        global.scopes.webBrowser.showSuggested();
    });
    */
}