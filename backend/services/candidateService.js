const Detail = require("../models/candidateModel");

async function getResume(id) {
  try {
    return await Detail.findById(id);
  } catch (err) {
    throw err;
  }
}

async function getResumeByUser(user_id) {
  try {
    return await Detail.findOne({ user_id });
  } catch (err) {
    throw err;
  }
}

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

module.exports = { getResume, getResumeByUser, postResume, changeResume };
