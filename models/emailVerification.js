const mongoose = require("mongoose");

const emailVerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    // Password is already hashed before being stored here
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    otpHash: {
  type: String,
  required: true
},

attempts: {
  type: Number,
  default: 0
},

resendCount: {
  type: Number,
  default: 0
},

lastOtpSentAt: {
  type: Date,
  default: Date.now
},

createdAt: {
  type: Date,
  default: Date.now,
  expires: 900
},
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  "EmailVerification",
  emailVerificationSchema,
);