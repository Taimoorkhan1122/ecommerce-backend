import { GraphQLError } from 'graphql';
import * as bcrypt from "bcrypt";

import { connect } from "../../dbconfig.js";
import { Merchant } from "../../models/index.js";

export const MerchantMutation = {
    addMerchant: async (parent, args, contextValue, info) => {
        const { shopname, email, firstname, lastname, username, password } = args;
        try {
            await connect();

            let merch: any = await Merchant.findOne({
                where: {
                    email,
                },
            });

            // if user exist return response
            if (merch) throw new GraphQLError("user account already exist");
            // create new user

            const hashedPass = bcrypt.hashSync(password, 10);

            merch = await Merchant.create({
                shopname,
                username,
                email,
                firstname,
                lastname,
                password: hashedPass,
            });

            return {
                id: merch?.id,
                shopname: merch?.shopname,
                username: merch.username,
                email: merch.email,
            };
        } catch (error) {
            console.log("error: ", error);
            throw new GraphQLError(error);
        }
    },
};
