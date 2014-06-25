
 
 //function start_app(){

 var dflt_latLng;

 function map_properties(){
 	var map_styles = new Object();
 	map_styles = [{
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
//$("#free_tour").click(function(event){
 function initialize() {

      var mapOptions = {
          center: new google.maps.LatLng(11.289703, -81.464677),
          zoom: 1,
          disableDefaultUI: true,
        	panControl: false,
        	streetViewControl: false,
    		zoomControl: false,
    	    disableDoubleClickZoom: true,
          draggable: false,
          keyboardShortcuts: false,
          // never change the minimum zoom level from 1 to anything else
          minZoom:1,
          
        };

       //google.load('visualization', '1', { 'packages': ['geochart'] });
       
        var mapStyle = map_properties();
       
		// set the map to the specified div
        window.map  = new google.maps.Map(document.getElementById("googleMap"),
            mapOptions);
           map.setOptions({styles: mapStyle});
        
        
        google.maps.event.addListener(map, 'rightclick', function(e) {
    	
    		//var zoomToNumber = window.map.getZoom() - 3;
			//var getClickedPostion = new google.maps.LatLng(11.289703, -81.464677),
			var center= new google.maps.LatLng(11.289703, -81.464677);
			//window.map.setCenter(getClickedPostion);
				 window.map.setZoom(1);
				window.map.setCenter(center);
			// //window.map.fitBounds(11.289703, -81.464677),
		//	window.map  = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
           //window.map.setOptions({styles: mapStyle});
			$("body").css("cursor","default");
		});	



        google.maps.event.addListener(map, 'click', function(e) {  

            var zoomToNumber = window.map.getZoom() + 2;
			var getClickedPostion = e.latLng
			window.map.setCenter(getClickedPostion);
			window.map.setZoom(zoomToNumber);

			var map_style = map_properties(); 
			window.map.setOptions({styles: map_style});
			//window.map.setZoom(4.5);
			//$("body").css("cursor","-webkit-zoom-out");
		//	$("body").css("cursor","-webkit-zoom-out");
			//window.map.panBy(200,0);

});


/*
  var mapLabel_NA = new Label({
         //  text: 'North America',
           position: new google.maps.LatLng(48.2893, -99.3594),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
  var mapLabel_SA = new Label({
         //  text: 'South America',
           position: new google.maps.LatLng(-10.4893, -059.3594),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
/*  var mapLabel_AF = new Label({
           text: 'Africa',
           position: new google.maps.LatLng(17.6493, 011.5994),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
  var mapLabel_AS = new Label({
         //  text: 'Asia',
           position: new google.maps.LatLng(52.0259, 42.5391),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });
 /* var mapLabel_AUS = new Label({
           text: 'Australia',
           position: new google.maps.LatLng(-24.2893, 045.7031),
           map: window.map,
           fontSize: 200,
           align: 'center'
         });

   var mapLabel_EUR = new Label({
           text: 'Europe',
           position: new google.maps.LatLng(53.1289, 045.1102),
           map: window.map,
           fontSize: 200,
           align: 'center'
         }); 	
         // when the map clicked twice   
    	
*/
  			
	}
google.maps.event.addDomListener(window, 'load', initialize);
 	
 //	}


