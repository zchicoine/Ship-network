$(document).ready(function() {

    $(".error_message_close_button").click(function () {

            $(".error_message").fadeOut('slow', function(){
                $(".error_message p").remove();
            });

        }
    );



});


function error_message_display (message){

    $(".error_message").append("<p>" + message + "</p>");
    $(".error_message").fadeIn('slow');
}