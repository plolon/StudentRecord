const Sequelize = require('sequelize');
const sequelize = new Sequelize('dzienniczek', 'postgres', 'admin', {
  dialect: 'postgres',
  host: 'localhost'
});

module.exports = sequelize;