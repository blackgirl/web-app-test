googlePlusFriends = function (callback) {
    var access_token = '';

    function xhrWithAuth(method, url, interactive, callback) {
        var retry = true;
        getToken();
        function getToken() {
            chrome.identity.getAuthToken({ interactive: interactive }, function (token) {
                if (chrome.runtime.lastError) {
                    callback(chrome.runtime.lastError);
                    return;
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
            if (this.status == 401 && retry) {
                retry = false;
                chrome.identity.removeCachedAuthToken({ token: access_token }, getToken);
            } else {
                callback(null, this.status, this.response);
            }
        }
    }

    function getUserFriends(interactive) {
        if (!access_token) {
            xhrWithAuth('GET',
                        'https://www.googleapis.com/plus/v1/people/me/people/visible',
                        interactive,
                        onUserFriendsFetched);
        } else
            callback(null);
    }
    function onUserFriendsFetched(error, status, response) {
        if (!error && status == 200) {
            var user_info = JSON.parse(response);
            global.scopes.friends.friendsSearch.googleFriendsArray = [];
            for(var array in user_info.items) {
                // console.log(user_info.items[array]);
                global.scopes.friends.friendsSearch.googleFriendsArray.push(user_info.items[array]);
            }
        } else
            callback(null);
    }

    function interactiveSignIn() {
        chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
            if (!chrome.runtime.lastError) {
                getUserFriends(false);
            } else {
                console.log("OAuth error: " + chrome.runtime.lastError.message);
                callback(null);
            }
        });
    }
    interactiveSignIn();
};