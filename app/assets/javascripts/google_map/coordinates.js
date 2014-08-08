

var colors = ['#0055FF', '#0080FF', '#00FFEC', '#00B4FF' , '#64BDFF' , '#A8ff00' , '#20FF00' , '#0CE825'];

function drawMap(data) {
    rows = data['rows'];
    var region = { 'North_America': [[], colors[1],'North America'], 'South_America': [[], colors[1],'South America'],
        'Europe': [[], colors[1],'Europe'],'India': [[], colors[1],'India'],
        'Far_East': [[], colors[1],'North America'],'Australia': [[], colors[1],'Australia'],
        'Africa': [[], colors[1],'Africa'],'Persian_Gulf': [[], colors[1],'Persian Gulf']};

    for (var i in rows) {

        if (rows[i][0] != 'Antarctica' && (rows[i][0] == "Australia" || rows[i][0] == "New Zealand"
            || rows[i][0] == "Papua New Guinea")) {
            var geometries = rows[i][1]['geometries'];


            if (geometries) {
                for (var j in geometries) {
                    region.Australia[0].push(constructNewCoordinates(geometries[j]));

                }


            } else {
                region.Australia[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }


        }
        else if (rows[i][0] != 'Antarctica' && (rows[i][0] == "China" || rows[i][0] == "Taiwan" || rows[i][0] == "S. Korea" || rows[i][0] == "N. Korea"
            || rows[i][0] == "Japan")) {
            var geometries = rows[i][1]['geometries'];


            if (geometries) {
                for (var j in geometries) {
                    region.Far_East[0].push(constructNewCoordinates(geometries[j]));

                }


            } else {
                region.Far_East[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }

        }
        else if (rows[i][0] != 'Antarctica' && (rows[i][0] == "India" || rows[i][0] == "Sri Lanka" || rows[i][0] == "Bangladesh"
            || rows[i][0] == "Myanmar" || rows[i][0] == "Thailand" || rows[i][0] == "Malaysia"
            || rows[i][0] == "Brunei" || rows[i][0] == "Indonesia" || rows[i][0] == "Laos" || rows[i][0] == "Nepal" || rows[i][0] == "Bhutan"
            || rows[i][0] == "Cambodia" || rows[i][0] == "Vietnam" || rows[i][0] == "Philippines" )) {

            var geometries = rows[i][1]['geometries'];


            if (geometries) {
                for (var j in geometries) {
                    region.India[0].push(constructNewCoordinates(geometries[j]));

                }


            } else {
                region.India[0].push(constructNewCoordinates(rows[i][1]['geometry']));
            }





        }
        else if (rows[i][0] != 'Antarctica' && (rows[i][0] == "Jordan" || rows[i][0] == "Yemen" || rows[i][0] == "Oman"
            || rows[i][0] == "United Arab Emirates" || rows[i][0] == "Qatar" || rows[i][0] == "Bahrain" || rows[i][0] == "Turkmenistan"
            || rows[i][0] == "Kuwait" || rows[i][0] == "Iraq" || rows[i][0] == "Iran" || rows[i][0] == "Saudi Arabia"
            || rows[i][0] == "Afghanistan" || rows[i][0] == "Uzbekistan" || rows[i][0] == "Pakistan" || rows[i][0] == "Kazakhstan"
            )) {
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
        else if (rows[i][0] != 'Antarctica' && (rows[i][0] == "Egypt" || rows[i][0] == "Libya" || rows[i][0] == "Botswana"
            || rows[i][0] == "Tunisia" || rows[i][0] == "Algeria" || rows[i][0] == "Morocco" || rows[i][0] == "Senegal" || rows[i][0] == "Chad"
            || rows[i][0] == "Gambia" || rows[i][0] == "Guinea-Bissau" || rows[i][0] == "Guinea" || rows[i][0] == "Sierra Leone"
            || rows[i][0] == "Liberia" || rows[i][0] == "Cote d'Ivoire" || rows[i][0] == "Ghana" || rows[i][0] == "Togo"
            || rows[i][0] == "Benin" || rows[i][0] == "Nigeria" || rows[i][0] == "Cameroon" || rows[i][0] == "Equatorial Guinea"
            || rows[i][0] == "Gabon" || rows[i][0] == "Democratic Republic of the Congo" || rows[i][0] == "Angola" || rows[i][0] == "Namibia"
            || rows[i][0] == "South Africa" || rows[i][0] == "Mozambique" || rows[i][0] == "Madagascar" || rows[i][0] == "Tanzania"
            || rows[i][0] == "Kenya" || rows[i][0] == "Somalia" || rows[i][0] == "Djibouti" || rows[i][0] == "Eritrea"
            || rows[i][0] == "Sudan" || rows[i][0] == "Mauritania" || rows[i][0] == "Ethiopia" || rows[i][0] == "Mali" || rows[i][0] == "Zambia"
            || rows[i][0] == "Zimbabwe"
            || rows[i][0] == "Niger")) {

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
        else if (rows[i][0] != 'Antarctica' && (rows[i][0] == "United Kingdom" || rows[i][0] == "Ireland"
            || rows[i][0] == "Iceland" || rows[i][0] == "Germany" || rows[i][0] == "Netherlands" || rows[i][0] == "Belgium"
            || rows[i][0] == "France" || rows[i][0] == "Spain" || rows[i][0] == "Portugal" || rows[i][0] == "Italy"
            || rows[i][0] == "Slovenia" || rows[i][0] == "Croatia" || rows[i][0] == "Serbia" || rows[i][0] == "Albania"
            || rows[i][0] == "Greece" || rows[i][0] == "Turkey" || rows[i][0] == "Cyprus" || rows[i][0] == "Bulgaria"
            || rows[i][0] == "Syria" || rows[i][0] == "Israel" || rows[i][0] == "Lebanon" || rows[i][0] == "Romania"
            || rows[i][0] == "Ukraine" || rows[i][0] == "Georgia" || rows[i][0] == "Norway" || rows[i][0] == "Sweden"
            || rows[i][0] == "Denmark" || rows[i][0] == "Finland" || rows[i][0] == "French Southern and Antarctic Lands"
            || rows[i][0] == "Belarus" || rows[i][0] == "Poland" || rows[i][0] == "Lithuania" || rows[i][0] == "Latvia"
            || rows[i][0] == "Estonia" || rows[i][0] == "Slovakia" || rows[i][0] == "Hungary"
            || rows[i][0] == "Russia")) {

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

        else if (rows[i][0] != 'Antarctica' && (rows[i][0] == "Colombia" || rows[i][0] == "Venezuela"
            || rows[i][0] == "Guyana" || rows[i][0] == "Suriname" || rows[i][0] == "French Guiana" || rows[i][0] == "Trindad and Tobago"
            || rows[i][0] == "Barbados" || rows[i][0] == "Grenada" || rows[i][0] == "St Vincent and the Grenadines" || rows[i][0] == "St Lucia"
            || rows[i][0] == "Martinique" || rows[i][0] == "Dominica" || rows[i][0] == "St Kitts and Nevis" || rows[i][0] == "Uruguay"
            || rows[i][0] == "Argentina" || rows[i][0] == "Brazil" || rows[i][0] == "Chile" || rows[i][0] == "Peru"
            || rows[i][0] == "Ecuador" || rows[i][0] == "Antigua & Barbuda" || rows[i][0] == "Guadeloupe"
            || rows[i][0] == "Bolivia" || rows[i][0] == "Paraguay")) {

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
        else if (rows[i][0] != 'Antarctica' && (rows[i][0] == "Canada" || rows[i][0] == "Mexico"
            || rows[i][0] == "Greenland" || rows[i][0] == "Guatemala" || rows[i][0] == "Belize" || rows[i][0] == "El Salvador"
            || rows[i][0] == "Honduras" || rows[i][0] == "Nicaragua" || rows[i][0] == "Costa Rica" || rows[i][0] == "Panama"
            || rows[i][0] == "Cuba" || rows[i][0] == "Haiti" || rows[i][0] == "Dominican Republic" || rows[i][0] == "Jamaica"
            || rows[i][0] == "Bahamas" || rows[i][0] == "Bermuda" || rows[i][0] == "United States")) {

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

