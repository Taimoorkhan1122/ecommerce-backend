import { GraphQLError } from "graphql";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connect } from "../../dbconfig.js";
import { Store } from "../../models/index.js";
import { Context } from "../../index.js";

export const StoreMutation = {
    createStore: async (parent, args, ctx: Context, info) => {
        const { storename, password, admin } = args;
        try {
            await connect();

            let store: any = await Store.findOne({
                where: {
                    storename,
                },
            });

            // if user exist return response
            if (store) return new GraphQLError("store name already exist, choose a different name");

            // create new user
            store = await Store.create({
                storename,
                admin: ctx.id,
                UserId: ctx.id,
            });

            const token = jwt.sign(
                {
                    id: store?.id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "1d",
                    algorithm: "HS256",
                },
            );

            console.log(store);
            

            return {
                id: store.id,
                storename: store.storename,
                userId: store.UserID,
                admin: store.admin,
            };

        } catch (error) {
            console.log("error: ", error);
            return new GraphQLError(error);
        }
    },
};
