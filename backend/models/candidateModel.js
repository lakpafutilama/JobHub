const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  id: { type: Number, ref: "users" },
  resume: { type: Buffer, required: true },
  summary: { type: String },
  rate: { type: Number },
});

module.exports = mongoose.model("details", candidateSchema);
