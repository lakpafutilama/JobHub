const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  id: { type: Number },
  user_id: { type: String, ref: "users" },
  resume: { type: String, required: true },
  rate: { type: Number },
});

module.exports = mongoose.model("details", candidateSchema);
