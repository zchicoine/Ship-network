//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
$(window).load(function () {

    $("#right-img-responsive").click(function () {

       region_objects_variable.return_object_region(current_region()).scroll_between_specific_areas();
    });


    $("#left-img-responsive").click(function () {

        region_objects_variable.return_object_region(current_region()).scroll_between_specific_areas();
    });


});


/*

 this is a function to set and get global values for arrays used
 to scroll in different ports on a region when zoomed in
 */
function Field(val) {
    var value = val;

    this.getValue = function () {
        return value;
    };

    this.setValue = function (val) {
        value = val;
        console.log(value);
    };
}