function send_data_to_get_port_coordinates(regionName ){

    var data_json = { "region_info": { "name": regionName } };

        // ajax parameters
    $.ajax({
        url:'google_map/port_coordinates',
        beforeSend: function(){


        },
        type: 'POST',
        data:data_json,
        complete: function(r){


        },
        success: function(result) {

            display_ports( result.coordinates , result.name, result.shipNumber)


        },
        error: function(xhr, ajaxOptions, thrownError){

            error_message_display($.parseJSON(xhr.responseText).errors);
        }
    });

}


function display_ports( port , port_name , ship_number){
    // alert(port[0]);
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
        //  console.log( "length: " + port.length);
        var position = new google.maps.LatLng(port[i][0],port[i][1]);
        new google.maps.Size(20, 34),
            marker = new google.maps.Marker({
                id: port_name[i],
                position: position,
                map: map,
                icon: iconDefault,
                title: port_name[i] +" has " + ship_number[i] + " ship(s)"

            });

        google.maps.event.addListener(marker, 'mouseover', (function( marker,title) {
            return function() {
                marker.setIcon(iconHover);
            }

        })(marker, "  "));

        google.maps.event.addListener(marker, 'mouseout', (function( marker,title) {
            return function() {
                // it allow clicking twice
                if(marker.icon != iconClick) {
                    marker.setIcon(iconDefault);
                }
            }

        })(marker, "  "));
        google.maps.event.addListener(marker, 'click', (function( marker,title) {
            return function() {

              
                update_port_view(marker.id);
                marker.setIcon(iconClick);
            }

        })(marker, "  "));

        //marker.setMap(map);
       setMarkers(map,markerArray);

    }


}

function setMarkers(value,markerArray){
    var v = value;
    for(var i = 0; i < markerArray.length; ++i){
                markerArray[i].setMap(v);
                console.log('Setting markers');
            }
}