const { resPattern } = require("../handler/responseHandler");
const {
  allJobs,
  postJob,
  specificJobs,
  deleteJob,
  editJob,
} = require("../services/jobService");

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

async function filteredJobs(req, res, next) {
  try {
    const jobList = await allJobs(req.query);
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
    res.json(resPattern("Added", res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function closeJob(req, res, next) {
  try {
    const id = req.params.id;
    const data = { status: "closed" };
    await editJob(id, data);
    res.json(resPattern("Closed", res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function changeJobDetail(req, res, next) {
  try {
    await editJob(req.params.id, req.body);
    res.json(resPattern("Updated", res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function removeJob(req, res, next) {
  try {
    const id = req.params.id;
    await deleteJob(id);
    res.json(resPattern("Removed", res.statusCode));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  jobList,
  filteredJobs,
  specificJobList,
  addJob,
  closeJob,
  changeJobDetail,
  removeJob,
};
