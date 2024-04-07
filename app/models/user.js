// app/models/user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: String,
  email: String,
  emailVerified: String,
  displayName: String,
  createdAt: String,
  lastLoginAt: String,
});

module.exports = mongoose.model("User", userSchema);
