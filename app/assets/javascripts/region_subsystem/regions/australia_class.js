
// start of Australia  class//
var Australia_class;
Australia_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = "Australia";
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(-32.926689,151.778921);

    this.areas_coordinates =
    {
        "New Castle":{'short_name':"N.C.",'coordinates':[-32.926689,151.778921]},
        "Danpier":{ 'short_name':"Danpier",'coordinates':[-20.663799,116.708460]}
    };
    this.areas_coordinates = make_json_iterable(this.areas_coordinates);
    this.list_of_countries = [  "Australia" , "New Zealand" , "East Timor", "Papua New Guinea" , "Solomon Is." , "Vanuatu", "Fiji" , "New Caledonia", "Samoa", "Tuvalu", "Nauru"];

    this.map_properties = {
        'color': "#20FF00",
        'lable':"AUSTRALIA",
        'lable_position':new google.maps.LatLng(-25.8000, 133.2422)
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':MAP.Models.Coordinates.australia(),
        'color':this.map_properties['color']
    };

};
Australia_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Australia_class
Australia_class.prototype.constructor = Australia_class;



