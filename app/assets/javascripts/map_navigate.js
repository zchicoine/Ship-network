//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
$(window).load(function(){

	$("#right-img-responsive").click(function(){	
		 // window.map.panTo(new google.maps.LatLng(38.739391, 47.059104));
            window.map.panBy(150,0);
          //  control();



            var data_json = { "port_info": { "port_name": "Ronne", "port_coordinates": "123 Carrot Street" } };

//        // ajax parameters
        $.ajax({
            url:'side_bar/port',
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
	});


	$("#left-img-responsive").click(function(){	
			//alert("The paragraph was clicked.");
           window.map.panBy(-150,0);


         var data_json = { "region_info": { "name": "North America", "coordinates": "123 Carrot Street" } };
        //var data_json = { "ship_info": { "ship_name": "North America", "coordinates": "123 Carrot Street" } };

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
			
	});

		


});


