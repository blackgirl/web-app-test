var NavigationHelper = {
    currentSlide : "#block-chat",


    slideTo: function (destSlide) {
        if (this._previousLocations == null)
            this._previousLocations = [];

        console.log("this.NavigateTo " + destSlide);
        if (destSlide == this.currentSlide)
            return;

        // save current location to history
        if (this.currentSlide != null) {
            if (this.currentSlide != null)
                this._previousLocations.push(this.currentSlide);
            this._previousLocation = this.currentSlide;
        }
        // do slide 
        this._doNavigate(destSlide);
    },

    slideBack: function () {
        if (this._previousLocations == null)
            this._previousLocations = [];

        var hash = this._previousLocations.pop();
        console.log("NavigateBack to " + hash);
        if (hash != null)
            this._doNavigate(hash);
        else 
            this._doNavigate("#/block-chat");
        
    },

    _doNavigate: function (destSlide) {
        global.scopes.swapcast.Slide(this.currentSlide, destSlide);

        this.currentSlide = destSlide;
    }

};