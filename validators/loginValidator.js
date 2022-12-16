const { body, validationResult } = require("express-validator");

exports.loginValidators = [
    body("email").isEmail().notEmpty(),
    body("password").isString().isLength({ min: 8 }).notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }
        next();
    },
];