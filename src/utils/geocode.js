const request = require("postman-request");

function geocode(address, callback) {
 const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaW5rZmxhaXIiLCJhIjoiY2tjZHI4M2FqMDE1dTJxbGZ1dXNjZGFxbiJ9.X4EdLqKUyrjjYOI7POdGgg";


 request(url, function(err, res, body) {


   if (err) {
     callback("Unable to connect to location service.", undefined);
   } else if (body.err) {
     callback("Unable to search. Try again", undefined);
   } else {
     const jsonObj = JSON.parse(body);
     data = {
       latitude: jsonObj.features[0].center[0],
       longitude: jsonObj.features[0].center[1],
       location:  jsonObj.features[0].place_name
     }
     callback(undefined, data);
   }
 });
}

module.exports = geocode;
