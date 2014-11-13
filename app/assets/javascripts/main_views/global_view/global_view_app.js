
//app

var GlobalViewApp = function(){

    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    this.globalViewInstance = new GlobalView();

};

GlobalViewApp.prototype.start = function(){

    this.globalViewInstance.draw();
}
GlobalViewApp.prototype.start_view = function(_ViewObject)
{

    if( _ViewObject instanceof RegionView )
    {
        this.globalViewInstance.controller.clear_all_listeners_of_the_regions();
        region_objects_variable.return_object_region(_ViewObject.name).region_polygon_setOptions({'clickable':false});
        _ViewObject.draw();
        set_event_listeners_on_the_map_viewHelper(_ViewObject);
    }
}

var GlobalViewAppInstance = new GlobalViewApp();

//end app