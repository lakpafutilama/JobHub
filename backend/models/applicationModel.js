const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  id: { type: Number },
  user_id: { type: String, ref: "users" },
  job_id: { type: String, ref: "jobs" },
  application_date: { type: Date },
  status: { type: String, enum: ["pending", "accepted", "rejected"] },
});

module.exports = mongoose.model("applications", applicationSchema);
