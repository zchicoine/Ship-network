
// start of Europe  class//
var Europe_class;
Europe_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'Europe';
    this.lat_lang = new google.maps.LatLng(52.3666,4.8999);
    this.layer_array = [
        new google.maps.LatLng(52.3666,4.8999),
        //Recalada
        new google.maps.LatLng(41.016666,28.983),
        //lagos
        new google.maps.LatLng(38.11666,13.33333)
    ];
};
Europe_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Europe_class
Europe_class.prototype.constructor = Europe_class;

