function handleMouseOverEurope(){

  
 regionEurope = new google.maps.Polygon({
    paths: regionEuropeCoords,
     strokeColor: "blue",
    strokeWeight: 0,
    strokeOpacity: 1,
    fillColor: "blue",
    fillOpacity: 1
  });
  regionEurope.setMap(map);
}

function handleMouseOverMiddleEast(){

  
 regionMiddleEast = new google.maps.Polygon({
    paths: regionMiddleEastCoords,
     strokeColor: "blue",
    strokeWeight: 0,
    strokeOpacity: 1,
    fillColor: "#0A94CB",
    fillOpacity: 1
  });
  regionMiddleEast.setMap(map);
}

function handleMouseOverAustralia(){

  
 regionAustralia = new google.maps.Polygon({
    paths: regionAustraliaCoords,
     strokeColor: "blue",
    strokeWeight: 0,
    strokeOpacity: 1,
    fillColor: "#0A94CB",
    fillOpacity: 1
  });
  regionAustralia.setMap(map);
}

function handleMouseOverAfrica(){

  
 regionAfrica = new google.maps.Polygon({
    paths: regionAfricaCoords,
     strokeColor: "blue",
    strokeWeight: 0,
    strokeOpacity: 1,
    fillColor: "#0A94CB",
    fillOpacity: 1
  });
  regionAfrica.setMap(map);
}

function handleMouseOverSouthAmerica(){

  
 regionSouthAmerica = new google.maps.Polygon({
    paths: regionSouthAmericaCoords,
     strokeColor: "blue",
    strokeWeight: 0,
    strokeOpacity: 1,
    fillColor: "#0A94CB",
    fillOpacity: 1
  });
  regionSouthAmerica.setMap(map);
}

function handleMouseOverNorthAmerica(){

  
 regionNorthAmerica = new google.maps.Polygon({
    paths: regionNorthAmericaCoords,
    strokeColor: "blue",
    strokeWeight: 0,
    strokeOpacity: 1,
    fillColor: "#0A94CB",
    fillOpacity: 1
  });
  regionNorthAmerica.setMap(map);
}