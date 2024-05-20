const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  id: { type: Number, ref: "jobs" },
  company_name: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String },
  details: { type: String },
});

module.exports = mongoose.model("job_details", employerSchema);
