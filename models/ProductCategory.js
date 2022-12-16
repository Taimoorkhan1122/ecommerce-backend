const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const ProductCategory = sequelize.define('ProductCategory', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
}, {
    timestamps: true,
})

exports.ProductCategory = ProductCategory;