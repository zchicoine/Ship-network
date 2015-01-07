/**
 * Created by Mohammed Alnakli on 2014-10-15.
 */


var GlobalView;
GlobalView = function(){

    this.name = "Global";
    this.display_name = this.name;
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

GlobalView.prototype.backend = function()
{
    var _temp_object = this;
       return {
            global_data: function ()
            {
                var _data;
                var results = Side_Panel.backend.get_result(_temp_object.name, GLOBAL_LEVEL, "json", false);
                results.done(function (data)
                {
                    _data = data;
                });
                return _data;
            },
            region_data: function (name)
            {
                var _data;
                var results = Side_Panel.backend.get_result(name, GLOBAL_LEVEL, "json", false, "side_panel/region_short_info");
                results.done(function (data)
                {
                    _data = data;
                });
                return _data;
            }
        }


}

GlobalView.prototype.controller = {
    clear_all_listeners_of_the_regions: function(){
        region_objects_variable.regions_objects_array().forEach(function (value)
        {
            MAP.google_methods.clear_all_listeners_of_an_object(value.unique_identifier);
        })
    },
    set_event_listeners_on_the_map: function(region_object,region_name){

        var _globalInstance = new GlobalView();
        MAP.events.mouseover(region_object,function(){

            clearTimeout(this.timer);
            this.timer = setTimeout(function(){
                _globalInstance.when_mouseover_a_region(region_name);
            },150);

            region_object.setOptions({
                fillOpacity: 0.4
            });
        });

        MAP.events.mouseout(region_object,function(){
            clearTimeout(this.timer);

            this.timer = setTimeout(function(){

                _globalInstance.when_mouseout_a_region();

            },250);

            region_object.setOptions({
                fillOpacity: 0.2
            });
        })

        MAP.events.click(region_object,function(){

            clearTimeout(this.timer);
            setTimeout(function(){
               // since the side panel  will be the same when click on the region, the when_mouseout_a_region() will not be used
               //  _globalInstance.when_mouseout_a_region();
            },5);

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
    Back_History.link_list(this.display_name,this.name,GLOBAL_LEVEL)
}

/**
 *  this function should be call when a user hover over a region on GLOBAL_LEVEL
 * @param region_name
 */
GlobalView.prototype.when_mouseover_a_region = function(region_name){

    var _data =  this.backend().region_data(region_name);
    $(this.html_classnames.side_panel.body).htmlCustom(_data.body);
    $(this.html_classnames.side_panel.footer).htmlCustom(_data.footer);
}
/**
 * display the global statistics
 */
GlobalView.prototype.when_mouseout_a_region = function(){

    var _data =  this.backend().global_data();
    $(this.html_classnames.side_panel.body).htmlCustom(_data.body);
    $(this.html_classnames.side_panel.footer).htmlCustom(_data.footer);
}

GlobalView.prototype.draw = function(){
    this.controller.set_region_highlight_on_the_map();
    MAP_Navigate.default_map_navigate("Global");
    this.render();
}
