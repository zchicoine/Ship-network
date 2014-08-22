
// start of Africa class class//
var Africa_class;
Africa_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'Africa';
    this.lat_lang = new google.maps.LatLng(4.05000,9.700000);

};
Africa_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to South_America_class
Africa_class.prototype.constructor = Africa_class;



