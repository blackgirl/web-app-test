function videoChatController($scope) {
    global.scopes.videoChat = angular.element($('#videoChatGrid')).scope();
    var browserUrlFunction = window.webkitURL || window.URL;
    $scope.conferenceManager = new ConferenceManager(global.scopes.swapcast.clientHub);
    
    $scope._videoChatConferencePeers = [];
    $scope._sharingConferencePeers = [];

    $scope._videoChatPeers = [];
    $scope._sharingPeers = [];

    $scope._videoChatConferenceId = "";
    $scope._sharingConferenceId = "";

    $scope._videoChatOpened = false;
    $scope._screenOpened = false;

    $scope._conferenceGroup = 0;

    $scope.startConcurrentScreenSharing = function () {
        var message = {
            GroupId: $scope._conferenceGroup,
            MessageText: "",
            ConferenceInfo: {
                Type: 1
            },
            UserPosted: global.scopes.swapcast.swapSettings.UserProfile.UserId,
            MessageClientId: global.scopes.messages.generateKey()
        };

        if ($scope._screenOpened && !$scope.isInitiator()) {
            global.scopes.swapcast.needToJoinToConference = false;
            global.scopes.swapcast.needToOpenVideoChat = false;

            global.scopes.videoChat.showConferenceAlert();
            return;
        }
        
        $scope.openScreenSharingAsInitiator(function () {
            GoogleAnalyticsManager.tracker.sendEvent('VideoChatView', 'StartScreenSharing');

            global.scopes.swapcast.Requests.postMessage(message);
        });
    };

    $scope.startConcurrentVideoChat = function () {
        $scope.openVideoChatAsInitiator(function () {
            var message = {
                GroupId: $scope._conferenceGroup,
                MessageText: "",
                ConferenceInfo: {
                    Type: 0
                },
                UserPosted: global.scopes.swapcast.swapSettings.UserProfile.UserId,
                MessageClientId: global.scopes.messages.generateKey()
            };

            GoogleAnalyticsManager.tracker.sendEvent('VideoChatView', 'StartVideoChat');

            global.scopes.swapcast.Requests.postMessage(message);
        });
    };

    $scope.leaveVideoChat = function () {
        $scope._videoChatConferencePeers = [];
        $scope._videoChatPeers = [];

        $scope._videoChatOpened = false;

        if (!$scope._screenOpened) $scope._conferenceGroup = 0;

        $scope.Requests.leaveConference(IceLinkWebRtcVideoChat.conferenceInfo.ConferenceId);

        $scope._videoChatConferenceId = "";
    };

    $scope.leaveSharing = function () {
        // If participant stops the screen sharing but the video chat with the same peer is active
        // Enable video chat audio
        $scope._sharingConferencePeers = [];
        $scope._sharingPeers = [];

        $scope._screenOpened = false;
        
        if (!$scope._videoChatOpened) $scope._conferenceGroup = 0;

        $scope.Requests.leaveConference(IceLinkWebRtcSharing.conferenceInfo.ConferenceId);

        $scope._sharingConferenceId = "";
    };

    $scope.displayRemoteSharingStream = function (peerId, userId) {
        var audioStream = $scope.conferenceManager.remoteAudioStreams[peerId];

        // If screen share tab is already opened
        if ($("#remoteScreenShareTab").length == 0) {
            $(".tabsArea").find('li.activeTab').removeClass('activeTab');

            // Add tab at UI
            global.scopes.webBrowser.hideFirstDefaultTabIfSpaceNeeded();
            HtmlUtils.addScreenShareTab(global.scopes.swapcast.getUserInfoById(userId).UserName);
            
            // Attach tab showing logic
            $("#remoteScreenShareTab").on("click", function () {
                GridManager.showGrid("#screenShareGrid");
            });

            // Attach tab closing logic
            $("#closeRemoteScreenShareTab").on("click", function () {
                GoogleAnalyticsManager.tracker.sendEvent('ScreenShareTab', 'CloseScreenShareTab');

                global.scopes.videoChat.closeScreenSharing();

                StreamManager.closeScreenSharingTab();
            });

            GridManager.showGrid("#screenShareGrid");
            $('.close-share-button').removeClass('hide');
            $('.tableDivRight').animate({ width: '50%' });
        }
        
        var url = ($scope.conferenceManager.remoteSharingStream != null ? browserUrlFunction.createObjectURL($scope.conferenceManager.remoteSharingStream) : '');
        var elementHtml = "<video width='100%' height='80%' muted autoplay><source src=\"" + url + "\" type=\"video/mp4\"></video>";

        if (audioStream != null && $('.remoteVideo.true[data-rel="' + userId + '"]').length == 0) {
            
            elementHtml += "<audio style='display:none;' autoplay><source src=" + browserUrlFunction.createObjectURL(audioStream) + " type=\"audio/mpeg\"></audio>";
        }
        $('#screenShareGrid').html(elementHtml);
        $('#screenShareGrid').attr('data-rel', userId);

        $('#screenShareGrid video').unbind('click').on('click', function () {
            launchFullscreen($(this).get(0));
        });
    }

    $scope.DisplayRemoteStream = function (isVideoChat, peerId) {
        if (isVideoChat) $scope._videoChatOpened = true;
        else $scope._screenOpened = true;

        var userId;

        if (!isVideoChat) {
            userId = IceLinkWebRtcSharing.conferenceInfo.Peers.filter(function (x) { return x.ConnectionId == peerId; })[0].UserId;

            $scope.displayRemoteSharingStream(peerId, userId);

            StreamManager.decreaseVideosSizes();

            return;
        };

        userId = IceLinkWebRtcVideoChat.conferenceInfo.Peers.filter(function (x) { return x.ConnectionId == peerId; })[0].UserId;

        var audioStream = $scope.conferenceManager.remoteAudioStreams[peerId];
        var videoStream = $scope.conferenceManager.remoteVideoStreams[peerId];

        var audio = audioStream != undefined ? { streamId: audioStream.id, userId: userId, isVideo: false, url: browserUrlFunction.createObjectURL(audioStream) } : null;
        var video = videoStream != undefined ? { streamId: videoStream.id, userId: userId, isVideo: true, url: browserUrlFunction.createObjectURL(videoStream) } : null;

        var userIdBefore;

        for (var u = 1; u < IceLinkWebRtcVideoChat.conferenceInfo.Peers.length; u++) {
            if (IceLinkWebRtcVideoChat.conferenceInfo.Peers[u].ConnectionId == peerId) {
                userIdBefore = IceLinkWebRtcVideoChat.conferenceInfo.Peers[u - 1].UserId;

                // We should not put video after current user stream (local stream) if there are users in the peers list
                if (userIdBefore == global.scopes.swapcast.swapSettings.UserProfile.UserId) {
                    if (u == 1)
                        userIdBefore = (void 0);
                    else
                        userIdBefore = IceLinkWebRtcVideoChat.conferenceInfo.Peers[u - 2].UserId;
                }

                break;
            }
        }

        var control = $scope.displayControl(audio, video, userId, isVideoChat, userIdBefore);

        $(control).find('video').unbind('click').on('click', function () {
            launchFullscreen($(this).get(0));
        });

        StreamManager.decreaseVideosSizes();
    }

    $scope.addStreams = function (isVideoChat, peerId) {        
        $scope.changeScreenShareAudioState(peerId, true, isVideoChat);

        $scope.DisplayRemoteStream(isVideoChat, peerId);

        if ($('#div-maximize').is(':visible'))
            global.scopes.swapcast.fillParticipantsAvatars();
    };

    $scope.setLocalStreamMuteState = function (element, enabled) {
        for (var i in $scope.conferenceManager.localAudioStream.getAudioTracks()) {
            $scope.conferenceManager.localAudioStream.getAudioTracks()[i].enabled = enabled;
        }

        $('#remoteVideos').find("[data-rel='" + global.scopes.swapcast.swapSettings.UserProfile.UserId + "'] a.a-unmute").toggle();
        $('#remoteVideos').find("[data-rel='" + global.scopes.swapcast.swapSettings.UserProfile.UserId + "'] a.a-mute").toggle();
    };

    $scope.setRemoteStreamMuteState = function (element, enabled) {
        var userId;

        if ($(element).parents('#div-participants-avatars').length > 0) {
            userId = $(element).parents('.profile-link').attr('rel');
            $(element).parents('.profile-link').find("a.a-unmute").toggle();
            $(element).parents('.profile-link').find("a.a-mute").toggle();
        } else {
            userId = $(element).parents('.remoteVideo').attr('data-rel');
            $('#remoteVideos').find("[data-rel='" + userId + "'] a.a-unmute").toggle();
            $('#remoteVideos').find("[data-rel='" + userId + "'] a.a-mute").toggle();
        }

        if (userId == global.scopes.swapcast.swapSettings.UserProfile.UserId) {
            for (var i in $scope.conferenceManager.localAudioStream.getAudioTracks()) {
                $scope.conferenceManager.localAudioStream.getAudioTracks()[i].enabled = enabled;
            }
        } else {
            var connectionId = IceLinkWebRtcVideoChat.conferenceInfo.Peers.filter(function (x) { return x.UserId == userId; })[0].ConnectionId;

            var stream = $scope.conferenceManager.remoteAudioStreams[connectionId];
            for (var k in stream.getAudioTracks()) {
                stream.getAudioTracks()[k].enabled = enabled;
            }
        }
    };

    $scope.bindEvents = function (element, isLocal) {
        // Attach event to the mute button
        if (isLocal) {
            $(element).parents(".profile-link").find('a.a-mute').unbind('click').on('click', function () {
                $scope.setLocalStreamMuteState(this, false);
            });

            // Attach event to the unmute button
            $(element).parents(".profile-link").find('a.a-unmute').unbind('click').on('click', function () {
                $scope.setLocalStreamMuteState(this, true);
            });

            return;
        }

        $(element).parents(".profile-link").find('a.a-mute').unbind('click').on('click', function () {
            $scope.setRemoteStreamMuteState(this, false);
        });

        // Attach event to the unmute button
        $(element).parents(".profile-link").find('a.a-unmute').unbind('click').on('click', function () {
            $scope.setRemoteStreamMuteState(this, true);
        });
    }
    
    $scope.DisplayLocalStreams = function (audioStream, videoStream, isVideoChat) {
            var userId = global.scopes.swapcast.swapSettings.UserProfile.UserId;

            if (isVideoChat) $scope._videoChatOpened = true;
            else $scope._screenOpened = true;

            var audio = { streamId: audioStream.id, userId: userId, isVideo: false, url: browserUrlFunction.createObjectURL(audioStream) };
            var video = { streamId: videoStream.id, userId: userId, isVideo: true, url: browserUrlFunction.createObjectURL(videoStream) };

            var control = $scope.displayControl(audio, video, userId, isVideoChat);

            $(control).find('video').unbind('click').on('click', function () {
                launchFullscreen($(this).get(0));
            });

            StreamManager.decreaseVideosSizes();
        
    };

    $scope.displayControl = function(audio, video, userId, isVideoChat, userBefore) {
        var isLocal = userId == global.scopes.swapcast.swapSettings.UserProfile.UserId;

        var container = $('#remoteVideos');

        if (!isLocal && container.find('.remoteVideo.true[data-rel="' + userId + '"]').length > 0)
            container.find('.remoteVideo.true[data-rel="' + userId + '"]').remove();

        if (isVideoChat && isLocal && container.find('.remoteVideo.false[data-rel="' + userId + '"]').length > 0) {
            // Put local video chat after screen share

            var screenSharingItem = container.find('.remoteVideo.false[data-rel="' + userId + '"]');

            screenSharingItem.after('<div class="remoteVideo ' + isVideoChat + '" data-rel="' + userId + '"></div>');
        } else {
            if (isLocal)
                container.prepend('<div class="remoteVideo ' + isVideoChat + '" data-rel="' + userId + '"></div>');
            else {
                if (typeof(userBefore) == 'undefined') {
                    var localVideo = container.find('.remoteVideo[data-rel="' + global.scopes.swapcast.swapSettings.UserProfile.UserId + '"]:last');

                    localVideo.after('<div class="remoteVideo ' + isVideoChat + '" data-rel="' + userId + '"></div>');
                } else {
                    var userBeforeElement = container.find('.remoteVideo[data-rel="' + userBefore + '"].true');

                    if (userBeforeElement.length > 0) {
                        userBeforeElement.after('<div class="remoteVideo ' + isVideoChat + '" data-rel="' + userId + '"></div>');
                    } else {
                        localVideo = container.find('.remoteVideo[data-rel="' + global.scopes.swapcast.swapSettings.UserProfile.UserId + '"]:last');

                        localVideo.after('<div class="remoteVideo ' + isVideoChat + '" data-rel="' + userId + '"></div>');
                    }
                }
            }
        }

        var element = container.find('[data-rel="' + userId + '"].' + isVideoChat);

        if (video != null)
            element.append('<div style="text-align:center"><video src="' + video.url + '" height="210" autoplay muted></video></div>');
        else
            element.append('<div style="text-align:center"><div class="no-video"><img src="../../css/img/camera_off.png" alt=""/></div></div>');

        if ($('#screenShareGrid[data-rel="' + userId + '"]').length > 0)
            $('#screenShareGrid audio').remove();

        if (audio != null)
            element.append('<div style="display:none"><audio src="' + audio.url + '" autoplay ' + (isLocal ? "muted" : "") + '></audio></div>');

        HtmlUtils.addMediaStreamInfo(element, $scope.getUserPic(userId), $scope.getUserName(userId), isLocal);

        return element;
    };

    // Get local streams by type (video chat or screen share) and render them at UI
    $scope.changeLocalStreams = function (isVideoChat) {
        if (!isVideoChat)
            $scope.DisplayLocalStreams($scope.conferenceManager.localAudioStream, $scope.conferenceManager.localSharingStream, isVideoChat);
        else
            $scope.DisplayLocalStreams($scope.conferenceManager.localAudioStream, $scope.conferenceManager.localVideoStream, isVideoChat);
    };

    $('video').on('click', function () {
        launchFullscreen($(this).get(0));
    });

    $scope.removeAllStreams = function () {
        $('#videoChatGrid .remoteVideo').not(".false").remove();

        StreamManager.increaseVideosSizes();
    };

    $scope.removeAllScreenSharingStreams = function () {
        $("#videoChatGrid .remoteVideo.false").remove();

        StreamManager.increaseVideosSizes();
    };

    $scope.removePeerById = function (peerId, isVideoChat) {
        $scope.changeScreenShareAudioState(peerId, false, isVideoChat);

        if (isVideoChat) {
            IceLinkWebRtcVideoChat.conference.unlink(peerId);

            var userId = 0;
            
            for (var i = 0; i < IceLinkWebRtcVideoChat.conferenceInfo.Peers.length; i++) {
                if (IceLinkWebRtcVideoChat.conferenceInfo.Peers[i].ConnectionId == peerId) {
                    $('#remoteVideos .remoteVideo[data-rel="' + IceLinkWebRtcVideoChat.conferenceInfo.Peers[i].UserId + '"]').remove();
                    break;
                }
            }

            var audioStream = $scope.conferenceManager.remoteAudioStreams[peerId];

            if (audioStream != null && $('#screenShareGrid[data-rel="' + userId + '"]').length > 0)
                $('#screenShareGrid').append("<audio style='display:none;' autoplay src='" + browserUrlFunction.createObjectURL(audioStream) + "' " +
                    ($('.remoteVideo.true[data-rel="' + userId + '"]').length > 0 ? 'muted' : '')
                    + "></audio>");

            StreamManager.increaseVideosSizes();
        } else {
            IceLinkWebRtcSharing.conference.unlink(peerId);
        }
    };

    // Clear the $scope collection of the remote streams
    $scope.disposeConnections = function (isVideoChat) {
        if (isVideoChat) {
            $scope.conferenceManager.remoteVideoStreams = {};
            for (var i in $scope._videoChatConferencePeers)
                $scope.conferenceManager.remoteAudioStreams[$scope._videoChatConferencePeers[i].ConnectionId] = undefined;
        } else {
            $scope.conferenceManager.remoteSharingStream = null;
            for (var key in $scope.conferenceManager.remoteAudioStreams) {
                if (key === 'length' || !$scope.conferenceManager.remoteAudioStreams.hasOwnProperty(key)) continue;
                if ($scope.conferenceManager.remoteAudioStreams[key] != undefined && $scope._videoChatConferencePeers.filter(function (x) { return x.ConnectionId == key; }).length == 0)
                    $scope.conferenceManager.remoteAudioStreams[key] = undefined;
            }
        }
    };

    //Client requests
    $scope.Requests = {
        joinConference: function (message) {
            if (message.ConferenceInfo.Type == 0) $scope._videoChatOpened = true;
            if (message.ConferenceInfo.Type == 1) $scope._screenOpened = true;

            $scope._conferenceGroup = message.GroupId == null ? -1 : message.GroupId;
            if(global.scopes.swapcast.isSmallWindow()) {
                $('#container-left').addClass('hide');
            }
            if (message.ConferenceInfo.Type == 0) {
                // Video chat opening

                IceLinkWebRtcVideoChat.conferenceInfo = message.ConferenceInfo;

                IceLinkWebRtcVideoChat.startConference(function () {
                    global.scopes.swapcast.Requests.joinConference(message.ConferenceInfo.ConferenceId);
                    $scope._videoChatConferenceId = message.ConferenceInfo.ConferenceId;
                    $scope.openVideoChat();
                });
                if(global.scopes.swapcast.isSmallWindow()) {
                    $('#container-right > .list-menu').addClass('hide');
                }
            } else {

                IceLinkWebRtcSharing.conferenceInfo = message.ConferenceInfo;

                // Screen share opening
                IceLinkWebRtcSharing.startConference(function() {
                    global.scopes.swapcast.Requests.joinConference(message.ConferenceInfo.ConferenceId);
                    $scope._sharingConferenceId = message.ConferenceInfo.ConferenceId;
                }, false);
                if(global.scopes.swapcast.isSmallWindow()) {
                    $('#container-left').addClass('hide');
                } 
            }
        },
        postScreenSharingInvitation: function () {
            global.scopes.swapcast.Requests.postScreenSharingInvitation();
        },
        acceptVideoChatInvitation: function (invitationId) {
            global.scopes.swapcast.Requests.acceptVideoChatInvitation(invitationId);
        },

        leaveConference: function (conferenceId) {
            global.scopes.swapcast.Requests.leaveConference(conferenceId);
        },

        jsepOffer: function (msg) {
            global.scopes.swapcast.Requests.jsepOffer(msg);
        },
        jsepAnswer: function (msg) {
            global.scopes.swapcast.Requests.jsepAnswer(msg);
        },
        jsepCandidate: function (msg) {
            global.scopes.swapcast.Requests.jsepCandidate(msg);
        },
    };
    //-----------------------------------------------------------

    $scope.conferenceManager.localStreamError = function (errorMessage) {
        global.scopes.swapcast.Functions.showAlert(errorMessage);
    };

    $scope.showConferenceAlert = function () {
        if ($scope._videoChatOpened && !$scope._screenOpened) {
            $('#videoChatModalCaption').text('Current video chat will be closed. Continue?');
        }
        if (!$scope._videoChatOpened && $scope._screenOpened) {
            $('#videoChatModalCaption').text('Current screen sharing will be closed. Continue?');
        }
        if ($scope._videoChatOpened && $scope._screenOpened) {
            $('#videoChatModalCaption').text('Current conference will be closed. Continue?');
        }

        $('#videoChatModal').modal('show');
    };

    $scope.tryToJoinConference = function (message) {
        // need to check ie or safari
        if (detectIE() || detectSafari()) {
            global.scopes.swapcast.Functions.showAlert("Sorry, no ability to start conference in current browsesr");
            return;
        }

        if (ConferenceUiLocker.isLock) {
            return;
        } else {
            ConferenceUiLocker.isLock = true;
            ConferenceUiLocker.messageId = message.MessageId;
        }

        if ((global.scopes.videoChat._videoChatOpened || global.scopes.videoChat._screenOpened) && $scope._conferenceGroup != (message.GroupId == null ? -1 : message.GroupId)) {
            global.scopes.swapcast.needToJoinToConference = true;
            global.scopes.swapcast.needToOpenVideoChat = message.ConferenceInfo.Type == 0;
            global.scopes.swapcast.messageForJoinRequest = message;

            $scope.showConferenceAlert();

            ConferenceUiLocker.unlock();

            return;
        } else {
            // If need to join to video chat
            if (message.ConferenceInfo.Type == 0) {
                // If video chat is alread opened
                if (!global.scopes.videoChat._videoChatOpened) {
                    $scope._videoChatConferencePeers = message.ConferenceInfo.Peers;
                } else {
                    global.scopes.swapcast.needToJoinToConference = true;
                    global.scopes.swapcast.needToOpenVideoChat = true;
                    global.scopes.swapcast.messageForJoinRequest = message;

                    $scope.showConferenceAlert();

                    ConferenceUiLocker.unlock();

                    return;
                }
            } else {
                if (global.scopes.videoChat._screenOpened) {
                    global.scopes.swapcast.needToJoinToConference = true;
                    global.scopes.swapcast.needToOpenVideoChat = false;
                    global.scopes.swapcast.messageForJoinRequest = message;

                    $scope.showConferenceAlert();

                    ConferenceUiLocker.unlock();

                    return;
                }

                $scope._sharingConferencePeers = message.ConferenceInfo.Peers;
            }

            global.scopes.videoChat.Requests.joinConference(message);
        }
    };

    $scope.openVideoChat = function () {
        OpenVideoChatWindow();
    };

    $scope.openVideoChatAsInitiator = function (callback) {
        IceLinkWebRtcVideoChat.startConference(function () {
            $scope.openVideoChat();
            $scope.safeApply(function () { $scope._videoChatOpened = true; });
            if (callback)
                callback();
        });
        
    };

    $scope.openScreenSharingAsInitiator = function (callback) {
        IceLinkWebRtcSharing.getScreenStream(function () {
            $scope.safeApply(function () { $scope._screenOpened = true; });
            $scope.openVideoChat();
            if (callback)
                callback();
        }, true);
    };

    $scope.currentUserName = function () {
        var firstName = global.scopes.swapcast.swapSettings.UserProfile != null ? global.scopes.swapcast.swapSettings.UserProfile.FirstName : "";
        var lastName = global.scopes.swapcast.swapSettings.UserProfile != null ? global.scopes.swapcast.swapSettings.UserProfile.LastName : "";
        return (firstName == null ? "" : firstName) + " " + (lastName == null ? "" : lastName);
    };
    $scope.currentUserPic = function () {
        var userPic = "";
        if (global.scopes.swapcast.swapSettings.UserProfile == null) return userPic;
        userPic = global.scopes.swapcast.getUserInfoById(global.scopes.swapcast.swapSettings.UserProfile.UserId).UserPic;
        return userPic;
    };

    $scope.getUserPic = function(userId) {
        return global.scopes.swapcast.getUserInfoById(userId).UserPic;
    };

    $scope.getUserName = function(userId) {
        var participant = global.scopes.swapcast.swapSettings.UserProfile.UserId == userId
            ? global.scopes.swapcast.swapSettings.UserProfile
            : global.scopes.swapcast.swapSettings.Friends[userId];

        // Find participant in message groups
        if (typeof (participant) == 'undefined') {
            for (var i = 0; i < global.scopes.swapcast.swapSettings.MessageGroups.length; i++) {
                var users = global.scopes.swapcast.swapSettings.MessageGroups[i]
                    .Participants.filter(function(user) { return user.UserId == userId; });

                if (users.length > 0) participant = users[0];
            };
        }

        return participant.FirstName + " " + participant.LastName;
    };

    $scope.hideVideoGrid = function () {
        // if NO mobile
        $('.container-body').animate({ top: SystemMessageManager.isOpened ? '38px' : '0px' });
        //$('.container-body').animate({ top: SystemMessageManager.isOpened ? '99px' : '61px' });
        //$("#topBar").animate({ top: SystemMessageManager.isOpened ? '38px' : '0px' });


        if (global.scopes.swapcast.isSmallWindow()) {
            $(".addchat-wrap").css({ "margin-top": "0px", "z-index": 2 });
            $('.container-body').removeClass('hide');
        } else {
            $(".addchat-wrap").css({ "margin-top": "210px", "z-index": 2 });
        }

        $("#div-minimize-wrapper").hide();
        $("#div-participants-avatars").hide();

        $("#videoChatGrid").addClass("hide");

        $("#div-maximize").hide();
        $("#div-minimize").show();
    };

    $scope.closeVideoChat = function () {
        if ($scope._videoChatOpened) {
            GoogleAnalyticsManager.tracker.sendEvent('VideoChatView', 'StopVideoChat');

            $scope.conferenceManager.Leave();

            if ($("#remoteVideos > .false").length == 0)
                $scope.hideVideoGrid();
            if(global.scopes.swapcast.isSmallWindow()) {
                $('#container-left').removeClass('hide');
                $('#container-right > .list-menu').removeClass('hide');
            }
        } else {
            global.scopes.swapcast.Functions.showAlert("You are not in the video chat now.");
        }
    };

    $scope.closeScreenSharing = function () {
        if ($scope._screenOpened) {
            GoogleAnalyticsManager.tracker.sendEvent('VideoChatView', 'StopScreenSharing');
            
            $scope.conferenceManager.LeaveScreenSharing();
            $('.close-share-button').addClass('hide');
            $('#screenShareGrid').removeAttr('data-rel');
            GridManager.showGrid("#myHomeGrid");
            if (!$scope._videoChatOpened) $scope.hideVideoGrid();
        } else {
            global.scopes.swapcast.Functions.showAlert("You are not in the screen sharing now.");
        }
    };

    $scope.isInitiator = function () {
        return $scope.conferenceManager.localSharingStream != null;
    };

    $scope.startVideoChat = function () {
        global.scopes.messages.startVideoChatButtonOnClick();
    }

    $scope.changeScreenShareAudioState = function(peerId, IsPeerAdded, isVideoChat) {
        if (isVideoChat) {
            // If the screen share peer exists
            if (IceLinkWebRtcSharing.remotePeerId == peerId) {
                global.scopes.videoChat.conferenceManager.remoteSharingStream.getAudioTracks()[0].enabled = IsPeerAdded ? false : true;
            }
        } else {
            if (IsPeerAdded && IceLinkWebRtcVideoChat.conference != undefined && IceLinkWebRtcVideoChat.conference.getLink(peerId) != null && typeof (global.scopes.videoChat.conferenceManager.remoteAudioStreams[peerId]) != 'undefined')
                global.scopes.videoChat.conferenceManager.remoteSharingStream.getAudioTracks()[0].enabled = false;
        }
    };
}

