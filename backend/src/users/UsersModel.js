const { DataTypes } = require('sequelize');
const { connection } = require('../database/database');

const User = connection.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.sync({force: false});

module.exports = User;