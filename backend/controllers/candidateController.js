const { resPattern } = require("../handler/responseHandler");
const { upload, getData } = require("../middleware/upload");
const {
  postResume,
  changeResume,
  getResumeByUser,
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
    await postResume(result);

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

async function updateResume(req, res, next) {
  try {
    await changeResume(req.params.id, req.body);
    res.json(resPattern("Updated", res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

module.exports = { viewResume, userDetail, addResume, updateResume };
