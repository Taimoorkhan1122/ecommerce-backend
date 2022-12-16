const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Payment = sequelize.define('Payment', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    amount: DataTypes.INTEGER,
    provider: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM,
        values: ["PENDING", "CONFIRMED", "CANCELLED"]
    }
}, {
    timestamps: true
})

exports.Payment = Payment;