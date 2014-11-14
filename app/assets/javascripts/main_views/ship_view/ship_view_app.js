
//app

var ShipViewApp = function(){
    // make this class singleton
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    // keep list of active ports
    this.active_ship= {};
    this.add_ship = function(name){
        if(this.active_ship[name] == undefined) {
            this.active_ship[name] = new ShipView(name);
        }
    }

};

ShipViewApp.prototype.start = function(name){

    if (string_match(name)) {
        this.add_ship(name);
        var _shipViewObject =  this.active_ship[name];

        console.log(current_view.value);
        createView(current_view.value).start_view(_shipViewObject);

    } else {
        error_message_display("ShipViewApp start function name is not string")
    }

}


ShipViewApp.prototype.start_view = function(_ViewObject)
{

    if( _ViewObject instanceof RegionView )
    {
        RegionViewAppInstance.come_from_ship_view(_ViewObject);
    }else if(_ViewObject instanceof PortView)
    {
            PortViewAppInstance.come_from_ship_view(_ViewObject);
    }
}

var ShipViewAppInstance = new ShipViewApp();

//end app