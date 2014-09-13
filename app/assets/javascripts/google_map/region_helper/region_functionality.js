// the pupose of this class is to enable Region_Objects to be classed like the following code
// region_objects_variable.each_object().set_map_label();

var Region_Functionality;
Region_Functionality= function(){

    this.set_map_label = function(map){
        region_objects_variable.regions_objects_array().forEach(function(value){
            value.set_map_label(map);
        });

    }
    this.extract_region_coordinates = function(data){
        region_objects_variable.regions_objects_array().forEach(function(value){
            value.extract_region_coordinates(data);
        });

    }
   this.set_region_highlight_on_the_map = function(){
       region_objects_variable.regions_objects_array().forEach(function(value){
           value.set_region_highlight_on_the_map();
       })

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

}
