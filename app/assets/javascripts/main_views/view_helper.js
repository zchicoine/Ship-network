var set_event_listeners_on_the_map_viewHelper = function(_regionName,_ViewObject)
{
    region_objects_variable.regions_objects_array().forEach(function (value)
    {
        if (value.name != _regionName)
        {
            _ViewObject.controller.set_event_listeners_on_the_map(value.region_polygon, value.name);

        }
    });
}