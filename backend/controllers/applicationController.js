const { resPattern } = require("../handler/responseHandler");
const {
  jobApplication,
  addApplication,
  applicationByDate,
} = require("../services/applicationService");

async function getApplications() {
  try {
    const allApplication = await jobApplication(req.params.type, req.params.id);
    res.json(resPattern(allApplication, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function latestApplications() {
  try {
    const date = new Date();
    const allApplication = await applicationByDate(date);
    res.json(resPattern(allApplication, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function applyJob() {
  try {
    const data = req.body;
    data.status = "pending";
    await addApplication(data);
    res.json(resPattern("Added", res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function verifyApplication() {
  try {
    await addApplication(req.params.id, req.body);
    res.json(resPattern("Added", res.statusCode));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getApplications,
  latestApplications,
  applyJob,
  verifyApplication,
};
