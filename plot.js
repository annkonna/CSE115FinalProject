function loadPlot(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var plotParams = getPlotParams(this.response);
            Plotly.plot('plot', plotParams.data, plotParams.layout);
        }
    };
    xhttp.open("GET", "/suny_plot");
    xhttp.send(); 
}

function getPlotParams(jsonstring){
    var jsstring = JSON.parse(jsonstring);
    var dictionary = {data: [], layout: {}};
    var data = [{     
		x: [],     
		y: [],     
		name: "Buffalo Univ"},{
		x: [],
		y: [],
		name: "Stony Brook"},{     
		x: [],     
		y: [],     
		name: "Binghamton"},{     
		x: [],     
		y: [],     
		name: "Albany"},
		]; 

    var layout = {     
	"title": "Graduation Rate Progression at SUNY University Centers over the last twelve years",     
	xaxis: {         
	"title": "Year"     
	},     
	yaxis:{         
	"title": "Graduation Rate"     
	}
	};
    countbu = 0;
    countsb = 0;
    countbi = 0;
    countal = 0;
    for (var i = 0; i < jsstring.length; i = i + 1){
 	if (jsstring[i][0] == "Buffalo Univ"){
            data[0].x[countbu] = jsstring[i][1];
            data[0].y[countbu] = jsstring[i][2];
            countbu = countbu + 1;
        }
        else if(jsstring[i][0] == "Stony Brook"){
            data[1].x[countsb] = jsstring[i][1];
            data[1].y[countsb] = jsstring[i][2];
            countsb = countsb + 1;
        }
        else if(jsstring[i][0] == "Binghamton"){
            data[2].x[countbi] = jsstring[i][1];
            data[2].y[countbi] = jsstring[i][2];
            countbi = countbi + 1;
        }
        else if(jsstring[i][0] == "Albany"){
            data[3].x[countal] = jsstring[i][1];
            data[3].y[countal] = jsstring[i][2];
            countal = countal + 1;
        }
    } 
    dictionary.data = data;
    dictionary.layout = layout;
    return dictionary;
}  