const mongoose = require("mongoose"); // 👈 Fixed spelling

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true, // 👈 This requires a unique check before saving!
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [8, "Password must be at least 8 characters long."],
  },
  phone: {
    type: String,
    required: [true, "Phone/WhatsApp number is required."],
  },
  country: {
    type: String,
    required: [true, "Country selection is required."],
  },
});

module.exports = mongoose.model("User", userSchema);
