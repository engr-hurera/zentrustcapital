const path = require('path');
const rootdir = require('../utils/pathutils');
const authController = require(path.join(rootdir, 'controllers', 'authController'));
const express = require('express');

const authRouter = express.Router();
authRouter.get('/login', authController.getLogInPageController);
authRouter.get('/sign-up', authController.getSignUpPageController);
authRouter.post('/login', authController.postLogInPageController);
authRouter.post('/sign-up', authController.postSignUpPageController);
authRouter.post('/logout', authController.postLogOutPageController);
module.exports = authRouter;