const mongooose = require("mongoose");
const userSchema = require("../models/userModel");

require("dotenv").config();

async function dbConnection() {
  await mongooose.connect(process.env.CONNECTION_URI);
  const User = mongooose.model("users", userSchema);
  return { User };
}
module.exports = dbConnection;
