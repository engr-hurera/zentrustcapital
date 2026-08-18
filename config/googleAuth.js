// const { google } = require("googleapis");

// const googleOAuth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_CALLBACK_URL
// );

// module.exports = googleOAuth2Client;


const { google } = require("googleapis");

// 🔍 TRACE THE EXACT STRING STRUCTURE
if (process.env.GOOGLE_CLIENT_ID) {
  const rawId = process.env.GOOGLE_CLIENT_ID;
  console.log("=== GOOGLE ID DIAGNOSTICS ===");
  console.log("Exact Character Length:", rawId.length);
  console.log("Starts with quote?:", rawId.startsWith('"') || rawId.startsWith("'"));
  console.log("Ends with quote?:", rawId.endsWith('"') || rawId.endsWith("'"));
  console.log("Has trailing spaces?:", rawId !== rawId.trim());
  console.log("First 15 characters:", JSON.stringify(rawId.substring(0, 15)));
  console.log("Last 15 characters:", JSON.stringify(rawId.substring(rawId.length - 15)));
  console.log("=============================");
} else {
  console.log("!!! GOOGLE_CLIENT_ID IS COMPLETELY MISSING !!!");
}

const googleOAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.trim() : undefined,
  process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET.trim() : undefined,
  process.env.GOOGLE_CALLBACK_URL ? process.env.GOOGLE_CALLBACK_URL.trim() : undefined
);

module.exports = googleOAuth2Client;

