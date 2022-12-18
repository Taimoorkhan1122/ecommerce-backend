import { body, validationResult } from "express-validator";

export const registerValidators = [
    body("username").isString().isLength({ min: 3 }).notEmpty(),
    body("firstname").isString().isLength({ min: 3 }).notEmpty(),
    body("lastname").isString().isLength({ min: 3 }).notEmpty(),
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
