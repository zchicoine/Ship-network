
var region_name,z;
var markerArray = [] , rows =[] , scroll_array = [];
var getClickedPostion;
var country_array = [];
var geocoder, newCoordinates, country, geometries,mapOptions;
var zval = new global_values();
var region_clicked_boolean = new global_values();
var global_region_name = new global_values();
var next_region_name = new global_values();
/*

region layer port coordinates to pre define scrolling through the globe 
when in the region layer
*/

var region_layer_array = [
//north america
new google.maps.LatLng(29.95,-90.06667),
//south america
new google.maps.LatLng(-12.05,-77.16667),
//africa..douala
new google.maps.LatLng(4.05000,9.700000),
//PG
new google.maps.LatLng(-30.559482,22.937506),
//europe
new google.maps.LatLng(52.3666,4.8999),
//sea
new google.maps.LatLng(17.686816,83.218482),
//aus
new google.maps.LatLng(-32.926689,151.778921),
//busan
new google.maps.LatLng(35.179554,129.075642)
];
var i=0;

/*

region specific array to set the port coordiantes to pre define the 
scrolling in a region when at a certain zoom level

*/

var europe_port_array = [
new google.maps.LatLng(52.3666,4.8999),
//Recalada
new google.maps.LatLng(41.016666,28.983),
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
//douala
new google.maps.LatLng(4.05000,9.700000),
//Durban
new google.maps.LatLng(-29.858680,31.021840),
//
new google.maps.LatLng(11.825138,42.590275)
];

var persianGulf_port_array = [
//sur
new google.maps.LatLng(-30.559482,22.937506),
//bandar
new google.maps.LatLng(26.371015,31.847656),
//
new google.maps.LatLng(32.634765,51.340669)
];

var sea_port_array = [
//vishakapatnam
new google.maps.LatLng(17.686816,83.218482),
//singapore
new google.maps.LatLng(1.352083,103.819836)
];

var australia_port_array = [
//new castle
new google.maps.LatLng(-32.926689,151.778921),
//danpier
new google.maps.LatLng(-20.663799,116.708460)
];

var farEast_port_array = [
//busan
new google.maps.LatLng(35.179554,129.075642),
//hong kong
new google.maps.LatLng(22.396428,114.109497)
];
function set_label_names(){

  var mapLabel_North_America = new Label({
           text: 'NORTH AMERICA',
           position: new google.maps.LatLng(48.2893, -99.3594),
           map: window.map,
           });
  var mapLabel_South_America = new Label({
           text: 'SOUTH AMERICA',
           position: new google.maps.LatLng(-10.4893, -59.3594),
           map: window.map,
           });
  var mapLabel_Africa = new Label({
           text: 'AFRICA',
           position: new google.maps.LatLng(17.6493, 11.5994),
           map: window.map,
           });
  var mapLabel_Persian_Gulf = new Label({
           text: 'ARABIA & PERSIAN GULF',
           position: new google.maps.LatLng(33.1376, 47.6367),
           map: window.map,
           });
  var mapLabel_Australia = new Label({
           text: 'AUSTRALIA',
           position: new google.maps.LatLng(-25.8000, 133.2422),
           map: window.map,
           });

   var mapLabel_Europe = new Label({
           text: 'EUROPE',
           position: new google.maps.LatLng(53.1289, 45.1102),
           map: window.map,
           });
   var mapLabel_IMB = new Label({
           text: 'INDIA AND SOUTH EAST ASIA',
           position: new google.maps.LatLng(24.4471,85.1660),
           map: window.map,
          });
   var mapLabel_PHPLNS = new Label({
           text: 'FAR EAST',
           position: new google.maps.LatLng(-4.0396, 121.2891),
           map: window.map,
          });

 }



 function initialize() {

        MAP.initialize.load_google_map();


 }

google.maps.event.addDomListener(window, 'load', initialize);

function constructNewCoordinates(polygon) {
        var newCoordinates = [];
        var coordinates = polygon['coordinates'][0];
        for (var i in coordinates) {
          newCoordinates.push(
              new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
        }
        return newCoordinates;
      }


/*

attaching event listeners to every layer drawn onto the map for every country
*/
function event_listeners(country,region_name)
{
  google.maps.event.addListener(country, 'mouseover', function(e) {
             this.setOptions({
                
                fillOpacity: 0.4
              });
        });

  /*
    this function zooms in by when yo click on a region
    sets the global zoom value so that right action could be associated to the right navigation button
    sends data to the side bar
    removes all the region labels

  */

  google.maps.event.addListener(country, 'click', function(e) {
              
        $('.region_labels').remove();
       
      // var zoomToNumber = window.map.getZoom() + 2;
       getClickedPostion = e.latLng
       
       // make a function call to decide which region is being clicked on
      // console.log(zoomToNumber);
     MAP.google_controller_methods.set_region_center(getClickedPostion,region_name,e);
       
              
              });
            
  google.maps.event.addListener(country, 'mouseout', function() {

        this.setOptions({
               
                fillOpacity: 0.2
              });
            });
}






/*

another function used to set and get global values but to a ariable
typically a string or number
*/
function global_values(){

    var value = 3;

    this.get = function(){
        return value;
    }


    this.set = function(val){
        value = val;
        return this;
    }

}