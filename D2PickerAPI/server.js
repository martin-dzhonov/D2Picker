var express = require('express');
var config    = require('./libs/config.json');
var db = require('./libs/DBConnect.js');
var heroes = require('./libs/heroes.json');
var app = express();
var Hero = require("./models/HeroModel.js")(db);

Hero.create({ name: 'test'});
app.get('*', function(req, res) {
  // return 404
});

var environment = config.env;
var credentials = config[environment];
app.listen(credentials.port);

console.log("Running at Port " + credentials.port);
