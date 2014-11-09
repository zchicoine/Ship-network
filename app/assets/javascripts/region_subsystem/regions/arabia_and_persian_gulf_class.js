
// start of South Arabia_and_Persian_Gulf class//
var Arabia_and_Persian_Gulf_Class;
Arabia_and_Persian_Gulf_Class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = "Arabia and Persian Gulf";
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(22.58333333332,59.4833333334);
    this.areas_coordinates =
    {
        "Sur":{'short_name':"Sur",'coordinates':[22.58333333332,59.4833333334]},
        "Bandar Imam Khomeini":{ 'short_name':"BIK",'coordinates':[30.4333333334,49.08333333336]}

    };
    this.areas_coordinates = make_json_iterable(this.areas_coordinates);


    this.list_of_countries = [  "Jordan" , "Yemen" , "Oman" , "United Arab Emirates" , "Qatar" , "Bahrain" , "Turkmenistan"
        , "Kuwait" , "Iraq" , "Iran" , "Saudi Arabia", "Afghanistan" , "Uzbekistan" , "Pakistan" , "Kazakhstan"
        , "Azerbaijan" , "Tajikistan" , "Kyrgyzstan" , "N. Cyprus"
    ];

    this.map_properties = {
        'color': "#14edf7",
        'lable':"ARABIA & PG",
        'lable_position':new google.maps.LatLng(33.1376, 47.6367)
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':MAP.Models.Coordinates.arabia_pg(),
        'color':this.map_properties['color']
    }
};
Arabia_and_Persian_Gulf_Class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Arabia_and_Persian_Gulf_Class
Arabia_and_Persian_Gulf_Class.prototype.constructor = Arabia_and_Persian_Gulf_Class;



