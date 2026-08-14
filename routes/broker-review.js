const path = require("path");
const express = require("express");

const rootdir = require("../utils/pathutils");

const getbrokerReviewPage = require(
  path.join(rootdir, "controllers", "broker-review"),
);

const brokerReviewPageRouter = express.Router();

// Main broker review page
brokerReviewPageRouter.get(
  "/broker-review",
  getbrokerReviewPage.brokerReviewPageController,
);

// Individual broker / Read More page
brokerReviewPageRouter.get(
  "/broker-review/:j",
  getbrokerReviewPage.readMoreBrokerReviewPageController,
);

module.exports = brokerReviewPageRouter;
