// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

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
       
        var mapStyle = [
						  {
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
						  }
						];

		// set the map to the specified div
        window.map  = new google.maps.Map(document.getElementById("googleMap"),
            mapOptions);
           map.setOptions({styles: mapStyle});
        
        
        google.maps.event.addListener(map, 'rightclick', function(e) {
    	
    		var zoomToNumber = window.map.getZoom();
			//var getClickedPostion = e.latLng
			//window.map.setCenter(getClickedPostion);
			window.map.setZoom(zoomToNumber -1);
		});	

        google.maps.event.addListener(map, 'click', function(e) {
    	
            var zoomToNumber = window.map.getZoom() + 1;
			var getClickedPostion = e.latLng
			window.map.setCenter(getClickedPostion);
			window.map.setZoom(zoomToNumber);
	 
  		});
    	
         // when the map clicked twice   
    	

  			
}

google.maps.event.addDomListener(window, 'load', initialize);



 


 