// this function to add to link list history
// it accept string_name: name that will display (required)
//           url: the url that will be displayed when it clicks on a name (option)
//          level: Global, region, area, port, ship (required)

refresh_link_list_back_history = function (string_name, level) {

    if(string_name.match(/[a-z]*/i) &&  !isNaN(level)) {

        var data = { "name": string_name,  "level":level };
        $.ajax({
            url: 'link_list_back_history/refresh',
            beforeSend: function () {
                // Handle the beforeSend event
            },
            type: 'POST',
            data: data,
            complete: function (r) {
                // Handle the complete event


            },
            success: function (result) {

                 $('.link_list_back_history').html(result);
              //  alert("S: " +result)
            },
            error: function (xhr, ajaxOptions, thrownError) {
                error_message_display("Add element to link history")
                //alert(xhr.responseText);
            }
        });
    }else {
        console.log("R:error")
        return "Error: refresh the history"
    }

}