import { DataTypes } from 'sequelize';
import { sequelize } from '../dbconfig.js';

const Product = sequelize.define('Product', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.DECIMAL(20, 3),
}, {
    timestamps: true
})

export default Product;