const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const ProductInventory = sequelize.define('ProductInventory', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    quantity: DataTypes.INTEGER,
}, {
    timestamps: true
})

exports.ProductInventory = ProductInventory;