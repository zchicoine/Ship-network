


update_port_view = function(port_name){

    if(port_name.match(/[a-z]/i)){
        MAP.Controller.current_zoom_layer().set(PORT_LEVEL);
        send_data_to_side_bar(port_name , PORT_LEVEL);
        refresh_link_list_back_history(port_name,PORT_LEVEL);
        refresh_current_view(port_name);

    }

}

// PortView Class
var PortView;
PortView = function(name, coordinates){
    this.name = name;
    this.coordinates = coordinates;
    this.html_classnames ={
        "side_panel":{"body": ".aside_ship_details_table_body",
            "footer":".aside_ship_details_table_foot"

        }

    }
};
PortView.prototype.backend = function(){


}
PortView.prototype.render = function(){
    update_port_view(this.name);
    MAP.google_methods.set_center(this.coordinates);

}

PortView.prototype.draw = function(){
    this.render(this.name , this.coordinates);
}



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