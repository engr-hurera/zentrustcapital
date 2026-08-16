const path = require('path');
const rootdir = require('../utils/pathutils');
const getMarketsPage = require(path.join(rootdir, 'controllers', 'markets'));
const express = require('express');

const marketsPageRouter = express.Router();
marketsPageRouter.get('/markets', getMarketsPage.marketsPageController);

module.exports = marketsPageRouter;