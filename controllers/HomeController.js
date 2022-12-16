const bcrypt = require("bcrypt");
const { reset } = require("nodemon");

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

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedPass,
        });

        res.send({
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
        });
    },

    async login(req, res) {
        await connect();

        let user = await User.findOne({
            where: {
                email: req.body.email,
            },
            attributes: ["email", "password", "id", "firstname", "lastname"],
        });
        console.log(req.body.password, user);

        // if user exist return response
        if (!user) return res.status(404).json({ errors: { message: "Please register" } });

        // Login user
        const isPassCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (isPassCorrect) {
            return res.send({
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
            });
        } else {
            return res.status(400).json({ errors: { message: "incorrect password" } });
        }
    },
};
