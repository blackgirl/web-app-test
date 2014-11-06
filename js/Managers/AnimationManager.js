var AnimationManager = {
    isAnimationNow: false,

    lock: function() {
        AnimationManager.isAnimationNow = true;
    },

    unlock: function () {
        AnimationManager.isAnimationNow = false;
    }
};

var ConferenceUiLocker = {
    isLock: false,
    messageId: null,

    lock: function () {
        ConferenceUiLocker.isLock = true;
    },

    unlock: function () {
        ConferenceUiLocker.isLock = false;
    }
};