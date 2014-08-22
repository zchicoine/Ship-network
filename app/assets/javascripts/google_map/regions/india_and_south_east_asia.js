
// start of South India_and_South_East_Asia class//
var India_and_South_East_Asia_class;
India_and_South_East_Asia_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this,"India and South East Asia");


};
India_and_South_East_Asia_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to India_and_South_East_Asia_class
India_and_South_East_Asia_class.prototype.constructor = India_and_South_East_Asia_class;

India_and_South_East_Asia_class.prototype.change_region_view = function() {
    window.map.setCenter(new google.maps.LatLng(24.4471,85.1660));
    window.map.setZoom(3);
    update_region_view(this.name);

};

