function snapshotController($scope) {

    global.scopes.snapshot = angular.element($('#takePhotoModal')).scope();
    
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

    $scope.isProfile = false;

    var _stream = null;
    var _video = null;
    $scope.isTakePictureModalOpen = false;
    
    $scope.patOpts = { x: 0, y: 0, w: 25, h: 25 };

    $scope.webcamError = false;
    $scope.onError = function (err) {
        $scope.$apply(
            function() {
                $scope.webcamError = err;
            }
        );
    };

    $scope.onStream = function (stream, videoElem) {
        setTimeout(function() {
            if (stream.ended)
                global.scopes.videoChat.conferenceManager.localStreamError("Camera is in use by another app");
        }, 500);
        
       _stream = stream;
       _video = videoElem;

       $scope.$apply(function () {
           $scope.patOpts.w = 200;
           $scope.patOpts.h = 200;
           $scope.showDemos = true;
       });
   };
    
    //Make snapshot
    $scope.makeSnapshot = function makeSnapshot() {
        if (!$scope.webcamError && _video) {
            GoogleAnalyticsManager.tracker.sendEvent('TakePhotoModalView', 'MakeSnapshot');

            var imageB64 = getBase64($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);

            if ($scope.isProfile)
                global.scopes.swapcast.swapSettings.EditingProfile.Userpic = imageB64;
            else {
                FileSendManager.sendPhoto(imageB64.replace('data:image/png;base64,', ''));
            }

            $("#takePhotoModal").modal('hide');
        }
    };

    // Get Base64 
    var getBase64 = function (x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = 200;
        hiddenCanvas.height = 200;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, 200, 200);

        return hiddenCanvas.toDataURL();
    };
   
    //Init 'Take Photo' Modal
    $("#takePhotoModal").modal({
        show: false
    });

    //Show 'Take a photo' Modal
    $scope.showTakePhotoModal = function (isProfile) {
        GoogleAnalyticsManager.tracker.sendEvent(isProfile ? 'MyProfileView' : 'ChatView', 'ShowTakePhotoModal');

        global.scopes.snapshot.safeApply(function () {
            global.scopes.snapshot.isTakePictureModalOpen = true;
            global.scopes.snapshot.isProfile = isProfile;
        });
        
        setTimeout(function () { $("#takePhotoModal").modal('show'); }, 1);
        
        setTimeout(function() {
            $("#takePhotoModal").bind('hidden.bs.modal', function() {
                $('#takePhotoModal').unbind('hidden.bs.modal');

                if (_stream != null) _stream.stop();

                var snapshotScope = global.scopes.snapshot;

                setTimeout(function () {
                    snapshotScope.$apply(function() {
                        snapshotScope.isTakePictureModalOpen = false;
                    });
                });
            });
        }, 1);
    };


}