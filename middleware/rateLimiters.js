const rateLimit = require("express-rate-limit");


// ============================================================
// GENERAL AUTHENTICATION RATE LIMITER
// ============================================================

exports.authLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 20,

  message: {
    success: false,

    message:
      "Too many requests from this IP. Please try again after 15 minutes.",
  },

  standardHeaders: true,

  legacyHeaders: false,

});


// ============================================================
// LOGIN RATE LIMITER
// ============================================================

exports.loginLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 10,

  message: {
    success: false,

    message:
      "Too many login attempts. Please try again later.",
  },

  standardHeaders: true,

  legacyHeaders: false,

});


// ============================================================
// RESEND OTP RATE LIMITER
// ============================================================

exports.resendOtpLimiter = rateLimit({

  windowMs: 60 * 60 * 1000,

  max: 5,

  message: {
    success: false,

    message:
      "Too many OTP resend requests. Please try again later.",
  },

  standardHeaders: true,

  legacyHeaders: false,

});


// ============================================================
// FORGOT PASSWORD RATE LIMITER
// ============================================================
//
// Maximum 5 password-reset requests per hour
// from the same IP.
//
// This is an additional protection layer.
// The controller ALSO prevents abuse by making the
// response generic and replacing previous reset tokens.
// ============================================================

exports.forgotPasswordLimiter = rateLimit({

  windowMs: 60 * 60 * 1000,

  max: 5,

  message: {
    success: false,

    message:
      "Too many password reset requests. Please try again later.",
  },

  standardHeaders: true,

  legacyHeaders: false,

});