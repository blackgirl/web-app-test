StreamMediaType = {
    Video: 0,
    AudioOnly: 1,
    Screen: 2
};

ConferenceType =
{
    VideoChat: 0,
    ScreenSharing: 1
};

CandidatesBuffer = function() {
    this._pendingCandidates = [];

    this.addCandidate = function (candidate, peerId) {
        var me = this;

        if (typeof (this._pendingCandidates[peerId]) == 'undefined') {
            me._pendingCandidates[peerId] = { candidates: [candidate] };
        } else {
            me._pendingCandidates[peerId].candidates.push(candidate);
        }
    };

    this.getCandidates = function(peerId) {
        var me = this;

        if (typeof (me._pendingCandidates[peerId]) == 'undefined') return [];
        else {
            var candidates = me._pendingCandidates[peerId].candidates.slice(0);
            me._pendingCandidates[peerId].candidates = [];
            return candidates;
        }
    };
    this.removeCandidates = function(peerId) {
        var me = this;

        if (typeof (me._pendingCandidates[peerId]) == 'undefined') return;
        else {
            me._pendingCandidates[peerId].candidates = [];
            return;
        }
    };
}

ConferenceManager = function () {
    // conference manager setup
    var me = this;
    this.localStreamReady = $.Deferred();
    this.localStreamRequested = null;
    this.peerConnections = [];
    this._isBroadcastingScreen = false;
    this._pendingCandidates = [];

    //-------------- refactoring part -------------------------//

    this.localAudioStream = null;
    this.localVideoStream = null;
    this.localSharingStream = null;
    this.remoteSharingStream = null;

    this.remoteVideoStreams = new Object();
    this.remoteAudioStreams = new Object();

    //---------------------------------------------------------

    this.handleJsepAnswer = function (jsepAnswer) {
        for (var i = 0; i < me.peerConnections.length; i++) {
            var connection = me.peerConnections[i];
            if (connection != null && connection.getRemotePeerId() == jsepAnswer.ResponderId && connection.getInvitationId() == jsepAnswer.InvitationId) {
                connection.sigHandleJsepAnswer(jsepAnswer);
                return true;
            }
        }
        console.log("onJsepAnswer Peer " + jsepAnswer.ResponderId + " is not found");
    };

    this.handleJsepCandidate = function (jsepCandidate) {
        var resolved = false;

        for (var i = 0; i < me.peerConnections.length; i++) {
            var connection = me.peerConnections[i];
            if (connection != null && connection.getRemotePeerId() == jsepCandidate.RemotePeerId) {
                // process candidate 
                connection.sigHandleJsepCandidate(jsepCandidate);
                // mark candidate as handled in scope of the conference 
                if (jsepCandidate.confereces == null)
                    jsepCandidate.confereces = [];
                jsepCandidate.confereces.push(connection.getInvitationId());

                resolved = true;
            }
        }

        // keep early candidates for further processing 
        me._pendingCandidates.push(jsepCandidate);

        if (!resolved)
            console.log("onJsepCandidate Peer " + jsepCandidate.RemotePeerId + " is not found");
    };

    // setup client methods
    this.handleInvitationAccepted = function (signal) {
        if (signal.InvitationType == ConferenceType.ScreenSharing) {
            IceLinkWebRtcSharing.invitationAccepted(signal);
        } else {
            IceLinkWebRtcVideoChat.invitationAccepted(signal);
        }
    };

    this.handleOnJsepOffer = function (signal) {
        var me = this;
        if (signal.InvitationType == ConferenceType.ScreenSharing) {
            // no need for local streem, we just receive broadcaster's screen
            // create peer connection
            var peerConnection = new WebRtcPeerConnection();
            peerConnection._remotePeerId = signal.InitiatorId;
            peerConnection._isVideochat = signal.InvitationType == 0;

            me.peerConnections.push(peerConnection);
            peerConnection.setInvitation(signal);
            // handle incoming peer connection
            peerConnection.handleJsepOffer(signal);
            me._setupPeerConnection(peerConnection);
        } else {
            // video conference
            this._setupLocalStream(function () {
                // create peer connection
                var peerConnection = new WebRtcPeerConnection();
                peerConnection._remotePeerId = signal.InitiatorId;
                peerConnection._isVideochat = signal.InvitationType == 0;

                me.peerConnections.push(peerConnection);

                peerConnection.setLocalStreams([me.localAudioStream, me.localVideoStream]);
                peerConnection.setInvitation(signal);
                // handle incoming peer connection
                peerConnection.handleJsepOffer(signal);
                me._setupPeerConnection(peerConnection);
            }, signal.InvitationType == 0);
        }
    };

    this.handleParticipantLeft = function (signal) {
        var peerId = signal.ResponderId;

        var isVideoChat = signal.InvitationType == 0;

        // remove peer video control
        global.scopes.videoChat.removePeerById(peerId, isVideoChat);
    };

    this.handleBroadcasterLeft = function (signal) {
        // leave chat as well as broadcaster
        if (signal.InvitationType == 0)
            this.Leave();
        else {
            this.LeaveScreenSharing(signal.ResponderId, true);

            StreamManager.closeScreenSharingTab();
            if (!global.scopes.videoChat._videoChatOpened)
                global.scopes.videoChat.hideVideoGrid();
        }
    };

    // process conference completion and correct disposal
    this.Leave = function() {
        // trigger event
        // broadcast notification to other participants
        IceLinkWebRtcVideoChat.conference.unlinkAll();

        global.scopes.videoChat.leaveVideoChat();

        if (this.localVideoStream != null) {
            if (global.scopes.videoChat._screenOpened) {
                this.localVideoStream.getVideoTracks()[0].stop();
            } else {
                this.localVideoStream.stop();

                this.localAudioStream.stop();
                this.localAudioStream = null;
            }

            this.localVideoStream = null;
        }

        this._disposeConnections(true);

        global.scopes.videoChat.removeAllStreams();
    };

    // process conference completion and correct disposal
    this.LeaveScreenSharing = function(peerId, isBroadcasterLeft) {
        IceLinkWebRtcSharing.conference.unlinkAll();

        global.scopes.videoChat.leaveSharing(peerId, isBroadcasterLeft);

        if (this.localSharingStream != null) {
            if (global.scopes.videoChat._videoChatOpened) {
                this.localSharingStream.getVideoTracks()[0].stop();
            } else {
                this.localSharingStream.stop();

                this.localAudioStream.stop();
                this.localAudioStream = null;
            }

            this.localSharingStream = null;
        }

        this._disposeConnections(false);

        global.scopes.videoChat.removeAllScreenSharingStreams();
    };

    this._disposeConnections = function (isVideoChat) {
        // delete peer connections
        for (var i = 0; i < this.peerConnections.length; i++) {
            var connection = this.peerConnections[i];

            if (connection != null && connection._isVideochat == isVideoChat) {
                connection.dispose();

                if (connection)
                    this.peerConnections.splice(i, 1);
            }
        }

        global.scopes.videoChat.disposeConnections(isVideoChat);

        var streams = isVideoChat ? this.localStreams : this.sharingStreams;

        if (streams != null) {
            for (var j in streams) {
                streams[j].stop();
            }
        }

        if (isVideoChat)
            this.localStreams = null;
        else
            this.sharingStreams = null;

        this.localStreamRequested = null;
    };

    this.IsConferencingSupported = function () {
        var n = navigator;
        return n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    };
    this.IsBroadcastingScreen = function () {
        return this._isBroadcastingScreen;
    };
    this._setupPeerConnection = function (peerConnection) {
        var me = this;

        if (peerConnection._invitationType == 0)
            global.scopes.videoChat._videoChatPeers.push(peerConnection);
        else
            global.scopes.videoChat._sharingPeers.push(peerConnection);
    };
    this._setupLocalStream = function (callback, isVideoChat) {
        if (isVideoChat && !global.scopes.videoChat._videoChatOpened)
            this.EnsureLocalVideoStream();
        if (!isVideoChat && !global.scopes.videoChat._screenOpened)
            this.EnsureLocalScreenSharingStream();

        this.localStreamReady.done(function () {
            setTimeout(callback, 100);
        });
    };

    this.EnsureLocalVideoStream = function (callback) {
        if (this.localAudioStream != null && this.localVideoStream != null) {
            if (callback != null) callback();
            return;
        }

        var me = this;
        this._isBroadcastingScreen = false;
        this.localStreamReady = $.Deferred();
        this.localStreamRequested = true;

        // setup local user media
        this._getUserMedia({
            constraints: {
                audio: false,
                video: true,
            },
            callback: function (stream) {
                stream.MediaType = StreamMediaType.Video;
                me._localMediaStreaming(stream, false);

                me._getUserMedia({
                    constraints: {
                        audio: true,
                        video: false,
                    },
                    callback: function (str) {
                        str.MediaType = StreamMediaType.AudioOnly;
                        me._localMediaStreaming(str, false);
                        if (callback != null)
                            callback(str);

                        global.scopes.videoChat.changeLocalStreams(true);
                    }
                });
            }
        });
    };

    this.EnsureLocalScreenSharingStream = function (callback) {
        if (this.localStreamRequested != null && this.sharingStreams != null) return;

        var me = this;

        this._isBroadcastingScreen = true;

        this.localStreamReady = $.Deferred();

        this.localStreamRequested = true;

        // setup local screen-casting user media 
        this._getUserMedia({
            constraints: {
                audio: false,
                video: {
                    "mandatory": {
                        "chromeMediaSource": 'screen',
                        "minWidth": screen.width,
                        "maxWidth": screen.width,
                        "minHeight": screen.height,
                        "maxHeight": screen.height
                    }, "optional": [{
                        "minFrameRate": "30"
                    }]
                }
            },

            callback: function (stream) {
                stream.MediaType = StreamMediaType.Screen;
                me._localMediaStreaming(stream);
                
                // Temporary changes. Do not capture audio for screen share
                
                if (me.localAudioStream != null) {
                    if (callback != null)
                        callback();
                    global.scopes.videoChat.changeLocalStreams(false);
                    return;
                }
                
                me._getUserMedia({
                    constraints: {
                        audio: true,
                        video: false,
                    },
                    onerror: function () {
                        // assume audio broadcastin is not mandatory, so just complete media preparation
                        me.localStreamReady.resolve();
                        me.localStreamRequested = false;
                    },
                    callback: function (audioStream) {
                        audioStream.MediaType = StreamMediaType.AudioOnly;
                        me._localMediaStreaming(audioStream, true);
                        if (callback != null)
                            callback();

                        global.scopes.videoChat.changeLocalStreams(false);
                    }
                });
            }
        });
    };

    this._getUserMedia = function (options) {
        options = options || {};
        var me = this;

        var video_constraints = options.video_constraints || {
            "mandatory": {
                "minWidth": 320,
                "maxWidth": 320,
                "minHeight": 240,
                "maxHeight": 240
            }, "optional": [{
                "minFrameRate": "30"
            }]
        };

        var n = navigator, media;
        n.getMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
        n.getMedia(options.constraints || { 
            audio: true,
            video: video_constraints
        }, function (stream) {
            // Run code with delay to find out if camera is busy
            setTimeout(function () {
                var videoTracks = stream.getVideoTracks();

                if (videoTracks.length > 0 && videoTracks[0].readyState == 'ended') {
                    me._disposeConnections();

                    global.scopes.videoChat.conferenceManager.localStreamError("Camera is in use by another app");
                } else {
                    if (options.callback)
                        options.callback(stream);
                }
            }, 100);
        }, options.onerror || function (e) {
            console.error(e);
            // delete peer connections
            me._disposeConnections();
            var isScreenShareMedia = options.constraints != null && options.constraints.video != null && options.constraints.video.mandatory != null && options.constraints.video.mandatory.chromeMediaSource == 'screen';
            if (e != null && typeof e == "object" && Object.prototype.toString.call(e) == "[object NavigatorUserMediaError]") {
                if (e.name == "PERMISSION_DENIED" || e.name == "PermissionDeniedError") {
                    if (isScreenShareMedia) {
                        if (window != null && window.location != null && window.location.protocol != 'https:')
                            global.scopes.videoChat.conferenceManager.localStreamError("Camera is in use by another app");
                        else
                            global.scopes.videoChat.conferenceManager.localStreamError("Camera is in use by another app. Please enable following browser flag: <a href='chrome://flags/#enable-usermedia-screen-capture'>chrome://flags/#enable-usermedia-screen-capture</a> and re-launch chrome");
                    } else {
                        global.scopes.videoChat.conferenceManager.localStreamError("Camera is in use by another app");
                    }
                    return;
                } else if (e.name == "NOT_SUPPORTED_ERROR") {
                    global.scopes.videoChat.conferenceManager.localStreamError("Camera device is not supported or plugged in");
                    return;
                } else if (e.name == "DEVICE_NOT_AVAILABLE") {
                    global.scopes.videoChat.conferenceManager.localStreamError("Camera device is not available");
                    return;
                } else if (e.message != null && e.message != "") {
                    global.scopes.videoChat.conferenceManager.localStreamError(e.message);
                    return;
                }
            }
			
            global.scopes.videoChat.conferenceManager.localStreamError("Camera device is not available");
        });
    };

    this._localMediaStreaming = function (stream) {
        // setup local stream
        if (stream.MediaType == StreamMediaType.AudioOnly) {
            if (this.localAudioStream == null) this.localAudioStream = stream;
            else stream.stop();
        }
        if (stream.MediaType == StreamMediaType.Video)
            this.localVideoStream = stream;
        if (stream.MediaType == StreamMediaType.Screen)
            this.localSharingStream = stream;

        this.localStreamReady.resolve();
        this.localStreamRequested = false;
    };
};

