(function() {
    // Back to Top 
    var backTop = document.getElementsById("backToTopBtn")[0],
        offset = 300, // browser window scroll (in pixels) after which the "back to top" link is shown
        offsetOpacity = 1200, //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        scrollDuration = 700,
        scrolling = false;

    if (backTop) {
        //update back to top visibility on scrolling
        window.addEventListener("scroll", function(event) {
            if (!scrolling) {
                scrolling = true;
                !window.requestAnimationFrame ?
                    setTimeout(checkBackToTop, 250) :
                    window.requestAnimationFrame(checkBackToTop);
            }
        });

        //smooth scroll to top
        backTop.addEventListener("click", function(event) {
            event.preventDefault();
            !window.requestAnimationFrame ?
                window.scrollTo(0, 0) :
                Util.scrollTo(0, scrollDuration);
        });
    }

    function checkBackToTop() {
        var windowTop = window.scrollY || document.documentElement.scrollTop;
        scrolling = false;
    }
})();