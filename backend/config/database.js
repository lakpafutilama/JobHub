const mongooose = require("mongoose");
const userSchema = require("../models/userModel");

require("dotenv").config();

async function dbConnection() {
  try {
    await mongooose.connect(process.env.CONNECTION_URI);
    const User = mongooose.model("users", userSchema);
    return { User };
  } catch (err) {
    next(err);
  }
}
module.exports = dbConnection;
