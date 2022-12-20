import Store from "./Store.js";
import Product from "./Product.js";
import ProductCategory from "./ProductCategory.js";
import ProductInventory from "./ProductInventory.js";
import Payment from "./Payment.js";
import OrderDetails from "./OrderDetail.js";
import OrderItem from "./OrderItem.js";
import User from "./User.js";

// // -- User associations --
// User.hasMany(Store, {
//     onDelete: 'RESTRICT'
// });
// Store.belongsTo(User);

// // -- Product associations --
// Store.hasMany(Product, {
//     onDelete: 'RESTRICT'
// });

// // Product.belongsTo(Store);

// Store.hasMany(ProductCategory, {
//     onDelete: 'RESTRICT'
// });
// ProductCategory.belongsTo(Store)

// -- User associations --
User.hasMany(Product, {
    onDelete: 'RESTRICT'
});
Product.belongsTo(User);

User.hasMany(ProductCategory, {
    onDelete: 'RESTRICT',
    foreignKey: {
        allowNull: false,
    }
});
ProductCategory.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    }
})


Product.belongsTo(ProductCategory);

Product.belongsTo(ProductInventory);

// Order Details associations
Payment.hasOne(OrderDetails);

OrderDetails.belongsTo(Payment);

// Payment table detail relations
OrderDetails.hasMany(OrderItem);
OrderItem.belongsTo(OrderDetails);

Product.hasMany(OrderItem);

export {
    User,
    Product,
    ProductInventory,
    ProductCategory,
    OrderDetails,
    OrderItem,
    Payment,
    Store,
};
