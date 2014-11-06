
/*
 * Title: IceLink for JavaScript
 * Version: 2.5.0
 * Copyright Frozen Mountain Software 2011+
 */

(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('fm.icelink', function() {

if (typeof global !== 'undefined' && !global.window) { global.window = global; global.document = { cookie: '' }; }

if (!window.fm) { throw new Error("fm must be loaded before fm.icelink."); }

if (!window.fm.icelink) { window.fm.icelink = {}; }

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

var __hasProp = {}.hasOwnProperty;

var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

/*<span id='cls-fm.icelink.candidateMode'>&nbsp;</span>
*/

/**
@class fm.icelink.candidateMode
 <div>
 Describes how candidates are to be gathered.
 </div>

@extends fm.enum
*/

fm.icelink.candidateMode = {
  /*<span id='prop-fm.icelink.candidateMode-Early'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that candidates should be gathered
  	 early and included in the offer/answer. This is
  	 the slowest mode of operation since candidate
  	 gathering is asynchronous and requires a timeout
  	 period to elapse before the offer/answer can be
  	 raised. There is also a risk that valid candidates
  	 might not be gathered before the end of the
  	 timeout period and therefore not included for
  	 path consideration. This mode should only be used
  	 for third-party compatibility.
  	 </div>
  
  	@field Early
  	@type {fm.icelink.candidateMode}
  */

  Early: 1,
  /*<span id='prop-fm.icelink.candidateMode-Late'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that candidates should be gathered late
  	 and excluded from the offer/answer. This is the
  	 fastest mode of operation since it allows the
  	 offer/answer exchange to take place immediately,
  	 with candidates exchanged between peers immediately
  	 after being discovered. There is also little risk for
  	 missing valid candidates - the search for valid
  	 candidates only terminates when the link establishes
  	 or times out. This is also known as "trickle" ICE.
  	 </div>
  
  	@field Late
  	@type {fm.icelink.candidateMode}
  */

  Late: 2,
  /*<span id='prop-fm.icelink.candidateMode-Default'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Same as <see cref="fm.icelink.candidateMode.Late">fm.icelink.candidateMode.Late</see>.
  	 </div>
  
  	@field Default
  	@type {fm.icelink.candidateMode}
  */

  Default: 2
};


/*<span id='cls-fm.icelink.candidateType'>&nbsp;</span>
*/

/**
@class fm.icelink.candidateType
 <div>
 Describes candidate types.
 </div>

@extends fm.enum
*/

fm.icelink.candidateType = {
  /*<span id='prop-fm.icelink.candidateType-Private'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Private, or host, candidates represent local
  	 IP address and port combinations.
  	 </div>
  
  	@field Private
  	@type {fm.icelink.candidateType}
  */

  Private: 1,
  /*<span id='prop-fm.icelink.candidateType-Public'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Public, or reflexive, candidates represent
  	 IP address and port combinations assigned by the
  	 NAT when communicating with a STUN server.
  	 </div>
  
  	@field Public
  	@type {fm.icelink.candidateType}
  */

  Public: 2,
  /*<span id='prop-fm.icelink.candidateType-Relay'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Relay candidates represent IP address and port
  	 combinations assigned by the TURN server.
  	 </div>
  
  	@field Relay
  	@type {fm.icelink.candidateType}
  */

  Relay: 4,
  /*<span id='prop-fm.icelink.candidateType-Relayed'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Relay candidates represent IP address and port
  	 combinations assigned by the TURN server.
  	 </div>
  
  	@field Relayed
  	@type {fm.icelink.candidateType}
  */

  Relayed: 4
};


/*<span id='cls-fm.icelink.streamType'>&nbsp;</span>
*/

/**
@class fm.icelink.streamType
 <div>
 The valid types of streams that can be established.
 </div>

@extends fm.enum
*/

fm.icelink.streamType = {
  /*<span id='prop-fm.icelink.streamType-Audio'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates an audio stream.
  	 </div>
  
  	@field Audio
  	@type {fm.icelink.streamType}
  */

  Audio: 1,
  /*<span id='prop-fm.icelink.streamType-Video'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a video stream.
  	 </div>
  
  	@field Video
  	@type {fm.icelink.streamType}
  */

  Video: 2,
  /*<span id='prop-fm.icelink.streamType-Text'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a text stream.
  	 </div>
  
  	@field Text
  	@type {fm.icelink.streamType}
  */

  Text: 3,
  /*<span id='prop-fm.icelink.streamType-Application'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates an application stream.
  	 </div>
  
  	@field Application
  	@type {fm.icelink.streamType}
  */

  Application: 4,
  /*<span id='prop-fm.icelink.streamType-Message'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a message stream.
  	 </div>
  
  	@field Message
  	@type {fm.icelink.streamType}
  */

  Message: 5
};


/*<span id='cls-fm.icelink.baseLinkArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.baseLinkArgs
 <div>
 Base class for link event arguments.
 </div>

@extends fm.dynamic
*/


fm.icelink.baseLinkArgs = (function(_super) {

  __extends(baseLinkArgs, _super);

  baseLinkArgs.prototype._conference = null;

  baseLinkArgs.prototype._link = null;

  function baseLinkArgs() {
    this.setLink = __bind(this.setLink, this);

    this.setConference = __bind(this.setConference, this);

    this.getPeerState = __bind(this.getPeerState, this);

    this.getPeerId = __bind(this.getPeerId, this);

    this.getLink = __bind(this.getLink, this);

    this.getConference = __bind(this.getConference, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseLinkArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseLinkArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.baseLinkArgs-getConference'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the conferece.
  	 </div>
  
  	@function getConference
  	@return {fm.icelink.conference}
  */


  baseLinkArgs.prototype.getConference = function() {
    return this._conference;
  };

  /*<span id='method-fm.icelink.baseLinkArgs-getLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the link.
  	 </div>
  
  	@function getLink
  	@return {fm.icelink.link}
  */


  baseLinkArgs.prototype.getLink = function() {
    return this._link;
  };

  /*<span id='method-fm.icelink.baseLinkArgs-getPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the peer.
  	 </div>
  
  	@function getPeerId
  	@return {String}
  */


  baseLinkArgs.prototype.getPeerId = function() {
    return this.getLink().getPeerId();
  };

  /*<span id='method-fm.icelink.baseLinkArgs-getPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets custom state associated with the peer.
  	 </div>
  
  	@function getPeerState
  	@return {fm.object}
  */


  baseLinkArgs.prototype.getPeerState = function() {
    return this.getLink().getPeerState();
  };

  /*<span id='method-fm.icelink.baseLinkArgs-setConference'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the conferece.
  	 </div>
  
  	@function setConference
  	@param {fm.icelink.conference} value
  	@return {void}
  */


  baseLinkArgs.prototype.setConference = function() {
    var value;
    value = arguments[0];
    return this._conference = value;
  };

  /*<span id='method-fm.icelink.baseLinkArgs-setLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the link.
  	 </div>
  
  	@function setLink
  	@param {fm.icelink.link} value
  	@return {void}
  */


  baseLinkArgs.prototype.setLink = function() {
    var value;
    value = arguments[0];
    return this._link = value;
  };

  return baseLinkArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.closeCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.closeCompleteArgs
 <div>
 Arguments for the close complete event.
 </div>

@extends fm.dynamic
*/


fm.icelink.closeCompleteArgs = (function(_super) {

  __extends(closeCompleteArgs, _super);

  closeCompleteArgs.prototype._exception = null;

  closeCompleteArgs.prototype._link = null;

  closeCompleteArgs.prototype._reason = null;

  function closeCompleteArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setReason = __bind(this.setReason, this);

    this.setLink = __bind(this.setLink, this);

    this.setException = __bind(this.setException, this);

    this.getReason = __bind(this.getReason, this);

    this.getLink = __bind(this.getLink, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      closeCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    closeCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.closeCompleteArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} closeCompleteArgsJson The JSON to deserialize.
  	@return {fm.icelink.closeCompleteArgs} The deserialized close complete arguments.
  */


  closeCompleteArgs.fromJson = function() {
    var closeCompleteArgsJson;
    closeCompleteArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeCloseCompleteArgs(closeCompleteArgsJson);
  };

  /*<span id='method-fm.icelink.closeCompleteArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.closeCompleteArgs} closeCompleteArgs The close complete arguments to serialize.
  	@return {String} The serialized JSON.
  */


  closeCompleteArgs.toJson = function() {
    var closeCompleteArgs;
    closeCompleteArgs = arguments[0];
    return fm.icelink.serializer.serializeCloseCompleteArgs(closeCompleteArgs);
  };

  /*<span id='method-fm.icelink.closeCompleteArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception that was generated while closing.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  closeCompleteArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.icelink.closeCompleteArgs-getLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the closed link.
  	 </div>
  
  	@function getLink
  	@return {fm.icelink.link}
  */


  closeCompleteArgs.prototype.getLink = function() {
    return this._link;
  };

  /*<span id='method-fm.icelink.closeCompleteArgs-getReason'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original reason for closing.
  	 </div>
  
  	@function getReason
  	@return {String}
  */


  closeCompleteArgs.prototype.getReason = function() {
    return this._reason;
  };

  closeCompleteArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  closeCompleteArgs.prototype.setLink = function() {
    var value;
    value = arguments[0];
    return this._link = value;
  };

  closeCompleteArgs.prototype.setReason = function() {
    var value;
    value = arguments[0];
    return this._reason = value;
  };

  /*<span id='method-fm.icelink.closeCompleteArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  closeCompleteArgs.prototype.toJson = function() {
    return fm.icelink.closeCompleteArgs.toJson(this);
  };

  return closeCompleteArgs;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.closeArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.closeArgs
 <div>
 Arguments for link close invocations.
 </div>

@extends fm.dynamic
*/


fm.icelink.closeArgs = (function(_super) {

  __extends(closeArgs, _super);

  closeArgs.prototype._onComplete = null;

  closeArgs.prototype._reason = null;

  /*<span id='method-fm.icelink.closeArgs-fm.icelink.closeArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.closeArgs">fm.icelink.closeArgs</see> class.
  	 </div>
  	@function fm.icelink.closeArgs
  	@param {String} reason The reason for closing.
  	@return {}
  */


  function closeArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setReason = __bind(this.setReason, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.getReason = __bind(this.getReason, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    var reason;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      closeArgs.call(this, null);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 1) {
      reason = arguments[0];
      closeArgs.__super__.constructor.call(this);
      this.setReason(reason);
      return;
    }
    if (arguments.length === 0) {
      closeArgs.call(this, null);
      return;
    }
  }

  /*<span id='method-fm.icelink.closeArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} closeArgsJson The JSON to deserialize.
  	@return {fm.icelink.closeArgs} The deserialized close arguments.
  */


  closeArgs.fromJson = function() {
    var closeArgsJson;
    closeArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeCloseArgs(closeArgsJson);
  };

  /*<span id='method-fm.icelink.closeArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.closeArgs} closeArgs The close arguments to serialize.
  	@return {String} The serialized JSON.
  */


  closeArgs.toJson = function() {
    var closeArgs;
    closeArgs = arguments[0];
    return fm.icelink.serializer.serializeCloseArgs(closeArgs);
  };

  /*<span id='method-fm.icelink.closeArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when the close operation completes.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  closeArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.icelink.closeArgs-getReason'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the reason for closing.
  	 </div>
  
  	@function getReason
  	@return {String}
  */


  closeArgs.prototype.getReason = function() {
    return this._reason;
  };

  /*<span id='method-fm.icelink.closeArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when the close operation completes.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  closeArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.icelink.closeArgs-setReason'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the reason for closing.
  	 </div>
  
  	@function setReason
  	@param {String} value
  	@return {void}
  */


  closeArgs.prototype.setReason = function() {
    var value;
    value = arguments[0];
    return this._reason = value;
  };

  /*<span id='method-fm.icelink.closeArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  closeArgs.prototype.toJson = function() {
    return fm.icelink.closeArgs.toJson(this);
  };

  return closeArgs;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.linkCandidateArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.linkCandidateArgs
 <div>
 Arguments for the link candidate event.
 </div>

@extends fm.icelink.baseLinkArgs
*/


fm.icelink.linkCandidateArgs = (function(_super) {

  __extends(linkCandidateArgs, _super);

  linkCandidateArgs.prototype._candidate = null;

  function linkCandidateArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setCandidate = __bind(this.setCandidate, this);

    this.getCandidate = __bind(this.getCandidate, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      linkCandidateArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    linkCandidateArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.linkCandidateArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} linkCandidateArgsJson The JSON to deserialize.
  	@return {fm.icelink.linkCandidateArgs} The deserialized link candidate arguments.
  */


  linkCandidateArgs.fromJson = function() {
    var linkCandidateArgsJson;
    linkCandidateArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeLinkCandidateArgs(linkCandidateArgsJson);
  };

  /*<span id='method-fm.icelink.linkCandidateArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.linkCandidateArgs} linkCandidateArgs The link candidate arguments to serialize.
  	@return {String} The serialized JSON.
  */


  linkCandidateArgs.toJson = function() {
    var linkCandidateArgs;
    linkCandidateArgs = arguments[0];
    return fm.icelink.serializer.serializeLinkCandidateArgs(linkCandidateArgs);
  };

  /*<span id='method-fm.icelink.linkCandidateArgs-getCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the discovered candidate.
  	 </div>
  
  	@function getCandidate
  	@return {fm.icelink.candidate}
  */


  linkCandidateArgs.prototype.getCandidate = function() {
    return this._candidate;
  };

  linkCandidateArgs.prototype.setCandidate = function() {
    var value;
    value = arguments[0];
    return this._candidate = value;
  };

  /*<span id='method-fm.icelink.linkCandidateArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  linkCandidateArgs.prototype.toJson = function() {
    return fm.icelink.linkCandidateArgs.toJson(this);
  };

  return linkCandidateArgs;

}).call(this, fm.icelink.baseLinkArgs);


/*<span id='cls-fm.icelink.linkReceiveRTCPArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.linkReceiveRTCPArgs
 <div>
 Arguments for the link receive-RTCP event.
 </div>

@extends fm.icelink.baseLinkArgs
*/


fm.icelink.linkReceiveRTCPArgs = (function(_super) {

  __extends(linkReceiveRTCPArgs, _super);

  linkReceiveRTCPArgs.prototype._packets = null;

  linkReceiveRTCPArgs.prototype._stream = null;

  function linkReceiveRTCPArgs() {
    this.setStream = __bind(this.setStream, this);

    this.setPackets = __bind(this.setPackets, this);

    this.getStream = __bind(this.getStream, this);

    this.getPackets = __bind(this.getPackets, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      linkReceiveRTCPArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    linkReceiveRTCPArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.linkReceiveRTCPArgs-getPackets'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the received packets.
  	 </div>
  
  	@function getPackets
  	@return {fm.array}
  */


  linkReceiveRTCPArgs.prototype.getPackets = function() {
    return this._packets;
  };

  /*<span id='method-fm.icelink.linkReceiveRTCPArgs-getStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the stream.
  	 </div>
  
  	@function getStream
  	@return {fm.icelink.stream}
  */


  linkReceiveRTCPArgs.prototype.getStream = function() {
    return this._stream;
  };

  linkReceiveRTCPArgs.prototype.setPackets = function() {
    var value;
    value = arguments[0];
    return this._packets = value;
  };

  linkReceiveRTCPArgs.prototype.setStream = function() {
    var value;
    value = arguments[0];
    return this._stream = value;
  };

  return linkReceiveRTCPArgs;

})(fm.icelink.baseLinkArgs);


/*<span id='cls-fm.icelink.linkReceiveRTPArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.linkReceiveRTPArgs
 <div>
 Arguments for the link receive RTP event.
 </div>

@extends fm.icelink.baseLinkArgs
*/


fm.icelink.linkReceiveRTPArgs = (function(_super) {

  __extends(linkReceiveRTPArgs, _super);

  linkReceiveRTPArgs.prototype._packet = null;

  linkReceiveRTPArgs.prototype._stream = null;

  linkReceiveRTPArgs.prototype._streamFormat = null;

  function linkReceiveRTPArgs() {
    this.setStreamFormat = __bind(this.setStreamFormat, this);

    this.setStream = __bind(this.setStream, this);

    this.setPacket = __bind(this.setPacket, this);

    this.getStreamFormat = __bind(this.getStreamFormat, this);

    this.getStream = __bind(this.getStream, this);

    this.getPacket = __bind(this.getPacket, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      linkReceiveRTPArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    linkReceiveRTPArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.linkReceiveRTPArgs-getPacket'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the received packet.
  	 </div>
  
  	@function getPacket
  	@return {fm.icelink.rtpPacket}
  */


  linkReceiveRTPArgs.prototype.getPacket = function() {
    return this._packet;
  };

  /*<span id='method-fm.icelink.linkReceiveRTPArgs-getStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the stream.
  	 </div>
  
  	@function getStream
  	@return {fm.icelink.stream}
  */


  linkReceiveRTPArgs.prototype.getStream = function() {
    return this._stream;
  };

  /*<span id='method-fm.icelink.linkReceiveRTPArgs-getStreamFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the stream format.
  	 </div>
  
  	@function getStreamFormat
  	@return {fm.icelink.streamFormat}
  */


  linkReceiveRTPArgs.prototype.getStreamFormat = function() {
    return this._streamFormat;
  };

  linkReceiveRTPArgs.prototype.setPacket = function() {
    var value;
    value = arguments[0];
    return this._packet = value;
  };

  linkReceiveRTPArgs.prototype.setStream = function() {
    var value;
    value = arguments[0];
    return this._stream = value;
  };

  linkReceiveRTPArgs.prototype.setStreamFormat = function() {
    var value;
    value = arguments[0];
    return this._streamFormat = value;
  };

  return linkReceiveRTPArgs;

})(fm.icelink.baseLinkArgs);


/*<span id='cls-fm.icelink.unhandledExceptionArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.unhandledExceptionArgs
 <div>
 Arguments for an unhandled exception.
 </div>

@extends fm.object
*/


fm.icelink.unhandledExceptionArgs = (function(_super) {

  __extends(unhandledExceptionArgs, _super);

  unhandledExceptionArgs.prototype._exception = null;

  unhandledExceptionArgs.prototype._handled = false;

  function unhandledExceptionArgs() {
    this.setHandled = __bind(this.setHandled, this);

    this.setException = __bind(this.setException, this);

    this.getHandled = __bind(this.getHandled, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      unhandledExceptionArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    unhandledExceptionArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.unhandledExceptionArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the unhandled exception.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  unhandledExceptionArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.icelink.unhandledExceptionArgs-getHandled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the exception has been
  	 appropriately handled. If set to <c>true</c>,
  	 then the exception will not be thrown.
  	 </div>
  
  	@function getHandled
  	@return {Boolean}
  */


  unhandledExceptionArgs.prototype.getHandled = function() {
    return this._handled;
  };

  /*<span id='method-fm.icelink.unhandledExceptionArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the unhandled exception.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  unhandledExceptionArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  /*<span id='method-fm.icelink.unhandledExceptionArgs-setHandled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether the exception has been
  	 appropriately handled. If set to <c>true</c>,
  	 then the exception will not be thrown.
  	 </div>
  
  	@function setHandled
  	@param {Boolean} value
  	@return {void}
  */


  unhandledExceptionArgs.prototype.setHandled = function() {
    var value;
    value = arguments[0];
    return this._handled = value;
  };

  return unhandledExceptionArgs;

})(fm.object);


/*<span id='cls-fm.icelink.baseConference'>&nbsp;</span>
*/

/**
@class fm.icelink.baseConference
 <div>
 Defines common base properties for conferences.
 </div>

@extends fm.dynamic
*/


fm.icelink.baseConference = (function(_super) {

  __extends(baseConference, _super);

  baseConference.prototype.__candidateMode = null;

  baseConference.prototype.__earlyCandidatesTimeout = 0;

  baseConference.prototype.__rtpPortMax = 0;

  baseConference.prototype.__rtpPortMin = 0;

  baseConference.prototype.__streams = null;

  baseConference.prototype._dtlsCertificate = null;

  baseConference.prototype._relayPassword = null;

  baseConference.prototype._relayRealm = null;

  baseConference.prototype._relayUsername = null;

  baseConference.prototype._serverAddresses = null;

  baseConference.prototype._suppressPrivateCandidates = false;

  baseConference.prototype._suppressPublicCandidates = false;

  baseConference.prototype._suppressRelayCandidates = false;

  baseConference.prototype._virtualAdapters = null;

  function baseConference() {
    this.setVirtualAdapters = __bind(this.setVirtualAdapters, this);

    this.setSuppressRelayCandidates = __bind(this.setSuppressRelayCandidates, this);

    this.setSuppressPublicCandidates = __bind(this.setSuppressPublicCandidates, this);

    this.setSuppressPrivateCandidates = __bind(this.setSuppressPrivateCandidates, this);

    this.setStreams = __bind(this.setStreams, this);

    this.setServerPort = __bind(this.setServerPort, this);

    this.setServerIPAddress = __bind(this.setServerIPAddress, this);

    this.setServerAddresses = __bind(this.setServerAddresses, this);

    this.setServerAddress = __bind(this.setServerAddress, this);

    this.setRtpPortMin = __bind(this.setRtpPortMin, this);

    this.setRtpPortMax = __bind(this.setRtpPortMax, this);

    this.setRelayUsername = __bind(this.setRelayUsername, this);

    this.setRelayRealm = __bind(this.setRelayRealm, this);

    this.setRelayPassword = __bind(this.setRelayPassword, this);

    this.setEarlyCandidatesTimeout = __bind(this.setEarlyCandidatesTimeout, this);

    this.setDtlsCertificate = __bind(this.setDtlsCertificate, this);

    this.setCandidateMode = __bind(this.setCandidateMode, this);

    this.getVirtualAdapters = __bind(this.getVirtualAdapters, this);

    this.getSuppressRelayCandidates = __bind(this.getSuppressRelayCandidates, this);

    this.getSuppressPublicCandidates = __bind(this.getSuppressPublicCandidates, this);

    this.getSuppressPrivateCandidates = __bind(this.getSuppressPrivateCandidates, this);

    this.getStreams = __bind(this.getStreams, this);

    this.getServerPort = __bind(this.getServerPort, this);

    this.getServerIPAddress = __bind(this.getServerIPAddress, this);

    this.getServerAddresses = __bind(this.getServerAddresses, this);

    this.getServerAddress = __bind(this.getServerAddress, this);

    this.getRtpPortMin = __bind(this.getRtpPortMin, this);

    this.getRtpPortMax = __bind(this.getRtpPortMax, this);

    this.getRelayUsername = __bind(this.getRelayUsername, this);

    this.getRelayRealm = __bind(this.getRelayRealm, this);

    this.getRelayPassword = __bind(this.getRelayPassword, this);

    this.getEarlyCandidatesTimeout = __bind(this.getEarlyCandidatesTimeout, this);

    this.getDtlsCertificate = __bind(this.getDtlsCertificate, this);

    this.getCandidateMode = __bind(this.getCandidateMode, this);

    this.copyFrom = __bind(this.copyFrom, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseConference.__super__.constructor.call(this);
      this.__rtpPortMin = 1024;
      this.__rtpPortMax = 65534;
      this.__candidateMode = fm.icelink.candidateMode.Late;
      this.__earlyCandidatesTimeout = 500;
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseConference.__super__.constructor.call(this);
    this.__rtpPortMin = 1024;
    this.__rtpPortMax = 65534;
    this.__candidateMode = fm.icelink.candidateMode.Late;
    this.__earlyCandidatesTimeout = 500;
  }

  baseConference.parseAddress = function() {
    var address, host, port, strArray, _var0, _var1;
    address = arguments[0];
    host = arguments[1];
    port = arguments[2];
    host.setValue(null);
    port.setValue(3478);
    _var0 = address;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return false;
    }
    strArray = fm.stringExtensions.split(address, [':']);
    if (strArray.length > 0) {
      host.setValue(strArray[0]);
    }
    _var1 = fm.parseAssistant.tryParseInteger(strArray[1], port);
    if ((strArray.length > 1) && !_var1) {
      port.setValue(3478);
    }
    return true;
  };

  baseConference.prototype.copyFrom = function() {
    var baseLink;
    baseLink = arguments[0];
    this.setSuppressPrivateCandidates(baseLink.getSuppressPrivateCandidates());
    this.setSuppressPublicCandidates(baseLink.getSuppressPublicCandidates());
    this.setSuppressRelayCandidates(baseLink.getSuppressRelayCandidates());
    this.setDtlsCertificate(baseLink.getDtlsCertificate());
    this.setRtpPortMin(baseLink.getRtpPortMin());
    this.setRtpPortMax(baseLink.getRtpPortMax());
    this.setRelayUsername(baseLink.getRelayUsername());
    this.setRelayPassword(baseLink.getRelayPassword());
    this.setRelayRealm(baseLink.getRelayRealm());
    this.setCandidateMode(baseLink.getCandidateMode());
    this.setEarlyCandidatesTimeout(baseLink.getEarlyCandidatesTimeout());
    return this.setVirtualAdapters(baseLink.getVirtualAdapters());
  };

  /*<span id='method-fm.icelink.baseConference-getCandidateMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the mode of operation for candidate gathering.
  	 </div>
  
  	@function getCandidateMode
  	@return {fm.icelink.candidateMode}
  */


  baseConference.prototype.getCandidateMode = function() {
    return this.__candidateMode;
  };

  /*<span id='method-fm.icelink.baseConference-getDtlsCertificate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the certificate to use for DTLS key exchange.
  	 </div>
  
  	@function getDtlsCertificate
  	@return {fm.icelink.certificate}
  */


  baseConference.prototype.getDtlsCertificate = function() {
    return this._dtlsCertificate;
  };

  /*<span id='method-fm.icelink.baseConference-getEarlyCandidatesTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the amount of time (in milliseconds) to wait
  	 before halting gathering efforts for early candidates.
  	 Only applies when <see cref="fm.icelink.baseConference.candidateMode">fm.icelink.baseConference.candidateMode</see> is set to
  	 Early. Defaults to 500.
  	 </div>
  
  	@function getEarlyCandidatesTimeout
  	@return {Integer}
  */


  baseConference.prototype.getEarlyCandidatesTimeout = function() {
    return this.__earlyCandidatesTimeout;
  };

  /*<span id='method-fm.icelink.baseConference-getRelayPassword'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the long-term password credential used to authenticate relay requests.
  	 </div>
  
  	@function getRelayPassword
  	@return {String}
  */


  baseConference.prototype.getRelayPassword = function() {
    return this._relayPassword;
  };

  /*<span id='method-fm.icelink.baseConference-getRelayRealm'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the long-term realm credential used to authenticate relay requests.
  	 </div>
  
  	@function getRelayRealm
  	@return {String}
  */


  baseConference.prototype.getRelayRealm = function() {
    return this._relayRealm;
  };

  /*<span id='method-fm.icelink.baseConference-getRelayUsername'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the long-term username credential used to authenticate relay requests.
  	 </div>
  
  	@function getRelayUsername
  	@return {String}
  */


  baseConference.prototype.getRelayUsername = function() {
    return this._relayUsername;
  };

  /*<span id='method-fm.icelink.baseConference-getRtpPortMax'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the maximum even-numbered port IceLink will use
  	 when creating sockets for UDP packet transfer.
  	 </div>
  
  	@function getRtpPortMax
  	@return {Integer}
  */


  baseConference.prototype.getRtpPortMax = function() {
    return this.__rtpPortMax;
  };

  /*<span id='method-fm.icelink.baseConference-getRtpPortMin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the minimum even-numbered port IceLink will use
  	 when creating sockets for UDP packet transfer.
  	 </div>
  
  	@function getRtpPortMin
  	@return {Integer}
  */


  baseConference.prototype.getRtpPortMin = function() {
    return this.__rtpPortMin;
  };

  /*<span id='method-fm.icelink.baseConference-getServerAddress'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the IceLink server address.
  	 Server addresses are formatted as {address}
  	 or {address}:{port}. If the port is not
  	 specified, it will default to 3478.
  	 </div>
  
  	@function getServerAddress
  	@return {String}
  */


  baseConference.prototype.getServerAddress = function() {
    var serverAddresses, _var0;
    serverAddresses = this.getServerAddresses();
    _var0 = serverAddresses;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (serverAddresses.length > 0)) {
      return serverAddresses[0];
    }
    return null;
  };

  /*<span id='method-fm.icelink.baseConference-getServerAddresses'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the IceLink server addresses.
  	 Server addresses are formatted as {address}
  	 or {address}:{port}. If the port is not
  	 specified, it will default to 3478.
  	 </div>
  
  	@function getServerAddresses
  	@return {fm.array}
  */


  baseConference.prototype.getServerAddresses = function() {
    return this._serverAddresses;
  };

  /*<span id='method-fm.icelink.baseConference-getServerIPAddress'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the IceLink server address.
  	 Overload for <see cref="fm.icelink.baseConference.serverAddress">fm.icelink.baseConference.serverAddress</see>.
  	 Use <see cref="fm.icelink.baseConference.serverAddress">fm.icelink.baseConference.serverAddress</see> instead.
  	 </div>
  
  	@function getServerIPAddress
  	@return {String}
  */


  baseConference.prototype.getServerIPAddress = function() {
    return this.getServerAddress();
  };

  /*<span id='method-fm.icelink.baseConference-getServerPort'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the IceLink server port.
  	 </div>
  
  	@function getServerPort
  	@return {Integer}
  */


  baseConference.prototype.getServerPort = function() {
    var host, port, serverAddress, _var0, _var1, _var2, _var3;
    serverAddress = this.getServerAddress();
    _var0 = serverAddress;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      host = null;
      port = 0;
      _var1 = new fm.holder(host);
      _var2 = new fm.holder(port);
      _var3 = fm.icelink.baseConference.parseAddress(serverAddress, _var1, _var2);
      host = _var1.getValue();
      port = _var2.getValue();
      if (_var3) {
        return port;
      }
    }
    return 3478;
  };

  /*<span id='method-fm.icelink.baseConference-getStreams'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the IceLink streams.
  	 </div>
  
  	@function getStreams
  	@return {fm.array}
  */


  baseConference.prototype.getStreams = function() {
    return this.__streams;
  };

  /*<span id='method-fm.icelink.baseConference-getSuppressPrivateCandidates'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value that indicates whether private (local/host) candidates should be suppressed.
  	 </div>
  
  	@function getSuppressPrivateCandidates
  	@return {Boolean}
  */


  baseConference.prototype.getSuppressPrivateCandidates = function() {
    return this._suppressPrivateCandidates;
  };

  /*<span id='method-fm.icelink.baseConference-getSuppressPublicCandidates'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value that indicates whether public (NAT/reflexive) candidates should be suppressed.
  	 </div>
  
  	@function getSuppressPublicCandidates
  	@return {Boolean}
  */


  baseConference.prototype.getSuppressPublicCandidates = function() {
    return this._suppressPublicCandidates;
  };

  /*<span id='method-fm.icelink.baseConference-getSuppressRelayCandidates'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value that indicates whether relay candidates should be suppressed.
  	 </div>
  
  	@function getSuppressRelayCandidates
  	@return {Boolean}
  */


  baseConference.prototype.getSuppressRelayCandidates = function() {
    return this._suppressRelayCandidates;
  };

  /*<span id='method-fm.icelink.baseConference-getVirtualAdapters'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the virtual adapters to use
  	 instead of the local device adapters.
  	 </div>
  
  	@function getVirtualAdapters
  	@return {fm.array}
  */


  baseConference.prototype.getVirtualAdapters = function() {
    return this._virtualAdapters;
  };

  /*<span id='method-fm.icelink.baseConference-setCandidateMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the mode of operation for candidate gathering.
  	 </div>
  
  	@function setCandidateMode
  	@param {fm.icelink.candidateMode} value
  	@return {void}
  */


  baseConference.prototype.setCandidateMode = function() {
    var value;
    value = arguments[0];
    return this.__candidateMode = value;
  };

  /*<span id='method-fm.icelink.baseConference-setDtlsCertificate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the certificate to use for DTLS key exchange.
  	 </div>
  
  	@function setDtlsCertificate
  	@param {fm.icelink.certificate} value
  	@return {void}
  */


  baseConference.prototype.setDtlsCertificate = function() {
    var value;
    value = arguments[0];
    return this._dtlsCertificate = value;
  };

  /*<span id='method-fm.icelink.baseConference-setEarlyCandidatesTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the amount of time (in milliseconds) to wait
  	 before halting gathering efforts for early candidates.
  	 Only applies when <see cref="fm.icelink.baseConference.candidateMode">fm.icelink.baseConference.candidateMode</see> is set to
  	 Early. Defaults to 500.
  	 </div>
  
  	@function setEarlyCandidatesTimeout
  	@param {Integer} value
  	@return {void}
  */


  baseConference.prototype.setEarlyCandidatesTimeout = function() {
    var value;
    value = arguments[0];
    return this.__earlyCandidatesTimeout = value;
  };

  /*<span id='method-fm.icelink.baseConference-setRelayPassword'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the long-term password credential used to authenticate relay requests.
  	 </div>
  
  	@function setRelayPassword
  	@param {String} value
  	@return {void}
  */


  baseConference.prototype.setRelayPassword = function() {
    var value;
    value = arguments[0];
    return this._relayPassword = value;
  };

  /*<span id='method-fm.icelink.baseConference-setRelayRealm'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the long-term realm credential used to authenticate relay requests.
  	 </div>
  
  	@function setRelayRealm
  	@param {String} value
  	@return {void}
  */


  baseConference.prototype.setRelayRealm = function() {
    var value;
    value = arguments[0];
    return this._relayRealm = value;
  };

  /*<span id='method-fm.icelink.baseConference-setRelayUsername'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the long-term username credential used to authenticate relay requests.
  	 </div>
  
  	@function setRelayUsername
  	@param {String} value
  	@return {void}
  */


  baseConference.prototype.setRelayUsername = function() {
    var value;
    value = arguments[0];
    return this._relayUsername = value;
  };

  /*<span id='method-fm.icelink.baseConference-setRtpPortMax'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the maximum even-numbered port IceLink will use
  	 when creating sockets for UDP packet transfer.
  	 </div>
  
  	@function setRtpPortMax
  	@param {Integer} value
  	@return {void}
  */


  baseConference.prototype.setRtpPortMax = function() {
    var value;
    value = arguments[0];
    if ((value % 2) === 1) {
      throw new Error("RTP port numbers must be even.");
    }
    if ((value < 1024) || (value > 65534)) {
      throw new Error("Value must be greater than or equal to 1024 and less than or equal to 65,534.");
    }
    return this.__rtpPortMax = value;
  };

  /*<span id='method-fm.icelink.baseConference-setRtpPortMin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the minimum even-numbered port IceLink will use
  	 when creating sockets for UDP packet transfer.
  	 </div>
  
  	@function setRtpPortMin
  	@param {Integer} value
  	@return {void}
  */


  baseConference.prototype.setRtpPortMin = function() {
    var value;
    value = arguments[0];
    if ((value % 2) === 1) {
      throw new Error("RTP port numbers must be even.");
    }
    if ((value < 1024) || (value > 65534)) {
      throw new Error("Value must be greater than or equal to 1024 and less than or equal to 65,534.");
    }
    return this.__rtpPortMin = value;
  };

  /*<span id='method-fm.icelink.baseConference-setServerAddress'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the IceLink server address.
  	 Server addresses are formatted as {address}
  	 or {address}:{port}. If the port is not
  	 specified, it will default to 3478.
  	 </div>
  
  	@function setServerAddress
  	@param {String} value
  	@return {void}
  */


  baseConference.prototype.setServerAddress = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return this.setServerAddresses(null);
    } else {
      return this.setServerAddresses([value]);
    }
  };

  /*<span id='method-fm.icelink.baseConference-setServerAddresses'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the IceLink server addresses.
  	 Server addresses are formatted as {address}
  	 or {address}:{port}. If the port is not
  	 specified, it will default to 3478.
  	 </div>
  
  	@function setServerAddresses
  	@param {fm.array} value
  	@return {void}
  */


  baseConference.prototype.setServerAddresses = function() {
    var value;
    value = arguments[0];
    return this._serverAddresses = value;
  };

  /*<span id='method-fm.icelink.baseConference-setServerIPAddress'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the IceLink server address.
  	 Overload for <see cref="fm.icelink.baseConference.serverAddress">fm.icelink.baseConference.serverAddress</see>.
  	 Use <see cref="fm.icelink.baseConference.serverAddress">fm.icelink.baseConference.serverAddress</see> instead.
  	 </div>
  
  	@function setServerIPAddress
  	@param {String} value
  	@return {void}
  */


  baseConference.prototype.setServerIPAddress = function() {
    var value;
    value = arguments[0];
    return this.setServerAddress(value);
  };

  /*<span id='method-fm.icelink.baseConference-setServerPort'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the IceLink server port.
  	 </div>
  
  	@function setServerPort
  	@param {Integer} value
  	@return {void}
  */


  baseConference.prototype.setServerPort = function() {
    var host, port, serverAddress, value, _var0, _var1, _var2, _var3, _var4;
    value = arguments[0];
    host = null;
    serverAddress = this.getServerAddress();
    _var0 = serverAddress;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      port = 0;
      _var1 = new fm.holder(host);
      _var2 = new fm.holder(port);
      _var3 = fm.icelink.baseConference.parseAddress(serverAddress, _var1, _var2);
      host = _var1.getValue();
      port = _var2.getValue();
      _var3;

    }
    _var4 = host;
    if (_var4 === null || typeof _var4 === 'undefined') {
      host = "127.0.0.1";
    }
    return this.setServerAddress(fm.stringExtensions.format("{0}:{1}", host, fm.intExtensions.toString(value)));
  };

  /*<span id='method-fm.icelink.baseConference-setStreams'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the IceLink streams.
  	 </div>
  
  	@function setStreams
  	@param {fm.array} value
  	@return {void}
  */


  baseConference.prototype.setStreams = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("Streams cannot be null.");
    }
    return this.__streams = value;
  };

  /*<span id='method-fm.icelink.baseConference-setSuppressPrivateCandidates'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a value that indicates whether private (local/host) candidates should be suppressed.
  	 </div>
  
  	@function setSuppressPrivateCandidates
  	@param {Boolean} value
  	@return {void}
  */


  baseConference.prototype.setSuppressPrivateCandidates = function() {
    var value;
    value = arguments[0];
    return this._suppressPrivateCandidates = value;
  };

  /*<span id='method-fm.icelink.baseConference-setSuppressPublicCandidates'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a value that indicates whether public (NAT/reflexive) candidates should be suppressed.
  	 </div>
  
  	@function setSuppressPublicCandidates
  	@param {Boolean} value
  	@return {void}
  */


  baseConference.prototype.setSuppressPublicCandidates = function() {
    var value;
    value = arguments[0];
    return this._suppressPublicCandidates = value;
  };

  /*<span id='method-fm.icelink.baseConference-setSuppressRelayCandidates'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a value that indicates whether relay candidates should be suppressed.
  	 </div>
  
  	@function setSuppressRelayCandidates
  	@param {Boolean} value
  	@return {void}
  */


  baseConference.prototype.setSuppressRelayCandidates = function() {
    var value;
    value = arguments[0];
    return this._suppressRelayCandidates = value;
  };

  /*<span id='method-fm.icelink.baseConference-setVirtualAdapters'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the virtual adapters to use
  	 instead of the local device adapters.
  	 </div>
  
  	@function setVirtualAdapters
  	@param {fm.array} value
  	@return {void}
  */


  baseConference.prototype.setVirtualAdapters = function() {
    var value;
    value = arguments[0];
    return this._virtualAdapters = value;
  };

  return baseConference;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.baseLink'>&nbsp;</span>
*/

/**
@class fm.icelink.baseLink
 <div>
 Defines common base properties for links.
 </div>

@extends fm.icelink.baseConference
*/


fm.icelink.baseLink = (function(_super) {

  __extends(baseLink, _super);

  baseLink.prototype.__allLocalCandidates = null;

  baseLink.prototype.__allLocalCandidatesLock = null;

  baseLink.prototype.__allRemoteCandidates = null;

  baseLink.prototype.__allRemoteCandidatesLock = null;

  baseLink.prototype.__controlling = false;

  baseLink.prototype.__hasAccepted = false;

  baseLink.prototype.__hasClosed = false;

  baseLink.prototype.__hasCreated = false;

  baseLink.prototype.__hasOpened = false;

  baseLink.prototype.__isAccepting = false;

  baseLink.prototype.__isClosing = false;

  baseLink.prototype.__isCreating = false;

  baseLink.prototype.__isOpened = false;

  baseLink.prototype.__isOpening = false;

  baseLink.prototype.__localOfferAnswer = null;

  baseLink.prototype.__negotiatedStreams = null;

  baseLink.prototype.__reachedPeer = false;

  baseLink.prototype.__reachedServer = false;

  baseLink.prototype.__remoteOfferAnswer = null;

  baseLink.prototype.__tieBreaker = null;

  baseLink.prototype.__wasUp = false;

  baseLink.prototype._acceptArgs = null;

  baseLink.prototype._closeArgs = null;

  baseLink.prototype._conference = null;

  baseLink.prototype._createArgs = null;

  baseLink.prototype._earlyCandidates = null;

  baseLink.prototype._initializeCallback = null;

  baseLink.prototype._initialized = false;

  baseLink.prototype._onCandidate = null;

  baseLink.prototype._onDown = null;

  baseLink.prototype._onInit = null;

  baseLink.prototype._onOfferAnswer = null;

  baseLink.prototype._onReceiveRTCP = null;

  baseLink.prototype._onReceiveRTP = null;

  baseLink.prototype._onUnhandledException = null;

  baseLink.prototype._onUp = null;

  baseLink.prototype._peerId = null;

  baseLink.prototype._peerState = null;

  baseLink.prototype._raisedDown = false;

  baseLink.prototype._raisedDownLock = null;

  baseLink.prototype._raisedInit = false;

  baseLink.prototype._raisedInitLock = null;

  baseLink.prototype._raisedUp = false;

  baseLink.prototype._raisedUpLock = null;

  baseLink.prototype._stateLock = null;

  function baseLink() {
    this.setPeerState = __bind(this.setPeerState, this);

    this.setPeerId = __bind(this.setPeerId, this);

    this.setConference = __bind(this.setConference, this);

    this.removeOnUp = __bind(this.removeOnUp, this);

    this.removeOnUnhandledException = __bind(this.removeOnUnhandledException, this);

    this.removeOnReceiveRTP = __bind(this.removeOnReceiveRTP, this);

    this.removeOnReceiveRTCP = __bind(this.removeOnReceiveRTCP, this);

    this.removeOnOfferAnswer = __bind(this.removeOnOfferAnswer, this);

    this.removeOnInit = __bind(this.removeOnInit, this);

    this.removeOnDown = __bind(this.removeOnDown, this);

    this.removeOnCandidate = __bind(this.removeOnCandidate, this);

    this.raiseUp = __bind(this.raiseUp, this);

    this.raiseUnhandledException = __bind(this.raiseUnhandledException, this);

    this.raiseReceiveRTP = __bind(this.raiseReceiveRTP, this);

    this.raiseReceiveRTCP = __bind(this.raiseReceiveRTCP, this);

    this.raiseOfferAnswer = __bind(this.raiseOfferAnswer, this);

    this.raiseInit = __bind(this.raiseInit, this);

    this.raiseDown = __bind(this.raiseDown, this);

    this.raiseCreateSuccess = __bind(this.raiseCreateSuccess, this);

    this.raiseCreateFailure = __bind(this.raiseCreateFailure, this);

    this.raiseCreateComplete = __bind(this.raiseCreateComplete, this);

    this.raiseCloseComplete = __bind(this.raiseCloseComplete, this);

    this.raiseCandidate = __bind(this.raiseCandidate, this);

    this.raiseAcceptSuccess = __bind(this.raiseAcceptSuccess, this);

    this.raiseAcceptFailure = __bind(this.raiseAcceptFailure, this);

    this.raiseAcceptComplete = __bind(this.raiseAcceptComplete, this);

    this.onCreateSuccess = __bind(this.onCreateSuccess, this);

    this.onCreateFailure = __bind(this.onCreateFailure, this);

    this.onCloseComplete = __bind(this.onCloseComplete, this);

    this.onAcceptSuccess = __bind(this.onAcceptSuccess, this);

    this.onAcceptFailure = __bind(this.onAcceptFailure, this);

    this.logOfferAnswer = __bind(this.logOfferAnswer, this);

    this.logCandidate = __bind(this.logCandidate, this);

    this.initializeInternal = __bind(this.initializeInternal, this);

    this.initializeComplete = __bind(this.initializeComplete, this);

    this.initialize = __bind(this.initialize, this);

    this.getWasUp = __bind(this.getWasUp, this);

    this.getTieBreaker = __bind(this.getTieBreaker, this);

    this.getRemoteOfferAnswer = __bind(this.getRemoteOfferAnswer, this);

    this.getReachedServer = __bind(this.getReachedServer, this);

    this.getReachedPeer = __bind(this.getReachedPeer, this);

    this.getPeerState = __bind(this.getPeerState, this);

    this.getPeerId = __bind(this.getPeerId, this);

    this.getNegotiatedStreams = __bind(this.getNegotiatedStreams, this);

    this.getLocalOfferAnswer = __bind(this.getLocalOfferAnswer, this);

    this.getIsOpening = __bind(this.getIsOpening, this);

    this.getIsOpened = __bind(this.getIsOpened, this);

    this.getIsCreating = __bind(this.getIsCreating, this);

    this.getIsClosing = __bind(this.getIsClosing, this);

    this.getIsAccepting = __bind(this.getIsAccepting, this);

    this.getHasOpened = __bind(this.getHasOpened, this);

    this.getHasCreated = __bind(this.getHasCreated, this);

    this.getHasClosed = __bind(this.getHasClosed, this);

    this.getHasAccepted = __bind(this.getHasAccepted, this);

    this.getControlling = __bind(this.getControlling, this);

    this.getConference = __bind(this.getConference, this);

    this.getAllRemoteCandidateTypes = __bind(this.getAllRemoteCandidateTypes, this);

    this.getAllRemoteCandidates = __bind(this.getAllRemoteCandidates, this);

    this.getAllLocalCandidateTypes = __bind(this.getAllLocalCandidateTypes, this);

    this.getAllLocalCandidates = __bind(this.getAllLocalCandidates, this);

    this.createOffer = __bind(this.createOffer, this);

    this.createInternal = __bind(this.createInternal, this);

    this.createAnswer = __bind(this.createAnswer, this);

    this.create = __bind(this.create, this);

    this.closeInternal = __bind(this.closeInternal, this);

    this.close = __bind(this.close, this);

    this.cacheRemoteCandidate = __bind(this.cacheRemoteCandidate, this);

    this.cacheLocalCandidate = __bind(this.cacheLocalCandidate, this);

    this.addRemoteCandidateInternal = __bind(this.addRemoteCandidateInternal, this);

    this.addRemoteCandidate = __bind(this.addRemoteCandidate, this);

    this.addOnUp = __bind(this.addOnUp, this);

    this.addOnUnhandledException = __bind(this.addOnUnhandledException, this);

    this.addOnReceiveRTP = __bind(this.addOnReceiveRTP, this);

    this.addOnReceiveRTCP = __bind(this.addOnReceiveRTCP, this);

    this.addOnOfferAnswer = __bind(this.addOnOfferAnswer, this);

    this.addOnInit = __bind(this.addOnInit, this);

    this.addOnDown = __bind(this.addOnDown, this);

    this.addOnCandidate = __bind(this.addOnCandidate, this);

    this.acceptInternal = __bind(this.acceptInternal, this);

    this.accept = __bind(this.accept, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseLink.__super__.constructor.call(this);
      this.__tieBreaker = fm.guid.newGuid().toString();
      this.__isCreating = false;
      this.__hasCreated = false;
      this.__isAccepting = false;
      this.__hasAccepted = false;
      this.__isClosing = false;
      this.__hasClosed = false;
      this.__isOpening = false;
      this.__hasOpened = false;
      this.__isOpened = false;
      this.__negotiatedStreams = null;
      this.__allLocalCandidates = [];
      this.__allLocalCandidatesLock = new fm.object();
      this.__allRemoteCandidates = [];
      this.__allRemoteCandidatesLock = new fm.object();
      this._initialized = false;
      this._createArgs = null;
      this._acceptArgs = null;
      this._closeArgs = null;
      this._earlyCandidates = [];
      this._stateLock = new fm.object();
      this._initializeCallback = null;
      this._raisedInit = false;
      this._raisedInitLock = new fm.object();
      this._raisedUp = false;
      this._raisedUpLock = new fm.object();
      this._raisedDown = false;
      this._raisedDownLock = new fm.object();
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseLink.__super__.constructor.call(this);
    this.__tieBreaker = fm.guid.newGuid().toString();
    this.__isCreating = false;
    this.__hasCreated = false;
    this.__isAccepting = false;
    this.__hasAccepted = false;
    this.__isClosing = false;
    this.__hasClosed = false;
    this.__isOpening = false;
    this.__hasOpened = false;
    this.__isOpened = false;
    this.__negotiatedStreams = null;
    this.__allLocalCandidates = [];
    this.__allLocalCandidatesLock = new fm.object();
    this.__allRemoteCandidates = [];
    this.__allRemoteCandidatesLock = new fm.object();
    this._initialized = false;
    this._createArgs = null;
    this._acceptArgs = null;
    this._closeArgs = null;
    this._earlyCandidates = [];
    this._stateLock = new fm.object();
    this._initializeCallback = null;
    this._raisedInit = false;
    this._raisedInitLock = new fm.object();
    this._raisedUp = false;
    this._raisedUpLock = new fm.object();
    this._raisedDown = false;
    this._raisedDownLock = new fm.object();
  }

  /*<span id='method-fm.icelink.baseLink-accept'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Accepts an offer or answer.
  	 </div>
  	@function accept
  	@param {fm.icelink.acceptArgs} acceptArgs The arguments.
  	@return {void}
  */


  baseLink.prototype.accept = function() {
    var acceptArgs, _var0;
    acceptArgs = arguments[0];
    _var0 = acceptArgs;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("acceptArgs cannot be null.");
    }
    if (this.getRtpPortMin() > this.getRtpPortMax()) {
      throw new Error("RTPPortMin cannot be greater than RTPPortMax.");
    }
    if (!this._initialized) {
      throw new Error("Link must be initialized before an offer/answer can be accepted.");
    }
    try {
      if (this.getIsAccepting() || this.getHasAccepted()) {
        throw new Error("Accept can only be invoked once.");
      }
      this._acceptArgs = acceptArgs;
      this.__isAccepting = true;
      this.__hasAccepted = false;
      this.__reachedPeer = true;
      this.__remoteOfferAnswer = acceptArgs.getOfferAnswer();
      if (fm.log.getIsDebugEnabled()) {
        this.logOfferAnswer(acceptArgs.getOfferAnswer(), false);
      }
      return this.acceptInternal(acceptArgs, this.onAcceptSuccess, this.onAcceptFailure);
    } catch (exception) {
      this.raiseAcceptFailure(acceptArgs, exception);
      return this.raiseAcceptComplete(acceptArgs);
    } finally {

    }
  };

  baseLink.prototype.acceptInternal = function() {
    var acceptArgs, failure, success;
    acceptArgs = arguments[0];
    success = arguments[1];
    return failure = arguments[2];
  };

  /*<span id='method-fm.icelink.baseLink-addOnCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a candidate is discovered.
  	 The candidate should be sent immediately (out-of-band) to the remote peer.
  	 </div>
  
  	@function addOnCandidate
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.addOnCandidate = function() {
    var value;
    value = arguments[0];
    return this._onCandidate = fm.delegate.combine(this._onCandidate, value);
  };

  /*<span id='method-fm.icelink.baseLink-addOnDown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link is down.
  	 </div>
  
  	@function addOnDown
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.addOnDown = function() {
    var value;
    value = arguments[0];
    return this._onDown = fm.delegate.combine(this._onDown, value);
  };

  /*<span id='method-fm.icelink.baseLink-addOnInit'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link is initializing.
  	 </div>
  
  	@function addOnInit
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.addOnInit = function() {
    var value;
    value = arguments[0];
    return this._onInit = fm.delegate.combine(this._onInit, value);
  };

  /*<span id='method-fm.icelink.baseLink-addOnOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when an offer/answer is created.
  	 </div>
  
  	@function addOnOfferAnswer
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.addOnOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._onOfferAnswer = fm.delegate.combine(this._onOfferAnswer, value);
  };

  /*<span id='method-fm.icelink.baseLink-addOnReceiveRTCP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when RTCP packets are received.
  	 </div>
  
  	@function addOnReceiveRTCP
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.addOnReceiveRTCP = function() {
    var value;
    value = arguments[0];
    return this._onReceiveRTCP = fm.delegate.combine(this._onReceiveRTCP, value);
  };

  /*<span id='method-fm.icelink.baseLink-addOnReceiveRTP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when an RTP packet is received.
  	 </div>
  
  	@function addOnReceiveRTP
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.addOnReceiveRTP = function() {
    var value;
    value = arguments[0];
    return this._onReceiveRTP = fm.delegate.combine(this._onReceiveRTP, value);
  };

  /*<span id='method-fm.icelink.baseLink-addOnUnhandledException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function addOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.addOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.combine(this._onUnhandledException, value);
  };

  /*<span id='method-fm.icelink.baseLink-addOnUp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link is up.
  	 </div>
  
  	@function addOnUp
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.addOnUp = function() {
    var value;
    value = arguments[0];
    return this._onUp = fm.delegate.combine(this._onUp, value);
  };

  /*<span id='method-fm.icelink.baseLink-addRemoteCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a peer candidate for consideration in path discovery.
  	 </div>
  	@function addRemoteCandidate
  	@param {fm.icelink.candidate} candidate The peer candidate.
  	@return {void}
  */


  baseLink.prototype.addRemoteCandidate = function() {
    var candidate, _var0;
    candidate = arguments[0];
    _var0 = candidate;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("candidate cannot be null.");
    }
    this.cacheRemoteCandidate(candidate);
    if (fm.log.getIsDebugEnabled()) {
      this.logCandidate(candidate, false);
    }
    if (!(this.getHasCreated() && this.getHasAccepted())) {
      fm.arrayExtensions.add(this._earlyCandidates, candidate);
      return;
    }
    return this.addRemoteCandidateInternal(candidate);
  };

  baseLink.prototype.addRemoteCandidateInternal = function() {
    var candidate;
    return candidate = arguments[0];
  };

  baseLink.prototype.cacheLocalCandidate = function() {
    var candidate;
    candidate = arguments[0];
    return fm.arrayExtensions.add(this.__allLocalCandidates, candidate);
  };

  baseLink.prototype.cacheRemoteCandidate = function() {
    var candidate;
    candidate = arguments[0];
    return fm.arrayExtensions.add(this.__allRemoteCandidates, candidate);
  };

  /*<span id='method-fm.icelink.baseLink-close'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Closes the link.
  	 </div>
  	@function close
  	@param {fm.icelink.closeArgs} closeArgs The close arguments.
  	@return {void}
  */


  baseLink.prototype.close = function() {
    var closeArgs, _var0;
    if (arguments.length === 1) {
      closeArgs = arguments[0];
      _var0 = closeArgs;
      if (_var0 === null || typeof _var0 === 'undefined') {
        throw new Error("closeArgs cannot be null.");
      }
      try {
        if (this.getIsClosing() || this.getHasClosed()) {
          throw new Error("Close can only be invoked once.");
        }
        this._closeArgs = closeArgs;
        this.__isClosing = true;
        this.closeInternal(closeArgs, this.onCloseComplete);
      } catch (exception) {
        this.raiseCloseComplete(closeArgs, exception);
      } finally {

      }
      return;
    }
    if (arguments.length === 0) {
      this.close(new fm.icelink.closeArgs());
    }
  };

  baseLink.prototype.closeInternal = function() {
    var closeArgs, complete;
    closeArgs = arguments[0];
    return complete = arguments[1];
  };

  baseLink.prototype.create = function() {
    var controlling, createArgs, _var0;
    createArgs = arguments[0];
    controlling = arguments[1];
    _var0 = createArgs;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("createArgs cannot be null.");
    }
    if (this.getRtpPortMin() > this.getRtpPortMax()) {
      throw new Error("RTPPortMin cannot be greater than RTPPortMax.");
    }
    if (!this._initialized) {
      throw new Error("Link must be initialized before an offer/answer can be created.");
    }
    try {
      if (this.getIsCreating() || this.getHasCreated()) {
        throw new Error("Create can only be invoked once.");
      }
      this.__controlling = controlling;
      this._createArgs = createArgs;
      this.__isCreating = true;
      this.__hasCreated = false;
      return this.createInternal(createArgs, controlling, this.onCreateSuccess, this.onCreateFailure);
    } catch (exception) {
      this.raiseCreateFailure(createArgs, exception);
      return this.raiseCreateComplete(createArgs);
    } finally {

    }
  };

  /*<span id='method-fm.icelink.baseLink-createAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates an answer.
  	 </div>
  	@function createAnswer
  	@param {fm.icelink.createArgs} createArgs The arguments.
  	@return {void}
  */


  baseLink.prototype.createAnswer = function() {
    var createArgs;
    createArgs = arguments[0];
    return this.create(createArgs, false);
  };

  baseLink.prototype.createInternal = function() {
    var controlling, createArgs, failure, success;
    createArgs = arguments[0];
    controlling = arguments[1];
    success = arguments[2];
    return failure = arguments[3];
  };

  /*<span id='method-fm.icelink.baseLink-createOffer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates an offer.
  	 </div>
  	@function createOffer
  	@param {fm.icelink.createArgs} createArgs The arguments.
  	@return {void}
  */


  baseLink.prototype.createOffer = function() {
    var createArgs;
    createArgs = arguments[0];
    return this.create(createArgs, true);
  };

  /*<span id='method-fm.icelink.baseLink-getAllLocalCandidates'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active and inactive local candidates.
  	 </div>
  
  	@function getAllLocalCandidates
  	@return {fm.array}
  */


  baseLink.prototype.getAllLocalCandidates = function() {
    return fm.arrayExtensions.toArray(this.__allLocalCandidates);
  };

  /*<span id='method-fm.icelink.baseLink-getAllLocalCandidateTypes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active and inactive local candidate types.
  	 </div>
  
  	@function getAllLocalCandidateTypes
  	@return {fm.array}
  */


  baseLink.prototype.getAllLocalCandidateTypes = function() {
    var candidate, list, _i, _len, _var0;
    list = [];
    _var0 = this.getAllLocalCandidates();
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      candidate = _var0[_i];
      fm.arrayExtensions.add(list, candidate.getType());
    }
    return fm.arrayExtensions.toArray(list);
  };

  /*<span id='method-fm.icelink.baseLink-getAllRemoteCandidates'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active and inactive remote candidates.
  	 </div>
  
  	@function getAllRemoteCandidates
  	@return {fm.array}
  */


  baseLink.prototype.getAllRemoteCandidates = function() {
    return fm.arrayExtensions.toArray(this.__allRemoteCandidates);
  };

  /*<span id='method-fm.icelink.baseLink-getAllRemoteCandidateTypes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active and inactive remote candidate types.
  	 </div>
  
  	@function getAllRemoteCandidateTypes
  	@return {fm.array}
  */


  baseLink.prototype.getAllRemoteCandidateTypes = function() {
    var candidate, list, _i, _len, _var0;
    list = [];
    _var0 = this.getAllRemoteCandidates();
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      candidate = _var0[_i];
      fm.arrayExtensions.add(list, candidate.getType());
    }
    return fm.arrayExtensions.toArray(list);
  };

  /*<span id='method-fm.icelink.baseLink-getConference'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the conference that owns this link.
  	 </div>
  
  	@function getConference
  	@return {fm.icelink.conference}
  */


  baseLink.prototype.getConference = function() {
    return this._conference;
  };

  /*<span id='method-fm.icelink.baseLink-getControlling'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether this end of the link is controlling.
  	 </div>
  
  	@function getControlling
  	@return {Boolean}
  */


  baseLink.prototype.getControlling = function() {
    return this.__controlling;
  };

  /*<span id='method-fm.icelink.baseLink-getHasAccepted'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether an offer/answer has been accepted.
  	 </div>
  
  	@function getHasAccepted
  	@return {Boolean}
  */


  baseLink.prototype.getHasAccepted = function() {
    return this.__hasAccepted;
  };

  /*<span id='method-fm.icelink.baseLink-getHasClosed'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the link has closed.
  	 </div>
  
  	@function getHasClosed
  	@return {Boolean}
  */


  baseLink.prototype.getHasClosed = function() {
    return this.__hasClosed;
  };

  /*<span id='method-fm.icelink.baseLink-getHasCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether an offer/answer has been created.
  	 </div>
  
  	@function getHasCreated
  	@return {Boolean}
  */


  baseLink.prototype.getHasCreated = function() {
    return this.__hasCreated;
  };

  /*<span id='method-fm.icelink.baseLink-getHasOpened'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the link has opened.
  	 </div>
  
  	@function getHasOpened
  	@return {Boolean}
  */


  baseLink.prototype.getHasOpened = function() {
    return this.__hasOpened;
  };

  /*<span id='method-fm.icelink.baseLink-getIsAccepting'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether an offer/answer is being accepted.
  	 </div>
  
  	@function getIsAccepting
  	@return {Boolean}
  */


  baseLink.prototype.getIsAccepting = function() {
    return this.__isAccepting;
  };

  /*<span id='method-fm.icelink.baseLink-getIsClosing'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the link is closing.
  	 </div>
  
  	@function getIsClosing
  	@return {Boolean}
  */


  baseLink.prototype.getIsClosing = function() {
    return this.__isClosing;
  };

  /*<span id='method-fm.icelink.baseLink-getIsCreating'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether an offer/answer is being created.
  	 </div>
  
  	@function getIsCreating
  	@return {Boolean}
  */


  baseLink.prototype.getIsCreating = function() {
    return this.__isCreating;
  };

  /*<span id='method-fm.icelink.baseLink-getIsOpened'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the link is opened.
  	 </div>
  
  	@function getIsOpened
  	@return {Boolean}
  */


  baseLink.prototype.getIsOpened = function() {
    return this.__isOpened;
  };

  /*<span id='method-fm.icelink.baseLink-getIsOpening'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the link is opening.
  	 </div>
  
  	@function getIsOpening
  	@return {Boolean}
  */


  baseLink.prototype.getIsOpening = function() {
    return this.__isOpening;
  };

  /*<span id='method-fm.icelink.baseLink-getLocalOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local offer/answer.
  	 </div>
  
  	@function getLocalOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  baseLink.prototype.getLocalOfferAnswer = function() {
    return this.__localOfferAnswer;
  };

  /*<span id='method-fm.icelink.baseLink-getNegotiatedStreams'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the negotiated streams when the link is up.
  	 </div>
  
  	@function getNegotiatedStreams
  	@return {fm.array}
  */


  baseLink.prototype.getNegotiatedStreams = function() {
    return this.__negotiatedStreams;
  };

  /*<span id='method-fm.icelink.baseLink-getPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the peer ID.
  	 </div>
  
  	@function getPeerId
  	@return {String}
  */


  baseLink.prototype.getPeerId = function() {
    return this._peerId;
  };

  /*<span id='method-fm.icelink.baseLink-getPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets custom state data to associate with the peer.
  	 </div>
  
  	@function getPeerState
  	@return {fm.object}
  */


  baseLink.prototype.getPeerState = function() {
    return this._peerState;
  };

  /*<span id='method-fm.icelink.baseLink-getReachedPeer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the peer has been reached.
  	 </div>
  
  	@function getReachedPeer
  	@return {Boolean}
  */


  baseLink.prototype.getReachedPeer = function() {
    return this.__reachedPeer;
  };

  /*<span id='method-fm.icelink.baseLink-getReachedServer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the server has been reached.
  	 </div>
  
  	@function getReachedServer
  	@return {Boolean}
  */


  baseLink.prototype.getReachedServer = function() {
    return this.__reachedServer;
  };

  /*<span id='method-fm.icelink.baseLink-getRemoteOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the remote offer/answer.
  	 </div>
  
  	@function getRemoteOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  baseLink.prototype.getRemoteOfferAnswer = function() {
    return this.__remoteOfferAnswer;
  };

  /*<span id='method-fm.icelink.baseLink-getTieBreaker'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tie-breaker to use in cases of role conflict.
  	 </div>
  
  	@function getTieBreaker
  	@return {String}
  */


  baseLink.prototype.getTieBreaker = function() {
    return this.__tieBreaker;
  };

  /*<span id='method-fm.icelink.baseLink-getWasUp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the link was ever up.
  	 </div>
  
  	@function getWasUp
  	@return {Boolean}
  */


  baseLink.prototype.getWasUp = function() {
    return this.__wasUp;
  };

  /*<span id='method-fm.icelink.baseLink-initialize'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes the link.
  	 </div>
  	@function initialize
  	@param {fm.array} serverAddresses The IceLink server addresses.
  	@param {fm.array} streams The streams to establish.
  	@param {fm.singleAction} callback The callback to invoke when the link is initialized.
  	@return {void}
  */


  baseLink.prototype.initialize = function() {
    var callback, serverAddresses, streams;
    serverAddresses = arguments[0];
    streams = arguments[1];
    callback = arguments[2];
    this.setServerAddresses(serverAddresses);
    this.setStreams(streams);
    this._initializeCallback = callback;
    return this.initializeInternal(this.initializeComplete);
  };

  baseLink.prototype.initializeComplete = function() {
    var initializeCallback, link, _var0;
    link = arguments[0];
    initializeCallback = this._initializeCallback;
    this._initialized = true;
    _var0 = initializeCallback;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return initializeCallback(link);
    }
  };

  baseLink.prototype.initializeInternal = function() {
    var complete;
    return complete = arguments[0];
  };

  baseLink.prototype.logCandidate = function() {
    var candidate, local, sdpCandidateAttribute, str, str2;
    candidate = arguments[0];
    local = arguments[1];
    str = "";
    if (candidate.getType() === fm.icelink.candidateType.Private) {
      str = " private";
    } else {
      if (candidate.getType() === fm.icelink.candidateType.Relay) {
        str = " relay";
      } else {
        str = " public";
      }
    }
    str2 = "";
    if (candidate.getSdpMediaIndex() !== null) {
      str2 = fm.stringExtensions.concat(" ", fm.intExtensions.toString(candidate.getSdpMediaIndex()));
    }
    sdpCandidateAttribute = candidate.getSdpCandidateAttribute();
    while (fm.stringExtensions.endsWith(sdpCandidateAttribute, "\n")) {
      sdpCandidateAttribute = fm.stringExtensions.substring(sdpCandidateAttribute, 0, sdpCandidateAttribute.length - 1);
    }
    return fm.log.debugFormat("{0} SDP{1} candidate for stream{2}:{3}{4}", [(local ? "Local" : "Remote"), str, str2, "\n", sdpCandidateAttribute]);
  };

  baseLink.prototype.logOfferAnswer = function() {
    var local, offerAnswer, sdpMessage;
    offerAnswer = arguments[0];
    local = arguments[1];
    sdpMessage = offerAnswer.getSdpMessage();
    while (fm.stringExtensions.endsWith(sdpMessage, "\n")) {
      sdpMessage = fm.stringExtensions.substring(sdpMessage, 0, sdpMessage.length - 1);
    }
    return fm.log.debugFormat("{0} SDP {1}:{2}{3}", [(local ? "Local" : "Remote"), (offerAnswer.getIsOffer() ? "offer" : "answer"), "\n", sdpMessage]);
  };

  baseLink.prototype.onAcceptFailure = function() {
    var acceptArgs, ex, _var0;
    ex = arguments[0];
    acceptArgs = this._acceptArgs;
    this.__isAccepting = false;
    this.__hasAccepted = false;
    _var0 = acceptArgs;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAcceptFailure(acceptArgs, ex);
      return this.raiseAcceptComplete(acceptArgs);
    }
  };

  baseLink.prototype.onAcceptSuccess = function() {
    var acceptArgs, candidate, _i, _len, _var0, _var1;
    acceptArgs = this._acceptArgs;
    this.__isAccepting = false;
    this.__hasAccepted = true;
    if (this.getHasCreated()) {
      _var0 = this._earlyCandidates;
      for (_i = 0, _len = _var0.length; _i < _len; _i++) {
        candidate = _var0[_i];
        try {
          this.addRemoteCandidateInternal(candidate);
        } catch (exception) {
          fm.log.error("Could not add early remote candidate.", exception);
        } finally {

        }
      }
    }
    _var1 = acceptArgs;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      this.raiseAcceptSuccess(acceptArgs);
      return this.raiseAcceptComplete(acceptArgs);
    }
  };

  baseLink.prototype.onCloseComplete = function() {
    var closeArgs, ex, _var0;
    ex = arguments[0];
    closeArgs = this._closeArgs;
    this.__isClosing = false;
    this.__hasClosed = true;
    _var0 = closeArgs;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return this.raiseCloseComplete(closeArgs, ex);
    }
  };

  baseLink.prototype.onCreateFailure = function() {
    var createArgs, ex, _var0;
    ex = arguments[0];
    createArgs = this._createArgs;
    this.__isCreating = false;
    this.__hasCreated = false;
    _var0 = createArgs;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseCreateFailure(createArgs, ex);
      return this.raiseCreateComplete(createArgs);
    }
  };

  baseLink.prototype.onCreateSuccess = function() {
    var candidate, createArgs, offerAnswer, _i, _len, _var0, _var1;
    offerAnswer = arguments[0];
    createArgs = this._createArgs;
    this.__isCreating = false;
    this.__hasCreated = true;
    if (this.getHasAccepted()) {
      _var0 = this._earlyCandidates;
      for (_i = 0, _len = _var0.length; _i < _len; _i++) {
        candidate = _var0[_i];
        this.addRemoteCandidateInternal(candidate);
      }
    }
    offerAnswer.setIsOffer(this.getControlling());
    offerAnswer.setTieBreaker(this.getTieBreaker());
    this.raiseOfferAnswer(offerAnswer);
    _var1 = createArgs;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      this.raiseCreateSuccess(createArgs, offerAnswer);
      return this.raiseCreateComplete(createArgs);
    }
  };

  baseLink.prototype.raiseAcceptComplete = function() {
    var acceptArgs, p, _var0;
    acceptArgs = arguments[0];
    _var0 = acceptArgs.getOnComplete();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.acceptCompleteArgs();
      p.setLink(this);
      p.setOfferAnswer(acceptArgs.getOfferAnswer());
      p.setDynamicProperties(acceptArgs.getDynamicProperties());
      return acceptArgs.getOnComplete()(p);
    }
  };

  baseLink.prototype.raiseAcceptFailure = function() {
    var acceptArgs, ex, p, _var0;
    acceptArgs = arguments[0];
    ex = arguments[1];
    _var0 = acceptArgs.getOnFailure();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.acceptFailureArgs();
      p.setLink(this);
      p.setOfferAnswer(acceptArgs.getOfferAnswer());
      p.setDynamicProperties(acceptArgs.getDynamicProperties());
      p.setException(ex);
      return acceptArgs.getOnFailure()(p);
    }
  };

  baseLink.prototype.raiseAcceptSuccess = function() {
    var acceptArgs, p, _var0;
    acceptArgs = arguments[0];
    _var0 = acceptArgs.getOnSuccess();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.acceptSuccessArgs();
      p.setLink(this);
      p.setOfferAnswer(acceptArgs.getOfferAnswer());
      p.setDynamicProperties(acceptArgs.getDynamicProperties());
      return acceptArgs.getOnSuccess()(p);
    }
  };

  baseLink.prototype.raiseCandidate = function() {
    var args2, candidate, flag, flag2, flag3, onCandidate, p, type, _var0;
    candidate = arguments[0];
    type = candidate.getType();
    flag = type === fm.icelink.candidateType.Private;
    flag2 = type === fm.icelink.candidateType.Public;
    flag3 = type === fm.icelink.candidateType.Relay;
    this.__reachedServer = (this.__reachedServer || flag2) || flag3;
    if (((flag && !this.getSuppressPrivateCandidates()) || (flag2 && !this.getSuppressPublicCandidates())) || (flag3 && !this.getSuppressRelayCandidates())) {
      args2 = new fm.icelink.linkCandidateArgs();
      args2.setLink(this);
      args2.setConference(this.getConference());
      args2.setCandidate(candidate);
      args2.setDynamicProperties(this.getDynamicProperties());
      p = args2;
      onCandidate = this._onCandidate;
      _var0 = onCandidate;
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        this.cacheLocalCandidate(candidate);
        if (fm.log.getIsDebugEnabled()) {
          this.logCandidate(candidate, true);
        }
        try {
          return onCandidate(p);
        } catch (exception) {
          if (!this.raiseUnhandledException(exception)) {
            return fm.asyncException.asyncThrow(exception, "Link -> OnCandidate");
          }
        } finally {

        }
      }
    }
  };

  baseLink.prototype.raiseCloseComplete = function() {
    var closeArgs, exception, p, _var0;
    closeArgs = arguments[0];
    exception = arguments[1];
    _var0 = closeArgs.getOnComplete();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.closeCompleteArgs();
      p.setLink(this);
      p.setDynamicProperties(closeArgs.getDynamicProperties());
      p.setReason(closeArgs.getReason());
      p.setException(exception);
      return closeArgs.getOnComplete()(p);
    }
  };

  baseLink.prototype.raiseCreateComplete = function() {
    var createArgs, p, _var0;
    createArgs = arguments[0];
    _var0 = createArgs.getOnComplete();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.createCompleteArgs();
      p.setLink(this);
      p.setDynamicProperties(createArgs.getDynamicProperties());
      return createArgs.getOnComplete()(p);
    }
  };

  baseLink.prototype.raiseCreateFailure = function() {
    var createArgs, ex, p, _var0;
    createArgs = arguments[0];
    ex = arguments[1];
    _var0 = createArgs.getOnFailure();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.createFailureArgs();
      p.setLink(this);
      p.setDynamicProperties(createArgs.getDynamicProperties());
      p.setException(ex);
      return createArgs.getOnFailure()(p);
    }
  };

  baseLink.prototype.raiseCreateSuccess = function() {
    var createArgs, offerAnswer, p, _var0;
    createArgs = arguments[0];
    offerAnswer = arguments[1];
    _var0 = createArgs.getOnSuccess();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.createSuccessArgs();
      p.setLink(this);
      p.setDynamicProperties(createArgs.getDynamicProperties());
      p.setOfferAnswer(offerAnswer);
      return createArgs.getOnSuccess()(p);
    }
  };

  baseLink.prototype.raiseDown = function() {
    var args2, e, exception, onDown, reason, stream, _i, _len, _var0, _var1;
    exception = arguments[0];
    reason = arguments[1];
    if (this._raisedDown) {
      return;
    }
    this._raisedDown = true;
    this.__isOpening = false;
    this.__isOpened = false;
    args2 = new fm.icelink.linkDownArgs();
    args2.setLink(this);
    args2.setConference(this.getConference());
    args2.setException(exception);
    args2.setReason(reason);
    args2.setDynamicProperties(this.getDynamicProperties());
    e = args2;
    _var0 = this.getStreams();
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      stream = _var0[_i];
      stream.raiseDown(e);
    }
    onDown = this._onDown;
    _var1 = onDown;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      try {
        return onDown(e);
      } catch (exception2) {
        if (!this.raiseUnhandledException(exception2)) {
          return fm.asyncException.asyncThrow(exception2, "Link -> OnDown");
        }
      } finally {

      }
    }
  };

  baseLink.prototype.raiseInit = function() {
    var args2, e, initiator, onInit, stream, _i, _len, _var0, _var1;
    initiator = arguments[0];
    if (this._raisedInit) {
      return;
    }
    this._raisedInit = true;
    this.__isOpening = true;
    args2 = new fm.icelink.linkInitArgs();
    args2.setLink(this);
    args2.setConference(this.getConference());
    args2.setInitiator(initiator);
    args2.setDynamicProperties(this.getDynamicProperties());
    e = args2;
    _var0 = this.getStreams();
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      stream = _var0[_i];
      stream.raiseInit(e);
    }
    onInit = this._onInit;
    _var1 = onInit;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      try {
        return onInit(e);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Link -> OnInit");
        }
      } finally {

      }
    }
  };

  baseLink.prototype.raiseOfferAnswer = function() {
    var args2, offerAnswer, onOfferAnswer, p, _var0;
    offerAnswer = arguments[0];
    this.__localOfferAnswer = offerAnswer;
    if (fm.log.getIsDebugEnabled()) {
      this.logOfferAnswer(offerAnswer, true);
    }
    args2 = new fm.icelink.linkOfferAnswerArgs();
    args2.setLink(this);
    args2.setConference(this.getConference());
    args2.setOfferAnswer(offerAnswer);
    args2.setDynamicProperties(this.getDynamicProperties());
    p = args2;
    onOfferAnswer = this._onOfferAnswer;
    _var0 = onOfferAnswer;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onOfferAnswer(p);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Link -> OnOfferAnswer");
        }
      } finally {

      }
    }
  };

  baseLink.prototype.raiseReceiveRTCP = function() {
    var args, onReceiveRTCP, _var0;
    args = arguments[0];
    onReceiveRTCP = this._onReceiveRTCP;
    _var0 = onReceiveRTCP;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onReceiveRTCP(args);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Link -> OnReceiveRTCP");
        }
      } finally {

      }
    }
  };

  baseLink.prototype.raiseReceiveRTP = function() {
    var args, onReceiveRTP, _var0;
    args = arguments[0];
    onReceiveRTP = this._onReceiveRTP;
    _var0 = onReceiveRTP;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onReceiveRTP(args);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Link -> OnReceiveRTP");
        }
      } finally {

      }
    }
  };

  baseLink.prototype.raiseUnhandledException = function() {
    var args2, exception, onUnhandledException, p, _var0;
    exception = arguments[0];
    onUnhandledException = this._onUnhandledException;
    _var0 = onUnhandledException;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args2 = new fm.icelink.unhandledExceptionArgs();
      args2.setException(exception);
      p = args2;
      try {
        onUnhandledException(p);
      } catch (exception2) {
        fm.asyncException.asyncThrow(exception2, "Link -> OnUnhandledException");
      } finally {

      }
      return p.getHandled();
    }
    return false;
  };

  baseLink.prototype.raiseUp = function() {
    var args2, e, onUp, stream, _i, _len, _var0, _var1;
    if (this._raisedUp) {
      return;
    }
    this._raisedUp = true;
    this.__isOpening = false;
    this.__isOpened = true;
    this.__hasOpened = true;
    args2 = new fm.icelink.linkUpArgs();
    args2.setLink(this);
    args2.setConference(this.getConference());
    args2.setNegotiatedStreams(this.getNegotiatedStreams());
    args2.setDynamicProperties(this.getDynamicProperties());
    e = args2;
    this.__wasUp = true;
    _var0 = this.getStreams();
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      stream = _var0[_i];
      stream.raiseUp(e);
    }
    onUp = this._onUp;
    _var1 = onUp;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      try {
        return onUp(e);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Link -> OnUp");
        }
      } finally {

      }
    }
  };

  /*<span id='method-fm.icelink.baseLink-removeOnCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a candidate is discovered.
  	 The candidate should be sent immediately (out-of-band) to the remote peer.
  	 </div>
  
  	@function removeOnCandidate
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.removeOnCandidate = function() {
    var value;
    value = arguments[0];
    return this._onCandidate = fm.delegate.remove(this._onCandidate, value);
  };

  /*<span id='method-fm.icelink.baseLink-removeOnDown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link is down.
  	 </div>
  
  	@function removeOnDown
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.removeOnDown = function() {
    var value;
    value = arguments[0];
    return this._onDown = fm.delegate.remove(this._onDown, value);
  };

  /*<span id='method-fm.icelink.baseLink-removeOnInit'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link is initializing.
  	 </div>
  
  	@function removeOnInit
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.removeOnInit = function() {
    var value;
    value = arguments[0];
    return this._onInit = fm.delegate.remove(this._onInit, value);
  };

  /*<span id='method-fm.icelink.baseLink-removeOnOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when an offer/answer is created.
  	 </div>
  
  	@function removeOnOfferAnswer
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.removeOnOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._onOfferAnswer = fm.delegate.remove(this._onOfferAnswer, value);
  };

  /*<span id='method-fm.icelink.baseLink-removeOnReceiveRTCP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when RTCP packets are received.
  	 </div>
  
  	@function removeOnReceiveRTCP
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.removeOnReceiveRTCP = function() {
    var value;
    value = arguments[0];
    return this._onReceiveRTCP = fm.delegate.remove(this._onReceiveRTCP, value);
  };

  /*<span id='method-fm.icelink.baseLink-removeOnReceiveRTP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when an RTP packet is received.
  	 </div>
  
  	@function removeOnReceiveRTP
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.removeOnReceiveRTP = function() {
    var value;
    value = arguments[0];
    return this._onReceiveRTP = fm.delegate.remove(this._onReceiveRTP, value);
  };

  /*<span id='method-fm.icelink.baseLink-removeOnUnhandledException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function removeOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.removeOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.remove(this._onUnhandledException, value);
  };

  /*<span id='method-fm.icelink.baseLink-removeOnUp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link is up.
  	 </div>
  
  	@function removeOnUp
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLink.prototype.removeOnUp = function() {
    var value;
    value = arguments[0];
    return this._onUp = fm.delegate.remove(this._onUp, value);
  };

  baseLink.prototype.setConference = function() {
    var value;
    value = arguments[0];
    return this._conference = value;
  };

  /*<span id='method-fm.icelink.baseLink-setPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the peer ID.
  	 </div>
  
  	@function setPeerId
  	@param {String} value
  	@return {void}
  */


  baseLink.prototype.setPeerId = function() {
    var value;
    value = arguments[0];
    return this._peerId = value;
  };

  /*<span id='method-fm.icelink.baseLink-setPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets custom state data to associate with the peer.
  	 </div>
  
  	@function setPeerState
  	@param {fm.object} value
  	@return {void}
  */


  baseLink.prototype.setPeerState = function() {
    var value;
    value = arguments[0];
    return this._peerState = value;
  };

  return baseLink;

})(fm.icelink.baseConference);


