var GLOBAL_LEVEL = 0;       var COME_FROM_START= 0;
var REGION_LEVEL = 1;       var COME_FROM_MAP = 1;
var PORT_LEVEL = 2;         var COME_FROM_MOTOR_VESSEL = 2;
var SHIP_LEVEL = 3;


var current_view =
{
    // default
    layer_level: GLOBAL_LEVEL,
    get value (){
        return   this.layer_level;
    },
    set value(layer){
        this.layer_level = layer;
    }
}
var current_location =
{
    // default
    location: COME_FROM_START,
    get value (){
        return   this.location;
    },
    set value(l){
        this.location = l;
    }
}

var current_region = function(){

    var region_name =  $("#side_bar_header_region_name").text();
    return region_name.trim();
}

// MainViewGenerator class

var MainViewGenerator;
MainViewGenerator = (function ()
{

}).once();

MainViewGenerator.prototype.globalView = function()
{
    GlobalViewAppInstance.start();
    current_view.value = GLOBAL_LEVEL;

}
MainViewGenerator.prototype.regionView = function(name)
{
    RegionViewAppInstance.start(name);
    current_view.value = REGION_LEVEL;

}
MainViewGenerator.prototype.portView = function(name,coordinates)
{
    if(coordinates != undefined)
    PortViewAppInstance.add_port(name,coordinates);

    PortViewAppInstance.start(name);
    current_view.value = PORT_LEVEL;
}
MainViewGenerator.prototype.shipView = function(name)
{

    ShipViewAppInstance.start(name);
    current_view.value = SHIP_LEVEL;
}

var MainViewGeneratorInstance = new MainViewGenerator();

