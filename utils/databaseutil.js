const mongoose = require("mongoose");
require("dotenv").config();

// Use your process.env variable name. (Make sure it matches MONGO_URI from app.js)
const DB_PATH = process.env.MONGO_URI;

const connectMongo = async () => {
  try {
    // Mongoose manages its own internal connection state globally
    await mongoose.connect(DB_PATH);
    console.log("✅ Mongoose connected to MongoDB successfully.");
  } catch (err) {
    console.error("❌ Mongoose connection failure: ", err);
    throw err; // Throws error up to app.js to stop the server from starting
  }
};

// Since Mongoose tracks connections globally, you don't need a manual getDb() function anymore.
// You can simply import your models anywhere in your app, and Mongoose handles the queries automatically!

exports.connectMongo = connectMongo;
