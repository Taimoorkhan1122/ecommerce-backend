import { GraphQLError } from 'graphql';

import { connect } from "../../dbconfig.js";
import { Context } from '../../index.js';
import { Store } from "../../models/index.js";

export const StoreQuery = {
    loginStore: async (parent, args, ctx: Context, info) => {
        try {
            await connect();
            if(!ctx.id) return new GraphQLError("store id not found, must provid a valid token")
            const store: any = await Store.findOne({
                where: {
                    id: ctx.id,
                },
            });

            if (!store)
                return new GraphQLError("Store not found", {
                    extensions: {
                        code: "QUERY_NOT_FOUND",
                    },
                });

            return {
                id: store?.id,
                shopname: store?.shopname
            };
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },
};
