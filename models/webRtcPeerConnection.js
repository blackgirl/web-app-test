
window.moz = !!navigator.mozGetUserMedia;

WebRtcPeerConnection = function(options) {
    this.iceServers = [
        {
            // STUN
            url: !moz ? 'stun:stun.l.google.com:19302' : 'stun:23.21.150.121'
        }
    ];

    //this.iceServers.concat(global.scopes.swapcast.iceServerInfo);

    remotePeerId = "";

    var me = this;
    var options = this.attributes == null ? {} : this.attributes;
    this._signalingApi = global.scopes.swapcast.clientHub;
    this.peerConnectionReady = $.Deferred();
    this.optional = {
        optional: []
    };
    //this._signalingApi.on("onJsepOffer", function(msg) {me.sigHandleJsepOffer(msg)});

    if (!moz) {
        this.optional.optional = [{
            DtlsSrtpKeyAgreement: true
        }];
        if (options.onChannelMessage)
            this.optional.optional = [{
                RtpDataChannels: true
            }];
    }
    //this._createPeerConnection();
    this.getRemotePeerId = function() {
        return this._remotePeerId;
    };

    this.setLocalStreams = function(streams) {
        this.localStreams = [];
        var me = this;
        for (var i in streams) {
            me.setLocalStream(streams[i]);
        };
    };
    
    this.setLocalStream = function(stream) {
        var _this = this;

        if (this.localStreams == null)
            this.localStreams = [];
        this.localStreams.push(stream);

        this.peerConnectionReady.done(function () {
            if (_this.localStreams != null) {
                var result = true;

                for (var i in _this.localStreams)
                {
                    if (_this.localStreams[i] != null)
                        if (!_this.peerConnection.addStream(_this.localStreams[i]))
                            result = false;
                };

                return result;
            }

            return true;
        });
    };

    this.setInvitation = function(signal) {
        this._invitationId = signal.InvitationId;
        this._invitationType = signal.InvitationType;
    };

    this.getInvitationId = function() { return this._invitationId; };
    this.getInvitationType = function() { return this._invitationType; };
    this._createPeerConnection = function() {
        var _this = this;

        console.log("Creating peer connection; using stunServer " + this.iceServers);

        try {
            var config = {
                iceServers: this.iceServers
            };
            
            if (typeof(webkitRTCPeerConnection) != 'undefined') {
                this.peerConnection = new webkitRTCPeerConnection(config, this.optional);
            } else if (typeof(RTCPeerConnection) != 'undefined') {
                this.peerConnection = new RTCPeerConnection(config, this.optional);
            } else if (typeof(mozRTCPeerConnection) != 'undefined') {
                this.peerConnection = new mozRTCPeerConnection(config, this.optional);
            } else {
                throw 'Your browser doesn\'t seem to support the API \'webkitRTCPeerConnection\'.' + 'Grab the latest dev version of Chrome and try again.';
            }
            
            this.peerConnection.onicecandidate = function(ev) {
                return _this._handleIceCandidate(ev);
            };
            
            this.peerConnection.onaddstream = function (ev) {
                return _this._handleRemoteStreamAdded(ev);
            };
            
            this.peerConnection.onremovestream = function(ev) {
                return _this._handleRemoteStreamRemoved(ev);
            };
            
            this.peerConnectionReady.resolve();
        } catch(e) {
            console.error("Error in createPeerConnection: " + e);
        }
    };

    this._pushPendingIceCandidates = function() {
        
        if (!global.scopes.videoChat.conferenceManager._pendingCandidates) return;
        console.log('pushing async jsep candidates ' + global.scopes.videoChat.conferenceManager._pendingCandidates.length)
        for (var i = 0; i < global.scopes.videoChat.conferenceManager._pendingCandidates.length; i++) {
            var jsepCandidate = global.scopes.videoChat.conferenceManager._pendingCandidates[i];
            if (jsepCandidate != null && jsepCandidate.RemotePeerId == this.getRemotePeerId()) {
                // make sure the candidate was not yet processed 
                var handled = false;
                if (jsepCandidate.confereces != null) {
                    for (var ic = 0; ic < jsepCandidate.confereces.length; ic ++)
                        if (jsepCandidate.confereces[ic]==this.getInvitationId()) {
                            handled = true;
                            break;
                        }
                }
                if (!handled)
                    this.sigHandleJsepCandidateInternal(jsepCandidate);
                
                //global.scopes.videoChat.conferenceManager._pendingCandidates.splice(i, 1);
            }
        }
    };
    this._handleIceCandidate = function(event) {
        try {
            // send Ice candidate data to the remote peer
            if (event.candidate) {
                var candidateMessage = {
                    Message: encodeURIComponent(JSON.stringify(event.candidate)),
                    RemotePeerId: this._remotePeerId
                };
                console.log("handleIceCandidate: STUN server has found an ICE candidate; sending it to the remote machine: " + candidateMessage.Message);
                global.scopes.videoChat.Requests.jsepCandidate(candidateMessage);

            } else {
                console.log("No candidate supplied in ICE event.");
            }
        } catch(e) {
            console.error("Error in handleIceCandidate: " + e);
        }
    };
    
    this.sigHandleJsepCandidate = function (jsepCandidate) {
        this.sigHandleJsepCandidateInternal(jsepCandidate);
        this._pushPendingIceCandidates();
    }
    this.sigHandleJsepCandidateInternal = function (jsepCandidate) {

        if (jsepCandidate.confereces == null)
            jsepCandidate.confereces = [];

        // make sure the candidate was not yet processed 
        var handled = false;
        if (jsepCandidate.confereces != null) {
            for (var ic = 0; ic < jsepCandidate.confereces.length; ic ++)
                if (jsepCandidate.confereces[ic]==this.getInvitationId()) {
                    handled = true;
                    break;
                }
        }        
        if (handled)
            return;
        
        jsepCandidate.confereces.push(this.getInvitationId());

        console.log("handleJsepCandidate: Adding ICE candidate received from remote machine to the local peerConnection: " + jsepCandidate.Message);
        var sdpMessage = JSON.parse(decodeURIComponent(jsepCandidate.Message));


        var w = window;
            IceCandidate = w.mozRTCIceCandidate || w.RTCIceCandidate;

        var candidate = new IceCandidate(sdpMessage);
        this.peerConnection.addIceCandidate(candidate);

    },

    this._handleRemoteStreamAdded = function (event) {

        if (!this._isVideochat && global.scopes.videoChat._screenOpened && global.scopes.videoChat.conferenceManager.localSharingStream != null) return;

        console.log("handleRemoteStreamAdded");
        var remoteMediaStream = event.stream;
        
        if (this.remoteMediaStreams == null)
                this.remoteMediaStreams = [];

        this.remoteMediaStreams.push(remoteMediaStream);

        global.scopes.videoChat.addStreams(this._isVideochat, this._remotePeerId);
    };
    
    this._handleRemoteStreamRemoved = function(event) {
        var remoteMediaStream = event.stream;
        
        var streamId = remoteMediaStream.id;
        this.remoteMediaStreams = _.filter(this.remoteMediaStreams, function(st) { return st.id != streamId; });
    };
    
    this.createOffer = function (remotePeerId) {
        this._remotePeerId = remotePeerId;
        this._createPeerConnection();
        var me = this;
        this.isInitiator = true;
        var constraints = {
            optional: [],
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        };
        this.peerConnection.createOffer(function(sessionDescription) {
            sessionDescription.sdp = me._serializeSdp(sessionDescription.sdp);
            me.peerConnection.setLocalDescription(sessionDescription, function() {
                console.log("Local description set");
            }, function(error) {
                console.error(error);
            });
            var signalMessage = {
                InitiatorId: global.scopes.swapcast.PeerConnectionId,
                ResponderId: me._remotePeerId,
                InvitationId: me._invitationId,
                InvitationType: me._invitationType,
                Message: encodeURIComponent(JSON.stringify(sessionDescription))
            };
            global.scopes.videoChat.Requests.jsepOffer(signalMessage);
            //options.onOfferSDP(sessionDescription);
        }, function(e) { me.onSdpError(e); }, constraints);
    };
    this.handleJsepOffer = function(signalState) {
        var _this = this;
        console.log("handleJsepOffer: Handling JsepOffer from " + signalState.InitiatorId + " by sending answer and beginning ICE");
        try {
            this.isInitiator = false;
            this._createPeerConnection();
            this._remotePeerId = signalState.InitiatorId;
            var signalMessage = {
                InitiatorId: signalState.InitiatorId,
                ResponderId: signalState.ResponderId,
                InvitationId: signalState.InvitationId,
                InvitationType: signalState.InvitationType
            };
            var sdMessage = JSON.parse(decodeURIComponent(signalState.Message));
            var w = window;
            SessionDescription = w.mozRTCSessionDescription || w.RTCSessionDescription;
            var sd = new SessionDescription(sdMessage);
            this.peerConnection.setRemoteDescription(sd, function() {
                console.log("Remote description set.");
                console.log("Creating answer.");
                _this.peerConnection.createAnswer(function(answer) {
                    try {
                        _this.peerConnection.setLocalDescription(answer, function() {
                            console.log("Local descriptor set ");
                            signalMessage.Message = encodeURIComponent(JSON.stringify(answer));
                            global.scopes.videoChat.Requests.jsepAnswer(signalMessage);
                            _this._pushPendingIceCandidates();
                        }, function(error) {
                            console.error(error);
                        });
                    } catch(e) {
                        console.error("setLocalAndSend: " + e);
                    }
                }, function(error) {
                    console.error(error);
                });
            }, function(error) {
                console.error(error);
            });
        } catch(e) {
            console.error('Error in handleJsepOffer: ' + e);
        }
    };
    this.sigHandleJsepAnswer = function(signalState) {
        var me = this;
        // assign remote peer description to RTC connection
        console.log("handleJsepAnswer: Handling JsepAnswer from " + signalState.ResponderId + " and beginning ICE");
        try {
            var sdMessage = JSON.parse(decodeURIComponent(signalState.Message));
            var w = window;
            SessionDescription = w.mozRTCSessionDescription || w.RTCSessionDescription;
            var sd = new RTCSessionDescription(sdMessage);
            this.peerConnection.setRemoteDescription(sd, function(e) {
                console.log("Remote description set.");
                me._pushPendingIceCandidates();
            }, function(error) {
                console.error(error);
            });
        } catch(e) {
            console.error('Error in handleJsepAnswer: ' + e);
        }
    };
    // SDP fix utilities
    this._serializeSdp = function(sdp) {
        if (!moz) sdp = this._setBandwidth(sdp);
        sdp = this._getInteropSDP(sdp);
        console.debug(sdp);
        return sdp;
    };
    this._setBandwidth = function(sdp) {
        // DataChannel Bandwidth
        // remove existing bandwidth lines
        sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, '');
        sdp = sdp.replace(/a=mid:data\r\n/g, 'a=mid:data\r\nb=AS:1638400\r\n');
        return sdp;
    };

    this._getInteropSDP = function(sdp) {
        // old: FF<>Chrome interoperability management
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            extractedChars = '';

        function getChars() {
            extractedChars += chars[parseInt(Math.random() * 40)] || '';
            if (extractedChars.length < 40)
                getChars();
            return extractedChars;
        }

// usually audio-only streaming failure occurs out of audio-specific crypto line
        // a=crypto:1 AES_CM_128_HMAC_SHA1_32 --------- kAttributeCryptoVoice
        if (!this.isInitiator)
            sdp = sdp.replace(/(a=crypto:0 AES_CM_128_HMAC_SHA1_32)(.*?)(\r\n)/g, '');
        // video-specific crypto line i.e. SHA1_80
        // a=crypto:1 AES_CM_128_HMAC_SHA1_80 --------- kAttributeCryptoVideo
        var inline = getChars() + '\r\n' + (extractedChars = '');
        sdp = sdp.indexOf('a=crypto') == -1 ? sdp.replace(/c=IN/g,
            'a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:' + inline +
                'c=IN') : sdp;
        return sdp;
    };
    this.onSdpSuccess = function() {
    };
    this.onSdpError = function(e) {
        console.error('sdp error:', e.name, e.message);
    };
    
    this.dispose = function() {
        this.peerConnection.close();

        if (this.peerConnection != null) {
            delete this.peerConnection;
            
            this.peerConnection = null;
        }

        if (this.remoteMediaStreams != null) {
            for (var i in this.remoteMediaStreams) {
                this.remoteMediaStreams[i].stop();
            }

            this.remoteMediaStreams = null;
        }

        // cleanup handled early candidates 
        if (!global.scopes.videoChat.conferenceManager._pendingCandidates) return;

        console.log('pushing async jsep candidates ' + global.scopes.videoChat.conferenceManager._pendingCandidates.length);

        for (var i = 0; i < global.scopes.videoChat.conferenceManager._pendingCandidates.length; i++) {
            var jsepCandidate = global.scopes.videoChat.conferenceManager._pendingCandidates[i];
            
            if (jsepCandidate != null && jsepCandidate.RemotePeerId == this.getRemotePeerId()) {
                // make sure the candidate yet processed 
                var handled = false;

                if (jsepCandidate.confereces != null) {
                    for (var ic = jsepCandidate.confereces.length - 1; ic >= 0; ic--)
                        if (jsepCandidate.confereces[ic] == this.getInvitationId()) {
                            // remove erference to the conference
                            jsepCandidate.confereces.splice(ic, 1);
                        }
                }
            }
        }
    };
};

