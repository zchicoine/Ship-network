
var region_name;
var geometries;


function initialize_the_map() {
   var map = MAP.google_map();
    MAP.google_fusiontables.load();
    region_objects_variable.each_object().set_map_label(map);

}

google.maps.event.addDomListenerOnce(window, 'load', initialize_the_map);




/*
specification format = {layer: GLOBAL_LEVEL/REGION_LEVEL/PORT_LEVEL,
                        region_name: global/region_name,
                        port_name:

                          }
*/
function reload_the_map_with_specification(specification){


    if(specification != undefined){
        if(specification['layer'] == GLOBAL_LEVEL ){
            MAP.state_information.current_layer().set(GLOBAL_LEVEL);
            var map = MAP.google_map(true);// set to true to create new map
            MAP.google_fusiontables.load();
            region_objects_variable.each_object().set_map_label(map);

        }else if(specification['layer'] == REGION_LEVEL  && specification['region_name'] != undefined){
            MAP.state_information.current_layer().set(REGION_LEVEL);
            var map = MAP.google_map(true); // set to true to create new map
            MAP.google_fusiontables.load();
            region_objects_variable.each_object().set_map_label(map);

            region_objects_variable.return_object_region(specification['region_name']).change_region_view();
        }else if(specification['layer'] == PORT_LEVEL  && specification['region_name'] != undefined){
            MAP.state_information.current_layer().set(REGION_LEVEL);
            var map = MAP.google_map(true); // set to true to create new map
            MAP.google_fusiontables.load();
            region_objects_variable.each_object().set_map_label(map);
            region_objects_variable.return_object_region(specification['region_name']).change_region_view();
            update_port_view(specification['port_name']);
        }
    }
}