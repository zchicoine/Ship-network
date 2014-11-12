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
        var _regionObject =  this.active_region[name];
        if(current_view.value == GLOBAL_LEVEL)
        {
            // delete all the event on the map. it will be re assign in region view
            GlobalViewAppInstance.globalViewInstance.controller.clear_all_listeners_of_the_regions();
            region_objects_variable.return_object_region(name).region_polygon_setOptions({'clickable':false});
            _regionObject.draw();
            region_objects_variable.regions_objects_array().forEach(function (value)
            {
                if(value.name != name )
                {
                    _regionObject.controller.set_event_listeners_on_the_map(value.region_polygon, value.name);

                }
            });

        }else if(current_view.value == REGION_LEVEL)
        {
            // delete all the event on the map. it will be re assign in region view
            _regionObject.controller.clear_all_listeners_of_the_regions();
            region_objects_variable.each_object().region_polygon_setOptions({'clickable':true});
            region_objects_variable.return_object_region(name).region_polygon_setOptions({'clickable':false});
            MAP.Controller.current_zoom_layer.value = REGION_LEVEL;
            _regionObject.controller.map_customization(_regionObject.name);
            _regionObject.render();
            region_objects_variable.regions_objects_array().forEach(function (value)
            {
                if(value.name != name )
                {
                    _regionObject.controller.set_event_listeners_on_the_map(value.region_polygon, value.name);

                }
            });
            if(current_location.value == COME_FROM_MAP){

                default_map_navigate(_regionObject.name);

            }else {

                default_map_navigate(_regionObject.name);

            }

        }else if(current_view.value == PORT_LEVEL){
            console.log("inside port level");


        }else if(current_view == SHIP_LEVEL){

            console.log("inside ship level");
        }

    } else {
        error_message_display("RegionViewApp start function name is not string")
    }

}

var RegionViewAppInstance = new RegionViewApp();
//end app