const { resPattern } = require("../handler/responseHandler");
const {
  allJobs,
  postJob,
  specificJobs,
  deleteJob,
  editJob,
  likeJobs,
} = require("../services/jobService");
const { findApplicants } = require("../services/applicationService");
const { getListedUser } = require("../services/userService");

exports.homePage = (req, res, next) => {
  try {
    res.json(resPattern("home", res.statusCode));
  } catch (err) {
    next(err.message);
  }
};

async function jobList(req, res, next) {
  try {
    const jobList = await allJobs();
    res.json(resPattern(jobList, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function searchJobs(req, res, next) {
  try {
    const jobList = await likeJobs(req.params.title);
    let titles = [];
    if (jobList.length) titles = jobList.filter((data) => data.title);
    res.json(resPattern(titles, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function filteredJobs(req, res, next) {
  try {
    const jobList = await allJobs(req.query);
    res.json(resPattern(jobList, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function specificJobList(req, res, next) {
  try {
    const jobList = await specificJobs(global._user.username);

    const jobLists = await Promise.all(
      jobList.map(async (data) => {
        const userDetails = await findApplicants(data._id.toString());
        const ids = userDetails.map((data) => {
          return data.user_id;
        });
        const applicants = await getListedUser(ids);
        const applicantCount = await applicants.length;
        return {
          ...data.toObject(),
          applicant: applicantCount || 0,
          applicants,
        };
      })
    );

    res.json(resPattern(jobLists, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function addJob(req, res, next) {
  try {
    const data = req.body;
    data.description = data.description || "";
    data.username = global._user.username;
    await postJob(data);
    res.json(resPattern("Post added successfully", res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function closeJob(req, res, next) {
  try {
    const id = req.params.id;
    const data = { status: "closed" };
    await editJob(id, data);
    res.json(resPattern("Closed", res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function changeJobDetail(req, res, next) {
  try {
    await editJob(req.params.id, req.body);
    res.json(resPattern("Updated", res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function removeJob(req, res, next) {
  try {
    const id = req.params.id;
    await deleteJob(id);
    res.json(resPattern("Removed", res.statusCode));
  } catch (err) {
    next(err.message);
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
  searchJobs,
};
