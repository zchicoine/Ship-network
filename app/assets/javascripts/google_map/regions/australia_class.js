
// start of Australia  class//
var Australia_class;
Australia_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = "Australia";
    this.lat_lang = new google.maps.LatLng(-32.926689,151.778921);
    this.layer_array = [
        //new castle
        new google.maps.LatLng(-32.926689,151.778921),
        //danpier
        new google.maps.LatLng(-20.663799,116.708460)
    ];

    this.list_of_countries = [  "Australia" , "New Zealand" , "East Timor", "Papua New Guinea" , "Solomon Is." , "Vanuatu", "Fiji" , "New Caledonia"];

    this.map_properties = {
        'color': "#20FF00",
        'lable':"AUSTRALIA",
        'lable_position':new google.maps.LatLng(-25.8000, 133.2422)
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':[],
        'color':this.map_properties['color']
    };

};
Australia_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Australia_class
Australia_class.prototype.constructor = Australia_class;



