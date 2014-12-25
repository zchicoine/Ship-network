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

var Back_History;
Back_History =
{
    // the html that will be display to the user, it will save here
    display_history: {}
}

/**
 *
 * @param display_name: the user will see
 * @param name: backend is using this name
 * @param level: or layer {Global, Region, Port or Ship}
 */
Back_History.link_list = function(display_name,name, level)
{
    if(string_match(display_name) &&  ! isNaN(level) )
    {
        switch (level)
        {
            case GLOBAL_LEVEL:
                this.display_history[GLOBAL_LEVEL]= "<span class=' btn-link' onclick='location.reload()'>" + display_name + "</span>";
                // update the view
                $('.link_list_back_history').html(this.display_history[GLOBAL_LEVEL]);
                break;
            case REGION_LEVEL:
                this.display_history[REGION_LEVEL]=  "  > "  +
                        '<span class=" btn-link" onclick="MainViewGeneratorInstance.regionView(\'' + name + '\')">' + display_name + '</span>';
                // update the view
                $('.link_list_back_history').html(this.display_history[GLOBAL_LEVEL] + this.display_history[REGION_LEVEL]);
                break;
            case PORT_LEVEL:
                this.display_history[PORT_LEVEL]=  "  > "  +
                        '<span class=" btn-link" onclick="MainViewGeneratorInstance.portView(\'' + name + '\')">' + display_name + '</span>';
                $('.link_list_back_history').html(this.display_history[GLOBAL_LEVEL] + this.display_history[REGION_LEVEL]
                                                + this.display_history[PORT_LEVEL]);
                break;
            case SHIP_LEVEL:
                this.display_history[SHIP_LEVEL]=  "  > "  +
                        '<span class=" btn-link" onclick="MainViewGeneratorInstance.shipView(\'' + name + '\')">' + display_name + '</span>';
                $('.link_list_back_history').html(this.display_history[GLOBAL_LEVEL] + this.display_history[REGION_LEVEL]
                                                + this.display_history[PORT_LEVEL] + this.display_history[SHIP_LEVEL] );
                break;
            default :
                break;
        }

    }
}