/*<span id='cls-fm.icelink.baseStream'>&nbsp;</span>
*/

/**
@class fm.icelink.baseStream
 <div>
 Defines common base properties for streams.
 </div>

@extends fm.dynamic
*/


fm.icelink.baseStream = (function(_super) {

  __extends(baseStream, _super);

  baseStream.prototype._offerDtls = false;

  baseStream.prototype._onLinkDown = null;

  baseStream.prototype._onLinkInit = null;

  baseStream.prototype._onLinkReceiveRTCP = null;

  baseStream.prototype._onLinkReceiveRTP = null;

  baseStream.prototype._onLinkUp = null;

  baseStream.prototype._onUnhandledException = null;

  baseStream.prototype._type = null;

  /*<span id='method-fm.icelink.baseStream-fm.icelink.baseStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.baseStream">fm.icelink.baseStream</see> class.
  	 </div>
  	@function fm.icelink.baseStream
  	@param {fm.icelink.streamType} type The type of the stream.
  	@return {}
  */


  function baseStream() {
    this.setType = __bind(this.setType, this);

    this.setOfferDtls = __bind(this.setOfferDtls, this);

    this.removeOnUnhandledException = __bind(this.removeOnUnhandledException, this);

    this.removeOnLinkUp = __bind(this.removeOnLinkUp, this);

    this.removeOnLinkReceiveRTP = __bind(this.removeOnLinkReceiveRTP, this);

    this.removeOnLinkReceiveRTCP = __bind(this.removeOnLinkReceiveRTCP, this);

    this.removeOnLinkInit = __bind(this.removeOnLinkInit, this);

    this.removeOnLinkDown = __bind(this.removeOnLinkDown, this);

    this.raiseUp = __bind(this.raiseUp, this);

    this.raiseUnhandledException = __bind(this.raiseUnhandledException, this);

    this.raiseReceiveRTP = __bind(this.raiseReceiveRTP, this);

    this.raiseReceiveRTCP = __bind(this.raiseReceiveRTCP, this);

    this.raiseInit = __bind(this.raiseInit, this);

    this.raiseDown = __bind(this.raiseDown, this);

    this.isEquivalent = __bind(this.isEquivalent, this);

    this.getType = __bind(this.getType, this);

    this.getOfferDtls = __bind(this.getOfferDtls, this);

    this.getMatchingNegotiatedStream = __bind(this.getMatchingNegotiatedStream, this);

    this.addOnUnhandledException = __bind(this.addOnUnhandledException, this);

    this.addOnLinkUp = __bind(this.addOnLinkUp, this);

    this.addOnLinkReceiveRTP = __bind(this.addOnLinkReceiveRTP, this);

    this.addOnLinkReceiveRTCP = __bind(this.addOnLinkReceiveRTCP, this);

    this.addOnLinkInit = __bind(this.addOnLinkInit, this);

    this.addOnLinkDown = __bind(this.addOnLinkDown, this);

    var type;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseStream.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    type = arguments[0];
    baseStream.__super__.constructor.call(this);
    this.setType(type);
  }

  /*<span id='method-fm.icelink.baseStream-addOnLinkDown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link is closed with this stream.
  	 </div>
  
  	@function addOnLinkDown
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.addOnLinkDown = function() {
    var value;
    value = arguments[0];
    return this._onLinkDown = fm.delegate.combine(this._onLinkDown, value);
  };

  /*<span id='method-fm.icelink.baseStream-addOnLinkInit'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a new link is initializing with this stream.
  	 </div>
  
  	@function addOnLinkInit
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.addOnLinkInit = function() {
    var value;
    value = arguments[0];
    return this._onLinkInit = fm.delegate.combine(this._onLinkInit, value);
  };

  /*<span id='method-fm.icelink.baseStream-addOnLinkReceiveRTCP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when an RTCP packet is received.
  	 </div>
  
  	@function addOnLinkReceiveRTCP
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.addOnLinkReceiveRTCP = function() {
    var value;
    value = arguments[0];
    return this._onLinkReceiveRTCP = fm.delegate.combine(this._onLinkReceiveRTCP, value);
  };

  /*<span id='method-fm.icelink.baseStream-addOnLinkReceiveRTP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when an RTP packet is received.
  	 </div>
  
  	@function addOnLinkReceiveRTP
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.addOnLinkReceiveRTP = function() {
    var value;
    value = arguments[0];
    return this._onLinkReceiveRTP = fm.delegate.combine(this._onLinkReceiveRTP, value);
  };

  /*<span id='method-fm.icelink.baseStream-addOnLinkUp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link is open with this stream.
  	 </div>
  
  	@function addOnLinkUp
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.addOnLinkUp = function() {
    var value;
    value = arguments[0];
    return this._onLinkUp = fm.delegate.combine(this._onLinkUp, value);
  };

  /*<span id='method-fm.icelink.baseStream-addOnUnhandledException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function addOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.addOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.combine(this._onUnhandledException, value);
  };

  baseStream.prototype.getMatchingNegotiatedStream = function() {
    var args, negotiatedStreams, stream, _i, _len, _var0, _var1;
    negotiatedStreams = arguments[0];
    _var0 = negotiatedStreams;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      _var1 = negotiatedStreams;
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        stream = _var1[_i];
        if (stream.isEquivalent(this)) {
          return stream;
        }
      }
      args = [fm.intExtensions.toString(negotiatedStreams.length)];
      fm.log.warnFormat("Could not find a matching negotiated stream ({0} streams compared).", args);
    }
    return null;
  };

  /*<span id='method-fm.icelink.baseStream-getOfferDtls'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether to offer to exchange SRTP keys using DTLS.
  	 </div>
  
  	@function getOfferDtls
  	@return {Boolean}
  */


  baseStream.prototype.getOfferDtls = function() {
    return this._offerDtls;
  };

  /*<span id='method-fm.icelink.baseStream-getType'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the type of the stream.
  	 </div>
  
  	@function getType
  	@return {fm.icelink.streamType}
  */


  baseStream.prototype.getType = function() {
    return this._type;
  };

  baseStream.prototype.isEquivalent = function() {
    var stream;
    return stream = arguments[0];
  };

  baseStream.prototype.raiseDown = function() {
    var e, onLinkDown, p, _var0;
    e = arguments[0];
    onLinkDown = this._onLinkDown;
    _var0 = onLinkDown;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        p = new fm.icelink.streamLinkDownArgs();
        p.setStream(this);
        p.setConference(e.getConference());
        p.setLink(e.getLink());
        p.setIsSwitchingRoles(e.getIsSwitchingRoles());
        p.setDynamicProperties(this.getDynamicProperties());
        p.setException(e.getException());
        return onLinkDown(p);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Stream -> OnLinkDown");
        }
      } finally {

      }
    }
  };

  baseStream.prototype.raiseInit = function() {
    var e, onLinkInit, p, _var0;
    e = arguments[0];
    onLinkInit = this._onLinkInit;
    _var0 = onLinkInit;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        p = new fm.icelink.streamLinkInitArgs();
        p.setStream(this);
        p.setConference(e.getConference());
        p.setLink(e.getLink());
        p.setDynamicProperties(this.getDynamicProperties());
        p.setInitiator(e.getInitiator());
        return onLinkInit(p);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Stream -> OnLinkInit");
        }
      } finally {

      }
    }
  };

  baseStream.prototype.raiseReceiveRTCP = function() {
    var args, onLinkReceiveRTCP, _var0;
    args = arguments[0];
    onLinkReceiveRTCP = this._onLinkReceiveRTCP;
    _var0 = onLinkReceiveRTCP;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onLinkReceiveRTCP(args);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Stream -> OnLinkReceiveRTCP");
        }
      } finally {

      }
    }
  };

  baseStream.prototype.raiseReceiveRTP = function() {
    var args, onLinkReceiveRTP, _var0;
    args = arguments[0];
    onLinkReceiveRTP = this._onLinkReceiveRTP;
    _var0 = onLinkReceiveRTP;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onLinkReceiveRTP(args);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Stream -> OnLinkReceiveRTP");
        }
      } finally {

      }
    }
  };

  baseStream.prototype.raiseUnhandledException = function() {
    var args2, exception, onUnhandledException, p, _var0;
    exception = arguments[0];
    onUnhandledException = this._onUnhandledException;
    _var0 = onUnhandledException;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args2 = new fm.icelink.unhandledExceptionArgs();
      args2.setException(exception);
      p = args2;
      try {
        onUnhandledException(p);
      } catch (exception2) {
        fm.asyncException.asyncThrow(exception2, "Stream -> OnUnhandledException");
      } finally {

      }
      return p.getHandled();
    }
    return false;
  };

  baseStream.prototype.raiseUp = function() {
    var e, onLinkUp, p, _var0;
    e = arguments[0];
    onLinkUp = this._onLinkUp;
    _var0 = onLinkUp;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        p = new fm.icelink.streamLinkUpArgs();
        p.setStream(this);
        p.setConference(e.getConference());
        p.setLink(e.getLink());
        p.setDynamicProperties(this.getDynamicProperties());
        p.setNegotiatedStreams(e.getNegotiatedStreams());
        p.setNegotiatedStream(this.getMatchingNegotiatedStream(e.getLink().getNegotiatedStreams()));
        return onLinkUp(p);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Stream -> OnLinkUp");
        }
      } finally {

      }
    }
  };

  /*<span id='method-fm.icelink.baseStream-removeOnLinkDown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link is closed with this stream.
  	 </div>
  
  	@function removeOnLinkDown
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.removeOnLinkDown = function() {
    var value;
    value = arguments[0];
    return this._onLinkDown = fm.delegate.remove(this._onLinkDown, value);
  };

  /*<span id='method-fm.icelink.baseStream-removeOnLinkInit'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a new link is initializing with this stream.
  	 </div>
  
  	@function removeOnLinkInit
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.removeOnLinkInit = function() {
    var value;
    value = arguments[0];
    return this._onLinkInit = fm.delegate.remove(this._onLinkInit, value);
  };

  /*<span id='method-fm.icelink.baseStream-removeOnLinkReceiveRTCP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when an RTCP packet is received.
  	 </div>
  
  	@function removeOnLinkReceiveRTCP
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.removeOnLinkReceiveRTCP = function() {
    var value;
    value = arguments[0];
    return this._onLinkReceiveRTCP = fm.delegate.remove(this._onLinkReceiveRTCP, value);
  };

  /*<span id='method-fm.icelink.baseStream-removeOnLinkReceiveRTP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when an RTP packet is received.
  	 </div>
  
  	@function removeOnLinkReceiveRTP
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.removeOnLinkReceiveRTP = function() {
    var value;
    value = arguments[0];
    return this._onLinkReceiveRTP = fm.delegate.remove(this._onLinkReceiveRTP, value);
  };

  /*<span id='method-fm.icelink.baseStream-removeOnLinkUp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link is open with this stream.
  	 </div>
  
  	@function removeOnLinkUp
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.removeOnLinkUp = function() {
    var value;
    value = arguments[0];
    return this._onLinkUp = fm.delegate.remove(this._onLinkUp, value);
  };

  /*<span id='method-fm.icelink.baseStream-removeOnUnhandledException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function removeOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseStream.prototype.removeOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.remove(this._onUnhandledException, value);
  };

  /*<span id='method-fm.icelink.baseStream-setOfferDtls'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether to offer to exchange SRTP keys using DTLS.
  	 </div>
  
  	@function setOfferDtls
  	@param {Boolean} value
  	@return {void}
  */


  baseStream.prototype.setOfferDtls = function() {
    var value;
    value = arguments[0];
    return this._offerDtls = value;
  };

  /*<span id='method-fm.icelink.baseStream-setType'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the type of the stream.
  	 </div>
  
  	@function setType
  	@param {fm.icelink.streamType} value
  	@return {void}
  */


  baseStream.prototype.setType = function() {
    var value;
    value = arguments[0];
    return this._type = value;
  };

  return baseStream;

})(fm.dynamic);


