const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    id: { type: Number },
    user_id: { type: String, ref: "users" },
    title: { type: String },
    description: { type: String },
    location: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

module.exports = jobSchema;
