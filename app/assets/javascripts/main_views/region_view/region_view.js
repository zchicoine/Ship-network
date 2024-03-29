
var RegionView;
RegionView = function(name){
   this.name = name;
    this.display_name = Region_Helper.regions_alter2_names()[this.name];
   this.html_classnames =
   {
        "side_panel":
        {
            "head":{"select_region": "#dropdownGoToRegion_lable"},
            "body": ".aside_ship_details_table_body",
            "footer":".aside_ship_details_table_foot"
        },
        "current_location":
        {
            "body":".current_view"
        }

    }
};
RegionView.prototype.backend = function()
{

    var _temp_object = this;
    return {
        region_data: function()
        {
            var _data;
            var results = Side_Panel.backend.get_result(_temp_object.name, REGION_LEVEL, "json", false);
            results.done(function (data)
            {
                _data = data;
            });
            return _data;
        }
    }
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

            current_location.value = COME_FROM_MAP;
            MainViewGeneratorInstance.regionView(region_name);

        })
    },
    set_region_highlight_on_the_map: function(region_name)
    {
        var this_object = this;
        region_objects_variable.regions_objects_array().forEach(function (value)
            {

                    if (value.region_polygon != undefined)
                    {
                        value.region_polygon.setMap(MAP.google_map());
                    } else
                    {
                        value.region_polygon = MAP.initialize.google_polygon(value.fusiontables_properties['coordinates'],
                                   value.map_properties['color'], value.map_properties['color'], value.unique_identifier);
                        value.region_polygon.setMap(MAP.google_map());
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
    Back_History.link_list(this.display_name,this.name,REGION_LEVEL)

    var backend_results = this.backend().region_data();

    // when a user select a region on side panel, the region name will be displayed and highlighted.
    $(this.html_classnames.side_panel.head.select_region).html(this.display_name);
    $('.dropdown-menu.map_controller_go_to_region').children().removeClass('highlight-clicked-row');
    $("#" + remove_white_space(this.name) + "_inside_dropdown_main").addClass('highlight-clicked-row');

    $(this.html_classnames.side_panel.body).htmlCustom(backend_results.body);
    $(this.html_classnames.side_panel.footer).htmlCustom(backend_results.footer);
    $(this.html_classnames.current_location.body).html(this.display_name);
}

RegionView.prototype.draw = function()
{
    MAP.Controller.current_zoom_layer.value = REGION_LEVEL;
    this.controller.map_customization(this.name);
    MapNavigateInstance.default_map_navigate(this.name);
    this.render();
}
