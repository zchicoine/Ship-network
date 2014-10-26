
MAP.Models.Backend.ports_info = function(region_name){

    if(region_name == null || !(string_match(region_name)))
        error_message_display("Region" + region_name + "is not valid")

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



}