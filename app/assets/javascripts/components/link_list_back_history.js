// this file is to add to link list history
//          level: Global, region, area, port, ship (required)

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
                $('.link_list_back_history').html(this.display_history[GLOBAL_LEVEL] + " > " + display_name);
                break;
            case PORT_LEVEL:
                this.display_history[PORT_LEVEL]=  "  > "  +
                        '<span class=" btn-link" onclick="MainViewGeneratorInstance.portView(\'' + name + '\')">' + display_name + '</span>';
                $('.link_list_back_history').html(this.display_history[GLOBAL_LEVEL] + this.display_history[REGION_LEVEL]
                                                + " > " + display_name);
                break;
            case SHIP_LEVEL:
                this.display_history[SHIP_LEVEL]=  "  > "  +
                        '<span class=" btn-link" onclick="MainViewGeneratorInstance.shipView(\'' + name + '\')">' + display_name + '</span>';
                $('.link_list_back_history').html(this.display_history[GLOBAL_LEVEL] + this.display_history[REGION_LEVEL]
                                                + this.display_history[PORT_LEVEL] + " > " + display_name );
                break;
            default :
                break;
        }

    }
}