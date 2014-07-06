
// jquery to make the banner disappear and enter the website
$(document).ready(function(){


    $("#free_tour").click(function(e){

        //jquery to set opacity to zero
        $("#transparent_div").removeClass('transparent');

        //jquery to fadeOut the banner
        $("#main_banner").fadeOut("slow",function(){});

        
    });


});

