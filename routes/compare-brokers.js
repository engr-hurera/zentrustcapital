const path = require('path');
const rootdir = require('../utils/pathutils');
const getcompareBrokersPage = require(path.join(rootdir, 'controllers', 'compare-brokers'));
const express = require('express');

const compareBrokersPageRouter = express.Router();
compareBrokersPageRouter.get('/compare-brokers', getcompareBrokersPage.compareBrokersPageController);
compareBrokersPageRouter.get('/compare-brokers/data-tags/:h', getcompareBrokersPage.dataTagsCompareBrokersPageController);
compareBrokersPageRouter.get('/compare-brokers/max-leverage/:a', getcompareBrokersPage.leverageCompareBrokersPageController);
compareBrokersPageRouter.get('/compare-brokers/min-deposit/:a', getcompareBrokersPage.depositCompareBrokersPageController);

module.exports = compareBrokersPageRouter;