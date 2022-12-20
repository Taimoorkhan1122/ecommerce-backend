import jwt from "jsonwebtoken";
import { Context } from "./../index";
import { rule, inputRule } from "graphql-shield";

export const isAuthenticated = rule('authentication')(async (parent, args, ctx: Context, info) => {
    const token = ctx.token["authorization"].replace("Bearer ", "");
    const user: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("auth uer id........", {token, user});
    
    
    if(user !== null){
        (ctx.id = user?.id)
        return true
    }

    return  new Error("invalid access token")
});

export const createStoreRule = inputRule()((yup) =>
    yup.object().shape({
        storename: yup.string().required(),
    }),
);

export const registerRule = inputRule()((yup) =>
    yup.object().shape({
        username: yup.string(),
        password: yup.string().required().min(8),
        email: yup.string().email().required(),
    }),
);
