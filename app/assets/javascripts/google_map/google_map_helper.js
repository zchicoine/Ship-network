function send_data_to_get_port_coordinates(regionName ){

    var data_json = { "region_info": { "name": regionName, "coordinates": "123 Carol" } };

//        // ajax parameters
    $.ajax({
        url:'google_map/port_coordinates',
        beforeSend: function(){

            // Handle the beforeSend event
        },
        type: 'POST',
        data:data_json,
        complete: function(r){
            // Handle the complete event
            // alert(r);

        },
        success: function(result) {
            console.log('1.1');
            text( result.coordinates)
          //  alert(result.coordinates);

        },
        error: function(r){

            alert(r);
        }
    });

}



function text( port){
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


    for(var i=0;i<port.length;i++){
      //  console.log(port[i][0]);
        var position = new google.maps.LatLng(port[i][0],port[i][1]);
          new google.maps.Size(20, 34),
            marker = new google.maps.Marker({
                position: position,
                map: map,
                icon: iconDefault,
                title: ', ~ ships'

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
                marker.setIcon(iconClick);
            }

        })(marker, "  "));


        marker.setMap(map);

    }
}
