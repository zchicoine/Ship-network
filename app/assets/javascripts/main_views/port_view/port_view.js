

// PortView Class
var PortView;
PortView = function(name, coordinates){
    this.name = name;
    this.coordinates = coordinates;
    this.html_classnames ={
        "side_panel":{"body": ".aside_ship_details_table_body",
            "footer":".aside_ship_details_table_foot"

        }

    }
};
PortView.prototype.backend = function(){


}
PortView.prototype.controller = {
    set_event_listeners_on_the_map: function(region_object,region_name){

        MAP.events.click(region_object,function(){

            zoom_to_region_level_map(region_name);
            RegionViewAppInstance.start(region_name);
        })
    },
    set_region_highlight_on_the_map: function()
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

                    //this_object.set_event_listeners_on_the_map(value.region_polygon, value.name);
                }
            }
        )
    }
}
PortView.prototype.render = function(){
    this.controller.set_region_highlight_on_the_map();
    send_data_to_side_bar(this.name , PORT_LEVEL);
    refresh_link_list_back_history(this.name,PORT_LEVEL);
    refresh_current_view(this.name);
    MAP.google_methods.set_center(this.coordinates);

}

PortView.prototype.draw = function(){
    MAP.Controller.current_zoom_layer.value = PORT_LEVEL;
    this.render(this.name , this.coordinates);
}


