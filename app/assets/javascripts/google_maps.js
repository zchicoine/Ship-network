
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
          minZoom:2,
          
        };

       //google.load('visualization', '1', { 'packages': ['geochart'] });
       
        var mapStyle = [
							{
							"featureType": "administrative.country",
							"elementType": "icon",
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
						  },{
						  	"featureType": "water",
							
							"stylers": [
							  { "visibility": "off" }
							]
						  }
						];

		// set the map to the specified div
        window.map  = new google.maps.Map(document.getElementById("googleMap"),
            mapOptions);
           map.setOptions({styles: mapStyle});
        
        
        google.maps.event.addListener(map, 'rightclick', function(e) {
    	
    		var zoomToNumber = window.map.getZoom() - 3;
			var getClickedPostion = e.latLng
			window.map.setCenter(getClickedPostion);
			window.map.setZoom(zoomToNumber);
			$("body").css("cursor","default");
		});	



        google.maps.event.addListener(map, 'click', function(e) {  	
          

  
  // <script type='text/javascript'>
  //  google.load('visualization', '1', {'packages': ['geochart']});
  //  google.setOnLoadCallback(drawMap);

  //   function drawMap() {
  //     var data = google.visualization.arrayToDataTable([
  //     		    ['continents'],
		// 	    ['002'],
		// 	    ['150'],
		// 	    ['019']
			              
  //     ]);

  //     var options = { 	region: 'world',
  //     					resolution:'continents',
  //     					colorAxis: {colors: ['#e7711c', '#4374e0']}
  //     				};
  //    //Code for Northern Europe, see options link below
  //     // options['colors'] = [0xB9FFFF,0x99f2f8, 0x66d8f2, 0x177fbf, 0x023373]; //scale colors
  //     // options['dataMode'] ='regions';
  //    //options['resolution'] ='Continent';

  //     var container = document.getElementById('googleMap');
  //     var geomap = new google.visualization.GeoChart(container);
  //     geomap.draw(data, options);
  // };
  // </script>

           var zoomToNumber = window.map.getZoom() + 2;
			var getClickedPostion = e.latLng
			window.map.setCenter(getClickedPostion);
			window.map.setZoom(zoomToNumber);
			//window.map.setZoom(4.5);
			//$("body").css("cursor","-webkit-zoom-out");
			$("body").css("cursor","-webkit-zoom-out");
			//window.map.panBy(200,0);

});


    	
         // when the map clicked twice   
    	

  			
}

google.maps.event.addDomListener(window, 'load', initialize);
