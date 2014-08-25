var MAP_DEFAULT_ZOOM = 2;
var MAP_MINZOOM = 2;
var   MAP_MAXZOOM = 4;
var MAP_DEFAULT_CENTER = [33.818667, -43.759049];

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

    draw_on_the_map: function (data_from_fusiontable) {

        rows = data_from_fusiontable['rows'];

        for (var i in rows) {
            REGION_OBJECTS.each_object().extract_region_coordinates(rows[i][0],rows[i][1])
        }

        REGION_OBJECTS.each_object().set_region_highlight_on_the_map(MAP.initialize.google_map());

    },
    load: function(){
            var script = document.createElement('script');
            var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
            url.push('sql=');
            var query = 'SELECT name, kml_4326 FROM ' +
                '1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ';
            var encodedQuery = encodeURIComponent(query);
            url.push(encodedQuery);
            url.push('&callback=MAP.google_fusiontables.draw_on_the_map');
            url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
            script.src = url.join('');
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(script);

    }



}
MAP.helper_methods = {
    current_layer: function(){

        if ( arguments.callee._singletonInstance )
            return arguments.callee._singletonInstance;
        arguments.callee._singletonInstance = this;

        var layer_level = GLOBAL_LEVEL;
        this.get =  function(){
            return   layer_level;
        }
        this.set = function(new_layer_level){
            layer_level = new_layer_level;
            return this;
        }

    },

    create_google_map_object:function(){

        if ( arguments.callee._singletonInstance )
            return arguments.callee._singletonInstance;
        arguments.callee._singletonInstance = this;


        var google_map = new google.maps.Map(document.getElementById("googleMap"),MAP.properties.options());
        google_map.setOptions({styles: MAP.properties.styles()});


        this.get = function(){
            return google_map;
        }
        this.set = function(map){
            google_map = map;
            return this;
        }


    }


};

MAP.initialize = {

    google_map:function(){
        return new MAP.helper_methods.create_google_map_object().get();
    },
    create_polygon: function(paths,stroke_color,fill_color){
       return new google.maps.Polygon({
            paths: paths,
            strokeColor: stroke_color,
            strokeOpacity: 0,
            strokeWeight: 1,
            fillColor:fill_color ,
            fillOpacity: 0.2,
            assigned_id: MAP.generate_ids++,
            map:MAP.initialize.google_map()
        });
    }



};

MAP.events ={

    rightclick: function(object,optional_function){
         google.maps.event.addListener(object, 'rightclick', function (e) {
             if(optional_function != undefined &&   typeof(optional_function) === 'function'  ){
                 function_options();
             }
             MAP.listener_objects["rightclick"][object.assigned_id] = object;

         });

    },
    click: function(object, optional_function){
        // click  event function for zooming in
        google.maps.event.addListener(object, 'click', function(e) {

           if(optional_function != undefined &&   typeof(optional_function) === 'function'  ){
               optional_function();
           }

            MAP.listener_objects["click"][object.assigned_id] = object;


        });
    },
    mouseover: function(object, optional_function) {
        // click  event function for zooming in
        google.maps.event.addListener(object, 'mouseover', function (e) {

            if (optional_function != undefined && typeof(optional_function) === 'function') {
                optional_function();
            }

            console.log(object.assigned_id);

            MAP.listener_objects["mouseover"][object.assigned_id] = object;




        });
    },
    mouseout: function(object, optional_function) {
        // click  event function for zooming in
        google.maps.event.addListener(object, 'mouseout', function (e) {

            if (optional_function != undefined && typeof(optional_function) === 'function') {
                optional_function();
            }
            MAP.listener_objects["mouseout"][object.assigned_id] = object;

        });
    }
};

MAP.state_information = {
    current_layer: function() {
        return  new MAP.helper_methods.current_layer();
    },

    get_zoom:function(){
        return MAP.initialize.google_map.get_zoom()
    }

}



MAP.google_common_methods = {

    set_center: function(lat_lang){
        MAP.initialize.google_map().setCenter(lat_lang);
    },
    set_zoom: function(val){
        if(val >= MAP_MINZOOM && val <= MAP_MAXZOOM){
            MAP.initialize.google_map().setZoom(val);

        }
    },
    set_markers: function(markers) {
        if (markers != undefined){
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(MAP.initialize.google_map());
            }
        }
    },
    delete_marker: function(markers){
        if (markers != undefined){
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }
    },
    clear_all_listeners:function(){
        for(var event in MAP.listener_objects){
            for (var object in MAP.listener_objects[event]){
                google.maps.event.clearInstanceListeners(MAP.listener_objects[event][object]);
            }

        }

    }


}

MAP.google_controller_methods = {
    set_region_center: function (getClickedPostion,region_name,e){

//            if(zval.get() == 3 && region_clicked_boolean.get() != 1){
//
//                MAP.google_common_methods.set_center(getClickedPostion);
//
//                region_clicked_boolean.set(1);
//                MAP.google_common_methods.set_zoom(4);
//
//                REGION_OBJECTS.return_object_region(region_name).change_region_view();
//            }else{
//                region_clicked_boolean.set(0);
//                MAP.google_common_methods.set_center(getClickedPostion);
//                MAP.google_common_methods.set_zoom(4);
//
//
//                $('.region_labels').remove();
//
//            }

    },

    display_ports: function (port , port_name , ship_number){
        // clear marker on the google_map
        MAP.google_common_methods.delete_marker( MAP.properties.markers);
        MAP.properties.markers = [];

        var iconDefault = {
            url: 'assets/google_map/but_default_24.png'
            // This marker is 20 pixels wide by 32 pixels tall.

            // The origin for this image is 0,0.

        };
        var iconHover = {
            url: 'assets/google_map/but_hover_24.png'
            // This marker is 20 pixels wide by 32 pixels tall.

            // The origin for this image is 0,0.

        };
        var iconClick = {
            url: 'assets/google_map/but_down_24.png'
            // This marker is 20 pixels wide by 32 pixels tall.

            // The origin for this image is 0,0.

        };


        for(var i=0;i < port.length;i++){

            var position = new google.maps.LatLng(port[i][0],port[i][1]);
            var infowindow = new google.maps.InfoWindow({maxWidth:200} );
            var content = "<div class='' >"+
                port_name[i] +' has ' + ship_number[i] + ' ship(s)' +
                "</div>";

            new google.maps.Size(20, 34),
                marker = new google.maps.Marker({
                    id: port_name[i],
                    position: position,
                  //  google_map: google_map,
                    icon: iconDefault,
                    title:  ship_number[i] + ' ship(s)'

                });
           MAP.properties.markers.push(marker);
            google.maps.event.addListener(marker, 'mouseover', (function( marker,content) {
                return function() {
                    marker.setIcon(iconHover);
                    infowindow.setContent(content);
                    infowindow.open(MAP.initialize.google_map(),marker);
                }

            })(marker,content));

            google.maps.event.addListener(marker, 'mouseout', (function( marker,content) {
                return function() {
                    // it allow clicking twice
                    if(marker.icon != iconClick) {
                        marker.setIcon(iconDefault);
                        infowindow.close(MAP.initialize.google_map(),marker);
                    }
                }

            })(marker, ""));
            google.maps.event.addListener(marker, 'click', (function( marker,content) {
                return function() {


                    update_port_view(marker.id);
                    marker.setIcon(iconClick);

                }

            })(marker, content));




        }

        MAP.google_common_methods.set_markers( MAP.properties.markers);
    }
}

