
var RegionView;
RegionView = function(name){
    this.name = name;
   this.html_classnames ={
        "side_panel":{"body": ".aside_ship_details_table_body",
                      "footer":".aside_ship_details_table_foot"

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

                    this_object.set_event_listeners_on_the_map(value.region_polygon, value.name);
                }
            }
        )
    }
}
RegionView.prototype.render = function(){
    this.controller.set_region_highlight_on_the_map();
    refresh_link_list_back_history(this.name,REGION_LEVEL);
    refresh_current_view(this.name);
    setSelectRegion_on_sidebar(this.name);
    var backend_results = this.backend(this.name);
    $(this.html_classnames.side_panel.body).html(backend_results.body);
    $(this.html_classnames.side_panel.footer).html(backend_results.footer);

}

RegionView.prototype.draw = function(){
    MAP.Controller.current_zoom_layer.value = REGION_LEVEL;
    this.render(this.name);
}
