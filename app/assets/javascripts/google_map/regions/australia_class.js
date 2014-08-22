
// start of Australia class class//
var Australia_class;
Australia_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this,"Australia");


};
Australia_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Australia_class
Australia_class.prototype.constructor = Australia_class;

Australia_class.prototype.change_region_view = function() {
    window.map.setCenter(new google.maps.LatLng(-25.8000, 133.2422));
    window.map.setZoom(3);
    update_region_view(this.name);

};

