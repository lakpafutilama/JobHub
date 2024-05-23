const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: Number },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    role: { type: String, enum: ["user", "organization", "admin"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
