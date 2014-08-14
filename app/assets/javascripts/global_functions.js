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


//load_popover_with_id = function(load, content_id, placement){
//    id = "#" + content_id;
//    var inText = $(id).html();
//    console.log("load_popover");
//    $(load).popover( {
//        trigger: 'click',
//        html: true,
//        placement: placement,
//        content: inText
//    });
//    $('.broker_info').on('show.bs.popover', function () {
//        // console.log("popover_focus_for_tr_element click" + i++);
//        popover_show = true;
//    });
//    $('.broker_info').on('hidden.bs.popover', function () {
//        // console.log("popover_focus_for_tr_element click" + i++);
//        popover_show = false;
//    });
//}
//
//    var popover_show = false;
//    $(document).on('blur', ".popover_blur_for_tr_element" , function () {
//
//           i = 0;
//        console.log(" click - " + popover_show);
//        if(popover_show ){
//            $("*").popover('hide');
//        }else{
//
//        }
//
//
//
//
//
//    });
////
//    $(document).on('focus',".popover_focus_for_tr_element", function () {
//
//        console.log("popover_focus_for_tr_element blur");
//
//        // $('*').popover('hide');
//    });

