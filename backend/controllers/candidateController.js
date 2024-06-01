const { resPattern } = require("../handler/responseHandler");
const {
  postResume,
  changeResume,
  getResume,
} = require("../services/candidateService");

async function viewResume(req, res, next) {
  try {
    const file = await getResume(req.params.id);
    res.json(resPattern(file || {}, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function addResume(req, res, next) {
  try {
    const resume = req.file;
    console.log(req.body);

    // if (!resume) {
    //   return res
    //     .status(422)
    //     .json(resPattern("Resume required", res.statusCode));
    // }

    // await postResume({ resumePath: resume.path });

    res.json({ message: "Added", status: res.statusCode });
  } catch (err) {
    console.log(err);
    next(err.message);
  }
}

async function userDetail(req, res, next) {
  try {
    res.json(resPattern(global._user, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function updateResume(req, res, next) {
  try {
    await changeResume(req.params.id, req.body);
    res.json(resPattern("Updated", res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

module.exports = { viewResume, userDetail, addResume, updateResume };
