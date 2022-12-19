import { GraphQLError } from 'graphql';

import { connect } from "../../dbconfig.js";
import { Context } from '../../index.js';
import { Merchant } from "../../models/index.js";

export const MerchantQuery = {
    login: async (parent, args, ctx: Context, info) => {
        try {
            await connect();
            if(!ctx.id) return new GraphQLError("user id not found, must provid a valid token")
            const merch: any = await Merchant.findOne({
                where: {
                    id: ctx.id,
                },
            });

            if (!merch)
                return new GraphQLError("merchant not found", {
                    extensions: {
                        code: "QUERY_NOT_FOUND",
                    },
                });

            return {
                id: merch?.id,
                shopname: merch?.shopname,
                username: merch.username,
                email: merch.email,
            };
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },
};
