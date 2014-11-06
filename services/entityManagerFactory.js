/*!
 * ASP.NET SignalR JavaScript Library v1.1.2
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

"use strict";
// miss events like unload, since they do not support in packaged apps.
function HandleUnloadEvent() {
    var windowAddEventListener = Window.prototype.addEventListener;
    Window.prototype.addEventListener = function (type) {
        if (type === 'unload' || type === 'beforeunload') {

        } else
            return windowAddEventListener.apply(window, arguments);
    };
}

HandleUnloadEvent();

if (typeof ($.signalR) !== "function") {
    throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/hubs.");
}

var signalR = $.signalR;
var app = angular.module('swapcast', ['webcam']);

app.directive('ngKeydown', function () {
    return function (scope, elem, attrs) {
        // this next line will convert the string
        // function name into an actual function
        var functionToCall = scope.$eval(attrs.ngKeydown);
        $(elem).on('keydown', function (e) {
            // on the keydown event, call my function
            // and pass it the keycode of the key
            // that was pressed
            // ex: if ENTER was pressed, e.which == 13
            functionToCall(e);
        });
    }
});

app.directive("iconRemoveMessageDirective", function () {
    return function (scope, element, attrs) {
        /*         
         *  Attach the events to hide/show a remove message icon
         */
        $(element[0]).parent()
            .off('mouseover')
            .off('mouseout')
            .on('mouseover', function () { $(this).find('.remove-message').removeClass('hide'); })
            .on('mouseout', function () { $(this).find('.remove-message').addClass('hide'); });
    };
});

app.directive("tabDirective", function () {
    return function (scope, element, attrs) {
        /*         
         *  Set z-index after the tab is added. Left tab should have the biggest z-index
         */

        var tabs = $("#browserTabs > li");

        tabs.each(function (i, e) {
            $(e).css("z-index", tabs.length - i);
        });

        var selectedElement = $("#browserTabs > .activeMainTab, #browserTabs > .activeTab");

        $(selectedElement).css("z-index", tabs.length + 1);
    };
});

//app.value('signalRServer', 'http://apps.swapcast.com/');
//app.value('signalRServer', 'http://testserver2.pixelzoo.no/swapcast-test'); // production
//app.value('signalRServer', 'http://testserver2.pixelzoo.no/zwopper'); // dev
//app.value('signalRServer', 'http://swapcast.azurewebsites.net/'); // dev
//app.value('signalRServer', 'http://localhost:13212/'); // local debug
app.value('signalRServer', window.location.protocol +"//" + window.location.host + "/");
app.directive('ngBlur', ['$parse', function ($parse) {
    return function (scope, element, attr) {
        var fn = $parse(attr['ngBlur']);
        element.bind('blur', function (event) {
            scope.$apply(function () {
                fn(scope, { $event: event });
            });
        });
    };
}]);

app.directive('ngClick', ['$parse', function ($parse) {
    return function (scope, element, attr) {
        var unrestricted = attr['unrestricted'];
        var fn = $parse(attr['ngClick']);
        element.unbind('click').bind('click', function (event) {
            if (unrestricted == null || !unrestricted) {
                // make sure user is signed in
                if (!global.scopes.swapcast.IsAuthorized()) {
                    global.scopes.auth.Functions.showSignUpDialog(false);
                    return false;
                }
            }
            scope.$apply(function () {
                fn(scope, { $event: event });
            });
        });
    };
}]);
app.directive('ngIf', function () {
    return {
        link: function (scope, element, attrs) {
            if (scope.$eval(attrs.ngIf)) {
                // remove '<div ng-if...></div>'
                element.replaceWith(element.children());
            } else {
                element.replaceWith(' ');
            }
        }
    };
});

app.directive('onFinishRenderFeed', function () {
    return {
        restrict: 'A',
        link: function (scope) {
            if (scope.$last === true) {
                setTimeout(function () {
                    global.scopes.messages.scrollMainFeed();
                });
            }
        }
    };
});

app.directive('onFinishRenderChat', function () {
    return {
        restrict: 'A',
        link: function (scope) {
            if (scope.$last === true) {
                setTimeout(function () {
                    global.scopes.messages.scrollChat();
                });
            }
        }
    };
});


app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});

app.directive('enterPress', function () {
    return function (scope, elm, attrs) {
        elm.bind('keyup', function (evt) {
            if (evt.which == 13) {
                window.event = evt;
                scope.$apply(attrs.enterPress);
            }
        });
    };
});

app.directive('ngFocus', function () {
    return function (scope, elm, attrs) {
        elm.bind('focus', function (evt) {
            scope.$apply(attrs.ngFocus);
        });
    };
});

app.directive('enterPressWithNewLine', function () {
    return function (scope, elm, attrs) {
        elm.bind('keyup', function (evt) {
            if (evt.which == 13 && evt.ctrlKey) {
                var value = $(elm).val();
                $(elm).val(value + "\n");
            }
            if (evt.which == 13 && !evt.ctrlKey) {
                scope.$apply(attrs.enterPressLine);
            }
        });
    };
});

