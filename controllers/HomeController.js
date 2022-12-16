const bcrypt = require("bcrypt");

const { connect } = require("../dbconfig");
const { User } = require("../models");

exports.HomeController = {
    async register(req, res) {
        await connect();

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
}