
// jquery to make the banner disappear and enter the website
$(document).ready(function(){


    $("#free_tour").click(function(e) {

//jquery to set opacity to zero
        $("#transparent_div").removeClass('transparent');

        //jquery to fadeOut the banner
        $("#main_banner").fadeOut("slow", function () {
        });

    });


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

