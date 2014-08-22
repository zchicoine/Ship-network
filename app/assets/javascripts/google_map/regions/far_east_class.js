
// start of Far_East class//
var Far_East_class;
Far_East_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'Far East';
    this.lat_lang = new google.maps.LatLng(35.179554,129.075642);
    this.layer_array = [
//busan
        new google.maps.LatLng(35.179554,129.075642),
//hong kong
        new google.maps.LatLng(22.396428,114.109497)
    ];

    this.list_of_countries = [ "China" , "Taiwan" , "S. Korea" , "N. Korea" , "Japan" , "Mongolia"];

    this.map_properties = {
        'color': "#20FF00",
        'lable':"REGION",
        'lable_position':this.lat_lang
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':[],
        'color':this.map_properties['color']
    }
};
Far_East_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Far_East_class
Far_East_class.prototype.constructor = Far_East_class;


