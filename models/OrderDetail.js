const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const OrderDetails = sequelize.define('OrderDetails', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    total: DataTypes.DECIMAL(20,3),
}, {
    timestamps: true
})

exports.OrderDetails = OrderDetails;