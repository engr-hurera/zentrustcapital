const express = require("express");
const path = require("path");

const rootdir = require("../utils/pathutils");


// ============================================================
// CONTROLLERS
// ============================================================

const authController = require(
  path.join(
    rootdir,
    "controllers",
    "authController"
  )
);


// ============================================================
// AUTH MIDDLEWARE
// ============================================================

const authMiddleware = require(
  path.join(
    rootdir,
    "middleware",
    "authMiddleware"
  )
);


// ============================================================
// RATE LIMITERS
// ============================================================

const {
  loginLimiter,
  resendOtpLimiter,
} = require(
  path.join(
    rootdir,
    "middleware",
    "rateLimiters"
  )
);


// ============================================================
// ROUTER
// ============================================================

const authRouter = express.Router();


// ============================================================
// GUEST ROUTES
// ============================================================

authRouter.get(
  "/login",
  authMiddleware.isGuest,
  authController.getLogInPageController
);


authRouter.get(
  "/sign-up",
  authMiddleware.isGuest,
  authController.getSignUpPageController
);


// ============================================================
// LOGIN
// ============================================================

authRouter.post(
  "/login",
  loginLimiter,
  authMiddleware.isGuest,
  authController.postLogInPageController
);


// ============================================================
// SIGN UP
// ============================================================

authRouter.post(
  "/sign-up",
  authMiddleware.isGuest,
  authController.postSignUpPageController
);


// ============================================================
// EMAIL VERIFICATION PAGE
// ============================================================

authRouter.get(
  "/verify-email",
  authMiddleware.isGuest,
  authController.getVerifyEmailController
);


// ============================================================
// VERIFY EMAIL OTP
// ============================================================

authRouter.post(
  "/verify-email",
  authMiddleware.isGuest,
  authController.postVerifyEmailController
);


// ============================================================
// RESEND OTP
// ============================================================
//
// The rate limiter is BEFORE the controller.
//
// Therefore even if someone bypasses JavaScript,
// the server still protects this endpoint.
// ============================================================

authRouter.post(
  "/resend-otp",
  resendOtpLimiter,
  authMiddleware.isGuest,
  authController.resendVerificationOtpController
);


// ============================================================
// LOGOUT
// ============================================================

authRouter.post(
  "/logout",
  authMiddleware.isAuthenticated,
  authController.postLogOutPageController
);


// ============================================================
// EXPORT
// ============================================================

module.exports = authRouter;