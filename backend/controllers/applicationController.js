const { resPattern } = require("../handler/responseHandler");
const {
  jobApplication,
  addApplication,
  applicationByDate,
  changeStatus,
} = require("../services/applicationService");

async function getApplications(req, res, next) {
  try {
    if (!["job", "user"].includes(req.params.type))
      return res
        .status(422)
        .json(resPattern("Type must be job or user", res.statusCode));
    const allApplication = await jobApplication(req.params.type, req.params.id);
    res.json(resPattern(allApplication, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function latestApplications(req, res, next) {
  try {
    const date = new Date();
    const allApplication = await applicationByDate(date);
    res.json(resPattern(allApplication, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function applyJob(req, res, next) {
  try {
    const data = req.body;
    data.status = "pending";
    data.application_date = new Date();
    await addApplication(data);
    res.json(resPattern("Added", res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function verifyApplication(req, res, next) {
  try {
    await changeStatus(req.params.id, req.body);
    res.json(resPattern("Status verified", res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

module.exports = {
  getApplications,
  latestApplications,
  applyJob,
  verifyApplication,
};