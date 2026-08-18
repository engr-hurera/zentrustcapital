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
  forgotPasswordLimiter,
} = require(
  path.join(rootdir, "middleware", "rateLimiters"),
);

const googleAuthController = require(
  path.join(rootdir, "controllers", "googleAuthController")
);
const {
  phoneValidation,
  countryValidation,
  googleSignupValidationResult,
} = require(
  path.join(rootdir, "middleware", "validators")
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
  phoneValidation,
  countryValidation,
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
// FORGOT PASSWORD
// ============================================================

authRouter.get(
  "/forgot-password",
  authMiddleware.isGuest,
  authController.getForgotPasswordController
);


authRouter.post(
  "/forgot-password",
  authMiddleware.isGuest,
  forgotPasswordLimiter,
  authController.postForgotPasswordController
);


// ============================================================
// RESET PASSWORD
// ============================================================

authRouter.get(
  "/reset-password/:token",
  authController.getResetPasswordController
);


authRouter.post(
  "/reset-password/:token",
  authController.postResetPasswordController
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
// GOOGLE AUTHENTICATION
// ============================================================

authRouter.get(
  "/auth/google",
  googleAuthController.startGoogleAuth
);

authRouter.get(
  "/auth/google/callback",
  googleAuthController.googleAuthCallback
);

authRouter.get(
  "/google-signup",
  authMiddleware.isGuest,
  googleAuthController.getGoogleSignupController
);

authRouter.post(
  "/google-signup",
  authMiddleware.isGuest,
  phoneValidation,
  countryValidation,
  googleSignupValidationResult,
  googleAuthController.postGoogleSignupController
);

// ============================================================
// EXPORT
// ============================================================

module.exports = authRouter;