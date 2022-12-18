import { DataTypes } from 'sequelize';
import { sequelize } from '../dbconfig.js';

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

export default Payment;