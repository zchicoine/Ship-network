



update_region_view = function(region_name){

    if(region_name.match(/[a-z]/i)){
        MAP.Controller.current_zoom_layer().set(REGION_LEVEL);
        send_data_to_side_bar(region_name, REGION_LEVEL);
        refresh_link_list_back_history(region_name,REGION_LEVEL);
        refresh_current_view(region_name);
        setSelectRegion_on_sidebar(region_name);

    }



}