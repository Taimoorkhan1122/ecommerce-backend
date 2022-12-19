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
                    [Op.and]: [{ title }, { ProductCategoryId: category }, { StoreId: storeId }],
                },
            });

            // if user exist return response
            if (product) return new GraphQLError("product already exist");
            // create new user

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
                            model: ProductInventory,
                        },
                    ],
                },
            );

            return product.id;
        } catch (error) {
            console.log("error: ", error);
            return new GraphQLError(error);
        }
    },

    updateProduct: async (parent, args, ctx: Context, info) => {
        const fields = Object.keys(args).filter((f) => f != "category");
        const storeId = ctx.id;
        try {
            await connect();

            let product: any = await Product.findOne({
                where: {
                    [Op.and]: [{ id: args.pId }, { StoreId: storeId }],
                },
            });

            // if user exist return response
            if (!product) return new GraphQLError("product does not exist");
            // create new user

            let inventory = [0];
            const updated = await Product.update(
                {
                    ...args,
                },
                {
                    where: {
                        id: args.pId,
                        StoreId: storeId,
                    },
                },
            );

            if (args.quantity) {
                inventory = await ProductInventory.update(
                    {
                        quantity: args.quantity,
                    },
                    {
                        where: {
                            id: product.ProductInventoryId,
                        },
                    },
                );
            }

            return updated[0] || inventory[0];
        } catch (error) {
            console.log("error: ", error);
            return new GraphQLError(error);
        }
    },
};
