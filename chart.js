function loadChart(){	
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            data = getChartParams(this.response);
            Plotly.plot('chart', data);
        }
    };
    xhttp.open("GET", "/suny_chart");
    xhttp.send(); 
}

function getChartParams(jsonstring){
    var jsstring = JSON.parse(jsonstring);
    var values = [
	      ['Enrollment', '4 Year Graduation Rate', '6 Year Graduation Rate', 'Undergraduate Enrollment', 'Graduate Enrollment'],
	      [],
	      [],
	      [],
	      []];

    var data = [{
	  type: 'table',
	  header: {
	    values: [["PROFILES"], ["ALBANY"],["BINGHAMTON"], ["BUFFALO"], ["STONY BROOK"]],
	    align: ["left", "center"],
	    line: {width: 1, color: '#506784'},
	    fill: {color: '#119DFF'},
	    font: {family: "Arial", size: 12, color: "white"}
	  },
	  cells: {
	    values: values,
	    align: ["left", "center"],
	    line: {color: "#506784", width: 1},
		fill: {color: ['#25FEFD', 'white']},
	    font: {family: "Arial", size: 11, color: ["#506784"]}
	  }
	}];
    for (var i = 0; i < jsstring.length; i = i + 1){
	if (jsstring[i][0] == "Albany"){
	    values[1][0] = jsstring[i][1];
	    values[1][1] = jsstring[i][2];
	    values[1][2] = jsstring[i][3];
	    values[1][3] = jsstring[i][4];
	    values[1][4] = jsstring[i][5];
        }

	else if(jsstring[i][0] == "Binghamton"){
	    values[2][0] = jsstring[i][1];
	    values[2][1] = jsstring[i][2];
	    values[2][2] = jsstring[i][3];
	    values[2][3] = jsstring[i][4];
	    values[2][4] = jsstring[i][5];
	    }
	else if(jsstring[i][0] == "Buffalo Univ"){
	    values[3][0] = jsstring[i][1];
	    values[3][1] = jsstring[i][2];
	    values[3][2] = jsstring[i][3];
	    values[3][3] = jsstring[i][4];
	    values[3][4] = jsstring[i][5];
	    }
	else if(jsstring[i][0] == "Stony Brook"){
	    values[4][0] = jsstring[i][1];
	    values[4][1] = jsstring[i][2];
	    values[4][2] = jsstring[i][3];
	    values[4][3] = jsstring[i][4];
	    values[4][4] = jsstring[i][5];
	    }
	} 
    return data;
}