
// start of South Arabia_and_Persian_Gulf class//
var Arabia_and_Persian_Gulf_Class;
Arabia_and_Persian_Gulf_Class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = "Arabia and Persian Gulf";
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(-30.559482,22.937506);
    this.areas_coordinates =
    {
        "Sur":{'short_name':"sur",'coordinates':[-30.559482,22.937506]},
        "Bandar":{ 'short_name':"Bandar",'coordinates':[26.371015,31.847656]},
        "Default1":{ 'short_name':"Default",'coordinates':[32.634765,51.340669]}
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
        'coordinates':[],
        'color':this.map_properties['color']
    }
};
Arabia_and_Persian_Gulf_Class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Arabia_and_Persian_Gulf_Class
Arabia_and_Persian_Gulf_Class.prototype.constructor = Arabia_and_Persian_Gulf_Class;



