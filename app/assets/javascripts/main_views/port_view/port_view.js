


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
PortView = function(){
    this.html_classnames ={
        "side_panel":{"body": ".aside_ship_details_table_body",
            "footer":".aside_ship_details_table_foot"

        }

    }
};
PortView.prototype.backend = function(port_name){


}
PortView.prototype.render = function(port_name, coordinates){
    update_port_view(port_name);
    MAP.google_methods.set_center(coordinates);

}

PortView.prototype.draw = function(port_name, coordinates){
    this.render(port_name , coordinates);
}



//app

var PortViewApp = function(){

    this.portViewInstance = new PortView();

};

PortViewApp.prototype.start = function(port_name, coordinates){
    this.portViewInstance.draw(port_name, coordinates);
}

//end app