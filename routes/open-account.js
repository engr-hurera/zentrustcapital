const path = require('path');
const rootdir = require('../utils/pathutils');
const getOpenAccountPage = require(path.join(rootdir, 'controllers', 'open-account'));
const express = require('express');

const openAccountPageRouter = express.Router();
openAccountPageRouter.get('/open-account', getOpenAccountPage.openAccountPageController);

module.exports = openAccountPageRouter;