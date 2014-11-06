function favoritesController($scope) {

    global.scopes.favorites = angular.element($('#favs')).scope();

    $scope.currentPage = 0;
    $scope.pageSize = 8;

    $scope.numberOfPages = function() {
         return Math.ceil(scope.swapSettings.Favorites.length / $scope.pageSize);
    };

    $scope.prev = function() {
        if ($scope.currentPage != 0)
            $scope.currentPage--;
    };

    $scope.next = function() {
        if ($scope.currentPage != $scope.numberOfPages() - 1)
            $scope.currentPage++;
    };

    //delete favorite link
    $scope.deleteFavoriteLink = function () {
        var request = {
            FavoriteId: global.scopes.favorites.favSelectedId
        };
        $scope.Requests.deleteFavorite(request);
        $('#favoritesDeleteModal').modal('hide');
    };

    $scope.confirmDeleteFavoriteLink = function (favoriteId) {
        //event.stopPropagation();
        global.scopes.favorites.favSelectedId = favoriteId;
        $('#favoritesDeleteModal').modal('show');
    };

    $scope.denyDeleteFavLink = function() {
        global.scopes.favorites.favSelectedId = 0;
        $('#favoritesDeleteModal').modal('hide');
    };

    $scope.getFavIconUrl = function(id) {
        return global.scopes.swapcast.getFaviconUrl(id);
    };

    $scope.getFavoriteUrl = function (favorite) {
        if (favorite.Url == null) return "about:blank";
        if (favorite.Url.indexOf("://") == -1)
            return "http://" + favorite.Url;
        return favorite.Url;
    };
    //open favorite link
    $scope.openFavLink = function (favoriteUrl) {
        GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'openFavLink=' + favoriteUrl);
        var url = favoriteUrl;
        if (favoriteUrl == null) url = "about:blank";
        if (url.indexOf("://") == -1)
            url = "http://" + url;
        //global.scopes.webBrowser.AddNewTab(favoriteUrl);
        var win = window.open(url, '_blank');
        win.focus();
        return false;
    };
    $scope.openFavorite = function (favorite) {
        GoogleAnalyticsManager.tracker.sendEvent('BrowserView', 'AddNewTab', 'FavoriteUrl', favorite.Url);

        //global.scopes.webBrowser.AddNewTab(favoriteUrl);
        var win = window.open($scope.getFavoriteUrl(favorite), '_blank');
        win.focus();
    };
    $scope.getDate = function (date) {
        var res = "";

        if (date != null) {
            if (date.length >= 19) {
                res = date.substring(0, 19).replace("T", " ");
            } else {
                res = date;
            }
        }

        return res;
    };

    $scope.showDayFavorites = function () {
        return global.scopes.swapcast.swapSettings.Favorites.some(function (fav) { return $scope.filterFunctions.day(fav); });
    };

    $scope.showWeekFavorites = function () {
        return global.scopes.swapcast.swapSettings.Favorites.some(function (fav) { return $scope.filterFunctions.week(fav); });
    };

    $scope.showTwoWeeksFavorites = function () {
        return global.scopes.swapcast.swapSettings.Favorites.some(function (fav) { return $scope.filterFunctions.twoweeks(fav); });
    };

    $scope.filterFunctions = {
        // this day
        day: function (favorite) {
            var now = Date.now() - 86400000;
            var favTime = Date.parse(favorite.DateCreated);

            if (favTime > now)
                return true;

            return false;
        },
        // this week
        week: function(favorite) {
            var now = Date.now() - 604800000;
            var favTime = Date.parse(favorite.DateCreated);

            if (favTime < Date.now() - 86400000 && favTime > (now - 1209600000))
                return true;

            return false;
        },
        // more than 2 weeks ago
        twoweeks: function(favorite) {
            var now = Date.now() - 1814400000;
            var favTime = Date.parse(favorite.DateCreated);

            if (favTime < now)
                return true;

            return false;
        }
    };

    $scope.showFavUrl = function(fav) {
        return fav.Title != fav.Url;
    };

    $scope.hasFavorites = function() {
        return swapSettings.Favorites && swapSettings.Favorites.length != 0;
    };

    $scope.showAddToFavoriteModal = function() {
        global.scopes.webBrowser.showAddToFavoriteModal();
    };

    // Show 'Share It' Modal
    $scope.showShareItModal = function (favorite) {
        global.scopes.webBrowser.showShareItModal(favorite);
    };
    //Send Sharing Link
    $scope.SendSharingLink = function () {
        global.scopes.webBrowser.SendSharingLink();
    };

}