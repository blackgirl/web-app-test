
/*
 * Title: IceLink WebRTC Extension for JavaScript
 * Version: 2.5.0
 * Copyright Frozen Mountain Software 2011+
 */

(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('fm.icelink.webrtc', function() {

if (typeof global !== 'undefined' && !global.window) { global.window = global; global.document = { cookie: '' }; }

if (!window.fm) { throw new Error("fm must be loaded before fm.icelink.webrtc."); }

if (!window.fm.icelink) { throw new Error("fm.icelink must be loaded before fm.icelink.webrtc."); }

if (!window.fm.icelink.webrtc) { window.fm.icelink.webrtc = {}; }

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

var __hasProp = {}.hasOwnProperty;

var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

/*<span id='cls-fm.icelink.webrtc.audioStream'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.audioStream
 <div>
 A WebRTC audio stream.
 </div>

@extends fm.icelink.stream
*/


fm.icelink.webrtc.audioStream = (function(_super) {

  __extends(audioStream, _super);

  /*<span id='method-fm.icelink.webrtc.audioStream-fm.icelink.webrtc.audioStream'>&nbsp;</span>
  */


  /**
   <div>
   Initializes a new instance of the <see cref="fm.icelink.webrtc.audioStream">fm.icelink.webrtc.audioStream</see> class.
   </div>
  @function fm.icelink.webrtc.audioStream
  @param {fm.icelink.webrtc.localMediaStream} localStream The local media stream.
  @param {Boolean} offerDtls Whether to offer to exchange SRTP keys using DTLS.
  @return {}
  */


  function audioStream(localStream, offerDtls) {
    this._onStreamLinkDown = __bind(this._onStreamLinkDown, this);

    this._onStreamLinkUp = __bind(this._onStreamLinkUp, this);

    this._onStreamLinkInit = __bind(this._onStreamLinkInit, this);
    if (!localStream) {
      throw new Error('WebRTC audio streams require a local media stream.');
    }
    if (arguments.length < 2) {
      offerDtls = true;
    }
    audioStream.__super__.constructor.call(this, fm.icelink.streamType.Audio, localStream, offerDtls);
    this.addOnLinkInit(this._onStreamLinkInit);
    this.addOnLinkUp(this._onStreamLinkUp);
    this.addOnLinkDown(this._onStreamLinkDown);
  }

  audioStream.prototype._onStreamLinkInit = function(e) {
    var localAudioRender;
    localAudioRender = this.getLocalStream().getCreateAudioRenderProvider()();
    if (localAudioRender) {
      return e.getLink().setLocalAudioRenderProvider(localAudioRender);
    }
  };

  audioStream.prototype._onStreamLinkUp = function(e) {
    var localAudioRender;
    localAudioRender = e.getLink().getLocalAudioRenderProvider();
    if (localAudioRender) {
      return localAudioRender.setRemoteStream(e.getLink().getRemoteStreamInternal());
    }
  };

  audioStream.prototype._onStreamLinkDown = function(e) {
    return e.getLink().unsetLocalAudioRenderProvider();
  };

  return audioStream;

})(fm.icelink.stream);


/*<span id='cls-fm.icelink.webrtc.videoStream'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.videoStream
 <div>
 A WebRTC video stream.
 </div>

@extends fm.icelink.stream
*/


fm.icelink.webrtc.videoStream = (function(_super) {

  __extends(videoStream, _super);

  /*<span id='method-fm.icelink.webrtc.videoStream-fm.icelink.webrtc.videoStream'>&nbsp;</span>
  */


  /**
   <div>
   Initializes a new instance of the <see cref="fm.icelink.webrtc.videoStream">fm.icelink.webrtc.videoStream</see> class.
   </div>
  @function fm.icelink.webrtc.videoStream
  @param {fm.icelink.webrtc.localMediaStream} localStream The local media stream.
  @param {Boolean} offerDtls Whether to offer to exchange SRTP keys using DTLS.
  @return {}
  */


  function videoStream(localStream, offerDtls) {
    this._onStreamLinkDown = __bind(this._onStreamLinkDown, this);

    this._onStreamLinkUp = __bind(this._onStreamLinkUp, this);

    this._onStreamLinkInit = __bind(this._onStreamLinkInit, this);
    if (!localStream) {
      throw new Error('WebRTC video streams require a local media stream.');
    }
    if (arguments.length < 2) {
      offerDtls = true;
    }
    videoStream.__super__.constructor.call(this, fm.icelink.streamType.Video, localStream, offerDtls);
    this.addOnLinkInit(this._onStreamLinkInit);
    this.addOnLinkUp(this._onStreamLinkUp);
    this.addOnLinkDown(this._onStreamLinkDown);
  }

  videoStream.prototype._onStreamLinkInit = function(e) {
    var localVideoRender;
    localVideoRender = this.getLocalStream().getCreateVideoRenderProvider()();
    if (localVideoRender) {
      return e.getLink().setLocalVideoRenderProvider(localVideoRender);
    }
  };

  videoStream.prototype._onStreamLinkUp = function(e) {
    var localVideoRender;
    localVideoRender = e.getLink().getLocalVideoRenderProvider();
    if (localVideoRender) {
      return localVideoRender.setRemoteStream(e.getLink().getRemoteStreamInternal());
    }
  };

  videoStream.prototype._onStreamLinkDown = function(e) {
    return e.getLink().unsetLocalVideoRenderProvider();
  };

  return videoStream;

})(fm.icelink.stream);


/*<span id='cls-fm.icelink.webrtc.dataChannelStream'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.dataChannelStream
 <div>
 A WebRTC data-channel stream.
 </div>

@extends fm.icelink.stream
*/


fm.icelink.webrtc.dataChannelStream = (function(_super) {

  __extends(dataChannelStream, _super);

  dataChannelStream.prototype._channelInfos = null;

  /*<span id='method-fm.icelink.webrtc.dataChannelStream-fm.icelink.webrtc.dataChannelStream'>&nbsp;</span>
  */


  /**
   <div>
   Initializes a new instance of the <see cref="fm.icelink.webrtc.dataChannelStream">fm.icelink.webrtc.dataChannelStream</see> class.
   </div>
  @function fm.icelink.webrtc.dataChannelStream
  @param {fm.array} channelInfos The data channel descriptions.
  @param {Boolean} offerDtls Whether to offer to exchange SRTP keys using DTLS.
  @return {}
  */


  function dataChannelStream(channelInfos, offerDtls) {
    this.getChannelInfos = __bind(this.getChannelInfos, this);
    if (!channelInfos || channelInfos.length === 0) {
      throw new Error('WebRTC data channel streams require at least one data channel description.');
    }
    if (arguments.length < 2) {
      offerDtls = true;
    }
    dataChannelStream.__super__.constructor.call(this, fm.icelink.streamType.Application, null, offerDtls);
    this._channelInfos = channelInfos;
  }

  /*<span id='method-fm.icelink.webrtc.dataChannelStream-getChannelInfos'>&nbsp;</span>
  */


  /**
   <div>
    Gets the data channel descriptions.
   </div>
  
  @function getChannelInfos
  @return {fm.array}
  */


  dataChannelStream.prototype.getChannelInfos = function() {
    return this._channelInfos;
  };

  return dataChannelStream;

})(fm.icelink.stream);


/*<span id='cls-fm.icelink.webrtc.layoutDirection'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutDirection
 <div>
 Specifies the direction of the layout flow.
 </div>

@extends fm.enum
*/

fm.icelink.webrtc.layoutDirection = {
  /*<span id='prop-fm.icelink.webrtc.layoutDirection-Horizontal'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the layout should flow
  	 horizontally, filling rows as needed.
  	 </div>
  
  	@field Horizontal
  	@type {fm.icelink.webrtc.layoutDirection}
  */

  Horizontal: 1,
  /*<span id='prop-fm.icelink.webrtc.layoutDirection-Vertical'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the layout should flow
  	 vertically, filling columns as needed.
  	 </div>
  
  	@field Vertical
  	@type {fm.icelink.webrtc.layoutDirection}
  */

  Vertical: 2
};


/*<span id='cls-fm.icelink.webrtc.layoutScale'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutScale
 <div>
 Specifies how an element should be scaled within a layout.
 </div>

@extends fm.enum
*/

fm.icelink.webrtc.layoutScale = {
  /*<span id='prop-fm.icelink.webrtc.layoutScale-Contain'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the element should be uniformly scaled
  	 (maintaining aspect ratio) to the largest size such
  	 that both its width and its height can fit inside its
  	 bounding box.
  	 </div>
  
  	@field Contain
  	@type {fm.icelink.webrtc.layoutScale}
  */

  Contain: 1,
  /*<span id='prop-fm.icelink.webrtc.layoutScale-Cover'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the element should be uniformly scaled
  	 (maintaining aspect ratio) to be as large as possible
  	 so that the bounding box is completely covered. Some
  	 parts of the element may not be in view (cropped).
  	 </div>
  
  	@field Cover
  	@type {fm.icelink.webrtc.layoutScale}
  */

  Cover: 2,
  /*<span id='prop-fm.icelink.webrtc.layoutScale-Stretch'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the element should be non-uniformly
  	 scaled (not maintaining aspect ratio) so that the
  	 bounding box is completely covered, but all parts
  	 of the element are in view (no cropping).
  	 </div>
  
  	@field Stretch
  	@type {fm.icelink.webrtc.layoutScale}
  */

  Stretch: 3
};


/*<span id='cls-fm.icelink.webrtc.layoutAlignment'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutAlignment
 <div>
 A layout alignment definition.
 </div>

@extends fm.enum
*/

fm.icelink.webrtc.layoutAlignment = {
  /*<span id='prop-fm.icelink.webrtc.layoutAlignment-TopLeft'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a top-left alignment.
  	 </div>
  
  	@field TopLeft
  	@type {fm.icelink.webrtc.layoutAlignment}
  */

  TopLeft: 1,
  /*<span id='prop-fm.icelink.webrtc.layoutAlignment-Top'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a top-center alignment.
  	 </div>
  
  	@field Top
  	@type {fm.icelink.webrtc.layoutAlignment}
  */

  Top: 2,
  /*<span id='prop-fm.icelink.webrtc.layoutAlignment-TopRight'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a top-right alignment.
  	 </div>
  
  	@field TopRight
  	@type {fm.icelink.webrtc.layoutAlignment}
  */

  TopRight: 3,
  /*<span id='prop-fm.icelink.webrtc.layoutAlignment-Left'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a center-left alignment.
  	 </div>
  
  	@field Left
  	@type {fm.icelink.webrtc.layoutAlignment}
  */

  Left: 4,
  /*<span id='prop-fm.icelink.webrtc.layoutAlignment-Center'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a center-center alignment.
  	 </div>
  
  	@field Center
  	@type {fm.icelink.webrtc.layoutAlignment}
  */

  Center: 5,
  /*<span id='prop-fm.icelink.webrtc.layoutAlignment-Right'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a center-right alignment.
  	 </div>
  
  	@field Right
  	@type {fm.icelink.webrtc.layoutAlignment}
  */

  Right: 6,
  /*<span id='prop-fm.icelink.webrtc.layoutAlignment-BottomLeft'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a bottom-left alignment.
  	 </div>
  
  	@field BottomLeft
  	@type {fm.icelink.webrtc.layoutAlignment}
  */

  BottomLeft: 7,
  /*<span id='prop-fm.icelink.webrtc.layoutAlignment-Bottom'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a bottom-center alignment.
  	 </div>
  
  	@field Bottom
  	@type {fm.icelink.webrtc.layoutAlignment}
  */

  Bottom: 8,
  /*<span id='prop-fm.icelink.webrtc.layoutAlignment-BottomRight'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a bottom-right alignment.
  	 </div>
  
  	@field BottomRight
  	@type {fm.icelink.webrtc.layoutAlignment}
  */

  BottomRight: 9
};


/*<span id='cls-fm.icelink.webrtc.layoutMode'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutMode
 <div>
 Specifies the layout mode that should be used.
 </div>

@extends fm.enum
*/

fm.icelink.webrtc.layoutMode = {
  /*<span id='prop-fm.icelink.webrtc.layoutMode-FloatLocal'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the local video feed should be displayed as
  	 a floating element above the remote video feeds.
  	 </div>
  
  	@field FloatLocal
  	@type {fm.icelink.webrtc.layoutMode}
  */

  FloatLocal: 1,
  /*<span id='prop-fm.icelink.webrtc.layoutMode-FloatRemote'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the remote video feeds should be displayed as
  	 floating elements above the local video feed.
  	 </div>
  
  	@field FloatRemote
  	@type {fm.icelink.webrtc.layoutMode}
  */

  FloatRemote: 2,
  /*<span id='prop-fm.icelink.webrtc.layoutMode-Block'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the video feed should be displayed as a block
  	 element on its own row, separate from other video feeds.
  	 </div>
  
  	@field Block
  	@type {fm.icelink.webrtc.layoutMode}
  */

  Block: 3,
  /*<span id='prop-fm.icelink.webrtc.layoutMode-Inline'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the video feed should be displayed as an inline
  	 element that shares a row with other video feeds.
  	 </div>
  
  	@field Inline
  	@type {fm.icelink.webrtc.layoutMode}
  */

  Inline: 4
};


/*<span id='cls-fm.icelink.webrtc.layoutOrigin'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutOrigin
 <div>
 A layout origin definition.
 </div>

@extends fm.enum
*/

fm.icelink.webrtc.layoutOrigin = {
  /*<span id='prop-fm.icelink.webrtc.layoutOrigin-TopLeft'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates an origin where 0,0 is in the top-left corner.
  	 </div>
  
  	@field TopLeft
  	@type {fm.icelink.webrtc.layoutOrigin}
  */

  TopLeft: 1,
  /*<span id='prop-fm.icelink.webrtc.layoutOrigin-TopRight'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates an origin where 0,0 is in the top-right corner.
  	 </div>
  
  	@field TopRight
  	@type {fm.icelink.webrtc.layoutOrigin}
  */

  TopRight: 2,
  /*<span id='prop-fm.icelink.webrtc.layoutOrigin-BottomRight'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates an origin where 0,0 is in the bottom-right corner.
  	 </div>
  
  	@field BottomRight
  	@type {fm.icelink.webrtc.layoutOrigin}
  */

  BottomRight: 3,
  /*<span id='prop-fm.icelink.webrtc.layoutOrigin-BottomLeft'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates an origin where 0,0 is in the bottom-left corner.
  	 </div>
  
  	@field BottomLeft
  	@type {fm.icelink.webrtc.layoutOrigin}
  */

  BottomLeft: 4
};


/*<span id='cls-fm.icelink.webrtc.layoutCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutCompleteArgs
 <div>
 Arguments for the BaseLayoutManager OnLayoutComplete event.
 </div>

@extends fm.object
*/


fm.icelink.webrtc.layoutCompleteArgs = (function(_super) {

  __extends(layoutCompleteArgs, _super);

  layoutCompleteArgs.prototype._layoutManager = null;

  function layoutCompleteArgs() {
    this.setLayoutManager = __bind(this.setLayoutManager, this);

    this.getLayoutManager = __bind(this.getLayoutManager, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      layoutCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    layoutCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.webrtc.layoutCompleteArgs-getLayoutManager'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the base layout manager.
  	 </div>
  
  	@function getLayoutManager
  	@return {fm.icelink.webrtc.baseLayoutManager}
  */


  layoutCompleteArgs.prototype.getLayoutManager = function() {
    return this._layoutManager;
  };

  layoutCompleteArgs.prototype.setLayoutManager = function() {
    var value;
    value = arguments[0];
    return this._layoutManager = value;
  };

  return layoutCompleteArgs;

})(fm.object);


/*<span id='cls-fm.icelink.webrtc.layoutArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutArgs
 <div>
 Arguments for the BaseLayoutManager OnLayout event.
 </div>

@extends fm.object
*/


fm.icelink.webrtc.layoutArgs = (function(_super) {

  __extends(layoutArgs, _super);

  layoutArgs.prototype._layout = null;

  layoutArgs.prototype._layoutHeight = 0;

  layoutArgs.prototype._layoutManager = null;

  layoutArgs.prototype._layoutWidth = 0;

  layoutArgs.prototype._remoteCount = 0;

  function layoutArgs() {
    this.setRemoteCount = __bind(this.setRemoteCount, this);

    this.setLayoutWidth = __bind(this.setLayoutWidth, this);

    this.setLayoutManager = __bind(this.setLayoutManager, this);

    this.setLayoutHeight = __bind(this.setLayoutHeight, this);

    this.setLayout = __bind(this.setLayout, this);

    this.getRemoteCount = __bind(this.getRemoteCount, this);

    this.getLayoutWidth = __bind(this.getLayoutWidth, this);

    this.getLayoutManager = __bind(this.getLayoutManager, this);

    this.getLayoutHeight = __bind(this.getLayoutHeight, this);

    this.getLayout = __bind(this.getLayout, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      layoutArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    layoutArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.webrtc.layoutArgs-getLayout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the calculated layout.
  	 </div>
  
  	@function getLayout
  	@return {fm.icelink.webrtc.layout}
  */


  layoutArgs.prototype.getLayout = function() {
    return this._layout;
  };

  /*<span id='method-fm.icelink.webrtc.layoutArgs-getLayoutHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the total layout/container height.
  	 </div>
  
  	@function getLayoutHeight
  	@return {Integer}
  */


  layoutArgs.prototype.getLayoutHeight = function() {
    return this._layoutHeight;
  };

  /*<span id='method-fm.icelink.webrtc.layoutArgs-getLayoutManager'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the base layout manager.
  	 </div>
  
  	@function getLayoutManager
  	@return {fm.icelink.webrtc.baseLayoutManager}
  */


  layoutArgs.prototype.getLayoutManager = function() {
    return this._layoutManager;
  };

  /*<span id='method-fm.icelink.webrtc.layoutArgs-getLayoutWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the total layout/container width.
  	 </div>
  
  	@function getLayoutWidth
  	@return {Integer}
  */


  layoutArgs.prototype.getLayoutWidth = function() {
    return this._layoutWidth;
  };

  /*<span id='method-fm.icelink.webrtc.layoutArgs-getRemoteCount'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the number of remote video controls.
  	 </div>
  
  	@function getRemoteCount
  	@return {Integer}
  */


  layoutArgs.prototype.getRemoteCount = function() {
    return this._remoteCount;
  };

  layoutArgs.prototype.setLayout = function() {
    var value;
    value = arguments[0];
    return this._layout = value;
  };

  layoutArgs.prototype.setLayoutHeight = function() {
    var value;
    value = arguments[0];
    return this._layoutHeight = value;
  };

  layoutArgs.prototype.setLayoutManager = function() {
    var value;
    value = arguments[0];
    return this._layoutManager = value;
  };

  layoutArgs.prototype.setLayoutWidth = function() {
    var value;
    value = arguments[0];
    return this._layoutWidth = value;
  };

  layoutArgs.prototype.setRemoteCount = function() {
    var value;
    value = arguments[0];
    return this._remoteCount = value;
  };

  return layoutArgs;

})(fm.object);


/*<span id='cls-fm.icelink.webrtc.layoutTable'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutTable
 <div>
 Defines the results of a layout calculation.
 </div>

@extends fm.object
*/


fm.icelink.webrtc.layoutTable = (function(_super) {

  __extends(layoutTable, _super);

  layoutTable.prototype._cellHeight = 0;

  layoutTable.prototype._cellWidth = 0;

  layoutTable.prototype._columnCount = 0;

  layoutTable.prototype._rowCount = 0;

  /*<span id='method-fm.icelink.webrtc.layoutTable-fm.icelink.webrtc.layoutTable'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.webrtc.layoutTable">fm.icelink.webrtc.layoutTable</see> class.
  	 </div>
  	@function fm.icelink.webrtc.layoutTable
  	@param {Integer} columnCount The column count.
  	@param {Integer} rowCount The row count.
  	@param {Integer} cellWidth The width of each cell.
  	@param {Integer} cellHeight The height of each cell.
  	@return {}
  */


  function layoutTable() {
    this.setRowCount = __bind(this.setRowCount, this);

    this.setColumnCount = __bind(this.setColumnCount, this);

    this.setCellWidth = __bind(this.setCellWidth, this);

    this.setCellHeight = __bind(this.setCellHeight, this);

    this.getRowCount = __bind(this.getRowCount, this);

    this.getColumnCount = __bind(this.getColumnCount, this);

    this.getCellWidth = __bind(this.getCellWidth, this);

    this.getCellHeight = __bind(this.getCellHeight, this);

    var cellHeight, cellWidth, columnCount, rowCount;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      layoutTable.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    columnCount = arguments[0];
    rowCount = arguments[1];
    cellWidth = arguments[2];
    cellHeight = arguments[3];
    layoutTable.__super__.constructor.call(this);
    this.setColumnCount(columnCount);
    this.setRowCount(rowCount);
    this.setCellWidth(cellWidth);
    this.setCellHeight(cellHeight);
  }

  /*<span id='method-fm.icelink.webrtc.layoutTable-getCellHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the height of each cell.
  	 </div>
  
  	@function getCellHeight
  	@return {Integer}
  */


  layoutTable.prototype.getCellHeight = function() {
    return this._cellHeight;
  };

  /*<span id='method-fm.icelink.webrtc.layoutTable-getCellWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the width of each cell.
  	 </div>
  
  	@function getCellWidth
  	@return {Integer}
  */


  layoutTable.prototype.getCellWidth = function() {
    return this._cellWidth;
  };

  /*<span id='method-fm.icelink.webrtc.layoutTable-getColumnCount'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the column count.
  	 </div>
  
  	@function getColumnCount
  	@return {Integer}
  */


  layoutTable.prototype.getColumnCount = function() {
    return this._columnCount;
  };

  /*<span id='method-fm.icelink.webrtc.layoutTable-getRowCount'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the row count.
  	 </div>
  
  	@function getRowCount
  	@return {Integer}
  */


  layoutTable.prototype.getRowCount = function() {
    return this._rowCount;
  };

  /*<span id='method-fm.icelink.webrtc.layoutTable-setCellHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the height of each cell.
  	 </div>
  
  	@function setCellHeight
  	@param {Integer} value
  	@return {void}
  */


  layoutTable.prototype.setCellHeight = function() {
    var value;
    value = arguments[0];
    return this._cellHeight = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutTable-setCellWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the width of each cell.
  	 </div>
  
  	@function setCellWidth
  	@param {Integer} value
  	@return {void}
  */


  layoutTable.prototype.setCellWidth = function() {
    var value;
    value = arguments[0];
    return this._cellWidth = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutTable-setColumnCount'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the column count.
  	 </div>
  
  	@function setColumnCount
  	@param {Integer} value
  	@return {void}
  */


  layoutTable.prototype.setColumnCount = function() {
    var value;
    value = arguments[0];
    return this._columnCount = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutTable-setRowCount'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the row count.
  	 </div>
  
  	@function setRowCount
  	@param {Integer} value
  	@return {void}
  */


  layoutTable.prototype.setRowCount = function() {
    var value;
    value = arguments[0];
    return this._rowCount = value;
  };

  return layoutTable;

})(fm.object);


/*<span id='cls-fm.icelink.webrtc.baseMediaArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.baseMediaArgs
 <div>
 Base media arguments for media stream initialization.
 </div>

@extends fm.dynamic
*/


fm.icelink.webrtc.baseMediaArgs = (function(_super) {

  __extends(baseMediaArgs, _super);

  baseMediaArgs.prototype._audio = false;

  baseMediaArgs.prototype._audioDeviceNumber = null;

  baseMediaArgs.prototype._video = false;

  baseMediaArgs.prototype._videoDeviceNumber = null;

  baseMediaArgs.prototype._videoFrameRate = 0;

  baseMediaArgs.prototype._videoHeight = 0;

  baseMediaArgs.prototype._videoWidth = 0;

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-fm.icelink.webrtc.baseMediaArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.webrtc.baseMediaArgs">fm.icelink.webrtc.baseMediaArgs</see> class.
  	 </div>
  
  	@function fm.icelink.webrtc.baseMediaArgs
  	@return {}
  */


  function baseMediaArgs() {
    this.setVideoWidth = __bind(this.setVideoWidth, this);

    this.setVideoHeight = __bind(this.setVideoHeight, this);

    this.setVideoFrameRate = __bind(this.setVideoFrameRate, this);

    this.setVideoDeviceNumber = __bind(this.setVideoDeviceNumber, this);

    this.setVideo = __bind(this.setVideo, this);

    this.setAudioDeviceNumber = __bind(this.setAudioDeviceNumber, this);

    this.setAudio = __bind(this.setAudio, this);

    this.getVideoWidth = __bind(this.getVideoWidth, this);

    this.getVideoHeight = __bind(this.getVideoHeight, this);

    this.getVideoFrameRate = __bind(this.getVideoFrameRate, this);

    this.getVideoDeviceNumber = __bind(this.getVideoDeviceNumber, this);

    this.getVideo = __bind(this.getVideo, this);

    this.getAudioDeviceNumber = __bind(this.getAudioDeviceNumber, this);

    this.getAudio = __bind(this.getAudio, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseMediaArgs.__super__.constructor.call(this);
      this.setAudioDeviceNumber(null);
      this.setVideoDeviceNumber(null);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseMediaArgs.__super__.constructor.call(this);
    this.setAudioDeviceNumber(null);
    this.setVideoDeviceNumber(null);
  }

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-getAudio'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether to initialize the
  	 audio capture provider.
  	 </div>
  
  	@function getAudio
  	@return {Boolean}
  */


  baseMediaArgs.prototype.getAudio = function() {
    return this._audio;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-getAudioDeviceNumber'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the desired audio device number.
  	 Defaults to null (no preference).
  	 </div>
  
  	@function getAudioDeviceNumber
  	@return {fm.nullable}
  */


  baseMediaArgs.prototype.getAudioDeviceNumber = function() {
    return this._audioDeviceNumber;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-getVideo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether to initialize the
  	 video capture provider.
  	 </div>
  
  	@function getVideo
  	@return {Boolean}
  */


  baseMediaArgs.prototype.getVideo = function() {
    return this._video;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-getVideoDeviceNumber'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the desired video device number.
  	 Defaults to null (no preference).
  	 </div>
  
  	@function getVideoDeviceNumber
  	@return {fm.nullable}
  */


  baseMediaArgs.prototype.getVideoDeviceNumber = function() {
    return this._videoDeviceNumber;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-getVideoFrameRate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the desired video frame rate (defaults to 15).
  	 </div>
  
  	@function getVideoFrameRate
  	@return {Integer}
  */


  baseMediaArgs.prototype.getVideoFrameRate = function() {
    return this._videoFrameRate;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-getVideoHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the desired video frame height (defaults to 240).
  	 </div>
  
  	@function getVideoHeight
  	@return {Integer}
  */


  baseMediaArgs.prototype.getVideoHeight = function() {
    return this._videoHeight;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-getVideoWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the desired video frame width (defaults to 320).
  	 </div>
  
  	@function getVideoWidth
  	@return {Integer}
  */


  baseMediaArgs.prototype.getVideoWidth = function() {
    return this._videoWidth;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-setAudio'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether to initialize the
  	 audio capture provider.
  	 </div>
  
  	@function setAudio
  	@param {Boolean} value
  	@return {void}
  */


  baseMediaArgs.prototype.setAudio = function() {
    var value;
    value = arguments[0];
    return this._audio = value;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-setAudioDeviceNumber'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the desired audio device number.
  	 Defaults to null (no preference).
  	 </div>
  
  	@function setAudioDeviceNumber
  	@param {fm.nullable} value
  	@return {void}
  */


  baseMediaArgs.prototype.setAudioDeviceNumber = function() {
    var value;
    value = arguments[0];
    return this._audioDeviceNumber = value;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-setVideo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether to initialize the
  	 video capture provider.
  	 </div>
  
  	@function setVideo
  	@param {Boolean} value
  	@return {void}
  */


  baseMediaArgs.prototype.setVideo = function() {
    var value;
    value = arguments[0];
    return this._video = value;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-setVideoDeviceNumber'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the desired video device number.
  	 Defaults to null (no preference).
  	 </div>
  
  	@function setVideoDeviceNumber
  	@param {fm.nullable} value
  	@return {void}
  */


  baseMediaArgs.prototype.setVideoDeviceNumber = function() {
    var value;
    value = arguments[0];
    return this._videoDeviceNumber = value;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-setVideoFrameRate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the desired video frame rate (defaults to 15).
  	 </div>
  
  	@function setVideoFrameRate
  	@param {Integer} value
  	@return {void}
  */


  baseMediaArgs.prototype.setVideoFrameRate = function() {
    var value;
    value = arguments[0];
    return this._videoFrameRate = value;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-setVideoHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the desired video frame height (defaults to 240).
  	 </div>
  
  	@function setVideoHeight
  	@param {Integer} value
  	@return {void}
  */


  baseMediaArgs.prototype.setVideoHeight = function() {
    var value;
    value = arguments[0];
    return this._videoHeight = value;
  };

  /*<span id='method-fm.icelink.webrtc.baseMediaArgs-setVideoWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the desired video frame width (defaults to 320).
  	 </div>
  
  	@function setVideoWidth
  	@param {Integer} value
  	@return {void}
  */


  baseMediaArgs.prototype.setVideoWidth = function() {
    var value;
    value = arguments[0];
    return this._videoWidth = value;
  };

  return baseMediaArgs;

})(fm.dynamic);


/*<span id='cls-fm.icelink.webrtc.dataChannelReceiveArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.dataChannelReceiveArgs
 <div>
 Arguments for the data channel receive event.
 </div>

@extends fm.icelink.baseLinkArgs
*/


fm.icelink.webrtc.dataChannelReceiveArgs = (function(_super) {

  __extends(dataChannelReceiveArgs, _super);

  dataChannelReceiveArgs.prototype._channelInfo = null;

  dataChannelReceiveArgs.prototype._data = null;

  function dataChannelReceiveArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setData = __bind(this.setData, this);

    this.setChannelInfo = __bind(this.setChannelInfo, this);

    this.getData = __bind(this.getData, this);

    this.getChannelInfo = __bind(this.getChannelInfo, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      dataChannelReceiveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    dataChannelReceiveArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.webrtc.dataChannelReceiveArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} dataChannelReceiveArgsJson The JSON to deserialize.
  	@return {fm.icelink.webrtc.dataChannelReceiveArgs} The deserialized data channel receive args.
  */


  dataChannelReceiveArgs.fromJson = function() {
    var dataChannelReceiveArgsJson;
    dataChannelReceiveArgsJson = arguments[0];
    return fm.icelink.webrtc.serializer.deserializeDataChannelReceiveArgs(dataChannelReceiveArgsJson);
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelReceiveArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.webrtc.dataChannelReceiveArgs} dataChannelReceiveArgs The data channel receive args to serialize.
  	@return {String} The serialized JSON.
  */


  dataChannelReceiveArgs.toJson = function() {
    var dataChannelReceiveArgs;
    dataChannelReceiveArgs = arguments[0];
    return fm.icelink.webrtc.serializer.serializeDataChannelReceiveArgs(dataChannelReceiveArgs);
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelReceiveArgs-getChannelInfo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data channel description.
  	 </div>
  
  	@function getChannelInfo
  	@return {fm.icelink.webrtc.dataChannelInfo}
  */


  dataChannelReceiveArgs.prototype.getChannelInfo = function() {
    return this._channelInfo;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelReceiveArgs-getData'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the received data.
  	 </div>
  
  	@function getData
  	@return {String}
  */


  dataChannelReceiveArgs.prototype.getData = function() {
    return this._data;
  };

  dataChannelReceiveArgs.prototype.setChannelInfo = function() {
    var value;
    value = arguments[0];
    return this._channelInfo = value;
  };

  dataChannelReceiveArgs.prototype.setData = function() {
    var value;
    value = arguments[0];
    return this._data = value;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelReceiveArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  dataChannelReceiveArgs.prototype.toJson = function() {
    return fm.icelink.webrtc.dataChannelReceiveArgs.toJson(this);
  };

  return dataChannelReceiveArgs;

}).call(this, fm.icelink.baseLinkArgs);


/*<span id='cls-fm.icelink.webrtc.layout'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layout
 <div>
 A layout definition, including local
 and remote frame definitions.
 </div>

@extends fm.object
*/


fm.icelink.webrtc.layout = (function(_super) {

  __extends(layout, _super);

  layout.prototype.__localFrame = null;

  layout.prototype.__remoteFrames = null;

  function layout() {
    this.swapRemoteFrames = __bind(this.swapRemoteFrames, this);

    this.swapLocalFrame = __bind(this.swapLocalFrame, this);

    this.swapFrames = __bind(this.swapFrames, this);

    this.setRemoteFrames = __bind(this.setRemoteFrames, this);

    this.setLocalFrame = __bind(this.setLocalFrame, this);

    this.getRemoteFrames = __bind(this.getRemoteFrames, this);

    this.getLocalFrame = __bind(this.getLocalFrame, this);

    this.getAllFrames = __bind(this.getAllFrames, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      layout.__super__.constructor.call(this);
      this.__localFrame = new fm.icelink.webrtc.layoutFrame(0, 0, 0, 0);
      this.__remoteFrames = new Array(0);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    layout.__super__.constructor.call(this);
    this.__localFrame = new fm.icelink.webrtc.layoutFrame(0, 0, 0, 0);
    this.__remoteFrames = new Array(0);
  }

  /*<span id='method-fm.icelink.webrtc.layout-getAllFrames'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets all frames (local and remote).
  	 </div>
  
  	@function getAllFrames
  	@return {fm.array}
  */


  layout.prototype.getAllFrames = function() {
    var list;
    list = [];
    fm.arrayExtensions.add(list, this.getLocalFrame());
    fm.arrayExtensions.addRange(list, this.getRemoteFrames());
    return fm.arrayExtensions.toArray(list);
  };

  /*<span id='method-fm.icelink.webrtc.layout-getLocalFrame'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local frame.
  	 </div>
  
  	@function getLocalFrame
  	@return {fm.icelink.webrtc.layoutFrame}
  */


  layout.prototype.getLocalFrame = function() {
    return this.__localFrame;
  };

  /*<span id='method-fm.icelink.webrtc.layout-getRemoteFrames'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the remote frames.
  	 </div>
  
  	@function getRemoteFrames
  	@return {fm.array}
  */


  layout.prototype.getRemoteFrames = function() {
    return this.__remoteFrames;
  };

  /*<span id='method-fm.icelink.webrtc.layout-setLocalFrame'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the local frame.
  	 </div>
  
  	@function setLocalFrame
  	@param {fm.icelink.webrtc.layoutFrame} value
  	@return {void}
  */


  layout.prototype.setLocalFrame = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return this.__localFrame = new fm.icelink.webrtc.layoutFrame(0, 0, 0, 0);
    } else {
      return this.__localFrame = value;
    }
  };

  /*<span id='method-fm.icelink.webrtc.layout-setRemoteFrames'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the remote frames.
  	 </div>
  
  	@function setRemoteFrames
  	@param {fm.array} value
  	@return {void}
  */


  layout.prototype.setRemoteFrames = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return this.__remoteFrames = new Array(0);
    } else {
      return this.__remoteFrames = value;
    }
  };

  /*<span id='method-fm.icelink.webrtc.layout-swapFrames'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Swaps the properties of two frames.
  	 </div>
  	@function swapFrames
  	@param {fm.icelink.webrtc.layoutFrame} frame1 The first frame.
  	@param {fm.icelink.webrtc.layoutFrame} frame2 The second frame.
  	@return {void}
  */


  layout.prototype.swapFrames = function() {
    var frame1, frame2, height, width, x, y;
    frame1 = arguments[0];
    frame2 = arguments[1];
    x = frame1.getX();
    y = frame1.getY();
    width = frame1.getWidth();
    height = frame1.getHeight();
    frame1.setX(frame2.getX());
    frame1.setY(frame2.getY());
    frame1.setWidth(frame2.getWidth());
    frame1.setHeight(frame2.getHeight());
    frame2.setX(x);
    frame2.setY(y);
    frame2.setWidth(width);
    return frame2.setHeight(height);
  };

  /*<span id='method-fm.icelink.webrtc.layout-swapLocalFrame'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Swaps the local frame with a remote frame.
  	 </div>
  	@function swapLocalFrame
  	@param {Integer} remoteFrameIndex The index of the remote frame.
  	@return {void}
  */


  layout.prototype.swapLocalFrame = function() {
    var localFrame, remoteFrameIndex, remoteFrames, _var0;
    remoteFrameIndex = arguments[0];
    localFrame = this.getLocalFrame();
    remoteFrames = this.getRemoteFrames();
    _var0 = localFrame;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (remoteFrameIndex < remoteFrames.length)) {
      return this.swapFrames(localFrame, remoteFrames[remoteFrameIndex]);
    }
  };

  /*<span id='method-fm.icelink.webrtc.layout-swapRemoteFrames'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Swaps two remote frames.
  	 </div>
  	@function swapRemoteFrames
  	@param {Integer} remoteFrameIndex1 The index of the first remote frame.
  	@param {Integer} remoteFrameIndex2 The index of the second remote frame.
  	@return {void}
  */


  layout.prototype.swapRemoteFrames = function() {
    var remoteFrameIndex1, remoteFrameIndex2, remoteFrames;
    remoteFrameIndex1 = arguments[0];
    remoteFrameIndex2 = arguments[1];
    remoteFrames = this.getRemoteFrames();
    if ((remoteFrameIndex1 < remoteFrames.length) && (remoteFrameIndex2 < remoteFrames.length)) {
      return this.swapFrames(remoteFrames[remoteFrameIndex1], remoteFrames[remoteFrameIndex2]);
    }
  };

  return layout;

})(fm.object);


/*<span id='cls-fm.icelink.webrtc.layoutFrame'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutFrame
 <div>
 A layout frame definition, including X/Y coordinates and width/height values.
 </div>

@extends fm.object
*/


fm.icelink.webrtc.layoutFrame = (function(_super) {

  __extends(layoutFrame, _super);

  layoutFrame.prototype._height = 0;

  layoutFrame.prototype._width = 0;

  layoutFrame.prototype._x = 0;

  layoutFrame.prototype._y = 0;

  /*<span id='method-fm.icelink.webrtc.layoutFrame-fm.icelink.webrtc.layoutFrame'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.webrtc.layoutFrame">fm.icelink.webrtc.layoutFrame</see> class.
  	 </div>
  	@function fm.icelink.webrtc.layoutFrame
  	@param {Integer} x The X coordinate.
  	@param {Integer} y The Y coordinate.
  	@param {Integer} width The width value.
  	@param {Integer} height The height value.
  	@return {}
  */


  function layoutFrame() {
    this.setY = __bind(this.setY, this);

    this.setX = __bind(this.setX, this);

    this.setWidth = __bind(this.setWidth, this);

    this.setHeight = __bind(this.setHeight, this);

    this.getY = __bind(this.getY, this);

    this.getX = __bind(this.getX, this);

    this.getWidth = __bind(this.getWidth, this);

    this.getHeight = __bind(this.getHeight, this);

    var height, width, x, y;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      layoutFrame.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    x = arguments[0];
    y = arguments[1];
    width = arguments[2];
    height = arguments[3];
    layoutFrame.__super__.constructor.call(this);
    this.setX(x);
    this.setY(y);
    this.setWidth(width);
    this.setHeight(height);
  }

  /*<span id='method-fm.icelink.webrtc.layoutFrame-getScaledFrame'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a scaled frame.
  	 </div>
  	@function getScaledFrame
  	@param {fm.icelink.webrtc.layoutScale} scale The scaling algorithm to use.
  	@param {Integer} outerWidth The width of the outer container.
  	@param {Integer} outerHeight The height of the outer container.
  	@param {Integer} innerWidth The width of the inner element.
  	@param {Integer} innerHeight The height of the inner element.
  	@return {fm.icelink.webrtc.layoutFrame}
  */


  layoutFrame.getScaledFrame = function() {
    var height, innerHeight, innerWidth, num5, num6, outerHeight, outerWidth, scale, width, x, y;
    scale = arguments[0];
    outerWidth = arguments[1];
    outerHeight = arguments[2];
    innerWidth = arguments[3];
    innerHeight = arguments[4];
    x = 0;
    y = 0;
    width = outerWidth;
    height = outerHeight;
    if ((((outerWidth === 0) || (outerHeight === 0)) || (innerWidth === 0)) || (innerHeight === 0)) {
      if ((outerWidth === 0) || (innerWidth === 0)) {
        width = 0;
        x = outerWidth / 2;
      }
      if ((outerHeight === 0) || (innerHeight === 0)) {
        height = 0;
        y = outerHeight / 2;
      }
    } else {
      if (scale === fm.icelink.webrtc.layoutScale.Contain) {
        num5 = outerWidth / outerHeight;
        num6 = innerWidth / innerHeight;
        if (num5 > num6) {
          width = outerHeight * num6;
          x = (outerWidth - width) / 2;
        } else {
          if (num5 < num6) {
            height = outerWidth / num6;
            y = (outerHeight - height) / 2;
          }
        }
      } else {
        if (scale === fm.icelink.webrtc.layoutScale.Cover) {
          num5 = outerWidth / outerHeight;
          num6 = innerWidth / innerHeight;
          if (num5 < num6) {
            width = outerHeight * num6;
            x = (outerWidth - width) / 2;
          } else {
            if (num5 > num6) {
              height = outerWidth / num6;
              y = (outerHeight - height) / 2;
            }
          }
        }
      }
    }
    return new fm.icelink.webrtc.layoutFrame(x, y, width, height);
  };

  /*<span id='method-fm.icelink.webrtc.layoutFrame-getHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the height value.
  	 </div>
  
  	@function getHeight
  	@return {Integer}
  */


  layoutFrame.prototype.getHeight = function() {
    return this._height;
  };

  /*<span id='method-fm.icelink.webrtc.layoutFrame-getWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the width value.
  	 </div>
  
  	@function getWidth
  	@return {Integer}
  */


  layoutFrame.prototype.getWidth = function() {
    return this._width;
  };

  /*<span id='method-fm.icelink.webrtc.layoutFrame-getX'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the X coordinate.
  	 </div>
  
  	@function getX
  	@return {Integer}
  */


  layoutFrame.prototype.getX = function() {
    return this._x;
  };

  /*<span id='method-fm.icelink.webrtc.layoutFrame-getY'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the Y coordinate.
  	 </div>
  
  	@function getY
  	@return {Integer}
  */


  layoutFrame.prototype.getY = function() {
    return this._y;
  };

  /*<span id='method-fm.icelink.webrtc.layoutFrame-setHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the height value.
  	 </div>
  
  	@function setHeight
  	@param {Integer} value
  	@return {void}
  */


  layoutFrame.prototype.setHeight = function() {
    var value;
    value = arguments[0];
    return this._height = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutFrame-setWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the width value.
  	 </div>
  
  	@function setWidth
  	@param {Integer} value
  	@return {void}
  */


  layoutFrame.prototype.setWidth = function() {
    var value;
    value = arguments[0];
    return this._width = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutFrame-setX'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the X coordinate.
  	 </div>
  
  	@function setX
  	@param {Integer} value
  	@return {void}
  */


  layoutFrame.prototype.setX = function() {
    var value;
    value = arguments[0];
    return this._x = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutFrame-setY'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the Y coordinate.
  	 </div>
  
  	@function setY
  	@param {Integer} value
  	@return {void}
  */


  layoutFrame.prototype.setY = function() {
    var value;
    value = arguments[0];
    return this._y = value;
  };

  return layoutFrame;

}).call(this, fm.object);


/*<span id='cls-fm.icelink.webrtc.conferenceExtensions'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.conferenceExtensions
 <div>
 Extension methods for <see cref="fm.icelink.conference">fm.icelink.conference</see> instances.
 </div>
*/

fm.icelink.webrtc.conferenceExtensions = (function() {

  function conferenceExtensions() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      conferenceExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
  }

  /*<span id='method-fm.icelink.webrtc.conferenceExtensions-sendData'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a data channel packet to one of the conference's connected peers.
  	 </div>
  	@function sendData
  	@param {fm.icelink.conference} conference The conference.
  	@param {fm.icelink.webrtc.dataChannelInfo} channelInfo The data channel description.
  	@param {String} data The data to send.
  	@param {String} peerId The peer ID to target.
  	@return {Integer} The number of bytes sent, or -1 if the send operation failed.
  */


  conferenceExtensions.sendData = function() {
    var channelInfo, conference, data, link, links, map, peerId, _i, _len, _var0;
    if (arguments.length === 4) {
      conference = arguments[0];
      channelInfo = arguments[1];
      data = arguments[2];
      peerId = arguments[3];
      link = conference.getLink(peerId);
      _var0 = link;
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        return fm.icelink.webrtc.linkExtensions.sendData(link, channelInfo, data);
      }
      return -1;
      return;
    }
    if (arguments.length === 3) {
      conference = arguments[0];
      channelInfo = arguments[1];
      data = arguments[2];
      links = conference.getLinks();
      map = {};
      _var0 = links;
      for (_i = 0, _len = _var0.length; _i < _len; _i++) {
        link = _var0[_i];
        map[link.getPeerId()] = fm.icelink.webrtc.linkExtensions.sendData(link, channelInfo, data);
      }
      return map;
    }
  };

  /*<span id='method-fm.icelink.webrtc.conferenceExtensions-sendData'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a data channel packet to one of the conference's connected peers.
  	 </div>
  	@function sendData
  	@param {fm.icelink.webrtc.dataChannelInfo} channelInfo The data channel description.
  	@param {String} data The data to send.
  	@param {String} peerId The peer ID to target.
  	@return {Integer} The number of bytes sent, or -1 if the send operation failed.
  */


  fm.icelink.conference.prototype.sendData = function() {
    var channelInfo, data, peerId;
    if (arguments.length === 3) {
      channelInfo = arguments[0];
      data = arguments[1];
      peerId = arguments[2];
      Array.prototype.splice.call(arguments, 0, 0, this);
      return fm.icelink.webrtc.conferenceExtensions.sendData.apply(this, arguments);
      return;
    }
    if (arguments.length === 2) {
      channelInfo = arguments[0];
      data = arguments[1];
      Array.prototype.splice.call(arguments, 0, 0, this);
      return fm.icelink.webrtc.conferenceExtensions.sendData.apply(this, arguments);
    }
  };

  return conferenceExtensions;

}).call(this);


/*<span id='cls-fm.icelink.webrtc.layoutPreset'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutPreset
 <div>
 A layout preset.
 </div>

@extends fm.dynamic
*/


fm.icelink.webrtc.layoutPreset = (function(_super) {

  __extends(layoutPreset, _super);

  layoutPreset.prototype.__blockHeight = 0;

  layoutPreset.prototype.__blockHeightPercent = 0.0;

  layoutPreset.prototype.__blockMarginX = 0;

  layoutPreset.prototype.__blockMarginXPercent = 0.0;

  layoutPreset.prototype.__blockMarginY = 0;

  layoutPreset.prototype.__blockMarginYPercent = 0.0;

  layoutPreset.prototype.__blockWidth = 0;

  layoutPreset.prototype.__blockWidthPercent = 0.0;

  layoutPreset.prototype.__floatHeight = 0;

  layoutPreset.prototype.__floatHeightPercent = 0.0;

  layoutPreset.prototype.__floatMarginX = 0;

  layoutPreset.prototype.__floatMarginXPercent = 0.0;

  layoutPreset.prototype.__floatMarginY = 0;

  layoutPreset.prototype.__floatMarginYPercent = 0.0;

  layoutPreset.prototype.__floatWidth = 0;

  layoutPreset.prototype.__floatWidthPercent = 0.0;

  layoutPreset.prototype._alignment = null;

  layoutPreset.prototype._direction = null;

  layoutPreset.prototype._inlineMargin = 0;

  layoutPreset.prototype._mode = null;

  /*<span id='method-fm.icelink.webrtc.layoutPreset-fm.icelink.webrtc.layoutPreset'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.webrtc.layoutPreset">fm.icelink.webrtc.layoutPreset</see> class.
  	 </div>
  
  	@function fm.icelink.webrtc.layoutPreset
  	@return {}
  */


  function layoutPreset() {
    this.setPreviewSize = __bind(this.setPreviewSize, this);

    this.setPreviewPadding = __bind(this.setPreviewPadding, this);

    this.setPreviewMode = __bind(this.setPreviewMode, this);

    this.setPreviewAlignment = __bind(this.setPreviewAlignment, this);

    this.setMode = __bind(this.setMode, this);

    this.setInlineMargin = __bind(this.setInlineMargin, this);

    this.setFloatWidthPercent = __bind(this.setFloatWidthPercent, this);

    this.setFloatWidth = __bind(this.setFloatWidth, this);

    this.setFloatMarginYPercent = __bind(this.setFloatMarginYPercent, this);

    this.setFloatMarginY = __bind(this.setFloatMarginY, this);

    this.setFloatMarginXPercent = __bind(this.setFloatMarginXPercent, this);

    this.setFloatMarginX = __bind(this.setFloatMarginX, this);

    this.setFloatHeightPercent = __bind(this.setFloatHeightPercent, this);

    this.setFloatHeight = __bind(this.setFloatHeight, this);

    this.setDirection = __bind(this.setDirection, this);

    this.setCellMargin = __bind(this.setCellMargin, this);

    this.setBlockWidthPercent = __bind(this.setBlockWidthPercent, this);

    this.setBlockWidth = __bind(this.setBlockWidth, this);

    this.setBlockMarginYPercent = __bind(this.setBlockMarginYPercent, this);

    this.setBlockMarginY = __bind(this.setBlockMarginY, this);

    this.setBlockMarginXPercent = __bind(this.setBlockMarginXPercent, this);

    this.setBlockMarginX = __bind(this.setBlockMarginX, this);

    this.setBlockHeightPercent = __bind(this.setBlockHeightPercent, this);

    this.setBlockHeight = __bind(this.setBlockHeight, this);

    this.setAlignment = __bind(this.setAlignment, this);

    this.getPreviewSize = __bind(this.getPreviewSize, this);

    this.getPreviewPadding = __bind(this.getPreviewPadding, this);

    this.getPreviewMode = __bind(this.getPreviewMode, this);

    this.getPreviewAlignment = __bind(this.getPreviewAlignment, this);

    this.getMode = __bind(this.getMode, this);

    this.getInlineMargin = __bind(this.getInlineMargin, this);

    this.getFloatWidthPercent = __bind(this.getFloatWidthPercent, this);

    this.getFloatWidth = __bind(this.getFloatWidth, this);

    this.getFloatMarginYPercent = __bind(this.getFloatMarginYPercent, this);

    this.getFloatMarginY = __bind(this.getFloatMarginY, this);

    this.getFloatMarginXPercent = __bind(this.getFloatMarginXPercent, this);

    this.getFloatMarginX = __bind(this.getFloatMarginX, this);

    this.getFloatHeightPercent = __bind(this.getFloatHeightPercent, this);

    this.getFloatHeight = __bind(this.getFloatHeight, this);

    this.getDirection = __bind(this.getDirection, this);

    this.getCellMargin = __bind(this.getCellMargin, this);

    this.getBlockWidthPercent = __bind(this.getBlockWidthPercent, this);

    this.getBlockWidth = __bind(this.getBlockWidth, this);

    this.getBlockMarginYPercent = __bind(this.getBlockMarginYPercent, this);

    this.getBlockMarginY = __bind(this.getBlockMarginY, this);

    this.getBlockMarginXPercent = __bind(this.getBlockMarginXPercent, this);

    this.getBlockMarginX = __bind(this.getBlockMarginX, this);

    this.getBlockHeightPercent = __bind(this.getBlockHeightPercent, this);

    this.getBlockHeight = __bind(this.getBlockHeight, this);

    this.getAlignment = __bind(this.getAlignment, this);

    this.copyToPreset = __bind(this.copyToPreset, this);

    this.applyPreset = __bind(this.applyPreset, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      layoutPreset.__super__.constructor.call(this);
      this.__floatWidthPercent = 0;
      this.__floatHeightPercent = 0;
      this.__floatMarginXPercent = 0;
      this.__floatMarginYPercent = 0;
      this.__floatWidth = 0;
      this.__floatHeight = 0;
      this.__floatMarginX = 0;
      this.__floatMarginY = 0;
      this.__blockWidthPercent = 0;
      this.__blockHeightPercent = 0;
      this.__blockMarginXPercent = 0;
      this.__blockMarginYPercent = 0;
      this.__blockWidth = 0;
      this.__blockHeight = 0;
      this.__blockMarginX = 0;
      this.__blockMarginY = 0;
      this.setMode(fm.icelink.webrtc.layoutMode.FloatLocal);
      this.setDirection(fm.icelink.webrtc.layoutDirection.Horizontal);
      this.setAlignment(fm.icelink.webrtc.layoutAlignment.BottomRight);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    layoutPreset.__super__.constructor.call(this);
    this.__floatWidthPercent = 0;
    this.__floatHeightPercent = 0;
    this.__floatMarginXPercent = 0;
    this.__floatMarginYPercent = 0;
    this.__floatWidth = 0;
    this.__floatHeight = 0;
    this.__floatMarginX = 0;
    this.__floatMarginY = 0;
    this.__blockWidthPercent = 0;
    this.__blockHeightPercent = 0;
    this.__blockMarginXPercent = 0;
    this.__blockMarginYPercent = 0;
    this.__blockWidth = 0;
    this.__blockHeight = 0;
    this.__blockMarginX = 0;
    this.__blockMarginY = 0;
    this.setMode(fm.icelink.webrtc.layoutMode.FloatLocal);
    this.setDirection(fm.icelink.webrtc.layoutDirection.Horizontal);
    this.setAlignment(fm.icelink.webrtc.layoutAlignment.BottomRight);
  }

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getFacetime'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a Facetime-style layout preset.
  	 </div>
  
  	@function getFacetime
  	@return {fm.icelink.webrtc.layoutPreset}
  */


  layoutPreset.getFacetime = function() {
    var preset;
    preset = new fm.icelink.webrtc.layoutPreset();
    preset.setMode(fm.icelink.webrtc.layoutMode.FloatLocal);
    preset.setAlignment(fm.icelink.webrtc.layoutAlignment.BottomRight);
    preset.setFloatMarginX(10);
    preset.setFloatMarginY(10);
    preset.setFloatWidthPercent(0.25);
    preset.setFloatHeightPercent(0.25);
    preset.setInlineMargin(0);
    return preset;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getGoogleHangouts'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a Google Hangouts-style layout preset.
  	 Note that this will present differently
  	 on mobile devices.
  	 </div>
  
  	@function getGoogleHangouts
  	@return {fm.icelink.webrtc.layoutPreset}
  */


  layoutPreset.getGoogleHangouts = function() {
    var preset, preset2;
    if (fm.icelink.webrtc.defaultProviders.isMobile()) {
      preset = new fm.icelink.webrtc.layoutPreset();
      preset.setMode(fm.icelink.webrtc.layoutMode.FloatRemote);
      preset.setAlignment(fm.icelink.webrtc.layoutAlignment.BottomRight);
      preset.setFloatMarginX(0);
      preset.setFloatMarginY(10);
      preset.setFloatWidthPercent(0.25);
      preset.setFloatHeightPercent(0.25);
      preset.setInlineMargin(5);
      return preset;
    }
    preset2 = new fm.icelink.webrtc.layoutPreset();
    preset2.setMode(fm.icelink.webrtc.layoutMode.Block);
    preset2.setAlignment(fm.icelink.webrtc.layoutAlignment.Top);
    preset2.setBlockWidthPercent(0.666666666666667);
    preset2.setBlockHeightPercent(0.666666666666667);
    preset2.setInlineMargin(0);
    return preset2;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getSkype'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a Skype-style layout preset.
  	 Note that this will present differently
  	 on mobile devices.
  	 </div>
  
  	@function getSkype
  	@return {fm.icelink.webrtc.layoutPreset}
  */


  layoutPreset.getSkype = function() {
    var preset;
    if (fm.icelink.webrtc.defaultProviders.isMobile()) {
      return fm.icelink.webrtc.layoutPreset.getFacetime();
    }
    preset = new fm.icelink.webrtc.layoutPreset();
    preset.setMode(fm.icelink.webrtc.layoutMode.Block);
    preset.setDirection(fm.icelink.webrtc.layoutDirection.Horizontal);
    preset.setAlignment(fm.icelink.webrtc.layoutAlignment.Bottom);
    preset.setBlockMarginX(10);
    preset.setBlockMarginY(10);
    preset.setBlockWidthPercent(0.333333333333333);
    preset.setBlockHeightPercent(0.333333333333333);
    preset.setInlineMargin(10);
    return preset;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-applyPreset'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Applies a preset.
  	 </div>
  	@function applyPreset
  	@param {fm.icelink.webrtc.layoutPreset} preset The preset to apply.
  	@return {void}
  */


  layoutPreset.prototype.applyPreset = function() {
    var preset;
    preset = arguments[0];
    this.setMode(preset.getMode());
    this.setDirection(preset.getDirection());
    this.setAlignment(preset.getAlignment());
    this.setFloatWidth(0);
    this.setFloatHeight(0);
    this.setFloatMarginX(0);
    this.setFloatMarginY(0);
    this.setFloatWidthPercent(0);
    this.setFloatHeightPercent(0);
    this.setFloatMarginXPercent(0);
    this.setFloatMarginYPercent(0);
    this.setBlockWidth(0);
    this.setBlockHeight(0);
    this.setBlockMarginX(0);
    this.setBlockMarginY(0);
    this.setBlockWidthPercent(0);
    this.setBlockHeightPercent(0);
    this.setBlockMarginXPercent(0);
    this.setBlockMarginYPercent(0);
    this.setInlineMargin(0);
    if (preset.getFloatWidth() > 0) {
      this.setFloatWidth(preset.getFloatWidth());
    }
    if (preset.getFloatHeight() > 0) {
      this.setFloatHeight(preset.getFloatHeight());
    }
    if (preset.getFloatMarginX() > 0) {
      this.setFloatMarginX(preset.getFloatMarginX());
    }
    if (preset.getFloatMarginY() > 0) {
      this.setFloatMarginY(preset.getFloatMarginY());
    }
    if (preset.getFloatWidthPercent() > 0) {
      this.setFloatWidthPercent(preset.getFloatWidthPercent());
    }
    if (preset.getFloatHeightPercent() > 0) {
      this.setFloatHeightPercent(preset.getFloatHeightPercent());
    }
    if (preset.getFloatMarginXPercent() > 0) {
      this.setFloatMarginXPercent(preset.getFloatMarginXPercent());
    }
    if (preset.getFloatMarginYPercent() > 0) {
      this.setFloatMarginYPercent(preset.getFloatMarginYPercent());
    }
    if (preset.getBlockWidth() > 0) {
      this.setBlockWidth(preset.getBlockWidth());
    }
    if (preset.getBlockHeight() > 0) {
      this.setBlockHeight(preset.getBlockHeight());
    }
    if (preset.getBlockMarginX() > 0) {
      this.setBlockMarginX(preset.getBlockMarginX());
    }
    if (preset.getBlockMarginY() > 0) {
      this.setBlockMarginY(preset.getBlockMarginY());
    }
    if (preset.getBlockWidthPercent() > 0) {
      this.setBlockWidthPercent(preset.getBlockWidthPercent());
    }
    if (preset.getBlockHeightPercent() > 0) {
      this.setBlockHeightPercent(preset.getBlockHeightPercent());
    }
    if (preset.getBlockMarginXPercent() > 0) {
      this.setBlockMarginXPercent(preset.getBlockMarginXPercent());
    }
    if (preset.getBlockMarginYPercent() > 0) {
      this.setBlockMarginYPercent(preset.getBlockMarginYPercent());
    }
    if (preset.getInlineMargin() > 0) {
      return this.setInlineMargin(preset.getInlineMargin());
    }
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-copyToPreset'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Copies this preset's properties to another preset.
  	 </div>
  	@function copyToPreset
  	@param {fm.icelink.webrtc.layoutPreset} preset The target preset.
  	@return {void}
  */


  layoutPreset.prototype.copyToPreset = function() {
    var preset;
    preset = arguments[0];
    preset.setMode(this.getMode());
    preset.setDirection(this.getDirection());
    preset.setAlignment(this.getAlignment());
    preset.setFloatWidth(0);
    preset.setFloatHeight(0);
    preset.setFloatMarginX(0);
    preset.setFloatMarginY(0);
    preset.setFloatWidthPercent(0);
    preset.setFloatHeightPercent(0);
    preset.setFloatMarginXPercent(0);
    preset.setFloatMarginYPercent(0);
    preset.setBlockWidth(0);
    preset.setBlockHeight(0);
    preset.setBlockMarginX(0);
    preset.setBlockMarginY(0);
    preset.setBlockWidthPercent(0);
    preset.setBlockHeightPercent(0);
    preset.setBlockMarginXPercent(0);
    preset.setBlockMarginYPercent(0);
    preset.setInlineMargin(0);
    if (this.getFloatWidth() > 0) {
      preset.setFloatWidth(this.getFloatWidth());
    }
    if (this.getFloatHeight() > 0) {
      preset.setFloatHeight(this.getFloatHeight());
    }
    if (this.getFloatMarginX() > 0) {
      preset.setFloatMarginX(this.getFloatMarginX());
    }
    if (this.getFloatMarginY() > 0) {
      preset.setFloatMarginY(this.getFloatMarginY());
    }
    if (this.getFloatWidthPercent() > 0) {
      preset.setFloatWidthPercent(this.getFloatWidthPercent());
    }
    if (this.getFloatHeightPercent() > 0) {
      preset.setFloatHeightPercent(this.getFloatHeightPercent());
    }
    if (this.getFloatMarginXPercent() > 0) {
      preset.setFloatMarginXPercent(this.getFloatMarginXPercent());
    }
    if (this.getFloatMarginYPercent() > 0) {
      preset.setFloatMarginYPercent(this.getFloatMarginYPercent());
    }
    if (this.getBlockWidth() > 0) {
      preset.setBlockWidth(this.getBlockWidth());
    }
    if (this.getBlockHeight() > 0) {
      preset.setBlockHeight(this.getBlockHeight());
    }
    if (this.getBlockMarginX() > 0) {
      preset.setBlockMarginX(this.getBlockMarginX());
    }
    if (this.getBlockMarginY() > 0) {
      preset.setBlockMarginY(this.getBlockMarginY());
    }
    if (this.getBlockWidthPercent() > 0) {
      preset.setBlockWidthPercent(this.getBlockWidthPercent());
    }
    if (this.getBlockHeightPercent() > 0) {
      preset.setBlockHeightPercent(this.getBlockHeightPercent());
    }
    if (this.getBlockMarginXPercent() > 0) {
      preset.setBlockMarginXPercent(this.getBlockMarginXPercent());
    }
    if (this.getBlockMarginYPercent() > 0) {
      preset.setBlockMarginYPercent(this.getBlockMarginYPercent());
    }
    if (this.getInlineMargin() > 0) {
      return preset.setInlineMargin(this.getInlineMargin());
    }
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getAlignment'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the alignment of the layout.
  	 Defaults to <see cref="fm.icelink.webrtc.layoutAlignment.BottomRight">fm.icelink.webrtc.layoutAlignment.BottomRight</see>.
  	 </div>
  
  	@function getAlignment
  	@return {fm.icelink.webrtc.layoutAlignment}
  */


  layoutPreset.prototype.getAlignment = function() {
    return this._alignment;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getBlockHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the height of block elements in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockHeightPercent">fm.icelink.webrtc.layoutPreset.blockHeightPercent</see>.
  	 </div>
  
  	@function getBlockHeight
  	@return {Integer}
  */


  layoutPreset.prototype.getBlockHeight = function() {
    return this.__blockHeight;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getBlockHeightPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the height of block elements as a percent
  	 of the container height between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockHeight">fm.icelink.webrtc.layoutPreset.blockHeight</see>.
  	 </div>
  
  	@function getBlockHeightPercent
  	@return {Decimal}
  */


  layoutPreset.prototype.getBlockHeightPercent = function() {
    return this.__blockHeightPercent;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getBlockMarginX'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the X-margin between block elements and the layout
  	 edge in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockMarginXPercent">fm.icelink.webrtc.layoutPreset.blockMarginXPercent</see>.
  	 </div>
  
  	@function getBlockMarginX
  	@return {Integer}
  */


  layoutPreset.prototype.getBlockMarginX = function() {
    return this.__blockMarginX;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getBlockMarginXPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the X-margin between block elements and the layout
  	 edge as a percent of the container width between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockMarginX">fm.icelink.webrtc.layoutPreset.blockMarginX</see>.
  	 </div>
  
  	@function getBlockMarginXPercent
  	@return {Decimal}
  */


  layoutPreset.prototype.getBlockMarginXPercent = function() {
    return this.__blockMarginXPercent;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getBlockMarginY'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the Y-margin between block elements and the layout
  	 edge in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockMarginYPercent">fm.icelink.webrtc.layoutPreset.blockMarginYPercent</see>.
  	 </div>
  
  	@function getBlockMarginY
  	@return {Integer}
  */


  layoutPreset.prototype.getBlockMarginY = function() {
    return this.__blockMarginY;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getBlockMarginYPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the Y-margin between block elements and the layout
  	 edge as a percent of the container height between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockMarginY">fm.icelink.webrtc.layoutPreset.blockMarginY</see>.
  	 </div>
  
  	@function getBlockMarginYPercent
  	@return {Decimal}
  */


  layoutPreset.prototype.getBlockMarginYPercent = function() {
    return this.__blockMarginYPercent;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getBlockWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the width of block elements in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockWidthPercent">fm.icelink.webrtc.layoutPreset.blockWidthPercent</see>.
  	 </div>
  
  	@function getBlockWidth
  	@return {Integer}
  */


  layoutPreset.prototype.getBlockWidth = function() {
    return this.__blockWidth;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getBlockWidthPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the width of block elements as a percent
  	 of the container width between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockWidth">fm.icelink.webrtc.layoutPreset.blockWidth</see>.
  	 </div>
  
  	@function getBlockWidthPercent
  	@return {Decimal}
  */


  layoutPreset.prototype.getBlockWidthPercent = function() {
    return this.__blockWidthPercent;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getCellMargin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the size of the margin in pixels
  	 to use between cells.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.inlineMargin">fm.icelink.webrtc.layoutPreset.inlineMargin</see> instead.
  	 </div>
  
  	@function getCellMargin
  	@return {Integer}
  */


  layoutPreset.prototype.getCellMargin = function() {
    return this.getInlineMargin();
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getDirection'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the direction of the layout flow.
  	 Defaults to <see cref="fm.icelink.webrtc.layoutDirection.Horizontal">fm.icelink.webrtc.layoutDirection.Horizontal</see>.
  	 </div>
  
  	@function getDirection
  	@return {fm.icelink.webrtc.layoutDirection}
  */


  layoutPreset.prototype.getDirection = function() {
    return this._direction;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getFloatHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the height of floating elements in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatHeightPercent">fm.icelink.webrtc.layoutPreset.floatHeightPercent</see>.
  	 </div>
  
  	@function getFloatHeight
  	@return {Integer}
  */


  layoutPreset.prototype.getFloatHeight = function() {
    return this.__floatHeight;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getFloatHeightPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the height of floating elements as a percent
  	 of the container height between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatHeight">fm.icelink.webrtc.layoutPreset.floatHeight</see>.
  	 </div>
  
  	@function getFloatHeightPercent
  	@return {Decimal}
  */


  layoutPreset.prototype.getFloatHeightPercent = function() {
    return this.__floatHeightPercent;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getFloatMarginX'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the X-margin between floating elements and the layout
  	 edge in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatMarginXPercent">fm.icelink.webrtc.layoutPreset.floatMarginXPercent</see>.
  	 </div>
  
  	@function getFloatMarginX
  	@return {Integer}
  */


  layoutPreset.prototype.getFloatMarginX = function() {
    return this.__floatMarginX;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getFloatMarginXPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the X-margin between floating elements and the layout
  	 edge as a percent of the container width between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatMarginX">fm.icelink.webrtc.layoutPreset.floatMarginX</see>.
  	 </div>
  
  	@function getFloatMarginXPercent
  	@return {Decimal}
  */


  layoutPreset.prototype.getFloatMarginXPercent = function() {
    return this.__floatMarginXPercent;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getFloatMarginY'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the Y-margin between floating elements and the layout
  	 edge in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatMarginYPercent">fm.icelink.webrtc.layoutPreset.floatMarginYPercent</see>.
  	 </div>
  
  	@function getFloatMarginY
  	@return {Integer}
  */


  layoutPreset.prototype.getFloatMarginY = function() {
    return this.__floatMarginY;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getFloatMarginYPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the Y-margin between floating elements and the layout
  	 edge as a percent of the container height between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatMarginY">fm.icelink.webrtc.layoutPreset.floatMarginY</see>.
  	 </div>
  
  	@function getFloatMarginYPercent
  	@return {Decimal}
  */


  layoutPreset.prototype.getFloatMarginYPercent = function() {
    return this.__floatMarginYPercent;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getFloatWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the width of floating elements in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatWidthPercent">fm.icelink.webrtc.layoutPreset.floatWidthPercent</see>.
  	 </div>
  
  	@function getFloatWidth
  	@return {Integer}
  */


  layoutPreset.prototype.getFloatWidth = function() {
    return this.__floatWidth;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getFloatWidthPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the width of floating elements as a percent
  	 of the container width between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatWidth">fm.icelink.webrtc.layoutPreset.floatWidth</see>.
  	 </div>
  
  	@function getFloatWidthPercent
  	@return {Decimal}
  */


  layoutPreset.prototype.getFloatWidthPercent = function() {
    return this.__floatWidthPercent;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getInlineMargin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the size of the margin in pixels to use
  	 between inline elements.
  	 </div>
  
  	@function getInlineMargin
  	@return {Integer}
  */


  layoutPreset.prototype.getInlineMargin = function() {
    return this._inlineMargin;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the mode used by the layout engine.
  	 Defaults to <see cref="fm.icelink.webrtc.layoutMode.FloatLocal">fm.icelink.webrtc.layoutMode.FloatLocal</see>.
  	 </div>
  
  	@function getMode
  	@return {fm.icelink.webrtc.layoutMode}
  */


  layoutPreset.prototype.getMode = function() {
    return this._mode;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getPreviewAlignment'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the desired preview alignment.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.alignment">fm.icelink.webrtc.layoutPreset.alignment</see> instead.
  	 </div>
  
  	@function getPreviewAlignment
  	@return {fm.icelink.webrtc.layoutAlignment}
  */


  layoutPreset.prototype.getPreviewAlignment = function() {
    return this.getAlignment();
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getPreviewMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the desired preview mode.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.mode">fm.icelink.webrtc.layoutPreset.mode</see> instead.
  	 </div>
  
  	@function getPreviewMode
  	@return {fm.icelink.webrtc.layoutMode}
  */


  layoutPreset.prototype.getPreviewMode = function() {
    return this.getMode();
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getPreviewPadding'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the amount of padding in pixels
  	 to use between the preview and the layout edge.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatMarginX">fm.icelink.webrtc.layoutPreset.floatMarginX</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatMarginY">fm.icelink.webrtc.layoutPreset.floatMarginY</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatMarginXPercent">fm.icelink.webrtc.layoutPreset.floatMarginXPercent</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatMarginYPercent">fm.icelink.webrtc.layoutPreset.floatMarginYPercent</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockMarginX">fm.icelink.webrtc.layoutPreset.blockMarginX</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockMarginY">fm.icelink.webrtc.layoutPreset.blockMarginY</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockMarginXPercent">fm.icelink.webrtc.layoutPreset.blockMarginXPercent</see>, and/or
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockMarginYPercent">fm.icelink.webrtc.layoutPreset.blockMarginYPercent</see> instead.
  	 </div>
  
  	@function getPreviewPadding
  	@return {Integer}
  */


  layoutPreset.prototype.getPreviewPadding = function() {
    return this.getFloatMarginX();
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-getPreviewSize'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the preview size as a percent of the
  	 container size when remote videos are present. For
  	 example, a value of 0.5 will cover half the container.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatWidth">fm.icelink.webrtc.layoutPreset.floatWidth</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatHeight">fm.icelink.webrtc.layoutPreset.floatHeight</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatWidthPercent">fm.icelink.webrtc.layoutPreset.floatWidthPercent</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatHeightPercent">fm.icelink.webrtc.layoutPreset.floatHeightPercent</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockWidth">fm.icelink.webrtc.layoutPreset.blockWidth</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockHeight">fm.icelink.webrtc.layoutPreset.blockHeight</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockWidthPercent">fm.icelink.webrtc.layoutPreset.blockWidthPercent</see>, and/or
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockHeightPercent">fm.icelink.webrtc.layoutPreset.blockHeightPercent</see> instead.
  	 </div>
  
  	@function getPreviewSize
  	@return {Decimal}
  */


  layoutPreset.prototype.getPreviewSize = function() {
    return this.getFloatWidthPercent();
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setAlignment'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the alignment of the layout.
  	 Defaults to <see cref="fm.icelink.webrtc.layoutAlignment.BottomRight">fm.icelink.webrtc.layoutAlignment.BottomRight</see>.
  	 </div>
  
  	@function setAlignment
  	@param {fm.icelink.webrtc.layoutAlignment} value
  	@return {void}
  */


  layoutPreset.prototype.setAlignment = function() {
    var value;
    value = arguments[0];
    return this._alignment = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setBlockHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the height of block elements in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockHeightPercent">fm.icelink.webrtc.layoutPreset.blockHeightPercent</see>.
  	 </div>
  
  	@function setBlockHeight
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setBlockHeight = function() {
    var value;
    value = arguments[0];
    this.__blockHeight = value;
    return this.__blockHeightPercent = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setBlockHeightPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the height of block elements as a percent
  	 of the container height between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockHeight">fm.icelink.webrtc.layoutPreset.blockHeight</see>.
  	 </div>
  
  	@function setBlockHeightPercent
  	@param {Decimal} value
  	@return {void}
  */


  layoutPreset.prototype.setBlockHeightPercent = function() {
    var value;
    value = arguments[0];
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this.__blockHeightPercent = value;
    return this.__blockHeight = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setBlockMarginX'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the X-margin between block elements and the layout
  	 edge in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockMarginXPercent">fm.icelink.webrtc.layoutPreset.blockMarginXPercent</see>.
  	 </div>
  
  	@function setBlockMarginX
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setBlockMarginX = function() {
    var value;
    value = arguments[0];
    this.__blockMarginX = value;
    return this.__blockMarginXPercent = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setBlockMarginXPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the X-margin between block elements and the layout
  	 edge as a percent of the container width between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockMarginX">fm.icelink.webrtc.layoutPreset.blockMarginX</see>.
  	 </div>
  
  	@function setBlockMarginXPercent
  	@param {Decimal} value
  	@return {void}
  */


  layoutPreset.prototype.setBlockMarginXPercent = function() {
    var value;
    value = arguments[0];
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this.__blockMarginXPercent = value;
    return this.__blockMarginX = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setBlockMarginY'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the Y-margin between block elements and the layout
  	 edge in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockMarginYPercent">fm.icelink.webrtc.layoutPreset.blockMarginYPercent</see>.
  	 </div>
  
  	@function setBlockMarginY
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setBlockMarginY = function() {
    var value;
    value = arguments[0];
    this.__blockMarginY = value;
    return this.__blockMarginYPercent = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setBlockMarginYPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the Y-margin between block elements and the layout
  	 edge as a percent of the container height between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockMarginY">fm.icelink.webrtc.layoutPreset.blockMarginY</see>.
  	 </div>
  
  	@function setBlockMarginYPercent
  	@param {Decimal} value
  	@return {void}
  */


  layoutPreset.prototype.setBlockMarginYPercent = function() {
    var value;
    value = arguments[0];
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this.__blockMarginYPercent = value;
    return this.__blockMarginY = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setBlockWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the width of block elements in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockWidthPercent">fm.icelink.webrtc.layoutPreset.blockWidthPercent</see>.
  	 </div>
  
  	@function setBlockWidth
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setBlockWidth = function() {
    var value;
    value = arguments[0];
    this.__blockWidth = value;
    return this.__blockWidthPercent = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setBlockWidthPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the width of block elements as a percent
  	 of the container width between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.blockWidth">fm.icelink.webrtc.layoutPreset.blockWidth</see>.
  	 </div>
  
  	@function setBlockWidthPercent
  	@param {Decimal} value
  	@return {void}
  */


  layoutPreset.prototype.setBlockWidthPercent = function() {
    var value;
    value = arguments[0];
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this.__blockWidthPercent = value;
    return this.__blockWidth = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setCellMargin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the size of the margin in pixels
  	 to use between cells.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.inlineMargin">fm.icelink.webrtc.layoutPreset.inlineMargin</see> instead.
  	 </div>
  
  	@function setCellMargin
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setCellMargin = function() {
    var value;
    value = arguments[0];
    return this.setInlineMargin(value);
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setDirection'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the direction of the layout flow.
  	 Defaults to <see cref="fm.icelink.webrtc.layoutDirection.Horizontal">fm.icelink.webrtc.layoutDirection.Horizontal</see>.
  	 </div>
  
  	@function setDirection
  	@param {fm.icelink.webrtc.layoutDirection} value
  	@return {void}
  */


  layoutPreset.prototype.setDirection = function() {
    var value;
    value = arguments[0];
    return this._direction = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setFloatHeight'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the height of floating elements in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatHeightPercent">fm.icelink.webrtc.layoutPreset.floatHeightPercent</see>.
  	 </div>
  
  	@function setFloatHeight
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setFloatHeight = function() {
    var value;
    value = arguments[0];
    this.__floatHeight = value;
    return this.__floatHeightPercent = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setFloatHeightPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the height of floating elements as a percent
  	 of the container height between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatHeight">fm.icelink.webrtc.layoutPreset.floatHeight</see>.
  	 </div>
  
  	@function setFloatHeightPercent
  	@param {Decimal} value
  	@return {void}
  */


  layoutPreset.prototype.setFloatHeightPercent = function() {
    var value;
    value = arguments[0];
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this.__floatHeightPercent = value;
    return this.__floatHeight = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setFloatMarginX'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the X-margin between floating elements and the layout
  	 edge in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatMarginXPercent">fm.icelink.webrtc.layoutPreset.floatMarginXPercent</see>.
  	 </div>
  
  	@function setFloatMarginX
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setFloatMarginX = function() {
    var value;
    value = arguments[0];
    this.__floatMarginX = value;
    return this.__floatMarginXPercent = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setFloatMarginXPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the X-margin between floating elements and the layout
  	 edge as a percent of the container width between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatMarginX">fm.icelink.webrtc.layoutPreset.floatMarginX</see>.
  	 </div>
  
  	@function setFloatMarginXPercent
  	@param {Decimal} value
  	@return {void}
  */


  layoutPreset.prototype.setFloatMarginXPercent = function() {
    var value;
    value = arguments[0];
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this.__floatMarginXPercent = value;
    return this.__floatMarginX = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setFloatMarginY'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the Y-margin between floating elements and the layout
  	 edge in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatMarginYPercent">fm.icelink.webrtc.layoutPreset.floatMarginYPercent</see>.
  	 </div>
  
  	@function setFloatMarginY
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setFloatMarginY = function() {
    var value;
    value = arguments[0];
    this.__floatMarginY = value;
    return this.__floatMarginYPercent = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setFloatMarginYPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the Y-margin between floating elements and the layout
  	 edge as a percent of the container height between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatMarginY">fm.icelink.webrtc.layoutPreset.floatMarginY</see>.
  	 </div>
  
  	@function setFloatMarginYPercent
  	@param {Decimal} value
  	@return {void}
  */


  layoutPreset.prototype.setFloatMarginYPercent = function() {
    var value;
    value = arguments[0];
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this.__floatMarginYPercent = value;
    return this.__floatMarginY = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setFloatWidth'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the width of floating elements in pixels.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatWidthPercent">fm.icelink.webrtc.layoutPreset.floatWidthPercent</see>.
  	 </div>
  
  	@function setFloatWidth
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setFloatWidth = function() {
    var value;
    value = arguments[0];
    this.__floatWidth = value;
    return this.__floatWidthPercent = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setFloatWidthPercent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the width of floating elements as a percent
  	 of the container width between 0.0 and 1.0.
  	 Overrides <see cref="fm.icelink.webrtc.layoutPreset.floatWidth">fm.icelink.webrtc.layoutPreset.floatWidth</see>.
  	 </div>
  
  	@function setFloatWidthPercent
  	@param {Decimal} value
  	@return {void}
  */


  layoutPreset.prototype.setFloatWidthPercent = function() {
    var value;
    value = arguments[0];
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this.__floatWidthPercent = value;
    return this.__floatWidth = 0;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setInlineMargin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the size of the margin in pixels to use
  	 between inline elements.
  	 </div>
  
  	@function setInlineMargin
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setInlineMargin = function() {
    var value;
    value = arguments[0];
    return this._inlineMargin = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the mode used by the layout engine.
  	 Defaults to <see cref="fm.icelink.webrtc.layoutMode.FloatLocal">fm.icelink.webrtc.layoutMode.FloatLocal</see>.
  	 </div>
  
  	@function setMode
  	@param {fm.icelink.webrtc.layoutMode} value
  	@return {void}
  */


  layoutPreset.prototype.setMode = function() {
    var value;
    value = arguments[0];
    return this._mode = value;
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setPreviewAlignment'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the desired preview alignment.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.alignment">fm.icelink.webrtc.layoutPreset.alignment</see> instead.
  	 </div>
  
  	@function setPreviewAlignment
  	@param {fm.icelink.webrtc.layoutAlignment} value
  	@return {void}
  */


  layoutPreset.prototype.setPreviewAlignment = function() {
    var value;
    value = arguments[0];
    return this.setAlignment(value);
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setPreviewMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the desired preview mode.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.mode">fm.icelink.webrtc.layoutPreset.mode</see> instead.
  	 </div>
  
  	@function setPreviewMode
  	@param {fm.icelink.webrtc.layoutMode} value
  	@return {void}
  */


  layoutPreset.prototype.setPreviewMode = function() {
    var value;
    value = arguments[0];
    return this.setMode(value);
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setPreviewPadding'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the amount of padding in pixels
  	 to use between the preview and the layout edge.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatMarginX">fm.icelink.webrtc.layoutPreset.floatMarginX</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatMarginY">fm.icelink.webrtc.layoutPreset.floatMarginY</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatMarginXPercent">fm.icelink.webrtc.layoutPreset.floatMarginXPercent</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatMarginYPercent">fm.icelink.webrtc.layoutPreset.floatMarginYPercent</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockMarginX">fm.icelink.webrtc.layoutPreset.blockMarginX</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockMarginY">fm.icelink.webrtc.layoutPreset.blockMarginY</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockMarginXPercent">fm.icelink.webrtc.layoutPreset.blockMarginXPercent</see>, and/or
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockMarginYPercent">fm.icelink.webrtc.layoutPreset.blockMarginYPercent</see> instead.
  	 </div>
  
  	@function setPreviewPadding
  	@param {Integer} value
  	@return {void}
  */


  layoutPreset.prototype.setPreviewPadding = function() {
    var value;
    value = arguments[0];
    this.setFloatMarginX(value);
    this.setFloatMarginY(value);
    this.setBlockMarginX(value);
    return this.setBlockMarginY(value);
  };

  /*<span id='method-fm.icelink.webrtc.layoutPreset-setPreviewSize'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the preview size as a percent of the
  	 container size when remote videos are present. For
  	 example, a value of 0.5 will cover half the container.
  	 DEPRECATED. Use
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatWidth">fm.icelink.webrtc.layoutPreset.floatWidth</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatHeight">fm.icelink.webrtc.layoutPreset.floatHeight</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatWidthPercent">fm.icelink.webrtc.layoutPreset.floatWidthPercent</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.floatHeightPercent">fm.icelink.webrtc.layoutPreset.floatHeightPercent</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockWidth">fm.icelink.webrtc.layoutPreset.blockWidth</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockHeight">fm.icelink.webrtc.layoutPreset.blockHeight</see>,
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockWidthPercent">fm.icelink.webrtc.layoutPreset.blockWidthPercent</see>, and/or
  	 <see cref="fm.icelink.webrtc.layoutPreset.blockHeightPercent">fm.icelink.webrtc.layoutPreset.blockHeightPercent</see> instead.
  	 </div>
  
  	@function setPreviewSize
  	@param {Decimal} value
  	@return {void}
  */


  layoutPreset.prototype.setPreviewSize = function() {
    var value;
    value = arguments[0];
    this.setFloatWidthPercent(value);
    this.setFloatHeightPercent(value);
    this.setBlockWidthPercent(value);
    return this.setBlockHeightPercent(value);
  };

  return layoutPreset;

}).call(this, fm.dynamic);


/*<span id='cls-fm.icelink.webrtc.localStartArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.localStartArgs
 <div>
 Arguments for starting a local media stream.
 </div>

@extends fm.icelink.webrtc.baseMediaArgs
*/


fm.icelink.webrtc.localStartArgs = (function(_super) {

  __extends(localStartArgs, _super);

  localStartArgs.prototype._onFailure = null;

  localStartArgs.prototype._onSuccess = null;

  function localStartArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      localStartArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    localStartArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.webrtc.localStartArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} startArgsJson
  	@return {fm.icelink.webrtc.localStartArgs}
  */


  localStartArgs.fromJson = function() {
    var startArgsJson;
    startArgsJson = arguments[0];
    return fm.icelink.webrtc.serializer.deserializeLocalStartArgs(startArgsJson);
  };

  /*<span id='method-fm.icelink.webrtc.localStartArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.webrtc.localStartArgs} startArgs
  	@return {String}
  */


  localStartArgs.toJson = function() {
    var startArgs;
    startArgs = arguments[0];
    return fm.icelink.webrtc.serializer.serializeLocalStartArgs(startArgs);
  };

  /*<span id='method-fm.icelink.webrtc.localStartArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the failure callback.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  localStartArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.icelink.webrtc.localStartArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the success callback.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  localStartArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.icelink.webrtc.localStartArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the failure callback.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  localStartArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.icelink.webrtc.localStartArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the success callback.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  localStartArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.icelink.webrtc.localStartArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  localStartArgs.prototype.toJson = function() {
    return fm.icelink.webrtc.localStartArgs.toJson(this);
  };

  return localStartArgs;

}).call(this, fm.icelink.webrtc.baseMediaArgs);


/*<span id='cls-fm.icelink.webrtc.localStartFailureArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.localStartFailureArgs
 <div>
 Arguments for the callback invoked after failing to start a local media stream.
 </div>

@extends fm.icelink.webrtc.baseMediaArgs
*/


fm.icelink.webrtc.localStartFailureArgs = (function(_super) {

  __extends(localStartFailureArgs, _super);

  localStartFailureArgs.prototype._exception = null;

  localStartFailureArgs.prototype._localStream = null;

  function localStartFailureArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setLocalStream = __bind(this.setLocalStream, this);

    this.setException = __bind(this.setException, this);

    this.getLocalStream = __bind(this.getLocalStream, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      localStartFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    localStartFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.webrtc.localStartFailureArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} startFailureArgsJson
  	@return {fm.icelink.webrtc.localStartFailureArgs}
  */


  localStartFailureArgs.fromJson = function() {
    var startFailureArgsJson;
    startFailureArgsJson = arguments[0];
    return fm.icelink.webrtc.serializer.deserializeLocalStartFailureArgs(startFailureArgsJson);
  };

  /*<span id='method-fm.icelink.webrtc.localStartFailureArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.webrtc.localStartFailureArgs} startFailureArgs
  	@return {String}
  */


  localStartFailureArgs.toJson = function() {
    var startFailureArgs;
    startFailureArgs = arguments[0];
    return fm.icelink.webrtc.serializer.serializeLocalStartFailureArgs(startFailureArgs);
  };

  /*<span id='method-fm.icelink.webrtc.localStartFailureArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  localStartFailureArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.icelink.webrtc.localStartFailureArgs-getLocalStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local media stream.
  	 </div>
  
  	@function getLocalStream
  	@return {fm.icelink.webrtc.localMediaStream}
  */


  localStartFailureArgs.prototype.getLocalStream = function() {
    return this._localStream;
  };

  /*<span id='method-fm.icelink.webrtc.localStartFailureArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  localStartFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  /*<span id='method-fm.icelink.webrtc.localStartFailureArgs-setLocalStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the local media stream.
  	 </div>
  
  	@function setLocalStream
  	@param {fm.icelink.webrtc.localMediaStream} value
  	@return {void}
  */


  localStartFailureArgs.prototype.setLocalStream = function() {
    var value;
    value = arguments[0];
    return this._localStream = value;
  };

  /*<span id='method-fm.icelink.webrtc.localStartFailureArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  localStartFailureArgs.prototype.toJson = function() {
    return fm.icelink.webrtc.localStartFailureArgs.toJson(this);
  };

  return localStartFailureArgs;

}).call(this, fm.icelink.webrtc.baseMediaArgs);


/*<span id='cls-fm.icelink.webrtc.localStartSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.localStartSuccessArgs
 <div>
 Arguments for the callback invoked after successfully starting a local media stream.
 </div>

@extends fm.icelink.webrtc.baseMediaArgs
*/


fm.icelink.webrtc.localStartSuccessArgs = (function(_super) {

  __extends(localStartSuccessArgs, _super);

  localStartSuccessArgs.prototype._localStream = null;

  function localStartSuccessArgs() {
    this.toJson = __bind(this.toJson, this);

    this.setLocalStream = __bind(this.setLocalStream, this);

    this.getLocalStream = __bind(this.getLocalStream, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      localStartSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    localStartSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.webrtc.localStartSuccessArgs-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} startSuccessArgsJson
  	@return {fm.icelink.webrtc.localStartSuccessArgs}
  */


  localStartSuccessArgs.fromJson = function() {
    var startSuccessArgsJson;
    startSuccessArgsJson = arguments[0];
    return fm.icelink.webrtc.serializer.deserializeLocalStartSuccessArgs(startSuccessArgsJson);
  };

  /*<span id='method-fm.icelink.webrtc.localStartSuccessArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.webrtc.localStartSuccessArgs} startSuccessArgs
  	@return {String}
  */


  localStartSuccessArgs.toJson = function() {
    var startSuccessArgs;
    startSuccessArgs = arguments[0];
    return fm.icelink.webrtc.serializer.serializeLocalStartSuccessArgs(startSuccessArgs);
  };

  /*<span id='method-fm.icelink.webrtc.localStartSuccessArgs-getLocalStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local media stream.
  	 </div>
  
  	@function getLocalStream
  	@return {fm.icelink.webrtc.localMediaStream}
  */


  localStartSuccessArgs.prototype.getLocalStream = function() {
    return this._localStream;
  };

  /*<span id='method-fm.icelink.webrtc.localStartSuccessArgs-setLocalStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the local media stream.
  	 </div>
  
  	@function setLocalStream
  	@param {fm.icelink.webrtc.localMediaStream} value
  	@return {void}
  */


  localStartSuccessArgs.prototype.setLocalStream = function() {
    var value;
    value = arguments[0];
    return this._localStream = value;
  };

  /*<span id='method-fm.icelink.webrtc.localStartSuccessArgs-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  localStartSuccessArgs.prototype.toJson = function() {
    return fm.icelink.webrtc.localStartSuccessArgs.toJson(this);
  };

  return localStartSuccessArgs;

}).call(this, fm.icelink.webrtc.baseMediaArgs);


/*<span id='cls-fm.icelink.webrtc.baseLayoutManager'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.baseLayoutManager
 <div>
 A class that supplies simple video frame layout management.
 </div>

@extends fm.icelink.webrtc.layoutPreset
*/


fm.icelink.webrtc.baseLayoutManager = (function(_super) {

  __extends(baseLayoutManager, _super);

  baseLayoutManager.prototype._inBatch = false;

  baseLayoutManager.prototype._layoutOrigin = null;

  baseLayoutManager.prototype._localVideoControl = null;

  baseLayoutManager.prototype._onLayout = null;

  baseLayoutManager.prototype._onLayoutComplete = null;

  baseLayoutManager.prototype._onUnhandledException = null;

  baseLayoutManager.prototype._remoteVideoControlsLock = null;

  baseLayoutManager.prototype._remoteVideoControlsTable = null;

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-fm.icelink.webrtc.baseLayoutManager'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.webrtc.baseLayoutManager">fm.icelink.webrtc.baseLayoutManager</see> class.
  	 </div>
  
  	@function fm.icelink.webrtc.baseLayoutManager
  	@param {fm.icelink.webrtc.layoutPreset} preset
  	@return {}
  */


  function baseLayoutManager() {
    this.unsetLocalVideoControlUI = __bind(this.unsetLocalVideoControlUI, this);

    this.unsetLocalVideoControl = __bind(this.unsetLocalVideoControl, this);

    this.setOnLayoutComplete = __bind(this.setOnLayoutComplete, this);

    this.setOnLayout = __bind(this.setOnLayout, this);

    this.setLocalVideoControlUI = __bind(this.setLocalVideoControlUI, this);

    this.setLocalVideoControl = __bind(this.setLocalVideoControl, this);

    this.setLayoutOrigin = __bind(this.setLayoutOrigin, this);

    this.runOnUIThread = __bind(this.runOnUIThread, this);

    this.reset = __bind(this.reset, this);

    this.removeRemoteVideoControlUI = __bind(this.removeRemoteVideoControlUI, this);

    this.removeRemoteVideoControlsUI = __bind(this.removeRemoteVideoControlsUI, this);

    this.removeRemoteVideoControls = __bind(this.removeRemoteVideoControls, this);

    this.removeRemoteVideoControl = __bind(this.removeRemoteVideoControl, this);

    this.removeOnUnhandledException = __bind(this.removeOnUnhandledException, this);

    this.removeFromContainer = __bind(this.removeFromContainer, this);

    this.raiseUnhandledException = __bind(this.raiseUnhandledException, this);

    this.getTopRowIndexes = __bind(this.getTopRowIndexes, this);

    this.getRightColumnIndexes = __bind(this.getRightColumnIndexes, this);

    this.getRemoteVideoControlsInternal = __bind(this.getRemoteVideoControlsInternal, this);

    this.getRemoteVideoControls = __bind(this.getRemoteVideoControls, this);

    this.getRemoteVideoControl = __bind(this.getRemoteVideoControl, this);

    this.getPeerIds = __bind(this.getPeerIds, this);

    this.getOnLayoutComplete = __bind(this.getOnLayoutComplete, this);

    this.getOnLayout = __bind(this.getOnLayout, this);

    this.getOldestRemoteVideoControl = __bind(this.getOldestRemoteVideoControl, this);

    this.getNewestRemoteVideoControl = __bind(this.getNewestRemoteVideoControl, this);

    this.getLocalVideoControl = __bind(this.getLocalVideoControl, this);

    this.getLeftColumnIndexes = __bind(this.getLeftColumnIndexes, this);

    this.getLayoutOrigin = __bind(this.getLayoutOrigin, this);

    this.getLayout = __bind(this.getLayout, this);

    this.getInlineLayout = __bind(this.getInlineLayout, this);

    this.getFloatRemoteLayout = __bind(this.getFloatRemoteLayout, this);

    this.getFloatLocalLayout = __bind(this.getFloatLocalLayout, this);

    this.getCenterRowIndexes = __bind(this.getCenterRowIndexes, this);

    this.getCenterColumnIndexes = __bind(this.getCenterColumnIndexes, this);

    this.getBottomRowIndexes = __bind(this.getBottomRowIndexes, this);

    this.getBlockLayout = __bind(this.getBlockLayout, this);

    this.doLayout = __bind(this.doLayout, this);

    this.calculateInlineFrames = __bind(this.calculateInlineFrames, this);

    this.calculateInlineFrame = __bind(this.calculateInlineFrame, this);

    this.calculateFloatFrames = __bind(this.calculateFloatFrames, this);

    this.calculateFloatFrame = __bind(this.calculateFloatFrame, this);

    this.calculateFillFrame = __bind(this.calculateFillFrame, this);

    this.calculateBlockFrame = __bind(this.calculateBlockFrame, this);

    this.applyLayout = __bind(this.applyLayout, this);

    this.addToContainer = __bind(this.addToContainer, this);

    this.addRemoteVideoControlUI = __bind(this.addRemoteVideoControlUI, this);

    this.addRemoteVideoControlsUI = __bind(this.addRemoteVideoControlsUI, this);

    this.addRemoteVideoControls = __bind(this.addRemoteVideoControls, this);

    this.addRemoteVideoControl = __bind(this.addRemoteVideoControl, this);

    this.addOnUnhandledException = __bind(this.addOnUnhandledException, this);

    var preset, _var0;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseLayoutManager.call(this, null);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      baseLayoutManager.call(this, null);
      return;
    }
    if (arguments.length === 1) {
      preset = arguments[0];
      baseLayoutManager.__super__.constructor.call(this);
      this._remoteVideoControlsTable = {};
      this._remoteVideoControlsLock = new fm.object();
      this._inBatch = false;
      _var0 = preset;
      if (_var0 === null || typeof _var0 === 'undefined') {
        preset = fm.icelink.webrtc.layoutPreset.getFacetime();
      }
      preset.copyToPreset(this);
      this.setLayoutOrigin(fm.icelink.webrtc.layoutOrigin.TopLeft);
      return;
    }
  }

  baseLayoutManager.calculateTable = function() {
    var cellWidth, count, i, num, num2, num3, num5, num6, num7, num8, tableHeight, tableWidth;
    tableWidth = arguments[0];
    tableHeight = arguments[1];
    count = arguments[2];
    num = 0;
    num2 = 1;
    num3 = 1;
    i = count;
    while (i >= 1) {
      try {
        num5 = fm.mathAssistant.ceil(count / i);
        num6 = tableWidth / i;
        num7 = tableHeight / num5;
        num8 = (num6 < num7 ? num6 : num7);
        if (num8 >= num) {
          num = num8;
          num2 = i;
          num3 = num5;
        }
      } finally {
        i--;
      }
    }
    cellWidth = fm.mathAssistant.floor(tableWidth / num2);
    return new fm.icelink.webrtc.layoutTable(num2, num3, cellWidth, fm.mathAssistant.floor(tableHeight / num3));
  };

  baseLayoutManager.divideByTwo = function() {
    var value;
    value = arguments[0];
    return fm.mathAssistant.floor(value / 2);
  };

  baseLayoutManager.getSingleLayout = function() {
    var layout, layoutHeight, layoutWidth;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    layout = new fm.icelink.webrtc.layout();
    layout.setLocalFrame(new fm.icelink.webrtc.layoutFrame(0, 0, layoutWidth, layoutHeight));
    return layout;
  };

  baseLayoutManager.getXMax = function() {
    var frame, frames, i, x;
    frames = arguments[0];
    if (frames.length === 0) {
      return frames[0].getX();
    }
    x = frames[0].getX();
    i = 1;
    while (i < frames.length) {
      try {
        frame = frames[i];
        if (frame.getX() > x) {
          x = frame.getX();
        }
      } finally {
        i++;
      }
    }
    return x;
  };

  baseLayoutManager.getXMid = function() {
    var frame, frames, i, num3, num5, num7, x, xMax, xMin;
    frames = arguments[0];
    xMin = fm.icelink.webrtc.baseLayoutManager.getXMin(frames);
    xMax = fm.icelink.webrtc.baseLayoutManager.getXMax(frames);
    if (xMin === xMax) {
      return xMin;
    }
    num3 = fm.icelink.webrtc.baseLayoutManager.divideByTwo(xMin + xMax);
    x = frames[0].getX();
    num5 = fm.mathAssistant.abs(num3 - x);
    i = 1;
    while (i < frames.length) {
      try {
        frame = frames[i];
        num7 = fm.mathAssistant.abs(num3 - frame.getX());
        if (num7 < num5) {
          x = frame.getX();
          num5 = num7;
        }
      } finally {
        i++;
      }
    }
    return x;
  };

  baseLayoutManager.getXMin = function() {
    var frame, frames, i, x;
    frames = arguments[0];
    if (frames.length === 0) {
      return frames[0].getX();
    }
    x = frames[0].getX();
    i = 1;
    while (i < frames.length) {
      try {
        frame = frames[i];
        if (frame.getX() < x) {
          x = frame.getX();
        }
      } finally {
        i++;
      }
    }
    return x;
  };

  baseLayoutManager.getYMax = function() {
    var frame, frames, i, y;
    frames = arguments[0];
    if (frames.length === 0) {
      return frames[0].getY();
    }
    y = frames[0].getY();
    i = 1;
    while (i < frames.length) {
      try {
        frame = frames[i];
        if (frame.getY() > y) {
          y = frame.getY();
        }
      } finally {
        i++;
      }
    }
    return y;
  };

  baseLayoutManager.getYMid = function() {
    var frame, frames, i, num3, num5, num7, y, yMax, yMin;
    frames = arguments[0];
    yMin = fm.icelink.webrtc.baseLayoutManager.getYMin(frames);
    yMax = fm.icelink.webrtc.baseLayoutManager.getYMax(frames);
    if (yMin === yMax) {
      return yMin;
    }
    num3 = fm.icelink.webrtc.baseLayoutManager.divideByTwo(yMin + yMax);
    y = frames[0].getY();
    num5 = fm.mathAssistant.abs(num3 - y);
    i = 1;
    while (i < frames.length) {
      try {
        frame = frames[i];
        num7 = fm.mathAssistant.abs(num3 - frame.getY());
        if (num7 < num5) {
          y = frame.getY();
          num5 = num7;
        }
      } finally {
        i++;
      }
    }
    return y;
  };

  baseLayoutManager.getYMin = function() {
    var frame, frames, i, y;
    frames = arguments[0];
    if (frames.length === 0) {
      return frames[0].getY();
    }
    y = frames[0].getY();
    i = 1;
    while (i < frames.length) {
      try {
        frame = frames[i];
        if (frame.getY() < y) {
          y = frame.getY();
        }
      } finally {
        i++;
      }
    }
    return y;
  };

  baseLayoutManager.mergeLayoutFrames = function() {
    var firstFrames, frameArray, lastFrames, length, num2, num3;
    firstFrames = arguments[0];
    lastFrames = arguments[1];
    length = firstFrames.length;
    num2 = lastFrames.length;
    frameArray = new Array(length + num2);
    num3 = 0;
    while (num3 < length) {
      try {
        frameArray[num3] = firstFrames[num3];
      } finally {
        num3++;
      }
    }
    num3 = 0;
    while (num3 < num2) {
      try {
        frameArray[num3 + length] = lastFrames[num3];
      } finally {
        num3++;
      }
    }
    return frameArray;
  };

  baseLayoutManager.spliceLayoutFrame = function() {
    var frames, index, start;
    frames = arguments[0];
    index = arguments[1];
    start = index + 1;
    return fm.icelink.webrtc.baseLayoutManager.mergeLayoutFrames(fm.icelink.webrtc.baseLayoutManager.takeLayoutFrames(frames, 0, index), fm.icelink.webrtc.baseLayoutManager.takeLayoutFrames(frames, start, frames.length - start));
  };

  baseLayoutManager.takeLayoutFrames = function() {
    var frameArray, frames, i, length, start;
    frames = arguments[0];
    start = arguments[1];
    length = arguments[2];
    frameArray = new Array(length);
    i = 0;
    while (i < frameArray.length) {
      try {
        frameArray[i] = frames[start + i];
      } finally {
        i++;
      }
    }
    return frameArray;
  };

  baseLayoutManager.transformFrame = function() {
    var flag, flag2, frame, layoutHeight, layoutWidth, origin;
    frame = arguments[0];
    origin = arguments[1];
    layoutWidth = arguments[2];
    layoutHeight = arguments[3];
    flag = false;
    flag2 = false;
    switch (origin) {
      case fm.icelink.webrtc.layoutOrigin.TopRight:
        flag = true;
        break;
      case fm.icelink.webrtc.layoutOrigin.BottomRight:
        flag = true;
        flag2 = true;
        break;
      case fm.icelink.webrtc.layoutOrigin.BottomLeft:
        flag2 = true;
        break;
    }
    if (flag) {
      frame.setX((layoutWidth - frame.getX()) - frame.getWidth());
    }
    if (flag2) {
      return frame.setY((layoutHeight - frame.getY()) - frame.getHeight());
    }
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-addOnUnhandledException'>&nbsp;</span>
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


  baseLayoutManager.prototype.addOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.combine(this._onUnhandledException, value);
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-addRemoteVideoControl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a remote video control to the layout.
  	 </div>
  	@function addRemoteVideoControl
  	@param {String} peerId The peer ID.
  	@param {fm.object} remoteVideoControl The remote video control.
  	@return {Boolean} true if successful; otherwise, false. Check the logs for additional information.
  */


  baseLayoutManager.prototype.addRemoteVideoControl = function() {
    var peerId, remoteVideoControl, _var0, _var1;
    peerId = arguments[0];
    remoteVideoControl = arguments[1];
    _var0 = peerId;
    if (_var0 === null || typeof _var0 === 'undefined') {
      fm.log.warn("Could not add remote video control. The peer ID cannot be null.");
      return false;
    }
    _var1 = remoteVideoControl;
    if (_var1 === null || typeof _var1 === 'undefined') {
      fm.log.warn("Could not add remote video control. The remote video control cannot be null.");
      return false;
    }
    try {
      this.runOnUIThread(this.addRemoteVideoControlUI, peerId, remoteVideoControl);
    } catch (exception) {
      fm.log.error("Could not add remote video control.", exception);
    } finally {

    }
    return true;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-addRemoteVideoControls'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds remote video controls to the layout.
  	 </div>
  	@function addRemoteVideoControls
  	@param {fm.array} peerIds The peer IDs.
  	@param {fm.array} remoteVideoControls The remote video controls.
  	@return {Boolean} true if successful; otherwise, false. Check the logs for additional information.
  */


  baseLayoutManager.prototype.addRemoteVideoControls = function() {
    var peerIds, remoteVideoControls, _var0, _var1;
    peerIds = arguments[0];
    remoteVideoControls = arguments[1];
    _var0 = peerIds;
    if (_var0 === null || typeof _var0 === 'undefined') {
      fm.log.warn("Could not add remote video controls. The peer IDs cannot be null.");
      return false;
    }
    _var1 = remoteVideoControls;
    if (_var1 === null || typeof _var1 === 'undefined') {
      fm.log.warn("Could not add remote video controls. The remote video controls cannot be null.");
      return false;
    }
    if (peerIds.length !== remoteVideoControls.length) {
      fm.log.warn("Could not add remote video controls. The number of peer IDs and remote video controls must match.");
      return false;
    }
    try {
      this.runOnUIThread(this.addRemoteVideoControlsUI, peerIds, remoteVideoControls);
    } catch (exception) {
      fm.log.error("Could not add remote video controls.", exception);
    } finally {

    }
    return true;
  };

  baseLayoutManager.prototype.addRemoteVideoControlsUI = function() {
    var i, objArray, peerIdsObj, remoteVideoControlsObj, strArray;
    peerIdsObj = arguments[0];
    remoteVideoControlsObj = arguments[1];
    strArray = peerIdsObj;
    objArray = remoteVideoControlsObj;
    this._inBatch = true;
    i = 0;
    while (i < strArray.length) {
      try {
        this.addRemoteVideoControlUI(strArray[i], objArray[i]);
      } finally {
        i++;
      }
    }
    this._inBatch = false;
    return this.doLayout();
  };

  baseLayoutManager.prototype.addRemoteVideoControlUI = function() {
    var list, peerId, peerIdObj, remoteVideoControl, remoteVideoControlsInternal, _var0;
    peerIdObj = arguments[0];
    remoteVideoControl = arguments[1];
    peerId = peerIdObj;
    list = [];
    fm.arrayExtensions.add(list, remoteVideoControl);
    remoteVideoControlsInternal = this.getRemoteVideoControlsInternal(peerId);
    _var0 = remoteVideoControlsInternal;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      fm.arrayExtensions.addRange(list, remoteVideoControlsInternal);
    }
    this.addToContainer(remoteVideoControl);
    this._remoteVideoControlsTable[peerId] = fm.arrayExtensions.toArray(list);
    if (!this._inBatch) {
      return this.doLayout();
    }
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-addToContainer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a control to the container.
  	 </div>
  	@function addToContainer
  	@param {fm.object} control The control to add.
  	@return {void}
  */


  baseLayoutManager.prototype.addToContainer = function() {
    var control;
    return control = arguments[0];
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-applyLayout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Applies a layout to the container.
  	 </div>
  
  	@function applyLayout
  	@return {void}
  */


  baseLayoutManager.prototype.applyLayout = function() {};

  baseLayoutManager.prototype.calculateBlockFrame = function() {
    var height, layoutHeight, layoutWidth, marginX, marginY, width, x, y;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    marginX = arguments[2];
    marginY = arguments[3];
    if ((this.getBlockWidth() === 0) && (this.getBlockWidthPercent() === 0)) {
      this.setBlockWidthPercent(0.25);
    }
    if ((this.getBlockHeight() === 0) && (this.getBlockHeightPercent() === 0)) {
      this.setBlockHeightPercent(0.25);
    }
    width = (this.getBlockWidth() > 0 ? this.getBlockWidth() : layoutWidth * this.getBlockWidthPercent());
    height = (this.getBlockHeight() > 0 ? this.getBlockHeight() : layoutHeight * this.getBlockHeightPercent());
    marginX.setValue((this.getBlockMarginX() > 0 ? this.getBlockMarginX() : layoutWidth * this.getBlockMarginXPercent()));
    marginY.setValue((this.getBlockMarginY() > 0 ? this.getBlockMarginY() : layoutHeight * this.getBlockMarginYPercent()));
    x = 0;
    switch (this.getAlignment()) {
      case fm.icelink.webrtc.layoutAlignment.Top:
      case fm.icelink.webrtc.layoutAlignment.Center:
      case fm.icelink.webrtc.layoutAlignment.Bottom:
        x = fm.icelink.webrtc.baseLayoutManager.divideByTwo(layoutWidth - width);
        break;
      case fm.icelink.webrtc.layoutAlignment.TopRight:
      case fm.icelink.webrtc.layoutAlignment.Right:
      case fm.icelink.webrtc.layoutAlignment.BottomRight:
        x = layoutWidth - width;
        break;
      default:
        x = 0;
        break;
    }
    y = 0;
    switch (this.getAlignment()) {
      case fm.icelink.webrtc.layoutAlignment.Left:
      case fm.icelink.webrtc.layoutAlignment.Center:
      case fm.icelink.webrtc.layoutAlignment.Right:
        y = fm.icelink.webrtc.baseLayoutManager.divideByTwo(layoutHeight - height);
        break;
      case fm.icelink.webrtc.layoutAlignment.BottomLeft:
      case fm.icelink.webrtc.layoutAlignment.Bottom:
      case fm.icelink.webrtc.layoutAlignment.BottomRight:
        y = layoutHeight - height;
        break;
      default:
        y = 0;
        break;
    }
    return new fm.icelink.webrtc.layoutFrame(x, y, width, height);
  };

  baseLayoutManager.prototype.calculateFillFrame = function() {
    var layoutHeight, layoutWidth;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    return new fm.icelink.webrtc.layoutFrame(0, 0, layoutWidth, layoutHeight);
  };

  baseLayoutManager.prototype.calculateFloatFrame = function() {
    var layoutHeight, layoutWidth;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    return this.calculateFloatFrames(layoutWidth, layoutHeight, 1)[0];
  };

  baseLayoutManager.prototype.calculateFloatFrames = function() {
    var count, frame, frameArray, layoutHeight, layoutWidth, num, num2, num3, num4, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _var0, _var1, _var2, _var3, _var4, _var5;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    count = arguments[2];
    if ((this.getFloatWidth() === 0) && (this.getFloatWidthPercent() === 0)) {
      this.setFloatWidthPercent(0.25);
    }
    if ((this.getFloatHeight() === 0) && (this.getFloatHeightPercent() === 0)) {
      this.setFloatHeightPercent(0.25);
    }
    num = (this.getFloatWidth() > 0 ? this.getFloatWidth() : layoutWidth * this.getFloatWidthPercent());
    num2 = (this.getFloatHeight() > 0 ? this.getFloatHeight() : layoutHeight * this.getFloatHeightPercent());
    num3 = (this.getFloatMarginX() > 0 ? this.getFloatMarginX() : layoutWidth * this.getFloatMarginXPercent());
    num4 = (this.getFloatMarginY() > 0 ? this.getFloatMarginY() : layoutHeight * this.getFloatMarginYPercent());
    if (this.getDirection() === fm.icelink.webrtc.layoutDirection.Horizontal) {
      num = fm.mathAssistant.min(layoutWidth, num * count);
    } else {
      num2 = fm.mathAssistant.min(layoutHeight, num2 * count);
    }
    frameArray = this.calculateInlineFrames(num, num2, count, 0, 0);
    switch (this.getAlignment()) {
      case fm.icelink.webrtc.layoutAlignment.TopLeft:
      case fm.icelink.webrtc.layoutAlignment.Top:
      case fm.icelink.webrtc.layoutAlignment.TopRight:
        _var0 = frameArray;
        for (_i = 0, _len = _var0.length; _i < _len; _i++) {
          frame = _var0[_i];
          frame.setY(frame.getY() + num4);
        }
        break;
      case fm.icelink.webrtc.layoutAlignment.Left:
      case fm.icelink.webrtc.layoutAlignment.Center:
      case fm.icelink.webrtc.layoutAlignment.Right:
        _var1 = frameArray;
        for (_j = 0, _len1 = _var1.length; _j < _len1; _j++) {
          frame = _var1[_j];
          frame.setY(frame.getY() + fm.icelink.webrtc.baseLayoutManager.divideByTwo(layoutHeight - num2));
        }
        break;
      case fm.icelink.webrtc.layoutAlignment.BottomLeft:
      case fm.icelink.webrtc.layoutAlignment.Bottom:
      case fm.icelink.webrtc.layoutAlignment.BottomRight:
        _var2 = frameArray;
        for (_k = 0, _len2 = _var2.length; _k < _len2; _k++) {
          frame = _var2[_k];
          frame.setY(frame.getY() + ((layoutHeight - num2) - num4));
        }
        break;
    }
    switch (this.getAlignment()) {
      case fm.icelink.webrtc.layoutAlignment.TopLeft:
      case fm.icelink.webrtc.layoutAlignment.Left:
      case fm.icelink.webrtc.layoutAlignment.BottomLeft:
        _var3 = frameArray;
        for (_l = 0, _len3 = _var3.length; _l < _len3; _l++) {
          frame = _var3[_l];
          frame.setX(frame.getX() + num3);
        }
        return frameArray;
      case fm.icelink.webrtc.layoutAlignment.Top:
      case fm.icelink.webrtc.layoutAlignment.Center:
      case fm.icelink.webrtc.layoutAlignment.Bottom:
        _var4 = frameArray;
        for (_m = 0, _len4 = _var4.length; _m < _len4; _m++) {
          frame = _var4[_m];
          frame.setX(frame.getX() + fm.icelink.webrtc.baseLayoutManager.divideByTwo(layoutWidth - num));
        }
        return frameArray;
      case fm.icelink.webrtc.layoutAlignment.TopRight:
      case fm.icelink.webrtc.layoutAlignment.Right:
      case fm.icelink.webrtc.layoutAlignment.BottomRight:
        _var5 = frameArray;
        for (_n = 0, _len5 = _var5.length; _n < _len5; _n++) {
          frame = _var5[_n];
          frame.setX(frame.getX() + ((layoutWidth - num) - num3));
        }
        return frameArray;
    }
    return frameArray;
  };

  baseLayoutManager.prototype.calculateInlineFrame = function() {
    var cellHeight, cellWidth, cellX, cellY, num, width, x, y;
    cellX = arguments[0];
    cellY = arguments[1];
    cellWidth = arguments[2];
    cellHeight = arguments[3];
    num = fm.icelink.webrtc.baseLayoutManager.divideByTwo(this.getInlineMargin());
    x = cellX - num;
    y = cellY - num;
    width = cellWidth - this.getInlineMargin();
    return new fm.icelink.webrtc.layoutFrame(x, y, width, cellHeight - this.getInlineMargin());
  };

  baseLayoutManager.prototype.calculateInlineFrames = function() {
    var baseX, baseY, cellHeight, cellWidth, columnCount, count, frame, layoutHeight, layoutWidth, list, num10, num11, num12, num13, num14, num15, num16, num17, num18, num5, num6, num7, num8, num9, rowCount, table;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    count = arguments[2];
    baseX = arguments[3];
    baseY = arguments[4];
    list = [];
    table = fm.icelink.webrtc.baseLayoutManager.calculateTable(layoutWidth + this.getInlineMargin(), layoutHeight + this.getInlineMargin(), count);
    columnCount = table.getColumnCount();
    rowCount = table.getRowCount();
    cellWidth = table.getCellWidth();
    cellHeight = table.getCellHeight();
    num5 = fm.icelink.webrtc.baseLayoutManager.divideByTwo(this.getInlineMargin());
    if (this.getDirection() === fm.icelink.webrtc.layoutDirection.Horizontal) {
      num6 = 0;
      num7 = baseY + num5;
      num8 = (layoutHeight - (rowCount * cellHeight)) + this.getInlineMargin();
      num9 = 0;
      while (num9 < rowCount) {
        num10 = (num9 < num8 ? 1 : 0);
        num11 = columnCount;
        if (num9 === (rowCount - 1)) {
          num11 = count - num6;
        }
        num12 = baseX + num5;
        if ((num9 === (rowCount - 1)) && (rowCount > 1)) {
          num13 = num12 - num5;
          num14 = num7 - num5;
          fm.arrayExtensions.addRange(list, this.calculateInlineFrames(baseX + layoutWidth, (baseY + layoutHeight) - num14, num11, num13, num14));
        } else {
          num15 = (layoutWidth - (num11 * cellWidth)) + this.getInlineMargin();
          num16 = 0;
          while (num16 < num11) {
            num17 = (num16 < num15 ? 1 : 0);
            frame = this.calculateInlineFrame(num12, num7, cellWidth + num17, cellHeight + num10);
            fm.arrayExtensions.add(list, frame);
            num12 = num12 + (cellWidth + num17);
            num16++;
            num6++;
          }
        }
        num7 = num7 + (cellHeight + num10);
        num9++;
      }
    } else {
      num6 = 0;
      num12 = baseX + num5;
      num15 = (layoutWidth - (columnCount * cellWidth)) + this.getInlineMargin();
      num16 = 0;
      while (num16 < columnCount) {
        try {
          num17 = (num16 < num15 ? 1 : 0);
          num18 = rowCount;
          if (num16 === (columnCount - 1)) {
            num18 = count - num6;
          }
          num7 = baseY + num5;
          if ((num16 === (columnCount - 1)) && (columnCount > 1)) {
            num13 = num12 - num5;
            num14 = num7 - num5;
            fm.arrayExtensions.addRange(list, this.calculateInlineFrames((baseX + layoutWidth) - num13, baseY + layoutHeight, num18, num13, num14));
          } else {
            num8 = (layoutHeight - (num18 * cellHeight)) + this.getInlineMargin();
            num9 = 0;
            while (num9 < num18) {
              num10 = (num9 < num8 ? 1 : 0);
              frame = this.calculateInlineFrame(num12, num7, cellWidth + num17, cellHeight + num10);
              fm.arrayExtensions.add(list, frame);
              num7 = num7 + (cellHeight + num10);
              num9++;
              num6++;
            }
          }
          num12 = num12 + (cellWidth + num17);
        } finally {
          num16++;
        }
      }
    }
    return fm.arrayExtensions.toArray(list);
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-doLayout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Lays out the controls.
  	 </div>
  
  	@function doLayout
  	@return {void}
  */


  baseLayoutManager.prototype.doLayout = function() {
    var onLayoutComplete, p, _var0;
    this.applyLayout();
    onLayoutComplete = this.getOnLayoutComplete();
    _var0 = onLayoutComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.webrtc.layoutCompleteArgs();
      p.setLayoutManager(this);
      return onLayoutComplete(p);
    }
  };

  baseLayoutManager.prototype.getBlockLayout = function() {
    var baseX, baseY, count, frame, layout, layoutHeight, layoutWidth, list, marginX, marginY, num10, num4, num7, num8, num9, remoteCount, _var0, _var1, _var2;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    remoteCount = arguments[2];
    marginX = 0;
    marginY = 0;
    _var0 = new fm.holder(marginX);
    _var1 = new fm.holder(marginY);
    _var2 = this.calculateBlockFrame(layoutWidth, layoutHeight, _var0, _var1);
    marginX = _var0.getValue();
    marginY = _var1.getValue();
    frame = _var2;
    list = [];
    if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Center) {
      count = fm.icelink.webrtc.baseLayoutManager.divideByTwo(remoteCount);
      num4 = remoteCount - count;
      baseX = 0;
      baseY = 0;
      if (this.getDirection() === fm.icelink.webrtc.layoutDirection.Vertical) {
        num7 = (frame.getWidth() + marginX) + marginX;
        layoutWidth = fm.icelink.webrtc.baseLayoutManager.divideByTwo(layoutWidth - num7);
        baseX = layoutWidth + num7;
      } else {
        num8 = (frame.getHeight() + marginY) + marginY;
        layoutHeight = fm.icelink.webrtc.baseLayoutManager.divideByTwo(layoutHeight - num8);
        baseY = layoutHeight + num8;
      }
      if (count > 0) {
        fm.arrayExtensions.addRange(list, this.calculateInlineFrames(layoutWidth, layoutHeight, count, 0, 0));
      }
      if (num4 > 0) {
        fm.arrayExtensions.addRange(list, this.calculateInlineFrames(layoutWidth, layoutHeight, num4, baseX, baseY));
      }
    } else {
      num9 = 0;
      num10 = 0;
      num7 = frame.getWidth() + marginX;
      num8 = frame.getHeight() + marginY;
      if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Top) {
        num10 = num8;
        layoutHeight = layoutHeight - num8;
      } else {
        if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Bottom) {
          layoutHeight = layoutHeight - num8;
        } else {
          if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Left) {
            num9 = num7;
            layoutWidth = layoutWidth - num7;
          } else {
            if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Right) {
              layoutWidth = layoutWidth - num7;
            } else {
              if (this.getDirection() === fm.icelink.webrtc.layoutDirection.Vertical) {
                if ((this.getAlignment() === fm.icelink.webrtc.layoutAlignment.TopLeft) || (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.BottomLeft)) {
                  num9 = num7;
                }
                layoutWidth = layoutWidth - num7;
              } else {
                if ((this.getAlignment() === fm.icelink.webrtc.layoutAlignment.TopLeft) || (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.TopRight)) {
                  num10 = num8;
                }
                layoutHeight = layoutHeight - num8;
              }
            }
          }
        }
      }
      fm.arrayExtensions.addRange(list, this.calculateInlineFrames(layoutWidth, layoutHeight, remoteCount, num9, num10));
    }
    layout = new fm.icelink.webrtc.layout();
    layout.setLocalFrame(frame);
    layout.setRemoteFrames(fm.arrayExtensions.toArray(list));
    return layout;
  };

  baseLayoutManager.prototype.getBottomRowIndexes = function() {
    var frames, num2, num3, num4, numArray, yMax;
    frames = arguments[0];
    yMax = fm.icelink.webrtc.baseLayoutManager.getYMax(frames);
    num2 = 0;
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getY() === yMax) {
          num2++;
        }
      } finally {
        num3++;
      }
    }
    num4 = 0;
    numArray = new Array(num2);
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getY() === yMax) {
          numArray[num4++] = num3;
        }
      } finally {
        num3++;
      }
    }
    return numArray;
  };

  baseLayoutManager.prototype.getCenterColumnIndexes = function() {
    var frames, num2, num3, num4, numArray, xMid;
    frames = arguments[0];
    xMid = fm.icelink.webrtc.baseLayoutManager.getXMid(frames);
    num2 = 0;
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getX() === xMid) {
          num2++;
        }
      } finally {
        num3++;
      }
    }
    num4 = 0;
    numArray = new Array(num2);
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getX() === xMid) {
          numArray[num4++] = num3;
        }
      } finally {
        num3++;
      }
    }
    return numArray;
  };

  baseLayoutManager.prototype.getCenterRowIndexes = function() {
    var frames, num2, num3, num4, numArray, yMid;
    frames = arguments[0];
    yMid = fm.icelink.webrtc.baseLayoutManager.getYMid(frames);
    num2 = 0;
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getY() === yMid) {
          num2++;
        }
      } finally {
        num3++;
      }
    }
    num4 = 0;
    numArray = new Array(num2);
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getY() === yMid) {
          numArray[num4++] = num3;
        }
      } finally {
        num3++;
      }
    }
    return numArray;
  };

  baseLayoutManager.prototype.getFloatLocalLayout = function() {
    var layout, layoutHeight, layoutWidth, remoteCount;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    remoteCount = arguments[2];
    layout = new fm.icelink.webrtc.layout();
    layout.setLocalFrame(this.calculateFloatFrame(layoutWidth, layoutHeight));
    layout.setRemoteFrames(this.calculateInlineFrames(layoutWidth, layoutHeight, remoteCount, 0, 0));
    return layout;
  };

  baseLayoutManager.prototype.getFloatRemoteLayout = function() {
    var layout, layoutHeight, layoutWidth, remoteCount;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    remoteCount = arguments[2];
    layout = new fm.icelink.webrtc.layout();
    layout.setLocalFrame(this.calculateFillFrame(layoutWidth, layoutHeight));
    layout.setRemoteFrames(this.calculateFloatFrames(layoutWidth, layoutHeight, remoteCount));
    return layout;
  };

  baseLayoutManager.prototype.getInlineLayout = function() {
    var centerRowIndexes, frames, index, layout, layoutHeight, layoutWidth, leftColumnIndexes, remoteCount, topRowIndexes;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    remoteCount = arguments[2];
    frames = this.calculateInlineFrames(layoutWidth, layoutHeight, remoteCount + 1, 0, 0);
    index = 0;
    if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.TopLeft) {
      index = 0;
    } else {
      if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Top) {
        topRowIndexes = this.getTopRowIndexes(frames);
        index = topRowIndexes[fm.icelink.webrtc.baseLayoutManager.divideByTwo(topRowIndexes.length)];
      } else {
        if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.TopRight) {
          if (this.getDirection() === fm.icelink.webrtc.layoutDirection.Horizontal) {
            centerRowIndexes = this.getTopRowIndexes(frames);
            index = centerRowIndexes[centerRowIndexes.length - 1];
          } else {
            index = this.getRightColumnIndexes(frames)[0];
          }
        } else {
          if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Left) {
            leftColumnIndexes = this.getLeftColumnIndexes(frames);
            index = leftColumnIndexes[fm.icelink.webrtc.baseLayoutManager.divideByTwo(leftColumnIndexes.length)];
          } else {
            if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Center) {
              if (this.getDirection() === fm.icelink.webrtc.layoutDirection.Horizontal) {
                centerRowIndexes = this.getCenterRowIndexes(frames);
                index = centerRowIndexes[fm.icelink.webrtc.baseLayoutManager.divideByTwo(centerRowIndexes.length)];
              } else {
                leftColumnIndexes = this.getCenterColumnIndexes(frames);
                index = leftColumnIndexes[fm.icelink.webrtc.baseLayoutManager.divideByTwo(leftColumnIndexes.length)];
              }
            } else {
              if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Right) {
                leftColumnIndexes = this.getRightColumnIndexes(frames);
                index = leftColumnIndexes[fm.icelink.webrtc.baseLayoutManager.divideByTwo(leftColumnIndexes.length)];
              } else {
                if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.BottomLeft) {
                  if (this.getDirection() === fm.icelink.webrtc.layoutDirection.Horizontal) {
                    index = this.getBottomRowIndexes(frames)[0];
                  } else {
                    leftColumnIndexes = this.getLeftColumnIndexes(frames);
                    index = leftColumnIndexes[leftColumnIndexes.length - 1];
                  }
                } else {
                  if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.Bottom) {
                    centerRowIndexes = this.getBottomRowIndexes(frames);
                    index = centerRowIndexes[fm.icelink.webrtc.baseLayoutManager.divideByTwo(centerRowIndexes.length)];
                  } else {
                    if (this.getAlignment() === fm.icelink.webrtc.layoutAlignment.BottomRight) {
                      index = frames.length - 1;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    layout = new fm.icelink.webrtc.layout();
    layout.setLocalFrame(frames[index]);
    layout.setRemoteFrames(fm.icelink.webrtc.baseLayoutManager.spliceLayoutFrame(frames, index));
    return layout;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-getLayout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a video frame layout.
  	 </div>
  	@function getLayout
  	@param {Integer} layoutWidth The total width of the layout.
  	@param {Integer} layoutHeight The total height of the layout.
  	@param {Integer} remoteCount The number of remote frames.
  	@return {fm.icelink.webrtc.layout} The video frame layout.
  */


  baseLayoutManager.prototype.getLayout = function() {
    var frame, layoutHeight, layoutWidth, onLayout, p, remoteCount, singleLayout, _i, _len, _var0, _var1;
    layoutWidth = arguments[0];
    layoutHeight = arguments[1];
    remoteCount = arguments[2];
    if (layoutWidth < 0) {
      layoutWidth = 0;
    }
    if (layoutHeight < 0) {
      layoutHeight = 0;
    }
    singleLayout = new fm.icelink.webrtc.layout();
    if (remoteCount === 0) {
      singleLayout = fm.icelink.webrtc.baseLayoutManager.getSingleLayout(layoutWidth, layoutHeight);
    } else {
      if (this.getMode() === fm.icelink.webrtc.layoutMode.FloatLocal) {
        singleLayout = this.getFloatLocalLayout(layoutWidth, layoutHeight, remoteCount);
      } else {
        if (this.getMode() === fm.icelink.webrtc.layoutMode.FloatRemote) {
          singleLayout = this.getFloatRemoteLayout(layoutWidth, layoutHeight, remoteCount);
        } else {
          if (this.getMode() === fm.icelink.webrtc.layoutMode.Block) {
            singleLayout = this.getBlockLayout(layoutWidth, layoutHeight, remoteCount);
          } else {
            singleLayout = this.getInlineLayout(layoutWidth, layoutHeight, remoteCount);
          }
        }
      }
    }
    fm.icelink.webrtc.baseLayoutManager.transformFrame(singleLayout.getLocalFrame(), this.getLayoutOrigin(), layoutWidth, layoutHeight);
    _var0 = singleLayout.getRemoteFrames();
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      frame = _var0[_i];
      fm.icelink.webrtc.baseLayoutManager.transformFrame(frame, this.getLayoutOrigin(), layoutWidth, layoutHeight);
    }
    onLayout = this.getOnLayout();
    _var1 = onLayout;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      try {
        p = new fm.icelink.webrtc.layoutArgs();
        p.setLayout(singleLayout);
        p.setLayoutWidth(layoutWidth);
        p.setLayoutHeight(layoutHeight);
        p.setRemoteCount(remoteCount);
        p.setLayoutManager(this);
        onLayout(p);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, "BaseLayoutManager -> OnLayout");
        }
      } finally {

      }
    }
    return singleLayout;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-getLayoutOrigin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the layout origin.
  	 Defaults to <see cref="fm.icelink.webrtc.layoutOrigin.TopLeft">fm.icelink.webrtc.layoutOrigin.TopLeft</see>.
  	 </div>
  
  	@function getLayoutOrigin
  	@return {fm.icelink.webrtc.layoutOrigin}
  */


  baseLayoutManager.prototype.getLayoutOrigin = function() {
    return this._layoutOrigin;
  };

  baseLayoutManager.prototype.getLeftColumnIndexes = function() {
    var frames, num2, num3, num4, numArray, xMin;
    frames = arguments[0];
    xMin = fm.icelink.webrtc.baseLayoutManager.getXMin(frames);
    num2 = 0;
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getX() === xMin) {
          num2++;
        }
      } finally {
        num3++;
      }
    }
    num4 = 0;
    numArray = new Array(num2);
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getX() === xMin) {
          numArray[num4++] = num3;
        }
      } finally {
        num3++;
      }
    }
    return numArray;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-getLocalVideoControl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local video control from the layout.
  	 </div>
  	@function getLocalVideoControl
  	@return {fm.object} The local video control.
  */


  baseLayoutManager.prototype.getLocalVideoControl = function() {
    return this._localVideoControl;
  };

  baseLayoutManager.prototype.getNewestRemoteVideoControl = function() {
    var peerId, remoteVideoControlsInternal, _var0;
    peerId = arguments[0];
    remoteVideoControlsInternal = this.getRemoteVideoControlsInternal(peerId);
    _var0 = remoteVideoControlsInternal;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return remoteVideoControlsInternal[0];
  };

  baseLayoutManager.prototype.getOldestRemoteVideoControl = function() {
    var peerId, remoteVideoControlsInternal, _var0;
    peerId = arguments[0];
    remoteVideoControlsInternal = this.getRemoteVideoControlsInternal(peerId);
    _var0 = remoteVideoControlsInternal;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return remoteVideoControlsInternal[remoteVideoControlsInternal.length - 1];
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-getOnLayout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a callback to invoke when a layout
  	 is calculated. Allows custom algorithms to modify
  	 the default layout.
  	 </div>
  
  	@function getOnLayout
  	@return {fm.singleAction}
  */


  baseLayoutManager.prototype.getOnLayout = function() {
    return this._onLayout;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-getOnLayoutComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a callback to invoke when a layout
  	 is calculated. Allows custom algorithms to modify
  	 the default layout.
  	 </div>
  
  	@function getOnLayoutComplete
  	@return {fm.singleAction}
  */


  baseLayoutManager.prototype.getOnLayoutComplete = function() {
    return this._onLayoutComplete;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-getPeerIds'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the IDs of peers with remote video controls in the layout.
  	 </div>
  	@function getPeerIds
  	@return {fm.array} The peer IDs.
  */


  baseLayoutManager.prototype.getPeerIds = function() {
    var list, str, _i, _len, _var0;
    list = [];
    _var0 = fm.hashExtensions.getKeys(this._remoteVideoControlsTable);
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      str = _var0[_i];
      fm.arrayExtensions.add(list, str);
    }
    return fm.arrayExtensions.toArray(list);
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-getRemoteVideoControl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a remote video control from the layout.
  	 </div>
  	@function getRemoteVideoControl
  	@param {String} peerId The peer ID.
  	@return {fm.object} The remote video control.
  */


  baseLayoutManager.prototype.getRemoteVideoControl = function() {
    var peerId, _var0;
    peerId = arguments[0];
    _var0 = peerId;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("Could not get remote video control. The peer ID cannot be null.");
    }
    return this.getNewestRemoteVideoControl(peerId);
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-getRemoteVideoControls'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets remote video controls from the layout.
  	 </div>
  	@function getRemoteVideoControls
  	@param {fm.array} peerIds The peer IDs.
  	@return {fm.array} The remote video controls.
  */


  baseLayoutManager.prototype.getRemoteVideoControls = function() {
    var list, peerIds, str, _i, _len, _var0, _var1;
    if (arguments.length === 0) {
      return this.getRemoteVideoControls(this.getPeerIds());
      return;
    }
    if (arguments.length === 1) {
      peerIds = arguments[0];
      _var0 = peerIds;
      if (_var0 === null || typeof _var0 === 'undefined') {
        throw new Error("Could not get remote video controls. The peer IDs cannot be null.");
      }
      list = [];
      _var1 = peerIds;
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        str = _var1[_i];
        fm.arrayExtensions.add(list, this.getRemoteVideoControl(str));
      }
      return fm.arrayExtensions.toArray(list);
    }
  };

  baseLayoutManager.prototype.getRemoteVideoControlsInternal = function() {
    var objArray, peerId, _var0, _var1, _var2;
    peerId = arguments[0];
    _var0 = peerId;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("The peer ID cannot be null.");
    }
    objArray = null;
    _var1 = new fm.holder(objArray);
    _var2 = fm.hashExtensions.tryGetValue(this._remoteVideoControlsTable, peerId, _var1);
    objArray = _var1.getValue();
    _var2;

    return objArray;
  };

  baseLayoutManager.prototype.getRightColumnIndexes = function() {
    var frames, num2, num3, num4, numArray, xMax;
    frames = arguments[0];
    xMax = fm.icelink.webrtc.baseLayoutManager.getXMax(frames);
    num2 = 0;
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getX() === xMax) {
          num2++;
        }
      } finally {
        num3++;
      }
    }
    num4 = 0;
    numArray = new Array(num2);
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getX() === xMax) {
          numArray[num4++] = num3;
        }
      } finally {
        num3++;
      }
    }
    return numArray;
  };

  baseLayoutManager.prototype.getTopRowIndexes = function() {
    var frames, num2, num3, num4, numArray, yMin;
    frames = arguments[0];
    yMin = fm.icelink.webrtc.baseLayoutManager.getYMin(frames);
    num2 = 0;
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getY() === yMin) {
          num2++;
        }
      } finally {
        num3++;
      }
    }
    num4 = 0;
    numArray = new Array(num2);
    num3 = 0;
    while (num3 < frames.length) {
      try {
        if (frames[num3].getY() === yMin) {
          numArray[num4++] = num3;
        }
      } finally {
        num3++;
      }
    }
    return numArray;
  };

  baseLayoutManager.prototype.raiseUnhandledException = function() {
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
        fm.asyncException.asyncThrow(exception2, "BaseLayoutManager -> OnUnhandledException");
      } finally {

      }
      return p.getHandled();
    }
    return false;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-removeFromContainer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a control from the container.
  	 </div>
  	@function removeFromContainer
  	@param {fm.object} control The control to remove.
  	@return {void}
  */


  baseLayoutManager.prototype.removeFromContainer = function() {
    var control;
    return control = arguments[0];
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-removeOnUnhandledException'>&nbsp;</span>
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


  baseLayoutManager.prototype.removeOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.remove(this._onUnhandledException, value);
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-removeRemoteVideoControl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a remote video control from the layout.
  	 </div>
  	@function removeRemoteVideoControl
  	@param {String} peerId The peer ID.
  	@return {Boolean} true if successful; otherwise, false. Check the logs for additional information.
  */


  baseLayoutManager.prototype.removeRemoteVideoControl = function() {
    var oldestRemoteVideoControl, peerId, _var0, _var1;
    peerId = arguments[0];
    _var0 = peerId;
    if (_var0 === null || typeof _var0 === 'undefined') {
      fm.log.warn("Could not remove remote video control. The peer ID cannot be null.");
      return false;
    }
    oldestRemoteVideoControl = this.getOldestRemoteVideoControl(peerId);
    _var1 = oldestRemoteVideoControl;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      try {
        this.runOnUIThread(this.removeRemoteVideoControlUI, peerId, oldestRemoteVideoControl);
      } catch (exception) {
        fm.log.error("Could not remove remote video control.", exception);
      } finally {

      }
    }
    return true;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-removeRemoteVideoControls'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes remote video controls from the layout.
  	 </div>
  	@function removeRemoteVideoControls
  	@param {fm.array} peerIds The peer IDs.
  	@return {Boolean} true if successful; otherwise, false. Check the logs for additional information.
  */


  baseLayoutManager.prototype.removeRemoteVideoControls = function() {
    var peerIds, _var0;
    if (arguments.length === 0) {
      this.removeRemoteVideoControls(this.getPeerIds());
      return;
    }
    if (arguments.length === 1) {
      peerIds = arguments[0];
      _var0 = peerIds;
      if (_var0 === null || typeof _var0 === 'undefined') {
        fm.log.warn("Could not remove remote video controls. The peer IDs cannot be null.");
        return false;
      }
      try {
        this.runOnUIThread(this.removeRemoteVideoControlsUI, peerIds, this.getRemoteVideoControls(peerIds));
      } catch (exception) {
        fm.log.error("Could not remove remote video controls.", exception);
      } finally {

      }
      return true;
    }
  };

  baseLayoutManager.prototype.removeRemoteVideoControlsUI = function() {
    var i, objArray, peerIdsObj, remoteVideoControlsObj, strArray;
    peerIdsObj = arguments[0];
    remoteVideoControlsObj = arguments[1];
    strArray = peerIdsObj;
    objArray = remoteVideoControlsObj;
    this._inBatch = true;
    i = 0;
    while (i < strArray.length) {
      try {
        this.removeRemoteVideoControlUI(strArray[i], objArray[i]);
      } finally {
        i++;
      }
    }
    this._inBatch = false;
    return this.doLayout();
  };

  baseLayoutManager.prototype.removeRemoteVideoControlUI = function() {
    var list, peerId, peerIdObj, remoteVideoControl, remoteVideoControlsInternal, _var0;
    peerIdObj = arguments[0];
    remoteVideoControl = arguments[1];
    peerId = peerIdObj;
    list = [];
    remoteVideoControlsInternal = this.getRemoteVideoControlsInternal(peerId);
    _var0 = remoteVideoControlsInternal;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      fm.arrayExtensions.addRange(list, remoteVideoControlsInternal);
    }
    fm.arrayExtensions.remove(list, remoteVideoControl);
    this.removeFromContainer(remoteVideoControl);
    if (fm.arrayExtensions.getCount(list) === 0) {
      fm.hashExtensions.remove(this._remoteVideoControlsTable, peerId);
    } else {
      this._remoteVideoControlsTable[peerId] = fm.arrayExtensions.toArray(list);
    }
    if (!this._inBatch) {
      return this.doLayout();
    }
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-reset'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes all remote video controls from the layout,
  	 then removes the local video control from the layout.
  	 </div>
  
  	@function reset
  	@return {void}
  */


  baseLayoutManager.prototype.reset = function() {
    this.removeRemoteVideoControls();
    return this.unsetLocalVideoControl();
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-runOnUIThread'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Runs an action on the main/UI thread.
  	 </div>
  	@function runOnUIThread
  	@param {fm.doubleAction} action The action to invoke.
  	@param {fm.object} arg1 The first argument.
  	@param {fm.object} arg2 The second argument.
  	@return {void}
  */


  baseLayoutManager.prototype.runOnUIThread = function() {
    var action, arg1, arg2;
    action = arguments[0];
    arg1 = arguments[1];
    return arg2 = arguments[2];
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-setLayoutOrigin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the layout origin.
  	 Defaults to <see cref="fm.icelink.webrtc.layoutOrigin.TopLeft">fm.icelink.webrtc.layoutOrigin.TopLeft</see>.
  	 </div>
  
  	@function setLayoutOrigin
  	@param {fm.icelink.webrtc.layoutOrigin} value
  	@return {void}
  */


  baseLayoutManager.prototype.setLayoutOrigin = function() {
    var value;
    value = arguments[0];
    return this._layoutOrigin = value;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-setLocalVideoControl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds the local video control to the layout.
  	 </div>
  	@function setLocalVideoControl
  	@param {fm.object} localVideoControl The local video control.
  	@return {Boolean} true if successful; otherwise, false. Check the logs for additional information.
  */


  baseLayoutManager.prototype.setLocalVideoControl = function() {
    var localVideoControl, _var0, _var1, _var2;
    localVideoControl = arguments[0];
    _var0 = localVideoControl;
    if (_var0 === null || typeof _var0 === 'undefined') {
      fm.log.warn("Could not set local video control. The local video control cannot be null.");
      return false;
    }
    _var1 = this.getLocalVideoControl();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      fm.log.warn("Could not set local video control. A local video control already exists.");
      return false;
    }
    _var2 = localVideoControl;
    if (_var2 !== null && typeof _var2 !== 'undefined') {
      try {
        this.runOnUIThread(this.setLocalVideoControlUI, localVideoControl, null);
      } catch (exception) {
        fm.log.error("Could not set local video control.", exception);
      } finally {

      }
    }
    return true;
  };

  baseLayoutManager.prototype.setLocalVideoControlUI = function() {
    var localVideoControl, unused;
    localVideoControl = arguments[0];
    unused = arguments[1];
    this._localVideoControl = localVideoControl;
    this.addToContainer(localVideoControl);
    return this.doLayout();
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-setOnLayout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a callback to invoke when a layout
  	 is calculated. Allows custom algorithms to modify
  	 the default layout.
  	 </div>
  
  	@function setOnLayout
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLayoutManager.prototype.setOnLayout = function() {
    var value;
    value = arguments[0];
    return this._onLayout = value;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-setOnLayoutComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a callback to invoke when a layout
  	 is calculated. Allows custom algorithms to modify
  	 the default layout.
  	 </div>
  
  	@function setOnLayoutComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseLayoutManager.prototype.setOnLayoutComplete = function() {
    var value;
    value = arguments[0];
    return this._onLayoutComplete = value;
  };

  /*<span id='method-fm.icelink.webrtc.baseLayoutManager-unsetLocalVideoControl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes the local video control from the layout.
  	 </div>
  	@function unsetLocalVideoControl
  	@return {Boolean} true if successful; otherwise, false. Check the logs for additional information.
  */


  baseLayoutManager.prototype.unsetLocalVideoControl = function() {
    var localVideoControl, _var0;
    localVideoControl = this.getLocalVideoControl();
    _var0 = localVideoControl;
    if (_var0 === null || typeof _var0 === 'undefined') {
      fm.log.warn("Could not unset local video control. A local video control does not exist.");
      return false;
    }
    try {
      this.runOnUIThread(this.unsetLocalVideoControlUI, localVideoControl, null);
    } catch (exception) {
      fm.log.error("Could not unset local video control.", exception);
    } finally {

    }
    return true;
  };

  baseLayoutManager.prototype.unsetLocalVideoControlUI = function() {
    var localVideoControl, unused;
    localVideoControl = arguments[0];
    unused = arguments[1];
    this._localVideoControl = null;
    this.removeFromContainer(localVideoControl);
    return this.doLayout();
  };

  return baseLayoutManager;

}).call(this, fm.icelink.webrtc.layoutPreset);


/*<span id='cls-fm.icelink.webrtc.getMediaCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.getMediaCompleteArgs
 <div>
 Arguments for the get-media complete event.
 </div>

@extends fm.icelink.webrtc.baseMediaArgs
*/


fm.icelink.webrtc.getMediaCompleteArgs = (function(_super) {

  __extends(getMediaCompleteArgs, _super);

  function getMediaCompleteArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      getMediaCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    getMediaCompleteArgs.__super__.constructor.call(this);
  }

  return getMediaCompleteArgs;

})(fm.icelink.webrtc.baseMediaArgs);


/*<span id='cls-fm.icelink.webrtc.getMediaFailureArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.getMediaFailureArgs
 <div>
 Arguments for the get-media failure event.
 </div>

@extends fm.icelink.webrtc.baseMediaArgs
*/


fm.icelink.webrtc.getMediaFailureArgs = (function(_super) {

  __extends(getMediaFailureArgs, _super);

  getMediaFailureArgs.prototype._exception = null;

  function getMediaFailureArgs() {
    this.setException = __bind(this.setException, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      getMediaFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    getMediaFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.webrtc.getMediaFailureArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception that occurred.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  getMediaFailureArgs.prototype.getException = function() {
    return this._exception;
  };

  getMediaFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  return getMediaFailureArgs;

})(fm.icelink.webrtc.baseMediaArgs);


/*<span id='cls-fm.icelink.webrtc.getMediaArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.getMediaArgs
 <div>
 Arguments for UserMedia.GetMedia.
 </div>

@extends fm.icelink.webrtc.baseMediaArgs
*/


fm.icelink.webrtc.getMediaArgs = (function(_super) {

  __extends(getMediaArgs, _super);

  getMediaArgs.prototype._audioCaptureProvider = null;

  getMediaArgs.prototype._createAudioRenderProvider = null;

  getMediaArgs.prototype._createVideoRenderProvider = null;

  getMediaArgs.prototype._defaultVideoPreviewScale = null;

  getMediaArgs.prototype._defaultVideoScale = null;

  getMediaArgs.prototype._onComplete = null;

  getMediaArgs.prototype._onFailure = null;

  getMediaArgs.prototype._onSuccess = null;

  getMediaArgs.prototype._videoCaptureProvider = null;

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-fm.icelink.webrtc.getMediaArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.webrtc.getMediaArgs">fm.icelink.webrtc.getMediaArgs</see> class.
  	 </div>
  	@function fm.icelink.webrtc.getMediaArgs
  	@param {Boolean} audio Whether to initialize the audio capture provider.
  	@param {Boolean} video Whether to initialize the video capture provider.
  	@return {}
  */


  function getMediaArgs() {
    this.setVideoCaptureProvider = __bind(this.setVideoCaptureProvider, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setDefaultVideoScale = __bind(this.setDefaultVideoScale, this);

    this.setDefaultVideoPreviewScale = __bind(this.setDefaultVideoPreviewScale, this);

    this.setCreateVideoRenderProvider = __bind(this.setCreateVideoRenderProvider, this);

    this.setCreateAudioRenderProvider = __bind(this.setCreateAudioRenderProvider, this);

    this.setAudioCaptureProvider = __bind(this.setAudioCaptureProvider, this);

    this.getVideoCaptureProvider = __bind(this.getVideoCaptureProvider, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getDefaultVideoScale = __bind(this.getDefaultVideoScale, this);

    this.getDefaultVideoPreviewScale = __bind(this.getDefaultVideoPreviewScale, this);

    this.getCreateVideoRenderProvider = __bind(this.getCreateVideoRenderProvider, this);

    this.getCreateAudioRenderProvider = __bind(this.getCreateAudioRenderProvider, this);

    this.getAudioCaptureProvider = __bind(this.getAudioCaptureProvider, this);

    var audio, video;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      getMediaArgs.__super__.constructor.call(this);
      this.setVideoWidth(320);
      this.setVideoHeight(240);
      this.setVideoFrameRate(15);
      this.setDefaultVideoScale(fm.icelink.webrtc.layoutScale.Contain);
      this.setDefaultVideoPreviewScale(fm.icelink.webrtc.layoutScale.Contain);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      getMediaArgs.__super__.constructor.call(this);
      this.setVideoWidth(320);
      this.setVideoHeight(240);
      this.setVideoFrameRate(15);
      this.setDefaultVideoScale(fm.icelink.webrtc.layoutScale.Contain);
      this.setDefaultVideoPreviewScale(fm.icelink.webrtc.layoutScale.Contain);
      return;
    }
    if (arguments.length === 2) {
      audio = arguments[0];
      video = arguments[1];
      getMediaArgs.call(this);
      this.setAudio(audio);
      this.setVideo(video);
      return;
    }
  }

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-getAudioCaptureProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local audio capture provider.
  	 If <see cref="fm.icelink.webrtc.baseMediaArgs.audio">fm.icelink.webrtc.baseMediaArgs.audio</see> is set to true and this is null,
  	 a default audio capture provider will be initialized
  	 that uses the device microphone as the media source.
  	 </div>
  
  	@function getAudioCaptureProvider
  	@return {fm.icelink.webrtc.audioCaptureProvider}
  */


  getMediaArgs.prototype.getAudioCaptureProvider = function() {
    return this._audioCaptureProvider;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-getCreateAudioRenderProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback for creating a local audio render provider.
  	 </div>
  
  	@function getCreateAudioRenderProvider
  	@return {fm.singleFunction}
  */


  getMediaArgs.prototype.getCreateAudioRenderProvider = function() {
    return this._createAudioRenderProvider;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-getCreateVideoRenderProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback for creating a local video render provider.
  	 </div>
  
  	@function getCreateVideoRenderProvider
  	@return {fm.singleFunction}
  */


  getMediaArgs.prototype.getCreateVideoRenderProvider = function() {
    return this._createVideoRenderProvider;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-getDefaultVideoPreviewScale'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the scaling to apply to the preview control created by the
  	 default video capture provider.
  	 </div>
  
  	@function getDefaultVideoPreviewScale
  	@return {fm.icelink.webrtc.layoutScale}
  */


  getMediaArgs.prototype.getDefaultVideoPreviewScale = function() {
    return this._defaultVideoPreviewScale;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-getDefaultVideoScale'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the scaling to apply to the controls created by the
  	 default video render providers.
  	 </div>
  
  	@function getDefaultVideoScale
  	@return {fm.icelink.webrtc.layoutScale}
  */


  getMediaArgs.prototype.getDefaultVideoScale = function() {
    return this._defaultVideoScale;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when the operation completes, whether it succeeds or not.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  getMediaArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if a local media stream cannot be created.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  getMediaArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when the local media stream is ready.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  getMediaArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-getVideoCaptureProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local video capture provider.
  	 If <see cref="fm.icelink.webrtc.baseMediaArgs.video">fm.icelink.webrtc.baseMediaArgs.video</see> is set to true and this is null,
  	 a default video capture provider will be initialized
  	 that uses the device camera as the media source.
  	 </div>
  
  	@function getVideoCaptureProvider
  	@return {fm.icelink.webrtc.videoCaptureProvider}
  */


  getMediaArgs.prototype.getVideoCaptureProvider = function() {
    return this._videoCaptureProvider;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-setAudioCaptureProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the local audio capture provider.
  	 If <see cref="fm.icelink.webrtc.baseMediaArgs.audio">fm.icelink.webrtc.baseMediaArgs.audio</see> is set to true and this is null,
  	 a default audio capture provider will be initialized
  	 that uses the device microphone as the media source.
  	 </div>
  
  	@function setAudioCaptureProvider
  	@param {fm.icelink.webrtc.audioCaptureProvider} value
  	@return {void}
  */


  getMediaArgs.prototype.setAudioCaptureProvider = function() {
    var value;
    value = arguments[0];
    return this._audioCaptureProvider = value;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-setCreateAudioRenderProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback for creating a local audio render provider.
  	 </div>
  
  	@function setCreateAudioRenderProvider
  	@param {fm.singleFunction} value
  	@return {void}
  */


  getMediaArgs.prototype.setCreateAudioRenderProvider = function() {
    var value;
    value = arguments[0];
    return this._createAudioRenderProvider = value;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-setCreateVideoRenderProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback for creating a local video render provider.
  	 </div>
  
  	@function setCreateVideoRenderProvider
  	@param {fm.singleFunction} value
  	@return {void}
  */


  getMediaArgs.prototype.setCreateVideoRenderProvider = function() {
    var value;
    value = arguments[0];
    return this._createVideoRenderProvider = value;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-setDefaultVideoPreviewScale'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the scaling to apply to the preview control created by the
  	 default video capture provider.
  	 </div>
  
  	@function setDefaultVideoPreviewScale
  	@param {fm.icelink.webrtc.layoutScale} value
  	@return {void}
  */


  getMediaArgs.prototype.setDefaultVideoPreviewScale = function() {
    var value;
    value = arguments[0];
    return this._defaultVideoPreviewScale = value;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-setDefaultVideoScale'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the scaling to apply to the controls created by the
  	 default video render providers.
  	 </div>
  
  	@function setDefaultVideoScale
  	@param {fm.icelink.webrtc.layoutScale} value
  	@return {void}
  */


  getMediaArgs.prototype.setDefaultVideoScale = function() {
    var value;
    value = arguments[0];
    return this._defaultVideoScale = value;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when the operation completes, whether it succeeds or not.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  getMediaArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if a local media stream cannot be created.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  getMediaArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when the local media stream is ready.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  getMediaArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaArgs-setVideoCaptureProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the local video capture provider.
  	 If <see cref="fm.icelink.webrtc.baseMediaArgs.video">fm.icelink.webrtc.baseMediaArgs.video</see> is set to true and this is null,
  	 a default video capture provider will be initialized
  	 that uses the device camera as the media source.
  	 </div>
  
  	@function setVideoCaptureProvider
  	@param {fm.icelink.webrtc.videoCaptureProvider} value
  	@return {void}
  */


  getMediaArgs.prototype.setVideoCaptureProvider = function() {
    var value;
    value = arguments[0];
    return this._videoCaptureProvider = value;
  };

  return getMediaArgs;

})(fm.icelink.webrtc.baseMediaArgs);


/*<span id='cls-fm.icelink.webrtc.getMediaSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.getMediaSuccessArgs
 <div>
 Arguments for the get-media success event.
 </div>

@extends fm.icelink.webrtc.baseMediaArgs
*/


fm.icelink.webrtc.getMediaSuccessArgs = (function(_super) {

  __extends(getMediaSuccessArgs, _super);

  getMediaSuccessArgs.prototype._audioDeviceLabel = null;

  getMediaSuccessArgs.prototype._localStream = null;

  getMediaSuccessArgs.prototype._localVideoControl = null;

  getMediaSuccessArgs.prototype._videoDeviceLabel = null;

  function getMediaSuccessArgs() {
    this.setVideoDeviceLabel = __bind(this.setVideoDeviceLabel, this);

    this.setLocalVideoControl = __bind(this.setLocalVideoControl, this);

    this.setLocalStream = __bind(this.setLocalStream, this);

    this.setAudioDeviceLabel = __bind(this.setAudioDeviceLabel, this);

    this.getVideoDeviceLabel = __bind(this.getVideoDeviceLabel, this);

    this.getLocalVideoControl = __bind(this.getLocalVideoControl, this);

    this.getLocalStream = __bind(this.getLocalStream, this);

    this.getAudioDeviceLabel = __bind(this.getAudioDeviceLabel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      getMediaSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    getMediaSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.webrtc.getMediaSuccessArgs-getAudioDeviceLabel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the audio device label.
  	 </div>
  
  	@function getAudioDeviceLabel
  	@return {String}
  */


  getMediaSuccessArgs.prototype.getAudioDeviceLabel = function() {
    return this._audioDeviceLabel;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaSuccessArgs-getLocalStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local media stream.
  	 </div>
  
  	@function getLocalStream
  	@return {fm.icelink.webrtc.localMediaStream}
  */


  getMediaSuccessArgs.prototype.getLocalStream = function() {
    return this._localStream;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaSuccessArgs-getLocalVideoControl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local video control.
  	 </div>
  
  	@function getLocalVideoControl
  	@return {fm.object}
  */


  getMediaSuccessArgs.prototype.getLocalVideoControl = function() {
    return this._localVideoControl;
  };

  /*<span id='method-fm.icelink.webrtc.getMediaSuccessArgs-getVideoDeviceLabel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the video device label.
  	 </div>
  
  	@function getVideoDeviceLabel
  	@return {String}
  */


  getMediaSuccessArgs.prototype.getVideoDeviceLabel = function() {
    return this._videoDeviceLabel;
  };

  getMediaSuccessArgs.prototype.setAudioDeviceLabel = function() {
    var value;
    value = arguments[0];
    return this._audioDeviceLabel = value;
  };

  getMediaSuccessArgs.prototype.setLocalStream = function() {
    var value;
    value = arguments[0];
    return this._localStream = value;
  };

  getMediaSuccessArgs.prototype.setLocalVideoControl = function() {
    var value;
    value = arguments[0];
    return this._localVideoControl = value;
  };

  getMediaSuccessArgs.prototype.setVideoDeviceLabel = function() {
    var value;
    value = arguments[0];
    return this._videoDeviceLabel = value;
  };

  return getMediaSuccessArgs;

})(fm.icelink.webrtc.baseMediaArgs);


/*<span id='cls-fm.icelink.webrtc.linkExtensions'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.linkExtensions
 <div>
 Extension methods for <see cref="fm.icelink.link">fm.icelink.link</see> instances.
 </div>
*/

fm.icelink.webrtc.linkExtensions = (function() {

  linkExtensions._dataChannelSsrcMapKey = null;

  linkExtensions._localAudioRenderKey = null;

  linkExtensions._localVideoRenderKey = null;

  linkExtensions._remoteAudioRenderKey = null;

  linkExtensions._remoteDataChannelCaptureKey = null;

  linkExtensions._remoteDataChannelRenderKey = null;

  linkExtensions._remoteStreamKey = null;

  linkExtensions._remoteVideoRenderKey = null;

  function linkExtensions() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      linkExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
  }

  linkExtensions.getDataChannelSsrcMap = function() {
    var link;
    link = arguments[0];
    return fm.global.tryCastObject(link.getDynamicValue(fm.icelink.webrtc.linkExtensions._dataChannelSsrcMapKey));
  };

  linkExtensions.getDeleteRemoteStream = function() {
    var link, remoteStream;
    link = arguments[0];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    link.unsetDynamicValue(fm.icelink.webrtc.linkExtensions._remoteStreamKey);
    return remoteStream;
  };

  linkExtensions.getInsertRemoteStream = function() {
    var link, remoteStream, _var0;
    link = arguments[0];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    _var0 = remoteStream;
    if (_var0 === null || typeof _var0 === 'undefined') {
      remoteStream = new fm.icelink.webrtc.mediaStream();
      link.setDynamicValue(fm.icelink.webrtc.linkExtensions._remoteStreamKey, remoteStream);
    }
    return remoteStream;
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-getLocalAudioRenderProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local audio render provider.
  	 </div>
  	@function getLocalAudioRenderProvider
  	@param {fm.icelink.link} link The link.
  	@return {fm.icelink.webrtc.audioRenderProvider} The local audio render provider.
  */


  linkExtensions.getLocalAudioRenderProvider = function() {
    var link;
    link = arguments[0];
    return fm.global.tryCast(link.getDynamicValue(fm.icelink.webrtc.linkExtensions._localAudioRenderKey), fm.icelink.webrtc.audioRenderProvider);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-getLocalVideoRenderProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local video render provider.
  	 </div>
  	@function getLocalVideoRenderProvider
  	@param {fm.icelink.link} link The link.
  	@return {fm.icelink.webrtc.videoRenderProvider} The local video render provider.
  */


  linkExtensions.getLocalVideoRenderProvider = function() {
    var link;
    link = arguments[0];
    return fm.global.tryCast(link.getDynamicValue(fm.icelink.webrtc.linkExtensions._localVideoRenderKey), fm.icelink.webrtc.videoRenderProvider);
  };

  linkExtensions.getRemoteAudioRenderProvider = function() {
    var link;
    link = arguments[0];
    return fm.global.tryCast(link.getDynamicValue(fm.icelink.webrtc.linkExtensions._remoteAudioRenderKey), fm.icelink.webrtc.remoteAudioRenderProvider);
  };

  linkExtensions.getRemoteDataChannelCaptureProvider = function() {
    var link;
    link = arguments[0];
    return fm.global.tryCast(link.getDynamicValue(fm.icelink.webrtc.linkExtensions._remoteDataChannelCaptureKey), fm.icelink.webrtc.remoteDataChannelCaptureProvider);
  };

  linkExtensions.getRemoteDataChannelRenderProvider = function() {
    var link;
    link = arguments[0];
    return fm.global.tryCast(link.getDynamicValue(fm.icelink.webrtc.linkExtensions._remoteDataChannelRenderKey), fm.icelink.webrtc.remoteDataChannelRenderProvider);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-getRemoteStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the remote media stream.
  	 </div>
  	@function getRemoteStream
  	@param {fm.icelink.link} link The link.
  	@return {fm.icelink.webrtc.mediaStream} The remote media stream.
  */


  linkExtensions.getRemoteStream = function() {
    var link;
    link = arguments[0];
    return fm.global.tryCast(link.getDynamicValue(fm.icelink.webrtc.linkExtensions._remoteStreamKey), fm.icelink.webrtc.mediaStream);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-getRemoteVideoControl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the video control used for rendering remote video.
  	 </div>
  	@function getRemoteVideoControl
  	@param {fm.icelink.link} link The link.
  	@return {fm.object} The remote video control.
  */


  linkExtensions.getRemoteVideoControl = function() {
    var link, localVideoRenderProvider, _var0;
    link = arguments[0];
    localVideoRenderProvider = fm.icelink.webrtc.linkExtensions.getLocalVideoRenderProvider(link);
    _var0 = localVideoRenderProvider;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return localVideoRenderProvider.getControl();
  };

  linkExtensions.getRemoteVideoRenderProvider = function() {
    var link;
    link = arguments[0];
    return fm.global.tryCast(link.getDynamicValue(fm.icelink.webrtc.linkExtensions._remoteVideoRenderKey), fm.icelink.webrtc.remoteVideoRenderProvider);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-muteRemoteAudio'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Stops the rendering of incoming remote audio frames.
  	 </div>
  	@function muteRemoteAudio
  	@param {fm.icelink.link} link The link.
  	@return {Boolean} true if the mute operation was successful; otherwise, false.
  */


  linkExtensions.muteRemoteAudio = function() {
    var link, remoteStream, _var0;
    link = arguments[0];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    _var0 = remoteStream;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return false;
    }
    return remoteStream.muteAudio();
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-muteRemoteVideo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Stops the rendering of incoming remote video frames.
  	 </div>
  	@function muteRemoteVideo
  	@param {fm.icelink.link} link The link.
  	@return {Boolean} true if the mute operation was successful; otherwise, false.
  */


  linkExtensions.muteRemoteVideo = function() {
    var link, remoteStream, _var0;
    link = arguments[0];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    _var0 = remoteStream;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return false;
    }
    return remoteStream.muteVideo();
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-remoteAudioIsMuted'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the remote audio is muted.
  	 </div>
  	@function remoteAudioIsMuted
  	@param {fm.icelink.link} link The link.
  	@return {Boolean} true if the remote audio is muted; otherwise, false.
  */


  linkExtensions.remoteAudioIsMuted = function() {
    var link, remoteStream, _var0;
    link = arguments[0];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    _var0 = remoteStream;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return false;
    }
    return remoteStream.getAudioIsMuted();
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-remoteVideoIsMuted'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the remote video is muted.
  	 </div>
  	@function remoteVideoIsMuted
  	@param {fm.icelink.link} link The link.
  	@return {Boolean} true if the remote video is muted; otherwise, false.
  */


  linkExtensions.remoteVideoIsMuted = function() {
    var link, remoteStream, _var0;
    link = arguments[0];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    _var0 = remoteStream;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return false;
    }
    return remoteStream.getVideoIsMuted();
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-renderRemoteAudio'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Force-renders audio to the audio control used to play remote audio.
  	 </div>
  	@function renderRemoteAudio
  	@param {fm.icelink.link} link The link.
  	@param {fm.icelink.webrtc.audioBuffer} audioBuffer The audio buffer.
  	@return {void}
  */


  linkExtensions.renderRemoteAudio = function() {
    var audioBuffer, link, remoteStream, _var0;
    link = arguments[0];
    audioBuffer = arguments[1];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    _var0 = remoteStream;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return remoteStream.renderAudio(audioBuffer);
    }
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-renderRemoteVideo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Force-renders video to the video control used to display remote video.
  	 </div>
  	@function renderRemoteVideo
  	@param {fm.icelink.link} link The link.
  	@param {fm.icelink.webrtc.videoBuffer} videoBuffer The video buffer.
  	@return {void}
  */


  linkExtensions.renderRemoteVideo = function() {
    var link, remoteStream, videoBuffer, _var0;
    link = arguments[0];
    videoBuffer = arguments[1];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    _var0 = remoteStream;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return remoteStream.renderVideo(videoBuffer);
    }
  };

  linkExtensions.setDataChannelSsrcMap = function() {
    var link, remoteDataSsrcMap;
    link = arguments[0];
    remoteDataSsrcMap = arguments[1];
    return link.setDynamicValue(fm.icelink.webrtc.linkExtensions._dataChannelSsrcMapKey, remoteDataSsrcMap);
  };

  linkExtensions.setLocalAudioRenderProvider = function() {
    var link, localAudioRender;
    link = arguments[0];
    localAudioRender = arguments[1];
    return link.setDynamicValue(fm.icelink.webrtc.linkExtensions._localAudioRenderKey, localAudioRender);
  };

  linkExtensions.setLocalVideoRenderProvider = function() {
    var link, localVideoRender;
    link = arguments[0];
    localVideoRender = arguments[1];
    return link.setDynamicValue(fm.icelink.webrtc.linkExtensions._localVideoRenderKey, localVideoRender);
  };

  linkExtensions.setRemoteAudioRenderProvider = function() {
    var link, remoteAudioRender;
    link = arguments[0];
    remoteAudioRender = arguments[1];
    return link.setDynamicValue(fm.icelink.webrtc.linkExtensions._remoteAudioRenderKey, remoteAudioRender);
  };

  linkExtensions.setRemoteDataChannelCaptureProvider = function() {
    var link, remoteDataChannelCapture;
    link = arguments[0];
    remoteDataChannelCapture = arguments[1];
    return link.setDynamicValue(fm.icelink.webrtc.linkExtensions._remoteDataChannelCaptureKey, remoteDataChannelCapture);
  };

  linkExtensions.setRemoteDataChannelRenderProvider = function() {
    var link, remoteDataChannelRender;
    link = arguments[0];
    remoteDataChannelRender = arguments[1];
    return link.setDynamicValue(fm.icelink.webrtc.linkExtensions._remoteDataChannelRenderKey, remoteDataChannelRender);
  };

  linkExtensions.setRemoteVideoRenderProvider = function() {
    var link, remoteVideoRender;
    link = arguments[0];
    remoteVideoRender = arguments[1];
    return link.setDynamicValue(fm.icelink.webrtc.linkExtensions._remoteVideoRenderKey, remoteVideoRender);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-toggleRemoteAudioMute'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Toggles the rendering of incoming remote audio frames.
  	 </div>
  	@function toggleRemoteAudioMute
  	@param {fm.icelink.link} link The link.
  	@return {Boolean} true if the operation was successful; otherwise, false.
  */


  linkExtensions.toggleRemoteAudioMute = function() {
    var link;
    link = arguments[0];
    if (fm.icelink.webrtc.linkExtensions.remoteAudioIsMuted(link)) {
      return fm.icelink.webrtc.linkExtensions.unmuteRemoteAudio(link);
    }
    return fm.icelink.webrtc.linkExtensions.muteRemoteAudio(link);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-toggleRemoteVideoMute'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Toggles the rendering of incoming remote video frames.
  	 </div>
  	@function toggleRemoteVideoMute
  	@param {fm.icelink.link} link The link.
  	@return {Boolean} true if the operation was successful; otherwise, false.
  */


  linkExtensions.toggleRemoteVideoMute = function() {
    var link;
    link = arguments[0];
    if (fm.icelink.webrtc.linkExtensions.remoteVideoIsMuted(link)) {
      return fm.icelink.webrtc.linkExtensions.unmuteRemoteVideo(link);
    }
    return fm.icelink.webrtc.linkExtensions.muteRemoteVideo(link);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-unmuteRemoteAudio'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Starts the rendering of incoming remote audio frames.
  	 </div>
  	@function unmuteRemoteAudio
  	@param {fm.icelink.link} link The link.
  	@return {Boolean} true if the unmute operation was successful; otherwise, false.
  */


  linkExtensions.unmuteRemoteAudio = function() {
    var link, remoteStream, _var0;
    link = arguments[0];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    _var0 = remoteStream;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return false;
    }
    return remoteStream.unmuteAudio();
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-unmuteRemoteVideo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Starts the rendering of incoming remote video frames.
  	 </div>
  	@function unmuteRemoteVideo
  	@param {fm.icelink.link} link The link.
  	@return {Boolean} true if the unmute operation was successful; otherwise, false.
  */


  linkExtensions.unmuteRemoteVideo = function() {
    var link, remoteStream, _var0;
    link = arguments[0];
    remoteStream = fm.icelink.webrtc.linkExtensions.getRemoteStream(link);
    _var0 = remoteStream;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return false;
    }
    return remoteStream.unmuteVideo();
  };

  linkExtensions.unsetDataChannelSsrcMap = function() {
    var link;
    link = arguments[0];
    return link.unsetDynamicValue(fm.icelink.webrtc.linkExtensions._dataChannelSsrcMapKey);
  };

  linkExtensions.unsetLocalAudioRenderProvider = function() {
    var link;
    link = arguments[0];
    return link.unsetDynamicValue(fm.icelink.webrtc.linkExtensions._localAudioRenderKey);
  };

  linkExtensions.unsetLocalVideoRenderProvider = function() {
    var link;
    link = arguments[0];
    return link.unsetDynamicValue(fm.icelink.webrtc.linkExtensions._localVideoRenderKey);
  };

  linkExtensions.unsetRemoteAudioRenderProvider = function() {
    var link;
    link = arguments[0];
    return link.unsetDynamicValue(fm.icelink.webrtc.linkExtensions._remoteAudioRenderKey);
  };

  linkExtensions.unsetRemoteDataChannelCaptureProvider = function() {
    var link;
    link = arguments[0];
    return link.unsetDynamicValue(fm.icelink.webrtc.linkExtensions._remoteDataChannelCaptureKey);
  };

  linkExtensions.unsetRemoteDataChannelRenderProvider = function() {
    var link;
    link = arguments[0];
    return link.unsetDynamicValue(fm.icelink.webrtc.linkExtensions._remoteDataChannelRenderKey);
  };

  linkExtensions.unsetRemoteVideoRenderProvider = function() {
    var link;
    link = arguments[0];
    return link.unsetDynamicValue(fm.icelink.webrtc.linkExtensions._remoteVideoRenderKey);
  };

  fm.icelink.link.prototype.getDataChannelSsrcMap = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getDataChannelSsrcMap.apply(this, arguments);
  };

  fm.icelink.link.prototype.getDeleteRemoteStream = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getDeleteRemoteStream.apply(this, arguments);
  };

  fm.icelink.link.prototype.getInsertRemoteStream = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getInsertRemoteStream.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-getLocalAudioRenderProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local audio render provider.
  	 </div>
  	@function getLocalAudioRenderProvider
  	@return {fm.icelink.webrtc.audioRenderProvider} The local audio render provider.
  */


  fm.icelink.link.prototype.getLocalAudioRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getLocalAudioRenderProvider.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-getLocalVideoRenderProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local video render provider.
  	 </div>
  	@function getLocalVideoRenderProvider
  	@return {fm.icelink.webrtc.videoRenderProvider} The local video render provider.
  */


  fm.icelink.link.prototype.getLocalVideoRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getLocalVideoRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.getRemoteAudioRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getRemoteAudioRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.getRemoteDataChannelCaptureProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getRemoteDataChannelCaptureProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.getRemoteDataChannelRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getRemoteDataChannelRenderProvider.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-getRemoteStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the remote media stream.
  	 </div>
  	@function getRemoteStream
  	@return {fm.icelink.webrtc.mediaStream} The remote media stream.
  */


  fm.icelink.link.prototype.getRemoteStream = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getRemoteStream.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-getRemoteVideoControl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the video control used for rendering remote video.
  	 </div>
  	@function getRemoteVideoControl
  	@return {fm.object} The remote video control.
  */


  fm.icelink.link.prototype.getRemoteVideoControl = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getRemoteVideoControl.apply(this, arguments);
  };

  fm.icelink.link.prototype.getRemoteVideoRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.getRemoteVideoRenderProvider.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-muteRemoteAudio'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Stops the rendering of incoming remote audio frames.
  	 </div>
  	@function muteRemoteAudio
  	@return {Boolean} true if the mute operation was successful; otherwise, false.
  */


  fm.icelink.link.prototype.muteRemoteAudio = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.muteRemoteAudio.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-muteRemoteVideo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Stops the rendering of incoming remote video frames.
  	 </div>
  	@function muteRemoteVideo
  	@return {Boolean} true if the mute operation was successful; otherwise, false.
  */


  fm.icelink.link.prototype.muteRemoteVideo = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.muteRemoteVideo.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-remoteAudioIsMuted'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the remote audio is muted.
  	 </div>
  	@function remoteAudioIsMuted
  	@return {Boolean} true if the remote audio is muted; otherwise, false.
  */


  fm.icelink.link.prototype.remoteAudioIsMuted = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.remoteAudioIsMuted.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-remoteVideoIsMuted'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the remote video is muted.
  	 </div>
  	@function remoteVideoIsMuted
  	@return {Boolean} true if the remote video is muted; otherwise, false.
  */


  fm.icelink.link.prototype.remoteVideoIsMuted = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.remoteVideoIsMuted.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-renderRemoteAudio'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Force-renders audio to the audio control used to play remote audio.
  	 </div>
  	@function renderRemoteAudio
  	@param {fm.icelink.webrtc.audioBuffer} audioBuffer The audio buffer.
  	@return {void}
  */


  fm.icelink.link.prototype.renderRemoteAudio = function() {
    var audioBuffer;
    audioBuffer = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.renderRemoteAudio.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-renderRemoteVideo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Force-renders video to the video control used to display remote video.
  	 </div>
  	@function renderRemoteVideo
  	@param {fm.icelink.webrtc.videoBuffer} videoBuffer The video buffer.
  	@return {void}
  */


  fm.icelink.link.prototype.renderRemoteVideo = function() {
    var videoBuffer;
    videoBuffer = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.renderRemoteVideo.apply(this, arguments);
  };

  fm.icelink.link.prototype.setDataChannelSsrcMap = function() {
    var remoteDataSsrcMap;
    remoteDataSsrcMap = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.setDataChannelSsrcMap.apply(this, arguments);
  };

  fm.icelink.link.prototype.setLocalAudioRenderProvider = function() {
    var localAudioRender;
    localAudioRender = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.setLocalAudioRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.setLocalVideoRenderProvider = function() {
    var localVideoRender;
    localVideoRender = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.setLocalVideoRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.setRemoteAudioRenderProvider = function() {
    var remoteAudioRender;
    remoteAudioRender = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.setRemoteAudioRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.setRemoteDataChannelCaptureProvider = function() {
    var remoteDataChannelCapture;
    remoteDataChannelCapture = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.setRemoteDataChannelCaptureProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.setRemoteDataChannelRenderProvider = function() {
    var remoteDataChannelRender;
    remoteDataChannelRender = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.setRemoteDataChannelRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.setRemoteVideoRenderProvider = function() {
    var remoteVideoRender;
    remoteVideoRender = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.setRemoteVideoRenderProvider.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-toggleRemoteAudioMute'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Toggles the rendering of incoming remote audio frames.
  	 </div>
  	@function toggleRemoteAudioMute
  	@return {Boolean} true if the operation was successful; otherwise, false.
  */


  fm.icelink.link.prototype.toggleRemoteAudioMute = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.toggleRemoteAudioMute.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-toggleRemoteVideoMute'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Toggles the rendering of incoming remote video frames.
  	 </div>
  	@function toggleRemoteVideoMute
  	@return {Boolean} true if the operation was successful; otherwise, false.
  */


  fm.icelink.link.prototype.toggleRemoteVideoMute = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.toggleRemoteVideoMute.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-unmuteRemoteAudio'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Starts the rendering of incoming remote audio frames.
  	 </div>
  	@function unmuteRemoteAudio
  	@return {Boolean} true if the unmute operation was successful; otherwise, false.
  */


  fm.icelink.link.prototype.unmuteRemoteAudio = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.unmuteRemoteAudio.apply(this, arguments);
  };

  /*<span id='method-fm.icelink.webrtc.linkExtensions-unmuteRemoteVideo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Starts the rendering of incoming remote video frames.
  	 </div>
  	@function unmuteRemoteVideo
  	@return {Boolean} true if the unmute operation was successful; otherwise, false.
  */


  fm.icelink.link.prototype.unmuteRemoteVideo = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.unmuteRemoteVideo.apply(this, arguments);
  };

  fm.icelink.link.prototype.unsetDataChannelSsrcMap = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.unsetDataChannelSsrcMap.apply(this, arguments);
  };

  fm.icelink.link.prototype.unsetLocalAudioRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.unsetLocalAudioRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.unsetLocalVideoRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.unsetLocalVideoRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.unsetRemoteAudioRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.unsetRemoteAudioRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.unsetRemoteDataChannelCaptureProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.unsetRemoteDataChannelCaptureProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.unsetRemoteDataChannelRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.unsetRemoteDataChannelRenderProvider.apply(this, arguments);
  };

  fm.icelink.link.prototype.unsetRemoteVideoRenderProvider = function() {
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.icelink.webrtc.linkExtensions.unsetRemoteVideoRenderProvider.apply(this, arguments);
  };

  linkExtensions._remoteStreamKey = "fm.icelink.webrtc.remoteStream";

  linkExtensions._localAudioRenderKey = "fm.icelink.webrtc.localAudioRender";

  linkExtensions._localVideoRenderKey = "fm.icelink.webrtc.localVideoRender";

  linkExtensions._remoteAudioRenderKey = "fm.icelink.webrtc.remoteAudioRender";

  linkExtensions._remoteVideoRenderKey = "fm.icelink.webrtc.remoteVideoRender";

  linkExtensions._remoteDataChannelCaptureKey = "fm.icelink.webrtc.remoteDataChannelCapture";

  linkExtensions._remoteDataChannelRenderKey = "fm.icelink.webrtc.remoteDataChannelRender";

  linkExtensions._dataChannelSsrcMapKey = "fm.icelink.webrtc.dataChannelSsrcMap";

  return linkExtensions;

}).call(this);


/*<span id='cls-fm.icelink.webrtc.dataChannelInfo'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.dataChannelInfo
 <div>
 A WebRTC data channel description.
 </div>

@extends fm.object
*/


fm.icelink.webrtc.dataChannelInfo = (function(_super) {

  __extends(dataChannelInfo, _super);

  dataChannelInfo.prototype._cname = null;

  dataChannelInfo.prototype._label = null;

  dataChannelInfo.prototype._onReceive = null;

  dataChannelInfo.prototype._onUnhandledException = null;

  dataChannelInfo.prototype._synchronizationSource = 0;

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-fm.icelink.webrtc.dataChannelInfo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.icelink.webrtc.dataChannelInfo">fm.icelink.webrtc.dataChannelInfo</see> class.
  	 </div>
  	@function fm.icelink.webrtc.dataChannelInfo
  	@param {String} label The channel label.
  	@return {}
  */


  function dataChannelInfo() {
    this.toJson = __bind(this.toJson, this);

    this.setSynchronizationSource = __bind(this.setSynchronizationSource, this);

    this.setOnReceive = __bind(this.setOnReceive, this);

    this.setLabel = __bind(this.setLabel, this);

    this.setCname = __bind(this.setCname, this);

    this.removeOnUnhandledException = __bind(this.removeOnUnhandledException, this);

    this.raiseUnhandledException = __bind(this.raiseUnhandledException, this);

    this.raiseOnReceive = __bind(this.raiseOnReceive, this);

    this.getSynchronizationSource = __bind(this.getSynchronizationSource, this);

    this.getOnReceive = __bind(this.getOnReceive, this);

    this.getLabel = __bind(this.getLabel, this);

    this.getCname = __bind(this.getCname, this);

    this.addOnUnhandledException = __bind(this.addOnUnhandledException, this);

    var label, num, num2, num3, num4;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      dataChannelInfo.__super__.constructor.call(this);
      num = fm.lockedRandomizer.next(128);
      num2 = fm.lockedRandomizer.next(256);
      num3 = fm.lockedRandomizer.next(256);
      num4 = fm.lockedRandomizer.next(256);
      this.setSynchronizationSource(fm.parseAssistant.parseLong(fm.intExtensions.toString((((num * 16777216) + (num2 * 65536)) + (num3 * 256)) + num4)));
      this.setCname(fm.lockedRandomizer.randomString(16));
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 1) {
      label = arguments[0];
      dataChannelInfo.call(this);
      this.setLabel(label);
      return;
    }
    if (arguments.length === 0) {
      dataChannelInfo.__super__.constructor.call(this);
      num = fm.lockedRandomizer.next(128);
      num2 = fm.lockedRandomizer.next(256);
      num3 = fm.lockedRandomizer.next(256);
      num4 = fm.lockedRandomizer.next(256);
      this.setSynchronizationSource(fm.parseAssistant.parseLong(fm.intExtensions.toString((((num * 16777216) + (num2 * 65536)) + (num3 * 256)) + num4)));
      this.setCname(fm.lockedRandomizer.randomString(16));
      return;
    }
  }

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an instance from JSON.
  	 </div>
  	@function fromJson
  	@param {String} dataChannelInfoJson The JSON to deserialize.
  	@return {fm.icelink.webrtc.dataChannelInfo} The deserialized data channel description.
  */


  dataChannelInfo.fromJson = function() {
    var dataChannelInfoJson;
    dataChannelInfoJson = arguments[0];
    return fm.icelink.webrtc.serializer.deserializeDataChannelInfo(dataChannelInfoJson);
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-fromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an array of instances from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} dataChannelInfosJson The JSON to deserialize.
  	@return {fm.array} The deserialized data channel descriptions.
  */


  dataChannelInfo.fromJsonMultiple = function() {
    var dataChannelInfosJson;
    dataChannelInfosJson = arguments[0];
    return fm.icelink.webrtc.serializer.deserializeDataChannelInfoArray(dataChannelInfosJson);
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an instance to JSON.
  	 </div>
  	@function toJson
  	@param {fm.icelink.webrtc.dataChannelInfo} dataChannelInfo The data channel description to serialize.
  	@return {String} The serialized JSON.
  */


  dataChannelInfo.toJson = function() {
    var dataChannelInfo;
    dataChannelInfo = arguments[0];
    return fm.icelink.webrtc.serializer.serializeDataChannelInfo(dataChannelInfo);
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-toJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an array of instances to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} dataChannelInfos The data channel descriptions to serialize.
  	@return {String} The serialized JSON.
  */


  dataChannelInfo.toJsonMultiple = function() {
    var dataChannelInfos;
    dataChannelInfos = arguments[0];
    return fm.icelink.webrtc.serializer.serializeDataChannelInfoArray(dataChannelInfos);
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-addOnUnhandledException'>&nbsp;</span>
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


  dataChannelInfo.prototype.addOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.combine(this._onUnhandledException, value);
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-getCname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the Canonical End-Point Identifier (CNAME).
  	 </div>
  
  	@function getCname
  	@return {String}
  */


  dataChannelInfo.prototype.getCname = function() {
    return this._cname;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-getLabel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel label.
  	 </div>
  
  	@function getLabel
  	@return {String}
  */


  dataChannelInfo.prototype.getLabel = function() {
    return this._label;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-getOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when data is received on the channel.
  	 </div>
  
  	@function getOnReceive
  	@return {fm.singleAction}
  */


  dataChannelInfo.prototype.getOnReceive = function() {
    return this._onReceive;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-getSynchronizationSource'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the local synchronization source.
  	 </div>
  
  	@function getSynchronizationSource
  	@return {Integer}
  */


  dataChannelInfo.prototype.getSynchronizationSource = function() {
    return this._synchronizationSource;
  };

  dataChannelInfo.prototype.raiseOnReceive = function() {
    var data, link, onReceive, p, _var0;
    link = arguments[0];
    data = arguments[1];
    onReceive = this.getOnReceive();
    _var0 = onReceive;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        p = new fm.icelink.webrtc.dataChannelReceiveArgs();
        p.setLink(link);
        p.setConference(link.getConference());
        p.setChannelInfo(this);
        p.setData(data);
        p.setDynamicProperties(link.getDynamicProperties());
        return onReceive(p);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "DataChannelInfo -> OnReceive");
        }
      } finally {

      }
    }
  };

  dataChannelInfo.prototype.raiseUnhandledException = function() {
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
        fm.asyncException.asyncThrow(exception2, "DataChannelInfo -> OnUnhandledException");
      } finally {

      }
      return p.getHandled();
    }
    return false;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-removeOnUnhandledException'>&nbsp;</span>
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


  dataChannelInfo.prototype.removeOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.remove(this._onUnhandledException, value);
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-setCname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the Canonical End-Point Identifier (CNAME).
  	 </div>
  
  	@function setCname
  	@param {String} value
  	@return {void}
  */


  dataChannelInfo.prototype.setCname = function() {
    var value;
    value = arguments[0];
    return this._cname = value;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-setLabel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channel label.
  	 </div>
  
  	@function setLabel
  	@param {String} value
  	@return {void}
  */


  dataChannelInfo.prototype.setLabel = function() {
    var value;
    value = arguments[0];
    return this._label = value;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-setOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when data is received on the channel.
  	 </div>
  
  	@function setOnReceive
  	@param {fm.singleAction} value
  	@return {void}
  */


  dataChannelInfo.prototype.setOnReceive = function() {
    var value;
    value = arguments[0];
    return this._onReceive = value;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-setSynchronizationSource'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the local synchronization source.
  	 </div>
  
  	@function setSynchronizationSource
  	@param {Integer} value
  	@return {void}
  */


  dataChannelInfo.prototype.setSynchronizationSource = function() {
    var value;
    value = arguments[0];
    return this._synchronizationSource = value;
  };

  /*<span id='method-fm.icelink.webrtc.dataChannelInfo-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String}
  */


  dataChannelInfo.prototype.toJson = function() {
    return fm.icelink.webrtc.dataChannelInfo.toJson(this);
  };

  return dataChannelInfo;

}).call(this, fm.object);




fm.icelink.webrtc.serializer = (function(_super) {

  __extends(serializer, _super);

  function serializer() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serializer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serializer.__super__.constructor.call(this);
  }

  serializer.createDataChannelInfo = function() {
    return new fm.icelink.webrtc.dataChannelInfo("");
  };

  serializer.createDataChannelReceiveArgs = function() {
    return new fm.icelink.webrtc.dataChannelReceiveArgs();
  };

  serializer.createLocalStartArgs = function() {
    return new fm.icelink.webrtc.localStartArgs();
  };

  serializer.createLocalStartFailureArgs = function() {
    return new fm.icelink.webrtc.localStartFailureArgs();
  };

  serializer.createLocalStartSuccessArgs = function() {
    return new fm.icelink.webrtc.localStartSuccessArgs();
  };

  serializer.deserializeBaseMediaArgsCallback = function() {
    var baseMediaArgs, name, nullable, nullable2, nullable3, nullable4, nullable5, valueJson;
    baseMediaArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    switch (name) {
      case "audio":
        nullable = fm.serializer.deserializeBoolean(valueJson);
        if (nullable !== null) {
          baseMediaArgs.setAudio(nullable);
        }
        break;
      case "video":
        nullable2 = fm.serializer.deserializeBoolean(valueJson);
        if (nullable2 !== null) {
          baseMediaArgs.setVideo(nullable2);
        }
        break;
      case "videoWidth":
        nullable3 = fm.serializer.deserializeInteger(valueJson);
        if (nullable3 !== null) {
          baseMediaArgs.setVideoWidth(nullable3);
        }
        break;
      case "videoHeight":
        nullable4 = fm.serializer.deserializeInteger(valueJson);
        if (nullable4 !== null) {
          baseMediaArgs.setVideoHeight(nullable4);
        }
        break;
      case "videoFrameRate":
        nullable5 = fm.serializer.deserializeInteger(valueJson);
        if (nullable5 !== null) {
          baseMediaArgs.setVideoFrameRate(nullable5);
        }
        break;
      case "audioDeviceNumber":
        baseMediaArgs.setAudioDeviceNumber(fm.serializer.deserializeInteger(valueJson));
        break;
      case "videoDeviceNumber":
        baseMediaArgs.setVideoDeviceNumber(fm.serializer.deserializeInteger(valueJson));
        break;
    }
  };

  serializer.deserializeDataChannelInfo = function() {
    var dataChannelInfoJson;
    dataChannelInfoJson = arguments[0];
    return fm.serializer.deserializeObject(dataChannelInfoJson, serializer.createDataChannelInfo, serializer.deserializeDataChannelInfoCallback);
  };

  serializer.deserializeDataChannelInfoArray = function() {
    var dataChannelInfosJson, list, _var0;
    dataChannelInfosJson = arguments[0];
    list = fm.serializer.deserializeObjectArray(dataChannelInfosJson, serializer.createDataChannelInfo, serializer.deserializeDataChannelInfoCallback);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeDataChannelInfoCallback = function() {
    var dataChannelInfo, name, nullable, str, valueJson, _var0;
    dataChannelInfo = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "label")) {
        if (str === "ssrc") {
          nullable = fm.serializer.deserializeLong(valueJson);
          if (nullable !== null) {
            return dataChannelInfo.setSynchronizationSource(nullable);
          }
        } else {
          if (str === "cname") {
            return dataChannelInfo.setCname(fm.serializer.deserializeString(valueJson));
          }
        }
      } else {
        return dataChannelInfo.setLabel(fm.serializer.deserializeString(valueJson));
      }
    }
  };

  serializer.deserializeDataChannelReceiveArgs = function() {
    var dataChannelReceiveArgsJson;
    dataChannelReceiveArgsJson = arguments[0];
    return fm.serializer.deserializeObject(dataChannelReceiveArgsJson, serializer.createDataChannelReceiveArgs, serializer.deserializeDataChannelReceiveArgsCallback);
  };

  serializer.deserializeDataChannelReceiveArgsCallback = function() {
    var dataChannelReceiveArgs, name, str, valueJson, _var0;
    dataChannelReceiveArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "channelInfo")) {
        if (str === "data") {
          return dataChannelReceiveArgs.setData(fm.serializer.deserializeString(valueJson));
        }
      } else {
        return dataChannelReceiveArgs.setChannelInfo(fm.icelink.webrtc.serializer.deserializeDataChannelInfo(valueJson));
      }
    }
  };

  serializer.deserializeLocalStartArgs = function() {
    var startArgsJson;
    startArgsJson = arguments[0];
    return fm.serializer.deserializeObjectFast(startArgsJson, serializer.createLocalStartArgs, serializer.deserializeLocalStartArgsCallback);
  };

  serializer.deserializeLocalStartArgsCallback = function() {
    var name, startArgs, valueJson;
    startArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    return fm.icelink.webrtc.serializer.deserializeBaseMediaArgsCallback(startArgs, name, valueJson);
  };

  serializer.deserializeLocalStartFailureArgs = function() {
    var startFailureArgsJson;
    startFailureArgsJson = arguments[0];
    return fm.serializer.deserializeObjectFast(startFailureArgsJson, serializer.createLocalStartFailureArgs, serializer.deserializeLocalStartFailureArgsCallback);
  };

  serializer.deserializeLocalStartFailureArgsCallback = function() {
    var name, startFailureArgs, str, valueJson, _var0;
    startFailureArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (str === "exceptionMessage")) {
      return startFailureArgs.setException(new Error(fm.serializer.deserializeString(valueJson)));
    } else {
      return fm.icelink.webrtc.serializer.deserializeBaseMediaArgsCallback(startFailureArgs, name, valueJson);
    }
  };

  serializer.deserializeLocalStartSuccessArgs = function() {
    var startSuccessArgsJson;
    startSuccessArgsJson = arguments[0];
    return fm.serializer.deserializeObjectFast(startSuccessArgsJson, serializer.createLocalStartSuccessArgs, serializer.deserializeLocalStartSuccessArgsCallback);
  };

  serializer.deserializeLocalStartSuccessArgsCallback = function() {
    var name, startSuccessArgs, valueJson;
    startSuccessArgs = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    return fm.icelink.webrtc.serializer.deserializeBaseMediaArgsCallback(startSuccessArgs, name, valueJson);
  };

  serializer.serializeBaseMediaArgsCallback = function() {
    var baseMediaArgs, jsonObject;
    baseMediaArgs = arguments[0];
    jsonObject = arguments[1];
    jsonObject["audio"] = fm.serializer.serializeBoolean(baseMediaArgs.getAudio());
    jsonObject["video"] = fm.serializer.serializeBoolean(baseMediaArgs.getVideo());
    jsonObject["videoWidth"] = fm.serializer.serializeInteger(baseMediaArgs.getVideoWidth());
    jsonObject["videoHeight"] = fm.serializer.serializeInteger(baseMediaArgs.getVideoHeight());
    jsonObject["videoFrameRate"] = fm.serializer.serializeInteger(baseMediaArgs.getVideoFrameRate());
    if (baseMediaArgs.getAudioDeviceNumber() !== null) {
      jsonObject["audioDeviceNumber"] = fm.serializer.serializeInteger(baseMediaArgs.getAudioDeviceNumber());
    }
    if (baseMediaArgs.getVideoDeviceNumber() !== null) {
      return jsonObject["videoDeviceNumber"] = fm.serializer.serializeInteger(baseMediaArgs.getVideoDeviceNumber());
    }
  };

  serializer.serializeDataChannelInfo = function() {
    var dataChannelInfo;
    dataChannelInfo = arguments[0];
    return fm.serializer.serializeObject(dataChannelInfo, serializer.serializeDataChannelInfoCallback);
  };

  serializer.serializeDataChannelInfoArray = function() {
    var dataChannelInfos;
    dataChannelInfos = arguments[0];
    return fm.serializer.serializeObjectArray(dataChannelInfos, serializer.serializeDataChannelInfoCallback);
  };

  serializer.serializeDataChannelInfoCallback = function() {
    var dataChannelInfo, jsonObject, _var0, _var1;
    dataChannelInfo = arguments[0];
    jsonObject = arguments[1];
    _var0 = dataChannelInfo.getLabel();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["label"] = fm.serializer.serializeString(dataChannelInfo.getLabel());
    }
    jsonObject["ssrc"] = fm.serializer.serializeLong(dataChannelInfo.getSynchronizationSource());
    _var1 = dataChannelInfo.getCname();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return jsonObject["cname"] = fm.serializer.serializeString(dataChannelInfo.getCname());
    }
  };

  serializer.serializeDataChannelReceiveArgs = function() {
    var dataChannelReceiveArgs;
    dataChannelReceiveArgs = arguments[0];
    return fm.serializer.serializeObject(dataChannelReceiveArgs, serializer.serializeDataChannelReceiveArgsCallback);
  };

  serializer.serializeDataChannelReceiveArgsCallback = function() {
    var dataChannelReceiveArgs, jsonObject, _var0, _var1;
    dataChannelReceiveArgs = arguments[0];
    jsonObject = arguments[1];
    _var0 = dataChannelReceiveArgs.getChannelInfo();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["channelInfo"] = fm.icelink.webrtc.serializer.serializeDataChannelInfo(dataChannelReceiveArgs.getChannelInfo());
    }
    _var1 = dataChannelReceiveArgs.getData();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return jsonObject["data"] = fm.serializer.serializeString(dataChannelReceiveArgs.getData());
    }
  };

  serializer.serializeLocalStartArgs = function() {
    var startArgs;
    startArgs = arguments[0];
    return fm.serializer.serializeObjectFast(startArgs, serializer.serializeLocalStartArgsCallback);
  };

  serializer.serializeLocalStartArgsCallback = function() {
    var jsonObject, startArgs;
    startArgs = arguments[0];
    jsonObject = arguments[1];
    return fm.icelink.webrtc.serializer.serializeBaseMediaArgsCallback(startArgs, jsonObject);
  };

  serializer.serializeLocalStartFailureArgs = function() {
    var startFailureArgs;
    startFailureArgs = arguments[0];
    return fm.serializer.serializeObjectFast(startFailureArgs, serializer.serializeLocalStartFailureArgsCallback);
  };

  serializer.serializeLocalStartFailureArgsCallback = function() {
    var jsonObject, startFailureArgs, _var0;
    startFailureArgs = arguments[0];
    jsonObject = arguments[1];
    fm.icelink.webrtc.serializer.serializeBaseMediaArgsCallback(startFailureArgs, jsonObject);
    _var0 = startFailureArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["exceptionMessage"] = fm.serializer.serializeString(startFailureArgs.getException().message);
    }
  };

  serializer.serializeLocalStartSuccessArgs = function() {
    var startSuccessArgs;
    startSuccessArgs = arguments[0];
    return fm.serializer.serializeObjectFast(startSuccessArgs, serializer.serializeLocalStartSuccessArgsCallback);
  };

  serializer.serializeLocalStartSuccessArgsCallback = function() {
    var jsonObject, startSuccessArgs;
    startSuccessArgs = arguments[0];
    jsonObject = arguments[1];
    return fm.icelink.webrtc.serializer.serializeBaseMediaArgsCallback(startSuccessArgs, jsonObject);
  };

  return serializer;

}).call(this, fm.object);


/*<span id='cls-fm.icelink.webrtc.userMedia'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.userMedia
 <div>
 Provides static access to local media devices.
 </div>

@extends fm.object
*/


fm.icelink.webrtc.userMedia = (function(_super) {

  __extends(userMedia, _super);

  userMedia._getMediaArgsKey = null;

  function userMedia() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      userMedia.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    userMedia.__super__.constructor.call(this);
  }

  /*<span id='method-fm.icelink.webrtc.userMedia-getAudioDeviceNames'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a list of connected audio device names.
  	 </div>
  	@function getAudioDeviceNames
  	@param {fm.icelink.webrtc.audioCaptureProvider} audioCaptureProvider The audio capture provider.
  	@return {fm.array}
  */


  userMedia.getAudioDeviceNames = function() {
    var audioCaptureProvider, _var0;
    if (arguments.length === 0) {
      return fm.icelink.webrtc.userMedia.getAudioDeviceNames(fm.icelink.webrtc.defaultProviders.getAudioCaptureProvider());
      return;
    }
    if (arguments.length === 1) {
      audioCaptureProvider = arguments[0];
      _var0 = audioCaptureProvider;
      if (_var0 === null || typeof _var0 === 'undefined') {
        return new Array(0);
      }
      return audioCaptureProvider.getDeviceNames();
    }
  };

  /*<span id='method-fm.icelink.webrtc.userMedia-getMedia'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a local media stream using the specified arguments.
  	 If audio and/or video are requested, the corresponding
  	 audio/video capture providers will be initialized. If
  	 no audio/video capture providers are defined, default
  	 providers will be initialized which use the device
  	 microphone/camera as the media source. If no default
  	 providers exist for the platform, an error will be
  	 thrown during initialization.
  	 </div>
  	@function getMedia
  	@param {fm.icelink.webrtc.getMediaArgs} getMediaArgs The arguments.
  	@return {void}
  */


  userMedia.getMedia = function() {
    var getMediaArgs, stream, stream2, _var0, _var1, _var2, _var3, _var4, _var5, _var6;
    getMediaArgs = arguments[0];
    _var0 = getMediaArgs;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("getMediaArgs cannot be null.");
    }
    if (getMediaArgs.getAudio()) {
      _var1 = getMediaArgs.getAudioCaptureProvider();
      if (_var1 === null || typeof _var1 === 'undefined') {
        getMediaArgs.setAudioCaptureProvider(fm.icelink.webrtc.defaultProviders.getAudioCaptureProvider());
      }
      _var2 = getMediaArgs.getAudioCaptureProvider();
      if (_var2 === null || typeof _var2 === 'undefined') {
        throw new Error("AudioCaptureProvider must be set to capture audio media (no default exists for this platform).");
      }
    }
    _var3 = getMediaArgs.getCreateAudioRenderProvider();
    if (_var3 === null || typeof _var3 === 'undefined') {
      getMediaArgs.setCreateAudioRenderProvider(fm.icelink.webrtc.defaultProviders.getCreateAudioRenderProvider());
    }
    if (getMediaArgs.getVideo()) {
      _var4 = getMediaArgs.getVideoCaptureProvider();
      if (_var4 === null || typeof _var4 === 'undefined') {
        getMediaArgs.setVideoCaptureProvider(fm.icelink.webrtc.defaultProviders.getVideoCaptureProvider(getMediaArgs.getDefaultVideoPreviewScale()));
      }
      _var5 = getMediaArgs.getVideoCaptureProvider();
      if (_var5 === null || typeof _var5 === 'undefined') {
        throw new Error("VideoCaptureProvider must be set to capture video media (no default exists for this platform).");
      }
    }
    _var6 = getMediaArgs.getCreateVideoRenderProvider();
    if (_var6 === null || typeof _var6 === 'undefined') {
      getMediaArgs.setCreateVideoRenderProvider(fm.icelink.webrtc.defaultProviders.getCreateVideoRenderProvider(getMediaArgs.getDefaultVideoScale()));
    }
    stream2 = new fm.icelink.webrtc.localMediaStream();
    stream2.setAudioCaptureProvider(getMediaArgs.getAudioCaptureProvider());
    stream2.setVideoCaptureProvider(getMediaArgs.getVideoCaptureProvider());
    stream2.setCreateAudioRenderProvider(getMediaArgs.getCreateAudioRenderProvider());
    stream2.setCreateVideoRenderProvider(getMediaArgs.getCreateVideoRenderProvider());
    stream2.setDefaultVideoScale(getMediaArgs.getDefaultVideoScale());
    stream2.setDefaultVideoPreviewScale(getMediaArgs.getDefaultVideoPreviewScale());
    stream = stream2;
    stream.setDynamicValue(fm.icelink.webrtc.userMedia._getMediaArgsKey, getMediaArgs);
    return stream.initialize(userMedia.onLocalStreamInitialize);
  };

  /*<span id='method-fm.icelink.webrtc.userMedia-getVideoDeviceNames'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a list of connected video device names.
  	 </div>
  	@function getVideoDeviceNames
  	@param {fm.icelink.webrtc.videoCaptureProvider} videoCaptureProvider The video capture provider.
  	@return {fm.array}
  */


  userMedia.getVideoDeviceNames = function() {
    var videoCaptureProvider, _var0;
    if (arguments.length === 0) {
      return fm.icelink.webrtc.userMedia.getVideoDeviceNames(fm.icelink.webrtc.defaultProviders.getVideoCaptureProvider(fm.icelink.webrtc.layoutScale.Contain));
      return;
    }
    if (arguments.length === 1) {
      videoCaptureProvider = arguments[0];
      _var0 = videoCaptureProvider;
      if (_var0 === null || typeof _var0 === 'undefined') {
        return new Array(0);
      }
      return videoCaptureProvider.getDeviceNames();
    }
  };

  userMedia.localStreamStartFailure = function() {
    var dynamicValue, e;
    e = arguments[0];
    dynamicValue = fm.global.tryCast(e.getLocalStream().getDynamicValue(fm.icelink.webrtc.userMedia._getMediaArgsKey), fm.icelink.webrtc.getMediaArgs);
    fm.icelink.webrtc.userMedia.raiseGetMediaFailure(dynamicValue, e.getException());
    fm.icelink.webrtc.userMedia.raiseGetMediaComplete(dynamicValue);
    return e.getLocalStream().unsetDynamicValue(fm.icelink.webrtc.userMedia._getMediaArgsKey);
  };

  userMedia.localStreamStartSuccess = function() {
    var dynamicValue, e;
    e = arguments[0];
    dynamicValue = fm.global.tryCast(e.getLocalStream().getDynamicValue(fm.icelink.webrtc.userMedia._getMediaArgsKey), fm.icelink.webrtc.getMediaArgs);
    fm.icelink.webrtc.userMedia.raiseGetMediaSuccess(dynamicValue, e.getLocalStream());
    fm.icelink.webrtc.userMedia.raiseGetMediaComplete(dynamicValue);
    return e.getLocalStream().unsetDynamicValue(fm.icelink.webrtc.userMedia._getMediaArgsKey);
  };

  userMedia.onLocalStreamInitialize = function() {
    var args, dynamicValue, localStream;
    localStream = arguments[0];
    dynamicValue = fm.global.tryCast(localStream.getDynamicValue(fm.icelink.webrtc.userMedia._getMediaArgsKey), fm.icelink.webrtc.getMediaArgs);
    args = new fm.icelink.webrtc.localStartArgs();
    args.setAudio(dynamicValue.getAudio());
    args.setAudioDeviceNumber(dynamicValue.getAudioDeviceNumber());
    args.setVideo(dynamicValue.getVideo());
    args.setVideoDeviceNumber(dynamicValue.getVideoDeviceNumber());
    args.setVideoFrameRate(dynamicValue.getVideoFrameRate());
    args.setVideoHeight(dynamicValue.getVideoHeight());
    args.setVideoWidth(dynamicValue.getVideoWidth());
    args.setOnSuccess(userMedia.localStreamStartSuccess);
    args.setOnFailure(userMedia.localStreamStartFailure);
    return localStream.start(args);
  };

  userMedia.raiseGetMediaComplete = function() {
    var getMediaArgs, p, _var0;
    getMediaArgs = arguments[0];
    _var0 = getMediaArgs.getOnComplete();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.webrtc.getMediaCompleteArgs();
      p.setDynamicProperties(getMediaArgs.getDynamicProperties());
      p.setAudio(getMediaArgs.getAudio());
      p.setAudioDeviceNumber(getMediaArgs.getAudioDeviceNumber());
      p.setVideo(getMediaArgs.getVideo());
      p.setVideoDeviceNumber(getMediaArgs.getVideoDeviceNumber());
      p.setVideoFrameRate(getMediaArgs.getVideoFrameRate());
      p.setVideoHeight(getMediaArgs.getVideoHeight());
      p.setVideoWidth(getMediaArgs.getVideoWidth());
      return getMediaArgs.getOnComplete()(p);
    }
  };

  userMedia.raiseGetMediaFailure = function() {
    var exception, getMediaArgs, p, _var0;
    getMediaArgs = arguments[0];
    exception = arguments[1];
    _var0 = getMediaArgs.getOnFailure();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.icelink.webrtc.getMediaFailureArgs();
      p.setDynamicProperties(getMediaArgs.getDynamicProperties());
      p.setAudio(getMediaArgs.getAudio());
      p.setAudioDeviceNumber(getMediaArgs.getAudioDeviceNumber());
      p.setVideo(getMediaArgs.getVideo());
      p.setVideoDeviceNumber(getMediaArgs.getVideoDeviceNumber());
      p.setVideoFrameRate(getMediaArgs.getVideoFrameRate());
      p.setVideoHeight(getMediaArgs.getVideoHeight());
      p.setVideoWidth(getMediaArgs.getVideoWidth());
      p.setException(exception);
      return getMediaArgs.getOnFailure()(p);
    }
  };

  userMedia.raiseGetMediaSuccess = function() {
    var audioCaptureProvider, getMediaArgs, localStream, p, videoCaptureProvider, _var0, _var1, _var2, _var3;
    getMediaArgs = arguments[0];
    localStream = arguments[1];
    _var0 = getMediaArgs.getOnSuccess();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      audioCaptureProvider = localStream.getAudioCaptureProvider();
      videoCaptureProvider = localStream.getVideoCaptureProvider();
      p = new fm.icelink.webrtc.getMediaSuccessArgs();
      p.setDynamicProperties(getMediaArgs.getDynamicProperties());
      p.setAudio(getMediaArgs.getAudio());
      p.setAudioDeviceNumber(getMediaArgs.getAudioDeviceNumber());
      p.setVideo(getMediaArgs.getVideo());
      p.setVideoDeviceNumber(getMediaArgs.getVideoDeviceNumber());
      p.setVideoFrameRate(getMediaArgs.getVideoFrameRate());
      p.setVideoHeight(getMediaArgs.getVideoHeight());
      p.setVideoWidth(getMediaArgs.getVideoWidth());
      p.setLocalStream(localStream);
      _var1 = videoCaptureProvider;
      p.setLocalVideoControl((_var1 === null || typeof _var1 === 'undefined' ? null : videoCaptureProvider.getPreviewControl()));
      _var2 = audioCaptureProvider;
      p.setAudioDeviceLabel((_var2 === null || typeof _var2 === 'undefined' ? null : audioCaptureProvider.getLabel()));
      _var3 = videoCaptureProvider;
      p.setVideoDeviceLabel((_var3 === null || typeof _var3 === 'undefined' ? null : videoCaptureProvider.getLabel()));
      return getMediaArgs.getOnSuccess()(p);
    }
  };

  userMedia._getMediaArgsKey = "fm.icelink.webrtc.usermedia.getmediaargs";

  return userMedia;

}).call(this, fm.object);



fm.icelink.webrtc.defaultProviders = (function() {

  function defaultProviders() {}

  defaultProviders._isMobile = false;

  defaultProviders.isMobile = function() {
    return defaultProviders._isMobile;
  };

  defaultProviders.forceMobile = function() {
    return defaultProviders._isMobile = true;
  };

  defaultProviders.forceDesktop = function() {
    return defaultProviders._isMobile = false;
  };

  defaultProviders.getAudioCaptureProvider = function() {
    if (fm.icelink.webrtc.willUsePlugin()) {
      return new fm.icelink.webrtc.pluginAudioCaptureProvider();
    } else {
      return new fm.icelink.webrtc.jsAudioCaptureProvider();
    }
  };

  defaultProviders.getVideoCaptureProvider = function(previewScale) {
    if (fm.icelink.webrtc.willUsePlugin()) {
      return new fm.icelink.webrtc.pluginVideoCaptureProvider(previewScale);
    } else {
      return new fm.icelink.webrtc.jsVideoCaptureProvider(previewScale);
    }
  };

  defaultProviders.getCreateAudioRenderProvider = function() {
    return function() {
      if (fm.icelink.webrtc.willUsePlugin()) {
        return new fm.icelink.webrtc.pluginAudioRenderProvider();
      } else {
        return new fm.icelink.webrtc.jsAudioRenderProvider();
      }
    };
  };

  defaultProviders.getCreateVideoRenderProvider = function(scale) {
    return function() {
      if (fm.icelink.webrtc.willUsePlugin()) {
        return new fm.icelink.webrtc.pluginVideoRenderProvider(scale);
      } else {
        return new fm.icelink.webrtc.jsVideoRenderProvider(scale);
      }
    };
  };

  return defaultProviders;

}).call(this);


/*<span id='cls-fm.icelink.webrtc.audioCaptureProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.audioCaptureProvider
 <div>
 Abstract definition for an audio capture implementation.
 </div>

@extends fm.dynamic
*/


fm.icelink.webrtc.audioCaptureProvider = (function(_super) {

  __extends(audioCaptureProvider, _super);

  function audioCaptureProvider() {
    return audioCaptureProvider.__super__.constructor.apply(this, arguments);
  }

  return audioCaptureProvider;

})(fm.dynamic);


/*<span id='cls-fm.icelink.webrtc.videoCaptureProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.videoCaptureProvider
 <div>
 Abstract definition for a video capture implementation.
 </div>

@extends fm.dynamic
*/


fm.icelink.webrtc.videoCaptureProvider = (function(_super) {

  __extends(videoCaptureProvider, _super);

  function videoCaptureProvider() {
    this.getPreviewControl = __bind(this.getPreviewControl, this);
    return videoCaptureProvider.__super__.constructor.apply(this, arguments);
  }

  /*<span id='method-fm.icelink.webrtc.videoCaptureProvider-getPreviewControl'>&nbsp;</span>
  */


  /**
   <div>
   Gets the video capture preview control.
   </div>
  
  @function getPreviewControl
  @return {DOMElement}
  */


  videoCaptureProvider.prototype.getPreviewControl = function() {
    return null;
  };

  return videoCaptureProvider;

})(fm.dynamic);


/*<span id='cls-fm.icelink.webrtc.audioRenderProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.audioRenderProvider
 <div>
 Abstract definition for an audio render implementation.
 </div>

@extends fm.dynamic
*/


fm.icelink.webrtc.audioRenderProvider = (function(_super) {

  __extends(audioRenderProvider, _super);

  function audioRenderProvider() {
    this.renderInternal = __bind(this.renderInternal, this);
    return audioRenderProvider.__super__.constructor.apply(this, arguments);
  }

  audioRenderProvider.prototype.renderInternal = function() {
    throw new Error('The JavaScript SDK cannot render audio buffers.');
  };

  return audioRenderProvider;

})(fm.dynamic);


/*<span id='cls-fm.icelink.webrtc.videoRenderProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.videoRenderProvider
 <div>
 Abstract definition for a video render implementation.
 </div>

@extends fm.dynamic
*/


fm.icelink.webrtc.videoRenderProvider = (function(_super) {

  __extends(videoRenderProvider, _super);

  function videoRenderProvider() {
    this.renderInternal = __bind(this.renderInternal, this);

    this.getControl = __bind(this.getControl, this);
    return videoRenderProvider.__super__.constructor.apply(this, arguments);
  }

  /*<span id='method-fm.icelink.webrtc.videoRenderProvider-getControl'>&nbsp;</span>
  */


  /**
   <div>
   Gets the underlying UI control.
   </div>
  
  @function getControl
  @return {DOMElement} The underlying UI control.
  */


  videoRenderProvider.prototype.getControl = function() {
    return null;
  };

  videoRenderProvider.prototype.renderInternal = function() {
    throw new Error('The JavaScript SDK cannot render video buffers.');
  };

  return videoRenderProvider;

})(fm.dynamic);


/*<span id='cls-fm.icelink.webrtc.jsAudioCaptureProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.jsAudioCaptureProvider
 <div>
 A JavaScript-based audio capture implementation.
 </div>

@extends fm.icelink.webrtc.audioCaptureProvider
*/


fm.icelink.webrtc.jsAudioCaptureProvider = (function(_super) {

  __extends(jsAudioCaptureProvider, _super);

  function jsAudioCaptureProvider() {
    this.resume = __bind(this.resume, this);

    this.pause = __bind(this.pause, this);

    this.getLabel = __bind(this.getLabel, this);

    this.setLocalStream = __bind(this.setLocalStream, this);
    return jsAudioCaptureProvider.__super__.constructor.apply(this, arguments);
  }

  jsAudioCaptureProvider.prototype.setLocalStream = function(localStream) {};

  jsAudioCaptureProvider.prototype.getLabel = function() {
    return 'Audio Input';
  };

  jsAudioCaptureProvider.prototype.pause = function() {
    return true;
  };

  jsAudioCaptureProvider.prototype.resume = function() {
    return true;
  };

  return jsAudioCaptureProvider;

})(fm.icelink.webrtc.audioCaptureProvider);


/*<span id='cls-fm.icelink.webrtc.jsVideoCaptureProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.jsVideoCaptureProvider
 <div>
 A JavaScript-based video capture implementation.
 </div>

@extends fm.icelink.webrtc.videoCaptureProvider
*/


fm.icelink.webrtc.jsVideoCaptureProvider = (function(_super) {

  __extends(jsVideoCaptureProvider, _super);

  function jsVideoCaptureProvider(previewScale) {
    this.resume = __bind(this.resume, this);

    this.pause = __bind(this.pause, this);

    this.getLabel = __bind(this.getLabel, this);

    this.getPreviewControl = __bind(this.getPreviewControl, this);

    this.setLocalStream = __bind(this.setLocalStream, this);
    this._renderProvider = new fm.icelink.webrtc.jsVideoRenderProvider(previewScale, true);
  }

  jsVideoCaptureProvider.prototype.setLocalStream = function(localStream) {
    return this._renderProvider.setLocalStream(localStream);
  };

  /*<span id='method-fm.icelink.webrtc.jsVideoCaptureProvider-getPreviewControl'>&nbsp;</span>
  */


  /**
   <div>
   Gets the video capture preview control.
   </div>
  
  @function getPreviewControl
  @return {DOMElement}
  */


  jsVideoCaptureProvider.prototype.getPreviewControl = function() {
    return this._renderProvider.getControl();
  };

  jsVideoCaptureProvider.prototype.getLabel = function() {
    return 'Video Input';
  };

  jsVideoCaptureProvider.prototype.pause = function() {
    return true;
  };

  jsVideoCaptureProvider.prototype.resume = function() {
    return true;
  };

  return jsVideoCaptureProvider;

})(fm.icelink.webrtc.videoCaptureProvider);


/*<span id='cls-fm.icelink.webrtc.jsAudioRenderProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.jsAudioRenderProvider
 <div>
 A JavaScript-based video audio implementation.
 </div>

@extends fm.icelink.webrtc.audioRenderProvider
*/


fm.icelink.webrtc.jsAudioRenderProvider = (function(_super) {

  __extends(jsAudioRenderProvider, _super);

  jsAudioRenderProvider.prototype._stream = null;

  jsAudioRenderProvider.prototype._audio = null;

  function jsAudioRenderProvider() {
    this.attachToAudio = __bind(this.attachToAudio, this);

    this.setRemoteStream = __bind(this.setRemoteStream, this);

    this.setLocalStream = __bind(this.setLocalStream, this);

    this.unmute = __bind(this.unmute, this);

    this.mute = __bind(this.mute, this);
    this._audio = document.createElement('audio');
    this._audio.setAttribute('autoplay', 'autoplay');
  }

  jsAudioRenderProvider.prototype.mute = function() {
    var audioTrack;
    audioTrack = this._stream.getAudioTracks()[0];
    if (!audioTrack.enabled) {
      return false;
    }
    audioTrack.enabled = false;
    return true;
  };

  jsAudioRenderProvider.prototype.unmute = function() {
    var audioTrack;
    audioTrack = this._stream.getAudioTracks()[0];
    if (audioTrack.enabled) {
      return false;
    }
    audioTrack.enabled = true;
    return true;
  };

  jsAudioRenderProvider.prototype.setLocalStream = function(localStream) {
    return this._stream = localStream.getBackingStream();
  };

  jsAudioRenderProvider.prototype.setRemoteStream = function(remoteStream) {
    this._stream = remoteStream.getBackingStream();
    return this.attachToAudio(false);
  };

  jsAudioRenderProvider.prototype.attachToAudio = function(stream, local) {
    stream = this._stream;
    if (local) {
      this._audio.muted = true;
    }
    if (navigator.mozGetUserMedia) {
      this._audio.mozSrcObject = stream;
      return this._audio.play();
    } else if (navigator.webkitGetUserMedia) {
      if (typeof this._audio.srcObject !== 'undefined') {
        return this._audio.srcObject = stream;
      } else if (typeof this._audio.mozSrcObject !== 'undefined') {
        return this._audio.mozSrcObject = stream;
      } else if (typeof this._audio.src !== 'undefined') {
        return this._audio.src = URL.createObjectURL(stream);
      } else {
        return this._audio.src = webkitURL.createObjectURL(stream);
      }
    } else {
      return this._audio.src = URL.createObjectURL(stream);
    }
  };

  return jsAudioRenderProvider;

})(fm.icelink.webrtc.audioRenderProvider);


/*<span id='cls-fm.icelink.webrtc.jsVideoRenderProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.jsVideoRenderProvider
 <div>
 A JavaScript-based video render implementation.
 </div>

@extends fm.icelink.webrtc.videoRenderProvider
*/


fm.icelink.webrtc.jsVideoRenderProvider = (function(_super) {

  __extends(jsVideoRenderProvider, _super);

  jsVideoRenderProvider.prototype._stream = null;

  jsVideoRenderProvider.prototype._container = null;

  jsVideoRenderProvider.prototype._video = null;

  function jsVideoRenderProvider(scale, isLocal) {
    this.getControl = __bind(this.getControl, this);

    this.attachToVideo = __bind(this.attachToVideo, this);

    this.setRemoteStream = __bind(this.setRemoteStream, this);

    this.setLocalStream = __bind(this.setLocalStream, this);

    this.unmute = __bind(this.unmute, this);

    this.mute = __bind(this.mute, this);

    var lastContainerHeight, lastContainerWidth, lastVideoHeight, lastVideoWidth, rescale,
      _this = this;
    this._container = document.createElement('div');
    this._container.style.position = 'relative';
    this._container.style.overflow = 'hidden';
    if (isLocal) {
      this._container.className = 'fm-icelink-webrtc-video fm-icelink-webrtc-video-local';
    } else {
      this._container.className = 'fm-icelink-webrtc-video fm-icelink-webrtc-video-remote';
    }
    this._video = document.createElement('video');
    this._video.style.position = 'absolute';
    this._video.setAttribute('autoplay', 'autoplay');
    fm.util.observe(this._video, 'pause', function() {
      if (!_this._video.parentNode) {
        return _this._video.play();
      }
    });
    if (scale) {
      if (this._video.style.hasOwnProperty('objectFit')) {
        this._video.style.width = '100%';
        this._video.style.height = '100%';
        switch (scale) {
          case fm.icelink.webrtc.layoutScale.Contain:
            this._video.style.objectFit = 'contain';
            break;
          case fm.icelink.webrtc.layoutScale.Cover:
            this._video.style.objectFit = 'cover';
            break;
          case fm.icelink.webrtc.layoutScale.Stretch:
            this._video.style.objectFit = 'fill';
        }
      } else {
        switch (scale) {
          case fm.icelink.webrtc.layoutScale.Contain:
            this._video.style.width = '100%';
            this._video.style.height = '100%';
            break;
          case fm.icelink.webrtc.layoutScale.Cover:
            this._video.style.minWidth = '100%';
            this._video.style.minHeight = '100%';
            lastContainerWidth = 0;
            lastContainerHeight = 0;
            lastVideoWidth = 0;
            lastVideoHeight = 0;
            rescale = function() {
              var containerHeight, containerWidth, layoutFrame, videoHeight, videoWidth;
              containerWidth = _this._container.clientWidth;
              containerHeight = _this._container.clientHeight;
              videoWidth = _this._video.clientWidth;
              videoHeight = _this._video.clientHeight;
              if (containerWidth !== lastContainerWidth || containerHeight !== lastContainerHeight || videoWidth !== lastVideoWidth || videoHeight !== lastVideoHeight) {
                layoutFrame = fm.icelink.webrtc.layoutFrame.getScaledFrame(scale, containerWidth, containerHeight, videoWidth, videoHeight);
                _this._video.style.left = layoutFrame.getX() + 'px';
                _this._video.style.top = layoutFrame.getY() + 'px';
                lastContainerWidth = containerWidth;
                lastContainerHeight = containerHeight;
                lastVideoWidth = videoWidth;
                return lastVideoHeight = videoHeight;
              }
            };
            fm.util.observe(this._video, 'loadeddata', function() {
              return rescale();
            });
            fm.util.observeAttr(this._container, function(attrName) {
              if (attrName === 'width' || attrName === 'height' || attrName === 'style') {
                return rescale();
              }
            });
            rescale();
            break;
          case fm.icelink.webrtc.layoutScale.Stretch:
            this._video.style.transformOrigin = '0px 0px';
            lastContainerWidth = 0;
            lastContainerHeight = 0;
            lastVideoWidth = 0;
            lastVideoHeight = 0;
            rescale = function() {
              var containerHeight, containerWidth, videoHeight, videoWidth;
              containerWidth = _this._container.clientWidth;
              containerHeight = _this._container.clientHeight;
              videoWidth = _this._video.clientWidth;
              videoHeight = _this._video.clientHeight;
              if (containerWidth !== lastContainerWidth || containerHeight !== lastContainerHeight || videoWidth !== lastVideoWidth || videoHeight !== lastVideoHeight) {
                if (videoWidth && videoHeight) {
                  _this._video.style.transform = 'scale(' + (containerWidth / videoWidth) + ', ' + (containerHeight / videoHeight) + ')';
                  lastContainerWidth = containerWidth;
                  lastContainerHeight = containerHeight;
                  lastVideoWidth = videoWidth;
                  return lastVideoHeight = videoHeight;
                }
              }
            };
            fm.util.observe(this._video, 'loadeddata', function() {
              return rescale();
            });
            fm.util.observeAttr(this._container, function(attrName) {
              if (attrName === 'width' || attrName === 'height' || attrName === 'style') {
                return rescale();
              }
            });
            rescale();
        }
      }
    }
    this._container.appendChild(this._video);
  }

  jsVideoRenderProvider.prototype.mute = function() {
    var videoTrack;
    videoTrack = this._stream.getVideoTracks()[0];
    if (!videoTrack.enabled) {
      return false;
    }
    videoTrack.enabled = false;
    return true;
  };

  jsVideoRenderProvider.prototype.unmute = function() {
    var videoTrack;
    videoTrack = this._stream.getVideoTracks()[0];
    if (videoTrack.enabled) {
      return false;
    }
    videoTrack.enabled = true;
    return true;
  };

  jsVideoRenderProvider.prototype.setLocalStream = function(localStream) {
    this._stream = localStream.getBackingStream();
    return this.attachToVideo(true);
  };

  jsVideoRenderProvider.prototype.setRemoteStream = function(remoteStream) {
    this._stream = remoteStream.getBackingStream();
    return this.attachToVideo(false);
  };

  jsVideoRenderProvider.prototype.attachToVideo = function(local) {
    var stream;
    stream = this._stream;
    if (local) {
      this._video.muted = true;
    }
    if (navigator.mozGetUserMedia) {
      this._video.mozSrcObject = stream;
      return this._video.play();
    } else if (navigator.webkitGetUserMedia) {
      if (typeof this._video.srcObject !== 'undefined') {
        return this._video.srcObject = stream;
      } else if (typeof this._video.mozSrcObject !== 'undefined') {
        return this._video.mozSrcObject = stream;
      } else if (typeof this._video.src !== 'undefined') {
        return this._video.src = URL.createObjectURL(stream);
      } else {
        return this._video.src = webkitURL.createObjectURL(stream);
      }
    } else {
      return this._video.src = URL.createObjectURL(stream);
    }
  };

  /*<span id='method-fm.icelink.webrtc.jsVideoRenderProvider-getControl'>&nbsp;</span>
  */


  /**
   <div>
   Gets the underlying UI control.
   </div>
  
  @function getControl
  @return {DOMElement} The underlying UI control.
  */


  jsVideoRenderProvider.prototype.getControl = function() {
    return this._container;
  };

  return jsVideoRenderProvider;

})(fm.icelink.webrtc.videoRenderProvider);


/*<span id='cls-fm.icelink.webrtc.pluginAudioCaptureProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.pluginAudioCaptureProvider
 <div>
 A plugin-based audio capture implementation.
 </div>

@extends fm.icelink.webrtc.audioCaptureProvider
*/


fm.icelink.webrtc.pluginAudioCaptureProvider = (function(_super) {

  __extends(pluginAudioCaptureProvider, _super);

  function pluginAudioCaptureProvider() {
    this.resume = __bind(this.resume, this);

    this.pause = __bind(this.pause, this);

    this.getLabel = __bind(this.getLabel, this);

    this.setLocalStream = __bind(this.setLocalStream, this);
    return pluginAudioCaptureProvider.__super__.constructor.apply(this, arguments);
  }

  pluginAudioCaptureProvider.prototype.setLocalStream = function(localStream) {};

  pluginAudioCaptureProvider.prototype.getLabel = function() {
    return 'Audio Input';
  };

  pluginAudioCaptureProvider.prototype.pause = function() {
    return true;
  };

  pluginAudioCaptureProvider.prototype.resume = function() {
    return true;
  };

  return pluginAudioCaptureProvider;

})(fm.icelink.webrtc.audioCaptureProvider);


/*<span id='cls-fm.icelink.webrtc.pluginVideoCaptureProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.pluginVideoCaptureProvider
 <div>
 A plugin-based video capture implementation.
 </div>

@extends fm.icelink.webrtc.videoCaptureProvider
*/


fm.icelink.webrtc.pluginVideoCaptureProvider = (function(_super) {

  __extends(pluginVideoCaptureProvider, _super);

  function pluginVideoCaptureProvider(previewScale) {
    this.resume = __bind(this.resume, this);

    this.pause = __bind(this.pause, this);

    this.getLabel = __bind(this.getLabel, this);

    this.getPreviewControl = __bind(this.getPreviewControl, this);

    this.setLocalStream = __bind(this.setLocalStream, this);
    this._renderProvider = new fm.icelink.webrtc.pluginVideoRenderProvider(previewScale, true);
  }

  pluginVideoCaptureProvider.prototype.setLocalStream = function(localStream) {
    return this._renderProvider.setLocalStream(localStream);
  };

  /*<span id='method-fm.icelink.webrtc.pluginVideoCaptureProvider-getPreviewControl'>&nbsp;</span>
  */


  /**
   <div>
   Gets the video capture preview control.
   </div>
  
  @function getPreviewControl
  @return {DOMElement}
  */


  pluginVideoCaptureProvider.prototype.getPreviewControl = function() {
    return this._renderProvider.getControl();
  };

  pluginVideoCaptureProvider.prototype.getLabel = function() {
    return 'Video Input';
  };

  pluginVideoCaptureProvider.prototype.pause = function() {
    return true;
  };

  pluginVideoCaptureProvider.prototype.resume = function() {
    return true;
  };

  return pluginVideoCaptureProvider;

})(fm.icelink.webrtc.videoCaptureProvider);


/*<span id='cls-fm.icelink.webrtc.pluginAudioRenderProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.pluginAudioRenderProvider
 <div>
 A plugin-based video audio implementation.
 </div>

@extends fm.icelink.webrtc.audioRenderProvider
*/


fm.icelink.webrtc.pluginAudioRenderProvider = (function(_super) {

  __extends(pluginAudioRenderProvider, _super);

  function pluginAudioRenderProvider() {
    this.setRemoteStream = __bind(this.setRemoteStream, this);

    this.setLocalStream = __bind(this.setLocalStream, this);

    this.unmute = __bind(this.unmute, this);

    this.mute = __bind(this.mute, this);

    this.getIsMuted = __bind(this.getIsMuted, this);
    return pluginAudioRenderProvider.__super__.constructor.apply(this, arguments);
  }

  pluginAudioRenderProvider.prototype.getIsMuted = function() {
    var result,
      _this = this;
    result = false;
    fm.icelink.webrtc.getCoreControl({
      callback: function(cc) {
        if (_this._localStreamPid) {
          return result = cc.arp_getIsMutedLocal(_this._localStreamPid);
        } else {
          return result = cc.arp_getIsMutedRemote(_this._linkPid);
        }
      }
    });
    return result;
  };

  pluginAudioRenderProvider.prototype.mute = function() {
    var result,
      _this = this;
    result = false;
    fm.icelink.webrtc.getCoreControl({
      callback: function(cc) {
        if (_this._localStreamPid) {
          return result = cc.arp_muteLocal(_this._localStreamPid);
        } else {
          return result = cc.arp_muteRemote(_this._linkPid);
        }
      }
    });
    return result;
  };

  pluginAudioRenderProvider.prototype.unmute = function() {
    var result,
      _this = this;
    result = false;
    fm.icelink.webrtc.getCoreControl({
      callback: function(cc) {
        if (_this._localStreamPid) {
          return result = cc.arp_unmuteLocal(_this._localStreamPid);
        } else {
          return result = cc.arp_unmuteRemote(_this._linkPid);
        }
      }
    });
    return result;
  };

  pluginAudioRenderProvider.prototype.setLocalStream = function(localStream) {
    return this._localStreamPid = localStream.pid;
  };

  pluginAudioRenderProvider.prototype.setRemoteStream = function(remoteStream) {
    return this._linkPid = remoteStream.linkPid;
  };

  return pluginAudioRenderProvider;

})(fm.icelink.webrtc.audioRenderProvider);


/*<span id='cls-fm.icelink.webrtc.pluginVideoRenderProvider'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.pluginVideoRenderProvider
 <div>
 A plugin-based video render implementation.
 </div>

@extends fm.icelink.webrtc.videoRenderProvider
*/


fm.icelink.webrtc.pluginVideoRenderProvider = (function(_super) {

  __extends(pluginVideoRenderProvider, _super);

  pluginVideoRenderProvider.prototype._localStreamPid = null;

  pluginVideoRenderProvider.prototype._linkPid = null;

  pluginVideoRenderProvider.prototype._container = null;

  pluginVideoRenderProvider.prototype._underlay = null;

  function pluginVideoRenderProvider(scale, isLocal) {
    this.getControl = __bind(this.getControl, this);

    this.getControls = __bind(this.getControls, this);

    this.setRemoteStream = __bind(this.setRemoteStream, this);

    this.setLocalStream = __bind(this.setLocalStream, this);

    this.unmute = __bind(this.unmute, this);

    this.mute = __bind(this.mute, this);

    this.getIsMuted = __bind(this.getIsMuted, this);

    this.invalidate = __bind(this.invalidate, this);
    this._container = document.createElement('div');
    if (isLocal) {
      this._container.className = 'fm-icelink-webrtc-video fm-icelink-webrtc-video-local';
    } else {
      this._container.className = 'fm-icelink-webrtc-video fm-icelink-webrtc-video-remote';
    }
    this._underlay = document.createElement('iframe');
    this._underlay.src = 'about:blank';
    this._underlay.setAttribute('frameBorder', '0');
    this._underlay.style.border = '0';
    this._underlay.style.backgroundColor = '#000';
    this._underlay.style.position = 'absolute';
    this._underlay.style.top = '0';
    this._underlay.style.left = '0';
    this._underlay.style.width = '100%';
    this._underlay.style.height = '100%';
    this._container.appendChild(this._underlay);
  }

  pluginVideoRenderProvider.prototype.invalidate = function(control) {
    control.style.left = '1px';
    control.style.width = '99%';
    return window.setTimeout(function() {
      control.style.left = '0px';
      return control.style.width = '100%';
    }, 20);
  };

  pluginVideoRenderProvider.prototype.getIsMuted = function() {
    var result,
      _this = this;
    result = false;
    fm.icelink.webrtc.getCoreControl({
      callback: function(cc) {
        if (_this._localStreamPid) {
          return result = cc.vrp_getIsMutedLocal(_this._localStreamPid);
        } else {
          return result = cc.vrp_getIsMutedRemote(_this._linkPid);
        }
      }
    });
    return result;
  };

  pluginVideoRenderProvider.prototype.mute = function() {
    var result,
      _this = this;
    result = false;
    fm.icelink.webrtc.getCoreControl({
      callback: function(cc) {
        if (_this._localStreamPid) {
          return result = cc.vrp_muteLocal(_this._localStreamPid);
        } else {
          return result = cc.vrp_muteRemote(_this._linkPid);
        }
      }
    });
    return result;
  };

  pluginVideoRenderProvider.prototype.unmute = function() {
    var result,
      _this = this;
    result = false;
    fm.icelink.webrtc.getCoreControl({
      callback: function(cc) {
        if (_this._localStreamPid) {
          return result = cc.vrp_unmuteLocal(_this._localStreamPid);
        } else {
          return result = cc.vrp_unmuteRemote(_this._linkPid);
        }
      }
    });
    return result;
  };

  pluginVideoRenderProvider.prototype.setLocalStream = function(localStream) {
    var _this = this;
    this._localStreamPid = localStream.pid;
    return this.getControls(function(vcc, cc) {
      cc.vrp_setLocalStream(localStream.pid, vcc.getControlId());
      return _this.invalidate(vcc);
    });
  };

  pluginVideoRenderProvider.prototype.setRemoteStream = function(remoteStream) {
    var _this = this;
    this._linkPid = remoteStream.linkPid;
    return this.getControls(function(vcc, cc) {
      cc.vrp_setRemoteStream(remoteStream.linkPid, vcc.getControlId());
      return _this.invalidate(vcc);
    });
  };

  pluginVideoRenderProvider.prototype.getControls = function(callback) {
    var _this = this;
    return fm.icelink.webrtc.getVideoContainerControl({
      container: this._container,
      style: {
        width: '100%',
        height: '100%'
      },
      callback: function(vcc) {
        return fm.icelink.webrtc.getCoreControl({
          callback: function(cc) {
            vcc.initialize(cc.getRemotingPort());
            return callback(vcc, cc);
          }
        });
      }
    });
  };

  /*<span id='method-fm.icelink.webrtc.pluginVideoRenderProvider-getControl'>&nbsp;</span>
  */


  /**
   <div>
   Gets the underlying UI control.
   </div>
  
  @function getControl
  @return {DOMElement} The underlying UI control.
  */


  pluginVideoRenderProvider.prototype.getControl = function() {
    return this._container;
  };

  return pluginVideoRenderProvider;

})(fm.icelink.webrtc.videoRenderProvider);


/*<span id='cls-fm.icelink.webrtc.mediaStream'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.mediaStream
 <div>
 A media stream (local or remote).
 </div>

@extends fm.dynamic
*/


fm.icelink.webrtc.mediaStream = (function(_super) {

  __extends(mediaStream, _super);

  function mediaStream() {
    this.raiseVideoUnmuted = __bind(this.raiseVideoUnmuted, this);

    this.raiseAudioUnmuted = __bind(this.raiseAudioUnmuted, this);

    this.raiseVideoMuted = __bind(this.raiseVideoMuted, this);

    this.raiseAudioMuted = __bind(this.raiseAudioMuted, this);

    this.getVideoIsMuted = __bind(this.getVideoIsMuted, this);

    this.getAudioIsMuted = __bind(this.getAudioIsMuted, this);

    this.unmuteVideo = __bind(this.unmuteVideo, this);

    this.unmuteAudio = __bind(this.unmuteAudio, this);

    this.muteVideo = __bind(this.muteVideo, this);

    this.muteAudio = __bind(this.muteAudio, this);

    this.toggleVideoMute = __bind(this.toggleVideoMute, this);

    this.toggleAudioMute = __bind(this.toggleAudioMute, this);

    this.removeOnVideoUnmuted = __bind(this.removeOnVideoUnmuted, this);

    this.addOnVideoUnmuted = __bind(this.addOnVideoUnmuted, this);

    this.removeOnAudioUnmuted = __bind(this.removeOnAudioUnmuted, this);

    this.addOnAudioUnmuted = __bind(this.addOnAudioUnmuted, this);

    this.removeOnVideoMuted = __bind(this.removeOnVideoMuted, this);

    this.addOnVideoMuted = __bind(this.addOnVideoMuted, this);

    this.removeOnAudioMuted = __bind(this.removeOnAudioMuted, this);

    this.addOnAudioMuted = __bind(this.addOnAudioMuted, this);

    this.setBackingStream = __bind(this.setBackingStream, this);

    this.getBackingStream = __bind(this.getBackingStream, this);
    return mediaStream.__super__.constructor.apply(this, arguments);
  }

  mediaStream.prototype._backingStream = null;

  mediaStream.prototype.getBackingStream = function() {
    return this._backingStream;
  };

  mediaStream.prototype.setBackingStream = function(backingStream) {
    return this._backingStream = backingStream;
  };

  mediaStream.prototype._onAudioMuted = null;

  mediaStream.prototype._onVideoMuted = null;

  mediaStream.prototype._onAudioUnmuted = null;

  mediaStream.prototype._onVideoUnmuted = null;

  /*<span id='method-fm.icelink.webrtc.mediaStream-addOnAudioMuted'>&nbsp;</span>
  */


  /**
   <div>
   Adds a handler that is raised when the audio tracks are muted.
   </div>
  @function addOnAudioMuted
  @param {fm.singleAction} callback
  @return {void}
  */


  mediaStream.prototype.addOnAudioMuted = function(callback) {
    return this._onAudioMuted = fm.delegate.combine(this._onAudioMuted, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-removeOnAudioMuted'>&nbsp;</span>
  */


  /**
   <div>
   Removes a handler that is raised when the audio tracks are muted.
   </div>
  @function removeOnAudioMuted
  @param {fm.singleAction} callback
  @return {void}
  */


  mediaStream.prototype.removeOnAudioMuted = function(callback) {
    return this._onAudioMuted = fm.delegate.remove(this._onAudioMuted, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-addOnVideoMuted'>&nbsp;</span>
  */


  /**
   <div>
   Adds a handler that is raised when the video tracks are muted.
   </div>
  @function addOnVideoMuted
  @param {fm.singleAction} callback
  @return {void}
  */


  mediaStream.prototype.addOnVideoMuted = function(callback) {
    return this._onVideoMuted = fm.delegate.combine(this._onVideoMuted, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-removeOnVideoMuted'>&nbsp;</span>
  */


  /**
   <div>
   Removes a handler that is raised when the video tracks are muted.
   </div>
  @function removeOnVideoMuted
  @param {fm.singleAction} callback
  @return {void}
  */


  mediaStream.prototype.removeOnVideoMuted = function(callback) {
    return this._onVideoMuted = fm.delegate.remove(this._onVideoMuted, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-addOnAudioUnmuted'>&nbsp;</span>
  */


  /**
   <div>
   Adds a handler that is raised when the audio tracks are unmuted.
   </div>
  @function addOnAudioUnmuted
  @param {fm.singleAction} callback
  @return {void}
  */


  mediaStream.prototype.addOnAudioUnmuted = function(callback) {
    return this._onAudioUnmuted = fm.delegate.combine(this._onAudioUnmuted, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-removeOnAudioUnmuted'>&nbsp;</span>
  */


  /**
   <div>
   Removes a handler that is raised when the audio tracks are unmuted.
   </div>
  @function removeOnAudioUnmuted
  @param {fm.singleAction} callback
  @return {void}
  */


  mediaStream.prototype.removeOnAudioUnmuted = function(callback) {
    return this._onAudioUnmuted = fm.delegate.remove(this._onAudioUnmuted, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-addOnVideoUnmuted'>&nbsp;</span>
  */


  /**
   <div>
   Adds a handler that is raised when the video tracks are unmuted.
   </div>
  @function addOnVideoUnmuted
  @param {fm.singleAction} callback
  @return {void}
  */


  mediaStream.prototype.addOnVideoUnmuted = function(callback) {
    return this._onVideoUnmuted = fm.delegate.combine(this._onVideoUnmuted, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-removeOnVideoUnmuted'>&nbsp;</span>
  */


  /**
   <div>
   Removes a handler that is raised when the video tracks are unmuted.
   </div>
  @function removeOnVideoUnmuted
  @param {fm.singleAction} callback
  @return {void}
  */


  mediaStream.prototype.removeOnVideoUnmuted = function(callback) {
    return this._onVideoUnmuted = fm.delegate.remove(this._onVideoUnmuted, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-toggleAudioMute'>&nbsp;</span>
  */


  /**
   <div>
   Toggles the audio tracks' muted state.
   </div>
  @function toggleAudioMute
  @return {void}
  */


  mediaStream.prototype.toggleAudioMute = function() {
    if (this.getAudioIsMuted()) {
      return this.unmuteAudio();
    } else {
      return this.muteAudio();
    }
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-toggleVideoMute'>&nbsp;</span>
  */


  /**
   <div>
   Toggles the video tracks' muted state.
   </div>
  @function toggleVideoMute
  @return {void}
  */


  mediaStream.prototype.toggleVideoMute = function() {
    if (this.getVideoIsMuted()) {
      return this.unmuteVideo();
    } else {
      return this.muteVideo();
    }
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-muteAudio'>&nbsp;</span>
  */


  /**
   <div>
   Mutes the audio track(s).
   </div>
  @function muteAudio
  @return {void}
  */


  mediaStream.prototype.muteAudio = function() {
    var audioTrack, _i, _len, _ref;
    if (this._backingStream) {
      _ref = this._backingStream.getAudioTracks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        audioTrack = _ref[_i];
        audioTrack.enabled = false;
      }
      return this.raiseAudioMuted();
    }
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-muteVideo'>&nbsp;</span>
  */


  /**
   <div>
   Mutes the video track(s).
   </div>
  @function muteVideo
  @return {void}
  */


  mediaStream.prototype.muteVideo = function() {
    var videoTrack, _i, _len, _ref;
    if (this._backingStream) {
      _ref = this._backingStream.getVideoTracks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        videoTrack = _ref[_i];
        videoTrack.enabled = false;
      }
      return this.raiseVideoMuted();
    }
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-unmuteAudio'>&nbsp;</span>
  */


  /**
   <div>
   Unmutes the audio track(s).
   </div>
  @function unmuteAudio
  @return {void}
  */


  mediaStream.prototype.unmuteAudio = function() {
    var audioTrack, _i, _len, _ref;
    if (this._backingStream) {
      _ref = this._backingStream.getAudioTracks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        audioTrack = _ref[_i];
        audioTrack.enabled = true;
      }
      return this.raiseAudioUnmuted();
    }
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-unmuteVideo'>&nbsp;</span>
  */


  /**
   <div>
   Unmutes the video track(s).
   </div>
  @function unmuteVideo
  @return {void}
  */


  mediaStream.prototype.unmuteVideo = function() {
    var videoTrack, _i, _len, _ref;
    if (this._backingStream) {
      _ref = this._backingStream.getVideoTracks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        videoTrack = _ref[_i];
        videoTrack.enabled = true;
      }
      return this.raiseVideoUnmuted();
    }
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-getAudioIsMuted'>&nbsp;</span>
  */


  /**
   <div>
   Gets a value indicating whether or not all the audio tracks are muted.
   </div>
  @function getAudioIsMuted
  @return {Boolean}
  */


  mediaStream.prototype.getAudioIsMuted = function() {
    var audioTrack, _i, _len, _ref;
    if (this._backingStream) {
      _ref = this._backingStream.getAudioTracks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        audioTrack = _ref[_i];
        if (audioTrack.enabled) {
          return false;
        }
      }
    }
    return true;
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-getVideoIsMuted'>&nbsp;</span>
  */


  /**
   <div>
   Gets a value indicating whether or not all the video tracks are muted.
   </div>
  @function getVideoIsMuted
  @return {Boolean}
  */


  mediaStream.prototype.getVideoIsMuted = function() {
    var videoTrack, _i, _len, _ref;
    if (this._backingStream) {
      _ref = this._backingStream.getVideoTracks();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        videoTrack = _ref[_i];
        if (videoTrack.enabled) {
          return false;
        }
      }
    }
    return true;
  };

  mediaStream.prototype.raiseAudioMuted = function() {
    var handler;
    handler = this._onAudioMuted;
    if (handler) {
      return handler(this);
    }
  };

  mediaStream.prototype.raiseVideoMuted = function() {
    var handler;
    handler = this._onVideoMuted;
    if (handler) {
      return handler(this);
    }
  };

  mediaStream.prototype.raiseAudioUnmuted = function() {
    var handler;
    handler = this._onAudioUnmuted;
    if (handler) {
      return handler(this);
    }
  };

  mediaStream.prototype.raiseVideoUnmuted = function() {
    var handler;
    handler = this._onVideoUnmuted;
    if (handler) {
      return handler(this);
    }
  };

  return mediaStream;

})(fm.dynamic);


/*<span id='cls-fm.icelink.webrtc.localMediaStream'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.localMediaStream
 <div>
 Describes a media stream.
 </div>

@extends fm.icelink.webrtc.mediaStream
*/


fm.icelink.webrtc.localMediaStream = (function(_super) {
  var _onAudioPaused, _onAudioResumed, _onVideoPaused, _onVideoResumed;

  __extends(localMediaStream, _super);

  function localMediaStream() {
    this.raiseStartFailure = __bind(this.raiseStartFailure, this);

    this.raiseStartSuccess = __bind(this.raiseStartSuccess, this);

    this.start = __bind(this.start, this);

    this.stop = __bind(this.stop, this);

    this.initialize = __bind(this.initialize, this);

    this.setDefaultVideoPreviewScale = __bind(this.setDefaultVideoPreviewScale, this);

    this.getDefaultVideoPreviewScale = __bind(this.getDefaultVideoPreviewScale, this);

    this.setDefaultVideoScale = __bind(this.setDefaultVideoScale, this);

    this.getDefaultVideoScale = __bind(this.getDefaultVideoScale, this);

    this.setCreateVideoRenderProvider = __bind(this.setCreateVideoRenderProvider, this);

    this.getCreateVideoRenderProvider = __bind(this.getCreateVideoRenderProvider, this);

    this.setCreateAudioRenderProvider = __bind(this.setCreateAudioRenderProvider, this);

    this.getCreateAudioRenderProvider = __bind(this.getCreateAudioRenderProvider, this);

    this.setVideoCaptureProvider = __bind(this.setVideoCaptureProvider, this);

    this.getVideoCaptureProvider = __bind(this.getVideoCaptureProvider, this);

    this.setAudioCaptureProvider = __bind(this.setAudioCaptureProvider, this);

    this.getAudioCaptureProvider = __bind(this.getAudioCaptureProvider, this);

    this.raiseVideoResumed = __bind(this.raiseVideoResumed, this);

    this.raiseAudioResumed = __bind(this.raiseAudioResumed, this);

    this.raiseVideoPaused = __bind(this.raiseVideoPaused, this);

    this.raiseAudioPaused = __bind(this.raiseAudioPaused, this);

    this.getVideoIsPaused = __bind(this.getVideoIsPaused, this);

    this.getAudioIsPaused = __bind(this.getAudioIsPaused, this);

    this.resumeVideo = __bind(this.resumeVideo, this);

    this.resumeAudio = __bind(this.resumeAudio, this);

    this.pauseVideo = __bind(this.pauseVideo, this);

    this.pauseAudio = __bind(this.pauseAudio, this);

    this.removeOnVideoResumed = __bind(this.removeOnVideoResumed, this);

    this.addOnVideoResumed = __bind(this.addOnVideoResumed, this);

    this.removeOnAudioResumed = __bind(this.removeOnAudioResumed, this);

    this.addOnAudioResumed = __bind(this.addOnAudioResumed, this);

    this.removeOnVideoPaused = __bind(this.removeOnVideoPaused, this);

    this.addOnVideoPaused = __bind(this.addOnVideoPaused, this);

    this.removeOnAudioPaused = __bind(this.removeOnAudioPaused, this);

    this.addOnAudioPaused = __bind(this.addOnAudioPaused, this);
    return localMediaStream.__super__.constructor.apply(this, arguments);
  }

  _onAudioPaused = null;

  _onAudioResumed = null;

  _onVideoPaused = null;

  _onVideoResumed = null;

  /*<span id='method-fm.icelink.webrtc.mediaStream-addOnAudioPaused'>&nbsp;</span>
  */


  /**
   <div>
   Adds a handler that is raised when the audio is paused.
   </div>
  @function addOnAudioPaused
  @param {fm.singleAction} callback
  @return {void}
  */


  localMediaStream.prototype.addOnAudioPaused = function(callback) {
    return this._onAudioPaused = fm.delegate.combine(this._onAudioPaused, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-removeOnAudioPaused'>&nbsp;</span>
  */


  /**
   <div>
   Removes a handler that is raised when the audio is paused.
   </div>
  @function removeOnAudioPaused
  @param {fm.singleAction} callback
  @return {void}
  */


  localMediaStream.prototype.removeOnAudioPaused = function(callback) {
    return this._onAudioPaused = fm.delegate.remove(this._onAudioPaused, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-addOnVideoPaused'>&nbsp;</span>
  */


  /**
   <div>
   Adds a handler that is raised when the video is paused.
   </div>
  @function addOnVideoPaused
  @param {fm.singleAction} callback
  @return {void}
  */


  localMediaStream.prototype.addOnVideoPaused = function(callback) {
    return this._onVideoPaused = fm.delegate.combine(this._onVideoPaused, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-removeOnVideoPaused'>&nbsp;</span>
  */


  /**
   <div>
   Removes a handler that is raised when the video is paused.
   </div>
  @function removeOnVideoPaused
  @param {fm.singleAction} callback
  @return {void}
  */


  localMediaStream.prototype.removeOnVideoPaused = function(callback) {
    return this._onVideoPaused = fm.delegate.remove(this._onVideoPaused, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-addOnAudioResumed'>&nbsp;</span>
  */


  /**
   <div>
   Adds a handler that is raised when the audio is resumed.
   </div>
  @function addOnAudioResumed
  @param {fm.singleAction} callback
  @return {void}
  */


  localMediaStream.prototype.addOnAudioResumed = function(callback) {
    return this._onAudioResumed = fm.delegate.combine(this._onAudioResumed, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-removeOnAudioResumed'>&nbsp;</span>
  */


  /**
   <div>
   Removes a handler that is raised when the audio is resumed.
   </div>
  @function removeOnAudioResumed
  @param {fm.singleAction} callback
  @return {void}
  */


  localMediaStream.prototype.removeOnAudioResumed = function(callback) {
    return this._onAudioResumed = fm.delegate.remove(this._onAudioResumed, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-addOnVideoResumed'>&nbsp;</span>
  */


  /**
   <div>
   Adds a handler that is raised when the video is resumed.
   </div>
  @function addOnVideoResumed
  @param {fm.singleAction} callback
  @return {void}
  */


  localMediaStream.prototype.addOnVideoResumed = function(callback) {
    return this._onVideoResumed = fm.delegate.combine(this._onVideoResumed, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-removeOnVideoResumed'>&nbsp;</span>
  */


  /**
   <div>
   Removes a handler that is raised when the video is resumed.
   </div>
  @function removeOnVideoResumed
  @param {fm.singleAction} callback
  @return {void}
  */


  localMediaStream.prototype.removeOnVideoResumed = function(callback) {
    return this._onVideoResumed = fm.delegate.remove(this._onVideoResumed, callback);
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-pauseAudio'>&nbsp;</span>
  */


  /**
   <div>
   Pauses audio capture.
   </div>
  @function pauseAudio
  @return {void}
  */


  localMediaStream.prototype.pauseAudio = function() {
    var acp, success;
    acp = _audioCaptureProvider;
    if (acp && !this.getAudioIsPaused()) {
      success = false;
      try {
        success = acp.pause();
      } catch (ex) {
        fm.log.error('Could not pause audio.', ex);
      }
      if (success) {
        this.raiseAudioPaused();
      }
      return success;
    }
    return false;
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-pauseVideo'>&nbsp;</span>
  */


  /**
   <div>
   Pauses video capture.
   </div>
  @function pauseVideo
  @return {void}
  */


  localMediaStream.prototype.pauseVideo = function() {
    var success, vcp;
    vcp = _videoCaptureProvider;
    if (vcp && !this.getVideoIsPaused()) {
      success = false;
      try {
        success = vcp.pause();
      } catch (ex) {
        fm.log.error('Could not pause video.', ex);
      }
      if (success) {
        this.raiseVideoPaused();
      }
      return success;
    }
    return false;
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-resumeAudio'>&nbsp;</span>
  */


  /**
   <div>
   Resumes audio capture.
   </div>
  @function resumeAudio
  @return {void}
  */


  localMediaStream.prototype.resumeAudio = function() {
    var acp, success;
    acp = _audioCaptureProvider;
    if (acp && this.getAudioIsPaused()) {
      success = false;
      try {
        success = acp.resume();
      } catch (ex) {
        fm.log.error('Could not resume audio.', ex);
      }
      if (success) {
        this.raiseAudioResumed();
      }
      return success;
    }
    return false;
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-resumeVideo'>&nbsp;</span>
  */


  /**
   <div>
   Resumes video capture.
   </div>
  @function resumeVideo
  @return {void}
  */


  localMediaStream.prototype.resumeVideo = function() {
    var success, vcp;
    vcp = _videoCaptureProvider;
    if (vcp && this.getVideoIsPaused()) {
      success = false;
      try {
        success = vcp.resume();
      } catch (ex) {
        fm.log.error('Could not resume video.', ex);
      }
      if (success) {
        this.raiseVideoResumed();
      }
      return success;
    }
    return false;
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-getAudioIsPaused'>&nbsp;</span>
  */


  /**
   <div>
   Gets a value indicating whether or not all the audio tracks are paused.
   </div>
  @function getAudioIsPaused
  @return {Boolean}
  */


  localMediaStream.prototype.getAudioIsPaused = function() {
    var acp;
    acp = _audioCaptureProvider;
    if (acp) {
      return !acp.isRunning();
    }
    return false;
  };

  /*<span id='method-fm.icelink.webrtc.mediaStream-getVideoIsPaused'>&nbsp;</span>
  */


  /**
   <div>
   Gets a value indicating whether or not all the video tracks are paused.
   </div>
  @function getVideoIsPaused
  @return {Boolean}
  */


  localMediaStream.prototype.getVideoIsPaused = function() {
    var vcp;
    vcp = _videoCaptureProvider;
    if (vcp) {
      return !vcp.isRunning();
    }
    return false;
  };

  localMediaStream.prototype.raiseAudioPaused = function() {
    var handler;
    handler = this._onAudioPaused;
    if (handler) {
      return handler(this);
    }
  };

  localMediaStream.prototype.raiseVideoPaused = function() {
    var handler;
    handler = this._onVideoPaused;
    if (handler) {
      return handler(this);
    }
  };

  localMediaStream.prototype.raiseAudioResumed = function() {
    var handler;
    handler = this._onAudioResumed;
    if (handler) {
      return handler(this);
    }
  };

  localMediaStream.prototype.raiseVideoResumed = function() {
    var handler;
    handler = this._onVideoResumed;
    if (handler) {
      return handler(this);
    }
  };

  localMediaStream.prototype._audioCaptureProvider = null;

  localMediaStream.prototype._videoCaptureProvider = null;

  localMediaStream.prototype._createAudioRenderProvider = null;

  localMediaStream.prototype._createVideoRenderProvider = null;

  localMediaStream.prototype._initialized = false;

  /*<span id='method-fm.icelink.webrtc.localMediaStream-getAudioCaptureProvider'>&nbsp;</span>
  */


  /**
   <div>
   Gets the audio capture provider.
   </div>
  @function getAudioCaptureProvider
  @return {fm.icelink.webrtc.audioCaptureProvider}
  */


  localMediaStream.prototype.getAudioCaptureProvider = function() {
    return this._audioCaptureProvider;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-setAudioCaptureProvider'>&nbsp;</span>
  */


  /**
   <div>
   Sets the audio capture provider.
   </div>
  @function setAudioCaptureProvider
  @param {fm.icelink.webrtc.audioCaptureProvider} audioCaptureProvider
  */


  localMediaStream.prototype.setAudioCaptureProvider = function(audioCaptureProvider) {
    return this._audioCaptureProvider = audioCaptureProvider;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-getVideoCaptureProvider'>&nbsp;</span>
  */


  /**
   <div>
   Gets the video capture provider.
   </div>
  @function getVideoCaptureProvider
  @return {fm.icelink.webrtc.videoCaptureProvider}
  */


  localMediaStream.prototype.getVideoCaptureProvider = function() {
    return this._videoCaptureProvider;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-setVideoCaptureProvider'>&nbsp;</span>
  */


  /**
   <div>
   Sets the video capture provider.
   </div>
  @function setVideoCaptureProvider
  @param {fm.icelink.webrtc.videoCaptureProvider} videoCaptureProvider
  */


  localMediaStream.prototype.setVideoCaptureProvider = function(videoCaptureProvider) {
    return this._videoCaptureProvider = videoCaptureProvider;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-getCreateAudioRenderProvider'>&nbsp;</span>
  */


  /**
   <div>
   Gets the callback used to create an audio render provider.
   </div>
  @function getCreateAudioRenderProvider
  @return {fm.emptyFunction}
  */


  localMediaStream.prototype.getCreateAudioRenderProvider = function() {
    return this._createAudioRenderProvider;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-setCreateAudioRenderProvider'>&nbsp;</span>
  */


  /**
   <div>
   Sets the callback used to create an audio render provider.
   </div>
  @function setCreateAudioRenderProvider
  @param {fm.emptyFunction} createAudioRenderProvider
  */


  localMediaStream.prototype.setCreateAudioRenderProvider = function(createAudioRenderProvider) {
    return this._createAudioRenderProvider = createAudioRenderProvider;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-getCreateVideoRenderProvider'>&nbsp;</span>
  */


  /**
   <div>
   Gets the callback used to create a video render provider.
   </div>
  @function getCreateVideoRenderProvider
  @return {fm.emptyFunction}
  */


  localMediaStream.prototype.getCreateVideoRenderProvider = function() {
    return this._createVideoRenderProvider;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-setCreateVideoRenderProvider'>&nbsp;</span>
  */


  /**
   <div>
   Sets the callback used to create a video render provider.
   </div>
  @function setCreateVideoRenderProvider
  @param {fm.emptyFunction} createVideoRenderProvider
  */


  localMediaStream.prototype.setCreateVideoRenderProvider = function(createVideoRenderProvider) {
    return this._createVideoRenderProvider = createVideoRenderProvider;
  };

  localMediaStream.prototype._defaultVideoScale = null;

  localMediaStream.prototype._defaultVideoPreviewScale = null;

  /*<span id='method-fm.icelink.webrtc.localMediaStream-getDefaultVideoScale'>&nbsp;</span>
  */


  /**
   <div>
   Gets the scaling to apply to the controls created by the default video render providers.
   </div>
  @function getDefaultVideoScale
  @return {fm.icelink.webrtc.defaultVideoScale}
  */


  localMediaStream.prototype.getDefaultVideoScale = function() {
    return this._defaultVideoScale;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-setDefaultVideoScale'>&nbsp;</span>
  */


  /**
   <div>
   Sets the scaling to apply to the controls created by the default video render providers.
   </div>
  @function setDefaultVideoScale
  @param {fm.icelink.webrtc.defaultVideoScale} defaultVideoScale
  */


  localMediaStream.prototype.setDefaultVideoScale = function(defaultVideoScale) {
    return this._defaultVideoScale = defaultVideoScale;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-getDefaultVideoPreviewScale'>&nbsp;</span>
  */


  /**
   <div>
   Gets the scaling to apply to the preview control created by the default video capture provider.
   </div>
  @function getDefaultVideoPreviewScale
  @return {fm.icelink.webrtc.defaultVideoPreviewScale}
  */


  localMediaStream.prototype.getDefaultVideoPreviewScale = function() {
    return this._defaultVideoPreviewScale;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-setDefaultVideoPreviewScale'>&nbsp;</span>
  */


  /**
   <div>
   Sets the scaling to apply to the preview control created by the default video capture provider.
   </div>
  @function setDefaultVideoPreviewScale
  @param {fm.icelink.webrtc.defaultVideoPreviewScale} defaultVideoPreviewScale
  */


  localMediaStream.prototype.setDefaultVideoPreviewScale = function(defaultVideoPreviewScale) {
    return this._defaultVideoPreviewScale = defaultVideoPreviewScale;
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-initialize'>&nbsp;</span>
  */


  /**
   <div>
   Initializes the local media stream.
   </div>
  @function initialize
  @param {fm.singleAction} callback The callback to invoke when the local media stream is initialized.
  @return {void}
  */


  localMediaStream.prototype.initialize = function(callback) {
    this._initialized = true;
    if (callback) {
      return callback(this);
    }
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-stop'>&nbsp;</span>
  */


  /**
   <div>
   Permanently halts the generation of data for the tracks' sources and removes the references to the sources.
   </div>
  @function stop
  @return {void}
  */


  localMediaStream.prototype.stop = function() {
    var localStream;
    if (!this._initialized) {
      throw new Error('Local media stream must be initialized using `initialize` before calling `stop`.');
    }
    localStream = this.getBackingStream();
    if (localStream) {
      return localStream.stop();
    }
  };

  /*<span id='method-fm.icelink.webrtc.localMediaStream-start'>&nbsp;</span>
  */


  /**
   <div>
   Starts the local media stream, setting up any audio/video providers and preparing for media.
   </div>
  @function start
  @param {fm.icelink.webrtc.localStartArgs} args The start arguments.
  @return {void}
  */


  localMediaStream.prototype.start = function(startArgs) {
    var audio, getUserMediaFailure, getUserMediaSuccess, video,
      _this = this;
    if (!this._initialized) {
      throw new Error('Local media stream must be initialized using `initialize` before calling `start`.');
    }
    getUserMediaSuccess = function(localStream) {
      var acp, vcp;
      _this.setBackingStream(localStream);
      acp = _this.getAudioCaptureProvider();
      vcp = _this.getVideoCaptureProvider();
      if (acp) {
        acp.setLocalStream(_this);
      }
      if (vcp) {
        vcp.setLocalStream(_this);
      }
      return _this.raiseStartSuccess(startArgs, localStream);
    };
    getUserMediaFailure = function(error) {
      if (typeof error === 'string' || error instanceof String) {
        error = new Error(error);
      }
      if (!error.message) {
        error = new Error('Permission denied. (The camera may be locked or you may need to access this page through a webserver instead of the file system.)');
      }
      return _this.raiseStartFailure(startArgs, error);
    };
    audio = false;
    if (startArgs.getAudio()) {
      audio = true;
    }
    video = false;
    if (startArgs.getVideo()) {
      video = {
        optional: [],
        mandatory: {
          maxWidth: startArgs.getVideoWidth(),
          maxHeight: startArgs.getVideoHeight(),
          maxFrameRate: startArgs.getVideoFrameRate()
        }
      };
    }
    if (audio && video) {
      return navigator.fmGetUserMedia({
        audio: audio,
        video: video
      }, getUserMediaSuccess, getUserMediaFailure);
    } else if (audio) {
      return navigator.fmGetUserMedia({
        audio: audio
      }, getUserMediaSuccess, getUserMediaFailure);
    } else if (video) {
      return navigator.fmGetUserMedia({
        video: video
      }, getUserMediaSuccess, getUserMediaFailure);
    } else {
      return getUserMediaSuccess(null);
    }
  };

  localMediaStream.prototype.raiseStartSuccess = function(startArgs, localStream) {
    var onSuccess;
    onSuccess = startArgs.getOnSuccess();
    if (onSuccess) {
      return onSuccess(new fm.icelink.webrtc.localStartSuccessArgs({
        audio: startArgs.getAudio(),
        audioDeviceNumber: startArgs.getAudioDeviceNumber(),
        video: startArgs.getVideo(),
        videoDeviceNumber: startArgs.getVideoDeviceNumber(),
        videoWidth: startArgs.getVideoWidth(),
        videoHeight: startArgs.getVideoHeight(),
        videoFrameRate: startArgs.getVideoFrameRate(),
        localStream: this
      }));
    }
  };

  localMediaStream.prototype.raiseStartFailure = function(startArgs, exception) {
    var onFailure;
    onFailure = startArgs.getOnFailure();
    if (onFailure) {
      return onFailure(new fm.icelink.webrtc.localStartFailureArgs({
        audio: startArgs.getAudio(),
        audioDeviceNumber: startArgs.getAudioDeviceNumber(),
        video: startArgs.getVideo(),
        videoDeviceNumber: startArgs.getVideoDeviceNumber(),
        videoWidth: startArgs.getVideoWidth(),
        videoHeight: startArgs.getVideoHeight(),
        videoFrameRate: startArgs.getVideoFrameRate(),
        localStream: this,
        exception: exception
      }));
    }
  };

  return localMediaStream;

})(fm.icelink.webrtc.mediaStream);


/*<span id='cls-fm.icelink.webrtc.layoutManager'>&nbsp;</span>
*/

/**
@class fm.icelink.webrtc.layoutManager
 <div>
 A DOM layout manager for web browsers.
 </div>

@extends fm.icelink.webrtc.baseLayoutManager
*/


fm.icelink.webrtc.layoutManager = (function(_super) {

  __extends(layoutManager, _super);

  layoutManager.prototype._container = null;

  layoutManager.prototype._innerContainer = null;

  layoutManager.prototype._resizeInterval = null;

  layoutManager.prototype._parentMissing = 0;

  layoutManager.prototype._parentMissingMax = 16;

  layoutManager.prototype._lastWidth = 0;

  layoutManager.prototype._lastHeight = 0;

  layoutManager.prototype.getContainer = function() {
    return this._innerContainer;
  };

  /*<span id='method-fm.icelink.webrtc.layoutManager-fm.icelink.webrtc.layoutManager'>&nbsp;</span>
  */


  /**
   <div>
   Initializes a new instance of the <see cref="fm.icelink.webrtc.layoutManager">fm.icelink.webrtc.layoutManager</see> class.
   </div>
  @function fm.icelink.webrtc.layoutManager
  @param {DOMElement} container The layout container (a DOM element).
  @param {fm.icelink.webrtc.layoutPreset} preset A layout preset (optional).
  @return {}
  */


  function layoutManager(container, preset) {
    this.doLayout = __bind(this.doLayout, this);

    this.runOnUIThread = __bind(this.runOnUIThread, this);

    this.removeFromContainer = __bind(this.removeFromContainer, this);

    this.addToContainer = __bind(this.addToContainer, this);

    this.getContainer = __bind(this.getContainer, this);

    var child, children, _i, _len,
      _this = this;
    layoutManager.__super__.constructor.call(this, preset);
    this._remoteVideosTable = {};
    this._container = container;
    children = this._container.getElementsByTagName('div');
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      child = children[_i];
      if (child.getAttribute('data-fm-icelink-webrtc-inner-container') === 'true') {
        this._container.removeChild(child);
      }
    }
    this._innerContainer = document.createElement('div');
    this._innerContainer.style.position = 'relative';
    this._innerContainer.style.width = '100%';
    this._innerContainer.style.height = '100%';
    this._innerContainer.setAttribute('data-fm-icelink-webrtc-inner-container', 'true');
    this._container.appendChild(this._innerContainer);
    this._resizeInterval = window.setInterval(function() {
      var height, width;
      if (!_this._container.parentNode) {
        _this._parentMissing = _this._parentMissing + 1;
        if (_this._parentMissing > _this._parentMissingMax) {
          return window.clearInterval(_this._resizeInterval);
        }
      } else {
        _this._parentMissing = 0;
        width = _this._innerContainer.offsetWidth;
        height = _this._innerContainer.offsetHeight;
        if (width !== _this._lastWidth || height !== _this._lastHeight) {
          _this.doLayout();
          _this._lastWidth = width;
          return _this._lastHeight = height;
        }
      }
    }, 250);
  }

  /*<span id='method-fm.icelink.webrtc.layoutManager-addToContainer'>&nbsp;</span>
  */


  /**
   <div>
   Adds a control to the container.
   </div>
  @function addToContainer
  @param {DOMElement} control The control to add.
  */


  layoutManager.prototype.addToContainer = function(control) {
    return this._innerContainer.appendChild(control);
  };

  /*<span id='method-fm.icelink.webrtc.layoutManager-removeFromContainer'>&nbsp;</span>
  */


  /**
   <div>
   Removes a control from the container.
   </div>
  @function removeFromContainer
  @param {DOMElement} control The control to remove.
  */


  layoutManager.prototype.removeFromContainer = function(control) {
    return this._innerContainer.removeChild(control);
  };

  /*<span id='method-fm.icelink.webrtc.layoutManager-runOnUIThread'>&nbsp;</span>
  */


  /**
   <div>
   Runs an action on the main/UI thread.
   </div>
  @function runOnUIThread
  @param {Function} action The action to invoke.
  @param {Object} arg1 The first argument.
  @param {Object} arg2 The second argument.
  */


  layoutManager.prototype.runOnUIThread = function(action, arg1, arg2) {
    return action(arg1, arg2);
  };

  /*<span id='method-fm.icelink.webrtc.layoutManager-doLayout'>&nbsp;</span>
  */


  /**
   <div>
   Lays out the controls.
   </div>
  @function doLayout
  */


  layoutManager.prototype.doLayout = function() {
    var i, layout, localFrame, localVideoControl, remoteFrame, remoteFrames, remoteVideoControl, remoteVideoControls, _i, _len, _results;
    localVideoControl = this.getLocalVideoControl();
    remoteVideoControls = this.getRemoteVideoControls();
    layout = this.getLayout(this._innerContainer.offsetWidth, this._innerContainer.offsetHeight, remoteVideoControls.length);
    if (localVideoControl !== null) {
      localFrame = layout.getLocalFrame();
      localVideoControl.style.position = 'absolute';
      localVideoControl.style.left = localFrame.getX() + 'px';
      localVideoControl.style.top = localFrame.getY() + 'px';
      localVideoControl.style.width = localFrame.getWidth() + 'px';
      localVideoControl.style.height = localFrame.getHeight() + 'px';
      if (this.getMode() === fm.icelink.webrtc.layoutMode.FloatLocal) {
        localVideoControl.style.zIndex = remoteVideoControls.length;
      } else if (this.getMode() === fm.icelink.webrtc.layoutMode.FloatRemote) {
        localVideoControl.style.zIndex = 0;
      }
    }
    remoteFrames = layout.getRemoteFrames();
    _results = [];
    for (i = _i = 0, _len = remoteFrames.length; _i < _len; i = ++_i) {
      remoteFrame = remoteFrames[i];
      remoteVideoControl = remoteVideoControls[i];
      remoteVideoControl.style.position = 'absolute';
      remoteVideoControl.style.left = remoteFrame.getX() + 'px';
      remoteVideoControl.style.top = remoteFrame.getY() + 'px';
      remoteVideoControl.style.width = remoteFrame.getWidth() + 'px';
      remoteVideoControl.style.height = remoteFrame.getHeight() + 'px';
      if (this.getMode() === fm.icelink.webrtc.layoutMode.FloatLocal) {
        _results.push(remoteVideoControl.style.zIndex = i);
      } else if (this.getMode() === fm.icelink.webrtc.layoutMode.FloatRemote) {
        _results.push(remoteVideoControl.style.zIndex = i + 1);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return layoutManager;

})(fm.icelink.webrtc.baseLayoutManager);



(function() {
  /**
   <div>
   Sets the applet configuration.
   </div>
   <div>
      'path' (string) is a required field and should represent the path to the .jar containing the applet code.
      'name' (string) is an optional field and is used as the applet name (defaults to 'JavaScript Applet').
      'initializer' (string) is an optional field and should represent a fully-qualified class name in the applet
      that will be run before anything else.
      'prompt' (boolean) is an optional field and indicates whether a prompt to install the Java plugin should be
      shown if the Java plugin is not currently installed. If set to true, this overrides the 'alert' setting.
      'promptMessage' (string) is an optional field and is used as the text for the installation prompt, if required.
      Defaults to 'Java is required to enable WebRTC. Would you like to install it?'.
      'promptRedirect' (string) is an optional field and is the web address to which the browser will be redirected
      if the installation prompt is displayed and confirmed. Defaults to 'https://java.com/en/download/testjava.jsp'.
      'alert' (boolean) is an optional field and indicates whether an alert should be shown if the Java plugin is
      not currently installed. This will only be used if 'prompt' is set to false.
      'alertMessage' (string) is an optional field and is used as the text for the installation alert, if required.
      Defaults to 'Java is required to enable WebRTC.'
      'mobileMessage' (string) is an optional field and is used as the text for the alert shown to mobile device
      users, if required, since JRE installation on mobile is not possible. Defaults to 'Java is required to enable
      WebRTC, but is not supported on mobile browsers.'
   </div>
      
  @function setApplet
  @param {object} value
  @return {void}
  */

  var _this = this;
  fm.icelink.webrtc.setApplet = function(args) {
    args = fm.util.extend({
      prompt: true,
      promptMessage: 'Java is required to enable WebRTC. Would you like to install it?',
      promptRedirect: 'https://java.com/en/download/testjava.jsp',
      alert: true,
      alertMessage: 'Java is required to enable WebRTC.',
      mobileMessage: 'Java is required to enable WebRTC, but is not supported on mobile browsers.'
    }, args || {});
    if (!args.path) {
      throw new Error('path cannot be null.');
    }
    return fm.icelink.webrtc.appletArgs = args;
  };
  fm.icelink.webrtc._isAppletSupported = function() {
    return fm.icelink.webrtc.appletArgs && fm.util.hasJava();
  };
  fm.icelink.webrtc._showAppletAlert = function() {
    var args;
    args = fm.icelink.webrtc.appletArgs;
    if (fm.util.isMobile()) {
      if (args.alert) {
        return alert(args.mobileMessage);
      }
    } else {
      if (args.prompt) {
        if (confirm(args.promptMessage)) {
          return window.location = args.promptRedirect;
        }
      } else if (args.alert) {
        return alert(args.alertMessage);
      }
    }
  };
  fm.icelink.webrtc._initializeApplet = function(args) {
    if (!fm.icelink.webrtc.appletArgs) {
      throw new Error('fm.icelink.webrtc.setApplet must be called first to set applet configuration.');
    }
    args = fm.util.extend({
      callback: function() {}
    }, args || {});
    if (fm.icelink.webrtc.appletArgs.initializer && fm.icelink.webrtc.appletArgs.initializer !== args.className) {
      return fm.icelink.webrtc.getApplet({
        id: 'static',
        className: fm.icelink.webrtc.appletArgs.initializer,
        callback: function() {
          return args.callback();
        }
      });
    } else {
      return args.callback();
    }
  };
  fm.icelink.webrtc._callApplet = function(args, applet, onload) {
    var ready;
    ready = false;
    try {
      ready = applet.isLoaded;
    } catch (_error) {}
    if (ready) {
      if (onload) {
        onload(applet);
      }
      return args.callback(applet);
    } else {
      return setTimeout(function() {
        return fm.icelink.webrtc._callApplet(args, applet, onload);
      }, 10);
    }
  };
  /**
   <div>
   Gets an applet for execution.
   </div>
   <div>
   setApplet must be called first to set applet configuration. 'id' (string) is the ID assigned to the applet
   (defaults to a new globally unique identifier). 'className' (string) is the fully-qualified class name in the
   applet to initialize and return. 'container' (DOM element) is the element that will hold the applet (defaults to
   document.body). 'callback' (function) is the callback that will be invoked when the applet is ready for interaction
   with JavaScript. 'style' (object) contains a set of style property key/value pairs that will be applied to the
   applet.
   </div>
   
  @function getApplet
  @param {object} value
  @return {void}
  */

  fm.icelink.webrtc.getApplet = function(args) {
    var applet, appletId, doc;
    if (!fm.icelink.webrtc.appletArgs) {
      throw new Error('fm.icelink.webrtc.setApplet must be called first to set applet configuration.');
    }
    args = fm.util.extend({
      id: fm.guid.newGuid().toString(),
      className: 'Unknown',
      container: document.body,
      callback: function() {}
    }, args || {});
    args.style = fm.util.extend({
      width: 0,
      height: 0,
      position: 'absolute',
      left: 0,
      top: 0
    }, args.style || {});
    appletId = args.className + '-' + args.id;
    doc = args.container.ownerDocument;
    applet = doc.getElementById(appletId);
    if (applet) {
      return fm.icelink.webrtc._callApplet(args, applet);
    } else {
      return fm.icelink.webrtc._initializeApplet({
        className: args.className,
        callback: function() {
          var key, value, _ref;
          applet = doc.createElement('applet');
          applet.id = appletId;
          applet.name = fm.icelink.webrtc.appletArgs.name || 'JavaScript Applet';
          applet.setAttribute('archive', fm.icelink.webrtc.appletArgs.path);
          applet.setAttribute('code', args.className + '.class');
          applet.setAttribute('mayscript', 'mayscript');
          applet.setAttribute('java_arguments', '-Xms128m -Xmx512m');
          applet.setAttribute('separate_jvm', 'true');
          _ref = args.style;
          for (key in _ref) {
            value = _ref[key];
            if (args.style.hasOwnProperty(key)) {
              applet.style[key] = value;
            }
          }
          args.container.appendChild(applet);
          if (args.beforeunload) {
            fm.util.observe(window, 'beforeunload', function() {
              args.beforeunload(applet);
            });
          }
          return fm.icelink.webrtc._callApplet(args, applet, args.onload);
        }
      });
    }
  };
  fm.icelink.webrtc.getCoreApplet = function(args) {
    var _this = this;
    return fm.icelink.webrtc.getApplet(fm.util.extend({
      id: 'static',
      className: 'fm.icelink.webrtc.applet.CoreApplet',
      onload: function(applet) {
        return applet.attachLog(fm.log.getProvider().getLevel(), {
          callback: function(text) {
            return window.setTimeout(function() {
              return fm.log.writeLine(text);
            }, 1);
          }
        });
      },
      beforeunload: function(applet) {
        return applet.setIsUnloading(true);
      }
    }, args || {}));
  };
  return fm.icelink.webrtc.getVideoContainerApplet = function(args) {
    var _this = this;
    return fm.icelink.webrtc.getApplet(fm.util.extend({
      className: 'fm.icelink.webrtc.applet.VideoContainerApplet',
      onload: function(applet) {
        return applet.attachLog(fm.log.getProvider().getLevel(), {
          callback: function(text) {
            return window.setTimeout(function() {
              return fm.log.writeLine(text);
            }, 1);
          }
        });
      },
      beforeunload: function(applet) {
        return applet.setIsUnloading(true);
      }
    }, args || {}));
  };
})();



(function() {
  /**
   <div>
   Sets the ActiveX control configuration.
   </div>
   <div>
      'path_x86' (string) is a required field and should represent the path to the .cab containing the x86 ActiveX control code.
      'path_x64' (string) is a required field and should represent the path to the .cab containing the x64 ActiveX control code.
      'initializer' (string) is an optional field and should represent a class ID in the ActiveX control
      that will be run before anything else.
   </div>
      
  @function setActiveX
  @param {object} value
  @return {void}
  */

  var _this = this;
  fm.icelink.webrtc.setActiveX = function(args) {
    if (!args.path_x86) {
      throw new Error('path_x86 cannot be null.');
    }
    if (!args.path_x64) {
      throw new Error('path_x64 cannot be null.');
    }
    return fm.icelink.webrtc.activexArgs = args;
  };
  fm.icelink.webrtc._isActiveXSupported = function() {
    return fm.icelink.webrtc.activexArgs && fm.util.hasActiveX();
  };
  fm.icelink.webrtc._initializeActiveX = function(args) {
    if (!fm.icelink.webrtc.activexArgs) {
      throw new Error('fm.icelink.webrtc.setActiveX must be called first to set ActiveX configuration.');
    }
    args = fm.util.extend({
      callback: function() {}
    }, args || {});
    if (fm.icelink.webrtc.activexArgs.initializer && fm.icelink.webrtc.activexArgs.initializer !== args.classId) {
      return fm.icelink.webrtc.getActiveX({
        id: 'static',
        classId: fm.icelink.webrtc.activexArgs.initializer,
        callback: function() {
          return args.callback();
        }
      });
    } else {
      return args.callback();
    }
  };
  fm.icelink.webrtc._callControl = function(args, control, onload) {
    var ready;
    ready = false;
    try {
      ready = control.getControlId;
    } catch (_error) {}
    if (ready) {
      if (onload) {
        onload(control);
      }
      return args.callback(control);
    } else {
      return setTimeout(function() {
        return fm.icelink.webrtc._callControl(args, control, onload);
      }, 10);
    }
  };
  /**
   <div>
   Gets an ActiveX control for execution.
   </div>
   <div>
   setActiveX must be called first to set ActiveX configuration. 'id' (string) is the ID assigned to the ActiveX control
   (defaults to a new globally unique identifier). 'classId' (string) is the class ID in the
   ActiveX control to initialize and return. 'container' (DOM element) is the element that will hold the ActiveX control (defaults to
   document.body). 'callback' (function) is the callback that will be invoked when the ActiveX control is ready for interaction
   with JavaScript. 'style' (object) contains a set of style property key/value pairs that will be applied to the
   ActiveX control.
   </div>
   
  @function getActiveX
  @param {object} value
  @return {void}
  */

  fm.icelink.webrtc.getActiveX = function(args) {
    var activexId, control, doc;
    if (!fm.icelink.webrtc.activexArgs) {
      throw new Error('fm.icelink.webrtc.setActiveX must be called first to set ActiveX configuration.');
    }
    args = fm.util.extend({
      id: fm.guid.newGuid().toString(),
      classId: '00000000-0000-0000-0000-000000000000',
      container: document.body,
      callback: function() {}
    }, args || {});
    args.style = fm.util.extend({
      width: 0,
      height: 0,
      position: 'absolute',
      left: 0,
      top: 0
    }, args.style || {});
    if (args.className) {
      activexId = args.className + '-' + args.classId + '-' + args.id;
    } else {
      activexId = args.classId + '-' + args.id;
    }
    doc = args.container.ownerDocument;
    control = doc.getElementById(activexId);
    if (control) {
      return fm.icelink.webrtc._callControl(args, control);
    } else {
      return fm.icelink.webrtc._initializeActiveX({
        classId: args.classId,
        callback: function() {
          var codebase, key, value, _ref;
          if (window.navigator.cpuClass === 'x86') {
            codebase = fm.icelink.webrtc.activexArgs.path_x86;
          } else {
            codebase = fm.icelink.webrtc.activexArgs.path_x64;
          }
          control = doc.createElement('object');
          control.id = activexId;
          control.name = fm.icelink.webrtc.activexArgs.name || 'JavaScript ActiveX Control';
          control.setAttribute('codebase', codebase);
          control.setAttribute('classid', 'CLSID:' + args.classId);
          _ref = args.style;
          for (key in _ref) {
            value = _ref[key];
            if (args.style.hasOwnProperty(key)) {
              control.style[key] = value;
            }
          }
          args.container.appendChild(control);
          if (args.beforeunload) {
            fm.util.observe(window, 'beforeunload', function() {
              args.beforeunload(control);
            });
          }
          return fm.icelink.webrtc._callControl(args, control, args.onload);
        }
      });
    }
  };
  fm.icelink.webrtc.getCoreActiveX = function(args) {
    var _this = this;
    return fm.icelink.webrtc.getActiveX(fm.util.extend({
      id: 'static',
      className: 'FM.IceLink.WebRTC.ActiveX.CoreControl',
      classId: '763DECA9-511D-4532-B485-B36563D93664',
      onload: function(control) {
        return control.attachLog(fm.log.getProvider().getLevel(), {
          callback: function(text) {
            return window.setTimeout(function() {
              return fm.log.writeLine(text);
            }, 1);
          }
        });
      },
      beforeunload: function(control) {
        return control.setIsUnloading(true);
      }
    }, args || {}));
  };
  return fm.icelink.webrtc.getVideoContainerActiveX = function(args) {
    return fm.icelink.webrtc.getActiveX(fm.util.extend({
      className: 'FM.IceLink.WebRTC.ActiveX.VideoContainerControl',
      classId: 'EF7B41D4-4E53-4865-B4E4-1FB0424981D3'
    }, args || {}));
  };
})();



(function() {
  var dataChannelStreamClass, dataChannelStreamConstructor, dataChannelStreamPrototype, linkProps, linkPrototype, localMediaStreamProps, localMediaStreamPrototype, prop, streamType, streamTypes, value, _fn, _i, _len, _results,
    _this = this;
  navigator.fmGetUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.getUserMedia;
  fm.icelink.webrtc._forceNative = false;
  fm.icelink.webrtc._forceActiveX = false;
  fm.icelink.webrtc._forceApplet = false;
  /**
   <div>
   Sets whether or not to force IceLink to use the native WebRTC mode.
   </div>
      
  @function setForceNative
  @param {boolean} value
  */

  fm.icelink.webrtc.setForceNative = function(forceNative) {
    return fm.icelink.webrtc._forceNative = forceNative;
  };
  /**
   <div>
   Gets whether or not to force IceLink to use the native WebRTC mode.
   </div>
      
  @function getForceNative
  @return {boolean}
  */

  fm.icelink.webrtc.getForceNative = function() {
    return fm.icelink.webrtc._forceNative;
  };
  /**
   <div>
   Sets whether or not to force IceLink to use the ActiveX control.
   </div>
      
  @function setForceActiveX
  @param {boolean} value
  */

  fm.icelink.webrtc.setForceActiveX = function(forceActiveX) {
    return fm.icelink.webrtc._forceActiveX = forceActiveX;
  };
  /**
   <div>
   Gets whether or not to force IceLink to use the ActiveX control.
   </div>
      
  @function getForceActiveX
  @return {boolean}
  */

  fm.icelink.webrtc.getForceActiveX = function() {
    return fm.icelink.webrtc._forceActiveX;
  };
  /**
   <div>
   Sets whether or not to force IceLink to use the Java applet.
   </div>
      
  @function setForceApplet
  @param {boolean} value
  */

  fm.icelink.webrtc.setForceApplet = function(forceApplet) {
    return fm.icelink.webrtc._forceApplet = forceApplet;
  };
  /**
   <div>
   Gets whether or not to force IceLink to use the Java applet.
   </div>
      
  @function getForceApplet
  @return {boolean}
  */

  fm.icelink.webrtc.getForceApplet = function() {
    return fm.icelink.webrtc._forceApplet;
  };
  fm.icelink.webrtc._disableNative = false;
  fm.icelink.webrtc._disableActiveX = false;
  fm.icelink.webrtc._disableApplet = false;
  /**
   <div>
   Sets whether or not to prevent IceLink from using the native WebRTC mode.
   </div>
      
  @function setDisableNative
  @param {boolean} value
  */

  fm.icelink.webrtc.setDisableNative = function(disableNative) {
    return fm.icelink.webrtc._disableNative = disableNative;
  };
  /**
   <div>
   Gets whether or not to prevent IceLink from using the native WebRTC mode.
   </div>
      
  @function getDisableNative
  @return {boolean}
  */

  fm.icelink.webrtc.getDisableNative = function() {
    return fm.icelink.webrtc._disableNative;
  };
  /**
   <div>
   Sets whether or not to prevent IceLink from using the ActiveX control.
   </div>
      
  @function setDisableActiveX
  @param {boolean} value
  */

  fm.icelink.webrtc.setDisableActiveX = function(disableActiveX) {
    return fm.icelink.webrtc._disableActiveX = disableActiveX;
  };
  /**
   <div>
   Gets whether or not to prevent IceLink from using the ActiveX control.
   </div>
      
  @function getDisableActiveX
  @return {boolean}
  */

  fm.icelink.webrtc.getDisableActiveX = function() {
    return fm.icelink.webrtc._disableActiveX;
  };
  /**
   <div>
   Sets whether or not to prevent IceLink from using the Java applet.
   </div>
      
  @function setDisableApplet
  @param {boolean} value
  */

  fm.icelink.webrtc.setDisableApplet = function(disableApplet) {
    return fm.icelink.webrtc._disableApplet = disableApplet;
  };
  /**
   <div>
   Gets whether or not to prevent IceLink from using the Java applet.
   </div>
      
  @function getDisableApplet
  @return {boolean}
  */

  fm.icelink.webrtc.getDisableApplet = function() {
    return fm.icelink.webrtc._disableApplet;
  };
  fm.icelink.webrtc._supportedModes = null;
  /**
   <div>
   Gets the supported underlying WebRTC modes (native/activex/applet) as an object literal.
   </div>
      
  @function getSupportedModes
  @return {string} object with 'native'/'activex'/'applet' set to true or false as supported.
  */

  fm.icelink.webrtc.getSupportedModes = function() {
    var sm;
    if (!fm.icelink.webrtc._supportedModes) {
      sm = {
        "native": fm.icelink.webrtc._forceNative,
        activex: fm.icelink.webrtc._forceActiveX,
        applet: fm.icelink.webrtc._forceApplet
      };
      if (!sm["native"] && !sm.activex && !sm.applet) {
        if (!fm.icelink.webrtc._disableNative && navigator.fmGetUserMedia) {
          sm["native"] = true;
        }
        if (!fm.icelink.webrtc._disableActiveX && fm.icelink.webrtc._isActiveXSupported()) {
          sm.activex = true;
        } else {
          if (!fm.icelink.webrtc._disableApplet && fm.icelink.webrtc._isAppletSupported()) {
            sm.applet = true;
          } else if (!sm["native"]) {
            fm.icelink.webrtc._showAppletAlert();
          }
        }
      }
      fm.icelink.webrtc._supportedModes = sm;
    }
    return fm.icelink.webrtc._supportedModes;
  };
  /**
   <div>
   Gets the underlying WebRTC mode (native/activex/applet), or null if not supported.
   </div>
      
  @function getMode
  @return {string} 'native'/'activex'/'applet' or null if not supported.
  */

  fm.icelink.webrtc.getMode = function() {
    var modes;
    modes = fm.icelink.webrtc.getSupportedModes();
    if (modes["native"]) {
      return 'native';
    }
    if (modes.activex) {
      return 'activex';
    }
    if (modes.applet) {
      return 'applet';
    }
    return null;
  };
  /**
   <div>
   Gets whether or not native WebRTC support will be used.
   </div>
      
  @function willUseNative
  @return {boolean}
  */

  fm.icelink.webrtc.willUseNative = function() {
    return fm.icelink.webrtc.getMode() === 'native';
  };
  /**
   <div>
   Gets whether or not ActiveX will be used.
   </div>
      
  @function willUseActiveX
  @return {boolean}
  */

  fm.icelink.webrtc.willUseActiveX = function() {
    return fm.icelink.webrtc.getMode() === 'activex';
  };
  /**
   <div>
   Gets whether or not the Java applet will be used.
   </div>
      
  @function willUseApplet
  @return {boolean}
  */

  fm.icelink.webrtc.willUseApplet = function() {
    return fm.icelink.webrtc.getMode() === 'applet';
  };
  /**
   <div>
   Gets whether or not ActiveX or the Java applet will be used.
   </div>
      
  @function willUsePlugin
  @return {boolean}
  */

  fm.icelink.webrtc.willUsePlugin = function() {
    return fm.icelink.webrtc.willUseActiveX() || fm.icelink.webrtc.willUseApplet();
  };
  fm.icelink.webrtc.getCoreControl = function(args) {
    if (fm.icelink.webrtc.willUseActiveX()) {
      return fm.icelink.webrtc.getCoreActiveX(args);
    } else {
      return fm.icelink.webrtc.getCoreApplet(args);
    }
  };
  fm.icelink.webrtc.getVideoContainerControl = function(args) {
    if (fm.icelink.webrtc.willUseActiveX()) {
      return fm.icelink.webrtc.getVideoContainerActiveX(args);
    } else {
      return fm.icelink.webrtc.getVideoContainerApplet(args);
    }
  };
  fm.icelink.webrtc.getPluginHostName = function() {
    if (fm.icelink.webrtc.willUseActiveX()) {
      return 'ActiveX host';
    } else {
      return 'JVM';
    }
  };
  fm.icelink.webrtc.pluginLinks = {};
  linkPrototype = fm.icelink.link.prototype;
  linkProps = {};
  for (prop in linkPrototype) {
    value = linkPrototype[prop];
    if (prop !== 'constructor') {
      linkProps[prop] = linkPrototype[prop];
      if (prop === 'initialize') {
        fm.icelink.link.prototype[prop] = (function(prop) {
          return function(serverAddresses, streams, callback) {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              return fm.icelink.webrtc.getCoreControl({
                callback: function(cc) {
                  var stream, streamPids, _i, _len;
                  self.jca = cc;
                  if (typeof self.jca.l_create === 'undefined') {
                    throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.create).');
                  }
                  self.pid = self.jca.l_create();
                  fm.icelink.webrtc.pluginLinks[self.pid] = self;
                  streamPids = [];
                  for (_i = 0, _len = streams.length; _i < _len; _i++) {
                    stream = streams[_i];
                    streamPids.push(stream.pid);
                  }
                  if (typeof self.jca.l_initialize === 'undefined') {
                    throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.' + prop + ').');
                  }
                  return self.jca.l_initialize(self.pid, fm.serializer.serializeStringArray(serverAddresses), fm.serializer.serializeStringArray(streamPids), {
                    onInit: function(json) {
                      var e;
                      e = fm.icelink.linkInitArgs.fromJson(json);
                      return self.raiseInit(e.getInitiator());
                    },
                    onCandidate: function(json) {
                      var e;
                      e = fm.icelink.linkCandidateArgs.fromJson(json);
                      return self.raiseCandidate(e.getCandidate());
                    },
                    onOfferAnswer: function(json) {
                      var e;
                      e = fm.icelink.linkOfferAnswerArgs.fromJson(json);
                      return self.raiseOfferAnswer(e.getOfferAnswer());
                    },
                    onUp: function(json) {
                      var e, remoteStream;
                      e = fm.icelink.linkUpArgs.fromJson(json);
                      remoteStream = new fm.icelink.webrtc.mediaStream();
                      remoteStream.linkPid = self.pid;
                      self.setRemoteStreamInternal(remoteStream);
                      return self.raiseUp();
                    },
                    onDown: function(json) {
                      var e;
                      e = fm.icelink.linkDownArgs.fromJson(json);
                      self.raiseDown(e.getException());
                      return delete fm.icelink.webrtc.pluginLinks[self.pid];
                    },
                    onComplete: function() {
                      return linkProps[prop].call(self, serverAddresses, streams, callback);
                    }
                  });
                }
              });
            } else {
              return linkProps[prop].call(self, serverAddresses, streams, callback);
            }
          };
        })(prop);
      } else if (prop === 'createOffer' || prop === 'createAnswer') {
        fm.icelink.link.prototype[prop] = (function(prop) {
          return function(createArgs) {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['l_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.' + prop + ').');
              }
              return self.jca['l_' + prop](self.pid, createArgs.toJson(), {
                onSuccess: function(json) {
                  var e, handler;
                  handler = createArgs.getOnSuccess();
                  if (handler) {
                    e = fm.icelink.createSuccessArgs.fromJson(json);
                    e.setLink(self);
                    e.setDynamicProperties(createArgs.getDynamicProperties());
                    return handler(e);
                  }
                },
                onFailure: function(json) {
                  var e, handler;
                  handler = createArgs.getOnFailure();
                  if (handler) {
                    e = fm.icelink.createFailureArgs.fromJson(json);
                    e.setLink(self);
                    e.setDynamicProperties(createArgs.getDynamicProperties());
                    return handler(e);
                  }
                },
                onComplete: function(json) {
                  var e, handler;
                  handler = createArgs.getOnComplete();
                  if (handler) {
                    e = fm.icelink.createCompleteArgs.fromJson(json);
                    e.setLink(self);
                    e.setDynamicProperties(createArgs.getDynamicProperties());
                    return handler(e);
                  }
                }
              });
            } else {
              return linkProps[prop].call(self, createArgs);
            }
          };
        })(prop);
      } else if (prop === 'accept') {
        fm.icelink.link.prototype[prop] = (function(prop) {
          return function(acceptArgs) {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['l_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.' + prop + ').');
              }
              return self.jca['l_' + prop](self.pid, acceptArgs.toJson(), {
                onSuccess: function(json) {
                  var e, handler;
                  handler = acceptArgs.getOnSuccess();
                  if (handler) {
                    e = fm.icelink.acceptSuccessArgs.fromJson(json);
                    e.setLink(self);
                    e.setDynamicProperties(acceptArgs.getDynamicProperties());
                    return handler(e);
                  }
                },
                onFailure: function(json) {
                  var e, handler;
                  handler = acceptArgs.getOnFailure();
                  if (handler) {
                    e = fm.icelink.acceptFailureArgs.fromJson(json);
                    e.setLink(self);
                    e.setDynamicProperties(acceptArgs.getDynamicProperties());
                    return handler(e);
                  }
                },
                onComplete: function(json) {
                  var e, handler;
                  handler = acceptArgs.getOnComplete();
                  if (handler) {
                    e = fm.icelink.acceptCompleteArgs.fromJson(json);
                    e.setLink(self);
                    e.setDynamicProperties(acceptArgs.getDynamicProperties());
                    return handler(e);
                  }
                }
              });
            } else {
              return linkProps[prop].call(self, acceptArgs);
            }
          };
        })(prop);
      } else if (prop === 'close') {
        fm.icelink.link.prototype[prop] = (function(prop) {
          return function(closeArgs) {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (!closeArgs) {
                if (typeof self.jca['l_' + prop + '1'] === 'undefined') {
                  throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.' + prop + '1).');
                }
                self.jca['l_' + prop + '1'](self.pid);
                return;
              }
              if (typeof self.jca['l_' + prop + '3'] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.' + prop + '3).');
              }
              return self.jca['l_' + prop + '3'](self.pid, closeArgs.toJson(), {
                onComplete: function(json) {
                  var e, handler;
                  handler = closeArgs.getOnComplete();
                  if (handler) {
                    e = fm.icelink.closeCompleteArgs.fromJson(json);
                    e.setLink(self);
                    e.setDynamicProperties(closeArgs.getDynamicProperties());
                    return handler(e);
                  }
                }
              });
            } else {
              if (!closeArgs) {
                linkProps[prop].call(self);
                return;
              }
              return linkProps[prop].call(self, closeArgs);
            }
          };
        })(prop);
      } else if (prop === 'addRemoteCandidate') {
        fm.icelink.link.prototype[prop] = (function(prop) {
          return function(candidate) {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['l_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.' + prop + ').');
              }
              return self.jca['l_' + prop](self.pid, candidate.toJson());
            } else {
              return linkProps[prop].call(self, candidate);
            }
          };
        })(prop);
      } else if (prop === 'sendData') {
        fm.icelink.link.prototype[prop] = (function(prop) {
          return function(channelInfo, data) {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['l_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.' + prop + ').');
              }
              return self.jca['l_' + prop](self.pid, channelInfo.toJson(), data);
            } else {
              return linkProps[prop].call(self, channelInfo, data);
            }
          };
        })(prop);
      } else if (prop === 'getSuppressPrivateCandidates' || prop === 'getSuppressPublicCandidates' || prop === 'getSuppressRelayCandidates' || prop === 'getRtpPortMin' || prop === 'getRtpPortMax' || prop === 'getRelayUsername' || prop === 'getRelayRealm' || prop === 'getRelayPassword' || prop === 'getCandidateMode' || prop === 'getEarlyCandidatesTimeout' || prop === 'getServerAddresses' || prop === 'getServerAddress' || prop === 'getServerPort' || prop === 'getServerIPAddress' || prop === 'getPeerId' || prop === 'getTieBreaker' || prop === 'getControlling' || prop === 'getWasUp' || prop === 'getReachedServer' || prop === 'getReachedPeer' || prop === 'getLocalOfferAnswer' || prop === 'getRemoteOfferAnswer' || prop === 'getIsCreating' || prop === 'getHasCreated' || prop === 'getIsAccepting' || prop === 'getHasAccepted' || prop === 'getIsClosing' || prop === 'getHasClosed' || prop === 'getIsOpening' || prop === 'getHasOpened' || prop === 'getIsOpened' || prop === 'getAllLocalCandidates' || prop === 'getAllRemoteCandidates' || prop === 'getAllLocalCandidateTypes' || prop === 'getAllRemoteCandidateTypes') {
        fm.icelink.link.prototype[prop] = (function(prop) {
          return function() {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['l_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.' + prop + ').');
              }
              value = self.jca['l_' + prop](self.pid);
              if (prop === 'getServerAddresses') {
                value = fm.serializer.deserializeStringArray(value);
              } else if (prop === 'getCandidateMode') {
                value = fm.icelink.candidate.modeFromJson(value);
              } else if (prop === 'getLocalOfferAnswer' || prop === 'getRemoteOfferAnswer') {
                value = fm.icelink.offerAnswer.fromJson(value);
              } else if (prop === 'getAllLocalCandidates' || prop === 'getAllRemoteCandidates') {
                value = fm.icelink.candidate.fromJsonMultiple(value);
              } else if (prop === 'getAllLocalCandidateTypes' || prop === 'getAllRemoteCandidateTypes') {
                value = fm.icelink.candidate.typesFromJsonMultiple(value);
              }
              return value;
            } else {
              return linkProps[prop].call(self);
            }
          };
        })(prop);
      } else if (prop === 'setSuppressPrivateCandidates' || prop === 'setSuppressPublicCandidates' || prop === 'setSuppressRelayCandidates' || prop === 'setRtpPortMin' || prop === 'setRtpPortMax' || prop === 'setRelayUsername' || prop === 'setRelayRealm' || prop === 'setRelayPassword' || prop === 'setCandidateMode' || prop === 'setEarlyCandidatesTimeout' || prop === 'setServerAddresses' || prop === 'setServerAddress' || prop === 'setServerPort' || prop === 'setServerIPAddress' || prop === 'setPeerId') {
        fm.icelink.link.prototype[prop] = (function(prop) {
          return function(value) {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['l_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (link.' + prop + ').');
              }
              if (prop === 'setServerAddresses') {
                value = fm.serializer.serializeStringArray(value);
              } else if (prop === 'setCandidateMode') {
                value = fm.icelink.candidate.modeToJson(value);
              }
              return self.jca['l_' + prop](self.pid, value);
            } else {
              return linkProps[prop].call(self, value);
            }
          };
        })(prop);
      } else {
        fm.icelink.link.prototype[prop] = value;
      }
    }
  }
  localMediaStreamPrototype = fm.icelink.webrtc.localMediaStream.prototype;
  localMediaStreamProps = {};
  for (prop in localMediaStreamPrototype) {
    value = localMediaStreamPrototype[prop];
    if (prop !== 'constructor') {
      localMediaStreamProps[prop] = localMediaStreamPrototype[prop];
      if (prop.indexOf('initialize') === 0) {
        fm.icelink.webrtc.localMediaStream.prototype[prop] = (function(prop) {
          return function(callback) {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              return fm.icelink.webrtc.getCoreControl({
                callback: function(cc) {
                  self.jca = cc;
                  if (typeof self.jca.lms_create === 'undefined') {
                    throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (localMediaStream.create).');
                  }
                  self.pid = self.jca.lms_create(self.getDefaultVideoPreviewScale(), self.getDefaultVideoScale());
                  return localMediaStreamProps[prop].call(self, callback);
                }
              });
            } else {
              return localMediaStreamProps[prop].call(self, callback);
            }
          };
        })(prop);
      } else if (prop.indexOf('stop') === 0) {
        fm.icelink.webrtc.localMediaStream.prototype[prop] = (function(prop) {
          return function() {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['lms_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (localMediaStream.' + prop + ').');
              }
              return self.jca['lms_' + prop](self.pid);
            } else {
              return localMediaStreamProps[prop].call(self);
            }
          };
        })(prop);
      } else if (prop.indexOf('start') === 0) {
        fm.icelink.webrtc.localMediaStream.prototype[prop] = (function(prop) {
          return function(args) {
            var self,
              _this = this;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['lms_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (localMediaStream.' + prop + ').');
              }
              return self.jca['lms_' + prop](self.pid, args.toJson(), {
                onSuccess: function(json) {
                  var acp, e, handler, vcp;
                  fm.util.observe(window, 'beforeunload', function() {
                    self.stop();
                  });
                  acp = self.getAudioCaptureProvider();
                  vcp = self.getVideoCaptureProvider();
                  if (acp) {
                    acp.setLocalStream(self);
                  }
                  if (vcp) {
                    vcp.setLocalStream(self);
                  }
                  handler = args.getOnSuccess();
                  if (handler) {
                    e = fm.icelink.webrtc.localStartSuccessArgs.fromJson(json);
                    e.setLocalStream(self);
                    return handler(e);
                  }
                },
                onFailure: function(json) {
                  var e, handler;
                  handler = args.getOnFailure();
                  if (handler) {
                    e = fm.icelink.webrtc.localStartFailureArgs.fromJson(json);
                    e.setLocalStream(self);
                    return handler(e);
                  }
                }
              });
            } else {
              return localMediaStreamProps[prop].call(self, args);
            }
          };
        })(prop);
      } else if (prop.indexOf('mute') === 0 || prop.indexOf('unmute') === 0) {
        fm.icelink.webrtc.localMediaStream.prototype[prop] = (function(prop) {
          return function() {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['lms_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (localMediaStream.' + prop + ').');
              }
              self.jca['lms_' + prop](self.pid);
              if (prop === 'muteAudio') {
                return self.raiseAudioMuted();
              } else if (prop === 'muteVideo') {
                return self.raiseVideoMuted();
              } else if (prop === 'unmuteAudio') {
                return self.raiseAudioUnmuted();
              } else if (prop === 'unmuteVideo') {
                return self.raiseVideoUnmuted();
              }
            } else {
              return localMediaStreamProps[prop].call(self);
            }
          };
        })(prop);
      } else if (prop.indexOf('getAudioIsMuted') === 0 || prop.indexOf('getVideoIsMuted') === 0) {
        fm.icelink.webrtc.localMediaStream.prototype[prop] = (function(prop) {
          return function() {
            var self;
            self = this;
            if (fm.icelink.webrtc.willUsePlugin()) {
              if (typeof self.jca['lms_' + prop] === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (localMediaStream.' + prop + ').');
              }
              return self.jca['lms_' + prop](self.pid);
            } else {
              return localMediaStreamProps[prop].call(self);
            }
          };
        })(prop);
      } else {
        fm.icelink.webrtc.localMediaStream.prototype[prop] = value;
      }
    }
  }
  streamTypes = ['audioStream', 'videoStream'];
  _fn = function(streamType) {
    var streamClass, streamConstructor, streamPrototype, _results;
    streamConstructor = fm.icelink.webrtc[streamType].prototype.constructor;
    streamPrototype = fm.icelink.webrtc[streamType].prototype;
    streamClass = fm.icelink.webrtc[streamType];
    fm.icelink.webrtc[streamType] = function(localStream, offerDtls) {
      var self;
      self = this;
      if (arguments.length < 2) {
        offerDtls = true;
      }
      if (fm.icelink.webrtc.willUsePlugin()) {
        fm.icelink.webrtc.getCoreControl({
          callback: function(cc) {
            self.jca = cc;
            if (streamType === 'audioStream') {
              if (typeof self.jca.as_create === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (audioStream.create).');
              }
              return self.pid = self.jca.as_create(localStream.pid, offerDtls);
            } else {
              if (typeof self.jca.vs_create === 'undefined') {
                throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (videoStream.create).');
              }
              return self.pid = self.jca.vs_create(localStream.pid, offerDtls);
            }
          }
        });
      }
      streamConstructor.apply(self, arguments);
      return self;
    };
    for (prop in streamPrototype) {
      value = streamPrototype[prop];
      if (prop !== 'constructor') {
        fm.icelink.webrtc[streamType].prototype[prop] = value;
      }
    }
    _results = [];
    for (prop in streamClass) {
      value = streamClass[prop];
      _results.push(fm.icelink.webrtc[streamType][prop] = value);
    }
    return _results;
  };
  for (_i = 0, _len = streamTypes.length; _i < _len; _i++) {
    streamType = streamTypes[_i];
    _fn(streamType);
  }
  dataChannelStreamConstructor = fm.icelink.webrtc.dataChannelStream.prototype.constructor;
  dataChannelStreamPrototype = fm.icelink.webrtc.dataChannelStream.prototype;
  dataChannelStreamClass = fm.icelink.webrtc.dataChannelStream;
  fm.icelink.webrtc.dataChannelStream = function(dataChannelInfos, offerDtls) {
    var self;
    self = this;
    if (arguments.length < 2) {
      offerDtls = true;
    }
    if (fm.icelink.webrtc.willUsePlugin()) {
      fm.icelink.webrtc.getCoreControl({
        callback: function(cc) {
          var callbacksArray, dataChannelInfo, dataChannelInfosJson, _fn1, _j, _len1;
          self.jca = cc;
          dataChannelInfosJson = fm.icelink.webrtc.dataChannelInfo.toJsonMultiple(dataChannelInfos);
          callbacksArray = [];
          _fn1 = function(dataChannelInfo) {
            var _this = this;
            return callbacksArray.push({
              onReceive: function(json, linkPid) {
                var e, handler, link;
                handler = dataChannelInfo.getOnReceive();
                if (handler) {
                  e = fm.icelink.webrtc.dataChannelReceiveArgs.fromJson(json);
                  e.setChannelInfo(dataChannelInfo);
                  link = fm.icelink.webrtc.pluginLinks[linkPid];
                  if (link) {
                    e.setLink(link);
                    e.setConference(link.getConference());
                  }
                  return handler(e);
                }
              }
            });
          };
          for (_j = 0, _len1 = dataChannelInfos.length; _j < _len1; _j++) {
            dataChannelInfo = dataChannelInfos[_j];
            _fn1(dataChannelInfo);
          }
          if (typeof self.jca.dcs_create === 'undefined') {
            throw new Error('The ' + fm.icelink.webrtc.getPluginHostName() + ' is inaccessible (dataChannelStream.create).');
          }
          return self.pid = self.jca.dcs_create(dataChannelInfosJson, offerDtls, callbacksArray);
        }
      });
    }
    dataChannelStreamConstructor.apply(self, arguments);
    return self;
  };
  for (prop in dataChannelStreamPrototype) {
    value = dataChannelStreamPrototype[prop];
    if (prop !== 'constructor') {
      fm.icelink.webrtc.dataChannelStream.prototype[prop] = value;
    }
  }
  _results = [];
  for (prop in dataChannelStreamClass) {
    value = dataChannelStreamClass[prop];
    _results.push(fm.icelink.webrtc.dataChannelStream[prop] = value);
  }
  return _results;
})();



(function() {
  var klass, methodName, userMedia, _fn, _i, _j, _len, _len1, _ref, _ref1, _results;
  userMedia = fm.icelink.webrtc.userMedia;
  _ref = ['getMedia'];
  _fn = function(methodName) {
    var method;
    method = userMedia[methodName];
    return userMedia[methodName] = function() {
      var obj;
      if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
        obj = arguments[0];
        return method.call(this, new fm.icelink.webrtc[methodName + 'Args'](obj));
      } else {
        return method.apply(this, arguments);
      }
    };
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    methodName = _ref[_i];
    _fn(methodName);
  }
  fm.icelink.webrtc.linkExtensions.sendData = function(link) {
    var i, newArguments, _j, _ref1;
    newArguments = [];
    for (i = _j = 1, _ref1 = arguments.length - 1; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
      newArguments.push(arguments[i]);
    }
    return link.sendData.apply(link, newArguments);
  };
  _ref1 = [fm.icelink.link, fm.icelink.conference];
  _results = [];
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    klass = _ref1[_j];
    _results.push((function(klass) {
      var method;
      method = klass.prototype.sendData;
      return klass.prototype.sendData = function() {
        var channelInfo, data, obj;
        if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
          obj = arguments[0];
          channelInfo = obj.channelInfo || obj.dataChannelInfo || obj.channel || obj.dataChannel;
          data = obj.data || obj.message;
          return method.call(this, channelInfo, data);
        } else {
          return method.apply(this, arguments);
        }
      };
    })(klass));
  }
  return _results;
})();


return fm.icelink.webrtc;
}));