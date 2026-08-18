const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const countryList = require("../helpers/countries");
const User = require("../models/user.js");
const EmailVerification = require("../models/emailVerification.js");
const PasswordReset = require("../models/passwordReset.js");
const {
  sendVerificationEmail,
  sendPasswordResetEmail
} = require("../utils/mailer.js");
const {
  phoneValidation,
  countryValidation,
} = require("../middleware/validators");

// ============================================================
// CONSTANTS
// ============================================================

const OTP_EXPIRATION_MINUTES = 15;
const OTP_RESEND_COOLDOWN_SECONDS = 60;
const MAX_OTP_RESENDS = 3;
const MAX_OTP_ATTEMPTS = 5;
const PASSWORD_RESET_EXPIRATION_MINUTES = 15;

// ============================================================
// HELPERS
// ============================================================

const validCountryCodes = countryList.map(
  (country) => country.code
);


// ------------------------------------------------------------
// Normalize email
// ------------------------------------------------------------

function normalizeEmail(email) {
  if (!email) {
    return email;
  }

  email = email.trim().toLowerCase();

  if (
    email.endsWith("@gmail.com") ||
    email.endsWith("@googlemail.com")
  ) {
    const [local, domain] = email.split("@");

    email =
      local.replace(/\./g, "") +
      "@" +
      domain;
  }

  return email;
}


// ------------------------------------------------------------
// Generate secure 6-digit OTP
// ------------------------------------------------------------

function generateOTP() {
  return crypto
    .randomInt(100000, 1000000)
    .toString();
}


// ------------------------------------------------------------
// Hash OTP before storing it
// ------------------------------------------------------------

async function hashOTP(otp) {
  return bcrypt.hash(otp, 12);
}


// ============================================================
// LOGIN PAGE
// ============================================================

exports.getLogInPageController = (req, res) => {

  res.render("auth/login", {
    currentPage: "login",
    title: "Login",
    isLoggedIn: false,
    errors: null,
    oldInput: null,
  });

};


// ============================================================
// LOGIN
// ============================================================

exports.postLogInPageController = async (
  req,
  res,
  next
) => {

  try {

    let { email, password } = req.body;

    email = normalizeEmail(email);


    const invalidCredentialsError = {
      email: {
        msg: "Invalid email or password.",
      },
    };


    // --------------------------------------------------------
    // Find user
    // --------------------------------------------------------

    const user = await User
      .findOne({ email })
      .select("+password");


    // --------------------------------------------------------
    // Generic invalid credentials response
    // --------------------------------------------------------

    if (!user) {

      return res.status(422).render(
        "auth/login",
        {
          currentPage: "login",
          title: "Login",
          isLoggedIn: false,

          errors: invalidCredentialsError,

          oldInput: {
            email: req.body.email,
          },
        }
      );

    }


    // ========================================================
    // ACCOUNT LOCK CHECK
    // ========================================================

    if (
      user.lockUntil &&
      user.lockUntil > Date.now()
    ) {

      const minutesLeft = Math.ceil(
        (user.lockUntil - Date.now()) / 60000
      );


      return res.status(429).render(
        "auth/login",
        {
          currentPage: "login",
          title: "Login",
          isLoggedIn: false,

          errors: {
            email: {
              msg:
                `Account temporarily locked. ` +
                `Try again in ${minutesLeft} minute(s).`,
            },
          },

          oldInput: {
            email: req.body.email,
          },
        }
      );

    }


    // ========================================================
    // PASSWORD CHECK
    // ========================================================

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!isMatch) {

      user.failedLoginAttempts =
        (user.failedLoginAttempts || 0) + 1;


      // ------------------------------------------------------
      // Lock account after 5 failed attempts
      // ------------------------------------------------------

      if (user.failedLoginAttempts >= 5) {

        user.lockUntil =
          Date.now() +
          15 * 60 * 1000;

        user.failedLoginAttempts = 0;

      }


      await user.save();


      return res.status(422).render(
        "auth/login",
        {
          currentPage: "login",
          title: "Login",
          isLoggedIn: false,

          errors: invalidCredentialsError,

          oldInput: {
            email: req.body.email,
          },
        }
      );

    }


    // ========================================================
    // EMAIL VERIFICATION CHECK
    // ========================================================

    if (!user.emailVerified) {

      return res.status(403).render(
        "auth/login",
        {
          currentPage: "login",
          title: "Login",
          isLoggedIn: false,

          errors: {
            email: {
              msg:
                "Please verify your email address before logging in.",
            },
          },

          oldInput: {
            email: req.body.email,
          },
        }
      );

    }


    // ========================================================
    // RESET LOGIN LOCKOUT
    // ========================================================

    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;

    await user.save();


    // ========================================================
    // PREVENT SESSION FIXATION
    // ========================================================

    req.session.regenerate((err) => {

      if (err) {
        return next(err);
      }


      req.session.isLoggedIn = true;


      req.session.user = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      };


      req.session.save((err) => {

        if (err) {
          return next(err);
        }


        console.log(
          "Login success:",
          email
        );


        res.redirect("/");

      });

    });

  } catch (error) {

    next(error);

  }

};


