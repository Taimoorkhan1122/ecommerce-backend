import { body, validationResult, param } from "express-validator";

export const userValidator = [
    param('id').notEmpty().isUUID("4").withMessage("id is not valid"),
    body("username").isString().isLength({ min: 3 }).optional(),
    body("firstname").isString().isLength({ min: 3 }).optional(),
    body("lastname").isString().isLength({ min: 3 }).optional(),
    body("email").isEmail().optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }
        next();
    },
];
