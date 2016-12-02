var Sequelize = require('sequelize');

module.exports = function(db) {
  var Hero = db.define('heroes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    }
  },{
    timestamps: false
  });

  return Hero;
}
