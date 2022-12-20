import { GraphQLError } from "graphql";
import { Op } from "sequelize";

import { connect } from "../../dbconfig.js";
import { Context } from "../../index.js";
import { Product, ProductCategory, ProductInventory, Store } from "../../models/index.js";

export const ProductQuery = {
    product: async (parent, args, ctx: Context, info) => {
        try {
            await connect();
            if (!ctx.id) return new GraphQLError("invalid User ID, must provid a valid token");
            const { pId } = args;

            const product: any = await Product.findOne({
                where: {
                    [Op.and]: [{ id: pId }, { UserId: ctx.id }],
                },
                include: [{ model: ProductInventory }, { model: ProductCategory }],
            });

            if (!product)
                return new GraphQLError("product not found", {
                    extensions: {
                        code: "QUERY_NOT_FOUND",
                    },
                });

            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.ProductCategory.title,
                quantity: product.ProductInventory.quantity,
            };
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },

    products: async (parent, args, ctx: Context, info) => {
        try {
            await connect();
            if (!ctx.id) return new GraphQLError("invalid User ID, must provid a valid token");

            const products: any[] = await Product.findAll({
                where: {
                    UserId: ctx.id,
                },
                include: [{ model: ProductInventory }, { model: ProductCategory }],
            });

            if (!products)
                return new GraphQLError("no products not found", {
                    extensions: {
                        code: "QUERY_NOT_FOUND",
                    },
                });

            return products.map((product) => ({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.ProductCategory.title,
                quantity: product.ProductInventory.quantity,
            }));
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },
};
