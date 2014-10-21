
// base class
var Region_class;
Region_class = function () {
    this.name = "Global";
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(55.443528, -96.053968);
    this.areas_coordinates =
    {
        "North America":{ 'short_name':"NA",'coordinates':[29.95,-90.06667]},
        "South America":{'short_name':"SA",'coordinates':[-12.05,-77.16667]},
        "Africa":{'short_name':"Africa",'coordinates':[4.05000,9.700000]},
        "Europe":{'short_name':"Europe",'coordinates':[52.3666,4.8999]},
        "Arabia and Persian Gulf":{'short_name':"A & PG",'coordinates':[-30.559482,22.937506]},
        "India and South East Asia":{'short_name':"SEA",'coordinates':[17.686816,83.218482]},
        "Australia":{'short_name':"Aus",'coordinates':[-32.926689,151.778921]},
        "Far East":{'short_name':"F.E.",'coordinates':[35.179554,129.075642]}

    };
    this.areas_coordinates = make_json_iterable(this.areas_coordinates);


    this.list_of_countries = [];
    this.map_properties = {
        'color': "#20FF00",
        'lable':"REGION",
        'lable_position':this.lat_lang
    };
    this.region_polygon = undefined;
    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':[],
        'color':this.map_properties['color']
    };
};

Region_class.prototype.change_region_view = function () {

    MAP.google_methods.set_center(this.lat_lang);
    MAP.google_methods.set_zoom(4);
    MAP.Models.Backend.ports_info(this.name);

};

var store_navigate_back;
var store_navigate_now;
var store_navigate_next;

Region_class.prototype.scroll_between_specific_areas = function (navigate_direction){


    if(navigate_direction == NAVIGATE_NEXT){
        store_navigate_back = store_navigate_now;
        store_navigate_now =  store_navigate_next ;
        store_navigate_next = this.areas_coordinates[store_navigate_now].next;

    }else {
        store_navigate_next = store_navigate_now;
        store_navigate_now =  store_navigate_back ;
        store_navigate_back = this.areas_coordinates[store_navigate_now].back;
    }
    update_map_navigate_label_and_tooltip(this.areas_coordinates[store_navigate_back]['short_name'],this.areas_coordinates[store_navigate_next]['short_name'],store_navigate_back,store_navigate_next);
    MAP.google_methods.set_center(new google.maps.LatLng(this.areas_coordinates[store_navigate_now]['coordinates'][0],this.areas_coordinates[store_navigate_now]['coordinates'][1]));


}



Region_class.prototype.set_region_highlight_on_the_map = function (){

    if(this.region_polygon == undefined){
        this.region_polygon = MAP.initialize.google_polygon(this.fusiontables_properties['coordinates'],
            this.map_properties['color'], this.map_properties['color'], this.unique_identifier);

        event_listeners_on_the_map(this.region_polygon,this.name);
    }else{
        this.region_polygon.setMap(MAP.google_map());
    }



}
Region_class.prototype.set_map_label = function(map){

    new Label({
        text: this.map_properties['lable'],
        position: this.map_properties['lable_position'],
        map: map
    });
}
Region_class.prototype.clear_all_listeners_of_region= function(){
    MAP.google_methods.clear_all_listeners_of_an_object(this.unique_identifier);
}
// see options https://developers.google.com/maps/documentation/javascript/reference#PolygonOptions

Region_class.prototype.region_polygon_setOptions= function(options){
    if(this.region_polygon != undefined && options != undefined){
        this.region_polygon.setOptions(options);
    }

}

// end of Region class //



function event_listeners_on_the_map(region_object,region_name) {



    if(MAP.Controller.current_zoom_layer().get() == GLOBAL_LEVEL){
        MAP.events.mouseover(region_object,function(){

           // var temp = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function(){

                short_region_info_show(region_name);

            },350);
            region_object.setOptions({
                fillOpacity: 0.4
            });
      });
        MAP.events.mouseout(region_object,function(){

            clearTimeout(this.timer);

            this.timer = setTimeout(function(){

                show_default_table_when_mouse_out();

            },450);

            region_object.setOptions({
                fillOpacity: 0.2
            });
        })

        MAP.events.click(region_object,function(){
            clearTimeout(this.timer);
            show_default_table_when_mouse_out();
            zoom_to_region_level_map(region_name);
            update_region_view(region_name);

        })
    }

}
/* param: json object pass by value
   return: json object included {next: next_json_key,back:previous_json_key}
            if the value of json is not an object then the format  {'value': actual value }
*/
function make_json_iterable(json_object){
    var temp_json = JSON.parse(JSON.stringify(json_object));;
    var json_array_keys;

    // return the json keys as an array
    json_array_keys =  $.map(temp_json, function(values,keys) {return keys;});
    var length = json_array_keys.length - 1;
    var    last = length; // last item in the array
    var    first = 0;// first item in the array
    for(var i in json_array_keys){

        var back = --i;
        ++i;
        var next = ++i;
        --i;

        // make sure the json for a partical key is an object, otherwise assign to an object with the follwoing format
        // {'value': actual value }

        if ( typeof (json_object[json_array_keys[i]]) != "object")
        {
            temp_json[json_array_keys[i]] = {'value':temp_json[json_array_keys[i]] };

        }
        if(i == 0){
            temp_json[json_array_keys[i]].next = {};
            temp_json[json_array_keys[i]].back = {};
            temp_json[json_array_keys[i]].next = json_array_keys[next];
            temp_json[json_array_keys[i]].back = json_array_keys[last];

        }
        else if(i == length){
            last = json_array_keys[i];
            temp_json[json_array_keys[i]].back = {};
            temp_json[json_array_keys[i]].next = {};
            temp_json[json_array_keys[i]].back = json_array_keys[back];
            temp_json[json_array_keys[i]].next = json_array_keys[first];

        }
        else {
            temp_json[json_array_keys[i]].next = {};
            temp_json[json_array_keys[i]].back = {};
            temp_json[json_array_keys[i]].next = json_array_keys[next];
            temp_json[json_array_keys[i]].back = json_array_keys[back];

        }


    }
    return temp_json;

}


