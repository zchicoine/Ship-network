// to make sure is load first

// base class
var Region_class;
Region_class = function () {
    this.name = "Global";
    this.lat_lang = new google.maps.LatLng(55.443528, -96.053968);
    this.layer_array = [
            //north america
                    new google.maps.LatLng(29.95,-90.06667),
            //south america
                    new google.maps.LatLng(-12.05,-77.16667),
            //africa..douala
                    new google.maps.LatLng(4.05000,9.700000),
            //PG
                    new google.maps.LatLng(-30.559482,22.937506),
            //europe
                    new google.maps.LatLng(52.3666,4.8999),
            //sea
                    new google.maps.LatLng(17.686816,83.218482),
            //aus
                    new google.maps.LatLng(-32.926689,151.778921),
            //busan
                    new google.maps.LatLng(35.179554,129.075642)
                ];

};

Region_class.prototype.change_region_view = function () {

    MAP.google_common_methods.set_cneter(this.lat_lang);
    update_region_view(this.name);
};

// end of Region class //

