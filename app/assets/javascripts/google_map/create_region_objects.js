function return_object_region(region_name) {

    if (region_name == "North America") {
        return new North_America_class();
    }else if (region_name == "South America") {
        return new South_America_class();
    }
    else if (region_name == "Africa") {
        change_region_view(regionName, region_center_coordinates[2]);
    }
    else if (region_name == "India") {
        change_region_view(regionName, region_center_coordinates[6]);
    }

    return null;



}





// line: On older JavaScript engines without Object.create, one can either use a "polyfill"
// (aka "shim", see the linked article), or one can use a function that achieves the same result:

function createObject(proto) {
    function ctor() { }
    ctor.prototype = proto;
    return new ctor();
}
