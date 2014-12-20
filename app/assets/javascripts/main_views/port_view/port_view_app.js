
//app

var PortViewApp = function(){
    // make this class singleton
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    // keep list of active ports
    this.active_port= {};
    this.add_port = function(name,coordinates){
        if(this.active_port[name] == undefined) {
            this.active_port[name] = new PortView(name, coordinates);
        }
    }

};

PortViewApp.prototype.start = function(name){

    if (string_match(name)) {

        var _portViewObject =  this.active_port[name];

        switch (current_view.value)
        {
            case GLOBAL_LEVEL:
                this.come_from_global_view(_portViewObject);
                break;
            case REGION_LEVEL:
                this.come_from_region_view(_portViewObject);
                break;
            case PORT_LEVEL:
                this.come_from_port_view(_portViewObject);
                break;
            case SHIP_LEVEL:
                this.come_from_ship_view(_portViewObject);
                break;
            default:

        }

    } else {
        error_message_display("PortViewApp start function name is not string")
    }


}


PortViewApp.prototype.come_from_global_view = function(_portObject)
{
        // no functionality
}

PortViewApp.prototype.come_from_region_view = function(_portObject)
{
    if (current_location.value == COME_FROM_MAP) {
        _portObject.draw();

    }else
    {
        _portObject.draw();
    }
}
PortViewApp.prototype.come_from_port_view = function(_portObject)
{
    if (current_location.value == COME_FROM_MAP) {
        _portObject.draw();

    }else
    {

        _portObject.draw();
    }

}
PortViewApp.prototype.come_from_ship_view = function(_portObject)
{

    var _currentRegion = current_region();

    if (! GoogleMapAppInstance.is_map_shown()) {

        _portObject.controller.set_region_highlight_on_the_map(_currentRegion);
        set_event_listeners_on_the_map_viewHelper(current_region(),_portObject);
        region_objects_variable.each_object().set_map_label(MAP.google_map());
        MAP.google_controller_methods.display_ports(_currentRegion);
        region_objects_variable.return_object_region(_currentRegion).default_map_navigate();
        _portObject.draw();
    } else
    {

        _portObject.draw();

    }
}
var PortViewAppInstance = new PortViewApp();

//end app