const path = require('path');
const rootdir = require('../utils/pathutils');
const getTermsPage = require(path.join(rootdir, 'controllers', 'terms'));
const express = require('express');

const termsPageRouter = express.Router();
termsPageRouter.get('/terms', getTermsPage.termsPageController);

module.exports = termsPageRouter;