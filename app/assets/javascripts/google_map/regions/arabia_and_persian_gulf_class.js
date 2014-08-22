
// start of South Arabia_and_Persian_Gulf class//
var Arabia_and_Persian_Gulf_Class;
Arabia_and_Persian_Gulf_Class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this,"Arabia and Persian Gulf");


};
Arabia_and_Persian_Gulf_Class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Arabia_and_Persian_Gulf_Class
Arabia_and_Persian_Gulf_Class.prototype.constructor = Arabia_and_Persian_Gulf_Class;

Arabia_and_Persian_Gulf_Class.prototype.change_region_view = function() {
    window.map.setCenter(new google.maps.LatLng(33.1376, 47.6367));
    window.map.setZoom(3);
    update_region_view(this.name);

};

