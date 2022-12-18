import { DataTypes } from 'sequelize';
import { sequelize } from '.././dbconfig.js';

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

export default OrderItem;