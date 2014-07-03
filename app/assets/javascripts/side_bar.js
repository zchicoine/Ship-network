go_to_region = function (coordinates){
    console.log(coordinates);
   _latLng =  new google.maps.LatLng(coordinates[0], coordinates[1]);
    console.log(_latLng);
    window.map.setCenter(_latLng);
    window.map.setZoom(4);
}