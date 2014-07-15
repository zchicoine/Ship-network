
var map_value;
var markerArray = [];
var getClickedPostion;

var geocoder;
 function set_label_names(){

  var mapLabel_North_America = new Label({
           text: 'Region 1',
           position: new google.maps.LatLng(48.2893, -99.3594),
           map: window.map,
           });
  var mapLabel_South_America = new Label({
           text: 'Region 2',
           position: new google.maps.LatLng(-10.4893, -59.3594),
           map: window.map,
           });
  var mapLabel_Africa = new Label({
           text: 'Region 3',
           position: new google.maps.LatLng(17.6493, 11.5994),
           map: window.map,
           });
  var mapLabel_Persian_Gulf = new Label({
           text: 'Region 4',
           position: new google.maps.LatLng(33.1376, 47.6367),
           map: window.map,
           });
  var mapLabel_Australia = new Label({
           text: 'Region 5',
           position: new google.maps.LatLng(-25.8000, 133.2422),
           map: window.map,
           });

   var mapLabel_Europe = new Label({
           text: 'Region 6',
           position: new google.maps.LatLng(53.1289, 45.1102),
           map: window.map,
           });
   var mapLabel_IMB = new Label({
           text: 'Region 7',
           position: new google.maps.LatLng(24.4471,85.1660),
           map: window.map,
          });
   var mapLabel_JPN = new Label({
           text: 'Region 8',
           position: new google.maps.LatLng(35.8178, 118.0371),
           map: window.map,
          });
   var mapLabel_PHPLNS = new Label({
           text: 'Region 9',
           position: new google.maps.LatLng(-4.0396, 121.2891),
           map: window.map,
          });

 }

 function map_properties(){
 	var map_styles = new Object();
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

  

 function initialize() {


      var mapOptions = {
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
        set_label_names();
        //draw outline on north america and setMap for that  
        regionNorthAmerica.setMap(map); 
        regionSouthAmerica.setMap(map);
        regionEurope.setMap(map);
        regionAfrica.setMap(map);
        regionAustralia.setMap(map);
        regionMiddleEast.setMap(map);
        regionIndiaSubContinent.setMap(map);
        regionKoreaJapanRussia.setMap(map);
        regionSouthEastAsia.setMap(map);
        region_event_listeners();
       
      geocoder = new google.maps.Geocoder();
	  
	  //setting up ports on the map

	 // click  event function for zooming in   
     google.maps.event.addListener(map, 'click', function(e) {  


      $('.region_labels').remove();
       var zoomToNumber = window.map.getZoom() + 1;
			 getClickedPostion = e.latLng
       // make a function call to decide which region is being clicked on
       console.log(getClickedPostion);
			 window.map.setCenter(getClickedPostion);
			 window.map.setZoom(zoomToNumber);

  		var map_style = [{
              "featureType": "administrative.country",
              "stylers": [
                { "visibility": "on" }
              ]
              }]; 
			window.map.setOptions({styles: map_style}); 

    //  getCountry(getClickedPostion);
     
			
    });

//preventing cursor to change when hovering over region label text
      google.maps.event.addListener(map, 'mouseover', function(event) {
          $('body').css("cursor","default");
        });

// zoom out function     
     google.maps.event.addListener(map, 'rightclick', function(e) {
            window.map.setZoom(2);
            window.map.setOptions({styles: mapStyle});
          //  setMarkers(null,marker);
          setMarkers(null,markerArray);
                //regionSouthAmerica.setMap(map);

            window.map.setCenter(getClickedPostion);
            $("body").css("cursor","default");
           // region_event_listeners();
            //set_label_names();
        });


 }

//google.maps.event.addDomListener(window, 'load', initialize2);
google.maps.event.addDomListener(window, 'load', initialize);

function region_event_listeners(){

  google.maps.event.addDomListener(regionEurope, 'click', function(e){

      test(e,regionEuropeCoords,"Europe")
  });
//    google.maps.event.addDomListener(regionEurope, 'mouseover', handleMouseOverEurope);
//    google.maps.event.addDomListener(regionEurope, 'mouseout', handleMouseOutEurope);

  google.maps.event.addDomListener(regionNorthAmerica, 'click', function(e){

      test(e,regionNorthAmericaCoords,"North America")
      send_data_to_get_port_coordinates("North America")
  });
//  google.maps.event.addDomListener(regionNorthAmerica, 'mouseover', handleMouseOverNorthAmerica);
//  google.maps.event.addDomListener(regionNorthAmerica, 'mouseout', handleMouseOutNorthAmerica);

  google.maps.event.addDomListener(regionSouthAmerica, 'click', function(e){
      send_data_to_get_port_coordinates("South America" )
      test(e,regionSouthAmericaCoords,"South America")
  });
//  google.maps.event.addDomListener(regionSouthAmerica, 'mouseover', handleMouseOverSouthAmerica);
//  google.maps.event.addDomListener(regionSouthAmerica, 'mouseout', handleMouseOutSouthAmerica);

  google.maps.event.addDomListener(regionAfrica, 'click',function(e){
      send_data_to_get_port_coordinates("Africa" )
      test(e,regionAfricaCoords,"Africa")
  });
//  google.maps.event.addDomListener(regionAfrica, 'mouseover', handleMouseOverAfrica);
//  google.maps.event.addDomListener(regionAfrica, 'mouseout', handleMouseOutAfrica);

  google.maps.event.addDomListener(regionMiddleEast, 'click', function(e){
      send_data_to_get_port_coordinates("Middle East" )
      test(e,regionMiddleEastCoords,"Middle East")
  });
//  google.maps.event.addDomListener(regionMiddleEast, 'mouseover', handleMouseOverMiddleEast);
//  google.maps.event.addDomListener(regionMiddleEast, 'mouseout', handleMouseOutMiddleEast);

  google.maps.event.addDomListener(regionAustralia, 'click', function(e){

      test(e,regionAustraliaCoords,"Australia")
      send_data_to_get_port_coordinates("Australia" )
  });
//  google.maps.event.addDomListener(regionAustralia, 'mouseover', handleMouseOverAustralia);
//  google.maps.event.addDomListener(regionAustralia, 'mouseout', handleMouseOutAustralia);


google.maps.event.addDomListener(regionIndiaSubContinent, 'click', function(e){
    send_data_to_get_port_coordinates("India" )
    test(e,regionIndiaSubContinentCoords,"India")
  });



google.maps.event.addDomListener(regionKoreaJapanRussia, 'click', function(e){

      test(e,regionKoreaJapanRussiaCoords,"Mid to North China")
    send_data_to_get_port_coordinates("Mid to North China" )
  });


google.maps.event.addDomListener(regionSouthEastAsia, 'click', function(e){
      test(e,regionSouthEastAsiaCoords,"South East Asia")
    send_data_to_get_port_coordinates(regionName )
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
               // alert(results[0].address_components[i].long_name);
              }
            }
          }
          else {
            //alert("No results");
          }
        }
        else {
          //alert("Status: " + status);
        }
      }
    );
  }