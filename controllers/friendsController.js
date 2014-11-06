function friendsController($scope) {

    global.scopes.friends = angular.element($('#block-my-friends')).scope();

    $scope.MultipleGroup = {
        GroupName: "",
    };

    $scope.deletefriendId = 0;

    $scope.showDeleteFriends = false;

    $scope.showDeleteFriendsItems = function() {
        return $scope.showDeleteFriends;
    }

    $scope.confirmDeleteFriend = function (friend, $event) {
        $event.stopImmediatePropagation();

        var userName = friend.FirstName == null && friend.LastName == null ? friend.Email : friend.FirstName + " " + friend.LastName;

        $('#delete-friend-name').text(userName + "?");

        $scope.deletefriendId = friend.UserId;

        $('#deleteFriendModal').modal('show');
    }

    $scope.deleteFriend = function () {
        global.scopes.swapcast.Requests.deleteFriend($scope.deletefriendId);
        $('#deleteFriendModal').modal('hide');
        $scope.deletefriendId = 0;
    }
    $scope.getfriendProfileName = function(friend) {
        if (friend.FirstName != null && friend.LastName != null && friend.FirstName != undefined && friend.LastName != undefined) {
            return friend.FirstName + ' ' + friend.LastName;
        } else {
            return friend.Email;
        }
    }
    //private chat
    $scope.privateChat = function (firstParticipantUserId) {
        GoogleAnalyticsManager.tracker.sendEvent('FriendsView', 'PrivateChat');

        var groups = global.scopes.swapcast.swapSettings.MessageGroups;

        for (var i = 0; i < groups.length; i++) {
            // If it is 1-1 chat
            if (groups[i].Participants.length == 2) {
                for (var j = 0; j < groups[i].Participants.length; j++) {
                    if (groups[i].Participants[j].UserId == firstParticipantUserId && groups[i].Participants[j].IsCurrentlyInGroup) {
                        // If a current user is not active for the selected group - create a new message group
                        for (var k = 0; k < groups[i].Participants.length; k++) {
                            if (groups[i].Participants[k].UserId == global.scopes.swapcast.swapSettings.UserProfile.UserId && !groups[i].Participants[k].IsCurrentlyInGroup) {
                                $scope.Requests.createMessageGroup(firstParticipantUserId);
                                break;
                            }
                        }

                        global.scopes.messages.messages.selectedGroup.GroupId = groups[i].GroupId;
                        $scope.Slide($scope.currentArea, '#block-my-secret-room');
                        global.scopes.messages.getMessages(groups[i].GroupId, true);

                        return;
                    }
                }
            }
        }

        $scope.Requests.createMessageGroup(firstParticipantUserId);
    };

    //accept invitation
    $scope.accept = function (id) {
        GoogleAnalyticsManager.tracker.sendEvent('FriendsView', 'AcceptFriendship');

        global.scopes.swapcast.Requests.acceptInvitation(id);

        var requests = global.scopes.swapcast.swapSettings.FriendshipRequests;

        for (var i = 0; i < requests.length; i++) {
            if (requests[i].UserId == id) {
                global.scopes.swapcast.safeApply(function () { global.scopes.swapcast.swapSettings.FriendshipRequests.splice(i, 1); });
                break;
            }
        }
    };
    
    //reject invitation
    $scope.reject = function (id) {
        GoogleAnalyticsManager.tracker.sendEvent('FriendsView', 'RejectFriendship');

        global.scopes.swapcast.Requests.rejectInvitation(id);
        var requests = global.scopes.swapcast.swapSettings.FriendshipRequests;
        for (var i = 0; i < requests.length; i++) {
            if (requests[i].UserId == id) {
                global.scopes.swapcast.safeApply(function () {
                    global.scopes.swapcast.swapSettings.FriendshipRequests.splice(i, 1);
                    return;
                });
            }
        }
    };
    
    $scope.showFriendProfile = function (userId, event) {
        GoogleAnalyticsManager.tracker.sendAppView('FriendProfileView');

        var evnt = event || window.event;
        evnt.stopImmediatePropagation();
        var friend = global.scopes.swapcast.swapSettings.Friends[userId];
        
        global.scopes.swapcast.friendProfile.UserId = userId;
        
        global.scopes.swapcast.friendProfile.Userpic = friend.Userpic;
        global.scopes.swapcast.friendProfile.Country = friend.Country;
        global.scopes.swapcast.friendProfile.City = friend.City;
        global.scopes.swapcast.friendProfile.FirstName = friend.FirstName;
        global.scopes.swapcast.friendProfile.LastName = friend.LastName;

        //if ($scope.swapSettings.EditingProfile.Userpic == null)
          //  $scope.swapSettings.EditingProfile.Userpic = 'img/userpic_default.png';

        global.scopes.swapcast.Slide(null, "#block-friend-profile");
        //check if exist place for new tab, logic when there is no free place.
        /*if ($('#liMyProfile').length == 0 && $('#liProfile').length == 0) {
            global.scopes.webBrowser.hideFirstDefaultTabIfSpaceNeeded();
        }
       
        $('#liProfile, #liMyProfile').remove();
        $(".tabsArea").find('li.activeTab').removeClass('activeTab');
        $(".tabsArea").find(".main-tab").removeClass('activeMainTab');

        HtmlUtils.addProfileTab();
        
        $("#liProfile").on("click", function () {
            GridManager.showGrid("#profileGrid");
        });

        $("#closeFriendProfile").on("click", function () {
            GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'CloseFriendProfile');

            GridManager.showGrid("#myHomeGrid");
            
            $(".tabsArea").find(".main-tab").addClass('activeMainTab');
            
            $("#liProfile").remove();
        });

        GridManager.showGrid("#profileGrid");
        
        $('.tableDivRight').animate({width: '50%'});*/
        
    };
    
    //Work with friends (Invite, Accept, Reject)
    $scope.friendsSearch = {
        search: function () {
            global.scopes.swapcast.Requests.searchUsers($scope.friendsSearch.searchString);
        },
        clean: function() {
            this.searchString = "";
            this.email = "";
            this.googleFriendsArray.length = 0;
            this.facebookFriendsArray.length = 0;
        },
        inviteFriendById: function (userId) {
            this.searchString = "";
            global.scopes.friends.friendsSearch.userId = userId;
            global.scopes.friends.friendsSearch.isInvitationById = true;

            $("#input-invitation-msg-text").val("");
            $("#invitationMessageModal").modal("show");
        },
        confirmInvitation: function () {
            $("#invitationMessageModal").modal("hide");
            
            if (global.scopes.friends.friendsSearch.isInvitationById) {
                GoogleAnalyticsManager.tracker.sendEvent('InvitationMessageModalView', 'InviteByUserId');

                if($("#input-invitation-msg-text").val() != "")
                    global.scopes.swapcast.Requests.inviteByUserIdEx(global.scopes.friends.friendsSearch.userId, $("#input-invitation-msg-text").val());
                else
                    global.scopes.swapcast.Requests.inviteByUserId(global.scopes.friends.friendsSearch.userId);
            } else {
                GoogleAnalyticsManager.tracker.sendEvent('InvitationMessageModalView', 'InviteByEmail');

                global.scopes.swapcast.Requests.inviteByEmailEx(global.scopes.friends.friendsSearch.email, $("#input-invitation-msg-text").val());
                global.scopes.friends.friendsSearch.email = "";
            }

            global.scopes.swapcast.Functions.showAlert("Successfully invited");
        },
        inviteFriendByEmail: function () {
            $("#input-invitation-msg-text").val("");

            if (Utils.validateEmail($scope.friendsSearch.email)) {
                global.scopes.friends.friendsSearch.isInvitationById = false;
                $("#invitationMessageModal").modal("show");
            } else {
                global.scopes.swapcast.Functions.showAlert("Email is not valid");
            }
        },
        inviteSocFriendByEmail: function(id) {
            $("#input-invitation-msg-text").val("");

            global.scopes.friends.friendsSearch.isInvitationById = false;

            this.email = id + '@facebook.com';
            
            $("#invitationMessageModal").modal("show");
        },
        showSocialProfile: function(id) {
            var socialPage = '';
            if( id.indexOf("://", 0) == -1) {
                socialPage = 'https://www.facebook.com/'+id;
            } else {
                socialPage = id;
            }
            global.scopes.webBrowser.AddNewTab(socialPage);
        },
        facebookFriends: function () {
            GoogleAnalyticsManager.tracker.sendEvent('AddFacebookFriendView', 'InviteFacebookFriend');
            // slide social friends  # todo: implement


            $('#block-my-facebook-friends').show().find('iframe').attr('src', 'http://apps.swapcast.com/Home/SocialPost');
            $('#my-home-div').hide();
            if (global.scopes.swapcast.isSmallWindow()) {
                $('#myHomeGrid').removeClass('hide').css({'display':'block'});
                
            }
            //$scope.Slide("", null);
            //global.scopes.webBrowser.AddNewTab('http://apps.swapcast.com/Home/SocialPost');
        },
        googlePlusFriends: function() {
            this.facebookFriendsArray.length = 0;
            googlePlusFriends();
        },
        facebookFriendsArray: new Array(),
        googleFriendsArray: new Array(),
        email: null,
        searchResult: new Array(),
        searchString: null,
        useName: true,
        userId: -1,
        isInvitationById: true
    };

    $scope.addFriendToQueue = function (userId, event) {
        if ($(event.target).hasClass("btn-invite-add-people-to-group"))
            $(event.target).removeClass("btn-invite-add-people-to-group").addClass("invited-add-people-to-group");
        else
            $(event.target).removeClass("invited-add-people-to-group").addClass("btn-invite-add-people-to-group");

        var listReps = 0;
        var orderInList;

        for (var i = 0; i < global.scopes.swapcast.friendsQueue.length; i++) {
            if (userId == global.scopes.swapcast.friendsQueue[i]) {
                listReps++;
                orderInList = i;
            }
        }

        if (listReps == 0) {
            global.scopes.swapcast.friendsQueue.push(userId);
        } else {
            global.scopes.swapcast.friendsQueue.splice(orderInList, 1);
        }
    };

    $scope.createMultipleGroup = function() {
        GoogleAnalyticsManager.tracker.sendEvent('NewChatView', 'CreateMultipleGroup');

        var groupTitle = $scope.MultipleGroup.GroupName;
        var participantUserIds = global.scopes.swapcast.friendsQueue;
        var existingGroups = global.scopes.swapcast.swapSettings.MessageGroups;

        if (participantUserIds.length > 0) {
            if (participantUserIds.length == 1) {
                for (var i = 0; i < existingGroups.length; i++) {
                    if (existingGroups[i].Participants.length == 2) {
                        for (var j = 0; j < existingGroups[i].Participants.length; j++) {
                            if (existingGroups[i].Participants[j].UserId == participantUserIds[0]) {
                                // Open the existing chat
                                global.scopes.swapcast.showGroup(existingGroups[i].GroupId);
                                return;
                            }
                        }
                    }
                }
            }

            global.scopes.swapcast.friendsQueue.push(global.scopes.swapcast.swapSettings.UserProfile.UserId);
            global.scopes.swapcast.Requests.createMessageGroupMultipleUsers(participantUserIds, groupTitle);
        } else {
            global.scopes.swapcast.Functions.showAlert("Group of Participants shouldn't be empty");
        }

        // Reset creating a new chat states
        global.scopes.swapcast.friendsQueue = [];

        $('#block-new-chat .invited-add-people-to-group').removeClass('invited-add-people-to-group').addClass('btn-invite-add-people-to-group');

        $scope.MultipleGroup.GroupName = "";
    };

    $scope.getFriendsCollection = function() {
        var friends = [];

        for (var i in global.scopes.swapcast.swapSettings.Friends)
            friends.push(global.scopes.swapcast.swapSettings.Friends[i]);

        return friends;
    };
}