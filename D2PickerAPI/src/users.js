module.exports = function(app){

  var userService = require("../services/UserService")();

  app.get("/getUser", userService.getUser);
  app.post("/register", userService.create);
  app.post("/login", userService.login);

}
