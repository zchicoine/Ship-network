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


function default_map_navigate(region_name){
    var object_local = region_objects_variable.return_object_region(region_name);

        json_arry_keys =  $.map(object_local.areas_coordinates, function(values,keys) {return keys;});
        store_navigate_back =   json_arry_keys[(json_arry_keys.length - 1)] ;
        store_navigate_now =  json_arry_keys[0];
        store_navigate_next = json_arry_keys[1];

   var back =  object_local.areas_coordinates[store_navigate_back]['short_name'];
   var next =  object_local.areas_coordinates[store_navigate_next]['short_name'];
   update_map_navigate_label_and_tooltip(back,next);

}

function update_map_navigate_label_and_tooltip(back,next){

    $("#left_of_the_map_label").html(back);
    $("#right_of_the_map_label").html(next);
}