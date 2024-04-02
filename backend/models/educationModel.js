const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  id: { type: Number },
  candidate_id: { type: Number, ref: "candidates" },
  degree: { type: String },
  major: { type: String },
  institute: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
});

module.exports = educationSchema;
