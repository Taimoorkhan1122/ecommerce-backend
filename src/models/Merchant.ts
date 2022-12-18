import { DataTypes } from 'sequelize';
import { sequelize } from '../dbconfig.js';

const Merchant = sequelize.define('Merchant', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    shopname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,

}, {
    timestamps: true
})

export default Merchant;