// the pupose of this class is to enable Region_Objects to be classed like the following code
// region_objects_variable.each_object().set_map_label();

var Region_Functionality;
Region_Functionality= function(){

    this.set_map_label = function(map){
        region_objects_variable.regions_objects_array().forEach(function(value){
            value.set_map_label(map);
        });

    }
    this.extract_region_coordinates = function(country_name,country_coordinates){
        region_objects_variable.regions_objects_array().forEach(function(value){
            value.extract_region_coordinates(country_name,country_coordinates);
        });

    }
   this.set_region_highlight_on_the_map = function(){
       region_objects_variable.regions_objects_array().forEach(function(value){
           value.set_region_highlight_on_the_map();
       })

   }

}
