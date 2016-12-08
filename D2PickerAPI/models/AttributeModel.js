var Sequelize = require('sequelize');

module.exports = function(db) {
  var User = require("./UserModel")(db);
  var Hero = require("./HeroModel")(db);
  var Category = require("./CategoryModel")(db);

  var Attribute = db.define('attributes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    hero_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },{
    timestamps: false
  });

  Attribute.hasOne(User, { foreignKey: 'id', targetKey: 'user_id'});
  Attribute.hasOne(Hero, { foreignKey: 'id', targetKey: 'hero_id'});
  Attribute.hasOne(Category, { foreignKey: 'id', targetKey: 'category_id'});

  return Attribute;
}
