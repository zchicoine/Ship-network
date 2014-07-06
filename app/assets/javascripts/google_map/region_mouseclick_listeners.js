
function click(getClickedPostion){
	$('.region_labels').remove();
 	window.map.setCenter(getClickedPostion);
    window.map.setZoom(4);
}

function handleMouseClickEurope(event) {

	getClickedPostion = event.latLng
 	click(getClickedPostion);
 	send_data_to_side_bar("Europe");
 
  }

  function handleMouseClickNorthAmerica(event) {
 	getClickedPostion = event.latLng
 	click(getClickedPostion);
 	send_data_to_side_bar("NorthAmerica");
 
  }

  function handleMouseClickSouthAmerica(event) {
 	getClickedPostion = event.latLng
 	click(getClickedPostion);
 	send_data_to_side_bar("SouthAmerica");
 
  }

  function handleMouseClickAustralia(event) {
 	getClickedPostion = event.latLng
 	click(getClickedPostion);
 	send_data_to_side_bar("Australia");
 
  }


  function handleMouseClickAfrica(event) {
 	getClickedPostion = event.latLng
 	click(getClickedPostion);
 	send_data_to_side_bar("Africa");
 
  }

  function handleMouseClickMiddleEast(event) {
 	getClickedPostion = event.latLng
 	click(getClickedPostion);
 	send_data_to_side_bar("MiddleEast");
 
  }