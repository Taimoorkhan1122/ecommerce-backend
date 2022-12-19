import { Context } from "./../../index";
import { GraphQLError } from "graphql";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connect } from "../../dbconfig.js";
import { User } from "../../models/index.js";

export const UserMutation = {
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
            return token;

        } catch (error) {
            console.log("error: ", error);
            return new GraphQLError("something went wrong!");
        }
    },

    deleteUser:async (parent, args, ctx: Context, info) => {
        try {
            await connect();
            const user = await User.findByPk(args.id);

            if (!user) return new GraphQLError("user not found!");
            await user.destroy()
            return ("user deleted successfully");
        }
        catch (error) {
            console.log("error", error);
            return new GraphQLError("something went wrong")
        }
    }
};
