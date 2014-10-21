


update_port_view = function(port_name){

    if(port_name.match(/[a-z]/i)){
        MAP.Controller.current_zoom_layer().set(PORT_LEVEL);
        send_data_to_side_bar(port_name , PORT_LEVEL);
        refresh_link_list_back_history(port_name,PORT_LEVEL);
        refresh_current_view(port_name);

    }

}
