var MAP_Navigate;
MAP_Navigate = function(){

    this.enable_map_navigate  = true;
}

MAP_Navigate.default_map_navigate = function(region_name,default_area)
{
    var object_local = region_objects_variable.return_object_region(region_name);

    var json_arry_keys =  $.map(object_local.areas_coordinates, function(values,keys) {return keys;});
    var keyIndex =   json_arry_keys.indexOf(default_area);
    keyIndex = keyIndex < 0? 0: keyIndex;

    store_navigate_back =   json_arry_keys.at((keyIndex - 1)) ;
    store_navigate_now =  json_arry_keys[keyIndex];
    store_navigate_next = json_arry_keys.at((keyIndex + 1));
    var back =  object_local.areas_coordinates[store_navigate_back]['short_name'];
    var next =  object_local.areas_coordinates[store_navigate_next]['short_name'];


    MAP_Navigate.update_map_navigate_label_and_tooltip(back,next,store_navigate_back,store_navigate_next);
}

MAP_Navigate.update_map_navigate_label_and_tooltip = function(short_back,short_next,full_name_back,full_name_next){
    refresh_current_view(store_navigate_now);
    $("#right-img-responsive").attr("data-original-title", full_name_next);
    $("#left-img-responsive").attr("data-original-title", full_name_back);

    $("#left_of_the_map_label").html(short_back);
    $("#right_of_the_map_label").html(short_next);
}


var NAVIGATE_NEXT = 1;
var NAVIGATE_BACK = 0;


// jquery events
// Event performance http://api.jquery.com/on/ check this website when the event performance slow down
$(document).on('mousedown','#right-img-responsive',function(){

    if(MAP_Navigate.enable_map_navigate)
    {
        $(this).attr("src",image_map_navigate_right_down());
    }
});
$(document).on('mouseup','#right-img-responsive',function(){

    if(MAP_Navigate.enable_map_navigate)
    {
        region_objects_variable.return_object_region(current_region.value).scroll_between_specific_areas(NAVIGATE_NEXT);
        $(this).attr("src",image_map_navigate_right_default());
    }

});
$(document).on('mouseover','#right-img-responsive',function(){

    if(MAP_Navigate.enable_map_navigate)
    $(this).attr("src",image_map_navigate_right_hover());

});
$(document).on('mouseleave','#right-img-responsive',function(){

    if(MAP_Navigate.enable_map_navigate)
    $(this).attr("src",image_map_navigate_right_default());

});

// left
$(document).on('mousedown', "#left-img-responsive" , function () {

    if(MAP_Navigate.enable_map_navigate)
    {
        $(this).attr("src",image_map_navigate_left_down());
    }
});
$(document).on('mouseup','#left-img-responsive',function(){

    if(MAP_Navigate.enable_map_navigate)
    {
        region_objects_variable.return_object_region(current_region.value).scroll_between_specific_areas(NAVIGATE_BACK);
        $(this).attr("src",image_map_navigate_left_default());
    }

});
$(document).on('mouseover', "#left-img-responsive" , function () {

    if(MAP_Navigate.enable_map_navigate)
    $(this).attr("src",image_map_navigate_left_hover());

});
$(document).on('mouseleave', "#left-img-responsive" , function () {

    if(MAP_Navigate.enable_map_navigate)
    $(this).attr("src",image_map_navigate_left_default());

});
