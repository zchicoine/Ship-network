// return object
function return_object_region(region_name) {
    var region_objects  = new Regions_Objects();
    if (region_name == "North America") {
        return region_objects.North_America();
    }else if (region_name == "South America") {
        return region_objects.South_America();
    }
    else if (region_name == "Africa") {
        return region_objects.Africa();
    }
    else if (region_name == "Australia") {
        return region_objects.Australia();
    }else if(region_name =="India and South East Asia"){
        return region_objects.India_and_SEA();

    }else if(region_name =="Arabia and Persian Gulf") {
        return region_objects.Arabia_and_PG();
    }else if(region_name =="Far East"){
        return region_objects.Far_East();
    }else if(region_name =="Europe"){
        return region_objects.Europe();
    }

    return new Region_class();

}

var Regions_Objects;
Regions_Objects = function(){

    this.africa;
    this.australia;
    this.far_east;
    this.india_and_sea;
    this.arabia_and_pg;
    this.na;
    this.europe;
    this.sa;

    //Singleton pattern
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;




}

Regions_Objects.prototype.Africa = function () {

   if (this.africa == undefined){
      this.africa = new Africa_class();

   }
    return this.africa;

};

Regions_Objects.prototype.Australia = function () {

    if (this.australia == undefined){
        this.australia = new Australia_class();

    }
    return this.australia;

};


Regions_Objects.prototype.Far_East = function () {

    if (this.far_east == undefined){
        this.far_east = new Far_East_class();

    }
    return this.far_east;

};

Regions_Objects.prototype.India_and_SEA = function () {

    if (this.india_and_sea == undefined){
        this.india_and_sea = new India_and_South_East_Asia_class();

    }
    return this.india_and_sea;

};

Regions_Objects.prototype.South_America = function () {

    if (this.sa == undefined){
        this.sa = new South_America_class();

    }
    return this.sa;

};

Regions_Objects.prototype.North_America = function () {

    if (this.na == undefined){
        this.na = new North_America_class();

    }
    return this.na;

};

Regions_Objects.prototype.Arabia_and_PG = function () {

    if (this.arabia_and_pg == undefined){
        this.arabia_and_pg = new Arabia_and_Persian_Gulf_Class();

    }
    return this.arabia_and_pg;

};
Regions_Objects.prototype.Europe = function () {

    if (this.europe == undefined){
        this.europe = new Europe_class();

    }
    return this.europe;

};








// line: On older JavaScript engines without Object.create, one can either use a "polyfill"
// (aka "shim", see the linked article), or one can use a function that achieves the same result:

function createObject(proto) {
    function ctor() { }
    ctor.prototype = proto;
    return new ctor();
}
