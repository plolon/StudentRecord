const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Permission = sequelize.define('permission', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


module.exports = Permission;