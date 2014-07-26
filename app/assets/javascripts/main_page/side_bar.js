go_to_region = function (coordinates , regionName){

   // console.log(coordinates);
   _latLng =  new google.maps.LatLng(coordinates[0], coordinates[1]);
   // console.log(_latLng);
    window.map.setCenter(_latLng);
    window.map.setZoom(4);


    update_region_view(regionName);

}


// send_data_to_side_bar = function(name, level){
//
//     console.log(name + "   " + level)
//     var data_json = { "region_info": { "name": name} };
//     var url = 'side_bar/region';
//     var html_class = '.aside_ship_details_table_body';
//    if(! isNaN(level) && name.match(/[a-z]/i) )
//
//    {
//        console.log(name + " 1:  " + level)
//        switch(level) {
//            case 0:
//                break;
//            case 1:
//                 data_json = { "region_info": { "name": name} };
//                 url = 'side_bar/region';
//                 html_class = '.aside_ship_details_table_body';
//                console.log(name + " 2:  " + level)
//                break;
//            case 2:
//                data_json = { "port_info": { "port_name": name} };
//                url = 'side_bar/port';
//                html_class = '.aside_ship_details_table_body';
//                break;
//
//
//        }
//        $.ajax({
//            url:url,
//            beforeSend: function(){
//                // Handle the beforeSend event
//            },
//            type: 'POST',
//            data:data_json,
//            complete: function(r){
//                // Handle the complete event
//                // alert(r);
//
//            },
//            success: function(result) {
//
//                $(html_class).html(result);
//            },
//            error: function(r){
//                alert(r.message);
//            }
//        });
//        console.log(name + " 3:  " + level)
//
//    }
//
//

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
            complete: function(r){
                // Handle the complete event
                // alert(r);

            },
            success: function(result) {

                $(html_class).html(result);
            },
            error: function(r){
                alert(r + "works");
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


addClass = function(tag){
    $('.scroll_inside_table table tr').children().removeClass('highlight-clicked-row');
    $(tag).closest('tr').children().addClass('highlight-clicked-row');
}



//$(document).on('click',".tested", function(e){
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