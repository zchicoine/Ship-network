
var map_value,region_name;
var markerArray = [] , rows =[];
var getClickedPostion;
var country_array = [];
var geocoder, newCoordinates, country;

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

var colors = ['#00FFFF', '#00FF00', '#0000FF', '#FFFF00' , '#FF00FF' , '#ADD8E6' , '#C0C0C0'];

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
     //   set_label_names();
        //draw outline on north america and setMap for that  
     //  regionNorthAmerica.setMap(map); 
       /* regionSouthAmerica.setMap(map);
        regionEurope.setMap(map);
        regionAfrica.setMap(map);
        regionAustralia.setMap(map);
        regionMiddleEast.setMap(map);
        regionIndiaSubContinent.setMap(map);
        regionFarEast.setMap(map);
        */
     //   region_event_listeners();
     //    a=new Field("test");
      //    a.setValue(region_layer_array);

        //a.setValue(region_layer_array);
       
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

    // getCountry(getClickedPostion);
     
			
    });

//preventing cursor to change when hovering over region label text
     /* google.maps.event.addListener(map, 'mouseover', function(event) {
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
        });*/

   

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

  function drawMap(data) {
        rows = data['rows'];
        console.log(rows);
        for (var i in rows) {
          
          if (rows[i][0] != 'Antarctica' && (rows[i][0] == "Australia" || rows[i][0] == "New Zealand"
          || rows[i][0] == "Papua New Guinea") ){
             var  geometries = rows[i][1]['geometries'];
          
             newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
             region_name = "AUSTRALIA";
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }

              
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
      
              var randomnumber = Math.floor(Math.random() * 4);
              country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[0],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.8
            });
          //  console.log(region_name);
            event_listeners(country,region_name);
           country.setMap(map);
            
          } 
            else if(rows[i][0] != 'Antarctica' && (rows[i][0] == "China" ||rows[i][0] == "Taiwan" ||rows[i][0] == "S. Korea" ||rows[i][0] == "N. Korea"
            ||rows[i][0] == "Japan")){
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
      
      var randomnumber = Math.floor(Math.random() * 4);
              country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[1],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: colors[1],
              fillOpacity: 0.8
            });
          //  console.log(region_name);
                 event_listeners(country,region_name);
           country.setMap(map);
          }
            else if(rows[i][0] != 'Antarctica' && (rows[i][0] == "India" ||rows[i][0] == "Sri Lanka" ||rows[i][0] == "Bangladesh"
              ||rows[i][0] == "Myanmar" ||rows[i][0] == "Thailand" ||rows[i][0] == "Malaysia"
              ||rows[i][0] == "Brunei" ||rows[i][0] == "Indonesia" ||rows[i][0] == "Laos" ||rows[i][0] == "Nepal" ||rows[i][0] == "Bhutan"
              ||rows[i][0] == "Cambodia" ||rows[i][0] == "Vietnam" ||rows[i][0] == "Philippines" )){

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
      
      var randomnumber = Math.floor(Math.random() * 4);
              country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[2],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: colors[2],
              fillOpacity: 0.8
            });
          //  console.log(region_name);
                 event_listeners(country,region_name);
           country.setMap(map);

          }
          else if (rows[i][0] != 'Antarctica' && (rows[i][0] =="Jordan" ||rows[i][0] == "Yemen" || rows[i][0] == "Oman" 
            ||rows[i][0] == "United Arab Emirates" ||rows[i][0] == "Qatar"||rows[i][0] == "Bahrain"
             ||rows[i][0] == "Kuwait" ||rows[i][0] == "Iraq"||rows[i][0] == "Iran" || rows[i][0] == "Saudi Arabia"
            ) ){
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
      
      var randomnumber = Math.floor(Math.random() * 4);
              country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[2],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: colors[2],
              fillOpacity: 0.8
            });
          //  console.log(region_name);
                 event_listeners(country,region_name);

           country.setMap(map);

          }
     //     Egypt, Libya, Tunisia, Algeria, Morocco, Western Sahara, Mauritania, Senegal, Gambia, Guinea-Bissau, Guinea, 
     //Sierra Leone, Liberia, Cote d'ivoire, Ghana, Togo, Benin, Nigeria, Cameroon, Equatorial Guinea, Gabon, Congo, 
     //     DR Congo, Angola, Namibia, South Africa, Mozambique, Madagascar, Tanzania, Kenya, Somalia, Djibouti, Eritrea, Sudan, 
          else if(rows[i][0] != 'Antarctica' && (rows[i][0] =="Egypt" || rows[i][0] == "Libya"
                ||rows[i][0] == "Tunisia"|| rows[i][0] == "Algeria" ||rows[i][0] == "Morocco"||rows[i][0] == "Senegal"
                ||rows[i][0] == "Gambia" ||rows[i][0] == "Guinea-Bissau" ||rows[i][0] == "Guinea"||rows[i][0] == "Sierra Leone"
                ||rows[i][0] == "Liberia" ||rows[i][0] == "Cote d'ivoire" ||rows[i][0] == "Ghana"||rows[i][0] == "Togo"
                ||rows[i][0] == "Benin" ||rows[i][0] == "Nigeria" ||rows[i][0] == "Cameroon"||rows[i][0] == "Equatorial Guinea"
                ||rows[i][0] == "Gabon" ||rows[i][0] == "Congo" ||rows[i][0] == "Angola"||rows[i][0] == "Namibia"
                ||rows[i][0] == "South Africa" ||rows[i][0] == "Mozambique" ||rows[i][0] == "Madagascar"||rows[i][0] == "Tanzania"
                ||rows[i][0] == "Kenya" ||rows[i][0] == "Somalia" ||rows[i][0] == "Djibouti"||rows[i][0] == "Eritrea"
                ||rows[i][0] == "Sudan"  ||rows[i][0] == "Mauritania" ||rows[i][0] == "Ethiopia")){

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
      
      var randomnumber = Math.floor(Math.random() * 4);
              country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[4],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: colors[4],
              fillOpacity: 0.8
            });
          //  console.log(region_name);
                 event_listeners(country,region_name);
           country.setMap(map);

          }
          //UK, Ireland, Iceland, Germany, Netherlands, Belgium, France, Spain, Portugal, Italy, Slovenia, Croatia, Serbia & Montenegro, 
          //Albania, Greece, Turkey, Cyprus, Bulgaria, 
          //Syria, Israel, Lebanon, Romania, Ukraine, Russian Black Sea, Georgia, Norway, Sweden, Denmark, Finland, Russian Arctic
           else if(rows[i][0] != 'Antarctica' && (rows[i][0] =="United Kingdom" || rows[i][0] == "Ireland"
                ||rows[i][0] == "Iceland"|| rows[i][0] == "Germany" ||rows[i][0] == "Netherlands"||rows[i][0] == "Belgium"
                ||rows[i][0] == "France" ||rows[i][0] == "Spain" ||rows[i][0] == "Portugal"||rows[i][0] == "Italy"
                ||rows[i][0] == "Slovenia" ||rows[i][0] == "Croatia" ||rows[i][0] == "Serbia"||rows[i][0] == "Albania"
                ||rows[i][0] == "Greece" ||rows[i][0] == "Turkey" ||rows[i][0] == "Cyprus"||rows[i][0] == "Bulgaria"
                ||rows[i][0] == "Syria" ||rows[i][0] == "Israel" ||rows[i][0] == "Lebanon"||rows[i][0] == "Romania"
                ||rows[i][0] == "Ukraine" ||rows[i][0] == "Georgia" ||rows[i][0] == "Norway"||rows[i][0] == "Sweden"
                ||rows[i][0] == "Denmark" ||rows[i][0] == "Finland")){

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
      
      var randomnumber = Math.floor(Math.random() * 4);
              country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[0],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.8
            });
          //  console.log(region_name);
            event_listeners(country,region_name);
           country.setMap(map);

          }              
    
}
}

     

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
/*
function drawRegions(geometries,region_name,color_name){
            
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

            draw_countries(newCoordinates,region_name,color_name);
            
}
function draw_countries(newCoordinates,region_name,color_name){
  var randomnumber = Math.floor(Math.random() * 4);
   country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: color_name,
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: color_name,
              fillOpacity: 0.8
            });
          //  console.log(region_name);
           google.maps.event.addListener(country, 'mouseover', function() {
              this.setOptions({fillOpacity: 1});
            });

        /*   google.maps.event.addListener(country, 'click', function(e) {
              test(e,country,region_name)
              send_data_to_get_port_coordinates(region_name)
              });
            
            google.maps.event.addListener(country, 'mouseout', function() {
              this.setOptions({fillOpacity: 0.3});
            });
           country.setMap(map);
           
}*/
function event_listeners(country,region_name)
{
  google.maps.event.addListener(country, 'mouseover', function() {
              this.setOptions({fillOpacity: 1});
            });

  google.maps.event.addListener(country, 'click', function(e) {
              test(e,country,region_name)
              send_data_to_get_port_coordinates(region_name)
              });
            
  google.maps.event.addListener(country, 'mouseout', function() {
              this.setOptions({fillOpacity: 0.3});
            });
}
/*function region_event_listeners(){
/*
  google.maps.event.addDomListener(regionEurope, 'click', function(e){

      test(e,regionEuropeCoords,"Europe")
  });
    google.maps.event.addDomListener(regionEurope, 'mouseover', handleMouseOverEurope);
    google.maps.event.addDomListener(regionEurope, 'mouseout', handleMouseOutEurope);

  google.maps.event.addDomListener(regionNorthAmerica, 'click', function(e){

      test(e,regionNorthAmericaCoords,"North America")
      send_data_to_get_port_coordinates("North America")
  });
}
  google.maps.event.addDomListener(regionNorthAmerica, 'mouseover', handleMouseOverNorthAmerica);
  google.maps.event.addDomListener(regionNorthAmerica, 'mouseout', handleMouseOutNorthAmerica);

  google.maps.event.addDomListener(regionSouthAmerica, 'click', function(e){
      send_data_to_get_port_coordinates("South America" )
      test(e,regionSouthAmericaCoords,"South America")
  });
  google.maps.event.addDomListener(regionSouthAmerica, 'mouseover', handleMouseOverSouthAmerica);
   google.maps.event.addDomListener(regionSouthAmerica, 'mouseout', handleMouseOutSouthAmerica);

  google.maps.event.addDomListener(regionAfrica, 'click',function(e){
      send_data_to_get_port_coordinates("Africa" )
      test(e,regionAfricaCoords,"Africa")
  });
  google.maps.event.addDomListener(regionAfrica, 'mouseover', handleMouseOverAfrica);
  google.maps.event.addDomListener(regionAfrica, 'mouseout', handleMouseOutAfrica);

  google.maps.event.addDomListener(regionMiddleEast, 'click', function(e){
      send_data_to_get_port_coordinates("Middle East" )
      test(e,regionMiddleEastCoords,"Middle East")
  });
  google.maps.event.addDomListener(regionMiddleEast, 'mouseover', handleMouseOverMiddleEast);
  google.maps.event.addDomListener(regionMiddleEast, 'mouseout', handleMouseOutMiddleEast);

  google.maps.event.addDomListener(regionAustralia, 'click', function(e){

      test(e,regionAustraliaCoords,"Australia")
      send_data_to_get_port_coordinates("Australia" )
  });
  google.maps.event.addDomListener(regionAustralia, 'mouseover', handleMouseOverAustralia);
  google.maps.event.addDomListener(regionAustralia, 'mouseout', handleMouseOutAustralia);


google.maps.event.addDomListener(regionIndiaSubContinent, 'click', function(e){
    send_data_to_get_port_coordinates("India" )
    test(e,regionIndiaSubContinentCoords,"India")
  });
google.maps.event.addDomListener(regionIndiaSubContinent, 'mouseover', handleMouseOverIndia);
  google.maps.event.addDomListener(regionIndiaSubContinent, 'mouseout', handleMouseOutIndia);



google.maps.event.addDomListener(regionFarEast, 'click', function(e){

      test(e,regionKoreaJapanRussiaCoords,"Mid to North China")
    send_data_to_get_port_coordinates("Mid to North China" )
  });

google.maps.event.addDomListener(regionFarEast, 'mouseover', handleMouseOverFarEast);
  google.maps.event.addDomListener(regionFarEast, 'mouseout', handleMouseOutFarEast);


}
*/

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