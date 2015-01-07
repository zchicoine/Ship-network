var Regions_Objects;
Regions_Objects = function(){

    //Singleton pattern
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var  africa;
    var australia;
    var far_east;
    var india_and_sea;
    var arabia_and_pg;
    var  na;
    var europe;
    var  sa;

    this.Africa = function () {

        if (africa == undefined){
            africa = new Africa_class();
        }
        return africa;
    };

    this.Australia = function () {

        if (australia == undefined){
            australia = new Australia_class();
        }
        return australia;
    };


    this.Far_East = function () {

        if (far_east == undefined){
            far_east = new Far_East_class();
        }
        return far_east;
    };

    this.India_and_SEA = function () {

        if (india_and_sea == undefined){
            india_and_sea = new India_and_South_East_Asia_class();

        }
        return india_and_sea;

    };

    this.South_America = function () {

        if (sa == undefined){
            sa = new South_America_class();
        }
        return sa;
    };

    this.North_America = function () {

        if (na == undefined){
            na = new North_America_class();

        }
        return na;

    };

    this.Arabia_and_PG = function () {

        if (arabia_and_pg == undefined){
            arabia_and_pg = new Arabia_and_Persian_Gulf_Class();
        }
        return arabia_and_pg;
    };

    this.Europe = function () {

        if (europe == undefined){
            europe = new Europe_class();
        }
        return europe;
    };




}


Regions_Objects.prototype.regions_objects_array = function(){

    return [
        this.Europe(),
        this.Africa(),
        this.North_America(),
        this.South_America(),
        this.Arabia_and_PG(),
        this.Far_East(),
        this.India_and_SEA(),
        this.Australia()
    ]


}
Regions_Objects.prototype.regions_objects_json= function(){

    return  {
             "Africa": this.Africa(),
             "Europe": this.Europe(),
             "Far East": this.Far_East(),
             "Australia": this.Australia(),
             "North America": this.North_America(),
             "South America": this.South_America(),
             "Arabia and Persian Gulf": this.Arabia_and_PG(),
             "India and South East Asia": this.India_and_SEA()
    }


}
Regions_Objects.prototype.each_object = function(){

    return new Region_Helper.Region_Functionality();


}


// return object
Regions_Objects.prototype.return_object_region = function (region_name) {

    var value = this.regions_objects_json()[region_name];
            if(value != undefined){
                return value;
            }

            return new Region_class();

}


// this global variable is used to create region objects;
var region_objects_variable = new Regions_Objects();










// line: On older JavaScript engines without Object.create, one can either use a "polyfill"
// (aka "shim", see the linked article), or one can use a function that achieves the same result:

function createObject(proto) {
    function ctor() { }
    ctor.prototype = proto;
    return new ctor();
}


