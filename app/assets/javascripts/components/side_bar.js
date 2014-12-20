// this function for google_map controller on sidebar, when a user select a region then that region will be displayed and highlighted.
setSelectRegion_on_sidebar = function(region_name){

    $("#dropdownGoToRegion_lable").html(region_name);

    $('.dropdown-menu.map_controller_go_to_region').children().removeClass('highlight-clicked-row');
    $("#" + remove_white_space(region_name) + "_inside_dropdown_main").addClass('highlight-clicked-row');
}

var Side_Panel;
Side_Panel = Side_Panel || {}

// backend
Side_Panel.backend =  {}

/*
 this function is responsible for calling the backend throw ajax call
 name: region, port or ship name.
 level: one of the four levels (Global,Region, etc)
 datatype: html,json
 */
Side_Panel.backend.get_result = function(name, level ,datatype,async){


    if(! isNaN(level) && name.match(/[a-z]/i) )

    {
        var data_json = { "side_info": { "name": name , "level": level} };
        var url = 'side_bar/index';


      return  $.ajax({
            url:url,
            beforeSend: function(){
                // Handle the beforeSend event
            },
          async:      async,
          type: 'POST',
            data:data_json,
            dataType: datatype,
          error: function(xhr, ajaxOptions, thrownError){

              error_message_display(thrownError)
          }


        });
    }
}

// end of the backend

//This method will be deleted when all the dependencies are using the new function
send_data_to_side_bar = function(name, level){

    var data_json = { "side_info": { "name": name , "level": level} };
    var url = 'side_bar/index';
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

                    $(html_class).html(result);
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

send_broker_info_to_sidebar = function(ship_name, port_name) {
console.log("This " + port_name + " should be port name")
    var data_json = { "side_info": { "ship_name": ship_name, "port_name": port_name} };
    var url = 'side_bar/broker_contact';
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

    closed_table_side_bar = function (speed) {

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
open_table_side_bar = function (speed){
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


// this code to see if any block is closed or not, if the block is closed then open and vice versa
    $(document).on('click','.triangle_image',function () {
        var image = this;
        // if the following class present that means a block is closed
        if ( $(image).hasClass("this_class_only_to_change_image") ) {

            $(image).attr("src", image_greentriangle_down());
            $(image).removeClass("this_class_only_to_change_image");
        }
        else {
            $(image).attr("src",image_greentriangle_closed());
            $(image).addClass("this_class_only_to_change_image");

        }

        $(image).parent().parent().parent().next().children('tr').
            closest('tr').children('td').wrapInner('<div />').
            animate({padding: 'toggle', opacity: 'toggle'} , 150);


    });


highlight_on_a_list = function(tag){
    $('.scroll_inside_table table tr').children().removeClass('highlight-clicked-row');
    $(tag).closest('tr').children().addClass('highlight-clicked-row');
}


// to enable both single and dbouble clicked worked on same element.
// initial code take from
// http://stackoverflow.com/questions/6330431/jquery-bind-double-click-and-single-click-separately
var DELAY = 700, clicks = 0, timer = null;

$(document).on('click',".ship_name_on_side_bar", function(e){
       var names = this.id.split("_");
       var ship_name = names[0], port_name =names[1], region_name =  names[2];

       clicks++;  //count clicks


    timer = setTimeout(function () {
        //perform single-click action

        clicks = 0;      //after action performed, reset counter
    }, DELAY);
    if(clicks === 1) {
                 //perform single-click action

                     if ($(".ship_details").length) {
                         ship_details(ship_name,port_name,region_name);
                         $( ".hide-or-show-it" ).hide( );
                         update_broker_view(ship_name,port_name);

                     }else{
                         MainViewGeneratorInstance.shipView(ship_name);
                     }
    }else {

        clearTimeout(timer);    //prevent single-click action
        //perform double-click action
        update_broker_view(ship_name,port_name);
        ship_details(ship_name,port_name,region_name);
        $( ".hide-or-show-it" ).hide( );
        clicks = 0;             //after action performed, reset counter
    }
});

$(document).on("dblclick",".ship_name_on_side_bar", function(e){
    e.preventDefault();  //cancel system double-click event in particle class
});


// ----//

ship_details = function(ship_name,port_name,region_name){

    var data_json =  { "ship_name": ship_name, "port_name":port_name,"region_name":region_name } ;
    $.ajax({
        url:'ship_details/show',
        beforeSend: function(){
            // Handle the beforeSend event
        },
        type: 'POST',
        dataType: 'html',
        data:data_json,
        complete: function(r){
            // Handle the complete event
            // alert(r);

        },
        success: function(result) {
            current_location.value = COME_FROM_MOTOR_VESSEL;
            $("#outer-map").html(result);

        },
        error: function(r){
            error_message_display("display Motor Vessel.");
        }
    });

}

update_broker_view = function(ship_name,port_name){
    send_broker_info_to_sidebar(ship_name,port_name);
    refresh_link_list_back_history(ship_name,SHIP_LEVEL);
}


var content_header = "";
short_region_info_show = function(region_name){

    var data_json =  { 'region':{ "name": region_name} } ;
    $.ajax({
        url:'side_bar/region_short_info',
        beforeSend: function(){
            // Handle the beforeSend event
        },
        type: 'POST',
        dataType: 'html',
        data:data_json,
        complete: function(r){
            // Handle the complete event
            // alert(r);

        },                                      //display-none
        success: function(result) {
           //if((".short_region_info_two").length){
               $(".short_region_info_two").show();
               $(".short_region_info_two").html(result);
               $(".aside_ship_details_table_body").hide();
               //$(".aside_ship_details_table_foot").html(result['partial_table_footer']);
               $(".aside_ship_details_table_foot").hide();
           //}else{
           //    $(".short_region_info_two").show();
           //    $(".short_region_info_two").html(result);
           //    $(".aside_ship_details_table_body").hide();
           //    //$(".aside_ship_details_table_foot").html(result['partial_table_footer']);
           //    $(".aside_ship_details_table_foot").hide();
           //}


        },
        error: function(xhr, ajaxOptions, thrownError){
            error_message_display($.parseJSON(xhr.responseText).errors);
        }
    });

     //   content_header = $('.side_bar_header').html();
     //   $('.side_bar_header').html(region_name);
     //   $('.triangle_image').addClass('want_to_close_table');
        //closed_table_side_bar(30);
}
show_default_table_when_mouse_out = function(){
    $(".short_region_info_two").hide();
    $(".aside_ship_details_table_body").show();
    $(".aside_ship_details_table_foot").show();
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