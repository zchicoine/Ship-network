go_to_region = function (coordinates , regionName){

   // console.log(coordinates);
   _latLng =  new google.maps.LatLng(coordinates[0], coordinates[1]);
   // console.log(_latLng);
    window.map.setCenter(_latLng);
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

            },
            error: function(r){
                alert(r + " works");
            }
        });


    }





}

closed_table_side_bar = function () {



        var image = '.triangle_image';
        console.log("works");
        if ($(image).hasClass("closed_table")) {
              image += ".closed_table";
            console.log(image);
            $(image).attr("src", "/assets/greentriangle_closed.png");
            $(image).addClass("this_class_only_to_change_image");
            $(image).parent().parent().parent().next().children('tr').
                closest('tr').children('td').wrapInner('<div />').
                animate({padding: 'toggle', opacity: 'toggle'}, 1);
        }





}





    $(document).on('click','.triangle_image',function () {
        var image = this;

        if (! $(image).hasClass("this_class_only_to_change_image") ) {

            $(image).attr("src", "assets/greentriangle_closed.png");
            $(image).addClass("this_class_only_to_change_image");
        }
        else {

            $(image).attr("src", "assets/greentriangle_down.png");
            $(image).removeClass("this_class_only_to_change_image");
        }

        $(image).parent().parent().parent().next().children('tr').
            closest('tr').children('td').wrapInner('<div />').
            animate({padding: 'toggle', opacity: 'toggle'} , 150);



    });


highlight_on_a_list = function(tag){
    $('.scroll_inside_table table tr').children().removeClass('highlight-clicked-row');
    $(tag).closest('tr').children().addClass('highlight-clicked-row');
}

// initial code take from
// http://stackoverflow.com/questions/6330431/jquery-bind-double-click-and-single-click-separately
var DELAY = 700, clicks = 0, timer = null;

$(document).on('click',".ship_name_on_side_bar", function(e){

       var ship_name =  this.id;
       clicks++;  //count clicks


    if(clicks === 1) {

        timer = setTimeout(function() {

             //perform single-click action
            update_ship_view(ship_name);

            clicks = 0;             //after action performed, reset counter

        }, DELAY);

    } else {

        clearTimeout(timer);    //prevent single-click action
        //perform double-click action
        update_ship_view(ship_name);
        ship_details(ship_name);


        clicks = 0;             //after action performed, reset counter
    }




});

$(document).on("dblclick", function(e){
    e.preventDefault();  //cancel system double-click event
});

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
            alert(r + "works");
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