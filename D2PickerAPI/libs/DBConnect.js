var Sequelize = require('sequelize');
var config    = require('./config.json');

// initialize database connection
var environment = config.env;
var credentials = config[environment];

var db = new Sequelize(
	credentials.database,
	credentials.username,
	credentials.password,
	{
		timezone: credentials.timezone,
		pool: { min: 1, max: 10, idle: 10000 }
	}
);

 module.exports = db;
