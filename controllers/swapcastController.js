function swapcastController($scope, signalRHubProxy,signalRServer) {
    $scope.signalRServer = signalRServer;

    $scope.areTabsLoaded = false;

    $scope.usersImages = {};

    $scope.iceServerInfo = [];

    $scope.needToJoinToConference = false;
    $scope.needToOpenVideoChat = false;
    $scope.messageForJoinRequest = null;

    $scope.storage = new StorageManager();


    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.openFromSuggest = function (url) {
        if ($('#browserGrid').is(':visible'))
            global.scopes.webBrowser.openFromSuggest(url);
        else
            $scope.$broadcast("onHandleUrlByEnter", url);
    }

    $scope.playSound = {
        incomingMessage: function() {
            var playElement = $('#playSoundElement');
            playElement.attr('src', 'sounds/message.wav');
            playElement.get(0).play();
        },
        outgoingMessage: function() {
            var playElement = $('#playSoundElement');
            playElement.attr('src', 'sounds/message_out.wav');
            playElement.get(0).play();
        },
        invitation: function() {
            var playElement = $('#invitationSoundElement');
            playElement.get(0).play();
        }
    };

    global = new Global();
    global.scopes.swapcast = angular.element($('body')).scope();
    global.scopes.auth = angular.element($('#authController')).scope();

    var slidespeed = 200;

    $scope.isLeftClosed = false;
    $scope.showSplitterButton = function () {
        return global.scopes.swapcast.unreadTotalCount() > 0;
    };

    $scope.setMessagesRead = function () {
        var selectedGroupId = $scope.messages.selectedGroup.GroupId;

        if (selectedGroupId == undefined || selectedGroupId == "NotSet") {
            selectedGroupId = -1;
        }

        if ($scope.swapSettings.Messages == null
            || typeof ($scope.swapSettings.Messages.GroupData) == 'undefined'
            || $scope.swapSettings.Messages.GroupData[selectedGroupId] == null) return false;

        $scope.safeApply(function () {
            $scope.swapSettings.Messages.GroupData[selectedGroupId].NotReadMessagesCount = 0;
            $scope.swapSettings.Messages.GroupData[selectedGroupId].FirstNotReadMessageDate = null;
        });

        $scope.Requests.markGroupAsRead(selectedGroupId);

        $scope.setUnreadTotal();
    };

    $scope.showFirstUnreadGroup = function (event) {
        if ($scope.unreadTotal == 0)
            return;
        else
            event.stopImmediatePropagation();

        if ($scope.swapSettings.Messages == null || $scope.swapSettings.Messages.length == 0) return false;

        GoogleAnalyticsManager.tracker.sendEvent('SplitterButton', 'ShowFirstUnreadGroup');

        var groups = $scope.swapSettings.Messages.GroupData;
        var firstUnreadGroupId = 0;
        var firstUnreadDate = new Date();

        firstUnreadDate.setDate(firstUnreadDate.getDate() + 1);

        for (var key in groups) {
            if (groups[key].FirstNotReadMessageDate != null && new Date(groups[key].FirstNotReadMessageDate) < firstUnreadDate) {
                firstUnreadGroupId = groups[key].GroupId;
                firstUnreadDate = new Date(groups[key].FirstNotReadMessageDate);
            }
        }

        if (firstUnreadGroupId != 0)
            $scope.showGroup(firstUnreadGroupId);
    };

    $scope.showGroup = function (id) {
        $scope.showChatPannel();

        global.scopes.messages.setSelectedGroup(id);

        if (id == -1) {
            $scope.Slide($scope.currentArea, '#block-main-feed');
        } else {
            $scope.Slide($scope.currentArea, '#block-my-secret-room');
        }
        
        $scope.setMessagesRead();
    };

    //$scope.swapSettings = swapSettings;
    $scope.unreadTotal = 0;

    $scope.$watch('swapSettings.EditingProfile.Userpic', function (base64Img) {
        if (typeof (base64Img) != 'undefined' && base64Img != global.scopes.swapcast.swapSettings.UserProfile.Userpic) {
            $scope.storage.get('authToken', function (obj) {
                var authToken = obj['authToken'];

                if (typeof authToken != 'undefined') {
                    $.ajax({
                        url: signalRServer + 'Image/SaveImage',
                        type: 'post',
                        data: {
                            authToken: authToken,
                            imageBase64: base64Img.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
                        },
                        success: function(newUserpicName) {
                            global.scopes.swapcast.swapSettings.EditingProfile.UserpicName = newUserpicName;
                        }
                    });
                }
            });
        }
    });

    $scope.$watch('swapSettings.Messages.GroupData', function () {
        if (global.scopes.messages == null) return false;
        global.scopes.messages.getMessages($scope.messages.selectedGroup.GroupId);
    });

    $scope.unreadTotalCount = function() {
        return $scope.unreadTotal + $scope.swapSettings.FriendshipRequests.length;
    }

    $scope.setUnreadTotal = function() {
        if (global.scopes.swapcast.swapSettings.Messages == null || global.scopes.swapcast.swapSettings.Messages.GroupData == null) return false;

        var unreadtotal = 0;

        var groups = global.scopes.swapcast.swapSettings.Messages.GroupData;

        for (var key in groups) {
            if ($.isNumeric(groups[key].NotReadMessagesCount)) unreadtotal += groups[key].NotReadMessagesCount;
        }

        $scope.safeApply(function() { $scope.unreadTotal = unreadtotal; });

        global.scopes.messages.safeApply(function () { global.scopes.messages.unreadTotal = unreadtotal; });
    };

    $scope.activeMainTab = 0;
    $scope.isInMainFeed = false;

    $scope.newMessagesArray = undefined;
    $scope.hasFriendshipRequestsTitle = function() {
        return $scope.swapSettings.FriendshipRequests != null && $scope.swapSettings.FriendshipRequests.length > 0;
    };

    $scope.currentArea = "#block-chat";
    $scope.prevArea = "#block-chat";
    $scope.setTopMenuButtonsAvailability = function (current, next) {
        switch (current) {
            case "#block-my-friends":
                $scope.$broadcast("onScopeVariableChanged", { propertyName: "isMyFriendsButtonDisabled", propertyValue: false });
                break;
                
            case "#block-add-friends":
                $scope.$broadcast("onScopeVariableChanged", { propertyName: "isAddFriendButtonDisabled", propertyValue: false });
                break;
        }

        switch (next) {
            case "#block-my-friends":
                $scope.$broadcast("onScopeVariableChanged", { propertyName: "isMyFriendsButtonDisabled", propertyValue: true });
                break;
                
            case "#block-add-friends":
                $scope.$broadcast("onScopeVariableChanged", { propertyName: "isAddFriendButtonDisabled", propertyValue: true });
                break;
        }
    };

    $scope.Slide = function (current, next) {
        if (current == null)
            current = $scope.currentArea;
        if (next == null)
            next = $scope.prevArea;

        
        //reset friend queue
        $scope.friendsQueue= [];

        $("#block-new-chat .invited-add-people-to-group").removeClass("invited-add-people-to-group").addClass("btn-invite-add-people-to-group");

        $(current + ',' + next).addClass('position-abs');

        var realCurrent = current, realNext = next;

        if ($(current).is(':visible')) {
            GoogleAnalyticsManager.tracker.sendEvent('Slide', current + ' -> ' + next);

            $(current).hide('slide', { direction: "right" }, slidespeed);

            $(next).show('slide', { direction: "left" }, slidespeed).promise().done(function () {
                $scope.scroll(next);
            });
        } else {
            GoogleAnalyticsManager.tracker.sendEvent('Slide', next + ' -> ' + current);

            realCurrent = next;
            realNext = current;

            $(current).show('slide', { direction: "right" }, slidespeed);
            $(next).hide('slide', { direction: "left" }, slidespeed);
        }

        if ($scope.prevArea != realNext &&  $scope.currentArea != currentArea)
            $scope.prevArea = $scope.currentArea;

        $scope.setTopMenuButtonsAvailability(realCurrent, realNext);

        $(current + ',' + next).removeClass('position-abs');

        var currentArea = realNext;

        if (realNext == "#block-my-secret-room" || realNext == "#block-main-feed") {
            currentArea = $scope.messages.selectedGroup.GroupId == "NotSet"
                ? "#block-chat"
                : (global.scopes.swapcast.isGroupChat() ? "#block-my-secret-room" : "#block-main-feed");
        }
        setTimeout(function() {
            $scope.safeApply(function () {

                $scope.currentArea = currentArea;
                global.scopes.friends.showDeleteFriends = false;
            });
        },0);

        // Reset friends filter state
        if (current == '#block-my-friends' || next == '#block-my-friends') {
            var scope = angular.element($('#input-filter-friends').get(0)).scope();

            scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;

                if (phase == '$apply' || phase == '$digest') {
                    if (fn && (typeof (fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            scope.safeApply(function () {
                scope.filterFriendsString = '';
            });
        }
    };

    $scope.CloseDropDownMenu = function () {
        console.log('HIDE DROP DOWN');
        $('#drop-down-menu').hide();
        $('#drop-down-menu').css({ 'top': 'auto', 'left': 'auto' });
    };

    $scope.showChatPannel = function () {
        //if (!global.scopes.swapcast.IsAuthorized()) return;

        var splitter = $('#splitter');

        if (splitter.hasClass("container-splitter-close")) {
            splitter.removeClass("container-splitter-close");
            splitter.addClass("container-splitter");

            $('#splitter').animate({ left: '459px' });
            $('#container-left').animate({ width: '459px' });
            $('#container-right').animate({ left: '459px' });

            $scope.isLeftClosed = false;
        }
    };

    $scope.hideChatPannel = function () {
        var splitter = $('#splitter');

        if (splitter.hasClass("container-splitter")) {
            global.scopes.swapcast.safeApply(function () { global.scopes.swapcast.isLeftClosed = true; });

            splitter.removeClass("container-splitter");
            splitter.addClass("container-splitter-close");

            $('#splitter').animate({ left: '0px' });
            $('#container-left').animate({ width: '0px' });
            $('#container-right').animate({ left: '0px' });
        }
    };
    $scope.showMyFavorites = function () {
        global.scopes.swapcast.CloseDropDownMenu();
        global.scopes.swapcast.Slide(null, "#block-my-favorites");
    };
    $scope.showMyHome = function () {
        global.scopes.swapcast.Slide(null, '#block-my-home');
    }
    
    $('.container-body').on('click', '#close-facebook-friends-frame', ShowHomePage);
    $('.container-body').on("click", '#splitter', function () {
        if (!$scope.EnsureAuthorized()) return;
        var splitter = $('#splitter');
        
        if (splitter.hasClass("container-splitter")) {
            AnimationManager.lock();

            GoogleAnalyticsManager.tracker.sendEvent('SplitterButton', 'Hide');

            global.scopes.swapcast.$apply(function() { global.scopes.swapcast.isLeftClosed = true; });

            splitter.removeClass("container-splitter");
            splitter.addClass("container-splitter-close");

            $('#splitter').animate({ left: '0px' });
            $('#container-right').animate({ left: '0px' });
            $('#container-left').animate({ width: '0px' }, { complete: AnimationManager.unlock });

            return;
        }

        if (splitter.hasClass("container-splitter-close")) {
            AnimationManager.lock();

            if (!global.scopes.swapcast.IsAuthorized()) return false;

            GoogleAnalyticsManager.tracker.sendEvent('SplitterButton', 'Show');

            //global.scopes.webBrowser.IsExistPlaceForT();
            global.scopes.swapcast.$apply(function () { global.scopes.swapcast.isLeftClosed = false; });
            splitter.removeClass("container-splitter-close");
            splitter.addClass("container-splitter");
            
            $('#splitter').animate({ left: '459px' });
            $('#container-left').animate({ width: '459px' });
            $('#container-right').animate({ left: '459px' }, { complete: AnimationManager.unlock });

            return;
        }
    })
        .on("click", '#main-feed-to-chat, #chat-to-main-feed', function () {
            if (!$scope.EnsureAuthorized()) return;
            if ($("#block-main-feed").is(':visible') == false) {
                //send ids of unread messages. 
                $scope.setMessagesRead();
                $scope.isInMainFeed = true;
                
                // Hide a smiles DDL for comments if a scrolling begins
                $('#block-main-feed > .scroll-block').off('scroll');

                $('#block-main-feed > .scroll-block').on('scroll', function () {
                    // Hide smiles DDL for comments
                    if ($('#smile-dropdown').is(':visible') && global.scopes.messages.needToAddSmileFromComment)
                        $('#smile-dropdown').hide();
                    if($('.comment-text-input').is(':visible')) {
                        $("#block-main-feed div.scroll-block").css({'bottom':'210px'});
                        $('.main-feed-chat-block').show();
                        $(".main-feed-chat-block").find('textarea').eq(0).blur();
                    }
                });
            } else {
                global.scopes.messages.setGroupToDayMessages();
                $scope.isInMainFeed = false;
            }

            $scope.Slide('#block-chat', '#block-main-feed');

        })
        .on("click", '#new-chat-to-chats, #chats-to-new-chat', function () {
            if (!$scope.EnsureAuthorized()) return;
            $scope.Slide('#block-new-chat', '#block-chat');
            //GoogleAnalyticsManager.tracker.sendAppView('NewChatView');
        })
        .on("click", '#my-secret-room-to-chats, #block-chat .to-secret-room', function () {
            if (!$scope.EnsureAuthorized()) return;
            if ($("#block-my-secret-room").is(':visible') == false) {
                //send ids of unread messages. 
                global.scopes.swapcast.setMessagesRead();
                $('.main-feed-chat-block textarea').val("");
            } else {
                global.scopes.messages.setGroupToDayMessages();
                global.scopes.swapcast.safeApply(function () { global.scopes.swapcast.messages.selectedGroup.GroupId = "NotSet"; });
                $('.my-secret-room-chat-block textarea').val("");
            }

            $scope.Slide('#block-chat', '#block-my-secret-room');
        })
        .on("click", "#add-friends-to-chats, #block-chat .chats-to-add-friends", function () {
            if (!$scope.EnsureAuthorized()) return;
            $scope.Slide('#block-chat', '#block-add-friends');
        })
        .on("click", "#friends-to-chats, #chats-to-friends", function () {
            if (!$scope.EnsureAuthorized()) return;
            $scope.Slide('#block-chat', '#block-my-friends');
        })
        .on("click", '#block-my-friends .friends-to-add-friends', function () {
            if (!$scope.EnsureAuthorized()) return;
            $scope.Slide('#block-my-friends', '#block-chat');
        })
        .on("click", "#my-profile-back", function () {
            if (!$scope.EnsureAuthorized()) return;
            $scope.Slide('#block-my-profile', '#block-chat');
        })
        .on("click", "#friends-profile-back", function () {
            if (!$scope.EnsureAuthorized()) return;
            $scope.Slide('#block-friend-profile', '#block-chat');
        })
        .on("click", "#my-favorites-back", function () {
            if (!$scope.EnsureAuthorized()) return;
            $scope.Slide('#block-my-favorites', '#block-chat');
        })
        .on("click", "#my-home-back", function () {
            if (!$scope.EnsureAuthorized()) return;
            $scope.Slide('#block-my-home', '#block-chat');
        })
        .on("mouseleave", '#drop-down-menu', function () {
            $scope.CloseDropDownMenu();
        })
      
        .on("click", '.circle-button-context-menu', function () {
            GoogleAnalyticsManager.tracker.sendAppView('LeftPanelDDL');

            var pOffset = $('#container-left').offset();
            var y = $(this).offset().top - pOffset.top + $(this).height() + 3;
            var x = $(this).offset().left - pOffset.left - $('#drop-down-menu').width() + $(this).width();

            $('#drop-down-menu').css({ 'top': 'auto', 'left': 'auto' });
            $('#drop-down-menu').offset({ top: y, left: x });
            $('#drop-down-menu').toggle();
        })
        .on("click", ".radius-button-back", function () {
            if (!$scope.EnsureAuthorized()) return;
            $scope.CloseDropDownMenu();
        });

    $('#drop-down-menu')
        .on("click", ".to-new-video-chat", function() {
            var current = $('.block:visible').first().attr('id');
            $scope.CloseDropDownMenu();

            global.scopes.swapcast.messages.selectedGroup.GroupId = 'NotSet';
            
            $scope.Slide('#' + current, '#block-new-chat');
        })
        .on("click", ".to-new-chat", function() {
            var current = $('.block:visible').first().attr('id');
            $scope.CloseDropDownMenu();

            global.scopes.swapcast.messages.selectedGroup.GroupId = 'NotSet';
            global.scopes.friends.MultipleGroup.GroupName = "";
            $scope.Slide('#' + current, '#block-new-chat');
        })
        .on("click", ".to-add-friends", function() {
            var current = $('.block:visible').first().attr('id');
            $scope.CloseDropDownMenu();

            global.scopes.swapcast.messages.selectedGroup.GroupId = 'NotSet';

            $scope.Slide('#' + current, '#block-add-friends');
        })
        .on("click", ".to-friends", function() {
            var current = $('.block:visible').first().attr('id');
            $scope.CloseDropDownMenu();

            global.scopes.swapcast.messages.selectedGroup.GroupId = 'NotSet';

            $scope.Slide('#' + current, '#block-my-friends');
        });

    $("#browserTabs").on("click", "li.favoriteTabs", function () {
        if (AnimationManager.isAnimationNow) return;

        if (!$(this).hasClass("activeTab")) {
            $("li.activeTab").removeClass("activeTab");
            $(this).addClass("activeTab");
        }

        if ($(this).hasClass("mainTab"))
            $scope.activeMainTab = $(this)[0].id;
    });


    // webview permission requests processing 
    $('#browser').on('permissionrequest', function (e) {
        //console.log('Webview permission requested' + e.originalEvent.permission);
        e.originalEvent.request.allow();
        //if (e.permission === 'geolocation') {

        //} else {
        //    console.log('Denied permission ' + e.permission + ' requested by webview');
        //    e.request.deny();
        //}
    });

    //Is Flag of response exists 
    $scope.IsFlagExists = function (value, flag) {
        return (value & flag) == value;
    };

    $scope.swapSettings = swapSettings;
    $scope.groupMembers = groupMembers;

    // Begin MessageGroups and Friend section
    $scope.getDateForOrder = function (group) { return global.scopes.messages.getDateForOrder(group); };

    $scope.MessageGroupsAndFriends = [];

    $scope.composeMessageGroupsAndFriendsChats = function () {
        $scope.MessageGroupsAndFriends = [];

        var existingFriends = [];

        var groups = angular.copy($scope.swapSettings.MessageGroups);

        // Sort by last message date. Last group you chatted with should be on top
        groups.sort(function(a, b) {
            var date1 = a.LastMessage == null ? 0 : new Date(a.LastMessage.DateSent).getTime();
            var date2 = b.LastMessage == null ? 0 : new Date(b.LastMessage.DateSent).getTime();

            if (date1 > date2) return -1;
            if (date1 < date2) return 1;

            return 0;
        });

        var currentUserId = $scope.swapSettings.UserProfile.UserId;

        for (var i in groups) {
            $scope.MessageGroupsAndFriends.push(groups[i]);

            if (groups[i].Participants.length == 2)
                existingFriends.push(groups[i].Participants.filter(function (x) { return x.UserId != currentUserId; })[0]);
        }

        var friends = $scope.swapSettings.Friends;
        
        for (var j in friends) {
            if (existingFriends.filter(function(x) { return x.UserId == j; }).length == 0) {
                $scope.MessageGroupsAndFriends.push(friends[j]);
            }
        }
    };
    
    // End section


    $scope.IsAuthorized = function () {
        return $scope.swapSettings.UserProfile != null && $scope.swapSettings.UserProfile.UserId != null;
    };

    $scope.EnsureAuthorized = function () {
        if (!$scope.IsAuthorized()) {
            global.scopes.auth.Functions.showSignUpDialog(true);
            return false;
        }
        return true;
    };

    $scope.messages = {
        selectedGroup: {
            GroupId: "NotSet"
        }
    };

    $scope.friendProfile = profile;

    $scope.hasUnreadMessages = function (groupId) {
        if ($scope.swapSettings.Messages == null || $scope.swapSettings.Messages.GroupData == null || $scope.swapSettings.Messages.GroupData[groupId] == null || $scope.swapSettings.Messages.GroupData[groupId].NotReadMessagesCount == 0) return false;
        return true;
    };

    $scope.isGroupChat = function() {
        return global.scopes.swapcast.messages.selectedGroup.GroupId != -1 && global.scopes.swapcast.messages.selectedGroup.GroupId != null && global.scopes.swapcast.messages.selectedGroup.GroupId != "NotSet";
    };

    $scope.isFriendsList = function() {
        return $scope.currentArea == "#block-my-friends";
    }

    $scope.friendsQueue = [];

    //Init 'Connection status'
    $scope.ConnectionStatus = {
        Status: "connecting...",
        Color: "connectionInProcess"
    };

    //Init shared Links
    //Init Show Alert Modal
    $scope.ShowAlertModal = {
        Message: ""
    };

    //Default link in browser
    $scope.openLinkInBrowser = null;

    //Invite to group
    $scope.inviteToGroup = function (id) {
        var friends = $scope.swapSettings.Friends;
        
        for (var i in friends)
            if (friends[i].UserId == id) {
                $scope.groupMembers.invited[$scope.groupMembers.invited.length] = friends[i];
                break;
            }

        var nonparticipants = $scope.groupMembers.nonparticipant;
        
        for (var j = 0; j < nonparticipants.length; j++) {
            if (nonparticipants[j].UserId == id) {
                nonparticipants.splice(j, 1);
                break;
            }
        }
    };

    //return back To Friends section
    $scope.returnToFriend = function (id) {
        var invited = $scope.groupMembers.invited;
        for (var i in invited) {
            if (invited[i].UserId == id) {
                $scope.groupMembers.nonparticipant[$scope.groupMembers.nonparticipant.length] = invited[i];
                $scope.groupMembers.invited.splice(i, 1);
                break;
            }
        }
    };

    //Add User to group
    $scope.addUserToGroup = function () {
        if ($scope.groupMembers.invited.length > 0) {
            var groupId = $scope.messages.selectedGroup.GroupId;

            var messageGroup;

            for (var j in $scope.swapSettings.MessageGroups) {
                if ($scope.swapSettings.MessageGroups[j].GroupId == groupId)
                    messageGroup = $scope.swapSettings.MessageGroups[j];
            }

            if (messageGroup == undefined) return;

            if (messageGroup.Participants.length == 2) {
                var userIds = [];

                for (var u in $scope.groupMembers.invited) {
                    userIds.push($scope.groupMembers.invited[u].UserId);
                }

                userIds.push(messageGroup.Participants[0].UserId);
                userIds.push(messageGroup.Participants[1].UserId);
                $scope.Requests.createMessageGroupMultipleUsers(userIds, "");

                $('#addUserToGroupModal').modal('hide');

                return;
            }

            for (var i = 0; i < $scope.groupMembers.invited.length; i++) {
                var newParticipantUserId = $scope.groupMembers.invited[i].UserId;
                $scope.Requests.addFriendToMessageGroup(groupId, newParticipantUserId);
            }
        }

        $('#addUserToGroupModal').modal('hide');
    };

    //Show 'Add User To Group' Modal
    $scope.showAddUserToGroupModal = function () {
        GoogleAnalyticsManager.tracker.sendAppView('AddUserToGroupModalView');

        $scope.CloseDropDownMenu();

        $scope.groupMembers.invited = new Array();
        $scope.groupMembers.participant = new Array($scope.swapSettings.UserProfile);
        $scope.groupMembers.nonparticipant = new Array();

        $scope.getParticipants();
       
        $('#addUserToGroupModal').modal('show');

        $(".friendsInGroup, .friendsWithNoGroup").each(function () { $(this).scrollTop(0); }); // Reset scroll bars
    };

    //Show 'Add User To Video Chat' Modal
    $scope.showAddUserToVideoChatModal = function () {
        GoogleAnalyticsManager.tracker.sendEvent('VideoChatView', 'AddUserToVideoChatModalView');

        $scope.groupMembers.invited = new Array();
        $scope.groupMembers.participant = new Array($scope.swapSettings.UserProfile);
        $scope.groupMembers.nonparticipant = new Array();

        $scope.getVideoChatParticipants();

        $('#addUserToVideoChatModal').modal('show');

        $(".friendsInGroup, .friendsWithNoGroup").each(function () { $(this).scrollTop(0); }); // Reset scroll bars
    };

    //Add User to video chat
    $scope.addUserToVideoChat = function () {
        if ($scope.groupMembers.invited.length > 0) {
            for (var i = 0; i < $scope.groupMembers.invited.length; i++) {
                var newParticipantUserId = $scope.groupMembers.invited[i].UserId;
                if (global.scopes.videoChat._videoChatOpened)
                    $scope.Requests.inviteUserToConference(newParticipantUserId, global.scopes.videoChat._videoChatConferenceId);
                if (global.scopes.videoChat._screenOpened)
                    $scope.Requests.inviteUserToConference(newParticipantUserId, global.scopes.videoChat._sharingConferenceId);
            }
        }

        $('#addUserToVideoChatModal').modal('hide');
    };

    $scope.getVideoChatParticipants = function () {
        var members = $scope.swapSettings.Friends;

        for (var member in members) {
            if (members[member].Status != 0) {

                if ($scope.isParticipant(members[member], global.scopes.videoChat._conferenceGroup))
                    $scope.groupMembers.participant[$scope.groupMembers.participant.length] = members[member];
                else
                    $scope.groupMembers.nonparticipant[$scope.groupMembers.nonparticipant.length] = members[member];
            }
        }
    };


    // Get Participants/Nonparticipants users
    $scope.getParticipants = function() {
        var members = $scope.swapSettings.Friends;

        for (var member in members) {
            if (members[member].Status != 0) {
                if ($scope.isParticipant(members[member], $scope.messages.selectedGroup.GroupId))
                    $scope.groupMembers.participant[$scope.groupMembers.participant.length] = members[member];
                else
                    $scope.groupMembers.nonparticipant[$scope.groupMembers.nonparticipant.length] = members[member];
            }
        }
    };

    // Is Participant user
    $scope.isParticipant = function (member, groupId) {
        var groups = $scope.swapSettings.MessageGroups;
        for (var i = 0; i < groups.length; i++)
            if (groups[i].GroupId == groupId)
                break;
        if (i < groups.length)
            for (var j = 0; j < groups[i].Participants.length; j++)
                if (groups[i].Participants[j].UserId == member.UserId && groups[i].Participants[j].IsCurrentlyInGroup)
                    return true;
        return false;
    };

    // Leave Group
    $scope.leaveGroup = function () {
        GoogleAnalyticsManager.tracker.sendEvent('GroupChatView', 'LeaveGroup');

        $scope.CloseDropDownMenu();

        $scope.Requests.leaveMessageGroup($scope.messages.selectedGroup.GroupId);

        $scope.Slide('#block-chat', '#block-my-secret-room');

        global.scopes.swapcast.messages.selectedGroup.GroupId = 'NotSet';
    };

    $scope.showDeleteGroupChatModal = function () {
        GoogleAnalyticsManager.tracker.sendAppView('DeleteGroupChatModalView');

        $scope.CloseDropDownMenu();

        $('#deleteGroupChatModal').modal('show');
		
		var currentGroup = $scope.swapSettings.MessageGroups.filter(function(group) { return group.GroupId == $scope.messages.selectedGroup.GroupId; })[0];
		var title = currentGroup.Title;
		
		if (title == null)
			title = currentGroup.Participants.reduce(function (prev, current, i) {
				return (i == 1 ? prev.FirstName + ' ' + prev.LastName : prev) + ', ' + current.FirstName + ' ' + current.LastName ;
			});
		
		$('#delete-group-chat-name').html('"' + title + '"?');
    };

    // Delete group chat
    $scope.deleteGroupChat = function () {
        GoogleAnalyticsManager.tracker.sendEvent('DeleteGroupChatModalView', 'DeleteGroupChat');

        // Leave conference if it is active
        if (global.scopes.videoChat._videoChatOpened) global.scopes.videoChat.closeVideoChat();
        if (global.scopes.videoChat._screenOpened) global.scopes.videoChat.closeScreenSharing();

        $('#deleteGroupChatModal').modal('hide');

        $scope.Requests.deleteMessageGroup($scope.messages.selectedGroup.GroupId);

        global.scopes.swapcast.messages.selectedGroup.GroupId = 'NotSet';

        $scope.Slide('#block-chat', '#block-my-secret-room');
    };

    // Get User's friend Info by name for videoChat icon
    $scope.getUserInfoByName = function (userName) {
        var userPic;
        
        var friends = global.scopes.swapcast.swapSettings.Friends;

        for (var friend in friends) {
            if (userName === friends[friend].FirstName + " " + (friends[friend].LastName == null ? "" : friends[friend].LastName)) {
                userPic = global.scopes.swapcast.getFriendInfo(friends[friend]).UserPic;
            }
        }

        return {
            UserPic: userPic
        };
    };

    $scope.getInvitationText = function(msg) {
        if (msg.ConferenceInfo != null && global.scopes.messages.isConnectionAllowed(msg))
            return " wants to " + (msg.ConferenceInfo.Type == 0 ? "video chat" : "screen share");
    };

    $scope.getUserInfoByIdForMessage = function(id, isEditingProfile) {
        var userInfo = $scope.getUserInfoById(id, isEditingProfile);

        if (id == global.scopes.swapcast.swapSettings.UserProfile.UserId)
            userInfo.UserName = "Me";

        return userInfo;
    };

    //Get User Info by ID
    $scope.getUserInfoById = function (id, isEditingProfile) {
        if (global == null) return {};

        var userName = '';
        var userPic;
        var profile;
        var statusClass = "bgc-offline";

        if (isEditingProfile) {
            profile = global.scopes.swapcast.swapSettings.EditingProfile == null ? {} : global.scopes.swapcast.swapSettings.EditingProfile;
        } else {
            profile = global.scopes.swapcast.swapSettings.UserProfile == null ? {} : global.scopes.swapcast.swapSettings.UserProfile;
        }

        if (id === profile.UserId) {
            var user = profile;
            userName = user.FirstName + " " + (user.LastName == null ? "" : user.LastName);
            userPic = user.Userpic;
            statusClass = "bgc-online";
        } else {
            var friend = $scope.swapSettings.Friends[id];

            if (friend != null) {
                userName = friend.FirstName + " " + (friend.LastName == null ? "" : friend.LastName);

                if (friend.FirstName == null) {
                    userName = friend.Email;
                }

                if (friend.Status == 1) {
                    statusClass = "bgc-online";
                }

                userPic = friend.Userpic;
            } else {
                // Find participant in message groups
                if (global.scopes.swapcast.swapSettings.MessageGroups != null) {
                    for (var i = 0; i < global.scopes.swapcast.swapSettings.MessageGroups.length; i++) {
                        var users = global.scopes.swapcast.swapSettings.MessageGroups[i]
                            .Participants.filter(function(u) { return u.UserId == id; });

                        if (users.length > 0)
                            userName = (users[0].FirstName == null ? '' : users[0].FirstName + ' ')
                                + (users[0].LastName == null ? '' : users[0].LastName);
                    };
                }

                userPic = null;
            }
        }

        if (typeof (userPic) != "undefined" && userPic !== null) {
            userPic = userPic;
        } else {
            userPic = "img/userpic_default.png";
        }

        return {
            UserName: userName,
            UserPic: userPic,
            StatusClass: statusClass
        };
    };

    $scope.getUserImage = function (userId) {
        if (typeof ($scope.usersImages[userId]) == 'undefined') $scope.usersImages[userId] = 'img/userpic_default.png';

        return $scope.usersImages[userId];
    };

    $scope.getChatUserpic = function (groupId) {
        var group = global.scopes.swapcast.swapSettings.MessageGroups.filter(function (x) { return x.GroupId == groupId; })[0];
        
        var myUserId = global.scopes.swapcast.swapSettings.UserProfile.UserId;

        var participants = group.Participants.filter(function(x) { return x.UserId != myUserId; });

        if (participants.length == 0) return 'img/userpic_default.png';

        var friendId = participants[0].UserId;

        return $scope.usersImages[friendId];
    };
    
    //Get Friend Info
    $scope.getFriendInfo = function(friend) {
        var userPic;
        var userName;
        var status = "Offline";
        var statusClass = "bgc-offline";

        if (friend.FirstName == null) {
            userName = friend.Email;
        } else {
            userName = (friend.FirstName == null ? '' : friend.FirstName + ' ') + (friend.LastName == null ? '' : friend.LastName);
        }

        if (friend.Userpic == null) {
            userPic = "img/userpic_default.png";
        } else {
            userPic = friend.Userpic;
        }

        if (friend.Status == 1) {
            status = "Online";
            statusClass = "bgc-online";
        }

        return {
            UserName: userName,
            UserPic: userPic,
            Status: status,
            StatusClass: statusClass
        };
    };

    $scope.getFeaturedImage = function (featured) {
        if (global.scopes.messages.images[featured.ThumbnailUrl] == undefined)

            $scope.downloadImage(featured.ThumbnailUrl);
        return global.scopes.messages.images[featured.ThumbnailUrl];
    };

    $scope.getFaviconUrl = function (favIconId) {
        if (favIconId != null) {
            var favIconData = $scope.swapSettings.FavIcons[favIconId];
            if (favIconData != null) {
                if (favIconData.ThumbnailUrl == null) {
                    if (favIconData.ImageData != null) {
                        return "data:image/png;base64," + favIconData.ImageData;
                    }
                } else {
                    if (global.scopes.messages.images[favIconData.ThumbnailUrl] == undefined)
                        $scope.downloadImage(favIconData.ThumbnailUrl);
                    return global.scopes.messages.images[favIconData.ThumbnailUrl];
                }
            } else {
                $scope.Requests.getFavIcons([favIconId]);
            }
        }
        return "css/img/youtube_link.png";
    };
    $scope.thumbnailImageUrl = function(featured) {
        return signalRServer + "Image/Thumbnail/" + featured.Id;
    };
    $scope.downloadImage = function(url) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200 && this.response != undefined) {
                //this.response is what you're looking for
                var urlObj = window.URL || window.webkitURL;
                global.scopes.messages.images[url] = urlObj.createObjectURL(this.response);
            }
        }
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    // Start "Init UI elements"
    $("#alertModal").modal({
        show: false
    });

    $("#inviteFriendsModal").modal({
        show: false
    });

    $("#addFriendsToGroupModal").modal({
        show: false
    });

    $("#AddFavoriteModal").modal({
        show: false
    });

    $("#shareItModal").modal({
        show: false
    });

    $("#shareScreenModal").modal({
        show: false
    });
    // End "Init UI elements"

    //Start - Initialize SignaR connection
    var signalRManager = new SignalRManager(signalRHubProxy);

    $scope.signalRManager = signalRManager;

    //End - Initialize SignaR connection
    $scope.Functions = {
        //Show Alert
        showAlert: function (message) {
            $scope.safeApply(function () { $scope.ShowAlertModal.Message = message; });
            $("#alertModal").modal("show");
        },
    };

    //Scroll Messages
    $scope.scroll = function (area) {
        var el = $(area).find('.scrollable:first');

        $(el).scrollTop($(el).find('.list-messages:first').height());

        $(area).off('click', " .li-link-share .conference-link a");
        $(area).on("click", " .li-link-share .conference-link a", changeBrowserLink);

        $(area).off('click', "a.chat-link");
        $(area).on('click', "a.chat-link", changeBrowserLink);

        $(area).off('click', "a.file-link");
        $(area).on('click', "a.file-link", changeBrowserLink);
    };

    $scope.openUrlOrGoogleSearchFromHome = function () {
        GoogleAnalyticsManager.tracker.sendEvent('HomeSectionView', 'OpenUrlOrGoogleSearch');

        $scope.$broadcast("onHandleUrlByEnter", $('#input-home-search').val());
    };

    $scope.openUrlOrGoogleSearchFromFav = function () {
        GoogleAnalyticsManager.tracker.sendEvent('FavoritesSectionView', 'OpenUrlOrGoogleSearch');

        $scope.$broadcast("onHandleUrlByEnter", $('#input-favorites-search').val());
    };

    $scope.showHomeDDL = function ($event) {
        Utils.hideAllDropDownLists();
        $("#myHomeGrid  #div-browser-drop-down-menu").show();

        $event.stopImmediatePropagation();

        $("*").off("click", $scope.hideHomeDDL);
        $("*").not("#myHomeGrid  #div-browser-menu-button,#myHomeGrid  #div-browser-drop-down-menu,#myHomeGrid  #div-browser-drop-down-menu div").on("click", $scope.hideHomeDDL);
    };

    // Show New Chat panel
    $scope.showNewChatPanelFromHome = function () {
        var current = $('.block:visible').first().attr('id');

        $scope.hideHomeDDL();
        $("*").off("click", $scope.hideHomeDDL);

        $scope.Slide('#' + current, '#block-new-chat');
    };

    // Start video chat
    $scope.startVideoChatFromHome = function () {
        // If video chat is not opened and the group chat is opened
        if (!global.scopes.webBrowser.Functions.videoChatOpened() && $('.block:visible').first().attr('id') == "block-my-secret-room") {


            global.scopes.swapcast.messages.tempGroupId = global.scopes.swapcast.messages.selectedGroup.GroupId;

            global.scopes.webBrowser.Functions.startVideoChat();
        }
    };

    // Start screen share
    $scope.startScreenShareFromHome = function () {
        // If screen share is not opened and the group chat is opened
        if (!global.scopes.webBrowser.Functions.screenSharingOpened() && $('.block:visible').first().attr('id') == "block-my-secret-room") {
            $scope.hideHomeDDL();
            $("*").off("click", $scope.hideHomeDDL);

            global.scopes.swapcast.messages.tempGroupId = global.scopes.swapcast.messages.selectedGroup.GroupId;

            global.scopes.webBrowser.tryToStartScreenSharing();
        }
    };

    $scope.sendScreenCaptureFromHome = function () {
        FileSendManager.sendScreenCapture();
    };


    $scope.hideHomeDDL = function () {
        if ($("#myHomeGrid #div-browser-drop-down-menu:visible").length > 0) {
            $("#myHomeGrid #div-browser-drop-down-menu").hide();
            $("*").off("click", $scope.hideHomeDDL);
        }
    };


    $scope.showFavDDL = function ($event) {
        Utils.hideAllDropDownLists();
        $("#myFavoriteGrid  #div-browser-drop-down-menu").show();

        $event.stopImmediatePropagation();

        $("*").off("click", $scope.hideFavDDL);
        $("*").not("#myFavoriteGrid  #div-browser-menu-button,#myFavoriteGrid  #div-browser-drop-down-menu,#myFavoriteGrid  #div-browser-drop-down-menu div").on("click", $scope.hideFavDDL);
    };



    // Show New Chat panel
    $scope.showNewChatPanelFromFav = function () {
        var current = $('.block:visible').first().attr('id');

        $scope.hideFavDDL();

        $("*").off("click", $scope.hideFavDDL);

        $scope.Slide('#' + current, '#block-new-chat');
    };

    // Start video chat
    $scope.startVideoChatFromFav = function () {
        // If video chat is not opened and the group chat is opened
        if (!global.scopes.webBrowser.Functions.videoChatOpened() && $('.block:visible').first().attr('id') == "block-my-secret-room") {


            global.scopes.swapcast.messages.tempGroupId = global.scopes.swapcast.messages.selectedGroup.GroupId;

            global.scopes.webBrowser.Functions.startVideoChat();
        }
    };

    // Start screen share
    $scope.startScreenShareFromFav = function () {
        // If screen share is not opened and the group chat is opened
        if (!global.scopes.webBrowser.Functions.screenSharingOpened() && $('.block:visible').first().attr('id') == "block-my-secret-room") {
            $scope.hideFavDDL();
            $("*").off("click", $scope.hideFavDDL);

            global.scopes.swapcast.messages.tempGroupId = global.scopes.swapcast.messages.selectedGroup.GroupId;

            global.scopes.webBrowser.tryToStartScreenSharing();
        }
    };

    $scope.sendScreenCaptureFromFav = function () {
        FileSendManager.sendScreenCapture();
    };


    $scope.hideFavDDL = function () {
        if ($("#myFavoriteGrid #div-browser-drop-down-menu:visible").length > 0) {
            $("#myFavoriteGrid #div-browser-drop-down-menu").hide();
            $("*").off("click", $scope.hideFavDDL);
        }
    };


    $scope.minimize = function () {
        $scope.fillParticipantsAvatars();

        $("#div-minimize-wrapper").animate({ top: SystemMessageManager.isOpened ? '53px' : '15px' });
        $(".container-body").animate({ top: SystemMessageManager.isOpened ? '149px' : '111px' });
        //$(".container-body").animate({ top: SystemMessageManager.isOpened ? '208px' : '170px' });
        //$("#topBar").animate({ top: SystemMessageManager.isOpened ? '149px' : '111px' });

        $(".addchat-wrap").css({ "z-index": 1 });
        $(".addchat-wrap").animate({ "margin-top": "15px" });

        $('#div-participants-avatars').css({ top: SystemMessageManager.isOpened ? '43px' : '5px' });
        $("#div-participants-avatars").fadeIn();

        $("#div-minimize").hide();
        $("#div-maximize").show();

        StreamManager.correctVideosSizes();
    };

    $scope.maximize = function () {
        $("#div-participants-avatars").fadeOut();

        $("#div-minimize-wrapper").animate({ top: SystemMessageManager.isOpened ? '248px' : '210px' });
        $(".container-body").animate({ top: SystemMessageManager.isOpened ? '383px' : '345px' });
        //$("#topBar").animate({ top: SystemMessageManager.isOpened ? '324px' : '286px' });
        
        $(".addchat-wrap").css({ "z-index": 0 });
        $(".addchat-wrap").animate({ "margin-top": "210px" });
        
        $("#div-maximize").hide();
        $("#div-minimize").show();

        StreamManager.correctVideosSizes();
    };

    $scope.fillParticipantsAvatars = function () {
        $("#div-participants-avatars > div").empty();

        if (IceLinkWebRtcVideoChat.conferenceInfo == undefined || IceLinkWebRtcVideoChat.conferenceInfo.Peers == null) return;

        var peers = angular.copy(IceLinkWebRtcVideoChat.conferenceInfo.Peers);
        
        var currentUserId = global.scopes.swapcast.swapSettings.UserProfile.UserId;

        var currentUser = $scope.getUserInfoById(currentUserId, false);

        if ($("#avatar" + currentUserId).length == 0) {
            HtmlUtils.addParticipantsAvatar(currentUserId, currentUser.UserPic, currentUser.UserName);
        }

        $.each(peers.filter(function (pr) { return pr.ConnectionId != global.scopes.swapcast.PeerConnectionId; }), function (h, peer) {
            var user = $scope.getUserInfoById(peer.UserId, false);

            if ($("#avatar" + peer.UserId).length == 0)
                HtmlUtils.addParticipantsAvatar(peer.UserId, user.UserPic, user.UserName);
        });
    };

    $scope.waitingInvitations = [];
    $scope.invitationSoundTimer = null;

    $scope.removeInvitationSound = function(messageId) {
        if ($scope.waitingInvitations.filter(function (x) { return x == messageId; }).length == 0) return;

        for (var i=0; i < $scope.waitingInvitations.length; i++) {
            if ($scope.waitingInvitations[i] == messageId) {
                $scope.waitingInvitations.splice(i, 1);
            }
        }

        if ($scope.waitingInvitations.length == 0) {
            var playElement = $('#invitationSoundElement').get(0);
            playElement.pause();
            playElement.currentTime = 0;

            clearInterval(global.scopes.swapcast.invitationSoundTimer);
            global.scopes.swapcast.invitationSoundTimer = null;
        }
    }

    $scope.playInvitationSound = function(messageId) {
        $scope.waitingInvitations.push(messageId);

        if (global.scopes.swapcast.invitationSoundTimer == null) {
            $scope.playSound.invitation();
            global.scopes.swapcast.invitationSoundTimer = setInterval(function () { $scope.playSound.invitation(); }, 6000);
        }
        
        // Stop playing incoming call sound after few seconds if recipient did not take the call
        setTimeout(function () {
            global.scopes.swapcast.removeInvitationSound(messageId);
        }, 60000);
    }

    //Start - Initialize Server requests
    $scope.Requests = {
        acceptInvitation: function (userId) {
            signalRManager.Requests.acceptInvitation(userId);
        },

        addFavorite: function (request) {
            signalRManager.Requests.addFavorite(request);
        },

        addFriendToMessageGroup: function (groupId, newParticipantUserId) {
            signalRManager.Requests.addFriendToMessageGroup(groupId, newParticipantUserId);
        },

        changePassword: function (oldps, newps) {
            signalRManager.Requests.changePassword(oldps, newps);
        },

        continueSession: function (authToken) {
            signalRManager.Requests.continueSession(authToken);
        },

        createMessageGroup: function (firstParticipantUserId) {
            signalRManager.Requests.createMessageGroup(firstParticipantUserId);
        },

        deleteFavorite: function (request) {
            signalRManager.Requests.deleteFavorite(request);
        },

        inviteByEmail: function (email) {
            signalRManager.Requests.inviteByEmail(email);
        },

        inviteByEmailEx: function (email, message) {
            signalRManager.Requests.inviteByEmailEx(email, message);
        },

        inviteByUserId: function (userId) {
            signalRManager.Requests.inviteByUserId(userId);
        },
         inviteByUserIdEx: function (userId, message) {
            signalRManager.Requests.inviteByUserIdEx(userId, message);
        },

        leaveMessageGroup: function (groupId) {
            signalRManager.Requests.leaveMessageGroup(groupId);
        },

        deleteMessageGroup: function (groupId) {
            signalRManager.Requests.deleteMessageGroup(groupId);
        },

        passwordRecover: function (email) {
            signalRManager.Requests.passwordRecover(email);
        },

        postMessage: function (msg) {
            global.scopes.messages.showPostedMessage(msg);

            signalRManager.Requests.postMessage(msg);
        },

        rejectInvitation: function (userId) {
            signalRManager.Requests.rejectInvitation(userId);
        },

        deleteMessage: function (messageId) {
            signalRManager.Requests.deleteMessage(messageId);
        },

        queryUserDateMessages: function (groupId, start, end) {
            // reset current messages  #reset
            signalRManager.Requests.queryUserDateMessagesEx(groupId, start, end);
        },

        queryUserDateMessagesEx: function (groupId, start, end) {
            signalRManager.Requests.queryUserDateMessagesEx(groupId, start, end);
        },

        reset: function () {
            $scope.initialResetProcessing = true;
            
            signalRManager.Requests.resetEx(511);
        },

        resetEx: function (flags) {
            if (flags == 511) $scope.initialResetProcessing = true;

            signalRManager.Requests.resetEx(flags);
        },

        searchUsers: function (searchString) {
            signalRManager.Requests.searchUsers(searchString);
        },

        signIn: function (request) {
            signalRManager.Requests.signIn(request);
        },
        signInByPublicShare: function (publicShareReceiverId) {
            signalRManager.Requests.signInByPublicShare(publicShareReceiverId);
        },
        signInByInvitationEmail: function (publicShareReceiverId) {
            signalRManager.Requests.signInByInvitationEmail(publicShareReceiverId);
        },

        signOut: function () {
            ShowHomePage();
            signalRManager.Requests.signOut();
        },
        signUp: function (request) {
            signalRManager.Requests.signUp(request);
        },

        signUpFacebook : function(request) {
            signalRManager.Requests.signUpFacebook(request);
        },
        signUpGooglePlus: function(request) {
            signalRManager.Requests.signUpGooglePlus(request);
        },

        createMessageGroupMultipleUsers: function (participantUserIds, groupTitle) {
            signalRManager.Requests.createMessageGroupMultipleUsers(participantUserIds, groupTitle);
        },

        markGroupAsRead: function(groupId) {
            signalRManager.Requests.markGroupAsRead(groupId);
        },

        markMessagesAsRead: function (messageIds) {
            signalRManager.Requests.markMessagesAsRead(messageIds);
        },

        updateMessageGroupTitle: function (groupId, newTitle) {
            signalRManager.Requests.updateMessageGroupTitle(groupId, newTitle);
        },

        updateProfile: function (request) {
            signalRManager.Requests.updateProfile(request);
        },

        getFavIcons: function (favIconIds) {
            signalRManager.Requests.getFavIcons(favIconIds);
        },
        
        setup: function() {
            signalRManager.Requests.setup();
        },
        
        likeMessage: function(messageId) {
            signalRManager.Requests.likeMessage(messageId);
        },
        
        dislikeMessage: function(messageId) {
            signalRManager.Requests.dislikeMessage(messageId);
        },
        
        postComment: function(comment) {
            signalRManager.Requests.postComment(comment);
        },
        
        getMessageComments: function(messageId) {
            signalRManager.Requests.getMessageCommentsEx(messageId);
        },

        getMessageCommentsEx: function(messageId) {
            signalRManager.Requests.getMessageCommentsEx(messageId);
        },
        
        joinConference: function(conferenceId) {
            signalRManager.Requests.joinConference(conferenceId);
        },
        
        declineConference: function (conferenceId) {
            signalRManager.Requests.declineConference(conferenceId);
        },

        postScreenSharingInvitation: function () {
            signalRManager.Requests.postScreenSharingInvitation();
        },
        
        acceptVideoChatInvitation: function (invitationId) {
            signalRManager.Requests.acceptVideoChatInvitation(invitationId);
        },

        leaveConference: function (conferenceId) {
            signalRManager.Requests.leaveConference(conferenceId);
        },

        jsepOffer: function (msg) {
            signalRManager.Requests.jsepOffer(msg);
        },

        jsepAnswer: function (msg) {
            signalRManager.Requests.jsepAnswer(msg);
        },

        jsepCandidate: function (msg) {
            signalRManager.Requests.jsepCandidate(msg);
        },

        inviteUserToConference: function(userId, conferenceId) {
            signalRManager.Requests.inviteUserToConference(userId, conferenceId);
        },

        pageOpen: function (url) {
            signalRManager.Requests.pageOpen(url);
        },

        pageClose: function (url) {
            signalRManager.Requests.pageClose(url);
        },

        pageChange: function (oldUrl, newUrl) {
            signalRManager.Requests.pageChange(oldUrl, newUrl);
        },

        deleteFriend: function(userId) {
            signalRManager.Requests.deleteFriend([userId]);
        },

        listIceServers: function () {
            signalRManager.Requests.listIceServers();
        }
    };
    //End - Initialize Server requests
    
    signalRManager.bindServerCallback('onFriendProfileUpdated', function (response) {
        for (var i in $scope.swapSettings.Friends) {
            if ($scope.swapSettings.Friends[i].UserId == response.UserId) {                
                $scope.safeApply(function() {
                    $scope.swapSettings.Friends[i].City = response.City;
                    $scope.swapSettings.Friends[i].Country = response.Country;
                    $scope.swapSettings.Friends[i].Email = response.Email;
                    $scope.swapSettings.Friends[i].FirstName = response.FirstName;
                    $scope.swapSettings.Friends[i].LastName = response.LastName;
                    $scope.swapSettings.Friends[i].UserpicName = response.UserpicName;

                    global.scopes.swapcast.swapSettings.MessageGroups = angular.copy(global.scopes.swapcast.swapSettings.MessageGroups);
                });

                if (response.UserpicName != null && typeof (global.scopes.messages.images[response.UserpicName]) == 'undefined') {
                    global.scopes.messages.images[response.UserpicName] = null; // mark image as null to prevent second downloading request

                    // Download image from the server
                    ImageDownloadManager.getBase64Image(response.UserpicName, true, function(img) {
                        var swapcastScope = angular.element($('body')).scope();

                        swapcastScope.$apply(function() {
                            swapcastScope.swapSettings.Friends[response.UserId].Userpic = 'data:image/png;base64,' + img;

                            // Update friend image
                            swapcastScope.usersImages[response.UserId] = 'data:image/png;base64,' + img;

                            // Update friend profile page if needed
                            if (swapcastScope.friendProfile.UserId == response.UserId)
                                swapcastScope.friendProfile.Userpic = 'data:image/png;base64,' + img;

                            // Update video chat avatar
                            $('[rel="' + response.UserId + '"] img, [data-rel="' + response.UserId + '"] img').attr('src', 'data:image/png;base64,' + img);
                        });
                    });
                } else {
                    $scope.safeApply(function() {
                        $scope.swapSettings.Friends[i].Userpic = response.UserpicName == null ? 'img/userpic_default.png' : global.scopes.messages.images[response.UserpicName];

                        // Update friend image
                        $scope.usersImages[response.UserId] = response.UserpicName == null ? 'img/userpic_default.png' : global.scopes.messages.images[response.UserpicName];

                        // Update friend profile page if needed
                        if ($scope.friendProfile.UserId == response.UserId)
                            $scope.friendProfile.Userpic = response.UserpicName == null ? 'img/userpic_default.png' : global.scopes.messages.images[response.UserpicName];
                    });

                    // Update video chat avatar
                    $('[rel="' + response.UserId + '"] img, [data-rel="' + response.UserId + '"] img')
                        .attr('src', response.UserpicName == null ? 'img/userpic_default.png' : 'data:image/png;base64,' + global.scopes.messages.images[response.UserpicName]);
                }
            }
        }
    });

    //Start - Initialize Event Handlers
    signalRManager.bindServerCallback('onAuthorized', function (response) {
        // If session is not exists at the server
        if (response.Session != null) {
            global.scopes.swapcast.logInUserName = 'Welcome back, ' + response.Session.UserFullName;

            var authToken = response.Session.AuthToken;

            $scope.swapSettings.authToken = authToken;
            $scope.storage.set({ authToken: authToken });
            
            if (response.IsAuthorized) {
                $scope.Requests.listIceServers();
                $scope.Requests.setup();
                $scope.Requests.reset();

                $("#signInModal").modal("hide");
            } else {
                global.scopes.messages.Functions.showSignInError();
            }
        }
    });

    signalRManager.bindServerCallback('onSetup', function (response) {
        var defaultTabs = [];

        for (var t in response.DefaultTabs) {
            var tab = response.DefaultTabs[t];
            defaultTabs.push({
                Id: tab.Url,
                Title: tab.Title,
                Link: tab.Url,
                Class: "mainTab favoriteTabs",
                IsNewTab: false
            });
        }
        
        // Save initial tabs
        angular.copy(defaultTabs, global.scopes.webBrowser.InitialTabs);

        global.scopes.webBrowser.TabsOfUser.DefaultTabs = defaultTabs;

        setTimeout(function() { $(".favoriteTabs").addClass("width9percent"); }, 100);
    });

    signalRManager.bindServerCallback('onAuthorizationRequired', function () {
        global.scopes.auth.Functions.continueSession();
    });

    signalRManager.bindServerCallback('onMessageCommentArrived', function (response) {
        var group = global.scopes.swapcast.swapSettings.Messages.GroupData[-1];
        
        for (var i = 0; i < group.DateInfo.length; i++) {
            for (var j = 0; j < group.DateInfo[i].Messages.length; j++) {
                if (group.DateInfo[i].Messages[j].MessageId == response.MessageId) {
                    if (group.DateInfo[i].Messages[j].Comments == null) {
                        group.DateInfo[i].Messages[j].Comments = [];
                    }

                    var commentFound = false;

                    for (var k = 0; k < group.DateInfo[i].Messages[j].Comments.length; k++) {
                        if (group.DateInfo[i].Messages[j].Comments[k].CommentClientId == response.CommentClientId) {
                            commentFound = true;

                            global.scopes.messages.safeApply(function() { group.DateInfo[i].Messages[j].Comments[k] = response; });
                        }
                    }

                    if (!commentFound) {
                    global.scopes.messages.safeApply(function() {
                        group.DateInfo[i].Messages[j].Comments[group.DateInfo[i].Messages[j].Comments.length] = response;
                        group.DateInfo[i].Messages[j].CommentsCount++;
                    });
                    }

                    return;
                }
            }
        }
    });

    signalRManager.bindServerCallback('onMessageQueryResult', function (response) {
        var selectedGroupId = $scope.messages.selectedGroup.GroupId;
        
        var groupData = response.GroupData[selectedGroupId];
        
        if (groupData == null) groupData = { DateInfo: [] };

        if (typeof ($scope.swapSettings.Messages.GroupData[selectedGroupId]) == "undefined") $scope.swapSettings.Messages.GroupData[selectedGroupId] = {};

        $scope.swapSettings.Messages.GroupData[selectedGroupId].DateInfo = groupData.DateInfo == null ? [] : groupData.DateInfo;

        global.scopes.messages.getMessages($scope.messages.selectedGroup.GroupId, true);
    });
    
    signalRManager.bindServerCallback('onMessageQueryResultChunk', function (response) {
        console.log('onMessageQueryResultChunk');
        console.log(response);

        var batchInfo = ChunkResponsesManager.consumeMessageQueryResultResponse(response);

        if (batchInfo.BatchCompleted || batchInfo.IsFirst) {
            // make sure the settings structure
            if (typeof ($scope.swapSettings.Messages.GroupData) == "undefined") $scope.swapSettings.Messages.GroupData = {};
            if (typeof ($scope.swapSettings.Messages.GroupData[selectedGroupId]) == "undefined") $scope.swapSettings.Messages.GroupData[selectedGroupId] = {};

            // apply the batch results 
            ChunkResponsesManager.applyMessageQueryResults();

            // update UI
            if ($scope.messages.selectedGroup != null) {
                var selectedGroupId = $scope.messages.selectedGroup.GroupId;

                if (selectedGroupId != null)     
                    global.scopes.messages.getMessages($scope.messages.selectedGroup.GroupId, true);
            }
        }
    });

    signalRManager.bindServerCallback('onMessageArrived', function (response) {
        console.log(response);
        if (response.GroupId == null) response.GroupId = -1;
        
        if (response.ConferenceInfo != null && response.ConferenceInfo.Type == ConferenceType.VideoChat && response.ConferenceInfo.InitiatorPeer.UserId == global.scopes.swapcast.swapSettings.UserProfile.UserId)
            IceLinkWebRtcVideoChat.conferenceInfo = response.ConferenceInfo;

        if (response.ConferenceInfo != null && response.ConferenceInfo.Type == ConferenceType.ScreenSharing && response.ConferenceInfo.InitiatorPeer.UserId == global.scopes.swapcast.swapSettings.UserProfile.UserId)
            IceLinkWebRtcSharing.conferenceInfo = response.ConferenceInfo;

        if ($scope.swapSettings.Messages == null)
            $scope.swapSettings.Messages = { GroupData: {} };

        if (typeof($scope.swapSettings.Messages.GroupData) == 'undefined')
            $scope.swapSettings.Messages.GroupData = {};

        var groupData = $scope.swapSettings.Messages.GroupData[response.GroupId];

        // If group does not exist (e.g. it has been just created and does not have any messages). Initialize it.
        if (typeof (groupData) == "undefined") {
            groupData = { DateInfo: [] };
        }
        
        if (typeof (groupData) != "undefined") {
            // Init collection if it does not exists (e.g. a new registred user write first message into the main feed)
            if (groupData.DateInfo == null) groupData.DateInfo = [];

            if (groupData.DateInfo.length == 0) {
                groupData.DateInfo[0] = { Date: "", Messages: [] };
                groupData.DateInfo[0].Messages[groupData.DateInfo[0].Messages.length] = response;
                groupData.DateInfo[0].Date = response.DateSent;
                groupData.LastMessage = response;
                groupData.NotReadMessagesCount = 0;

                $scope.safeApply(function() {
                    $scope.swapSettings.Messages.GroupData[response.GroupId] = groupData;
                });

            } else {
                var messages = groupData.DateInfo[groupData.DateInfo.length - 1].Messages;

                var messageFound = false;

                if (typeof (response.MessageClientId) != 'undefined' && response.MessageClientId != null) {

                    // Update message if it has already been rendered
                    for (var i = 0; i < messages.length; i++) {
                        if (messages[i].MessageClientId == response.MessageClientId) {
                            groupData.DateInfo[groupData.DateInfo.length - 1].Messages[i] = response; // update existing message
                            messageFound = true;
                            break;
                        }
                    }
                }

                // Otherwise, add message
                if (!messageFound)
                    groupData.DateInfo[groupData.DateInfo.length - 1].Messages[groupData.DateInfo[groupData.DateInfo.length - 1].Messages.length] = response;
            }

            global.scopes.messages.getMessages($scope.messages.selectedGroup.GroupId, true);
        }
        
        // Update the last message in the group
        $scope.safeApply(function () {
            $scope.swapSettings.Messages.GroupData[response.GroupId].LastMessage = response;
        });
        
        if (response.UserPosted != $scope.swapSettings.UserProfile.UserId) {
            if (response.ConferenceInfo != null)
                $scope.playInvitationSound(response.MessageId);
            else
                $scope.playSound.incomingMessage();

            var isChatVisible = (($("#block-main-feed:visible").length + $("#block-my-secret-room:visible").length) > 0) && (global.scopes.swapcast.isLeftClosed == false);

            // if user is in chat when new message arrives in Chat
            if (isChatVisible && (response.GroupId == $scope.messages.selectedGroup.GroupId)) {
                var messageIds = new Array();
                messageIds.push(response.MessageId);
                $scope.Requests.markMessagesAsRead(messageIds);
            } else {                
                global.scopes.swapcast.swapSettings.Messages.GroupData[response.GroupId].NotReadMessagesCount += 1;
                
                $scope.swapSettings.Messages.GroupData[response.GroupId].FirstNotReadMessageDate = response.DateSent;
            }
        } else {
            $scope.playSound.outgoingMessage();
        }

        if (response.ConferenceInfo != null && response.ConferenceInfo.InitiatorPeer.UserId == global.scopes.swapcast.swapSettings.UserProfile.UserId) {
            if (response.ConferenceInfo.Type == 0) {
                global.scopes.videoChat._videoChatOpened = true;
                global.scopes.videoChat._videoChatConferenceId = response.ConferenceInfo.ConferenceId;
                global.scopes.videoChat._videoChatConferencePeers = response.ConferenceInfo.Peers;
            }
            if (response.ConferenceInfo.Type == 1) {
                global.scopes.videoChat._screenOpened = true;
                global.scopes.videoChat._sharingConferenceId = response.ConferenceInfo.ConferenceId;
                global.scopes.videoChat._sharingConferencePeers = response.ConferenceInfo.Peers;
            }

            global.scopes.videoChat._conferenceGroup = response.GroupId;
        }
        
        if (response.GroupId == -1)
            setTimeout(function () {
                $scope.scroll('#block-main-feed');
            }, 200);
        else
            setTimeout(function() {
                $scope.scroll('#block-my-secret-room');
            }, 200);

        $scope.setUnreadTotal();
    });

    signalRManager.bindServerCallback('onFavicons', function (response) {
        if ($scope.swapSettings.FavIcons == null)
            $scope.swapSettings.FavIcons = [];
        if (response != null) {
            for (var i = 0; i < response.length; i++) {
                var favicon = response[i];
                if (favicon != null)
                    $scope.swapSettings.FavIcons[favicon.Id] = favicon;
            }
        }
    });

    signalRManager.bindServerCallback('onSearchResultsUpdated', function(response) {
        global.scopes.friends.friendsSearch.searchResult = response.UsersFound;

        var searchResult = global.scopes.friends.friendsSearch.searchResult;

        if (typeof(searchResult) != 'undefined' && searchResult != null) {
            searchResult.forEach(function(user, ind) {
                // Set default picture.
                user.Userpic = null;

                if (user.UserpicName != undefined && user.UserpicName != null) {
                    ImageDownloadManager.getBase64Image(user.UserpicName, true, function (img) {
                        var frindsScope = angular.element($('#block-my-friends')).scope();

                        frindsScope.$apply(function () {
                            if (typeof (frindsScope.friendsSearch.searchResult[ind]) != 'undefined')
                                frindsScope.friendsSearch.searchResult[ind].Userpic = 'data:image/png;base64,' + img;
                        });
                    });
                }
            });
        }
    });

    signalRManager.bindServerCallback('onFavoriteAdded', function (response) {
        global.scopes.swapcast.swapSettings.Favorites.push(response.Favorite);
    });

    signalRManager.bindServerCallback('onFavoriteDeleted', function (response) {

        var favorites = $scope.swapSettings.Favorites;

        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].FavoriteId == response.FavoriteId) {
                favorites.splice(i, 1);
            }
        }
    });

    signalRManager.bindServerCallback('onMessageUpdated', function (response) {
        if (response.GroupId == null) response.GroupId = -1;

        if (response.IsDeleted || response.ConferenceInfo != null && !response.ConferenceInfo.IsActive) $scope.removeInvitationSound(response.MessageId);

        if (response.ConferenceInfo != null && response.ConferenceInfo.Type == 0 && IceLinkWebRtcVideoChat.conferenceInfo != undefined && IceLinkWebRtcVideoChat.conferenceInfo.ConferenceId == response.ConferenceInfo.ConferenceId)
            IceLinkWebRtcVideoChat.conferenceInfo = response.ConferenceInfo;

        if (response.ConferenceInfo != null && response.ConferenceInfo.Type == 1 && IceLinkWebRtcSharing.conferenceInfo != undefined && IceLinkWebRtcSharing.conferenceInfo.ConferenceId == response.ConferenceInfo.ConferenceId)
            IceLinkWebRtcSharing.conferenceInfo = response.ConferenceInfo;
        
        $scope.fillParticipantsAvatars();

        if (typeof ($scope.swapSettings.Messages.GroupData) == "undefined")
            $scope.swapSettings.Messages.GroupData = {};
        
        if (typeof($scope.swapSettings.Messages.GroupData[response.GroupId]) == "undefined")
            $scope.swapSettings.Messages.GroupData[response.GroupId] = { DateInfo: [] };

        var groupData = $scope.swapSettings.Messages.GroupData;

        var i, j;

        for (i in groupData[response.GroupId].DateInfo) {
            for (j in groupData[response.GroupId].DateInfo[i].Messages)
                if (groupData[response.GroupId].DateInfo[i].Messages[j].MessageId == response.MessageId) {
                    groupData[response.GroupId].DateInfo[i].Messages[j] = response;
                }
        }
        
        // Get last message
        var lastMessage = null;
        var isLastMessageFound = false;
        var messagesByDates = groupData[response.GroupId].DateInfo;

        for (i = messagesByDates.length; i > 0; i--) {
            var messagesOfDay = messagesByDates[i - 1].Messages;

            for (j = messagesOfDay.length; j > 0; j--) {
                if (!messagesOfDay[j - 1].IsDeleted) {
                    lastMessage = messagesOfDay[j - 1];
                    isLastMessageFound = true;
                    break;
                }
            }
            
            if (isLastMessageFound) break;
        }
        
        // Update the last message in the group
        $scope.safeApply(function () {
            $scope.swapSettings.Messages.GroupData[response.GroupId].LastMessage = lastMessage;
        });

        // If video chat is active now and a participant has left
        if (response.ConferenceInfo != null
			&& response.ConferenceInfo.Type == ConferenceType.VideoChat
            && response.ConferenceInfo.IsActive
            && response.ConferenceInfo.Peers.length == 1
            && global.scopes.videoChat._videoChatOpened) {

            var currentMessageGroup = $scope.swapSettings.MessageGroups.filter(function (x) { return x.GroupId == response.GroupId; });

            // Is 1-1 chat group chat
            if (currentMessageGroup[0].Participants.length == 2)
                global.scopes.videoChat.closeVideoChat(); // Close a video chat
        }

        // Unlock conference UI
        if (response.ConferenceInfo != null && response.MessageId == ConferenceUiLocker.messageId) ConferenceUiLocker.unlock();
    });

    signalRManager.bindServerCallback('onMessageUpdatedChunk', function (response) {
        console.log('onMessageUpdatedChunk');
        console.log(response);

        if (response.GroupId == null) response.GroupId = -1;

        var batchInfo = ChunkResponsesManager.consumeMessageUpdatedChunkResponse(response);

        if (batchInfo.BatchCompleted) {
            // get complete message
            response = ChunkResponsesManager.messageUpdatedGetMessageData(response);

            ChunkResponsesManager.disposeMessageUpdatedGetMessageData(response);

            if (response.IsDeleted || (response.ConferenceInfo != null && !response.ConferenceInfo.IsActive)) $scope.removeInvitationSound(response.MessageId);

            if (response.ConferenceInfo != null && response.ConferenceInfo.Type == 0 && IceLinkWebRtcVideoChat.conferenceInfo != undefined && IceLinkWebRtcVideoChat.conferenceInfo.ConferenceId == response.ConferenceInfo.ConferenceId)
                IceLinkWebRtcVideoChat.conferenceInfo = response.ConferenceInfo;

            if (response.ConferenceInfo != null && response.ConferenceInfo.Type == 1 && IceLinkWebRtcSharing.conferenceInfo != undefined && IceLinkWebRtcSharing.conferenceInfo.ConferenceId == response.ConferenceInfo.ConferenceId)
                IceLinkWebRtcSharing.conferenceInfo = response.ConferenceInfo;
            
            $scope.fillParticipantsAvatars();

            if (typeof ($scope.swapSettings.Messages.GroupData) == "undefined")
                $scope.swapSettings.Messages.GroupData = {};
            
            if (typeof($scope.swapSettings.Messages.GroupData[response.GroupId]) == "undefined")
                $scope.swapSettings.Messages.GroupData[response.GroupId] = { DateInfo: [] };

            var groupData = $scope.swapSettings.Messages.GroupData;

            var i, j;

            for (i in groupData[response.GroupId].DateInfo) {
                for (j in groupData[response.GroupId].DateInfo[i].Messages)
                    if (groupData[response.GroupId].DateInfo[i].Messages[j].MessageId == response.MessageId) {
                        groupData[response.GroupId].DateInfo[i].Messages[j] = response;
                    }
            }

            // Get last message
            var lastMessage = null;
            var isLastMessageFound = false;
            var messagesByDates = groupData[response.GroupId].DateInfo;

            for (i = messagesByDates.length; i > 0; i--) {
                var messagesOfDay = messagesByDates[i - 1].Messages;

                for (j = messagesOfDay.length; j > 0; j--) {
                    if (!messagesOfDay[j - 1].IsDeleted) {
                        lastMessage = messagesOfDay[j - 1];
                        isLastMessageFound = true;
                        break;
                    }
                }
                
                if (isLastMessageFound) break;
            }
            
            // Update the last message in the group
            $scope.safeApply(function () {
                $scope.swapSettings.Messages.GroupData[response.GroupId].LastMessage = lastMessage;
            });

            // If video chat is active now and a participant has left
            if (response.ConferenceInfo != null
                && response.ConferenceInfo.Type == ConferenceType.VideoChat
                && response.ConferenceInfo.IsActive
                && response.ConferenceInfo.Peers.length == 1
                && global.scopes.videoChat._videoChatOpened) {

                var currentMessageGroup = $scope.swapSettings.MessageGroups.filter(function (x) { return x.GroupId == response.GroupId; });

                // Is 1-1 chat group chat
                if (currentMessageGroup[0].Participants.length == 2)
                    global.scopes.videoChat.closeVideoChat(); // Close a video chat
            }
        }
    });
    
    signalRManager.bindServerCallback('onMessageGroupUpdated', function (response) {
        var i,
            participants;

        var groups = $scope.swapSettings.MessageGroups;
        
        var availabilityGroup = 0;
        
        for (var y = 0; y < groups.length; y++) {
            if (groups[y].GroupId == response.GroupId) {
                availabilityGroup++;
                continue;
            }
        }

        // Form title
        if (response.Title == null) {

            response.Title = "";

            participants = response.Participants;

            for (i = 0; i < participants.length; i++) {
                if ($scope.swapSettings.UserProfile.UserId != participants[i].UserId && participants[i].IsCurrentlyInGroup) {
                    response.Title = response.Title + ' ' + participants[i].FirstName + ' ' + (participants[i].LastName == null ? "" : participants[i].LastName);
                }
            }
        }
        if ($scope.swapSettings.Messages.GroupData == null)
            $scope.swapSettings.Messages.GroupData = [];
        //if this group is new
        if (availabilityGroup == 0) {
            if ($scope.swapSettings.Messages == null)
                $scope.swapSettings.Messages = { GroupData: {} };

            // Create the messages collection for the new created group
            if (typeof ($scope.swapSettings.Messages.GroupData[response.GroupId]) == "undefined"
            || $scope.swapSettings.Messages.GroupData[response.GroupId] == null) {

                $scope.swapSettings.Messages.GroupData[response.GroupId.toString()] = {
                    DateInfo: [],
                    FirstNotReadMessageDate: null,
                    GroupId: response.GroupId,
                    LastMessage: null,
                    NotReadMessagesCount: 0
                };
            }

            $scope.swapSettings.MessageGroups.push(response);
            $scope.messages.selectedGroup.GroupId = response.GroupId;
            $scope.Slide($scope.currentArea, '#block-my-secret-room');
            global.scopes.messages.getMessages(response.GroupId, true);

            if (global.scopes.webBrowser.isSharingLink) {
                global.scopes.webBrowser.shareLink(response.GroupId);
                global.scopes.webBrowser.shareLinkWithFriend();
            } 
        }
        else {
            // Set title
            for (i = 0; i < global.scopes.swapcast.swapSettings.MessageGroups.length; i++) {
                if (global.scopes.swapcast.swapSettings.MessageGroups[i].GroupId == response.GroupId)
                    global.scopes.swapcast.swapSettings.MessageGroups[i].Title = response.Title;
            }

            //if this group exists and need to edit it
            var group = swapSettings.MessageGroups;

            for (var z = 0; z < group.length; z++) {
                if (group[z].GroupId == response.GroupId) {
                    group[z].Participants = response.Participants.filter(function (participant) { return participant.IsCurrentlyInGroup; });
                }
            }

            $scope.getParticipants();
        }
    });

    signalRManager.bindServerCallback('onResetChunk', function (response) {
        console.log('onResetChunk');
        console.log(response);

        var userId = response.UserId == null ? -1 : response.UserId;

        global.scopes.swapcast.swapSettings.UserId = userId;

        $(".favoriteTabs").removeClass("width9percent");
        
        setTimeout(function () {
            var batchInfo = ChunkResponsesManager.consumeResetExResponse(response);
            
            if ($scope.IsFlagExists(8 /* Profile */, response.PartDataFlags)) {
                global.scopes.swapcast.$apply(function() {
                    // if chunk contains userProfile extend local profile with new data.
                    if (response.UserProfile != null)
                        global.scopes.swapcast.swapSettings.UserProfile = $.extend(global.scopes.swapcast.swapSettings.UserProfile, response.UserProfile);
                    else 
                        global.scopes.swapcast.swapSettings.UserProfile = null;

                    if (global.scopes.swapcast.swapSettings.UserProfile != null
                        && typeof(global.scopes.swapcast.swapSettings.UserProfile.UserpicName) != 'undefined'
                        && global.scopes.swapcast.swapSettings.UserProfile.UserpicName != null) {

                        ImageDownloadManager.getBase64Image(global.scopes.swapcast.swapSettings.UserProfile.UserpicName, true, function(img) {
                            var swapcastScope = angular.element($('body')).scope();

                            swapcastScope.$apply(function() {
                                global.scopes.swapcast.swapSettings.UserProfile.Userpic = 'data:image/png;base64,' + img;

                                global.scopes.swapcast.usersImages[global.scopes.swapcast.swapSettings.UserProfile.UserId] = 'data:image/png;base64,' + img;
                            });
                        });
                    } else {
                        // Set null user Default Picture.
                        if (global.scopes.swapcast.swapSettings.UserProfile != null) {
                            global.scopes.swapcast.swapSettings.UserProfile.Userpic = null;

                            global.scopes.swapcast.usersImages[global.scopes.swapcast.swapSettings.UserProfile.UserId] = 'img/userpic_default.png';
                        }
                    }
                });

                if ($scope.swapSettings.UserProfile != null) 
                    $scope.storage.set({ userName: $scope.swapSettings.UserProfile.FirstName + " " + $scope.swapSettings.UserProfile.LastName });

                if ($scope.needToSignOut) {
                    global.scopes.auth.Functions.submitSignOut();
                    $scope.needToSignOut = false;
                    return;
                }
            }

            var isAuthorized = $scope.IsAuthorized();

            if (isAuthorized) {
                $("#loginArea").hide();
                $("#profileArea").show();
            } else {
                $("#profileArea").hide();
                $("#loginArea").show();
                
                $scope.messages.selectedGroup.GroupId = "NotSet";
                $scope.groupMessageCount = new Array();

                $scope.storage.remove("authToken");
            }

            if ($scope.IsFlagExists(1, response.PartDataFlags)) {
                // Extend existing messages with messageInfo from server
                global.scopes.swapcast.$apply(function() {
                    if (response.MessagesInfo != null && response.MessagesInfo.GroupData != null) {
                        global.scopes.swapcast.swapSettings.Messages = ChunkResponsesManager.getResetBatchDataMessagesInfo(response);
                    }
                });
            }

            if ($scope.IsFlagExists(2, response.PartDataFlags)) {
                if (response.Friends != null) {
                    for (i = 0; i < response.Friends.length; i++) {
                        var friend = response.Friends[i]; // Get image for Friend by ajax 

                        global.scopes.swapcast.$apply(function() {
                            var friendId = friend.UserId;

                            global.scopes.swapcast.swapSettings.Friends[friend.UserId] = friend;

                            // Set default picture.
                            global.scopes.swapcast.swapSettings.Friends[friendId].Userpic = "img/userpic_default.png";
                            global.scopes.swapcast.usersImages[friendId] = 'img/userpic_default.png';

                            if (global.scopes.swapcast.swapSettings.Friends[friendId] != null
                                && typeof (global.scopes.swapcast.swapSettings.Friends[friendId].UserpicName) != 'undefined'
                                && global.scopes.swapcast.swapSettings.Friends[friendId].UserpicName != null) {

                                ImageDownloadManager.getBase64Image(global.scopes.swapcast.swapSettings.Friends[friendId].UserpicName, true, function(img) {
                                    var swapcastScope = angular.element($('body')).scope();

                                    swapcastScope.$apply(function () {
                                        swapcastScope.swapSettings.Friends[friendId].Userpic = 'data:image/png;base64,' + img;

                                        // Update friend image
                                        swapcastScope.usersImages[friendId] = 'data:image/png;base64,' + img;
                                    });
                                });
                            }
                        });
                    }
                }
            }

            if ($scope.IsFlagExists(4, response.PartDataFlags)) {
                // If not login and a new friendship request arrived
                if ($scope.initialResetProcessing == null && response.FriendshipRequests.length > global.scopes.swapcast.swapSettings.FriendshipRequests.length)
                    $scope.playSound.incomingMessage();

                global.scopes.swapcast.$apply(function() {
                    global.scopes.swapcast.swapSettings.FriendshipRequests = ChunkResponsesManager.getResetBatchDataFriendRequests(response);

                    var friendRequest = global.scopes.swapcast.swapSettings.FriendshipRequests;

                    if (typeof(friendRequest) != 'undefined' && friendRequest != null) {
                        friendRequest.forEach(function(user, ind) {
                            if (typeof(user.UserpicName) != 'undefined' && user.UserpicName != null) {
                                ImageDownloadManager.getBase64Image(user.UserpicName, true, function(img) {
                                    var swapcastScope = angular.element($('body')).scope();

                                    swapcastScope.$apply(function() {
                                        swapcastScope.swapSettings.FriendshipRequests[ind].Userpic = 'data:image/png;base64,' + img;

                                        swapcastScope.usersImages[user.UserId] = 'data:image/png;base64,' + img;
                                    });
                                });
                            } else {
                                global.scopes.swapcast.usersImages[user.UserId] = 'img/userpic_default.png';

                                // Set null user Default Picture.
                                user.Userpic = null;
                            }
                        });
                    }
                });
            }

            if ($scope.IsFlagExists(32, response.PartDataFlags) || batchInfo.BatchCompleted) {
                global.scopes.swapcast.$apply(function () { global.scopes.swapcast.swapSettings.Favorites = ChunkResponsesManager.getResetBatchDataFavorites(response); });
            }

            if ($scope.IsFlagExists(64, response.PartDataFlags)) {
                if (response.MessageGroups != null) {
                    response.MessageGroups.forEach(function(group) {
                        if (group.Title == null)
                            group.Title = group.Participants.map(function(participant) {
                                return global.scopes.swapcast.swapSettings.UserId != participant.UserId ? participant.FirstName + ' ' + participant.LastName : ""
                            }).join(" ");
                    });
                }

                if ($scope.IsFlagExists(64, response.Flags)) {
                    if (response.MessageGroups != null) {
                        var groups = response.MessageGroups;

                        for (var i = 0; i < groups.length; i++) {
                            if (groups[i].Title == null) {
                                groups[i].Title = "";
                                var participants = groups[i].Participants;
                                for (var j = 0; j < participants.length; j++) {
                                    if (response.UserProfile.UserId != participants[j].UserId) {
                                        groups[i].Title = groups[i].Title + ' ' + participants[j].FirstName + ' ' + (participants[j].LastName == null ? "" : participants[j].LastName);
                                    }
                                }
                            }
                        }
                    }
                }
            }


            if ($scope.IsFlagExists(64, batchInfo.FirstArrivedPartsFlags) || batchInfo.BatchCompleted) {
                global.scopes.swapcast.$apply(function() {
                    global.scopes.swapcast.swapSettings.MessageGroups = ChunkResponsesManager.getResetBatchDataMessageGroups(response);
                });

                $scope.setUnreadTotal();
            }

            if ($scope.IsFlagExists(128, response.PartDataFlags)) {
                global.scopes.swapcast.$apply(function() {
                    global.scopes.swapcast.swapSettings.Links = ChunkResponsesManager.getResetBatchDataLinks(response);
                });
            }

            // initial reset with profile and is first chunk
            if ($scope.initialResetProcessing && response.UserProfile != null) {
                // Open first default tab
                var webBrowserScope = angular.element(document.getElementById("container-right")).scope();

                //webBrowserScope.$apply(function () {
                //    webBrowserScope.openLink(global.scopes.webBrowser.TabsOfUser.DefaultTabs[0].Id);
                //});

                // Reset isLoginButtonPressed state
                global.scopes.auth.isLoginButtonPressed = false;

                $scope.showChatPannel();
                // Open a chats list
                $scope.Slide('#' + $('.block:visible').first().attr('id'), '#block-chat');

                global.scopes.webBrowser.historyOfTabs = new Array();

            //    $scope.storage.get('tabsOfUser' + userId, function(obj) {
            //        var tabsOfUser = obj['tabsOfUser' + userId];

            //        var tabs = typeof (tabsOfUser) == "undefined" || tabsOfUser.DefaultTabs == null ? [] : tabsOfUser.DefaultTabs;
            //        var moreTabs = typeof (tabsOfUser) == "undefined" || tabsOfUser.MoreTabs == null ? [] : tabsOfUser.MoreTabs.filter(function (moreTab) { return moreTab != null; });

            //        var allTabs = tabs.concat(moreTabs);

            //        // Exclude duplicates, empty pages, remove activeTab class and set Id for tabs
            //        var filteredTabs = [];

            //        allTabs.forEach(function(savedTab) {
            //            if (!global.scopes.webBrowser.InitialTabs.some(function(initialTab) { return initialTab.Link == savedTab.Link; })
            //                && !filteredTabs.some(function(filteredTab) { return filteredTab.Link == savedTab.Link; })) {

            //                savedTab.Class = savedTab.Class.replace('activeTab', '');
            //                savedTab.Id = global.scopes.webBrowser.TabsOfUser.NewId++;

            //                if (savedTab.Link != 'about:blank')
            //                    filteredTabs.push(savedTab);
            //            }
            //        });

            //        var addedMoreTabs = [].concat(filteredTabs);

            //        for (var t = 0 ; t < filteredTabs.length; t++) {
            //            var isExistPlaceForTab = global.scopes.webBrowser.IsExistPlaceForTab();

            //            if (!isExistPlaceForTab) break;

            //            global.scopes.webBrowser.TabsOfUser.DefaultTabs.push(filteredTabs[t]);

            //            addedMoreTabs = addedMoreTabs.filter(function(addedMoreTab) { return addedMoreTab.Link != filteredTabs[t].Link; });
            //        }

            //        global.scopes.webBrowser.$apply(function() {
            //            global.scopes.webBrowser.TabsOfUser.MoreTabs = addedMoreTabs;
            //        });

            //        global.scopes.swapcast.areTabsLoaded = true;
            //    });
            }
            
            if (batchInfo.BatchCompleted){
                ChunkResponsesManager.disposeResetExBatch(response);
                $scope.initialResetProcessing = null;
            }

            //setTimeout(function () {
            //    global.scopes.webBrowser.IsExistPlaceForT();
            //}, 500);

        },500);
    });

    signalRManager.bindServerCallback('onReset', function (response) {
        console.log('onReset');
        console.log(response);

        var userId = response.UserProfile == null ? -1 : response.UserProfile.UserId;

        $(".favoriteTabs").removeClass("width9percent");
        
        setTimeout(function () {
            if (response.MessageGroups != null && response.MessageGroups.length > 0 && response.UserProfile == null) {
                response.UserProfile = $scope.swapSettings.UserProfile;
            }

            if ($scope.IsFlagExists(8 /* Profile */, response.Flags)) {
                $scope.swapSettings.UserProfile = null;

                global.scopes.swapcast.$apply(function() {
                    global.scopes.swapcast.swapSettings.UserProfile = response.UserProfile;

                    if (global.scopes.swapcast.swapSettings.UserProfile != null
                        && typeof(global.scopes.swapcast.swapSettings.UserProfile.UserpicName) != 'undefined'
                        && global.scopes.swapcast.swapSettings.UserProfile.UserpicName != null) {

                        ImageDownloadManager.getBase64Image(global.scopes.swapcast.swapSettings.UserProfile.UserpicName, true, function(img) {
                            var swapcastScope = angular.element($('body')).scope();

                            swapcastScope.$apply(function() {
                                global.scopes.swapcast.swapSettings.UserProfile.Userpic = 'data:image/png;base64,' + img;

                                global.scopes.swapcast.usersImages[global.scopes.swapcast.swapSettings.UserProfile.UserId] = 'data:image/png;base64,' + img;
                            });
                        });
                    } else {
                        // Set null user Default Picture.
                        if (global.scopes.swapcast.swapSettings.UserProfile != null) {
                            global.scopes.swapcast.swapSettings.UserProfile.Userpic = null;

                            global.scopes.swapcast.usersImages[global.scopes.swapcast.swapSettings.UserProfile.UserId] = 'img/userpic_default.png';
                        }
                    }
                });

                if ($scope.swapSettings.UserProfile != null) {
                    $scope.storage.set({ userName: $scope.swapSettings.UserProfile.FirstName + " " + $scope.swapSettings.UserProfile.LastName });
                }

                if ($scope.needToSignOut) {
                    global.scopes.auth.Functions.submitSignOut();
                    $scope.needToSignOut = false;
                    return;
                }
            }

            var isAuthorized = $scope.IsAuthorized();

            if (isAuthorized) {
                $("#loginArea").hide();
                $("#profileArea").show();
            } else {
                $("#profileArea").hide();
                $("#loginArea").show();
                
                $scope.messages.selectedGroup.GroupId = "NotSet";
                $scope.groupMessageCount = new Array();

                $scope.storage.remove("authToken");
            }

            if ($scope.IsFlagExists(1, response.Flags)) {
                global.scopes.swapcast.$apply(function () { global.scopes.swapcast.swapSettings.Messages = response.MessagesInfo; });
            }

            if ($scope.IsFlagExists(2, response.Flags)) {
                global.scopes.swapcast.$apply(function () { global.scopes.swapcast.swapSettings.Friends = {}; });

                if (response.Friends != null) {
                    for (i = 0; i < response.Friends.length; i++) {
                        var friend = response.Friends[i]; // Get image for Friend by ajax 

                        global.scopes.swapcast.$apply(function() {
                            var friendId = friend.UserId;

                            global.scopes.swapcast.swapSettings.Friends[friend.UserId] = friend;

                            // Set default picture.
                            global.scopes.swapcast.swapSettings.Friends[friendId].Userpic = "img/userpic_default.png";
                            global.scopes.swapcast.usersImages[friendId] = 'img/userpic_default.png';

                            if (global.scopes.swapcast.swapSettings.Friends[friendId] != null
                                && typeof (global.scopes.swapcast.swapSettings.Friends[friendId].UserpicName) != 'undefined'
                                && global.scopes.swapcast.swapSettings.Friends[friendId].UserpicName != null) {

                                ImageDownloadManager.getBase64Image(global.scopes.swapcast.swapSettings.Friends[friendId].UserpicName, true, function(img) {
                                    var swapcastScope = angular.element($('body')).scope();

                                    swapcastScope.$apply(function () {
                                        swapcastScope.swapSettings.Friends[friendId].Userpic = 'data:image/png;base64,' + img;

                                        // Update friend image
                                        swapcastScope.usersImages[friendId] = 'data:image/png;base64,' + img;
                                    });
                                });
                            }
                        });
                    }
                }
            }

            if ($scope.IsFlagExists(4, response.Flags)) {
                // If not login and a new friendship request arrived
                if (response.Flags != 511 && response.FriendshipRequests.length > global.scopes.swapcast.swapSettings.FriendshipRequests.length)
                    $scope.playSound.incomingMessage();

                global.scopes.swapcast.$apply(function() {
                    global.scopes.swapcast.swapSettings.FriendshipRequests = response.FriendshipRequests;
                    var friendRequest = global.scopes.swapcast.swapSettings.FriendshipRequests;

                    if (typeof(friendRequest) != 'undefined' && friendRequest != null) {
                        friendRequest.forEach(function(user, ind) {
                            if (typeof(user.UserpicName) != 'undefined' && user.UserpicName != null) {
                                ImageDownloadManager.getBase64Image(user.UserpicName, true, function(img) {
                                    var swapcastScope = angular.element($('body')).scope();

                                    swapcastScope.$apply(function() {
                                        swapcastScope.swapSettings.FriendshipRequests[ind].Userpic = 'data:image/png;base64,' + img;

                                        swapcastScope.usersImages[user.UserId] = 'data:image/png;base64,' + img;
                                    });
                                });
                            } else {
                                global.scopes.swapcast.usersImages[user.UserId] = 'img/userpic_default.png';

                                // Set null user Default Picture.
                                user.Userpic = null;
                            }
                        });
                    }
                });
            }

            if ($scope.IsFlagExists(32, response.Flags)) {
                global.scopes.swapcast.$apply(function () { global.scopes.swapcast.swapSettings.Favorites = response.Favorites; });
            }

            if ($scope.IsFlagExists(64, response.Flags)) {
                if (response.MessageGroups != null) {
                    var groups = response.MessageGroups;

                    for (var i = 0; i < groups.length; i++) {
                        if (groups[i].Title == null) {
                            groups[i].Title = "";
                            var participants = groups[i].Participants;
                            for (var j = 0; j < participants.length; j++) {
                                if (response.UserProfile.UserId != participants[j].UserId) {
                                    groups[i].Title = groups[i].Title + ' ' + participants[j].FirstName + ' ' + (participants[j].LastName == null ? "" : participants[j].LastName);
                                }
                            }
                        }
                    }
                }

                global.scopes.swapcast.$apply(function () { global.scopes.swapcast.swapSettings.MessageGroups = response.MessageGroups; });
            }

            if ($scope.IsFlagExists(128, response.Flags)) {
                global.scopes.swapcast.$apply(function () { global.scopes.swapcast.swapSettings.Links = response.Links; });
            }
            
            if ($scope.IsFlagExists(8 /* Profile */, response.Flags)) {
                // new history of tabs
                $scope.setUnreadTotal();
            }
            
            if (response.Flags == 511) {
                // Open first default tab
                var webBrowserScope = angular.element(document.getElementById("container-right")).scope();

                //webBrowserScope.$apply(function () {
                //    webBrowserScope.openLink(global.scopes.webBrowser.TabsOfUser.DefaultTabs[0].Id);
                //});

                // Reset isLoginButtonPressed state
                global.scopes.auth.isLoginButtonPressed = false;

                $scope.showChatPannel();
                // Open a chats list
                $scope.Slide('#' + $('.block:visible').first().attr('id'), '#block-chat');

                global.scopes.webBrowser.historyOfTabs = new Array();

                $scope.storage.get('tabsOfUser' + userId, function(obj) {
                    var tabsOfUser = obj['tabsOfUser' + userId];

                    var tabs = typeof (tabsOfUser) == "undefined" ? [] : tabsOfUser.DefaultTabs;
                    var moreTabs = typeof (tabsOfUser) == "undefined" ? [] : tabsOfUser.MoreTabs.filter(function(moreTab) { return moreTab != null; });

                    var allTabs = tabs.concat(moreTabs);

                    // Exclude duplicates, empty pages, remove activeTab class and set Id for tabs
                    var filteredTabs = [];

                    allTabs.forEach(function(savedTab) {
                        if (!global.scopes.webBrowser.InitialTabs.some(function(initialTab) { return initialTab.Link == savedTab.Link; })
                            && !filteredTabs.some(function(filteredTab) { return filteredTab.Link == savedTab.Link; })) {

                            savedTab.Class = savedTab.Class.replace('activeTab', '');
                            savedTab.Id = global.scopes.webBrowser.TabsOfUser.NewId++;

                            if (savedTab.Link != 'about:blank')
                                filteredTabs.push(savedTab);
                        }
                    });

                    var addedMoreTabs = [].concat(filteredTabs);

                    for (var t = 0 ; t < filteredTabs.length; t++) {
                        var isExistPlaceForTab = global.scopes.webBrowser.IsExistPlaceForTab();

                        if (!isExistPlaceForTab) break;

                        global.scopes.webBrowser.TabsOfUser.DefaultTabs.push(filteredTabs[t]);

                        addedMoreTabs = addedMoreTabs.filter(function(addedMoreTab) { return addedMoreTab.Link != filteredTabs[t].Link; });
                    }

                    global.scopes.webBrowser.$apply(function() {
                        global.scopes.webBrowser.TabsOfUser.MoreTabs = addedMoreTabs;
                    });

                    global.scopes.swapcast.areTabsLoaded = true;
                });
            }

            setTimeout(function () {
                global.scopes.webBrowser.IsExistPlaceForT();
            }, 500);
        }, 500);
    });

    signalRManager.bindServerCallback("conferenceInvitationAccepted", function (signal) {
        global.scopes.videoChat.conferenceManager.handleInvitationAccepted(signal);
    });
    
    signalRManager.bindServerCallback("participantLeft", function (signal) {
        global.scopes.videoChat.conferenceManager.handleParticipantLeft(signal);
    });
    
    signalRManager.bindServerCallback("broadcasterLeft", function (signal) {
        global.scopes.videoChat.conferenceManager.handleBroadcasterLeft(signal);
    });
    
    signalRManager.bindServerCallback("onJsepOffer", function (signal) {
        IceLinkWebRtcSharing.jsepOffer(signal);
    });

    signalRManager.bindServerCallback("onJsepOffer", function (signal) {
        console.log("onJsepOffer", new Date().timeNow());
        IceLinkWebRtcVideoChat.jsepOffer(signal);
    });
    
    signalRManager.bindServerCallback("onJsepAnswer", function (signal) {
        console.log("onJsepAnswer", new Date().timeNow());
        IceLinkWebRtcVideoChat.jsepAnswer(signal);
    });

    signalRManager.bindServerCallback("onJsepAnswer", function (signal) {
        IceLinkWebRtcSharing.jsepAnswer(signal);
    });

    signalRManager.bindServerCallback("onJsepCandidate", function (signal) {
        IceLinkWebRtcVideoChat.jsepCandidate(signal);
    });

    signalRManager.bindServerCallback("onJsepCandidate", function (signal) {
        IceLinkWebRtcSharing.jsepCandidate(signal);
    });

    signalRManager.bindServerCallback('onError', function (response) {
        if (global.scopes.auth.isLoginButtonPressed) {
            global.scopes.auth.isLoginButtonPressed = false;

            global.scopes.auth.showLoginProcess = false;
        }

        $scope.Functions.showAlert(response.ErrorMessageText);
    });

    signalRManager.bindServerCallback('onPasswordChanged', function (response) {
        var message = "";
        switch(response.Status){
            case ChangePasswordStatus.UserNotExists:
                message = "User not exist";
            break;
            case ChangePasswordStatus.CurrentPasswordDoesNotMatch:
                message = "current password does not match";
            break;
            case ChangePasswordStatus.OK:
                message = "update password was success";
                $("#changePasswordModal").modal("hide");
            break;
        }
        $scope.Functions.showAlert(message);
    });

    signalRManager.bindServerCallback('onIceServersUpdate', function(response) {
        response.forEach(function(serverInfo) {
            $scope.iceServerInfo.push({
                url: serverInfo.IpAdress + ':' + serverInfo.Port,
                credential: 'pa55w0rd!',
                username: 'test'
            });
        });
    });
    
    //End - Initialize Event Handlers

    $scope.closeCurrentConference = function () {
        if ($scope.needToJoinToConference) {
            var mes = $scope.messageForJoinRequest;

            if (mes.ConferenceInfo.Type == 0 && global.scopes.videoChat._videoChatOpened)
                global.scopes.videoChat.closeVideoChat();

            if (mes.ConferenceInfo.Type == 1 && global.scopes.videoChat._screenOpened) {
                global.scopes.videoChat.closeScreenSharing();
                if ($("#remoteScreenShareTab").length != 0)
                    StreamManager.closeScreenSharingTab();
            }

            setTimeout(function() {
                global.scopes.messages.joinConference($scope.messageForJoinRequest);
            }, 1000);
        } else {
            if ($scope.needToOpenVideoChat) {
                if (global.scopes.videoChat._videoChatOpened)
                    global.scopes.videoChat.closeVideoChat();

                global.scopes.messages.startVideoChat();
            } else {
                if (global.scopes.videoChat._screenOpened)
                    global.scopes.videoChat.closeScreenSharing();

                if ($("#remoteScreenShareTab").length != 0)
                    StreamManager.closeScreenSharingTab();

                global.scopes.webBrowser.startScreenSharing();
            }
        }
        
        $("#videoChatModal").modal("hide");
    };

    $scope.closeModal = function () {
        global.scopes.swapcast.messages.tempGroupId = undefined;
        $('#videoChatModal').modal('hide');
    };
    /* TODO: move to js/Managers/SystemMessages.js
    chrome.idle.setDetectionInterval(3600);
    chrome.idle.onStateChanged.addListener(function (state) {

        if (state != "idle" || global.scopes.swapcast.swapSettings.UserProfile == null ||
            global.scopes.swapcast.swapSettings.UserProfile.UserId == undefined || global.scopes.videoChat._screenOpened ||
            global.scopes.videoChat._videoChatOpened) return;

        $('#idleTimeoutModal').modal('show');

        setTimeout(function () {
            $('#idleTimeoutModal').modal('hide');
            if(global.scopes.swapcast.continueSessionNeeded == undefined || !global.scopes.swapcast.continueSessionNeeded)
                global.scopes.auth.Functions.submitSignOut();
            global.scopes.swapcast.safeApply(function() {
                global.scopes.swapcast.continueSessionNeeded = false;
            });
        }, 300000);
    });
    */

    $scope.continueSession = function () {
        $('#idleTimeoutModal').modal('hide');

        global.scopes.swapcast.safeApply(function () {
            global.scopes.swapcast.continueSessionNeeded = true;
        });
    }

    $scope.closeInactivityModal = function() {
        $('#idleTimeoutModal').modal('hide');
        global.scopes.swapcast.safeApply(function() {
            global.scopes.swapcast.continueSessionNeeded = false;
        });

        global.scopes.auth.Functions.submitSignOut();
    }

    $scope.clearUserInputs = function() {
        global.scopes.friends.friendsSearch.searchString = "";
        global.scopes.friends.friendsSearch.email = "";
    }

    $scope.getSuggested = function () {
        return $scope.suggestedUrls.slice(0, 5).concat($scope.suggested.slice(0, 4));
    }

    $scope.suggested = [];
    $scope.suggestedUrls = [];

    $scope.closeSuggestedForce = false;
    $scope.showSuggested = function () {
        if ($scope.suggested.length > 0 || $scope.suggestedUrls.length > 0) {
            var urlOffset;
            var item = null;

            if ($('#browserGrid').is(':visible'))
                item = $('#div-browser-url');
            if ($('#myHomeGrid').is(':visible'))
                item = $('#input-home-search');
            if ($('#myFavoriteGrid').is(':visible'))
                item = $('#input-favorites-search');

            if (item == null) return false;

            urlOffset = item.offset();

            $('#div-suggested-queries').css({ left: urlOffset.left, top: urlOffset.top + 39 });
            $('#div-suggested-queries').outerWidth(item.outerWidth());

            return !$scope.closeSuggestedForce;
        }

        return false;
    }

    $scope.findMatchUrls = function (input) {
        if (global.scopes.swapcast.swapSettings.UserProfile != null && global.scopes.swapcast.swapSettings.UserProfile != undefined) {
            $scope.storage.get('urlHistory' + global.scopes.swapcast.swapSettings.UserProfile.UserId, function (obj) {
                var history = undefined;
                history = obj['urlHistory' + global.scopes.swapcast.swapSettings.UserProfile.UserId];

                if (typeof history != 'undefined') {
                    global.scopes.swapcast.suggestedUrls = history.filter(function (x) { return x.indexOf(input) != -1; });
                } else {
                    global.scopes.swapcast.suggestedUrls = [];
                }
            });
        }
    }

    $scope.requestAutocomplete = function() {
        global.scopes.webBrowser.requestAutocomplete(2);
    }

    $scope.showLoginProcessArea = function () {
        return global.scopes.auth.showLoginProcess;
    }

    $scope.logInUserName = '';

    $scope.needToSignOut = false;

    $scope.submitSignOut = function () {
        $scope.needToSignOut = true;
        global.scopes.auth.showLoginProcess = false;
    }

    $scope.showDeleteFriend = function() {
        $scope.CloseDropDownMenu();
        global.scopes.friends.showDeleteFriends = true;
    };

    $scope.sortFriends = function (friend) {
        return (friend.FirstName == null ? '' : friend.FirstName + ' ') + (friend.LastName == null ? '' : friend.LastName);
    };

    $scope.filterFriends = function (friend) {
        var filterValue = $('#input-filter-friends').val();

        if (filterValue.length == 0) return true;

        var userName = (friend.FirstName == null ? '' : friend.FirstName + ' ') + (friend.LastName == null ? '' : friend.LastName);

        return userName.toLowerCase().indexOf(filterValue.toLowerCase()) != -1;
    };

    $scope.filterShareItems = function (messageGroupOrFriend) {
        var filterValue = $('#input-filter-share-items').val();

        if (filterValue.length == 0) return true;

        if (typeof (messageGroupOrFriend.Title) != 'undefined') return messageGroupOrFriend.Title.indexOf(filterValue) != -1;

        var userName = (messageGroupOrFriend.FirstName == null ? '' : messageGroupOrFriend.FirstName + ' ') + (messageGroupOrFriend.LastName == null ? '' : messageGroupOrFriend.LastName);

        return userName.indexOf(filterValue) != -1;
    };
    $scope.isSmallWindow = function() {
        return $('html').innerWidth() < 1000?true:false;
    };

    $(document).ready(function () {
            global.scopes.swapcast.showChatPannel();
    });





}

//change Browser Link
var changeBrowserLink = function () {
    var scope = global.scopes.webBrowser;

    var link = $(this).attr('rel');
    if (link.indexOf("://") == -1)
        link = "http://" + link;
    //scope.$apply(function () {
    //    scope.AddNewTab(link);
    //});
    var win = window.open(link, '_blank');
    win.focus();

    return false;
};

function ShowHomePage() {
    $('#block-my-facebook-friends').hide().find('iframe').attr('src', '');
    $('#my-home-div').show();

    if (global.scopes.swapcast.isSmallWindow() && $('#myHomeGrid').is(':visible'))
        $('#myHomeGrid').addClass('hide');
        // $('#myHomeGrid').css({'display':'none'});
};