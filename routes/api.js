var express = require('express');
var router = express.Router();
var axios = require('axios');

var { WEATHER_KEY } = require('../key');

/* GET  */
router.get('/', [

  (req, res, next) => {
    //if the query has lat and lon, skip ahead to the weather query
    //all otherwise we need to call the geocode API to find the location's lat and lon

    let geoQuery;

    if (req.query.lat && req.query.lon) {
      req.lat = req.query.lat;
      req.lon = req.query.lon;
      return next();
    }
    else if (req.query.city) geoQuery = 'direct?q=' + req.query.city;
    else if (req.query.zip) geoQuery = 'zip?zip=' + req.query.zip;
    else return res.status(400).send({cod: 400, message: 'No location provided'});

    let url = `http://api.openweathermap.org/geo/1.0/${geoQuery}&appid=${WEATHER_KEY}`;
    axios.get(url)
    .then(function (response){

      //OpenWeather might send a 200 status with empty response
      //usually if the state code but not country code are included
      if (response.data.length === 0) throw new Error('No weather data sent');
      
      if (req.query.city) {
        req.lat = response.data[0].lat;
        req.lon = response.data[0].lon;
      }
      else {
        req.lat = response.data.lat;
        req.lon = response.data.lon;
      }
      next();
    })
    .catch(function (err) {
      if (!err.response) return res.status(404).send({cod: '404', message: 'No weather data available. If using state codes when querying by city name, be sure to also use country codes as well'});
      if (err.response.status === 404) return res.status(404).send({cod: '404', message: 'City/Zip code not found'});

      res.status(err.response.status).send(err.response.data);
    })
  },

  (req, res, next) => {

    //default queries (because who wants temp in kelvin?)
    let units = req.query.units ? req.query.units : 'metric';
    let lang = req.query.lang ? '&lang=' + req.query.lang : ''; //we'll just omit entirely if nothing specified
    let exclude;
    if (req.query.q === 'hourly') exclude = 'minutely,current,daily';
    else if (req.query.q === 'daily') exclude = 'minutely,current,hourly';
    else if (req.query.q === 'current') exclude = 'minutely,hourly,daily';

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.lat}&lon=${req.lon}&units=${units}&exclude=${exclude}${lang}&appid=${WEATHER_KEY}`;
    axios.get(url)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (err) {
      res.status(err.response.status).send(err.response.data);
    });
  }

]);

module.exports = router;