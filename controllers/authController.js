const path = require("path");
const { check, validationResult } = require("express-validator");
// Adjust this relative path depending on exactly where your countries.js file is stored
const countryList = require("../helpers/countries");
const User = require("../models/user.js");

exports.getLogInPageController = (req, res, next) => {
  res.render("auth/login", {
    currentPage: "login",
    title: "Login",
    isLoggedIn: "false",
  });
};

// exports.postLogInPageController = async (req, res, next) => {
//   const { email, password } = req.body;
//   console.log("Login Attempt:", email);
//   const user = await User.findOne({ email });
//   if (!user) {
//     console.log("Login Failed: User not found for email:", email);
//     return res.status(422).render("auth/login", {
//       currentPage: "login",
//       title: "Login",
//       isLoggedIn: "false",
//       errors: { email: { msg: "Invalid email or password." } },
//       oldInput: req.body,
//     });
//   }
//   // res.cookie("isLoggedIn" , true);
//   req.session.isLoggedIn = true;
//   // req.isLoggedIn = true;
//   res.redirect("/");
// };
const bcrypt = require("bcryptjs"); // Ensure this package is installed via npm

/**
 * @desc    Handle Sign In Form Submission (POST Request)
 * @route   POST /login
 */
exports.postLogInPageController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    console.log("Raw Login Attempt:", email);

    // 1. Normalize the email address manually to match the signup page behavior
    if (email) {
      email = email.trim().toLowerCase();

      // If it's a gmail address, remove dots from the username part before the @ sign
      if (email.endsWith("@gmail.com")) {
        const parts = email.split("@");
        const usernameWithoutDots = parts[0].replace(/\./g, "");
        email = `${usernameWithoutDots}@${parts[1]}`;
      }
    }

    console.log("Normalized Login Attempt:", email);

    // 2. Fetch user by the normalized email string
    const user = await User.findOne({ email });

    // Generic error text to prevent malicious account harvesting/enumeration scans
    const invalidCredentialsError = {
      email: { msg: "Invalid email or password." },
    };

    if (!user) {
      console.log("Login Failed: User not found for email:", email);
      return res.status(422).render("auth/login", {
        currentPage: "login",
        title: "Login",
        isLoggedIn: false,
        errors: invalidCredentialsError,
        oldInput: { email: req.body.email }, // Sends back what they typed originally
      });
    }

    // 3. Cryptographically verify the typed password against the stored database hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login Failed: Password mismatch for email:", email);
      return res.status(422).render("auth/login", {
        currentPage: "login",
        title: "Login",
        isLoggedIn: false,
        errors: invalidCredentialsError,
        oldInput: { email: req.body.email },
      });
    }

    // 4. Establish the secure user session profile
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    // 5. Force session engine to complete saving to database before executing redirect
    req.session.save((err) => {
      if (err) {
        console.error("Session saving failed during login:", err);
        return res.status(500).send("Internal Server Error");
      }
      console.log("Login Success: Session stored securely for:", email);
      res.redirect("/");
    });
  } catch (err) {
    console.error("Core Login Process Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.postLogOutPageController = (req, res, next) => {
  // res.clearCookie("isLoggedIn"); // this can also  work
  // res.cookie("isLoggedIn" , false);
  // req.isLoggedIn = true;
  // res.redirect('/');

  req.session.destroy(() => {
    res.redirect("/");
  });
};

const validCountryCodes = countryList.map((c) => c.code);

/**
 * @desc    Render Sign Up Page (Initial GET Request)
 * @route   GET /sign-up
 */
exports.getSignUpPageController = (req, res) => {
  res.render("auth/sign-up", {
    currentPage: "SignUp",
    title: "Sign Up",
    isLoggedIn: "false",
    countryList: countryList,
    errors: null,
    oldInput: null,
  });
};

/**
 * @desc    Handle Sign Up Form Submission (POST Request)
 * @route   POST /sign-up
 */
exports.postSignUpPageController = [
  // 1. Full Name Validation
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters.")
    .matches(/^[a-zA-Z\s.]+$/)
    .withMessage("Name can only contain letters, spaces, and periods."),

  // 2. Email Validation with Database Uniqueness Check
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail()
    .custom(async (value) => {
      // 🔍 Query the User model to check if email already exists
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error(
          "This email is already registered with a trading account.",
        );
      }
      return true;
    }),

  // 3. Password Strength (Trading Standard Security)
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Password must contain an uppercase letter, lowercase letter, number, and special character.",
    ),

  // 4. Confirm Password Match
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

  // 5. Phone / WhatsApp Validation
  check("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone/WhatsApp number is required.")
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage(
      "Enter a valid international phone number (e.g., +923001234567).",
    ),

  // 6. Country Selection Validation
  check("country")
    .trim()
    .notEmpty()
    .withMessage("Country selection is required.")
    .isIn(validCountryCodes)
    .withMessage("Invalid country selected."),

  // 7. Terms & Conditions Agreement
  check("agree")
    .equals("1")
    .withMessage(
      "You must accept the Terms of Service and Privacy Policy to continue.",
    ),

  // 8. Error Handler Middleware Processing
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMap = errors.mapped();

      console.log("Validation Failed:", errorMap);

      // Re-render the view, sending back errors, old text fields, and the critical country list
      return res.render("auth/sign-up", {
        currentPage: "SignUp",
        title: "Sign Up",
        isLoggedIn: "false",
        errors: errorMap,
        oldInput: req.body,
        countryList: countryList,
      });
    }

    // If validation passes, move to registration database logic
    next();
  },
  // 9. Actual Registration Handling Logic
  // 9. Actual Registration Handling Logic
  async (req, res) => {
    // 👈 Added async here
    try {
      const { fullName, email, password, phone, country } = req.body;

      console.log("Success! Processing registration data for:", email);

      // 🔒 1. Securely hash the password using bcrypt before saving
      const bcrypt = require("bcryptjs"); // or require('bcrypt') depending on your npm packages
      const saltRounds = 12; // Trading standard security strength
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 💾 2. Create the user entity with the secured password
      const user = new User({
        fullName,
        email,
        password: hashedPassword, // 👈 Saves the secure hash, not plain text
        phone,
        country,
      });

      // ⏳ 3. Securely wait for database save completion
      await user.save(); // 👈 Added await here

      res.redirect("/login");
    } catch (err) {
      console.error("Registration Core Error:", err);
      res.status(500).send("Internal Server Error");
    }
  },
];
