// processes interactive G+ Sign Up
//  callback: function(userinfo) where userinfo is {SocialAccountId,FirstName, LastName, UserPicImageUrl, OAuthToken} or null if G+ authorisation failed or was cancelled 
// 
googlePlusSignUp = function (callback) {
    var STATE_START = 1;
    var STATE_ACQUIRING_AUTHTOKEN = 2;
    var STATE_AUTHTOKEN_ACQUIRED = 3;
    var state = STATE_START;
    //var signin_button = $('#signin');
    //var revoke_button = $('#revoke');
    var access_token = '';
    var user = {
        SocialAccountId: '',
        FirstName: '',
        LastName: '',
        UserPicImageUrl: '',
        OAuthToken: ''
    };

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

    function getUserInfo(interactive) {
        if (!access_token) {
            xhrWithAuth('GET',
                        'https://www.googleapis.com/plus/v1/people/me',
                        interactive,
                        onUserInfoFetched);
        } else
            callback(null);
    }
    // Code updating the user info.
    function onUserInfoFetched(error, status, response) {
        if (!error && status == 200) {
            var user_info = JSON.parse(response);
            // console.log(response);
            user.SocialAccountId = user_info.id;
            user.FirstName = user_info.name.givenName;
            user.LastName = user_info.name.familyName;
            user.UserPicImageUrl = user_info.image.url;
            user.OAuthToken = access_token;
            console.log(user_info);
            callback(user);
        }
        else
            callback(null);
    }
    // To force a new
    // token (for example when user changes the password on the service)
    // need to call removeCachedAuthToken()

    function interactiveSignIn() {
        chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
            if (!chrome.runtime.lastError) {
                getUserInfo(false);
            } else {
                console.log("OAuth error: " + chrome.runtime.lastError.message);
                callback(null);
            }
        });
    }

    interactiveSignIn();

    // function revokeToken() {
    //   chrome.identity.getAuthToken({ 'interactive': false },
    //     function(current_token) {
    //       if (!chrome.runtime.lastError) {
    //         // Remove the local cached token
    //         chrome.identity.removeCachedAuthToken({ token: current_token },function() {});
    //         // Make a request to revoke token in the server
    //         var xhr = new XMLHttpRequest();
    //         xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
    //                  current_token);
    //         xhr.send();
    //         // Update the user interface accordingly
    //         // changeState(STATE_START);
    //         // console.log('Token revoked and removed from cache. '+
    //         //   'Check chrome://identity-internals to confirm.');
    //       }
    //   });
    // }
    // revoke_button.onclick = revokeToken();

    // variant for onload get authorized User info
    // signin_button.onclick = interactiveSignIn();

    // Trying to get user's info without signing in, it will work if the
    // application was previously authorized by the user.
    // getUserInfo(false);
};

