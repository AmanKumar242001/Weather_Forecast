var N = 1;
var pl = "",
    tm = "",
    hm = "",
    pr = "",
    ds = "";



function giveError(err) {
    document.getElementById('Data').value = "";
    document.getElementById('Data1').style = "display:block";
    document.getElementById('Data1').innerHTML = err;
}
let weather = {
    apiKey: "e6611a5e4fc2019b44fce8c16c58d82e",
    fetchWeather(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + this.apiKey + "&units=metric")
            .then((response) => response.json())
            .then((data) => {
                try {
                    //	console.log(data);
                    this.displayWeather(data);
                } catch {
                    document.querySelector('.Loader').style = "display:none";
                    document.querySelector('.dataSet1').style = "display:none";
                    document.querySelector('.dataSet2').style = "display:none";
                    document.querySelector('.dataSet').style = "display:none";
                    giveError("<h3><strong>Some Error Occured!</strong> This location doesn't exist or may be some typing mistake.</h3>");
                }
            });
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description, main } = data.weather[0];
        const { temp, humidity, pressure, temp_min, temp_max } = data.main;
        const { speed, deg } = data.wind;
        //console.log(name, icon, description, temp, humidity, speed);
        document.querySelector('.City').innerHTML = "Weather in " + name;
        document.querySelector('.discp').innerHTML = "<h2>" + main + "<br>" + description + "</h2>";
        document.querySelector('.Icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.temperature').innerHTML = "<h2>Temperature: " + temp + "&#176C</h2>";
        document.querySelector('.Speed').innerHTML = "Wind Speed : " + speed + " KMPH(" + deg + "&#176)";
        document.querySelector('.Humidity').innerHTML = "<h2>Humidity : " + humidity + "%</h2>";
        document.querySelector('.Pressure').innerHTML = "<h2>Pressure : " + pressure + "Pa</h2>";
        document.querySelector('.MinT').innerHTML = "<h2 style='color:rgb(0, 255, 212)'>Min. Temperature: " + temp_min + "&#176C</h2>";
        document.querySelector('.MaxT').innerHTML = "<h2 style='color:rgb(0, 255, 212)'>Max. Temperature: " + temp_max + "&#176C</h2>";
        document.querySelector('.dataSet1').style = "display:block";
        document.querySelector('.dataSet2').style = "display:block";
        document.querySelector('.Loader').style = "display:none";
        document.getElementById('Data1').style = "display:none";
        pl = name;
        tm = temp;
        hm = humidity;
        pr = pressure;
        ds = description;
    },
    search: function() {
        var Data = document.getElementById('Data').value;
        if (Data != "") {
            this.fetchWeather(Data);
            document.querySelector('.dataSet').style = "display:block";
            document.querySelector('.dataSet1').style = "display:none";
            document.querySelector('.dataSet2').style = "display:none";
            document.querySelector('.Loader').style = "display:block";
            document.getElementById('Data1').style = "display:none";
        } else {
            //alert("Fill empty fields.");
            giveError("<h3><strong>Some Error Occured!</strong> Fill Empty fields...</h3>");
            //document.getElementById('Data1').style = "display:none";
        }
    },
}

function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('mydata');
    let D = new Date();
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    giveError("<h3><strong style='color:green;'>Succesfully Downloaded!</strong></h3>");
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || (D + '.' + (type || 'xlsx')));
}

function myCreateFunction() {
    if (pl != "" && tm != "" && hm != "" && pr != "" && ds != "") {
        var table = document.getElementById("mydata");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var bu = document.createElement("INPUT");
        bu.setAttribute("type", "button");
        bu.setAttribute("onclick", "SomeDeleteRowFunction(this)");
        bu.setAttribute("value", "Delete");
        bu.setAttribute("class", "btn btn-danger");
        cell1.innerHTML = "<h3>" + N + "</h3>";
        N = N + 1;
        cell2.innerHTML = "<h3>" + pl + "</h3>";
        cell3.innerHTML = "<h3>" + tm + "</h3>";
        cell4.innerHTML = "<h3>" + hm + "</h3>";
        cell5.innerHTML = "<h3>" + pr + "</h3>";
        cell6.innerHTML = "<h3>" + ds + "</h3>";
        cell7.appendChild(bu);
        pl = "";
        tm = "";
        hm = "";
        pr = "";
        ds = "";
        giveError("<h3><strong style='color:green;'>Added Sucessfully!</strong></h3>");
    } else {
        //alert("First Search data for a Place...");
        giveError("<h3><strong>Some Error Occured!</strong> Search a data of a place...</h3>");
    }
}

function SomeDeleteRowFunction(o) {
    var p = o.parentNode.parentNode;
    p.parentNode.removeChild(p);
    N = N - 1;
    giveError("<h3><strong style='color:blue;'>Data deleted!</strong></h3>");
}