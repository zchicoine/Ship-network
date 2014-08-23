
function drawMap(data) {

    rows = data['rows'];

    for (var i in rows) {

        REGION_OBJECTS.each_object().highlight_the_region(rows[i][0],rows[i][1])

    }

    REGION_OBJECTS.each_object().fornow();


}