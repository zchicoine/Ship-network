var GLOBAL_LEVEL = 0;
var REGION_LEVEL = 1;
var PORT_LEVEL = 2;
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



var MainViewGenerator;
MainViewGenerator = function ()
{

}
var initialize_views = function()
{

    GlobalViewAppInstance.start();
}
MainViewGenerator.prototype.regionView = function(name)
{
    RegionViewAppInstance.start(name);
    current_view.value = REGION_LEVEL;

}
var MainViewGeneratorInstance = new MainViewGenerator();




