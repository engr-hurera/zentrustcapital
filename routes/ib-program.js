const path = require('path');
const rootdir = require('../utils/pathutils');
const getibProgramPage = require(path.join(rootdir, 'controllers', 'ib-program'));
const express = require('express');

const ibProgramPageRouter = express.Router();
ibProgramPageRouter.get('/ib-program', getibProgramPage.ibProgramPageController);

module.exports = ibProgramPageRouter;