
// start of Far_East class//
var Far_East_class;
Far_East_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'Far East';
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(35.179554,129.075642);

    this.areas_coordinates =
    {
        "Busan":{ 'short_name':"Busan",'coordinates':[35.179554,129.075642]},
        "Hong Kong":{ 'short_name':"H.K.",'coordinates':[22.396428,114.109497]}
    };
    this.areas_coordinates = make_json_iterable(this.areas_coordinates);

    this.list_of_countries = [ "China" , "Taiwan" , "S. Korea" , "N. Korea" , "Japan" , "Mongolia"];

    this.map_properties = {
        'color': "#20ff00",
        'label':"FAR EAST",
        'label_position':new google.maps.LatLng(35.799871, 100.609244)
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':MAP.Models.Coordinates.farEest(),
        'color':this.map_properties['color']
    }
};
Far_East_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Far_East_class
Far_East_class.prototype.constructor = Far_East_class;


