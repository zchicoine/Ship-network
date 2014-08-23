
function drawMap(data) {

    var africa = new Africa_class();
    var australia = new Australia_class();
    var far_east = new Far_East_class();
    var india_and_sea = new India_and_South_East_Asia_class();
    var arabia_and_pg = new Arabia_and_Persian_Gulf_Class();
    var na = new North_America_class();
    var europe = new Europe_class();
    var sa = new South_America_class();

    rows = data['rows'];

    for (var i in rows) {

        africa.highlight_the_region(rows[i][0],rows[i][1]);
        arabia_and_pg.highlight_the_region(rows[i][0],rows[i][1]);
        india_and_sea.highlight_the_region(rows[i][0],rows[i][1]);
        sa.highlight_the_region(rows[i][0],rows[i][1]);
        europe.highlight_the_region(rows[i][0],rows[i][1]);
        na.highlight_the_region(rows[i][0],rows[i][1]);
        far_east.highlight_the_region(rows[i][0],rows[i][1]);
        australia.highlight_the_region(rows[i][0],rows[i][1]);

    }
    africa.fornow();
    arabia_and_pg.fornow();
    india_and_sea.fornow();
    sa.fornow();
    europe.fornow();
    na.fornow();
    far_east.fornow();
    australia.fornow();

}


