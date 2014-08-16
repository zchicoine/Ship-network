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







// fix the focus and click of bootstrap by the following code

var popover_show = false;
var popover_called_once = undefined; // to initialize the popover only once


load_popover_with_id = function(element,popover_load, content_id, placement) {

    if (!  element.isSameNode(popover_called_once) ) {

        popover_called_once = element;

        id = "#" + content_id;

        var content = $(id).html();

        console.log("load_popover");
        $(popover_load).popover({
            trigger: 'manual',
            html: true,
            placement: placement,
            content: content
        });

        // on blur
            $(element).blur(function () {
            console.log("hidden popover blur" );

            if( popover_show){
                $(popover_load).popover('hide');
                $(element).trigger('click');
            }

        });
        // on click
        $(element).clickToggle(function () {

            console.log("show popover " + "click 1");
            if(! popover_show){
                $(popover_load).popover('show');

            }

        },function (be) {
            console.log("hidden popover " + "click 2");
            if(popover_show){
                $(popover_load).popover('hide');
            }

        } );

    }
    $(popover_load).on('show.bs.popover', function () {

        popover_show = true;
    });
    $(popover_load).on('hide.bs.popover', function () {

        popover_show = false;
    });

}





//    $(element).on('shown.bs.popover', function () {
//
//
//        popover_show = true;
//    });
//    $(element).on('hidden.bs.popover', function () {
//         console.log("hidden popover");
//        popover_show = false;
//    });

//    $(element).click( function () {
//
//        console.log(element.className +   " click - " + popover_show);
//        if(popover_show ){
//            $(popover_load).popover('hide');
//        }else{
//
//        }
//
//    });




//
//    $(document).on('focus',".popover_focus_for_tr_element", function () {
//
//        console.log("popover_focus_for_tr_element blur");
//
//        // $('*').popover('hide');
//    });
//




