const path = require('path');
const rootdir = require('../utils/pathutils');
const getHomePage = require(path.join(rootdir, 'controllers', 'home'));
const express = require('express');

const homePageRouter = express.Router();
homePageRouter.get('/', getHomePage.homePageController);

module.exports = homePageRouter;