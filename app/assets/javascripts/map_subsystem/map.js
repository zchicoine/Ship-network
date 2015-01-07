var MAP_DEFAULT_ZOOM = 2;
var MAP_MINZOOM = 2;
var   MAP_MAXZOOM = 6;
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
    google_polygon: function(paths,stroke_color,fill_color,object_unique_identifier){

       return new google.maps.Polygon({
            paths: paths,
            strokeColor: stroke_color,
            strokeOpacity: 0,
            strokeWeight: 1,
            fillColor:fill_color ,
            fillOpacity: 0.2,
            assigned_id: object_unique_identifier || MAP.generate_ids++
        });
    },google_marker: function(id,position,default_icon,title,object_unique_identifier){


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
        // assign the object to listener array
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
        // assign the object to listener array
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
        // assign the object to listener array
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
        // assign the object to listener array
        if(object.assigned_id != undefined) {
            MAP.listener_objects["mouseout"][object.assigned_id] = object;
        }
    }
};


// if new_map is true then this function will reinitialize google map
MAP.google_map = function(new_map){
    new_map = typeof new_map !== 'undefined' ? new_map : false ;
    if ( arguments.callee._singletonInstance && !new_map)
        return arguments.callee._singletonInstance;

        arguments.callee._singletonInstance =  new MAP.initialize.google_map().get();
    return arguments.callee._singletonInstance;

}
