var GridManager = {
    showGrid: function (cssSelectorToShow, cssSelectorToHide) {
        var additionalElementsToHide = typeof(cssSelectorToHide) == "undefined" ? "" : ", " + cssSelectorToHide;

        $(".grid" + additionalElementsToHide).addClass("hide");

        $(cssSelectorToShow).removeClass("hide");
    }
};