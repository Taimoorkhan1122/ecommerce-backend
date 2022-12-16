const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Product = sequelize.define('Product', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(20, 3),
}, {
    timestamps: true
})

exports.Product = Product;