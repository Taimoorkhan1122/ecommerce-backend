import { Op } from "sequelize";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";

import { connect } from "../../dbconfig.js";
import { Context } from "../../index.js";
import { Store, User } from "../../models/index.js";

export const UserQuery = {
    userStore: async (parent, args, ctx: Context, info) => {
        try {
            await connect();

            const store: any = await Store.findOne({
                where: {
                    [Op.and]: [{ id: args.sId }, { UserId: ctx.id }],
                },
            });

            if (!store)
                return new GraphQLError("no store found for the user", {
                    extensions: {
                        code: "NOT_FOUND",
                    },
                });

            return {
                id: store.id,
                storename: store.storename,
                userId: store.UserID,
                admin: store.admin,
            };
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },

    userStores: async (parent, args, ctx: Context, info) => {
        try {
            await connect();

            const stores: any[] = await Store.findAll({
                where: {
                    UserId: ctx.id,
                },
            });

            if (!stores)
                return new GraphQLError("no stores found for the user", {
                    extensions: {
                        code: "NOT_FOUND",
                    },
                });
                
                    console.log(stores);
                    
            return stores.map(store => ({
                id: store.id,
                storename: store.storename,
                userId: store.UserId,
                admin: store.admin,
            }));
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },
};
