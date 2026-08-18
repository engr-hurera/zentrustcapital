const { check, validationResult } = require("express-validator"); // 1. Added validationResult here

const countryList = require("../helpers/countries");

const validCountryCodes = countryList.map(
  (country) => country.code
);


// ============================================================
// PHONE VALIDATION
// ============================================================

const phoneValidation = check("phone")
  .trim()
  .notEmpty()
  .withMessage(
    "Phone/WhatsApp number is required."
  )
  .matches(
    /^\+?[1-9]\d{1,14}$/
  )
  .withMessage(
    "Enter a valid international phone number (e.g. +923001234567)."
  );


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
