const path = require('path');
const rootdir = require('../utils/pathutils');
const getContactPage = require(path.join(rootdir, 'controllers', 'contact'));
const express = require('express');

const contactPageRouter = express.Router();
contactPageRouter.get('/contact', getContactPage.contactPageController);

module.exports = contactPageRouter;