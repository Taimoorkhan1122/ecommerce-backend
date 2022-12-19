import { GraphQLError } from "graphql";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connect } from "../../dbconfig.js";
import { Merchant } from "../../models/index.js";

export const MerchantMutation = {
    register: async (parent, args, contextValue, info) => {
        const { shopname, email, firstname, lastname, username, password } = args;
        try {
            await connect();

            let merch: any = await Merchant.findOne({
                where: {
                    email,
                },
            });

            // if user exist return response
            if (merch) return new GraphQLError("user account already exist");
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

            const token = jwt.sign({
                id: merch?.id,
            },process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d',
                algorithm: 'HS256'
            });

            return token;
        } catch (error) {
            console.log("error: ", error);
            return new GraphQLError(error);
        }
    },
};
