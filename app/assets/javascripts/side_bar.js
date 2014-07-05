go_to_region = function (coordinates){
    console.log(coordinates);
   _latLng =  new google.maps.LatLng(coordinates[0], coordinates[1]);
    console.log(_latLng);
    window.map.setCenter(_latLng);
    window.map.setZoom(4);
}

$(window).load(function() {



    $(".triangle_image").click(function () {
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



});