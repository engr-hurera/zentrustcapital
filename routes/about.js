const path = require('path');
const rootdir = require('../utils/pathutils');
const getaboutPage = require(path.join(rootdir, 'controllers', 'about'));
const express = require('express');

const aboutPageRouter = express.Router();
aboutPageRouter.get('/about', getaboutPage.aboutPageController);

module.exports = aboutPageRouter;