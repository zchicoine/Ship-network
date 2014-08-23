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

            MAP.google_controller_methods.display_ports( result.coordinates , result.name, result.shipNumber)

        },
        error: function(xhr, ajaxOptions, thrownError){

            error_message_display($.parseJSON(xhr.responseText).errors);
        }
    });

}
