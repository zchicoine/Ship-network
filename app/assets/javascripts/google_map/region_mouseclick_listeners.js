
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
//  window.map.setZoom(3);
}

function test ( event, region_name_coords, region_name) {

window.alert(region_name);
       
       if(region_name=="Europe".toUpperCase()){


        global_region_name.setZoomValue("Europe");
       // window.alert(global_region_name.getZoomValue());
       }
       else if(region_name=="North America".toUpperCase()){
     //   a = new Field("test");
     global_region_name.setZoomValue("North America");
      //  a.setValue(north_america_port_array);
        //alert(region_name);
       }
       else if(region_name=="South America".toUpperCase()){
      //  a = new Field("test");
      global_region_name.setZoomValue("South America");
        
        //alert(region_name);
       }
       else if(region_name=="Africa".toUpperCase()){
      //  a = new Field("test");
      global_region_name.setZoomValue("Africa");
        
       // alert((a.getValue()).length);
       }
       else if(region_name=="India".toUpperCase()){
       // a = new Field("test");
       global_region_name.setZoomValue("India");
        
        //alert((a.getValue()).length);
       }
        
        getClickedPostion = event.latLng
        click(getClickedPostion);
        setClickedPosition(getClickedPostion);
        send_data_to_side_bar(region_name);
   // }
}


 