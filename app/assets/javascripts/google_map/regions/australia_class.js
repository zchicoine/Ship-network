
// start of Australia  class//
var Australia_class;
Australia_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = "Australia";
    this.lat_lang = new google.maps.LatLng(-32.926689,151.778921);



};
Australia_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Australia_class
Australia_class.prototype.constructor = Australia_class;



