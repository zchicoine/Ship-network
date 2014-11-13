var NAVIGATE_NEXT = 1;
var NAVIGATE_BACK = 0;


$(document).on('click','#right-img-responsive',function(){


        region_objects_variable.return_object_region(current_region()).scroll_between_specific_areas(NAVIGATE_NEXT);

    });

$(document).on('click', "#left-img-responsive" , function () {


        region_objects_variable.return_object_region(current_region()).scroll_between_specific_areas(NAVIGATE_BACK);

    });



//function default_map_navigate(region_name){
//    var object_local = region_objects_variable.return_object_region(region_name);
//
//        json_arry_keys =  $.map(object_local.areas_coordinates, function(values,keys) {return keys;});
//        store_navigate_back =   json_arry_keys[(json_arry_keys.length - 1)] ;
//        store_navigate_now =  json_arry_keys[0];
//        store_navigate_next = json_arry_keys[1];
//
//   var back =  object_local.areas_coordinates[store_navigate_back]['short_name'];
//   var next =  object_local.areas_coordinates[store_navigate_next]['short_name'];
//
//
//   update_map_navigate_label_and_tooltip(back,next,store_navigate_back,store_navigate_next);
//
//}
var default_map_navigate = function(region_name , default_area)
{
    var object_local = region_objects_variable.return_object_region(region_name);

    json_arry_keys =  $.map(object_local.areas_coordinates, function(values,keys) {return keys;});
    var keyIndex =   json_arry_keys.indexOf(default_area);
    keyIndex = keyIndex < 0? 0: keyIndex;

    store_navigate_back =   json_arry_keys.at((keyIndex - 1)) ;
    store_navigate_now =  json_arry_keys[keyIndex];
    store_navigate_next = json_arry_keys.at((keyIndex + 1));
    console.log(store_navigate_next);
    var back =  object_local.areas_coordinates[store_navigate_back]['short_name'];
    var next =  object_local.areas_coordinates[store_navigate_next]['short_name'];


    update_map_navigate_label_and_tooltip(back,next,store_navigate_back,store_navigate_next);

}

function update_map_navigate_label_and_tooltip(short_back,short_next,full_name_back,full_name_next){
    refresh_current_view(store_navigate_now);
    $("#right-img-responsive").attr("data-original-title", full_name_next);
    $("#left-img-responsive").attr("data-original-title", full_name_back);

    $("#left_of_the_map_label").html(short_back);
    $("#right_of_the_map_label").html(short_next);
}