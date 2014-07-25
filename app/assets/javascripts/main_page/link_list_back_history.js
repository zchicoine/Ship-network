refresh_link_list_back_history = function (string_name) {
    console.log("R:" + string_name)
    if(string_name.match(/[a-z]*/i) ) {

        var data = { "name": string_name};
        $.ajax({
            url: 'link_list_back_history/refresh',
            beforeSend: function () {
                // Handle the beforeSend event
            },
            type: 'POST',
            data: data,
            complete: function (r) {
                // Handle the complete event
                // alert(r);

            },
            success: function (result) {

                 $('.link_list_back_history').html(result);
                alert("S: " +result)
            },
            error: function (r) {
                alert("E:" + r.message);
            }
        });
    }else {
        console.log("R:error")
        return "Error: refresh the history"
    }

}