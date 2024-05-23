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
    await postResume(req.body);
    res.json(resPattern("Added", res.statusCode));
  } catch (err) {
    next(err.message);
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

module.exports = { viewResume, addResume, updateResume };