// ============================================================
// LOGOUT
// ============================================================

exports.postLogOutPageController = (
  req,
  res,
  next
) => {

  req.session.destroy((err) => {

    if (err) {
      return next(err);
    }

    res.redirect("/");

  });

};


// ============================================================
// SIGN UP PAGE
// ============================================================

exports.getSignUpPageController = (
  req,
  res
) => {

  res.render("auth/sign-up", {

    currentPage: "SignUp",

    title: "Sign Up",

    isLoggedIn: false,

    countryList,

    errors: null,

    oldInput: null,

  });

};


// ============================================================
// SIGN UP
// ============================================================

exports.postSignUpPageController = [

  // ----------------------------------------------------------
  // FULL NAME
  // ----------------------------------------------------------

  check("fullName")

    .trim()

    .notEmpty()
    .withMessage(
      "Full name is required."
    )

    .isLength({
      min: 3,
      max: 50,
    })

    .withMessage(
      "Name must be between 3 and 50 characters."
    )

    .matches(/^[a-zA-Z\s.]+$/)

    .withMessage(
      "Name can only contain letters, spaces, and periods."
    ),


  // ----------------------------------------------------------
  // EMAIL
  // ----------------------------------------------------------

  check("email")

    .trim()

    .notEmpty()
    .withMessage(
      "Email address is required."
    )

    .isEmail()
    .withMessage(
      "Please enter a valid email address."
    )

    .custom(async (value) => {

      const normalized =
        normalizeEmail(value);


      const existingUser =
        await User.findOne({
          email: normalized,
        });


      if (existingUser) {

        throw new Error(
          "This email is already registered."
        );

      }


      return true;

    }),


  // ----------------------------------------------------------
  // PASSWORD
  // ----------------------------------------------------------

  check("password")

    .trim()

    .notEmpty()
    .withMessage(
      "Password is required."
    )

    .isLength({
      min: 8,
    })

    .withMessage(
      "Password must be at least 8 characters long."
    )

    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
    )

    .withMessage(
      "Password must contain uppercase, lowercase, number, and special character."
    ),


  // ----------------------------------------------------------
  // CONFIRM PASSWORD
  // ----------------------------------------------------------

  check("confirm_password")

    .trim()

    .notEmpty()
    .withMessage(
      "Please confirm your password."
    )

    .custom((value, { req }) => {

      if (
        value !== req.body.password
      ) {

        throw new Error(
          "Passwords do not match."
        );

      }

      return true;

    }),


  // ----------------------------------------------------------
  // PHONE
  // ----------------------------------------------------------

 phoneValidation,


  // ----------------------------------------------------------
  // COUNTRY
  // ----------------------------------------------------------

  countryValidation,

  // ----------------------------------------------------------
  // TERMS
  // ----------------------------------------------------------

  check("agree")

    .equals("1")

    .withMessage(
      "You must accept the Terms of Service and Privacy Policy."
    ),


  // ==========================================================
  // VALIDATION ERROR HANDLER
  // ==========================================================

  (req, res, next) => {

    const errors =
      validationResult(req);


    if (!errors.isEmpty()) {

      return res.status(422).render(
        "auth/sign-up",
        {
          currentPage: "SignUp",
          title: "Sign Up",
          isLoggedIn: false,

          errors: errors.mapped(),

          oldInput: req.body,

          countryList,
        }
      );

    }


    next();

  },


  // ==========================================================
  // CREATE TEMPORARY VERIFICATION
  // ==========================================================

  async (req, res, next) => {

    try {

      const {
        fullName,
        password,
        phone,
        country,
      } = req.body;


      const email =
        normalizeEmail(
          req.body.email
        );


      // ------------------------------------------------------
      // Hash password
      // ------------------------------------------------------

      const hashedPassword =
        await bcrypt.hash(
          password,
          12
        );


      // ------------------------------------------------------
      // Generate secure OTP
      // ------------------------------------------------------

      const otp =
        generateOTP();


      // ------------------------------------------------------
      // Hash OTP
      // ------------------------------------------------------

      const otpHash =
        await hashOTP(otp);


      // ------------------------------------------------------
      // Remove previous pending verification
      // ------------------------------------------------------

      await EmailVerification.deleteOne({
        email,
      });


      // ------------------------------------------------------
      // Store temporary signup information
      // ------------------------------------------------------

      await EmailVerification.create({

        email,

        fullName,

        password: hashedPassword,

        phone,

        country,

        otpHash,

        attempts: 0,

        resendCount: 0,

        lastOtpSentAt: new Date(),

      });


      // ------------------------------------------------------
      // Send OTP
      // ------------------------------------------------------

      await sendVerificationEmail(
        email,
        otp
      );


      console.log(
        `Verification OTP sent to ${email}`
      );


      // ------------------------------------------------------
      // Store email in session
      // ------------------------------------------------------

      req.session.verificationEmail =
        email;


      // ------------------------------------------------------
      // Redirect to verification page
      // ------------------------------------------------------

      req.session.save((err) => {

        if (err) {
          return next(err);
        }


        res.redirect(
          "/verify-email"
        );

      });

    } catch (error) {

      next(error);

    }

  },

];


