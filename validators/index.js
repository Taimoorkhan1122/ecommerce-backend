const { loginValidators } = require("./loginValidator");
const { registerValidators } = require("./registerValidator");
const { userValidator } = require("./userValidator");

module.exports = {
    loginValidators,
    registerValidators,
    userValidator
}