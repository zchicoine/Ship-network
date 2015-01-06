/**
 * Created on 2014-12-23.
 */

// backend
Side_Panel.backend =  {}

/*
 this function is responsible for calling the backend throw ajax call
 name: it could be one of these {Go to Region, Global Information ,region name , port name or ship name}.
 level: one of the four levels (Global,Region,Port,Ship, etc)
 datatype: html,json
 async: false or true
 details: add extra details, an example (for the region level, details could be = to "region_stats" ), it has a json object
 beforeSend: this should be a function that will run before send ajax call to backend
 */
Side_Panel.backend.get_result = function(name, level ,datatype,async,url,detials,beforeSend){



    if(! isNaN(level) && string_match(name) )

    {
        var data_json = { "side_info": { "name": name , "level": level, "details": detials} };
        var _url = 'side_panel/index';

        if( string_match(url) )
            _url = url;

        return  $.ajax({
            url:_url,
            beforeSend: function(){
                if(isFunction(beforeSend))
                    beforeSend();
            },
            async: async,
            type: 'POST',
            data:data_json,
            dataType: datatype,
            error: function(xhr, ajaxOptions, thrownError){

                error_message_display(thrownError)
            }

        });
    }
}

// end of the backend
