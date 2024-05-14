const { resPattern } = require("../handler/responseHandler");
const { verifyToken } = require("../middleware/verifyToken");
const { allJobs, postJob, specificJobs } = require("../services/jobService");

exports.homePage = (req, res, next) => {
  try {
    res.json(resPattern("home", res.statusCode));
  } catch (err) {
    next(err);
  }
};

async function jobList(req, res, next) {
  try {
    const jobList = await allJobs();
    res.json(resPattern(jobList, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function specificJobList(req, res, next) {
  try {
    const jobList = await specificJobs(req.params.username);
    res.json(resPattern(jobList, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function addJob(req, res, next) {
  try {
    const data = req.body;
    await postJob(data);
    res.json(resPattern("added", res.statusCode));
  } catch (err) {
    next(err);
  }
}

module.exports = { jobList, specificJobList, addJob };
