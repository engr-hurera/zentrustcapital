const express = require("express");
const path = require("path");

const rootdir = require("../../utils/pathutils");

const addEditBrokerController = require(
  path.join(rootdir, "controllers", "admin", "addEditbroker.js"),
);

const addEditBrokerRouter = express.Router();

/*
|--------------------------------------------------------------------------
| Broker Management (Admin Only)
|--------------------------------------------------------------------------
| Authentication & authorization are handled globally in app.js:
|
| app.use(authMiddleware.isRole("admin"));
| app.use(addEditBrokerRouter);
|--------------------------------------------------------------------------
*/

addEditBrokerRouter.get(
  "/admin/add-broker",
  addEditBrokerController.getAddBrokerController,
);

addEditBrokerRouter.post(
  "/admin/add-broker",
  addEditBrokerController.postAddBrokerController,
);

addEditBrokerRouter.get(
  "/admin/edit-broker/:h",
  addEditBrokerController.getEditBrokerController,
);

addEditBrokerRouter.post(
  "/admin/edit-broker",
  addEditBrokerController.postEditBrokerController,
);

addEditBrokerRouter.post(
  "/admin/delete-broker/:h",
  addEditBrokerController.postDeleteBrokerController,
);

module.exports = addEditBrokerRouter;
