const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const OrderItem = sequelize.define('OrderItem', {
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

exports.OrderItem = OrderItem;