update_region_view = function(region_name){
    region_level = 1
    if(region_name.match(/[a-z]/i)){
        send_data_to_side_bar(region_name, region_level);
        refresh_link_list_back_history(region_name,region_level);
    }



}


update_port_view = function(port_name){
    port_level = 2
    if(port_name.match(/[a-z]/i)){
        send_data_to_side_bar(port_name , port_level);
        refresh_link_list_back_history(port_name,port_level);
    }

}
