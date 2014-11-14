/**
 * Created by Mohammed Alnakli on 2014-10-15.
 */


var GlobalView;
GlobalView = function(){

};

GlobalView.prototype.controller = {
    clear_all_listeners_of_the_regions: function(){
        region_objects_variable.regions_objects_array().forEach(function (value)
        {
            MAP.google_methods.clear_all_listeners_of_an_object(value.unique_identifier);
        })
    },
    set_event_listeners_on_the_map: function(region_object,region_name){

        MAP.events.mouseover(region_object,function(){

            clearTimeout(this.timer);
            this.timer = setTimeout(function(){
                short_region_info_show(region_name);
            },150);

            region_object.setOptions({
                fillOpacity: 0.4
            });
        });

        MAP.events.mouseout(region_object,function(){
            clearTimeout(this.timer);

            this.timer = setTimeout(function(){

                show_default_table_when_mouse_out();

            },250);

            region_object.setOptions({
                fillOpacity: 0.2
            });
        })

        MAP.events.click(region_object,function(){

            clearTimeout(this.timer);
            setTimeout(function(){
                show_default_table_when_mouse_out();
            },5);

            current_view.value = GLOBAL_LEVEL;
            current_location.value = COME_FROM_MAP;
            MainViewGeneratorInstance.regionView(region_name);
        })
    },
      set_region_highlight_on_the_map: function(){
          var this_object = this;
        region_objects_variable.regions_objects_array().forEach(function(value)
            {
                if (value.region_polygon != undefined)
                {
                    value.region_polygon.setMap(MAP.google_map());
                } else
                {
                    value.region_polygon = MAP.initialize.google_polygon(value.fusiontables_properties['coordinates'],
                        value.map_properties['color'], value.map_properties['color'], value.unique_identifier);

                    this_object.set_event_listeners_on_the_map(value.region_polygon, value.name);
                    value.region_polygon.setMap(MAP.google_map());
                }
            }
        )

    }

}


GlobalView.prototype.render = function(){

    GoogleMapAppInstance.start();
}

GlobalView.prototype.draw = function(){
    this.controller.set_region_highlight_on_the_map();
    this.render();
}

var update_global = function () {
    default_map_navigate("Global");
}
