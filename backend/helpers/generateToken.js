const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_key = process.env.SECRET_TOKEN;

exports.generateJWT = (payload) => {
  return jwt.sign(payload, secret_key, { expiresIn: "30d" });
};

exports.generatePass = (payload) => {
  return jwt.sign(payload, secret_key);
};

exports.decodeJWT = (token) => {
  return jwt.decode(token);
};
