

var GoogleMapApp;
GoogleMapApp = function(){
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

  //  this.map = MAP.google_map();
};

GoogleMapApp.prototype.start = function(){
    google.maps.event.addDomListenerOnce(window, 'load', initialize_the_map);
}



function initialize_the_map() {


   var map = MAP.google_map();
    region_objects_variable.each_object().set_map_label(map);
    update_global();

}

// create an instance of google map app
var GoogleMapAppInstance = new GoogleMapApp();



/*

specification format = {new_map: false/true
                        layer: GLOBAL_LEVEL/REGION_LEVEL/PORT_LEVEL,
                        region_name: global/region_name,
                        port_name:

                          }
*/
function reload_the_map_with_specification(specification){


    if(specification != undefined){

        MAP.Controller.current_zoom_layer.value = specification['layer'];

        if(specification['new_map'] == true){

          var  map = MAP.google_map(specification['new_map']);
           // region_objects_variable.each_object().set_region_highlight_on_the_map();
            region_objects_variable.each_object().set_map_label(map);

        }
         if(specification['layer'] == REGION_LEVEL  && specification['region_name'] != undefined){
            zoom_to_region_level_map(specification['region_name']);

        }else if(specification['layer'] == PORT_LEVEL  && specification['region_name'] != undefined){

            region_objects_variable.return_object_region(specification['region_name']).change_region_view();
             default_map_navigate(specification['region_name']);

        }
    }
}

function zoom_to_region_level_map(region_name){

    MAP.Controller.current_zoom_layer.value = REGION_LEVEL;
    //region_objects_variable.each_object().region_polygon_setOptions({'clickable':false});
    region_objects_variable.return_object_region(region_name).change_region_view();
    default_map_navigate(region_name);
}


