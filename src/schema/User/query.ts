import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt'

import { connect } from "../../dbconfig.js";
import { Context } from '../../index.js';
import { User } from "../../models/index.js";

export const UserQuery = {
    login: async (parent, args, ctx: Context, info) => {
        const {email, password} = args
        try {
            await connect();
            
            const user: any = await User.findOne({
                where: {
                    email,
                },
            });

            
            if (!user || !bcrypt.compareSync(password, user.password))
                return new GraphQLError("invalid email or password", {
                    extensions: {
                        code: "INVALID_CREDS",
                    },
                });

            return {
                id: user?.id,
                firstname: user?.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                isMerchant: user.isMerchant
            };
        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },
};
