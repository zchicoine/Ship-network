

var current_view = function(){

        return new function(){
            if ( arguments.callee._singletonInstance )
                return arguments.callee._singletonInstance;
            arguments.callee._singletonInstance = this;
            // by default
            var layer_level = GLOBAL_LEVEL;
            this.get =  function(){
                return   layer_level;
            }
            this.set = function(layer){
                layer_level = layer;
                return this;
            }
        }
}
// initialization
current_view();

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
    console.log( name +" regionView has been called " )
    GlobalViewAppInstance.globalViewInstance.controller.clear_all_listeners_of_the_regions();
    RegionViewAppInstance.start(name);

}
var MainViewGeneratorInstance = new MainViewGenerator();




