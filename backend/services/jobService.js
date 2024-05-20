const Job = require("../models/jobModel");

async function allJobs() {
  try {
    return Job.find();
  } catch (err) {
    throw err;
  }
}

async function specificJobs(username) {
  try {
    return Job.find({ username });
  } catch (err) {
    throw err;
  }
}

async function postJob(data) {
  try {
    data.status = "active";
    await Job.create(data);
  } catch (err) {
    throw err;
  }
}

async function expireJob(date) {
  try {
    await Job.deleteMany({ where: date > valid_upto });
  } catch (err) {
    throw err;
  }
}

async function editJob(id) {
  try {
    await Job.findOneAndUpdate({ id }, { status: "closed" });
  } catch (err) {
    throw err;
  }
}

async function deleteJob(id) {
  try {
    await Job.deleteOne({ id });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  allJobs,
  specificJobs,
  postJob,
  expireJob,
  editJob,
  deleteJob,
};
