
// start of South India_and_South_East_Asia class//
var India_and_South_East_Asia_class;
India_and_South_East_Asia_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'India and South East Asia';
    this.lat_lang = new google.maps.LatLng(17.686816,83.218482);


};
India_and_South_East_Asia_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to India_and_South_East_Asia_class
India_and_South_East_Asia_class.prototype.constructor = India_and_South_East_Asia_class;


