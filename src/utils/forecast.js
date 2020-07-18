const request = require("postman-request");




function forecast(longitude, latitude, callback) {
  const urlWeather = "http://api.weatherstack.com/current?access_key=08f2a50674d8e0ab87872d07114e79fc&query=" + latitude + "," + longitude
  + "&units=f";


  request(urlWeather, function(err, res, body) {

  if (err) {
    callback("Unable to connect to location service.", undefined);
  } else if (body.err) {
    callback("Unable to search. Try again", undefined);
  } else {
    const jsonObj = JSON.parse(body);
    const data = "It is currently " + jsonObj.current.temperature + " degrees. It feels like " + jsonObj.current.feelslike +
     " degrees outside. It is " + jsonObj.current.weather_descriptions[0].toLowerCase();

    callback(undefined, data);
  }
});
};


module.exports = forecast;