// ============================================================
// RESEND VERIFICATION OTP
// ============================================================

exports.resendVerificationOtpController =
  async (req, res, next) => {

    try {

      // ------------------------------------------------------
      // IMPORTANT:
      // Never trust email sent by the browser.
      //
      // The email comes from the server-side session.
      // ------------------------------------------------------

      const email =
        normalizeEmail(
          req.session.verificationEmail
        );


      if (!email) {

        return res.status(400).json({

          success: false,

          message:
            "Verification session expired. Please sign up again.",

        });

      }


      // ------------------------------------------------------
      // Find pending verification
      // ------------------------------------------------------

      const verification =
        await EmailVerification.findOne({
          email,
        });


      if (!verification) {

        return res.status(404).json({

          success: false,

          message:
            "No pending email verification was found. Please sign up again.",

        });

      }


      // ======================================================
      // SERVER-SIDE 60 SECOND COOLDOWN
      // ======================================================

      const now =
        Date.now();


      const lastSent =
        verification.lastOtpSentAt
          ? verification.lastOtpSentAt.getTime()
          : 0;


      const secondsSinceLastOtp =
        Math.floor(
          (now - lastSent) / 1000
        );


      if (
        secondsSinceLastOtp <
        OTP_RESEND_COOLDOWN_SECONDS
      ) {

        const secondsRemaining =
          OTP_RESEND_COOLDOWN_SECONDS -
          secondsSinceLastOtp;


        return res.status(429).json({

          success: false,

          message:
            `Please wait ${secondsRemaining} seconds before requesting another OTP.`,

          retryAfter:
            secondsRemaining,

          remainingResends:
            Math.max(
              0,
              MAX_OTP_RESENDS -
              verification.resendCount
            ),

        });

      }


      // ======================================================
      // MAXIMUM RESEND CHECK
      // ======================================================

      if (
        verification.resendCount >=
        MAX_OTP_RESENDS
      ) {

        return res.status(429).json({

          success: false,

          message:
            "You have requested too many verification codes. Please start the signup process again.",

          retryAfter: 0,

          remainingResends: 0,

        });

      }


      // ======================================================
      // GENERATE NEW OTP
      // ======================================================

      const newOtp =
        generateOTP();


      // ======================================================
      // HASH NEW OTP
      // ======================================================

      const newOtpHash =
        await hashOTP(newOtp);


      // ======================================================
      // REPLACE OLD OTP
      // ======================================================

      verification.otpHash =
        newOtpHash;


      // ------------------------------------------------------
      // Reset incorrect OTP attempts
      // ------------------------------------------------------

      verification.attempts = 0;


      // ------------------------------------------------------
      // Increase resend counter
      // ------------------------------------------------------

      verification.resendCount += 1;


      // ------------------------------------------------------
      // Record exact resend time
      // ------------------------------------------------------

      verification.lastOtpSentAt =
        new Date();


      // ------------------------------------------------------
      // Restart 15-minute expiration
      // ------------------------------------------------------

      verification.createdAt =
        new Date();


      // ======================================================
      // SAVE DATABASE CHANGES
      // ======================================================

      await verification.save();


      // ======================================================
      // SEND NEW OTP
      // ======================================================

      await sendVerificationEmail(
        verification.email,
        newOtp
      );


      // ======================================================
      // SUCCESS RESPONSE
      // ======================================================

      return res.status(200).json({

        success: true,

        message:
          "A new verification code has been sent to your email.",

        retryAfter:
          OTP_RESEND_COOLDOWN_SECONDS,

        remainingResends:
          MAX_OTP_RESENDS -
          verification.resendCount,

      });

    } catch (error) {

      console.error(
        "Resend OTP error:",
        error
      );

      next(error);

    }

  };


