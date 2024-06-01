const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: Number },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    contact: { type: String },
    role: { type: String, enum: ["user", "organization"] },
    pp: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
