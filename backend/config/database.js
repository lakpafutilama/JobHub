const mongoose = require("mongoose");

require("dotenv").config();

async function dbConnection() {
  try {
    await mongoose.connect(process.env.CONNECTION_URI);
  } catch (err) {
    console.error("Error occured connecting to DB", err);
    mongoose.connection.close();
  }
}
module.exports = dbConnection;
