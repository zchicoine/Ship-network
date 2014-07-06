//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
$(window).load(function(){

	$("#outer-map").click(function(e){
	   e.preventDefault();
	   e.stopImmediatePropagation();
	});

	$("#right-img-responsive").click(function(){	
		 // window.map.panTo(new google.maps.LatLng(38.739391, 47.059104));
            window.map.panBy(150,0);
          //  control();
	});


	$("#left-img-responsive").click(function(){	
			//alert("The paragraph was clicked.");
           window.map.panBy(-150,0);    	
			
	});

 	$(".zoom_out").click(function(){  
      //alert("The paragraph was clicked.");
   		set_label_names();   
		window.map.setZoom(2);
		window.map.setCenter(getClickedPosition);
		window.map.setOptions({styles: mapStyle});
      	$("body").css("cursor","default");
  });
		


});


