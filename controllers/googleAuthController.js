// ============================================================
// GOOGLE AUTH CONTROLLER
// ============================================================

const crypto = require("crypto");
const { google } = require("googleapis");

const googleOAuth2Client = require("../config/googleAuth");
const User = require("../models/user.js");
const { normalizeEmail } = require("../helpers/emailNormalizer");

const countryList =
  require("../helpers/countries");
const e = require("express");


// ============================================================
// START GOOGLE SIGN-IN
// ============================================================

exports.startGoogleAuth = (req, res) => {

  // ----------------------------------------------------------
  // Generate a random state value
  // ----------------------------------------------------------

  const state =
    crypto.randomBytes(32).toString("hex");

  // Store the state in the user's session.
  // We compare this when Google sends the user back.
  req.session.googleOAuthState = state;


  // ----------------------------------------------------------
  // Define the information we want from Google
  // ----------------------------------------------------------

  const scopes = [
    "openid",
    "email",
    "profile",
  ];


  // ----------------------------------------------------------
  // Create Google's authorization URL
  // ----------------------------------------------------------

  const authorizationUrl =
    googleOAuth2Client.generateAuthUrl({
      access_type: "online",
      scope: scopes,
      state,
      prompt: "select_account",
    });


  // ----------------------------------------------------------
  // Send the user to Google
  // ----------------------------------------------------------

  res.redirect(authorizationUrl);
};


// ============================================================
// GOOGLE CALLBACK
// ============================================================

exports.googleAuthCallback = async (
  req,
  res,
  next
) => {

  try {

    // --------------------------------------------------------
    // Check whether Google returned an error
    // --------------------------------------------------------

    if (req.query.error) {

      console.log(
        "Google OAuth error:",
        req.query.error
      );

      return res.redirect("/login");
    }


    // --------------------------------------------------------
    // Verify OAuth state
    // --------------------------------------------------------

    const savedState =
      req.session.googleOAuthState;

    const returnedState =
      req.query.state;

    if (
      !savedState ||
      !returnedState ||
      savedState !== returnedState
    ) {

      console.warn(
        "Google OAuth state mismatch."
      );

      return res.status(400).send(
        "Invalid Google authentication request."
      );
    }


    // --------------------------------------------------------
    // State has been successfully used.
    // Delete it so it cannot be reused.
    // --------------------------------------------------------

    delete req.session.googleOAuthState;


    // --------------------------------------------------------
    // Make sure Google sent an authorization code
    // --------------------------------------------------------

    const code = req.query.code;

    if (!code) {

      return res.status(400).send(
        "Google authentication code was not provided."
      );
    }


    // --------------------------------------------------------
    // Exchange Google's authorization code for tokens
    // --------------------------------------------------------

    const {
      tokens,
    } = await googleOAuth2Client.getToken(code);


    // --------------------------------------------------------
    // Verify Google's ID token
    // --------------------------------------------------------

    const ticket =
      await googleOAuth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience:
          process.env.GOOGLE_CLIENT_ID,
      });


    const payload =
      ticket.getPayload();


    // --------------------------------------------------------
    // Make sure we received a valid Google identity
    // --------------------------------------------------------

    if (
      !payload ||
      !payload.email ||
      payload.email_verified !== true
    ) {

      return res.status(400).send(
        "Google account email could not be verified."
      );
    }


    // --------------------------------------------------------
    // Get user's Google information
    // --------------------------------------------------------

    const googleEmail =
      normalizeEmail(payload.email);

    const googleName =
      payload.name || "Google User";


    // --------------------------------------------------------
    // Find existing ZTC account
    // --------------------------------------------------------

    const user =
      await User.findOne({
        email: googleEmail,
      });


    // ========================================================
    // EXISTING ACCOUNT
    // ========================================================

    // ========================================================
// EXISTING ACCOUNT ARCHITECTURE
// ========================================================
// This block triggers if the email fetched from the verified Google 
// token already exists in our MongoDB database. 
// Instead of rejecting the login or throwing errors, we process them
// based on their original account registration method.
// ========================================================

if (user) {

  // ------------------------------------------------------
  // CASE A: EXISTING LOCAL ACCOUNT (EMAIL & PASSWORD SIGNUP)
  // ------------------------------------------------------
  // The user originally registered on our site using the standard signup 
  // form (with a password). Now they are using 'Sign in with Google'.
  //
  // SECURITY NOTE: Since Google has already verified that this user 100% 
  // owns this inbox (payload.email_verified === true), we can trust this 
  // request completely. 
  //
  // HACKER PROTECTION: We do NOT throw a 409 conflict error here anymore. 
  // Showing an error would tell hackers that this email has a local password, 
  // making it a target for brute-force attacks. We log them in silently instead.
  // ------------------------------------------------------
  if (user.authProvider === "local") {
    
    // Smoothly authorize the session. The user's original local password 
    // remains completely unchanged and safe in the database for future use.
    return loginWithGoogleSession(
      req,
      res,
      next,
      user
    );
  }

  // ------------------------------------------------------
  // CASE B: EXISTING NATIVE GOOGLE ACCOUNT
  // ------------------------------------------------------
  // The user originally created this account using Google Auth in the past.
  // This is a standard, expected returning social login handshake.
  // ------------------------------------------------------
  if (user.authProvider === "google") {
    
    // Log the user into their existing dashboard session directly.
    return loginWithGoogleSession(
      req,
      res,
      next,
      user
    );
  }
}



    // ========================================================
    // NEW GOOGLE USER
    // ========================================================
    //
    // Your User model requires phone and country.
    // Google does not provide those fields.
    //
    // Therefore we temporarily store the verified Google
    // identity in the server-side session and ask the user
    // to complete the required information.
    // ========================================================

    req.session.googleSignup = {
      email: googleEmail,
      fullName: googleName,
      googleId: payload.sub,
    };


    // --------------------------------------------------------
    // Send new Google user to completion page
    // --------------------------------------------------------

    return res.redirect(
      "/google-signup"
    );

  } catch (error) {

    next(error);
  }
};


