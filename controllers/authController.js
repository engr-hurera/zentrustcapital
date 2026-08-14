const path = require("path");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const countryList = require("../helpers/countries");
const User = require("../models/user.js");

// ---------- Shared helpers ----------
const validCountryCodes = countryList.map((c) => c.code);

/**
 * Normalize email the same way on both signup & login
 * (lowercase + remove dots from Gmail/Googlemail)
 */
function normalizeEmail(email) {
  if (!email) return email;
  email = email.trim().toLowerCase();
  if (email.endsWith("@gmail.com") || email.endsWith("@googlemail.com")) {
    const [local, domain] = email.split("@");
    email = local.replace(/\./g, "") + "@" + domain;
  }
  return email;
}

// ---------- LOGIN ----------
exports.getLogInPageController = (req, res) => {
  res.render("auth/login", {
    currentPage: "login",
    title: "Login",
    isLoggedIn: false,
    errors: null,
    oldInput: null,
  });
};

exports.postLogInPageController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = normalizeEmail(email);

    const invalidCredentialsError = {
      email: { msg: "Invalid email or password." },
    };

    const user = await User.findOne({ email }).select("+password");
    // Generic response (prevents account enumeration)
    if (!user) {
      return res.status(422).render("auth/login", {
        currentPage: "login",
        title: "Login",
        isLoggedIn: false,
        errors: invalidCredentialsError,
        oldInput: { email: req.body.email },
      });
    }

    // ---------- Account Lockout Check ----------
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res.status(429).render("auth/login", {
        currentPage: "login",
        title: "Login",
        isLoggedIn: false,
        errors: {
          email: {
            msg: `Account temporarily locked. Try again in ${minutesLeft} minute(s).`,
          },
        },
        oldInput: { email: req.body.email },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Increment failed attempts
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

      // Lock after 5 failed attempts for 15 minutes
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 min
        user.failedLoginAttempts = 0; // reset counter after locking
      }

      await user.save();

      return res.status(422).render("auth/login", {
        currentPage: "login",
        title: "Login",
        isLoggedIn: false,
        errors: invalidCredentialsError,
        oldInput: { email: req.body.email },
      });
    }

    // Success → reset lockout counters
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // Prevent session fixation
    req.session.regenerate((err) => {
      if (err) return next(err);

      req.session.isLoggedIn = true;
      req.session.user = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      };

      req.session.save((err) => {
        if (err) return next(err);
        console.log("Login success:", email);
        res.redirect("/");
      });
    });
  } catch (err) {
    next(err);
  }
};

// ---------- LOGOUT ----------
exports.postLogOutPageController = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

// ---------- SIGN UP ----------
exports.getSignUpPageController = (req, res) => {
  res.render("auth/sign-up", {
    currentPage: "SignUp",
    title: "Sign Up",
    isLoggedIn: false,
    countryList,
    errors: null,
    oldInput: null,
  });
};

exports.postSignUpPageController = [
  // 1. Full Name
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters.")
    .matches(/^[a-zA-Z\s.]+$/)
    .withMessage("Name can only contain letters, spaces, and periods."),

  // 2. Email
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .custom(async (value) => {
      const normalized = normalizeEmail(value);
      const existingUser = await User.findOne({ email: normalized });
      if (existingUser) {
        throw new Error("This email is already registered.");
      }
      return true;
    }),

  // 3. Password
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Password must contain uppercase, lowercase, number, and special character.",
    ),

  // 4. Confirm Password
  check("confirm_password")
    .trim()
    .notEmpty()
    .withMessage("Please confirm your password.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),

  // 5. Phone
  check("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone/WhatsApp number is required.")
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage(
      "Enter a valid international phone number (e.g. +923001234567).",
    ),

  // 6. Country
  check("country")
    .trim()
    .notEmpty()
    .withMessage("Country selection is required.")
    .isIn(validCountryCodes)
    .withMessage("Invalid country selected."),

  // 7. Terms
  check("agree")
    .equals("1")
    .withMessage("You must accept the Terms of Service and Privacy Policy."),

  // Validation error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/sign-up", {
        currentPage: "SignUp",
        title: "Sign Up",
        isLoggedIn: false,
        errors: errors.mapped(),
        oldInput: req.body,
        countryList,
      });
    }
    next();
  },

  // Actual registration
  async (req, res, next) => {
    try {
      const { fullName, password, phone, country } = req.body;
      const email = normalizeEmail(req.body.email);

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        fullName,
        email,
        password: hashedPassword,
        phone,
        country,
        role: "user",
        failedLoginAttempts: 0,
      });

      await user.save();
      res.redirect("/login");
    } catch (err) {
      next(err);
    }
  },
];
