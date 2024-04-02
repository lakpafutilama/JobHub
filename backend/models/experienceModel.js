const mongoose = require("mongoose");

const expeirenceSchema = new mongoose.Schema({
  id: { type: Number },
  candidate_id: { type: Number, ref: "candidates" },
  company_name: { type: String },
  job_title: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
});

module.exports = expeirenceSchema;
