const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 900,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PasswordReset",
  passwordResetSchema
);