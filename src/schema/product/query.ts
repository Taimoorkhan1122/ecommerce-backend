import { GraphQLError } from 'graphql';
import { Op } from 'sequelize';

import { connect } from "../../dbconfig.js";
import { Context } from '../../index.js';
import { Product, ProductCategory, ProductInventory, Store } from "../../models/index.js";

export const ProductQuery = {
    product: async (parent, args, ctx: Context, info) => {
        try {
            await connect();
            if(!ctx.id) return new GraphQLError("invalid store ID, must provid a valid token")
            const {pId} = args 

            const store: any = await Store.findOne({
                where: {
                    id: ctx.id
                }
            })

            if(!store) return new GraphQLError("invalid store ID!")
            
            const product: any = await Product.findOne({
                where: {
                    [Op.and] : [{id: pId}, {StoreId: ctx.id}]

                },
                include: [
                    {model: Store},
                    {model: ProductInventory},
                    {model: ProductCategory}
                ]
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
                storename: product.Store.storename
            };
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },
};
