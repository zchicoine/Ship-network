
// start of South America class class//
var South_America_class;
South_America_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'South America';
    this.lat_lang = new google.maps.LatLng(-12.05,-77.16667);

};
South_America_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to South_America_class
South_America_class.prototype.constructor = South_America_class;



