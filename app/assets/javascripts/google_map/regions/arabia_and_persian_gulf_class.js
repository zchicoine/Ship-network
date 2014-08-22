
// start of South Arabia_and_Persian_Gulf class//
var Arabia_and_Persian_Gulf_Class;
Arabia_and_Persian_Gulf_Class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = "Arabia and Persian Gulf";
    this.lat_lang = new google.maps.LatLng(-30.559482,22.937506);
    this.layer_array = [
        //sur
        new google.maps.LatLng(-30.559482,22.937506),
        //bandar
        new google.maps.LatLng(26.371015,31.847656),
        //
        new google.maps.LatLng(32.634765,51.340669)
    ];
};
Arabia_and_Persian_Gulf_Class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Arabia_and_Persian_Gulf_Class
Arabia_and_Persian_Gulf_Class.prototype.constructor = Arabia_and_Persian_Gulf_Class;



