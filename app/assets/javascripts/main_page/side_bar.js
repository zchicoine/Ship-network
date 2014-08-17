var region_center_coordinates =  [[48.2893, -99.3594], [-10.4893, -59.3594],[17.6493, 11.5994],
                   [33.1376, 47.6367], [-25.8000, 133.2422],[53.1289, 45.1102],
                   [24.4471,85.1660] ,[35.8178, 118.0371],[-4.0396, 121.2891]];



function center_in_region(regionName){
    if(regionName=="North America"){
    change_region_view(regionName,region_center_coordinates[0]);
    }
    else if(region_name=="South America"){
    change_region_view(regionName,region_center_coordinates[1]);
    }
       else if(region_name=="Africa"){
    change_region_view(regionName,region_center_coordinates[2]);
    }
       else if(region_name=="India"){
    change_region_view(regionName,region_center_coordinates[6]);
    }
}

function change_region_view(regionName,lat_lang){
   // window.map.setCenter(lat_lang);
    window.map.setZoom(4);
    update_region_view(regionName);
}



send_data_to_side_bar = function(name, level){

    console.log(name + "   " + level)
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
                    $('.region_stats .triangle_image').addClass('closed_table');
                    closed_table_side_bar();
                }


            },
            error: function(r){
               // alert(r + " works");
                error_message_display("error when refreshing sidebar table")
            }
        });


    }





}

closed_table_side_bar = function () {



        var image = '.triangle_image';
        console.log("works");
        if ($(image).hasClass("closed_table")) {
              image += ".closed_table";
            if ( ! $(image).hasClass("this_class_only_to_change_image") ){
                console.log(image);
                $(image).attr("src", "/assets/greentriangle_closed.png");
                $(image).addClass("this_class_only_to_change_image");
                $(image).parent().parent().parent().next().children('tr').
                    closest('tr').children('td').wrapInner('<div />').
                    animate({padding: 'toggle', opacity: 'toggle'}, 1);
            }

        }
}


// this code to see if any block is closed or not, if the block is closed then open and vice versa
    $(document).on('click','.triangle_image',function () {
        var image = this;
        // if the following class present that means a block is closed
        if ( $(image).hasClass("this_class_only_to_change_image") ) {

            $(image).attr("src", "assets/greentriangle_down.png");
            $(image).removeClass("this_class_only_to_change_image");
        }
        else {
            $(image).attr("src", "assets/greentriangle_closed.png");
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

       var ship_name =  this.id;
       clicks++;  //count clicks


    timer = setTimeout(function () {
        //perform single-click action

        clicks = 0;      //after action performed, reset counter
    }, DELAY);
    if(clicks === 1) {
                 //perform single-click action
                 update_ship_view(ship_name);
                     if ($(".ship_details").length) {
                         ship_details(ship_name);
                     }
    }else {

        clearTimeout(timer);    //prevent single-click action
        //perform double-click action
        update_ship_view(ship_name);
        ship_details(ship_name);

        clicks = 0;             //after action performed, reset counter
    }
});

$(document).on("dblclick",".ship_name_on_side_bar", function(e){
    e.preventDefault();  //cancel system double-click event in particle class
});


// ----//

ship_details = function(ship_name){

    var data_json =  { "name": ship_name } ;
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

            $("#outer-map").html(result);
        },
        error: function(r){
            error_message_display("display ship details.");
        }
    });

}


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