// 2013, @muazkh - github.com/muaz-khan
// MIT License - https://www.webrtc-experiment.com/licence/
// Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RTCPeerConnection

// 2013, @muazkh - github.com/muaz-khan
// MIT License - https://www.webrtc-experiment.com/licence/
// Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RTCPeerConnection

window.moz = !!navigator.mozGetUserMedia;

function RTCPeerConnection(options) {
    var w = window;
    PeerConnection = w.mozRTCPeerConnection || w.webkitRTCPeerConnection,
    SessionDescription = w.mozRTCSessionDescription || w.RTCSessionDescription,
    IceCandidate = w.mozRTCIceCandidate || w.RTCIceCandidate;

    this.TURN = [].concat(global.scopes.swapcast.iceServerInfo);

    this.iceServers = {
        iceServers: options.iceServers
    };

    if (!moz && !options.iceServers) {
        iceServers.iceServers = [STUN, TURN];
    }

    this.optional = {
        optional: []
    };

    if (!moz) {
        this.optional.optional = [{
            DtlsSrtpKeyAgreement: true
        }];

        if (options.onChannelMessage)
            this.optional.optional = [{
                RtpDataChannels: true
            }];
    }

    this.peer = new PeerConnection(this.iceServers, this.optional);
    
    this.openOffererChannel = function () {
        if (!options.onChannelMessage || (moz && !options.onOfferSDP))
            return;
        openOffererChannel();

        if (!moz) return;
        navigator.mozGetUserMedia({
            audio: true,
            fake: true
        }, function (stream) {
            peer.addStream(stream);
            createOffer();
        }, useless);
    };

    this.openOffererChannel();

    this.peer.onicecandidate = function (event) {
        if (event.candidate)
            this.options.onICE(event.candidate);
    };

    // attachStream = MediaStream;
    if (options.attachStream) this.peer.addStream(options.attachStream);

    // attachStreams[0] = audio-stream;
    // attachStreams[1] = video-stream;
    // attachStreams[2] = screen-capturing-stream;
    if (options.attachStreams && options.attachStream.length) {
        var streams = options.attachStreams;
        for (var i = 0; i < streams.length; i++) {
            this.peer.addStream(streams[i]);
        }
    }

    this.peer.onaddstream = function (event) {
        var remoteMediaStream = event.stream;

        // onRemoteStreamEnded(MediaStream)
        remoteMediaStream.onended = function () {
            if (options.onRemoteStreamEnded) options.onRemoteStreamEnded(remoteMediaStream);
        };

        // onRemoteStream(MediaStream)
        if (options.onRemoteStream) options.onRemoteStream(remoteMediaStream);

        console.debug('on:add:stream', remoteMediaStream);
    };

    this.constraints = options.constraints || {
        optional: [],
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        }
    };

    // onOfferSDP(RTCSessionDescription)

    function createOffer() {
        if (!options.onOfferSDP) return;
        var _this = this;
        _this.peer.createOffer(function(sessionDescription) {
            sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
            _this.peer.setLocalDescription(sessionDescription);
            options.onOfferSDP(sessionDescription);
        }, onSdpError, constraints);
    };

    // onAnswerSDP(RTCSessionDescription)

    function createAnswer() {
        if (!options.onAnswerSDP) return;

        //options.offerSDP.sdp = addStereo(options.offerSDP.sdp);
        peer.setRemoteDescription(new SessionDescription(options.offerSDP), onSdpSuccess, onSdpError);
        peer.createAnswer(function(sessionDescription) {
            sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
            peer.setLocalDescription(sessionDescription);
            options.onAnswerSDP(sessionDescription);

        }, onSdpError, constraints);
    };

    // if Mozilla Firefox & DataChannel; offer/answer will be created later
    if ((options.onChannelMessage && !moz) || !options.onChannelMessage) {
        createOffer();
        createAnswer();
    }


    // DataChannel Bandwidth

    this.setBandwidth = function(sdp) {
        // remove existing bandwidth lines
        sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, '');
        sdp = sdp.replace(/a=mid:data\r\n/g, 'a=mid:data\r\nb=AS:1638400\r\n');

        return sdp;
    };

    // old: FF<>Chrome interoperability management

    this.getInteropSDP = function(sdp) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            extractedChars = '';

        function getChars() {
            extractedChars += chars[parseInt(Math.random() * 40)] || '';
            if (extractedChars.length < 40)
                getChars();

            return extractedChars;
        }

        // usually audio-only streaming failure occurs out of audio-specific crypto line
        // a=crypto:1 AES_CM_128_HMAC_SHA1_32 --------- kAttributeCryptoVoice
        if (options.onAnswerSDP)
            sdp = sdp.replace(/(a=crypto:0 AES_CM_128_HMAC_SHA1_32)(.*?)(\r\n)/g, '');

        // video-specific crypto line i.e. SHA1_80
        // a=crypto:1 AES_CM_128_HMAC_SHA1_80 --------- kAttributeCryptoVideo
        var inline = getChars() + '\r\n' + (extractedChars = '');
        sdp = sdp.indexOf('a=crypto') == -1 ? sdp.replace(/c=IN/g,
            'a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:' + inline +
                'c=IN') : sdp;

        return sdp;
    };

    this.serializeSdp = function(sdp) {
        if (!moz) sdp = setBandwidth(sdp);
        sdp = getInteropSDP(sdp);
        console.debug(sdp);
        return sdp;
    };

    // DataChannel management
    var channel;

    this.openOffererChannel = function() {
        if (!options.onChannelMessage || (moz && !options.onOfferSDP))
            return;
        openOffererChannel();

        if (!moz) return;
        navigator.mozGetUserMedia({
                audio: true,
                fake: true
            }, function(stream) {
                peer.addStream(stream);
                createOffer();
            }, useless);
    };

    function openOffererChannel() {
        channel = peer.createDataChannel(options.channel || 'RTCDataChannel', moz ? {} : {
            reliable: false
        });

        if (moz) channel.binaryType = 'blob';

        setChannelEvents();
    }

    function setChannelEvents() {
        channel.onmessage = function (event) {
            if (options.onChannelMessage) options.onChannelMessage(event);
        };

        channel.onopen = function () {
            if (options.onChannelOpened) options.onChannelOpened(channel);
        };
        channel.onclose = function (event) {
            if (options.onChannelClosed) options.onChannelClosed(event);

            console.warn('WebRTC DataChannel closed', event);
        };
        channel.onerror = function (event) {
            if (options.onChannelError) options.onChannelError(event);

            console.error('WebRTC DataChannel error', event);
        };
    }

    if (options.onAnswerSDP && moz && options.onChannelMessage)
        openAnswererChannel();

    function openAnswererChannel() {
        peer.ondatachannel = function (event) {
            channel = event.channel;
            channel.binaryType = 'blob';
            setChannelEvents();
        };

        if (!moz) return;
        navigator.mozGetUserMedia({
            audio: true,
            fake: true
        }, function (stream) {
            peer.addStream(stream);
            createAnswer();
        }, useless);
    }

    // fake:true is also available on chrome under a flag!

    function useless() {
        log('Error in fake:true');
    }

    function onSdpSuccess() {
    }

    function onSdpError(e) {
        console.error('sdp error:', e.name, e.message);
    }

    return {
        addAnswerSDP: function (sdp) {
            var _this = this;
            _this.peer.setRemoteDescription(new SessionDescription(sdp), onSdpSuccess, onSdpError);
        },
        addICE: function (candidate) {
            var _this = this;
            _this.peer.addIceCandidate(new IceCandidate({
                sdpMLineIndex: candidate.sdpMLineIndex,
                candidate: candidate.candidate
            }));
        },

        peer: this.peer,
        channel: channel,
        sendData: function (message) {
            channel && channel.send(message);
        }
    };
}

// getUserMedia
var video_constraints

    = {
    mandatory: {},
    optional: []
};

function getUserMedia(options) {
    var n = navigator,
        media;
    n.getMedia = n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getMedia(options.constraints || {
        audio: true,
        video: video_constraints
    }, streaming, options.onerror || function (e) {
        console.error(e);
    });

    function streaming(stream) {
        var video = options.video;
        if (video) {
            video[moz ? 'mozSrcObject' : 'src'] = moz ? stream : window.webkitURL.createObjectURL(stream);
            video.play();
        }
        options.onsuccess && options.onsuccess(stream);
        media = stream;
    }

    return media;
}
