go_to_region = function (coordinates){
    console.log(coordinates);
   _latLng =  new google.maps.LatLng(coordinates[0], coordinates[1]);
    console.log(_latLng);
    window.map.setCenter(_latLng);
    window.map.setZoom(4);
}

$(window).load(function() {
    var visible = true;
    $(".triangle_image").click(function () {



        $('.hide_table_region').children().each(function(){
            console.log(this);
            $(this).animate({height: 'toggle',opacity:'toggle'}, "slow", function() {

                visible = !visible;
                if (!visible) {
                    $(".triangle_image").attr("src", "assets/greentriangle_up.png");
                }
                else {

                    $(".triangle_image").attr("src", "assets/greentriangle_down.png");

                }


            });
        });
    });

});