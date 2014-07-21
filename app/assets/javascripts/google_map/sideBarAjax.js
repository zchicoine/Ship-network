        function send_data_to_side_bar(regionName){

            console.log('In send_data_to_side_bar');
        var data_json = { "region_info": { "name": regionName, "coordinates": "123 Carol" } };

//        // ajax parameters
        $.ajax({
            url:'side_bar/region',
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

                $('.aside_ship_details_table_body').html(result);
            },
            error: function(r){
                alert(r.message);
            }
        });
    }

