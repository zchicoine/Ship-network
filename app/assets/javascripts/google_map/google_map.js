
var map_value,region_name,z;
var markerArray = [] , rows =[];
var getClickedPostion;
var country_array = [] , newCoordinates = [];
var geocoder, country, geometries,mapOptions;
var zval = new zoom_value();
var global_region_name = new zoom_value();
var map_styles = new Object();

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
           text: 'PERSIAN GULF',
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
           text: 'INDIAN SUBCONTINENT',
           position: new google.maps.LatLng(24.4471,85.1660),
           map: window.map,
          });
   var mapLabel_JPN = new Label({
           text: 'MID NORTH CHINA',
           position: new google.maps.LatLng(35.8178, 118.0371),
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
                { "visibility": "off" }
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
						  }];
 	return map_styles;
 }

var colors = ['#00FFFF', '#00FF00', '#0000FF', '#FFFF00' , '#FF00FF' , '#ADD8E6' , '#C0C0C0'];

 function initialize() {


       mapOptions = {
          center: new google.maps.LatLng(11.289703, -81.464677),
          zoom: 2,
          disableDefaultUI: true,
        	panControl: false,
        	streetViewControl: false,
          setScrollable: false,
    		  zoomControl: false,
    	    disableDoubleClickZoom: true,
          draggable: false,
          keyboardShortcuts: false,
          // never change the minimum zoom level from 1 to anything else
          minZoom:2
          
        };

   // setting up custom map properties 
        var mapStyle = map_properties();
       
		// set the map to the specified div
        window.map  = new google.maps.Map(document.getElementById("googleMap"),mapOptions);

        map.setOptions({styles: mapStyle});
       
      geocoder = new google.maps.Geocoder();
	  
	  //setting up ports on the map

	 // click  event function for zooming in   
     google.maps.event.addListener(map, 'click', function(e) {  

      if(zval.getZoomValue() > 2){

       getClickedPostion = e.latLng
 
     //  console.log(getClickedPostion);
       window.map.setCenter(getClickedPostion);
       window.map.setZoom(2);
       zval.setZoomValue(2);
 
      
      window.map.setOptions({styles: map_styles}); 
   //   set_label_names();
      $("body").css("cursor","default");    
      }
        
     
    // getCountry(getClickedPostion);
     
			
    });

//preventing cursor to change when hovering over region label text
      google.maps.event.addListener(map, 'mouseover', function(event) {
        
        $("body").css("cursor","default");
        if(zval.getZoomValue() > 2){
          $("body").css("cursor","-moz-zoom-out");
          $("body").css("cursor","-webkit-zoom-out");        
        }
        else{
          $("body").css("cursor","default");
        }
     //   fillRegion(newCoordinates);
        });

 //zoom out function     
     google.maps.event.addListener(map, 'rightclick', function(e) {
            window.map.setZoom(2);
            window.map.setOptions({styles: mapStyle});
          
          setMarkers(null,markerArray);
          window.map.setCenter(getClickedPostion);
           
           // region_event_listeners();
            //set_label_names();
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

//google.maps.event.addDomListener(window, 'load', initialize2);

function drawRegions(geometries,region_name){
            
            var  geometries = rows[i][1]['geometries'];
          
             newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
            
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }

              
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }

      //      draw_countries(newCoordinates,region_name);
            
}

/*

attaching event listeners to every layer drawn onto the map for every country
*/
function event_listeners(country,region_name)
{
  google.maps.event.addListener(country, 'mouseover', function() {
              //  this.setOptions({fillOpacity: 1});
              $("body").css("cursor","-moz-zoom-in");
           //   $('#googleMap').css("cursor","-webkit-zoom-in");
             
            });

  /*
    this function zooms in by when yo click on a region
    sets the global zoom value so that right action could be associated to the right navigation button
    sends data to the side bar
    removes all the region labels

  */

  google.maps.event.addListener(country, 'click', function(e) {
              
        $('.region_labels').remove();
       send_data_to_get_port_coordinates(region_name);
       var zoomToNumber = window.map.getZoom() + 1;
       getClickedPostion = e.latLng
       // make a function call to decide which region is being clicked on
       console.log(zoomToNumber);
       window.map.setCenter(getClickedPostion);
       window.map.setZoom(zoomToNumber);

       zval.setZoomValue(zoomToNumber);
       test(e,country,region_name);
              
              });
            
  google.maps.event.addListener(country, 'mouseout', function() {

     if(zval.getZoomValue() > 2){
          $("body").css("cursor","-moz-zoom-out");
          $("body").css("cursor","-webkit-zoom-out");        
        }
        else if (zval.getZoomValue() == 2){
          $("body").css("cursor","default");

        }
              // $('body').css("cursor","-webkit-zoom-out");
              
              //this.setOptions({fillOpacity: 0.3});
            });
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

  if(country_name=="Australia")
    {console.log('reached in Australia');}
  else
    console.log('not selected');
}


/*

another function used to set and get global values but to a ariable
typically a string or number
*/
function zoom_value(){

    var zoom = 2;

    this.getZoomValue = function(){
        return zoom;
    }


    this.setZoomValue = function(par_zoom_val){
        zoom = par_zoom_val;
        return this;
    }

}