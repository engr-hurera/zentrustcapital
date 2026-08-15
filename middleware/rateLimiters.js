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
//
// This is an additional protection layer.
//
// It protects the /resend-otp endpoint even if:
// - JavaScript is disabled
// - JavaScript is modified
// - Someone manually sends POST requests
//
// Maximum:
// 5 requests per hour per IP
//
// The actual 60-second OTP cooldown is enforced separately
// inside authController using the database.
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