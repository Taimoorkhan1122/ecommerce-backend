import { GraphQLError } from 'graphql';

import { connect } from "../../dbconfig.js";
import { Context } from '../../index.js';
import { ProductCategory, Store } from "../../models/index.js";

export const CategoryQuery = {
    category: async (parent, args, ctx: Context, info) => {
        try {
            await connect();
            if(!ctx.id) return new GraphQLError("token not found, must provid a valid token")
            
            const cate: any = await ProductCategory.findOne({
                where: {
                    id: ctx.id,
                },
            });

            if (!cate)
                return new GraphQLError("category not found", {
                    extensions: {
                        code: "QUERY_NOT_FOUND",
                    },
                });

            return {
                id: cate?.id,
                title: cate?.title,
                description: cate?.description
            };
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },

    categories: async (parent, args, ctx: Context, info) => {
        try {
            await connect();
            if(!ctx.id) return new GraphQLError("store ID not found, must provid a valid store ID")
            
            const cats: any[] = await ProductCategory.findAll({
                where: {
                    UserId: ctx.id,
                },
            });
            

            if (!cats)
                return new GraphQLError("category not found", {
                    extensions: {
                        code: "QUERY_NOT_FOUND",
                    },
                });

            return cats.map(cate => ({
                id: cate?.id,
                title: cate?.title,
                description: cate?.description
            }));
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },
};
