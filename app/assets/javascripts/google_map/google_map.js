
var region_name;
var rows =[];
var geometries;


function initialize_the_map() {
   var map = MAP.initialize.google_map();
    MAP.google_fusiontables.load();
    REGION_OBJECTS.each_object().set_map_label(map);

}

google.maps.event.addDomListener(window, 'load', initialize_the_map);

