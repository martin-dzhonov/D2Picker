var express = require('express');
var config    = require('./libs/config.json');
var db = require('./libs/DBConnect.js');
var heroes = require('./libs/heroes.json');
var app = express();
var Hero = require("./models/HeroModel.js")(db);
var session = require('express-session');

var auth = function(req, res, next){ if (!req.isAuthenticated()) res.send(401); else next(); };

app.get('/', routes.index);
app.get('/users', auth, user.list);


app.get('/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });

app.post('/login', passport.authenticate('local'), function(req, res) { res.send(req.user); });

app.post('/logout', function(req, res){ req.logOut(); res.send(200); });
