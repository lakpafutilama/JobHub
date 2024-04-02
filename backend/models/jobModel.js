const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    id: { type: Number },
    user_id: { type: Number, ref: "users" },
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    status: { type: String, enum: ["active", "expired", "closed"] },
  },
  { timestamps: true }
);

module.exports = jobSchema;
