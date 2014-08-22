
var region_name,z;
var markerArray = [] , rows =[] , scroll_array = [];
var getClickedPostion;
var country_array = [];
var geocoder, newCoordinates, country, geometries,mapOptions;
var zval = new global_values();
var region_clicked_boolean = new global_values();
var next_region_name = new global_values();

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