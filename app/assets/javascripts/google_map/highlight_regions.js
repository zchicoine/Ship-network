var region_north_america = [];
  
function drawMap(data) {
        rows = data['rows'];
        console.log(rows);
        for (var i in rows) {
          
          if (rows[i][0] != 'Antarctica' && (rows[i][0] == "Australia" || rows[i][0] == "New Zealand"
          || rows[i][0] == "Papua New Guinea") ){
               var  geometries = rows[i][1]['geometries'];
            region_name = "AUSTRALIA";
            newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
            
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }

              
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
            fillRegion(newCoordinates);
            
            /*  var randomnumber = Math.floor(Math.random() * 4);
              country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: "#B2FFFF",
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: "#B2FFFF",
              fillOpacity: 0.4
            });
          //  console.log(region_name);*/
            event_listeners(country,region_name);
          // country.setMap(map);
            
          } 
            else if(rows[i][0] != 'Antarctica' && (rows[i][0] == "China" ||rows[i][0] == "Taiwan" ||rows[i][0] == "S. Korea" ||rows[i][0] == "N. Korea"
            ||rows[i][0] == "Japan")){
           var  geometries = rows[i][1]['geometries'];
          region_name = "FAR EAST";
             newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
            
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }

              
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
            fillRegion(newCoordinates);
      
      /*var randomnumber = Math.floor(Math.random() * 4);
              country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: "#EB99D6",
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: "#EB99D6",
              fillOpacity: 0.4
            });
          //  console.log(region_name);*/
                 event_listeners(country,region_name);
          // country.setMap(map);
          }
            else if(rows[i][0] != 'Antarctica' && (rows[i][0] == "India" ||rows[i][0] == "Sri Lanka" ||rows[i][0] == "Bangladesh"
              ||rows[i][0] == "Myanmar" ||rows[i][0] == "Thailand" ||rows[i][0] == "Malaysia"
              ||rows[i][0] == "Brunei" ||rows[i][0] == "Indonesia" ||rows[i][0] == "Laos" ||rows[i][0] == "Nepal" ||rows[i][0] == "Bhutan"
              ||rows[i][0] == "Cambodia" ||rows[i][0] == "Vietnam" ||rows[i][0] == "Philippines" )){

           var  geometries = rows[i][1]['geometries'];
          region_name = "INDIA & SE ASIA";
             newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
            
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }

              
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
      
      fillRegion(newCoordinates);
      var randomnumber = Math.floor(Math.random() * 4);
         /*     country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: "#FFAD99",
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: "#FFAD99",
              fillOpacity: 0.4
            });
          //  console.log(region_name);*/
                 event_listeners(country,region_name);
     //      country.setMap(map);

          }
          else if (rows[i][0] != 'Antarctica' && (rows[i][0] =="Jordan" ||rows[i][0] == "Yemen" || rows[i][0] == "Oman" 
            ||rows[i][0] == "United Arab Emirates" ||rows[i][0] == "Qatar"||rows[i][0] == "Bahrain"|| rows[i][0] == "Turkmenistan"
             ||rows[i][0] == "Kuwait" ||rows[i][0] == "Iraq"||rows[i][0] == "Iran" || rows[i][0] == "Saudi Arabia"
             || rows[i][0] == "Afghanistan"|| rows[i][0] == "Uzbekistan"|| rows[i][0] == "Pakistan"||rows[i][0] =="Kazakhstan"
            ) ){
            var  geometries = rows[i][1]['geometries'];
          region_name = "ARABIA & PG";
             newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
            
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }

              
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
      fillRegion(newCoordinates);
      var randomnumber = Math.floor(Math.random() * 4);
              /*country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: "#FFFFB2",
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: "#FFFFB2",
              fillOpacity: 0.4
            });
          //  console.log(region_name);*/
                 event_listeners(country,region_name);

    //       country.setMap(map);

          }
     //     Egypt, Libya, Tunisia, Algeria, Morocco, Western Sahara, Mauritania, Senegal, Gambia, Guinea-Bissau, Guinea, 
     //Sierra Leone, Liberia, Cote d'ivoire, Ghana, Togo, Benin, Nigeria, Cameroon, Equatorial Guinea, Gabon, Congo, 
     //     DR Congo, Angola, Namibia, South Africa, Mozambique, Madagascar, Tanzania, Kenya, Somalia, Djibouti, Eritrea, Sudan, 
          else if(rows[i][0] != 'Antarctica' && (rows[i][0] =="Egypt" || rows[i][0] == "Libya" || rows[i][0] == "Botswana"
                ||rows[i][0] == "Tunisia"|| rows[i][0] == "Algeria" ||rows[i][0] == "Morocco"||rows[i][0] == "Senegal"||rows[i][0] == "Chad"
                ||rows[i][0] == "Gambia" ||rows[i][0] == "Guinea-Bissau" ||rows[i][0] == "Guinea"||rows[i][0] == "Sierra Leone"
                ||rows[i][0] == "Liberia" ||rows[i][0] == "Cote d'Ivoire" ||rows[i][0] == "Ghana"||rows[i][0] == "Togo"
                ||rows[i][0] == "Benin" ||rows[i][0] == "Nigeria" ||rows[i][0] == "Cameroon"||rows[i][0] == "Equatorial Guinea"
                ||rows[i][0] == "Gabon" ||rows[i][0] == "Democratic Republic of the Congo" ||rows[i][0] == "Angola"||rows[i][0] == "Namibia"
                ||rows[i][0] == "South Africa" ||rows[i][0] == "Mozambique" ||rows[i][0] == "Madagascar"||rows[i][0] == "Tanzania"
                ||rows[i][0] == "Kenya" ||rows[i][0] == "Somalia" ||rows[i][0] == "Djibouti"||rows[i][0] == "Eritrea"
                ||rows[i][0] == "Sudan"  ||rows[i][0] == "Mauritania" ||rows[i][0] == "Ethiopia"||rows[i][0] == "Mali"||rows[i][0] == "Zambia"
                ||rows[i][0] == "Zimbabwe"
                ||rows[i][0] == "Niger")){

           var  geometries = rows[i][1]['geometries'];
          region_name = "AFRICA";
             newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
            
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
      fillRegion(newCoordinates);
     /*
              country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: "#D1D1E0",
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: "#D1D1E0",
              fillOpacity: 0.4
            });
       */   //  console.log(region_name);
                 event_listeners(country,region_name);
        //   country.setMap(map);

          }
          //UK, Ireland, Iceland, Germany, Netherlands, Belgium, France, Spain, Portugal, Italy, Slovenia, Croatia, Serbia & Montenegro, 
          //Albania, Greece, Turkey, Cyprus, Bulgaria, 
          //Syria, Israel, Lebanon, Romania, Ukraine, Russian Black Sea, Georgia, Norway, Sweden, Denmark, Finland, Russian Arctic
           else if(rows[i][0] != 'Antarctica' && (rows[i][0] =="United Kingdom" || rows[i][0] == "Ireland"
                ||rows[i][0] == "Iceland"|| rows[i][0] == "Germany" ||rows[i][0] == "Netherlands"||rows[i][0] == "Belgium"
                ||rows[i][0] == "France" ||rows[i][0] == "Spain" ||rows[i][0] == "Portugal"||rows[i][0] == "Italy"
                ||rows[i][0] == "Slovenia" ||rows[i][0] == "Croatia" ||rows[i][0] == "Serbia"||rows[i][0] == "Albania"
                ||rows[i][0] == "Greece" ||rows[i][0] == "Turkey" ||rows[i][0] == "Cyprus"||rows[i][0] == "Bulgaria"
                ||rows[i][0] == "Syria" ||rows[i][0] == "Israel" ||rows[i][0] == "Lebanon"||rows[i][0] == "Romania"
                ||rows[i][0] == "Ukraine" ||rows[i][0] == "Georgia" ||rows[i][0] == "Norway"||rows[i][0] == "Sweden"
                ||rows[i][0] == "Denmark" ||rows[i][0] == "Finland"||rows[i][0] =="French Southern and Antarctic Lands"
                ||rows[i][0] =="Belarus"||rows[i][0] =="Poland"||rows[i][0] =="Lithuania"||rows[i][0] =="Latvia"
                ||rows[i][0] =="Estonia"||rows[i][0] =="Slovakia"||rows[i][0] =="Hungary"
                ||rows[i][0] =="Russia")){

           var  geometries = rows[i][1]['geometries'];
          region_name = "EUROPE";
             newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
            
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
      
            fillRegion(newCoordinates);
    
    /*          country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[0],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.4
            });
          //  console.log(region_name);*/
           event_listeners(country,region_name);
           //country.setMap(map);

          }
          //"Colombia", "Venezuela", "Guyana", "Suriname", "French Guiana", "Trindad and Tobago", "Barbados", 
          //"Grenada", "St Vincent and the Grenadines", "St Lucia", "Martinique", "Dominica", "St Kitts and Nevis", 
          //"Guadeloupe", "Antigua & Barbuda", "Ecuador", "Peru", "Chile", "Brazil", "Argentina", "Uruguay"               

          else if(rows[i][0] != 'Antarctica' && (rows[i][0] =="Colombia" || rows[i][0] == "Venezuela"
                ||rows[i][0] == "Guyana"|| rows[i][0] == "Suriname" ||rows[i][0] == "French Guiana"||rows[i][0] == "Trindad and Tobago"
                ||rows[i][0] == "Barbados" ||rows[i][0] == "Grenada" ||rows[i][0] == "St Vincent and the Grenadines"||rows[i][0] == "St Lucia"
                ||rows[i][0] == "Martinique" ||rows[i][0] == "Dominica" ||rows[i][0] == "St Kitts and Nevis"||rows[i][0] == "Uruguay"
                ||rows[i][0] == "Argentina" ||rows[i][0] == "Brazil" ||rows[i][0] == "Chile"||rows[i][0] == "Peru"
                ||rows[i][0] == "Ecuador" ||rows[i][0] == "Antigua & Barbuda" ||rows[i][0] == "Guadeloupe"
                ||rows[i][0] == "Bolivia"||rows[i][0] == "Paraguay")){

           var  geometries = rows[i][1]['geometries'];
          region_name = "SOUTH AMERICA";
             newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
            
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
      
              fillRegion(newCoordinates);
     /*         country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[0],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.4
            });
          //  console.log(region_name);*/
           event_listeners(country,region_name);
          // country.setMap(map);

          }
          //Canada, USA, Mexico, Greenland, Guatemala, Belize, El Salvador, 
          //Honduras, Nicaragua, Costa Rica, Panama, Cuba, Haiti, Dominican Republic, Jamaica, Bahamas, Bermuda
          else if(rows[i][0] != 'Antarctica' && (rows[i][0] =="Canada" || rows[i][0] == "Mexico"
                ||rows[i][0] == "Greenland"|| rows[i][0] == "Guatemala" ||rows[i][0] == "Belize"||rows[i][0] == "El Salvador"
                ||rows[i][0] == "Honduras" ||rows[i][0] == "Nicaragua" ||rows[i][0] == "Costa Rica"||rows[i][0] == "Panama"
                ||rows[i][0] == "Cuba" ||rows[i][0] == "Haiti" ||rows[i][0] == "Dominican Republic"||rows[i][0] == "Jamaica"
                ||rows[i][0] == "Bahamas" ||rows[i][0] == "Bermuda" ||rows[i][0] == "United States")){

           var  geometries = rows[i][1]['geometries'];
          region_name = "NORTH AMERICA";
             newCoordinates = [];
            //console.log('Rows in drawRegions' + rows);
            
            //alert(geometries);
            if (geometries) {
              console.log('hello');
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
                
              }
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }

            //region_north_america = newCoordinates;
            Array.prototype.push.apply(region_north_america,newCoordinates);
            console.log("NORTH AMERICA"+region_north_america);

            
       
      var randomnumber = Math.floor(Math.random() * 4);
             fillRegion(newCoordinates);
          //  console.log(region_name);
           event_listeners(country,region_name);
         //  country.setMap(map);

          }
    
}
}
      
function fillRegion(newCoordinates){
  country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[0],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: 'transparent',
              fillOpacity: 0.9
            });
  country.setMap(map);
}