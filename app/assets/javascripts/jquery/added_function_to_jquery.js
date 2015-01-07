// taken from
// http://stackoverflow.com/questions/4911577/jquery-click-toggle-between-two-functions

(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];

        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };

    /**
     * this custom html function will be using instead of the regular function $.html()
     * The reason is that .html is being used wrong, read the following blog
     * http://www.joezimjs.com/javascript/jquery-html-youre-doing-it-wrong/
     *
     */
    $.fn.htmlCustom = function(string)
    {
        if(string)
        {
            //The .detach() method is the same as .remove(),
            // except that .detach() keeps all jQuery data associated with the removed elements.
            // This method is useful when removed elements are to be reinserted into the DOM at a later time.

            this.children().detach();
            this.html(string);
        }else
        {
            this.html();
        }
        return this;
    }
}(jQuery));