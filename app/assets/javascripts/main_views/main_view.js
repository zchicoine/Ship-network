var GLOBAL_LEVEL = 0;       var COME_FROM_START= 0;
var REGION_LEVEL = 1;       var COME_FROM_MAP = 1;
var PORT_LEVEL = 2;         var COME_FROM_SIDE_PANEL = 2;
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
var initialize_views = function()
{

    GlobalViewAppInstance.start();
}

var MainViewGenerator;
MainViewGenerator = function ()
{

}

MainViewGenerator.prototype.regionView = function(name)
{
    RegionViewAppInstance.start(name);
    current_view.value = REGION_LEVEL;

}
var MainViewGeneratorInstance = new MainViewGenerator();


var createView = function(view)
{
    switch (view)
    {
        case GLOBAL_LEVEL:
            return GlobalViewAppInstance ;
            break;
        case REGION_LEVEL:
            return RegionViewAppInstance ;
        default:

    }
}


