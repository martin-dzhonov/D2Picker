var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({

},
  function(username, password, done) {
          // Fake user definition, just a sample.
      var user = {name: 'test', password: 'test2'};
      return done(null, user);
      // Here you can put your async authentication method from db
      // if(user.name === username && user.password === password) {
      //   return done(null, user);
      // }
      // else {
      //   return done(null, false,{});
      // }
  }
));
