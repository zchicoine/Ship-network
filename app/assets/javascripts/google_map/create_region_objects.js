// return object
function return_object_region(region_name) {

    if (region_name == "North America") {
        return new North_America_class();
    }else if (region_name == "South America") {
        return new South_America_class();
    }
    else if (region_name == "Africa") {
        return new Africa_class();
    }
    else if (region_name == "Australia") {
        return new Australia_class();
    }else if(region_name =="India and South East Asia"){
       return new India_and_South_East_Asia_class();

    }else if(region_name =="Arabia and Persian Gulf") {
        return new Arabia_and_Persian_Gulf_Class();
    }else if(region_name =="Far East"){
        return new Far_East_class();
    }else if(region_name =="Europe"){
        return new Europe_class();
    }

    return new Region_class();

}





// line: On older JavaScript engines without Object.create, one can either use a "polyfill"
// (aka "shim", see the linked article), or one can use a function that achieves the same result:

function createObject(proto) {
    function ctor() { }
    ctor.prototype = proto;
    return new ctor();
}
