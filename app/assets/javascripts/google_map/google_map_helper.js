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

            display_ports( result.coordinates , result.name)
          //  alert(result.coordinates);

        },
        error: function(r){

            alert(r);
        }
    });

}
function send_data_to_get_ship_side_bar(port_name ){

    var data_json = { "port_info": { "port_name": port_name } };

//        // ajax parameters
    $.ajax({
        url:'google_map/display_ship_on_side_bar',
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
            $('.aside_ship_details_table_body').html(result.partial_page)
            $('.region_stats .triangle_image').addClass('closed_table')
            closed_table_side_bar()

            //display_ports( result.coordinates)
              //alert( result.number_ships);

        },
        error: function(r){

            alert(r.message);
        }
    });

}


function display_ports( port , port_name){
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
                title: port_name[i]

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
                send_data_to_get_ship_side_bar(marker.getTitle());
                marker.setIcon(iconClick);
            }

        })(marker, "  "));


        marker.setMap(map);

    }
}
