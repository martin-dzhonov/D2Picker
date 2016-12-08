var Sequelize = require('sequelize');

module.exports = function(db) {
  var User = db.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    salt: {
      type: Sequelize.STRING
    },
    hash: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    }
  },{
    timestamps: false
  });

  return User;
}
