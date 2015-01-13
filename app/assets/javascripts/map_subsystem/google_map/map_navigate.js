var MapNavigate;
MapNavigate = function(){

    this.enable_map_navigate  = true;
    this.html_classes_ids = {
        left_image_id: "#left-img-responsive",
        right_image_id: "#right-img-responsive"
    }
}.once();

MapNavigate.prototype.default_map_navigate = function(region_name,default_area)
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


    this.update_map_navigate_label_and_tooltip(back,next,store_navigate_back,store_navigate_next);
}

MapNavigate.prototype.update_map_navigate_label_and_tooltip = function(short_back,short_next,full_name_back,full_name_next){

    refresh_current_view(store_navigate_now);

    $(this.html_classes_ids.right_image_id).attr("data-original-title", full_name_next);
    $(this.html_classes_ids.left_image_id).attr("data-original-title", full_name_back);
    $("#left_of_the_map_label").html(short_back);
    $("#right_of_the_map_label").html(short_next);

    if(this.enable_map_navigate)
    {
        $(this.html_classes_ids.right_image_id).attr("src",image_map_navigate_right_default());
        $(this.html_classes_ids.right_image_id).removeClass("thirty-percent-opacity");
        $(this.html_classes_ids.left_image_id).attr("src",image_map_navigate_left_default());
        $(this.html_classes_ids.left_image_id).removeClass("thirty-percent-opacity");

    }else
    {
        $(this.html_classes_ids.right_image_id).attr("src",image_map_navigate_right_disable());
        $(this.html_classes_ids.right_image_id).addClass("thirty-percent-opacity");
        $(this.html_classes_ids.left_image_id).attr("src",image_map_navigate_left_disable());
        $(this.html_classes_ids.left_image_id).addClass("thirty-percent-opacity");
    }
}

var MapNavigateInstance;
MapNavigateInstance = new MapNavigate();

///
var NAVIGATE_NEXT = 1;
var NAVIGATE_BACK = 0;


// jquery events
// Event performance http://api.jquery.com/on/ check this website when the event performance slow down
$(document).on('mousedown',MapNavigateInstance.html_classes_ids.right_image_id,function(){

    if(MapNavigateInstance.enable_map_navigate)
    {
        $(this).attr("src",image_map_navigate_right_down());
    }
});
$(document).on('mouseup',MapNavigateInstance.html_classes_ids.right_image_id,function(){

    if(MapNavigateInstance.enable_map_navigate)
    {
        region_objects_variable.return_object_region(current_region.value).scroll_between_specific_areas(NAVIGATE_NEXT);
        $(this).attr("src",image_map_navigate_right_default());
    }

});
$(document).on('mouseover',MapNavigateInstance.html_classes_ids.right_image_id,function(){

    console.log("here");
    if(MapNavigateInstance.enable_map_navigate)
    {
        $(this).attr("src",image_map_navigate_right_hover());
        $(this).removeClass("cursor-not-allowed");
        $(this).addClass("pointer");
    }
    else
    {
        $(this).removeClass("pointer");
        $(this).addClass("cursor-not-allowed");
    }

});
$(document).on('mouseleave',MapNavigateInstance.html_classes_ids.right_image_id,function(){

    if(MapNavigateInstance.enable_map_navigate)
    $(this).attr("src",image_map_navigate_right_default());

});

// left
$(document).on('mousedown',MapNavigateInstance.html_classes_ids.left_image_id, function () {

    if(MapNavigateInstance.enable_map_navigate)
    {
        $(this).attr("src",image_map_navigate_left_down());
    }
});
$(document).on('mouseup',MapNavigateInstance.html_classes_ids.left_image_id,function(){

    if(MapNavigateInstance.enable_map_navigate)
    {
        region_objects_variable.return_object_region(current_region.value).scroll_between_specific_areas(NAVIGATE_BACK);
        $(this).attr("src",image_map_navigate_left_default());
    }

});
$(document).on('mouseover', MapNavigateInstance.html_classes_ids.left_image_id , function () {

    if(MapNavigateInstance.enable_map_navigate)
    {
        $(this).attr("src",image_map_navigate_left_hover());
        $(this).removeClass("cursor-not-allowed");
        $(this).addClass("pointer");
    }
    else
    {
        $(this).removeClass("pointer");
        $(this).addClass("cursor-not-allowed");
    }

});
$(document).on('mouseleave', MapNavigateInstance.html_classes_ids.left_image_id , function () {

    if(MapNavigateInstance.enable_map_navigate)
    $(this).attr("src",image_map_navigate_left_default());

});
