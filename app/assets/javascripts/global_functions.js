var GLOBAL_LEVEL = 0;
var REGION_LEVEL = 1;
var PORT_LEVEL = 2;
var SHIP_LEVEL = 3;

// update the current view, we will update this function when we have a function that returns area names
// depending on the regions 
refresh_current_view = function(name){
    $(".current_view").html(name);
}



current_region = function(){

    var region_name =  $("#side_bar_header_region_name").text();
        return region_name.trim();
}

