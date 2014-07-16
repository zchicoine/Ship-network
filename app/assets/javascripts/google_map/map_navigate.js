//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
var region_layer_array = [
				new google.maps.LatLng(52.370216,4.895168),
//new orleans
new google.maps.LatLng(29.951066,-90.071532),
//Recalada
new google.maps.LatLng(-34.786878,-55.883175),
//lagos
new google.maps.LatLng(6.524379,3.379206),
//muskat
new google.maps.LatLng(23.610000,58.540000)
//
];
var i=0;
$(window).load(function(){

	$("#outer-map").click(function(e){
	   e.preventDefault();
	   e.stopImmediatePropagation();
	});

	$("#right-img-responsive").click(function(){	
		if(this.id=='right-img-responsive' && i!=(location_array.length-1))
			{

			window.map.setCenter(region_layer_array[i]);
			window.map.setZoom(3);
			i++;

		}
		else if(i==(location_array.length-1)){
			window.map.setCenter(region_layer_array[(region_layer_array.length-1)]);
			window.map.setZoom(3);
			i=0;
			
		}
		
	});


	$("#left-img-responsive").click(function(){	
			//alert("The paragraph was clicked.");
           window.map.panBy(-150,0);    	
			
	});

 	$(".zoom_out").click(function(){  
      //alert("The paragraph was clicked.");
   		set_label_names();   
   		initialize();
   		setMarkers(null,markerArray);
   		window.map.setZoom(2);
   		$("body").css("cursor","default");
   	});
		


});


