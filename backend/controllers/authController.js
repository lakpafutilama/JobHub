const { User } = require("../config/database");
const { resPattern } = require("../handler/responseHandler");
const { generateJWT } = require("../helpers/generateToken");

async function registerUser(req, res, next) {
  try {
    const { userData } = req.body;
    generateJWT(req.body.username);
    res.status(200).json(resPattern("User created", res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function authenticateUser(req, res, next) {
  try {
    const { payload } = req.body;
    generateJWT(req.body.username);
    res.status(200).json(resPattern("User logged-in", res.statusCode));
  } catch (err) {
    next(err);
  }
}

module.exports = { registerUser, authenticateUser };
