const { resPattern } = require("../handler/responseHandler");
const { postResume, changeResume } = require("../services/candidateService");

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

module.exports = { addResume, updateResume };
