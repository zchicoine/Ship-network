
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



 