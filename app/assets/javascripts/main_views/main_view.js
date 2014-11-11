

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

var initialize_views = function(){

    GlobalViewAppInstance.start();
}




