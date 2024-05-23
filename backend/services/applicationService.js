const Application = require("../models/applicationModel");

async function jobApplication(type, type_id) {
  try {
    if (type == "user") return await Application.find({ user_id: type_id });
    else return await Application.find({ job_id: type_id });
  } catch (err) {
    throw err;
  }
}

async function findApplicants(job_id) {
  try {
    if (!job_id) return null;
    return await Application.find({ job_id });
  } catch (err) {
    throw err;
  }
}

async function applicationByDate(date) {
  try {
    return await Application.find({ where: { application_date: date } });
  } catch (err) {
    throw err;
  }
}

async function addApplication(data) {
  try {
    await Application.create(data);
  } catch (err) {
    throw err;
  }
}

async function changeStatus(id, data) {
  try {
    await Application.findByIdAndUpdate(id, data);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  jobApplication,
  applicationByDate,
  addApplication,
  changeStatus,
  findApplicants,
};
