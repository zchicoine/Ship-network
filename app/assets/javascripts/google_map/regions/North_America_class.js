// start of NorthAmerica class//
var North_America_class;
North_America_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'North America';
    this.lat_lang = new google.maps.LatLng(55.443528, -96.053968);
    this.layer_array =[
        new google.maps.LatLng(29.95,-90.06667),
        //Recalada
        new google.maps.LatLng(40.71667,-74)
    ];

    this.list_of_countries = [ 'Antarctica' , "Canada" , "Mexico", "Greenland" , "Guatemala" , "Belize" , "El Salvador"
        , "Honduras" , "Nicaragua" , "Costa Rica" , "Panama", "Cuba" , "Haiti" , "Dominican Republic" , "Jamaica"
        , "Bahamas" , "Bermuda" , "United States", "Puerto Rico"];

    this.map_properties = {
        'color': "#20FF00",
        'lable':"REGION",
        'lable_position':this.lat_lang
    };
};
North_America_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to North_America_class
North_America_class.prototype.constructor = North_America_class;

