started thinking to use a little nodejs & expressjs framework project to provide a node restful server to 
serve the data.
I coded this /foodTrucks api to support offline data processing. Also thougnt about to support online streaming dynamic processing.
therefore I implemented a PriorityQueue.
since I don't know the web API from the https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/, I didn't proceed with the dynamic method.

the method I used here is a post restful api foodTrucks:
app.post('/foodTrucks', function(req, res) {
   //code implemention.   
});

this API would accept a post data as E.g.
{
	"origin": {
		"Lat": 37.7749,
		"Lon" : -122.431297
	},
	"targetAt": 5 // the number of record need to be returned to client.	
}

To test the code I have run the server on my localHost:3000 as (http://localhost:3000/foodTrucks)

since it's processing offline data I have stored the csv file locally, and use csvtojson conver it into a JSON array in the memory.
Sort(quck sort algorithm) the array based on the calculation of distances for each records. 
return the top k closest food truck records back to client.

Autor: Binze Zhao
Date: 06/03/2020

