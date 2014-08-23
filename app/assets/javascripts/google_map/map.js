var MAP_DEFAULT_ZOOM = 2;
var MAP_MINZOOM = 2;
var   MAP_MAXZOOM = 4;
var MAP_DEFAULT_CENTER = [33.818667, -43.759049];

var MAP;
MAP = MAP || {};
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


        load: function(){
            var script = document.createElement('script');
            var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
            url.push('sql=');
            var query = 'SELECT name, kml_4326 FROM ' +
                '1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ';
            var encodedQuery = encodeURIComponent(query);
            url.push(encodedQuery);
            url.push('&callback=drawMap');
            url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
            script.src = url.join('');
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(script);

    }


}
MAP.initialize = {


    load_google_map: function(){
        // set the map to the specified div
        window.map  = new google.maps.Map(document.getElementById("googleMap"),MAP.properties.options());
        // setting up custom map properties
        map.setOptions({styles: MAP.properties.styles()});
        MAP.initialize.events.click();
        MAP.initialize.events.rightclick();
        MAP.google_fusiontables.load();
        REGION_OBJECTS.each_object().set_map_label();


    }
};
MAP.initialize.events ={

    rightclick: function(){
         google.maps.event.addListener(map, 'rightclick', function (e) {
            // return to default
            initialize();
        });

    },
    click: function(){
        // click  event function for zooming in
        google.maps.event.addListener(map, 'click', function(e) {
            zval.setValue(3);
            next_region_name.setValue("South America");


        });
    }
};

MAP.google_common_methods = {

    set_cneter: function(lat_lang){
        window.map.setCenter(lat_lang);
    },
    set_zoom: function(val){
        if(val >= MAP_MINZOOM && val <= MAP_MAXZOOM){
            window.map.setZoom(val);
            zval.set(val);
        }
    },
    set_markers: function(markers) {
        if (markers != undefined){
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }
    },
    delete_markder: function(markers){
        if (markers != undefined){
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }
    }


}

MAP.google_controller_methods = {
    set_region_center: function (getClickedPostion,region_name,e){

            if(zval.get() == 3 && region_clicked_boolean.get() != 1){

                MAP.google_common_methods.set_cneter(getClickedPostion);
                update_region_view(region_name);
                region_clicked_boolean.set(1);

            }else{
                region_clicked_boolean.set(0);
                MAP.google_common_methods.set_zoom(4);
                send_data_to_get_port_coordinates(region_name);
                $('.region_labels').remove();

            }

    },

    display_ports: function (port , port_name , ship_number){
        MAP.google_common_methods.delete_markder( MAP.properties.markers);
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
                  //  map: map,
                    icon: iconDefault,
                    title:  ship_number[i] + ' ship(s)'

                });
           MAP.properties.markers.push(marker);
            google.maps.event.addListener(marker, 'mouseover', (function( marker,content) {
                return function() {
                    marker.setIcon(iconHover);
                    infowindow.setContent(content);
                    infowindow.open(map,marker);
                }

            })(marker,content));

            google.maps.event.addListener(marker, 'mouseout', (function( marker,content) {
                return function() {
                    // it allow clicking twice
                    if(marker.icon != iconClick) {
                        marker.setIcon(iconDefault);
                        infowindow.close(map,marker);
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
