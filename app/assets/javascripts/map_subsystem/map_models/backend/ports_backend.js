
MAP.Models.Backend.ports_info = function(region_name){

    if(region_name == null || !(string_match(region_name)))
        error_message_display("Region" + region_name + "is not valid")

        var data_json = { "region_info": { "name": region_name } };
        // ajax parameters
       return $.ajax({
            url: 'google_map/port_coordinates',
            beforeSend: function () {
            },
            type: 'POST',
            data: data_json,
            error: function (xhr, ajaxOptions, thrownError) {

                error_message_display($.parseJSON(xhr.responseText).errors);
            }
        });



}