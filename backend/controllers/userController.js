const mongoose = require("mongoose");
const { resPattern } = require("../handler/responseHandler");
const { generateJWT, decodeJWT } = require("../helpers/generateToken");
const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");

const User = mongoose.model("users", userSchema);

async function accessUser(req, res, next) {
  try {
    const token = req.headers.cookie;
    if (!token)
      return res
        .status(422)
        .json(resPattern("Token not provided", res.statusCode));

    const user = decodeJWT(token);
    const userDetails = await User.findOne({ username: user.username });
    if (!userDetails)
      return res
        .status(422)
        .json(resPattern("Token not provided", res.statusCode));

    res.status(200).json(resPattern(userDetails.role, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function registerUser(req, res, next) {
  try {
    const userData = req.body;
    userData.username = await generateUsername(userData.full_name);
    userData.password = await hashPassword(userData.password);
    await User.create(userData);
    const token = generateJWT({ username: userData.username });
    res.status(200).json(resPattern(token, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function authenticateUser(req, res, next) {
  try {
    const payload = req.body;
    const check = await User.findOne({ email: payload.email });
    if (!check)
      return res.status(400).json(resPattern("User not found", res.statusCode));

    const isMatch = await bcrypt.compare(payload.password, check.password);
    if (!isMatch)
      return res.status(422).json(resPattern("Wrong password", res.statusCode));

    const token = generateJWT({ username: payload.username });
    res.status(200).json(resPattern(token, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function generateUsername(fullname) {
  const full_name = fullname.split(" ");
  const username = `${full_name[0]}.${
    full_name[full_name.length - 1]
  }`.toLowerCase();
  const count = await User.countDocuments({
    username: new RegExp(username),
  });
  return count == 0 ? username : `${username}${count}`;
}

async function deleteUser(req, res, next) {
  const username = req.params.username;
  await User.deleteOne({ username });
  res.status(200).json(resPattern(`${username} deleted`, res.statusCode));
}

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

module.exports = { accessUser, registerUser, authenticateUser, deleteUser };
