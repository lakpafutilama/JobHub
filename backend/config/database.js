const mongoose = require("mongoose");

require("dotenv").config();

async function dbConnection() {
  try {
    await mongoose.connect(process.env.CONNEaCTION_URI);
  } catch (err) {
    mongoose.connection.close();
  }
}
module.exports = dbConnection;
