module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable(
      'attributes',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
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
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        charset: 'utf8' // default: null
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('attributes');
  }
}
