
// start of South America class class//
var South_America_class;
South_America_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'South America';
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(-12.05,-77.16667);

    this.areas_coordinates =
    {
        "Recalada":{ 'short_name':"Recalada",'coordinates':[-34.7878,-55.8831]},
        "Callao":{ 'short_name':"Callao",'coordinates':[-12.05,-77.16667]},
        "Georgetown":{ 'short_name':"Georgetown",'coordinates':[6.81667,-58.16667]}
    };
    this.areas_coordinates = make_json_iterable(this.areas_coordinates);


    this.list_of_countries = [ "Colombia" , "Venezuela", "Guyana" , "Suriname" , "French Guiana" , "Trindad and Tobago"
        , "Barbados" , "Grenada" , "St Vincent and the Grenadines" , "St Lucia", "Martinique" , "Dominica" , "St Kitts and Nevis" , "Uruguay"
        , "Argentina" , "Brazil" , "Chile" , "Peru", "Ecuador" , "Antigua & Barbuda" , "Guadeloupe"
        , "Falkland Is.", "Trinidad and Tobago" , "Bolivia" , "Paraguay"];


    this.map_properties = {
        'color': "#0055FF",
        'lable':"SOUTH AMERICA",
        'lable_position':new google.maps.LatLng(-10.4893, -59.3594)
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':[],
        'color':this.map_properties['color']
    }
};
South_America_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to South_America_class
South_America_class.prototype.constructor = South_America_class;



