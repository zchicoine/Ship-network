
//app

var RegionViewApp = function(){

    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    // keep list of active regions

    this.active_region= {};
    this.add_region = function(name){
        if(this.active_region[name] == undefined) {
            this.active_region[name] = new RegionView(name);
        }else {
            // region has been already created
        }
    }

};

RegionViewApp.prototype.start = function(name){
    if  (string_match(name)){
        this.add_region(name);
        this.active_region[name].draw();

    }else{
        error_message_display("RegionViewApp start function name is not string")
    }

}

var RegionViewAppInstance = new RegionViewApp();
//end app