//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
$(window).load(function(){

	$("#outer-map").click(function(e){
	   //e.preventDefault();
	   //e.stopImmediatePropagation();
	});

$("#right-img-responsive").hover(function(){

	
	$("body").css("cursor","default");
	//$('.tag-tooltip').tooltip();
});

$("#left-img-responsive").hover(function(){
	$("body").css("cursor","default");
});



$("#right-img-responsive").click(function(){	
//		window.map.panby(150,0);

		$("#right-img-responsive").attr('data-original-title','pratik');
		if(this.id=='right-img-responsive' && (zval.get()) < 4 ){
		//console.log("right clicked ");
		//console.log( zval.get());
		var a = new Field("test");
		a.setValue(region_layer_array);
		//console.log(a);
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
		
		else if(this.id=='right-img-responsive' && (zval.get()) == 4 ){
			//console.log(zval.get());
			if(global_region_name.get()=="Europe"){
				var a = new Field("test");
        		a.setValue(europe_port_array);
			}
			else if(global_region_name.get()=="North America"){
				a = new Field("test");
        		a.setValue(north_america_port_array);
			}
			else if(global_region_name.get()=="South America"){
				a = new Field("test");
        		a.setValue(south_america_port_array);
			}
			else if(global_region_name.get()=="Africa"){
				a = new Field("test");
        		a.setValue(africa_port_array);
			}
			else if(global_region_name.get()=="India and South East Asia"){
				a = new Field("test");
        		a.setValue(sea_port_array);
			}
			else if(global_region_name.get()=="Arabia and Persian Gulf"){
				a = new Field("test");
        		a.setValue(persianGulf_port_array);
			}
			else if(global_region_name.get()=="Far East"){
				a = new Field("test");
        		a.setValue(farEast_port_array);
			}
			else if(global_region_name.get()=="Australia"){

				a = new Field("test");
        		a.setValue(australia_port_array);
        		
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

           if(this.id=='left-img-responsive' && (zval.get()) < 4){

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
		
		else if(this.id=='left-img-responsive' && (zval.get()) == 4 ){
			
			if(global_region_name.get()=="Europe"){
				a = new Field("test");

        		a.setValue(europe_port_array);
			}
			else if(global_region_name.get()=="North America"){
				a = new Field("test");
        		a.setValue(north_america_port_array);
			}
			else if(global_region_name.get()=="South America"){
				a = new Field("test");
        		a.setValue(south_america_port_array);
			}
			else if(global_region_name.get()=="Africa"){
				a = new Field("test");
        		a.setValue(africa_port_array);
			}
			else if(global_region_name.get()=="India and South East Asia"){
				a = new Field("test");
        		a.setValue(sea_port_array);
			}
			else if(global_region_name.get()=="Arabia and Persian Gulf"){
				a = new Field("test");
        		a.setValue(persianGulf_port_array);
			}
			else if(global_region_name.get()=="Far East"){
				a = new Field("test");
        		a.setValue(farEast_port_array);
			}
			else if(global_region_name.get()=="Australia"){
				a = new Field("test");
        		a.setValue(australia_port_array);
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
   		window.map.setZoom(3);

   		// setting the global zoom value back to 2 so that the right navigation button will be set to act on 
   		// region layer
   		zval.set(3);

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
        console.log(value);
    };
}