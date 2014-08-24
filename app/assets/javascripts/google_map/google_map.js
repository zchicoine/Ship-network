
var region_name,z;
var rows =[];

    var country, geometries;




/*

attaching event listeners to every layer drawn onto the google_map for every country
*/
function event_listeners(country,region_name) {
    if(MAP.state_information.current_layer() == GLOBAL_LEVEL){
        MAP.events.mouseover(country,function(){
            country.setOptions({
                fillOpacity: 0.4
            });
        });
        MAP.events.mouseout(country,function(){
            country.setOptions({
                fillOpacity: 0.2
            });
        })
    }

}




function initialize_the_map() {
   MAP.initialize.google_map();
    MAP.google_fusiontables.load();



}

google.maps.event.addDomListener(window, 'load', initialize_the_map);

