function messagesController($scope) {
    // Dictionary of the images, downloaded from the server (screen capture)
    $scope.images = {};

    global.scopes.messages = angular.element($('#block-main-feed')).scope();

    $scope.Smiles = smileGroups[0].smiles;

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.smileGroups = smileGroups;
    $scope.unreadTotal = 0;
    $scope.message = { messageInput: "", groupMessageInput: "" };
    $scope.editorEnabled = false;
    $scope.sortedMessages = [];

    $scope.getMessages = function (selectedGroupId, scroll) {
        if (global.scopes.swapcast.swapSettings.Messages == null || global.scopes.swapcast.swapSettings.Messages.GroupData == undefined) return false;

        if (selectedGroupId == "NotSet") selectedGroupId = -1;

        var groupMessages = global.scopes.swapcast.swapSettings.Messages.GroupData[selectedGroupId];

        if (groupMessages == undefined) {
            $scope.sortedMessages = [];
            return false;
        }

        $scope.sortedMessages = groupMessages.DateInfo == null ? [] : groupMessages.DateInfo;

        if (selectedGroupId == -1 && scroll) $scope.scrollMainFeed();
    };

    //Get Date
    $scope.getDateForChatMessage = function (date) {
        return $scope.formatLastMessageDate(date);
    };

    $scope.changeSmilesGroup = function (groupIndex, $event) {
        $event.stopImmediatePropagation();

        for (var i in smileGroups) {
            $scope.smileGroups[i].isActive = false;
        }

        $scope.smileGroups[groupIndex].isActive = true;
        global.scopes.messages.safeApply(function () {
            global.scopes.messages.Smiles = smileGroups[groupIndex].smiles;
        });
    }

    $scope.isSmilesGroupActive = function (groupIndex) {
        return smileGroups[groupIndex].isActive;
    }

    $scope.addSmile = function (smile) {
        if ($scope.needToAddSmileFromComment) {
            var jActiveCommentTextArea = $('#' + $scope.activeCommentSmileDropDownList).find('textarea');

            var commentText = jActiveCommentTextArea.val();
            commentText += smile.text;

            jActiveCommentTextArea.val(commentText);
            jActiveCommentTextArea.focus();
            jActiveCommentTextArea[0].setSelectionRange(commentText.length, commentText.length);
        } else {
            var selectedGroupId = global.scopes.swapcast.messages.selectedGroup.GroupId;

            if (selectedGroupId != -1 && selectedGroupId != null) {
                if ($scope.message.groupMessageInput == undefined) $scope.message.groupMessageInput = "";
                $scope.message.groupMessageInput += smile.text;
                $('.my-secret-room-chat-block textarea').val($scope.message.groupMessageInput);
                $('.my-secret-room-chat-block textarea').focus();

                $('.my-secret-room-chat-block textarea').get(0).setSelectionRange($('.my-secret-room-chat-block textarea').val().length, $('.my-secret-room-chat-block textarea').val().length);
            } else {
                if ($scope.message.messageInput == undefined) $scope.message.messageInput = "";
                $scope.message.messageInput += smile.text;
                $('.main-feed-chat-block textarea').val($scope.message.messageInput);
                $('.main-feed-chat-block textarea').focus();

                $('.main-feed-chat-block textarea').get(0).setSelectionRange($('.main-feed-chat-block textarea').val().length, $('.main-feed-chat-block textarea').val().length);
            }
        }

        $scope.hideSmiles();
    };

    $scope.getClassForAvatarImage = function (msg) {
        if (msg.ConferenceInfo != null)
            return msg.ConferenceInfo.Type == ConferenceType.VideoChat ? "avatar-image-video-chat" : "avatar-image-screen-share";
        else
            return msg.File != null ? "avatar-image-file" : "avatar-image-link";
    };

    $scope.isLinkOrConference = function (msg) {
        if (msg.File != null || msg.ConferenceInfo != null || (msg.LinkUrl != null && msg.LinkUrl != ""))
            return true;
        else
            return false;
    };

    $scope.getCuttedText = function (text, count) {
        return text.length > count ? text.substr(0, count) + "..." : text;
    };

    $scope.isRawLink = function(linkTitle, linkUrl) {
        if(linkTitle)
        return linkTitle.replace('http://', '') == linkUrl || linkTitle.replace('http://www.', '') == linkUrl || linkTitle.replace('https://', '') == linkUrl || linkTitle.replace('https://www.', '') == linkUrl;
    };


    $scope._ensureMessageHtml = function (message) {
        if (message.messageHtml != null) return;

        var html = '';
        if (message.MessageText != null && message.MessageText != "") html = message.MessageText.replace("\n", "<br>");

        if (message.LinkUrl != null && message.LinkUrl != '') {
            if (message.LinkIconId != undefined && message.LinkIconId != null && global.scopes.swapcast.swapSettings.FavIcons[message.LinkIconId] != undefined && global.scopes.swapcast.swapSettings.FavIcons[message.LinkIconId].ImageData != null) {
                var favIcon = global.scopes.swapcast.swapSettings.FavIcons[message.LinkIconId].ImageData;
                html = '<div class="icon-left link-image"><img alt="" src="data:image/png;base64,' + favIcon + '"/></div><a rel="' + message.LinkUrl + '" title="' + message.LinkUrl + '">' + (message.LinkUrl.length > 60 ? (message.LinkUrl.substr(0, 60) + "...") : message.LinkUrl) + '</a><br/>';
                if (!$scope.isRawLink(message.LinkTitle, message.LinkUrl))
                    html+=message.LinkTitle;
            } else {
                html = '<a rel="' + message.LinkUrl + '"class="link-message-share" style="width:50%;" title="' + message.LinkUrl + '">' + (message.LinkUrl.length > 60 ? (message.LinkUrl.substr(0, 60) + "...") : message.LinkUrl) + '</a><br/><br/>';
                if (!$scope.isRawLink(message.LinkTitle, message.LinkUrl))
                    html+=message.LinkTitle;
            }
            if (message.MessageText != null && message.MessageText != "")
                html += message.MessageText;
        }
        else if (message.ConferenceInfo != null) {
            if (message.ConferenceInfo.Type == ConferenceType.VideoChat) {
                html = message.MessageText;
            } if (message.ConferenceInfo.Type == ConferenceType.ScreenSharing) {
                html = message.MessageText;
            }
        } else if (message.Image != null) {

            // format image thumbnail url 
            var imageUrl = global.scopes.swapcast.signalRServer + 'Image/GetFile?Id=' + message.Image;// + '&Width=' + 1024 + '&Height=' + 800;
            if ($('#container-left').width() <= 310) {
                var thumbUrl = global.scopes.swapcast.signalRServer + 'Image/GetFile?Id=' + message.Image + '&Width=' + 150 + '&Height=' + 150;
            } else {
                var thumbUrl = global.scopes.swapcast.signalRServer + 'Image/GetFile?Id=' + message.Image + '&Width=' + 200 + '&Height=' + 200;
            }
            html = "&nbsp;<a class='image-download image-thumbnail' href='" + imageUrl + "' rel='" + imageUrl + "' target='_blank' ><img class='image-thumbnail' src='" + thumbUrl + "'/></a>&nbsp;";

        } /* else if (message.File != null) {

            // format image thumbnail url 
            var dowbloadUrl = global.scopes.swapcast.signalRServer + 'File/DownLoad?File=' + message.File.FileId + '&Token=' + global.scopes.swapcast.AuthToken;

            // console.log(dowbloadUrl);

            var fname = message.File.FileName;
            if (fname == null || fname == "")
                fname = "Download file";
            if (!message.File.IsAvalible)
                html = "&nbsp;<span class='link-message-share' >" + fname + "</span>";
            else
                html = "&nbsp;<a class='file-download image-thumbnail' href='" + dowbloadUrl
                    + "' rel='" + dowbloadUrl
                    + "' data-FileId='" + message.File.FileId
                    + "' data-FileName='" + message.File.FileName
                    + "' data-FileSize='" + message.File.FileSize
                    + "' >" + message.File.FileName + "</a>";
        }*/
        else {
            html = message.MessageText;
            var smileGroups = $scope.smileGroups;

            if (html != null) {
                for (var j in smileGroups) {
                    for (var i in smileGroups[j].smiles) {
                        html = html.replace(smileGroups[j].smiles[i].text, "&nbsp;<img class='smile' src='" + smileGroups[j].smiles[i].link + "'/>&nbsp;");
                        if (smileGroups[j].smiles[i].alt != undefined)
                            html = html.replace(smileGroups[j].smiles[i].alt, "&nbsp;<img class='smile' src='" + smileGroups[j].smiles[i].link + "'/>&nbsp;");
                    }
                }
            }
            borderClass = "borderNormalMessage";
        }
        message.messageHtml = html;

    }

    $scope.getText = function (message) {
        $scope._ensureMessageHtml(message);

        var messageClass = "image";
        var messageSubClass = '';
        var borderClass = "border";

        //console.log("message getText:" + JSON.stringify(message));

        if (message.MessageText != null && message.MessageText != "") message.MessageText = message.MessageText.replace("\n", "<br>");

        if (message.LinkUrl != null && message.LinkUrl != '') {
            //messageClass = "link-share event";
            //messageSubClass = "message-link-share";
            borderClass = "li-link-share";
        }
        else if (message.ConferenceInfo != null) {
            borderClass = "border-conference-message";
            //if (message.ConferenceInfo.Type == ConferenceType.VideoChat) {
            //    messageClass = "video-chat-event event";
            //} if (message.ConferenceInfo.Type == ConferenceType.ScreenSharing) {
            //    messageClass = "share-screen-event event";
            //}
            //messageSubClass = "message-conference-share";
        } else if (message.Image != null) {
            //messageClass = "file-share event";
            //messageSubClass = "message-pic-share";
        } else if (message.File != null) {
            //messageClass = "file-share event";
            //messageSubClass = "message-link-share";
        } else {
            borderClass = "borderNormalMessage";
        }
        if (message.UserPosted == global.scopes.swapcast.swapSettings.UserProfile.UserId)
            borderClass += " border-my-message";
        return {
            MessageClass: messageClass,
            MessageSubClass: messageSubClass,
            MessageText: message.messageHtml,
            BorderClass: borderClass
        };
    };

    ////Get text for message
    //$scope.getText = function (message) {
    //    var messageClass = "image";
    //    var messageText = "";
    //    var borderClass = "border";

    //    if (message.MessageText != null)
    //        message.MessageText = message.MessageText.replace("\n", "<br>");

    //    var smileGroups = $scope.smileGroups;

    //    if (message.LinkUrl != null && message.LinkUrl != '') {
    //        var titleWithSmiles = "";

    //        if (typeof (message.LinkIconId) != 'undefined'
    //            && message.LinkIconId != null
    //            && typeof(global.scopes.swapcast.swapSettings.FavIcons[message.LinkIconId]) != 'undefined'
    //            && global.scopes.swapcast.swapSettings.FavIcons[message.LinkIconId].ImageData != null) {

    //            var favIcon = global.scopes.swapcast.swapSettings.FavIcons[message.LinkIconId].ImageData;
    //            messageText = '<div class="icon-left link-image"><img alt="" src="data:image/png;base64,' + favIcon + '"/></div><a rel="'
    //                + message.LinkUrl + '" title="' + message.LinkUrl + '">' +
    //                $scope.getCuttedText(message.LinkUrl, 50) + '</a><br/>';

    //            titleWithSmiles = message.LinkTitle;

    //            if ($scope.isRawLink(message.LinkTitle, message.LinkUrl) == false) {
    //                for (var n in smileGroups) {
    //                    for (var m in smileGroups[n].smiles) {
    //                        titleWithSmiles = titleWithSmiles.replace(smileGroups[n].smiles[m].text, "&nbsp;<img class='smile' src='" + smileGroups[n].smiles[m].link + "'/>&nbsp;");

    //                        if (smileGroups[n].smiles[m].alt != undefined)
    //                            titleWithSmiles = titleWithSmiles.replace(smileGroups[n].smiles[m].alt, "&nbsp;<img class='smile' src='" + smileGroups[n].smiles[m].link + "'/>&nbsp;");
    //                    }
    //                }
    //            }

    //            messageText +=
    //                ($scope.isRawLink(message.LinkTitle, message.LinkUrl) == false ? titleWithSmiles : '')
    //                + (message.MessageText != null ? message.MessageText : '');
    //        } else {
    //            messageText = '<a rel="' + message.LinkUrl + '" title="' + message.LinkUrl + '">'
    //                + $scope.getCuttedText(message.LinkUrl, 50) + '</a><br/><br/>';

    //            titleWithSmiles = message.LinkTitle;

    //            if ($scope.isRawLink(message.LinkTitle, message.LinkUrl) == false) {
    //                for (var p in smileGroups) {
    //                    for (var l in smileGroups[p].smiles) {
    //                        titleWithSmiles = titleWithSmiles.replace(smileGroups[p].smiles[l].text, "&nbsp;<img class='smile' src='" + smileGroups[p].smiles[l].link + "'/>&nbsp;");

    //                        if (smileGroups[p].smiles[l].alt != undefined)
    //                            titleWithSmiles = titleWithSmiles.replace(smileGroups[p].smiles[l].alt, "&nbsp;<img class='smile' src='" + smileGroups[p].smiles[l].link + "'/>&nbsp;");
    //                    }
    //                }
    //            }

    //            messageText +=
    //                ($scope.isRawLink(message.LinkTitle, message.LinkUrl) == false ? titleWithSmiles : '')
    //                + (message.MessageText != null ? message.MessageText : '');
    //        }

    //        borderClass = "li-link-share";
    //    }
    //    else if (message.ConferenceInfo != null) {
    //        if (message.ConferenceInfo.Type == ConferenceType.VideoChat) {
    //            messageText = message.MessageText;
    //        } else if (message.ConferenceInfo.Type == ConferenceType.ScreenSharing) {
    //            messageText = message.MessageText;
    //        }

    //        borderClass = "border-conference-message";
    //    }
    //    else if (message.Image != null && typeof (global.scopes.messages.images[message.Image]) == 'undefined') {
    //        global.scopes.messages.images[message.Image] = null; // mark image as null to prevent second downloading request

    //        // Download image from the server
    //        ImageDownloadManager.getBase64Image(message.Image, false);
    //    }
    //    else {
    //        messageText = message.MessageText;

    //        if (messageText != null) {
    //            for (var j in smileGroups) {
    //                for (var i in smileGroups[j].smiles) {
    //                    messageText = messageText.replace(smileGroups[j].smiles[i].text, "&nbsp;<img class='smile' src='" + smileGroups[j].smiles[i].link + "'/>&nbsp;");
    //                    if (smileGroups[j].smiles[i].alt != undefined)
    //                        messageText = messageText.replace(smileGroups[j].smiles[i].alt, "&nbsp;<img class='smile' src='" + smileGroups[j].smiles[i].link + "'/>&nbsp;");
    //                }
    //            }
    //        }

    //        borderClass = "borderNormalMessage";
    //    }

    //    if (message.UserPosted == global.scopes.swapcast.swapSettings.UserProfile.UserId)
    //        borderClass += " border-my-message";

    //    return {
    //        MessageClass: messageClass,
    //        MessageText: messageText,
    //        BorderClass: borderClass
    //    };
    //};

    //$scope.

    //Get message without group
    $scope.filterNonGroupMessages = function () {
        global.scopes.swapcast.scroll('#block-main-feed');
        return function (message) {
            return message.GroupId == null;
        };
    };

    $scope.scrollMainFeed = function () {
        setTimeout(function () {
            $('#block-main-feed .scrollable li').unbind('mouseover').unbind('mouseout').on('mouseover', function () {
                $(this).find('.remove-message').removeClass('hide');
            }).on('mouseout', function () {
                $(this).find('.remove-message').addClass('hide');
            });
        }, 500);

        $scope.scrollArea('#block-main-feed');
    };

    $scope.sendComment = function (messageId, event) {
        event = event || window.event;
        var textArea = $(event.target || event.srcElement).parents("div.comment-text-input").find('textarea');
        
        var commentText = textArea.val();

        if (commentText.trim() != '') {
            var linkStart = commentText.search(new RegExp('(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?'));

            var link = '';

            if (linkStart >= 0) {
                for (var i = linkStart; i < commentText.length; i++) {

                    if (commentText[i] == ' ') break;

                    link += commentText[i];
                }

                commentText = commentText.replace(link, '');
            }
        }

        commentText = commentText.trim();

        var comment;

        if (link != '') {
            comment = {
                CommentClientId: $scope.generateKey(),
                MessageId: messageId,
                LinkTitle: link,
                LinkUrl: link,
                CommentText: commentText
            };
        } else {
            comment = {
                CommentClientId: $scope.generateKey(),
                MessageId: messageId,
                CommentText: commentText
            };
        }
        // if comment is empty no action
        if (comment.CommentText != '' || (comment.LinkUrl != undefined && comment.LinkUrl != '')) {
            $scope.showPostedComment(comment);
            global.scopes.swapcast.Requests.postComment(comment);
        }
       
        
        textArea.val('');
        
        $scope.toggleCommentEditor(messageId);

        $scope.scrollArea('#block-main-feed');
    };

    // $scope.toggleCommentEditor = function (messageId) {
    //     var jComment = $('#' + messageId);
    //     var jMessage = $('.main-feed-chat-block').toggle();
    //     jComment.toggle();

    //     if (jComment.is(':visible')) {
    //         $('#block-main-feed div.scroll-block').css({'bottom':'0'});
    //         jComment.find('textarea').val('');
    //         // $scope.scrollMainFeed();
    //         jComment.find('textarea').focus();
    //     } else {
    //         $('#block-main-feed div.scroll-block').css({'bottom':'210px'});
    //     }
    // };
    $scope.toggleCommentEditor = function (messageId) {
        var jComment = $("#" + messageId);
        $('.comment-text-input:visible').not("#" + messageId).hide();
        jComment.toggle();
        jComment.find("textarea:visible").focus();
        jComment.find("textarea").on('focusin',function(){
            var $this = $(this);
            setTimeout(function(){
                var el = $('#block-main-feed').find('.scrollable:first');
                var allH = el.scrollTop();
                var H = $this.offset().top;
                var winH = document.body.clientHeight / 2;
                setTimeout(function(){
                    if(H > (winH - 70)) 
                        $('#block-main-feed').find('.scrollable:first').animate({
                            scrollTop: allH + H - 50
                        }, 1000);
                },400);
                // $(this).focus().val('');
            },200);
        });
        if($("#" + messageId).is(":visible")) {
            $("#block-main-feed div.scroll-block").css({'bottom':'0'});
            $('.main-feed-chat-block').hide();
        } else {
            $("#block-main-feed div.scroll-block").css({'bottom':'210px'});
            $('.main-feed-chat-block').show();
            $(".main-feed-chat-block").find('textarea').eq(0).blur();
        }
        // $('.main-feed-chat-block').toggle();
        $scope.hideSmiles();
    };

    $scope.openFavLink = function (favoriteUrl) {
        global.scopes.webBrowser.AddNewTab(favoriteUrl);
    };

    $scope.getCommentText = function (comment) {
        var commentText = "";

        var smileGroups = $scope.smileGroups;

        if (comment.CommentText != null && comment.CommentText != undefined) comment.CommentText = comment.CommentText.replace("\n", "<br>");
        else comment.CommentText = '';

        if (comment.LinkUrl != null && comment.LinkUrl != '') {
            commentText = '<a rel="' + comment.LinkUrl + '" class="chat-link" title="' + comment.LinkTitle + '" >' + comment.LinkTitle + '</a> ';
            // commentClass = "link-share event";
            $('.link-share').parent().find('.main-feed-content-all').css({ 'width': '40%' });

            var commentTextWithSmiles = comment.CommentText;

            if (commentTextWithSmiles != undefined) {
                for (var k in smileGroups) {
                    for (var l in smileGroups[k].smiles) {
                        commentTextWithSmiles = commentTextWithSmiles.replace(smileGroups[k].smiles[l].text, "&nbsp;<img class='smile' src='" + smileGroups[k].smiles[l].link + "'/>&nbsp;");
                        if (smileGroups[k].smiles[l].alt != undefined)
                            commentTextWithSmiles = commentTextWithSmiles.replace(smileGroups[k].smiles[l].alt, "&nbsp;<img class='smile' src='" + smileGroups[k].smiles[l].link + "'/>&nbsp;");
                    }
                }
            }

            commentText += commentTextWithSmiles;

        } else {
            commentText = comment.CommentText;

            if (commentText != null) {
                for (var j in smileGroups) {
                    for (var i in smileGroups[j].smiles) {
                        commentText = commentText.replace(smileGroups[j].smiles[i].text, "&nbsp;<img class='smile' src='" + smileGroups[j].smiles[i].link + "'/>&nbsp;");
                        if (smileGroups[j].smiles[i].alt != undefined)
                            commentText = commentText.replace(smileGroups[j].smiles[i].alt, "&nbsp;<img class='smile' src='" + smileGroups[j].smiles[i].link + "'/>&nbsp;");
                    }
                }
            }
        }

        return {
            commentText: commentText
        };
    };
    $scope.scrollChat = function () {
        setTimeout(function () {
            $('#block-my-secret-room .scrollable li').unbind('mouseover').unbind('mouseout').on('mouseover', function () {
                $(this).find('.remove-message').removeClass('hide');
            }).on('mouseout', function () {
                $(this).find('.remove-message').addClass('hide');
            });
        }, 500);

        $scope.scrollArea('#block-my-secret-room');
    };

    $scope.isNotInitiator = function (message) {
        return function (user) {
            return message.ConferenceInfo == null || message.ConferenceInfo.InitiatorPeer == null || user.UserId != message.ConferenceInfo.InitiatorPeer.UserId;
        };
    };

    $scope.scrollArea = function (area) {
        setTimeout(function () {
            global.scopes.swapcast.scroll(area);
        }, 500);
    };

    //Get message by group Id
    $scope.filterGroupMessages = function () {
        global.scopes.swapcast.scroll('#block-my-secret-room');
        return function (message) {
            return message.GroupId == global.scopes.swapcast.messages.selectedGroup.GroupId;
        };
    };

    $scope.filterNonDeleted = function () {
        return function (message) {
            return !message.IsDeleted;
        };
    };

    //Post message
    $scope.postMessage = function () {
        console.log('posting message');
        $scope.message.messageInput = $scope.message.messageInput.trim();

        $('.main-feed-chat-block textarea').val($scope.message.messageInput);

        if ($scope.message.messageInput != "") {
            var linkStart = $scope.message.messageInput.search(new RegExp('(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?'));
            var link = "";
            var i;

            if (linkStart > -1) {
                for (i = linkStart; i < $scope.message.messageInput.length; i++) {
                    if ($scope.message.messageInput[i] == " ") break;
                    link += $scope.message.messageInput[i];
                }
            }

            $scope.message.messageInput = $scope.message.messageInput.replace(link, "");

            var message;

            if (link != "") {
                message = {
                    "LinkTitle": link,
                    "LinkUrl": link,
                    "MessageText": $scope.message.messageInput,
                    "MessageClientId": $scope.generateKey(),
                    "UserPosted": global.scopes.swapcast.swapSettings.UserProfile.UserId
                };
            } else {
                message = {
                    "MessageText": $scope.message.messageInput.replace(/(\r\n|\n|\r)/gm, '<br/>'),
                    "MessageClientId": $scope.generateKey(),
                    "UserPosted": global.scopes.swapcast.swapSettings.UserProfile.UserId
                };
            }

            GoogleAnalyticsManager.tracker.sendEvent('AllFriendsView', 'PostMessage');

            global.scopes.swapcast.Requests.postMessage(message);

            $scope.message.messageInput = "";

            $('.main-feed-chat-block textarea').val("").blur();
        }
    };

    $scope.newLineFeed = function () {
        $scope.message.messageInput += "&#10;&#13;";
    };

    $scope.newLineGroups = function () {
        $scope.message.groupMessageInput += "&#10;&#13;";
    };

    //Post message in group
    $scope.postGroupMessage = function () {
        // alert($('.my-secret-room-chat-block textarea').val());
        $scope.message.groupMessageInput = $scope.message.groupMessageInput.trim();

        $('.my-secret-room-chat-block textarea').val($scope.message.groupMessageInput);

        if ($scope.message.groupMessageInput != "" && global.scopes.swapcast.messages.selectedGroup.GroupId != "") {
            var linkStart = $scope.message.groupMessageInput.search(new RegExp('(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?'));

            var link = "";

            if (linkStart >= 0) {
                for (var i = linkStart; i < $scope.message.groupMessageInput.length; i++) {
                    if ($scope.message.groupMessageInput[i] == " ") break;
                    link += $scope.message.groupMessageInput[i];
                }
            }

            $scope.message.groupMessageInput = $scope.message.groupMessageInput.replace(link, "");

            var message;

            if (link != "") {
                message = {
                    GroupId: $("#block-my-secret-room").is(':visible') ? global.scopes.swapcast.messages.selectedGroup.GroupId : -1,
                    "LinkTitle": link,
                    "LinkUrl": link,
                    "MessageText": $scope.message.groupMessageInput,
                    "MessageClientId": $scope.generateKey(),
                    "UserPosted": global.scopes.swapcast.swapSettings.UserProfile.UserId
                };
            } else {
                message = {
                    "GroupId": global.scopes.swapcast.messages.selectedGroup.GroupId,
                    "MessageText": $scope.message.groupMessageInput.replace(/(\r\n|\n|\r)/gm, '<br/>'),
                    "MessageClientId": $scope.generateKey(),
                    "UserPosted": global.scopes.swapcast.swapSettings.UserProfile.UserId
                };
            }

            GoogleAnalyticsManager.tracker.sendEvent('GroupChatView', 'PostMessage');

            global.scopes.swapcast.Requests.postMessage(message);

            $scope.message.groupMessageInput = "";

            $('.my-secret-room-chat-block textarea').val("").blur();
        }
    };

    $scope.startVideoChatButtonOnClick = function (isGroupSelected) {
        GoogleAnalyticsManager.tracker.sendEvent(isGroupSelected ? 'GroupChatView' : 'AllFriendsView', 'StartVideoChat');

        global.scopes.webBrowser.isGroupSelected = isGroupSelected;

        $scope.tryToStartVideoChat();
    };

    $scope.startScreenSharing = function (isGroupSelected) {
        GoogleAnalyticsManager.tracker.sendEvent(isGroupSelected ? 'GroupChatView' : 'AllFriendsView', 'StartScreenSharing');

        global.scopes.webBrowser.isGroupSelected = isGroupSelected;

        global.scopes.webBrowser.tryToStartScreenSharing();
    };

    $scope.tryToStartVideoChat = function () {
        // If user tries to create the same conference again
        if (global.scopes.videoChat._videoChatOpened
            && (global.scopes.videoChat._conferenceGroup == global.scopes.swapcast.messages.selectedGroup.GroupId)) {
            return;
        }

        // If user tries to start another conference when the current one is still running
        if ((global.scopes.videoChat._videoChatOpened || global.scopes.videoChat._screenOpened)
            && (global.scopes.videoChat._conferenceGroup != global.scopes.swapcast.messages.selectedGroup.GroupId && global.scopes.swapcast.messages.tempGroupId == undefined
                || global.scopes.swapcast.messages.tempGroupId != undefined && global.scopes.videoChat._conferenceGroup != global.scopes.swapcast.messages.tempGroupId)) {
            global.scopes.swapcast.needToJoinToConference = false;
            global.scopes.swapcast.needToOpenVideoChat = true;

            global.scopes.videoChat.showConferenceAlert();

            return;
        } else {
            $scope.startVideoChat();
        }
    };

    $scope.startVideoChat = function () {
        if (global.scopes.swapcast.messages.tempGroupId != undefined) global.scopes.swapcast.safeApply(function () {
            global.scopes.swapcast.messages.selectedGroup.GroupId = global.scopes.swapcast.messages.tempGroupId;
            global.scopes.swapcast.isGroupSelected = global.scopes.swapcast.messages.tempGroupId != -1;
            global.scopes.swapcast.messages.tempGroupId = undefined;


            if (global.scopes.swapcast.messages.selectedGroup.GroupId == -1)
                global.scopes.swapcast.Slide(global.scopes.swapcast.currentArea, "#block-main-feed");
            else
                global.scopes.swapcast.Slide(global.scopes.swapcast.currentArea, "#block-my-secret-room");

            global.scopes.messages.getMessages(global.scopes.swapcast.messages.selectedGroup.GroupId, true);
        });
        
        global.scopes.videoChat.openVideoChatAsInitiator(function () {
            // If need to open conference area
            if ($(".container-body").css('top') == '0px') {
                $('.container-body').animate({ top: SystemMessageManager.isOpened ? '322px' : '284px' });
                //$('.container-body').animate({ top: SystemMessageManager.isOpened ? '383px' : '345px' });
                //$('#topBar').animate({ top: SystemMessageManager.isOpened ? '324px' : '286px' });
            }

            var message = {
                GroupId: global.scopes.webBrowser.isGroupSelected ? global.scopes.swapcast.messages.selectedGroup.GroupId : -1,
                MessageText: "",
                ConferenceInfo: {
                    Type: 0
                },
                MessageClientId: $scope.generateKey(),
                UserPosted: global.scopes.swapcast.swapSettings.UserProfile.UserId
            };

            global.scopes.videoChat._conferenceGroup = message.GroupId;

            global.scopes.swapcast.Requests.postMessage(message);
        });
    };

    $scope.showMoreComments = function (message) {
        return message.Comments != null && message.Comments.length == 5 && message.CommentsCount > 5;
    };

    $scope.moreComments = function (messageId) {
        global.scopes.swapcast.Requests.getMessageComments(messageId);
    };

    $scope.isConnectionAllowed = function (message) {
        var conference = message.ConferenceInfo;
        if (conference == null) return true;
        if (!conference.IsActive) return false;
        if (global.scopes.swapcast.swapSettings.UserProfile == null || conference.InitiatorPeer != null && conference.InitiatorPeer.UserId == global.scopes.swapcast.swapSettings.UserProfile.UserId) return false;
        for (var i in conference.Peers) {
            if (conference.Peers[i].UserId == global.scopes.swapcast.swapSettings.UserProfile.UserId) return false;
        }
        return true;
    };

    $scope.isConferenceInvitation = function (message) {
        if (message.ConferenceInfo == null) return false;
        return true;
    };

    $scope.isImage = function (message) { return message.Image != null; };

    $scope.joinConference = function (message) {
        global.scopes.swapcast.removeInvitationSound(message.MessageId);
        global.scopes.videoChat.tryToJoinConference(message);
    };

    $scope.declineConference = function (message) {
        GoogleAnalyticsManager.tracker.sendEvent(message.GroupId == -1 ? 'AllFriendsView' : 'GroupChatView', 'DeclineConference');
        global.scopes.swapcast.removeInvitationSound(message.MessageId);
        global.scopes.swapcast.Requests.declineConference(message.MessageId);
    };

    //Edit group Title
    $scope.editGroupTitle = function () {
        $scope.Requests.updateMessageGroupTitle(global.scopes.swapcast.messages.selectedGroup.GroupId, global.scopes.swapcast.messages.selectedGroup.Title);
        $scope.editorEnabled = false;
    };

    $scope.setSelectedGroup = function (id) {
        global.scopes.swapcast.CloseDropDownMenu();

        if (id == undefined || id == "NotSet") id = -1;

        GoogleAnalyticsManager.tracker.sendAppView(id == -1 ? 'AllFriendsView' : 'GroupChatView');

        global.scopes.swapcast.messages.selectedGroup.GroupId = id;

        global.scopes.messages.getMessages(id, true);
    };

    $scope.getDateForOrder = function (group) {
        if (global.scopes.swapcast.swapSettings.Messages == null || typeof (global.scopes.swapcast.swapSettings.Messages.GroupData) == 'undefined') return 0;

        var groupData = global.scopes.swapcast.swapSettings.Messages.GroupData[group.GroupId];

        return typeof (groupData) != "undefined" && groupData.LastMessage != null ? new Date(groupData.LastMessage.DateSent).getTime() : 0;
    };

    $scope.isVideochat = function (message) {
        var conference = message.ConferenceInfo;
        if (conference.Type == 0) return true;
        return false;
    };

    $scope.formatLastMessageDate = function (strDate) {
        var msgMoment = moment.utc(strDate).local();

        var daysDiff = moment().diff(msgMoment, "days");

        if (daysDiff < 1) return msgMoment.format("HH:mm");

        if (daysDiff < 7) return msgMoment.format("ddd");

        return msgMoment.format("DD MMM");
    };

    $scope.getFirstNameByUserId = function (userId, groupId) {
        if (global.scopes.swapcast.swapSettings.UserProfile == null) return "";

        if (userId == global.scopes.swapcast.swapSettings.UserProfile.UserId) {
            return "Me";
        } else {
            for (var i in global.scopes.swapcast.swapSettings.Friends)
                if (global.scopes.swapcast.swapSettings.Friends[i].UserId == userId) return global.scopes.swapcast.swapSettings.Friends[i].FirstName;

            if (global.scopes.swapcast.swapSettings.MessageGroups == null) return "";

            var messageGroup = global.scopes.swapcast.swapSettings.MessageGroups.filter(function (x) { return x.GroupId == groupId; });

            if (messageGroup.length == 0) return "";

            for (var j in messageGroup[0].Participants) {
                if (messageGroup[0].Participants[j].UserId == userId) return messageGroup[0].Participants[j].FirstName;
            }
        }
    };

    $scope.getParticipantsFirstNames = function (participants) {
        return participants.reduce(function (prev, current, i) {
            return (i == 1 ? prev.FirstName : prev) + ', ' + current.FirstName;
        });
    };

    $scope.getGroupInfo = function (id) {
        var groups = global.scopes.swapcast.swapSettings.MessageGroups;

        if (global.scopes.swapcast.swapSettings.Messages == null || global.scopes.swapcast.swapSettings.Messages.GroupData == undefined) return false;

        var lastMessageText = "";

        var lastMessageDate = "";
        var lastMessageUsername = "";
        var groupData = global.scopes.swapcast.swapSettings.Messages.GroupData[id];

        if (typeof (groupData) != "undefined" && groupData != null) {
            if (groupData.LastMessage != null) {
                lastMessageText = groupData.LastMessage.Image != null ? "" : groupData.LastMessage.ConferenceInfo != null
                    ? ""
                    : (groupData.LastMessage.LinkUrl != null
                            ? ($scope.getFirstNameByUserId(groupData.LastMessage.UserPosted, id) + ": " + groupData.LastMessage.LinkUrl
                                + ($scope.isRawLink(groupData.LastMessage.LinkTitle, groupData.LastMessage.LinkUrl) ? '' : ' - ' + groupData.LastMessage.LinkTitle))
                            : ($scope.getFirstNameByUserId(groupData.LastMessage.UserPosted, id) + ": "
                                + (groupData.LastMessage.File == null ? groupData.LastMessage.MessageText : groupData.LastMessage.File.FileName))
                    );

                lastMessageDate = $scope.formatLastMessageDate(groupData.LastMessage.DateSent);
                lastMessageUsername = global.scopes.swapcast.getUserInfoById(groupData.LastMessage.UserPosted).UserName;
            }
        }

        var groupInfo;

        if (groups != null) {
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].GroupId == id)
                    groupInfo = groups[i];
            }
        }

        lastMessageText = lastMessageText.trim();

        if ($scope.endsWith(lastMessageText, "<br>")) {
            lastMessageText = lastMessageText.substr(0, lastMessageText.length - 4);
        }

        if ($scope.endsWith(lastMessageText, "<br/>")) {
            lastMessageText = lastMessageText.substr(0, lastMessageText.length - 5);
        }

        // Show first line of multiline message
        if (lastMessageText.indexOf('<br/>') != -1)
            lastMessageText = lastMessageText.substr(0, lastMessageText.indexOf('<br/>')) + "...";

        if (lastMessageText.indexOf('<br>') != -1)
            lastMessageText = lastMessageText.substr(0, lastMessageText.indexOf('<br>')) + "...";

        return {
            LastMessageDate: lastMessageDate,
            LastMessageUsername: lastMessageUsername,
            Title: typeof (groupInfo) == 'undefined' ? '' : (groupInfo.Title == null ? $scope.getParticipantsFirstNames(groupInfo.Participants) : groupInfo.Title),
            LastMessageText: lastMessageText
        };
    };

    $scope.getMainFeedMessages = function (selectedGroupId) {
        if (selectedGroupId == "NotSet") selectedGroupId = null;
        var mainFeedMessages = new Array();

        var messages = global.scopes.swapcast.swapSettings.Messages;
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].GroupId == selectedGroupId) {
                mainFeedMessages.push(messages[i]);
            }
        }

        //from another function
        $scope.messagesSortedByDate = new Array({ Date: "0", Messages: new Array() });


        for (var y = 0; y < mainFeedMessages.length; y++) {
            var isExist = false;
            var messageDate = (mainFeedMessages[y].DateSent).substring(0, 10);
            var dateTime = new Date(messageDate).getTime();
            for (var z = 0; z < $scope.messagesSortedByDate.length; z++) {
                if (messageDate == $scope.messagesSortedByDate[z].Date) {
                    $scope.messagesSortedByDate[z].NewDate = dateTime;
                    $scope.messagesSortedByDate[z].Messages.push(mainFeedMessages[y]);
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                $scope.messagesSortedByDate.push({ Date: messageDate, NewDate: dateTime, Messages: [mainFeedMessages[y]] });
            }
        }


        $scope.messagesSortedByDate.sort(function (a, b) {

            return (a.NewDate - b.NewDate);
        });

        $scope.messagesSortedByDate.splice(0, 1);


        //from another function
        return $scope.messagesSortedByDate;
    };

    $scope.removeMessage = function (messageId) {
        global.scopes.swapcast.Requests.deleteMessage(messageId);
    };

    $scope.queryMessages = function (dayCount) {
        var groupId = global.scopes.swapcast.messages.selectedGroup.GroupId;

        GoogleAnalyticsManager.tracker.sendEvent(groupId == -1 ? 'AllFriendsView' : 'GroupChatView', 'QueryMessages=' + dayCount);

        if (dayCount != null) {
            $('.days-menu .menu-item').removeClass('active');
            $('.days-menu .menu-item[rel="' + dayCount + '"]').addClass("active");
        }

        var date = new Date();

        if (dayCount == 0) {
            global.scopes.swapcast.Requests.queryUserDateMessagesEx(groupId, null, null);
        } else {
            var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (dayCount - 1));
            var finishDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

            global.scopes.swapcast.Requests.queryUserDateMessagesEx(groupId, startDate, finishDate);
        }
    };

    $scope.likeMessage = function (message) {
        if (!message.IsLiked) {
            global.scopes.swapcast.Requests.likeMessage(message.MessageId);
        }
    };

    $scope.dislikeMessage = function (message) {
        if (message.IsLiked) {
            global.scopes.swapcast.Requests.dislikeMessage(message.MessageId);
        }
    };

    $scope.setGroupToDayMessages = function () {
        $('.days-menu .menu-item').removeClass('active');
        $('.days-menu .menu-item[rel="1"]').addClass("active");
        var selectedGroup = global.scopes.swapcast.messages.selectedGroup.GroupId;
        if (global.scopes.swapcast.swapSettings.Messages == null) return false;
        var groupData = global.scopes.swapcast.swapSettings.Messages.GroupData[selectedGroup];
        if (groupData == undefined) return false;
        var dateInfo = groupData.DateInfo;

        if (dateInfo != null && dateInfo.length != 0) {
            dateInfo = dateInfo.slice(dateInfo.length - 1);
            global.scopes.swapcast.swapSettings.Messages.GroupData[selectedGroup].DateInfo = dateInfo;
        }
    };

    $scope.unreadExists = function () {
        return global.scopes.messages.unreadTotal != 0;
    };

    $scope.isUserMessage = function (message) {
        if (global.scopes.swapcast.swapSettings.UserProfile != null && message.UserPosted == global.scopes.swapcast.swapSettings.UserProfile.UserId)
            return true;
        return false;
    };

    $scope.MessageMouseOver = function (e) {
        $(angular.element(e.srcElement)).find('.remove-message').removeClass('hide');
    };

    $scope.MessageMouseOut = function (e) {
        $(angular.element(e.srcElement)).find('.remove-message').addClass('hide');
    };

    $scope.needToAddSmileFromComment = false;

    $scope.activeCommentSmileDropDownList = (void 0);

    $scope.toggleSmiles = function ($event, isComment) {
        GoogleAnalyticsManager.tracker.sendEvent('SmilesDDL', 'isComment=' + isComment);

        $scope.activeCommentSmileDropDownList = $($event.target).parent().attr('id');

        $scope.needToAddSmileFromComment = isComment;

        var offset = $($event.target).offset();

        $("#div-smile-triangle").show();
        $("#div-smile-triangle-top").hide();

        // if (isComment) {
        //     // Check opening direction
        //     if (offset.top > ($('#smile-dropdown').height() + 22)) {
        //         $('#smile-dropdown').css({
        //             top: (offset.top - $('#smile-dropdown').height() - 5) + "px",
        //             left: (offset.left - $('#smile-dropdown').width() + 99) + "px"
        //         });
        //     } else {
        //         // Under

        //         $("#div-smile-triangle").hide();
        //         $("#div-smile-triangle-top").show();

        //         $('#smile-dropdown').css({
        //             top: (offset.top + 35) + "px",
        //             left: (offset.left - $('#smile-dropdown').width() + 99) + "px"
        //         });
        //     }
        // } else {
            $('#smile-dropdown').css({
                top: (offset.top - $('#smile-dropdown').height() - 20) + "px",
                left: (offset.left - $('#smile-dropdown').width() + 99) + "px"
            });
        // }

        Utils.hideAllDropDownLists();
        $('#smile-dropdown').show();

        $event.stopImmediatePropagation();

        $("*").off("click", $scope.hideSmiles);
        $("*").not("#a-show-smiles, #smile-dropdown, #smile-dropdown ul, #smile-dropdown div, #smile-dropdown li, #smile-dropdown img").on("click", $scope.hideSmiles);
    };

    $scope.hideSmiles = function () {
        if ($("#smile-dropdown:visible").length > 0) {
            $("#smile-dropdown").hide();
            $("*").off("click", $scope.hideSmiles);
        }
    };

    $scope.sendFile = function () {
        GoogleAnalyticsManager.tracker.sendAppView('SendFileModalView');

        $('#fileSendForm input').trigger('click');
    };

    $('#fileSendForm input').off('change').on('change', function () {
        if ($(this).val() == '') return;

        var formData = new FormData($('#fileSendForm')[0]);

        var container;

        $.ajax({
            url: global.scopes.swapcast.signalRServer + 'File/Upload',
            type: 'POST',
            // Ajax events
            // Form data
            data: formData,
            // Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var xhrequest = new XMLHttpRequest();

                if (global.scopes.swapcast.currentArea == "#block-main-feed") {
                    container = $($.parseHTML("<div class='progress'><div class='loading'>Uploading...</div>" +
                        "<div style='width:100%;'><div class='progress-container'><div class='progress-bar'></div></div><div class='load-stop'></div></div>"));

                    $('#block-main-feed .main-feed-chat-block').before(container);
                }

                if (global.scopes.swapcast.currentArea == "#block-my-secret-room") {
                    container = $($.parseHTML("<div class='progress'><div class='loading'>Uploading...</div>" +
                        "<div style='width:100%;'><div class='progress-container'><div class='progress-bar'></div></div><div class='load-stop'></div></div>"));

                    $('#block-my-secret-room .my-secret-room-chat-block').before(container);
                }

                container.find('.load-stop').off('click').on('click', function () {
                    xhrequest.abort();

                    container.remove();

                    $('#fileSendForm input[type="file"]').val('');
                });

                xhrequest.upload.onprogress = function (evt) {
                    if (evt.lengthComputable) {
                        var progress = evt.loaded / evt.total * 100;

                        container.find('.progress-bar').css('width', progress + '%');
                        container.find('.loading').text('Uploading... ' + (progress | 0) + '%');
                    }
                };

                return xhrequest;
            },
            success: function (fileId) {
                // Post the message
                var message = {
                    GroupId: global.scopes.swapcast.messages.selectedGroup.GroupId,
                    File: { FileId: fileId },
                    MessageClientId: $scope.generateKey(),
                    UserPosted: global.scopes.swapcast.swapSettings.UserProfile.UserId
                };

                global.scopes.swapcast.Requests.postMessage(message);

                container.remove();

                $('#fileSendForm input[type="file"]').val('');
            }
        });
    });

    $scope.isFile = function (message) {
        return message.File != null;
    }

    $scope.getFileLink = function (message) {
        if (message.File.IsAvalible)
            return global.scopes.swapcast.signalRServer + 'File/Download?File=' + message.File.FileId + '&Token=' + global.scopes.swapcast.swapSettings.authToken;
        else {
            return "";
        }
    }

    $scope.downloadFile = function (message, $event) {
        var url = $scope.getFileLink(message);
        if (url == "") return;
        if (url.indexOf("://") == -1)
            url = "http://" + url;
        window.location = url;
        //var win = window.open(url, '_blank');
        //win.focus();

        //var container = $($event.target).parent();
        //container.children().hide();
        //container.append("<div class='progress progress-download'><div class='loading'>Downloading...</div>" +
        //    "<div style='width:100%;'><div class='progress-container progress-container-download'><div class='progress-bar'></div></div><div class='load-stop'></div></div>");

        //var fileName = $scope.getFileText(message);

        //chrome.fileSystem.chooseEntry({ type: "saveFile", suggestedName: fileName }, function(fileEntry) {

        //    if (typeof(fileEntry) == 'undefined') {
        //        container.find('.progress').remove();
        //        container.children().show();
        //        return;
        //    }

        //    var url = $scope.getFileLink(message);
        //    if (url == "") return;

        //    var xhr = new XMLHttpRequest();

        //    container.find('.load-stop').unbind('click').bind('click', function() {
        //        xhr.abort();
        //        container.find('.progress').remove();
        //        container.children().show();
        //        fileEntry.remove(function() {});
        //    });

        //    xhr.onreadystatechange = function () {
        //        if (this.readyState == 4 && this.status == 200) {
        //            //this.response is what you're looking for
        //            $scope.fileToSave = this.response;
        //            fileEntry.createWriter(function(writer) {
        //                writer.write($scope.fileToSave);
        //                $scope.fileToSave = undefined;
        //            });

        //            // Hide progress bar after success downloading
        //            container.find('.progress').remove();
        //            container.children().show();
        //        }
        //    }

        //    xhr.onprogress = function (evt) {
        //        if (evt.lengthComputable) {
        //            var progress = evt.loaded / evt.total * 100;
        //            container.find(".progress-bar").css('width', progress + '%');
        //            container.find(".loading").text("Downloading... " + (progress | 0) + "%");
        //        }
        //    };

        //    xhr.open('GET', url);
        //    xhr.responseType = 'blob';
        //    xhr.send();
        //});
    }

    $scope.getImageFileLink = function (message) {
        return global.scopes.swapcast.signalRServer + "File/DownloadImage?File=" + message.File.FileId + "&Token=" + global.scopes.swapcast.swapSettings.authToken;
    }

    $scope.getFileText = function (message) {
        if (message.File.IsAvalible)
            return message.File.FileName;
        else {
            return "File not available";
        }
    }

    $scope.sendPhoto = function ($event) {
        GoogleAnalyticsManager.tracker.sendEvent('TakePhotoModalView', 'SendPhoto');

        global.scopes.snapshot.showTakePhotoModal(false);
    }

    $scope.isImageFile = function (file) {
        if (typeof file.FileName == "undefined")
            return false;
        else
            return $scope.endsWith(file.FileName, ".png") || $scope.endsWith(file.FileName, ".gif") || $scope.endsWith(file.FileName, ".jpg") || $scope.endsWith(file.FileName, ".bmp") || $scope.endsWith(file.FileName, ".jpeg") ||
                $scope.endsWith(file.FileName, ".PNG") || $scope.endsWith(file.FileName, ".GIF") || $scope.endsWith(file.FileName, ".JPG") || $scope.endsWith(file.FileName, ".BMP") || $scope.endsWith(file.FileName, ".JPEG");
    }

    $scope.endsWith = function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    $('.main-feed-chat-block textarea').unbind('keyup').on('keyup', function () {
        global.scopes.messages.message.messageInput = $(this).val();
    });

    $('.my-secret-room-chat-block textarea').unbind('keyup').on('keyup', function () {
        global.scopes.messages.message.groupMessageInput = $(this).val();
    });

    $scope.generateKey = function() {
        return Math.random().toString(26).substr(2, 32);
    }

    $scope.showPostedComment = function (comment) {
        var group = global.scopes.swapcast.swapSettings.Messages.GroupData[-1];

        for (var i = 0; i < group.DateInfo.length; i++) {
            for (var j = 0; j < group.DateInfo[i].Messages.length; j++) {
                if (group.DateInfo[i].Messages[j].MessageId == comment.MessageId) {
                    if (group.DateInfo[i].Messages[j].Comments == null) {
                        group.DateInfo[i].Messages[j].Comments = [];
                    }

                    global.scopes.messages.safeApply(function () {
                        group.DateInfo[i].Messages[j].Comments[group.DateInfo[i].Messages[j].Comments.length] = comment;
                        group.DateInfo[i].Messages[j].CommentsCount++;
                    });

                    return;
                }
            }
        }
    };

    $scope.showPostedMessage = function(message) {
        var groupId = typeof(message.GroupId) != 'undefined' ? message.GroupId : -1;

        if (global.scopes.swapcast.swapSettings.Messages == null
            || typeof (global.scopes.swapcast.swapSettings.Messages.GroupData) == 'undefined') return;

        var groupData = global.scopes.swapcast.swapSettings.Messages.GroupData[groupId];

        if (typeof (groupData) == "undefined" || groupData == null)
            return;

        // If current day does not have messages, add array element for it
        if (groupData.DateInfo.length == 0 || groupData.DateInfo[groupData.DateInfo.length - 1].Date.substr(0, 10) != (new Date()).toFormattedString()) {
            groupData.DateInfo[groupData.DateInfo.length] = {
                Date: (new Date()).toFormattedString(),
                Messages: [],
                GroupId: groupId
            }
        }

        var messages = groupData.DateInfo[groupData.DateInfo.length - 1].Messages;

        messages[messages.length] = message;
    };

    String.prototype.padLeft = function (length, character) {
        return new Array(length - this.length + 1).join(character || ' ') + this;
    };

    Date.prototype.toFormattedString = function () {
        return [
            String(this.getFullYear()),
            String(this.getMonth() + 1).padLeft(2, '0'),
            String(this.getDate()).padLeft(2, '0')
        ].join("-");
    };
}