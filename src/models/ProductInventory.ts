import { DataTypes } from 'sequelize';
import { sequelize } from '../dbconfig.js';

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

export default ProductInventory;