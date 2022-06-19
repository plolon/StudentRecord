const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const GradeSubject = sequelize.define('grade_subject', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = GradeSubject;