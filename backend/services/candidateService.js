const Detail = require("../models/candidateModel");

async function postResume(data) {
  try {
    await Detail.create(data);
  } catch (err) {
    throw err;
  }
}

async function changeResume(id, data) {
  try {
    await Detail.findOneAndUpdate({ id }, data);
  } catch (err) {
    throw err;
  }
}

module.exports = { postResume, changeResume };
