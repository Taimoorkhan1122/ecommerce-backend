import { DataTypes } from 'sequelize';
import { sequelize } from '.././dbconfig.js';

const User = sequelize.define('User', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,

}, {
    timestamps: true
})

export default User;