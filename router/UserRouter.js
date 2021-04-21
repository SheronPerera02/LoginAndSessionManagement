const express = require('express');
const UserController = require('../controller/UserController');

const Router = express.Router();

Router.post('/signUp', UserController.SignUp);
Router.post('/signIn', UserController.SignIn);

module.exports = Router;
