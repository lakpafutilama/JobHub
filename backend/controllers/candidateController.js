const { resPattern } = require("../handler/responseHandler");
const { upload, getData } = require("../middleware/upload");
const {
  postResume,
  changeResume,
  getResumeByUser,
  getResume,
} = require("../services/candidateService");

async function viewResume(req, res, next) {
  try {
    const data = await getResumeByUser(req.params.user_id);
    res.json(resPattern(data.resume, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function addResume(req, res, next) {
  try {
    if (!req.file) {
      return res
        .status(422)
        .json(resPattern("Resume required", res.statusCode));
    }

    const data = await upload(req.file.buffer);
    const id = global._user._id.toString();
    const result = {
      user_id: id,
      resume: data.secure_url,
    };
    const check = await getResumeByUser(id);
    if (check) await changeResume(check.id, result);
    else await postResume(result);

    res.json({ message: "Added", status: res.statusCode });
  } catch (err) {
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

module.exports = { viewResume, userDetail, addResume };