// ============================================================
// VERIFY EMAIL PAGE
// ============================================================

exports.getVerifyEmailController =
  async (req, res, next) => {

    try {

      // ------------------------------------------------------
      // Get email from server-side session
      // ------------------------------------------------------

      const email =
        req.session.verificationEmail;


      if (!email) {

        return res.redirect(
          "/sign-up"
        );

      }


      // ------------------------------------------------------
      // Find pending verification
      // ------------------------------------------------------

      const verification =
        await EmailVerification.findOne({
          email,
        });


      if (!verification) {

        return res.redirect(
          "/sign-up"
        );

      }


      // ======================================================
      // CALCULATE SERVER-SIDE REMAINING COOLDOWN
      // ======================================================

      const now =
        Date.now();


      const lastSent =
        verification.lastOtpSentAt
          ? verification.lastOtpSentAt.getTime()
          : 0;


      const secondsSinceLastOtp =
        Math.floor(
          (now - lastSent) / 1000
        );


      const resendRemainingSeconds =
        Math.max(
          0,
          OTP_RESEND_COOLDOWN_SECONDS -
          secondsSinceLastOtp
        );


      // ======================================================
      // CALCULATE REMAINING RESENDS
      // ======================================================

      const remainingResends =
        Math.max(
          0,
          MAX_OTP_RESENDS -
          verification.resendCount
        );


      // ======================================================
      // RENDER VERIFY PAGE
      // ======================================================

      res.render(
        "auth/verify-email",
        {

          currentPage:
            "verify-email",

          title:
            "Verify Email",

          isLoggedIn:
            false,

          email,

          error:
            null,

          success:
            null,

          // IMPORTANT:
          // These values come directly from server/database.

          resendRemainingSeconds,

          remainingResends,

        }
      );

    } catch (error) {

      next(error);

    }

  };


// ============================================================
// VERIFY EMAIL OTP
// ============================================================

