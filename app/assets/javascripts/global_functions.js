var GLOBAL_LEVEL = 0;       var COME_FROM_START= 0;
var REGION_LEVEL = 1;       var COME_FROM_MAP = 1;
var PORT_LEVEL = 2;         var COME_FROM_MOTOR_VESSEL = 2;
var SHIP_LEVEL = 3;          var COME_FROM_SIDE_PANEL = 3;


// update the current view, we will update this function when we have a function that returns area names
// depending on the regions 
refresh_current_view = function(name){
    console.log(name);
    $(".current_view").html(name);
}




