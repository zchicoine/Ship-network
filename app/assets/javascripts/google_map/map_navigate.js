//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
$(window).load(function(){

	$("#outer-map").click(function(e){
	   e.preventDefault();
	   e.stopImmediatePropagation();
	});

$("#right-img-responsive").hover(function(){
	$("body").css("cursor","default");
	//$('.tag-tooltip').tooltip();
});

$("#left-img-responsive").hover(function(){
	$("body").css("cursor","default");
});
	$("#right-img-responsive").click(function(){	

		if(this.id=='right-img-responsive' && (zval.getZoomValue()) == 2){

		var a = new Field("test");
		a.setValue(region_layer_array);
		var temp = a.getValue();
		if(i!=(temp.length-1)){
					window.map.setCenter(temp[i]);
			//	window.map.setZoom(5);
				i++;

				}
				else if(i==(temp.length-1)){
				//alert(temp[i]);
				window.map.setCenter(temp[(temp.length-1)]);
			//	window.map.setZoom(5);
				i=0;
				
				}
	
		}
		
		else if(this.id=='right-img-responsive' && (zval.getZoomValue()) >=10 ){
	
			if(global_region_name.getZoomValue()=="Europe"){
				a = new Field("test");
        		a.setValue(europe_port_array);
			}
			else if(global_region_name.getZoomValue()=="North America"){
				a = new Field("test");
        		a.setValue(north_america_port_array);
			}
			else if(global_region_name.getZoomValue()=="South America"){
				a = new Field("test");
        		a.setValue(south_america_port_array);
			}
			else if(global_region_name.getZoomValue()=="Africa"){
				a = new Field("test");
        		a.setValue(africa_port_array);
			}
			else if(global_region_name.getZoomValue()=="India"){
				a = new Field("test");
        		a.setValue(sea_port_array);
			}
			
			var temp = a.getValue();

		
			if(i!=(temp.length-1)){
					window.map.setCenter(temp[i]);
			//	window.map.setZoom(5);
				i++;

			}
			
			else if(i==(temp.length-1)){
				//alert(temp[i]);
				window.map.setCenter(temp[(temp.length-1)]);
			//	window.map.setZoom(5);
				i=0;
				
			}
			
		}
	});


	$("#left-img-responsive").click(function(){	
			//alert("The paragraph was clicked.");
      //     window.map.panBy(-150,0);    	

           if(this.id=='left-img-responsive' && (zval.getZoomValue()) == 2){

		var a = new Field("test");
		a.setValue(region_layer_array);
		var temp = a.getValue();
		if(i!=(temp.length-1)){
					window.map.setCenter(temp[i]);
			//	window.map.setZoom(5);
				i++;

				}
				else if(i==(temp.length-1)){
				//alert(temp[i]);
				window.map.setCenter(temp[(temp.length-1)]);
			//	window.map.setZoom(5);
				i=0;
				
				}
	
		}
		
		else if(this.id=='left-img-responsive' && (zval.getZoomValue()) >=10 ){
	
			if(global_region_name.getZoomValue()=="Europe"){
				a = new Field("test");
        		a.setValue(europe_port_array);
			}
			else if(global_region_name.getZoomValue()=="North America"){
				a = new Field("test");
        		a.setValue(north_america_port_array);
			}
			else if(global_region_name.getZoomValue()=="South America"){
				a = new Field("test");
        		a.setValue(south_america_port_array);
			}
			else if(global_region_name.getZoomValue()=="Africa"){
				a = new Field("test");
        		a.setValue(africa_port_array);
			}
			else if(global_region_name.getZoomValue()=="India"){
				a = new Field("test");
        		a.setValue(sea_port_array);
			}
			
			var temp = a.getValue();

		
			if(i!=(temp.length-1)){
					window.map.setCenter(temp[i]);
			//	window.map.setZoom(5);
				i++;

			}
			
			else if(i==(temp.length-1)){
				//alert(temp[i]);
				window.map.setCenter(temp[(temp.length-1)]);
			//	window.map.setZoom(5);
				i=0;
				
			}
			
		}
			
	});


 	$(".zoom_out").click(function(){  
 
   		initialize();
   		setMarkers(null,markerArray);
   		window.map.setZoom(2);

   		// setting the global zoom value back to 2 so that the right navigation button will be set to act on 
   		// region layer
   		zval.setZoomValue(2);

   		// changing the cursor back to default
   		$("body").css("cursor","default");
   	});
		


});

/*

this is a function to set and get global values for arrays used 
to scroll in different ports on a region when zoomed in
*/
function Field(val){
    var value = val;
   
    this.getValue = function(){
        return value;
    };
   
    this.setValue = function(val){
        value = val;
    };
}