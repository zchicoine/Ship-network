
// jquery to make the banner disappear and enter the website
$(document).ready(function(){
 $('*').tooltip({template :'<div class="tooltip" role="tooltip"><div class="tooltip_decoration tooltip-arrow"></div><div class="tooltip-inner "></div></div>'});

    $("#free_tour").click(function(e){

        $("#transparent_div").removeClass('transparent');

        //jquery to fadeOut the banner
        $("#main_banner").fadeOut("slow",function(){});

        
    });




//    $('.show_hover').clickToggle( function() {
//
//
//    short_region_info_show("Australia");
//
//
//
//
//    },function() {
//
//        short_region_info_hide();
//   });





});


main_banner = function (page){
    $.ajax({
        url:'main_pages/' + page,
        beforeSend: function(){
            // Handle the beforeSend event
        },
        type: 'GET',

        complete: function(r){
            // Handle the complete event
            // alert(r);

        },
        success: function(result) {

            $('.banner1').html(result);
        },
        error: function(r){
            alert(r.message);
        }
    });

}

