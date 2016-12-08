module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable(
      'categories',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        charset: 'utf8' // default: null
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('categories');
  }
}
