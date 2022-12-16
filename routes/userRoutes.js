const express = require('express');

const { UserController } = require('../controllers');
const { userValidator } = require('../validators');

const app = express();
const router = express.Router();

router.get("/:id", userValidator,  UserController.getUser);
router.put("/:id", userValidator,  UserController.updateUser);
router.delete("/:id", userValidator,  UserController.deleteUser);

exports.userRoute = app.use('/user', router)
