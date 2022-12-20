import { Context } from "./../../index";
import { GraphQLError } from "graphql";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connect } from "../../dbconfig.js";
import { User } from "../../models/index.js";

export const UserMutation = {
    login: async (parent, args, ctx: Context, info) => {
        const { email, password } = args;
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

            const token = jwt.sign(
                {
                    id: user?.id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "1d",
                    algorithm: "HS256",
                },
            );

            return {
                id: user?.id,
                firstname: user?.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                isMerchant: user.isMerchant,
                token: token,
            };

        } catch (error) {
            console.log("error", error);
            throw new Error(error);
        }
    },
    register: async (parent, args, ctx: Context, info) => {
        try {
            const { username, firstname, lastname, email, password } = args;
            await connect();

            let user: any = await User.findOne({
                where: {
                    email,
                },
            });

            // if user exist return response
            if (user) return new GraphQLError("user already exist");
            // create new user

            const hashedPass = bcrypt.hashSync(password, 10);

            user = await User.create({
                username,
                firstname,
                lastname,
                email,
                password: hashedPass,
            });

            // const token = jwt.sign(
            //     {
            //         id: user?.id,
            //     },
            //     process.env.ACCESS_TOKEN_SECRET,
            //     {
            //         expiresIn: "1d",
            //         algorithm: "HS256",
            //     },
            // );
            return "regesteration successful";
        } catch (error) {
            console.log("error: ", error);
            return new GraphQLError("something went wrong!");
        }
    },

    deleteUser: async (parent, args, ctx: Context, info) => {
        try {
            await connect();
            const user = await User.findByPk(args.id);

            if (!user) return new GraphQLError("user not found!");
            await user.destroy();
            return "user deleted successfully";
        } catch (error) {
            console.log("error", error);
            return new GraphQLError("something went wrong");
        }
    },
};
