var Ship_Details;
Ship_Details = function(ship_name,port_name)
{
    this.ship_name = ship_name;
    this.port_name = port_name;
    this.region_name = current_region.value;
    this.html_classnames =
    {
        main_page:"#outer-map",
        side_panel:{ship_small_window:".ship-info-small-window"}
    }
}

Ship_Details.prototype.backend = function()
{
    var temp_object = this;

    return {
        get_result: function(dataType,async, url, beforeSend)
        {
            if(string_match(temp_object.ship_name) && string_match(temp_object.port_name) && string_match(temp_object.region_name))
            {
                var data_json =  { "ship_name": temp_object.ship_name, "port_name":temp_object.port_name,"region_name":temp_object.region_name } ;
                // default values
                var  _url = "ship_details/show";
                var _dataType = "html";
                var _async = false;

                if(string_match(url))
                    _url = url;

                if(string_match(dataType))
                    _dataType = dataType;

                if(async)
                    _async = async;

               return $.ajax({
                    url:_url,
                    beforeSend: function(){
                        // Handle the beforeSend event
                        if(isFunction(beforeSend))
                            beforeSend();
                    },
                    type: 'POST',
                    dataType:_dataType ,
                    data:data_json,
                    async:_async,
                    error: function(r){
                        error_message_display("display Motor Vessel.");
                    }
                });
            }
        }
    }
}



Ship_Details.prototype.controller = function()
{
    var temp_object = this;

    return {
        render: function()
        {
            var results = temp_object.backend().get_result('html',false);
            results.done(function (data)
            {
                current_location.value = COME_FROM_MOTOR_VESSEL;
                // hide the small window of ship info
                $( temp_object.html_classnames.side_panel.ship_small_window).hide( );
                $(temp_object.html_classnames.main_page).htmlCustom(data);
            });

        }
    }
}


Ship_Details.prototype.frontend = function()
{
    var temp_object = this;

    return {
        draw: function()
        {
            temp_object.controller().render();
        }
    }
}
// end of ship details class



// ship details view class
var ShipDetailsView = function()
{
}
ShipDetailsView.prototype.start = function(ship_name,port_name)
{
    var _ship_details =  new Ship_Details(ship_name,port_name);
    _ship_details.frontend().draw();
};

var ShipDetailsViewInstance = new ShipDetailsView();

// end of ship details view class