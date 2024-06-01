const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  id: { type: Number, ref: "users" },
  resume: { type: String, required: true },
  rate: { type: Number },
});

module.exports = mongoose.model("details", candidateSchema);
