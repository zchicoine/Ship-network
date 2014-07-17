var curr_array = [];
var region_layer_array = [
				new google.maps.LatLng(52.370216,4.895168),
//new orleans
new google.maps.LatLng(29.951066,-90.071532),
//Recalada
new google.maps.LatLng(-34.786878,-55.883175),
//lagos
new google.maps.LatLng(6.524379,3.379206),
//muskat
new google.maps.LatLng(23.610000,58.540000)
//
];
var i=0;
var a;

var europe_port_array = [
new google.maps.LatLng(52.3666,4.9),
//Recalada
new google.maps.LatLng(41.016666,28.983333),
//lagos
new google.maps.LatLng(38.11666,13.33333)
];

var north_america_port_array = [
new google.maps.LatLng(29.95,-90.06667),
//Recalada
new google.maps.LatLng(40.71667,-74)
];

var south_america_port_array = [
new google.maps.LatLng(-12.05,-77.16667),
//Recalada
new google.maps.LatLng(6.81667,-58.16667)
];

var africa_port_array = [
new google.maps.LatLng(-29.88333,31.03333),
//Recalada
new google.maps.LatLng(11.6,43.13333)
];

var sea_port_array = [
new google.maps.LatLng(1.26667,103.83333),
//Recalada
new google.maps.LatLng(17.6833,83.3)
];

function Field(val){
    curr_array = val;
   
    this.getValue = function(){
        return curr_array;
    };
   
    this.setValue = function(val){
        curr_array = val;
    };
}
