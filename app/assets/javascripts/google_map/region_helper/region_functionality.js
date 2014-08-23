// the pupose of this class is to enable Region_Objects to be classed like the following code
// REGION_OBJECTS.each_object().set_map_label();

var Region_Functionality;
Region_Functionality= function(){

    this.set_map_label = function(){
        REGION_OBJECTS.regions_objects_array().forEach(function(value){
            value.set_map_label();
        });

    }
    this.highlight_the_region = function(country_name,country_coordinates){
        REGION_OBJECTS.regions_objects_array().forEach(function(value){
            value.highlight_the_region(country_name,country_coordinates);
        });

    }
   this.fornow = function(){
       REGION_OBJECTS.regions_objects_array().forEach(function(value){
           value.fornow();
       })

   }

}
