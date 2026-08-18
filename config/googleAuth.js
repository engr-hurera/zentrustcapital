// const { google } = require("googleapis");

// const googleOAuth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_CALLBACK_URL
// );

// module.exports = googleOAuth2Client;


const { google } = require("googleapis");

// TEMPORARY DEBUG LOGS (Remove after fixing)
console.log("--- GOOGLE AUTH ENVIRONMENT CHECK ---");
console.log("Callback URL being used:", process.env.GOOGLE_CALLBACK_URL);
console.log("Client ID Length:", process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.length : "UNDEFINED");
console.log("First 5 chars of Client ID:", process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.substring(0, 5) : "NONE");
console.log("-------------------------------------");

const googleOAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

module.exports = googleOAuth2Client;
