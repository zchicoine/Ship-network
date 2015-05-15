/*
 TODO: change the file name to be more descriptive
  */

// TODO: all the global variables should be changes to be include under T_S_N
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


/**
 * T_S_N:  The Ship Network
 * Define one global var.
 * the following is taken from "Maintainable JavaScript by Nicholas Zakas(O’Reilly). Copyright 2012 Nicholas Zakas, 978-1-449-32768-2"
 */
var T_S_N;
T_S_N = {
    // assurance that the namespace only creat once.
    namespace: function (ns)
    {
        var parts = ns.split(".");
        var object = this;
        var i;

        for (i = 0; i < parts.length; i++) {

            if (!object[parts[i]]) {
                object[parts[i]] = {};
            }

            object = object[parts[i]];
        }
        return object;
    }
};


