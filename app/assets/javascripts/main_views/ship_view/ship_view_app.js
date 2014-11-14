
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

        /*
         current_view.value: return the view level {Global, Region, Port or Ship}
         */
        switch (current_view.value)
        {
            case GLOBAL_LEVEL:
                this.come_from_global_view(_shipViewObject);
                break;
            case REGION_LEVEL:
                this.come_from_region_view(_shipViewObject);
                break;
            case PORT_LEVEL:
                this.come_from_port_view(_shipViewObject);
                break;
            case SHIP_LEVEL:
                this.come_from_ship_view(_shipViewObject);
                break;
            default:

        }


    } else {
        error_message_display("ShipViewApp start function name is not string")
    }

}


ShipViewApp.prototype.come_from_global_view = function(_shipView)
{
}

ShipViewApp.prototype.come_from_region_view = function(_shipView)
{
}

ShipViewApp.prototype.come_from_port_view = function(_shipView)
{
    _shipView.draw();
}

ShipViewApp.prototype.come_from_ship_view = function(_shipView)
{
}


var ShipViewAppInstance = new ShipViewApp();

//end app