const { connect } = require("../dbconfig");
const { User } = require("../models");
const {userResponseParser} = require('../parser/userResponseParser')

exports.UserController = {
    async updateUser(req, res) {
        try {
            await connect();

            let body = req.body;
            // parsing unnecessary data and password
            for (let k in body) {
                if (k == "password") delete body[k];
                else if (body[k] === null || body[k] === undefined) delete body[k];
            }

            const user = await User.update(body, { where: { id: req.params.id } });

            if (!user) return res.status(404).send({ messaeg: "user not found" });

            return res.send({ message: "user updated successfully" });
        }
        catch (error) {
            console.log("error", error);
            return res.status(500).send({ message: "something went wrong!" });
        }
    },
    async getUser(req, res) {
        try {
            await connect();

            const user = await User.findByPk(req.params.id);

            if (!user) return res.status(404).send({ messaeg: "user not found" });

            return res.send(userResponseParser(user));
        }
        catch (error) {
            console.log("error", error);
            return res.status(500).send({ message: "something went wrong!" });
        }
    },
    async deleteUser(req, res) {
        try {
            await connect();

            const user = await User.findByPk(req.params.id);

            if (!user) return res.status(404).send({ messaeg: "user not found" });
            await user.destroy()
            return res.send({messaeg: "user deleted successfully"});
        }
        catch (error) {
            console.log("error", error);
            return res.status(500).send({ message: "something went wrong!" });
        }
    },
};
