go_to_region = function (coordinates){
    console.log(coordinates);
   _latLng =  new google.maps.LatLng(coordinates[0], coordinates[1]);
    console.log(_latLng);
    window.map.setCenter(_latLng);
    window.map.setZoom(4);
}

closed_table_side_bar = function () {



        var image = '.triangle_image';
        console.log("works");
        if ($(image).hasClass("closed_table")) {
              image += ".closed_table";
            console.log(image);
            $(image).attr("src", "assets/greentriangle_closed.png");
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
