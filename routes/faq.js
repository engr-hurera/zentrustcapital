const path = require('path');
const rootdir = require('../utils/pathutils');
const getFaqPage = require(path.join(rootdir, 'controllers', 'faq'));
const express = require('express');

const faqPageRouter = express.Router();
faqPageRouter.get('/faq', getFaqPage.faqPageController);

module.exports = faqPageRouter;