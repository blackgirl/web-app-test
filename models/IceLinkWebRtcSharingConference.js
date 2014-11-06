Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

var IceLinkWebRtcSharing = {
    serverAddressIceLink: "",
    serverPortIceLink: "",

    remotePeerId: null,
    candidatesBuffer: new CandidatesBuffer(),
    isInitiator: false,
    conference: undefined,

    consumePendingCandidates: function(peerId) {
        var me = this;

        if (typeof (me.conference) == 'undefined') return;

        var candidates = me.candidatesBuffer.getCandidates(peerId);

        for (var i in candidates) {
            console.log("S: Release from buffer " + peerId, new Date().timeNow());
            me.conference.receiveCandidate(candidates[i], peerId);
        }
    },

    getCompatibleSdp: function(sdp) {
        if (sdp.indexOf("a=crypto") < 0) {
            sdp = sdp.replace("c=IN", "a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:" + this.generateKruptoKey() + "\r\nc=IN");
        }

        return sdp;
    },

    generateKruptoKey: function() {
        var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var r = "";

        for (var i = 0; i < 40; i++) {
            r += s[Math.floor(Math.random() * s.length)];
        }
        return r;
    },

    getScreenStream: function(callback, isInitiator) {
        var self = this;

		chrome.desktopCapture.chooseDesktopMedia(['screen'], function(streamId) {
			if (streamId != '') {
				global.scopes.videoChat.conferenceManager._getUserMedia({
					constraints: {
						audio: false,
						video: {
							mandatory: {
								chromeMediaSource: 'desktop',
								chromeMediaSourceId: streamId,
								minWidth: screen.width,
								maxWidth: screen.width,
								minHeight: screen.height,
								maxHeight: screen.height
							},
							optional: [{ minFrameRate: '15'}]
						}
					},
		
					callback: function(stream) {
						stream.MediaType = StreamMediaType.Screen;
		
						global.scopes.videoChat.conferenceManager.localSharingStream = stream;
		
						self.startConference(callback, isInitiator);
					}
				});
			}
		})        
    },

    startConference: function(callback, isInitiator) {
        var self = this;

        self.serverAddressIceLink = global.scopes.swapcast.iceServerInfo[0].url.split(":")[0];

        self.serverPortIceLink = global.scopes.swapcast.iceServerInfo[0].url.split(":")[1];

        // Log IceLink internals to a DOM container.
        //fm.log.setProvider(new fm.domLogProvider(document.getElementById('icelinklog'), fm.logLevel.Info));

        // WebRTC audio and video streams require us to first get access to
        // the local media stream (microphone, camera, or both).
        fm.icelink.webrtc.userMedia.getMedia({
            audio: true, // required if you want to send audio
            video: false, // required if you want to send video
            videoWidth: 320, // optional
            videoHeight: 240, // optional
            videoFrameRate: 15, // optional
            onFailure: function(e) {
                global.scopes.swapcast.showAlert('Could not get media. ' + e.getException().message);
            },
            onSuccess: function(e) {
                // Hide the loading indicator.

                // We have successfully acquired access to the local
                // audio/video device! Grab a reference to the media.
                // Internally, it maintains access to the local audio
                // and video feeds coming from the device hardware.
                var localMedia = e.getLocalStream();

                if (!isInitiator) {
                    localMedia.muteAudio();
                }

                // This is our local video control, a simple DOM element.
                // It is constantly updated with our live video feed
                // since we requested video above. To add it to the DOM,
                // either call XXX.appendChild(localVideoControl) or use
                // the IceLink layout manager, which we do below.
                // Create an IceLink layout manager, which makes the task
                // of arranging video controls easy. Give it a reference
                // to a DOM element that can be filled with video feeds.
                // Position and display the local video control on-screen
                // by passing it to the layout manager created above.
                // Create an audio stream description (requires a reference
                // to the local audio feed).

                // Create a video stream description (requires a reference
                // to the local video feed). Whenever a P2P link initializes
                // using this description, position and display the remote
                // video control on-screen by passing it to the layout manager
                // created above. Whenever a P2P link goes down, remove it.

                if (global.scopes.videoChat.conferenceManager.localAudioStream != null) {
                    localMedia._backingStream.addTrack(global.scopes.videoChat.conferenceManager.localAudioStream.getAudioTracks()[0]);

                    localMedia._backingStream.removeTrack(localMedia._backingStream.getAudioTracks()[0]);
                }

                var audioStream = new fm.icelink.webrtc.audioStream(localMedia);

                audioStream.addOnLinkInit(function(e) {
                    console.log("S:A:INIT: " + e.getPeerId());
                });

                audioStream.addOnLinkUp(function(e) {
                    console.log("S:A:UP: " + e.getPeerId());
                });

                audioStream.addOnLinkDown(function(e) {
                    console.log("S:A:DOWN: " + e.getPeerId());
                });

                var videoStream = new fm.icelink.webrtc.videoStream(localMedia);

                videoStream.addOnLinkInit(function(e) {
                    console.log("S:V:INIT: " + e.getPeerId());
                });

                videoStream.addOnLinkUp(function(e) {
                    console.log("S:V:UP: " + e.getPeerId());
                });

                videoStream.addOnLinkDown(function(e) {
                    console.log("S:V:DOWN: " + e.getPeerId());
                });


                if (isInitiator) {

                    localMedia._backingStream.addTrack(global.scopes.videoChat.conferenceManager.localSharingStream.getVideoTracks()[0]);

                    global.scopes.videoChat.conferenceManager.localSharingStream = localMedia._backingStream;
                    
                    //audioStream._localStream._backingStream.addTrack(global.scopes.videoChat.conferenceManager.localSharingStream.getVideoTracks()[0]);

                    videoStream = new fm.icelink.webrtc.videoStream(localMedia);

                    videoStream.addOnLinkInit(function(e) {
                        console.log("S:V:INIT: " + e.getPeerId());
                    });

                    videoStream.addOnLinkUp(function(e) {
                        console.log("S:V:UP: " + e.getPeerId());
                    });

                    videoStream.addOnLinkDown(function(e) {
                        console.log("S:V:DOWN: " + e.getPeerId());
                    });

                    if (global.scopes.videoChat.conferenceManager.localAudioStream == null) {
                        global.scopes.videoChat.conferenceManager.localAudioStream = audioStream._localStream._backingStream;
                    }

                    global.scopes.videoChat.changeLocalStreams(false);

                    // Create a conference using our stream descriptions.
                }
                self.conference = new fm.icelink.conference(self.serverAddressIceLink, parseInt(self.serverPortIceLink), [audioStream, videoStream]);

                self.conference.setTimeout(120000);
                // Supply TURN relay credentials in case we are behind a
                // highly restrictive firewall. These credentials will be
                // verified by the TURN server.
                self.conference.setRelayRealm('pa55w0rd!');
                self.conference.setRelayUsername('test');
                self.conference.setRelayPassword('pa55w0rd!');

                self.conference.setCandidateMode(fm.icelink.candidateMode.Early);
                // Add a few event handlers to the conference so we can see
                // when a new P2P link is created or changes state.
                // Before we can create a P2P link, the peers have to exchange
                // some information - specifically descriptions of the streams
                // (called the offer/answer) and some local network addresses
                // (called candidates). IceLink generates this information
                // automatically, but you are responsible for distributing it
                // to the peer as quickly as possible. This is called "signalling".

                // We're going to use WebSync here, but other popular options
                // include SIP and XMPP - any real-time messaging system will do.
                // We use WebSync since it uses HTTP (WebSockets/long-polling) and
                // therefore has no issues with firewalls or connecting from
                // JavaScript-based web applications.

                // Create a WebSync client and establish a persistent
                // connection to the server.
                // If the WebSync stream goes down, destroy all P2P links.
                // The WebSync client reconnect procedure will cause new
                // P2P links to be created.
                /*client.addOnStreamFailure(function(e) {
                this.conference.unlinkAll();
            });*/

                self.conference.addOnLinkInit(function(e) {
                    console.log("S::LINK INIT: " + e.getPeerId(), new Date().timeNow());

                    self.conference.addOnLinkCandidate(function (e) {

                        self.consumePendingCandidates(e.getPeerId());

                        var scandidate = {
                            candidate: e.getCandidate().getSdpCandidateAttribute() + "\r\n",
                            sdpMid: e.getCandidate().getSdpMediaIndex() == 0 ? "audio" : "video",
                            sdpMLineIndex: e.getCandidate().getSdpMediaIndex()
                        };
                        if (scandidate.candidate.indexOf("a=") != 0) scandidate.candidate = "a=" + scandidate.candidate;
                        console.log("Candidate discovered (local to be sent)", scandidate, new Date().timeNow());

                        global.scopes.swapcast.signalRManager.Requests.jsepCandidate({
                            Message: escape(JSON.stringify(scandidate)),
                            RemotePeerId: e.getPeerId()
                        });

                    });

                    self.consumePendingCandidates(e.getPeerId());

                });


                self.conference.addOnLinkUp(function(e) {
                    console.log("S::LINK UP: " + e.getPeerId(), new Date().timeNow());

                    self.candidatesBuffer.removeCandidates(e.getPeerId());

                    if (!isInitiator) {
                        global.scopes.videoChat.conferenceManager.remoteSharingStream = e._link._remoteStream._backingStream;

                        if (global.scopes.videoChat.conferenceManager.remoteAudioStreams[e.getPeerId()] == undefined)
                            global.scopes.videoChat.conferenceManager.remoteAudioStreams[e.getPeerId()] = e._link._remoteStream._backingStream;
                        else
                            e._link._remoteStream._backingStream.getAudioTracks()[0].enabled = false;

                        IceLinkWebRtcSharing.remotePeerId = e.getPeerId();

                        global.scopes.videoChat.addStreams(false, e.getPeerId());
                    } else {
                        e._link._remoteStream._backingStream.stop();
                    }
                });

                self.conference.addOnLinkDown(function(e) {
                    console.log("S::LINK DOWN: " + e.getPeerId(), [e._exception, e._exception.stack], new Date().timeNow());

                    IceLinkWebRtcSharing.remotePeerId = null;

                    //global.scopes.videoChat.removePeerById(e.getPeerId(), false);
                });

                // Add a couple event handlers to the conference to send
                // generated offers/answers and candidates to a peer.
                // The peer ID is something we define later. In this case,
                // it represents the remote WebSync client ID. WebSync's
                // "notify" method is used to send data to a specific client.
                self.conference.addOnLinkOfferAnswer(function(e) {

                    var stubSdp = {
                        sdp: e.getOfferAnswer().getIsOffer() ? self.getCompatibleSdp(e.getOfferAnswer().getSdpMessage()) : e.getOfferAnswer().getSdpMessage(),
                        type: e.getOfferAnswer().getIsOffer() ? "offer" : "answer"
                    }

                    var sdpMessage = escape(JSON.stringify(stubSdp));

                    var offerSignal;

                    if (e.getOfferAnswer().getIsOffer()) {

                        offerSignal = {
                            InvitationId: self.conferenceInfo.ConferenceId,
                            InitiatorId: global.scopes.swapcast.signalRManager.clientPushHubProxy.connection.id,
                            ResponderId: e.getPeerId(),
                            InvitationType: ConferenceType.VideoChat,
                            Message: sdpMessage
                        };

                        console.log("S: Offer: " + offerSignal, new Date().timeNow());

                        global.scopes.swapcast.signalRManager.Requests.jsepOffer(offerSignal);
                    } else {
                        offerSignal = {
                            InvitationId: self.conferenceInfo.ConferenceId,
                            InitiatorId: e.getPeerId(),
                            ResponderId: global.scopes.swapcast.signalRManager.clientPushHubProxy.connection.id,
                            InvitationType: ConferenceType.VideoChat,
                            Message: sdpMessage
                        };

                        console.log("S: Answer: " + offerSignal, new Date().timeNow());

                        global.scopes.swapcast.signalRManager.Requests.jsepAnswer(offerSignal);

                        self.consumePendingCandidates(e.getPeerId());
                    }
                    /*
                client.notify({
                    clientId: e.getPeerId(),
                    dataJson: e.getOfferAnswer().toJson(),
                    tag: 'offeranswer'
                });*/
                });


                // Add an event handler to the WebSync client to receive
                // incoming offers/answers and candidates from a peer.
                // Call the "receiveOfferAnswer" or "receiveCandidate"
                // method to pass the information to the conference.

                /*client.addOnNotify(function(e) {
                if (e.getTag() == 'offeranswer') {
                    conference.receiveOfferAnswer(fm.icelink.offerAnswer.fromJson(e.getDataJson()), e.getNotifyingClient().getClientId().toString(), e.getNotifyingClient().getBoundRecords());
                } else if (e.getTag() == 'candidate') {
                    conference.receiveCandidate(fm.icelink.candidate.fromJson(e.getDataJson()), e.getNotifyingClient().getClientId().toString());
                }
            });*/

                // Subscribe to a WebSync channel. When another client joins the same
                // channel, create a P2P link. When a client leaves, destroy it.
                if (callback != undefined) {
                    callback.call();
                }
            }
        });
    },

    jsepOffer: function(signal) {
        var me = this;

        if (this.conferenceInfo == undefined || signal.InvitationId != me.conferenceInfo.ConferenceId) return;

        var sdp = JSON.parse(unescape(signal.Message));

        var offerAnswer = new fm.icelink.offerAnswer();
        offerAnswer.setIsOffer(true);
        offerAnswer.setSdpMessage(sdp.sdp);

        me.conference.receiveOfferAnswer(offerAnswer, signal.InitiatorId);

    },

    jsepAnswer: function(signal) {

        var me = this;

        if (this.conferenceInfo == undefined || signal.InvitationId != me.conferenceInfo.ConferenceId) return;

        var sofferAnswer = JSON.parse(unescape(signal.Message));

        var offerAnswer = new fm.icelink.offerAnswer();
        offerAnswer.setIsOffer((sofferAnswer.type == "offer"));
        offerAnswer.setSdpMessage(sofferAnswer.sdp);

        me.conference.receiveOfferAnswer(offerAnswer, signal.ResponderId);

        me.consumePendingCandidates(signal.ResponderId);
    },

    jsepCandidate: function(jsepCandidate) {

        var me = this;

        var scandidate = JSON.parse(unescape(jsepCandidate.Message));

        console.log("S: Candidate signal (apply remote)" + jsepCandidate.RemotePeerId, new Date().timeNow());

        var candidate = new fm.icelink.candidate();

        candidate.setSdpCandidateAttribute(scandidate.candidate);
        candidate.setSdpMediaIndex(scandidate.sdpMLineIndex);
        
        if (scandidate.candidate.indexOf("a=") != 0) scandidate.candidate = "a=" + scandidate.candidate;
        var bufferCandidate = false;

        if (me.conference == undefined) {
            console.log("S: Conference is not constructed");
            bufferCandidate = true;
        } else {
            var link = me.conference.getLink(jsepCandidate.RemotePeerId);

            if (link == null) {
                console.log("S: Link not constructed" + jsepCandidate.RemotePeerId);
                bufferCandidate = true;
            } else {
                if (!(link.__hasAccepted || link.__hasCreated)) {
                    console.log("S: Link is not ready" + link.getPeerId() + ", " + jsepCandidate.RemotePeerId);
                    bufferCandidate = true;
                }
            }
        }

        // store early candidates if the link is not yet established
        if (bufferCandidate) {
            //_conference.GetLink(e.Signal.RemotePeerId).
            console.log("S: Early candidate buffered" + jsepCandidate.RemotePeerId);

            me.candidatesBuffer.addCandidate(candidate, jsepCandidate.RemotePeerId);
        } else {
            // process pending candidates 
            me.consumePendingCandidates(jsepCandidate.RemotePeerId);

            // process the arrived candidate
            me.conference.receiveCandidate(candidate, jsepCandidate.RemotePeerId);
        }
    },

    invitationAccepted: function(signal) {
        this.conference.link(signal.ResponderId);
    }
}