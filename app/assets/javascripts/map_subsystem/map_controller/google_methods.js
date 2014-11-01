


MAP.google_methods = {

    set_center: function(lat_lang){
        if( Object.prototype.toString.call( lat_lang ) === '[object Array]'){
            lat_lang = new google.maps.LatLng(lat_lang[0], lat_lang[1])
        }
        MAP.google_map().setCenter(lat_lang);
    },
    set_zoom: function(val){
        if(val >= MAP_MINZOOM && val <= MAP_MAXZOOM){
            MAP.google_map().setZoom(val);

        }
    },
    get_zoom:function(){
        return MAP.google_map().get_zoom();
    },
    delete_all_marker: function(){
        var markers = MAP.properties.markers;
        if (markers != undefined){
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }
        MAP.properties.markers = [];
    },
    clear_all_listeners:function(){
        for(var event in MAP.listener_objects){
            for (var object in MAP.listener_objects[event]){
                google.maps.event.clearInstanceListeners(MAP.listener_objects[event][object]);
            }

        }

    },clear_all_listeners_of_an_object:function(object_unique_identifier){
        for(var event in MAP.listener_objects){

            var temp_obj =  MAP.listener_objects[event][object_unique_identifier];

            if(temp_obj){
                google.maps.event.clearInstanceListeners(temp_obj);
                delete MAP.listener_objects[event][object_unique_identifier];
            }
        }
    }


}