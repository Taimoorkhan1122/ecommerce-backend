import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import * as bcrypt from "bcrypt";

import { connect, init } from ".././dbconfig.js";
import { Merchant } from ".././models/index.js";
import { userResponseParser } from ".././parser/userResponseParser.js";

init();
const typeDefs = `#graphql
    type User {
        id: String!
        username: String!
        email: String!
        firstname: String!
        lastname: String!
    }

    type Merchant {
        id: String!
        shopname: String!,
        username: String!,
        email: String!
    }

    type Query {
        merchant(email: String): Merchant
    }

    type Mutation {
        addMerchant(
            shopname:String!,
            username:String!, 
            email: String!, 
            password: String!
            ): Merchant
    }
`;

const resolvers = {
    Query: {
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
    },
    Mutation: {
        addMerchant: async (parent, args, contextValue, info) => {
            console.log("...............", args);
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
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log("🚀 server up at :" + url);

const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];

// app.get("/user/:id", async (req, res) => {
//     const payment = await Payment.create({
//         amount: 0,
//         provider: "mastercard",
//         status: "PENDING",
//     })

//     const orderDetails = await OrderDetails.create({
//         total: 0.00,
//         paymentId: payment.id

//     });

//     const orderItem = await OrderItem.create({
//         quantity: 2,
//         OrderDetailId: orderDetails.id,
//         ProductId: "d0ee4689-4470-4049-bde2-ed53b1215eb0"
//     },  {
//         include: {
//             model: OrderDetails,
//             // where:{
//             //     id: orderDetails.id
//             // }
//         }
//     })

//     if (!orderItem) return res.send({ msg: "no user exist", payment, orderDetails, orderItem })
//     return res.send({orderItem, orderDetails, payment})
// });