OpenVideoChatWindow = function () {
    // If need to open conference area
    if ($(".container-body").css('top') == '0px' && !$('.container-body').hasClass('hide')) {

        //$('.container-body').animate({ top: SystemMessageManager.isOpened ? '383px' : '345px' });
        //$("#topBar").animate({ top: SystemMessageManager.isOpened ? '324px' : '286px' });

        
        // if (global.scopes.swapcast.isSmallWindow()) {
        //     $('.container-body').addClass('hide');
        //     var fullHeight = $('#remoteVideos').height();
        //     var howManyVideos = $('.remoteVideo').length;
        //     var oneVideoHeight = fullHeight / howManyVideos;
        //     $('.remoteVideo').css({'height':oneVideoHeight});
        // } else {
            $('.container-body').animate({ top: SystemMessageManager.isOpened ? '322px' : '284px' });
        // }
        
        $("#div-minimize-wrapper").css({ top: SystemMessageManager.isOpened ? '248px' : '210px' });
        $("#div-minimize-wrapper").show();

        $("#videoChatGrid").removeClass("hide");
    }
};


// Find the right method, call on correct element
function launchFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
// check if browser is ie
function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        // IE 11 (or newer) => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    // other browser
    return false;
}

function detectSafari() {
    var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
    var not_chrome = navigator.userAgent.toLowerCase().indexOf('chrome/') > -1;
    return is_safari && !not_chrome;
}