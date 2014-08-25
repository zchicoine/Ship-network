
var region_name,z;
var markerArray = [] , rows =[] , scroll_array = [];
var getClickedPostion;
var country_array = [];
var geocoder, newCoordinates, country, geometries,mapOptions;
var zval = new zoom_value();
var region_clicked_boolean = new zoom_value();
var global_region_name = new zoom_value();
var map_styles = new Object();
var next_region_name = new zoom_value();
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

 function map_properties(){
 	
 	map_styles = [{
              "featureType": "administrative.country",
              "stylers": [
                { "visibility": "on" }
              ]
              },{
							"featureType": "administrative.province",
							"stylers": [
							  { "visibility": "off" }
							]
						  },{
							"featureType": "administrative.locality",
							"stylers": [
							  { "visibility": "off" }
							]
						  },{
							"featureType": "administrative.neighborhood",
							"stylers": [
							  { "visibility": "off" }
							]
						  },{
							"featureType": "administrative.land_parcel",
							"stylers": [
							  { "visibility": "off" }
							]
						  },{
							"featureType": "landscape",
							"elementType": "labels",
							"stylers": [
							  { "visibility": "off" }
							]
						  },{
							"featureType": "poi",
							"elementType": "labels",
							"stylers": [
							  { "visibility": "off" }
							]
						  },{
							"featureType": "road",
					
							"stylers": [
							  { "visibility": "off" }
							]
						  },{
							"featureType": "transit",
							
							"stylers": [
							  { "visibility": "off" }
							]
						  },{
              "featureType": "water",
              "elementType": "labels",
          
              "stylers": [
                { "visibility": "off" }
              ]
              }];
 	return map_styles;
 }



 function initialize() {


       mapOptions = {
          center: new google.maps.LatLng(29.95,-90.06667),
          zoom: 2,
          disableDefaultUI: true,
        	panControl: false,
        	streetViewControl: false,
          setScrollable: false,
    		  zoomControl: false,
    	    disableDoubleClickZoom: true,
          draggable: true,
          keyboardShortcuts: false,
          // never change the minimum zoom level from 1 to anything else
          minZoom:3
          
        };

   // setting up custom map properties 
        var mapStyle = map_properties();
      // a.setValue(region_layer_array);
		// set the map to the specified div
        window.map  = new google.maps.Map(document.getElementById("googleMap"),mapOptions);

        map.setOptions({styles: mapStyle});
     
	 // click  event function for zooming in   
     google.maps.event.addListener(map, 'click', function(e) {  
      zval.setValue(3);
      next_region_name.setValue("South America");
      set_label_names();
     	
    });

//preventing cursor to change when hovering over region label text
      google.maps.event.addListener(map, 'mouseover', function(event) {
        
        $("body").css("cursor","default");
        if(zval.get() > 3){
          $('body').css("cursor","default");
          /*$("body").css("cursor","-moz-zoom-out");
          $("body").css("cursor","-webkit-zoom-out");        */
        }
        else{
          $("body").css("cursor","default");
        }
          
        });

 //zoom out function     
     google.maps.event.addListener(map, 'rightclick', function(e) {
            
            initialize();
        });
 
   

     var script = document.createElement('script');
        var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
        url.push('sql=');
        var query = 'SELECT name, kml_4326 FROM ' +
            '1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ';
        var encodedQuery = encodeURIComponent(query);
        url.push(encodedQuery);
        url.push('&callback=drawMap');
        url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
        script.src = url.join('');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);


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


function drawRegions(geometries,region_name){
            
            var  geometries = rows[i][1]['geometries'];
          
             newCoordinates = [];
            if (geometries) {
             // console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }

              
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }

     
            
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
      set_map_center(getClickedPostion,region_name,e);
       
              
              });
            
  google.maps.event.addListener(country, 'mouseout', function() {

        this.setOptions({
               
                fillOpacity: 0.2
              });
            });
}


function set_map_center(getClickedPostion,region_name,e){

  if(zval.get() == 3 && region_clicked_boolean.get() != 1){

    window.map.setCenter(getClickedPostion);
    //console.log("Clicked on th region"+region_name);
    update_region_view(region_name);
    region_clicked_boolean.set(1);
    //set_label_names();
    //console.log("i am here");
  }
  else{
    region_clicked_boolean.set(0);
    window.map.setZoom(4);
    zval.set(4);
    //console.log("Clicked twice in"+region_name);
    send_data_to_get_port_coordinates(region_name);
    test(e,country,region_name);
    $('.region_labels').remove();
    //window.alert(region_clicked_boolean.get());
  }
  
}
// identify a country based on mouse click
function getCountry(latLng) {
    geocoder.geocode( {'latLng': latLng},
      function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
          if(results[0]) {
            for(var i = 0; i < results[0].address_components.length; i++) {
              if(results[0].address_components[i].types[0] == "country") {
               region_name_on_country(results[0].address_components[i].long_name);
              }
            }
          }
          else {
            alert("No results");
          }
        }
        else {
          alert("Status: " + status);
        }
      }
    );
  }

function region_name_on_country(country_name){

  if(country_name=="Canada" || "Mexico"||
                "Greenland"||"Guatemala" ||"Belize"||"El Salvador"||
                "Honduras" ||"Nicaragua" ||"Costa Rica"||"Panama"||
                "Cuba" ||"Haiti" ||"Dominican Republic"||"Jamaica"||
                "Bahamas" ||"Bermuda" ||"United States"){
    //window.alert(region_north_america);
    var r = new google.maps.Polygon({
              paths: region_north_america,
              strokeColor: colors[0],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: "blue",
              fillOpacity: 0.9
            });
  }
    
  else
    console.log('not selected');
}


/*

another function used to set and get global values but to a ariable
typically a string or number
*/
function zoom_value(){

    var zoom = 3;

    this.get = function(){
        return zoom;
    }


    this.set = function(par_zoom_val){
        zoom = par_zoom_val;
        return this;
    }

}