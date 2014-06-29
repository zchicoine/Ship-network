
 
 //function start_app(){
var mapLabel_North_America;
var getClickedPostion;

 var dflt_latLng;

 function set_label_names(){

 mapLabel_North_America = new Label({
           text: 'Region 1',
           position: new google.maps.LatLng(48.2893, -99.3594),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
  var mapLabel_South_America = new Label({
           text: 'Region 2',
           position: new google.maps.LatLng(-10.4893, -59.3594),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
  var mapLabel_Africa = new Label({
           text: 'Region 3',
           position: new google.maps.LatLng(17.6493, 11.5994),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
  var mapLabel_Persian_Gulf = new Label({
           text: 'Region 4',
           color: 'transparent',
           position: new google.maps.LatLng(33.1376, 47.6367),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
  var mapLabel_Australia = new Label({
           text: 'Region 5',
           position: new google.maps.LatLng(-25.8000, 133.2422),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });

   var mapLabel_Europe = new Label({
           text: 'Region 6',
           position: new google.maps.LatLng(53.1289, 45.1102),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
   var mapLabel_IMB = new Label({
           text: 'Region 7',
           position: new google.maps.LatLng(24.4471,85.1660),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
   var mapLabel_JPN = new Label({
           text: 'Region 8',
           position: new google.maps.LatLng(35.8178, 118.0371),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
   var mapLabel_PHPLNS = new Label({
           text: 'Region 9',
           position: new google.maps.LatLng(-4.0396, 121.2891),
           map: window.map,
           fontSize: 200,
           align: 'center'
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

//function to initialize the map after clickng on banner
function start_app(){

initialize();
}
//$("#free_tour").click(function(event){
 function initialize() {

      var mapOptions = {
          center: new google.maps.LatLng(11.289703, -81.464677),
          zoom: 2,
          disableDefaultUI: true,
        	panControl: false,
        	streetViewControl: false,
    		  zoomControl: false,
    	    disableDoubleClickZoom: true,
          draggable: false,
          keyboardShortcuts: false,
          // never change the minimum zoom level from 1 to anything else
          minZoom:2,
          
        };

   // setting up custom map properties 
        var mapStyle = map_properties();
       
		// set the map to the specified div
        window.map  = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
           map.setOptions({styles: mapStyle});

      
      // setting up label names
        set_label_names();
         
      // click  event function for zooming in   
        google.maps.event.addListener(map, 'click', function(e) {  

      var zoomToNumber = window.map.getZoom() + 1;
			getClickedPostion = e.latLng
			window.map.setCenter(getClickedPostion);
			window.map.setZoom(zoomToNumber);

			var map_style = [{
              "featureType": "administrative.country",
              "stylers": [
                { "visibility": "on" }
              ]
              }]; 
			window.map.setOptions({styles: map_style}); 
     /* $("#googleMap").fadeOut("fast",function(){

        mapLabel_North_America = new Label({
          text: ''

        });
      }); */
			
    });


// zoom out function     

 google.maps.event.addListener(map, 'rightclick', function(e) {
      var center= new google.maps.LatLng(11.289703, -81.464677);
         window.map.setZoom(2);
        window.map.setCenter(getClickedPostion);
        window.map.setOptions({styles: mapStyle});
      $("body").css("cursor","default");
      //set_label_names();
      initialize();
    }); 
	}
google.maps.event.addDomListener(window, 'load', initialize);




