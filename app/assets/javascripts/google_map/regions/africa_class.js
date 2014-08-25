
// start of Africa class class//
var Africa_class;
Africa_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this,"Africa");


};
Africa_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to South_America_class
Africa_class.prototype.constructor = Africa_class;

Africa_class.prototype.change_region_view = function() {
    window.map.setCenter(new google.maps.LatLng(17.6493, 11.5994));
    window.map.setZoom(3);
    update_region_view(this.name);

};

