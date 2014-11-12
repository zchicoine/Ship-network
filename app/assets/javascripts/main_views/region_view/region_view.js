
var RegionView;
RegionView = function(name){
    this.name = name;
   this.html_classnames =
   {
        "side_panel":
        {
            "body": ".aside_ship_details_table_body",
            "footer":".aside_ship_details_table_foot"
        },
        "current_location":
        {
            "body":".current_view"
        }

    }
};
RegionView.prototype.backend = function(){

  var _data;
  var results =   Side_Panel.backend.get_result(this.name,REGION_LEVEL,"json",false);
     results.done( function(data) {
         _data =  data;
    });
    return _data;
}
RegionView.prototype.controller = {
    clear_all_listeners_of_the_regions: function(){
        region_objects_variable.regions_objects_array().forEach(function (value)
        {
            MAP.google_methods.clear_all_listeners_of_an_object(value.unique_identifier);
        })
    },
    set_event_listeners_on_the_map: function(region_object,region_name){

        MAP.events.click(region_object,function(){

            current_view.value = REGION_LEVEL;
            current_location.value = COME_FROM_MAP;
            RegionViewAppInstance.start(region_name);

        })
    },
    set_region_highlight_on_the_map: function(region_name)
    {
        var this_object = this;
        region_objects_variable.regions_objects_array().forEach(function (value)
            {
                // do not assigned my self to an event
                if(value.name != region_name)
                {
                    if (value.region_polygon != undefined)
                    {
                        value.region_polygon.setMap(MAP.google_map());
                    } else
                    {
                        value.region_polygon = MAP.initialize.google_polygon(value.fusiontables_properties['coordinates'],
                                   value.map_properties['color'], value.map_properties['color'], value.unique_identifier);

                    }

                }

            }
        )
    },map_customization:function(region_name)
    {
        // highlight a region and set the events
        this.set_region_highlight_on_the_map(region_name);
        MAP.google_methods.set_center(region_objects_variable.return_object_region(region_name).lat_lang);
        MAP.google_methods.set_zoom(4);
        MAP.google_controller_methods.display_ports(region_name);
    }

}

RegionView.prototype.render = function()
{
    refresh_link_list_back_history(this.name,REGION_LEVEL);
    setSelectRegion_on_sidebar(this.name);
    var backend_results = this.backend(this.name);
    $(this.html_classnames.side_panel.body).html(backend_results.body);
    $(this.html_classnames.side_panel.footer).html(backend_results.footer);
    $(this.html_classnames.current_location.body).html(this.name);
}

RegionView.prototype.draw = function()
{
    MAP.Controller.current_zoom_layer.value = REGION_LEVEL;
    this.controller.map_customization(this.name);
    default_map_navigate(this.name);
    this.render();
}
