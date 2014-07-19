

var regionClick;

function setClickedPosition(getClickedPostion){

  regionClick = getClickedPostion;
}

function getClickedPostion(){

return regionClick;
}

function click(getClickedPostion){
	$('.region_labels').remove();
 	window.map.setCenter(getClickedPostion);
  window.map.setZoom(3);
}

function test ( event, region_name_coords, region_name) {




   // if(region_name != undefined) {
   //     _region = new google.maps.Polygon({
   //         paths: region_name_coords,
   //         strokeColor: "blue",
   //         strokeWeight: 0,
   //         strokeOpacity: 0,
   //         fillOpacity: 0

   //     });
   //     _region.setMap(map);
   //     if(region_name=="Europe"){
   //      a = new Field("test");
   //      a.setValue(europe_port_array);
   //      //alert(region_name);
   //     }
   //     else if(region_name=="North America"){
   //      a = new Field("test");
   //      a.setValue(north_america_port_array);
   //      //alert(region_name);
   //     }
   //     else if(region_name=="South America"){
   //      a = new Field("test");
   //      a.setValue(south_america_port_array);
   //      //alert(region_name);
   //     }
   //     else if(region_name=="Africa"){
   //      a = new Field("test");
   //      a.setValue(africa_port_array);
   //     // alert((a.getValue()).length);
   //     }
   //     else if(region_name=="India"){
   //      a = new Field("test");
   //      a.setValue(sea_port_array);
   //      //alert((a.getValue()).length);
   //     }
        
        getClickedPostion = event.latLng
        click(getClickedPostion);
        setClickedPosition(getClickedPostion);
        send_data_to_side_bar(region_name);
   // }
}


 