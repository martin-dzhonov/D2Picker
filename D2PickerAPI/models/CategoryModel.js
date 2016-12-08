var Sequelize = require('sequelize');

module.exports = function(db) {
  var User = require("./UserModel")(db);
  var Hero = require("./HeroModel")(db);
  var Attribute = require("./AttributeModel.js")(db);

  var Category = db.define('categories', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },{
    timestamps: false
  });

  Attribute.belongsTo(Category)
Category.hasMany(Attribute);

  return Category;
}
