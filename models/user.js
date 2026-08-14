const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters long."],
      maxlength: [50, "Full name cannot exceed 50 characters."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters long."],
      select: false,
    },

    phone: {
      type: String,
      required: [true, "Phone/WhatsApp number is required."],
      trim: true,
    },

    country: {
      type: String,
      required: [true, "Country selection is required."],
      trim: true,
    },

    // Account lockout
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
      default: null,
    },

    // User Role
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
      index: true,
    },

    // Future Email Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Future Password Reset
    passwordResetToken: {
      type: String,
      default: null,
    },

    passwordResetExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Virtual property to check whether the account is locked
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

module.exports = mongoose.model("User", userSchema);
