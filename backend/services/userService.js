const mongoose = require("mongoose");
const User = require("../models/userModel");

// const User = mongoose.model("users", userSchema);

async function getUserFromUsername(username) {
  return await User.findOne({ username });
}

async function getUserFromEmail(email) {
  return await User.findOne({ email });
}

async function saveUser(data) {
  try {
    await User.create(data);
  } catch (err) {
    throw err;
  }
}

async function deleteUserByUsername(username) {
  try {
    await User.deleteOne({ username });
  } catch (err) {
    throw err;
  }
}

async function countUsers(username) {
  return await User.countDocuments({
    username: new RegExp(username),
  });
}

module.exports = {
  getUserFromUsername,
  getUserFromEmail,
  saveUser,
  deleteUserByUsername,
  countUsers,
};
