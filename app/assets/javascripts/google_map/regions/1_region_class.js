// to make sure is load first

// Abstract class
var Region_class;
Region_class = function () {
    this.name = "Global";
    this.lat_lang = new google.maps.LatLng(55.443528, -96.053968);

};

Region_class.prototype.change_region_view = function () {

    MAP.google_common_methods.set_cneter(this.lat_lang);
    update_region_view(this.name);
};

// end of Region class //

