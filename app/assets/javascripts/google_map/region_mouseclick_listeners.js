
function click(getClickedPostion){
	$('.region_labels').remove();
 	window.map.setCenter(getClickedPostion);
    window.map.setZoom(4);
}

function test ( event, region_name_coords, region_name) {
   if(region_name != undefined) {
       _region = new google.maps.Polygon({
           paths: region_name_coords,
           strokeColor: "blue",
           strokeWeight: 0,
           strokeOpacity: 0,
           fillOpacity: 0

       });
       _region.setMap(map);

       getClickedPostion = event.latLng
       click(getClickedPostion);
       send_data_to_side_bar(region_name);
   }
}