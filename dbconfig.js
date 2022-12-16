const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_STRING,
    process.env.DB_USERNAME,
    process.env.PASSWORD,
    {
        host: "localhost",
        dialect: "postgres",
    },
);

// initialize db connection
function init() {
    sequelize
        .sync()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch((error) => {
            console.error("Unable to connect to the database:", error);
        });
}

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

exports.connect = connect;
exports.init = init;
exports.sequelize = sequelize;

const {
    User,
    Product,
    OrderDetails,
    ProductCategory,
    ProductInventory,
    Merchant,
    Payment,
    OrderItem,
} = require("./models");

Merchant.hasMany(Product);
Product.belongsTo(Merchant, {
    foreignKey: {
        type: DataTypes.UUID,
    },
});

Product.belongsTo(ProductCategory, {
    foreignKey: {
        type: DataTypes.UUID,
    },
});

Product.belongsTo(ProductInventory, {
    foreignKey: {
        type: DataTypes.UUID,
    },
});

// OrderDetails table relations
Payment.hasOne(OrderDetails, {
    foreignKey: {
        type: DataTypes.UUID,
    },
});
OrderDetails.belongsTo(Payment, {
    foreignKey: {
        type: DataTypes.UUID,
    },
});

// Payment table detail relations
OrderDetails.hasMany(OrderItem, {
    foreignKey: {
        type: DataTypes.UUID,
    },
});
OrderItem.belongsTo(OrderDetails);

Product.hasMany(OrderItem, {
    foreignKey: {
        type: DataTypes.UUID,
    },
});
