// start of NorthAmerica class//
var North_America_class;
North_America_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'North America';
    this.lat_lang = new google.maps.LatLng(55.443528, -96.053968);
    this.layer_array =[
        new google.maps.LatLng(29.95,-90.06667),
        //Recalada
        new google.maps.LatLng(40.71667,-74)
    ];

};
North_America_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to North_America_class
North_America_class.prototype.constructor = North_America_class;

