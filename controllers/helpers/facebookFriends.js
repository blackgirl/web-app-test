
facebookFriends = function (callback) {
    global.scopes.friends = angular.element($('#block-my-friends')).scope();

    var access_token = '';
    function tokenFetcher() {
        // Chornaya local settings 
        var clientId = '1414994525410418';
        var clientSecret = '0764de705582253ec90602c535fe8229';

        // NP local settings
        //var clientId = '652167811511419';
        //var clientSecret = '4b4c110d24cf10e4b4d94fa998603c77';

        // Public staging settings 
        // var clientId = '795286823818395';
        // var clientSecret = '717e3779e20ac32be60c9a9e87496b55';

        var redirectUri = 'https://' + chrome.runtime.id +
                          '.chromiumapp.org/provider_cb';
        var redirectRe = new RegExp(redirectUri + '[#\?](.*)');
        access_token = null;

        return {
            getToken: function (interactive, callback) {
                if (access_token) {
                    callback(null, access_token);
                    return;
                }

                var options = {
                    'interactive': interactive,
                    url: 'https://www.facebook.com/dialog/oauth?client_id=' + clientId +
                        '&reponse_type=token' +
                        '&access_type=online' +
                        '&redirect_uri=' + encodeURIComponent(redirectUri)
                }
                chrome.identity.launchWebAuthFlow(options, function (redirectUri) {
                    if (chrome.runtime.lastError) {
                        callback(new Error(chrome.runtime.lastError));
                        return;
                    }
                    var matches = redirectUri.match(redirectRe);
                    if (matches && matches.length > 1)
                        handleProviderResponse(parseRedirectFragment(matches[1]));
                    else
                        callback(new Error('Invalid redirect URI'));
                });

                function parseRedirectFragment(fragment) {
                    var pairs = fragment.split(/&/);
                    var values = {};

                    pairs.forEach(function (pair) {
                        var nameval = pair.split(/=/);
                        values[nameval[0]] = nameval[1];
                    });

                    return values;
                }

                function handleProviderResponse(values) {
                    if (values.hasOwnProperty('access_token'))
                        setAccessToken(values.access_token);
                    else if (values.hasOwnProperty('code'))
                        exchangeCodeForToken(values.code);
                    else callback(new Error('Neither access_token nor code avialable.'));
                }

                function exchangeCodeForToken(code) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET',
                             'https://graph.facebook.com/oauth/access_token?' +
                             'client_id=' + clientId +
                             '&client_secret=' + clientSecret +
                             '&redirect_uri=' + redirectUri +
                             '&code=' + code);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.setRequestHeader('Accept', 'application/json');
                    xhr.onload = function () {
                        if (this.status === 200) {
                            var response = JSON.parse('"' + this.responseText + '"');
                            response = response.substring(0, response.indexOf('&'));
                            setAccessToken(response);
                            access_token = response;
                        }
                    };
                    xhr.send();
                }

                function setAccessToken(token) {
                    access_token = token;
                    callback(null, access_token);
                }
            },

            removeCachedToken: function (token_to_remove) {
                if (access_token == token_to_remove)
                    access_token = null;
            }
        }
    };

    var tokenFetcher = tokenFetcher();

    function xhrWithAuth(method, url, interactive, callback) {
        var retry = true;
        getToken();

        function getToken() {
            tokenFetcher.getToken(interactive, function (error, token) {
                if (error) {
                    callback(error);
                    // return;
                }
                access_token = token;
                requestStart();
            });
        }

        function requestStart() {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
            xhr.onload = requestComplete;
            xhr.send();
        }

        function requestComplete() {
            if (this.status != 200 && retry) {
                retry = false;
                tokenFetcher.removeCachedToken(access_token);
                access_token = null;
                getToken();
            } else {
                callback(null, this.status, this.response);
            }
        }
    }

    function getUserFriends(interactive) {
        xhrWithAuth('GET',
                     'https://graph.facebook.com/me/friends?'+ access_token,
                    interactive,
                    onUserFriendsFetched);
    }

    function onUserFriendsFetched(error, status, response) {
        if (!error && status == 200) {
            var user_info = JSON.parse(response);
            global.scopes.friends.friendsSearch.facebookFriendsArray = [];
            for(var array in user_info) {
                for( var user in user_info[array] ) {
                    user_info[array][user].access = access_token;
                    // console.log(user_info[array][user]);
                    global.scopes.friends.friendsSearch.facebookFriendsArray.push(user_info[array][user]);
                }
            }
            global.scopes.friends.friendsSearch.facebookFriendsArray.pop();
        } else {
            callback(null);
        }
    }
    function interactiveSignIn() {
        tokenFetcher.getToken(true, function (error, access_token) {
            if (!error) {
                getUserFriends(true);
            }
        });
    }
    interactiveSignIn();
};
// !Facebook