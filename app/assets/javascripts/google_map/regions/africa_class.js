
// start of Africa class class//
var Africa_class;
Africa_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'Africa';
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(4.05000,9.700000);

    this.areas_coordinates =
    {
        "Douala":{'short_name':"douala",'coordinates':[4.05000,9.700000]},
        "Durban":{ 'short_name':"Durban",'coordinates':[-29.858680,31.021840]},
        "Default1":{ 'short_name':"Default",'coordinates':[11.825138,42.590275]}
    };
    this.areas_coordinates = make_json_iterable(this.areas_coordinates);
    this.list_of_countries = [ "Egypt", "Libya" ,"Botswana" , "Tunisia", "Algeria" , "Morocco" , "Senegal" , "Chad"
        , "Gambia" , "Guinea-Bissau" , "Guinea" , "Sierra Leone", "Liberia" , "Cote d'Ivoire" , "Ghana" ,"Togo",
       "Benin" , "Nigeria", "Cameroon", "Equatorial Guinea", "Gabon" , "Democratic Republic of the Congo" , "Angola" ,"Namibia"
        , "South Africa" , "Mozambique" , "Madagascar" , "Tanzania", "Kenya" , "Somalia" , "Djibouti" , "Eritrea"
        , "Sudan" , "Mauritania" , "Ethiopia" , "Mali" , "Zambia", "Zimbabwe" , "S. Sudan" , "Central African Rep." , "Ivory Coast"
        , "Niger" , "Dominican Rep." , "Burkina Faso", "Rwanda", "Burundi", "Congo (Kinshasa)" , "Uganda" , "Congo (Brazzaville)"
        , "Malawi" , "Somaliland" , "W. Sahara" , "Swaziland", "Guinea Bissau" , "Eq. Guinea" , "Lesotho"];

    this.map_properties = {
        'color': "#0055FF",
        'lable':"AFRICA",
        'lable_position':new google.maps.LatLng(17.6493, 11.5994)
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':[],
        'color':this.map_properties['color']
    };


};
Africa_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to South_America_class
Africa_class.prototype.constructor = Africa_class;




