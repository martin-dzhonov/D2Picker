module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        salt: {
          type: Sequelize.STRING,
          allowNull: false
        },
        hash: {
          type: Sequelize.STRING,
          allowNull: false
        },
        token: {
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
    queryInterface.dropTable('users');
  }
}
