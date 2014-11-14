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

RegionViewApp.prototype.start = function (name)
{
    if (string_match(name)) {

        this.add_region(name);
        var _regionViewObject =  this.active_region[name];

        createView(current_view.value).start_view(_regionViewObject);

    } else {
        error_message_display("RegionViewApp start function name is not string")
    }

}
RegionViewApp.prototype.start_view = function(_ViewObject)
{
    if( _ViewObject instanceof RegionView ) {
        var _currentRegion = current_region();
        var _regionObject =      region_objects_variable.return_object_region(_ViewObject.name);
        _ViewObject.controller.clear_all_listeners_of_the_regions();
        region_objects_variable.each_object().region_polygon_setOptions({'clickable': true});
        _regionObject.region_polygon_setOptions({'clickable': false});

        set_event_listeners_on_the_map_viewHelper(_ViewObject.name,_ViewObject);

        if (current_location.value == COME_FROM_MAP) {

            _regionObject.default_map_navigate(_currentRegion);

        }else
        {

            _regionObject.default_map_navigate();

        }
        MAP.Controller.current_zoom_layer.value = REGION_LEVEL;
        _ViewObject.controller.map_customization(_ViewObject.name);
        _ViewObject.render();

    }else if(_ViewObject instanceof PortView)
    {
        if (current_location.value == COME_FROM_MAP) {
            console.log("called region");
            _ViewObject.draw();

        }else
        {

            _ViewObject.draw();

        }

    }

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