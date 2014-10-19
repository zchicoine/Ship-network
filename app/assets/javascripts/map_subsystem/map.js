var MAP_DEFAULT_ZOOM = 2;
var MAP_MINZOOM = 2;
var   MAP_MAXZOOM = 4;
var MAP_DEFAULT_CENTER = [29.95,-90.06667];

var MAP;
MAP = MAP || {};

MAP = {
     listener_objects: {
         'click':{},
         'rightclick':{},
         'mouseover':{},
         "mouseout":{}
     },
    generate_ids: 0
}

MAP.properties = {
    options: function() {
        return {
            center: new google.maps.LatLng(MAP_DEFAULT_CENTER[0], MAP_DEFAULT_CENTER[1]),
            zoom: MAP_DEFAULT_ZOOM,
            disableDefaultUI: true,
            panControl: false,
            streetViewControl: false,
            setScrollable: false,
            scrollwheel: false,
            zoomControl: false,
            disableDoubleClickZoom: true,
            draggable: false,
            keyboardShortcuts: false,
            // never change the minimum zoom level from 1 to anything else
            minZoom: MAP_MINZOOM


        }
    },

    styles: function() {

         style =
                [{
                "featureType": "administrative.country",
                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "administrative.province",
                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "administrative.locality",
                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "road",

                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "transit",

                "stylers": [
                    { "visibility": "off" }
                ]
            }, {
                "featureType": "water",
                "elementType": "labels",

                "stylers": [
                    { "visibility": "off" }
                ]
            }]

        return style;
    },
    markers:[]





};



MAP.google_fusiontables = {

}


MAP.helper_methods = {

};

MAP.initialize = {

    google_map:function(){

        var google_map = new google.maps.Map(document.getElementById("googleMap"),MAP.properties.options());
        google_map.setOptions({styles: MAP.properties.styles()});

        this.get = function(){
            return google_map;
        }
        this.set = function(map){
            google_map = map;
            return this;
        }


    },
    create_polygon: function(paths,stroke_color,fill_color,object_unique_identifier){

       return new google.maps.Polygon({
            paths: paths,
            strokeColor: stroke_color,
            strokeOpacity: 0,
            strokeWeight: 1,
            fillColor:fill_color ,
            fillOpacity: 0.2,
            assigned_id: object_unique_identifier || MAP.generate_ids++,
            map:MAP.google_map()
        });
    },create_marker: function(id,position,default_icon,title,object_unique_identifier){


        var marker = new google.maps.Marker({
            id: id,
            position: position,
            icon: default_icon,
            title:  title,
            assigned_id: object_unique_identifier || MAP.generate_ids++,
            map:MAP.google_map()
        });
        MAP.properties.markers.push(marker);
        return marker;
    }



};

MAP.events ={

    rightclick: function(object,optional_function){
         google.maps.event.addListener(object, 'rightclick', function (e) {
             if(optional_function != undefined &&   typeof(optional_function) === 'function'  ){
                 function_options();
             }
         });
        if(object.assigned_id != undefined) {
            MAP.listener_objects["rightclick"][object.assigned_id] = object;
        }

    },
    click: function(object, optional_function){
        // click  event function for zooming in
        google.maps.event.addListener(object, 'click', function(e) {

           if(optional_function != undefined &&   typeof(optional_function) === 'function'  ){
               optional_function();
           }
        });
        if(object.assigned_id != undefined) {
            MAP.listener_objects["click"][object.assigned_id] = object;
        }
    },
    mouseover: function(object, optional_function) {
        // click  event function for zooming in
        google.maps.event.addListener(object, 'mouseover', function (e) {

            if (optional_function != undefined && typeof(optional_function) === 'function') {
                optional_function();
            }
        });
        if(object.assigned_id != undefined) {
            MAP.listener_objects["mouseover"][object.assigned_id] = object;
        }
    },
    mouseout: function(object, optional_function) {

        // click  event function for zooming in
        google.maps.event.addListener(object, 'mouseout', function (e) {

            if (optional_function != undefined && typeof(optional_function) === 'function') {
                optional_function();
            }
        });
        if(object.assigned_id != undefined) {
            MAP.listener_objects["mouseout"][object.assigned_id] = object;
        }
    }
};

MAP.state_information = {


    get_zoom:function(){
        return MAP.google_map().get_zoom();
    }

};


MAP.google_common_methods = {

    set_center: function(lat_lang){
        MAP.google_map().setCenter(lat_lang);
    },
    set_zoom: function(val){
        if(val >= MAP_MINZOOM && val <= MAP_MAXZOOM){
            MAP.google_map().setZoom(val);

        }
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

MAP.google_controller_methods = {
    get_port_coordinates: function(region_name){
        if( region_name.match(/[a-zA-Z]/i) ) {
            var data_json = { "region_info": { "name": region_name } };
            // ajax parameters
            $.ajax({
                url: 'google_map/port_coordinates',
                beforeSend: function () {
                },
                type: 'POST',
                data: data_json,
                complete: function (r) {

                },
                success: function (result) {

                    MAP.google_controller_methods.display_ports( result.coordinates , result.name, result.shipNumber)

                },
                error: function (xhr, ajaxOptions, thrownError) {

                    error_message_display($.parseJSON(xhr.responseText).errors);
                }
            });
        }else{
            error_message_display(region_name + "is not support by system");
        }
    },
    display_ports: function (port,port_name,ship_number){
        // clear marker on the google_map
        MAP.google_common_methods.delete_all_marker();

        var iconDefault = {
            url: image_port_on_map_default()
            // This marker is 20 pixels wide by 32 pixels tall.
            // The origin for this image is 0,0.
        };
        var iconHover = {
            url: image_port_on_map_hover()
            // This marker is 20 pixels wide by 32 pixels tall.
            // The origin for this image is 0,0.
        };
        var iconClick = {
            url: image_port_on_map_down()
            // This marker is 20 pixels wide by 32 pixels tall.
            // The origin for this image is 0,0.
        };

        for(var i=0;i < port.length;i++){

            var position = new google.maps.LatLng(port[i][0],port[i][1]);
            var infowindow = new google.maps.InfoWindow({maxWidth:200} );
            var content = "<div class='' >"+
                port_name[i] +' has ' + ship_number[i] + ' ship(s)' +
                "</div>";

          //  new google.maps.Size(20, 34), From Mohammed: why this line here?
                marker = MAP.initialize.create_marker(port_name[i],position,iconDefault,ship_number[i] + ' ship(s)',port_name);

            MAP.events.mouseover(marker,(function( marker,content) {
                return function() {
                    marker.setIcon(iconHover);
                    infowindow.setContent(content);
                    infowindow.open(MAP.google_map(),marker);
                }

            })(marker,content));

            MAP.events.mouseout(marker, (function( marker,content) {
                return function() {
                    // it allow clicking twice
                    if(marker.icon != iconClick) {
                        marker.setIcon(iconDefault);
                        infowindow.close(MAP.google_map(),marker);
                    }
                }

            })(marker, ""));
            MAP.events.click(marker,(function( marker,content) {
                return function() {
                    update_port_view(marker.id);
                    marker.setIcon(iconClick);

                }

            })(marker, content));


        }

    }
}

// if new_map is true then this function will reinitialize google map
MAP.google_map = function(new_map){
    new_map = typeof new_map !== 'undefined' ? new_map : false ;
    if ( arguments.callee._singletonInstance && !new_map)
        return arguments.callee._singletonInstance;

        arguments.callee._singletonInstance =  new MAP.initialize.google_map().get();
    return arguments.callee._singletonInstance;

}