/*<span id='cls-fm.icelink.startSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.startSuccessArgs
 <div>
 Arguments for <see cref="fm.icelink.startArgs.onSuccess">fm.icelink.startArgs.onSuccess</see>.
 </div>

@extends fm.dynamic
*/


fm.icelink.startSuccessArgs = (function(_super) {

  __extends(startSuccessArgs, _super);

  startSuccessArgs.prototype._signalProvider = null;

  function startSuccessArgs() {
    this.setSignalProvider = __bind(this.setSignalProvider, this);

    this.getSignalProvider = __bind(this.getSignalProvider, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      startSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    startSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.startSuccessArgs-getSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the signal provider.
  	 </div>
  
  	@function getSignalProvider
  	@return {fm.icelink.signalProvider}
  */


  startSuccessArgs.prototype.getSignalProvider = function() {
    return this._signalProvider;
  };

  /*<span id='method-fm.icelink.startSuccessArgs-setSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the signal provider.
  	 </div>
  
  	@function setSignalProvider
  	@param {fm.icelink.signalProvider} value
  	@return {void}
  */


  startSuccessArgs.prototype.setSignalProvider = function() {
    var value;
    value = arguments[0];
    return this._signalProvider = value;
  };

  return startSuccessArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.startFailureArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.startFailureArgs
 <div>
 Arguments for <see cref="fm.icelink.startArgs.onFailure">fm.icelink.startArgs.onFailure</see>.
 </div>

@extends fm.dynamic
*/


fm.icelink.startFailureArgs = (function(_super) {

  __extends(startFailureArgs, _super);

  startFailureArgs.prototype._exception = null;

  startFailureArgs.prototype._signalProvider = null;

  function startFailureArgs() {
    this.setSignalProvider = __bind(this.setSignalProvider, this);

    this.setException = __bind(this.setException, this);

    this.getSignalProvider = __bind(this.getSignalProvider, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      startFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    startFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.startFailureArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  startFailureArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.icelink.startFailureArgs-getSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the signal provider.
  	 </div>
  
  	@function getSignalProvider
  	@return {fm.icelink.signalProvider}
  */


  startFailureArgs.prototype.getSignalProvider = function() {
    return this._signalProvider;
  };

  /*<span id='method-fm.icelink.startFailureArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  startFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  /*<span id='method-fm.icelink.startFailureArgs-setSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the signal provider.
  	 </div>
  
  	@function setSignalProvider
  	@param {fm.icelink.signalProvider} value
  	@return {void}
  */


  startFailureArgs.prototype.setSignalProvider = function() {
    var value;
    value = arguments[0];
    return this._signalProvider = value;
  };

  return startFailureArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.startCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.startCompleteArgs
 <div>
 Arguments for <see cref="fm.icelink.startArgs.onComplete">fm.icelink.startArgs.onComplete</see>.
 </div>

@extends fm.dynamic
*/


fm.icelink.startCompleteArgs = (function(_super) {

  __extends(startCompleteArgs, _super);

  startCompleteArgs.prototype._signalProvider = null;

  function startCompleteArgs() {
    this.setSignalProvider = __bind(this.setSignalProvider, this);

    this.getSignalProvider = __bind(this.getSignalProvider, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      startCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    startCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.startCompleteArgs-getSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the signal provider.
  	 </div>
  
  	@function getSignalProvider
  	@return {fm.icelink.signalProvider}
  */


  startCompleteArgs.prototype.getSignalProvider = function() {
    return this._signalProvider;
  };

  /*<span id='method-fm.icelink.startCompleteArgs-setSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the signal provider.
  	 </div>
  
  	@function setSignalProvider
  	@param {fm.icelink.signalProvider} value
  	@return {void}
  */


  startCompleteArgs.prototype.setSignalProvider = function() {
    var value;
    value = arguments[0];
    return this._signalProvider = value;
  };

  return startCompleteArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.startArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.startArgs
 <div>
 The arguments used when starting signalling.
 </div>

@extends fm.dynamic
*/


fm.icelink.startArgs = (function(_super) {

  __extends(startArgs, _super);

  startArgs.prototype._onComplete = null;

  startArgs.prototype._onFailure = null;

  startArgs.prototype._onSuccess = null;

  function startArgs() {
    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      startArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    startArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.startArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.icelink.startArgs.onSuccess">fm.icelink.startArgs.onSuccess</see> or <see cref="fm.icelink.startArgs.onFailure">fm.icelink.startArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  startArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.icelink.startArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the operation fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  startArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.icelink.startArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the operation succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  startArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.icelink.startArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.icelink.startArgs.onSuccess">fm.icelink.startArgs.onSuccess</see> or <see cref="fm.icelink.startArgs.onFailure">fm.icelink.startArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  startArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.icelink.startArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the operation fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  startArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.icelink.startArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the operation succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  startArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  return startArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.stopSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.stopSuccessArgs
 <div>
 Arguments for <see cref="fm.icelink.stopArgs.onSuccess">fm.icelink.stopArgs.onSuccess</see>.
 </div>

@extends fm.dynamic
*/


fm.icelink.stopSuccessArgs = (function(_super) {

  __extends(stopSuccessArgs, _super);

  stopSuccessArgs.prototype._signalProvider = null;

  function stopSuccessArgs() {
    this.setSignalProvider = __bind(this.setSignalProvider, this);

    this.getSignalProvider = __bind(this.getSignalProvider, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      stopSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    stopSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.stopSuccessArgs-getSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the signal provider.
  	 </div>
  
  	@function getSignalProvider
  	@return {fm.icelink.signalProvider}
  */


  stopSuccessArgs.prototype.getSignalProvider = function() {
    return this._signalProvider;
  };

  /*<span id='method-fm.icelink.stopSuccessArgs-setSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the signal provider.
  	 </div>
  
  	@function setSignalProvider
  	@param {fm.icelink.signalProvider} value
  	@return {void}
  */


  stopSuccessArgs.prototype.setSignalProvider = function() {
    var value;
    value = arguments[0];
    return this._signalProvider = value;
  };

  return stopSuccessArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.stopFailureArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.stopFailureArgs
 <div>
 Arguments for <see cref="fm.icelink.stopArgs.onFailure">fm.icelink.stopArgs.onFailure</see>.
 </div>

@extends fm.dynamic
*/


fm.icelink.stopFailureArgs = (function(_super) {

  __extends(stopFailureArgs, _super);

  stopFailureArgs.prototype._exception = null;

  stopFailureArgs.prototype._signalProvider = null;

  function stopFailureArgs() {
    this.setSignalProvider = __bind(this.setSignalProvider, this);

    this.setException = __bind(this.setException, this);

    this.getSignalProvider = __bind(this.getSignalProvider, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      stopFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    stopFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.stopFailureArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  stopFailureArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.icelink.stopFailureArgs-getSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the signal provider.
  	 </div>
  
  	@function getSignalProvider
  	@return {fm.icelink.signalProvider}
  */


  stopFailureArgs.prototype.getSignalProvider = function() {
    return this._signalProvider;
  };

  /*<span id='method-fm.icelink.stopFailureArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  stopFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  /*<span id='method-fm.icelink.stopFailureArgs-setSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the signal provider.
  	 </div>
  
  	@function setSignalProvider
  	@param {fm.icelink.signalProvider} value
  	@return {void}
  */


  stopFailureArgs.prototype.setSignalProvider = function() {
    var value;
    value = arguments[0];
    return this._signalProvider = value;
  };

  return stopFailureArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.stopCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.stopCompleteArgs
 <div>
 Arguments for <see cref="fm.icelink.stopArgs.onComplete">fm.icelink.stopArgs.onComplete</see>.
 </div>

@extends fm.dynamic
*/


fm.icelink.stopCompleteArgs = (function(_super) {

  __extends(stopCompleteArgs, _super);

  stopCompleteArgs.prototype._signalProvider = null;

  function stopCompleteArgs() {
    this.setSignalProvider = __bind(this.setSignalProvider, this);

    this.getSignalProvider = __bind(this.getSignalProvider, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      stopCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    stopCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.stopCompleteArgs-getSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the signal provider.
  	 </div>
  
  	@function getSignalProvider
  	@return {fm.icelink.signalProvider}
  */


  stopCompleteArgs.prototype.getSignalProvider = function() {
    return this._signalProvider;
  };

  /*<span id='method-fm.icelink.stopCompleteArgs-setSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the signal provider.
  	 </div>
  
  	@function setSignalProvider
  	@param {fm.icelink.signalProvider} value
  	@return {void}
  */


  stopCompleteArgs.prototype.setSignalProvider = function() {
    var value;
    value = arguments[0];
    return this._signalProvider = value;
  };

  return stopCompleteArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.stopArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.stopArgs
 <div>
 The arguments used when stopping signalling.
 </div>

@extends fm.dynamic
*/


fm.icelink.stopArgs = (function(_super) {

  __extends(stopArgs, _super);

  stopArgs.prototype._onComplete = null;

  stopArgs.prototype._onFailure = null;

  stopArgs.prototype._onSuccess = null;

  function stopArgs() {
    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      stopArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    stopArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.stopArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.icelink.stopArgs.onSuccess">fm.icelink.stopArgs.onSuccess</see> or <see cref="fm.icelink.stopArgs.onFailure">fm.icelink.stopArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  stopArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.icelink.stopArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the operation fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  stopArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.icelink.stopArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the operation succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  stopArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.icelink.stopArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.icelink.stopArgs.onSuccess">fm.icelink.stopArgs.onSuccess</see> or <see cref="fm.icelink.stopArgs.onFailure">fm.icelink.stopArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  stopArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.icelink.stopArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the operation fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  stopArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.icelink.stopArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the operation succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  stopArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  return stopArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.sendOfferAnswerArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.sendOfferAnswerArgs
 <div>
 The arguments used when sending an offer/answer to a remote peer.
 </div>

@extends fm.object
*/


fm.icelink.sendOfferAnswerArgs = (function(_super) {

  __extends(sendOfferAnswerArgs, _super);

  sendOfferAnswerArgs.prototype._offerAnswer = null;

  sendOfferAnswerArgs.prototype._peerId = null;

  sendOfferAnswerArgs.prototype._peerState = null;

  function sendOfferAnswerArgs() {
    this.setPeerState = __bind(this.setPeerState, this);

    this.setPeerId = __bind(this.setPeerId, this);

    this.setOfferAnswer = __bind(this.setOfferAnswer, this);

    this.getPeerState = __bind(this.getPeerState, this);

    this.getPeerId = __bind(this.getPeerId, this);

    this.getOfferAnswer = __bind(this.getOfferAnswer, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      sendOfferAnswerArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    sendOfferAnswerArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.sendOfferAnswerArgs-getOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the offer/answer.
  	 </div>
  
  	@function getOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  sendOfferAnswerArgs.prototype.getOfferAnswer = function() {
    return this._offerAnswer;
  };

  /*<span id='method-fm.icelink.sendOfferAnswerArgs-getPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the remote peer.
  	 </div>
  
  	@function getPeerId
  	@return {String}
  */


  sendOfferAnswerArgs.prototype.getPeerId = function() {
    return this._peerId;
  };

  /*<span id='method-fm.icelink.sendOfferAnswerArgs-getPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the custom state object associated with the remote peer.
  	 </div>
  
  	@function getPeerState
  	@return {fm.object}
  */


  sendOfferAnswerArgs.prototype.getPeerState = function() {
    return this._peerState;
  };

  /*<span id='method-fm.icelink.sendOfferAnswerArgs-setOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the offer/answer.
  	 </div>
  
  	@function setOfferAnswer
  	@param {fm.icelink.offerAnswer} value
  	@return {void}
  */


  sendOfferAnswerArgs.prototype.setOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._offerAnswer = value;
  };

  /*<span id='method-fm.icelink.sendOfferAnswerArgs-setPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the ID of the remote peer.
  	 </div>
  
  	@function setPeerId
  	@param {String} value
  	@return {void}
  */


  sendOfferAnswerArgs.prototype.setPeerId = function() {
    var value;
    value = arguments[0];
    return this._peerId = value;
  };

  /*<span id='method-fm.icelink.sendOfferAnswerArgs-setPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the custom state object associated with the remote peer.
  	 </div>
  
  	@function setPeerState
  	@param {fm.object} value
  	@return {void}
  */


  sendOfferAnswerArgs.prototype.setPeerState = function() {
    var value;
    value = arguments[0];
    return this._peerState = value;
  };

  return sendOfferAnswerArgs;

})(fm.object);


/*<span id='cls-fm.icelink.sendCandidateArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.sendCandidateArgs
 <div>
 The arguments used when sending a candidate to a remote peer.
 </div>

@extends fm.object
*/


fm.icelink.sendCandidateArgs = (function(_super) {

  __extends(sendCandidateArgs, _super);

  sendCandidateArgs.prototype._candidate = null;

  sendCandidateArgs.prototype._peerId = null;

  sendCandidateArgs.prototype._peerState = null;

  function sendCandidateArgs() {
    this.setPeerState = __bind(this.setPeerState, this);

    this.setPeerId = __bind(this.setPeerId, this);

    this.setCandidate = __bind(this.setCandidate, this);

    this.getPeerState = __bind(this.getPeerState, this);

    this.getPeerId = __bind(this.getPeerId, this);

    this.getCandidate = __bind(this.getCandidate, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      sendCandidateArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    sendCandidateArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.sendCandidateArgs-getCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the candidate.
  	 </div>
  
  	@function getCandidate
  	@return {fm.icelink.candidate}
  */


  sendCandidateArgs.prototype.getCandidate = function() {
    return this._candidate;
  };

  /*<span id='method-fm.icelink.sendCandidateArgs-getPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the remote peer.
  	 </div>
  
  	@function getPeerId
  	@return {String}
  */


  sendCandidateArgs.prototype.getPeerId = function() {
    return this._peerId;
  };

  /*<span id='method-fm.icelink.sendCandidateArgs-getPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the custom state object associated with the remote peer.
  	 </div>
  
  	@function getPeerState
  	@return {fm.object}
  */


  sendCandidateArgs.prototype.getPeerState = function() {
    return this._peerState;
  };

  /*<span id='method-fm.icelink.sendCandidateArgs-setCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the candidate.
  	 </div>
  
  	@function setCandidate
  	@param {fm.icelink.candidate} value
  	@return {void}
  */


  sendCandidateArgs.prototype.setCandidate = function() {
    var value;
    value = arguments[0];
    return this._candidate = value;
  };

  /*<span id='method-fm.icelink.sendCandidateArgs-setPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the ID of the remote peer.
  	 </div>
  
  	@function setPeerId
  	@param {String} value
  	@return {void}
  */


  sendCandidateArgs.prototype.setPeerId = function() {
    var value;
    value = arguments[0];
    return this._peerId = value;
  };

  /*<span id='method-fm.icelink.sendCandidateArgs-setPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the custom state object associated with the remote peer.
  	 </div>
  
  	@function setPeerState
  	@param {fm.object} value
  	@return {void}
  */


  sendCandidateArgs.prototype.setPeerState = function() {
    var value;
    value = arguments[0];
    return this._peerState = value;
  };

  return sendCandidateArgs;

})(fm.object);


/*<span id='cls-fm.icelink.receiveOfferAnswerArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.receiveOfferAnswerArgs
 <div>
 The arguments used when receiving an offer/answer from a remote peer.
 </div>

@extends fm.object
*/


fm.icelink.receiveOfferAnswerArgs = (function(_super) {

  __extends(receiveOfferAnswerArgs, _super);

  receiveOfferAnswerArgs.prototype._offerAnswer = null;

  receiveOfferAnswerArgs.prototype._peerId = null;

  receiveOfferAnswerArgs.prototype._peerState = null;

  /*<span id='method-fm.icelink.receiveOfferAnswerArgs-fm.icelink.receiveOfferAnswerArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.receiveOfferAnswerArgs">fm.icelink.receiveOfferAnswerArgs</see> class.
  	 </div>
  	@function fm.icelink.receiveOfferAnswerArgs
  	@param {fm.icelink.offerAnswer} offerAnswer The offer/answer.
  	@param {String} peerId The ID of the remote peer.
  	@param {fm.object} peerState The custom state object associated with the remote peer.
  	@return {}
  */


  function receiveOfferAnswerArgs() {
    this.setPeerState = __bind(this.setPeerState, this);

    this.setPeerId = __bind(this.setPeerId, this);

    this.setOfferAnswer = __bind(this.setOfferAnswer, this);

    this.getPeerState = __bind(this.getPeerState, this);

    this.getPeerId = __bind(this.getPeerId, this);

    this.getOfferAnswer = __bind(this.getOfferAnswer, this);

    var offerAnswer, peerId, peerState;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      receiveOfferAnswerArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      offerAnswer = arguments[0];
      peerId = arguments[1];
      receiveOfferAnswerArgs.call(this, offerAnswer, peerId, null);
      return;
    }
    if (arguments.length === 3) {
      offerAnswer = arguments[0];
      peerId = arguments[1];
      peerState = arguments[2];
      receiveOfferAnswerArgs.__super__.constructor.call(this);
      this.setOfferAnswer(offerAnswer);
      this.setPeerId(peerId);
      this.setPeerState(peerState);
      return;
    }
  }

  /*<span id='method-fm.icelink.receiveOfferAnswerArgs-getOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the offer/answer.
  	 </div>
  
  	@function getOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  receiveOfferAnswerArgs.prototype.getOfferAnswer = function() {
    return this._offerAnswer;
  };

  /*<span id='method-fm.icelink.receiveOfferAnswerArgs-getPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the remote peer.
  	 </div>
  
  	@function getPeerId
  	@return {String}
  */


  receiveOfferAnswerArgs.prototype.getPeerId = function() {
    return this._peerId;
  };

  /*<span id='method-fm.icelink.receiveOfferAnswerArgs-getPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the custom state object associated with the remote peer.
  	 </div>
  
  	@function getPeerState
  	@return {fm.object}
  */


  receiveOfferAnswerArgs.prototype.getPeerState = function() {
    return this._peerState;
  };

  /*<span id='method-fm.icelink.receiveOfferAnswerArgs-setOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the offer/answer.
  	 </div>
  
  	@function setOfferAnswer
  	@param {fm.icelink.offerAnswer} value
  	@return {void}
  */


  receiveOfferAnswerArgs.prototype.setOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._offerAnswer = value;
  };

  /*<span id='method-fm.icelink.receiveOfferAnswerArgs-setPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the ID of the remote peer.
  	 </div>
  
  	@function setPeerId
  	@param {String} value
  	@return {void}
  */


  receiveOfferAnswerArgs.prototype.setPeerId = function() {
    var value;
    value = arguments[0];
    return this._peerId = value;
  };

  /*<span id='method-fm.icelink.receiveOfferAnswerArgs-setPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the custom state object associated with the remote peer.
  	 </div>
  
  	@function setPeerState
  	@param {fm.object} value
  	@return {void}
  */


  receiveOfferAnswerArgs.prototype.setPeerState = function() {
    var value;
    value = arguments[0];
    return this._peerState = value;
  };

  return receiveOfferAnswerArgs;

})(fm.object);


/*<span id='cls-fm.icelink.receiveCandidateArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.receiveCandidateArgs
 <div>
 The arguments used when receiving a candidate from a remote peer.
 </div>

@extends fm.object
*/


fm.icelink.receiveCandidateArgs = (function(_super) {

  __extends(receiveCandidateArgs, _super);

  receiveCandidateArgs.prototype._candidate = null;

  receiveCandidateArgs.prototype._peerId = null;

  /*<span id='method-fm.icelink.receiveCandidateArgs-fm.icelink.receiveCandidateArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.receiveCandidateArgs">fm.icelink.receiveCandidateArgs</see> class.
  	 </div>
  	@function fm.icelink.receiveCandidateArgs
  	@param {fm.icelink.candidate} candidate The candidate.
  	@param {String} peerId The ID of the remote peer.
  	@return {}
  */


  function receiveCandidateArgs() {
    this.setPeerId = __bind(this.setPeerId, this);

    this.setCandidate = __bind(this.setCandidate, this);

    this.getPeerId = __bind(this.getPeerId, this);

    this.getCandidate = __bind(this.getCandidate, this);

    var candidate, peerId;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      receiveCandidateArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    candidate = arguments[0];
    peerId = arguments[1];
    receiveCandidateArgs.__super__.constructor.call(this);
    this.setCandidate(candidate);
    this.setPeerId(peerId);
  }

  /*<span id='method-fm.icelink.receiveCandidateArgs-getCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the candidate.
  	 </div>
  
  	@function getCandidate
  	@return {fm.icelink.candidate}
  */


  receiveCandidateArgs.prototype.getCandidate = function() {
    return this._candidate;
  };

  /*<span id='method-fm.icelink.receiveCandidateArgs-getPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the remote peer.
  	 </div>
  
  	@function getPeerId
  	@return {String}
  */


  receiveCandidateArgs.prototype.getPeerId = function() {
    return this._peerId;
  };

  /*<span id='method-fm.icelink.receiveCandidateArgs-setCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the candidate.
  	 </div>
  
  	@function setCandidate
  	@param {fm.icelink.candidate} value
  	@return {void}
  */


  receiveCandidateArgs.prototype.setCandidate = function() {
    var value;
    value = arguments[0];
    return this._candidate = value;
  };

  /*<span id='method-fm.icelink.receiveCandidateArgs-setPeerId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the ID of the remote peer.
  	 </div>
  
  	@function setPeerId
  	@param {String} value
  	@return {void}
  */


  receiveCandidateArgs.prototype.setPeerId = function() {
    var value;
    value = arguments[0];
    return this._peerId = value;
  };

  return receiveCandidateArgs;

})(fm.object);


/*<span id='cls-fm.icelink.signalProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.signalProvider
 <div>
 A provider for signalling used during the peer-to-peer handshake process.
 Requires the definition of two 'send' methods (SendOfferAnswer/SendCandidate).
 Implementations must call RaiseOfferAnswer or RaiseCandidate when an offer/answer
 or candidate is received from a peer.
 </div>

@extends fm.dynamic
*/


fm.icelink.signalProvider = (function(_super) {

  __extends(signalProvider, _super);

  signalProvider.prototype._conferenceId = null;

  signalProvider.prototype._receivedCandidate = null;

  signalProvider.prototype._receivedOfferAnswer = null;

  /*<span id='method-fm.icelink.signalProvider-fm.icelink.signalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.signalProvider">fm.icelink.signalProvider</see> class.
  	 </div>
  	@function fm.icelink.signalProvider
  	@param {String} conferenceId The conference ID.
  	@return {}
  */


  function signalProvider() {
    this.stop = __bind(this.stop, this);

    this.start = __bind(this.start, this);

    this.setConferenceId = __bind(this.setConferenceId, this);

    this.sendOfferAnswer = __bind(this.sendOfferAnswer, this);

    this.sendCandidate = __bind(this.sendCandidate, this);

    this.removeReceivedOfferAnswer = __bind(this.removeReceivedOfferAnswer, this);

    this.removeReceivedCandidate = __bind(this.removeReceivedCandidate, this);

    this.raiseOfferAnswer = __bind(this.raiseOfferAnswer, this);

    this.raiseCandidate = __bind(this.raiseCandidate, this);

    this.getConferenceId = __bind(this.getConferenceId, this);

    this.addReceivedOfferAnswer = __bind(this.addReceivedOfferAnswer, this);

    this.addReceivedCandidate = __bind(this.addReceivedCandidate, this);

    var conferenceId;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      signalProvider.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    conferenceId = arguments[0];
    signalProvider.__super__.constructor.call(this);
    this.setConferenceId(conferenceId);
  }

  signalProvider.prototype.addReceivedCandidate = function() {
    var value;
    value = arguments[0];
    return this._receivedCandidate = fm.delegate.combine(this._receivedCandidate, value);
  };

  signalProvider.prototype.addReceivedOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._receivedOfferAnswer = fm.delegate.combine(this._receivedOfferAnswer, value);
  };

  /*<span id='method-fm.icelink.signalProvider-getConferenceId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the conference ID.
  	 </div>
  
  	@function getConferenceId
  	@return {String}
  */


  signalProvider.prototype.getConferenceId = function() {
    return this._conferenceId;
  };

  /*<span id='method-fm.icelink.signalProvider-raiseCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Raises a candidate received from a peer.
  	 </div>
  	@function raiseCandidate
  	@param {fm.icelink.receiveCandidateArgs} receiveCandidateArgs The arguments.
  	@return {void}
  */


  signalProvider.prototype.raiseCandidate = function() {
    var receiveCandidateArgs, receivedCandidate, _var0;
    receiveCandidateArgs = arguments[0];
    receivedCandidate = this._receivedCandidate;
    _var0 = receivedCandidate;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return receivedCandidate(receiveCandidateArgs);
    }
  };

  /*<span id='method-fm.icelink.signalProvider-raiseOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Raises an offer/answer received from a peer.
  	 </div>
  	@function raiseOfferAnswer
  	@param {fm.icelink.receiveOfferAnswerArgs} receiveOfferAnswerArgs The arguments.
  	@return {void}
  */


  signalProvider.prototype.raiseOfferAnswer = function() {
    var receiveOfferAnswerArgs, receivedOfferAnswer, _var0;
    receiveOfferAnswerArgs = arguments[0];
    receivedOfferAnswer = this._receivedOfferAnswer;
    _var0 = receivedOfferAnswer;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return receivedOfferAnswer(receiveOfferAnswerArgs);
    }
  };

  signalProvider.prototype.removeReceivedCandidate = function() {
    var value;
    value = arguments[0];
    return this._receivedCandidate = fm.delegate.remove(this._receivedCandidate, value);
  };

  signalProvider.prototype.removeReceivedOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._receivedOfferAnswer = fm.delegate.remove(this._receivedOfferAnswer, value);
  };

  /*<span id='method-fm.icelink.signalProvider-sendCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a candidate to a peer.
  	 </div>
  	@function sendCandidate
  	@param {fm.icelink.sendCandidateArgs} sendCandidateArgs The arguments.
  	@return {void}
  */


  signalProvider.prototype.sendCandidate = function() {
    var sendCandidateArgs;
    return sendCandidateArgs = arguments[0];
  };

  /*<span id='method-fm.icelink.signalProvider-sendOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends an offer/answer to a peer.
  	 </div>
  	@function sendOfferAnswer
  	@param {fm.icelink.sendOfferAnswerArgs} sendOfferAnswerArgs The arguments.
  	@return {void}
  */


  signalProvider.prototype.sendOfferAnswer = function() {
    var sendOfferAnswerArgs;
    return sendOfferAnswerArgs = arguments[0];
  };

  signalProvider.prototype.setConferenceId = function() {
    var value;
    value = arguments[0];
    return this._conferenceId = value;
  };

  /*<span id='method-fm.icelink.signalProvider-start'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Starts the provider.
  	 </div>
  	@function start
  	@param {fm.icelink.startArgs} startArgs The arguments.
  	@return {void}
  */


  signalProvider.prototype.start = function() {
    var startArgs;
    return startArgs = arguments[0];
  };

  /*<span id='method-fm.icelink.signalProvider-stop'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Stops the provider.
  	 </div>
  	@function stop
  	@param {fm.icelink.stopArgs} stopArgs The arguments.
  	@return {void}
  */


  signalProvider.prototype.stop = function() {
    var stopArgs;
    return stopArgs = arguments[0];
  };

  return signalProvider;

})(fm.dynamic);


/*<span id='cls-fm.icelink.linkDownArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.linkDownArgs
 <div>
 Arguments for the link down event.
 </div>

@extends fm.icelink.baseLinkArgs
*/


fm.icelink.linkDownArgs = (function(_super) {

  __extends(linkDownArgs, _super);

  linkDownArgs.prototype._exception = null;

  linkDownArgs.prototype._isSwitchingRoles = false;

  linkDownArgs.prototype._reason = null;

  function linkDownArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setReason = __bind(this.setReason, this);

    this.setIsSwitchingRoles = __bind(this.setIsSwitchingRoles, this);

    this.setException = __bind(this.setException, this);

    this.getReason = __bind(this.getReason, this);

    this.getIsSwitchingRoles = __bind(this.getIsSwitchingRoles, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      linkDownArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    linkDownArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.linkDownArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} linkDownArgsJson The JSON to deserialize.
  	@return {fm.icelink.linkDownArgs} The deserialized link down arguments.
  */


  linkDownArgs.fromJson = function() {
    var linkDownArgsJson;
    linkDownArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeLinkDownArgs(linkDownArgsJson);
  };

  /*<span id='method-fm.icelink.linkDownArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.linkDownArgs} linkDownArgs The link down arguments to serialize.
  	@return {String} The serialized JSON.
  */


  linkDownArgs.toJson = function() {
    var linkDownArgs;
    linkDownArgs = arguments[0];
    return fm.icelink.serializer.serializeLinkDownArgs(linkDownArgs);
  };

  /*<span id='method-fm.icelink.linkDownArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception that occurred.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  linkDownArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.icelink.linkDownArgs-getIsSwitchingRoles'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the link is switching roles.
  	 </div>
  
  	@function getIsSwitchingRoles
  	@return {Boolean}
  */


  linkDownArgs.prototype.getIsSwitchingRoles = function() {
    return this._isSwitchingRoles;
  };

  /*<span id='method-fm.icelink.linkDownArgs-getReason'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the reason, if specified.
  	 </div>
  
  	@function getReason
  	@return {String}
  */


  linkDownArgs.prototype.getReason = function() {
    return this._reason;
  };

  linkDownArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  linkDownArgs.prototype.setIsSwitchingRoles = function() {
    var value;
    value = arguments[0];
    return this._isSwitchingRoles = value;
  };

  linkDownArgs.prototype.setReason = function() {
    var value;
    value = arguments[0];
    return this._reason = value;
  };

  /*<span id='method-fm.icelink.linkDownArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  linkDownArgs.prototype.toJson = function() {
    return fm.icelink.linkDownArgs.toJson(this);
  };

  return linkDownArgs;

}).call(this, fm.icelink.baseLinkArgs);


/*<span id='cls-fm.icelink.streamLinkDownArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.streamLinkDownArgs
 <div>
 Arguments for the stream down event.
 </div>

@extends fm.icelink.linkDownArgs
*/


fm.icelink.streamLinkDownArgs = (function(_super) {

  __extends(streamLinkDownArgs, _super);

  streamLinkDownArgs.prototype._stream = null;

  function streamLinkDownArgs() {
    this.setStream = __bind(this.setStream, this);

    this.getStream = __bind(this.getStream, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      streamLinkDownArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    streamLinkDownArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.streamLinkDownArgs-getStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the source stream.
  	 </div>
  
  	@function getStream
  	@return {fm.icelink.stream}
  */


  streamLinkDownArgs.prototype.getStream = function() {
    return this._stream;
  };

  streamLinkDownArgs.prototype.setStream = function() {
    var value;
    value = arguments[0];
    return this._stream = value;
  };

  return streamLinkDownArgs;

})(fm.icelink.linkDownArgs);


/*<span id='cls-fm.icelink.linkInitArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.linkInitArgs
 <div>
 Arguments for the link init event.
 </div>

@extends fm.icelink.baseLinkArgs
*/


fm.icelink.linkInitArgs = (function(_super) {

  __extends(linkInitArgs, _super);

  linkInitArgs.prototype._initiator = false;

  function linkInitArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setInitiator = __bind(this.setInitiator, this);

    this.getInitiator = __bind(this.getInitiator, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      linkInitArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    linkInitArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.linkInitArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} linkInitArgsJson The JSON to deserialize.
  	@return {fm.icelink.linkInitArgs} The deserialized link init arguments.
  */


  linkInitArgs.fromJson = function() {
    var linkInitArgsJson;
    linkInitArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeLinkInitArgs(linkInitArgsJson);
  };

  /*<span id='method-fm.icelink.linkInitArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.linkInitArgs} linkInitArgs The link init arguments to serialize.
  	@return {String} The serialized JSON.
  */


  linkInitArgs.toJson = function() {
    var linkInitArgs;
    linkInitArgs = arguments[0];
    return fm.icelink.serializer.serializeLinkInitArgs(linkInitArgs);
  };

  /*<span id='method-fm.icelink.linkInitArgs-getInitiator'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the current process is the initiator.
  	 </div>
  
  	@function getInitiator
  	@return {Boolean}
  */


  linkInitArgs.prototype.getInitiator = function() {
    return this._initiator;
  };

  linkInitArgs.prototype.setInitiator = function() {
    var value;
    value = arguments[0];
    return this._initiator = value;
  };

  /*<span id='method-fm.icelink.linkInitArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  linkInitArgs.prototype.toJson = function() {
    return fm.icelink.linkInitArgs.toJson(this);
  };

  return linkInitArgs;

}).call(this, fm.icelink.baseLinkArgs);


/*<span id='cls-fm.icelink.streamLinkInitArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.streamLinkInitArgs
 <div>
 Arguments for the stream init event.
 </div>

@extends fm.icelink.linkInitArgs
*/


fm.icelink.streamLinkInitArgs = (function(_super) {

  __extends(streamLinkInitArgs, _super);

  streamLinkInitArgs.prototype._stream = null;

  function streamLinkInitArgs() {
    this.setStream = __bind(this.setStream, this);

    this.getStream = __bind(this.getStream, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      streamLinkInitArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    streamLinkInitArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.streamLinkInitArgs-getStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the source stream.
  	 </div>
  
  	@function getStream
  	@return {fm.icelink.stream}
  */


  streamLinkInitArgs.prototype.getStream = function() {
    return this._stream;
  };

  streamLinkInitArgs.prototype.setStream = function() {
    var value;
    value = arguments[0];
    return this._stream = value;
  };

  return streamLinkInitArgs;

})(fm.icelink.linkInitArgs);


/*<span id='cls-fm.icelink.linkUpArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.linkUpArgs
 <div>
 Arguments for the link up event.
 </div>

@extends fm.icelink.baseLinkArgs
*/


fm.icelink.linkUpArgs = (function(_super) {

  __extends(linkUpArgs, _super);

  linkUpArgs.prototype._negotiatedStreams = null;

  function linkUpArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setNegotiatedStreams = __bind(this.setNegotiatedStreams, this);

    this.getNegotiatedStreams = __bind(this.getNegotiatedStreams, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      linkUpArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    linkUpArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.linkUpArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} linkUpArgsJson The JSON to deserialize.
  	@return {fm.icelink.linkUpArgs} The deserialized link up arguments.
  */


  linkUpArgs.fromJson = function() {
    var linkUpArgsJson;
    linkUpArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeLinkUpArgs(linkUpArgsJson);
  };

  /*<span id='method-fm.icelink.linkUpArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.linkUpArgs} linkUpArgs The link up arguments to serialize.
  	@return {String} The serialized JSON.
  */


  linkUpArgs.toJson = function() {
    var linkUpArgs;
    linkUpArgs = arguments[0];
    return fm.icelink.serializer.serializeLinkUpArgs(linkUpArgs);
  };

  /*<span id='method-fm.icelink.linkUpArgs-getNegotiatedStreams'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the negotiated streams.
  	 </div>
  
  	@function getNegotiatedStreams
  	@return {fm.array}
  */


  linkUpArgs.prototype.getNegotiatedStreams = function() {
    return this._negotiatedStreams;
  };

  linkUpArgs.prototype.setNegotiatedStreams = function() {
    var value;
    value = arguments[0];
    return this._negotiatedStreams = value;
  };

  /*<span id='method-fm.icelink.linkUpArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  linkUpArgs.prototype.toJson = function() {
    return fm.icelink.linkUpArgs.toJson(this);
  };

  return linkUpArgs;

}).call(this, fm.icelink.baseLinkArgs);


/*<span id='cls-fm.icelink.streamLinkUpArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.streamLinkUpArgs
 <div>
 Arguments for the stream up event.
 </div>

@extends fm.icelink.linkUpArgs
*/


fm.icelink.streamLinkUpArgs = (function(_super) {

  __extends(streamLinkUpArgs, _super);

  streamLinkUpArgs.prototype._negotiatedStream = null;

  streamLinkUpArgs.prototype._stream = null;

  function streamLinkUpArgs() {
    this.setStream = __bind(this.setStream, this);

    this.setNegotiatedStream = __bind(this.setNegotiatedStream, this);

    this.getStream = __bind(this.getStream, this);

    this.getNegotiatedStream = __bind(this.getNegotiatedStream, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      streamLinkUpArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    streamLinkUpArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.streamLinkUpArgs-getNegotiatedStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the negotiated stream.
  	 </div>
  
  	@function getNegotiatedStream
  	@return {fm.icelink.stream}
  */


  streamLinkUpArgs.prototype.getNegotiatedStream = function() {
    return this._negotiatedStream;
  };

  /*<span id='method-fm.icelink.streamLinkUpArgs-getStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the source stream.
  	 </div>
  
  	@function getStream
  	@return {fm.icelink.stream}
  */


  streamLinkUpArgs.prototype.getStream = function() {
    return this._stream;
  };

  streamLinkUpArgs.prototype.setNegotiatedStream = function() {
    var value;
    value = arguments[0];
    return this._negotiatedStream = value;
  };

  streamLinkUpArgs.prototype.setStream = function() {
    var value;
    value = arguments[0];
    return this._stream = value;
  };

  return streamLinkUpArgs;

})(fm.icelink.linkUpArgs);


/*<span id='cls-fm.icelink.linkOfferAnswerArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.linkOfferAnswerArgs
 <div>
 Arguments for the link offer/answer event.
 </div>

@extends fm.icelink.baseLinkArgs
*/


fm.icelink.linkOfferAnswerArgs = (function(_super) {

  __extends(linkOfferAnswerArgs, _super);

  linkOfferAnswerArgs.prototype._offerAnswer = null;

  function linkOfferAnswerArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setOfferAnswer = __bind(this.setOfferAnswer, this);

    this.getOfferAnswer = __bind(this.getOfferAnswer, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      linkOfferAnswerArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    linkOfferAnswerArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.linkOfferAnswerArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} linkOfferAnswerArgsJson The JSON to deserialize.
  	@return {fm.icelink.linkOfferAnswerArgs} The deserialized link offer/answer arguments.
  */


  linkOfferAnswerArgs.fromJson = function() {
    var linkOfferAnswerArgsJson;
    linkOfferAnswerArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeLinkOfferAnswerArgs(linkOfferAnswerArgsJson);
  };

  /*<span id='method-fm.icelink.linkOfferAnswerArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.linkOfferAnswerArgs} linkOfferAnswerArgs The link offer/answer arguments to serialize.
  	@return {String} The serialized JSON.
  */


  linkOfferAnswerArgs.toJson = function() {
    var linkOfferAnswerArgs;
    linkOfferAnswerArgs = arguments[0];
    return fm.icelink.serializer.serializeLinkOfferAnswerArgs(linkOfferAnswerArgs);
  };

  /*<span id='method-fm.icelink.linkOfferAnswerArgs-getOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the created offer/answer.
  	 </div>
  
  	@function getOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  linkOfferAnswerArgs.prototype.getOfferAnswer = function() {
    return this._offerAnswer;
  };

  linkOfferAnswerArgs.prototype.setOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._offerAnswer = value;
  };

  /*<span id='method-fm.icelink.linkOfferAnswerArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  linkOfferAnswerArgs.prototype.toJson = function() {
    return fm.icelink.linkOfferAnswerArgs.toJson(this);
  };

  return linkOfferAnswerArgs;

}).call(this, fm.icelink.baseLinkArgs);


/*<span id='cls-fm.icelink.streamLinkReceiveRTCPArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.streamLinkReceiveRTCPArgs
 <div>
 Arguments for the stream receive-RTCP event.
 </div>

@extends fm.icelink.linkReceiveRTCPArgs
*/


fm.icelink.streamLinkReceiveRTCPArgs = (function(_super) {

  __extends(streamLinkReceiveRTCPArgs, _super);

  streamLinkReceiveRTCPArgs.prototype._negotiatedStream = null;

  function streamLinkReceiveRTCPArgs() {
    this.setNegotiatedStream = __bind(this.setNegotiatedStream, this);

    this.getNegotiatedStream = __bind(this.getNegotiatedStream, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      streamLinkReceiveRTCPArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    streamLinkReceiveRTCPArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.streamLinkReceiveRTCPArgs-getNegotiatedStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the negotiated stream.
  	 </div>
  
  	@function getNegotiatedStream
  	@return {fm.icelink.stream}
  */


  streamLinkReceiveRTCPArgs.prototype.getNegotiatedStream = function() {
    return this._negotiatedStream;
  };

  streamLinkReceiveRTCPArgs.prototype.setNegotiatedStream = function() {
    var value;
    value = arguments[0];
    return this._negotiatedStream = value;
  };

  return streamLinkReceiveRTCPArgs;

})(fm.icelink.linkReceiveRTCPArgs);


/*<span id='cls-fm.icelink.streamLinkReceiveRTPArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.streamLinkReceiveRTPArgs
 <div>
 Arguments for the stream receive RTP event.
 </div>

@extends fm.icelink.linkReceiveRTPArgs
*/


fm.icelink.streamLinkReceiveRTPArgs = (function(_super) {

  __extends(streamLinkReceiveRTPArgs, _super);

  streamLinkReceiveRTPArgs.prototype._negotiatedStream = null;

  function streamLinkReceiveRTPArgs() {
    this.setNegotiatedStream = __bind(this.setNegotiatedStream, this);

    this.getNegotiatedStream = __bind(this.getNegotiatedStream, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      streamLinkReceiveRTPArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    streamLinkReceiveRTPArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.streamLinkReceiveRTPArgs-getNegotiatedStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the negotiated stream.
  	 </div>
  
  	@function getNegotiatedStream
  	@return {fm.icelink.stream}
  */


  streamLinkReceiveRTPArgs.prototype.getNegotiatedStream = function() {
    return this._negotiatedStream;
  };

  streamLinkReceiveRTPArgs.prototype.setNegotiatedStream = function() {
    var value;
    value = arguments[0];
    return this._negotiatedStream = value;
  };

  return streamLinkReceiveRTPArgs;

})(fm.icelink.linkReceiveRTPArgs);


/*<span id='cls-fm.icelink.conference'>&nbsp;</span>
*/

/**
@class fm.icelink.conference
 <div>
 A link manager that keeps track of a group of
 peer-to-peer links using a non-peer-to-peer library
 for session negotiation.
 </div>

@extends fm.icelink.baseConference
*/


fm.icelink.conference = (function(_super) {

  __extends(conference, _super);

  conference.prototype.__signalProvider = null;

  conference._callbackKey = null;

  conference.prototype._earlyCandidates = null;

  conference.prototype._earlyCandidatesLock = null;

  conference.prototype._links = null;

  conference.prototype._linksLock = null;

  conference.prototype._maxLinks = 0;

  conference.prototype._onLinkCandidate = null;

  conference.prototype._onLinkCandidateEvent = null;

  conference.prototype._onLinkDown = null;

  conference.prototype._onLinkDownEvent = null;

  conference.prototype._onLinkInit = null;

  conference.prototype._onLinkOfferAnswer = null;

  conference.prototype._onLinkReceiveRTCP = null;

  conference.prototype._onLinkReceiveRTCPEvent = null;

  conference.prototype._onLinkReceiveRTP = null;

  conference.prototype._onLinkReceiveRTPEvent = null;

  conference.prototype._onLinkUp = null;

  conference.prototype._onLinkUpEvent = null;

  conference.prototype._onUnhandledException = null;

  conference._peerIdKey = null;

  conference._peerStateKey = null;

  conference.prototype._randomizeServers = false;

  conference.prototype._receivedCandidateEvent = null;

  conference.prototype._receivedOfferAnswerEvent = null;

  conference._stateKey = null;

  conference.prototype._timeout = 0;

  conference.prototype._timeoutTimers = null;

  conference.prototype._timeoutTimersLock = null;

  /*<span id='method-fm.icelink.conference-fm.icelink.conference'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.conference">fm.icelink.conference</see> class.
  	 </div>
  	@function fm.icelink.conference
  	@param {String} serverAddress The IceLink server address.
  	@param {Integer} serverPort The IceLink server port.
  	@param {fm.array} streams The streams to establish.
  	@return {}
  */


  function conference() {
    this.unlinkAll = __bind(this.unlinkAll, this);

    this.unlink = __bind(this.unlink, this);

    this.timerTimeoutCallback = __bind(this.timerTimeoutCallback, this);

    this.setTimeout = __bind(this.setTimeout, this);

    this.setSignalProvider = __bind(this.setSignalProvider, this);

    this.setRandomizeServers = __bind(this.setRandomizeServers, this);

    this.setMaxLinks = __bind(this.setMaxLinks, this);

    this.removeTimeoutTimer = __bind(this.removeTimeoutTimer, this);

    this.removeOnUnhandledException = __bind(this.removeOnUnhandledException, this);

    this.removeOnLinkUp = __bind(this.removeOnLinkUp, this);

    this.removeOnLinkReceiveRTP = __bind(this.removeOnLinkReceiveRTP, this);

    this.removeOnLinkReceiveRTCP = __bind(this.removeOnLinkReceiveRTCP, this);

    this.removeOnLinkOfferAnswer = __bind(this.removeOnLinkOfferAnswer, this);

    this.removeOnLinkInit = __bind(this.removeOnLinkInit, this);

    this.removeOnLinkDown = __bind(this.removeOnLinkDown, this);

    this.removeOnLinkCandidate = __bind(this.removeOnLinkCandidate, this);

    this.receiveOfferAnswerCacheLinkCallback = __bind(this.receiveOfferAnswerCacheLinkCallback, this);

    this.receiveOfferAnswerCacheLinkAcceptCallback = __bind(this.receiveOfferAnswerCacheLinkAcceptCallback, this);

    this.receiveOfferAnswer = __bind(this.receiveOfferAnswer, this);

    this.receiveCandidate = __bind(this.receiveCandidate, this);

    this.raiseUnhandledException = __bind(this.raiseUnhandledException, this);

    this.raiseLinkUp = __bind(this.raiseLinkUp, this);

    this.raiseLinkReceiveRTP = __bind(this.raiseLinkReceiveRTP, this);

    this.raiseLinkReceiveRTCP = __bind(this.raiseLinkReceiveRTCP, this);

    this.raiseLinkOfferAnswer = __bind(this.raiseLinkOfferAnswer, this);

    this.raiseLinkInit = __bind(this.raiseLinkInit, this);

    this.raiseLinkDown = __bind(this.raiseLinkDown, this);

    this.raiseLinkCandidate = __bind(this.raiseLinkCandidate, this);

    this.processReceivedOfferAnswer = __bind(this.processReceivedOfferAnswer, this);

    this.processReceivedCandidate = __bind(this.processReceivedCandidate, this);

    this.processOnLinkUp = __bind(this.processOnLinkUp, this);

    this.processOnLinkReceiveRTP = __bind(this.processOnLinkReceiveRTP, this);

    this.processOnLinkReceiveRTCP = __bind(this.processOnLinkReceiveRTCP, this);

    this.processOnLinkDown = __bind(this.processOnLinkDown, this);

    this.processOnLinkCandidate = __bind(this.processOnLinkCandidate, this);

    this.performDropLink = __bind(this.performDropLink, this);

    this.onLinkInitialize = __bind(this.onLinkInitialize, this);

    this.onCreateSuccess = __bind(this.onCreateSuccess, this);

    this.onCreateFailure = __bind(this.onCreateFailure, this);

    this.onAcceptFailure = __bind(this.onAcceptFailure, this);

    this.linkCacheLinkCallback = __bind(this.linkCacheLinkCallback, this);

    this.link = __bind(this.link, this);

    this.isLinked = __bind(this.isLinked, this);

    this.getTimeoutTimer = __bind(this.getTimeoutTimer, this);

    this.getTimeout = __bind(this.getTimeout, this);

    this.getSignalProvider = __bind(this.getSignalProvider, this);

    this.getRandomizeServers = __bind(this.getRandomizeServers, this);

    this.getPeerStates = __bind(this.getPeerStates, this);

    this.getPeerState = __bind(this.getPeerState, this);

    this.getPeerIds = __bind(this.getPeerIds, this);

    this.getMaxLinks = __bind(this.getMaxLinks, this);

    this.getLinks = __bind(this.getLinks, this);

    this.getLink = __bind(this.getLink, this);

    this.dropLink = __bind(this.dropLink, this);

    this.detachSignalEvents = __bind(this.detachSignalEvents, this);

    this.detachEvents = __bind(this.detachEvents, this);

    this.createAndSendOffer = __bind(this.createAndSendOffer, this);

    this.createAndSendAnswer = __bind(this.createAndSendAnswer, this);

    this.createAndSend = __bind(this.createAndSend, this);

    this.cacheLink = __bind(this.cacheLink, this);

    this.attachSignalEvents = __bind(this.attachSignalEvents, this);

    this.attachEvents = __bind(this.attachEvents, this);

    this.addTimeoutTimer = __bind(this.addTimeoutTimer, this);

    this.addOnUnhandledException = __bind(this.addOnUnhandledException, this);

    this.addOnLinkUp = __bind(this.addOnLinkUp, this);

    this.addOnLinkReceiveRTP = __bind(this.addOnLinkReceiveRTP, this);

    this.addOnLinkReceiveRTCP = __bind(this.addOnLinkReceiveRTCP, this);

    this.addOnLinkOfferAnswer = __bind(this.addOnLinkOfferAnswer, this);

    this.addOnLinkInit = __bind(this.addOnLinkInit, this);

    this.addOnLinkDown = __bind(this.addOnLinkDown, this);

    this.addOnLinkCandidate = __bind(this.addOnLinkCandidate, this);

    this.accept = __bind(this.accept, this);

    var list, serverAddress, serverAddresses, serverPort, stream, streams, type, _i, _j, _k, _len, _len1, _len2, _var0, _var1, _var2;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      conference.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 1) {
      streams = arguments[0];
      conference.call(this, new Array(0), streams);
      return;
    }
    if (arguments.length === 3) {
      serverAddress = arguments[0];
      serverPort = arguments[1];
      streams = arguments[2];
      conference.call(this, [fm.stringExtensions.format("{0}:{1}", serverAddress, fm.intExtensions.toString(serverPort))], streams);
      return;
    }
    if (arguments.length === 2) {
      serverAddresses = arguments[0];
      streams = arguments[1];
      conference.__super__.constructor.call(this);
      this._links = {};
      this._linksLock = new fm.object();
      this._earlyCandidates = {};
      this._earlyCandidatesLock = new fm.object();
      this._timeoutTimers = {};
      this._timeoutTimersLock = new fm.object();
      this.setServerAddresses(serverAddresses);
      list = [];
      _var0 = [fm.icelink.streamType.Audio, fm.icelink.streamType.Video];
      for (_i = 0, _len = _var0.length; _i < _len; _i++) {
        type = _var0[_i];
        _var1 = streams;
        for (_j = 0, _len1 = _var1.length; _j < _len1; _j++) {
          stream = _var1[_j];
          if (stream.getType() === type) {
            fm.arrayExtensions.add(list, stream);
          }
        }
      }
      _var2 = streams;
      for (_k = 0, _len2 = _var2.length; _k < _len2; _k++) {
        stream = _var2[_k];
        if ((stream.getType() !== fm.icelink.streamType.Audio) && (stream.getType() !== fm.icelink.streamType.Video)) {
          fm.arrayExtensions.add(list, stream);
        }
      }
      this.setStreams(fm.arrayExtensions.toArray(list));
      this.setTimeout(30000);
      this._onLinkCandidateEvent = this.processOnLinkCandidate;
      this._onLinkUpEvent = this.processOnLinkUp;
      this._onLinkDownEvent = this.processOnLinkDown;
      this._onLinkReceiveRTPEvent = this.processOnLinkReceiveRTP;
      this._onLinkReceiveRTCPEvent = this.processOnLinkReceiveRTCP;
      this._receivedOfferAnswerEvent = this.processReceivedOfferAnswer;
      this._receivedCandidateEvent = this.processReceivedCandidate;
      return;
    }
  }

  conference.prototype.accept = function() {
    var acceptArgs, link, offerAnswer, onSuccess;
    link = arguments[0];
    offerAnswer = arguments[1];
    onSuccess = arguments[2];
    acceptArgs = new fm.icelink.acceptArgs(offerAnswer);
    acceptArgs.setOnSuccess(onSuccess);
    acceptArgs.setOnFailure(this.onAcceptFailure);
    return link.accept(acceptArgs);
  };

  /*<span id='method-fm.icelink.conference-addOnLinkCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link candidate has been discovered.
  	 </div>
  
  	@function addOnLinkCandidate
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.addOnLinkCandidate = function() {
    var value;
    value = arguments[0];
    return this._onLinkCandidate = fm.delegate.combine(this._onLinkCandidate, value);
  };

  /*<span id='method-fm.icelink.conference-addOnLinkDown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link is down.
  	 </div>
  
  	@function addOnLinkDown
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.addOnLinkDown = function() {
    var value;
    value = arguments[0];
    return this._onLinkDown = fm.delegate.combine(this._onLinkDown, value);
  };

  /*<span id='method-fm.icelink.conference-addOnLinkInit'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link is being initialized.
  	 </div>
  
  	@function addOnLinkInit
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.addOnLinkInit = function() {
    var value;
    value = arguments[0];
    return this._onLinkInit = fm.delegate.combine(this._onLinkInit, value);
  };

  /*<span id='method-fm.icelink.conference-addOnLinkOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link offer or answer has been created.
  	 </div>
  
  	@function addOnLinkOfferAnswer
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.addOnLinkOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._onLinkOfferAnswer = fm.delegate.combine(this._onLinkOfferAnswer, value);
  };

  /*<span id='method-fm.icelink.conference-addOnLinkReceiveRTCP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when link RTCP packets are received.
  	 </div>
  
  	@function addOnLinkReceiveRTCP
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.addOnLinkReceiveRTCP = function() {
    var value;
    value = arguments[0];
    return this._onLinkReceiveRTCP = fm.delegate.combine(this._onLinkReceiveRTCP, value);
  };

  /*<span id='method-fm.icelink.conference-addOnLinkReceiveRTP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link RTP packet is received.
  	 </div>
  
  	@function addOnLinkReceiveRTP
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.addOnLinkReceiveRTP = function() {
    var value;
    value = arguments[0];
    return this._onLinkReceiveRTP = fm.delegate.combine(this._onLinkReceiveRTP, value);
  };

  /*<span id='method-fm.icelink.conference-addOnLinkUp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when a link is up.
  	 </div>
  
  	@function addOnLinkUp
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.addOnLinkUp = function() {
    var value;
    value = arguments[0];
    return this._onLinkUp = fm.delegate.combine(this._onLinkUp, value);
  };

  /*<span id='method-fm.icelink.conference-addOnUnhandledException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function addOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.addOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.combine(this._onUnhandledException, value);
  };

  conference.prototype.addTimeoutTimer = function() {
    var link, timer;
    link = arguments[0];
    timer = new fm.timeoutTimer(this.timerTimeoutCallback, link);
    this._timeoutTimers[link.getPeerId()] = timer;
    return timer;
  };

  conference.prototype.attachEvents = function() {
    var link;
    link = arguments[0];
    link.addOnCandidate(this._onLinkCandidateEvent);
    link.addOnUp(this._onLinkUpEvent);
    link.addOnReceiveRTP(this._onLinkReceiveRTPEvent);
    link.addOnReceiveRTCP(this._onLinkReceiveRTCPEvent);
    return link.addOnDown(this._onLinkDownEvent);
  };

  conference.prototype.attachSignalEvents = function() {
    var provider, _var0;
    provider = this.__signalProvider;
    _var0 = provider;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      provider.addReceivedOfferAnswer(this._receivedOfferAnswerEvent);
      return provider.addReceivedCandidate(this._receivedCandidateEvent);
    }
  };

  conference.prototype.cacheLink = function() {
    var callback, index, link, num, peerId, peerState, reason, serverAddresses, state, str2, _var0, _var1, _var2, _var3, _var4;
    peerId = arguments[0];
    peerState = arguments[1];
    callback = arguments[2];
    state = arguments[3];
    link = null;
    if (fm.hashExtensions.containsKey(this._links, peerId)) {
      reason = "Peer is reconnecting.";
      this.dropLink(peerId, new Error(reason), reason, false, false, false);
    }
    if ((this.getMaxLinks() <= 0) || (fm.hashExtensions.getCount(this._links) < this.getMaxLinks())) {
      link = new fm.icelink.link();
      _var0 = peerId;
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        link.setDynamicValue(fm.icelink.conference._peerIdKey, peerId);
      }
      _var1 = peerState;
      if (_var1 !== null && typeof _var1 !== 'undefined') {
        link.setDynamicValue(fm.icelink.conference._peerStateKey, peerState);
      }
      link.setDynamicValue(fm.icelink.conference._callbackKey, callback);
      _var2 = state;
      if (_var2 !== null && typeof _var2 !== 'undefined') {
        link.setDynamicValue(fm.icelink.conference._stateKey, state);
      }
      serverAddresses = null;
      _var3 = this.getServerAddresses();
      if (_var3 !== null && typeof _var3 !== 'undefined') {
        serverAddresses = new Array(this.getServerAddresses().length);
        num = 0;
        while (num < serverAddresses.length) {
          try {
            serverAddresses[num] = this.getServerAddresses()[num];
          } finally {
            num++;
          }
        }
        if (this.getRandomizeServers() && (serverAddresses.length > 1)) {
          num = serverAddresses.length - 1;
          while (num > 0) {
            try {
              index = fm.lockedRandomizer.next(num + 1);
              str2 = serverAddresses[num];
              serverAddresses[num] = serverAddresses[index];
              serverAddresses[index] = str2;
            } finally {
              num--;
            }
          }
        }
      }
      link.initialize(serverAddresses, this.getStreams(), this.onLinkInitialize);
    }
    _var4 = link;
    if (_var4 === null || typeof _var4 === 'undefined') {
      return callback(link, state);
    }
  };

  conference.prototype.createAndSend = function() {
    var args2, createArgs, e, initiator, link;
    link = arguments[0];
    initiator = arguments[1];
    this.addTimeoutTimer(link).start(this.getTimeout());
    args2 = new fm.icelink.createArgs();
    args2.setOnFailure(this.onCreateFailure);
    args2.setOnSuccess(this.onCreateSuccess);
    createArgs = args2;
    if (initiator) {
      link.createOffer(createArgs);
    } else {
      link.createAnswer(createArgs);
    }
    e = new fm.icelink.linkInitArgs();
    e.setLink(link);
    e.setInitiator(initiator);
    return this.raiseLinkInit(e);
  };

  conference.prototype.createAndSendAnswer = function() {
    var link;
    link = arguments[0];
    return this.createAndSend(link, false);
  };

  conference.prototype.createAndSendOffer = function() {
    var link;
    link = arguments[0];
    return this.createAndSend(link, true);
  };

  conference.prototype.detachEvents = function() {
    var link;
    link = arguments[0];
    link.removeOnCandidate(this._onLinkCandidateEvent);
    link.removeOnUp(this._onLinkUpEvent);
    link.removeOnReceiveRTP(this._onLinkReceiveRTPEvent);
    link.removeOnReceiveRTCP(this._onLinkReceiveRTCPEvent);
    return link.removeOnDown(this._onLinkDownEvent);
  };

  conference.prototype.detachSignalEvents = function() {
    var provider, _var0;
    provider = this.__signalProvider;
    _var0 = provider;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      provider.removeReceivedOfferAnswer(this._receivedOfferAnswerEvent);
      return provider.removeReceivedCandidate(this._receivedCandidateEvent);
    }
  };

  conference.prototype.dropLink = function() {
    var closed, exception, peerId, reason, switchingRoles, timedOut, timeoutTimer, _var0;
    peerId = arguments[0];
    exception = arguments[1];
    reason = arguments[2];
    timedOut = arguments[3];
    closed = arguments[4];
    switchingRoles = arguments[5];
    timeoutTimer = this.getTimeoutTimer(peerId);
    _var0 = timeoutTimer;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.removeTimeoutTimer(peerId);
      if (timedOut || timeoutTimer.stop()) {
        return this.performDropLink(peerId, exception, reason, closed, switchingRoles);
      }
      return true;
    }
    return this.performDropLink(peerId, exception, reason, closed, switchingRoles);
  };

  /*<span id='method-fm.icelink.conference-getLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets an individual link from the conference.
  	 </div>
  	@function getLink
  	@param {String} peerId The peer ID.
  	@return {fm.icelink.link} The link to the peer, or null if there is no link to the peer.
  */


  conference.prototype.getLink = function() {
    var link, peerId, _var0, _var1;
    peerId = arguments[0];
    link = null;
    _var0 = new fm.holder(link);
    _var1 = fm.hashExtensions.tryGetValue(this._links, peerId, _var0);
    link = _var0.getValue();
    _var1;

    return link;
  };

  /*<span id='method-fm.icelink.conference-getLinks'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a list of links currently managed by this conference.
  	 </div>
  	@function getLinks
  	@return {fm.array}
  */


  conference.prototype.getLinks = function() {
    var link, list, _i, _len, _var0;
    list = [];
    _var0 = fm.hashExtensions.getValues(this._links);
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      link = _var0[_i];
      fm.arrayExtensions.add(list, link);
    }
    return fm.arrayExtensions.toArray(list);
  };

  /*<span id='method-fm.icelink.conference-getMaxLinks'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the maximum number of links allowed on this conference. Defaults to 0 (no maximum).
  	 </div>
  
  	@function getMaxLinks
  	@return {Integer}
  */


  conference.prototype.getMaxLinks = function() {
    return this._maxLinks;
  };

  /*<span id='method-fm.icelink.conference-getPeerIds'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a list of the IDs of peers who have links
  	 managed by this conference.
  	 </div>
  	@function getPeerIds
  	@return {fm.array}
  */


  conference.prototype.getPeerIds = function() {
    var link, links, list, _i, _len, _var0;
    list = [];
    links = this.getLinks();
    _var0 = links;
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      link = _var0[_i];
      fm.arrayExtensions.add(list, link.getPeerId());
    }
    return fm.arrayExtensions.toArray(list);
  };

  /*<span id='method-fm.icelink.conference-getPeerState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the state of a peer given the peer ID, or
  	 <c>null</c> if the peer does not have a link
  	 that is managed by this conference.
  	 </div>
  	@function getPeerState
  	@param {String} peerId
  	@return {fm.object}
  */


  conference.prototype.getPeerState = function() {
    var link, peerId, _var0;
    peerId = arguments[0];
    link = this.getLink(peerId);
    _var0 = link;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return link.getPeerState();
  };

  /*<span id='method-fm.icelink.conference-getPeerStates'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a hashtable of peer states keyed by the IDs of
  	 peers who have links managed by this conference.
  	 </div>
  	@function getPeerStates
  	@return {Object}
  */


  conference.prototype.getPeerStates = function() {
    var dictionary, link, links, _i, _len, _var0;
    dictionary = {};
    links = this.getLinks();
    _var0 = links;
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      link = _var0[_i];
      dictionary[link.getPeerId()] = link.getPeerState();
    }
    return dictionary;
  };

  /*<span id='method-fm.icelink.conference-getRandomizeServers'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether to randomize the server
  	 array to automatically distribute load.
  	 </div>
  
  	@function getRandomizeServers
  	@return {Boolean}
  */


  conference.prototype.getRandomizeServers = function() {
    return this._randomizeServers;
  };

  /*<span id='method-fm.icelink.conference-getSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the signal provider. A signal provider allows the conference
  	 to do its own signalling without the need for application-level interaction.
  	 </div>
  
  	@function getSignalProvider
  	@return {fm.icelink.signalProvider}
  */


  conference.prototype.getSignalProvider = function() {
    return this.__signalProvider;
  };

  /*<span id='method-fm.icelink.conference-getTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the time allowed for link establishment, in milliseconds.
  	 Defaults to 30000 (30 seconds).
  	 </div>
  
  	@function getTimeout
  	@return {Integer}
  */


  conference.prototype.getTimeout = function() {
    return this._timeout;
  };

  conference.prototype.getTimeoutTimer = function() {
    var peerId, timer, _var0, _var1;
    peerId = arguments[0];
    timer = null;
    _var0 = new fm.holder(timer);
    _var1 = fm.hashExtensions.tryGetValue(this._timeoutTimers, peerId, _var0);
    timer = _var0.getValue();
    _var1;

    return timer;
  };

  /*<span id='method-fm.icelink.conference-isLinked'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Checks if an individual link exists in the conference.
  	 </div>
  	@function isLinked
  	@param {String} peerId The peer ID.
  	@return {Boolean} true if a link to the peer exists; otherwise, false.
  */


  conference.prototype.isLinked = function() {
    var peerId, _var0;
    peerId = arguments[0];
    _var0 = this.getLink(peerId);
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.icelink.conference-link'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a link to the specified peer.
  	 </div>
  	@function link
  	@param {String} peerId The peer ID.
  	@param {fm.object} peerState Custom state to associate with the peer.
  	@return {void}
  */


  conference.prototype.link = function() {
    var peerId, peerState;
    if (arguments.length === 1) {
      peerId = arguments[0];
      this.link(peerId, null);
      return;
    }
    if (arguments.length === 2) {
      peerId = arguments[0];
      peerState = arguments[1];
      this.cacheLink(peerId, peerState, this.linkCacheLinkCallback, null);
    }
  };

  conference.prototype.linkCacheLinkCallback = function() {
    var link, state, _var0;
    link = arguments[0];
    state = arguments[1];
    _var0 = link;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return this.createAndSendOffer(link);
    }
  };

  conference.prototype.onAcceptFailure = function() {
    var e;
    e = arguments[0];
    return this.dropLink(e.getLink().getPeerId(), e.getException(), null, false, false, false);
  };

  conference.prototype.onCreateFailure = function() {
    var e;
    e = arguments[0];
    return this.dropLink(e.getLink().getPeerId(), e.getException(), null, false, false, false);
  };

  conference.prototype.onCreateSuccess = function() {
    var e;
    e = arguments[0];
    try {
      return this.raiseLinkOfferAnswer(e.getLink(), e.getOfferAnswer());
    } catch (exception) {
      return fm.log.error("Could not raise created offer/answer.", exception);
    } finally {

    }
  };

  conference.prototype.onLinkInitialize = function() {
    var action, candidate, dynamicValue, link, list, obj2, obj3, _i, _len, _var0, _var1, _var2, _var3;
    link = arguments[0];
    dynamicValue = fm.global.tryCastString(link.getDynamicValue(fm.icelink.conference._peerIdKey));
    obj2 = link.getDynamicValue(fm.icelink.conference._peerStateKey);
    action = link.getDynamicValue(fm.icelink.conference._callbackKey);
    obj3 = link.getDynamicValue(fm.icelink.conference._stateKey);
    link.setPeerId(dynamicValue);
    link.setPeerState(obj2);
    link.setConference(this);
    link.copyFrom(this);
    this.attachEvents(link);
    this._links[link.getPeerId()] = link;
    list = null;
    _var0 = new fm.holder(list);
    _var1 = fm.hashExtensions.tryGetValue(this._earlyCandidates, link.getPeerId(), _var0);
    list = _var0.getValue();
    _var1;

    _var2 = list;
    if (_var2 !== null && typeof _var2 !== 'undefined') {
      _var3 = list;
      for (_i = 0, _len = _var3.length; _i < _len; _i++) {
        candidate = _var3[_i];
        this.receiveCandidate(candidate, link.getPeerId());
      }
      fm.hashExtensions.remove(this._earlyCandidates, link.getPeerId());
    }
    return action(link, obj3);
  };

  conference.prototype.performDropLink = function() {
    var closed, e, exception, link, peerId, reason, switchingRoles, _var0;
    peerId = arguments[0];
    exception = arguments[1];
    reason = arguments[2];
    closed = arguments[3];
    switchingRoles = arguments[4];
    link = this.getLink(peerId);
    _var0 = link;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return false;
    }
    fm.hashExtensions.remove(this._links, peerId);
    this.detachEvents(link);
    if (!closed) {
      link.close(new fm.icelink.closeArgs(reason));
    }
    e = new fm.icelink.linkDownArgs();
    e.setLink(link);
    e.setException(exception);
    e.setReason(reason);
    e.setIsSwitchingRoles(switchingRoles);
    this.raiseLinkDown(e);
    return true;
  };

  conference.prototype.processOnLinkCandidate = function() {
    var e;
    e = arguments[0];
    try {
      return this.raiseLinkCandidate(e);
    } catch (exception) {
      return fm.log.error("Could not raise link candidate.", exception);
    } finally {

    }
  };

  conference.prototype.processOnLinkDown = function() {
    var e;
    e = arguments[0];
    return this.dropLink(e.getLink().getPeerId(), e.getException(), e.getReason(), false, true, false);
  };

  conference.prototype.processOnLinkReceiveRTCP = function() {
    var e;
    e = arguments[0];
    try {
      return this.raiseLinkReceiveRTCP(e);
    } catch (exception) {
      return fm.log.error("Could not raise link-received RTCP packets.", exception);
    } finally {

    }
  };

  conference.prototype.processOnLinkReceiveRTP = function() {
    var e;
    e = arguments[0];
    try {
      return this.raiseLinkReceiveRTP(e);
    } catch (exception) {
      return fm.log.error("Could not raise link-received RTP packets.", exception);
    } finally {

    }
  };

  conference.prototype.processOnLinkUp = function() {
    var e, timeoutTimer, _var0;
    e = arguments[0];
    timeoutTimer = this.getTimeoutTimer(e.getLink().getPeerId());
    _var0 = timeoutTimer;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.removeTimeoutTimer(e.getLink().getPeerId());
      if (timeoutTimer.stop()) {
        return this.raiseLinkUp(e);
      } else {
        return e.getLink().close();
      }
    }
  };

  conference.prototype.processReceivedCandidate = function() {
    var e;
    e = arguments[0];
    return this.receiveCandidate(e.getCandidate(), e.getPeerId());
  };

  conference.prototype.processReceivedOfferAnswer = function() {
    var e;
    e = arguments[0];
    return this.receiveOfferAnswer(e.getOfferAnswer(), e.getPeerId(), e.getPeerState());
  };

  conference.prototype.raiseLinkCandidate = function() {
    var e, exception, onLinkCandidate, sendCandidateArgs, _var0, _var1;
    e = arguments[0];
    _var0 = this.getSignalProvider();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        sendCandidateArgs = new fm.icelink.sendCandidateArgs();
        sendCandidateArgs.setCandidate(e.getCandidate());
        sendCandidateArgs.setPeerId(e.getLink().getPeerId());
        sendCandidateArgs.setPeerState(e.getLink().getPeerState());
        this.getSignalProvider().sendCandidate(sendCandidateArgs);
      } catch (exception1) {
        exception = exception1;
        if (!this.raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, "SignalProvider -> SendOfferAnswer");
        }
      } finally {

      }
    }
    e.setConference(this);
    e.setDynamicProperties(this.getDynamicProperties());
    onLinkCandidate = this._onLinkCandidate;
    _var1 = onLinkCandidate;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      try {
        return onLinkCandidate(e);
      } catch (exception2) {
        exception = exception2;
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Conference -> OnLinkCandidate");
        }
      } finally {

      }
    }
  };

  conference.prototype.raiseLinkDown = function() {
    var e, onLinkDown, _var0;
    e = arguments[0];
    e.setConference(this);
    e.setDynamicProperties(this.getDynamicProperties());
    onLinkDown = this._onLinkDown;
    _var0 = onLinkDown;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onLinkDown(e);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Conference -> OnLinkDown");
        }
      } finally {

      }
    }
  };

  conference.prototype.raiseLinkInit = function() {
    var e, onLinkInit, _var0;
    e = arguments[0];
    e.setConference(this);
    e.setDynamicProperties(this.getDynamicProperties());
    onLinkInit = this._onLinkInit;
    _var0 = onLinkInit;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onLinkInit(e);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Conference -> OnLinkInit");
        }
      } finally {

      }
    }
  };

  conference.prototype.raiseLinkOfferAnswer = function() {
    var exception, link, offerAnswer, onLinkOfferAnswer, p, sendOfferAnswerArgs, _var0, _var1;
    link = arguments[0];
    offerAnswer = arguments[1];
    _var0 = this.getSignalProvider();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        sendOfferAnswerArgs = new fm.icelink.sendOfferAnswerArgs();
        sendOfferAnswerArgs.setOfferAnswer(offerAnswer);
        sendOfferAnswerArgs.setPeerId(link.getPeerId());
        sendOfferAnswerArgs.setPeerState(link.getPeerState());
        this.getSignalProvider().sendOfferAnswer(sendOfferAnswerArgs);
      } catch (exception1) {
        exception = exception1;
        if (!this.raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, "SignalProvider -> SendOfferAnswer");
        }
      } finally {

      }
    }
    onLinkOfferAnswer = this._onLinkOfferAnswer;
    _var1 = onLinkOfferAnswer;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      try {
        p = new fm.icelink.linkOfferAnswerArgs();
        p.setConference(this);
        p.setLink(link);
        p.setOfferAnswer(offerAnswer);
        p.setDynamicProperties(this.getDynamicProperties());
        return onLinkOfferAnswer(p);
      } catch (exception2) {
        exception = exception2;
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Conference -> OnLinkOfferAnswer");
        }
      } finally {

      }
    }
  };

  conference.prototype.raiseLinkReceiveRTCP = function() {
    var e, onLinkReceiveRTCP, _var0;
    e = arguments[0];
    e.setConference(this);
    e.setDynamicProperties(this.getDynamicProperties());
    onLinkReceiveRTCP = this._onLinkReceiveRTCP;
    _var0 = onLinkReceiveRTCP;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onLinkReceiveRTCP(e);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Conference -> OnLinkReceiveRTCP");
        }
      } finally {

      }
    }
  };

  conference.prototype.raiseLinkReceiveRTP = function() {
    var e, onLinkReceiveRTP, _var0;
    e = arguments[0];
    e.setConference(this);
    e.setDynamicProperties(this.getDynamicProperties());
    onLinkReceiveRTP = this._onLinkReceiveRTP;
    _var0 = onLinkReceiveRTP;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onLinkReceiveRTP(e);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Conference -> OnLinkReceiveRTP");
        }
      } finally {

      }
    }
  };

  conference.prototype.raiseLinkUp = function() {
    var e, onLinkUp, _var0;
    e = arguments[0];
    e.setConference(this);
    e.setDynamicProperties(this.getDynamicProperties());
    onLinkUp = this._onLinkUp;
    _var0 = onLinkUp;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return onLinkUp(e);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Conference -> OnLinkUp");
        }
      } finally {

      }
    }
  };

  conference.prototype.raiseUnhandledException = function() {
    var args2, exception, onUnhandledException, p, _var0;
    exception = arguments[0];
    onUnhandledException = this._onUnhandledException;
    _var0 = onUnhandledException;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args2 = new fm.icelink.unhandledExceptionArgs();
      args2.setException(exception);
      p = args2;
      try {
        onUnhandledException(p);
      } catch (exception2) {
        fm.asyncException.asyncThrow(exception2, "Conference -> OnUnhandledException");
      } finally {

      }
      return p.getHandled();
    }
    return false;
  };

  /*<span id='method-fm.icelink.conference-receiveCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Receives a candidate from the specified peer.
  	 </div>
  	@function receiveCandidate
  	@param {fm.icelink.candidate} candidate The candidate.
  	@param {String} peerId The peer ID.
  	@return {void}
  */


  conference.prototype.receiveCandidate = function() {
    var candidate, link, list, peerId, _var0, _var1, _var2;
    candidate = arguments[0];
    peerId = arguments[1];
    link = this.getLink(peerId);
    _var0 = link;
    if (_var0 === null || typeof _var0 === 'undefined') {
      list = null;
      _var1 = new fm.holder(list);
      _var2 = fm.hashExtensions.tryGetValue(this._earlyCandidates, peerId, _var1);
      list = _var1.getValue();
      if (!_var2) {
        list = [];
        this._earlyCandidates[peerId] = list;
      }
      fm.arrayExtensions.add(list, candidate);
      return fm.log.debug("Candidate cached for future link that does not yet exist.");
    } else {
      return link.addRemoteCandidate(candidate);
    }
  };

  /*<span id='method-fm.icelink.conference-receiveOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Receives an offer or answer from the specified peer.
  	 </div>
  	@function receiveOfferAnswer
  	@param {fm.icelink.offerAnswer} offerAnswer The offer or answer.
  	@param {String} peerId The peer ID.
  	@param {fm.object} peerState Custom state to associate with the peer.
  	@return {void}
  */


  conference.prototype.receiveOfferAnswer = function() {
    var link, offerAnswer, peerId, peerState, _var0, _var1;
    if (arguments.length === 3) {
      offerAnswer = arguments[0];
      peerId = arguments[1];
      peerState = arguments[2];
      link = this.getLink(peerId);
      if (offerAnswer.getIsOffer()) {
        _var0 = link;
        if (_var0 !== null && typeof _var0 !== 'undefined') {
          if (link.getIsOpened()) {
            this.dropLink(peerId, new Error("Peer is offering new link."), null, false, false, false);
          } else {
            if (fm.stringExtensions.compareTo(link.getTieBreaker(), offerAnswer.getTieBreaker()) > 0) {
              return;
            }
            this.dropLink(peerId, new Error("Multiple offers detected. Switching to answering role."), null, false, false, true);
          }
        }
        this.cacheLink(peerId, peerState, this.receiveOfferAnswerCacheLinkCallback, offerAnswer);
      } else {
        _var1 = link;
        if (_var1 !== null && typeof _var1 !== 'undefined') {
          this.accept(link, offerAnswer, null);
        } else {
          fm.log.warn("Answer received, but no link exists!");
        }
      }
      return;
    }
    if (arguments.length === 2) {
      offerAnswer = arguments[0];
      peerId = arguments[1];
      this.receiveOfferAnswer(offerAnswer, peerId, null);
    }
  };

  conference.prototype.receiveOfferAnswerCacheLinkAcceptCallback = function() {
    var e;
    e = arguments[0];
    return this.createAndSendAnswer(e.getLink());
  };

  conference.prototype.receiveOfferAnswerCacheLinkCallback = function() {
    var link, offerAnswer, state, _var0;
    link = arguments[0];
    state = arguments[1];
    _var0 = link;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      offerAnswer = state;
      return this.accept(link, offerAnswer, this.receiveOfferAnswerCacheLinkAcceptCallback);
    }
  };

  /*<span id='method-fm.icelink.conference-removeOnLinkCandidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link candidate has been discovered.
  	 </div>
  
  	@function removeOnLinkCandidate
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.removeOnLinkCandidate = function() {
    var value;
    value = arguments[0];
    return this._onLinkCandidate = fm.delegate.remove(this._onLinkCandidate, value);
  };

  /*<span id='method-fm.icelink.conference-removeOnLinkDown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link is down.
  	 </div>
  
  	@function removeOnLinkDown
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.removeOnLinkDown = function() {
    var value;
    value = arguments[0];
    return this._onLinkDown = fm.delegate.remove(this._onLinkDown, value);
  };

  /*<span id='method-fm.icelink.conference-removeOnLinkInit'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link is being initialized.
  	 </div>
  
  	@function removeOnLinkInit
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.removeOnLinkInit = function() {
    var value;
    value = arguments[0];
    return this._onLinkInit = fm.delegate.remove(this._onLinkInit, value);
  };

  /*<span id='method-fm.icelink.conference-removeOnLinkOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link offer or answer has been created.
  	 </div>
  
  	@function removeOnLinkOfferAnswer
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.removeOnLinkOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._onLinkOfferAnswer = fm.delegate.remove(this._onLinkOfferAnswer, value);
  };

  /*<span id='method-fm.icelink.conference-removeOnLinkReceiveRTCP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when link RTCP packets are received.
  	 </div>
  
  	@function removeOnLinkReceiveRTCP
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.removeOnLinkReceiveRTCP = function() {
    var value;
    value = arguments[0];
    return this._onLinkReceiveRTCP = fm.delegate.remove(this._onLinkReceiveRTCP, value);
  };

  /*<span id='method-fm.icelink.conference-removeOnLinkReceiveRTP'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link RTP packet is received.
  	 </div>
  
  	@function removeOnLinkReceiveRTP
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.removeOnLinkReceiveRTP = function() {
    var value;
    value = arguments[0];
    return this._onLinkReceiveRTP = fm.delegate.remove(this._onLinkReceiveRTP, value);
  };

  /*<span id='method-fm.icelink.conference-removeOnLinkUp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when a link is up.
  	 </div>
  
  	@function removeOnLinkUp
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.removeOnLinkUp = function() {
    var value;
    value = arguments[0];
    return this._onLinkUp = fm.delegate.remove(this._onLinkUp, value);
  };

  /*<span id='method-fm.icelink.conference-removeOnUnhandledException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function removeOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
  */


  conference.prototype.removeOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.remove(this._onUnhandledException, value);
  };

  conference.prototype.removeTimeoutTimer = function() {
    var peerId;
    peerId = arguments[0];
    return fm.hashExtensions.remove(this._timeoutTimers, peerId);
  };

  /*<span id='method-fm.icelink.conference-setMaxLinks'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the maximum number of links allowed on this conference. Defaults to 0 (no maximum).
  	 </div>
  
  	@function setMaxLinks
  	@param {Integer} value
  	@return {void}
  */


  conference.prototype.setMaxLinks = function() {
    var value;
    value = arguments[0];
    return this._maxLinks = value;
  };

  /*<span id='method-fm.icelink.conference-setRandomizeServers'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether to randomize the server
  	 array to automatically distribute load.
  	 </div>
  
  	@function setRandomizeServers
  	@param {Boolean} value
  	@return {void}
  */


  conference.prototype.setRandomizeServers = function() {
    var value;
    value = arguments[0];
    return this._randomizeServers = value;
  };

  /*<span id='method-fm.icelink.conference-setSignalProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the signal provider. A signal provider allows the conference
  	 to do its own signalling without the need for application-level interaction.
  	 </div>
  
  	@function setSignalProvider
  	@param {fm.icelink.signalProvider} value
  	@return {void}
  */


  conference.prototype.setSignalProvider = function() {
    var value;
    value = arguments[0];
    this.detachSignalEvents();
    this.__signalProvider = value;
    return this.attachSignalEvents();
  };

  /*<span id='method-fm.icelink.conference-setTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the time allowed for link establishment, in milliseconds.
  	 Defaults to 30000 (30 seconds).
  	 </div>
  
  	@function setTimeout
  	@param {Integer} value
  	@return {void}
  */


  conference.prototype.setTimeout = function() {
    var value;
    value = arguments[0];
    return this._timeout = value;
  };

  conference.prototype.timerTimeoutCallback = function() {
    var link, state, str;
    state = arguments[0];
    link = state;
    str = "Link timed out before a connection could be made.";
    if (!link.getReachedPeer()) {
      fm.log.warn("The peer could not be reached through signalling. Check your signalling server and client-side events.");
      str = fm.stringExtensions.format("{0} The peer could not be reached. Check your signalling server and client-side events.", str);
    } else {
      if (!link.getReachedServer()) {
        fm.log.warn("The server could not be reached during link establishment. Check your server IP address/port settings.");
        str = fm.stringExtensions.format("{0} The server could not be reached. Check your server IP address/port settings.", str);
      }
    }
    return this.dropLink(link.getPeerId(), new Error(str), null, true, false, false);
  };

  /*<span id='method-fm.icelink.conference-unlink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Destroys the link to the specified peer for the specified reason.
  	 </div>
  	@function unlink
  	@param {String} peerId The peer ID.
  	@param {String} reason The reason.
  	@return {Boolean} false if a link with the specified peer ID does not exist; otherwise, true.
  */


  conference.prototype.unlink = function() {
    var message, peerId, reason;
    if (arguments.length === 1) {
      peerId = arguments[0];
      return this.unlink(peerId, null);
      return;
    }
    if (arguments.length === 2) {
      peerId = arguments[0];
      reason = arguments[1];
      message = "Unlink invoked.";
      if (!fm.stringExtensions.isNullOrEmpty(reason)) {
        message = fm.stringExtensions.concat(message, " (", reason, ")");
      }
      return this.dropLink(peerId, new Error(message), reason, false, false, false);
    }
  };

  /*<span id='method-fm.icelink.conference-unlinkAll'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Destroys links to all connected peers for the specified reason.
  	 </div>
  	@function unlinkAll
  	@param {String} reason The reason.
  	@return {void}
  */


  conference.prototype.unlinkAll = function() {
    var list, reason, str, _i, _j, _len, _len1, _var0, _var1;
    if (arguments.length === 1) {
      reason = arguments[0];
      list = [];
      _var0 = fm.hashExtensions.getKeys(this._links);
      for (_i = 0, _len = _var0.length; _i < _len; _i++) {
        str = _var0[_i];
        fm.arrayExtensions.add(list, str);
      }
      _var1 = list;
      for (_j = 0, _len1 = _var1.length; _j < _len1; _j++) {
        str = _var1[_j];
        this.unlink(str, reason);
      }
      return;
    }
    if (arguments.length === 0) {
      this.unlinkAll(null);
    }
  };

  conference._peerIdKey = "fm.icelink.conference.peerId";

  conference._peerStateKey = "fm.icelink.conference.peerState";

  conference._callbackKey = "fm.icelink.conference.callback";

  conference._stateKey = "fm.icelink.conference.state";

  return conference;

})(fm.icelink.baseConference);


/*<span id='cls-fm.icelink.acceptArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.acceptArgs
 <div>
 Arguments for link accept invocations.
 </div>

@extends fm.dynamic
*/


fm.icelink.acceptArgs = (function(_super) {

  __extends(acceptArgs, _super);

  acceptArgs.prototype._offerAnswer = null;

  acceptArgs.prototype._onComplete = null;

  acceptArgs.prototype._onFailure = null;

  acceptArgs.prototype._onSuccess = null;

  /*<span id='method-fm.icelink.acceptArgs-fm.icelink.acceptArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.acceptArgs">fm.icelink.acceptArgs</see> class.
  	 </div>
  	@function fm.icelink.acceptArgs
  	@param {fm.icelink.offerAnswer} offerAnswer The offer/answer to accept.
  	@return {}
  */


  function acceptArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setOfferAnswer = __bind(this.setOfferAnswer, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getOfferAnswer = __bind(this.getOfferAnswer, this);

    var offerAnswer, _var0;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      acceptArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    offerAnswer = arguments[0];
    acceptArgs.__super__.constructor.call(this);
    _var0 = offerAnswer;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("offerAnswer cannot be null.");
    }
    this.setOfferAnswer(offerAnswer);
  }

  /*<span id='method-fm.icelink.acceptArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} acceptArgsJson The JSON to deserialize.
  	@return {fm.icelink.acceptArgs} The deserialized accept arguments.
  */


  acceptArgs.fromJson = function() {
    var acceptArgsJson;
    acceptArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeAcceptArgs(acceptArgsJson);
  };

  /*<span id='method-fm.icelink.acceptArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.acceptArgs} acceptArgs The accept arguments to serialize.
  	@return {String} The serialized JSON.
  */


  acceptArgs.toJson = function() {
    var acceptArgs;
    acceptArgs = arguments[0];
    return fm.icelink.serializer.serializeAcceptArgs(acceptArgs);
  };

  /*<span id='method-fm.icelink.acceptArgs-getOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the offer/answer to accept.
  	 </div>
  
  	@function getOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  acceptArgs.prototype.getOfferAnswer = function() {
    return this._offerAnswer;
  };

  /*<span id='method-fm.icelink.acceptArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when the accept operation completes.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  acceptArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.icelink.acceptArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the accept operation fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  acceptArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.icelink.acceptArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the accept operation completes successfully.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  acceptArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.icelink.acceptArgs-setOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the offer/answer to accept.
  	 </div>
  
  	@function setOfferAnswer
  	@param {fm.icelink.offerAnswer} value
  	@return {void}
  */


  acceptArgs.prototype.setOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._offerAnswer = value;
  };

  /*<span id='method-fm.icelink.acceptArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when the accept operation completes.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  acceptArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.icelink.acceptArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the accept operation fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  acceptArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.icelink.acceptArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the accept operation completes successfully.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  acceptArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.icelink.acceptArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  acceptArgs.prototype.toJson = function() {
    return fm.icelink.acceptArgs.toJson(this);
  };

  return acceptArgs;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.acceptCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.acceptCompleteArgs
 <div>
 Arguments for the accept complete event.
 </div>

@extends fm.dynamic
*/


fm.icelink.acceptCompleteArgs = (function(_super) {

  __extends(acceptCompleteArgs, _super);

  acceptCompleteArgs.prototype._link = null;

  acceptCompleteArgs.prototype._offerAnswer = null;

  function acceptCompleteArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setOfferAnswer = __bind(this.setOfferAnswer, this);

    this.setLink = __bind(this.setLink, this);

    this.getOfferAnswer = __bind(this.getOfferAnswer, this);

    this.getLink = __bind(this.getLink, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      acceptCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    acceptCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.acceptCompleteArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} acceptCompleteArgsJson The JSON to deserialize.
  	@return {fm.icelink.acceptCompleteArgs} The deserialized accept complete arguments.
  */


  acceptCompleteArgs.fromJson = function() {
    var acceptCompleteArgsJson;
    acceptCompleteArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeAcceptCompleteArgs(acceptCompleteArgsJson);
  };

  /*<span id='method-fm.icelink.acceptCompleteArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.acceptCompleteArgs} acceptCompleteArgs The accept complete arguments to serialize.
  	@return {String} The serialized JSON.
  */


  acceptCompleteArgs.toJson = function() {
    var acceptCompleteArgs;
    acceptCompleteArgs = arguments[0];
    return fm.icelink.serializer.serializeAcceptCompleteArgs(acceptCompleteArgs);
  };

  /*<span id='method-fm.icelink.acceptCompleteArgs-getLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active link.
  	 </div>
  
  	@function getLink
  	@return {fm.icelink.link}
  */


  acceptCompleteArgs.prototype.getLink = function() {
    return this._link;
  };

  /*<span id='method-fm.icelink.acceptCompleteArgs-getOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original offer/answer to accept.
  	 </div>
  
  	@function getOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  acceptCompleteArgs.prototype.getOfferAnswer = function() {
    return this._offerAnswer;
  };

  acceptCompleteArgs.prototype.setLink = function() {
    var value;
    value = arguments[0];
    return this._link = value;
  };

  acceptCompleteArgs.prototype.setOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._offerAnswer = value;
  };

  /*<span id='method-fm.icelink.acceptCompleteArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  acceptCompleteArgs.prototype.toJson = function() {
    return fm.icelink.acceptCompleteArgs.toJson(this);
  };

  return acceptCompleteArgs;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.acceptFailureArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.acceptFailureArgs
 <div>
 Arguments for the accept failure event.
 </div>

@extends fm.dynamic
*/


fm.icelink.acceptFailureArgs = (function(_super) {

  __extends(acceptFailureArgs, _super);

  acceptFailureArgs.prototype._exception = null;

  acceptFailureArgs.prototype._link = null;

  acceptFailureArgs.prototype._offerAnswer = null;

  function acceptFailureArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setOfferAnswer = __bind(this.setOfferAnswer, this);

    this.setLink = __bind(this.setLink, this);

    this.setException = __bind(this.setException, this);

    this.getOfferAnswer = __bind(this.getOfferAnswer, this);

    this.getLink = __bind(this.getLink, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      acceptFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    acceptFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.acceptFailureArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} acceptFailureArgsJson The JSON to deserialize.
  	@return {fm.icelink.acceptFailureArgs} The deserialized accept failure arguments.
  */


  acceptFailureArgs.fromJson = function() {
    var acceptFailureArgsJson;
    acceptFailureArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeAcceptFailureArgs(acceptFailureArgsJson);
  };

  /*<span id='method-fm.icelink.acceptFailureArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.acceptFailureArgs} acceptFailureArgs The accept failure arguments to serialize.
  	@return {String} The serialized JSON.
  */


  acceptFailureArgs.toJson = function() {
    var acceptFailureArgs;
    acceptFailureArgs = arguments[0];
    return fm.icelink.serializer.serializeAcceptFailureArgs(acceptFailureArgs);
  };

  /*<span id='method-fm.icelink.acceptFailureArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception that occurred.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  acceptFailureArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.icelink.acceptFailureArgs-getLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active link.
  	 </div>
  
  	@function getLink
  	@return {fm.icelink.link}
  */


  acceptFailureArgs.prototype.getLink = function() {
    return this._link;
  };

  /*<span id='method-fm.icelink.acceptFailureArgs-getOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original offer/answer to accept.
  	 </div>
  
  	@function getOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  acceptFailureArgs.prototype.getOfferAnswer = function() {
    return this._offerAnswer;
  };

  acceptFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  acceptFailureArgs.prototype.setLink = function() {
    var value;
    value = arguments[0];
    return this._link = value;
  };

  acceptFailureArgs.prototype.setOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._offerAnswer = value;
  };

  /*<span id='method-fm.icelink.acceptFailureArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  acceptFailureArgs.prototype.toJson = function() {
    return fm.icelink.acceptFailureArgs.toJson(this);
  };

  return acceptFailureArgs;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.acceptSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.acceptSuccessArgs
 <div>
 Arguments for the accept success event.
 </div>

@extends fm.dynamic
*/


fm.icelink.acceptSuccessArgs = (function(_super) {

  __extends(acceptSuccessArgs, _super);

  acceptSuccessArgs.prototype._link = null;

  acceptSuccessArgs.prototype._offerAnswer = null;

  function acceptSuccessArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setOfferAnswer = __bind(this.setOfferAnswer, this);

    this.setLink = __bind(this.setLink, this);

    this.getOfferAnswer = __bind(this.getOfferAnswer, this);

    this.getLink = __bind(this.getLink, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      acceptSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    acceptSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.acceptSuccessArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} acceptSuccessArgsJson The JSON to deserialize.
  	@return {fm.icelink.acceptSuccessArgs} The deserialized accept success arguments.
  */


  acceptSuccessArgs.fromJson = function() {
    var acceptSuccessArgsJson;
    acceptSuccessArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeAcceptSuccessArgs(acceptSuccessArgsJson);
  };

  /*<span id='method-fm.icelink.acceptSuccessArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.acceptSuccessArgs} acceptSuccessArgs The accept success arguments to serialize.
  	@return {String} The serialized JSON.
  */


  acceptSuccessArgs.toJson = function() {
    var acceptSuccessArgs;
    acceptSuccessArgs = arguments[0];
    return fm.icelink.serializer.serializeAcceptSuccessArgs(acceptSuccessArgs);
  };

  /*<span id='method-fm.icelink.acceptSuccessArgs-getLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active link.
  	 </div>
  
  	@function getLink
  	@return {fm.icelink.link}
  */


  acceptSuccessArgs.prototype.getLink = function() {
    return this._link;
  };

  /*<span id='method-fm.icelink.acceptSuccessArgs-getOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original offer/answer to accept.
  	 </div>
  
  	@function getOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  acceptSuccessArgs.prototype.getOfferAnswer = function() {
    return this._offerAnswer;
  };

  acceptSuccessArgs.prototype.setLink = function() {
    var value;
    value = arguments[0];
    return this._link = value;
  };

  acceptSuccessArgs.prototype.setOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._offerAnswer = value;
  };

  /*<span id='method-fm.icelink.acceptSuccessArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  acceptSuccessArgs.prototype.toJson = function() {
    return fm.icelink.acceptSuccessArgs.toJson(this);
  };

  return acceptSuccessArgs;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.createCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.createCompleteArgs
 <div>
 Arguments for the create complete event.
 </div>

@extends fm.dynamic
*/


fm.icelink.createCompleteArgs = (function(_super) {

  __extends(createCompleteArgs, _super);

  createCompleteArgs.prototype._link = null;

  function createCompleteArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setLink = __bind(this.setLink, this);

    this.getLink = __bind(this.getLink, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      createCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    createCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.createCompleteArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} createCompleteArgsJson The JSON to deserialize.
  	@return {fm.icelink.createCompleteArgs} The deserialized create complete arguments.
  */


  createCompleteArgs.fromJson = function() {
    var createCompleteArgsJson;
    createCompleteArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeCreateCompleteArgs(createCompleteArgsJson);
  };

  /*<span id='method-fm.icelink.createCompleteArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.createCompleteArgs} createCompleteArgs The create complete arguments to serialize.
  	@return {String} The serialized JSON.
  */


  createCompleteArgs.toJson = function() {
    var createCompleteArgs;
    createCompleteArgs = arguments[0];
    return fm.icelink.serializer.serializeCreateCompleteArgs(createCompleteArgs);
  };

  /*<span id='method-fm.icelink.createCompleteArgs-getLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active link.
  	 </div>
  
  	@function getLink
  	@return {fm.icelink.link}
  */


  createCompleteArgs.prototype.getLink = function() {
    return this._link;
  };

  createCompleteArgs.prototype.setLink = function() {
    var value;
    value = arguments[0];
    return this._link = value;
  };

  /*<span id='method-fm.icelink.createCompleteArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  createCompleteArgs.prototype.toJson = function() {
    return fm.icelink.createCompleteArgs.toJson(this);
  };

  return createCompleteArgs;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.createFailureArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.createFailureArgs
 <div>
 Arguments for the create failure event.
 </div>

@extends fm.dynamic
*/


fm.icelink.createFailureArgs = (function(_super) {

  __extends(createFailureArgs, _super);

  createFailureArgs.prototype._exception = null;

  createFailureArgs.prototype._link = null;

  function createFailureArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setLink = __bind(this.setLink, this);

    this.setException = __bind(this.setException, this);

    this.getLink = __bind(this.getLink, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      createFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    createFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.createFailureArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} createFailureArgsJson The JSON to deserialize.
  	@return {fm.icelink.createFailureArgs} The deserialized create failure arguments.
  */


  createFailureArgs.fromJson = function() {
    var createFailureArgsJson;
    createFailureArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeCreateFailureArgs(createFailureArgsJson);
  };

  /*<span id='method-fm.icelink.createFailureArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.createFailureArgs} createFailureArgs The create failure arguments to serialize.
  	@return {String} The serialized JSON.
  */


  createFailureArgs.toJson = function() {
    var createFailureArgs;
    createFailureArgs = arguments[0];
    return fm.icelink.serializer.serializeCreateFailureArgs(createFailureArgs);
  };

  /*<span id='method-fm.icelink.createFailureArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception that occurred.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  createFailureArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.icelink.createFailureArgs-getLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active link.
  	 </div>
  
  	@function getLink
  	@return {fm.icelink.link}
  */


  createFailureArgs.prototype.getLink = function() {
    return this._link;
  };

  createFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  createFailureArgs.prototype.setLink = function() {
    var value;
    value = arguments[0];
    return this._link = value;
  };

  /*<span id='method-fm.icelink.createFailureArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  createFailureArgs.prototype.toJson = function() {
    return fm.icelink.createFailureArgs.toJson(this);
  };

  return createFailureArgs;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.createSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.createSuccessArgs
 <div>
 Arguments for the create success event.
 </div>

@extends fm.dynamic
*/


fm.icelink.createSuccessArgs = (function(_super) {

  __extends(createSuccessArgs, _super);

  createSuccessArgs.prototype._link = null;

  createSuccessArgs.prototype._offerAnswer = null;

  function createSuccessArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setOfferAnswer = __bind(this.setOfferAnswer, this);

    this.setLink = __bind(this.setLink, this);

    this.getOfferAnswer = __bind(this.getOfferAnswer, this);

    this.getLink = __bind(this.getLink, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      createSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    createSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.createSuccessArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} createSuccessArgsJson The JSON to deserialize.
  	@return {fm.icelink.createSuccessArgs} The deserialized create success arguments.
  */


  createSuccessArgs.fromJson = function() {
    var createSuccessArgsJson;
    createSuccessArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeCreateSuccessArgs(createSuccessArgsJson);
  };

  /*<span id='method-fm.icelink.createSuccessArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.createSuccessArgs} createSuccessArgs The create success arguments to serialize.
  	@return {String} The serialized JSON.
  */


  createSuccessArgs.toJson = function() {
    var createSuccessArgs;
    createSuccessArgs = arguments[0];
    return fm.icelink.serializer.serializeCreateSuccessArgs(createSuccessArgs);
  };

  /*<span id='method-fm.icelink.createSuccessArgs-getLink'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active link.
  	 </div>
  
  	@function getLink
  	@return {fm.icelink.link}
  */


  createSuccessArgs.prototype.getLink = function() {
    return this._link;
  };

  /*<span id='method-fm.icelink.createSuccessArgs-getOfferAnswer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the generated offer/answer. Must be sent using a third-party signalling
  	 mechanism to the relevant peer.
  	 </div>
  
  	@function getOfferAnswer
  	@return {fm.icelink.offerAnswer}
  */


  createSuccessArgs.prototype.getOfferAnswer = function() {
    return this._offerAnswer;
  };

  createSuccessArgs.prototype.setLink = function() {
    var value;
    value = arguments[0];
    return this._link = value;
  };

  createSuccessArgs.prototype.setOfferAnswer = function() {
    var value;
    value = arguments[0];
    return this._offerAnswer = value;
  };

  /*<span id='method-fm.icelink.createSuccessArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  createSuccessArgs.prototype.toJson = function() {
    return fm.icelink.createSuccessArgs.toJson(this);
  };

  return createSuccessArgs;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.candidate'>&nbsp;</span>
*/

/**
@class fm.icelink.candidate
 <div>
 Information about a discovered candidate.
 </div>

@extends fm.object
*/


fm.icelink.candidate = (function(_super) {

  __extends(candidate, _super);

  candidate.prototype._sdpCandidateAttribute = null;

  candidate.prototype._sdpMediaIndex = null;

  function candidate() {
    this.toJson = __bind(this.toJson, this);

    this.setSdpMediaIndex = __bind(this.setSdpMediaIndex, this);

    this.setSdpCandidateAttribute = __bind(this.setSdpCandidateAttribute, this);

    this.getType = __bind(this.getType, this);

    this.getSdpMediaIndex = __bind(this.getSdpMediaIndex, this);

    this.getSdpCandidateAttribute = __bind(this.getSdpCandidateAttribute, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      candidate.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    candidate.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.candidate-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} candidateJson The JSON to deserialize.
  	@return {fm.icelink.candidate} The deserialized candidate.
  */


  candidate.fromJson = function() {
    var candidateJson;
    candidateJson = arguments[0];
    return fm.icelink.serializer.deserializeCandidate(candidateJson);
  };

  /*<span id='method-fm.icelink.candidate-fromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an array of instances from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} candidatesJson The JSON to deserialize.
  	@return {fm.array} The deserialized candidates.
  */


  candidate.fromJsonMultiple = function() {
    var candidatesJson;
    candidatesJson = arguments[0];
    return fm.icelink.serializer.deserializeCandidateArray(candidatesJson);
  };

  /*<span id='method-fm.icelink.candidate-modeFromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a candidate mode from JSON.
  	 </div>
  	@function modeFromJson
  	@param {String} candidateModeJson The JSON to deserialize.
  	@return {fm.icelink.candidateMode} The deserialized candidate mode.
  */


  candidate.modeFromJson = function() {
    var candidateModeJson;
    candidateModeJson = arguments[0];
    return fm.icelink.serializer.deserializeCandidateMode(candidateModeJson);
  };

  /*<span id='method-fm.icelink.candidate-modesFromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an array of candidate modes from JSON.
  	 </div>
  	@function modesFromJsonMultiple
  	@param {String} candidateModesJson The JSON to deserialize.
  	@return {fm.array} The deserialized candidate modes.
  */


  candidate.modesFromJsonMultiple = function() {
    var candidateModesJson;
    candidateModesJson = arguments[0];
    return fm.icelink.serializer.deserializeCandidateModeArray(candidateModesJson);
  };

  /*<span id='method-fm.icelink.candidate-modesToJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an array of candidate modes to JSON.
  	 </div>
  	@function modesToJsonMultiple
  	@param {fm.array} candidateModes The candidate modes to serialize.
  	@return {String} The serialized JSON.
  */


  candidate.modesToJsonMultiple = function() {
    var candidateModes;
    candidateModes = arguments[0];
    return fm.icelink.serializer.serializeCandidateModeArray(candidateModes);
  };

  /*<span id='method-fm.icelink.candidate-modeToJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a candidate mode to JSON.
  	 </div>
  	@function modeToJson
  	@param {fm.icelink.candidateMode} candidateMode The candidate mode to serialize.
  	@return {String} The serialized JSON.
  */


  candidate.modeToJson = function() {
    var candidateMode;
    candidateMode = arguments[0];
    return fm.icelink.serializer.serializeCandidateMode(candidateMode);
  };

  /*<span id='method-fm.icelink.candidate-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.candidate} candidate The candidate to serialize.
  	@return {String} The serialized JSON.
  */


  candidate.toJson = function() {
    var candidate;
    candidate = arguments[0];
    return fm.icelink.serializer.serializeCandidate(candidate);
  };

  /*<span id='method-fm.icelink.candidate-toJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an array of instances to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} candidates The candidates to serialize.
  	@return {String} The serialized JSON.
  */


  candidate.toJsonMultiple = function() {
    var candidates;
    candidates = arguments[0];
    return fm.icelink.serializer.serializeCandidateArray(candidates);
  };

  /*<span id='method-fm.icelink.candidate-typeFromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a candidate type from JSON.
  	 </div>
  	@function typeFromJson
  	@param {String} candidateTypeJson The JSON to deserialize.
  	@return {fm.icelink.candidateType} The deserialized candidate type.
  */


  candidate.typeFromJson = function() {
    var candidateTypeJson;
    candidateTypeJson = arguments[0];
    return fm.icelink.serializer.deserializeCandidateType(candidateTypeJson);
  };

  /*<span id='method-fm.icelink.candidate-typesFromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an array of candidate types from JSON.
  	 </div>
  	@function typesFromJsonMultiple
  	@param {String} candidateTypesJson The JSON to deserialize.
  	@return {fm.array} The deserialized candidate types.
  */


  candidate.typesFromJsonMultiple = function() {
    var candidateTypesJson;
    candidateTypesJson = arguments[0];
    return fm.icelink.serializer.deserializeCandidateTypeArray(candidateTypesJson);
  };

  /*<span id='method-fm.icelink.candidate-typesToJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an array of candidate types to JSON.
  	 </div>
  	@function typesToJsonMultiple
  	@param {fm.array} candidateTypes The candidate types to serialize.
  	@return {String} The serialized JSON.
  */


  candidate.typesToJsonMultiple = function() {
    var candidateTypes;
    candidateTypes = arguments[0];
    return fm.icelink.serializer.serializeCandidateTypeArray(candidateTypes);
  };

  /*<span id='method-fm.icelink.candidate-typeToJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a candidate type to JSON.
  	 </div>
  	@function typeToJson
  	@param {fm.icelink.candidateType} candidateType The candidate type to serialize.
  	@return {String} The serialized JSON.
  */


  candidate.typeToJson = function() {
    var candidateType;
    candidateType = arguments[0];
    return fm.icelink.serializer.serializeCandidateType(candidateType);
  };

  /*<span id='method-fm.icelink.candidate-getSdpCandidateAttribute'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the SDP attribute describing the discovered candidate.
  	 </div>
  
  	@function getSdpCandidateAttribute
  	@return {String}
  */


  candidate.prototype.getSdpCandidateAttribute = function() {
    return this._sdpCandidateAttribute;
  };

  /*<span id='method-fm.icelink.candidate-getSdpMediaIndex'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the index of the media stream for which this candidate is valid.
  	 </div>
  
  	@function getSdpMediaIndex
  	@return {fm.nullable}
  */


  candidate.prototype.getSdpMediaIndex = function() {
    return this._sdpMediaIndex;
  };

  /*<span id='method-fm.icelink.candidate-getType'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the candidate type.
  	 </div>
  
  	@function getType
  	@return {fm.icelink.candidateType}
  */


  candidate.prototype.getType = function() {
    var sdpCandidateAttribute, _var0;
    sdpCandidateAttribute = this.getSdpCandidateAttribute();
    _var0 = sdpCandidateAttribute;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (fm.stringExtensions.indexOf(sdpCandidateAttribute, "typ host") >= 0) {
        return fm.icelink.candidateType.Private;
      }
      if ((fm.stringExtensions.indexOf(sdpCandidateAttribute, "typ srflx") >= 0) || (fm.stringExtensions.indexOf(sdpCandidateAttribute, "typ prflx") >= 0)) {
        return fm.icelink.candidateType.Public;
      }
      if (fm.stringExtensions.indexOf(sdpCandidateAttribute, "typ relay") >= 0) {
        return fm.icelink.candidateType.Relay;
      }
    }
    return fm.icelink.candidateType.Private;
  };

  /*<span id='method-fm.icelink.candidate-setSdpCandidateAttribute'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the SDP attribute describing the discovered candidate.
  	 </div>
  
  	@function setSdpCandidateAttribute
  	@param {String} value
  	@return {void}
  */


  candidate.prototype.setSdpCandidateAttribute = function() {
    var value;
    value = arguments[0];
    return this._sdpCandidateAttribute = value;
  };

  /*<span id='method-fm.icelink.candidate-setSdpMediaIndex'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the index of the media stream for which this candidate is valid.
  	 </div>
  
  	@function setSdpMediaIndex
  	@param {fm.nullable} value
  	@return {void}
  */


  candidate.prototype.setSdpMediaIndex = function() {
    var value;
    value = arguments[0];
    return this._sdpMediaIndex = value;
  };

  /*<span id='method-fm.icelink.candidate-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  candidate.prototype.toJson = function() {
    return fm.icelink.candidate.toJson(this);
  };

  return candidate;

}).call(this, fm.object);


/*<span id='cls-fm.icelink.offerAnswer'>&nbsp;</span>
*/

/**
@class fm.icelink.offerAnswer
 <div>
 An offer/answer for distribution to a peer client.
 </div>

@extends fm.object
*/


fm.icelink.offerAnswer = (function(_super) {

  __extends(offerAnswer, _super);

  offerAnswer.prototype._isOffer = false;

  offerAnswer.prototype._sdpMessage = null;

  offerAnswer.prototype._tieBreaker = null;

  function offerAnswer() {
    this.toJson = __bind(this.toJson, this);

    this.setTieBreaker = __bind(this.setTieBreaker, this);

    this.setSdpMessage = __bind(this.setSdpMessage, this);

    this.setIsOffer = __bind(this.setIsOffer, this);

    this.getTieBreaker = __bind(this.getTieBreaker, this);

    this.getSdpMessage = __bind(this.getSdpMessage, this);

    this.getIsOffer = __bind(this.getIsOffer, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      offerAnswer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    offerAnswer.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.offerAnswer-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} offerAnswerJson The JSON to deserialize.
  	@return {fm.icelink.offerAnswer} The deserialized offer/answer.
  */


  offerAnswer.fromJson = function() {
    var offerAnswerJson;
    offerAnswerJson = arguments[0];
    return fm.icelink.serializer.deserializeOfferAnswer(offerAnswerJson);
  };

  /*<span id='method-fm.icelink.offerAnswer-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.offerAnswer} offerAnswer The offer/answer to serialize.
  	@return {String} The serialized JSON.
  */


  offerAnswer.toJson = function() {
    var offerAnswer;
    offerAnswer = arguments[0];
    return fm.icelink.serializer.serializeOfferAnswer(offerAnswer);
  };

  /*<span id='method-fm.icelink.offerAnswer-getIsOffer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether this is an offer.
  	 </div>
  
  	@function getIsOffer
  	@return {Boolean}
  */


  offerAnswer.prototype.getIsOffer = function() {
    return this._isOffer;
  };

  /*<span id='method-fm.icelink.offerAnswer-getSdpMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the SDP message describing the session.
  	 </div>
  
  	@function getSdpMessage
  	@return {String}
  */


  offerAnswer.prototype.getSdpMessage = function() {
    return this._sdpMessage;
  };

  /*<span id='method-fm.icelink.offerAnswer-getTieBreaker'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tie breaker in case of a role conflict.
  	 </div>
  
  	@function getTieBreaker
  	@return {String}
  */


  offerAnswer.prototype.getTieBreaker = function() {
    return this._tieBreaker;
  };

  /*<span id='method-fm.icelink.offerAnswer-setIsOffer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether this is an offer.
  	 </div>
  
  	@function setIsOffer
  	@param {Boolean} value
  	@return {void}
  */


  offerAnswer.prototype.setIsOffer = function() {
    var value;
    value = arguments[0];
    return this._isOffer = value;
  };

  /*<span id='method-fm.icelink.offerAnswer-setSdpMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the SDP message describing the session.
  	 </div>
  
  	@function setSdpMessage
  	@param {String} value
  	@return {void}
  */


  offerAnswer.prototype.setSdpMessage = function() {
    var value;
    value = arguments[0];
    return this._sdpMessage = value;
  };

  /*<span id='method-fm.icelink.offerAnswer-setTieBreaker'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the tie breaker in case of a role conflict.
  	 </div>
  
  	@function setTieBreaker
  	@param {String} value
  	@return {void}
  */


  offerAnswer.prototype.setTieBreaker = function() {
    var value;
    value = arguments[0];
    return this._tieBreaker = value;
  };

  /*<span id='method-fm.icelink.offerAnswer-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  offerAnswer.prototype.toJson = function() {
    return fm.icelink.offerAnswer.toJson(this);
  };

  return offerAnswer;

}).call(this, fm.object);




fm.icelink.serializer = (function(_super) {

  __extends(serializer, _super);

  function serializer() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serializer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serializer.__super__.constructor.call(this);
  }

  serializer.acceptAcceptArgs = function() {
    return new fm.icelink.acceptArgs(new fm.icelink.offerAnswer());
  };

  serializer.acceptAcceptCompleteArgs = function() {
    return new fm.icelink.acceptCompleteArgs();
  };

  serializer.acceptAcceptFailureArgs = function() {
    return new fm.icelink.acceptFailureArgs();
  };

  serializer.acceptAcceptSuccessArgs = function() {
    return new fm.icelink.acceptSuccessArgs();
  };

  serializer.closeCloseArgs = function() {
    return new fm.icelink.closeArgs();
  };

  serializer.closeCloseCompleteArgs = function() {
    return new fm.icelink.closeCompleteArgs();
  };

  serializer.createCandidate = function() {
    return new fm.icelink.candidate();
  };

  serializer.createCompleteCreateCompleteArgs = function() {
    return new fm.icelink.createCompleteArgs();
  };

  serializer.createCreateArgs = function() {
    return new fm.icelink.createArgs();
  };

  serializer.createCreateFailureArgs = function() {
    return new fm.icelink.createFailureArgs();
  };

  serializer.createCreateSuccessArgs = function() {
    return new fm.icelink.createSuccessArgs();
  };

  serializer.createLinkCandidateArgs = function() {
    return new fm.icelink.linkCandidateArgs();
  };

  serializer.createLinkDownArgs = function() {
    return new fm.icelink.linkDownArgs();
  };

  serializer.createLinkInitArgs = function() {
    return new fm.icelink.linkInitArgs();
  };

  serializer.createLinkOfferAnswerArgs = function() {
    return new fm.icelink.linkOfferAnswerArgs();
  };

  serializer.createLinkUpArgs = function() {
    return new fm.icelink.linkUpArgs();
  };

  serializer.createOfferAnswer = function() {
    return new fm.icelink.offerAnswer();
  };

  serializer.deserializeAcceptArgs = function() {
    var acceptArgsJson;
    acceptArgsJson = arguments[0];
    return fm.serializer.deserializeObject(acceptArgsJson, serializer.acceptAcceptArgs, serializer.deserializeAcceptArgsCallback);
  };

  serializer.deserializeAcceptArgsCallback = function() {
    var acceptArgs, name, str, valueJson, _var0;
    acceptArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "offerAnswer")) {
      return acceptArgs.setOfferAnswer(fm.icelink.offerAnswer.fromJson(valueJson));
    }
  };

  serializer.deserializeAcceptCompleteArgs = function() {
    var acceptCompleteArgsJson;
    acceptCompleteArgsJson = arguments[0];
    return fm.serializer.deserializeObject(acceptCompleteArgsJson, serializer.acceptAcceptCompleteArgs, serializer.deserializeAcceptCompleteArgsCallback);
  };

  serializer.deserializeAcceptCompleteArgsCallback = function() {
    var acceptCompleteArgs, name, str, valueJson, _var0;
    acceptCompleteArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "offerAnswer")) {
      return acceptCompleteArgs.setOfferAnswer(fm.icelink.offerAnswer.fromJson(valueJson));
    }
  };

  serializer.deserializeAcceptFailureArgs = function() {
    var acceptFailureArgsJson;
    acceptFailureArgsJson = arguments[0];
    return fm.serializer.deserializeObject(acceptFailureArgsJson, serializer.acceptAcceptFailureArgs, serializer.deserializeAcceptFailureArgsCallback);
  };

  serializer.deserializeAcceptFailureArgsCallback = function() {
    var acceptFailureArgs, name, str, valueJson, _var0;
    acceptFailureArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "offerAnswer")) {
        if (str === "exceptionMessage") {
          return acceptFailureArgs.setException(new Error(fm.serializer.deserializeString(valueJson)));
        }
      } else {
        return acceptFailureArgs.setOfferAnswer(fm.icelink.offerAnswer.fromJson(valueJson));
      }
    }
  };

  serializer.deserializeAcceptSuccessArgs = function() {
    var acceptSuccessArgsJson;
    acceptSuccessArgsJson = arguments[0];
    return fm.serializer.deserializeObject(acceptSuccessArgsJson, serializer.acceptAcceptSuccessArgs, serializer.deserializeAcceptSuccessArgsCallback);
  };

  serializer.deserializeAcceptSuccessArgsCallback = function() {
    var acceptSuccessArgs, name, str, valueJson, _var0;
    acceptSuccessArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "offerAnswer")) {
      return acceptSuccessArgs.setOfferAnswer(fm.icelink.offerAnswer.fromJson(valueJson));
    }
  };

  serializer.deserializeCandidate = function() {
    var candidateJson;
    candidateJson = arguments[0];
    return fm.serializer.deserializeObject(candidateJson, serializer.createCandidate, serializer.deserializeCandidateCallback);
  };

  serializer.deserializeCandidateArray = function() {
    var candidatesJson, list, _var0;
    candidatesJson = arguments[0];
    list = fm.serializer.deserializeObjectArray(candidatesJson, serializer.createCandidate, serializer.deserializeCandidateCallback);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeCandidateCallback = function() {
    var candidate, name, str, str2, valueJson, _var0, _var1;
    candidate = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str2 = name;
    _var0 = str2;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str2 === "sdpCandidateAttribute")) {
        if (str2 === "sdpMediaIndex") {
          return candidate.setSdpMediaIndex(fm.serializer.deserializeInteger(valueJson));
        }
      } else {
        str = fm.serializer.deserializeString(valueJson);
        _var1 = str;
        if (_var1 !== null && typeof _var1 !== 'undefined') {
          if (!fm.stringExtensions.startsWith(str, "a=")) {
            str = fm.stringExtensions.concat("a=", str);
          }
          return candidate.setSdpCandidateAttribute(str);
        }
      }
    }
  };

  serializer.deserializeCandidateMode = function() {
    var candidateModeJson;
    candidateModeJson = arguments[0];
    switch (fm.serializer.deserializeString(candidateModeJson)) {
      case "early":
        return fm.icelink.candidateMode.Early;
      case "late":
        return fm.icelink.candidateMode.Late;
    }
    throw new Error("Unknown candidate mode.");
  };

  serializer.deserializeCandidateModeArray = function() {
    var candidateModesJson, i, modeArray, strArray;
    candidateModesJson = arguments[0];
    if (((fm.stringExtensions.isNullOrEmpty(candidateModesJson) || (candidateModesJson === "null")) || ((candidateModesJson.length < 2) || (candidateModesJson.charAt(0) !== '['))) || (candidateModesJson.charAt(candidateModesJson.length - 1) !== ']')) {
      return null;
    }
    candidateModesJson = fm.stringExtensions.substring(candidateModesJson, 1, candidateModesJson.length - 2);
    strArray = fm.stringExtensions.split(candidateModesJson, [',']);
    modeArray = new Array(strArray.length);
    i = 0;
    while (i < strArray.length) {
      try {
        modeArray[i] = fm.icelink.serializer.deserializeCandidateMode(strArray[i]);
      } finally {
        i++;
      }
    }
    return modeArray;
  };

  serializer.deserializeCandidateType = function() {
    var candidateTypeJson;
    candidateTypeJson = arguments[0];
    switch (fm.serializer.deserializeString(candidateTypeJson)) {
      case "private":
        return fm.icelink.candidateType.Private;
      case "public":
        return fm.icelink.candidateType.Public;
      case "relay":
        return fm.icelink.candidateType.Relay;
    }
    throw new Error("Unknown candidate type.");
  };

  serializer.deserializeCandidateTypeArray = function() {
    var candidateTypesJson, i, strArray, typeArray;
    candidateTypesJson = arguments[0];
    if (((fm.stringExtensions.isNullOrEmpty(candidateTypesJson) || (candidateTypesJson === "null")) || ((candidateTypesJson.length < 2) || (candidateTypesJson.charAt(0) !== '['))) || (candidateTypesJson.charAt(candidateTypesJson.length - 1) !== ']')) {
      return null;
    }
    candidateTypesJson = fm.stringExtensions.substring(candidateTypesJson, 1, candidateTypesJson.length - 2);
    strArray = fm.stringExtensions.split(candidateTypesJson, [',']);
    typeArray = new Array(strArray.length);
    i = 0;
    while (i < strArray.length) {
      try {
        typeArray[i] = fm.icelink.serializer.deserializeCandidateType(strArray[i]);
      } finally {
        i++;
      }
    }
    return typeArray;
  };

  serializer.deserializeCloseArgs = function() {
    var closeArgsJson;
    closeArgsJson = arguments[0];
    return fm.serializer.deserializeObject(closeArgsJson, serializer.closeCloseArgs, serializer.deserializeCloseArgsCallback);
  };

  serializer.deserializeCloseArgsCallback = function() {
    var closeArgs, name, str, valueJson, _var0;
    closeArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "reason")) {
      return closeArgs.setReason(fm.serializer.deserializeString(valueJson));
    }
  };

  serializer.deserializeCloseCompleteArgs = function() {
    var closeCompleteArgsJson;
    closeCompleteArgsJson = arguments[0];
    return fm.serializer.deserializeObject(closeCompleteArgsJson, serializer.closeCloseCompleteArgs, serializer.deserializeCloseCompleteArgsCallback);
  };

  serializer.deserializeCloseCompleteArgsCallback = function() {
    var closeCompleteArgs, name, str, valueJson, _var0;
    closeCompleteArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "reason")) {
        if (str === "exceptionMessage") {
          return closeCompleteArgs.setException(new Error(fm.serializer.deserializeString(valueJson)));
        }
      } else {
        return closeCompleteArgs.setReason(fm.serializer.deserializeString(valueJson));
      }
    }
  };

  serializer.deserializeCreateArgs = function() {
    var createArgsJson;
    createArgsJson = arguments[0];
    return fm.serializer.deserializeObject(createArgsJson, serializer.createCreateArgs, serializer.deserializeCreateArgsCallback);
  };

  serializer.deserializeCreateArgsCallback = function() {
    var createArgs, name, valueJson;
    createArgs = arguments[0];
    name = arguments[1];
    return valueJson = arguments[2];
  };

  serializer.deserializeCreateCompleteArgs = function() {
    var createCompleteArgsJson;
    createCompleteArgsJson = arguments[0];
    return fm.serializer.deserializeObject(createCompleteArgsJson, serializer.createCompleteCreateCompleteArgs, serializer.deserializeCreateCompleteArgsCallback);
  };

  serializer.deserializeCreateCompleteArgsCallback = function() {
    var createCompleteArgs, name, valueJson;
    createCompleteArgs = arguments[0];
    name = arguments[1];
    return valueJson = arguments[2];
  };

  serializer.deserializeCreateFailureArgs = function() {
    var createFailureArgsJson;
    createFailureArgsJson = arguments[0];
    return fm.serializer.deserializeObject(createFailureArgsJson, serializer.createCreateFailureArgs, serializer.deserializeCreateFailureArgsCallback);
  };

  serializer.deserializeCreateFailureArgsCallback = function() {
    var createFailureArgs, name, str, valueJson, _var0;
    createFailureArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "exceptionMessage")) {
      return createFailureArgs.setException(new Error(fm.serializer.deserializeString(valueJson)));
    }
  };

  serializer.deserializeCreateSuccessArgs = function() {
    var createSuccessArgsJson;
    createSuccessArgsJson = arguments[0];
    return fm.serializer.deserializeObject(createSuccessArgsJson, serializer.createCreateSuccessArgs, serializer.deserializeCreateSuccessArgsCallback);
  };

  serializer.deserializeCreateSuccessArgsCallback = function() {
    var createSuccessArgs, name, str, valueJson, _var0;
    createSuccessArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "offerAnswer")) {
      return createSuccessArgs.setOfferAnswer(fm.icelink.offerAnswer.fromJson(valueJson));
    }
  };

  serializer.deserializeLinkCandidateArgs = function() {
    var linkCandidateArgsJson;
    linkCandidateArgsJson = arguments[0];
    return fm.serializer.deserializeObject(linkCandidateArgsJson, serializer.createLinkCandidateArgs, serializer.deserializeLinkCandidateArgsCallback);
  };

  serializer.deserializeLinkCandidateArgsCallback = function() {
    var linkCandidateArgs, name, str, valueJson, _var0;
    linkCandidateArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "candidate")) {
      return linkCandidateArgs.setCandidate(fm.icelink.candidate.fromJson(valueJson));
    }
  };

  serializer.deserializeLinkDownArgs = function() {
    var linkDownArgsJson;
    linkDownArgsJson = arguments[0];
    return fm.serializer.deserializeObject(linkDownArgsJson, serializer.createLinkDownArgs, serializer.deserializeLinkDownArgsCallback);
  };

  serializer.deserializeLinkDownArgsCallback = function() {
    var linkDownArgs, name, nullable, str, valueJson, _var0;
    linkDownArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "exceptionMessage")) {
        if (str === "isSwitchingRoles") {
          nullable = fm.serializer.deserializeBoolean(valueJson);
          if (nullable !== null) {
            return linkDownArgs.setIsSwitchingRoles(nullable);
          }
        }
      } else {
        return linkDownArgs.setException(new Error(fm.serializer.deserializeString(valueJson)));
      }
    }
  };

  serializer.deserializeLinkInitArgs = function() {
    var linkInitArgsJson;
    linkInitArgsJson = arguments[0];
    return fm.serializer.deserializeObject(linkInitArgsJson, serializer.createLinkInitArgs, serializer.deserializeLinkInitArgsCallback);
  };

  serializer.deserializeLinkInitArgsCallback = function() {
    var linkInitArgs, name, nullable, str, valueJson, _var0;
    linkInitArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "initiator")) {
      nullable = fm.serializer.deserializeBoolean(valueJson);
      if (nullable !== null) {
        return linkInitArgs.setInitiator(nullable);
      }
    }
  };

  serializer.deserializeLinkOfferAnswerArgs = function() {
    var linkOfferAnswerArgsJson;
    linkOfferAnswerArgsJson = arguments[0];
    return fm.serializer.deserializeObject(linkOfferAnswerArgsJson, serializer.createLinkOfferAnswerArgs, serializer.deserializeLinkOfferAnswerArgsCallback);
  };

  serializer.deserializeLinkOfferAnswerArgsCallback = function() {
    var linkOfferAnswerArgs, name, str, valueJson, _var0;
    linkOfferAnswerArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "offerAnswer")) {
      return linkOfferAnswerArgs.setOfferAnswer(fm.icelink.offerAnswer.fromJson(valueJson));
    }
  };

  serializer.deserializeLinkUpArgs = function() {
    var linkUpArgsJson;
    linkUpArgsJson = arguments[0];
    return fm.serializer.deserializeObject(linkUpArgsJson, serializer.createLinkUpArgs, serializer.deserializeLinkUpArgsCallback);
  };

  serializer.deserializeLinkUpArgsCallback = function() {
    var linkUpArgs, name, valueJson;
    linkUpArgs = arguments[0];
    name = arguments[1];
    return valueJson = arguments[2];
  };

  serializer.deserializeOfferAnswer = function() {
    var offerAnswerJson;
    offerAnswerJson = arguments[0];
    return fm.serializer.deserializeObject(offerAnswerJson, serializer.createOfferAnswer, serializer.deserializeOfferAnswerCallback);
  };

  serializer.deserializeOfferAnswerCallback = function() {
    var name, offerAnswer, str, valueJson, _var0;
    offerAnswer = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "sdpMessage")) {
        if (str === "tieBreaker") {
          return offerAnswer.setTieBreaker(fm.serializer.deserializeString(valueJson));
        } else {
          if (str === "isOffer") {
            return offerAnswer.setIsOffer(fm.serializer.deserializeBoolean(valueJson) === true);
          }
        }
      } else {
        return offerAnswer.setSdpMessage(fm.serializer.deserializeString(valueJson));
      }
    }
  };

  serializer.serializeAcceptArgs = function() {
    var acceptArgs;
    acceptArgs = arguments[0];
    return fm.serializer.serializeObject(acceptArgs, serializer.serializeAcceptArgsCallback);
  };

  serializer.serializeAcceptArgsCallback = function() {
    var acceptArgs, jsonObject, _var0;
    acceptArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = acceptArgs.getOfferAnswer();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["offerAnswer"] = fm.icelink.offerAnswer.toJson(acceptArgs.getOfferAnswer());
    }
  };

  serializer.serializeAcceptCompleteArgs = function() {
    var acceptCompleteArgs;
    acceptCompleteArgs = arguments[0];
    return fm.serializer.serializeObject(acceptCompleteArgs, serializer.serializeAcceptCompleteArgsCallback);
  };

  serializer.serializeAcceptCompleteArgsCallback = function() {
    var acceptCompleteArgs, jsonObject, _var0;
    acceptCompleteArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = acceptCompleteArgs.getOfferAnswer();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["offerAnswer"] = fm.icelink.offerAnswer.toJson(acceptCompleteArgs.getOfferAnswer());
    }
  };

  serializer.serializeAcceptFailureArgs = function() {
    var acceptFailureArgs;
    acceptFailureArgs = arguments[0];
    return fm.serializer.serializeObject(acceptFailureArgs, serializer.serializeAcceptFailureArgsCallback);
  };

  serializer.serializeAcceptFailureArgsCallback = function() {
    var acceptFailureArgs, jsonObject, _var0, _var1;
    acceptFailureArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = acceptFailureArgs.getOfferAnswer();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["offerAnswer"] = fm.icelink.offerAnswer.toJson(acceptFailureArgs.getOfferAnswer());
    }
    _var1 = acceptFailureArgs.getException();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return jsonObject["exceptionMessage"] = fm.serializer.serializeString(acceptFailureArgs.getException().message);
    }
  };

  serializer.serializeAcceptSuccessArgs = function() {
    var acceptSuccessArgs;
    acceptSuccessArgs = arguments[0];
    return fm.serializer.serializeObject(acceptSuccessArgs, serializer.serializeAcceptSuccessArgsCallback);
  };

  serializer.serializeAcceptSuccessArgsCallback = function() {
    var acceptSuccessArgs, jsonObject, _var0;
    acceptSuccessArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = acceptSuccessArgs.getOfferAnswer();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["offerAnswer"] = fm.icelink.offerAnswer.toJson(acceptSuccessArgs.getOfferAnswer());
    }
  };

  serializer.serializeCandidate = function() {
    var candidate;
    candidate = arguments[0];
    return fm.serializer.serializeObject(candidate, serializer.serializeCandidateCallback);
  };

  serializer.serializeCandidateArray = function() {
    var candidates;
    candidates = arguments[0];
    return fm.serializer.serializeObjectArray(candidates, serializer.serializeCandidateCallback);
  };

  serializer.serializeCandidateCallback = function() {
    var candidate, jsonObject, sdpCandidateAttribute, _var0;
    candidate = arguments[0];
    jsonObject = arguments[1];
    sdpCandidateAttribute = candidate.getSdpCandidateAttribute();
    _var0 = sdpCandidateAttribute;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!fm.stringExtensions.startsWith(sdpCandidateAttribute, "a=")) {
        sdpCandidateAttribute = fm.stringExtensions.concat("a=", sdpCandidateAttribute);
      }
      jsonObject["sdpCandidateAttribute"] = fm.serializer.serializeString(sdpCandidateAttribute);
    }
    return jsonObject["sdpMediaIndex"] = fm.serializer.serializeInteger(candidate.getSdpMediaIndex());
  };

  serializer.serializeCandidateMode = function() {
    var candidateMode, str;
    candidateMode = arguments[0];
    str = null;
    switch (candidateMode) {
      case fm.icelink.candidateMode.Early:
        str = "early";
        break;
      case fm.icelink.candidateMode.Late:
        str = "late";
        break;
    }
    return fm.serializer.serializeString(str);
  };

  serializer.serializeCandidateModeArray = function() {
    var candidateModes, i, strArray;
    candidateModes = arguments[0];
    strArray = new Array(candidateModes.length);
    i = 0;
    while (i < candidateModes.length) {
      try {
        strArray[i] = fm.icelink.serializer.serializeCandidateMode(candidateModes[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  serializer.serializeCandidateType = function() {
    var candidateType, str;
    candidateType = arguments[0];
    str = null;
    switch (candidateType) {
      case fm.icelink.candidateType.Private:
        str = "private";
        break;
      case fm.icelink.candidateType.Public:
        str = "public";
        break;
      case fm.icelink.candidateType.Relay:
        str = "relay";
        break;
    }
    return fm.serializer.serializeString(str);
  };

  serializer.serializeCandidateTypeArray = function() {
    var candidateTypes, i, strArray;
    candidateTypes = arguments[0];
    strArray = new Array(candidateTypes.length);
    i = 0;
    while (i < candidateTypes.length) {
      try {
        strArray[i] = fm.icelink.serializer.serializeCandidateType(candidateTypes[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  serializer.serializeCloseArgs = function() {
    var closeArgs;
    closeArgs = arguments[0];
    return fm.serializer.serializeObject(closeArgs, serializer.serializeCloseArgsCallback);
  };

  serializer.serializeCloseArgsCallback = function() {
    var closeArgs, jsonObject, _var0;
    closeArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = closeArgs.getReason();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["reason"] = fm.serializer.serializeString(closeArgs.getReason());
    }
  };

  serializer.serializeCloseCompleteArgs = function() {
    var closeCompleteArgs;
    closeCompleteArgs = arguments[0];
    return fm.serializer.serializeObject(closeCompleteArgs, serializer.serializeCloseCompleteArgsCallback);
  };

  serializer.serializeCloseCompleteArgsCallback = function() {
    var closeCompleteArgs, jsonObject, _var0, _var1;
    closeCompleteArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = closeCompleteArgs.getReason();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["reason"] = fm.serializer.serializeString(closeCompleteArgs.getReason());
    }
    _var1 = closeCompleteArgs.getException();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return jsonObject["exceptionMessage"] = fm.serializer.serializeString(closeCompleteArgs.getException().message);
    }
  };

  serializer.serializeCreateArgs = function() {
    var createArgs;
    createArgs = arguments[0];
    return fm.serializer.serializeObject(createArgs, serializer.serializeCreateArgsCallback);
  };

  serializer.serializeCreateArgsCallback = function() {
    var createArgs, jsonObject;
    createArgs = arguments[0];
    return jsonObject = arguments[1];
  };

  serializer.serializeCreateCompleteArgs = function() {
    var createCompleteArgs;
    createCompleteArgs = arguments[0];
    return fm.serializer.serializeObject(createCompleteArgs, serializer.serializeCreateCompleteArgsCallback);
  };

  serializer.serializeCreateCompleteArgsCallback = function() {
    var createCompleteArgs, jsonObject;
    createCompleteArgs = arguments[0];
    return jsonObject = arguments[1];
  };

  serializer.serializeCreateFailureArgs = function() {
    var createFailureArgs;
    createFailureArgs = arguments[0];
    return fm.serializer.serializeObject(createFailureArgs, serializer.serializeCreateFailureArgsCallback);
  };

  serializer.serializeCreateFailureArgsCallback = function() {
    var createFailureArgs, jsonObject, _var0;
    createFailureArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = createFailureArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["exceptionMessage"] = fm.serializer.serializeString(createFailureArgs.getException().message);
    }
  };

  serializer.serializeCreateSuccessArgs = function() {
    var createSuccessArgs;
    createSuccessArgs = arguments[0];
    return fm.serializer.serializeObject(createSuccessArgs, serializer.serializeCreateSuccessArgsCallback);
  };

  serializer.serializeCreateSuccessArgsCallback = function() {
    var createSuccessArgs, jsonObject, _var0;
    createSuccessArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = createSuccessArgs.getOfferAnswer();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["offerAnswer"] = fm.icelink.offerAnswer.toJson(createSuccessArgs.getOfferAnswer());
    }
  };

  serializer.serializeLinkCandidateArgs = function() {
    var linkCandidateArgs;
    linkCandidateArgs = arguments[0];
    return fm.serializer.serializeObject(linkCandidateArgs, serializer.serializeLinkCandidateArgsCallback);
  };

  serializer.serializeLinkCandidateArgsCallback = function() {
    var jsonObject, linkCandidateArgs, _var0;
    linkCandidateArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = linkCandidateArgs.getCandidate();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["candidate"] = fm.icelink.candidate.toJson(linkCandidateArgs.getCandidate());
    }
  };

  serializer.serializeLinkDownArgs = function() {
    var linkDownArgs;
    linkDownArgs = arguments[0];
    return fm.serializer.serializeObject(linkDownArgs, serializer.serializeLinkDownArgsCallback);
  };

  serializer.serializeLinkDownArgsCallback = function() {
    var jsonObject, linkDownArgs, _var0;
    linkDownArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = linkDownArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["exceptionMessage"] = fm.serializer.serializeString(linkDownArgs.getException().message);
    }
    return jsonObject["isSwitchingRoles"] = fm.serializer.serializeBoolean(linkDownArgs.getIsSwitchingRoles());
  };

  serializer.serializeLinkInitArgs = function() {
    var linkInitArgs;
    linkInitArgs = arguments[0];
    return fm.serializer.serializeObject(linkInitArgs, serializer.serializeLinkInitArgsCallback);
  };

  serializer.serializeLinkInitArgsCallback = function() {
    var jsonObject, linkInitArgs;
    linkInitArgs = arguments[0];
    jsonObject = arguments[1];
    return jsonObject["initiator"] = fm.serializer.serializeBoolean(linkInitArgs.getInitiator());
  };

  serializer.serializeLinkOfferAnswerArgs = function() {
    var linkOfferAnswerArgs;
    linkOfferAnswerArgs = arguments[0];
    return fm.serializer.serializeObject(linkOfferAnswerArgs, serializer.serializeLinkOfferAnswerArgsCallback);
  };

  serializer.serializeLinkOfferAnswerArgsCallback = function() {
    var jsonObject, linkOfferAnswerArgs, _var0;
    linkOfferAnswerArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = linkOfferAnswerArgs.getOfferAnswer();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["offerAnswer"] = fm.icelink.offerAnswer.toJson(linkOfferAnswerArgs.getOfferAnswer());
    }
  };

  serializer.serializeLinkUpArgs = function() {
    var linkUpArgs;
    linkUpArgs = arguments[0];
    return fm.serializer.serializeObject(linkUpArgs, serializer.serializeLinkUpArgsCallback);
  };

  serializer.serializeLinkUpArgsCallback = function() {
    var jsonObject, linkUpArgs;
    linkUpArgs = arguments[0];
    return jsonObject = arguments[1];
  };

  serializer.serializeOfferAnswer = function() {
    var offerAnswer;
    offerAnswer = arguments[0];
    return fm.serializer.serializeObject(offerAnswer, serializer.serializeOfferAnswerCallback);
  };

  serializer.serializeOfferAnswerCallback = function() {
    var jsonObject, offerAnswer, _var0, _var1;
    offerAnswer = arguments[0];
    jsonObject = arguments[1];
    _var0 = offerAnswer.getSdpMessage();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["sdpMessage"] = fm.serializer.serializeString(offerAnswer.getSdpMessage());
    }
    _var1 = offerAnswer.getTieBreaker();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      jsonObject["tieBreaker"] = fm.serializer.serializeString(offerAnswer.getTieBreaker());
    }
    return jsonObject["isOffer"] = fm.serializer.serializeBoolean(offerAnswer.getIsOffer());
  };

  return serializer;

}).call(this, fm.object);


/*<span id='cls-fm.icelink.createArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.createArgs
 <div>
 Arguments for link create invocations.
 </div>

@extends fm.dynamic
*/


fm.icelink.createArgs = (function(_super) {

  __extends(createArgs, _super);

  createArgs.prototype._onComplete = null;

  createArgs.prototype._onFailure = null;

  createArgs.prototype._onSuccess = null;

  function createArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      createArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    createArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.createArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} createArgsJson The JSON to deserialize.
  	@return {fm.icelink.createArgs} The deserialized create arguments.
  */


  createArgs.fromJson = function() {
    var createArgsJson;
    createArgsJson = arguments[0];
    return fm.icelink.serializer.deserializeCreateArgs(createArgsJson);
  };

  /*<span id='method-fm.icelink.createArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.createArgs} createArgs The create arguments to serialize.
  	@return {String} The serialized JSON.
  */


  createArgs.toJson = function() {
    var createArgs;
    createArgs = arguments[0];
    return fm.icelink.serializer.serializeCreateArgs(createArgs);
  };

  /*<span id='method-fm.icelink.createArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when the create operation completes.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  createArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.icelink.createArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the create operation fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  createArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.icelink.createArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the create operation completes successfully.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  createArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.icelink.createArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when the create operation completes.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  createArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.icelink.createArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the create operation fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  createArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.icelink.createArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the create operation completes successfully.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  createArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.icelink.createArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  createArgs.prototype.toJson = function() {
    return fm.icelink.createArgs.toJson(this);
  };

  return createArgs;

}).call(this, fm.dynamic);




fm.icelink.googleDataPacket = (function(_super) {

  __extends(googleDataPacket, _super);

  function googleDataPacket() {
    this.getString = __bind(this.getString, this);

    this.setPayload = __bind(this.setPayload, this);

    this.getPayload = __bind(this.getPayload, this);

    this.setEndOfPartition = __bind(this.setEndOfPartition, this);

    this.getEndOfPartition = __bind(this.getEndOfPartition, this);

    this.setStartOfPartition = __bind(this.setStartOfPartition, this);

    this.getStartOfPartition = __bind(this.getStartOfPartition, this);
    return googleDataPacket.__super__.constructor.apply(this, arguments);
  }

  googleDataPacket.prototype._startOfPartition = false;

  googleDataPacket.prototype._endOfPartition = false;

  googleDataPacket.prototype._payload = null;

  googleDataPacket._maxPacketSize = 1050;

  googleDataPacket.prototype.getStartOfPartition = function() {
    return this._startOfPartition;
  };

  googleDataPacket.prototype.setStartOfPartition = function(startOfPartition) {
    return this._startOfPartition = startOfPartition;
  };

  googleDataPacket.prototype.getEndOfPartition = function() {
    return this._endOfPartition;
  };

  googleDataPacket.prototype.setEndOfPartition = function(endOfPartition) {
    return this._endOfPartition = endOfPartition;
  };

  googleDataPacket.prototype.getPayload = function() {
    return this._payload;
  };

  googleDataPacket.prototype.setPayload = function(payload) {
    return this._payload = payload;
  };

  googleDataPacket.parseString = function(s) {
    var c1, offset, packet;
    if (s.length < 1) {
      return null;
    }
    offset = 0;
    packet = new fm.icelink.googleDataPacket();
    c1 = s.substr(offset++, 1);
    if (c1 === '#') {
      packet.setStartOfPartition(true);
      packet.setEndOfPartition(true);
    } else if (c1 === '!') {
      packet.setStartOfPartition(true);
    } else if (c1 === '"') {
      packet.setEndOfPartition(true);
    }
    packet.setPayload(s.substr(offset));
    return packet;
  };

  googleDataPacket.prototype.getString = function() {
    return fm.icelink.googleDataPacket.getString(this);
  };

  googleDataPacket.getString = function(packet) {
    var eop, s, sop;
    s = '';
    sop = packet.getStartOfPartition();
    eop = packet.getEndOfPartition();
    if (sop && eop) {
      s += '#';
    } else if (sop) {
      s += '!';
    } else if (eop) {
      s += '"';
    } else {
      s += ' ';
    }
    s += packet.getPayload();
    return s;
  };

  googleDataPacket.packetize = function(s) {
    var i, maxPayloadSize, minPacketLength, offset, packet, packetCount, packetLength, packets, remainingBytes, _i, _ref;
    offset = 0;
    maxPayloadSize = googleDataPacket._maxPacketSize - 1;
    packetCount = Math.ceil(s.length / maxPayloadSize);
    if (packetCount === 0) {
      packetCount = 1;
    }
    packets = new Array(packetCount);
    minPacketLength = Math.floor(s.length / packetCount);
    remainingBytes = s.length - (packetCount * minPacketLength);
    for (i = _i = 0, _ref = packetCount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      packetLength = minPacketLength;
      if (i < remainingBytes) {
        packetLength++;
      }
      packet = new fm.icelink.googleDataPacket();
      packet.setStartOfPartition(i === 0);
      packet.setEndOfPartition(i === packetCount - 1);
      packet.setPayload(s.substr(offset, packetLength));
      packets[i] = packet;
      offset += packetLength;
    }
    return packets;
  };

  googleDataPacket.depacketize = function(packets) {
    var packet, s, _i, _len;
    s = '';
    for (_i = 0, _len = packets.length; _i < _len; _i++) {
      packet = packets[_i];
      s += packet.getPayload();
    }
    return s;
  };

  return googleDataPacket;

}).call(this, fm.object);




fm.icelink.googleDataAccumulator = (function(_super) {

  __extends(googleDataAccumulator, _super);

  googleDataAccumulator.prototype._packets = null;

  function googleDataAccumulator() {
    this.reset = __bind(this.reset, this);

    this.add = __bind(this.add, this);

    this.getPackets = __bind(this.getPackets, this);
    this._packets = [];
  }

  googleDataAccumulator.prototype.getPackets = function() {
    return this._packets.slice();
  };

  googleDataAccumulator.prototype.add = function(packet) {
    if (packet.getStartOfPartition() || this._packets.length > 0) {
      return this._packets.push(packet);
    }
  };

  googleDataAccumulator.prototype.reset = function() {
    return this._packets = [];
  };

  return googleDataAccumulator;

})(fm.object);




fm.icelink.rtpPacket = (function(_super) {

  __extends(rtpPacket, _super);

  function rtpPacket() {
    return rtpPacket.__super__.constructor.apply(this, arguments);
  }

  return rtpPacket;

})(fm.object);




fm.icelink.rtcpPacket = (function(_super) {

  __extends(rtcpPacket, _super);

  function rtcpPacket() {
    return rtcpPacket.__super__.constructor.apply(this, arguments);
  }

  return rtcpPacket;

})(fm.object);




fm.icelink.certificate = (function(_super) {

  __extends(certificate, _super);

  function certificate() {
    return certificate.__super__.constructor.apply(this, arguments);
  }

  return certificate;

})(fm.object);


/*<span id='cls-fm.icelink.stream'>&nbsp;</span>
*/

/**
@class fm.icelink.stream
 <div>
 Describes a media stream.
 </div>

@extends fm.icelink.baseStream
*/


fm.icelink.stream = (function(_super) {

  __extends(stream, _super);

  stream.prototype._localStream = null;

  stream.prototype.getLocalStream = function() {
    return this._localStream;
  };

  /*<span id='method-fm.icelink.stream-fm.icelink.stream'>&nbsp;</span>
  */


  /**
   <div>
   Initializes a new instance of the <see cref="fm.icelink.stream">fm.icelink.stream</see> class.
   </div>
  @function fm.icelink.stream
  @param {fm.icelink.streamType} type The type of the stream.
  @param {fm.array} formats The stream formats.
  @param {fm.array} encryptionModes The encryption modes.
  @return {}
  */


  function stream(type, localStream, offerDtls) {
    this.isEquivalent = __bind(this.isEquivalent, this);

    this.getLocalStream = __bind(this.getLocalStream, this);
    stream.__super__.constructor.call(this, type);
    this._localStream = localStream;
    this.setOfferDtls(offerDtls ? true : false);
  }

  stream.prototype.isEquivalent = function(stream) {
    return stream.getType() === this.getType();
  };

  return stream;

})(fm.icelink.baseStream);


/*<span id='cls-fm.icelink.link'>&nbsp;</span>
*/

/**
@class fm.icelink.link
 <div>
 A peer link over which data can be streamed.
 </div>

@extends fm.icelink.baseLink
*/


fm.icelink.link = (function(_super) {

  __extends(link, _super);

  link.prototype._connection = null;

  link.prototype._localStream = null;

  link.prototype._remoteStream = null;

  link.prototype._offerDtls = false;

  link.prototype._useDataChannels = false;

  link.prototype._dataChannels = null;

  link.prototype.getLocalStreamInternal = function() {
    return this._localStream;
  };

  link.prototype.setLocalStreamInternal = function(localStream) {
    return this._localStream = localStream;
  };

  link.prototype.getRemoteStreamInternal = function() {
    return this._remoteStream;
  };

  link.prototype.setRemoteStreamInternal = function(remoteStream) {
    return this._remoteStream = remoteStream;
  };

  function link() {
    this.closeInternal = __bind(this.closeInternal, this);

    this.sendData = __bind(this.sendData, this);

    this.addRemoteCandidateInternal = __bind(this.addRemoteCandidateInternal, this);

    this.acceptInternal = __bind(this.acceptInternal, this);

    this.createInternal = __bind(this.createInternal, this);

    this._attachFakeAudioStream = __bind(this._attachFakeAudioStream, this);

    this._attachChannelEvents = __bind(this._attachChannelEvents, this);

    this._createConnection = __bind(this._createConnection, this);

    this.initializeInternal = __bind(this.initializeInternal, this);

    this.setRemoteStreamInternal = __bind(this.setRemoteStreamInternal, this);

    this.getRemoteStreamInternal = __bind(this.getRemoteStreamInternal, this);

    this.setLocalStreamInternal = __bind(this.setLocalStreamInternal, this);

    this.getLocalStreamInternal = __bind(this.getLocalStreamInternal, this);
    link.__super__.constructor.call(this);
    this._dataChannels = {};
  }

  link.prototype.initializeInternal = function(complete) {
    var channelInfo, localStream, offerDtls, stream, streamType, useDataChannels, _i, _j, _len, _len1, _ref, _ref1;
    offerDtls = false;
    useDataChannels = false;
    _ref = this.getStreams();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      stream = _ref[_i];
      streamType = stream.getType();
      if (streamType === fm.icelink.streamType.Audio || streamType === fm.icelink.streamType.Video) {
        localStream = stream.getLocalStream();
        if (!localStream) {
          throw new Error('Stream definition is missing local stream.');
        }
        if (!this._localStream) {
          this._localStream = localStream;
        } else if (this._localStream !== localStream) {
          throw new Error('Stream definitions do not point to the same local stream.');
        }
      } else {
        useDataChannels = true;
        _ref1 = stream.getChannelInfos();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          channelInfo = _ref1[_j];
          this._dataChannels[channelInfo.getLabel()] = {
            info: channelInfo,
            accumulator: new fm.icelink.googleDataAccumulator()
          };
        }
      }
      if (stream.getOfferDtls()) {
        offerDtls = true;
      }
    }
    this._offerDtls = offerDtls;
    this._useDataChannels = useDataChannels;
    if (complete) {
      return complete(this);
    }
  };

  link.prototype._createConnection = function() {
    var channel, channelInfo, chromeVersion, dataChannel, iceServers, label, localBackingStream, optional, relayPassword, relayUsername, serverAddress, _i, _j, _len, _len1, _ref, _ref1, _ref2,
      _this = this;
    iceServers = [];
    _ref = this.getServerAddresses();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      serverAddress = _ref[_i];
      fm.log.info('Server address is ' + serverAddress + '.');
    }
    _ref1 = this.getServerAddresses();
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      serverAddress = _ref1[_j];
      iceServers.push({
        url: 'stun:' + serverAddress
      });
      relayUsername = this.getRelayUsername();
      relayPassword = this.getRelayPassword();
      if (relayUsername !== null && relayPassword !== null) {
        if (navigator.mozGetUserMedia) {
          iceServers.push({
            url: 'turn:' + serverAddress,
            credential: relayPassword,
            username: relayUsername
          });
        } else if (navigator.webkitGetUserMedia) {
          chromeVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]);
          if (chromeVersion < 28) {
            iceServers.push({
              url: 'turn:' + relayUsername + '@' + serverAddress,
              credential: relayPassword
            });
          } else {
            iceServers.push({
              url: 'turn:' + serverAddress,
              credential: relayPassword,
              username: relayUsername
            });
          }
        }
      }
    }
    optional = [];
    if (this._offerDtls) {
      fm.log.debug('Offering DTLS-SRTP key agreement.');
      optional.push({
        DtlsSrtpKeyAgreement: true
      });
    }
    if (this._useDataChannels) {
      fm.log.debug('Including data channels in offer.');
      optional.push({
        RtpDataChannels: true
      });
    }
    this._connection = new RTCPeerConnection({
      iceServers: iceServers
    }, {
      optional: optional
    });
    this._connection.onicecandidate = function(event) {
      var candidate;
      if (event.candidate) {
        if (/tcp/.test(event.candidate.candidate)) {
          return;
        }
        candidate = new fm.icelink.candidate();
        candidate.setSdpMediaIndex(event.candidate.sdpMLineIndex);
        candidate.setSdpCandidateAttribute(event.candidate.candidate);
        return _this.raiseCandidate(candidate);
      }
    };
    if (this._useDataChannels) {
      if (this.getControlling()) {
        _ref2 = this._dataChannels;
        for (label in _ref2) {
          dataChannel = _ref2[label];
          channelInfo = dataChannel.info;
          channel = this._connection.createDataChannel(label, {
            reliable: false
          });
          this._attachChannelEvents(channel);
          dataChannel.channel = channel;
        }
      } else {
        this._connection.ondatachannel = function(event) {
          channel = event.channel;
          dataChannel = _this._dataChannels[channel.label];
          if (dataChannel) {
            _this._attachChannelEvents(channel);
            return dataChannel.channel = channel;
          }
        };
      }
    }
    this._remoteStream = new fm.icelink.webrtc.mediaStream();
    this._streamsReady = this._localStream ? false : true;
    this._channelsReady = this._useDataChannels ? false : true;
    this._connection.oniceconnectionstatechange = function(event) {
      var raiseAfter, raiseUpIfReady;
      if (_this._connection.iceConnectionState === 'connected' || _this._connection.iceConnectionState === 'completed') {
        raiseAfter = new Date().getTime() + 1000;
        raiseUpIfReady = function() {
          if (_this._streamsReady && _this._channelsReady) {
            return _this.raiseUp();
          } else {
            if (new Date().getTime() > raiseAfter) {
              return _this.raiseUp();
            } else {
              return window.setTimeout(raiseUpIfReady, 1);
            }
          }
        };
        return raiseUpIfReady();
      }
    };
    if (this._localStream) {
      this._connection.onaddstream = function(event) {
        if (!_this._streamsReady) {
          _this._remoteStream.setBackingStream(event.stream);
          return _this._streamsReady = true;
        }
      };
      this._connection.onremovestream = function(event) {
        var reason;
        try {
          _this._connection.close();
        } catch (error) {

        }
        reason = 'Stream removed.';
        return _this.raiseDown(new Error('Link closed. (' + reason + ')'), reason);
      };
      localBackingStream = this._localStream.getBackingStream();
      if (localBackingStream) {
        return this._connection.addStream(localBackingStream);
      }
    }
  };

  link.prototype._attachChannelEvents = function(channel) {
    var _this = this;
    channel.onopen = function(event) {
      if (!_this._channelsReady) {
        return _this._channelsReady = true;
      }
    };
    channel.onclose = function(event) {
      var reason;
      if (!_this._localStream) {
        try {
          _this._connection.close();
        } catch (error) {

        }
        reason = 'Channel closed.';
        return _this.raiseDown(new Error('Link closed. (' + reason + ')'), reason);
      }
    };
    return channel.onmessage = function(event) {
      var accumulator, data, dataChannel, packet;
      dataChannel = _this._dataChannels[channel.label];
      if (dataChannel) {
        packet = fm.icelink.googleDataPacket.parseString(event.data);
        if (packet) {
          accumulator = dataChannel.accumulator;
          accumulator.add(packet);
          if (packet.getEndOfPartition()) {
            data = fm.icelink.googleDataPacket.depacketize(accumulator.getPackets());
            accumulator.reset();
            return dataChannel.info.raiseOnReceive(_this, data);
          }
        }
      }
    };
  };

  link.prototype._attachFakeAudioStream = function(callback) {
    var _this = this;
    if (!this._ffdc && this._useDataChannels && !this._localStream && !!navigator.mozGetUserMedia) {
      this._ffdc = true;
      navigator.mozGetUserMedia({
        audio: true,
        fake: true
      }, function(stream) {
        _this._connection.addStream(stream);
        return callback();
      }, function() {});
      return true;
    }
    return false;
  };

  link.prototype.createInternal = function(createArgs, controlling, success, failure) {
    var constraints, onFailure, onSuccess, stream, streamType, type, _i, _len, _ref,
      _this = this;
    type = this.getControlling() ? 'answer' : 'offer';
    if (!this._connection) {
      this._createConnection();
      this.raiseInit(this.getControlling());
      if (this._attachFakeAudioStream(function() {
        return _this.createInternal(createArgs, controlling, success, failure);
      })) {
        return;
      }
    }
    onFailure = function(message) {
      if (message && message.hasOwnProperty('message')) {
        message = message.message;
      }
      if (!message) {
        message = 'Could not create ' + type + '.';
      }
      return failure(new Error(message));
    };
    onSuccess = function(sessionDescription) {
      var onSuccess2;
      onSuccess2 = function() {
        var offerAnswer;
        offerAnswer = new fm.icelink.offerAnswer();
        offerAnswer.setSdpMessage(sessionDescription.sdp);
        return success(offerAnswer);
      };
      return _this._connection.setLocalDescription(sessionDescription, onSuccess2, onFailure);
    };
    constraints = {
      optional: [],
      mandatory: {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false
      }
    };
    _ref = this.getStreams();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      stream = _ref[_i];
      streamType = stream.getType();
      if (streamType === fm.icelink.streamType.Audio) {
        constraints.mandatory.OfferToReceiveAudio = true;
      }
      if (streamType === fm.icelink.streamType.Video) {
        constraints.mandatory.OfferToReceiveVideo = true;
      }
    }
    if (this.getControlling()) {
      return this._connection.createOffer(onSuccess, onFailure, constraints);
    } else {
      return this._connection.createAnswer(onSuccess, onFailure, constraints);
    }
  };

  link.prototype.acceptInternal = function(acceptArgs, success, failure) {
    var onFailure, onSuccess, type,
      _this = this;
    type = this.getControlling() ? 'answer' : 'offer';
    if (!this._connection) {
      this._createConnection();
      this.raiseInit(this.getControlling());
      if (this._attachFakeAudioStream(function() {
        return _this.accept(acceptArgs);
      })) {
        return;
      }
    }
    onFailure = function(message) {
      if (message && message.hasOwnProperty('message')) {
        message = message.message;
      }
      if (!message) {
        message = 'Could not accept ' + type + '.';
      }
      return failure(new Error(message));
    };
    onSuccess = function() {
      return success();
    };
    return this._connection.setRemoteDescription(new RTCSessionDescription({
      type: type,
      sdp: acceptArgs.getOfferAnswer().getSdpMessage()
    }), onSuccess, onFailure);
  };

  link.prototype.addRemoteCandidateInternal = function(candidate) {
    return this._connection.addIceCandidate(new RTCIceCandidate({
      sdpMLineIndex: candidate.getSdpMediaIndex(),
      candidate: candidate.getSdpCandidateAttribute()
    }));
  };

  /*<span id='method-fm.icelink.link-sendData'>&nbsp;</span>
  */


  /**
   <div>
   Sends a data channel packet to the peer.
   </div>
  @function sendData
  @param {fm.icelink.webrtc.dataChannelInfo} channelInfo The data channel description.
  @param {String} data The data to send.
  @return {void}
  */


  link.prototype.sendData = function(channelInfo, data) {
    var channel, dataChannel, packet, packets, _i, _len, _results;
    dataChannel = this._dataChannels[channelInfo.getLabel()];
    if (!dataChannel) {
      throw new Error('Data channel not found.');
    }
    channel = dataChannel.channel;
    if (channel) {
      packets = fm.icelink.googleDataPacket.packetize(data);
      _results = [];
      for (_i = 0, _len = packets.length; _i < _len; _i++) {
        packet = packets[_i];
        _results.push(channel.send(packet.getString()));
      }
      return _results;
    }
  };

  link.prototype.closeInternal = function(closeArgs, complete) {
    var ex, message, reason;
    if (!this._connection) {
      return complete(null);
    } else {
      ex = null;
      try {
        this._connection.close();
      } catch (error) {
        ex = error;
      }
      reason = closeArgs.getReason();
      message = 'Link closed.';
      if (reason) {
        message += ' (' + reason + ')';
      }
      this.raiseDown(new Error(message), reason);
      return complete(closeArgs, ex);
    }
  };

  return link;

})(fm.icelink.baseLink);



(function() {
  var conference, link, methodName, oldConference, oldConstructor, oldPrototype, prop, _fn, _i, _len, _ref;
  window.RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection || window.RTCPeerConnection;
  window.RTCDataChannel = window.mozRTCDataChannel || window.msRTCDataChannel || window.RTCDataChannel;
  window.RTCSessionDescription = window.mozRTCSessionDescription || window.msRTCPeerConnection || window.RTCSessionDescription;
  window.RTCIceCandidate = window.mozRTCIceCandidate || window.msRTCIceCandidate || window.RTCIceCandidate;
  link = fm.icelink.link;
  conference = fm.icelink.conference;
  _ref = ['createOffer', 'createAnswer', 'accept', 'close'];
  _fn = function(methodName) {
    var method;
    method = link.prototype[methodName];
    return link.prototype[methodName] = function() {
      var obj;
      if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
        obj = arguments[0];
        return method.call(this, new fm.icelink[methodName + 'Args'](obj));
      } else {
        return method.apply(this, arguments);
      }
    };
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    methodName = _ref[_i];
    _fn(methodName);
  }
  oldConstructor = conference.prototype.constructor;
  oldPrototype = conference.prototype;
  oldConference = conference;
  fm.icelink.conference = function() {
    if (arguments) {
      if (arguments.length === 1 && !fm.util.isArray(arguments[0])) {
        arguments[0] = [arguments[0]];
      }
      if (arguments.length === 2 && !fm.util.isArray(arguments[0])) {
        arguments[0] = [arguments[0]];
      }
      if (arguments.length === 2 && !fm.util.isArray(arguments[1])) {
        arguments[1] = [arguments[1]];
      }
      if (arguments.length === 3 && !fm.util.isArray(arguments[2])) {
        arguments[2] = [arguments[2]];
      }
    }
    oldConstructor.apply(this, arguments);
    return this;
  };
  fm.icelink.conference.prototype = oldPrototype;
  for (prop in oldConference) {
    fm.icelink.conference[prop] = oldConference[prop];
  }
  fm.icelink.createOfferArgs = fm.icelink.createArgs;
  return fm.icelink.createAnswerArgs = fm.icelink.createArgs;
})();


return fm.icelink;
}));