const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  id: { type: Number, ref: "users" },
  resume: { type: File },
  summary: { type: String },
});

module.exports = candidateSchema;
