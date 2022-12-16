const express = require("express");

const { registerValidators, loginValidators } = require("./validators");
const { HomeController } = require("./controllers/HomeController");
const { init } = require("./dbconfig");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;
// init();


app.post("/register", registerValidators, HomeController.register);
app.post("/login", loginValidators, HomeController.login);

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
