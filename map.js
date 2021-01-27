function setupMapData(lst){
    var lstlat = [];
    var lstlon = [];
    var lsttex = [];
    for (var des1 of lst){
        lstlat.push(des1[0]);
        lstlon.push(des1[1]);
        lsttex.push(des1[2]);
    }
    var lsts = [{type:"scattermapbox", mode:"markers", marker: {size:14, color:'rgb(255,0,0)'}, lat:lstlat, lon:lstlon, text: lsttex}];
    return lsts;
    
}


function findCenter(lst){
    var lstlat = [];
    var lstlon = [];
    for (var set of lst){
        lstlat.push(set[0]);
        lstlon.push(set[1]);
    }
    var latmax = lstlat[0];
    var latmin = lstlat[0];
    for (var sets of lstlat){
        if (sets > latmax){
            latmax = sets;
        }
        else if (sets < latmin){
            latmin = sets;
        }
    }
    var lonmax = lstlon[0];
    var lonmin = lstlon[0];
    for (var setz of lstlon){
        if (setz > lonmax){
            lonmax = setz;
        }
        else if (setz < lonmin){
            lonmin = setz;
        }
    }
    var avglat = (latmax + latmin)/2;
    var avglon = (lonmax + lonmin)/2;
    var lstcen = [avglat, avglon];
    return lstcen;
}

function setupMapLayout(lst){
    var object = {mapbox: { zoom: 5, center: {lat: (findCenter(lst))[0], lon: (findCenter(lst))[1]}}};
    return object;
}

function getMapParams(jsonstring){
    var jsstring = JSON.parse(jsonstring);
    var dictionary = {data: [], layout: {}};
    dictionary.data = setupMapData(jsstring);
    dictionary.layout = setupMapLayout(jsstring);
    return dictionary;
}

function loadMap(){
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiYW5ua29ubmEiLCJhIjoiY2puaTVoM3gzMGZ0MDNwbnI2YzltdHhybiJ9.3ccE3mYBIg4NVHlTOpoA4g'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/suny_map");
    xhttp.send();

}
