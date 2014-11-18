//app

var RegionViewApp = function ()
{

    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    // keep list of active regions

    this.active_region = {};
    this.add_region = function (name)
    {
        if (this.active_region[name] == undefined) {
            this.active_region[name] = new RegionView(name);
        }
    }

};

// start this regionViewApp
RegionViewApp.prototype.start = function (name)
{
    if (string_match(name)) {

        this.add_region(name);
        var _regionViewObject =  this.active_region[name];
        /*
         current_view.value: return the view level {Global, Region, Port or Ship}
         */
        switch (current_view.value)
        {
            case GLOBAL_LEVEL:
                this.come_from_global_view(_regionViewObject);
                break;
            case REGION_LEVEL:
                this.come_from_region_view(_regionViewObject);
                break;
            case PORT_LEVEL:
                this.come_from_port_view(_regionViewObject);
                break;
            case SHIP_LEVEL:
                this.come_from_ship_view(_regionViewObject);
                break;
            default:

        }

    } else {
        error_message_display("RegionViewApp start function name is not string")
    }

}

RegionViewApp.prototype.come_from_global_view = function(_regionView)
{
    GlobalViewAppInstance.globalViewInstance.controller.clear_all_listeners_of_the_regions();
    region_objects_variable.return_object_region(_regionView.name).region_polygon_setOptions({'clickable':false});
    _regionView.draw();
    set_event_listeners_on_the_map_viewHelper(_regionView.name,_regionView);
}

RegionViewApp.prototype.come_from_region_view = function(_regionView)
{
    var _currentRegion = current_region();
    var _regionObject =      region_objects_variable.return_object_region(_regionView.name);
    _regionView.controller.clear_all_listeners_of_the_regions();
    region_objects_variable.each_object().region_polygon_setOptions({'clickable': true});
    _regionObject.region_polygon_setOptions({'clickable': false});

    set_event_listeners_on_the_map_viewHelper(_regionView.name,_regionView);

    if (current_location.value == COME_FROM_MAP) {

        _regionObject.default_map_navigate(_currentRegion);

    }else
    {

        _regionObject.default_map_navigate();

    }
    MAP.Controller.current_zoom_layer.value = REGION_LEVEL;
    _regionView.controller.map_customization(_regionView.name);
    _regionView.render();
}


RegionViewApp.prototype.come_from_port_view = function(_regionView)
{
    this.come_from_region_view(_regionView);
}


RegionViewApp.prototype.come_from_ship_view = function(_regionObject)
{

    var _currentRegion = current_region();

    if (! GoogleMapAppInstance.is_map_shown()) {

        set_event_listeners_on_the_map_viewHelper(_currentRegion,_regionObject);
        region_objects_variable.each_object().set_map_label(MAP.google_map());
        region_objects_variable.return_object_region(_currentRegion).default_map_navigate();
        _regionObject.draw();
    } else
    {

        _regionObject.draw();

    }
}

var RegionViewAppInstance = new RegionViewApp();
//end app