// start of NorthAmerica class//
var North_America_class;
North_America_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this,'North America');


};
North_America_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to North_America_class
North_America_class.prototype.constructor = North_America_class;

North_America_class.prototype.change_region_view = function() {
    window.map.setCenter(new google.maps.LatLng(48.2893, -99.3594));
    window.map.setZoom(3);
    update_region_view(this.name);
    console.log("mo");
};