exports.postVerifyEmailController =
  async (req, res, next) => {

    try {

      // ------------------------------------------------------
      // Get email from session
      // ------------------------------------------------------

      const email =
        req.session.verificationEmail;


      if (!email) {

        return res.redirect(
          "/sign-up"
        );

      }


      // ------------------------------------------------------
      // Get OTP from form
      // ------------------------------------------------------

      const otp =
        String(
          req.body.otp || ""
        ).trim();


      // ------------------------------------------------------
      // Validate OTP format
      // ------------------------------------------------------

      if (!/^\d{6}$/.test(otp)) {

        return res.status(422).render(
          "auth/verify-email",
          {

            currentPage:
              "verify-email",

            title:
              "Verify Email",

            isLoggedIn:
              false,

            email,

            error:
              "Please enter the 6-digit verification code.",

            success:
              null,

            resendRemainingSeconds: 0,

            remainingResends:
              MAX_OTP_RESENDS,

          }
        );

      }


      // ------------------------------------------------------
      // Find verification record
      // ------------------------------------------------------

      const verification =
        await EmailVerification.findOne({
          email,
        });


      if (!verification) {

        return res.status(410).render(
          "auth/verify-email",
          {

            currentPage:
              "verify-email",

            title:
              "Verify Email",

            isLoggedIn:
              false,

            email,

            error:
              "This verification code has expired. Please sign up again.",

            success:
              null,

            resendRemainingSeconds: 0,

            remainingResends: 0,

          }
        );

      }


      // ======================================================
      // CALCULATE CURRENT SERVER COOLDOWN
      // ======================================================

      const now =
        Date.now();


      const lastSent =
        verification.lastOtpSentAt
          ? verification.lastOtpSentAt.getTime()
          : 0;


      const secondsSinceLastOtp =
        Math.floor(
          (now - lastSent) / 1000
        );


      const resendRemainingSeconds =
        Math.max(
          0,
          OTP_RESEND_COOLDOWN_SECONDS -
          secondsSinceLastOtp
        );


      const remainingResends =
        Math.max(
          0,
          MAX_OTP_RESENDS -
          verification.resendCount
        );


      // ======================================================
      // LIMIT OTP ATTEMPTS
      // ======================================================

      if (
        verification.attempts >=
        MAX_OTP_ATTEMPTS
      ) {

        await EmailVerification.deleteOne({
          _id: verification._id,
        });


        delete req.session.verificationEmail;


        return res.status(429).render(
          "auth/verify-email",
          {

            currentPage:
              "verify-email",

            title:
              "Verify Email",

            isLoggedIn:
              false,

            email,

            error:
              "Too many incorrect attempts. Please start the verification process again.",

            success:
              null,

            resendRemainingSeconds: 0,

            remainingResends: 0,

          }
        );

      }


      // ======================================================
      // COMPARE OTP WITH HASH
      // ======================================================

      const validOTP =
        await bcrypt.compare(
          otp,
          verification.otpHash
        );


      if (!validOTP) {

        verification.attempts += 1;

        await verification.save();


        return res.status(422).render(
          "auth/verify-email",
          {

            currentPage:
              "verify-email",

            title:
              "Verify Email",

            isLoggedIn:
              false,

            email,

            error:
              "Incorrect verification code.",

            success:
              null,

            resendRemainingSeconds,

            remainingResends,

          }
        );

      }


      // ======================================================
      // CHECK IF USER ALREADY EXISTS
      // ======================================================

      const existingUser =
        await User.findOne({
          email,
        });


      if (existingUser) {

        await EmailVerification.deleteOne({
          _id: verification._id,
        });


        delete req.session.verificationEmail;


        return res.redirect(
          "/login"
        );

      }


      // ======================================================
      // CREATE REAL USER
      // ======================================================

      const user =
        new User({

          fullName:
            verification.fullName,

          email:
            verification.email,

          password:
            verification.password,

          phone:
            verification.phone,

          country:
            verification.country,

          emailVerified:
            true,

          authProvider:
            "local",

          role:
            "user",

          failedLoginAttempts:
            0,

        });


      await user.save();


      // ======================================================
      // DELETE TEMPORARY VERIFICATION DATA
      // ======================================================

      await EmailVerification.deleteOne({
        _id: verification._id,
      });


      // ------------------------------------------------------
      // Remove verification email from session
      // ------------------------------------------------------

      delete req.session.verificationEmail;


      // ======================================================
      // ACCOUNT CREATED
      // ======================================================

      console.log(
        "Email verified and account created:",
        email
      );


      res.redirect(
        "/login?verified=true"
      );

    } catch (error) {

      next(error);

    }

  };
  // ============================================================
// FORGOT PASSWORD PAGE
// ============================================================

exports.getForgotPasswordController = (req, res) => {

  res.render(
    "auth/forgot-password",
    {
      currentPage: "forgot-password",

      title: "Forgot Password",

      isLoggedIn: false,

      error: null,

      success: null,

      oldInput: null,
    }
  );

};


// ============================================================
// FORGOT PASSWORD
// ============================================================

