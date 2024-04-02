const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: Number },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    full_name: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

module.exports = userSchema;
