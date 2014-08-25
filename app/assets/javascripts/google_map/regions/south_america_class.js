
// start of South America class class//
var South_America_class;
South_America_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this,"South America");


};
South_America_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to South_America_class
South_America_class.prototype.constructor = South_America_class;

South_America_class.prototype.change_region_view = function() {
    window.map.setCenter(new google.maps.LatLng(-10.4893, -59.3594));
    window.map.setZoom(3);
    update_region_view(this.name);

};

