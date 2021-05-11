var express = require('express');
var router = express.Router();
var axios = require('axios');

var { WEATHER_KEY } = require('../key');

/* GET  */
router.get('/', function(req, res, next) {
  let lat = 'lat=' + '44.97';
  let lon = '&lon=' + '-93.26';
  axios.get('http://api.openweathermap.org/data/2.5/onecall?' + lat + lon + '&appid=' + WEATHER_KEY)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send(error);
    });
});

module.exports = router;