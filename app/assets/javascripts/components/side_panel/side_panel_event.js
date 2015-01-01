/***
 * This file will be responsible to call all the functions that relate to side panel,
 * These function will be called based on an event (click, change, focus etc.).
 *
 */



// this code to see if any block is closed or not, if the block is closed then open and vice versa
$(document).on('click','.triangle_image',function () {
    var image = this;
    // if the following class present that means a block is closed
    if ( $(image).hasClass("this_class_only_to_change_image") ) {

        $(image).attr("src", image_greentriangle_down());
        $(image).removeClass("this_class_only_to_change_image");
    }
    else {
        $(image).attr("src",image_greentriangle_closed());
        $(image).addClass("this_class_only_to_change_image");

    }

    $(image).parent().parent().parent().next().children('tr').
        closest('tr').children('td').wrapInner('<div />').
        animate({padding: 'toggle', opacity: 'toggle'} , 150);


});



// to enable both single and dbouble clicked worked on same element.
// initial code take from
// http://stackoverflow.com/questions/6330431/jquery-bind-double-click-and-single-click-separately
var DELAY = 700, clicks = 0, timer = null;

$(document).on('click',".ship_name_on_side_bar", function(e){
    var names = this.id.split("_");
    var ship_name = names[0], port_name =names[1], region_name =  names[2];

    clicks++;  //count clicks


    timer = setTimeout(function () {
        //perform single-click action

        clicks = 0;      //after action performed, reset counter
    }, DELAY);
    if(clicks === 1) {
        //perform single-click action

        if ($(".ship_details").length) {
            ShipDetailsViewInstance.start(ship_name,port_name);
            $( ".hide-or-show-it" ).hide( );
            // remove the broker info for the demo time
            //update_broker_view(ship_name,port_name);

        }else{
            MainViewGeneratorInstance.shipView(ship_name);
        }
    }else {

        clearTimeout(timer);    //prevent single-click action
        //perform double-click action
        // remove the broker info for the demo time
        // update_broker_view(ship_name,port_name);
        ShipDetailsViewInstance.start(ship_name,port_name);
        $( ".hide-or-show-it" ).hide( );
        clicks = 0;             //after action performed, reset counter
    }
});

$(document).on("dblclick",".ship_name_on_side_bar", function(e){
    e.preventDefault();  //cancel system double-click event in particle class
});

