const path = require('path');
const rootdir = require('../utils/pathutils');
const getPrivacyPage = require(path.join(rootdir, 'controllers', 'privacy'));
const express = require('express');

const privacyPageRouter = express.Router();
privacyPageRouter.get('/privacy', getPrivacyPage.privacyPageController);

module.exports = privacyPageRouter;