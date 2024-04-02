const mongoose = require("mongoose");

const expeirenceSchema = new mongoose.Schema({
  id: { type: Number },
  candidate_id: { type: Number, ref: "candidates" },
  company_name: { type: String, required: true },
  job_title: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
});

module.exports = expeirenceSchema;
