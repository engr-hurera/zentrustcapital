const path = require('path');
const rootdir = require('../utils/pathutils');
const getSignalsPage = require(path.join(rootdir, 'controllers', 'signals'));
const express = require('express');

const signalsPageRouter = express.Router();
signalsPageRouter.get('/signals', getSignalsPage.signalsPageController);

module.exports = signalsPageRouter;