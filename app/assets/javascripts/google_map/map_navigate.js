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

function update_map_navigate_label_and_tooltip(back,next){
    $("#left_of_the_map_label").html(back);
    $("#right_of_the_map_label").html(next);

}