exports.postForgotPasswordController = async (
  req,
  res,
  next
) => {

  try {

    // --------------------------------------------------------
    // Normalize email
    // --------------------------------------------------------

    const email =
      normalizeEmail(req.body.email);


    // --------------------------------------------------------
    // Basic validation
    // --------------------------------------------------------

    if (!email) {

      return res.status(422).render(
        "auth/forgot-password",
        {

          currentPage:
            "forgot-password",

          title:
            "Forgot Password",

          isLoggedIn:
            false,

          error:
            "Please enter your email address.",

          success:
            null,

          oldInput:
            req.body,

        }
      );

    }


    // --------------------------------------------------------
    // Find user
    // --------------------------------------------------------

    const user =
      await User.findOne({
        email,
      });


    // --------------------------------------------------------
    // IMPORTANT SECURITY RULE
    //
    // Never tell the visitor whether the email exists.
    // This prevents account enumeration.
    // --------------------------------------------------------

    if (!user) {

      return res.render(
        "auth/forgot-password",
        {

          currentPage:
            "forgot-password",

          title:
            "Forgot Password",

          isLoggedIn:
            false,

          error:
            null,

          success:
            "If an account exists for this email address, a password reset link has been sent.",

          oldInput:
            null,

        }
      );

    }


    // --------------------------------------------------------
    // Google accounts
    // --------------------------------------------------------

   // --------------------------------------------------------
// Google accounts
// --------------------------------------------------------
//
// Do not reveal that this email belongs to a Google account.
// The visitor should receive the same generic response as
// an unknown email address.
//
// We also do NOT create a password-reset token for Google
// accounts because they authenticate through Google.
// --------------------------------------------------------

if (
  user.authProvider === "google"
) {

  return res.render(
    "auth/forgot-password",
    {
      currentPage:
        "forgot-password",

      title:
        "Forgot Password",

      isLoggedIn:
        false,

      error:
        null,

      success:
        "If an account exists for this email address, a password reset link has been sent.",

      oldInput:
        null,
    }
  );
}

    // --------------------------------------------------------
    // Delete previous reset tokens
    // --------------------------------------------------------

    await PasswordReset.deleteMany({
      userId: user._id,
    });


    // --------------------------------------------------------
    // Generate secure random token
    // --------------------------------------------------------

    const rawToken =
      crypto.randomBytes(32).toString("hex");


    // --------------------------------------------------------
    // Hash token before storing it
    // --------------------------------------------------------

    const tokenHash =
      crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");


    // --------------------------------------------------------
    // Expiration
    // --------------------------------------------------------

    const expiresAt =
      new Date(
        Date.now() +
        PASSWORD_RESET_EXPIRATION_MINUTES *
        60 *
        1000
      );


    // --------------------------------------------------------
    // Store hashed token
    // --------------------------------------------------------

    await PasswordReset.create({

      userId:
        user._id,

      email:
        user.email,

      tokenHash,

      expiresAt,

    });


    // --------------------------------------------------------
    // Build reset URL
    // --------------------------------------------------------

    const baseUrl =
      process.env.APP_URL ||
      `${req.protocol}://${req.get("host")}`;


    const resetUrl =
      `${baseUrl}/reset-password/${rawToken}`;


    // --------------------------------------------------------
    // Send reset email
    // --------------------------------------------------------

    await sendPasswordResetEmail(
      user.email,
      resetUrl
    );


    // --------------------------------------------------------
    // Generic success response
    // --------------------------------------------------------

    return res.render(
      "auth/forgot-password",
      {

        currentPage:
          "forgot-password",

        title:
          "Forgot Password",

        isLoggedIn:
          false,

        error:
          null,

        success:
          "If an account exists for this email address, a password reset link has been sent.",

        oldInput:
          null,

      }
    );

  } catch (error) {

    next(error);

  }

};


// ============================================================
// RESET PASSWORD PAGE
// ============================================================

exports.getResetPasswordController = async (
  req,
  res,
  next
) => {

  try {

    const rawToken =
      String(
        req.params.token || ""
      ).trim();


    if (
      !/^[a-f0-9]{64}$/i.test(
        rawToken
      )
    ) {

      return res.status(400).render(
        "auth/reset-password",
        {

          currentPage:
            "reset-password",

          title:
            "Reset Password",

          isLoggedIn:
            false,

          token:
            null,

          error:
            "This password reset link is invalid or has expired.",

        }
      );

    }


    const tokenHash =
      crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");


    const resetRecord =
      await PasswordReset.findOne({
        tokenHash,

        expiresAt: {
          $gt: new Date(),
        },
      });


    if (!resetRecord) {

      return res.status(410).render(
        "auth/reset-password",
        {

          currentPage:
            "reset-password",

          title:
            "Reset Password",

          isLoggedIn:
            false,

          token:
            null,

          error:
            "This password reset link is invalid or has expired.",

        }
      );

    }


    res.render(
      "auth/reset-password",
      {

        currentPage:
          "reset-password",

        title:
          "Reset Password",

        isLoggedIn:
          false,

        token:
          rawToken,

        error:
          null,

      }
    );

  } catch (error) {

    next(error);

  }

};


