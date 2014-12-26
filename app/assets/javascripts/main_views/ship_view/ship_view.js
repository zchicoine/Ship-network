

// ShipView Class
var ShipView;
ShipView = function(name){
    this.name = name;
    this.display_name = this.name;

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
ShipView.prototype.backend = function(){


}
ShipView.prototype.controller = {
    set_event_listeners_on_the_map: function(region_object,region_name){

        MAP.events.click(region_object,function(){

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
    },map_customization:function(){

    }
}
ShipView.prototype.render = function(){

    send_data_to_side_bar(this.name , SHIP_LEVEL);
    Back_History.link_list(this.display_name,this.name,SHIP_LEVEL);
    //$(this.html_classnames.current_location.body).html(this.name); // this feature is turn off
}

ShipView.prototype.draw = function(){
    MAP.Controller.current_zoom_layer.value = SHIP_LEVEL;
    this.controller.map_customization();
    this.render();
}


