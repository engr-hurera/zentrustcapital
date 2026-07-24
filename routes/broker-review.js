const path = require('path');
const rootdir = require('../utils/pathutils');
const getbrokerReviewPage = require(path.join(rootdir, 'controllers', 'broker-review'));
const express = require('express');

const brokerReviewPageRouter = express.Router();
brokerReviewPageRouter.get('/broker-review:j', getbrokerReviewPage.brokerReviewPageController);
brokerReviewPageRouter.get('/broker-review/:j', getbrokerReviewPage.readMoreBrokerReviewPageController);

module.exports = brokerReviewPageRouter;