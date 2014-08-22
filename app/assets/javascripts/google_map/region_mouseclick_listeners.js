
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

       
       if(region_name=="Europe"){
        global_region_name.set(region_name);

       }
       else if(region_name=="North America"){
       // window.alert(region_name);
        global_region_name.set(region_name);
       }
       else if(region_name=="South America"){
   
        global_region_name.set(region_name);
       }
       else if(region_name=="Africa"){
   
        global_region_name.set(region_name);
       }
       else if(region_name=="India and South East Asia"){
   
        global_region_name.set(region_name);
       }
       else if(region_name=="Arabia and Persian Gulf"){
   
        global_region_name.set(region_name);
       }
       else if(region_name=="Australia"){
   
        global_region_name.set(region_name);
       }
       else if(region_name=="Far East"){
   
        global_region_name.set(region_name);
       }
        
        // getClickedPostion = event.latLng
        // click(getClickedPostion);
        // setClickedPosition(getClickedPostion);
        // update_region_view(region_name);
   
}


 