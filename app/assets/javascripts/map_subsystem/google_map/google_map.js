

var GoogleMapApp;
GoogleMapApp = function(){
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

  //  this.map = MAP.google_map();
};

GoogleMapApp.prototype.start = function(){
    google.maps.event.addDomListenerOnce(window, 'load', initialize_the_map);
}

GoogleMapApp.prototype.is_map_shown = function()
{
    if(current_location.value != COME_FROM_MOTOR_VESSEL)
        return true;

    MAP.google_map(true);
    return false;
}


function initialize_the_map() {


   var map = MAP.google_map();
    region_objects_variable.each_object().set_map_label(map);
    update_global();

}

// create an instance of google map app
var GoogleMapAppInstance = new GoogleMapApp();
