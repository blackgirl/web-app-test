$(function () {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '329440203897087',
            xfbml: true,
            version: 'v2.0'
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

});

facebookSignUp = function(callback) {
    var access_token = '';
    var user = {
        SocialAccountId: '',
        FirstName: '',
        LastName: '',
        UserPicImageUrl: '',
        OAuthToken: '',
        UserEmail: ''
    };

    function getUserInfo(user_id) {
        FB.api(
                "/" + user_id,
                function (response) {
                    if (response && !response.error) {
                        user.SocialAccountId = response.id;
                        user.FirstName = response.first_name;
                        user.LastName = response.last_name;
                        user.UserEmail = response.email;
                        callback(user);
                    } else {
                        callback(null);
                    }
                }
            );
    };

    FB.Event.subscribe('auth.authResponseChange', function (response) {
        if (response.status === 'connected') {
            user.OAuthToken = response.authResponse.accessToken;
            getUserInfo(response.authResponse.userID);

        } else {
            FB.login(function () { }, { scope: 'publish_actions,status_update' });
        }
    });

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            user.OAuthToken = response.authResponse.accessToken;
            getUserInfo(response.authResponse.userID);
        }
        else {
            FB.login(function () { }, { scope: 'publish_actions,public_profile ,status_update' });
        }
    });


}