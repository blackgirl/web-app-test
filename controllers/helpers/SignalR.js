var SignalRManager = function(signalRHubProxy) {
    var clientPushHubProxy = signalRHubProxy(
       signalRHubProxy.defaultServer, 'zwapcasthub',
       { logging: true });

    this.clientPushHubProxy = clientPushHubProxy;

    this.Requests = {
        acceptInvitation: function(userId) {
            clientPushHubProxy.invoke(['AcceptInvitation'], $.makeArray(arguments));
        },

        addFavorite: function(request) {
            clientPushHubProxy.invoke(['AddFavorite'], $.makeArray(arguments));
        },

        addFriendToMessageGroup: function(groupId, newParticipantUserId) {
            clientPushHubProxy.invoke(['AddFriendToMessageGroup'], $.makeArray(arguments));
        },

        changePassword: function(oldps, newps) {
            clientPushHubProxy.invoke(['ChangePassword'], $.makeArray(arguments));
        },

        continueSession: function(authToken) {
            clientPushHubProxy.invoke(['ContinueSession'], $.makeArray(arguments));
        },

        createMessageGroup: function(firstParticipantUserId) {
            clientPushHubProxy.invoke(['CreateMessageGroup'], $.makeArray(arguments));
        },

        deleteFavorite: function(request) {
            clientPushHubProxy.invoke(['DeleteFavorite'], $.makeArray(arguments));
        },

        inviteByEmail: function(email) {
            clientPushHubProxy.invoke(['InviteByEmail'], $.makeArray(arguments));
        },
        
        inviteByEmailEx: function(email) {
            clientPushHubProxy.invoke(['InviteByEmailEx'], $.makeArray(arguments));
        },

        inviteByUserId: function(userId) {
            clientPushHubProxy.invoke(['InviteByUserId'], $.makeArray(arguments));
        },

        inviteByUserIdEx: function(userId) {
            clientPushHubProxy.invoke(['InviteByUserIdEx'], $.makeArray(arguments));
        },

        leaveMessageGroup: function(groupId) {
            clientPushHubProxy.invoke(['LeaveMessageGroup'], $.makeArray(arguments));
        },

        deleteMessageGroup: function (groupId) {
            clientPushHubProxy.invoke(['DeleteMessageGroup'], $.makeArray(arguments));
        },

        passwordRecover: function(email) {
            clientPushHubProxy.invoke(['PasswordRecover'], $.makeArray(email));
        },

        postMessage: function(msg) {
            clientPushHubProxy.invoke(['PostMessage'], $.makeArray(arguments));
        },

        rejectInvitation: function(userId) {
            clientPushHubProxy.invoke(['RejectInvitation'], $.makeArray(arguments));
        },

        deleteMessage: function(messageId) {
            clientPushHubProxy.invoke(['DeleteMessage'], $.makeArray(arguments));
        },

        queryUserDateMessages: function(groupId, start, end) {
            clientPushHubProxy.invoke(['QueryUserDateMessages'], $.makeArray(arguments));
        },
        queryUserDateMessagesEx: function(groupId, start, end) {
            clientPushHubProxy.invoke(['QueryUserDateMessagesEx'], $.makeArray(arguments));
        },

        reset: function() {
            clientPushHubProxy.invoke(['Reset'], $.makeArray(arguments));
        },
        resetEx: function() {
            clientPushHubProxy.invoke(['ResetEx'], $.makeArray(arguments));
        },

        searchUsers: function(searchString) {
            clientPushHubProxy.invoke(['SearchUsers'], $.makeArray(arguments));
        },

        signIn: function(request) {
            clientPushHubProxy.invoke(['SignIn'], $.makeArray(request));
        },

        signInByPublicShare: function (publicShareReceiverId) {
            clientPushHubProxy.invoke(['SignInByPublicShare'], $.makeArray(publicShareReceiverId));
        },
        signInByInvitationEmail: function (publicShareReceiverId) {
            clientPushHubProxy.invoke(['SignInByInvitationEmail'], $.makeArray(publicShareReceiverId));
        },
        signInByWebAuth:function(token) {
            clientPushHubProxy.invoke(['SignInByWebAuth'], $.makeArray(token));
        },
        signOut: function() {
            clientPushHubProxy.invoke(['SignOut'], $.makeArray(arguments));
        },

        signUp: function(request) {
            clientPushHubProxy.invoke(['SignUp'], $.makeArray(request));
        },

        signUpFacebook: function (request) {
            GoogleAnalyticsManager.tracker.sendEvent('SignUpView', 'SignUpFacebook');

            clientPushHubProxy.invoke(['signUpFacebook'], $.makeArray(request));
        },

        signUpGooglePlus: function (request) {
            GoogleAnalyticsManager.tracker.sendEvent('SignUpView', 'SignUpGooglePlus');

            clientPushHubProxy.invoke(['signUpGooglePlus'], $.makeArray(request));
        },

        createMessageGroupMultipleUsers: function(participantUserIds, groupTitle) {
            clientPushHubProxy.invoke(['CreateMessageGroupMultipleUsers'], $.makeArray(arguments));
        },

        markGroupAsRead: function(groupId) {
            clientPushHubProxy.invoke(['MarkAllGroupMessagesAsRead'], $.makeArray(arguments));
        },

        markMessagesAsRead: function(messageIds) {
            clientPushHubProxy.invoke(['MarkMessagesAsRead'], $.makeArray(arguments));
        },

        updateMessageGroupTitle: function(groupId, newTitle) {
            clientPushHubProxy.invoke(['UpdateMessageGroupTitle'], $.makeArray(arguments));
        },

        updateProfile: function(request) {
            clientPushHubProxy.invoke(['UpdateProfile'], $.makeArray(request));
        },

        getFavIcons: function(favIconIds) {
            clientPushHubProxy.invoke(['GetFavIcons'], $.makeArray(favIconIds));
        },

        setup: function() {
            var clientCaps = {
                ClientType : "Chrome App",
                PlatformCode : "Chrome",
                UserAgent : navigator.userAgent
            };
            clientPushHubProxy.invoke(['SetupEx'], $.makeArray(clientCaps));
        },

        likeMessage: function(messageId) {
            clientPushHubProxy.invoke(['LikeMessage'], $.makeArray(arguments));
        },

        dislikeMessage: function(messageId) {
            clientPushHubProxy.invoke(['DislikeMessage'], $.makeArray(arguments));
        },

        postComment: function(comment) {
            clientPushHubProxy.invoke(['PostComment'], $.makeArray(arguments));
        },

        getMessageComments: function(messageId) {
            clientPushHubProxy.invoke(['GetMessageComments'], $.makeArray(arguments));
        },
        getMessageCommentsEx: function(messageId) {
            clientPushHubProxy.invoke(['GetMessageCommentsEx'], $.makeArray(arguments));
        },
        
        joinConference: function(conferenceId) {
            clientPushHubProxy.invoke(['JoinConference'], $.makeArray(arguments));
        },

        declineConference: function (conferenceId) {
            clientPushHubProxy.invoke(['DeclineInvitation'], $.makeArray(arguments));
        },
        
        postScreenSharingInvitation: function () {
            clientPushHubProxy.invoke(['postScreenSharingInvitation'], $.makeArray(arguments));
        },
        
        acceptVideoChatInvitation: function (invitationId) {
            clientPushHubProxy.invoke(['JoinConference'], $.makeArray(arguments));
        },

        leaveConference: function (conferenceId) {
            clientPushHubProxy.invoke(['LeaveConference'], $.makeArray(arguments));
        },

        jsepOffer: function (msg) {
            clientPushHubProxy.invoke(['jsepOffer'], $.makeArray(arguments));
        },

        jsepAnswer: function (msg) {
            clientPushHubProxy.invoke(['jsepAnswer'], $.makeArray(arguments));
        },

        jsepCandidate: function (msg) {
            clientPushHubProxy.invoke(['jsepCandidate'], $.makeArray(arguments));
        },

        inviteUserToConference: function(userId, conferenceId) {
            clientPushHubProxy.invoke(['InviteUserToConference'], $.makeArray(arguments));
        },

        pageOpen: function (url) {
            clientPushHubProxy.invoke(['TrackWebPageOpened'], $.makeArray(arguments));
        },

        pageClose: function (url) {
            clientPushHubProxy.invoke(['TrackWebPageClosed'], $.makeArray(arguments));
        },

        pageChange: function (oldUrl, newUrl) {
            clientPushHubProxy.invoke(['TrackWebPageChange'], $.makeArray(arguments));
        },

        deleteFriend: function (userId) {
            clientPushHubProxy.invoke(['RemoveFriends'], $.makeArray(arguments));
        },

        listIceServers: function () {
            clientPushHubProxy.invoke(['ListIceServers'], $.makeArray(arguments));
        }
    };

    this.bindServerCallback = function(methodName, callback) {
        clientPushHubProxy.on(methodName, function(response) {
            callback(response);
        });
    };
}