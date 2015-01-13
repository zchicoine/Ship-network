
// start of Europe  class//
var Europe_class;
Europe_class = function () {

    // Call the parent constructor, making sure (using Function#call) that "this" is
    // set correctly during the call
    Region_class.call(this);
    this.name = 'Europe';
    this.unique_identifier = this.name;
    this.lat_lang = new google.maps.LatLng(52.3666,4.8999);

    this.areas_coordinates =
    {
        "Amsterdam":{ 'short_name':"A'dam",'coordinates':[52.3666,4.8999]},
        "Palermo":{ 'short_name':"Palermo",'coordinates':[38.11666,13.33333]},
        "Istanbul":{'short_name':"Istanbul",'coordinates':[41.016666,28.983]},
        "Hemnesberget":{ 'short_name':"Hemnesberget",'coordinates':[66.233,13.6]}





    };
    this.areas_coordinates = make_json_iterable(this.areas_coordinates);

    this.list_of_countries = [ "United Kingdom" , "Ireland"
        , "Iceland" , "Germany" , "Netherlands" , "Belgium", "France" , "Spain" , "Portugal" , "Italy"
        , "Slovenia" , "Croatia" , "Serbia" , "Albania", "Greece" , "Turkey" , "Cyprus" , "Bulgaria"
        , "Syria" , "Israel" , "Lebanon" , "Romania", "Ukraine" , "Georgia" , "Norway" , "Sweden"
        , "Denmark" , "Finland" , "French Southern and Antarctic Lands", "Belarus" , "Poland" , "Lithuania" , "Latvia"
        , "Estonia" , "Slovakia" , "Hungary" , "Montenegro" , "Russia" , "Austria" , "Czech Rep." , "Moldova"
        , "Bosnia and Herz." , "Kosovo" , "Armenia", "Macedonia"    , "Switzerland"   , "Luxembourg"];


    this.map_properties = {
        'color': "#003cb3",
        'label':"EUROPE",
        'label_position':new google.maps.LatLng(53.1289, 45.1102)
    };

    this.fusiontables_properties = {
        "countries": this.list_of_countries,
        'coordinates':MAP.Models.Coordinates.europe(),
        'color':this.map_properties['color']
    }
};
Europe_class.prototype = createObject(Region_class.prototype);
// Set the "constructor" property to refer to Europe_class
Europe_class.prototype.constructor = Europe_class;

/*
 override
 */
Europe_class.prototype.update_map_navigate = function(come_from)
{

    var default_area = "Amsterdam";
    this.lat_lang = this.areas_coordinates["Amsterdam"].coordinates;
    if(come_from == new Africa_class().name){
        this.lat_lang = this.areas_coordinates["Palermo"].coordinates;
        default_area = "Palermo";
    }

    MapNavigateInstance.default_map_navigate(this.name,default_area);

}
