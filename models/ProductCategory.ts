import { DataTypes } from 'sequelize';
import { sequelize } from '.././dbconfig.js';

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
export default ProductCategory;