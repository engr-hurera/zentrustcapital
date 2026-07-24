const path = require('path');
const rootdir = require('../utils/pathutils');
const getloginPage = require(path.join(rootdir, 'controllers', 'login'));
const express = require('express');

const loginPageRouter = express.Router();
loginPageRouter.get('/login', getloginPage.loginPageController);

module.exports = loginPageRouter;