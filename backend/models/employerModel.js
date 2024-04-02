const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  id: { type: Number, ref: "users" },
  company_name: { type: String },
  industry: { type: String },
  location: { type: String },
  details: { type: String },
});

module.exports = employerSchema;
