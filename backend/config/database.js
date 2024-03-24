const mongoose = require("mongoose");

require("dotenv").config();

async function dbConnection() {
  try {
    await mongoose.connect(process.env.CONNECTION_URI);
  } catch (err) {
    next(err);
  }
}
module.exports = dbConnection;
