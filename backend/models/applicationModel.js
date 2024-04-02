const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  id: { type: Number },
  user_id: { type: Number, ref: "users" },
  job_id: { type: Number, ref: "jobs" },
  application_date: { type: Date },
  status: { type: String },
});

module.exports = applicationSchema;
