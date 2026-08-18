const { check, validationResult } = require("express-validator"); // 1. Added validationResult here

const countryList = require("../helpers/countries");

const validCountryCodes = countryList.map(
  (country) => country.code
);


// ============================================================
// PHONE VALIDATION
// ============================================================
// Import the Google library at the top of your validators.js file
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

// ============================================================
// PHONE VALIDATION (Google Enterprise Standard)
// ============================================================

const phoneValidation = check("phone")
  .trim()
  .notEmpty()
  .withMessage("Phone/WhatsApp number is required.")
  .custom((value, { req }) => {
    try {
      // 1. Get the country selection code from the form (e.g. "PK", "US")
      // Make sure 'country' matches the name attribute of your country dropdown input!
      const userSelectedCountry = req.body.country; 

      if (!userSelectedCountry) {
        throw new Error("Please select a country first.");
      }

      // 2. Parse the input using the selected country rules
      const numberProfile = phoneUtil.parseAndKeepRawInput(value, userSelectedCountry);

      // 3. Ask Google's database if this exact number is valid for that specific region
      const isValid = phoneUtil.isValidNumberForRegion(numberProfile, userSelectedCountry);

      if (!isValid) {
        throw new Error(`The phone number entered is invalid for the selected country.`);
      }

      return true;
    } catch (error) {
      // Catch formatting or parsing crashes and turn them into clean user warnings
      throw new Error(error.message || "Please enter a valid phone number.");
    }
  });

// const phoneValidation = check("phone")
//   .trim()
//   .notEmpty()
//   .withMessage(
//     "Phone/WhatsApp number is required."
//   )
//   .matches(
//      /^\+?[1-9]\d{6,14}$/ // ⚡ Changed {1,14} to {6,14} right here
//   )
//   .withMessage(
//     "Enter a valid international phone number (e.g. +923001234567)."
//   );


// ============================================================
// COUNTRY VALIDATION
// ============================================================

const countryValidation = check("country")
  .trim()
  .notEmpty()
  .withMessage(
    "Country selection is required."
  )
  .isIn(validCountryCodes)
  .withMessage(
    "Invalid country selected."
  );



// ============================================================
// GOOGLE SIGNUP VALIDATION RESULT MIDDLEWARE
// ============================================================

const googleSignupValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // 1. Map the validation errors array into an object structure 
    // that matches what your controller and template expect
    const errorMapped = errors.mapped(); 
    
    // 2. Fetch the temporary Google session data
    const googleSignup = req.session.googleSignup;

    // If the session expired or vanished, send them back to login
    if (!googleSignup) {
      return res.redirect("/login");
    }

    // 3. Render using "auth/google-signup" (Fixes your View Lookup Error!)
    return res.status(422).render("auth/google-signup", {
      currentPage: "google-signup",
      title: "Complete Your Account",
      isLoggedIn: false,
      googleSignup,
      countryList, // This comes from your countryList require at top of file
      errors: errorMapped, 
      oldInput: {
        phone: req.body.phone || "",
        country: req.body.country || "",
        terms: req.body.terms === "true"
      }
    });
  }
  
  next();
};



// ============================================================
// EXPORT
// ============================================================

module.exports = {
  phoneValidation,
  countryValidation,
  googleSignupValidationResult, // Now this matches perfectly with your router!
  validCountryCodes,
};
