
var Region_Helper = {};


// the purpose of this function is to enable Region_Objects to be classed like the following code
// region_objects_variable.each_object().set_map_label();

Region_Helper.Region_Functionality= function(){

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

/**
 * return a json file which is local in public/external_files/regions_database.json
 * @returns {*}
 */
Region_Helper.access_json_file = (function()
{
    var _data = [];
    $.ajax({
        url:"/external_files/regions_database.json",
        type: 'GET',
        dataType: "json",
        async:false,
        error: function(xhr, ajaxOptions, thrownError){

            error_message_display(thrownError)
        }
    }).done(function (data)
    {
        _data = data;
    });
    return _data;
}).once();
