//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
$(window).load(function () {

    $("#outer-map").click(function (e) {
        //e.preventDefault();
        //e.stopImmediatePropagation();
    });

    $("#right-img-responsive").hover(function () {


        $("body").css("cursor", "default");


        //$('.tag-tooltip').tooltip();
    });

    $("#left-img-responsive").hover(function () {
        $("body").css("cursor", "default");
    });


    $("#right-img-responsive").click(function () {

        return_object_region(current_region()).scroll_between_specific_areas();
    });


    $("#left-img-responsive").click(function () {

            return_object_region(current_region()).scroll_between_specific_areas();
    });


    $(".zoom_out").click(function () {

        initialize();
        setMarkers(null, markerArray);
        window.map.setZoom(3);

        // setting the global zoom value back to 2 so that the right navigation button will be set to act on
        // region layer
        zval.set(3);

        // changing the cursor back to default
        $("body").css("cursor", "default");
    });


});

function select_scroll_array() {


    if (current_region() == "Europe") {
        a = new Field("test");
        a.setValue(europe_port_array);
    }
    else if (current_region() == "North America") {
        a = new Field("test");
        a.setValue(north_america_port_array);
    }
    else if (current_region() == "South America") {
        a = new Field("test");
        a.setValue(south_america_port_array);
    }
    else if (current_region() == "Africa") {
        a = new Field("test");
        a.setValue(africa_port_array);
    }
    else if (current_region() == "India and South East Asia") {
        a = new Field("test");
        a.setValue(sea_port_array);
    }
    else if (current_region() == "Arabia and Persian Gulf") {
        a = new Field("test");
        a.setValue(persianGulf_port_array);
    }
    else if (current_region() == "Far East") {
        a = new Field("test");
        a.setValue(farEast_port_array);
    }
    else if (current_region() == "Australia") {

        a = new Field("test");
        a.setValue(australia_port_array);

    }


    return a.getValue();

}

/*

 this is a function to set and get global values for arrays used
 to scroll in different ports on a region when zoomed in
 */
function Field(val) {
    var value = val;

    this.getValue = function () {
        return value;
    };

    this.setValue = function (val) {
        value = val;
        console.log(value);
    };
}