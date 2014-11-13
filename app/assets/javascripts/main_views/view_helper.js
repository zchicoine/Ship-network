var set_event_listeners_on_the_map_viewHelper = function(_ViewObject)
{
    region_objects_variable.regions_objects_array().forEach(function (value)
    {
        if (value.name != _ViewObject.name)
        {
            _ViewObject.controller.set_event_listeners_on_the_map(value.region_polygon, value.name);

        }
    });
}