const express = require("express");

const { init } = require("./dbconfig");
const router = require("./routes");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;
// init();

app.use("/", router);

app.listen(port, () => {
    console.log("🚀 server up on port " + port);
});





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
