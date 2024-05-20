const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    id: { type: Number },
    username: { type: String, ref: "users" },
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    status: { type: String, enum: ["active", "expired", "closed"] },
    valid_upto: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobs", jobSchema);
