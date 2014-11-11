
//app

var PortViewApp = function(){
    // make this class singleton
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    // keep list of active ports
    this.active_port= {};
    this.add_port = function(name,coordinates){
        if(this.active_port[name] == undefined) {
            this.active_port[name] = new PortView(name, coordinates);
        }else {
            // port has been already created
        }
    }

};

PortViewApp.prototype.start = function(name){

    this.active_port[name].draw();
}
var PortViewAppInstance = new PortViewApp();

//end app