app.factory('signalRHubProxy', [
    '$rootScope', 'signalRServer',
    function($rootScope, signalRServer) {
        function signalRHubProxyFactory(serverUrl, hubName) {
            var connection = $.hubConnection(signalRServer);

            connection.disconnected(function () {
                SystemMessageManager.showConnectionIsLostMessage();

                global.scopes.swapcast.$apply(function() {
                    global.scopes.swapcast.ConnectionStatus.Status = "disconnected";
                    global.scopes.swapcast.ConnectionStatus.Color = "connectionError";
                });

                connection.start()
                    .done(function () {
                        SystemMessageManager.hide();

                        global.scopes.swapcast.$apply(function() {
                            global.scopes.swapcast.ConnectionStatus.Status = "connected";
                            global.scopes.swapcast.ConnectionStatus.Color = "connectionSuccess";
                            global.scopes.swapcast.Requests.setup();
                        });
                    })
                    .fail(function() {
                        global.scopes.swapcast.$apply(function() {
                            global.scopes.swapcast.ConnectionStatus.Status = "Couldn't connect";
                            global.scopes.swapcast.ConnectionStatus.Color = "connectionError";
                        });
                    });
            });

            connection.reconnected(function () {
                SystemMessageManager.hide();

                global.scopes.swapcast.$apply(function () {
                    global.scopes.swapcast.PeerConnectionId = connection.id;

                    global.scopes.swapcast.ConnectionStatus.Status = "connected";
                    global.scopes.swapcast.ConnectionStatus.Color = "connectionSuccess";
                });
            });

            connection.connectionSlow(function() {
                global.scopes.swapcast.$apply(function() {
                    global.scopes.swapcast.ConnectionStatus.Status = "connection problems...";
                    global.scopes.swapcast.ConnectionStatus.Color = "connectionInProcess";
                });
            });

            connection.reconnecting(function() {
				SystemMessageManager.showConnectionIsLostMessage();
			
                global.scopes.swapcast.$apply(function() {
                    global.scopes.swapcast.ConnectionStatus.Status = "connecting...";
                    global.scopes.swapcast.ConnectionStatus.Color = "connectionInProcess";
                });
            });

            connection
                .start()
                .done(function () {
                    SystemMessageManager.hide();

                    global.scopes.swapcast.$apply(function () {
                        global.scopes.swapcast.PeerConnectionId = connection.id;

                        global.scopes.swapcast.ConnectionStatus.Status = "connected";
                        global.scopes.swapcast.ConnectionStatus.Color = "connectionSuccess";
                        global.scopes.swapcast.Requests.setup();
                    });
                })
                .fail(function() {
                    global.scopes.swapcast.$apply(function() {
                        global.scopes.swapcast.ConnectionStatus.Status = "Couldn't connect";
                        global.scopes.swapcast.ConnectionStatus.Color = "connectionError";
                    });
                });

            var proxy = connection.createHubProxy(hubName);

            return {
                on: function(eventName, callback) {
                    proxy.on(eventName, function(result) {
                        $rootScope.$apply(function() {
                            if (callback) {
                                callback(result);
                            }
                        });
                    });
                },

                off: function(eventName, callback) {
                    proxy.off(eventName, function(result) {
                        $rootScope.$apply(function() {
                            if (callback) {
                                callback(result);
                            }
                        });
                    });
                },

                invoke: function (methodName, args) {
                    if (connection.state == $.signalR.connectionState.connected)
                        proxy.invoke.apply(proxy, $.merge(methodName, args));
                },

                connection: connection
            };
        };

        return signalRHubProxyFactory;
    }
]);
$(function() {
    // when fm is loaded 
    // configure activeX and java applet for ie and safari
    // For backwards-compability with browsers that do not yet support
    // WebRTC, provide a reference to fm.icelink.webrtc.applet.jar, a
    // Java applet that provides a full WebRTC stack through the exact
    // same JavaScript API you use for modern browsers. You can set this
    // for all browsers - only the ones that need it will use it.
    fm.icelink.webrtc.setApplet({
        path: './fm.icelink.webrtc.applet.jar',
        name: 'IceLink WebRTC for JavaScript'
    });

    // For a better experience in Internet Explorer, provide a reference
    // to FM.IceLink.WebRTC.ActiveX.x86/x64.cab, a pair of controls for
    // ActiveX that provide the same WebRTC stack without Java.
    fm.icelink.webrtc.setActiveX({
        path_x86: './FM.IceLink.WebRTC.ActiveX.x86.cab',
        path_x64: './FM.IceLink.WebRTC.ActiveX.x64.cab'
    });

    // Log to a console
    fm.log.setProvider(new fm.consoleLogProvider(fm.logLevel.Info));
    
});
