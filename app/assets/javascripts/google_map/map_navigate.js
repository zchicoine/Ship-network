//<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
$(window).load(function () {

    $("#right-img-responsive").click(function () {

       region_objects_variable.return_object_region(current_region()).scroll_between_specific_areas();
    });


    $("#left-img-responsive").click(function () {

        region_objects_variable.return_object_region(current_region()).scroll_between_specific_areas();
    });


});
