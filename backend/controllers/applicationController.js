const { resPattern } = require("../handler/responseHandler");
const {
  jobApplication,
  addApplication,
  applicationByDate,
  changeStatus,
} = require("../services/applicationService");
const { jobsById } = require("../services/jobService");

async function getApplications(req, res, next) {
  try {
    if (!["job", "user"].includes(req.params.type))
      return res
        .status(422)
        .json(resPattern("Type must be job or user", res.statusCode));
    const allApplication = await jobApplication(
      req.params.type,
      global._user._id
    );
    const applications = await Promise.all(
      allApplication.map(async (data) => {
        return {
          ...data.toObject(),
          job: (await jobsById(data.job_id)) ?? {},
        };
      })
    );
    res.json(resPattern(applications, res.statusCode));
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
    data.user_id = global._user._id;
    data.application_date = new Date();
    await addApplication(data);
    res.json(resPattern("Added", res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function verifyApplication(req, res, next) {
  try {
    await changeStatus(req.params.user_id, req.params.job_id, req.body);
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