// ============================================================
// GOOGLE SESSION LOGIN
// ============================================================

function loginWithGoogleSession(
  req,
  res,
  next,
  user
) {

  // ----------------------------------------------------------
  // Prevent session fixation
  // ----------------------------------------------------------

  req.session.regenerate((err) => {

    if (err) {
      return next(err);
    }


    // --------------------------------------------------------
    // Create the SAME session structure used by normal login
    // --------------------------------------------------------

    req.session.isLoggedIn = true;

    req.session.user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };


    // --------------------------------------------------------
    // Save session before redirecting
    // --------------------------------------------------------

    req.session.save((err) => {

      if (err) {
        return next(err);
      }

      console.log(
        "Google login success:",
        user.email
      );

      return res.redirect("/");
    });

  });
}


// ============================================================
// GOOGLE SIGNUP COMPLETION PAGE
// ============================================================

exports.getGoogleSignupController = (
  req,
  res
) => {

  const googleSignup =
    req.session.googleSignup;


  // ----------------------------------------------------------
  // No Google signup information in the session
  // ----------------------------------------------------------
  //
  // This means the user did not arrive here through our
  // Google authentication process.
  //
  // Therefore we do not allow them to open this page directly.
  // ----------------------------------------------------------

  if (!googleSignup) {
    return res.redirect("/login");
  }


  // ----------------------------------------------------------
  // Render the account-completion page
  // ----------------------------------------------------------

  return res.render(
    "auth/google-signup",
    {
      currentPage: "google-signup",
      title: "Complete Your Account",
      isLoggedIn: false,

      googleSignup,

      countryList,

      errors: null,

      oldInput: {
        phone: "",
        country: "",
        terms: false,
      },
    }
  );
};


// ============================================================
// COMPLETE GOOGLE SIGNUP
// ============================================================

exports.postGoogleSignupController = async (
  req,
  res,
  next
) => {

  try {

    // --------------------------------------------------------
    // 1. Get the Google identity from the server-side session
    // --------------------------------------------------------

    const googleSignup =
      req.session.googleSignup;


    if (!googleSignup) {
      return res.redirect("/login");
    }


    // --------------------------------------------------------
    // 2. Get information entered by the user
    // --------------------------------------------------------

    const phone =
      String(
        req.body.phone || ""
      ).trim();

    const country =
      String(
        req.body.country || ""
      ).trim();

    const termsAccepted =
      req.body.terms === "true";


    // --------------------------------------------------------
    // 3. Validate Terms & Conditions
    // --------------------------------------------------------

    if (!termsAccepted) {

      return res.status(422).render(
        "auth/google-signup",
        {
          currentPage: "google-signup",
          title: "Complete Your Account",
          isLoggedIn: false,

          googleSignup,

          countryList,

          errors: {
            terms: {
              msg:
                "You must accept the Terms & Conditions and Privacy Policy.",
            },
          },

          oldInput: {
            phone,
            country,
            terms: termsAccepted,
          },
        }
      );
    }


    // --------------------------------------------------------
    // 4. Check the database again
    // --------------------------------------------------------
    //
    // We NEVER assume that the email is still available just
    // because the user was considered "new" earlier.
    //
    // Another request could have created the account between
    // the Google callback and this form submission.
    // --------------------------------------------------------

    const existingUser =
      await User.findOne({
        email: googleSignup.email,
      });


    if (existingUser) {

      // The account now exists, so we do not create
      // another one.

      delete req.session.googleSignup;

      return res.redirect("/login");
    }


    // --------------------------------------------------------
    // 5. Create the new Google user
    // --------------------------------------------------------

    const user =
      await User.create({
        fullName:
          googleSignup.fullName,

        email:
          googleSignup.email,

        password: undefined,

        phone,

        country,

        emailVerified: true,

        authProvider: "google",

        role: "user",
      });


    // --------------------------------------------------------
    // 6. Google signup information is no longer needed
    // --------------------------------------------------------

    delete req.session.googleSignup;


    // --------------------------------------------------------
    // 7. Create a fresh ZTC session
    // --------------------------------------------------------

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


      // ------------------------------------------------------
      // 8. Save the session before redirecting
      // ------------------------------------------------------

      req.session.save((err) => {

        if (err) {
          return next(err);
        }

        console.log(
          "Google signup success:",
          user.email
        );

        return res.redirect("/");
      });

    });

  } catch (error) {

    next(error);
  }
};
