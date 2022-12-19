import { GraphQLError } from "graphql";
import { Op } from "sequelize";
import { connect } from "../../dbconfig.js";
import { Product, ProductCategory, ProductInventory, Store } from "../../models/index.js";
import { Context } from "../../index.js";

export const ProductreMutation = {
    createProduct: async (parent, args, ctx: Context, info) => {
        const { title, description, price, category, quantity } = args;
        const storeId = ctx.id;
        try {
            await connect();

            let product: any = await Product.findOne({
                where: {
                    [Op.and]: [{title}, {ProductCategoryId: category}]
                },
            });

            // if user exist return response
            if (product)
                return new GraphQLError("product already exist");
            // create new user
            
            console.log("...........", ctx.id);

            product = await Product.create(
                {
                    title,
                    description,
                    price,
                    ProductInventory: {
                        quantity,
                    },
                    StoreId: storeId,
                    ProductCategoryId: category,
                },
                {
                    include: [
                        {
                            model: Store,
                            where: {
                                id: storeId
                            }
                        },
                        {
                            model: ProductInventory,
                        },
                        {
                            model: ProductCategory,
                        },
                    ],
                },
            );

            console.log("Product ----> ", product);

            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category,
                quantity: product.quantity,
                storename: product.storename,
            };
        } catch (error) {
            console.log("error: ", error);
            return new GraphQLError(error);
        }
    },
};
