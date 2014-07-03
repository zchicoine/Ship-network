
 
 //function start_app(){
var mapLabel_North_America;
var getClickedPostion;

 var dflt_latLng;

 function set_label_names(){

 mapLabel_North_America = new Label({
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

  // Construct the polygon
  // Note that we don't specify an array or arrays, but instead just
  // a simple array of LatLngs in the paths property
 

  

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
          setScrollable: false,
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

        //draw outline on north america and setMap for that  
        regionNorthAmerica.setMap(map);
      // setting up label names
        set_label_names();
      
	  
	  //setting up ports on the map
	var port = [['Fredericia',55.55,9.75],['Frederikshavn',55.46666667,8.4333333],['Barahona',18.2,-71.06666667],['La Romana',18.45,-69.01666667]];
//	var myCenter=new google.maps.LatLng(51.508742,-0.120850);
	//Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3 style="text-align:center">Fredericia</h3>' +
		'<table style="width:300px"><tr><td><h4>Vessel</h4></td><td>ship1</td><td>ship2</td><td>ship3</td></tr></table>'+
		'</div>'],
        ['<div class="info_content">' +
        '<h3>Esbjerg</h3>' +'</div>'],
		['<div class="info_content">' +
        '<h3>Barahona</h3>' +'</div>'],
		['<div class="info_content">' +
        '<h3>La Romana</h3>' +'</div>']
	];
	//Display multiple markers on a map
  //  var infoWindow = new google.maps.InfoWindow(), marker, i;
	/*function initialize2()	
	{
		var mapProp = {
		center:myCenter,
		zoom:2,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};*/

	//var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	var iconBase = 'port.png';
	var iconBase2 = 'portHover.png';
	
	for(var i=0;i<port.length;i++){
		var position = new google.maps.LatLng(port[i][1],port[i][2]);
	new google.maps.Size(20, 34),
	 marker = new google.maps.Marker({
			position: position,
			map: map,
			icon: iconBase,
			title: port[i][0]+', 5 ships',
      
		});
		
		google.maps.event.addListener(marker, 'mouseover', function() {
    //  marker_color=new google.maps.MarkerImage(iconBase2);
			marker.setIcon(iconBase2);
		});

		google.maps.event.addListener(marker, 'mouseout', function() {
			marker.setIcon(iconBase);
		});
	
	marker.setMap(map);
	// Allow each marker to have an info window    
   /*     google.maps.event.addListener(marker, 'click', (function(marker, i){
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));*/

        // Automatically center the map fitting all markers on the screen
        //map.fitBounds(bounds);
	}	
	//}
	

     
	 // click  event function for zooming in   
     google.maps.event.addListener(map, 'click', function(e) {  

      $('.region_labels').remove();
       var zoomToNumber = window.map.getZoom() + 2;
			 getClickedPostion = e.latLng
       // make a function call to decide which region is being clicked on
       console.log(getClickedPostion);
			 window.map.setCenter(getClickedPostion);
			 window.map.setZoom(zoomToNumber);

       /*     $.ajax({
        type: "POST",
        url: ,
        data: getClickedPostion,
        success: success,
        dataType: dataType
      });*/
			var map_style = [{
              "featureType": "administrative.country",
              "stylers": [
                { "visibility": "on" }
              ]
              }]; 
			window.map.setOptions({styles: map_style}); 
     
			
    });

//preventing cursor to change when hovering over region label text
      google.maps.event.addListener(map, 'mouseover', function(event) {
          $('body').css("cursor","default");
        });

// zoom out function     
     google.maps.event.addListener(map, 'rightclick', function(e) {
         // var center= new google.maps.LatLng(11.289703, -81.464677);
            window.map.setZoom(2);
            window.map.setOptions({styles: mapStyle});

            window.map.setCenter(getClickedPostion);
          $("body").css("cursor","default");
          
          set_label_names();
        
        }); 
	
 }

//google.maps.event.addDomListener(window, 'load', initialize2);
google.maps.event.addDomListener(window, 'load', initialize);





