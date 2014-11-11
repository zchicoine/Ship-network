

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
            region_objects_variable.each_object().set_map_label(map);

        }
         if(specification['layer'] == PORT_LEVEL  && specification['region_name'] != undefined){

           // region_objects_variable.return_object_region(specification['region_name']).change_region_view();
             MAP.google_controller_methods.display_ports(specification['region_name']);
             default_map_navigate(specification['region_name']);

        }
    }
}
//region_objects_variable.each_object().region_polygon_setOptions({'clickable':false});

