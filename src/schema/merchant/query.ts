import { GraphQLError } from 'graphql';

import { connect } from "../../dbconfig.js";
import { Merchant } from "../../models/index.js";

export const MerchantQuery = {
    merchant: async (parent, args, contextValue, info) => {
        try {
            await connect();

            const merch: any = await Merchant.findOne({
                where: {
                    email: args.email,
                },
            });

            if (!merch)
                throw new GraphQLError("merchant not found", {
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
