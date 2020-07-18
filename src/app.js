const express = require("express");
const ejs = require("ejs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("", function(req, res) {
  res.render("index", {title: "Home"});
});

app.get("/about", function(req, res) {
  res.render("about", {title: "About Me"});
});


app.get("/help", function(req, res) {
  res.render("help", {title: "Help Page"});
});

app.post("/weather", function(req, res) {
  if (!req.body.city) {
    res.send({ error: "You must provide an address"});
  } else {
    geocode(req.body.city, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        forecast(data.latitude, data.longitude, function(err, weatherData){

          if (err) {
            res.send(err);
          } else {
            res.send({
              address: req.body.city,
              location: data.location,
              forecast: weatherData
            });
          }
        });
      }
    });
  }
});



app.get("/weather", function(req, res) {
  res.render("weather", {title: "Weather Page"});

});

app.get("*", function(req, res) {
  res.send("404 Not Found");
});


app.listen(3000, function() {
  console.log("Listening on port 3000!");
});
