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
        device_id: {
          type: Sequelize.STRING
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        phone: {
          type: Sequelize.STRING,
          unique: false
        },
        code: {
          type: Sequelize.TEXT
        },
        auth_key: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        avatar: {
          type: Sequelize.STRING
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
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
