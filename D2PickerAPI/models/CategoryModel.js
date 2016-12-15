var Sequelize = require('sequelize');

module.exports = function(db) {
  var Attribute = require("./AttributeModel")(db);

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

  Category.hasMany(Attribute, {foreignKey: 'category_id'});

  return Category;
}
