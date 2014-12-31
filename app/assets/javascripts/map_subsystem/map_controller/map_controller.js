

MAP.Controller = MAP.Controller || {


};

MAP.Controller.current_zoom_layer = {
        // default
        layer_level: GLOBAL_LEVEL,
        get value (){
            return   this.layer_level;
        },
        set value  (layer){
            this.layer_level = layer;

        }
};

MAP.google_controller_methods = {

    display_ports: function (region_name){

        if  (!string_match(region_name)){
               return "";
        }

        // clear marker on the google_map
        MAP.google_methods.delete_all_marker();
        MAP.Models.Backend.ports_info(region_name).done(function(data){

            var port = data.coordinates;
            var port_name = data.name;
            var ship_number = data.shipNumber;

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

                var _content_text = port_name[i] +' (' + ship_number[i] + ' ' + pluralize_word(ship_number[i],'ship','ships') + ' )';
                // add the text to the infobox div
                $("#mapInfoBox").htmlCustom(_content_text);
                var content = $("div.infobox-wrapper").html();

                var _infoBoxOpiion = {
                    alignBottom:true,
                    pixelOffset: new google.maps.Size(0,0), // The offset (in pixels) from the top left corner of the InfoBox (or the bottom left corner if the alignBottom property is true) to the map pixel corresponding to position.
                    closeBoxURL: "",
                    boxStyle: {
                        //background: "url(" + image_tipbox() + ") " + " no-repeat"

                    }
                };
                var infoBox_object = new InfoBox(_infoBoxOpiion);

                //  new google.maps.Size(20, 34), From Mohammed: why this line is here?
                marker = MAP.initialize.google_marker(port_name[i],position,iconDefault,_content_text,port_name);

                MAP.events.mouseover(marker,(function( marker,content) {
                    return function() {

                        marker.setIcon(iconHover);
                        infoBox_object.open(MAP.google_map(), marker);
                        infoBox_object.setContent(content);
                        // actual function is a plugin from dreamerslab.com
                        var _infoBox_width = $(infoBox_object.getContent()).actual( "innerWidth" , { clone : true });
                        var _infoBox_heigth= $(infoBox_object.getContent()).actual( "innerHeight" , { clone : true });

                        infoBox_object.pixelOffset_.width = - (_infoBox_width / 2);
                        infoBox_object.pixelOffset_.height = - _infoBox_heigth;
                    }
                })(marker,content));

                MAP.events.mouseout(marker, (function( marker,content) {
                    return function() {
                        // it allow clicking twice

                        marker.setIcon(iconDefault);
                        infoBox_object.close();

                    }
                })(marker, ""));
                MAP.events.click(marker,(function( marker,content) {
                    return function() {
                        // marker.id: port name
                        // Object.values() is a define in sugar.js library. Returns an array containing the values in obj.
                        var port_name = marker.id;
                        var port_coordinates = Object.values(marker.getPosition());

                        current_location.value = COME_FROM_MAP;
                      //  MAP.google_map().panTo(new google.maps.LatLng(port_coordinates[0], port_coordinates[1]));
                        MainViewGeneratorInstance.portView(port_name,port_coordinates);
                        marker.setIcon(iconClick);

                    }

                })(marker, content));

            }
        });
    }
}


/**
 * call this function when the map is not visible
 */
MAP.Controller.display_map_view = function()
{
// make sure the map is in place
    if($("#googleMap").length == 0){
        $.ajax({
            url:"google_map/index",
            type: 'POST',
            dataType: 'html',
            async:false,
            success: function(result) {
                $("#outer-map").html(result);

            },
            error: function(xhr, ajaxOptions, thrownError){

                error_message_display(thrownError)
            }
        });
    }
}









