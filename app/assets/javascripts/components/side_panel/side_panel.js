

var Side_Panel;
Side_Panel = Side_Panel || {};


Side_Panel.controller = {};


Side_Panel.controller.select_region = function(region_name)
{
    // if the location comes from motor vessel then give it high priority over side panel
    if( current_location.value != COME_FROM_MOTOR_VESSEL)
        current_location.value =  COME_FROM_SIDE_PANEL;
    MainViewGeneratorInstance.regionView(region_name);
}






// the following methods will be replaced

//This method will be deleted when all the dependencies are using the new function
send_data_to_side_bar = function(name, level){

    var data_json = { "side_info": { "name": name , "level": level} };
    var url = 'side_panel/index';
    var html_class = '.aside_ship_details_table_body';

    if(! isNaN(level) && name.match(/[a-z]/i) )

    {

        $.ajax({
            url:url,
            beforeSend: function(){
                // Handle the beforeSend event
            },
            type: 'POST',
            data:data_json,
            dataType: 'html',
            complete: function(r){
                // Handle the complete event
                // alert(r);
            },
            success: function(result) {
                if(level == SHIP_LEVEL){
                    html_class = "#ship-details-section";

                }

                    $(html_class).htmlCustom(result);
                if(level == SHIP_LEVEL || level == PORT_LEVEL){
                    $('.region_stats .triangle_image').addClass('want_to_close_table');
                    closed_table_side_bar(0);
                }
            },
            error: function(xhr, ajaxOptions, thrownError){

                error_message_display(thrownError)
            }
        });
    }
}

// this feature is turn off for now
var send_broker_info_to_sidebar = function(ship_name, port_name) {
console.log("This " + port_name + " should be port name")
    var data_json = { "side_info": { "ship_name": ship_name, "port_name": port_name} };
    var url = 'side_panel/broker_contact';
    var html_class = '.aside_ship_details_table_body';

    $.ajax({
        url:url,
        beforeSend: function(){
            // Handle the beforeSend event
        },
        type: 'POST',
        data:data_json,
        dataType: 'html',
        complete: function(r){
            // Handle the complete event
            // alert(r);

        },
        success: function(result) {
            $("#ship-details-section").html(result);

        },
        error: function(xhr, ajaxOptions, thrownError){

            error_message_display(thrownError)
        }
    });
}

var closed_table_side_bar = function (speed)
{

        var image = '.triangle_image';
        if ($(image).hasClass("want_to_close_table")) {
              image += ".want_to_close_table";
            if ( ! $(image).hasClass("this_class_only_to_change_image") ){

                $(image).attr("src",image_greentriangle_closed());
                $(image).addClass("this_class_only_to_change_image");

                $(image).parent().parent().parent().next().children('tr').
                    closest('tr').children('td').wrapInner('<div />').
                    animate({padding: 'toggle', opacity: 'toggle'}, speed);
            }
        }
}
var open_table_side_bar = function (speed)
{
    var image = '.triangle_image';
    if ($(image).hasClass("want_to_open_table")) {
        image += ".want_to_open_table";

        if (  $(image).hasClass("this_class_only_to_change_image") ){

            $(image).attr("src", image_greentriangle_down());
            $(image).removeClass("this_class_only_to_change_image");

            $(image).parent().parent().parent().next().children('tr').
                closest('tr').children('td').wrapInner('<div />').
                animate({padding: 'toggle', opacity: 'toggle'}, speed);

        }
    }
}




highlight_on_a_list = function(tag){
    $('.scroll_inside_table table tr').children().removeClass('highlight-clicked-row');
    $(tag).closest('tr').children().addClass('highlight-clicked-row');
}


// ----//


update_broker_view = function(ship_name,port_name){
    send_broker_info_to_sidebar(ship_name,port_name);
    Back_History.link_list(ship_name,ship_name,SHIP_LEVEL);
}



//short_region_info_hide = function(default_name){

//    $('.side_bar_header').html(content_header);
//    $('.region_short_info').hide();
//    $('.triangle_image').addClass('want_to_open_table');
//   open_table_side_bar(200);
//}

$(document).ready(function() {
    // ensure closing of dropdown menu when one of its elements has been clicked

    $('.map_controller_go_to_region_li').click(function () {
        $('.dropdown-toggle').trigger('click');
    });
});

//$(document).on('click',".one", function(e){
//    console.log("URL: " + this.href);
//    $.getScript(this.href);
//
//    history.pushState(null, "back e", this.href);
//    e.preventDefault();
//});
//
//$(window).bind("popstate", function() {
//    console.log("URL_P " + location.href);
//    $.getScript(location.href);
//});