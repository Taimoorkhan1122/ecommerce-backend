import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { init } from "./dbconfig.js";
import { typeDefs, resolvers } from "./schema/index.js";

// initialize db connection
init();

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
