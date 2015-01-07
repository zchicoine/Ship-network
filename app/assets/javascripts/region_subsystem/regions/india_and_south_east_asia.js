
// start of South India_and_South_East_Asia class//
var India_and_South_East_Asia_class;
India_and_South_East_Asia_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'India and South East Asia';
    this.unique_identifier = this.name;
    this.lat_lang =Region_Helper.indiaAndSEA_area_coord()[0];

    this.areas_coordinates = {};
    this.areas_coordinates[Region_Helper.indiaAndSEA_area_names()[0]] = {'short_name':"S'pore",'coordinates':Region_Helper.indiaAndSEA_area_coord()[0]};
    this.areas_coordinates[Region_Helper.indiaAndSEA_area_names()[1]] = {'short_name':"Vizag" ,'coordinates':Region_Helper.indiaAndSEA_area_coord()[1]};

    this.areas_coordinates = make_json_iterable(this.areas_coordinates);

    this.list_of_countries = [  "India" , "Sri Lanka" , "Bangladesh", "Myanmar" , "Thailand" , "Malaysia"
        , "Brunei" , "Indonesia" , "Laos" , "Nepal" , "Bhutan", "Cambodia" , "Vietnam" , "Philippines" ];

    this.map_properties = {
        'color': "#006e99",
        'label':"INDIA & SE ASIA",
        'label_position':new google.maps.LatLng(24.4471,85.1660)
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':MAP.Models.Coordinates.indiaAndSEA(),
        'color':this.map_properties['color']
    }
};
India_and_South_East_Asia_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to India_and_South_East_Asia_class
India_and_South_East_Asia_class.prototype.constructor = India_and_South_East_Asia_class;


