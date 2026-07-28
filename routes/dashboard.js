const path = require('path');
const rootdir = require('../utils/pathutils');
const getDashboard = require(path.join(rootdir, 'controllers', 'dashboard'));
const express = require('express');

const dashboardRouter = express.Router();

// TODO: add auth middleware here so only logged-in IB partners can reach
// this, e.g. dashboardRouter.get('/dashboard', requireAuth, ...)
dashboardRouter.get('/dashboard', getDashboard.clientDashboardController);

// TODO: add admin-only auth middleware here before going live.
dashboardRouter.get('/dashboard/admin', getDashboard.adminDashboardController);

module.exports = dashboardRouter;
