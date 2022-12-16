const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const User = sequelize.define('User', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,

}, {
    timestamps: true
})

exports.User = User;