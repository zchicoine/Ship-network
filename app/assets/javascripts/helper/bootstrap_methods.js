
// fix the focus and click of bootstrap by the following code

var popover_show = false;
var popover_called_once = undefined; // to initialize the popover only once


load_popover_with_id = function(element,popover_load_class, content_id, title_id, placement) {

    if (!  element.isSameNode(popover_called_once) ) {

        popover_called_once = element;

        conent_id_with_right_syntax = "#" + content_id;
        title_id_with_right_syntax = "#" + title_id;
        popover_load_class_with_right_syntax = "." + popover_load_class;

        var content = $(conent_id_with_right_syntax).html();
        var title = $(title_id_with_right_syntax).html();

        $(popover_load_class_with_right_syntax).popover({
            trigger: 'manual',
            template:"<div class='popover_ana popover' role='tooltip'><div class='arrow'></div><h3 class='popover-title_ana popover-title'></h3><div class='popover-content ship_details-portcall'></div></div>",
            html: true,
            placement: placement,
            content: content,
            title:title

        });

        // on blur
//            $(element).blur(function () {
//
//            if( popover_show){
//                $(popover_load_class_with_right_syntax).popover('hide');
//                $(element).trigger('click');
//            }
//
//        });
        // on click
        $(element).clickToggle(function () {


            if(! popover_show){
                $(popover_load_class_with_right_syntax).popover('show');

            }

        },function (be) {
            if(popover_show){
                $(popover_load_class_with_right_syntax).popover('hide');
            }

        } );

    }
    $(popover_load_class_with_right_syntax).on('show.bs.popover', function () {

        popover_show = true;
    });
    $(popover_load_class_with_right_syntax).on('hide.bs.popover', function () {

        popover_show = false;
    });

}

var tooltip_called_once = undefined; // to initialize the tooltip only once

load_tooltip_with_id = function(element, title, placement) {

    if (!element.isSameNode(tooltip_called_once)) {

        tooltip_called_once = element;

        $(element).tooltip({
            container:'body',
            trigger: 'hover click',
            template: '<div class="tooltip" role="tooltip"><div class="tooltip_decoration tooltip-arrow"></div><div class="tooltip-inner "></div></div>',
            html: true,
            placement: placement,
            title: title

        });

    }
}
