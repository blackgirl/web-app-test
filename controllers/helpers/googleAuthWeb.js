(function () {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js?onload=onLoadCallback';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

googlePlusSignUp = function (callback) {
   
    var access_token = '';
    var user = {
        SocialAccountId: '',
        FirstName: '',
        LastName: '',
        UserPicImageUrl: '',
        OAuthToken: '',
        UserEmail: ''
    };
    var client_id = '992017558966-umk67vt82b6skuamu3mlvoe3s8ccgm9e.apps.googleusercontent.com';
    var scope = ['https://www.googleapis.com/auth/userinfo.profile'];
    
    gapi.auth.authorize({
        client_id: client_id,
        immediate: false,
        scope: scope ,
    }, function (response) {
        if (response.status.signed_in) {
            user.OAuthToken = response.access_token;
            gapi.client.load('plus', 'v1', function () {
                var request = gapi.client.plus.people.get({
                    'userId': 'me',
                    key: 'V4tGjbnCf-NR8mFxmo1IewLW'
                });
                request.execute(loadProfileCallback);
                function loadProfileCallback(profile) {
                    if (!profile.error) {
                        user.FirstName = profile.name.givenName;
                        user.LastName = profile.name.familyName;
                        user.SocialAccountId = profile.id;
                        if (profile.emails && profile.emails[0])
                            user.UserEmail = profile.emails[0].value;
                        callback(user);
                    } else {
                        callback(null);
                    }
                }
            });
        }
    });

};

