import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { applyMiddleware } from "graphql-middleware";  
import { makeExecutableSchema } from "@graphql-tools/schema";
import { config } from "dotenv";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

import { init } from "./dbconfig.js";
import { typeDefs, resolvers } from "./schema/index.js";
import { permissions } from "./permissions/index.js";

config();

// initialize db connection
init();

export interface Context {
    token?: String;
    id?: String;
}

const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({typeDefs, resolvers})
const schemaWithPermissions = applyMiddleware(schema, permissions)

// graphql server
const server = new ApolloServer<Context>({
    schema: schemaWithPermissions,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

app.use((req, res, next) => {
    console.log(req.path);
    next();
})
app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: "50mb" }),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers }),
    }),
);

console.log("🚀 server up at : " + port);

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
