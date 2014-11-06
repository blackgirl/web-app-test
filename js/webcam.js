"use strict";(function(){navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,window.hasUserMedia=function(){return navigator.getMedia?!0:!1}})(),angular.module("webcam",[]).directive("webcam",function(){return{template:'<div class="webcam" ng-transclude><video class="webcam-live"></video></div>',restrict:"E",replace:!0,transclude:!0,scope:{onError:"&",onStream:"&",onStreaming:"&",placeholder:"="},link:function(e,r){var o=function o(r){if(navigator.mozGetUserMedia)s.mozSrcObject=r;else{var o=window.URL||window.webkitURL;s.src=o.createObjectURL(r)}s.play(),e.onStream&&e.onStream({stream:r,video:s})},t=function t(r){a(),console&&console.log&&console.log("The following error occured: ",r),e.onError&&e.onError({err:r})};if(e.placeholder){var i=document.createElement("img");i.class="webcam-loader",i.src=e.placeholder,r.append(i)}var a=function a(){i&&i.remove()},n=!1,d=r.width=320,c=r.height=0;if(!window.hasUserMedia())return t({code:-1,msg:"Browser does not support getUserMedia."}),void 0;var s=r.find("video")[0];navigator.getMedia({video:!0,audio:!1},o,t),s.addEventListener("canplay",function(){n||(c=s.videoHeight/(s.videoWidth/d)||250,s.setAttribute("width",d),s.setAttribute("height",c),n=!0,a(),e.onStreaming&&e.onStreaming({video:s}))},!1)}}});