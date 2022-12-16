const { HomeController } = require('../controllers');
const { registerValidators, loginValidators } = require('../validators');
const express = require('express');

const app = express();
const router = express.Router();


router.post("/register", registerValidators, HomeController.register);
router.post("/login", loginValidators, HomeController.login);

exports.homeRoute = app.use('/', router)
