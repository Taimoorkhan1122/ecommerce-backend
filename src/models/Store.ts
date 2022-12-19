import { DataTypes } from 'sequelize';
import { sequelize } from '../dbconfig.js';

const Store = sequelize.define('Store', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    storename: DataTypes.STRING,
    password: DataTypes.STRING,

}, {
    timestamps: true
})

export default Store;