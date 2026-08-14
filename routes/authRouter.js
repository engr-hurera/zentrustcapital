const express = require("express");
const path = require("path");

const rootdir = require("../utils/pathutils");

const authController = require(
  path.join(rootdir, "controllers", "authController"),
);
const authMiddleware = require(
  path.join(rootdir, "middleware", "authMiddleware"),
);
const { loginLimiter } = require(
  path.join(rootdir, "middleware", "rateLimiters"),
);

const authRouter = express.Router();

/* ===========================
   Guest Routes
=========================== */

authRouter.get(
  "/login",
  authMiddleware.isGuest,
  authController.getLogInPageController,
);

authRouter.get(
  "/sign-up",
  authMiddleware.isGuest,
  authController.getSignUpPageController,
);

authRouter.post(
  "/login",
  loginLimiter,
  authMiddleware.isGuest,
  authController.postLogInPageController,
);

authRouter.post(
  "/sign-up",
  authMiddleware.isGuest,
  authController.postSignUpPageController,
);

/* ===========================
   Authenticated Routes
=========================== */

authRouter.post(
  "/logout",
  authMiddleware.isAuthenticated,
  authController.postLogOutPageController,
);

module.exports = authRouter;
