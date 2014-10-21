

MAP.Controller = MAP.Controller || {


};

MAP.Controller.current_zoom_layer = function() {

    return new function(){
        if ( arguments.callee._singletonInstance )
            return arguments.callee._singletonInstance;
        arguments.callee._singletonInstance = this;
        // by default
        var layer_level = GLOBAL_LEVEL;
        this.get =  function(){
            return   layer_level;
        }
        this.set = function(layer){
            layer_level = layer;
            return this;
        }

    }
};


MAP.google_controller_methods = {

    display_ports: function (port,port_name,ship_number){
        // clear marker on the google_map
        MAP.google_methods.delete_all_marker();

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
            marker = MAP.initialize.google_marker(port_name[i],position,iconDefault,ship_number[i] + ' ship(s)',port_name);

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