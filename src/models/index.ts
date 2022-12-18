import Merchant from "./Merchant.js";
import Product from "./Product.js";
import ProductCategory from "./ProductCategory.js";
import ProductInventory from "./ProductInventory.js";
import Payment from "./Payment.js";
import OrderDetails from "./OrderDetail.js";
import OrderItem from "./OrderItem.js";

Merchant.hasMany(Product);
Product.belongsTo(Merchant, {
    foreignKey: {
        name: "id",
    },
});

Product.belongsTo(ProductCategory, {
    foreignKey: {
        name: "id",
    },
});

Product.belongsTo(ProductInventory, {
    foreignKey: {
        name: "id",
    },
});

// OrderDetails table relations
Payment.hasOne(OrderDetails, {
    foreignKey: {
        name: "id",
    },
});
OrderDetails.belongsTo(Payment, {
    foreignKey: {
        name: "id",
    },
});

// Payment table detail relations
OrderDetails.hasMany(OrderItem, {
    foreignKey: {
        name: "id",
    },
});
OrderItem.belongsTo(OrderDetails);

Product.hasMany(OrderItem, {
    foreignKey: {
        name: "id",
    },
});


export {
    Product,
    ProductInventory,
    ProductCategory,
    OrderDetails,
    OrderItem,
    Payment,
    Merchant
}
