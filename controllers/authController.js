function authController($scope) {

    global.scopes.auth = angular.element($('#authController')).scope();

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

    //'Sign In' Modal
    $scope.SignInModal = {
        Email: "",
        Password: "",
        Remember: false
    };

    //'Sign Up' Modal
    $scope.SignUpModal = {
        Email: "",
        Password: "",
        Password2: "",
        FirstName: "",
        LastName: "",
        Country: "",
        City: ""
    };

    $scope.isLoginButtonPressed = false;

    $scope.showLoginProcess = false;

    $scope.IsAuthorized = function () {
        return global.scopes.swapcast.IsAuthorized();
    };
    $scope.showLoginArea = function () {
        return !$scope.showLoginProcess && !global.scopes.swapcast.IsAuthorized();
    };

    //'Password Recovery' Modal
    $scope.PasswordRecoveryModal = {
        Email: ""
    };

    //'Change Password' Recovery
    $scope.ChangePasswordModal = {
        CurrentPassword: "",
        NewPassword: "",
        ConfirmPassword: ""
    };

    // Start "Init UI elements"
    $("#signInModal").modal({
        show: false
    });

    $("#signUpModal").modal({
        show: false
    });

    $("#passwordRecoveryModal").modal({
        show: false
    });

    $("#changePasswordModal").modal({
        show: false
    });

    $("#closeImageProfileModal").modal({
        show: false
    });
    // End "Init UI elements"

    // Start- Initialize Client side Functions
    $scope.Functions = {
        continueSession: function () {
            if (window.location.hash != '' && window.location.hash != '#') {
                var publicShareReceiverId = window.location.hash.substring(1);
                var signIn = false;
                
                if (publicShareReceiverId.indexOf('/registration=') != -1) {
                    webAuthToken = publicShareReceiverId.substring(14);
                    global.scopes.swapcast.Requests.signInByWebAuth(webAuthToken);
                    signIn = true;
                }
                if (publicShareReceiverId.indexOf('/invitation=') != -1) {
                    publicShareReceiverId = publicShareReceiverId.substring(12);
                    global.scopes.swapcast.Requests.signInByInvitationEmail(publicShareReceiverId);
                    signIn = true;
                }
                if (publicShareReceiverId.indexOf('/') != -1 && signIn == false) {
                    console.log('link');
                    publicShareReceiverId = publicShareReceiverId.substring(1);
                    global.scopes.swapcast.Requests.signInByPublicShare(publicShareReceiverId);
                }
                // reset hash and forget it
                window.location.hash = '';
            } else {
                $scope.Functions.continueSessionUsingToken();
            }

        },
        //Continue session
        continueSessionUsingToken: function() {
            $scope.storage.get('authToken', function(obj) {
                var authToken = undefined;
                authToken = obj['authToken'];

                if (typeof authToken != 'undefined') {
                    $scope.storage.get('userName', function(name) {
                        var userName = undefined;
                        userName = name['userName'];

                        if (typeof userName != "undefined") {
                            global.scopes.swapcast.logInUserName = 'Welcome back, ' + userName;
                            $scope.showLoginProcess = true;
                            global.scopes.swapcast.Requests.continueSession(authToken);
                        } else {
                            //global.scopes.auth.Functions.showSignUpDialog();
                        }
                    });
                } else {
                    //global.scopes.auth.Functions.showSignUpDialog();
                }
            });
        },

        //Show Sign In Dialog
        showSignInDialog: function(isTopBar) {

            GoogleAnalyticsManager.tracker.sendAppView('SignInModalView');
            GoogleAnalyticsManager.tracker.sendEvent('LoginButtonPressed', isTopBar ? 'FromTopBar' : 'FromSignUpView');
            global.scopes.swapcast.CloseDropDownMenu();
            $('#signInModal').unbind('hidden.bs.modal').bind('hidden.bs.modal', function() {
                global.scopes.auth.Functions.hideSignInError();
            });

            $scope.storage.get('email', function(obj) {
                var email = undefined;
                email = obj['email'];

                if (!email) {
                    email = "";
                }

                $scope.storage.get('remember', function(obj) {
                    var remember = undefined;
                    remember = obj['remember'];

                    if (!remember) {
                        remember = false;
                    }
                    
                    $scope.safeApply(function () {
                        global.scopes.auth.SignInModal.Email = email;
                        global.scopes.auth.SignInModal.Password = "";
                        global.scopes.auth.SignInModal.Remember = remember == "true";
                    });
                });
            });
                    // show popup
                    $("#signInModal").modal("show");
        },

        //Submit 'Sign In'
        submitSignIn: function() {
            var email = $scope.SignInModal.Email;
            var password = $scope.SignInModal.Password;
            var remember = $scope.SignInModal.Remember;

            $scope.Functions.hideSignInError();

            if (email !== "" && password !== "") {
                var request = {
                    Email: email,
                    Password: password
                };

                if (remember) {
                    $scope.storage.set({ email: email }, function() {
                    });
                    $scope.storage.set({ remember: remember }, function() {
                    });
                } else {
                    $scope.storage.remove("email");
                    $scope.storage.remove("remember");
                }

                global.scopes.auth.isLoginButtonPressed = true;
                global.scopes.auth.showLoginProcess = true;

                GoogleAnalyticsManager.tracker.sendEvent('SignUpView', 'SignIn');

                global.scopes.swapcast.Requests.signIn(request);
            } else {
                $scope.Functions.showSignInError();
            }
        },

        showSignInError: function() {
            $('#signInModal .modal-body .invalid-input').css('visibility', 'visible');
            $('#signInModal .modal-body .signin-modal-input-container>input').css('border', '1px solid #cb6549');
        },

        hideSignInError: function() {
            $('#signInModal .modal-body .invalid-input').css('visibility', 'hidden');
            $('#signInModal .modal-body .signin-modal-input-container>input').css('border', '1px solid #cccccc');
        },

        //Show Sign Up Dialog
        showSignUpDialog: function (isModal) {
            console.log('SIGN UP SHOW');
            GoogleAnalyticsManager.tracker.sendEvent('SignUpButtonPressed', isModal ? 'FromTopBar' : 'FromSignInModalView');
            global.scopes.swapcast.CloseDropDownMenu();
          //  $(".tabsArea").find('li.activeTab').removeClass('activeTab');
            $("#signUpModal").modal("show");
            // No Grid Ability just modal
            /*if (isModal) {
                // show popup
              
            } else {
                $("#profileGrid, #browserGrid, #myHomeGrid").addClass("hide");
                $("#signUpGrid").removeClass("hide");
            }*/
        },
        //Submit 'Sign Up'
        submitSignUp: function() {
            var email = $scope.SignUpModal.Email;
            var password = $scope.SignUpModal.Password;
            var firstName = $scope.SignUpModal.FirstName;
            var lastName = $scope.SignUpModal.LastName;

            var errMess = "";
            if (email == null || email === "") {
                errMess += "Email shouldn't be empty\r\n";
            }

            if (password === "") {
                errMess += "Password shouldn't be empty\r\n";
            }

            if (firstName === "") {
                errMess += "First Name shouldn't be empty\r\n";
            }

            if (lastName === "") {
                errMess += "Last Name shouldn't be empty\r\n";
            }

            if (errMess === "") {
                var request = {
                    UserProfile: {
                        Email: email,
                        FirstName: firstName, //string. First name of the user 
                        LastName: lastName
                    },
                    UserPassword: password,
                };

                //$("#signUpGrid").addClass("hide");

                $scope.SignUpModal.Email = "";
                $scope.SignUpModal.Password = "";
                $scope.SignUpModal.FirstName = "";
                $scope.SignUpModal.LastName = "";

                GoogleAnalyticsManager.tracker.sendEvent('SignUpView', 'SignUp');

                global.scopes.swapcast.Requests.signUp(request);

                // When user signed up open Home page
                //global.scopes.webBrowser.Functions.showMyLibrary();
            } else {
                global.scopes.swapcast.Functions.showAlert(errMess);
            }
        },

        //show Password Recovery
        showPasswordRecovery: function() {
           // GoogleAnalyticsManager.tracker.sendAppView('PasswordRecoveryModalView');

            $("#passwordRecoveryModal").modal("show");
        },

        //Submit Password Recovery
        submitPasswordRecovery: function() {
            var email = $scope.PasswordRecoveryModal.Email;
            var errMess = "";
            if (email === "") {
                errMess += "Email shouldn't be empty\r\n";
            }
            if (email == undefined) {
                errMess += "Please enter valid email\r\n";
            }
            if (errMess === "") {
                GoogleAnalyticsManager.tracker.sendEvent('PasswordRecoveryModalView', 'RecoverPassword');

                global.scopes.swapcast.Requests.passwordRecover(email);

                $scope.PasswordRecoveryModal.Email = "";

                $("#passwordRecoveryModal").modal("hide");
            } else {
                global.scopes.swapcast.Functions.showAlert(errMess);
            }
        },

        //show Change Password Modal
        showChangePasswordModal: function() {
            GoogleAnalyticsManager.tracker.sendAppView('ChangePasswordModalView');

            // global.scopes.auth.safeApply(function() {
            //     $scope.ChangePasswordModal.CurrentPassword = '';
            //     $scope.ChangePasswordModal.NewPassword = '';
            //     $scope.ChangePasswordModal.ConfirmPassword = '';
            // });
            $scope.Functions.clearPasswordFields();
            global.scopes.swapcast.CloseDropDownMenu();
            $("#changePasswordModal").modal("show");
        },
        clearPasswordFields: function(){
            global.scopes.auth.safeApply(function() {
                $scope.ChangePasswordModal.CurrentPassword = '';
                $scope.ChangePasswordModal.NewPassword = '';
                $scope.ChangePasswordModal.ConfirmPassword = '';
            });
            $('.modal-body-password-change').find('input').val('');
        },

        //submit Change Password
        submitChangePassword: function() {
            var passwordOld = $scope.ChangePasswordModal.CurrentPassword;
            var password = $scope.ChangePasswordModal.NewPassword;
            var password2 = $scope.ChangePasswordModal.ConfirmPassword;

            var errMess = "";
            if (passwordOld === "") {
                errMess += "Old Password shouldn't be empty\r\n";
            }
            if (password === "") {
                errMess += "New Password shouldn't be empty\r\n";
            }
            if (password !== password2) {
                errMess += "New Passwords are not the same\r\n";
            }

            if (errMess === "") {
                GoogleAnalyticsManager.tracker.sendEvent('ChangePasswordModalView', 'ChangePassword');

                global.scopes.swapcast.Requests.changePassword(passwordOld, password);
            } else {
                global.scopes.swapcast.Functions.showAlert(errMess);
            }
        },

        //Submit Sign Out
        submitSignOut: function() {
            GoogleAnalyticsManager.tracker.sendEvent('ProfileDDL', 'SignOut');
            global.scopes.swapcast.CloseDropDownMenu();
            // Reset mobile and desktop tab IDs
            global.scopes.webBrowser.mobileTabId = null;
            global.scopes.webBrowser.desktopTabId = null;

            global.scopes.swapcast.logInUserName = '';

            $scope.showLoginProcess = false;

            if (global.scopes.videoChat._videoChatOpened) global.scopes.videoChat.closeVideoChat();

            if (global.scopes.videoChat._screenOpened) {
                global.scopes.videoChat.closeScreenSharing();

                // If a screen sharing tab is opened, close it
                if ($("#remoteScreenShareTab").length != 0)
                    StreamManager.closeScreenSharingTab();
            }

            global.scopes.swapcast.hideChatPannel();

           // $(".tabsArea").find(".main-tab").removeClass('activeMainTab');
           // $(".tabsArea").find("#liMyProfile").remove();

           // $(".grid").addClass('hide');

            global.scopes.swapcast.clearUserInputs();
            global.scopes.swapcast.Slide(null, '#block-chat');
            global.scopes.webBrowser.Functions.showChatsPage();
            global.scopes.swapcast.Requests.signOut();
            // need to wait for response from server or clear local data 
            $scope.Functions.showSignUpDialog(true);

            global.scopes.swapcast.areTabsLoaded = false;
        },
        showHomePage: function() {
            $("#myHomeGrid").css({'display':'block'});
            $("#container-left").css({'display':'none'});
            $('.home-mobile-item').css({'display':'none'});
            $('.chat-mobile-item').css({'display':'block'});
        },
        showChatsPage: function() {
            $("#myHomeGrid").css({'display':'none'});
            $("#container-left").css({'display':'block'});
            $('.home-mobile-item').css({'display':'block'});
            $('.chat-mobile-item').css({'display':'none'});
        },
        //show My Profile
        showMyProfile: function() {
            GoogleAnalyticsManager.tracker.sendAppView('MyProfileView');

            $scope.swapSettings.EditingProfile = $.extend(true, {}, $scope.swapSettings.UserProfile);

            if ($scope.swapSettings.EditingProfile.Userpic == null)
                $scope.swapSettings.EditingProfile.Userpic = 'img/userpic_default.png';

            $('#LoadImageProfile').unbind('change');
            $('#LoadImageProfile').change(function() {
                GoogleAnalyticsManager.tracker.sendEvent('MyProfileView', 'LoadImage');

                readURL(this);
                $(this).val('');
            });
            global.scopes.swapcast.CloseDropDownMenu();
            global.scopes.swapcast.Slide(null, "#block-my-profile");
            /*
            //check if exist place for new tab, logic when there is no free place.
            if ($('#liMyProfile').length == 0 && $('#liProfile').length == 0) {
                global.scopes.webBrowser.hideFirstDefaultTabIfSpaceNeeded();
            }

            $('#liProfile, #liMyProfile').remove();
            $(".tabsArea").find('li.activeTab').removeClass('activeTab');
            $(".tabsArea").find(".main-tab").removeClass('activeMainTab');

            HtmlUtils.addMyProfileTab();

            $(".tabsArea").find("#liMyProfile").on("click", function() {
                global.scopes.webBrowser.showProfile();
            });

            $("#closeProfile").on("click", function () {
                GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'CloseMyProfile');

                //Check, is there any changes in profile view
                var editProfile = $scope.swapSettings.EditingProfile;
                var userProfile = global.scopes.swapcast.swapSettings.UserProfile;

                if (editProfile.Email === userProfile.Email &&
                    editProfile.Password === userProfile.Password &&
                    editProfile.FirstName === userProfile.FirstName &&
                    editProfile.LastName === userProfile.LastName &&
                    editProfile.Country === userProfile.Country &&
                    editProfile.City === userProfile.City) {

                    $("#browserGrid").removeClass("hide");
                    $("#myProfileGrid").addClass("hide");

                    $(".tabsArea").find("#liMyProfile").remove();
                } else {
                    $("#saveProfileConfirmationModal").modal('show');

                    //logic when saveProfileConfirmation hide
                    $("#saveProfileConfirmationModal .close-modal").bind('click', function() {
                        $('#saveProfileConfirmationModal').unbind('click');

                        global.scopes.swapcast.safeApply(function() {
                            global.scopes.swapcast.swapSettings.EditingProfile = $.extend(true, {}, global.scopes.swapcast.swapSettings.UserProfile);
                        });

                        $('#saveProfileConfirmationModal').modal('hide');
                    });
                }
            });

            GridManager.showGrid("#myProfileGrid");
            */
            /* Changed myProfile & FriendProfile views by Chornaya */
            /*
            if ($('#splitter').hasClass("container-splitter")) {
                $('.tableDivRight').animate({ width: '50%' });
            } else {
                $('.tableDivRight').animate({ width: '60%' });
            }
            */
            /* !Changed myProfile & FriendProfile views by Chornaya */
        },

        showCloseImageProfileModal: function () {
            GoogleAnalyticsManager.tracker.sendAppView('DeleteImageProfileModalView');

            $("#closeImageProfileModal").modal("show");
        },

        //close Image profile
        closeImageProfile: function() {
            var swapcastScope = angular.element($('body')).scope();

            swapcastScope.safeApply(function() {
                swapcastScope.swapSettings.EditingProfile.Userpic = 'img/userpic_default.png';
                swapcastScope.swapSettings.EditingProfile.UserpicName = null;
            });

            $("#closeImageProfileModal").modal("hide");
        },

        //submit profile
        submitProfile: function() {
            var email = $scope.swapSettings.EditingProfile.Email;
            var firstName = $scope.swapSettings.EditingProfile.FirstName;
            var lastName = $scope.swapSettings.EditingProfile.LastName;
            var country = $scope.swapSettings.EditingProfile.Country;
            var city = $scope.swapSettings.EditingProfile.City;

            var errMess = "";
            if (email === "") {
                errMess += "Email shouldn't be empty\r\n";
            }
            if (firstName === "") {
                errMess += "First Name shouldn't be empty\r\n";
            }
            if (lastName === "") {
                errMess += "Last Name shouldn't be empty\r\n";
            }
            if (city === "") {
                errMess += "City shouldn't be empty\r\n";
            }

            if (errMess === "") {
                var request = {
                    UserProfile: {
                        UserId: global.scopes.swapcast.swapSettings.EditingProfile.UserId,
                        Password: $scope.swapSettings.EditingProfile.Password,
                        Email: email,
                        FirstName: firstName,
                        LastName: lastName,
                        Country: country,
                        City: city,
                        UserpicName: global.scopes.swapcast.swapSettings.EditingProfile.UserpicName
                    },
                };

                GoogleAnalyticsManager.tracker.sendEvent('MyProfileView', 'SaveProfile');

                global.scopes.swapcast.Requests.updateProfile(request);

                var body = global.scopes.swapcast;

                body.safeApply(function() {
                    angular.copy(body.swapSettings.EditingProfile, body.swapSettings.UserProfile);

                    body.usersImages[body.swapSettings.UserProfile.UserId] =
                        body.swapSettings.EditingProfile.UserpicName == null
                        ? body.swapSettings.EditingProfile.Userpic
                        : body.swapSettings.EditingProfile.Userpic;

                    // Update video chat avatar
                    $('[rel="' + body.swapSettings.UserProfile.UserId + '"] img, [data-rel="' + body.swapSettings.UserProfile.UserId + '"] img')
                        .attr('src', body.swapSettings.EditingProfile.Userpic);
                });

                global.scopes.swapcast.Functions.showAlert("Update was successful");
            } else {
                global.scopes.swapcast.Functions.showAlert(errMess);
            }

            $("#saveProfileConfirmationModal").modal('hide');
        },

        signUpGooglePlus: function() {

            googlePlusSignUp(function(userInfo) {
                global.scopes.swapcast.Requests.signUpGooglePlus(userInfo);
            });

            return false;
        },

        signUpFacebook: function() {

            facebookSignUp(function(userInfo) {
                global.scopes.swapcast.Requests.signUpFacebook(userInfo);
            });

            return false;
        }

    };

    $scope.showTakePhotoModal = function() {
        global.scopes.snapshot.showTakePhotoModal(true);
    };

    $scope.downloadDesktopClient = function() {
        GoogleAnalyticsManager.tracker.sendEvent('SignUpView', 'DownloadDesktopClient');

        var webBrowserScope = angular.element(document.getElementById("container-right")).scope();

        webBrowserScope.safeApply(function () {
            webBrowserScope.AddAndOpenNewTabUnlogined('http://www.swapcast.com/#Desktop', false);
        });
    };

    $scope.downloadMobileClient = function() {
        GoogleAnalyticsManager.tracker.sendEvent('SignUpView', 'DownloadMobileClient');

        var webBrowserScope = angular.element(document.getElementById("container-right")).scope();

        webBrowserScope.safeApply(function () {
            webBrowserScope.AddAndOpenNewTabUnlogined('http://www.swapcast.com/#Mobile', true);
        });
    };
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $("#userLogo").attr("src", e.target.result);

            var swapcastScope = angular.element($('body')).scope();

            swapcastScope.safeApply(function () {
                swapcastScope.swapSettings.EditingProfile.Userpic = e.target.result;
            });
        };
        reader.readAsDataURL(input.files[0]);
    }
}