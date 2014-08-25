// to make sure is load first
var listener_array = [];
// base class
var Region_class;
Region_class = function () {
    this.name = "Global";
    this.lat_lang = new google.maps.LatLng(55.443528, -96.053968);
    this.layer_array = [
            //north america
                    new google.maps.LatLng(29.95,-90.06667),
            //south america
                    new google.maps.LatLng(-12.05,-77.16667),
            //africa..douala
                    new google.maps.LatLng(4.05000,9.700000),
            //PG
                    new google.maps.LatLng(-30.559482,22.937506),
            //europe
                    new google.maps.LatLng(52.3666,4.8999),
            //sea
                    new google.maps.LatLng(17.686816,83.218482),
            //aus
                    new google.maps.LatLng(-32.926689,151.778921),
            //busan
                    new google.maps.LatLng(35.179554,129.075642)
                ];

    this.list_of_countries = [];
    this.map_properties = {
        'color': "#20FF00",
        'lable':"REGION",
        'lable_position':this.lat_lang
    };
    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':[],
        'color':this.map_properties['color']
    };
};

Region_class.prototype.change_region_view = function () {

    MAP.google_common_methods.set_center(this.lat_lang);
    MAP.google_common_methods.set_zoom(3);
    MAP.state_information.current_layer().set(REGION_LEVEL);

    update_region_view(this.name);
    send_data_to_get_port_coordinates(this.name);
    listener_array.forEach(function(value){ MAP.google_common_methods.clear_listener(value);})

};
var i=0;
Region_class.prototype.scroll_between_specific_areas = function (){

    var a = new Field("test");
    a.setValue(this.layer_array);
    var temp = a.getValue();

    if (i != (temp.length - 1)) {
        MAP.google_common_methods.set_center(temp[i]);
        //	window.google_map.setZoom(5);
        i++;

    }
    else if (i == (temp.length - 1)) {
        //alert(temp[i]);
        MAP.google_common_methods.set_center(temp[(temp.length - 1)]);
        //	window.google_map.setZoom(5);
        i = 0;

    }
}

Region_class.prototype.extract_region_coordinates = function (country_name,country_coordinates){

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

Region_class.prototype.set_region_highlight_on_the_map = function (){

    var region =  MAP.initialize.create_polygon(this.fusiontables_properties['coordinates'],
        this.map_properties['color'],this.map_properties['color']);

    event_listeners_on_the_map(region,this.name);

}
Region_class.prototype.set_map_label = function(map){

    new Label({
        text: this.map_properties['lable'],
        position: this.map_properties['lable_position'],
        map: map
    });
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

    listener_array.push(region_object);
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
            REGION_OBJECTS.return_object_region(region_name).change_region_view();
        })
    }

}
