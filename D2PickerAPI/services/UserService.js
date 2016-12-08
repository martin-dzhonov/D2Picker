module.exports = function () {
  var db = require('../libs/DBConnect.js');
  var fs = require("fs");
  var http = require("http")
  var User = require("../models/UserModel")(db);
  var crypto = require('crypto');


  function generateToken() {
    var token = crypto.randomBytes(64).toString('hex');
    return token;
  }

  return {
    create: function(req, res) {
      var email = req.body.email;
      var password = req.body.password;
      var salt = crypto.randomBytes(16).toString('hex');
      var hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
      var token = generateToken();
        User.create({
          email: email,
          salt: salt,
          hash: hash,
          token: token
        }).then(function(user){
          return res.status(200).json({token: token });
        })
    },

    login: function(req, res) {
      var email = req.body.email;
      var password = req.body.password;
      User.findOne({
        where: {
          email: email
        }
      }).then(function(user){
        var salt = user.salt;
        var userHash = user.hash;
        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
        var token = generateToken();
        if (userHash == hash) {
        User.update({
          token: token
        },
        {
          where: {
            email: email
          }
        })
          return res.status(200).json({token: token});
        }
        else{
            return res.status(401).json({message: 'wrong credentials'});
        }
      });
    },

    getUser: function(req, res) {
      var token = req.get('Authentication-Token');
      var email = req.body.email;
      var password = req.body.password;
      
      User.findOne({
        where: {
          token: token
        }
      }).then(function(user){
        return res.status(200).json({user: user});
      });
    }
  };
};
