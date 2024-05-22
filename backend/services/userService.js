const User = require("../models/userModel");

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
    await User.findOneAndDelete({ username });
  } catch (err) {
    throw err;
  }
}

async function countUsers(username) {
  return await User.countDocuments({
    username: new RegExp(username),
  });
}

async function getUserId(username) {
  const data = await User.findOne({ username });
  return data.id;
}

module.exports = {
  getUserFromUsername,
  getUserFromEmail,
  saveUser,
  deleteUserByUsername,
  countUsers,
  getUserId,
};
