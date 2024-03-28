const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: { type: Number },
    username: { type: String, unique: true },
    password: { type: String },
    full_name: { type: String },
    email: { type: String, unique: true },
    contact: { type: String },
    gender: { type: String },
    dob: { type: Date },
    role: { type: String },
  },
  { timestamps: true }
);

module.exports = userSchema;
