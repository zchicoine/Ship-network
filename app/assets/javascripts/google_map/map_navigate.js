var NAVIGATE_NEXT = 1;
var NAVIGATE_BACK = 0;


$(window).load(function () {

    $("#right-img-responsive").click(function () {
        // does not work after show the map
        region_objects_variable.return_object_region(current_region()).scroll_between_specific_areas(NAVIGATE_NEXT);

    });


    $("#left-img-responsive").click(function () {

        region_objects_variable.return_object_region(current_region()).scroll_between_specific_areas(NAVIGATE_BACK);

    });


});