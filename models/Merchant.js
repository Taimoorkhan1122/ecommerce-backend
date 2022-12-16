const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Merchant = sequelize.define('Merchant', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    shopname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,

}, {
    timestamps: true
})

exports.Merchant = Merchant;