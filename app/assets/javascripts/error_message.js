$(document).ready(function() {

    $(".error_message_close_button").click(function () {

            $(".error_message").fadeOut('slow');
        }
    );


    $(".test-error").click(function(){
        $(".error_message").fadeIn('slow');
    });
});


