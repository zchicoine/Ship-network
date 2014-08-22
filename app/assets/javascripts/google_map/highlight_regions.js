


function drawMap(data) {
    var africa = new Africa_class();
    var australia = new Australia_class();
    var far_east = new Far_East_class();
    var india_and_sea = new India_and_South_East_Asia_class();
    var arabia_and_pg = new Arabia_and_Persian_Gulf_Class();
    var na = new North_America_class();
    var europe = new Europe_class();
    var sa = new South_America_class();

    var region_json = { };
        region_json[africa.name] = africa.list_of_countries;
        region_json[australia.name] = australia.list_of_countries;
        region_json[far_east.name] = far_east.list_of_countries;
        region_json[na.name] = na.list_of_countries;
        region_json[arabia_and_pg.name] = arabia_and_pg.list_of_countries;
        region_json[europe.name] = europe.list_of_countries;
        region_json[sa.name] = sa.list_of_countries;
        region_json[india_and_sea.name] = india_and_sea.list_of_countries;

    rows = data['rows'];
    var region = { 'North_America': [[], na.map_properties['color'],'North America'], 'South_America': [[], sa.map_properties['color'],'South America'],
        'Europe': [[], europe.map_properties['color'],'Europe'],'India': [[], india_and_sea.map_properties['color'],'India and South East Asia'],
        'Far_East': [[], far_east.map_properties['color'],'Far East'],'Australia': [[], australia.map_properties['color'],'Australia'],
        'Africa': [[], africa.map_properties['color'],'Africa'],'Persian_Gulf': [[], arabia_and_pg.map_properties['color'],'Arabia and Persian Gulf']};

    for (var i in rows) {

        if (rows[i][0] != 'Antarctica' &&  new Australia_class().list_of_countries.indexOf(rows[i][0]) > -1 ) {

            var geometries = rows[i][1]['geometries'];


            if (geometries) {
                for (var j in geometries) {
                    region.Australia[0].push(constructNewCoordinates(geometries[j]));

                }


            } else {
                region.Australia[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }


        }
        else if (rows[i][0] != 'Antarctica' && new Far_East_class().list_of_countries.indexOf(rows[i][0]) > -1) {
            var geometries = rows[i][1]['geometries'];


            if (geometries) {
                for (var j in geometries) {
                    region.Far_East[0].push(constructNewCoordinates(geometries[j]));

                }


            } else {
                region.Far_East[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }

        }
        else if (rows[i][0] != 'Antarctica' && (new India_and_South_East_Asia_class().list_of_countries.indexOf(rows[i][0]) > -1)) {

            var geometries = rows[i][1]['geometries'];


            if (geometries) {
                for (var j in geometries) {
                    region.India[0].push(constructNewCoordinates(geometries[j]));

                }


            } else {
                region.India[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }





        }
        else if (rows[i][0] != 'Antarctica' && (new Arabia_and_Persian_Gulf_Class().list_of_countries.indexOf(rows[i][0]) > -1)) {
            var geometries = rows[i][1]['geometries'];

            if (geometries) {
                for (var j in geometries) {
                    region.Persian_Gulf[0].push(constructNewCoordinates(geometries[j]));

                }


            } else {
                region.Persian_Gulf[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }



        }
        //     Egypt, Libya, Tunisia, Algeria, Morocco, Western Sahara, Mauritania, Senegal, Gambia, Guinea-Bissau, Guinea,
        //Sierra Leone, Liberia, Cote d'ivoire, Ghana, Togo, Benin, Nigeria, Cameroon, Equatorial Guinea, Gabon, Congo,
        //     DR Congo, Angola, Namibia, South Africa, Mozambique, Madagascar, Tanzania, Kenya, Somalia, Djibouti, Eritrea, Sudan,
        else if (rows[i][0] != 'Antarctica' && (new Africa_class().list_of_countries.indexOf(rows[i][0]) > -1)) {

            var geometries = rows[i][1]['geometries'];

            if (geometries) {
                // console.log('hello');
                for (var j in geometries) {
                    region.Africa[0].push(constructNewCoordinates(geometries[j]));

                }
            } else {
                region.Africa[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }

        }
        //UK, Ireland, Iceland, Germany, Netherlands, Belgium, France, Spain, Portugal, Italy, Slovenia, Croatia, Serbia & Montenegro,
        //Albania, Greece, Turkey, Cyprus, Bulgaria,
        //Syria, Israel, Lebanon, Romania, Ukraine, Russian Black Sea, Georgia, Norway, Sweden, Denmark, Finland, Russian Arctic
        else if (rows[i][0] != 'Antarctica' && (new Europe_class().list_of_countries.indexOf(rows[i][0]) > -1)) {
            var geometries = rows[i][1]['geometries'];



            if (geometries) {
                for (var j in geometries) {
                    region.Europe[0].push(constructNewCoordinates(geometries[j]));

                }
            } else {
                region.Europe[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }



        }
        //"Colombia", "Venezuela", "Guyana", "Suriname", "French Guiana", "Trindad and Tobago", "Barbados",
        //"Grenada", "St Vincent and the Grenadines", "St Lucia", "Martinique", "Dominica", "St Kitts and Nevis",
        //"Guadeloupe", "Antigua & Barbuda", "Ecuador", "Peru", "Chile", "Brazil", "Argentina", "Uruguay"

        else if (rows[i][0] != 'Antarctica' && (new South_America_class().list_of_countries.indexOf(rows[i][0]) > -1)) {

            var geometries = rows[i][1]['geometries'];

            if (geometries) {
                // console.log('hello');
                for (var j in geometries) {
                    region.South_America[0].push(constructNewCoordinates(geometries[j]));

                }
            } else {
                region.South_America[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }



        }
        //Canada, USA, Mexico, Greenland, Guatemala, Belize, El Salvador,
        //Honduras, Nicaragua, Costa Rica, Panama, Cuba, Haiti, Dominican Republic, Jamaica, Bahamas, Bermuda
        else if (rows[i][0] != 'Antarctica' && (new North_America_class().list_of_countries.indexOf(rows[i][0]) > -1)) {

            var geometries = rows[i][1]['geometries'];

            if (geometries) {
                // console.log('hello');
                for (var j in geometries) {
                    region.North_America[0].push(constructNewCoordinates(geometries[j]));

                }
            } else {
                region.North_America[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }
        }

        else{
            // console.log(rows[i][0]);
        }

    }


    for(var _region in region){
        country = new google.maps.Polygon({
            paths: region[_region][0],
            strokeColor: region[_region][1],
            strokeOpacity: 0,
            strokeWeight: 1,
            fillColor: region[_region][1],
            fillOpacity: 0.2
        });
        country.setMap(map);

        event_listeners(country,region[_region][2]);
    }


}


function drawRegions(geometries,region_name){

    var  geometries = rows[i][1]['geometries'];

    newCoordinates = [];
    if (geometries) {
        // console.log('hello');
        for (var j in geometries) {
            newCoordinates.push(constructNewCoordinates(geometries[j]));

        }


    } else {
        newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
    }



}

