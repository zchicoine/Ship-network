// the pupose of this class is to enable Region_Objects to be classed like the following code
// region_objects_variable.each_object().set_map_label();

var Region_Functionality;
Region_Functionality= function(){

    this.set_map_label = function(map){
        region_objects_variable.regions_objects_array().forEach(function(value){
            value.set_map_label(map);
        });

    }
    this.clear_all_listeners_of_region = function(){
        region_objects_variable.regions_objects_array().forEach(function(value){
            value.clear_all_listeners_of_region();
        })
    }
    this.region_polygon_setOptions = function(options){
        region_objects_variable.regions_objects_array().forEach(function(value){
            value.region_polygon_setOptions(options);
        })
    }
    this.clear_all_mouseout_mouseover_listeners_of_region = function(){
        region_objects_variable.regions_objects_array().forEach(function(value){
            value.clear_all_mouseout_mouseover_listeners_of_region();
        })
    }

}
