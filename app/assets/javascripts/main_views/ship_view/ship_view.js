


update_ship_view = function(ship_name){

    if(ship_name.match(/[a-z]/i)){
        MAP.Controller.current_zoom_layer().set(SHIP_LEVEL);
        send_data_to_side_bar(ship_name , SHIP_LEVEL);
        refresh_link_list_back_history(ship_name,SHIP_LEVEL);
        refresh_current_view(ship_name);
    }

}