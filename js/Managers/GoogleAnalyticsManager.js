// TODO: Consider review
var GoogleAnalyticsManager = {
    service: null,
    tracker: {
        sendEvent: function (ev, details) { /* stub */ console.log("Track navigation: " + ev + " " + details); },
        sendAppView: function (viewname) { /* stub */ console.log("Track app view navigation: " + viewname); }
    },

    init: function () {
        /*
        // Initialize the Analytics service object with the name of your app.
        GoogleAnalyticsManager.service = analytics.getService('Swapcast');
        GoogleAnalyticsManager.service.getConfig().addCallback(GoogleAnalyticsManager.initAnalyticsConfig);

        // Get a Tracker using your Google Analytics app Tracking ID.
        GoogleAnalyticsManager.tracker = GoogleAnalyticsManager.service.getTracker('UA-51592851-2');

        // Record an "appView" each time the user launches your app or goes to a new
        // screen within the app.
        GoogleAnalyticsManager.tracker.sendAppView('SignUpView');

        GoogleAnalyticsManager.bindHandlers();
        */
    },

    initAnalyticsConfig: function (config) {
        config.setTrackingPermitted(true);
    },

    bindHandlers: function () {
        //$('.my-profile-dropdown-menu').on('click', function () { GoogleAnalyticsManager.tracker.sendAppView('ProfileDDL'); });
    }
};

$(function () {
    //GoogleAnalyticsManager.init();
});