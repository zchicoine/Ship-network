
function drawMap(data) {

    var africa = new Africa_class();
    var australia = new Australia_class();
    var far_east = new Far_East_class();
    var india_and_sea = new India_and_South_East_Asia_class();
    var arabia_and_pg = new Arabia_and_Persian_Gulf_Class();
    var na = new North_America_class();
    var europe = new Europe_class();
    var sa = new South_America_class();


    // region_json = {'region_name': {countries:[],'coordinates:[],'color': '#fffff'}}
    var region_json = { };

        region_json[africa.name] = africa;
        region_json[australia.name] = australia;
        region_json[far_east.name] = far_east;
        region_json[na.name] = na;
        region_json[arabia_and_pg.name] = arabia_and_pg;
        region_json[europe.name] =europe;
        region_json[sa.name] = sa;
        region_json[india_and_sea.name] = india_and_sea;

    rows = data['rows'];

    var region_name_now = "";
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

    for(var _region in region_json){
       // console.log(_region);
        country = new google.maps.Polygon({
            paths: region_json[_region].fusiontables_properties['coordinates'],
            strokeColor: "#20FF00",
            strokeOpacity: 0,
            strokeWeight: 1,
            fillColor:"#20FF00" ,
            fillOpacity: 0.2
        });
        country.setMap(map);

        event_listeners(country,_region);
    }

    //console.log(region_json["Australia"]['coordinates']);

}

function constructNewCoordinates(polygon) {
    var newCoordinates = [];
    var coordinates = polygon['coordinates'][0];
    for (var i in coordinates) {
        newCoordinates.push(
            new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
    }
    return newCoordinates;
}
