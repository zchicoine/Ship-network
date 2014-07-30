
var regionClick;
var a = new Field("test");

function setClickedPosition(getClickedPostion){

  regionClick = getClickedPostion;
}

function getClickedPostion(){

return regionClick;
}

function click(getClickedPostion){
	$('.region_labels').remove();
 	window.map.setCenter(getClickedPostion);
}


/*
this function sets the global variable "global_region_name" to the value dependent on 
region clicked on
*/
function test ( event, region_name_coords, region_name) {

       
       if(region_name=="Europe".toUpperCase()){
        global_region_name.setZoomValue("Europe");

       }
       else if(region_name=="North America".toUpperCase()){
        window.alert(region_name);
        global_region_name.setZoomValue("North America");
       }
       else if(region_name=="South America".toUpperCase()){
   
        global_region_name.setZoomValue("South America");
       }
       else if(region_name=="Africa".toUpperCase()){
   
        global_region_name.setZoomValue("Africa");
       }
       else if(region_name=="India".toUpperCase()){
   
        global_region_name.setZoomValue("India");
       }
        
        getClickedPostion = event.latLng
        click(getClickedPostion);
        setClickedPosition(getClickedPostion);
        update_region_view(region_name);
   
}


 