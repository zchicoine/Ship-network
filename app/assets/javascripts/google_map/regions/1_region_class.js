// to make sure is load first

// base class
var Region_class;
Region_class = function () {
    this.name = "Global";
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(55.443528, -96.053968);
    this.areas_coordinates =
    {
        "North America":{ 'short_name':"North America",'coordinates':[29.95,-90.06667]},
        "Africa":{'short_name':"Africa",'coordinates':[4.05000,9.700000]},
        //"South America":{'short_name':"South America",'coordinates':[-12.05,-77.16667]},
       // "Arabia and Persian Gulf":{'short_name':"Arabia & PG",'coordinates':[-30.559482,22.937506]},
       // "Europe":{'short_name':"Europe",'coordinates':[52.3666,4.8999]},
        "India and South East Asia":{'short_name':"India & SEA",'coordinates':[17.686816,83.218482]},
        "Far East":{'short_name':"Far East",'coordinates':[35.179554,129.075642]}
      //  "Australia":{'short_name':"Australia",'coordinates':[-32.926689,151.778921]}
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

    MAP.google_common_methods.set_center(this.lat_lang);
    MAP.google_common_methods.set_zoom(3);
    MAP.google_controller_methods.get_port_coordinates(this.name);
     reset_globals_variable_that_associate_with_regions_classes();

};

var store_navigate_back;
var store_navigate_now;
var store_navigate_next;

Region_class.prototype.scroll_between_specific_areas = function (navigate_direction){


if( !(store_navigate_back && store_navigate_next && store_navigate_now ) ){
    json_arry_keys =  $.map(this.areas_coordinates, function(values,keys) {return keys;});
    store_navigate_back =   json_arry_keys[(json_arry_keys.length - 1)] ;
    store_navigate_now =  json_arry_keys[0];
    store_navigate_next = json_arry_keys[1];
}

    if(navigate_direction == NAVIGATE_NEXT){
        store_navigate_back = store_navigate_now;
        store_navigate_now =  store_navigate_next ;
        store_navigate_next = this.areas_coordinates[store_navigate_now].next;

    }else {
        store_navigate_next = store_navigate_now;
        store_navigate_now =  store_navigate_back ;
        store_navigate_back = this.areas_coordinates[store_navigate_now].back;
    }

        MAP.google_common_methods.set_center(new google.maps.LatLng(this.areas_coordinates[store_navigate_now]['coordinates'][0],this.areas_coordinates[store_navigate_now]['coordinates'][1]));


}

Region_class.prototype.extract_region_coordinates = function (data){

    if(this.region_polygon == undefined){
        for (var i in data) {
            country_name = data[i][0];
            country_coordinates = data[i][1];

            if( this.fusiontables_properties["countries"].indexOf(country_name) > -1 ){
                if (country_coordinates['geometries']) {
                    for (var j in country_coordinates['geometries']) {
                        this.fusiontables_properties['coordinates'].push(constructNewCoordinates(country_coordinates['geometries'][j]));

                    }

                } else {
                    this.fusiontables_properties['coordinates'].push(constructNewCoordinates(country_coordinates['geometry']));

                }

            }
        }
    }




}

Region_class.prototype.set_region_highlight_on_the_map = function (){

    if(this.region_polygon == undefined){
        this.region_polygon = MAP.initialize.create_polygon(this.fusiontables_properties['coordinates'],
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
    MAP.google_common_methods.clear_all_listeners_of_an_object(this.unique_identifier);
}
// see options https://developers.google.com/maps/documentation/javascript/reference#PolygonOptions

Region_class.prototype.region_polygon_setOptions= function(options){
    if(this.region_polygon != undefined && options != undefined){
        this.region_polygon.setOptions(options);
    }

}

// end of Region class //


function constructNewCoordinates(polygon) {
    var newCoordinates = [];
    var coordinates = polygon['coordinates'][0];
    for (var i in coordinates) {
        newCoordinates.push(
            new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
    }
    return newCoordinates;
}

function event_listeners_on_the_map(region_object,region_name) {



    if(MAP.state_information.current_layer().get() == GLOBAL_LEVEL){
        MAP.events.mouseover(region_object,function(){
            region_object.setOptions({
                fillOpacity: 0.4
            });
        });
        MAP.events.mouseout(region_object,function(){
            region_object.setOptions({
                fillOpacity: 0.2
            });
        })

        MAP.events.click(region_object,function(){
            zoom_to_region_level_map(region_name);
            update_region_view(region_name);

        })
    }

}
// pass by value
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

function reset_globals_variable_that_associate_with_regions_classes(){
    store_navigate_back = undefined;
    store_navigate_now= undefined;
    store_navigate_next= undefined;
}
