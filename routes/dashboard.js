const express = require("express");
const path = require("path");

const rootdir = require("../utils/pathutils");

const dashboardController = require(
  path.join(rootdir, "controllers", "dashboard"),
);

const dashboardRouter = express.Router();

/*
|--------------------------------------------------------------------------
| User Dashboard
|--------------------------------------------------------------------------
| Authentication is already handled globally in app.js
|--------------------------------------------------------------------------
*/

dashboardRouter.get(
  "/dashboard",
  dashboardController.clientDashboardController,
);

/*
|--------------------------------------------------------------------------
| Admin Dashboard
|--------------------------------------------------------------------------
| The controller should verify that the user is an admin before rendering.
| If you later separate admin routes into their own router, move this there.
|--------------------------------------------------------------------------
*/

dashboardRouter.get(
  "/dashboard/admin",
  dashboardController.adminDashboardController,
);

module.exports = dashboardRouter;
