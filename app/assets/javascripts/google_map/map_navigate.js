//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
$(window).load(function(){

	$("#outer-map").click(function(e){
	   e.preventDefault();
	   e.stopImmediatePropagation();
	});

	$("#right-img-responsive").click(function(){	

/*
		//var a = new Field("test");
		//a.setValue(region_layer_array);
		var temp = a.getValue();
		console.log(temp.length-1);
		//alert(temp);
		if(this.id=='right-img-responsive' && i!=(temp.length-1))
			{
			//alert(temp[i]);
			window.map.setCenter(temp[i]);
			window.map.setZoom(5);
			i++;

		}
		else if(i==(temp.length-1)){
			//alert(temp[i]);
			window.map.setCenter(temp[(temp.length-1)]);
			window.map.setZoom(5);
			i=0;
			
		}
*/
		window.map.panBy(150,0); 
		
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