// ============================================================
// RESET PASSWORD
// ============================================================

exports.postResetPasswordController = async (
  req,
  res,
  next
) => {

  try {

    const rawToken =
      String(
        req.params.token || ""
      ).trim();


    const password =
      String(
        req.body.password || ""
      );


    const confirmPassword =
      String(
        req.body.confirm_password || ""
      );


    // --------------------------------------------------------
    // Validate token format
    // --------------------------------------------------------

    if (
      !/^[a-f0-9]{64}$/i.test(
        rawToken
      )
    ) {

      return res.status(400).render(
        "auth/reset-password",
        {

          currentPage:
            "reset-password",

          title:
            "Reset Password",

          isLoggedIn:
            false,

          token:
            null,

          error:
            "This password reset link is invalid or has expired.",

        }
      );

    }


    // --------------------------------------------------------
    // Validate password
    // --------------------------------------------------------

    if (
      password.length < 8
    ) {

      return res.status(422).render(
        "auth/reset-password",
        {

          currentPage:
            "reset-password",

          title:
            "Reset Password",

          isLoggedIn:
            false,

          token:
            rawToken,

          error:
            "Password must be at least 8 characters long.",

        }
      );

    }


    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
        password
      )
    ) {

      return res.status(422).render(
        "auth/reset-password",
        {

          currentPage:
            "reset-password",

          title:
            "Reset Password",

          isLoggedIn:
            false,

          token:
            rawToken,

          error:
            "Password must contain uppercase, lowercase, number, and special character.",

        }
      );

    }


    // --------------------------------------------------------
    // Confirm password
    // --------------------------------------------------------

    if (
      password !== confirmPassword
    ) {

      return res.status(422).render(
        "auth/reset-password",
        {

          currentPage:
            "reset-password",

          title:
            "Reset Password",

          isLoggedIn:
            false,

          token:
            rawToken,

          error:
            "Passwords do not match.",

        }
      );

    }


    // --------------------------------------------------------
    // Hash token
    // --------------------------------------------------------

    const tokenHash =
      crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");


    // --------------------------------------------------------
    // Find valid reset record
    // --------------------------------------------------------

    const resetRecord =
      await PasswordReset.findOne({
        tokenHash,

        expiresAt: {
          $gt: new Date(),
        },
      });


    if (!resetRecord) {

      return res.status(410).render(
        "auth/reset-password",
        {

          currentPage:
            "reset-password",

          title:
            "Reset Password",

          isLoggedIn:
            false,

          token:
            null,

          error:
            "This password reset link is invalid or has expired.",

        }
      );

    }


    // --------------------------------------------------------
    // Find user
    // --------------------------------------------------------

    const user =
      await User.findById(
        resetRecord.userId
      ).select("+password");


    if (!user) {

      await PasswordReset.deleteOne({
        _id:
          resetRecord._id,
      });


      return res.status(410).render(
        "auth/reset-password",
        {

          currentPage:
            "reset-password",

          title:
            "Reset Password",

          isLoggedIn:
            false,

          token:
            null,

          error:
            "This password reset link is invalid or has expired.",

        }
      );

    }


    // --------------------------------------------------------
    // Hash new password
    // --------------------------------------------------------

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );


    // --------------------------------------------------------
    // Update password
    // --------------------------------------------------------

    user.password =
      hashedPassword;


    // Reset login security counters
    user.failedLoginAttempts =
      0;

    user.lockUntil =
      undefined;


    await user.save();


    // --------------------------------------------------------
    // Delete reset token
    //
    // This makes the link single-use.
    // --------------------------------------------------------

    await PasswordReset.deleteOne({
      _id:
        resetRecord._id,
    });


    // --------------------------------------------------------
    // Delete any other reset tokens
    // --------------------------------------------------------

    await PasswordReset.deleteMany({
      userId:
        user._id,
    });


    // --------------------------------------------------------
    // Success
    // --------------------------------------------------------

    console.log(
      "Password successfully reset:",
      user.email
    );


    res.redirect(
      "/login?passwordReset=true"
    );

  } catch (error) {

    next(error);

  }

};