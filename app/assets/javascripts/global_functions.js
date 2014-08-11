var GLOBAL_LEVEL = 0
var REGION_LEVEL = 1
var PORT_LEVEL = 2
var SHIP_LEVEL = 3

update_region_view = function(region_name){

    if(region_name.match(/[a-z]/i)){
        send_data_to_side_bar(region_name, REGION_LEVEL);
        refresh_link_list_back_history(region_name,REGION_LEVEL);
    }



}


update_port_view = function(port_name){

    if(port_name.match(/[a-z]/i)){
        send_data_to_side_bar(port_name , PORT_LEVEL);
        refresh_link_list_back_history(port_name,PORT_LEVEL);
    }

}
update_ship_view = function(ship_name){

    if(ship_name.match(/[a-z]/i)){
        send_data_to_side_bar(ship_name , SHIP_LEVEL);
        refresh_link_list_back_history(ship_name,SHIP_LEVEL);
    }

}


load_popover_with_id = function(load, content_id){
    id = "#" + content_id;
    var inText = $(id).html();
    $(load).popover( {
        // trigger: 'focus',
        html: true,
        content: inText
    });

}




