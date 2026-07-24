const path = require('path');
const rootdir = require('../utils/pathutils');
const getCookiesPage = require(path.join(rootdir, 'controllers', 'cookies'));
const express = require('express');

const cookiesPageRouter = express.Router();
cookiesPageRouter.get('/cookies', getCookiesPage.cookiesPageController);

module.exports = cookiesPageRouter;