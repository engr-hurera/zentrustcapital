const path = require('path');
const rootdir = require('../utils/pathutils');
const getEducationPage = require(path.join(rootdir, 'controllers', 'education'));
const express = require('express');

const educationPageRouter = express.Router();
educationPageRouter.get('/education', getEducationPage.educationPageController);

module.exports = educationPageRouter;