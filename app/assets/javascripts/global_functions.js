var GLOBAL_LEVEL = 0
var REGION_LEVEL = 1
var PORT_LEVEL = 2
var SHIP_LEVEL = 3

update_region_view = function(region_name){

    if(region_name.match(/[a-z]/i)){
        MAP.state_information.current_layer().set(REGION_LEVEL);
        send_data_to_side_bar(region_name, REGION_LEVEL);
        refresh_link_list_back_history(region_name,REGION_LEVEL);
        refresh_current_view(region_name);
        setSelectRegion_on_sidebar(region_name);

    }



}


update_port_view = function(port_name){

    if(port_name.match(/[a-z]/i)){
        MAP.state_information.current_layer().set(PORT_LEVEL);
        send_data_to_side_bar(port_name , PORT_LEVEL);
        refresh_link_list_back_history(port_name,PORT_LEVEL);
        refresh_current_view(port_name);
    }

}
update_ship_view = function(ship_name){

    if(ship_name.match(/[a-z]/i)){
        MAP.state_information.current_layer().set(SHIP_LEVEL);
        send_data_to_side_bar(ship_name , SHIP_LEVEL);
        refresh_link_list_back_history(ship_name,SHIP_LEVEL);
        refresh_current_view(ship_name);
    }

}

// update the current view, we will update this function when we have a function that returns area names
// depending on the regions 
refresh_current_view = function(name){
    $(".current_view").html(name);
}







// fix the focus and click of bootstrap by the following code

var popover_show = false;
var popover_called_once = undefined; // to initialize the popover only once


load_popover_with_id = function(element,popover_load_class, content_id, title_id, placement) {

    if (!  element.isSameNode(popover_called_once) ) {

        popover_called_once = element;

        conent_id_with_right_syntax = "#" + content_id;
        title_id_with_right_syntax = "#" + title_id;
        popover_load_class_with_right_syntax = "." + popover_load_class;

        var content = $(conent_id_with_right_syntax).html();
        var title = $(title_id_with_right_syntax).html();

        $(popover_load_class_with_right_syntax).popover({
            trigger: 'manual',
            template:"<div class='popover_ana popover' role='tooltip'><div class='arrow'></div><h3 class='popover-title_ana popover-title'></h3><div class='popover-content ship_details-portcall'></div></div>",
            html: true,
            placement: placement,
            content: content,
            title:title
            
        });

        // on blur
            $(element).blur(function () {

            if( popover_show){
                $(popover_load_class_with_right_syntax).popover('hide');
                $(element).trigger('click');
            }

        });
        // on click
        $(element).clickToggle(function () {

            console.log("show popover " + "click 1");
            if(! popover_show){
                $(popover_load_class_with_right_syntax).popover('show');

            }

        },function (be) {
            console.log("hidden popover " + "click 2");
            if(popover_show){
                $(popover_load_class_with_right_syntax).popover('hide');
            }

        } );

    }
    $(popover_load_class_with_right_syntax).on('show.bs.popover', function () {

        popover_show = true;
    });
    $(popover_load_class_with_right_syntax).on('hide.bs.popover', function () {

        popover_show = false;
    });

}

remove_white_space = function(name){
   return name.replace(/\s+/g, '');
}

current_region = function(){

    var region_name =  $("#side_bar_header_region_name").text();
        return region_name.trim();
}

