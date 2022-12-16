const express = require("express");
const { init, sequelize, connect } = require("./dbconfig");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { User, Product, Merchant, OrderItem, OrderDetails, Payment } = require("./models");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;
// init();

app.post(
    "/register",
    body("username").isString().isLength({ min: 3 }).notEmpty(),
    body("firstname").isString().isLength({ min: 3 }).notEmpty(),
    body("lastname").isString().isLength({ min: 3 }).notEmpty(),
    body("email").isEmail().notEmpty(),
    body("password").isString().isLength({ min: 8 }).notEmpty(),
    async (req, res) => {
        await connect();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }

        let user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        // if user exist return response
        if (user)
            return res.status(400).json({ errors: { message: "user account already exist" } });
        // create new user
        const hashedPass = bcrypt.hashSync(req.body.password, 10);

        user = await User.create(
            {
                username: req.body.username,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: hashedPass,
            },
            {
                fields: ["username", "email", "firstname", "lastname"],
            },
        );

        // const product = await Merchant.create({
        //     shopname: "All in One",
        //     username: "taimoorkhan",
        //     email: "merchant@gmail.com",
        //     firstname: "taimoor",
        //     lastname: "khan",
        //     password: hashedPass,
        // })

        res.send(user);
    },
);



app.listen(port, () => {
    console.log("🚀 server up on port " + port);
});
