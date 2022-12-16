const { User } = require('./User')
const { Product } = require('./Product')
const { ProductInventory } = require('./ProductInventory')
const { ProductCategory } = require('./ProductCategory')
const { OrderDetails } = require('./OrderDetail')
const { OrderItem } = require('./OrderItem')
const { Payment } = require('./Payment')
const { Merchant } = require('./Merchant')

module.exports = {
    User,
    Product,
    ProductInventory,
    ProductCategory,
    OrderDetails,
    OrderItem,
    Payment,
    Merchant
}
