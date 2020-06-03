var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var csv = require("csvtojson");
var csvtojson = csv();
var PriorityQueue = require("./PriorityQueue");

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());


var _jsonArrayObj;
csvtojson
.fromFile(__dirname + "/" + "Mobile_Food_Facility_Permit.csv")
.then(function(jsonArrayObj){
    _jsonArrayObj= jsonArrayObj;        
})

app.post('/foodTrucks', function(req, res) {
    if(!req.body || !req.body.origin){
        throw new Error('valid parameters expected!!');
        return;
    }
    let lat1 = req.body.origin.Lat;
    let lat2 = req.body.origin.Lon;
    let k = req.body.targetAt;
    //preprocessing the array to get the distance from origin to foodtrucks.
    for(let i = 0; i < _jsonArrayObj.length; i++){
        _jsonArrayObj[i].distance = getDistance(lat1, lat2, _jsonArrayObj[i].Latitude, _jsonArrayObj[i].Longitude);
    }
   //quick sort the array.
    sort(_jsonArrayObj);
    //return the JSON result based on the records set number.
    res.send(_jsonArrayObj.slice(0, k)); 
    
});
//his routine calculates the distance between two points (given the latitude/longitude of those points).
function getDistance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

function sort(array){
    if(array == null || array.length < 2){
        return array;
    }
    sortHelper(array, 0, array.length -1);
    return array
}
function sortHelper(array, left, right){
    if(left >= right){
        return;
    }
    let pivot = getPivot(array, left, right);
    sortHelper(array,left, pivot -1);
    sortHelper(array, pivot +1, right);
}
function getPivot(array, left, right){
    let pivot = left + parseInt(Math.random() *(right - left + 1));
    swap(array, pivot, right);
    let start = left, end = right -1;
    while(start <= end){
        if(array[start].distance < array[right].distance){
            start++;
        }else if(array[end].distance >= array[right].distance){
            end--;
        }else{
            swap(array, start++, end--);
        }
    }
    swap(array, start, right);
    return start;
}
function swap(array, left, right){
    let tmp = array[left];
    array[left] = array[right];
    array[right] = tmp;
}


//start the server..
app.listen(3000, function() {
    console.log("Server is running at 3000 port!");
});