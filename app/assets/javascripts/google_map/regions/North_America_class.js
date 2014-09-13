// start of NorthAmerica class//
var North_America_class;
North_America_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'North America';
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(55.443528, -96.053968);

    this.areas_coordinates =
    {
        "Recalada":{ 'short_name':"Recalada",'coordinates':[40.71667,-74]},
        "Default1":{ 'short_name':"Default",'coordinates':[29.95,-90.06667]}
    };
    this.areas_coordinates = make_json_iterable(this.areas_coordinates);

    this.list_of_countries = [  "Canada" , "Mexico", "Greenland" , "Guatemala" , "Belize" , "El Salvador"
        , "Honduras" , "Nicaragua" , "Costa Rica" , "Panama", "Cuba" , "Haiti" , "Dominican Republic" , "Jamaica"
        , "Bahamas" , "Bermuda" , "United States", "Puerto Rico"];

    this.map_properties = {
        'color': "#20FF00",
        'lable':"NORTH AMERICA",
        'lable_position':new google.maps.LatLng(48.2893, -99.3594)
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':[],
        'color':this.map_properties['color']
    }
};
North_America_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to North_America_class
North_America_class.prototype.constructor = North_America_class;

