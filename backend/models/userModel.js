const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: { type: Number },
    user_name: { type: String, unique: true },
    full_name: { type: String },
    email: { type: String, unique: true },
    gender: { type: String },
    dob: { type: Date },
  },
  { timestamps: true }
);

module.exports = userSchema;
